// Supabase Edge Function: extrair-documento
// Recebe a foto de um documento (licenca, seguro, alvara, manual, etc.) em base64
// e devolve titulo, categoria, orgao emissor, numero, data de emissao e validade via OpenAI (visao).
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
              "Voce extrai dados de fotos de documentos administrativos de uma empresa de seguranca eletronica/automacao (licencas, apolices de seguro, alvaras, contratos, manuais tecnicos, certificados, registros). " +
              "Responda SOMENTE com um JSON valido no formato: " +
              '{"titulo": string, "categoria": "licenca"|"seguro"|"alvara"|"manual"|"tecnico"|"registro"|"outro", "orgao_emissor": string, "numero_documento": string, "data_emissao": "YYYY-MM-DD" ou null, "data_validade": "YYYY-MM-DD" ou null}. ' +
              "O campo titulo deve ser um nome curto e claro do documento (ex: 'Alvara de funcionamento', 'Apolice frota de veiculos', 'Manual camera Intelbras VIP 3230'). " +
              "O campo categoria: use 'licenca' para licencas e autorizacoes de orgaos publicos, 'seguro' para apolices e certificados de seguro, 'alvara' para alvaras municipais/estaduais, 'manual' para manuais tecnicos de produtos/equipamentos, 'tecnico' para laudos, certificados tecnicos ou ARTs, 'registro' para contratos sociais, registros da empresa ou documentos societarios, e 'outro' se nao se encaixar. " +
              "O campo orgao_emissor e quem emitiu o documento (prefeitura, seguradora, cartorio, fabricante, orgao de classe etc). " +
              "O campo numero_documento e o numero/codigo do documento se houver (numero da apolice, numero do alvara, etc), string vazia se nao houver. " +
              "Datas: se nao estiverem visiveis ou legiveis, use null (nao invente). Muitos documentos nao tem data de validade (ex: manuais, alguns registros) — nesse caso data_validade deve ser null. " +
              "Se algum campo nao puder ser identificado com confianca, deixe string vazia ou null. Nao adicione texto fora do JSON.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Extraia os dados deste documento." },
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

    const categoriasValidas = ["licenca", "seguro", "alvara", "manual", "tecnico", "registro", "outro"];
    const categoria = categoriasValidas.includes(String(extraido.categoria)) ? String(extraido.categoria) : "outro";

    return json({
      titulo: extraido.titulo || "",
      categoria,
      orgao_emissor: extraido.orgao_emissor || "",
      numero_documento: extraido.numero_documento || "",
      data_emissao: extraido.data_emissao || null,
      data_validade: extraido.data_validade || null,
    });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
