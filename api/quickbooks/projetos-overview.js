// /api/quickbooks/projetos-overview.js
//
// Endpoint AGREGADO: retorna TODOS os projetos relevantes (com atividade em 2025+)
// com receita, custos contábeis (P&L), mão de obra (TimeActivity) e margem,
// usando apenas 3 chamadas ao QBO (e não 400+ como antes).
//
// Fonte da verdade: nomes oficiais do QBO (Total Income, Total Cost of Goods Sold, Total Expenses)
//
// Retorno:
// {
//   projetos: [{ id, nome, cliente, receita, custoCogs, custoExpenses, custoPL, horas, maoObra, breakdown[], custo, lucro, margem, ativo, criado }],
//   tempos: { customers, pl, timeActivity, total },
//   total_projetos: N
// }

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  const t0 = Date.now();
  const tempos = {};

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const base = `${proto}://${host}/api/quickbooks/proxy?endpoint=`;

    const fetchProxy = async (endpoint) => {
      const r = await fetch(base + encodeURIComponent(endpoint));
      if(!r.ok) throw new Error(`QBO ${r.status} pra: ${endpoint.split('?')[0]}`);
      return r.json();
    };

    // ─── CHAMADAS EM PARALELO ───
    const t1 = Date.now();
    const [customersData, plData, timeActsData] = await Promise.all([
      // 1) Lista de Customer/Job com metadata
      fetchProxy('query?query=select Id, DisplayName, FullyQualifiedName, ParentRef, Active, MetaData, Job from Customer where Job=true MAXRESULTS 500')
        .then(r => { tempos.customers = Date.now() - t1; return r; }),

      // 2) P&L agregado por customer (1 chamada → todos os números financeiros)
      fetchProxy('reports/ProfitAndLoss?summarize_column_by=Customers&date_macro=All&accounting_method=Accrual')
        .then(r => { tempos.pl = Date.now() - t1; return r; }),

      // 3) TimeActivity 2025+ (todos os funcionários, todos os projetos)
      fetchProxy("query?query=select * from TimeActivity where TxnDate >= '2025-01-01' MAXRESULTS 1000")
        .then(r => { tempos.timeActivity = Date.now() - t1; return r; })
    ]);

    const customers = (customersData.QueryResponse && customersData.QueryResponse.Customer) || [];
    const timeActs = (timeActsData.QueryResponse && timeActsData.QueryResponse.TimeActivity) || [];

    // ─── PARSE DO P&L ───
    // Colunas: [Account, Customer1, Customer2, ..., Total]
    // Pra cada customer extraímos: Total Income, Total Cost of Goods Sold, Total Expenses
    const plColumns = (plData.Columns && plData.Columns.Column) || [];
    const colHeaders = plColumns.map(c => c.ColTitle || '');

    // Mapa: nome_da_coluna → índice
    const colIndex = new Map();
    colHeaders.forEach((h, i) => colIndex.set(h, i));

    // Achata o tree de Rows pegando só as linhas SUMMARY que nos interessam
    const valoresPorColuna = {}; // nomeColuna → { Total Income, Total Cost of Goods Sold, Total Expenses }
    colHeaders.forEach(h => { valoresPorColuna[h] = {}; });

    function walkPL(node){
      if(!node) return;
      const summary = node.Summary && node.Summary.ColData;
      if(summary){
        const label = summary[0] && summary[0].value;
        if(label === 'Total Income' || label === 'Total Cost of Goods Sold' || label === 'Total Expenses'){
          for(let i = 1; i < summary.length; i++){
            const colName = colHeaders[i];
            if(!colName) continue;
            const val = parseFloat(summary[i].value || '0') || 0;
            valoresPorColuna[colName][label] = val;
          }
        }
      }
      if(node.Rows && node.Rows.Row){
        const rows = Array.isArray(node.Rows.Row) ? node.Rows.Row : [node.Rows.Row];
        rows.forEach(walkPL);
      }
    }
    walkPL(plData);

    // ─── PARSE DO TimeActivity ───
    // Agrupa horas + custo por CustomerRef
    const horasPorCustomer = new Map(); // customerId → { totalHoras, totalCost, breakdown: Map(empKey → {...}) }
    timeActs.forEach(ta => {
      const custId = ta.CustomerRef && ta.CustomerRef.value;
      if(!custId) return;
      const h = (Number(ta.Hours)||0) + (Number(ta.Minutes)||0)/60;
      if(h <= 0) return;
      const rate = Number(ta.CostRate) || 0; // fonte da verdade: rate do QBO
      const valor = h * rate;
      const empId = ta.EmployeeRef && ta.EmployeeRef.value;
      const empName = (ta.EmployeeRef && ta.EmployeeRef.name) || 'Sem funcionário';

      if(!horasPorCustomer.has(custId)){
        horasPorCustomer.set(custId, { totalHoras: 0, totalCost: 0, breakdown: new Map() });
      }
      const c = horasPorCustomer.get(custId);
      c.totalHoras += h;
      c.totalCost += valor;
      const key = (empId || '_'+empName) + '::' + rate;
      if(c.breakdown.has(key)){
        const b = c.breakdown.get(key);
        b.horas += h; b.total += valor;
      } else {
        c.breakdown.set(key, { empId, name: empName, rate, horas: h, total: valor, fromQbo: rate > 0 });
      }
    });

    // ─── MERGE: Customer + P&L + TimeActivity ───
    // Critério de relevância: criado em 2025+ OU tem TimeActivity em 2025+ OU tem valor no P&L
    const limiteData = '2025-01-01';
    const projetos = [];

    customers.forEach(c => {
      const nome = c.DisplayName || c.FullyQualifiedName || 'Sem nome';
      const fqn = c.FullyQualifiedName || nome;

      // Tenta achar coluna pelo FullyQualifiedName, depois pelo DisplayName
      // O QBO usa "Customer:SubCustomer" → o P&L mostra só o nome do sub
      let valoresPL = valoresPorColuna[nome] || valoresPorColuna[fqn] || {};
      // Fallback: tenta achar por substring no nome (último segmento de FullyQualifiedName)
      if(!Object.keys(valoresPL).length && fqn.includes(':')){
        const ultimo = fqn.split(':').pop().trim();
        valoresPL = valoresPorColuna[ultimo] || {};
      }

      const receita = valoresPL['Total Income'] || 0;
      const custoCogs = valoresPL['Total Cost of Goods Sold'] || 0;
      const custoExpenses = valoresPL['Total Expenses'] || 0;
      const custoPL = Math.abs(custoCogs) + Math.abs(custoExpenses);

      const tempoStats = horasPorCustomer.get(c.Id);
      const horas = tempoStats ? tempoStats.totalHoras : 0;
      const maoObra = tempoStats ? tempoStats.totalCost : 0;
      const breakdown = tempoStats ? Array.from(tempoStats.breakdown.values()).sort((a,b)=>b.horas-a.horas) : [];

      // Decide se entra na lista (criado em 2025+ OU tem atividade)
      const criado = c.MetaData && c.MetaData.CreateTime;
      const criadoRecente = criado && criado >= limiteData;
      const temAtividade = horas > 0 || receita !== 0 || custoPL !== 0;

      if(!criadoRecente && !temAtividade) return; // arquiva

      const custoTotal = custoPL + maoObra;
      const lucro = receita - custoTotal;
      const margem = receita > 0 ? (lucro / receita) * 100 : null;

      projetos.push({
        id: c.Id,
        nome,
        cliente: (c.ParentRef && c.ParentRef.name) || '—',
        receita,
        custoCogs: Math.abs(custoCogs),
        custoExpenses: Math.abs(custoExpenses),
        custoPL,
        horas,
        maoObra,
        breakdown,
        custo: custoTotal,
        lucro,
        margem,
        ativo: c.Active !== false,
        criado: criado || null
      });
    });

    // Ordena: mais novos primeiro
    projetos.sort((a, b) => {
      if(!a.criado && !b.criado) return 0;
      if(!a.criado) return 1;
      if(!b.criado) return -1;
      return new Date(b.criado).getTime() - new Date(a.criado).getTime();
    });

    tempos.total = Date.now() - t0;

    return res.status(200).json({
      projetos,
      total_projetos: projetos.length,
      total_customers_qbo: customers.length,
      total_timeactivities_2025: timeActs.length,
      tempos
    });
  } catch (err) {
    console.error('[projetos-overview] error:', err);
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
};
