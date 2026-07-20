// Supabase Edge Function: criar-evento-agenda
// Cria, atualiza ou exclui um evento no Google Calendar da conta conectada (a mesma do Drive),
// usando o refresh_token ja salvo em google_integracao.
// acao: "criar" (padrao), "atualizar" (precisa event_id) ou "excluir" (precisa event_id).

const CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const TIMEZONE = "America/New_York";

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

function somaUmaHora(hora: string): string {
  const [h, m] = hora.split(":").map(Number);
  const total = (h * 60 + m + 60) % (24 * 60);
  const hh = String(Math.floor(total / 60)).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ error: "Config do Supabase ausente" }, 500);

    const { acao, event_id, titulo, descricao, data, hora, hora_fim, tecnico_nome } = await req.json();
    const accessToken = await renovarAccessToken();

    if (acao === "excluir") {
      if (!event_id) return json({ error: "event_id obrigatorio" }, 400);
      const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${event_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!r.ok && r.status !== 410 && r.status !== 404) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error?.message || "Falha ao excluir evento");
      }
      return json({ ok: true });
    }

    if (!data) return json({ error: "Campo 'data' obrigatorio" }, 400);

    const eventBody: Record<string, unknown> = {
      summary: titulo + (tecnico_nome ? " - " + tecnico_nome : ""),
      description: descricao || "",
    };

    if (hora) {
      const fim = hora_fim || somaUmaHora(hora);
      eventBody.start = { dateTime: `${data}T${hora}:00`, timeZone: TIMEZONE };
      eventBody.end = { dateTime: `${data}T${fim}:00`, timeZone: TIMEZONE };
    } else {
      eventBody.start = { date: data };
      eventBody.end = { date: data };
    }

    if (acao === "atualizar") {
      if (!event_id) return json({ error: "event_id obrigatorio" }, 400);
      const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${event_id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(eventBody),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || "Falha ao atualizar evento");
      return json({ event_id: d.id, link: d.htmlLink });
    }

    const r = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(eventBody),
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error?.message || "Falha ao criar evento no Google Calendar");

    return json({ event_id: d.id, link: d.htmlLink });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
