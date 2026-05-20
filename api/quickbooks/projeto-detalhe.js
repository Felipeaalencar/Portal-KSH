// /api/quickbooks/projeto-detalhe.js
//
// Retorna o detalhe COMPLETO de 1 projeto, igual à tela do QBO Projects:
//   - P&L individual (cada conta com seu valor)
//   - TimeActivity agregado por funcionário
//   - Metadata do projeto (nome, cliente, datas)
//
// 1 customer_id → 3 chamadas em paralelo → resultado pronto

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  const customerId = req.query.customer;
  if(!customerId) return res.status(400).json({ error: 'customer é obrigatório' });

  const t0 = Date.now();

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const base = `${proto}://${host}/api/quickbooks/proxy?endpoint=`;

    const fetchProxy = async (endpoint) => {
      const r = await fetch(base + encodeURIComponent(endpoint));
      if(!r.ok) throw new Error(`QBO ${r.status}`);
      return r.json();
    };

    const [customerData, plData, timeActsData] = await Promise.all([
      fetchProxy(`customer/${customerId}`),
      fetchProxy(`reports/ProfitAndLoss?customer=${customerId}&date_macro=All&accounting_method=Accrual`),
      fetchProxy(`query?query=select * from TimeActivity where CustomerRef='${customerId}' MAXRESULTS 1000`)
    ]);

    const customer = customerData.Customer || {};
    const timeActs = (timeActsData.QueryResponse && timeActsData.QueryResponse.TimeActivity) || [];

    // ─── PARSE DO P&L EM SEÇÕES ───
    // Estrutura:
    // {
    //   income: { total, accounts: [{ name, valor }] },
    //   cogs:   { total, accounts: [...] },
    //   expenses: { total, accounts: [...] },
    //   netIncome
    // }
    const secoes = {
      income: { label: 'Income', total: 0, accounts: [] },
      cogs: { label: 'Cost of Goods Sold', total: 0, accounts: [] },
      expenses: { label: 'Expenses', total: 0, accounts: [] },
      netIncome: 0,
      grossProfit: 0
    };

    let secaoAtual = null;
    function walkPL(node, depth = 0){
      if(!node) return;
      const header = node.Header && node.Header.ColData;
      if(header){
        const label = header[0] && header[0].value;
        if(label === 'Income') secaoAtual = 'income';
        else if(label === 'Cost of Goods Sold') secaoAtual = 'cogs';
        else if(label === 'Expenses') secaoAtual = 'expenses';
      }
      // ROW: conta individual (com valor)
      if(node.ColData && !node.Header){
        const label = node.ColData[0] && node.ColData[0].value;
        const valor = parseFloat((node.ColData[1] && node.ColData[1].value) || '0') || 0;
        const accountId = node.ColData[0] && node.ColData[0].id;
        if(label && valor !== 0 && secaoAtual && secoes[secaoAtual]){
          secoes[secaoAtual].accounts.push({ name: label, valor, accountId });
        }
      }
      // SUMMARY: total da seção
      const summary = node.Summary && node.Summary.ColData;
      if(summary){
        const label = summary[0] && summary[0].value;
        const valor = parseFloat((summary[1] && summary[1].value) || '0') || 0;
        if(label === 'Total Income') secoes.income.total = valor;
        else if(label === 'Total Cost of Goods Sold') secoes.cogs.total = valor;
        else if(label === 'Total Expenses') secoes.expenses.total = valor;
        else if(label === 'Net Income') secoes.netIncome = valor;
        else if(label === 'Gross Profit') secoes.grossProfit = valor;
      }
      if(node.Rows && node.Rows.Row){
        const rows = Array.isArray(node.Rows.Row) ? node.Rows.Row : [node.Rows.Row];
        rows.forEach(r => walkPL(r, depth+1));
      }
    }
    walkPL(plData);

    // ─── TimeActivity por funcionário ───
    let totalHoras = 0;
    let totalMaoObra = 0;
    const breakdown = new Map(); // key → { name, rate, horas, total, transactions }

    timeActs.forEach(ta => {
      const h = (Number(ta.Hours)||0) + (Number(ta.Minutes)||0)/60;
      if(h <= 0) return;
      totalHoras += h;
      const empId = ta.EmployeeRef && ta.EmployeeRef.value;
      const empName = (ta.EmployeeRef && ta.EmployeeRef.name) || 'Sem funcionário';
      const rate = Number(ta.CostRate) || 0;
      const valor = h * rate;
      totalMaoObra += valor;

      const key = (empId || '_'+empName) + '::' + rate;
      if(breakdown.has(key)){
        const b = breakdown.get(key);
        b.horas += h;
        b.total += valor;
        b.transactions += 1;
      } else {
        breakdown.set(key, {
          empId, name: empName, rate, horas: h, total: valor,
          fromQbo: rate > 0,
          transactions: 1
        });
      }
    });

    const empBreakdown = Array.from(breakdown.values()).sort((a,b) => b.horas - a.horas);

    // ─── TOTAL CUSTO (P&L + Mão de obra), igual QBO ───
    const custoTotal = Math.abs(secoes.cogs.total) + Math.abs(secoes.expenses.total) + totalMaoObra;
    const lucro = secoes.income.total - custoTotal;
    const margem = secoes.income.total > 0 ? (lucro / secoes.income.total) * 100 : null;

    return res.status(200).json({
      projeto: {
        id: customer.Id,
        nome: customer.DisplayName || customer.FullyQualifiedName,
        cliente: (customer.ParentRef && customer.ParentRef.name) || '—',
        ativo: customer.Active !== false,
        criado: customer.MetaData && customer.MetaData.CreateTime,
        modificado: customer.MetaData && customer.MetaData.LastUpdatedTime,
        fullyQualifiedName: customer.FullyQualifiedName
      },
      income: secoes.income,
      cogs: secoes.cogs,
      expenses: secoes.expenses,
      time: {
        totalHoras,
        totalCost: totalMaoObra,
        funcionarios: empBreakdown
      },
      totais: {
        receita: secoes.income.total,
        custoPL: Math.abs(secoes.cogs.total) + Math.abs(secoes.expenses.total),
        custoMaoObra: totalMaoObra,
        custoTotal,
        grossProfit: secoes.grossProfit,
        netIncome: secoes.netIncome, // sem mão de obra (igual ao P&L do QBO)
        lucro, // com mão de obra (igual ao card "Profit" do QBO Projects)
        margem,
        totalQbo: timeActs.length
      },
      _meta: {
        tempoMs: Date.now() - t0
      }
    });
  } catch (err) {
    console.error('[projeto-detalhe] error:', err);
    return res.status(500).json({ error: err.message });
  }
};
