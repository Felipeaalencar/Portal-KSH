// /api/quickbooks/projeto-analise.js
//
// Análise determinística (sem IA): calcula benchmarks comparando 1 projeto vs.
// média/mediana dos outros projetos da empresa.
//
// Estratégia: reusa o endpoint /api/quickbooks/projetos-overview que já agrega
// tudo num shot. Não bate no QBO de novo — apenas processa o que já temos.
//
// Uso: /api/quickbooks/projeto-analise?customer=1184

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  const customerId = req.query.customer;
  if(!customerId) return res.status(400).json({ error: 'customer é obrigatório' });

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';

    // Reusa o overview pra pegar TODOS os projetos numa chamada só
    const r = await fetch(`${proto}://${host}/api/quickbooks/projetos-overview`);
    if(!r.ok) throw new Error(`Overview HTTP ${r.status}`);
    const data = await r.json();
    const todos = data.projetos || [];

    const atual = todos.find(p => String(p.id) === String(customerId));
    if(!atual) return res.status(404).json({ error: 'Projeto não encontrado no overview' });

    // Só compara com projetos que TÊM dados (receita > 0 OU horas > 0), excluindo o próprio
    const outros = todos.filter(p => String(p.id) !== String(customerId) && (p.receita > 0 || p.horas > 0));

    if(outros.length === 0){
      return res.status(200).json({
        atual,
        benchmark: null,
        mensagem: 'Ainda não há projetos suficientes pra comparação'
      });
    }

    // ─── ESTATÍSTICAS DOS OUTROS PROJETOS ───
    const stats = (campo) => {
      const valores = outros.map(p => p[campo]).filter(v => typeof v === 'number' && !isNaN(v));
      if(valores.length === 0) return { media: 0, mediana: 0, min: 0, max: 0, n: 0 };
      const ord = [...valores].sort((a,b)=>a-b);
      const media = valores.reduce((a,b)=>a+b,0) / valores.length;
      const mediana = ord.length % 2 === 0
        ? (ord[ord.length/2-1] + ord[ord.length/2]) / 2
        : ord[Math.floor(ord.length/2)];
      return {
        media,
        mediana,
        min: ord[0],
        max: ord[ord.length-1],
        n: valores.length
      };
    };

    // Margem médias só considera projetos com receita > 0
    const margensValidas = outros.filter(p => p.receita > 0).map(p => p.margem).filter(v => v !== null);
    const margemMedia = margensValidas.length > 0 ? margensValidas.reduce((a,b)=>a+b,0) / margensValidas.length : 0;
    const margemMediana = (() => {
      if(margensValidas.length === 0) return 0;
      const ord = [...margensValidas].sort((a,b)=>a-b);
      return ord.length % 2 === 0
        ? (ord[ord.length/2-1] + ord[ord.length/2]) / 2
        : ord[Math.floor(ord.length/2)];
    })();

    // Rate efetivo: receita / horas (só projetos com horas > 0)
    const rateAtual = atual.horas > 0 ? atual.receita / atual.horas : null;
    const rateOutros = outros.filter(p => p.horas > 0 && p.receita > 0).map(p => p.receita / p.horas);
    const rateMedia = rateOutros.length > 0 ? rateOutros.reduce((a,b)=>a+b,0)/rateOutros.length : 0;

    // ─── CÁLCULO DAS COMPARAÇÕES ───
    const benchmark = {
      receita: {
        atual: atual.receita,
        ...stats('receita'),
        // diff vs média em %
        diffPct: stats('receita').media > 0 ? ((atual.receita - stats('receita').media) / stats('receita').media * 100) : null
      },
      custo: {
        atual: atual.custo,
        ...stats('custo'),
        diffPct: stats('custo').media > 0 ? ((atual.custo - stats('custo').media) / stats('custo').media * 100) : null
      },
      margem: {
        atual: atual.margem,
        media: margemMedia,
        mediana: margemMediana,
        n: margensValidas.length,
        // diff em pontos percentuais (não em %)
        diffPp: atual.margem !== null ? (atual.margem - margemMedia) : null
      },
      horas: {
        atual: atual.horas,
        ...stats('horas'),
        diffPct: stats('horas').media > 0 ? ((atual.horas - stats('horas').media) / stats('horas').media * 100) : null
      },
      ratePorHora: {
        atual: rateAtual,
        media: rateMedia,
        n: rateOutros.length,
        diffPct: rateMedia > 0 && rateAtual !== null ? ((rateAtual - rateMedia) / rateMedia * 100) : null
      }
    };

    // ─── COMPOSIÇÃO DO CUSTO (pro donut) ───
    const composicao = {
      cogs: atual.custoCogs || 0,
      expenses: atual.custoExpenses || 0,
      maoObra: atual.maoObra || 0,
      total: (atual.custoCogs || 0) + (atual.custoExpenses || 0) + (atual.maoObra || 0)
    };

    // ─── MIX DE EQUIPE ───
    // O overview retorna breakdown agrupado por (empId+rate). Pra "mix de equipe"
    // queremos AGREGAR por funcionário (somando rates diferentes da mesma pessoa).
    const equipeMap = new Map();
    (atual.breakdown || []).forEach(b => {
      const key = b.name; // agrega por nome (vários rates entram na mesma linha)
      if(equipeMap.has(key)){
        const e = equipeMap.get(key);
        e.horas += b.horas;
        e.total += b.total;
      } else {
        equipeMap.set(key, {
          name: b.name,
          horas: b.horas,
          total: b.total,
          ratesUsados: [b.rate]
        });
      }
    });
    const mixEquipe = Array.from(equipeMap.values()).sort((a,b) => b.horas - a.horas);
    const totalHorasMix = mixEquipe.reduce((a,e)=>a+e.horas, 0);
    mixEquipe.forEach(e => {
      e.pctHoras = totalHorasMix > 0 ? (e.horas / totalHorasMix * 100) : 0;
      e.rateMedio = e.horas > 0 ? e.total / e.horas : 0;
    });

    return res.status(200).json({
      atual: {
        id: atual.id,
        nome: atual.nome,
        receita: atual.receita,
        custo: atual.custo,
        margem: atual.margem,
        horas: atual.horas,
        lucro: atual.lucro
      },
      benchmark,
      composicao,
      mixEquipe,
      universo: {
        totalProjetosComparados: outros.length,
        totalProjetosOverview: todos.length
      }
    });
  } catch (err) {
    console.error('[projeto-analise] error:', err);
    return res.status(500).json({ error: err.message });
  }
};
