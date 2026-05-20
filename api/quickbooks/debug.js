// /api/ai/debug.js — diagnóstico do endpoint de IA
// Acesse: https://portal-ksh.vercel.app/api/ai/debug
// Depois: https://portal-ksh.vercel.app/api/ai/debug?projetoId=1184

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  const out = [];
  const log = (k, v) => out.push(`<div><strong>${k}:</strong> <pre style="white-space:pre-wrap;word-break:break-all;background:#1a1d27;padding:8px;border-radius:6px;margin:4px 0">${typeof v === 'object' ? JSON.stringify(v, null, 2) : v}</pre></div>`);

  out.push('<html><head><title>AI Debug</title></head><body style="font-family:-apple-system,monospace;background:#0f1117;color:#e4e6eb;padding:24px;line-height:1.5">');
  out.push('<h1>🔍 AI Endpoint Diagnostic</h1>');

  // 1. Env var
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  const keyPreview = process.env.ANTHROPIC_API_KEY
    ? process.env.ANTHROPIC_API_KEY.substring(0, 15) + '...' + process.env.ANTHROPIC_API_KEY.substring(process.env.ANTHROPIC_API_KEY.length - 6)
    : 'NÃO CONFIGURADA';
  log('ANTHROPIC_API_KEY configurada?', hasKey ? '✅ SIM' : '❌ NÃO');
  log('Preview da key', keyPreview);
  log('Tamanho da key', process.env.ANTHROPIC_API_KEY?.length || 0);

  // 2. Tenta chamar a Anthropic API com prompt mínimo
  if (hasKey) {
    out.push('<h2>🤖 Teste de chamada Anthropic API</h2>');
    try {
      const t0 = Date.now();
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5',
          max_tokens: 50,
          messages: [{ role: 'user', content: 'Responda só "ok"' }]
        })
      });
      const txt = await r.text();
      log('HTTP status', r.status);
      log('Tempo (ms)', Date.now() - t0);
      log('Resposta (raw)', txt.substring(0, 1500));
      if (r.ok) {
        try {
          const j = JSON.parse(txt);
          log('Conteúdo do modelo', j.content?.[0]?.text || '(vazio)');
          log('Tokens', `in=${j.usage?.input_tokens} out=${j.usage?.output_tokens}`);
        } catch (e) {}
      }
    } catch (err) {
      log('❌ Exceção', err.message + '\n' + err.stack);
    }
  }

  // 3. Se passou projetoId, testa o pipeline inteiro
  if (req.query.projetoId) {
    out.push('<h2>🔗 Teste do pipeline completo</h2>');
    const projetoId = req.query.projetoId;
    log('projetoId', projetoId);

    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';

    // 3a. projeto-analise
    try {
      const r = await fetch(`${proto}://${host}/api/quickbooks/projeto-analise?customer=${projetoId}`);
      log('projeto-analise HTTP', r.status);
      const j = await r.json();
      log('projeto-analise (keys)', Object.keys(j).join(', '));
      log('projeto-analise.atual', j.atual);
      log('projeto-analise.benchmark', j.benchmark ? 'OK (objeto)' : j.benchmark);
    } catch (err) {
      log('❌ Erro projeto-analise', err.message);
    }

    // 3b. projeto-detalhe
    try {
      const r = await fetch(`${proto}://${host}/api/quickbooks/projeto-detalhe?customer=${projetoId}`);
      log('projeto-detalhe HTTP', r.status);
      const j = await r.json();
      log('projeto-detalhe (keys)', Object.keys(j).join(', '));
      log('projeto-detalhe.projeto', j.projeto);
    } catch (err) {
      log('❌ Erro projeto-detalhe', err.message);
    }
  } else {
    out.push('<h2>⚠️ Adicione <code>?projetoId=1184</code> na URL pra testar pipeline completo</h2>');
  }

  out.push('</body></html>');
  res.status(200).send(out.join(''));
};
