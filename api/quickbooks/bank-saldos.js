// /api/quickbooks/bank-saldos.js
// Retorna saldos Bank + Posted de todas as contas bancárias e cartões
// BankBalance = saldo real do banco (feed bancário)
// CurrentBalance = saldo postado/categorizado no QBO

const SUPABASE_URL = 'https://ayhijjbvvsioxpdsrouq.supabase.co';

const QBO_BASE = (process.env.QBO_ENVIRONMENT === 'production')
  ? 'https://quickbooks.api.intuit.com'
  : 'https://sandbox-quickbooks.api.intuit.com';

async function getValidToken() {
  const r = await fetch(SUPABASE_URL + '/rest/v1/qbo_tokens?select=*&order=updated_at.desc&limit=1', {
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  });
  if (!r.ok) throw new Error('SUPABASE_READ_FAILED: ' + r.status);
  const arr = await r.json();
  if (!arr.length) throw new Error('NOT_CONNECTED');
  const tok = arr[0];
  const expMs = new Date(tok.expires_at).getTime();
  const FIVE_MIN = 5 * 60 * 1000;
  if (Date.now() > expMs - FIVE_MIN) {
    const basicAuth = Buffer.from(process.env.QBO_CLIENT_ID + ':' + process.env.QBO_CLIENT_SECRET).toString('base64');
    const refreshRes = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Authorization': 'Basic ' + basicAuth },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: tok.refresh_token }).toString()
    });
    if (!refreshRes.ok) throw new Error('REFRESH_FAILED');
    const newTok = await refreshRes.json();
    const now = Date.now();
    await fetch(SUPABASE_URL + '/rest/v1/qbo_tokens?id=eq.' + tok.id, {
      method: 'PATCH',
      headers: { 'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY, 'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ access_token: newTok.access_token, refresh_token: newTok.refresh_token || tok.refresh_token, expires_at: new Date(now + (newTok.expires_in || 3600) * 1000).toISOString(), updated_at: new Date().toISOString() })
    });
    return { accessToken: newTok.access_token, realmId: tok.realm_id };
  }
  return { accessToken: tok.access_token, realmId: tok.realm_id };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const { accessToken, realmId } = await getValidToken();

    // Busca todas as contas bancárias e cartões com SELECT *
    // minorversion=70 retorna todos os campos disponíveis incluindo BankBalance
    const query = "select * from Account where AccountType in ('Bank','Credit Card') and Active = true";
    const url = QBO_BASE + '/v3/company/' + realmId + '/query?query=' + encodeURIComponent(query) + '&minorversion=70';

    const r = await fetch(url, {
      headers: { 'Authorization': 'Bearer ' + accessToken, 'Accept': 'application/json' }
    });

    const data = await r.json();
    const accounts = (data.QueryResponse && data.QueryResponse.Account) || [];

    // Retorna campos relevantes + JSON bruto de cada conta para debug
    const result = accounts.map(a => ({
      Id: a.Id,
      Name: a.Name,
      AccountType: a.AccountType,
      CurrentBalance: a.CurrentBalance,
      BankBalance: a.BankBalance,
      // Todos os outros campos numéricos disponíveis
      _allNumericFields: Object.fromEntries(
        Object.entries(a).filter(([k,v]) => typeof v === 'number' || (typeof v === 'string' && !isNaN(parseFloat(v)) && k !== 'Id'))
      ),
      _raw: a
    }));

    res.json({ accounts: result, total: result.length });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
