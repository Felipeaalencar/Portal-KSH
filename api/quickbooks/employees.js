// /api/quickbooks/employees.js
//
// GET    /api/quickbooks/employees                  → lista funcionários QBO + rates Supabase
// POST   /api/quickbooks/employees                  → upsert 1 cost rate { qbo_employee_id, display_name, cost_rate }
// GET    /api/quickbooks/employees?action=default   → retorna { default_cost_rate }
// POST   /api/quickbooks/employees?action=default   → atualiza default { value: 42.5 }

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ayhijjbvvsioxpdsrouq.supabase.co';
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function qboQuery(req, sql) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const url = `${proto}://${host}/api/quickbooks/proxy?endpoint=query&query=${encodeURIComponent(sql)}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`QBO query failed: ${r.status}`);
  return r.json();
}

async function getDefaultRate() {
  const { data } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', 'default_cost_rate')
    .maybeSingle();
  return data?.value ? parseFloat(data.value) : 40;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query?.action;

  try {
    // ═══ DEFAULT RATE — GET ═══
    if (req.method === 'GET' && action === 'default') {
      const value = await getDefaultRate();
      return res.status(200).json({ default_cost_rate: value });
    }

    // ═══ DEFAULT RATE — POST ═══
    if (req.method === 'POST' && action === 'default') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const value = parseFloat(body?.value);
      if (isNaN(value) || value < 0) {
        return res.status(400).json({ error: 'value inválido' });
      }
      const { error } = await supabase
        .from('app_settings')
        .upsert(
          { key: 'default_cost_rate', value: value, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );
      if (error) throw error;
      return res.status(200).json({ success: true, default_cost_rate: value });
    }

    // ═══ COST RATE — POST (upsert individual) ═══
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

    // ═══ GET: lista QBO + merge ═══
    if (req.method === 'GET') {
      const qboData = await qboQuery(
        req,
        "select Id, DisplayName, Active, PrimaryEmailAddr, EmployeeNumber from Employee where Active = true MAXRESULTS 200"
      );
      const employees = qboData?.QueryResponse?.Employee || [];

      const { data: rates, error: ratesErr } = await supabase
        .from('employee_cost_rates')
        .select('qbo_employee_id, cost_rate, updated_at');
      if (ratesErr) throw ratesErr;

      const rateMap = new Map(rates.map(r => [r.qbo_employee_id, r]));
      const defaultRate = await getDefaultRate();

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
