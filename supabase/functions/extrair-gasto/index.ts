// Supabase Edge Function: extrair-gasto
// Recebe a foto de uma nota/recibo (base64) e devolve fornecedor, data, valor e categoria sugerida via OpenAI (visao).
// A chave da OpenAI fica so aqui no servidor (variavel de ambiente), nunca no app.js.

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { imagem_base64, mime_type } = await req.json();
    if (!imagem_base64 || typeof imagem_base64 !== "string") {
      return json({ error: "Campo 'imagem_base64' obrigatorio" }, 400);
    }
    if (!OPENAI_API_KEY) {
      return json({ error: "OPENAI_API_KEY nao configurada no projeto" }, 500);
    }

    const mime = mime_type || "image/jpeg";
    const dataUrl = imagem_base64.startsWith("data:")
      ? imagem_base64
      : `data:${mime};base64,${imagem_base64}`;

    const hoje = new Date().toISOString().slice(0, 10);

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Voce extrai dados de fotos de notas fiscais, cupons e recibos de despesas de campo (combustivel, alimentacao, pedagio, material, hospedagem). " +
              "Responda SOMENTE com um JSON valido no formato: " +
              '{"fornecedor": string, "data": "YYYY-MM-DD" ou null, "valor": number, "quantidade": number, "categoria": "alimentacao"|"combustivel"|"pedagio"|"material"|"hospedagem"|"outro", "descricao": string}. ' +
              "O campo valor deve ser o valor TOTAL pago (soma de todos os itens + taxas), em numero (sem simbolo de moeda). " +
              "O campo quantidade e o numero total de itens/unidades distintos que aparecem na nota (conte as linhas de item, nao some quantidades de cada linha); use 1 se so houver um item ou nao der pra saber. " +
              "O campo descricao deve resumir o(s) item(ns): se houver apenas um item, use o nome dele; se houver mais de um item (mesmo que com o mesmo nome mas precos diferentes, ou itens diferentes), resuma como 'Nx <nome ou principais itens>' (ex: '2x CUP', '3x itens diversos') deixando claro que sao varios itens, nunca cite so um item como se fosse o total. " +
              `Se a data nao estiver visivel ou legivel, use null (nao invente; hoje e ${hoje} apenas de referencia, nao a use como a data do documento a menos que esteja escrita nele). ` +
              "Se algum campo nao puder ser identificado com confianca, deixe string vazia ou null. Nao adicione texto fora do JSON.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Extraia os dados desta nota/recibo." },
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
        temperature: 0,
        max_tokens: 300,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      return json({ error: data?.error?.message || "Erro ao chamar OpenAI" }, 500);
    }

    const conteudo = data.choices?.[0]?.message?.content?.trim() || "{}";
    let extraido: Record<string, unknown> = {};
    try {
      extraido = JSON.parse(conteudo);
    } catch {
      return json({ error: "Nao foi possivel interpretar a resposta da IA" }, 500);
    }

    const qtdNum = typeof extraido.quantidade === "number" ? extraido.quantidade : parseFloat(String(extraido.quantidade || "")) || 1;

    return json({
      fornecedor: extraido.fornecedor || "",
      data: extraido.data || null,
      valor: typeof extraido.valor === "number" ? extraido.valor : parseFloat(String(extraido.valor || "")) || null,
      quantidade: qtdNum > 0 ? qtdNum : 1,
      categoria: extraido.categoria || "outro",
      descricao: extraido.descricao || "",
    });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
