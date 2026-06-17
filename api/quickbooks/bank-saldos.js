// /api/quickbooks/bank-saldos.js
// Bank = Posted + transações "For Review" (não categorizadas ainda)

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

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const { accessToken, realmId } = await getValidToken();
    const H = { 'Authorization': 'Bearer ' + accessToken, 'Accept': 'application/json' };
    const base = QBO_BASE + '/v3/company/' + realmId;
    const OCULTAS = ['7013'];

    // 1. Contas (Posted)
    const qr = await fetch(base + "/query?query=" + encodeURIComponent("select * from Account where AccountType in ('Bank','Credit Card') and Active = true") + "&minorversion=70", { headers: H });
    const qd = await qr.json();
    const accounts = ((qd.QueryResponse && qd.QueryResponse.Account) || [])
      .filter(a => !OCULTAS.some(k => (a.Name||'').includes(k)))
      .filter(a => a.MetaData && a.MetaData.LastUpdatedTime && (Date.now() - new Date(a.MetaData.LastUpdatedTime)) < 180*24*60*60*1000);

    // 2. Para cada conta, busca BankTransaction (transações importadas ainda não revisadas)
    // Essas transações existem como BankTransaction no QBO
    const bankTxMap = {};
    await Promise.all(accounts.map(async acc => {
      try {
        // Busca transações bancárias não revisadas desta conta
        const q = `select * from BankTransaction where AccountRef = '${acc.Id}'`;
        const tr = await fetch(base + "/query?query=" + encodeURIComponent(q) + "&minorversion=70", { headers: H });
        const td = await tr.json();
        const txns = (td.QueryResponse && (td.QueryResponse.BankTransaction || td.QueryResponse.Purchase || [])) || [];
        // Soma os valores pendentes
        const pending = txns.reduce((sum, t) => sum + (parseFloat(t.Amount) || 0), 0);
        bankTxMap[acc.Id] = { count: txns.length, pending, raw: td.QueryResponse };
      } catch(e) {
        bankTxMap[acc.Id] = { error: e.message };
      }
    }));

    // 3. Tenta também o endpoint de BankFeedTransaction
    const bankFeedMap = {};
    await Promise.all(accounts.map(async acc => {
      try {
        const fr = await fetch(base + `/bankfeedtransaction?accountId=${acc.Id}&minorversion=70`, { headers: H });
        const fd = await fr.json();
        bankFeedMap[acc.Id] = fd;
      } catch(e) {
        bankFeedMap[acc.Id] = { error: e.message };
      }
    }));

    const result = accounts.map(a => {
      const isBank = a.AccountType === 'Bank';
      const posted = parseFloat(a.CurrentBalance) || 0;
      return {
        Id: a.Id,
        Name: a.Name,
        AccountType: a.AccountType,
        posted: isBank ? posted : -posted,
        bankTx: bankTxMap[a.Id],
        bankFeed: bankFeedMap[a.Id],
        updatedAt: a.MetaData.LastUpdatedTime
      };
    });

    res.json({ accounts: result });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
