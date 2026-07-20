// Supabase Edge Function: sincronizar-gmail
// Busca emails com a label "Tarefas" na caixa do Gmail conectada (a mesma conta do Drive)
// e cria uma tarefa no Portal pra cada um, removendo a label depois pra nao duplicar.

const CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const LABEL_NOME = "Tarefas";

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

async function renovarAccessToken(): Promise<string> {
  const r0 = await fetch(`${SUPABASE_URL}/rest/v1/google_integracao?id=eq.1&select=refresh_token`, {
    headers: { apikey: SERVICE_ROLE_KEY!, Authorization: `Bearer ${SERVICE_ROLE_KEY}` },
  });
  const rows = await r0.json();
  const refresh_token = rows?.[0]?.refresh_token;
  if (!refresh_token) throw new Error("Google nunca foi conectado (sem refresh_token salvo)");

  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token,
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      grant_type: "refresh_token",
    }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error_description || data.error || "Falha ao renovar token do Google");
  return data.access_token;
}

function header(headers: any[], nome: string): string {
  const h = headers?.find((x: any) => x.name?.toLowerCase() === nome.toLowerCase());
  return h?.value || "";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ error: "Config do Supabase ausente" }, 500);

    const accessToken = await renovarAccessToken();

    const rLabels = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/labels", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const labelsData = await rLabels.json();
    if (!rLabels.ok) throw new Error(labelsData.error?.message || "Falha ao ler labels do Gmail");
    const label = (labelsData.labels || []).find((l: any) => l.name === LABEL_NOME);
    if (!label) {
      return json({ error: `Label "${LABEL_NOME}" nao existe no Gmail. Crie essa label no Gmail e aplique nos emails que devem virar tarefa.` }, 400);
    }

    const rMsgs = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=${label.id}&maxResults=20`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const msgsData = await rMsgs.json();
    if (!rMsgs.ok) throw new Error(msgsData.error?.message || "Falha ao listar mensagens do Gmail");
    const mensagens = msgsData.messages || [];

    let criadas = 0;
    for (const m of mensagens) {
      const rDet = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const det = await rDet.json();
      if (!rDet.ok) continue;
      const assunto = header(det.payload?.headers, "Subject") || "(sem assunto)";
      const remetente = header(det.payload?.headers, "From") || "";
      const snippet = det.snippet || "";

      await fetch(`${SUPABASE_URL}/rest/v1/tarefas`, {
        method: "POST",
        headers: {
          apikey: SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          titulo: assunto,
          descricao: (remetente ? `De: ${remetente}\n` : "") + snippet,
          status: "media",
          ordem: 9999,
          origem: "email",
          criado_por: "Gmail",
        }),
      });

      await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}/modify`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ removeLabelIds: [label.id] }),
      });

      criadas++;
    }

    return json({ criadas });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
