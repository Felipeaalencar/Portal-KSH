// /api/quickbooks/recorrentes.js
//
// Detecta PAGAMENTOS RECORRENTES (Purchase + Bill) nos últimos 18 meses.
// CATEGORIZAÇÃO: usa AccountRef.name do QBO (conta contábil real).
// Agrupa contas QBO em super-categorias usando keywords no nome da CONTA.

// ─── SUPER-CATEGORIAS baseadas no NOME DA CONTA QBO ───
// IMPORTANTE: ordem importa! Categorias mais específicas vêm ANTES das genéricas.
// Keywords são matched como PALAVRA INTEIRA (word boundary), pra evitar
// falsos positivos tipo "it" matchando "credit".
const SUPER_CATEGORIAS = {
  'Seguros': [
    'insurance', 'liability', 'workers comp', 'workers compensation',
    'general liability', 'auto insurance', 'vehicle insurance',
    'health insurance', 'medical insurance', 'umbrella insurance',
    'commercial insurance', 'seguro', 'seguros'
  ],
  'Bancos & Taxas': [
    'bank', 'bank charge', 'bank service', 'service charge', 'bank fee',
    'interest expense', 'credit card', 'cc fee', 'merchant fee',
    'merchant processing', 'processing fee', 'transaction fee', 'wire fee',
    'wire transfer', 'finance charge', 'late fee', 'ach fee'
  ],
  'Veículos & Combustível': [
    'vehicle', 'fuel', 'gas', 'gasoline', 'auto expense', 'automobile',
    'truck expense', 'mileage', 'tolls', 'parking', 'car repair',
    'auto repair', 'gas and oil', 'gasoline expense', 'vehicle expense',
    'auto and truck', 'truck'
  ],
  'Utilities & Telefonia': [
    'utility', 'utilities', 'electric', 'electricity', 'water',
    'gas bill', 'phone', 'telephone', 'internet', 'cell phone',
    'cellular', 'telecommunications', 'wifi'
  ],
  'Aluguel & Imóveis': [
    'rent expense', 'rent', 'rental', 'real estate', 'property',
    'office rent', 'storage', 'warehouse', 'lease real estate'
  ],
  'Folha & Contractors': [
    'payroll', 'wages', 'salary', 'salaries', 'commission', 'commissions',
    'contractor', 'contractors', 'subcontractor', 'subcontractors',
    'labor', 'employee benefit'
  ],
  'Materiais & Equipamentos': [
    'supplies', 'materials', 'equipment', 'tools', 'parts',
    'inventory', 'cogs', 'cost of goods', 'job materials',
    'job supplies', 'office supplies'
  ],
  'Marketing & Publicidade': [
    'marketing', 'advertising', 'ads', 'promotion', 'promotional',
    'website', 'web hosting', 'seo', 'social media'
  ],
  'Sócios & Distribuições': [
    'owner draw', 'owner distribution', 'distribution', 'distributions',
    'draws', 'dividend', 'shareholder', 'partner draw',
    'capital contribution', 'equity'
  ],
  'Software & SaaS': [
    'software', 'subscription', 'subscriptions', 'saas',
    'computer software', 'online software', 'dues and subscriptions',
    'subscription dues', 'cloud service', 'license fee',
    'software license', 'app store', 'computer expense'
  ]
};

const NAO_VENDOR = ['checking', 'savings', 'credit card', 'debit card', 'cartao', 'cartão', 'account', 'conta', 'wallet'];

