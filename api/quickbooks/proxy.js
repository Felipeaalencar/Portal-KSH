// /api/quickbooks/proxy.js
// Proxy autenticado pra API do QuickBooks. Renova access_token se estiver pra vencer.
//
// IMPORTANTE: a URL base muda conforme o tipo de conta conectada:
//   - Sandbox companies (Development credentials): sandbox-quickbooks.api.intuit.com
//   - Production companies: quickbooks.api.intuit.com
// Controlado pela env var QBO_ENVIRONMENT (sandbox|production). Default: sandbox.

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
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + basicAuth
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: tok.refresh_token
      }).toString()
    });

    if (!refreshRes.ok) {
      const errText = await refreshRes.text();
      throw new Error('REFRESH_FAILED: ' + errText);
    }

    const newTok = await refreshRes.json();
    const now = Date.now();
    const updatePayload = {
      access_token: newTok.access_token,
      refresh_token: newTok.refresh_token || tok.refresh_token,
      expires_at: new Date(now + (newTok.expires_in || 3600) * 1000).toISOString(),
      updated_at: new Date().toISOString()
    };

    await fetch(SUPABASE_URL + '/rest/v1/qbo_tokens?id=eq.' + tok.id, {
      method: 'PATCH',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(updatePayload)
    });

    return { accessToken: newTok.access_token, realmId: tok.realm_id, companyName: tok.company_name };
  }

  return { accessToken: tok.access_token, realmId: tok.realm_id, companyName: tok.company_name };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    const { endpoint, ...rest } = req.query;

    if (endpoint === '_status') {
      try {
        const t = await getValidToken();
        return res.json({
          connected: true,
          realm_id: t.realmId,
          company_name: t.companyName,
          environment: (process.env.QBO_ENVIRONMENT === 'production') ? 'production' : 'sandbox',
          api_base: QBO_BASE
        });
      } catch (e) {
        if (e.message === 'NOT_CONNECTED') return res.json({ connected: false });
        return res.status(500).json({ error: e.message });
      }
    }

    if (!endpoint) {
      return res.status(400).json({ error: 'parametro "endpoint" obrigatorio' });
    }

    const { accessToken, realmId } = await getValidToken();

    let url = QBO_BASE + '/v3/company/' + realmId + '/' + endpoint;
    const extraParams = new URLSearchParams();
    for (const [k, v] of Object.entries(rest)) {
      if (v != null && v !== '') extraParams.append(k, String(v));
    }
    if (extraParams.toString()) {
      url += (url.includes('?') ? '&' : '?') + extraParams.toString();
    }

    const qboRes = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
      }
    });

    const text = await qboRes.text();
    let data;
    try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }

    res.status(qboRes.status).json(data);
  } catch (e) {
    if (e.message === 'NOT_CONNECTED') {
      return res.status(401).json({ error: 'not_connected' });
    }
    console.error('Proxy error:', e);
    res.status(500).json({ error: e.message });
  }
};
