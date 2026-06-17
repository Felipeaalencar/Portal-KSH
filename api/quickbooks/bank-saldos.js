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
  if (Date.now() > new Date(tok.expires_at).getTime() - 5*60*1000) {
    const ba = Buffer.from(process.env.QBO_CLIENT_ID + ':' + process.env.QBO_CLIENT_SECRET).toString('base64');
    const ref = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Authorization': 'Basic ' + ba },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: tok.refresh_token }).toString()
    });
    if (!ref.ok) throw new Error('REFRESH_FAILED');
    const nt = await ref.json();
    await fetch(SUPABASE_URL + '/rest/v1/qbo_tokens?id=eq.' + tok.id, {
      method: 'PATCH',
      headers: { 'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY, 'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ access_token: nt.access_token, refresh_token: nt.refresh_token || tok.refresh_token, expires_at: new Date(Date.now()+(nt.expires_in||3600)*1000).toISOString(), updated_at: new Date().toISOString() })
    });
    return { accessToken: nt.access_token, realmId: tok.realm_id };
  }
  return { accessToken: tok.access_token, realmId: tok.realm_id };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const { accessToken, realmId } = await getValidToken();
    const H = { 'Authorization': 'Bearer ' + accessToken, 'Accept': 'application/json' };
    const base = QBO_BASE + '/v3/company/' + realmId;

    // Busca conta individual ID 32 (Checking KSH 6719) com TODOS os campos
    // Retorna o objeto Account completo para inspecionar
    const r32 = await fetch(base + '/account/32', { headers: H });
    const d32 = await r32.json();

    // Busca conta individual ID 148 (CHASE Credit Card)
    const r148 = await fetch(base + '/account/148', { headers: H });
    const d148 = await r148.json();

    // Busca conta individual ID 54 (CapitalOne)
    const r54 = await fetch(base + '/account/54', { headers: H });
    const d54 = await r54.json();

    res.json({
      checking_6719: d32,
      chase_0526: d148,
      capitalOne_0567: d54
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
