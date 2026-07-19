const SB_URL = 'https://ayhijjbvvsioxpdsrouq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5aGlqamJ2dnNpb3hwZHNyb3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NzU2NzcsImV4cCI6MjA5MDE1MTY3N30.SymZWfUnyPMIt0gWOunQ9OrtKIMA0FG7s0TmODRiypY';
const GID = '1088652003799-j35u5263s0qkn91e8fiqddb4i2j3l11i.apps.googleusercontent.com';
let ME = null, googleToken = sessionStorage.getItem('ksh_drive_token') || null;
let googleTokenExpira = parseInt(sessionStorage.getItem('ksh_drive_token_exp') || '0', 10);

// ── HELPERS ──────────────────────────────────────────────────
function toast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast on' + (type ? ' ' + type : '');
  setTimeout(() => t.className = 'toast', 3000);
}

function sbH() {
  return { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + ME.token, 'Content-Type': 'application/json' };
}

async function sbGet(path) {
  const r = await fetch(SB_URL + '/rest/v1/' + path, { headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + ME.token } });
  const d = await r.json();
  return Array.isArray(d) ? d : [];
}

async function sbPost(path, body) {
  const r = await fetch(SB_URL + '/rest/v1/' + path, {
    method: 'POST', headers: { ...sbH(), 'Prefer': 'return=representation' },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error((await r.json()).message || r.statusText);
  return r.json();
}

async function sbPatch(path, body) {
  const r = await fetch(SB_URL + '/rest/v1/' + path, {
    method: 'PATCH', headers: sbH(), body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error((await r.json()).message || r.statusText);
}

async function sbDelete(path) {
  const r = await fetch(SB_URL + '/rest/v1/' + path, { method: 'DELETE', headers: sbH() });
  if (!r.ok) throw new Error((await r.json()).message || r.statusText);
}

function abrirModal(id) { document.getElementById(id).style.display = 'flex'; }
function fecharModal(id) { document.getElementById(id).style.display = 'none'; }

// ── LOGIN ─────────────────────────────────────────────────────
async function login() {
  const email = document.getElementById('l-email').value.trim();
  const senha = document.getElementById('l-senha').value;
  const btn = document.getElementById('l-btn');
  const err = document.getElementById('l-err');
  if (!email || !senha) { showErr('Preencha email e senha'); return; }
  btn.textContent = 'Entrando...'; btn.disabled = true; err.style.display = 'none';
  try {
    const r = await fetch(SB_URL + '/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: senha })
    });
    const d = await r.json();
    if (!r.ok) { showErr(d.error_description || 'Email ou senha inválidos'); btn.textContent = 'Entrar'; btn.disabled = false; return; }
    const pr = await fetch(SB_URL + '/rest/v1/usuarios?email=eq.' + encodeURIComponent(email) + '&limit=1', {
      headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + d.access_token }
    });
    const ps = await pr.json();
    const p = Array.isArray(ps) && ps[0] ? ps[0] : {};
    ME = { email: d.user.email, nome: p.nome || email.split('@')[0], funcao: p.funcao || 'Gestor', ini: (p.nome || email).substring(0,2).toUpperCase(), token: d.access_token };
    sessionStorage.setItem('ksh_me', JSON.stringify(ME));
    iniciarApp();
  } catch(e) { showErr('Erro de conexão: ' + e.message); btn.textContent = 'Entrar'; btn.disabled = false; }
}

function showErr(msg) {
  const e = document.getElementById('l-err');
  e.textContent = msg; e.style.color = '#e74c3c'; e.style.display = 'block';
  document.getElementById('l-btn').textContent = 'Entrar';
  document.getElementById('l-btn').disabled = false;
}

async function resetSenha() {
  const email = document.getElementById('l-email').value.trim();
  if (!email) { showErr('Digite seu email primeiro'); return; }
  await fetch(SB_URL + '/auth/v1/recover', {
    method: 'POST', headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const e = document.getElementById('l-err');
  e.textContent = '✓ Email enviado!'; e.style.color = '#16a34a'; e.style.display = 'block';
}

// ── APP ───────────────────────────────────────────────────────
function iniciarApp() {
  document.getElementById('v-login').style.display = 'none';
  document.getElementById('v-app').style.display = 'flex';
  document.getElementById('sb-av').textContent = ME.ini;
  document.getElementById('sb-nome').textContent = ME.nome;
  document.getElementById('sb-role').textContent = ME.funcao;
  document.getElementById('wb-nome').textContent = 'Bem-vindo, ' + ME.nome.split(' ')[0] + '! 👋';
  carregarStats();
  goPage(document.getElementById('nav-inicio'), 'inicio', 'Início', '');
}

async function carregarStats() {
  try {
    const [os, cli] = await Promise.all([
      sbGet('ordens_servico?status=eq.aberta&select=id'),
      sbGet('clientes?ativo=eq.true&select=id')
    ]);
    document.getElementById('stat-os').textContent = os.length;
    document.getElementById('stat-cli').textContent = cli.length;
  } catch(e) {}
}

function logout() {
  if (!confirm('Sair do portal?')) return;
  sessionStorage.clear(); ME = null;
  document.getElementById('v-app').style.display = 'none';
  document.getElementById('v-login').style.display = 'flex';
  document.getElementById('l-btn').textContent = 'Entrar';
  document.getElementById('l-btn').disabled = false;
  document.getElementById('l-err').style.display = 'none';
}

// ── NAVEGAÇÃO ─────────────────────────────────────────────────
const PAGE_TITLES = {
  'inicio':'Início','acomp-vendas':'Acomp. de Vendas','contratos':'Contratos','fat-consolidado':'Fat. Consolidado',
  'crm-clientes':'Clientes','crm-orcamentos':'Orçamentos','crm-followups':'Follow-ups','crm-comissoes':'Comissões','crm-consultores':'Consultores','crm-reprovacao':'Motivos Reprovação',
  'fin-banco':'Banco','fin-dre':'DRE','fin-indicadores':'Indicadores','fin-analise':'Análise CR/CP','fin-fluxo':'Fluxo de Caixa','fin-patrimonio':'Gestão Patrimônio','fin-custeio':'Custeio',
  'desp-lancar':'Lançar Despesa','desp-aprovar':'Aprovar Despesas','fin-frota':'Controle de Frota','fin-cadastros':'Cadastros',
  'kshcam':'Ordem de Serviço','tecnicos':'Técnicos','tarefas':'Tarefas','ferramentas':'Ferramentas','documentos':'Documentos'
};

function goPage(btn, pageId, title, section) {
  document.querySelectorAll('.sb-item,.sb-child').forEach(b => b.classList.remove('on'));
  if (btn) btn.classList.add('on');
  else document.querySelectorAll('.sb-item,.sb-child').forEach(b => {
    if (b.onclick && b.onclick.toString().includes("'" + pageId + "'")) b.classList.add('on');
  });

  const t = PAGE_TITLES[pageId] || title;
  document.getElementById('bc').innerHTML = section ? 'Portal › ' + section + ' › <b>' + t + '</b>' : 'Portal › <b>' + t + '</b>';
  document.getElementById('tb-act').innerHTML = getActions(pageId);

  if (pageId === 'inicio') {
    document.getElementById('page-inicio').classList.add('on');
    document.getElementById('page-mod').classList.remove('on');
    return;
  }

  document.getElementById('page-inicio').classList.remove('on');
  document.getElementById('page-mod').classList.add('on');
  document.getElementById('mod-title').textContent = t;
  document.getElementById('mod-sub').textContent = getSubtitle(pageId);
  document.getElementById('mod-content').innerHTML = '';

  // Carrega o módulo
  setTimeout(() => loadModule(pageId), 0);
}

function getActions(id) {
  const m = {
    'kshcam': '<button class="btn-sec" onclick="loadModule(\'kshcam\')">↻ Atualizar</button><button class="btn-pri" onclick="abrirNovaOS()">+ Nova OS</button>',
    'tecnicos': '<button class="btn-pri" onclick="abrirNovoTecnico()">+ Novo Técnico</button>',
    'crm-clientes': '<button class="btn-pri" onclick="abrirModal(\'m-novo-cli-crm\')">+ Novo Cliente</button>',
    'crm-orcamentos': '<button class="btn-sec" onclick="loadModule(\'crm-orcamentos\')">↻ Atualizar</button>',
    'tarefas': '<button class="btn-pri" onclick="toast(\'Em breve\')">+ Nova Tarefa</button>',
    'ferramentas': '<button class="btn-pri" onclick="toast(\'Em breve\')">+ Novo Item</button>',
  };
  return m[id] || '';
}

function getSubtitle(id) {
  const m = {
    'crm-clientes': 'Base de clientes com histórico e dados completos',
    'crm-orcamentos': 'Pipeline de propostas por status',
    'kshcam': 'OS geradas por orçamentos aprovados ou criadas manualmente pelos técnicos',
    'tecnicos': 'Cadastro da equipe técnica e valor da hora trabalhada',
    'tarefas': 'Agenda da equipe sincronizada com Google Calendar',
    'ferramentas': 'Inventário de equipamentos, maletas e materiais',
    'documentos': 'Licenças, seguros, alvarás e manuais',
  };
  return m[id] || '';
}

// ── SIDEBAR TOGGLES ───────────────────────────────────────────
function toggleSec(id, hd) {
  const body = document.getElementById('sec-' + id);
  const span = hd.querySelector('span');
  const open = body.style.maxHeight !== '0px' && body.style.maxHeight !== '';
  body.style.maxHeight = open ? '0px' : '500px';
  span.textContent = open ? '+' : '−';
}

function toggleGrp(id, hd) {
  const body = document.getElementById(id);
  const open = body.classList.contains('on');
  body.classList.toggle('on', !open);
  hd.classList.toggle('on', !open);
}

// ── MÓDULOS ───────────────────────────────────────────────────
function loadModule(id) {
  const el = document.getElementById('mod-content');
  if (!el) return;
  if (id === 'crm-clientes') renderClientes();
  else if (id === 'kshcam') renderKSHCam();
  else if (id === 'tecnicos') renderTecnicos();
  else el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;padding:60px;color:#bbb;gap:10px"><div style="font-size:36px">🚧</div><div style="font-size:14px;font-weight:500;color:#555">Em desenvolvimento</div></div>';
}

// ── CLIENTES ──────────────────────────────────────────────────
let clientesData = [];

async function renderClientes() {
  const el = document.getElementById('mod-content');
  el.innerHTML = `
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <input placeholder="Buscar por nome, email ou telefone..." style="flex:1;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" id="cli-busca" oninput="filtrarClientes()">
  </div>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Endereço</th><th>Ações</th></tr></thead>
      <tbody id="cli-tbody"><tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">Carregando...</td></tr></tbody>
    </table>
  </div>`;
  try {
    clientesData = await sbGet('clientes?ativo=eq.true&order=nome');
    renderTabelaClientes(clientesData);
  } catch(e) {
    document.getElementById('cli-tbody').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</td></tr>';
  }
}

function filtrarClientes() {
  const q = (document.getElementById('cli-busca')?.value || '').toLowerCase();
  renderTabelaClientes(q ? clientesData.filter(c => (c.nome||'').toLowerCase().includes(q) || (c.email||'').toLowerCase().includes(q) || (c.telefone||'').toLowerCase().includes(q)) : clientesData);
}

function renderTabelaClientes(lista) {
  const tb = document.getElementById('cli-tbody');
  if (!tb) return;
  if (!lista.length) { tb.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">Nenhum cliente encontrado</td></tr>'; return; }
  tb.innerHTML = lista.map(c => `<tr>
    <td style="font-weight:500">${c.nome||'—'}</td>
    <td>${c.email||'—'}</td>
    <td>${c.telefone||'—'}</td>
    <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.endereco||'—'}</td>
    <td><button onclick="editarCliente('${c.id}')" style="padding:3px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit">Editar</button></td>
  </tr>`).join('');
}

async function salvarClienteCRM() {
  const nome = document.getElementById('crm-cli-nome')?.value.trim();
  const email = document.getElementById('crm-cli-email')?.value.trim();
  const telefone = document.getElementById('crm-cli-tel')?.value.trim();
  const endereco = document.getElementById('crm-cli-end')?.value.trim();
  if (!nome||!email||!telefone||!endereco) { toast('Preencha todos os campos obrigatórios','err'); return; }
  try {
    await sbPost('clientes', { nome, email, telefone, endereco, equipamentos: document.getElementById('crm-cli-equip')?.value.trim()||null, observacoes: document.getElementById('crm-cli-obs')?.value.trim()||null, ativo: true });
    fecharModal('m-novo-cli-crm');
    toast('Cliente cadastrado!', 'ok');
    renderClientes();
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

function editarCliente(id) {
  const c = clientesData.find(x => x.id === id);
  if (!c) return;
  document.getElementById('crm-cli-nome').value = c.nome||'';
  document.getElementById('crm-cli-email').value = c.email||'';
  document.getElementById('crm-cli-tel').value = c.telefone||'';
  document.getElementById('crm-cli-end').value = c.endereco||'';
  document.getElementById('crm-cli-equip').value = c.equipamentos||'';
  document.getElementById('crm-cli-obs').value = c.observacoes||'';
  document.getElementById('m-novo-cli-crm').querySelector('.modal-hd-title').textContent = 'Editar Cliente';
  document.getElementById('m-novo-cli-crm').querySelector('.btn-pri').onclick = async () => {
    try {
      await sbPatch('clientes?id=eq.' + id, {
        nome: document.getElementById('crm-cli-nome').value.trim(),
        email: document.getElementById('crm-cli-email').value.trim(),
        telefone: document.getElementById('crm-cli-tel').value.trim(),
        endereco: document.getElementById('crm-cli-end').value.trim(),
        equipamentos: document.getElementById('crm-cli-equip').value.trim()||null,
        observacoes: document.getElementById('crm-cli-obs').value.trim()||null
      });
      fecharModal('m-novo-cli-crm');
      toast('Cliente atualizado!','ok');
      renderClientes();
    } catch(e) { toast('Erro: '+e.message,'err'); }
  };
  abrirModal('m-novo-cli-crm');
}

// ── TÉCNICOS ──────────────────────────────────────────────────
let tecnicosData = [];

async function renderTecnicos() {
  const el = document.getElementById('mod-content');
  el.innerHTML = `
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <input placeholder="Buscar por nome, email ou telefone..." style="flex:1;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" id="tec-busca" oninput="filtrarTecnicos()">
  </div>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Valor/hora</th><th>Ações</th></tr></thead>
      <tbody id="tec-tbody"><tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">Carregando...</td></tr></tbody>
    </table>
  </div>`;
  try {
    tecnicosData = await sbGet('tecnicos?ativo=eq.true&order=nome');
    renderTabelaTecnicos(tecnicosData);
  } catch(e) {
    document.getElementById('tec-tbody').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</td></tr>';
  }
}

function filtrarTecnicos() {
  const q = (document.getElementById('tec-busca')?.value || '').toLowerCase();
  renderTabelaTecnicos(q ? tecnicosData.filter(t => (t.nome||'').toLowerCase().includes(q) || (t.email||'').toLowerCase().includes(q) || (t.telefone||'').toLowerCase().includes(q)) : tecnicosData);
}

function renderTabelaTecnicos(lista) {
  const tb = document.getElementById('tec-tbody');
  if (!tb) return;
  if (!lista.length) { tb.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">Nenhum técnico cadastrado</td></tr>'; return; }
  tb.innerHTML = lista.map(t => `<tr>
    <td style="font-weight:500">${t.nome||'—'}</td>
    <td>${t.email||'—'}</td>
    <td>${t.telefone||'—'}</td>
    <td>${t.valor_hora != null ? '$' + Number(t.valor_hora).toFixed(2) : '—'}</td>
    <td><button onclick="editarTecnico('${t.id}')" style="padding:3px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit">Editar</button></td>
  </tr>`).join('');
}

function abrirNovoTecnico() {
  ['tec-nome','tec-email','tec-tel','tec-valor'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('m-novo-tec').querySelector('.modal-hd-title').textContent = 'Novo Técnico';
  document.getElementById('m-novo-tec').querySelector('.btn-pri').textContent = 'Cadastrar';
  document.getElementById('m-novo-tec').querySelector('.btn-pri').onclick = salvarTecnico;
  abrirModal('m-novo-tec');
}

async function salvarTecnico() {
  const nome = document.getElementById('tec-nome')?.value.trim();
  if (!nome) { toast('Nome é obrigatório', 'err'); return; }
  try {
    await sbPost('tecnicos', {
      nome,
      email: document.getElementById('tec-email')?.value.trim() || null,
      telefone: document.getElementById('tec-tel')?.value.trim() || null,
      valor_hora: document.getElementById('tec-valor')?.value ? parseFloat(document.getElementById('tec-valor').value) : null,
      ativo: true
    });
    fecharModal('m-novo-tec');
    toast('Técnico cadastrado!', 'ok');
    renderTecnicos();
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

function editarTecnico(id) {
  const t = tecnicosData.find(x => x.id === id);
  if (!t) return;
  document.getElementById('tec-nome').value = t.nome || '';
  document.getElementById('tec-email').value = t.email || '';
  document.getElementById('tec-tel').value = t.telefone || '';
  document.getElementById('tec-valor').value = t.valor_hora != null ? t.valor_hora : '';
  document.getElementById('m-novo-tec').querySelector('.modal-hd-title').textContent = 'Editar Técnico';
  document.getElementById('m-novo-tec').querySelector('.btn-pri').textContent = 'Salvar';
  document.getElementById('m-novo-tec').querySelector('.btn-pri').onclick = async () => {
    try {
      await sbPatch('tecnicos?id=eq.' + id, {
        nome: document.getElementById('tec-nome').value.trim(),
        email: document.getElementById('tec-email').value.trim() || null,
        telefone: document.getElementById('tec-tel').value.trim() || null,
        valor_hora: document.getElementById('tec-valor').value ? parseFloat(document.getElementById('tec-valor').value) : null
      });
      fecharModal('m-novo-tec');
      toast('Técnico atualizado!', 'ok');
      renderTecnicos();
    } catch(e) { toast('Erro: ' + e.message, 'err'); }
  };
  abrirModal('m-novo-tec');
}

// ── KSHCAM ────────────────────────────────────────────────────
let osData = [];
const S_LABEL = { aberta:'Aberta', agendada:'Agendada', em_campo:'Em campo', concluida:'Concluída' };
const S_COLOR = { aberta:'#d97706', agendada:'#7c3aed', em_campo:'#2563eb', concluida:'#16a34a' };
const S_BG    = { aberta:'#fffbeb', agendada:'#f5f3ff', em_campo:'#eff6ff', concluida:'#f0fdf4' };

async function renderKSHCam() {
  const el = document.getElementById('mod-content');
  el.innerHTML = `
  <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#92400e" id="g-drive-status">
    📁 Google Drive não conectado — <span style="cursor:pointer;text-decoration:underline" onclick="conectarGoogle()">Conectar agora</span> para fazer upload de fotos
  </div>
  <div class="kpis kpis-4" style="margin-bottom:14px">
    <div class="kpi"><div class="kpi-l">TOTAL</div><div class="kpi-v" id="kpi-tot">—</div></div>
    <div class="kpi"><div class="kpi-l">ABERTAS</div><div class="kpi-v" id="kpi-ab" style="color:#d97706">—</div></div>
    <div class="kpi"><div class="kpi-l">EM CAMPO</div><div class="kpi-v" id="kpi-ec" style="color:#2563eb">—</div></div>
    <div class="kpi"><div class="kpi-l">CONCLUÍDAS</div><div class="kpi-v" id="kpi-co" style="color:#16a34a">—</div></div>
  </div>
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <input placeholder="Buscar OS..." style="flex:1;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" id="os-busca" oninput="filtrarOS()">
    <select style="padding:7px 10px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;background:#fff;outline:none" id="os-filtro" onchange="filtrarOS()">
      <option value="">Todos os status</option>
      <option value="aberta">Aberta</option>
      <option value="agendada">Agendada</option>
      <option value="em_campo">Em campo</option>
      <option value="concluida">Concluída</option>
    </select>
  </div>
  <div id="os-lista"></div>`;

  if (await garantirTokenDrive()) atualizarDriveStatus(true);
  await carregarOS();
}

async function carregarOS() {
  const el = document.getElementById('os-lista');
  if (!el) return;
  try {
    osData = await sbGet('ordens_servico?order=created_at.desc');
    renderOSLista(osData);
    if (document.getElementById('kpi-tot')) {
      document.getElementById('kpi-tot').textContent = osData.length;
      document.getElementById('kpi-ab').textContent = osData.filter(o=>o.status==='aberta').length;
      document.getElementById('kpi-ec').textContent = osData.filter(o=>o.status==='em_campo').length;
      document.getElementById('kpi-co').textContent = osData.filter(o=>o.status==='concluida').length;
    }
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c;font-size:12px">Erro: ' + e.message + '</div>';
  }
}

function filtrarOS() {
  const q = (document.getElementById('os-busca')?.value||'').toLowerCase();
  const s = document.getElementById('os-filtro')?.value||'';
  renderOSLista(osData.filter(o => (!s||o.status===s) && (!q||(o.titulo||'').toLowerCase().includes(q)||(o.cliente||o.cliente_nome||'').toLowerCase().includes(q)||String(o.numero||'').includes(q))));
}

function renderOSLista(lista) {
  const el = document.getElementById('os-lista');
  if (!el) return;
  if (!lista.length) { el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb;font-size:13px">Nenhuma OS encontrada</div>'; return; }
  el.innerHTML = lista.map(o => `
  <div style="background:#fff;border:1px solid #e8e8e5;border-radius:10px;padding:14px 16px;margin-bottom:8px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:11px;color:#888">OS #${o.numero||'—'}</span>
        <span style="font-size:11px;font-weight:500;padding:2px 8px;border-radius:99px;background:${S_BG[o.status]||'#f5f5f3'};color:${S_COLOR[o.status]||'#888'}">${S_LABEL[o.status]||o.status}</span>
        ${o.origem==='manual'?'<span style="font-size:10px;padding:2px 7px;border-radius:99px;background:#f5f5f3;color:#888;border:1px solid #e8e8e5">Manual</span>':'<span style="font-size:10px;padding:2px 7px;border-radius:99px;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe">De orçamento</span>'}
      </div>
      <span style="font-size:11px;color:#bbb">${new Date(o.created_at).toLocaleDateString('pt-BR')}</span>
    </div>
    <div style="font-size:14px;font-weight:600;margin-bottom:6px;cursor:pointer" onclick="abrirOS('${o.id}')">${o.titulo||'Sem título'}</div>
    <div style="display:flex;align-items:center;gap:16px;font-size:12px;color:#888;margin-bottom:10px">
      ${(o.cliente||o.cliente_nome)?'<span>👤 '+(o.cliente||o.cliente_nome)+'</span>':''}
      ${o.tecnico_nome?'<span>🔧 '+o.tecnico_nome+'</span>':''}
      ${o.endereco?'<span>📍 '+o.endereco+'</span>':''}
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div>${o.drive_folder_url?'<a href="'+o.drive_folder_url+'" target="_blank" style="font-size:11px;color:#2563eb;text-decoration:none">📁 Ver no Drive</a>':''}</div>
      <div style="display:flex;gap:6px">
        <button onclick="abrirOS('${o.id}')" style="padding:4px 12px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit;color:#1a1a1a;font-weight:500">Ver detalhes</button>
        <button onclick="editarOS('${o.id}')" style="padding:4px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit;color:#555">Editar</button>
        <button onclick="deletarOS('${o.id}','${(o.titulo||'').replace(/'/g,'')}')" style="padding:4px 10px;border:1px solid #fecaca;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit;color:#e74c3c">Deletar</button>
      </div>
    </div>
  </div>`).join('');
}

// Abrir OS — modal de detalhe
async function abrirOS(id) {
  const os = osData.find(o => o.id === id);
  if (!os) return;
  const content = document.getElementById('m-det-os-content');
  content.innerHTML = '<div style="padding:40px;text-align:center;color:#bbb">Carregando...</div>';
  abrirModal('m-det-os');

  function driveFileId(url) {
    const m = (url || '').match(/\/d\/([a-zA-Z0-9_-]+)/);
    return m ? m[1] : null;
  }
  function fotoThumb(f) {
    if (f.thumb_url) return f.thumb_url;
    const fid = driveFileId(f.drive_url);
    return fid ? ('https://drive.google.com/thumbnail?id=' + fid + '&sz=w400') : '';
  }

  let fotos = [], notas = [];
  try {
    [fotos, notas] = await Promise.all([
      sbGet('os_fotos?os_id=eq.' + id + '&order=criado_em.desc'),
      sbGet('os_notas?os_id=eq.' + id + '&order=criado_em.asc')
    ]);
  } catch(e) {}

  content.innerHTML = `
  <div style="padding:16px 20px;border-bottom:1px solid #e8e8e5;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:10">
    <div>
      <div style="font-size:11px;color:#888;margin-bottom:1px">OS #${os.numero||'—'} · <span id="os-status-header-${id}" style="color:${S_COLOR[os.status]||'#888'}">${S_LABEL[os.status]||os.status}</span></div>
      <div style="font-size:16px;font-weight:700">${os.titulo||'Sem título'}</div>
    </div>
    <button onclick="fecharModal('m-det-os')" style="background:none;border:none;cursor:pointer;font-size:22px;color:#bbb">×</button>
  </div>
  <div style="padding:18px 20px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      <div style="background:#f9f9f7;border-radius:8px;padding:12px">
        <div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Cliente</div>
        <div style="font-size:13px;font-weight:600">${os.cliente_nome||os.cliente||'—'}</div>
        ${os.cliente_tel?'<div style="font-size:12px;color:#555;margin-top:2px">📞 '+os.cliente_tel+'</div>':''}
        ${os.cliente_email?'<div style="font-size:12px;color:#555;margin-top:1px">✉️ '+os.cliente_email+'</div>':''}
      </div>
      <div style="background:#f9f9f7;border-radius:8px;padding:12px">
        <div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Técnico</div>
        <div style="font-size:13px;font-weight:600">${os.tecnico_nome||'—'}</div>
        <div style="font-size:11px;color:#888;margin-top:3px">Por ${os.criado_por||'—'}</div>
      </div>
      ${os.endereco?'<div style="background:#f9f9f7;border-radius:8px;padding:12px;grid-column:span 2"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px"><div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:.5px">Endereço</div><div style="display:flex;gap:10px"><a href="https://waze.com/ul?q='+encodeURIComponent(os.endereco)+'&navigate=yes" target="_blank" style="font-size:11px;color:#2563eb;text-decoration:none;font-weight:500">🚗 Waze</a><a href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(os.endereco)+'" target="_blank" style="font-size:11px;color:#2563eb;text-decoration:none;font-weight:500">📍 Maps</a></div></div><div style="font-size:13px">'+os.endereco+'</div></div>':''}
      ${os.descricao?'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px;grid-column:span 2"><div style="font-size:9px;color:#92400e;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">Serviço</div><div style="font-size:13px;color:#78350f">'+os.descricao+'</div></div>':''}
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:500;color:#444;margin-bottom:8px">Status</div>
      <div id="status-pills-${id}" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
        ${Object.entries(S_LABEL).map(([s,l]) => '<button data-status="'+s+'" onclick="selecionarStatusOS(\''+id+'\',\''+s+'\')" style="padding:5px 14px;border-radius:99px;border:1.5px solid '+(os.status===s?S_COLOR[s]:'#e8e8e5')+';background:'+(os.status===s?S_BG[s]:'#fff')+';color:'+(os.status===s?S_COLOR[s]:'#555')+';font-size:12px;font-weight:'+(os.status===s?'600':'400')+';cursor:pointer;font-family:inherit">'+l+'</button>').join('')}
      </div>
      <button id="status-save-${id}" onclick="salvarStatusOS('${id}')" style="display:none;padding:6px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">💾 Salvar alterações</button>
    </div>
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600">Fotos (${fotos.length})</div>
        <label style="padding:5px 12px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;cursor:pointer;color:#555;background:#fff">
          📷 Adicionar
          <input type="file" accept="image/*" capture="environment" multiple style="display:none" onchange="uploadFotos(event,'${id}')">
        </label>
      </div>
      <div id="fotos-${id}" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${fotos.length ? fotos.map(f => { const src = fotoThumb(f); return '<a href="'+f.drive_url+'" target="_blank" style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:#f5f5f3;border:1px solid #e8e8e5;border-radius:8px;overflow:hidden">'+(src?'<img src="'+src+'" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">':'<span style="font-size:28px">🖼️</span>')+'</a>'; }).join('') : '<div style="grid-column:span 3;text-align:center;padding:20px;color:#bbb;font-size:12px;border:1px dashed #e8e8e5;border-radius:8px">Nenhuma foto. Toque em "Adicionar" para começar.</div>'}
      </div>
      <div id="upload-prog" style="display:none;text-align:center;font-size:12px;color:#2563eb;margin-top:8px">Enviando...</div>
    </div>
    <div>
      <div style="font-size:13px;font-weight:600;margin-bottom:10px">Anotações (${notas.length})</div>
      <div id="notas-${id}" style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
        ${notas.length ? notas.map(n => '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px"><div style="font-size:13px;margin-bottom:3px">'+n.texto+'</div><div style="font-size:10px;color:#bbb">'+( n.autor||'—')+' · '+new Date(n.criado_em||n.created_at).toLocaleString('pt-BR')+'</div></div>').join('') : '<div style="color:#bbb;font-size:12px">Nenhuma anotação.</div>'}
      </div>
      <div id="nota-previa-${id}" style="display:none"></div>
      <div id="nota-form-${id}" style="display:flex;gap:8px">
        <input id="nota-input-${id}" placeholder="Adicionar anotação..." style="flex:1;padding:8px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" onkeydown="if(event.key==='Enter')gerarResumoNota('${id}')">
        <button id="nota-btn-${id}" onclick="gerarResumoNota('${id}')" style="padding:8px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">Enviar</button>
      </div>
    </div>
    ${os.drive_folder_url?'<div style="margin-top:14px;padding-top:14px;border-top:1px solid #e8e8e5"><a href="'+os.drive_folder_url+'" target="_blank" style="font-size:12px;color:#2563eb;text-decoration:none">📁 Abrir pasta no Google Drive</a></div>':''}
  </div>`;
}

let statusPendente = {};

function selecionarStatusOS(id, status) {
  statusPendente[id] = status;
  const wrap = document.getElementById('status-pills-' + id);
  if (wrap) wrap.querySelectorAll('button[data-status]').forEach(b => {
    const s = b.dataset.status;
    const on = s === status;
    b.style.border = '1.5px solid ' + (on ? S_COLOR[s] : '#e8e8e5');
    b.style.background = on ? S_BG[s] : '#fff';
    b.style.color = on ? S_COLOR[s] : '#555';
    b.style.fontWeight = on ? '600' : '400';
  });
  const os = osData.find(o => o.id === id);
  const saveBtn = document.getElementById('status-save-' + id);
  if (saveBtn) saveBtn.style.display = (os && os.status !== status) ? 'inline-block' : 'none';
}

async function salvarStatusOS(id) {
  const status = statusPendente[id];
  if (!status) return;
  try {
    await sbPatch('ordens_servico?id=eq.' + id, { status });
    const os = osData.find(o => o.id === id);
    if (os) os.status = status;
    const saveBtn = document.getElementById('status-save-' + id);
    if (saveBtn) saveBtn.style.display = 'none';
    const headerEl = document.getElementById('os-status-header-' + id);
    if (headerEl) { headerEl.textContent = S_LABEL[status] || status; headerEl.style.color = S_COLOR[status] || '#888'; }
    toast('Status atualizado!', 'ok');
    carregarOS();
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

async function salvarNota(osId) {
  const inp = document.getElementById('nota-input-' + osId);
  const texto = inp?.value.trim();
  if (!texto) return;
  try {
    await sbPost('os_notas', { os_id: osId, texto, autor: ME.nome });
    inp.value = '';
    const notas = await sbGet('os_notas?os_id=eq.' + osId + '&order=created_at.asc');
    const el = document.getElementById('notas-' + osId);
    if (el) el.innerHTML = notas.map(n => '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px;margin-bottom:8px"><div style="font-size:13px;margin-bottom:3px">'+n.texto+'</div><div style="font-size:10px;color:#bbb">'+(n.autor||'—')+' · '+new Date(n.criado_em||n.created_at).toLocaleString('pt-BR')+'</div></div>').join('');
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

// Anotações com resumo aprimorado por IA (revisão do técnico antes de salvar)
async function gerarResumoNota(osId) {
  const inp = document.getElementById('nota-input-' + osId);
  const texto = inp?.value.trim();
  if (!texto) return;
  const btn = document.getElementById('nota-btn-' + osId);
  if (btn) { btn.textContent = 'Gerando...'; btn.disabled = true; }
  try {
    const r = await fetch(SB_URL + '/functions/v1/resumo-nota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ texto })
    });
    if (!r.ok) throw new Error('IA indisponível (' + r.status + ')');
    const d = await r.json();
    mostrarPreviaNota(osId, d.resumo || texto);
  } catch(e) {
    // IA ainda não publicada/disponível: não trava o técnico, salva a anotação direto
    await salvarNotaDireta(osId, texto);
  } finally {
    if (btn) { btn.textContent = 'Enviar'; btn.disabled = false; }
  }
}

async function salvarNotaDireta(osId, texto) {
  try {
    await sbPost('os_notas', { os_id: osId, texto, autor: ME.nome });
    const inp = document.getElementById('nota-input-' + osId);
    if (inp) inp.value = '';
    const notas = await sbGet('os_notas?os_id=eq.' + osId + '&order=criado_em.asc');
    const listEl = document.getElementById('notas-' + osId);
    if (listEl) listEl.innerHTML = notas.length ? notas.map(n => '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px"><div style="font-size:13px;margin-bottom:3px">'+n.texto+'</div><div style="font-size:10px;color:#bbb">'+(n.autor||'—')+' · '+new Date(n.criado_em||n.created_at).toLocaleString('pt-BR')+'</div></div>').join('') : '<div style="color:#bbb;font-size:12px">Nenhuma anotação.</div>';
    toast('Anotação salva!', 'ok');
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

function mostrarPreviaNota(osId, resumo) {
  document.getElementById('nota-form-' + osId).style.display = 'none';
  const wrap = document.getElementById('nota-previa-' + osId);
  wrap.style.display = 'block';
  wrap.innerHTML = `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-size:10px;color:#166534;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;font-weight:600">Resumo sugerido pela IA</div>
      <div id="nota-texto-ia-${osId}" contenteditable="false" style="font-size:13px;background:#fff;border:1.5px solid #e8e8e5;border-radius:7px;padding:9px 11px;margin-bottom:8px;outline:none">${resumo}</div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button onclick="cancelarPreviaNota('${osId}')" style="padding:6px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#555">Cancelar</button>
        <button id="nota-editbtn-${osId}" onclick="toggleEditarPreviaNota('${osId}')" style="padding:6px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#555">✎ Editar</button>
        <button onclick="confirmarNota('${osId}')" style="padding:6px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">✓ Confirmar</button>
      </div>
    </div>`;
}

function toggleEditarPreviaNota(osId) {
  const el = document.getElementById('nota-texto-ia-' + osId);
  const btn = document.getElementById('nota-editbtn-' + osId);
  const editing = el.getAttribute('contenteditable') === 'true';
  el.setAttribute('contenteditable', editing ? 'false' : 'true');
  el.style.borderColor = editing ? '#e8e8e5' : '#1a1a1a';
  btn.textContent = editing ? '✎ Editar' : '✓ Concluir edição';
  if (!editing) el.focus();
}

function cancelarPreviaNota(osId) {
  const wrap = document.getElementById('nota-previa-' + osId);
  wrap.style.display = 'none';
  wrap.innerHTML = '';
  document.getElementById('nota-form-' + osId).style.display = 'flex';
}

async function confirmarNota(osId) {
  const el = document.getElementById('nota-texto-ia-' + osId);
  const texto = el?.innerText.trim();
  if (!texto) return;
  cancelarPreviaNota(osId);
  await salvarNotaDireta(osId, texto);
}

// Nova OS
let osCliSel = null;

function abrirNovaOS() {
  osCliSel = null;
  ['os-titulo','os-tecnico','os-desc','os-cli-busca'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  document.getElementById('os-cli-sel').style.display = 'none';
  document.getElementById('os-cli-novo').style.display = 'none';
  document.getElementById('os-cli-res').style.display = 'none';
  abrirModal('m-nova-os');
  setTimeout(() => document.getElementById('os-titulo')?.focus(), 100);
}

let buscaTimer = null;
async function buscarClienteOS(q) {
  clearTimeout(buscaTimer);
  const res = document.getElementById('os-cli-res');
  const novo = document.getElementById('os-cli-novo');
  if (!q || q.length < 2) { res.style.display = 'none'; novo.style.display = 'none'; return; }
  buscaTimer = setTimeout(async () => {
    try {
      const lista = await sbGet('clientes?nome=ilike.*' + encodeURIComponent(q) + '*&ativo=eq.true&limit=6');
      if (!lista.length) { res.style.display = 'none'; novo.style.display = 'block'; return; }
      novo.style.display = 'none';
      res.style.display = 'block';
      res.innerHTML = lista.map(c => '<div onclick="selecionarCliente(' + JSON.stringify(c).replace(/"/g,"'") + ')" style="padding:9px 12px;cursor:pointer;border-bottom:1px solid #f5f5f3" onmouseover="this.style.background=\'#f9f9f7\'" onmouseout="this.style.background=\'\'"><div style="font-size:13px;font-weight:500">'+c.nome+'</div><div style="font-size:11px;color:#888">'+ [c.email,c.telefone,c.endereco].filter(Boolean).join(' · ')+'</div></div>').join('');
    } catch(e) { res.style.display = 'none'; }
  }, 300);
}

function selecionarCliente(c) {
  osCliSel = c;
  document.getElementById('os-cli-busca').value = '';
  document.getElementById('os-cli-res').style.display = 'none';
  document.getElementById('os-cli-novo').style.display = 'none';
  document.getElementById('os-cli-sel').style.display = 'block';
  document.getElementById('os-cli-nome').textContent = c.nome;
  document.getElementById('os-cli-dados').textContent = [c.email,c.telefone,c.endereco].filter(Boolean).join(' · ');
}

function limparClienteOS() {
  osCliSel = null;
  document.getElementById('os-cli-sel').style.display = 'none';
  document.getElementById('os-cli-busca').value = '';
  document.getElementById('os-cli-busca').focus();
}

function abrirCadastroCliente() {
  fecharModal('m-nova-os');
  abrirModal('m-novo-cli');
}

async function salvarNovoCliente() {
  const nome = document.getElementById('nc-nome')?.value.trim();
  const email = document.getElementById('nc-email')?.value.trim();
  const telefone = document.getElementById('nc-tel')?.value.trim();
  const endereco = document.getElementById('nc-end')?.value.trim();
  if (!nome||!email||!telefone||!endereco) { toast('Preencha todos os campos','err'); return; }
  try {
    const [c] = await sbPost('clientes', { nome, email, telefone, endereco, contato: document.getElementById('nc-contato')?.value.trim()||null, ativo: true });
    fecharModal('m-novo-cli');
    selecionarCliente(c);
    abrirModal('m-nova-os');
    toast('Cliente cadastrado!', 'ok');
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

async function salvarNovaOS() {
  const titulo = document.getElementById('os-titulo')?.value.trim();
  if (!titulo) { toast('Título obrigatório', 'err'); return; }
  if (!osCliSel) { toast('Selecione um cliente do CRM', 'err'); document.getElementById('os-cli-busca')?.focus(); return; }
  try {
    // Próximo número
    const nums = await sbGet('ordens_servico?select=numero&order=numero.desc.nullslast&limit=1');
    const numero = (nums[0]?.numero || 0) + 1;
    await sbPost('ordens_servico', {
      numero, titulo,
      cliente: osCliSel.nome, cliente_nome: osCliSel.nome,
      cliente_tel: osCliSel.telefone||null, cliente_email: osCliSel.email||null,
      endereco: osCliSel.endereco||null,
      tecnico_nome: document.getElementById('os-tecnico')?.value.trim()||null,
      descricao: document.getElementById('os-desc')?.value.trim()||null,
      status: 'aberta', origem: 'manual', criado_por: ME.nome
    });
    fecharModal('m-nova-os');
    toast('OS #' + numero + ' criada!', 'ok');
    // Cria lead no CRM
    try { await sbPost('crm_leads', { nome: osCliSel.nome, origem: 'os_manual', status: 'lead', criado_por: ME.nome }); } catch(e) {}
    carregarOS();
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

function editarOS(id) {
  const os = osData.find(o => o.id === id);
  if (!os) return;
  document.getElementById('edit-os-id').value = id;
  document.getElementById('edit-os-titulo').value = os.titulo||'';
  document.getElementById('edit-os-status').value = os.status||'aberta';
  document.getElementById('edit-os-tecnico').value = os.tecnico_nome||'';
  document.getElementById('edit-os-desc').value = os.descricao||'';
  document.getElementById('edit-os-cli-info').textContent = 'Cliente: ' + (os.cliente_nome||os.cliente||'—');
  abrirModal('m-edit-os');
}

async function salvarEditOS() {
  const id = document.getElementById('edit-os-id').value;
  const titulo = document.getElementById('edit-os-titulo').value.trim();
  if (!titulo) { toast('Título obrigatório','err'); return; }
  try {
    await sbPatch('ordens_servico?id=eq.' + id, {
      titulo, status: document.getElementById('edit-os-status').value,
      tecnico_nome: document.getElementById('edit-os-tecnico').value.trim()||null,
      descricao: document.getElementById('edit-os-desc').value.trim()||null
    });
    fecharModal('m-edit-os');
    toast('OS atualizada!', 'ok');
    carregarOS();
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

async function deletarOS(id, titulo) {
  if (!confirm('Deletar OS "' + titulo + '"?\nEsta ação não pode ser desfeita.')) return;
  const os = osData.find(o => o.id === id);
  let apagarDrive = false;
  if (os?.drive_folder_id) {
    apagarDrive = confirm('Esta OS tem uma pasta com fotos no Google Drive.\n\nApagar essa pasta também? (ela vai para a lixeira do Google, não é apagada na hora)\n\nOK = apagar pasta também\nCancelar = manter a pasta no Drive');
  }
  try {
    if (apagarDrive) {
      if (!googleToken) {
        toast('Google Drive não conectado — a pasta não foi apagada, só a OS', 'err');
      } else {
        try {
          await fetch('https://www.googleapis.com/drive/v3/files/' + os.drive_folder_id, {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + googleToken, 'Content-Type': 'application/json' },
            body: JSON.stringify({ trashed: true })
          });
        } catch(e) { console.error(e); toast('Não foi possível apagar a pasta do Drive', 'err'); }
      }
    }
    await sbDelete('ordens_servico?id=eq.' + id);
    toast('OS deletada', 'ok');
    carregarOS();
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

// ── GOOGLE DRIVE ──────────────────────────────────────────────
function atualizarDriveStatus(ok) {
  const el = document.getElementById('g-drive-status');
  if (!el) return;
  if (ok) { el.style.background='#f0fdf4'; el.style.borderColor='#bbf7d0'; el.style.color='#166534'; el.innerHTML='✅ Google Drive conectado'; }
}

function conectarGoogle() {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' + GID
    + '&redirect_uri=' + encodeURIComponent(window.location.origin + window.location.pathname)
    + '&response_type=code&access_type=offline&prompt=consent'
    + '&scope=' + encodeURIComponent('https://www.googleapis.com/auth/drive.file');
  window.location.href = url;
}

async function trocarCodigoGoogle(code) {
  try {
    const r = await fetch(SB_URL + '/functions/v1/google-token-exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY },
      body: JSON.stringify({ code })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Erro ao conectar Google Drive');
    googleToken = d.access_token;
    googleTokenExpira = Date.now() + Math.max((d.expires_in || 3600) - 60, 60) * 1000;
    sessionStorage.setItem('ksh_drive_token', googleToken);
    sessionStorage.setItem('ksh_drive_token_exp', String(googleTokenExpira));
    atualizarDriveStatus(true);
    toast(d.has_refresh ? 'Google Drive conectado! Vai continuar conectado automaticamente.' : 'Google Drive conectado!', 'ok');
  } catch(e) {
    toast('Erro ao conectar Google Drive: ' + e.message, 'err');
  }
}

async function renovarTokenDrive() {
  try {
    const r = await fetch(SB_URL + '/functions/v1/google-token-refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY }
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Erro ao renovar Google Drive');
    googleToken = d.access_token;
    googleTokenExpira = Date.now() + Math.max((d.expires_in || 3600) - 60, 60) * 1000;
    sessionStorage.setItem('ksh_drive_token', googleToken);
    sessionStorage.setItem('ksh_drive_token_exp', String(googleTokenExpira));
    return true;
  } catch(e) {
    console.error(e);
    return false;
  }
}

// Garante um access_token válido: renova em silêncio via refresh_token salvo no servidor
// (sem pedir pro usuário clicar em nada). Só volta false se o refresh_token não existir/for inválido.
async function garantirTokenDrive() {
  if (googleToken && Date.now() < googleTokenExpira) return true;
  const ok = await renovarTokenDrive();
  if (!ok) limparTokenDrive();
  return ok;
}

async function uploadFotos(event, osId) {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  const conectado = await garantirTokenDrive();
  if (!conectado) { toast('Conecte o Google Drive primeiro','err'); return; }
  const prog = document.getElementById('upload-prog');
  if (prog) prog.style.display = 'block';
  const os = osData.find(o => o.id === osId);
  let folderId = os?.drive_folder_id;
  if (!folderId) {
    const parentId = await getPastaPortal();
    const nomeCliente = (os?.cliente_nome || os?.cliente || 'Cliente').trim();
    const nomePasta = 'OS ' + (os?.numero || osId) + ' - ' + nomeCliente;
    folderId = await criarPastaDrive(nomePasta, parentId);
    if (folderId) {
      await sbPatch('ordens_servico?id=eq.' + osId, { drive_folder_id: folderId, drive_folder_url: 'https://drive.google.com/drive/folders/' + folderId });
      os.drive_folder_id = folderId;
    } else {
      toast('Não foi possível criar a pasta no Drive — verifique a conexão do Google Drive', 'err');
    }
  }
  for (let i = 0; i < files.length; i++) {
    if (prog) prog.textContent = 'Enviando ' + (i+1) + '/' + files.length + '...';
    try {
      const d = await uploadDrive(files[i], folderId);
      if (d?.id) {
        await sbPost('os_fotos', { os_id: osId, nome: files[i].name, drive_url: 'https://drive.google.com/file/d/'+d.id+'/view', thumb_url: d.thumbnailLink||null, enviado_por: ME.nome });
      }
    } catch(e) { console.error(e); }
  }
  if (prog) prog.style.display = 'none';
  toast('Fotos enviadas!', 'ok');
  abrirOS(osId);
}

function limparTokenDrive() {
  googleToken = null;
  googleTokenExpira = 0;
  sessionStorage.removeItem('ksh_drive_token');
  sessionStorage.removeItem('ksh_drive_token_exp');
  const el = document.getElementById('g-drive-status');
  if (el) { el.style.background='#fffbeb'; el.style.borderColor='#fde68a'; el.style.color='#92400e'; el.innerHTML='📁 Google Drive não conectado — <span style="cursor:pointer;text-decoration:underline" onclick="conectarGoogle()">Conectar agora</span> para fazer upload de fotos'; }
}

async function criarPastaDrive(nome, parentId) {
  const body = { name: nome, mimeType: 'application/vnd.google-apps.folder' };
  if (parentId) body.parents = [parentId];
  const r = await fetch('https://www.googleapis.com/drive/v3/files', {
    method:'POST', headers:{'Authorization':'Bearer '+googleToken,'Content-Type':'application/json'},
    body: JSON.stringify(body)
  });
  const d = await r.json();
  if (d.id) await fetch('https://www.googleapis.com/drive/v3/files/'+d.id+'/permissions',{method:'POST',headers:{'Authorization':'Bearer '+googleToken,'Content-Type':'application/json'},body:JSON.stringify({role:'reader',type:'anyone'})});
  return d.id;
}

// Pasta raiz "Portal" — cria uma vez e reaproveita (cacheada na sessão) para todas as OS
let portalFolderId = null;
async function getPastaPortal() {
  if (portalFolderId) return portalFolderId;
  const cached = sessionStorage.getItem('ksh_portal_folder_id');
  if (cached) { portalFolderId = cached; return portalFolderId; }
  try {
    const q = encodeURIComponent("name='Portal' and mimeType='application/vnd.google-apps.folder' and trashed=false");
    const r = await fetch('https://www.googleapis.com/drive/v3/files?q=' + q + '&fields=files(id,name)', { headers: { 'Authorization': 'Bearer ' + googleToken } });
    const d = await r.json();
    portalFolderId = (d.files && d.files[0] && d.files[0].id) || await criarPastaDrive('Portal');
  } catch(e) {
    portalFolderId = await criarPastaDrive('Portal');
  }
  if (portalFolderId) sessionStorage.setItem('ksh_portal_folder_id', portalFolderId);
  return portalFolderId;
}

async function uploadDrive(file, folderId) {
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify({name:file.name,parents:folderId?[folderId]:[]})],{type:'application/json'}));
  form.append('file', file);
  const r = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,thumbnailLink',{method:'POST',headers:{'Authorization':'Bearer '+googleToken},body:form});
  const d = await r.json();
  if (d.id) await fetch('https://www.googleapis.com/drive/v3/files/'+d.id+'/permissions',{method:'POST',headers:{'Authorization':'Bearer '+googleToken,'Content-Type':'application/json'},body:JSON.stringify({role:'reader',type:'anyone'})});
  return d;
}

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('load', function() {
  // Verifica retorno do OAuth do Google (authorization code flow)
  const qs = new URLSearchParams(window.location.search);
  const gcode = qs.get('code');
  if (gcode && qs.get('scope') && qs.get('scope').includes('drive')) {
    history.replaceState(null, '', window.location.pathname);
    trocarCodigoGoogle(gcode);
  }
  // Verifica token convite Supabase
  const sp = new URLSearchParams(window.location.hash.substring(1));
  const token = sp.get('access_token');
  const type = sp.get('type');
  if ((type === 'invite' || type === 'recovery') && token) {
    history.replaceState(null, '', window.location.pathname);
    mostrarTelaReset(token);
    return;
  }
  // Restaura sessão
  const saved = sessionStorage.getItem('ksh_me');
  if (saved) {
    try { ME = JSON.parse(saved); iniciarApp(); } catch(e) { sessionStorage.clear(); }
  }
});

function mostrarTelaReset(token) {
  document.getElementById('v-login').innerHTML = `
  <div class="l-brand"><div class="l-brand-name">Kilian Smart Homes</div></div>
  <div class="l-card">
    <h2>Criar sua senha</h2><p>Escolha uma senha para acessar o portal</p>
    <label class="l-lbl">Nova senha</label>
    <div class="l-field"><input type="password" id="r-nova" placeholder="Mínimo 8 caracteres"></div>
    <label class="l-lbl">Confirmar senha</label>
    <div class="l-field"><input type="password" id="r-conf" placeholder="Repita a senha"></div>
    <button class="l-btn" onclick="salvarSenha('${token}')">Salvar e entrar</button>
    <div class="l-err" id="r-err"></div>
  </div>`;
}

async function salvarSenha(token) {
  const nova = document.getElementById('r-nova')?.value;
  const conf = document.getElementById('r-conf')?.value;
  if (nova.length < 8) { document.getElementById('r-err').textContent='Mínimo 8 caracteres'; document.getElementById('r-err').style.display='block'; return; }
  if (nova !== conf) { document.getElementById('r-err').textContent='As senhas não coincidem'; document.getElementById('r-err').style.display='block'; return; }
  const r = await fetch(SB_URL + '/auth/v1/user', { method:'PUT', headers:{'apikey':SB_KEY,'Authorization':'Bearer '+token,'Content-Type':'application/json'}, body:JSON.stringify({password:nova}) });
  const d = await r.json();
  if (r.ok) { ME = {email:d.email,nome:d.email.split('@')[0],funcao:'Gestor',ini:d.email.substring(0,2).toUpperCase(),token}; sessionStorage.setItem('ksh_me',JSON.stringify(ME)); iniciarApp(); }
}