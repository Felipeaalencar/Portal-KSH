// /api/quickbooks/debug-pnl.js
//
// Debug endpoint com 2 modos:
//   ?customer=1184              → P&L de 1 projeto
//   ?summary=customers          → P&L AGREGADO por todos os customers (1 chamada → todos os projetos)

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const summary = req.query.summary;
  const customerId = req.query.customer || '1184';

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';

    let endpoint, titulo;
    if(summary === 'customers'){
      // P&L agregado: 1 coluna por customer/projeto, 1 chamada só
      endpoint = `reports/ProfitAndLoss?summarize_column_by=Customers&date_macro=ThisYear&accounting_method=Accrual`;
      titulo = 'P&L AGREGADO POR CUSTOMER (todos os projetos numa chamada só)';
    } else {
      endpoint = `reports/ProfitAndLoss?customer=${customerId}&date_macro=All&accounting_method=Accrual`;
      titulo = `P&L do projeto ${customerId}`;
    }

    const pnlUrl = `${proto}://${host}/api/quickbooks/proxy?endpoint=` + encodeURIComponent(endpoint);
    const t0 = Date.now();
    const pnlRes = await fetch(pnlUrl);
    const tempoMs = Date.now() - t0;
    const pnl = await pnlRes.json();

    // Cabeçalho de colunas (importante no modo summary)
    const columns = pnl.Columns && pnl.Columns.Column ? pnl.Columns.Column : [];
    const colHeaders = columns.map(c => c.ColTitle || c.MetaData?.find(m=>m.Name==='ColKey')?.Value || '');

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
</style></head><body>
<h1>🔍 ${titulo}</h1>
<div class="meta">${linhas.length} linhas · ${colHeaders.length} colunas · Tempo: <span class="tempo">${tempoMs}ms</span> · Header: ${pnl.Header?.ReportName || '?'}</div>
<div class="links">
  <a href="?customer=1184">📋 1 projeto (Michael)</a>
  <a href="?summary=customers">📊 TODOS por customer (1 chamada)</a>
</div>

${summary==='customers' ? '<p style="background:rgba(34,197,94,.1);color:#22c55e;padding:12px;border-radius:8px;font-size:13px"><strong>🚀 Se essa página carregar em &lt;2s e mostrar TODOS os projetos, podemos eliminar 99% das chamadas atuais e carregar tudo em segundos.</strong></p>' : ''}

<h2>📊 LINHAS DO RELATÓRIO</h2>
<table>
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Conta / Linha</th>
      ${colHeaders.slice(1).map(h => `<th style="text-align:right">${h || '?'}</th>`).join('')}
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

<h2>🧬 P&L CRU (JSON completo, primeiros 8000 chars)</h2>
<div class="raw">${JSON.stringify(pnl, null, 2).substring(0,8000).replace(/</g,'&lt;')}</div>

</body></html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).send(`<pre style="color:red">ERROR: ${err.message}\n${err.stack}</pre>`);
  }
};
