// /api/quickbooks/bank-saldos.js
// Retorna Bank (BalanceSheet) + Posted (CurrentBalance) por conta

const SUPABASE_URL = 'https://ayhijjbvvsioxpdsrouq.supabase.co';
const QBO_BASE = (process.env.QBO_ENVIRONMENT === 'production')
  ? 'https://quickbooks.api.intuit.com'
  : 'https://sandbox-quickbooks.api.intuit.com';

async function getValidToken() {
  const r = await fetch(SUPABASE_URL + '/rest/v1/qbo_tokens?select=*&order=updated_at.desc&limit=1', {
    headers: { 'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY, 'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY }
  });
  if (!r.ok) throw new Error('SUPABASE_READ_FAILED');
  const arr = await r.json();
  if (!arr.length) throw new Error('NOT_CONNECTED');
  const tok = arr[0];
  const expMs = new Date(tok.expires_at).getTime();
  if (Date.now() > expMs - 5*60*1000) {
    const basicAuth = Buffer.from(process.env.QBO_CLIENT_ID + ':' + process.env.QBO_CLIENT_SECRET).toString('base64');
    const ref = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Authorization': 'Basic ' + basicAuth },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: tok.refresh_token }).toString()
    });
    if (!ref.ok) throw new Error('REFRESH_FAILED');
    const nt = await ref.json();
    await fetch(SUPABASE_URL + '/rest/v1/qbo_tokens?id=eq.' + tok.id, {
      method: 'PATCH',
      headers: { 'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY, 'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ access_token: nt.access_token, refresh_token: nt.refresh_token || tok.refresh_token, expires_at: new Date(Date.now() + (nt.expires_in||3600)*1000).toISOString(), updated_at: new Date().toISOString() })
    });
    return { accessToken: nt.access_token, realmId: tok.realm_id };
  }
  return { accessToken: tok.access_token, realmId: tok.realm_id };
}

function extractBalanceSheet(report) {
  // Percorre o BalanceSheet e extrai valor por nome de conta
  const result = {};
  function walk(rows) {
    if (!rows) return;
    for (const row of rows) {
      if (row.type === 'Data' && row.Rows) walk(row.Rows.Row);
      if (row.ColData && row.ColData.length >= 2) {
        const name = (row.ColData[0].value || '').trim();
        const val  = parseFloat(row.ColData[1] && row.ColData[1].value) || 0;
        if (name) result[name] = val;
      }
      if (row.Rows && row.Rows.Row) walk(row.Rows.Row);
    }
  }
  if (report && report.Rows && report.Rows.Row) walk(report.Rows.Row);
  return result;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const { accessToken, realmId } = await getValidToken();
    const H = { 'Authorization': 'Bearer ' + accessToken, 'Accept': 'application/json' };
    const base = QBO_BASE + '/v3/company/' + realmId;

    // 1. Contas (Posted = CurrentBalance)
    const qr = await fetch(base + "/query?query=" + encodeURIComponent("select * from Account where AccountType in ('Bank','Credit Card') and Active = true") + "&minorversion=70", { headers: H });
    const qd = await qr.json();
    const accounts = (qd.QueryResponse && qd.QueryResponse.Account) || [];

    // 2. BalanceSheet hoje (Bank = saldo real)
    const today = new Date().toISOString().slice(0,10);
    const br = await fetch(base + `/reports/BalanceSheet?date_macro=Today&minorversion=70`, { headers: H });
    const bd = await br.json();
    const bsMap = extractBalanceSheet(bd.Report || bd);

    // Monta resposta combinando os dois
    const OCULTAS = ['7013'];
    const result = accounts
      .filter(a => !OCULTAS.some(k => (a.Name||'').includes(k)))
      .filter(a => {
        if (!a.MetaData || !a.MetaData.LastUpdatedTime) return false;
        const d = new Date(a.MetaData.LastUpdatedTime);
        return (Date.now() - d) < 180*24*60*60*1000;
      })
      .map(a => {
        const posted = parseFloat(a.CurrentBalance) || 0;
        const isBank = a.AccountType === 'Bank';
        // Tenta encontrar no BalanceSheet pelo nome exato
        const bsVal = bsMap[a.Name] || bsMap[a.FullyQualifiedName] || null;
        return {
          Id: a.Id,
          Name: a.Name,
          AccountType: a.AccountType,
          AccountSubType: a.AccountSubType,
          posted: isBank ? posted : -posted,
          bank: bsVal !== null ? (isBank ? bsVal : -bsVal) : null,
          updatedAt: a.MetaData.LastUpdatedTime
        };
      });

    res.json({ accounts: result, bsMap_debug: bsMap });
  } catch(e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
};
