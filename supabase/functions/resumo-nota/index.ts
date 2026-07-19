// Supabase Edge Function: resumo-nota
// Recebe uma anotação técnica bruta e devolve uma versão reescrita/aprimorada via OpenAI.
// A chave da OpenAI fica só aqui no servidor (variável de ambiente), nunca no app.js.

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { texto } = await req.json();
    if (!texto || typeof texto !== "string" || !texto.trim()) {
      return new Response(JSON.stringify({ error: "Campo 'texto' obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY não configurada no projeto" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Você reescreve anotações técnicas de campo (instalação/manutenção de automação residencial e climatização) de forma clara, objetiva e profissional, em português do Brasil. Mantenha todos os fatos, peças, medidas e ações mencionadas pelo técnico — não invente nada, não adicione saudações nem comentários. Responda apenas com o texto reescrito, sem aspas.",
          },
          { role: "user", content: texto },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      return new Response(
        JSON.stringify({ error: data?.error?.message || "Erro ao chamar OpenAI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const resumo = data.choices?.[0]?.message?.content?.trim() || texto;
    return new Response(JSON.stringify({ resumo }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
