// Usa o refresh_token salvo (obtido uma única vez no primeiro "Conectar agora")
// para gerar um novo access_token do Google Drive sem precisar de nova autorização do usuário.

const CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
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
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return json({ error: "Config do Supabase ausente na function" }, 500);
    }
    const r0 = await fetch(`${SUPABASE_URL}/rest/v1/google_integracao?id=eq.1&select=refresh_token`, {
      headers: { "apikey": SERVICE_ROLE_KEY, "Authorization": `Bearer ${SERVICE_ROLE_KEY}` },
    });
    const rows = await r0.json();
    const refresh_token = rows?.[0]?.refresh_token;
    if (!refresh_token) {
      return json({ error: "Google Drive nunca foi conectado (sem refresh_token salvo). Clique em Conectar agora." }, 400);
    }
    if (!CLIENT_ID || !CLIENT_SECRET) {
      return json({ error: "GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET não configurados" }, 500);
    }

    const r = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
      }),
    });
    const data = await r.json();
    if (!r.ok) {
      return json({ error: data.error_description || data.error || "Falha ao renovar token do Google" }, 500);
    }

    return json({ access_token: data.access_token, expires_in: data.expires_in });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
