// /api/quickbooks/debug-pnl.js
//
// Debug endpoint: retorna o P&L COMPLETO de um projeto, formatado em HTML legível
// pra Felipe abrir no browser e ver onde estão os números reais.
//
// Uso: /api/quickbooks/debug-pnl?customer=1184
//      (Michael 2101 = customer 1184)

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const customerId = req.query.customer || '1184';

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';

    // Busca P&L
    const pnlUrl = `${proto}://${host}/api/quickbooks/proxy?endpoint=` +
      encodeURIComponent(`reports/ProfitAndLoss?customer=${customerId}&date_macro=All&accounting_method=Accrual`);
    const pnlRes = await fetch(pnlUrl);
    const pnl = await pnlRes.json();

    // Busca Customer info
    const custUrl = `${proto}://${host}/api/quickbooks/proxy?endpoint=` +
      encodeURIComponent(`customer/${customerId}`);
    const custRes = await fetch(custUrl);
    const cust = custRes.ok ? await custRes.json() : null;

    // Walk the P&L tree extraindo todas as linhas com valores
    const linhas = [];
    function walk(node, depth = 0){
      if(!node) return;
      if(node.Header && node.Header.ColData){
        linhas.push({
          tipo: 'HEADER',
          label: node.Header.ColData[0]?.value || '',
          valor: node.Header.ColData[1]?.value || '',
          depth
        });
      }
      if(node.ColData){
        linhas.push({
          tipo: 'ROW',
          label: node.ColData[0]?.value || '',
          valor: node.ColData[1]?.value || '',
          depth
        });
      }
      if(node.Summary && node.Summary.ColData){
        linhas.push({
          tipo: 'SUMMARY',
          label: node.Summary.ColData[0]?.value || '',
          valor: node.Summary.ColData[1]?.value || '',
          depth
        });
      }
      if(node.Rows && node.Rows.Row){
        const rows = Array.isArray(node.Rows.Row) ? node.Rows.Row : [node.Rows.Row];
        rows.forEach(r => walk(r, depth+1));
      }
    }
    walk(pnl);

    const projectName = cust?.Customer?.DisplayName || cust?.Customer?.FullyQualifiedName || 'Projeto';

    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Debug P&L · ${projectName}</title>
<style>
  body{font-family:-apple-system,sans-serif;background:#0f1117;color:#f0f2f8;padding:24px;line-height:1.5}
  h1{font-size:22px;margin:0 0 8px}
  h2{font-size:15px;margin:24px 0 8px;color:#22c55e}
  .meta{color:#6b7599;font-size:13px;margin-bottom:24px}
  table{width:100%;border-collapse:collapse;font-size:13px;background:#1a1d27;border-radius:8px;overflow:hidden}
  th{background:#22263a;text-align:left;padding:10px 14px;font-size:11px;text-transform:uppercase;color:#b0b8d0;letter-spacing:.5px}
  td{padding:8px 14px;border-top:1px solid rgba(255,255,255,.05)}
  td.val{text-align:right;font-family:'DM Mono',monospace;font-weight:600}
  td.val.neg{color:#ef4444}
  td.val.pos{color:#22c55e}
  .tipo-HEADER{background:rgba(168,85,247,.1)}
  .tipo-SUMMARY{background:rgba(59,130,246,.1);font-weight:700}
  .raw{background:#1a1d27;padding:16px;border-radius:8px;max-height:400px;overflow:auto;font-size:11px;font-family:monospace;white-space:pre-wrap;word-break:break-all}
  .badge{display:inline-block;background:#22263a;color:#b0b8d0;font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;margin-right:6px}
</style></head><body>
<h1>🔍 Debug P&L · ${projectName}</h1>
<div class="meta">customer=${customerId} · ${linhas.length} linhas extraídas · Header: ${pnl.Header?.ReportName || '?'} · ${pnl.Header?.StartPeriod || '?'} → ${pnl.Header?.EndPeriod || '?'}</div>

<h2>📊 TODAS AS LINHAS DO RELATÓRIO (com valor)</h2>
<p style="font-size:12px;color:#6b7599">Aqui você vê EXATAMENTE o que o QBO retorna. Procure os números que batem com o QBO (ex: $5.000 de receita, $7.395 de custo).</p>
<table>
  <thead><tr><th>Tipo</th><th>Conta / Linha</th><th style="text-align:right">Valor</th></tr></thead>
  <tbody>
    ${linhas.map(l => {
      const num = parseFloat(l.valor);
      const valFmt = l.valor ? (isNaN(num) ? l.valor : '$' + num.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})) : '—';
      const cls = isNaN(num) ? '' : (num < 0 ? 'neg' : (num > 0 ? 'pos' : ''));
      const indent = '&nbsp;&nbsp;'.repeat(l.depth);
      return `<tr class="tipo-${l.tipo}"><td><span class="badge">${l.tipo}</span></td><td>${indent}${l.label||'<i style="color:#6b7599">(sem label)</i>'}</td><td class="val ${cls}">${valFmt}</td></tr>`;
    }).join('')}
  </tbody>
</table>

<h2>🧬 P&L CRU (JSON completo)</h2>
<div class="raw">${JSON.stringify(pnl, null, 2).replace(/</g,'&lt;')}</div>

</body></html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).send(`<pre style="color:red">ERROR: ${err.message}\n${err.stack}</pre>`);
  }
};
