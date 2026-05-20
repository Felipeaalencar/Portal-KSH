// /api/quickbooks/debug-pnl.js
//
// Debug com 3 modos pra testar diferentes formas de agregar:
//   ?customer=1184              → P&L de 1 projeto
//   ?summary=customers          → P&L agregado por customer (1 chamada → todos)
//   ?summary=customers&period=year → idem mas usando datas explícitas

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const summary = req.query.summary;
  const customerId = req.query.customer || '1184';
  const period = req.query.period;

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';

    let endpoint, titulo;
    if(summary === 'customers'){
      // P&L agregado: 1 coluna por customer/projeto, 1 chamada só
      // date_macro válidos: "Today", "This Week", "This Month", "This Quarter", "This Year",
      //                     "Last Week", "Last Month", "Last Quarter", "Last Year", "Since 30 Days Ago",
      //                     "Since 90 Days Ago", "Since 365 Days Ago", "All"
      if(period === 'year'){
        // datas explícitas: 2025-01-01 até hoje
        const hoje = new Date().toISOString().split('T')[0];
        endpoint = `reports/ProfitAndLoss?summarize_column_by=Customers&start_date=2025-01-01&end_date=${hoje}&accounting_method=Accrual`;
        titulo = 'P&L AGREGADO 2025-01-01 → hoje (datas explícitas)';
      } else {
        endpoint = `reports/ProfitAndLoss?summarize_column_by=Customers&date_macro=All&accounting_method=Accrual`;
        titulo = 'P&L AGREGADO POR CUSTOMER · período: All';
      }
    } else {
      endpoint = `reports/ProfitAndLoss?customer=${customerId}&date_macro=All&accounting_method=Accrual`;
      titulo = `P&L do projeto ${customerId}`;
    }

    const pnlUrl = `${proto}://${host}/api/quickbooks/proxy?endpoint=` + encodeURIComponent(endpoint);
    const t0 = Date.now();
    const pnlRes = await fetch(pnlUrl);
    const tempoMs = Date.now() - t0;
    const pnl = await pnlRes.json();

    // Cabeçalho de colunas
    const columns = pnl.Columns && pnl.Columns.Column ? pnl.Columns.Column : [];
    const colHeaders = columns.map(c => c.ColTitle || '');

    // Walk
    const linhas = [];
    function walk(node, depth = 0){
      if(!node) return;
      if(node.Header && node.Header.ColData){
        linhas.push({ tipo:'HEADER', cols: node.Header.ColData.map(c => c.value||''), depth });
      }
      if(node.ColData){
        linhas.push({ tipo:'ROW', cols: node.ColData.map(c => c.value||''), depth });
      }
      if(node.Summary && node.Summary.ColData){
        linhas.push({ tipo:'SUMMARY', cols: node.Summary.ColData.map(c => c.value||''), depth });
      }
      if(node.Rows && node.Rows.Row){
        const rows = Array.isArray(node.Rows.Row) ? node.Rows.Row : [node.Rows.Row];
        rows.forEach(r => walk(r, depth+1));
      }
    }
    walk(pnl);

    // Detecta erro
    const erro = pnl.Fault && pnl.Fault.Error && pnl.Fault.Error[0];

    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Debug · ${titulo}</title>
