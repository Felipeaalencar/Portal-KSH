// /api/ai/analise-projeto.js
//
// Recebe dados de UM projeto + benchmark (já calculado pelo projeto-analise.js)
// e pede ao Claude pra gerar insights em 3 personas: CFO, Operações, Smart Home.
//
// Resposta estruturada em JSON pra renderização determinística no frontend.
//
// POST body: { projetoId }   (busca os dados internamente do projeto-analise)
// Resposta: { cfo: [...], operacoes: [...], smartHome: [...], _meta: {...} }

const MODEL = 'claude-haiku-4-5';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const projetoId = body?.projetoId;
    if (!projetoId) return res.status(400).json({ error: 'projetoId obrigatório' });

    // 1) Busca os dados do projeto + benchmark via endpoint local
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const [analiseRes, detalheRes] = await Promise.all([
      fetch(`${proto}://${host}/api/quickbooks/projeto-analise?customer=${encodeURIComponent(projetoId)}`),
      fetch(`${proto}://${host}/api/quickbooks/projeto-detalhe?customer=${encodeURIComponent(projetoId)}`)
    ]);
    if (!analiseRes.ok) throw new Error('Falha ao buscar análise');
    if (!detalheRes.ok) throw new Error('Falha ao buscar detalhe');
    const analise = await analiseRes.json();
    const detalhe = await detalheRes.json();

    // 2) Monta o contexto pra IA (compacto e específico)
    const contexto = montarContexto(analise, detalhe);

    // 3) Chama Claude API
    const t0 = Date.now();
    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: contexto }]
      })
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error('Claude API error:', aiRes.status, errText);
      return res.status(500).json({ error: `Claude API ${aiRes.status}: ${errText.substring(0, 200)}` });
    }

    const aiData = await aiRes.json();
    const tempoAI = Date.now() - t0;

    // 4) Extrai e parseia o JSON da resposta
    const textoResposta = aiData.content?.[0]?.text || '';
    const parsed = extrairJSON(textoResposta);

    if (!parsed) {
      console.error('Resposta não parseável:', textoResposta);
      return res.status(500).json({ error: 'Resposta da IA não pôde ser interpretada', raw: textoResposta.substring(0, 500) });
    }

    return res.status(200).json({
      ...parsed,
      _meta: {
        model: MODEL,
        tempoMs: tempoAI,
        inputTokens: aiData.usage?.input_tokens,
        outputTokens: aiData.usage?.output_tokens
      }
    });
  } catch (err) {
    console.error('[ai/analise-projeto] error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ─── PROMPT SYSTEM ───
const SYSTEM_PROMPT = `Você é um analista financeiro/operacional especializado em empresas de instalação de smart home (NAICS 238210) na Flórida, USA. Você trabalha para a Kilian Smart Homes LLC.

Sua tarefa: analisar dados de UM projeto específico e gerar insights acionáveis em 3 perspectivas distintas (CFO, Operações, Expert Smart Home).

REGRAS CRÍTICAS:
1. SEMPRE responda APENAS com JSON válido, sem markdown, sem texto fora do JSON
2. Cada insight deve ter título curto + diagnóstico (1-2 frases) + ação concreta
3. Severidade: "critico" (vermelho), "atencao" (amber), "ok" (verde), "info" (azul)
4. Seja DIRETO e ESPECÍFICO: use números do projeto, não generalidades
5. Pra Smart Home: considere mercado FL ($75-120/h efetivo, markup produto 80-150%, projetos típicos $8-25k)
6. Português brasileiro, tom profissional mas direto

FORMATO de resposta (estritamente este JSON, sem nada antes/depois):
{
  "cfo": [
    { "titulo": "...", "severidade": "critico|atencao|ok|info", "diagnostico": "...", "acao": "..." }
  ],
  "operacoes": [
    { "titulo": "...", "severidade": "...", "diagnostico": "...", "acao": "..." }
  ],
  "smartHome": [
    { "titulo": "...", "severidade": "...", "diagnostico": "...", "acao": "..." }
  ]
}

Cada persona deve ter 2-3 insights (não mais). Foque nos mais relevantes pro contexto do projeto.`;

function montarContexto(analise, detalhe) {
  const a = analise.atual || {};
  const b = analise.benchmark || {};
  const c = analise.composicao || {};
  const mix = analise.mixEquipe || [];
  const proj = detalhe.projeto || {};

  const fmtPct = (v) => v === null || v === undefined || isNaN(v) ? '—' : (v >= 0 ? '+' : '') + v.toFixed(1) + '%';
  const fmtPp = (v) => v === null || v === undefined || isNaN(v) ? '—' : (v >= 0 ? '+' : '') + v.toFixed(1) + 'pp';
  const fmtM = (v) => v === null || v === undefined || isNaN(v) ? '—' : '$' + Math.round(v).toLocaleString('en-US');

  let txt = `# Projeto: ${a.nome || '?'}
Cliente: ${proj.cliente || '—'} · ID QBO: ${proj.qboProjectId || '?'}
Criado: ${proj.criado || '—'} · Status: ${proj.ativo ? 'Ativo' : 'Inativo'}

## Números do projeto
- Receita: ${fmtM(a.receita)}
- Custo total: ${fmtM(a.custo)}  (P&L: ${fmtM(c.cogs + c.expenses)} + Mão de obra: ${fmtM(c.maoObra)})
- Lucro: ${fmtM(a.lucro)}
- Margem: ${a.margem === null ? '—' : a.margem.toFixed(1) + '%'}
- Horas totais: ${a.horas?.toFixed(1) || 0}h

## Composição dos custos
- COGS (produtos): ${fmtM(c.cogs)} (${c.total > 0 ? ((c.cogs/c.total)*100).toFixed(0) : 0}%)
- Expenses (despesas): ${fmtM(c.expenses)} (${c.total > 0 ? ((c.expenses/c.total)*100).toFixed(0) : 0}%)
- Mão de obra: ${fmtM(c.maoObra)} (${c.total > 0 ? ((c.maoObra/c.total)*100).toFixed(0) : 0}%)

## Mix de equipe (${mix.length} funcionários)
${mix.map(e => `- ${e.name}: ${e.horas.toFixed(1)}h · ${fmtM(e.total)} · rate $${e.rateMedio.toFixed(0)}/h · ${e.pctHoras.toFixed(0)}% das horas`).join('\n') || '(nenhum)'}

## Benchmark vs. ${b.receita?.n || 0} outros projetos da empresa
- Receita: ${fmtPct(b.receita?.diffPct)} vs média ${fmtM(b.receita?.media)}
- Margem: ${fmtPp(b.margem?.diffPp)} vs média ${b.margem?.media?.toFixed(1)}%
- Horas: ${fmtPct(b.horas?.diffPct)} vs média ${b.horas?.media?.toFixed(0)}h
- $/hora efetivo: ${b.ratePorHora?.atual ? '$' + b.ratePorHora.atual.toFixed(0) : '—'} (média: $${b.ratePorHora?.media?.toFixed(0) || 0}/h)

Gere agora a análise no formato JSON especificado.`;

  return txt;
}

// Extrai JSON mesmo se vier dentro de bloco markdown
function extrairJSON(texto) {
  if (!texto) return null;
  // Tenta direto
  try { return JSON.parse(texto); } catch (e) {}
  // Tenta extrair de ```json ... ```
  const m1 = texto.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
  if (m1) { try { return JSON.parse(m1[1]); } catch (e) {} }
  // Tenta extrair do primeiro { até o último }
  const start = texto.indexOf('{');
  const end = texto.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try { return JSON.parse(texto.substring(start, end+1)); } catch (e) {}
  }
  return null;
}
