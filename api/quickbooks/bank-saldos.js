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
    const OCULTAS = ['7013'];

    // 1. Contas
    const qr = await fetch(base + "/query?query=" + encodeURIComponent("select * from Account where AccountType in ('Bank','Credit Card') and Active = true") + "&minorversion=70", { headers: H });
    const qd = await qr.json();
    const accounts = ((qd.QueryResponse && qd.QueryResponse.Account) || [])
      .filter(a => !OCULTAS.some(k => (a.Name||'').includes(k)))
      .filter(a => a.MetaData && (Date.now() - new Date(a.MetaData.LastUpdatedTime)) < 180*24*60*60*1000);

    // 2. Para cada conta busca transações não categorizadas (For Review)
    // Essas são Purchases e Deposits que chegaram do feed mas ainda não foram revisadas
    // No QBO aparecem como transações com AccountRef mas sem Category
    const pendingMap = {};
    await Promise.all(accounts.map(async acc => {
      try {
        // Busca Purchase não categorizadas desta conta
        const q1 = `select * from Purchase where AccountRef = '${acc.Id}' and DocNumber = 'AUTO'`;
        const r1 = await fetch(base + "/query?query=" + encodeURIComponent(q1) + "&minorversion=70", { headers: H });
        const d1 = await r1.json();

        // Busca Deposit não categorizados
        const q2 = `select * from Deposit where DepositToAccountRef = '${acc.Id}'`;
        const r2 = await fetch(base + "/query?query=" + encodeURIComponent(q2) + "&minorversion=70", { headers: H });
        const d2 = await r2.json();

        // Busca JournalEntry desta conta
        const q3 = `select * from JournalEntry where DocNumber = 'AUTO'`;
        const r3 = await fetch(base + "/query?query=" + encodeURIComponent(q3) + "&minorversion=70", { headers: H });
        const d3 = await r3.json();

        pendingMap[acc.Id] = {
          purchases: (d1.QueryResponse && d1.QueryResponse.Purchase) || [],
          deposits: (d2.QueryResponse && d2.QueryResponse.Deposit) || [],
          journals: (d3.QueryResponse && d3.QueryResponse.JournalEntry) || [],
          purchaseTotal: ((d1.QueryResponse && d1.QueryResponse.Purchase) || []).reduce((s,t) => s + (parseFloat(t.TotalAmt)||0), 0),
          depositTotal: ((d2.QueryResponse && d2.QueryResponse.Deposit) || []).reduce((s,t) => s + (parseFloat(t.TotalAmt)||0), 0),
        };
      } catch(e) {
        pendingMap[acc.Id] = { error: e.message };
      }
    }));

    res.json({
      accounts: accounts.map(a => ({
        Id: a.Id,
        Name: a.Name,
        CurrentBalance: a.CurrentBalance,
        pending: pendingMap[a.Id]
      }))
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
