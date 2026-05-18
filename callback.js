// /api/quickbooks/callback.js
// Recebe o codigo de autorizacao da Intuit, troca por access_token + refresh_token, salva no Supabase.

const SUPABASE_URL = 'https://ayhijjbvvsioxpdsrouq.supabase.co';
const REDIRECT_URI = 'https://portal-ksh.vercel.app/api/quickbooks/callback';

export default async function handler(req, res) {
  const { code, realmId, error, error_description } = req.query;

  if (error) {
    return res.redirect(302, '/financeiro.html?qbo_error=' + encodeURIComponent(error_description || error));
  }
  if (!code || !realmId) {
    return res.status(400).send('Parametros faltando (code ou realmId)');
  }

  try {
    // 1. Troca code -> tokens
    const basicAuth = Buffer.from(process.env.QBO_CLIENT_ID + ':' + process.env.QBO_CLIENT_SECRET).toString('base64');
    const tokRes = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + basicAuth
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }).toString()
    });

    if (!tokRes.ok) {
      const errText = await tokRes.text();
      console.error('Erro ao trocar code:', errText);
      return res.redirect(302, '/financeiro.html?qbo_error=' + encodeURIComponent('Falha na troca de token: ' + errText));
    }

    const tokens = await tokRes.json();
    const now = Date.now();
    const payload = {
      realm_id: realmId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(now + (tokens.expires_in || 3600) * 1000).toISOString(),
      refresh_expires_at: new Date(now + (tokens.x_refresh_token_expires_in || 8726400) * 1000).toISOString(),
      updated_at: new Date().toISOString()
    };

    // 2. Salva no Supabase (upsert por realm_id)
    const sbRes = await fetch(SUPABASE_URL + '/rest/v1/qbo_tokens?on_conflict=realm_id', {
      method: 'POST',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify(payload)
    });

    if (!sbRes.ok) {
      const errText = await sbRes.text();
      console.error('Erro ao salvar no Supabase:', errText);
      return res.redirect(302, '/financeiro.html?qbo_error=' + encodeURIComponent('Falha ao salvar token: ' + errText));
    }

    // 3. Sucesso → volta pra Financeiro
    res.redirect(302, '/financeiro.html?qbo_connected=1');
  } catch (e) {
    console.error('Callback error:', e);
    res.redirect(302, '/financeiro.html?qbo_error=' + encodeURIComponent(e.message));
  }
}
