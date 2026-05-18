// /api/quickbooks/connect.js
// Inicia o OAuth com QuickBooks: redireciona o usuario pra Intuit autorizar.

module.exports = function handler(req, res) {
  const clientId = process.env.QBO_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('QBO_CLIENT_ID nao configurado no Vercel');
  }

  const redirectUri = 'https://portal-ksh.vercel.app/api/quickbooks/callback';
  const scope = 'com.intuit.quickbooks.accounting';
  const state = Math.random().toString(36).substring(2, 15);

  const authUrl = 'https://appcenter.intuit.com/connect/oauth2'
    + '?client_id=' + encodeURIComponent(clientId)
    + '&response_type=code'
    + '&scope=' + encodeURIComponent(scope)
    + '&redirect_uri=' + encodeURIComponent(redirectUri)
    + '&state=' + state;

  res.redirect(302, authUrl);
};
