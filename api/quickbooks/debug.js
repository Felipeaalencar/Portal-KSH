// /api/quickbooks/debug.js
// Endpoint TEMPORARIO de debug. Mostra o que vai pro Intuit.
// APAGAR depois que a integracao estiver funcionando.

module.exports = function handler(req, res) {
  const clientId = process.env.QBO_CLIENT_ID || null;
  const clientSecret = process.env.QBO_CLIENT_SECRET || null;
  const supabaseUrl = process.env.SUPABASE_URL || 'https://ayhijjbvvsioxpdsrouq.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || null;

  // Mascara secrets mas mostra COMPRIMENTO e PRIMEIRO+ULTIMO chars
  function mask(value) {
    if (!value) return null;
    if (value.length < 8) return '*** muito curto ***';
    return value.substring(0, 6) + '...' + value.substring(value.length - 4)
      + ' (len=' + value.length + ')';
  }

  const redirectUri = 'https://portal-ksh.vercel.app/api/quickbooks/callback';
  const scope = 'com.intuit.quickbooks.accounting';
  const state = 'DEBUG_STATE_123';

  const authUrl = clientId
    ? 'https://appcenter.intuit.com/connect/oauth2'
        + '?client_id=' + encodeURIComponent(clientId)
        + '&response_type=code'
        + '&scope=' + encodeURIComponent(scope)
        + '&redirect_uri=' + encodeURIComponent(redirectUri)
        + '&state=' + state
    : null;

  // Detecta whitespace/lixo no Client ID
  const clientIdRaw = clientId || '';
  const clientIdInfo = {
    length: clientIdRaw.length,
    has_leading_space: clientIdRaw !== clientIdRaw.trimStart(),
    has_trailing_space: clientIdRaw !== clientIdRaw.trimEnd(),
    starts_with: clientIdRaw.substring(0, 6),
    ends_with: clientIdRaw.substring(clientIdRaw.length - 6),
    char_codes_first_3: [
      clientIdRaw.charCodeAt(0),
      clientIdRaw.charCodeAt(1),
      clientIdRaw.charCodeAt(2)
    ],
    char_codes_last_3: [
      clientIdRaw.charCodeAt(clientIdRaw.length - 3),
      clientIdRaw.charCodeAt(clientIdRaw.length - 2),
      clientIdRaw.charCodeAt(clientIdRaw.length - 1)
    ]
  };

  res.status(200).json({
    deploy_timestamp: new Date().toISOString(),
    env_vars: {
      QBO_CLIENT_ID: mask(clientId),
      QBO_CLIENT_ID_PRESENT: !!clientId,
      QBO_CLIENT_SECRET: mask(clientSecret),
      QBO_CLIENT_SECRET_PRESENT: !!clientSecret,
      SUPABASE_URL: supabaseUrl,
      SUPABASE_SERVICE_ROLE_KEY: mask(supabaseKey),
      SUPABASE_SERVICE_ROLE_KEY_PRESENT: !!supabaseKey
    },
    client_id_inspection: clientIdInfo,
    oauth_url_that_would_be_sent: authUrl,
    redirect_uri_configured: redirectUri,
    scope: scope,
    note: 'Confere se QBO_CLIENT_ID bate EXATAMENTE com o Client ID no Intuit Developer Portal (Development ou Production conforme o caso). Char codes devem ser todos numeros (48-57) ou letras (65-90, 97-122). Espaco eh 32 — se aparecer, tem whitespace.'
  });
};