// Helper: escape regex special chars
function escapeRegex(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// Match palavra inteira (word boundary), case-insensitive.
// Ex: "credit card" matcheia "Credit Card" mas "it" NÃO matcheia "credit".
function matchKeyword(texto, keyword){
  const re = new RegExp('\\b' + escapeRegex(keyword) + '\\b', 'i');
  return re.test(texto);
}

function classificarConta(contaNome){
  const n = (contaNome||'').toLowerCase();
  if(!n) return 'Outros';
  for(const [cat, keys] of Object.entries(SUPER_CATEGORIAS)){
    if(keys.some(k => matchKeyword(n, k))) return cat;
  }
  return 'Outros';
}

function isNomeConta(nome){
  const n = (nome||'').toLowerCase();
  return NAO_VENDOR.some(k => n.includes(k));
}

function pertoDe(v1, v2, tol = 0.05){
  const med = (Math.abs(v1) + Math.abs(v2)) / 2;
  if(med === 0) return false;
  return Math.abs(Math.abs(v1) - Math.abs(v2)) / med <= tol;
}

function detectFreq(diasArr){
  if(diasArr.length === 0) return null;
  const med = diasArr.reduce((a,b)=>a+b,0) / diasArr.length;
  if(med >= 25 && med <= 35)  return { tipo:'Mensal',      dias:30  };
  if(med >= 80 && med <= 100) return { tipo:'Trimestral',  dias:90  };
  if(med >= 170 && med <= 200)return { tipo:'Semestral',   dias:180 };
  if(med >= 340 && med <= 400)return { tipo:'Anual',       dias:365 };
  return null;
}

function ymKey(s){ return s.slice(0,7); }

// ─── EXTRAÇÃO DE CONTA QBO PRA CADA TRANSAÇÃO ───
// IMPORTANTE: No QBO, Purchase.AccountRef (topo) é a CONTA DE PAGAMENTO
// (cartão/banco de onde saiu o $$), NÃO a categoria de despesa.
// A categoria REAL de despesa fica em Line[].AccountBasedExpenseLineDetail.AccountRef
// Então sempre prioriza Lines antes do topo.
function extrairConta(tx, type){
  // Prioridade 1: AccountRef DENTRO das linhas (categoria de despesa real)
  const lines = tx?.Line || [];
  for(const line of lines){
    const det = line?.AccountBasedExpenseLineDetail
             || line?.ItemBasedExpenseLineDetail
             || line?.JournalEntryLineDetail;
    if(det?.AccountRef?.name) return det.AccountRef.name;
  }

  // Prioridade 2: AccountRef do topo (fallback - geralmente é só a conta de pagamento)
  if(tx?.AccountRef?.name) return tx.AccountRef.name;

  return null;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';

    const hoje = new Date();
    const inicio = new Date(hoje);
    inicio.setMonth(inicio.getMonth() - 18);
    const inicioStr = inicio.toISOString().slice(0,10);
    const hojeStr = hoje.toISOString().slice(0,10);

    const q = (entity) => `select * from ${entity} where TxnDate >= '${inicioStr}' and TxnDate <= '${hojeStr}' MAXRESULTS 1000`;

    const [purRes, billRes] = await Promise.all([
      fetch(`${proto}://${host}/api/quickbooks/proxy?endpoint=query&query=${encodeURIComponent(q('Purchase'))}&minorversion=70`),
      fetch(`${proto}://${host}/api/quickbooks/proxy?endpoint=query&query=${encodeURIComponent(q('Bill'))}&minorversion=70`)
    ]);

    const purData  = purRes.ok ? await purRes.json() : {};
    const billData = billRes.ok ? await billRes.json() : {};

    const purchases = purData?.QueryResponse?.Purchase || [];
    const bills = billData?.QueryResponse?.Bill || [];

    // ─── NORMALIZA TRANSAÇÕES ───
    const transacoes = [];

    purchases.forEach(p => {
      let vendor = p?.EntityRef?.name;
      let isConta = false;
      if(!vendor){
        vendor = p?.PaymentMethodRef?.name || p?.AccountRef?.name || 'Unknown';
        isConta = true;
      }
      const valor = Math.abs(parseFloat(p?.TotalAmt || 0));
      const data = p?.TxnDate;
      const contaQbo = extrairConta(p, 'Purchase');
      if(valor > 0 && data) transacoes.push({ vendor, valor, data, id: p?.Id, src: 'Purchase', isConta, contaQbo });
    });

    bills.forEach(b => {
      const vendor = b?.VendorRef?.name || 'Unknown';
      const valor = Math.abs(parseFloat(b?.TotalAmt || 0));
      const data = b?.TxnDate;
      const contaQbo = extrairConta(b, 'Bill');
      if(valor > 0 && data) transacoes.push({ vendor, valor, data, id: b?.Id, src: 'Bill', isConta: false, contaQbo });
    });

    // Marca isConta também por nome (heurística)
    transacoes.forEach(t => {
      if(!t.isConta && isNomeConta(t.vendor)) t.isConta = true;
    });

    // ─── AGRUPA POR (VENDOR + VALOR ±5%) ───
    const grupos = [];
    transacoes.forEach(t => {
      let g = grupos.find(x =>
        x.vendor.toLowerCase() === t.vendor.toLowerCase() && pertoDe(x.valor, t.valor)
      );
      if(!g){
        g = { vendor: t.vendor, valor: t.valor, txs: [], isConta: t.isConta, contasQbo: {} };
        grupos.push(g);
      }
      g.txs.push(t);
      g.valor = g.txs.reduce((a,x)=>a+x.valor,0) / g.txs.length;
      // Conta quantas vezes cada conta QBO apareceu
      if(t.contaQbo){
        g.contasQbo[t.contaQbo] = (g.contasQbo[t.contaQbo] || 0) + 1;
      }
    });

    // ─── DETECTA RECORRÊNCIA ───
    const recorrentes = [];
    grupos.forEach(g => {
      if(g.txs.length < 3) return;

      const ts = [...g.txs].sort((a,b) => a.data.localeCompare(b.data));
      const diasEntre = [];
      for(let i = 1; i < ts.length; i++){
        const d1 = new Date(ts[i-1].data);
        const d2 = new Date(ts[i].data);
        diasEntre.push(Math.round((d2 - d1) / (1000*60*60*24)));
      }
      const freq = detectFreq(diasEntre);
      if(!freq) return;

      const ultimaData = new Date(ts[ts.length-1].data);
      const proximaData = new Date(ultimaData);
      proximaData.setDate(proximaData.getDate() + freq.dias);

      let porMes = g.valor;
      if(freq.tipo === 'Trimestral') porMes = g.valor / 3;
      else if(freq.tipo === 'Semestral') porMes = g.valor / 6;
      else if(freq.tipo === 'Anual') porMes = g.valor / 12;
      const totalAnual = porMes * 12;

      let aumentoPct = 0;
      let valorAnterior = null;
      let valorAtual = g.valor;
      if(ts.length >= 4){
        const meio = Math.floor(ts.length / 2);
        const med1 = ts.slice(0, meio).reduce((a,x)=>a+x.valor,0) / meio;
        const med2 = ts.slice(meio).reduce((a,x)=>a+x.valor,0) / (ts.length - meio);
        const diff = (med2 - med1) / med1;
        if(diff > 0.05){
          aumentoPct = diff * 100;
          valorAnterior = med1;
          valorAtual = med2;
        }
      }

      const diasDesdeUltima = Math.round((hoje - ultimaData) / (1000*60*60*24));
      const ativa = diasDesdeUltima < (freq.dias * 1.5);

      // ─── DETERMINA CONTA QBO MAIS FREQUENTE PRO GRUPO ───
      // Pega a conta que mais aparece nas transações desse grupo
      let contaQboPrincipal = null;
      let maxCount = 0;
      for(const [conta, count] of Object.entries(g.contasQbo)){
        if(count > maxCount){ maxCount = count; contaQboPrincipal = conta; }
      }

      // Super-categoria baseada na conta QBO
      const categoria = contaQboPrincipal ? classificarConta(contaQboPrincipal) : 'Outros';

      recorrentes.push({
        vendor: g.vendor,
        contaQbo: contaQboPrincipal || '—',
        categoria,
        frequencia: freq.tipo,
        valorAtual,
        valorAnterior,
        aumentoPct,
        ocorrencias: ts.length,
        primeiraCobranca: ts[0].data,
        ultimaCobranca: ts[ts.length-1].data,
        proximaCobranca: proximaData.toISOString().slice(0,10),
        totalMensal: porMes,
        totalAnual,
        ativa,
        diasDesdeUltima,
        isConta: g.isConta,
        qboLink: null,
        // ─── PRA RECATEGORIZAÇÃO ───
        // ID/tipo da ÚLTIMA transação (a que será recategorizada)
        ultimaTxnId: ts[ts.length-1].id || null,
        ultimaTxnType: ts[ts.length-1].src || null
      });
    });

    recorrentes.sort((a,b) => b.totalAnual - a.totalAnual);

    const ativas = recorrentes.filter(a => a.ativa);

    // ─── ALERTAS DE REDUNDÂNCIA (mantém pra email marketing) ───
    const EMAIL_MKT = ['mailchimp','brevo','sendinblue','activecampaign','constant contact','klaviyo','convertkit','drip','hubspot'];
    const emailMktAtivas = ativas.filter(a => EMAIL_MKT.some(k => a.vendor.toLowerCase().includes(k)));
    const alertas = [];
    if(emailMktAtivas.length >= 2){
      const totalMes = emailMktAtivas.reduce((a,b)=>a+b.totalMensal,0);
      const ordenado = [...emailMktAtivas].sort((a,b) => a.totalMensal - b.totalMensal);
      const economiaMes = totalMes - ordenado[0].totalMensal;
      alertas.push({
        grupo: 'Email Marketing',
        ferramentas: emailMktAtivas.map(a => a.vendor),
        qtd: emailMktAtivas.length,
        totalMes,
        economiaMes
      });
    }

    const totalMes = ativas.reduce((a,b)=>a+b.totalMensal,0);
    const totalAno = totalMes * 12;
    const qtdMensais = ativas.filter(a => a.frequencia === 'Mensal').length;
    const qtdAnuais = ativas.filter(a => a.frequencia === 'Anual').length;
    const qtdAumentaram = ativas.filter(a => a.aumentoPct > 0).length;
    const economiaPotencialAno = alertas.reduce((a,b)=>a+b.economiaMes,0) * 12;

    const totalPorCategoria = {};
    ativas.forEach(a => {
      totalPorCategoria[a.categoria] = (totalPorCategoria[a.categoria] || 0) + a.totalMensal;
    });

    const meses = [];
    for(let i = 11; i >= 0; i--){
      const d = new Date(hoje);
      d.setMonth(d.getMonth() - i);
      const ym = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      meses.push({ mes: ym, total: 0 });
    }
    transacoes.forEach(t => {
      const ym = ymKey(t.data);
      const slot = meses.find(m => m.mes === ym);
      if(slot){
        const isRec = recorrentes.some(a =>
          a.vendor.toLowerCase() === t.vendor.toLowerCase() && pertoDe(a.valorAtual, t.valor, 0.1)
        );
        if(isRec) slot.total += t.valor;
      }
    });

    return res.status(200).json({
      assinaturas: recorrentes,
      resumo: {
        totalMes,
        totalAno,
        qtdAtivas: ativas.length,
        qtdMensais,
        qtdAnuais,
        qtdAumentaram,
        economiaPotencialAno,
        totalPorCategoria
      },
      alertas,
      crescimento: meses,
      _meta: {
        transacoesAnalisadas: transacoes.length,
        gruposEncontrados: grupos.length,
        janelaInicio: inicioStr,
        janelaFim: hojeStr,
        purchasesQtd: purchases.length,
        billsQtd: bills.length
      }
    });
  } catch(err){
    console.error('[recorrentes] error:', err);
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
};