<style>
  body{font-family:-apple-system,sans-serif;background:#0f1117;color:#f0f2f8;padding:24px;line-height:1.5}
  h1{font-size:22px;margin:0 0 8px}
  h2{font-size:15px;margin:24px 0 8px;color:#22c55e}
  .meta{color:#6b7599;font-size:13px;margin-bottom:24px}
  .tempo{color:#22c55e;font-weight:600}
  .links{margin-bottom:24px;display:flex;gap:8px;flex-wrap:wrap}
  .links a{background:#22263a;color:#b0b8d0;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:12px}
  .links a:hover{background:#2a2f45;color:#fff}
  table{width:100%;border-collapse:collapse;font-size:12px;background:#1a1d27;border-radius:8px;overflow:hidden;display:block;overflow-x:auto}
  th{background:#22263a;text-align:left;padding:10px 14px;font-size:10px;text-transform:uppercase;color:#b0b8d0;letter-spacing:.5px;white-space:nowrap}
  td{padding:8px 14px;border-top:1px solid rgba(255,255,255,.05);white-space:nowrap}
  td.val{text-align:right;font-family:'DM Mono',monospace;font-weight:600}
  td.val.neg{color:#ef4444}
  td.val.pos{color:#22c55e}
  .tipo-HEADER{background:rgba(168,85,247,.1)}
  .tipo-SUMMARY{background:rgba(59,130,246,.1);font-weight:700}
  .raw{background:#1a1d27;padding:16px;border-radius:8px;max-height:300px;overflow:auto;font-size:10px;font-family:monospace;white-space:pre-wrap;word-break:break-all}
  .badge{display:inline-block;background:#22263a;color:#b0b8d0;font-size:9px;font-weight:600;padding:2px 6px;border-radius:4px}
  .erro{background:rgba(239,68,68,.1);border:1px solid #ef4444;color:#ef4444;padding:14px;border-radius:8px;margin-bottom:20px;font-family:monospace;font-size:12px}
  .sucesso{background:rgba(34,197,94,.1);border:1px solid #22c55e;color:#22c55e;padding:14px;border-radius:8px;margin-bottom:20px;font-size:13px}
</style></head><body>
<h1>🔍 ${titulo}</h1>
<div class="meta">${linhas.length} linhas · ${colHeaders.length} colunas · Tempo: <span class="tempo">${tempoMs}ms</span></div>
<div class="links">
  <a href="?customer=1184">📋 1 projeto (Michael)</a>
  <a href="?summary=customers">📊 TODOS · date_macro=All</a>
  <a href="?summary=customers&period=year">📅 TODOS · 2025+</a>
</div>

${erro ? `<div class="erro">❌ ERRO QBO: ${erro.Message}<br>Detalhe: ${erro.Detail}</div>` : ''}
${summary && colHeaders.length > 2 ? `<div class="sucesso">🚀 SUCESSO! ${colHeaders.length} colunas (1 por customer) em ${tempoMs}ms. <strong>É isso que vai acelerar o Portal.</strong></div>` : ''}

<h2>📊 LINHAS DO RELATÓRIO ${colHeaders.length > 0 ? `(${colHeaders.length} cols)` : ''}</h2>
${colHeaders.length > 0 ? `
<table>
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Conta / Linha</th>
      ${colHeaders.slice(1).map(h => `<th style="text-align:right;max-width:180px;overflow:hidden;text-overflow:ellipsis">${h || '?'}</th>`).join('')}
    </tr>
  </thead>
  <tbody>
    ${linhas.map(l => {
      const label = l.cols[0] || '';
      const valores = l.cols.slice(1);
      const indent = '&nbsp;&nbsp;'.repeat(l.depth);
      const tds = valores.map(v => {
        const num = parseFloat(v);
        const fmt = v ? (isNaN(num) ? v : '$' + num.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})) : '—';
        const cls = isNaN(num) ? '' : (num < 0 ? 'neg' : (num > 0 ? 'pos' : ''));
        return `<td class="val ${cls}">${fmt}</td>`;
      }).join('');
      return `<tr class="tipo-${l.tipo}"><td><span class="badge">${l.tipo}</span></td><td>${indent}${label||'<i style="color:#6b7599">(sem label)</i>'}</td>${tds}</tr>`;
    }).join('')}
  </tbody>
</table>
` : '<p style="color:#6b7599">Sem dados.</p>'}

<h2>🧬 JSON CRU (primeiros 6000 chars)</h2>
<div class="raw">${JSON.stringify(pnl, null, 2).substring(0,6000).replace(/</g,'&lt;')}</div>

</body></html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).send(`<pre style="color:red">ERROR: ${err.message}\n${err.stack}</pre>`);
  }
};
