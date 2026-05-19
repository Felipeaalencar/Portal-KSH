// /api/quickbooks/employees.js
// GET  → lista funcionários do QBO + merge com cost rates do Supabase
// POST → upsert cost rate de 1 funcionário { qbo_employee_id, display_name, cost_rate }

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ayhijjbvvsioxpdsrouq.supabase.co';
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Helper pra chamar o proxy QBO interno
async function qboQuery(req, sql) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const url = `${proto}://${host}/api/quickbooks/proxy?endpoint=query&query=${encodeURIComponent(sql)}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`QBO query failed: ${r.status}`);
  return r.json();
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // ─── POST: upsert cost rate ───
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { qbo_employee_id, display_name, cost_rate, active = true } = body || {};

      if (!qbo_employee_id || !display_name || cost_rate === undefined) {
        return res.status(400).json({ error: 'qbo_employee_id, display_name e cost_rate são obrigatórios' });
      }

      const rate = parseFloat(cost_rate);
      if (isNaN(rate) || rate < 0) {
        return res.status(400).json({ error: 'cost_rate inválido' });
      }

      const { data, error } = await supabase
        .from('employee_cost_rates')
        .upsert(
          { qbo_employee_id, display_name, cost_rate: rate, active },
          { onConflict: 'qbo_employee_id' }
        )
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ success: true, employee: data });
    }

    // ─── GET: lista funcionários QBO + rates Supabase ───
    if (req.method === 'GET') {
      // 1) busca funcionários ativos do QBO
      const qboData = await qboQuery(
        req,
        "select Id, DisplayName, Active, PrimaryEmailAddr, EmployeeNumber from Employee where Active = true MAXRESULTS 200"
      );
      const employees = qboData?.QueryResponse?.Employee || [];

      // 2) busca todos os rates cadastrados
      const { data: rates, error: ratesErr } = await supabase
        .from('employee_cost_rates')
        .select('qbo_employee_id, cost_rate, updated_at');
      if (ratesErr) throw ratesErr;

      const rateMap = new Map(rates.map(r => [r.qbo_employee_id, r]));

      // 3) busca default global
      const { data: setting } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'default_cost_rate')
        .single();
      const defaultRate = setting?.value ? parseFloat(setting.value) : 40;

      // 4) merge
      const merged = employees.map(emp => {
        const r = rateMap.get(emp.Id);
        return {
          qbo_employee_id: emp.Id,
          display_name: emp.DisplayName,
          email: emp.PrimaryEmailAddr?.Address || null,
          employee_number: emp.EmployeeNumber || null,
          cost_rate: r ? parseFloat(r.cost_rate) : null,
          has_custom_rate: !!r,
          effective_rate: r ? parseFloat(r.cost_rate) : defaultRate,
          updated_at: r?.updated_at || null
        };
      });

      // ordena: sem rate primeiro (precisa de atenção), depois por nome
      merged.sort((a, b) => {
        if (a.has_custom_rate !== b.has_custom_rate) return a.has_custom_rate ? 1 : -1;
        return a.display_name.localeCompare(b.display_name);
      });

      return res.status(200).json({
        employees: merged,
        default_cost_rate: defaultRate,
        total: merged.length,
        without_rate: merged.filter(e => !e.has_custom_rate).length
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[employees] error:', err);
    return res.status(500).json({ error: err.message });
  }
};
