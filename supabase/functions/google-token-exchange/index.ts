// Troca o "code" do OAuth (authorization code flow) por access_token + refresh_token.
// O refresh_token é salvo no banco (via service role) e nunca volta pro navegador —
// só o access_token de curta duração é devolvido ao app.

const CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const REDIRECT_URI = Deno.env.get("GOOGLE_REDIRECT_URI");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
    const { code } = await req.json();
    if (!code) return json({ error: "code obrigatório" }, 400);
    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
      return json({ error: "GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REDIRECT_URI não configurados" }, 500);
    }

    const r = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });
    const data = await r.json();
    if (!r.ok) {
      return json({ error: data.error_description || data.error || "Falha ao trocar código com o Google" }, 500);
    }

    if (data.refresh_token && SUPABASE_URL && SERVICE_ROLE_KEY) {
      await fetch(`${SUPABASE_URL}/rest/v1/google_integracao`, {
        method: "POST",
        headers: {
          "apikey": SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates",
        },
        body: JSON.stringify({ id: 1, refresh_token: data.refresh_token, updated_at: new Date().toISOString() }),
      });
    }

    return json({
      access_token: data.access_token,
      expires_in: data.expires_in,
      has_refresh: !!data.refresh_token,
    });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
