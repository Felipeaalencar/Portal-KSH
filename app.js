const SB_URL = 'https://ayhijjbvvsioxpdsrouq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5aGlqamJ2dnNpb3hwZHNyb3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NzU2NzcsImV4cCI6MjA5MDE1MTY3N30.SymZWfUnyPMIt0gWOunQ9OrtKIMA0FG7s0TmODRiypY';
const GID = '1088652003799-j35u5263s0qkn91e8fiqddb4i2j3l11i.apps.googleusercontent.com';
let ME = null, googleToken = sessionStorage.getItem('ksh_drive_token') || null;
let googleTokenExpira = parseInt(sessionStorage.getItem('ksh_drive_token_exp') || '0', 10);

// ── I18N ──────────────────────────────────────────────────────
// Inglês é o padrão; português é opcional. tr('chave') devolve o texto no idioma atual.
let LANG = localStorage.getItem('ksh_lang') || 'en';

const I18N = {
  // Login
  login_brand_sub: { en: 'Management Portal · South Florida', pt: 'Portal de Gestão · South Florida' },
  login_title: { en: 'Welcome', pt: 'Bem-vindo' },
  login_subtitle: { en: 'Sign in to your account to continue', pt: 'Acesse sua conta para continuar' },
  login_label_email: { en: 'Email', pt: 'Email' },
  login_label_senha: { en: 'Password', pt: 'Senha' },
  login_btn_entrar: { en: 'Sign in', pt: 'Entrar' },
  login_btn_entrando: { en: 'Signing in...', pt: 'Entrando...' },
  login_forgot: { en: 'Forgot my password / First access', pt: 'Esqueci minha senha / Primeiro acesso' },
  login_footer: { en: 'Kilian Smart Homes © 2026', pt: 'Kilian Smart Homes © 2026' },
  login_err_fill: { en: 'Enter your email and password', pt: 'Preencha email e senha' },
  login_err_invalid: { en: 'Invalid email or password', pt: 'Email ou senha inválidos' },
  login_err_conn: { en: 'Connection error: ', pt: 'Erro de conexão: ' },
  login_err_forgot_email: { en: 'Enter your email first', pt: 'Digite seu email primeiro' },
  login_email_sent: { en: '✓ Email sent!', pt: '✓ Email enviado!' },
  logout_confirm: { en: 'Sign out of the portal?', pt: 'Sair do portal?' },
  logout_title: { en: 'Sign out', pt: 'Sair' },
  reset_min_chars: { en: 'Minimum 8 characters', pt: 'Mínimo 8 caracteres' },
  reset_mismatch: { en: 'Passwords do not match', pt: 'As senhas não coincidem' },
  reset_title: { en: 'Create your password', pt: 'Criar sua senha' },
  reset_subtitle: { en: 'Choose a password to access the portal', pt: 'Escolha uma senha para acessar o portal' },
  reset_new_pass: { en: 'New password', pt: 'Nova senha' },
  reset_new_pass_ph: { en: 'Minimum 8 characters', pt: 'Mínimo 8 caracteres' },
  reset_conf_pass: { en: 'Confirm password', pt: 'Confirmar senha' },
  reset_conf_pass_ph: { en: 'Repeat the password', pt: 'Repita a senha' },
  reset_save_btn: { en: 'Save and sign in', pt: 'Salvar e entrar' },

  // Sidebar sections
  sec_comercial: { en: 'SALES', pt: 'COMERCIAL' },
  sec_financeiro: { en: 'FINANCE', pt: 'FINANCEIRO' },
  sec_operacoes: { en: 'OPERATIONS', pt: 'OPERAÇÕES' },
  sec_projetos: { en: 'PROJECTS', pt: 'PROJETOS' },
  sec_pessoas: { en: 'PEOPLE MANAGEMENT', pt: 'GESTÃO DE PESSOAS' },
  sec_registros: { en: 'RECORDS', pt: 'REGISTROS' },

  // Sidebar nav items
  nav_inicio: { en: 'Home', pt: 'Início' },
  nav_acomp_vendas: { en: 'Sales Tracking', pt: 'Acomp. de Vendas' },
  nav_contratos: { en: 'Contracts', pt: 'Contratos' },
  nav_fat_consolidado: { en: 'Consolidated Billing', pt: 'Fat. Consolidado' },
  nav_crm_group: { en: 'CRM', pt: 'CRM' },
  nav_clientes: { en: 'Clients', pt: 'Clientes' },
  nav_orcamentos: { en: 'Quotes', pt: 'Orçamentos' },
  nav_followups: { en: 'Follow-ups', pt: 'Follow-ups' },
  nav_comissoes: { en: 'Commissions', pt: 'Comissões' },
  nav_consultores: { en: 'Consultants', pt: 'Consultores' },
  nav_motivos_reprovacao: { en: 'Rejection Reasons', pt: 'Motivos Reprovação' },
  nav_banco: { en: 'Bank', pt: 'Banco' },
  nav_dre: { en: 'P&L', pt: 'DRE' },
  nav_indicadores: { en: 'Indicators', pt: 'Indicadores' },
  nav_analise_crcp: { en: 'AR/AP Analysis', pt: 'Análise CR/CP' },
  nav_fluxo_caixa: { en: 'Cash Flow', pt: 'Fluxo de Caixa' },
  nav_gestao_patrimonio: { en: 'Asset Management', pt: 'Gestão Patrimônio' },
  nav_custeio: { en: 'Costing', pt: 'Custeio' },
  nav_despesas_group: { en: 'Expenses', pt: 'Despesas' },
  nav_lancar_despesa: { en: 'Log Expense', pt: 'Lançar Despesa' },
  nav_aprovar_despesas: { en: 'Approve Expenses', pt: 'Aprovar Despesas' },
  nav_controle_frota: { en: 'Fleet Control', pt: 'Controle de Frota' },
  nav_cadastros: { en: 'Records', pt: 'Cadastros' },
  nav_ordem_servico: { en: 'Work Order', pt: 'Ordem de Serviço' },
  nav_tecnicos: { en: 'Employees', pt: 'Funcionários' },
  nav_tarefas: { en: 'Tasks', pt: 'Tarefas' },
  nav_ferramentas: { en: 'Tools', pt: 'Ferramentas' },
  nav_documentos: { en: 'Documents', pt: 'Documentos' },
  nav_projetos_rack: { en: 'Rack', pt: 'Rack' },

  // Home
  home_wb_sub: { en: 'Management Portal · Kilian Smart Homes · South Florida', pt: 'Portal de Gestão · Kilian Smart Homes · South Florida' },
  home_stat_os: { en: 'OPEN WORK ORDERS', pt: 'OS ABERTAS' },
  home_stat_cli: { en: 'CLIENTS', pt: 'CLIENTES' },
  home_stat_tar: { en: 'TASKS', pt: 'TAREFAS' },
  home_welcome: { en: 'Welcome, ', pt: 'Bem-vindo, ' },

  badge_ativo: { en: '● Active', pt: '● Ativo' },
  badge_novo: { en: '● New', pt: '● Novo' },

  card_clientes_title: { en: 'Clients', pt: 'Clientes' },
  card_clientes_desc: { en: 'Client base with full history and details', pt: 'Base de clientes com histórico e dados completos' },
  card_orcamentos_title: { en: 'Quotes', pt: 'Orçamentos' },
  card_orcamentos_desc: { en: 'Proposal pipeline by status and consultant', pt: 'Pipeline de propostas por status e consultor' },
  card_followups_title: { en: 'Follow-ups', pt: 'Follow-ups' },
  card_followups_desc: { en: 'Lead tracking and pending alerts', pt: 'Acompanhamento de leads e alertas pendentes' },
  card_dashboard_title: { en: 'Dashboard', pt: 'Dashboard' },
  card_dashboard_desc: { en: 'Real-time financial KPIs via QuickBooks', pt: 'KPIs financeiros em tempo real via QuickBooks' },
  card_fluxo_title: { en: 'Cash Flow', pt: 'Fluxo de Caixa' },
  card_fluxo_desc: { en: '30/60/90 day projection with open invoices', pt: 'Projeção 30/60/90 dias com faturas em aberto' },
  card_despesas_title: { en: 'Expenses', pt: 'Despesas' },
  card_despesas_desc: { en: 'Logging and approval by category', pt: 'Lançamento e aprovação por categoria' },
  card_os_title: { en: 'Work Order', pt: 'Ordem de Serviço' },
  card_os_desc: { en: 'Work orders, field photos and reports', pt: 'Ordens de serviço, fotos em campo e relatórios' },
  card_tecnicos_title: { en: 'Employees', pt: 'Funcionários' },
  card_tecnicos_desc: { en: 'Employee records, role and hourly rate', pt: 'Cadastro dos funcionários, função e valor da hora trabalhada' },
  card_tarefas_title: { en: 'Tasks', pt: 'Tarefas' },
  card_tarefas_desc: { en: 'Team kanban synced with Google Calendar', pt: 'Kanban da equipe sincronizado com Google Calendar' },
  card_ferramentas_title: { en: 'Tools', pt: 'Ferramentas' },
  card_ferramentas_desc: { en: 'Equipment and toolkit inventory', pt: 'Inventário de equipamentos e maletas' },

  // Generic buttons / words
  btn_cancelar: { en: 'Cancel', pt: 'Cancelar' },
  btn_salvar: { en: 'Save', pt: 'Salvar' },
  btn_editar: { en: 'Edit', pt: 'Editar' },
  btn_cadastrar: { en: 'Register', pt: 'Cadastrar' },
  btn_atualizar: { en: '↻ Refresh', pt: '↻ Atualizar' },
  btn_deletar: { en: 'Delete', pt: 'Deletar' },
  btn_ver_detalhes: { en: 'View details', pt: 'Ver detalhes' },
  btn_em_breve: { en: 'Coming soon', pt: 'Em breve' },
  loading: { en: 'Loading...', pt: 'Carregando...' },
  em_desenvolvimento: { en: 'Under development', pt: 'Em desenvolvimento' },
  erro_prefix: { en: 'Error: ', pt: 'Erro: ' },

  // Clientes module
  clientes_search_ph: { en: 'Search by name, email or phone...', pt: 'Buscar por nome, email ou telefone...' },
  clientes_th_nome: { en: 'Name', pt: 'Nome' },
  clientes_th_email: { en: 'Email', pt: 'Email' },
  clientes_th_tel: { en: 'Phone', pt: 'Telefone' },
  clientes_th_end: { en: 'Address', pt: 'Endereço' },
  clientes_th_acoes: { en: 'Actions', pt: 'Ações' },
  clientes_th_cnpj: { en: 'CNPJ/CPF', pt: 'CNPJ/CPF' },
  clientes_th_cidade: { en: 'City/State', pt: 'Cidade/UF' },
  clientes_th_ultima_os: { en: 'Last service', pt: 'Última OS' },
  clientes_th_contrato: { en: 'Contract', pt: 'Contrato' },
  clientes_th_status: { en: 'Status', pt: 'Status' },
  clientes_filtro_ativos: { en: 'Active', pt: 'Ativos' },
  clientes_filtro_inativos: { en: 'Inactive', pt: 'Inativos' },
  clientes_filtro_todos: { en: 'All', pt: 'Todos' },
  clientes_filtro_contrato_todos: { en: 'With or without contract', pt: 'Com ou sem contrato' },
  clientes_filtro_com_contrato: { en: 'With contract', pt: 'Com contrato' },
  clientes_filtro_sem_contrato: { en: 'Without contract', pt: 'Sem contrato' },
  clientes_kpi_total: { en: 'Total clients', pt: 'Total de clientes' },
  clientes_kpi_ativos: { en: 'Active', pt: 'Ativos' },
  clientes_kpi_contrato: { en: 'With contract', pt: 'Com contrato' },
  clientes_kpi_risco: { en: 'No service 90+ days (at risk)', pt: 'Sem OS há +90d (risco de perda)' },
  clientes_sem_os: { en: 'No service yet', pt: 'Sem OS' },
  clientes_recente: { en: 'Recent', pt: 'Recente' },
  cliente_status_ativo: { en: 'Active', pt: 'Ativo' },
  cliente_status_inativo: { en: 'Inactive', pt: 'Inativo' },
  label_cnpj_cpf: { en: 'CNPJ/CPF', pt: 'CNPJ/CPF' },
  label_cidade: { en: 'City', pt: 'Cidade' },
  label_uf: { en: 'State (UF)', pt: 'UF' },
  label_tem_contrato: { en: 'Has an active contract', pt: 'Possui contrato ativo' },
  label_cliente_ativo: { en: 'Active client', pt: 'Cliente ativo' },
  sim: { en: 'Yes', pt: 'Sim' },

  // Orçamentos module
  orc_subtitle: { en: 'Proposal pipeline by status', pt: 'Pipeline de propostas por status' },
  orc_col_lead: { en: 'Lead', pt: 'Lead' },
  orc_col_rascunho: { en: 'Draft', pt: 'Rascunho' },
  orc_col_enviado: { en: 'Sent', pt: 'Enviado' },
  orc_col_negociacao: { en: 'In negotiation', pt: 'Em negociação' },
  orc_col_aprovado: { en: 'Approved', pt: 'Aprovado' },
  orc_col_convertido: { en: 'Converted', pt: 'Convertido' },
  orc_col_perdido: { en: 'Lost', pt: 'Perdido' },
  orc_kpi_total: { en: 'Total proposals', pt: 'Total de orçamentos' },
  orc_kpi_negociacao: { en: 'In negotiation ($)', pt: 'Em negociação ($)' },
  orc_kpi_aprovados: { en: 'Approved', pt: 'Aprovados' },
  orc_kpi_convertidos: { en: 'Converted', pt: 'Convertidos' },
  orc_kpi_parados: { en: 'Stalled 7+ days', pt: 'Parados +7d' },
  orc_vazio_coluna: { en: 'No proposals', pt: 'Nenhum orçamento' },
  orc_novo_title: { en: 'New Proposal', pt: 'Novo Orçamento' },
  orc_editar_title: { en: 'Edit Proposal', pt: 'Editar Orçamento' },
  btn_novo_orcamento: { en: '+ New Proposal', pt: '+ Novo Orçamento' },
  label_titulo_orcamento: { en: 'Title', pt: 'Título' },
  titulo_orcamento_ph: { en: 'Ex: Automation project - Alphaville residence', pt: 'Ex: Projeto de automação - Residência Alphaville' },
  label_cliente_orcamento: { en: 'Client', pt: 'Cliente' },
  cliente_busca_ph: { en: 'Search registered client...', pt: 'Buscar cliente cadastrado...' },
  label_valor_orcamento: { en: 'Estimated value ($)', pt: 'Valor estimado ($)' },
  label_descricao_orcamento: { en: 'Description', pt: 'Descrição' },
  descricao_orcamento_ph: { en: 'Scope, equipment, notes...', pt: 'Escopo, equipamentos, observações...' },
  orc_titulo_obrigatorio: { en: 'Enter a title for the proposal', pt: 'Informe um título para o orçamento' },
  orc_salvo: { en: 'Proposal saved!', pt: 'Orçamento salvo!' },
  orc_excluir_confirm: { en: 'Delete this proposal?', pt: 'Excluir este orçamento?' },
  orc_excluido: { en: 'Proposal deleted', pt: 'Orçamento excluído' },
  orc_editar: { en: 'Edit', pt: 'Editar' },
  orc_excluir: { en: 'Delete', pt: 'Excluir' },
  orc_dias_parado: { en: 'd stalled', pt: 'd parado' },
  orc_perdido_title: { en: 'Mark as Lost', pt: 'Marcar como Perdido' },
  orc_perdido_desc: { en: 'Select the reason this proposal was lost.', pt: 'Selecione o motivo pelo qual este orçamento foi perdido.' },
  label_motivo_perda: { en: 'Reason', pt: 'Motivo' },
  motivo_adicionar_novo: { en: '+ Add new reason', pt: '+ Adicionar novo motivo' },
  motivo_prompt_nome: { en: 'Name of the new reason:', pt: 'Nome do novo motivo:' },
  motivo_criado: { en: 'Reason added!', pt: 'Motivo adicionado!' },
  orc_perdido_motivo_obrigatorio: { en: 'Select a reason', pt: 'Selecione um motivo' },
  orc_marcado_perdido: { en: 'Proposal marked as lost', pt: 'Orçamento marcado como perdido' },
  orc_convertido_confirm: { en: 'Converting will create/link the client and automatically generate a new service order with the estimated value. Continue?', pt: 'Ao converter, o cliente será criado/vinculado e uma nova OS será gerada automaticamente com o valor orçado. Continuar?' },
  orc_convertido_sucesso: { en: 'Proposal converted! Service order NUM created.', pt: 'Orçamento convertido! OS NUM criada.' },
  orc_os_criada_automatica: { en: 'This column moves automatically when a proposal is converted or lost', pt: 'Esta coluna se move automaticamente ao converter ou perder um orçamento' },
  orc_sem_cliente: { en: 'No client linked', pt: 'Sem cliente vinculado' },
  orc_busca_ph: { en: 'Search proposals or leads...', pt: 'Buscar orçamentos ou leads...' },
  orc_filtro_todos_status: { en: 'All statuses', pt: 'Todos os status' },
  orc_filtro_todos_responsavel: { en: 'Everyone', pt: 'Todos' },
  orc_periodo_todos: { en: 'All time', pt: 'Todo período' },
  orc_periodo_7: { en: 'Last 7 days', pt: 'Últ. 7 dias' },
  orc_periodo_30: { en: 'Last 30 days', pt: 'Últ. 30 dias' },
  orc_periodo_90: { en: 'Last 90 days', pt: 'Últ. 90 dias' },
  orc_view_kanban: { en: 'Kanban', pt: 'Kanban' },
  orc_view_lista: { en: 'List', pt: 'Lista' },
  orc_view_analise: { en: 'Analysis', pt: 'Análise' },
  orc_view_leads: { en: 'Leads', pt: 'Leads' },
  orc_th_responsavel: { en: 'Owner', pt: 'Responsável' },
  orc_th_atualizado: { en: 'Updated', pt: 'Atualizado' },
  orc_none_found: { en: 'No proposals found', pt: 'Nenhum orçamento encontrado' },
  orc_analise_funil_title: { en: 'Proposals by stage', pt: 'Orçamentos por etapa' },
  orc_analise_motivos_title: { en: 'Reasons for loss', pt: 'Motivos de perda' },
  orc_analise_conversao: { en: 'Conversion rate (converted / converted+lost)', pt: 'Taxa de conversão (convertidos / convertidos+perdidos)' },
  orc_sem_motivo: { en: 'No reason given', pt: 'Sem motivo' },

  // Cadastros (Materiais / Mao de obra)
  cat_subtitle: { en: 'Materials and labor catalog for proposals', pt: 'Catálogo de materiais e mão de obra para propostas' },
  cat_busca_ph: { en: 'Search by name or description...', pt: 'Buscar por nome ou descrição...' },
  cat_filtro_todos: { en: 'All', pt: 'Todos' },
  cat_tipo_material: { en: 'Material', pt: 'Material' },
  cat_tipo_mao_obra: { en: 'Labor', pt: 'Mão de obra' },
  cat_none_found: { en: 'No items found', pt: 'Nenhum item encontrado' },
  cat_th_nome: { en: 'Name', pt: 'Nome' },
  cat_th_tipo: { en: 'Type', pt: 'Tipo' },
  cat_th_unidade: { en: 'Unit', pt: 'Unidade' },
  cat_th_preco: { en: 'Sell price', pt: 'Preço de venda' },
  btn_novo_item_catalogo: { en: '+ New Item', pt: '+ Novo Item' },
  cat_novo_title: { en: 'New Item', pt: 'Novo Item' },
  cat_editar_title: { en: 'Edit Item', pt: 'Editar Item' },
  label_tipo_item: { en: 'Type', pt: 'Tipo' },
  label_nome_item: { en: 'Name', pt: 'Nome' },
  cat_nome_ph: { en: 'Ex: 2000VA Pure Sinewave IP UPS', pt: 'Ex: 2000VA Pure Sinewave IP UPS' },
  label_descricao_item: { en: 'Description (optional)', pt: 'Descrição (opcional)' },
  cat_descricao_ph: { en: 'Item or service details...', pt: 'Detalhes do item ou serviço...' },
  label_unidade: { en: 'Unit (optional)', pt: 'Unidade (opcional)' },
  cat_unidade_ph: { en: 'ea, hour, m...', pt: 'un, hora, m...' },
  label_preco_venda: { en: 'Sell price ($)', pt: 'Preço de venda (US$)' },
  label_item_ativo: { en: 'Active item', pt: 'Item ativo' },
  cat_nome_obrigatorio: { en: 'Enter a name for the item', pt: 'Informe um nome para o item' },
  cat_salvo: { en: 'Item saved!', pt: 'Item salvo!' },
  cat_excluir_confirm: { en: 'Delete this item?', pt: 'Excluir este item?' },
  cat_excluido: { en: 'Item deleted', pt: 'Item excluído' },

  // Proposta detalhada (Areas/Itens do Orcamento)
  orc_proposta_label: { en: 'Detailed proposal', pt: 'Proposta detalhada' },
  orc_add_area_btn: { en: '+ Area', pt: '+ Área' },
  orc_add_item_btn: { en: '+ Item', pt: '+ Item' },
  orc_sem_areas: { en: 'No areas added yet', pt: 'Nenhuma área adicionada ainda' },
  orc_area_sem_itens: { en: 'No items in this area', pt: 'Nenhum item nesta área' },
  orc_area_total: { en: 'Area total:', pt: 'Total da área:' },
  orc_area_prompt_nome: { en: 'Area name:', pt: 'Nome da área:' },
  orc_area_excluir_confirm: { en: 'Delete this area and all its items?', pt: 'Excluir esta área e todos os itens dela?' },
  label_item_catalogo: { en: 'Catalog item', pt: 'Item do catálogo' },
  orc_item_add_title: { en: 'Add Item', pt: 'Adicionar Item' },
  orc_item_manual_opcao: { en: '-- type a custom item --', pt: '-- digitar um item manual --' },
  oi_busca_ph: { en: 'Search the catalog or type a custom item...', pt: 'Buscar no catálogo ou digitar item manual...' },
  orc_item_prompt_nome: { en: 'Item name:', pt: 'Nome do item:' },
  orc_item_nome_obrigatorio: { en: 'Enter a name for the item', pt: 'Informe um nome para o item' },
  label_imposto_pct: { en: 'Tax on materials (%)', pt: 'Imposto sobre material (%)' },
  orc_total_parts: { en: 'Total parts', pt: 'Total de material' },
  orc_total_labor: { en: 'Total labor', pt: 'Total de mão de obra' },
  orc_subtotal: { en: 'Subtotal', pt: 'Subtotal' },
  orc_imposto: { en: 'Tax', pt: 'Imposto' },
  orc_total_proposta: { en: 'Proposal total', pt: 'Total da proposta' },

  // Parcelamento (Payment Schedule)
  orc_parcelamento_label: { en: 'Payment schedule', pt: 'Parcelamento' },
  orc_add_parcela_btn: { en: '+ Payment', pt: '+ Parcela' },
  orc_sem_parcelas: { en: 'No payments added yet', pt: 'Nenhuma parcela adicionada ainda' },
  orc_parcela_excluir_confirm: { en: 'Delete this payment?', pt: 'Excluir esta parcela?' },
  orc_parcela_add_title: { en: 'Add Payment', pt: 'Adicionar Parcela' },
  orc_parcela_label: { en: 'Payment', pt: 'Parcela' },
  label_parcela_percentual: { en: '% of total', pt: '% do total' },
  label_parcela_condicao: { en: 'Payment condition', pt: 'Condição de pagamento' },
  parcela_condicao_ph: { en: 'e.g. Due upon job start', pt: 'Ex: Início do projeto' },
  orc_parcela_percentual_invalido: { en: 'Enter a percentage between 0 and 100', pt: 'Informe um percentual entre 0 e 100' },
  orc_parcela_condicao_obrigatoria: { en: 'Enter the payment condition', pt: 'Informe a condição de pagamento' },
  orc_parcelas_soma: { en: 'Total scheduled', pt: 'Total parcelado' },
  orc_parcelas_soma_aviso: { en: '(should add up to 100%)', pt: '(deveria somar 100%)' },

  // PDF da proposta
  orc_gerar_pdf_btn: { en: 'Generate PDF', pt: 'Gerar PDF' },
  orc_pdf_gerado: { en: 'PDF generated!', pt: 'PDF gerado!' },
  orc_pdf_ref: { en: 'Ref', pt: 'Ref' },
  orc_pdf_proposta_titulo: { en: 'Proposal', pt: 'Proposta' },
  orc_pdf_sem_titulo: { en: 'Untitled proposal', pt: 'Proposta sem título' },
  orc_pdf_data: { en: 'Date', pt: 'Data' },
  orc_pdf_cliente_secao: { en: 'Client', pt: 'Cliente' },
  orc_pdf_cliente_nome: { en: 'Name', pt: 'Nome' },
  orc_pdf_cliente_tel: { en: 'Phone', pt: 'Telefone' },
  orc_pdf_cliente_email: { en: 'Email', pt: 'Email' },
  orc_pdf_escopo: { en: 'Scope', pt: 'Escopo' },
  orc_pdf_total_proposta_label: { en: 'PROPOSAL TOTAL', pt: 'TOTAL DA PROPOSTA' },
  orc_pdf_areas_itens_titulo: { en: 'Areas & Items', pt: 'Áreas & Itens' },
  orc_pdf_col_item: { en: 'Item', pt: 'Item' },
  orc_pdf_col_qtd: { en: 'Qty', pt: 'Qtd' },
  orc_pdf_col_preco: { en: 'Price', pt: 'Preço' },
  orc_pdf_col_total: { en: 'Total', pt: 'Total' },
  orc_pdf_resumo_financeiro_titulo: { en: 'Financial Summary', pt: 'Resumo Financeiro' },

  // Projetos > Rack
  pt_projetos_rack: { en: 'Rack', pt: 'Rack' },
  rack_subtitle: { en: 'Visual rack diagrams for your projects', pt: 'Diagramas visuais de rack para seus projetos' },
  rack_novo_btn: { en: '+ New Rack', pt: '+ Novo Rack' },
  rack_novo_title: { en: 'New Rack', pt: 'Novo Rack' },
  label_nome_rack: { en: 'Rack name', pt: 'Nome do rack' },
  rack_nome_ph: { en: 'e.g. Turnberry 3504 Rack', pt: 'Ex: Rack Turnberry 3504' },
  label_tamanho_rack: { en: 'Size (U)', pt: 'Tamanho (U)' },
  rack_nome_obrigatorio: { en: 'Enter a name for the rack', pt: 'Informe um nome para o rack' },
  rack_salvo: { en: 'Rack saved!', pt: 'Rack salvo!' },
  rack_excluir_confirm: { en: 'Delete this rack and all its items?', pt: 'Excluir este rack e todos os itens dele?' },
  rack_excluido: { en: 'Rack deleted', pt: 'Rack excluído' },
  rack_none_found: { en: 'No racks yet', pt: 'Nenhum rack cadastrado ainda' },
  rack_th_nome: { en: 'Rack', pt: 'Rack' },
  rack_th_tamanho: { en: 'Size', pt: 'Tamanho' },
  rack_th_criado: { en: 'Created', pt: 'Criado em' },
  rack_abrir: { en: 'Open', pt: 'Abrir' },
  rack_editor_title: { en: 'Rack', pt: 'Rack' },
  rack_ocupacao_label: { en: 'Occupancy', pt: 'Ocupação' },
  rack_clique_livre: { en: 'Click a free slot in the rack to add an item', pt: 'Clique em um espaço livre no rack pra adicionar um item' },
  rack_enviar_os_btn: { en: 'Send to Work Order', pt: 'Enviar para OS' },
  rack_enviar_os_em_breve: { en: 'Coming soon', pt: 'Em breve' },
  rack_item_add_title: { en: 'Add Item', pt: 'Adicionar Item' },
  label_nome_item_rack: { en: 'Product name', pt: 'Nome do produto' },
  rack_item_nome_ph: { en: 'e.g. UniFi USW-24-G2 Switch', pt: 'Ex: Switch UniFi USW-24-G2' },
  label_altura_u: { en: 'Height (U)', pt: 'Altura (U)' },
  label_observacoes_item_rack: { en: 'Notes (optional)', pt: 'Observações (opcional)' },
  rack_item_obs_ph: { en: 'Ex: serial number, port used, install adjustment...', pt: 'Ex: número de série, porta usada, ajuste feito na instalação...' },
  rack_espaco_livre: { en: 'free space', pt: 'espaço livre' },
  rack_u_expansao: { en: 'U for expansion', pt: 'U de expansão' },
  rack_remover_item: { en: 'Remove', pt: 'Remover' },
  rack_item_excluir_confirm: { en: 'Remove this item from the rack?', pt: 'Remover este item do rack?' },
  rack_importar_foto_btn: { en: 'Import from photo (AI)', pt: 'Importar de foto (IA)' },
  rack_ler_foto_btn: { en: 'Read photo and fill in', pt: 'Ler foto e preencher' },
  rack_ia_lendo: { en: 'Reading photo...', pt: 'Lendo a foto...' },
  rack_ia_vazio: { en: 'Could not identify any equipment in this photo', pt: 'Não consegui identificar nenhum equipamento nessa foto' },
  rack_ia_sucesso: { en: 'Photo read!', pt: 'Foto lida!' },
  rack_ia_erro: { en: 'Error reading the photo', pt: 'Erro ao ler a foto' },
  rack_ia_itens_adicionados: { en: 'items added', pt: 'itens adicionados' },
  rack_ia_itens_ignorados: { en: 'items skipped (overlapping space)', pt: 'itens ignorados (espaço já ocupado)' },
  rack_ou_label: { en: 'or', pt: 'ou' },
  rack_montar_foto_btn: { en: 'Build automatically from a photo', pt: 'Montar automaticamente a partir de uma foto' },
  rack_editar_item_title: { en: 'Edit Item', pt: 'Editar Item' },
  rack_nome_padrao_importado: { en: 'Imported rack', pt: 'Rack importado' },
  rack_sugestao_titulo: { en: 'Expert suggestion (AI)', pt: 'Sugestão do especialista (IA)' },
  rack_sugestao_falta_cabeamento: { en: 'Cable organizer / patch panel', pt: 'Organizador de cabos / patch panel' },
  rack_sugestao_falta_energia: { en: 'Surge protector / power conditioner (PDU)', pt: 'Protetor de surto / condicionador de energia (PDU)' },
  rack_sugestao_resumo_intro: { en: 'In your rack I saw:', pt: 'No seu rack eu vi:' },
  rack_sugestao_resumo_criterio: { en: 'I suggest reorganizing with cabling/network at the top for easy access, control and AV sources in the middle, and heavier/power gear at the bottom for stability and weight distribution.', pt: 'Sugiro reorganizar com cabeamento/rede no topo para fácil acesso, controle e fontes de áudio/vídeo no meio, e o equipamento mais pesado/energia na base, para estabilidade e melhor distribuição de peso.' },
  rack_sugestao_resumo_vazio: { en: 'Add items to your rack to see a suggested layout here.', pt: 'Adicione itens ao seu rack para ver uma sugestão de organização aqui.' },
  rack_sugestao_resumo_faltantes: { en: 'I noticed these are missing:', pt: 'Notei que faltam:' },
  rack_arrastar_redimensionar: { en: 'Drag to resize', pt: 'Arraste para redimensionar' },
  rack_item_atualizado: { en: 'Item updated', pt: 'Item atualizado' },
  rack_ver_foto_original_btn: { en: 'View original photo', pt: 'Ver foto original' },
  rack_enviar_os_titulo: { en: 'Send rack to work order', pt: 'Enviar rack para OS' },
  label_buscar_os: { en: 'Search open work order', pt: 'Buscar OS aberta' },
  rack_os_busca_ph: { en: 'Client name or work order number', pt: 'Nome do cliente ou número da OS' },
  rack_os_nenhuma_aberta: { en: 'No open work orders found', pt: 'Nenhuma OS aberta encontrada' },
  rack_os_numero_label: { en: 'OS', pt: 'OS' },
  rack_pdf_titulo: { en: 'Rack', pt: 'Rack' },
  rack_enviando_os: { en: 'Sending...', pt: 'Enviando...' },
  rack_enviado_os_sucesso: { en: 'Rack sent to the work order', pt: 'Rack enviado para a OS' },
  rack_anexar_foto_btn: { en: 'Attach photo (no AI)', pt: 'Anexar foto (sem IA)' },
  rack_anexando_foto: { en: 'Attaching...', pt: 'Anexando...' },
  rack_foto_anexada_sucesso: { en: 'Photo attached', pt: 'Foto anexada' },
  rack_vinculado_label: { en: 'Linked rack', pt: 'Rack vinculado' },
  rack_nao_encontrado: { en: 'Rack not found', pt: 'Rack não encontrado' },
  rack_preview_title: { en: 'Rack', pt: 'Rack' },
  rack_ver_preview: { en: 'View', pt: 'Ver' },
  btn_fechar: { en: 'Close', pt: 'Fechar' },

  eu: { en: 'me', pt: 'eu' },
  btn_confirmar: { en: 'Confirm', pt: 'Confirmar' },


  clientes_none_found: { en: 'No clients found', pt: 'Nenhum cliente encontrado' },
  btn_novo_cliente: { en: '+ New Client', pt: '+ Novo Cliente' },
  clientes_subtitle: { en: 'Client base with full history and details', pt: 'Base de clientes com histórico e dados completos' },
  cliente_required_fields: { en: 'Fill in all required fields', pt: 'Preencha todos os campos obrigatórios' },
  cliente_cadastrado: { en: 'Client registered!', pt: 'Cliente cadastrado!' },
  cliente_atualizado: { en: 'Client updated!', pt: 'Cliente atualizado!' },
  modal_editar_cliente: { en: 'Edit Client', pt: 'Editar Cliente' },

  // Técnicos module
  tecnicos_subtitle: { en: 'Employee records, role and hourly rate', pt: 'Cadastro dos funcionários, função e valor da hora trabalhada' },
  btn_novo_tecnico: { en: '+ New Employee', pt: '+ Novo Funcionário' },
  tecnicos_search_ph: { en: 'Search by name, email or phone...', pt: 'Buscar por nome, email ou telefone...' },
  tecnicos_th_valor: { en: 'Hourly rate', pt: 'Valor/hora' },
  tecnicos_th_funcao: { en: 'Role', pt: 'Função' },
  tecnicos_none: { en: 'No technicians registered', pt: 'Nenhum técnico cadastrado' },
  tecnico_nome_obrigatorio: { en: 'Name is required', pt: 'Nome é obrigatório' },
  tecnico_cadastrado: { en: 'Employee registered!', pt: 'Funcionário cadastrado!' },
  tecnico_atualizado: { en: 'Employee updated!', pt: 'Funcionário atualizado!' },
  modal_novo_tecnico: { en: 'New Employee', pt: 'Novo Funcionário' },
  modal_editar_tecnico: { en: 'Edit Employee', pt: 'Editar Funcionário' },
  label_funcao: { en: 'Role', pt: 'Função' },
  funcao_adicionar_nova: { en: '+ Add new role...', pt: '+ Adicionar nova função...' },
  funcao_prompt_nome: { en: 'New role name:', pt: 'Nome da nova função:' },
  funcao_criada: { en: 'Role added', pt: 'Função adicionada' },
  btn_permissoes: { en: 'Permissions', pt: 'Permissões' },
  perm_sem_email: { en: 'This employee has no email on file, so permissions cannot be managed.', pt: 'Este funcionário não tem email cadastrado, não é possível gerenciar permissões.' },
  perm_sem_login: { en: 'This employee does not have a Portal login yet.', pt: 'Este funcionário ainda não tem login no Portal.' },
  perm_acesso_total: { en: 'Manager — full access, cannot be restricted', pt: 'Gestor — acesso total, não pode ser restringido' },
  perm_salvo: { en: 'Permissions saved', pt: 'Permissões salvas' },
  acesso_negado: { en: 'You do not have access to this page', pt: 'Você não tem permissão para acessar essa página' },
  label_modulos_liberados: { en: 'Modules released in the Portal', pt: 'Módulos liberados no Portal' },
  dia_status_agendado: { en: 'Scheduled', pt: 'Agendado' },
  dia_marcar_executado: { en: 'Mark as done', pt: 'Marcar como executado' },
  label_dia_executado: { en: 'Work has already been done', pt: 'Trabalho já foi executado' },
  resumo_dias_agendados_aviso: { en: 'scheduled day(s) not yet counted in the total', pt: 'dia(s) agendado(s) ainda não contabilizado(s) no total' },
  os_finalizada_label: { en: 'Completed order', pt: 'OS finalizada' },
  os_tab_geral: { en: 'Overview', pt: 'Visão geral' },
  os_tab_dias: { en: 'Days', pt: 'Dias' },
  os_tab_gastos: { en: 'Expenses', pt: 'Gastos' },
  os_tab_financeiro: { en: 'Finance', pt: 'Financeiro' },
  os_tab_fotos: { en: 'Photos', pt: 'Fotos' },
  os_tab_anotacoes: { en: 'Notes', pt: 'Anotações' },
  os_finalizar_label: { en: 'Finish order', pt: 'Finalizar OS' },
  os_finalizar_desc: { en: 'Generates the AI work summary and marks the order as completed', pt: 'Gera o resumo do trabalho com IA e marca a OS como concluída' },
  os_concluir_btn: { en: 'Complete order', pt: 'Concluir OS' },
  os_concluir_sem_resumo_confirm: { en: 'No day has notes to summarize. Complete the order anyway?', pt: 'Nenhum dia tem observação para resumir. Concluir a OS mesmo assim?' },
  os_concluida_sucesso: { en: 'Order marked as completed', pt: 'OS marcada como concluída' },
  os_reabrir_btn: { en: 'Reopen order', pt: 'Reabrir OS' },
  os_reabrir_confirm: { en: 'Reopen this order? It will go back to "In progress".', pt: 'Reabrir essa OS? Ela volta para "Em campo".' },
  os_reaberta_sucesso: { en: 'Order reopened', pt: 'OS reaberta' },
  nota_editar_prompt: { en: 'Edit note:', pt: 'Editar anotação:' },
  nota_texto_obrigatorio: { en: 'Note text is required', pt: 'Texto da anotação é obrigatório' },
  nota_atualizada: { en: 'Note updated', pt: 'Anotação atualizada' },
  nota_excluir_confirm: { en: 'Delete this note?', pt: 'Excluir essa anotação?' },
  nota_excluida: { en: 'Note deleted', pt: 'Anotação excluída' },
  label_horario_dia: { en: 'Start time / End time', pt: 'Hora início / Hora fim' },







  // Ordem de Serviço / KSHCam
  os_subtitle: { en: 'Work orders generated from approved quotes or created manually by technicians', pt: 'OS geradas por orçamentos aprovados ou criadas manualmente pelos técnicos' },
  btn_nova_os: { en: '+ New Work Order', pt: '+ Nova OS' },
  drive_nao_conectado: { en: '📁 Google Drive not connected — ', pt: '📁 Google Drive não conectado — ' },
  drive_conectar_agora: { en: 'Connect now', pt: 'Conectar agora' },
  drive_conectar_suffix: { en: ' to upload photos', pt: ' para fazer upload de fotos' },
  drive_nao_conectado_tecnico: { en: '📁 Google Drive not connected. Photos will sync automatically once the manager reconnects it.', pt: '📁 Google Drive não conectado. As fotos vão sincronizar automaticamente assim que o gestor reconectar.' },
  drive_conectado: { en: '✅ Google Drive connected', pt: '✅ Google Drive conectado' },
  drive_reconectar: { en: 'Reconnect', pt: 'Reconectar' },
  kpi_total: { en: 'TOTAL', pt: 'TOTAL' },
  kpi_abertas: { en: 'OPEN', pt: 'ABERTAS' },
  kpi_em_campo: { en: 'IN FIELD', pt: 'EM CAMPO' },
  kpi_concluidas: { en: 'COMPLETED', pt: 'CONCLUÍDAS' },
  os_search_ph: { en: 'Search work order...', pt: 'Buscar OS...' },
  os_filtro_todos: { en: 'All statuses', pt: 'Todos os status' },
  status_aberta: { en: 'Open', pt: 'Aberta' },
  status_agendada: { en: 'Scheduled', pt: 'Agendada' },
  status_em_campo: { en: 'In field', pt: 'Em campo' },
  status_concluida: { en: 'Completed', pt: 'Concluída' },
  os_manual: { en: 'Manual', pt: 'Manual' },
  os_de_orcamento: { en: 'From quote', pt: 'De orçamento' },
  os_sem_titulo: { en: 'No title', pt: 'Sem título' },
  os_none_found: { en: 'No work orders found', pt: 'Nenhuma OS encontrada' },
  os_ver_no_drive: { en: '📁 View on Drive', pt: '📁 Ver no Drive' },
  os_abrir_drive: { en: '📁 Open Drive folder', pt: '📁 Abrir pasta no Google Drive' },
  os_cliente_label: { en: 'Client', pt: 'Cliente' },
  os_tecnico_label: { en: 'Technician', pt: 'Técnico' },
  os_por: { en: 'By ', pt: 'Por ' },
  os_endereco_label: { en: 'Address', pt: 'Endereço' },
  os_servico_label: { en: 'Service', pt: 'Serviço' },
  os_status_label: { en: 'Status', pt: 'Status' },
  os_salvar_alteracoes: { en: '💾 Save changes', pt: '💾 Salvar alterações' },
  os_fotos_label: { en: 'Photos', pt: 'Fotos' },
  os_dias_label: { en: 'Work days', pt: 'Dias de trabalho' },
  os_gastos_label: { en: 'Expenses', pt: 'Gastos' },
  resumo_valores_label: { en: 'Value summary', pt: 'Resumo de valores' },
  resumo_custo_real: { en: 'Real cost', pt: 'Custo real' },
  resumo_margem: { en: 'Margin', pt: 'Margem' },
  label_valor_orcado: { en: 'Quoted value', pt: 'Valor orçado' },
  valor_orcado_ph: { en: 'Ex: 2400.00', pt: 'Ex: 2400.00' },
  resumo_orcado_salvo: { en: 'Quoted value saved', pt: 'Valor orçado salvo' },
  resumo_cobranca_label: { en: 'Billing:', pt: 'Cobrança:' },
  resumo_a_cobrar: { en: 'To bill', pt: 'A cobrar' },
  resumo_cobrado: { en: 'Billed', pt: 'Cobrado' },
  resumo_sem_custo: { en: 'No charge', pt: 'Sem custo' },
  resumo_todos: { en: 'All', pt: 'Todos' },
  nav_rentabilidade: { en: 'Profitability by OS', pt: 'Rentabilidade por OS' },
  rentabilidade_subtitle: { en: 'Quoted value vs real cost, by work order', pt: 'Valor orçado x custo real, por ordem de serviço' },
  rentabilidade_vazio: { en: 'No work order found for this filter', pt: 'Nenhuma OS encontrada para esse filtro' },
  rent_status_todos: { en: 'All', pt: 'Todas' },
  rent_status_andamento: { en: 'In progress', pt: 'Em andamento' },
  rent_status_concluida: { en: 'Completed', pt: 'Concluídas' },
  rent_th_os: { en: 'OS', pt: 'OS' },
  rent_th_cliente: { en: 'Client', pt: 'Cliente' },
  rent_total_periodo: { en: 'Period total', pt: 'Total do período' },
  rel_imprimir: { en: 'Print / Export PDF', pt: 'Imprimir / Exportar PDF' },
  rel_grafico_orcado_custo: { en: 'Quoted x Real cost', pt: 'Orçado x Custo real' },
  rel_grafico_composicao: { en: 'Cost breakdown', pt: 'Composição do custo' },
  resumo_mao_obra: { en: 'Labor', pt: 'Mão de obra' },
  resumo_sem_valor_hora: { en: 'no hourly rate set', pt: 'sem valor/hora cadastrado' },
  resumo_sem_dias: { en: 'No work day logged yet', pt: 'Nenhum dia de trabalho registrado ainda' },
  resumo_pendentes: { en: 'pending', pt: 'pendentes' },
  resumo_total: { en: 'Total', pt: 'Total' },
  resumo_gerar_ia: { en: 'Generate work summary with AI', pt: 'Gerar resumo do trabalho com IA' },
  resumo_trabalho_label: { en: 'Work summary', pt: 'Resumo do trabalho' },
  resumo_sem_observacoes: { en: 'No day has notes to summarize yet', pt: 'Nenhum dia tem observação pra resumir ainda' },
  resumo_salvo: { en: 'Summary saved', pt: 'Resumo salvo' },
  gasto_lancar_btn: { en: '+ Log expense', pt: '+ Lançar despesa' },
  gasto_sem_registro: { en: 'No expense logged yet', pt: 'Nenhum gasto lançado ainda' },
  gasto_total_aprovado: { en: 'Approved total', pt: 'Total aprovado' },
  gasto_novo_title: { en: 'Log expense', pt: 'Lançar despesa' },
  gasto_editar_title: { en: 'Edit expense', pt: 'Editar despesa' },
  btn_lancar_gasto: { en: 'Log expense', pt: 'Lançar despesa' },
  label_fornecedor: { en: 'Vendor', pt: 'Fornecedor' },
  gasto_fornecedor_ph: { en: 'Ex: Shell gas station', pt: 'Ex: Posto Shell' },
  label_descricao_gasto: { en: 'Description / item', pt: 'Descrição / item' },
  gasto_descricao_ph: { en: 'Ex: Fuel, lunch, 2x Lutron dimmer...', pt: 'Ex: Combustível, almoço, 2x dimmer Lutron...' },
  label_categoria: { en: 'Category', pt: 'Categoria' },
  cat_alimentacao: { en: 'Food', pt: 'Alimentação' },
  cat_combustivel: { en: 'Fuel', pt: 'Combustível' },
  cat_pedagio: { en: 'Toll', pt: 'Pedágio' },
  cat_material: { en: 'Material/part', pt: 'Material/peça' },
  cat_hospedagem: { en: 'Lodging', pt: 'Hospedagem' },
  cat_outro: { en: 'Other', pt: 'Outro' },
  label_dia_vinculado: { en: 'Work day (optional)', pt: 'Dia de trabalho (opcional)' },
  gasto_sem_dia_vinculado: { en: 'Not linked to a specific day', pt: 'Sem vínculo com um dia específico' },
  label_quantidade: { en: 'Quantity', pt: 'Quantidade' },
  label_valor_unitario: { en: 'Unit price (US$)', pt: 'Valor unitário (US$)' },
  label_valor_total: { en: 'Total value (US$)', pt: 'Valor total (US$)' },
  label_comprovante: { en: 'Receipt (optional)', pt: 'Comprovante (opcional)' },
  gasto_anexar_foto: { en: 'Attach photo', pt: 'Anexar foto' },
  gasto_foto_ja_anexada: { en: 'Photo already attached', pt: 'Foto já anexada' },
  gasto_preencher_ia: { en: '🪄 Auto-fill', pt: '🪄 Preencher automaticamente' },
  gasto_ia_lendo: { en: 'Reading receipt...', pt: 'Lendo a nota...' },
  gasto_ia_sucesso: { en: 'Data filled in — check before saving', pt: 'Dados preenchidos — confira antes de salvar' },
  gasto_ia_erro: { en: "Couldn't read the receipt", pt: 'Não consegui ler a nota' },
  gasto_ia_vazio: { en: "Couldn't identify any data in this photo — try a clearer photo or fill in manually", pt: 'Não consegui identificar dados nessa foto — tente uma foto mais nítida ou preencha manualmente' },
  gasto_valor_obrigatorio: { en: 'Enter a value', pt: 'Preencha o valor' },
  gasto_salvo: { en: 'Expense saved', pt: 'Despesa salva' },
  gasto_excluir_confirm: { en: 'Delete this expense?', pt: 'Excluir essa despesa?' },
  gasto_rejeitar_confirm: { en: 'Reject this expense?', pt: 'Rejeitar essa despesa?' },
  gasto_sem_descricao: { en: 'Expense', pt: 'Despesa' },
  gasto_ver_comprovante: { en: 'view receipt', pt: 'ver comprovante' },
  gasto_aprovar: { en: 'Approve', pt: 'Aprovar' },
  gasto_rejeitar: { en: 'Reject', pt: 'Rejeitar' },
  gasto_status_pendente: { en: 'Pending', pt: 'Pendente' },
  gasto_status_aprovado: { en: 'Approved', pt: 'Aprovado' },
  gasto_status_rejeitado: { en: 'Rejected', pt: 'Rejeitado' },
  dia_adicionar_btn: { en: '+ Add day', pt: '+ Adicionar dia' },
  dia_sem_registro: { en: 'No work day logged yet', pt: 'Nenhum dia de trabalho registrado ainda' },
  dia_novo_title: { en: 'New work day', pt: 'Novo dia de trabalho' },
  dia_editar_title: { en: 'Edit work day', pt: 'Editar dia de trabalho' },
  btn_criar_dia: { en: 'Add day', pt: 'Adicionar dia' },
  label_observacao_dia: { en: 'Day notes (optional)', pt: 'Observação do dia (opcional)' },
  dia_observacao_ph: { en: 'What was done that day...', pt: 'O que foi feito nesse dia...' },
  dia_data_obrigatoria: { en: 'Enter a date', pt: 'Preencha a data' },
  dia_salvo: { en: 'Work day saved', pt: 'Dia salvo' },
  dia_excluir_confirm: { en: 'Delete this work day?', pt: 'Excluir esse dia de trabalho?' },
  os_adicionar_foto: { en: '📷 Add', pt: '📷 Adicionar' },
  os_sem_fotos: { en: 'No photos yet. Tap "Add" to start.', pt: 'Nenhuma foto. Toque em "Adicionar" para começar.' },
  os_notepad_label: { en: 'Notepad', pt: 'Bloco de notas' },
  os_notepad_ph: { en: 'Free notes about this job (internal use, not shown to the client)...', pt: 'Anotações livres sobre este serviço (uso interno, não aparece pro cliente)...' },
  os_notepad_salvar: { en: 'Save notepad', pt: 'Salvar bloco de notas' },
  os_notepad_salvo: { en: 'Notepad saved', pt: 'Bloco de notas salvo' },
  os_notepad_resumir: { en: '🎙️ Summarize with AI', pt: '🎙️ Resumir com IA' },
  notepad_trecho_adicionado: { en: 'Voice note added to the notepad', pt: 'Trecho de voz adicionado ao bloco de notas' },
  os_servico_salvo: { en: 'Service description saved', pt: 'Descrição do serviço salva' },
  foto_marcar_privada: { en: 'Mark as private (hidden from client)', pt: 'Marcar como privada (não aparece pro cliente)' },
  foto_marcar_publica: { en: 'Mark as visible to client', pt: 'Marcar como visível pro cliente' },
  foto_privada_badge: { en: 'Private', pt: 'Privada' },
  foto_excluir_title: { en: 'Delete photo', pt: 'Excluir foto' },
  foto_excluir_confirm: { en: 'Delete this photo? This cannot be undone.', pt: 'Excluir essa foto? Essa ação não pode ser desfeita.' },
  foto_excluida: { en: 'Photo deleted', pt: 'Foto excluída' },
  os_gerar_pdf: { en: '📄 Generate client PDF', pt: '📄 Gerar PDF do cliente' },
  os_gerando_pdf: { en: 'Generating PDF...', pt: 'Gerando PDF...' },
  os_pdf_titulo: { en: 'Service order', pt: 'Ordem de serviço' },
  os_pdf_cliente: { en: 'Client', pt: 'Cliente' },
  os_pdf_endereco: { en: 'Address', pt: 'Endereço' },
  os_pdf_status: { en: 'Status', pt: 'Status' },
  os_pdf_servico: { en: 'Service description', pt: 'Descrição do serviço' },
  os_pdf_anotacoes: { en: 'Notes from the visit', pt: 'Anotações do atendimento' },
  os_pdf_fotos: { en: 'Photos', pt: 'Fotos' },
  os_pdf_sem_anotacoes: { en: 'No notes recorded.', pt: 'Nenhuma anotação registrada.' },
  os_pdf_sem_fotos: { en: 'No photos to show.', pt: 'Nenhuma foto para mostrar.' },
  os_pdf_fotos_drive_offline: { en: 'Connect Google Drive to include photos in the PDF.', pt: 'Conecte o Google Drive para incluir as fotos no PDF.' },
  os_pdf_gerado: { en: 'PDF generated', pt: 'PDF gerado' },
  fe_mover: { en: 'Move', pt: 'Mover' },
  fe_caneta: { en: 'Pen', pt: 'Caneta' },
  fe_seta: { en: 'Arrow', pt: 'Seta' },
  fe_circulo: { en: 'Circle', pt: 'Círculo' },
  fe_texto: { en: 'Text', pt: 'Texto' },
  fe_tam_p: { en: 'S', pt: 'P' },
  fe_tam_m: { en: 'M', pt: 'M' },
  fe_tam_g: { en: 'L', pt: 'G' },
  fe_tam_title: { en: 'Text size', pt: 'Tamanho do texto' },
  fe_texto_ph: { en: 'Write the annotation and confirm', pt: 'Escreva a anotação e confirme' },
  fe_dica: { en: 'Text: click the point to write. Arrow/Circle: drag. Move: drag any mark to reposition.', pt: 'Texto: clique no ponto pra escrever. Seta/Círculo: arraste. Mover: arraste qualquer marcação pra reposicionar.' },
  fe_abrir_original: { en: 'Open original in Drive', pt: 'Abrir original no Drive' },
  fe_comentario_ph: { en: 'Write a comment...', pt: 'Escreva um comentário...' },
  fe_postar: { en: 'Post', pt: 'Postar' },
  fe_sem_comentarios: { en: 'No comments yet.', pt: 'Nenhum comentário ainda.' },
  fe_salvo: { en: 'Annotations saved', pt: 'Marcações salvas' },
  btn_desfazer: { en: 'Undo', pt: 'Desfazer' },
  btn_limpar: { en: 'Clear', pt: 'Limpar' },
  btn_adicionar: { en: 'Add', pt: 'Adicionar' },
  foto_tem_marcacao: { en: 'Has markup', pt: 'Tem marcação' },
  os_enviando: { en: 'Uploading...', pt: 'Enviando...' },
  os_enviando_progresso: { en: 'Uploading ', pt: 'Enviando ' },
  cliente_selecione_um: { en: 'Select a client from the CRM', pt: 'Selecione um cliente do CRM' },
  os_anotacoes_label: { en: 'Notes', pt: 'Anotações' },
  os_sem_anotacoes: { en: 'No notes yet.', pt: 'Nenhuma anotação.' },
  os_add_nota_ph: { en: 'Add a note...', pt: 'Adicionar anotação...' },
  os_enviar: { en: 'Send', pt: 'Enviar' },
  nota_gravar_title: { en: 'Record a voice note', pt: 'Gravar uma anotação por voz' },
  nota_gravando: { en: 'Recording... tap to stop', pt: 'Gravando... toque pra parar' },
  nota_transcrevendo: { en: 'Transcribing audio...', pt: 'Transcrevendo áudio...' },
  nota_erro_microfone: { en: "Couldn't access the microphone", pt: 'Não foi possível acessar o microfone' },
  nota_erro_transcricao: { en: 'Could not transcribe the audio', pt: 'Não foi possível transcrever o áudio' },
  nota_audio_vazio: { en: "Didn't understand any speech, try again", pt: 'Não entendi nenhuma fala, tenta de novo' },
  os_gerando: { en: 'Generating...', pt: 'Gerando...' },
  os_resumo_ia: { en: 'AI suggested summary', pt: 'Resumo sugerido pela IA' },
  os_confirmar: { en: '✓ Confirm', pt: '✓ Confirmar' },
  os_editar_nota: { en: '✎ Edit', pt: '✎ Editar' },
  os_concluir_edicao: { en: '✓ Done editing', pt: '✓ Concluir edição' },
  os_titulo_obrigatorio: { en: 'Title is required', pt: 'Título obrigatório' },
  os_selecione_cliente: { en: 'Select a client from the CRM', pt: 'Selecione um cliente do CRM' },
  os_criada: { en: 'Work Order #', pt: 'OS #' },
  os_prefix: { en: 'WO #', pt: 'OS #' },
  os_criada_suffix: { en: ' created!', pt: ' criada!' },
  os_existente_title: { en: 'There is already an open OS for this client', pt: 'Já existe uma OS aberta para esse cliente' },
  os_existente_info: { en: 'OS #NUM · CLIENTE — "TITULO". Attach this day to it, or create a separate OS.', pt: 'OS #NUM · CLIENTE — "TITULO". Anexar esse dia nela, ou criar uma OS separada.' },
  os_existente_criar_nova: { en: 'Create separate OS', pt: 'Criar OS separada' },
  os_existente_anexar: { en: 'Attach to this OS', pt: 'Anexar nessa OS' },
  tarefa_anexada_os: { en: 'Day added to OS #NUM', pt: 'Dia adicionado na OS #NUM' },
  os_atualizada: { en: 'Work order updated!', pt: 'OS atualizada!' },
  os_status_atualizado: { en: 'Status updated!', pt: 'Status atualizado!' },
  os_deletar_confirm: { en: 'Delete work order "', pt: 'Deletar OS "' },
  os_deletar_confirm2: { en: '"?\nThis action cannot be undone.', pt: '"?\nEsta ação não pode ser desfeita.' },
  os_drive_confirm: { en: 'This work order has a folder with photos on Google Drive.\n\nDelete that folder too? (it goes to Google trash, not deleted instantly)\n\nOK = delete folder too\nCancel = keep the folder on Drive', pt: 'Esta OS tem uma pasta com fotos no Google Drive.\n\nApagar essa pasta também? (ela vai para a lixeira do Google, não é apagada na hora)\n\nOK = apagar pasta também\nCancelar = manter a pasta no Drive' },
  os_drive_nao_conectado_del: { en: 'Google Drive not connected — the folder was not deleted, only the work order', pt: 'Google Drive não conectado — a pasta não foi apagada, só a OS' },
  os_drive_erro_del: { en: 'Could not delete the Drive folder', pt: 'Não foi possível apagar a pasta do Drive' },
  os_deletada: { en: 'Work order deleted', pt: 'OS deletada' },
  fotos_enviadas: { en: 'Photos uploaded!', pt: 'Fotos enviadas!' },
  drive_erro_pasta: { en: 'Could not create the folder on Drive — check your Google Drive connection', pt: 'Não foi possível criar a pasta no Drive — verifique a conexão do Google Drive' },
  drive_conecte_primeiro: { en: 'Connect Google Drive first', pt: 'Conecte o Google Drive primeiro' },
  drive_expirou: { en: 'Google Drive connection expired — click "Connect now"', pt: 'Conexão com o Google Drive expirou — clique em "Conectar agora"' },
  anotacao_salva: { en: 'Note saved!', pt: 'Anotação salva!' },

  // Nova OS modal
  modal_nova_os_title: { en: 'New Work Order', pt: 'Nova Ordem de Serviço' },
  label_titulo: { en: 'Title *', pt: 'Título *' },
  os_titulo_ph: { en: 'Ex: Crestron system installation', pt: 'Ex: Instalação sistema Crestron' },
  label_cliente_buscar: { en: 'Client * <span style="color:#888;font-weight:400">(search in CRM)</span>', pt: 'Cliente * <span style="color:#888;font-weight:400">(buscar no CRM)</span>' },
  os_cli_busca_ph: { en: 'Type the name...', pt: 'Digite o nome...' },
  os_trocar: { en: 'Change', pt: 'Trocar' },
  os_cli_nao_encontrado: { en: 'Not found. ', pt: 'Não encontrado. ' },
  os_cadastrar_novo_cliente: { en: 'Register new client', pt: 'Cadastrar novo cliente' },
  label_tecnico_resp: { en: 'Assigned technician', pt: 'Técnico responsável' },
  os_tecnico_ph: { en: "Technician's name", pt: 'Nome do técnico' },
  os_tecnico_selecione: { en: 'Select a technician...', pt: 'Selecione um técnico...' },
  os_tecnico_nao_cadastrado: { en: 'not registered', pt: 'não cadastrado' },
  label_desc_servico: { en: 'Service description', pt: 'Descrição do serviço' },
  os_desc_ph: { en: 'Describe the service...', pt: 'Descreva o serviço...' },
  btn_criar_os: { en: 'Create Work Order', pt: 'Criar OS' },

  // Cadastro cliente (from Nova OS flow)
  modal_cadastrar_cliente: { en: 'Register New Client', pt: 'Cadastrar Novo Cliente' },
  cliente_crm_notice: { en: 'It will be registered in the CRM before creating the work order.', pt: 'Será cadastrado no CRM antes de criar a OS.' },
  label_nome_completo: { en: 'Full name *', pt: 'Nome completo *' },
  nome_completo_ph: { en: 'Full name', pt: 'Nome completo' },
  label_email_req: { en: 'Email *', pt: 'Email *' },
  email_ph: { en: 'email@example.com', pt: 'email@exemplo.com' },
  label_tel_req: { en: 'Phone *', pt: 'Telefone *' },
  tel_ph: { en: 'Ex: +55 11 91234-5678 or (555) 000-0000', pt: 'Ex: +55 11 91234-5678 ou (555) 000-0000' },
  label_end_req: { en: 'Address *', pt: 'Endereço *' },
  end_ph: { en: 'Full address', pt: 'Endereço completo' },
  label_contato_adicional: { en: 'Additional contact', pt: 'Contato adicional' },
  contato_adicional_ph: { en: 'Ex: doorman...', pt: 'Ex: porteiro...' },
  btn_cadastrar_e_usar: { en: 'Register and use', pt: 'Cadastrar e usar' },

  // Editar OS modal
  modal_editar_os: { en: 'Edit Work Order', pt: 'Editar OS' },
  label_status: { en: 'Status', pt: 'Status' },
  label_tecnico: { en: 'Technician', pt: 'Técnico' },
  label_descricao: { en: 'Description', pt: 'Descrição' },
  cliente_colon: { en: 'Client: ', pt: 'Cliente: ' },

  // Novo Cliente (CRM tab)
  modal_novo_cliente: { en: 'New Client', pt: 'Novo Cliente' },
  label_equipamentos: { en: 'Equipment', pt: 'Equipamentos' },
  equipamentos_ph: { en: 'Ex: Control4, Lutron...', pt: 'Ex: Control4, Lutron...' },
  label_observacoes: { en: 'Notes', pt: 'Observações' },
  observacoes_ph: { en: 'Notes...', pt: 'Observações...' },

  // Novo Técnico
  label_tel_opt: { en: 'Phone', pt: 'Telefone' },
  label_email_opt: { en: 'Email', pt: 'Email' },
  label_valor_hora: { en: 'Hourly rate (US$)', pt: 'Valor da hora trabalhada (US$)' },
  valor_hora_ph: { en: 'Ex: 45.00', pt: 'Ex: 45.00' },

  // Page titles (topbar breadcrumb / mod header)
  pt_inicio: { en: 'Home', pt: 'Início' },
  pt_acomp_vendas: { en: 'Sales Tracking', pt: 'Acomp. de Vendas' },
  pt_contratos: { en: 'Contracts', pt: 'Contratos' },
  pt_fat_consolidado: { en: 'Consolidated Billing', pt: 'Fat. Consolidado' },
  pt_crm_clientes: { en: 'Clients', pt: 'Clientes' },
  pt_crm_orcamentos: { en: 'Quotes', pt: 'Orçamentos' },
  pt_crm_followups: { en: 'Follow-ups', pt: 'Follow-ups' },
  pt_crm_comissoes: { en: 'Commissions', pt: 'Comissões' },
  pt_crm_consultores: { en: 'Consultants', pt: 'Consultores' },
  pt_crm_reprovacao: { en: 'Rejection Reasons', pt: 'Motivos Reprovação' },
  pt_fin_banco: { en: 'Bank', pt: 'Banco' },
  pt_fin_dre: { en: 'P&L', pt: 'DRE' },
  pt_fin_indicadores: { en: 'Indicators', pt: 'Indicadores' },
  pt_fin_analise: { en: 'AR/AP Analysis', pt: 'Análise CR/CP' },
  pt_fin_fluxo: { en: 'Cash Flow', pt: 'Fluxo de Caixa' },
  pt_fin_patrimonio: { en: 'Asset Management', pt: 'Gestão Patrimônio' },
  pt_fin_custeio: { en: 'Costing', pt: 'Custeio' },
  pt_desp_lancar: { en: 'Log Expense', pt: 'Lançar Despesa' },
  pt_desp_aprovar: { en: 'Approve Expenses', pt: 'Aprovar Despesas' },
  pt_fin_frota: { en: 'Fleet Control', pt: 'Controle de Frota' },
  nav_veiculos: { en: 'Vehicles', pt: 'Veículos' },
  pt_fin_cadastros: { en: 'Records', pt: 'Cadastros' },
  pt_kshcam: { en: 'Work Order', pt: 'Ordem de Serviço' },
  pt_tecnicos: { en: 'Employees', pt: 'Funcionários' },
  pt_tarefas: { en: 'Tasks', pt: 'Tarefas' },
  pt_ferramentas: { en: 'Tools', pt: 'Ferramentas' },
  pt_documentos: { en: 'Documents', pt: 'Documentos' },
  sub_tarefas: { en: 'Team schedule synced with Google Calendar', pt: 'Agenda da equipe sincronizada com Google Calendar' },
  sub_ferramentas: { en: 'Equipment, toolkit and materials inventory', pt: 'Inventário de equipamentos, maletas e materiais' },
  sub_documentos: { en: 'Licenses, insurance, permits and manuals', pt: 'Licenças, seguros, alvarás e manuais' },
  doc_novo_title: { en: 'New document', pt: 'Novo documento' },
  doc_editar_title: { en: 'Edit document', pt: 'Editar documento' },
  btn_novo_documento: { en: '+ New document', pt: '+ Novo documento' },
  label_titulo_documento: { en: 'Title', pt: 'Título do documento' },
  doc_titulo_ph: { en: 'Ex: Business license', pt: 'Ex: Alvará de funcionamento' },
  cat_licenca: { en: 'License', pt: 'Licença' },
  cat_seguro: { en: 'Insurance', pt: 'Seguro' },
  cat_alvara: { en: 'Permit', pt: 'Alvará' },
  cat_manual: { en: 'Manual', pt: 'Manual' },
  cat_tecnico: { en: 'Technical', pt: 'Documento técnico' },
  cat_registro: { en: 'Record', pt: 'Registro' },
  label_orgao_emissor: { en: 'Issuer', pt: 'Órgão emissor / fornecedor' },
  doc_orgao_ph: { en: 'Ex: City hall, insurer, manufacturer', pt: 'Ex: Prefeitura, seguradora, fabricante' },
  label_numero_documento: { en: 'Document number', pt: 'Número do documento' },
  doc_numero_ph: { en: 'Optional', pt: 'Opcional' },
  label_data_emissao: { en: 'Issue date', pt: 'Data de emissão' },
  label_data_validade: { en: 'Expiry date', pt: 'Data de validade' },
  doc_sem_validade_hint: { en: 'Leave blank if it does not expire', pt: 'Deixe em branco se não tiver validade' },
  label_observacoes_doc: { en: 'Notes', pt: 'Observações' },
  doc_observacoes_ph: { en: 'Optional notes', pt: 'Observações opcionais' },
  label_arquivo_documento: { en: 'File', pt: 'Arquivo' },
  doc_anexar_arquivo: { en: 'Attach file (photo or PDF)', pt: 'Anexar arquivo (foto ou PDF)' },
  doc_arquivo_ja_anexado: { en: 'File already attached', pt: 'Arquivo já anexado' },
  doc_ia_disponivel_apenas_foto: { en: 'Auto-fill only works with a photo (not PDF)', pt: 'Preenchimento automático só funciona com foto (não com PDF)' },
  doc_ia_lendo: { en: 'Reading document with AI…', pt: 'Lendo documento com IA…' },
  doc_ia_sucesso: { en: 'Fields filled! Review before saving.', pt: 'Dados preenchidos! Confira antes de salvar.' },
  doc_ia_erro: { en: 'Could not read the document', pt: 'Não consegui ler o documento' },
  doc_ia_vazio: { en: "Couldn't identify any data in this photo — try a clearer photo or fill in manually", pt: 'Não consegui identificar dados nessa foto — tente uma foto mais nítida ou preencha manualmente' },
  doc_titulo_obrigatorio: { en: 'Title is required', pt: 'Título é obrigatório' },
  doc_salvo: { en: 'Document saved', pt: 'Documento salvo' },
  doc_excluir_confirm: { en: 'Delete this document?', pt: 'Excluir este documento?' },
  doc_excluido: { en: 'Document deleted', pt: 'Documento excluído' },
  doc_none_found: { en: 'No documents in this category', pt: 'Nenhum documento nessa categoria' },
  doc_abrir: { en: 'Open', pt: 'Abrir' },
  doc_filtro_todos: { en: 'All', pt: 'Todos' },
  doc_sem_validade: { en: 'No expiry date', pt: 'Sem validade' },

  tarefas_col_media: { en: 'Medium', pt: 'Média' },
  tarefas_col_alta: { en: 'High', pt: 'Alta' },
  tarefas_col_urgente: { en: 'Urgent', pt: 'Urgente' },
  tarefas_col_concluido: { en: 'Done', pt: 'Concluído' },
  tarefas_col_os_criada: { en: 'OS Created', pt: 'OS Criada' },
  tarefa_os_criada_automatica: { en: "This column follows the linked OS status — it moves automatically when the OS is completed", pt: 'Essa coluna é automática: a tarefa segue o status da OS vinculada e vai pra Concluído quando a OS for concluída' },
  tarefa_nova_title: { en: 'New task', pt: 'Nova tarefa' },
  tarefa_titulo_ph: { en: 'Ex: Call the Aqua Vista client', pt: 'Ex: Ligar pro cliente da Aqua Vista' },
  tarefa_titulo_obrigatorio: { en: 'Enter a title', pt: 'Preencha o título' },
  label_cliente_opcional: { en: 'Client (optional)', pt: 'Cliente (opcional)' },
  label_descricao_tarefa: { en: 'Activity description (optional)', pt: 'Descrição da atividade (opcional)' },
  tarefa_descricao_ph: { en: 'Details that help whoever does the task...', pt: 'Detalhes que ajudam quem for executar a tarefa...' },
  label_data: { en: 'Date', pt: 'Data' },
  tarefa_add_agenda: { en: 'Also add to the technician\'s Google Calendar', pt: 'Adicionar também na agenda (Google Calendar) do técnico' },
  tarefa_agenda_sucesso: { en: 'Added to Google Calendar', pt: 'Adicionado na agenda (Google Calendar)' },
  tarefa_agenda_erro: { en: "Couldn't add to Google Calendar", pt: 'Não deu pra adicionar na agenda' },
  btn_criar_tarefa: { en: 'Create task', pt: 'Criar tarefa' },
  tarefa_criada: { en: 'Task created', pt: 'Tarefa criada' },
  tarefa_gerar_os: { en: 'Generate OS', pt: 'Gerar OS' },
  tarefa_os_gerada_badge: { en: 'OS #NUM created', pt: 'OS #NUM gerada' },
  tarefa_cancelar_os: { en: 'Cancel OS', pt: 'Cancelar OS' },
  tarefa_cancelar_os_confirm: { en: 'Cancel and delete OS #NUM? This cannot be undone.', pt: 'Cancelar e apagar a OS #NUM? Essa ação não pode ser desfeita.' },
  tarefa_os_cancelada: { en: 'OS cancelled', pt: 'OS cancelada' },
  tarefa_notas_ph: { en: 'Add information...', pt: 'Adicionar informação...' },
  btn_add: { en: 'Add', pt: 'Add' },
  tarefa_sem_tecnico: { en: 'No technician', pt: 'Sem técnico' },
  tarefas_vazio_coluna: { en: 'No tasks', pt: 'Sem tarefas' },
  tarefa_excluir: { en: 'Delete task', pt: 'Excluir tarefa' },
  tarefa_confirma_excluir: { en: 'Delete this task?', pt: 'Excluir esta tarefa?' },
  tarefa_editar_title: { en: 'Edit task', pt: 'Editar tarefa' },
  tarefa_editar: { en: 'Edit task', pt: 'Editar tarefa' },
  btn_salvar_tarefa: { en: 'Save changes', pt: 'Salvar alterações' },
  tarefa_atualizada: { en: 'Task updated', pt: 'Tarefa atualizada' },
  nav_agenda: { en: 'Schedule', pt: 'Agenda' },
  card_agenda_title: { en: 'Schedule', pt: 'Agenda' },
  card_agenda_desc: { en: 'Weekly schedule by technician', pt: 'Agenda semanal por técnico' },
  agenda_subtitle: { en: 'One row per technician, tasks with a date', pt: 'Uma linha por técnico, tarefas com data marcada' },
  agenda_hoje: { en: 'Today', pt: 'Hoje' },
  agenda_busca_ph: { en: 'Search client or title...', pt: 'Buscar cliente ou título...' },
  agenda_filtro_tecnico: { en: 'Technician', pt: 'Técnico' },
  agenda_filtro_prioridade: { en: 'Priority', pt: 'Prioridade' },
  agenda_semana: { en: 'Week', pt: 'Semana' },
  agenda_dia: { en: 'Day', pt: 'Dia' },
  agenda_sem_tarefas: { en: 'No scheduled tasks this week', pt: 'Sem tarefas marcadas nessa semana' },

  // Planta (dispositivos na planta baixa)
  nav_projetos_planta: { en: 'Floor plan', pt: 'Planta' },
  pt_projetos_planta: { en: 'Floor plan', pt: 'Planta' },
  planta_subtitle: { en: 'Import a floor plan and mark where each device goes', pt: 'Importe a planta da casa e marque onde fica cada dispositivo' },
  planta_novo_btn: { en: '+ New floor plan', pt: '+ Nova Planta' },
  planta_none_found: { en: 'No floor plans yet', pt: 'Nenhuma planta cadastrada ainda' },
  planta_th_nome: { en: 'Name', pt: 'Nome' },
  planta_novo_title: { en: 'New floor plan', pt: 'Nova Planta' },
  label_nome_planta: { en: 'Floor plan name', pt: 'Nome da planta' },
  planta_nome_ph: { en: 'Ex: Floor plan - Turnberry residence', pt: 'Ex: Planta baixa - Residência Turnberry' },
  label_pdf_planta: { en: 'Floor plan file (PDF)', pt: 'Arquivo da planta (PDF)' },
  planta_importar_pdf_btn: { en: 'Import floor plan PDF', pt: 'Importar PDF da planta' },
  planta_nome_obrigatorio: { en: 'Enter a name for the floor plan', pt: 'Informe um nome para a planta' },
  planta_pdf_obrigatorio: { en: 'Import a PDF file first', pt: 'Importe um arquivo PDF primeiro' },
  planta_processando_pdf: { en: 'Processing PDF and uploading to Drive...', pt: 'Processando o PDF e enviando pro Drive...' },
  planta_erro_processar: { en: 'Could not process the PDF', pt: 'Não foi possível processar o PDF' },
  planta_salva: { en: 'Floor plan saved', pt: 'Planta salva' },
  planta_excluir_confirm: { en: 'Delete this floor plan and all its markers?', pt: 'Excluir esta planta e todos os marcadores dela?' },
  planta_excluida: { en: 'Floor plan deleted', pt: 'Planta excluída' },
  planta_nao_encontrada: { en: 'Floor plan not found', pt: 'Planta não encontrada' },
  planta_editor_title: { en: 'Floor plan', pt: 'Planta' },
  planta_hint_padrao: { en: 'Pick a device and tap the floor plan to place it. Drag a placed icon to move it, tap it to add a note.', pt: 'Escolha um dispositivo e toque na planta para posicionar. Arraste um ícone já colocado pra mover, toque nele pra anotar.' },
  planta_hint_armado_prefix: { en: 'Tap the floor plan to place:', pt: 'Toque na planta para posicionar:' },
  planta_escolha_icone_primeiro: { en: 'Pick a device first', pt: 'Escolha um dispositivo primeiro' },
  planta_escolher_dispositivo_btn: { en: 'Pick a device', pt: 'Escolher dispositivo' },
  planta_ver_pdf_original_btn: { en: 'View original PDF', pt: 'Ver PDF original' },
  planta_biblioteca_title: { en: 'Icon library', pt: 'Biblioteca de ícones' },
  planta_buscar_icone_ph: { en: 'Search icon (camera, wifi, lock...)', pt: 'Buscar ícone (câmera, wifi, fechadura...)' },
  planta_icone_nao_encontrado: { en: 'No icon found', pt: 'Nenhum ícone encontrado' },
  planta_novo_tipo_toggle: { en: '+ register a new device type', pt: '+ cadastrar novo tipo de ícone' },
  label_nome_tipo_icone: { en: 'Device name', pt: 'Nome do dispositivo' },
  planta_tipo_nome_ph: { en: 'Ex: Smoke sensor', pt: 'Ex: Sensor de fumaça' },
  label_emoji_tipo_icone: { en: 'Icon (emoji)', pt: 'Ícone (emoji)' },
  planta_tipo_emoji_ph: { en: 'Paste an emoji, ex: 🔥', pt: 'Cole um emoji, ex: 🔥' },
  label_cor_tipo_icone: { en: 'Color', pt: 'Cor' },
  planta_tipo_campos_obrigatorios: { en: 'Fill in the name and icon', pt: 'Preencha o nome e o ícone' },
  planta_tipo_salvo: { en: 'Device type registered', pt: 'Tipo de dispositivo cadastrado' },
  planta_obs_title: { en: 'Note', pt: 'Observação' },
  planta_obs_ph: { en: 'Ex: camera pointed at the gate, wifi password, adjustment made...', pt: 'Ex: câmera apontada para o portão, senha do wifi, ajuste feito...' },
  planta_obs_salva: { en: 'Note saved', pt: 'Observação salva' },
  planta_marcador_excluir_confirm: { en: 'Remove this device from the floor plan?', pt: 'Remover este dispositivo da planta?' },
  planta_marcador_excluido: { en: 'Device removed', pt: 'Dispositivo removido' },
  planta_gerar_relatorio_btn: { en: 'Generate PDF report', pt: 'Gerar relatório PDF' },
  planta_relatorio_gerando: { en: 'Generating report...', pt: 'Gerando relatório...' },
  planta_relatorio_gerado: { en: 'Report generated', pt: 'Relatório gerado' },
  planta_relatorio_erro_imagem: { en: 'Could not load the floor plan image', pt: 'Não foi possível carregar a imagem da planta' },
  planta_relatorio_pdf_titulo: { en: 'Device Report', pt: 'Relatório de Dispositivos' },
  planta_relatorio_data: { en: 'Date', pt: 'Data' },
  planta_relatorio_total_dispositivos: { en: 'Total devices', pt: 'Total de dispositivos' },
  planta_relatorio_resumo_titulo: { en: 'Summary by device type', pt: 'Resumo por tipo de dispositivo' },
  planta_relatorio_sem_dispositivos: { en: 'No devices placed yet', pt: 'Nenhum dispositivo posicionado ainda' },
  planta_relatorio_unidade: { en: 'unit', pt: 'unidade' },
  planta_relatorio_unidades: { en: 'units', pt: 'unidades' },
  planta_relatorio_croqui_titulo: { en: 'Floor plan sketch (numbered)', pt: 'Croqui da planta (numerado)' },
  planta_relatorio_lista_titulo: { en: 'Detailed device list', pt: 'Lista detalhada de dispositivos' },
  planta_relatorio_sem_obs: { en: 'No notes', pt: 'Sem observações' },
  planta_zoom_menos_title: { en: 'Zoom out', pt: 'Diminuir zoom' },
  planta_zoom_mais_title: { en: 'Zoom in', pt: 'Aumentar zoom' },
  planta_zoom_ajustar_btn: { en: 'Fit', pt: 'Ajustar' },
  planta_zoom_hint: { en: 'pinch to zoom on mobile, scroll wheel on desktop', pt: 'pinça pra dar zoom no celular, scroll do mouse no PC' },
  planta_relatorio_col_dispositivo: { en: 'Device', pt: 'Dispositivo' },
  planta_relatorio_col_qtd: { en: 'Qty', pt: 'Qtd' },
  planta_relatorio_croqui_legenda: { en: 'Numbers match the detailed list below', pt: 'Os números batem com a lista detalhada a seguir' },
  planta_relatorio_sem_ponto: { en: 'No point assigned', pt: 'Sem ponto definido' },
  planta_enviar_os_titulo: { en: 'Send floor plan to Work Order', pt: 'Enviar planta para OS' },
  planta_enviando_os: { en: 'Sending to work order...', pt: 'Enviando pra OS...' },
  planta_enviado_os_sucesso: { en: 'Floor plan linked to the work order', pt: 'Planta vinculada à OS' },
  planta_preview_title: { en: 'Floor plan', pt: 'Planta' },
  planta_vinculada_label: { en: 'Linked floor plan', pt: 'Planta vinculada' },
  planta_novo_ponto_btn: { en: '+ New point', pt: '+ Novo ponto' },
  planta_ocultar_linhas_btn: { en: 'Hide lines', pt: 'Ocultar linhas' },
  planta_mostrar_linhas_btn: { en: 'Show lines', pt: 'Mostrar linhas' },
  planta_hint_marcar_ponto: { en: 'Tap the floor plan to place the equipment point (rack, sound rack, DVR...)', pt: 'Toque na planta para posicionar o ponto de equipamento (rack, central de som, DVR...)' },
  planta_ponto_novo_title: { en: 'New point', pt: 'Novo ponto' },
  planta_ponto_renomear_title: { en: 'Rename point', pt: 'Renomear ponto' },
  label_nome_ponto: { en: 'Point name', pt: 'Nome do ponto' },
  planta_ponto_nome_ph: { en: 'Ex: Network rack, Sound rack, Camera DVR', pt: 'Ex: Rack de rede, Central de som, DVR câmeras' },
  planta_ponto_nome_obrigatorio: { en: 'Enter a name for the point', pt: 'Informe um nome para o ponto' },
  planta_ponto_salvo: { en: 'Point saved', pt: 'Ponto salvo' },
  planta_ponto_excluir_confirm: { en: 'Delete this equipment point? Devices routed to it will stay without a route.', pt: 'Excluir este ponto de equipamento? Os dispositivos direcionados a ele ficarão sem rota.' },
  planta_ponto_excluido: { en: 'Point deleted', pt: 'Ponto excluído' },
  planta_roteamento_titulo: { en: 'Cable routing — direct each device category to a point', pt: 'Roteamento de cabeamento — direcione cada categoria de dispositivo para um ponto' },
};

function tr(key) {
  const e = I18N[key];
  if (!e) return key;
  return e[LANG] || e.en || key;
}

function setLang(lang) {
  if (lang !== 'en' && lang !== 'pt') return;
  localStorage.setItem('ksh_lang', lang);
  location.reload();
}

// Aplica as traduções em elementos marcados com data-i18n / data-i18n-html / data-i18n-placeholder / data-i18n-title
function aplicarI18n() {
  document.documentElement.lang = LANG === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = tr(el.getAttribute('data-i18n-html')); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = tr(el.getAttribute('data-i18n-placeholder')); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = tr(el.getAttribute('data-i18n-title')); });
  const lb = document.getElementById('lang-btn-en'); const lb2 = document.getElementById('lang-btn-pt');
  if (lb) lb.classList.toggle('on', LANG === 'en');
  if (lb2) lb2.classList.toggle('on', LANG === 'pt');
}


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

// Garante que ME.token ainda é válido, renovando com o refresh_token quando necessário
// (silencioso, sem pedir pro usuário logar de novo). Evita o erro "JWT expired".
let refreshEmAndamento = null;
async function garantirSessao() {
  if (!ME) return false;
  if (ME.expiraEm && Date.now() < ME.expiraEm) return true;
  if (!ME.refresh_token) return false;
  // Evita que vários pedidos simultâneos disparem refresh ao mesmo tempo:
  // o refresh_token do Supabase é de uso único, então dois refreshes em paralelo
  // derrubavam a sessão (um dos dois ficava com token velho e inválido).
  if (refreshEmAndamento) return refreshEmAndamento;
  refreshEmAndamento = (async () => {
    try {
      const r = await fetch(SB_URL + '/auth/v1/token?grant_type=refresh_token', {
        method: 'POST',
        headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: ME.refresh_token })
      });
      const d = await r.json();
      if (!r.ok) return false;
      ME.token = d.access_token;
      ME.refresh_token = d.refresh_token || ME.refresh_token;
      ME.expiraEm = Date.now() + Math.max((d.expires_in || 3600) - 60, 60) * 1000;
      sessionStorage.setItem('ksh_me', JSON.stringify(ME));
      return true;
    } catch(e) {
      return false;
    } finally {
      refreshEmAndamento = null;
    }
  })();
  return refreshEmAndamento;
}

function forcarRelogin() {
  sessionStorage.removeItem('ksh_me');
  ME = null;
  toast(LANG==='pt' ? 'Sua sessão expirou. Faça login novamente.' : 'Your session expired. Please log in again.', 'err');
  document.getElementById('v-app').style.display = 'none';
  document.getElementById('v-login').style.display = 'flex';
}

async function sbGet(path) {
  const sessaoOk = await garantirSessao();
  if (!sessaoOk && (!ME || !ME.expiraEm || Date.now() >= ME.expiraEm)) {
    forcarRelogin();
    throw new Error(LANG==='pt' ? 'Sessão expirada' : 'Session expired');
  }
  const r = await fetch(SB_URL + '/rest/v1/' + path, { headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + ME.token } });
  const d = await r.json();
  if (!r.ok) throw new Error((d && (d.message || d.msg)) || r.statusText || 'Erro');
  return Array.isArray(d) ? d : [];
}

async function sbPost(path, body) {
  const sessaoOk = await garantirSessao();
  if (!sessaoOk && (!ME || !ME.expiraEm || Date.now() >= ME.expiraEm)) { forcarRelogin(); throw new Error(LANG==='pt' ? 'Sessão expirada' : 'Session expired'); }
  const r = await fetch(SB_URL + '/rest/v1/' + path, {
    method: 'POST', headers: { ...sbH(), 'Prefer': 'return=representation' },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error((await r.json()).message || r.statusText);
  return r.json();
}

async function sbPatch(path, body) {
  const sessaoOk = await garantirSessao();
  if (!sessaoOk && (!ME || !ME.expiraEm || Date.now() >= ME.expiraEm)) { forcarRelogin(); throw new Error(LANG==='pt' ? 'Sessão expirada' : 'Session expired'); }
  const r = await fetch(SB_URL + '/rest/v1/' + path, {
    method: 'PATCH', headers: sbH(), body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error((await r.json()).message || r.statusText);
}

async function sbDelete(path) {
  const sessaoOk = await garantirSessao();
  if (!sessaoOk && (!ME || !ME.expiraEm || Date.now() >= ME.expiraEm)) { forcarRelogin(); throw new Error(LANG==='pt' ? 'Sessão expirada' : 'Session expired'); }
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
  if (!email || !senha) { showErr(tr('login_err_fill')); return; }
  btn.textContent = tr('login_btn_entrando'); btn.disabled = true; err.style.display = 'none';
  try {
    const r = await fetch(SB_URL + '/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: senha })
    });
    const d = await r.json();
    if (!r.ok) { showErr(d.error_description || tr('login_err_invalid')); btn.textContent = tr('login_btn_entrar'); btn.disabled = false; return; }
    const pr = await fetch(SB_URL + '/rest/v1/usuarios?email=eq.' + encodeURIComponent(email) + '&limit=1', {
      headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + d.access_token }
    });
    const ps = await pr.json();
    const p = Array.isArray(ps) && ps[0] ? ps[0] : {};
    ME = {
      email: d.user.email, nome: p.nome || email.split('@')[0], funcao: p.funcao || 'Gestor',
      paginas_permitidas: Array.isArray(p.paginas_permitidas) ? p.paginas_permitidas : [],
      ini: (p.nome || email).substring(0,2).toUpperCase(),
      token: d.access_token, refresh_token: d.refresh_token,
      expiraEm: Date.now() + Math.max((d.expires_in || 3600) - 60, 60) * 1000
    };
    sessionStorage.setItem('ksh_me', JSON.stringify(ME));
    iniciarApp();
  } catch(e) { showErr(tr('login_err_conn') + e.message); btn.textContent = tr('login_btn_entrar'); btn.disabled = false; }
}

function showErr(msg) {
  const e = document.getElementById('l-err');
  e.textContent = msg; e.style.color = '#e74c3c'; e.style.display = 'block';
  document.getElementById('l-btn').textContent = tr('login_btn_entrar');
  document.getElementById('l-btn').disabled = false;
}

async function resetSenha() {
  const email = document.getElementById('l-email').value.trim();
  if (!email) { showErr(tr('login_err_forgot_email')); return; }
  await fetch(SB_URL + '/auth/v1/recover', {
    method: 'POST', headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const e = document.getElementById('l-err');
  e.textContent = tr('login_email_sent'); e.style.color = '#16a34a'; e.style.display = 'block';
}

// ── APP ───────────────────────────────────────────────────────
function iniciarApp() {
  aplicarI18n();
  document.getElementById('v-login').style.display = 'none';
  document.getElementById('v-app').style.display = 'flex';
  document.getElementById('sb-av').textContent = ME.ini;
  document.getElementById('sb-nome').textContent = ME.nome;
  document.getElementById('sb-role').textContent = ME.funcao;
  document.getElementById('wb-nome').textContent = tr('home_welcome') + ME.nome.split(' ')[0] + '! 👋';
  carregarStats();
  aplicarPermissoesSidebar();
  goPage(document.getElementById('nav-inicio'), 'inicio', tr('nav_inicio'), '');
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
  if (!confirm(tr('logout_confirm'))) return;
  sessionStorage.clear(); ME = null;
  document.getElementById('v-app').style.display = 'none';
  document.getElementById('v-login').style.display = 'flex';
  document.getElementById('l-btn').textContent = tr('login_btn_entrar');
  document.getElementById('l-btn').disabled = false;
  document.getElementById('l-err').style.display = 'none';
}

// ── NAVEGAÇÃO ─────────────────────────────────────────────────
function pageTitle(id) {
  const m = {
    'inicio':'pt_inicio','acomp-vendas':'pt_acomp_vendas','contratos':'pt_contratos','fat-consolidado':'pt_fat_consolidado',
    'crm-clientes':'pt_crm_clientes','crm-orcamentos':'pt_crm_orcamentos','crm-followups':'pt_crm_followups','crm-comissoes':'pt_crm_comissoes','crm-consultores':'pt_crm_consultores','crm-reprovacao':'pt_crm_reprovacao',
    'fin-banco':'pt_fin_banco','fin-dre':'pt_fin_dre','fin-indicadores':'pt_fin_indicadores','fin-analise':'pt_fin_analise','fin-fluxo':'pt_fin_fluxo','fin-patrimonio':'pt_fin_patrimonio','fin-custeio':'pt_fin_custeio',
    'desp-lancar':'pt_desp_lancar','desp-aprovar':'pt_desp_aprovar','fin-frota':'pt_fin_frota','fin-cadastros':'pt_fin_cadastros',
    'kshcam':'pt_kshcam','tecnicos':'pt_tecnicos','tarefas':'pt_tarefas','ferramentas':'pt_ferramentas','documentos':'pt_documentos','projetos-rack':'pt_projetos_rack','projetos-planta':'pt_projetos_planta'
  };
  return m[id] ? tr(m[id]) : null;
}

function goPage(btn, pageId, title, section) {
  if (!temPermissao(pageId)) { toast(tr('acesso_negado'), 'err'); return; }
  if (window.innerWidth <= 860) {
    document.querySelector('.sb')?.classList.remove('open');
    document.getElementById('sb-overlay')?.classList.remove('on');
  }
  document.querySelectorAll('.sb-item,.sb-child').forEach(b => b.classList.remove('on'));
  if (btn) btn.classList.add('on');
  else document.querySelectorAll('.sb-item,.sb-child').forEach(b => {
    if (b.onclick && b.onclick.toString().includes("'" + pageId + "'")) b.classList.add('on');
  });

  const t = pageTitle(pageId) || title;
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
    'kshcam': '<button class="btn-sec" onclick="loadModule(\'kshcam\')">' + tr('btn_atualizar') + '</button><button class="btn-pri" onclick="abrirNovaOS()">' + tr('btn_nova_os') + '</button>',
    'tecnicos': '<button class="btn-pri" onclick="abrirNovoTecnico()">' + tr('btn_novo_tecnico') + '</button>',
    'crm-clientes': '<button class="btn-pri" onclick="abrirNovoClienteCRM()">' + tr('btn_novo_cliente') + '</button>',
    'crm-orcamentos': '<button class="btn-pri" onclick="abrirNovoOrcamento()">' + tr('btn_novo_orcamento') + '</button>',
    'tarefas': '<button class="btn-pri" onclick="abrirNovaTarefa()">+ ' + tr('tarefa_nova_title') + '</button>',
    'ferramentas': '<button class="btn-pri" onclick="toast(tr(\'btn_em_breve\'))">+ ' + (LANG==='pt'?'Novo Item':'New Item') + '</button>',
    'fin-rentabilidade': '<button class="btn-sec" onclick="loadModule(\'fin-rentabilidade\')">' + tr('btn_atualizar') + '</button>',
    'documentos': '<button class="btn-pri" onclick="abrirNovoDocumento()">' + tr('btn_novo_documento') + '</button>',
    'fin-cadastros': '<button class="btn-pri" onclick="abrirNovoCatalogoItem()">' + tr('btn_novo_item_catalogo') + '</button>',
    'projetos-rack': '<button class="btn-pri" onclick="abrirNovoRack()">' + tr('rack_novo_btn') + '</button>',
    'projetos-planta': '<button class="btn-pri" onclick="abrirNovaPlanta()">' + tr('planta_novo_btn') + '</button>',
  };
  return m[id] || '';
}

function getSubtitle(id) {
  const m = {
    'crm-clientes': tr('clientes_subtitle'),
    'crm-orcamentos': tr('orc_subtitle'),
    'kshcam': tr('os_subtitle'),
    'tecnicos': tr('tecnicos_subtitle'),
    'tarefas': tr('sub_tarefas'),
    'agenda': tr('agenda_subtitle'),
    'ferramentas': tr('sub_ferramentas'),
    'fin-veiculos': LANG==='pt' ? 'Cadastro de veículos da frota' : 'Fleet vehicle registry',
    'documentos': tr('sub_documentos'),
    'fin-rentabilidade': tr('rentabilidade_subtitle'),
    'fin-cadastros': tr('cat_subtitle'),
    'projetos-rack': tr('rack_subtitle'),
    'projetos-planta': tr('planta_subtitle'),
  };
  return m[id] || '';
}

// ── SIDEBAR TOGGLES ───────────────────────────────────────────
function toggleSidebar() {
  document.querySelector('.sb')?.classList.toggle('open');
  document.getElementById('sb-overlay')?.classList.toggle('on');
}

function toggleSec(id, hd) {
  const body = document.getElementById('sec-' + id);
  const span = hd.querySelector('.sb-sec-arr');
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
  else if (id === 'crm-orcamentos') renderOrcamentos();
  else if (id === 'kshcam') renderKSHCam();
  else if (id === 'tecnicos') renderTecnicos();
  else if (id === 'tarefas') renderTarefas();
  else if (id === 'agenda') renderAgenda();
  else if (id === 'fin-rentabilidade') renderRentabilidadeOS();
  else if (id === 'documentos') renderDocumentos();
  else if (id === 'fin-cadastros') renderCadastros();
  else if (id === 'projetos-rack') renderRacks();
  else if (id === 'projetos-planta') renderPlantas();
  else el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;padding:60px;color:#bbb;gap:10px"><div style="font-size:36px">🚧</div><div style="font-size:14px;font-weight:500;color:#555">Em desenvolvimento</div></div>';
}

// ── CLIENTES ──────────────────────────────────────────────────
let clientesData = [];
let clientesUltimaOSMap = {};

async function renderClientes() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    const [clientes, osConcluidas] = await Promise.all([
      sbGet('clientes?order=nome'),
      sbGet('ordens_servico?status=eq.concluida&select=cliente_nome,cliente,concluida_em,created_at')
    ]);
    clientesData = clientes;
    clientesUltimaOSMap = {};
    osConcluidas.forEach(o => {
      const nome = (o.cliente_nome || o.cliente || '').trim().toLowerCase();
      const data = o.concluida_em || o.created_at;
      if (!nome || !data) return;
      if (!clientesUltimaOSMap[nome] || new Date(data) > new Date(clientesUltimaOSMap[nome])) {
        clientesUltimaOSMap[nome] = data;
      }
    });
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }

  el.innerHTML = `
  <div class="kpis kpis-4" style="margin-bottom:14px" id="cli-kpis"></div>
  <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
    <input placeholder="${tr('clientes_search_ph')}" style="flex:1;min-width:180px;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" id="cli-busca" oninput="filtrarClientes()">
    <select id="cli-filtro-status" onchange="filtrarClientes()" style="padding:7px 10px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;background:#fff;outline:none">
      <option value="ativos">${tr('clientes_filtro_ativos')}</option>
      <option value="inativos">${tr('clientes_filtro_inativos')}</option>
      <option value="todos">${tr('clientes_filtro_todos')}</option>
    </select>
    <select id="cli-filtro-contrato" onchange="filtrarClientes()" style="padding:7px 10px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;background:#fff;outline:none">
      <option value="todos">${tr('clientes_filtro_contrato_todos')}</option>
      <option value="com">${tr('clientes_filtro_com_contrato')}</option>
      <option value="sem">${tr('clientes_filtro_sem_contrato')}</option>
    </select>
  </div>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>${tr('clientes_th_nome')}</th><th>${tr('clientes_th_cnpj')}</th><th>${tr('clientes_th_cidade')}</th><th>${tr('clientes_th_tel')}</th><th>${tr('clientes_th_email')}</th><th>${tr('clientes_th_ultima_os')}</th><th>${tr('clientes_th_contrato')}</th><th>${tr('clientes_th_status')}</th><th>${tr('clientes_th_acoes')}</th></tr></thead>
      <tbody id="cli-tbody"></tbody>
    </table>
  </div>`;
  renderKpisClientes();
  filtrarClientes();
}

function renderKpisClientes() {
  const el = document.getElementById('cli-kpis');
  if (!el) return;
  const total = clientesData.length;
  const ativos = clientesData.filter(c => c.ativo).length;
  const comContrato = clientesData.filter(c => c.tem_contrato).length;
  const agora = Date.now();
  const risco = clientesData.filter(c => {
    if (!c.ativo) return false;
    const ultima = clientesUltimaOSMap[(c.nome||'').trim().toLowerCase()];
    if (!ultima) return true;
    return (agora - new Date(ultima).getTime()) / 86400000 > 90;
  }).length;
  el.innerHTML = '<div class="kpi"><div class="kpi-l">' + tr('clientes_kpi_total') + '</div><div class="kpi-v">' + total + '</div></div>'
    + '<div class="kpi"><div class="kpi-l">' + tr('clientes_kpi_ativos') + '</div><div class="kpi-v" style="color:#16a34a">' + ativos + '</div></div>'
    + '<div class="kpi"><div class="kpi-l">' + tr('clientes_kpi_contrato') + '</div><div class="kpi-v">' + comContrato + '</div></div>'
    + '<div class="kpi"><div class="kpi-l">' + tr('clientes_kpi_risco') + '</div><div class="kpi-v" style="color:#e74c3c">' + risco + '</div></div>';
}

function filtrarClientes() {
  const q = (document.getElementById('cli-busca')?.value || '').toLowerCase();
  const fStatus = document.getElementById('cli-filtro-status')?.value || 'ativos';
  const fContrato = document.getElementById('cli-filtro-contrato')?.value || 'todos';
  const lista = clientesData.filter(c => {
    if (fStatus === 'ativos' && !c.ativo) return false;
    if (fStatus === 'inativos' && c.ativo) return false;
    if (fContrato === 'com' && !c.tem_contrato) return false;
    if (fContrato === 'sem' && c.tem_contrato) return false;
    if (q && !((c.nome||'').toLowerCase().includes(q) || (c.cnpj_cpf||'').toLowerCase().includes(q) || (c.email||'').toLowerCase().includes(q) || (c.telefone||'').toLowerCase().includes(q))) return false;
    return true;
  });
  renderTabelaClientes(lista);
}

function renderTabelaClientes(lista) {
  const tb = document.getElementById('cli-tbody');
  if (!tb) return;
  if (!lista.length) { tb.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:#bbb">' + tr('clientes_none_found') + '</td></tr>'; return; }
  const agora = Date.now();
  tb.innerHTML = lista.map(c => {
    const ultima = clientesUltimaOSMap[(c.nome||'').trim().toLowerCase()];
    let ultimaHTML;
    if (!ultima) {
      ultimaHTML = '<span style="color:#bbb;font-style:italic">' + tr('clientes_sem_os') + '</span>';
    } else {
      const dias = Math.floor((agora - new Date(ultima).getTime()) / 86400000);
      const meses = Math.round(dias / 30);
      const risco = dias > 90;
      ultimaHTML = '<span style="' + (risco ? 'color:#e74c3c;font-weight:600' : 'color:#555') + '">' + (meses <= 0 ? tr('clientes_recente') : meses + 'm') + '</span>';
    }
    return '<tr>'
      + '<td style="font-weight:500">' + (c.nome||'—') + '</td>'
      + '<td>' + (c.cnpj_cpf||'—') + '</td>'
      + '<td>' + ([c.cidade, c.uf].filter(Boolean).join('/') || '—') + '</td>'
      + '<td>' + (c.telefone||'—') + '</td>'
      + '<td>' + (c.email||'—') + '</td>'
      + '<td>' + ultimaHTML + '</td>'
      + '<td>' + (c.tem_contrato ? '<span style="font-size:10px;padding:2px 8px;border-radius:99px;background:#f0fdf4;color:#166534">' + tr('sim') + '</span>' : '—') + '</td>'
      + '<td><span style="font-size:10px;padding:2px 8px;border-radius:99px;background:' + (c.ativo?'#f0fdf4':'#f5f5f3') + ';color:' + (c.ativo?'#166534':'#888') + '">' + (c.ativo?tr('cliente_status_ativo'):tr('cliente_status_inativo')) + '</span></td>'
      + '<td><button onclick="editarCliente(\'' + c.id + '\')" style="padding:3px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit">' + tr('btn_editar') + '</button></td>'
      + '</tr>';
  }).join('');
}

function abrirNovoClienteCRM() {
  ['crm-cli-nome','crm-cli-cnpj','crm-cli-cidade','crm-cli-uf','crm-cli-email','crm-cli-tel','crm-cli-end','crm-cli-equip','crm-cli-obs'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('crm-cli-contrato').checked = false;
  document.getElementById('crm-cli-ativo').checked = true;
  document.getElementById('m-novo-cli-crm').querySelector('.modal-hd-title').textContent = tr('modal_novo_cliente');
  const btn = document.getElementById('m-novo-cli-crm').querySelector('.btn-pri');
  btn.textContent = tr('btn_cadastrar');
  btn.onclick = salvarClienteCRM;
  abrirModal('m-novo-cli-crm');
}

async function salvarClienteCRM() {
  const nome = document.getElementById('crm-cli-nome')?.value.trim();
  const email = document.getElementById('crm-cli-email')?.value.trim();
  const telefone = document.getElementById('crm-cli-tel')?.value.trim();
  const endereco = document.getElementById('crm-cli-end')?.value.trim();
  if (!nome||!email||!telefone||!endereco) { toast(tr('cliente_required_fields'),'err'); return; }
  try {
    await sbPost('clientes', {
      nome, email, telefone, endereco,
      cnpj_cpf: document.getElementById('crm-cli-cnpj')?.value.trim()||null,
      cidade: document.getElementById('crm-cli-cidade')?.value.trim()||null,
      uf: document.getElementById('crm-cli-uf')?.value.trim().toUpperCase()||null,
      equipamentos: document.getElementById('crm-cli-equip')?.value.trim()||null,
      observacoes: document.getElementById('crm-cli-obs')?.value.trim()||null,
      tem_contrato: !!document.getElementById('crm-cli-contrato')?.checked,
      ativo: document.getElementById('crm-cli-ativo')?.checked !== false
    });
    fecharModal('m-novo-cli-crm');
    toast(tr('cliente_cadastrado'), 'ok');
    renderClientes();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function editarCliente(id) {
  const c = clientesData.find(x => x.id === id);
  if (!c) return;
  document.getElementById('crm-cli-nome').value = c.nome||'';
  document.getElementById('crm-cli-cnpj').value = c.cnpj_cpf||'';
  document.getElementById('crm-cli-cidade').value = c.cidade||'';
  document.getElementById('crm-cli-uf').value = c.uf||'';
  document.getElementById('crm-cli-email').value = c.email||'';
  document.getElementById('crm-cli-tel').value = c.telefone||'';
  document.getElementById('crm-cli-end').value = c.endereco||'';
  document.getElementById('crm-cli-equip').value = c.equipamentos||'';
  document.getElementById('crm-cli-obs').value = c.observacoes||'';
  document.getElementById('crm-cli-contrato').checked = !!c.tem_contrato;
  document.getElementById('crm-cli-ativo').checked = c.ativo !== false;
  document.getElementById('m-novo-cli-crm').querySelector('.modal-hd-title').textContent = tr('modal_editar_cliente');
  const btn = document.getElementById('m-novo-cli-crm').querySelector('.btn-pri');
  btn.textContent = tr('btn_salvar');
  btn.onclick = async () => {
    try {
      await sbPatch('clientes?id=eq.' + id, {
        nome: document.getElementById('crm-cli-nome').value.trim(),
        cnpj_cpf: document.getElementById('crm-cli-cnpj').value.trim()||null,
        cidade: document.getElementById('crm-cli-cidade').value.trim()||null,
        uf: document.getElementById('crm-cli-uf').value.trim().toUpperCase()||null,
        email: document.getElementById('crm-cli-email').value.trim(),
        telefone: document.getElementById('crm-cli-tel').value.trim(),
        endereco: document.getElementById('crm-cli-end').value.trim(),
        equipamentos: document.getElementById('crm-cli-equip').value.trim()||null,
        observacoes: document.getElementById('crm-cli-obs').value.trim()||null,
        tem_contrato: !!document.getElementById('crm-cli-contrato').checked,
        ativo: document.getElementById('crm-cli-ativo').checked
      });
      fecharModal('m-novo-cli-crm');
      toast(tr('cliente_atualizado'),'ok');
      renderClientes();
    } catch(e) { toast(tr('erro_prefix')+e.message,'err'); }
  };
  abrirModal('m-novo-cli-crm');
}

// ── ORÇAMENTOS (CRM) ────────────────────────────────────────
let orcamentosData = [];
let motivosReprovacaoData = [];
let orcArrastando = null;
let orcPerdidoAlvo = null;
let orcClienteSel = null;
let orcBuscaTimer = null;
let orcView = 'kanban';
let orcFiltroTexto = '';
let orcFiltroStatus = 'todos';
let orcFiltroPeriodo = 'todos';
let orcFiltroCriadoPor = 'todos';
let orcChartFunil = null;
let orcChartMotivos = null;

const ORC_COLS = [
  { id: 'lead', key: 'orc_col_lead', color: '#666', bg: '#f1f1ee' },
  { id: 'rascunho', key: 'orc_col_rascunho', color: '#555', bg: '#f5f5f3' },
  { id: 'enviado', key: 'orc_col_enviado', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'negociacao', key: 'orc_col_negociacao', color: '#92400e', bg: '#fffbeb' },
  { id: 'aprovado', key: 'orc_col_aprovado', color: '#166534', bg: '#f0fdf4' },
  { id: 'convertido', key: 'orc_col_convertido', color: '#166534', bg: '#dcfce7' },
  { id: 'perdido', key: 'orc_col_perdido', color: '#991b1b', bg: '#fef2f2' },
];

function orcamentoColuna(o) { return o.status || 'lead'; }

function orcFmtData(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString().slice(0, 5);
}

async function renderOrcamentos() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    const [orcs, motivos] = await Promise.all([
      sbGet('crm_orcamentos?order=ordem.asc'),
      sbGet('motivos_reprovacao?order=nome')
    ]);
    orcamentosData = orcs;
    motivosReprovacaoData = motivos;
    if (!clientesData.length) { try { clientesData = await sbGet('clientes?order=nome'); } catch(e) {} }
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }
  el.innerHTML = orcToolbarHTML()
    + '<div id="orc-kpis" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:14px 0"></div>'
    + '<div id="orc-view-container"></div>';
  document.getElementById('orc-view-toggle').innerHTML = orcViewToggleHTML();
  popularSelectOrcStatus();
  popularSelectCriadoPor();
  renderKpisOrcamentos();
  renderOrcView();
}

// ── Toolbar (busca, filtros, abas) ──
function orcToolbarHTML() {
  return '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:4px">'
    + '<div style="flex:1;min-width:160px">'
    + '<input id="orc-busca" placeholder="' + tr('orc_busca_ph') + '" oninput="orcAplicarFiltroTexto(this.value)" style="width:100%;box-sizing:border-box;font-size:12px;padding:7px 10px;border:1px solid #e8e8e5;border-radius:8px;font-family:inherit;outline:none">'
    + '</div>'
    + '<select id="orc-filtro-status" onchange="orcAplicarFiltroStatus(this.value)" style="padding:7px 10px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;background:#fff;outline:none"></select>'
    + '<select id="orc-filtro-criado-por" onchange="orcAplicarFiltroCriadoPor(this.value)" style="padding:7px 10px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;background:#fff;outline:none"></select>'
    + '<select id="orc-filtro-periodo" onchange="orcAplicarFiltroPeriodo(this.value)" style="padding:7px 10px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;background:#fff;outline:none">'
      + ['todos','7','30','90'].map(v => '<option value="' + v + '"' + (orcFiltroPeriodo === v ? ' selected' : '') + '>' + tr('orc_periodo_' + v) + '</option>').join('')
    + '</select>'
    + '<div id="orc-view-toggle" style="display:flex;gap:4px;background:#f1f1ee;border-radius:8px;padding:3px"></div>'
    + '</div>';
}

function orcViewToggleHTML() {
  const leadsCount = orcamentosData.filter(o => orcamentoColuna(o) === 'lead').length;
  return ['kanban','lista','analise','leads'].map(v =>
    '<button onclick="orcMudarView(\'' + v + '\')" style="font-size:11px;padding:6px 10px;border:none;border-radius:6px;cursor:pointer;white-space:nowrap;font-family:inherit;background:' + (orcView === v ? '#1a1a1a' : 'transparent') + ';color:' + (orcView === v ? '#fff' : '#555') + '">'
      + tr('orc_view_' + v) + (v === 'leads' ? ' (' + leadsCount + ')' : '') + '</button>'
  ).join('');
}

function popularSelectOrcStatus() {
  const sel = document.getElementById('orc-filtro-status');
  if (!sel) return;
  sel.innerHTML = '<option value="todos">' + tr('orc_filtro_todos_status') + '</option>'
    + ORC_COLS.map(c => '<option value="' + c.id + '"' + (orcFiltroStatus === c.id ? ' selected' : '') + '>' + tr(c.key) + '</option>').join('');
}

function popularSelectCriadoPor() {
  const sel = document.getElementById('orc-filtro-criado-por');
  if (!sel) return;
  const nomes = Array.from(new Set(orcamentosData.map(o => o.criado_por).filter(Boolean))).sort();
  sel.innerHTML = '<option value="todos">' + tr('orc_filtro_todos_responsavel') + '</option>'
    + nomes.map(n => '<option value="' + String(n).replace(/"/g,'&quot;') + '"' + (orcFiltroCriadoPor === n ? ' selected' : '') + '>' + n + (ME && ME.nome === n ? ' (' + tr('eu') + ')' : '') + '</option>').join('');
}

function orcAplicarFiltroTexto(v) { orcFiltroTexto = v; renderKpisOrcamentos(); renderOrcView(); }
function orcAplicarFiltroStatus(v) { orcFiltroStatus = v; renderKpisOrcamentos(); renderOrcView(); }
function orcAplicarFiltroPeriodo(v) { orcFiltroPeriodo = v; renderKpisOrcamentos(); renderOrcView(); }
function orcAplicarFiltroCriadoPor(v) { orcFiltroCriadoPor = v; renderKpisOrcamentos(); renderOrcView(); }

function orcMudarView(v) {
  orcView = v;
  const toggle = document.getElementById('orc-view-toggle');
  if (toggle) toggle.innerHTML = orcViewToggleHTML();
  renderOrcView();
}

function orcamentoPassaFiltro(o) {
  const q = (orcFiltroTexto || '').toLowerCase().trim();
  if (orcFiltroCriadoPor !== 'todos' && o.criado_por !== orcFiltroCriadoPor) return false;
  if (orcFiltroPeriodo !== 'todos') {
    const dias = (Date.now() - new Date(o.criado_em).getTime()) / 86400000;
    if (dias > parseInt(orcFiltroPeriodo, 10)) return false;
  }
  if (q && !((o.titulo || '').toLowerCase().includes(q) || (o.cliente_nome || '').toLowerCase().includes(q))) return false;
  return true;
}

function orcamentosFiltrados() {
  return orcamentosData.filter(o => (orcFiltroStatus === 'todos' || orcamentoColuna(o) === orcFiltroStatus) && orcamentoPassaFiltro(o));
}

function orcKpiHTML(label, val, color) {
  return '<div class="kpi"><div class="kpi-l">' + label + '</div><div class="kpi-v"' + (color ? ' style="color:' + color + '"' : '') + '>' + val + '</div></div>';
}

function renderKpisOrcamentos() {
  const el = document.getElementById('orc-kpis');
  if (!el) return;
  const lista = orcamentosFiltrados();
  const total = lista.length;
  const valorNegociacao = lista.filter(o => o.status === 'negociacao').reduce((s,o) => s + (parseFloat(o.valor) || 0), 0);
  const aprovados = lista.filter(o => o.status === 'aprovado').length;
  const convertidos = lista.filter(o => o.status === 'convertido').length;
  const agora = Date.now();
  const parados = lista.filter(o => !['convertido','perdido'].includes(o.status) && (agora - new Date(o.atualizado_em || o.criado_em).getTime()) > 7 * 86400000).length;
  el.innerHTML = orcKpiHTML(tr('orc_kpi_total'), total)
    + orcKpiHTML(tr('orc_kpi_negociacao'), '$' + valorNegociacao.toFixed(2))
    + orcKpiHTML(tr('orc_kpi_aprovados'), aprovados, '#166534')
    + orcKpiHTML(tr('orc_kpi_convertidos'), convertidos, '#166534')
    + orcKpiHTML(tr('orc_kpi_parados'), parados, parados ? '#e74c3c' : null);
}

// ── Dispatcher de visualização ──
function renderOrcView() {
  const cont = document.getElementById('orc-view-container');
  if (!cont) return;
  if (orcView === 'kanban') {
    cont.innerHTML = '<div style="overflow-x:auto"><div id="orc-board" style="display:grid;grid-template-columns:repeat(7,minmax(150px,1fr));gap:10px;min-width:1150px"></div></div>';
    renderOrcamentosBoard();
  } else if (orcView === 'lista') {
    renderOrcamentosLista(cont, orcamentosFiltrados());
  } else if (orcView === 'leads') {
    renderOrcamentosLista(cont, orcamentosFiltrados().filter(o => orcamentoColuna(o) === 'lead'));
  } else if (orcView === 'analise') {
    renderOrcamentosAnalise(cont);
  }
}

// ── Kanban ──
function renderOrcamentosBoard() {
  const board = document.getElementById('orc-board');
  if (!board) return;
  board.innerHTML = ORC_COLS.map(col => {
    const itens = (orcFiltroStatus !== 'todos' && orcFiltroStatus !== col.id)
      ? []
      : orcamentosData.filter(o => orcamentoColuna(o) === col.id && orcamentoPassaFiltro(o)).sort((a,b) => (a.ordem||0) - (b.ordem||0));
    const totalCol = itens.reduce((s,o) => s + (parseFloat(o.valor) || 0), 0);
    return '<div style="min-width:0">'
      + '<div style="background:' + col.bg + ';color:' + col.color + ';border-radius:8px 8px 0 0;padding:8px 10px;font-size:12px;font-weight:600;display:flex;flex-direction:column;gap:2px">'
      + '<div style="display:flex;justify-content:space-between"><span>' + tr(col.key) + '</span><span>' + itens.length + '</span></div>'
      + (totalCol ? '<div style="font-size:10px;font-weight:500;opacity:.85">$' + totalCol.toFixed(2) + '</div>' : '')
      + '</div>'
      + '<div ondragover="event.preventDefault()" ondrop="orcDropColuna(event,\'' + col.id + '\')" style="background:#f9f9f7;border-radius:0 0 8px 8px;padding:8px;min-height:120px;display:flex;flex-direction:column;gap:8px">'
      + (itens.length ? itens.map(o => orcamentoCardHTML(o)).join('') : '<div style="text-align:center;color:#bbb;font-size:11px;padding:14px">' + tr('orc_vazio_coluna') + '</div>')
      + '</div></div>';
  }).join('');
}

function orcamentoCardHTML(o) {
  const dias = Math.floor((Date.now() - new Date(o.atualizado_em || o.criado_em).getTime()) / 86400000);
  const parado = !['convertido','perdido'].includes(o.status) && dias >= 7;
  return '<div draggable="true" ondragstart="orcDragStart(event,\'' + o.id + '\')" ondragover="event.preventDefault();event.stopPropagation()" ondrop="event.stopPropagation();orcDropCard(event,\'' + o.id + '\')" style="background:#fff;border:1px solid #e8e8e5;border-radius:8px;padding:9px 11px;cursor:grab">'
    + '<div style="display:flex;justify-content:space-between;gap:6px">'
    + '<div style="font-size:12px;line-height:1.4;font-weight:500">' + (o.titulo || '—') + '</div>'
    + '<span style="display:flex;gap:6px;flex-shrink:0">'
    + '<button onclick="abrirEditarOrcamento(\'' + o.id + '\')" title="' + tr('orc_editar') + '" style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;line-height:1;padding:8px">✎</button>'
    + '<button onclick="excluirOrcamento(\'' + o.id + '\')" title="' + tr('orc_excluir') + '" style="background:none;border:none;cursor:pointer;color:#888;font-size:19px;line-height:1;padding:8px">×</button>'
    + '</span></div>'
    + '<div style="font-size:11px;color:#888;margin-top:2px">' + (o.cliente_nome || tr('orc_sem_cliente')) + '</div>'
    + (o.valor != null ? '<div style="font-size:13px;font-weight:700;margin-top:6px">$' + Number(o.valor).toFixed(2) + '</div>' : '')
    + (o.status === 'perdido' && o.motivo_perda ? '<div style="font-size:10px;color:#991b1b;margin-top:4px">' + o.motivo_perda + '</div>' : '')
    + (o.status === 'convertido' && o.os_gerada_id ? '<div style="font-size:10px;color:#166534;margin-top:4px">✓ OS</div>' : '')
    + '<div style="font-size:10px;color:' + (parado ? '#e74c3c' : '#bbb') + ';margin-top:6px">' + dias + tr('orc_dias_parado') + '</div>'
    + '</div>';
}

function orcDragStart(ev, id) { orcArrastando = id; }

function reordenarOrcamentoLocal(item, posAfterId) {
  const semItem = orcamentosData.filter(o => o.id !== item.id);
  if (posAfterId) {
    const idx = semItem.findIndex(o => o.id === posAfterId);
    semItem.splice(idx === -1 ? semItem.length : idx, 0, item);
  } else {
    semItem.push(item);
  }
  orcamentosData = semItem;
}

async function persistirOrdemColunaOrc(colId) {
  const itens = orcamentosData.filter(o => orcamentoColuna(o) === colId);
  await Promise.all(itens.map((o, i) => {
    o.ordem = i;
    return sbPatch('crm_orcamentos?id=eq.' + o.id, { ordem: i }).catch(() => {});
  }));
}

async function moverOrcamento(orcId, destColId, posAfterId) {
  const origem = orcamentosData.find(o => o.id === orcId);
  if (!origem) return;
  if (destColId === 'perdido') {
    orcPerdidoAlvo = { orcId, posAfterId };
    abrirModalPerdaOrcamento();
    return;
  }
  if (destColId === 'convertido') {
    if (!confirm(tr('orc_convertido_confirm'))) return;
    await converterOrcamento(orcId, posAfterId);
    return;
  }
  origem.status = destColId;
  origem.motivo_perda = null;
  reordenarOrcamentoLocal(origem, posAfterId);
  renderOrcamentosBoard();
  try {
    await sbPatch('crm_orcamentos?id=eq.' + orcId, { status: destColId, motivo_perda: null, atualizado_em: new Date().toISOString() });
    await persistirOrdemColunaOrc(destColId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function orcDropCard(ev, destId) {
  if (!orcArrastando || orcArrastando === destId) return;
  const idOrigem = orcArrastando;
  const destino = orcamentosData.find(o => o.id === destId);
  orcArrastando = null;
  if (!destino) return;
  await moverOrcamento(idOrigem, orcamentoColuna(destino), destId);
}

async function orcDropColuna(ev, destColId) {
  if (!orcArrastando) return;
  const idOrigem = orcArrastando;
  orcArrastando = null;
  await moverOrcamento(idOrigem, destColId, null);
}

// ── Motivo de perda ──
function abrirModalPerdaOrcamento() {
  popularSelectMotivo(null);
  abrirModal('m-orc-perdido');
}

function popularSelectMotivo(selecionado) {
  const sel = document.getElementById('orc-motivo-sel');
  if (!sel) return;
  sel.innerHTML = '<option value="">--</option>'
    + motivosReprovacaoData.map(m => '<option value="' + String(m.nome).replace(/"/g,'&quot;') + '"' + (m.nome === selecionado ? ' selected' : '') + '>' + m.nome + '</option>').join('')
    + '<option value="__novo__">' + tr('motivo_adicionar_novo') + '</option>';
}

async function tratarSelecaoMotivo(selectEl) {
  if (selectEl.value !== '__novo__') return;
  const nome = prompt(tr('motivo_prompt_nome'));
  if (!nome || !nome.trim()) { popularSelectMotivo(null); return; }
  try {
    await sbPost('motivos_reprovacao', { nome: nome.trim() });
    motivosReprovacaoData = await sbGet('motivos_reprovacao?order=nome');
    popularSelectMotivo(nome.trim());
    toast(tr('motivo_criado'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); popularSelectMotivo(null); }
}

function cancelarPerdaOrcamento() {
  orcPerdidoAlvo = null;
  fecharModal('m-orc-perdido');
}

async function confirmarPerdaOrcamento() {
  const motivo = document.getElementById('orc-motivo-sel')?.value;
  if (!motivo || motivo === '__novo__') { toast(tr('orc_perdido_motivo_obrigatorio'), 'err'); return; }
  if (!orcPerdidoAlvo) { fecharModal('m-orc-perdido'); return; }
  const { orcId, posAfterId } = orcPerdidoAlvo;
  const origem = orcamentosData.find(o => o.id === orcId);
  if (!origem) { fecharModal('m-orc-perdido'); orcPerdidoAlvo = null; return; }
  origem.status = 'perdido';
  origem.motivo_perda = motivo;
  reordenarOrcamentoLocal(origem, posAfterId);
  fecharModal('m-orc-perdido');
  orcPerdidoAlvo = null;
  renderOrcView();
  renderKpisOrcamentos();
  try {
    await sbPatch('crm_orcamentos?id=eq.' + orcId, { status: 'perdido', motivo_perda: motivo, atualizado_em: new Date().toISOString() });
    await persistirOrdemColunaOrc('perdido');
    toast(tr('orc_marcado_perdido'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// ── Conversão automática (Cliente + OS) ──
async function converterOrcamento(orcId, posAfterId) {
  const origem = orcamentosData.find(o => o.id === orcId);
  if (!origem) return;
  try {
    let clienteObj = null;
    if (origem.cliente_id) clienteObj = clientesData.find(c => c.id === origem.cliente_id) || null;
    if (!clienteObj && origem.cliente_nome) {
      const nomeBusca = origem.cliente_nome.trim().toLowerCase();
      clienteObj = clientesData.find(c => (c.nome||'').trim().toLowerCase() === nomeBusca) || null;
    }
    if (!clienteObj && origem.cliente_nome) {
      const [novoCliente] = await sbPost('clientes', {
        nome: origem.cliente_nome,
        email: origem.cliente_email || '',
        telefone: origem.cliente_tel || '',
        endereco: '',
        ativo: true
      });
      clienteObj = novoCliente;
      clientesData = [...clientesData, clienteObj];
    }
    const clienteId = clienteObj?.id || null;

    const nums = await sbGet('ordens_servico?select=numero&order=numero.desc.nullslast&limit=1');
    const numero = (nums[0]?.numero || 0) + 1;
    const [novaOS] = await sbPost('ordens_servico', {
      numero,
      titulo: origem.titulo || (LANG === 'pt' ? 'OS gerada de orçamento' : 'Service order from proposal'),
      cliente: clienteObj?.nome || origem.cliente_nome || '',
      cliente_nome: clienteObj?.nome || origem.cliente_nome || '',
      cliente_tel: clienteObj?.telefone || origem.cliente_tel || null,
      cliente_email: clienteObj?.email || origem.cliente_email || null,
      endereco: clienteObj?.endereco || null,
      descricao: origem.descricao || null,
      valor_orcado: origem.valor != null ? parseFloat(origem.valor) : null,
      status: 'aberta', origem: 'orcamento_convertido', criado_por: ME.nome
    });

    origem.status = 'convertido';
    origem.cliente_id = clienteId;
    origem.os_gerada_id = novaOS?.id || null;
    reordenarOrcamentoLocal(origem, posAfterId);
    renderOrcView();
    renderKpisOrcamentos();

    await sbPatch('crm_orcamentos?id=eq.' + orcId, {
      status: 'convertido', cliente_id: clienteId, os_gerada_id: novaOS?.id || null, atualizado_em: new Date().toISOString()
    });
    await persistirOrdemColunaOrc('convertido');
    toast(tr('orc_convertido_sucesso').replace('NUM', numero), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// ── Lista / Leads (tabela) ──
function renderOrcamentosLista(cont, lista) {
  const ordenada = lista.slice().sort((a,b) => new Date(b.atualizado_em || b.criado_em) - new Date(a.atualizado_em || a.criado_em));
  if (!ordenada.length) {
    cont.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('orc_none_found') + '</div>';
    return;
  }
  cont.innerHTML = '<div class="tbl-wrap"><table class="tbl">'
    + '<thead><tr>'
      + '<th>' + tr('label_titulo_orcamento') + '</th>'
      + '<th>' + tr('label_cliente_orcamento') + '</th>'
      + '<th>' + tr('label_valor_orcamento') + '</th>'
      + '<th>' + tr('clientes_th_status') + '</th>'
      + '<th>' + tr('orc_th_responsavel') + '</th>'
      + '<th>' + tr('orc_th_atualizado') + '</th>'
      + '<th>' + tr('clientes_th_acoes') + '</th>'
    + '</tr></thead><tbody>'
    + ordenada.map(o => {
        const col = ORC_COLS.find(c => c.id === orcamentoColuna(o)) || ORC_COLS[0];
        return '<tr>'
          + '<td style="font-weight:500">' + (o.titulo || '—') + '</td>'
          + '<td>' + (o.cliente_nome ? o.cliente_nome : '<span style="color:#bbb;font-style:italic">' + tr('orc_sem_cliente') + '</span>') + '</td>'
          + '<td>' + (o.valor != null ? '$' + Number(o.valor).toFixed(2) : '—') + '</td>'
          + '<td><span style="font-size:10px;padding:2px 8px;border-radius:99px;background:' + col.bg + ';color:' + col.color + '">' + tr(col.key) + '</span></td>'
          + '<td>' + (o.criado_por || '—') + '</td>'
          + '<td>' + orcFmtData(o.atualizado_em || o.criado_em) + '</td>'
          + '<td><button onclick="abrirEditarOrcamento(\'' + o.id + '\')" style="padding:3px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit">' + tr('btn_editar') + '</button></td>'
          + '</tr>';
      }).join('')
    + '</tbody></table></div>';
}

// ── Análise (gráficos) ──
function renderOrcamentosAnalise(cont) {
  const lista = orcamentosFiltrados();
  cont.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">'
    + '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:14px">'
      + '<div style="font-size:12px;font-weight:600;margin-bottom:10px">' + tr('orc_analise_funil_title') + '</div>'
      + '<div style="height:220px"><canvas id="orc-chart-funil"></canvas></div>'
    + '</div>'
    + '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:14px">'
      + '<div style="font-size:12px;font-weight:600;margin-bottom:10px">' + tr('orc_analise_motivos_title') + '</div>'
      + '<div style="height:220px"><canvas id="orc-chart-motivos"></canvas></div>'
    + '</div>'
    + '</div>';

  const totalTerminado = lista.filter(o => ['convertido','perdido'].includes(o.status)).length;
  const convertidos = lista.filter(o => o.status === 'convertido').length;
  const taxaConversao = totalTerminado ? (convertidos / totalTerminado * 100) : null;
  cont.innerHTML += '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:14px;display:flex;align-items:center;justify-content:space-between">'
    + '<span style="font-size:12px;color:#888">' + tr('orc_analise_conversao') + '</span>'
    + '<span style="font-size:20px;font-weight:700;color:' + (taxaConversao != null && taxaConversao >= 50 ? '#166534' : '#1a1a1a') + '">' + (taxaConversao != null ? taxaConversao.toFixed(0) + '%' : '—') + '</span>'
    + '</div>';

  setTimeout(() => {
    if (orcChartFunil) { orcChartFunil.destroy(); orcChartFunil = null; }
    if (orcChartMotivos) { orcChartMotivos.destroy(); orcChartMotivos = null; }

    const elFunil = document.getElementById('orc-chart-funil');
    if (elFunil && window.Chart) {
      const labels = ORC_COLS.map(c => tr(c.key));
      const dados = ORC_COLS.map(c => lista.filter(o => orcamentoColuna(o) === c.id).length);
      const cores = ORC_COLS.map(c => c.color);
      orcChartFunil = new Chart(elFunil, {
        type: 'bar',
        data: { labels, datasets: [{ data: dados, backgroundColor: cores, borderRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } }, x: { ticks: { font: { size: 10 } } } } }
      });
    }

    const elMotivos = document.getElementById('orc-chart-motivos');
    if (elMotivos && window.Chart) {
      const perdidos = lista.filter(o => o.status === 'perdido');
      const porMotivo = {};
      perdidos.forEach(o => { const m = o.motivo_perda || tr('orc_sem_motivo'); porMotivo[m] = (porMotivo[m] || 0) + 1; });
      const labels = Object.keys(porMotivo);
      const dados = Object.values(porMotivo);
      if (labels.length) {
        const paleta = ['#991b1b','#dc2626','#f87171','#fb923c','#f59e0b','#a855f7','#6366f1'];
        orcChartMotivos = new Chart(elMotivos, {
          type: 'doughnut',
          data: { labels, datasets: [{ data: dados, backgroundColor: paleta, borderWidth: 0 }] },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } } }
        });
      } else {
        elMotivos.parentElement.innerHTML = '<div style="font-size:12px;font-weight:600;margin-bottom:10px">' + tr('orc_analise_motivos_title') + '</div><div style="text-align:center;color:#bbb;font-size:12px;padding:40px 0">' + tr('orc_none_found') + '</div>';
      }
    }
  }, 50);
}

// ── Modal Novo/Editar Orçamento ──
function abrirNovoOrcamento() {
  ['orc-titulo','orc-descricao','orc-valor','orc-cliente-busca'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  orcClienteSel = null;
  const selBox = document.getElementById('orc-cliente-sel');
  if (selBox) selBox.style.display = 'none';
  const resBox = document.getElementById('orc-cliente-res');
  if (resBox) resBox.style.display = 'none';
  orcEditandoId = null;
  orcAreasData = [];
  orcParcelasData = [];
  const valorInput = document.getElementById('orc-valor');
  if (valorInput) valorInput.readOnly = false;
  const propostaSection = document.getElementById('orc-proposta-section');
  if (propostaSection) propostaSection.style.display = 'none';
  const pdfBtn = document.getElementById('orc-pdf-btn');
  if (pdfBtn) pdfBtn.style.display = 'none';
  document.getElementById('m-novo-orc').querySelector('.modal-hd-title').textContent = tr('orc_novo_title');
  const btn = document.getElementById('m-novo-orc').querySelector('.btn-pri');
  btn.textContent = tr('btn_cadastrar');
  btn.onclick = salvarOrcamento;
  abrirModal('m-novo-orc');
}

function buscarClienteOrcamento(q) {
  clearTimeout(orcBuscaTimer);
  const res = document.getElementById('orc-cliente-res');
  if (!res) return;
  if (!q || q.length < 2) { res.style.display = 'none'; return; }
  orcBuscaTimer = setTimeout(() => {
    const ql = q.toLowerCase();
    const lista = clientesData.filter(c => (c.nome||'').toLowerCase().includes(ql)).slice(0, 6);
    if (!lista.length) { res.style.display = 'none'; return; }
    res.style.display = 'block';
    res.innerHTML = lista.map(c => '<div onclick="selecionarClienteOrcamento(' + JSON.stringify(c).replace(/"/g,"'") + ')" style="padding:9px 12px;cursor:pointer;border-bottom:1px solid #f5f5f3"><div style="font-size:13px;font-weight:500">' + c.nome + '</div><div style="font-size:11px;color:#888">' + [c.email,c.telefone].filter(Boolean).join(' · ') + '</div></div>').join('');
  }, 250);
}

function selecionarClienteOrcamento(c) {
  orcClienteSel = c;
  document.getElementById('orc-cliente-busca').value = '';
  document.getElementById('orc-cliente-res').style.display = 'none';
  document.getElementById('orc-cliente-sel').style.display = 'flex';
  document.getElementById('orc-cliente-nome').textContent = c.nome;
}

function limparClienteOrcamento() {
  orcClienteSel = null;
  document.getElementById('orc-cliente-sel').style.display = 'none';
  document.getElementById('orc-cliente-busca')?.focus();
}

async function salvarOrcamento() {
  const titulo = document.getElementById('orc-titulo')?.value.trim();
  if (!titulo) { toast(tr('orc_titulo_obrigatorio'), 'err'); return; }
  try {
    await sbPost('crm_orcamentos', {
      titulo,
      cliente_id: orcClienteSel?.id || null,
      cliente_nome: orcClienteSel?.nome || document.getElementById('orc-cliente-busca')?.value.trim() || '',
      cliente_tel: orcClienteSel?.telefone || null,
      cliente_email: orcClienteSel?.email || null,
      descricao: document.getElementById('orc-descricao')?.value.trim() || null,
      valor: document.getElementById('orc-valor')?.value ? parseFloat(document.getElementById('orc-valor').value) : null,
      status: 'lead', criado_por: ME.nome
    });
    fecharModal('m-novo-orc');
    toast(tr('orc_salvo'), 'ok');
    renderOrcamentos();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function abrirEditarOrcamento(id) {
  const o = orcamentosData.find(x => x.id === id);
  if (!o) return;
  document.getElementById('orc-titulo').value = o.titulo || '';
  document.getElementById('orc-descricao').value = o.descricao || '';
  document.getElementById('orc-valor').value = o.valor != null ? o.valor : '';
  document.getElementById('orc-cliente-busca').value = '';
  document.getElementById('orc-cliente-res').style.display = 'none';
  if (o.cliente_nome) {
    orcClienteSel = clientesData.find(c => c.id === o.cliente_id) || { id: o.cliente_id, nome: o.cliente_nome, telefone: o.cliente_tel, email: o.cliente_email };
    document.getElementById('orc-cliente-sel').style.display = 'flex';
    document.getElementById('orc-cliente-nome').textContent = o.cliente_nome;
  } else {
    orcClienteSel = null;
    document.getElementById('orc-cliente-sel').style.display = 'none';
  }
  const propostaSection = document.getElementById('orc-proposta-section');
  if (propostaSection) propostaSection.style.display = 'block';
  const pdfBtn = document.getElementById('orc-pdf-btn');
  if (pdfBtn) pdfBtn.style.display = 'inline-block';
  document.getElementById('orc-imposto-pct').value = o.imposto_pct != null ? o.imposto_pct : 0;
  await carregarPropostaOrcamento(id);
  document.getElementById('m-novo-orc').querySelector('.modal-hd-title').textContent = tr('orc_editar_title');
  const btn = document.getElementById('m-novo-orc').querySelector('.btn-pri');
  btn.textContent = tr('btn_salvar');
  btn.onclick = async () => {
    const tituloNovo = document.getElementById('orc-titulo')?.value.trim();
    if (!tituloNovo) { toast(tr('orc_titulo_obrigatorio'), 'err'); return; }
    const impostoPct = parseFloat(document.getElementById('orc-imposto-pct')?.value) || 0;
    const valorFinal = orcAreasData.length ? calcularTotaisOrcamentoProposta().total : (document.getElementById('orc-valor')?.value ? parseFloat(document.getElementById('orc-valor').value) : null);
    try {
      await sbPatch('crm_orcamentos?id=eq.' + id, {
        titulo: tituloNovo,
        cliente_id: orcClienteSel?.id || null,
        cliente_nome: orcClienteSel?.nome || document.getElementById('orc-cliente-busca')?.value.trim() || o.cliente_nome || '',
        cliente_tel: orcClienteSel?.telefone || null,
        cliente_email: orcClienteSel?.email || null,
        descricao: document.getElementById('orc-descricao')?.value.trim() || null,
        valor: valorFinal,
        imposto_pct: impostoPct
      });
      fecharModal('m-novo-orc');
      toast(tr('orc_salvo'), 'ok');
      renderOrcamentos();
    } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
  };
  abrirModal('m-novo-orc');
}

// ── PROPOSTA DETALHADA (Areas / Itens dentro do Orçamento) ─────
let orcAreasData = [];
let orcParcelasData = [];
let orcEditandoId = null;
let orcItemAreaAlvo = null;
let catalogoCache = [];

async function garantirCatalogoCache() {
  try { catalogoCache = await sbGet('catalogo_itens?ativo=eq.true&order=nome'); }
  catch(e) { catalogoCache = catalogoCache || []; }
  return catalogoCache;
}

async function carregarPropostaOrcamento(orcId) {
  orcEditandoId = orcId;
  let areas = [], itens = [], parcelas = [];
  try {
    [areas, itens, parcelas] = await Promise.all([
      sbGet('orcamento_areas?orcamento_id=eq.' + orcId + '&order=ordem.asc'),
      sbGet('orcamento_itens?order=ordem.asc'),
      sbGet('orcamento_parcelas?orcamento_id=eq.' + orcId + '&order=ordem.asc')
    ]);
  } catch(e) {}
  orcAreasData = areas.map(a => ({ ...a, itens: itens.filter(it => it.area_id === a.id) }));
  orcParcelasData = parcelas;
  renderAreasOrcamento();
  renderParcelasOrcamento();
}

function orcTotaisArea(area) {
  return (area.itens || []).reduce((s, it) => s + (Number(it.preco_unitario)||0) * (Number(it.quantidade)||0), 0);
}

function renderAreasOrcamento() {
  const el = document.getElementById('orc-areas-lista');
  if (!el) return;
  el.innerHTML = orcAreasData.length
    ? orcAreasData.map(a => areaCardHTML(a)).join('')
    : '<div style="font-size:12px;color:#bbb">' + tr('orc_sem_areas') + '</div>';
  atualizarResumoFinanceiroOrcamento();
}

function areaCardHTML(area) {
  const total = orcTotaisArea(area);
  return '<div style="border:1px solid #e8e8e5;border-radius:8px;padding:10px 12px">'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
      + '<span style="font-size:12px;font-weight:600">' + area.nome + '</span>'
      + '<span style="display:flex;gap:6px">'
        + '<button type="button" onclick="abrirNovoItemOrcamento(\'' + area.id + '\')" style="font-size:10px;padding:3px 9px;border:1px dashed #d4d4d0;border-radius:6px;background:#fff;cursor:pointer">' + tr('orc_add_item_btn') + '</button>'
        + '<button type="button" onclick="excluirAreaOrcamento(\'' + area.id + '\')" style="background:none;border:none;cursor:pointer;color:#c00;font-size:11px">' + tr('orc_excluir') + '</button>'
      + '</span>'
    + '</div>'
    + (area.itens && area.itens.length
        ? '<table style="width:100%;font-size:11px;border-collapse:collapse">'
          + area.itens.map(it => '<tr style="border-top:1px solid #f0f0ee">'
              + '<td style="padding:5px 4px">' + it.nome + ' <span style="color:#bbb">(' + (it.tipo==='material'?tr('cat_tipo_material'):tr('cat_tipo_mao_obra')) + ')</span></td>'
              + '<td style="padding:5px 4px;text-align:right;white-space:nowrap">$' + Number(it.preco_unitario).toFixed(2) + ' × ' + it.quantidade + '</td>'
              + '<td style="padding:5px 4px;text-align:right;font-weight:600;white-space:nowrap">$' + (Number(it.preco_unitario)*Number(it.quantidade)).toFixed(2) + '</td>'
              + '<td style="padding:5px 4px;text-align:right"><button type="button" onclick="excluirItemOrcamento(\'' + it.id + '\',\'' + area.id + '\')" style="background:none;border:none;cursor:pointer;color:#bbb;font-size:14px">×</button></td>'
            + '</tr>').join('')
          + '</table>'
        : '<div style="font-size:11px;color:#bbb">' + tr('orc_area_sem_itens') + '</div>')
    + '<div style="text-align:right;font-size:11px;font-weight:600;margin-top:6px">' + tr('orc_area_total') + ' $' + total.toFixed(2) + '</div>'
    + '</div>';
}

async function adicionarAreaOrcamento() {
  if (!orcEditandoId) return;
  const nome = prompt(tr('orc_area_prompt_nome'));
  if (!nome || !nome.trim()) return;
  try {
    const [nova] = await sbPost('orcamento_areas', { orcamento_id: orcEditandoId, nome: nome.trim(), ordem: orcAreasData.length });
    orcAreasData.push({ ...nova, itens: [] });
    renderAreasOrcamento();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirAreaOrcamento(areaId) {
  if (!confirm(tr('orc_area_excluir_confirm'))) return;
  try {
    await sbDelete('orcamento_areas?id=eq.' + areaId);
    orcAreasData = orcAreasData.filter(a => a.id !== areaId);
    renderAreasOrcamento();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

let oiItemSelecionado = null;
let oiBuscaTimer = null;

async function abrirNovoItemOrcamento(areaId) {
  orcItemAreaAlvo = areaId;
  await garantirCatalogoCache();
  document.getElementById('oi-tipo').value = 'material';
  document.getElementById('oi-qtd').value = 1;
  document.getElementById('oi-preco').value = '';
  limparItemCatalogoModal();
  abrirModal('m-orc-item');
}

function oiTipoAlterado() {
  limparItemCatalogoModal();
}

function buscarItemCatalogoModal(q) {
  clearTimeout(oiBuscaTimer);
  const res = document.getElementById('oi-catalogo-res');
  if (!res) return;
  if (!q || q.trim().length < 2) { res.style.display = 'none'; return; }
  oiBuscaTimer = setTimeout(() => {
    const tipo = document.getElementById('oi-tipo')?.value || 'material';
    const ql = q.trim().toLowerCase();
    const lista = catalogoCache.filter(c => c.tipo === tipo && c.nome.toLowerCase().includes(ql)).slice(0, 8);
    if (!lista.length) { res.style.display = 'none'; return; }
    res.style.display = 'block';
    res.innerHTML = lista.map(c => '<div onclick="selecionarItemCatalogoModal(\'' + c.id + '\')" onmouseover="this.style.background=\'#f7f7f5\'" onmouseout="this.style.background=\'#fff\'" style="padding:14px 16px;cursor:pointer;border-bottom:1px solid #f0f0ee;background:#fff"><div style="font-size:15px;font-weight:600;line-height:1.35;margin-bottom:4px">' + c.nome + '</div><div style="font-size:13px;color:#777"><span style="font-weight:600;color:#2a9d5c">$' + Number(c.preco_venda).toFixed(2) + '</span>' + (c.descricao ? ' &middot; ' + c.descricao : '') + '</div></div>').join('');
  }, 200);
}

function selecionarItemCatalogoModal(id) {
  const c = catalogoCache.find(x => x.id === id);
  if (!c) return;
  oiItemSelecionado = c;
  document.getElementById('oi-busca').value = '';
  document.getElementById('oi-catalogo-res').style.display = 'none';
  document.getElementById('oi-catalogo-sel-box').style.display = 'flex';
  document.getElementById('oi-catalogo-sel-nome').textContent = c.nome;
  document.getElementById('oi-preco').value = c.preco_venda;
}

function limparItemCatalogoModal() {
  oiItemSelecionado = null;
  const busca = document.getElementById('oi-busca');
  if (busca) busca.value = '';
  const res = document.getElementById('oi-catalogo-res');
  if (res) res.style.display = 'none';
  const selBox = document.getElementById('oi-catalogo-sel-box');
  if (selBox) selBox.style.display = 'none';
  document.getElementById('oi-preco').value = '';
  busca?.focus();
}

async function salvarItemOrcamento() {
  if (!orcItemAreaAlvo) return;
  const tipo = document.getElementById('oi-tipo')?.value || 'material';
  const catalogoItem = oiItemSelecionado;
  const catalogoId = catalogoItem?.id || null;
  const nomeDigitado = catalogoItem ? catalogoItem.nome : document.getElementById('oi-busca')?.value.trim();
  if (!nomeDigitado || !nomeDigitado.trim()) { toast(tr('orc_item_nome_obrigatorio'), 'err'); return; }
  const nome = catalogoItem ? nomeDigitado : normalizarNomeItem(nomeDigitado);
  const qtd = parseFloat(document.getElementById('oi-qtd')?.value) || 1;
  const preco = parseFloat(document.getElementById('oi-preco')?.value) || 0;
  const areaId = orcItemAreaAlvo;
  try {
    const area = orcAreasData.find(a => a.id === areaId);
    const [novo] = await sbPost('orcamento_itens', {
      area_id: areaId,
      catalogo_item_id: catalogoId || null,
      tipo, nome: nome.trim(),
      descricao: catalogoItem?.descricao || '',
      preco_unitario: preco,
      quantidade: qtd,
      ordem: area ? area.itens.length : 0
    });
    if (area) area.itens.push(novo);
    fecharModal('m-orc-item');
    renderAreasOrcamento();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirItemOrcamento(itemId, areaId) {
  try {
    await sbDelete('orcamento_itens?id=eq.' + itemId);
    const area = orcAreasData.find(a => a.id === areaId);
    if (area) area.itens = area.itens.filter(it => it.id !== itemId);
    renderAreasOrcamento();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function calcularTotaisOrcamentoProposta() {
  let totalParts = 0, totalLabor = 0;
  orcAreasData.forEach(a => (a.itens || []).forEach(it => {
    const sub = (Number(it.preco_unitario)||0) * (Number(it.quantidade)||0);
    if (it.tipo === 'mao_obra') totalLabor += sub; else totalParts += sub;
  }));
  const subtotal = totalParts + totalLabor;
  const impostoPct = parseFloat(document.getElementById('orc-imposto-pct')?.value) || 0;
  const imposto = totalParts * impostoPct / 100;
  const total = subtotal + imposto;
  return { totalParts, totalLabor, subtotal, impostoPct, imposto, total };
}

function atualizarResumoFinanceiroOrcamento() {
  const el = document.getElementById('orc-resumo-financeiro');
  const valorInput = document.getElementById('orc-valor');
  if (!el) return;
  if (!orcAreasData.length) { el.innerHTML = ''; if (valorInput) valorInput.readOnly = false; renderParcelasOrcamento(); return; }
  const t = calcularTotaisOrcamentoProposta();
  el.innerHTML = '<div style="display:flex;justify-content:space-between;padding:2px 0"><span>' + tr('orc_total_parts') + '</span><span>$' + t.totalParts.toFixed(2) + '</span></div>'
    + '<div style="display:flex;justify-content:space-between;padding:2px 0"><span>' + tr('orc_total_labor') + '</span><span>$' + t.totalLabor.toFixed(2) + '</span></div>'
    + '<div style="display:flex;justify-content:space-between;padding:2px 0"><span>' + tr('orc_subtotal') + '</span><span>$' + t.subtotal.toFixed(2) + '</span></div>'
    + '<div style="display:flex;justify-content:space-between;padding:2px 0;color:#888"><span>' + tr('orc_imposto') + ' (' + t.impostoPct + '%)</span><span>$' + t.imposto.toFixed(2) + '</span></div>'
    + '<div style="display:flex;justify-content:space-between;padding:4px 0 0;margin-top:4px;border-top:1px solid #e8e8e5;font-weight:700"><span>' + tr('orc_total_proposta') + '</span><span>$' + t.total.toFixed(2) + '</span></div>';
  if (valorInput) { valorInput.value = t.total.toFixed(2); valorInput.readOnly = true; }
  renderParcelasOrcamento();
}

// ── PARCELAMENTO (Payment Schedule) ─────────────────────────────
function orcTotalAtual() {
  if (orcAreasData.length) return calcularTotaisOrcamentoProposta().total;
  return parseFloat(document.getElementById('orc-valor')?.value) || 0;
}

function renderParcelasOrcamento() {
  const el = document.getElementById('orc-parcelas-lista');
  if (!el) return;
  const totalAtual = orcTotalAtual();
  if (!orcParcelasData.length) {
    el.innerHTML = '<div style="font-size:12px;color:#bbb">' + tr('orc_sem_parcelas') + '</div>';
    return;
  }
  const somaPct = orcParcelasData.reduce((s, p) => s + (Number(p.percentual) || 0), 0);
  const somaCor = Math.abs(somaPct - 100) < 0.01 ? '#2a9d5c' : '#c07a1e';
  el.innerHTML = orcParcelasData.map((p, i) => {
    const valor = totalAtual * (Number(p.percentual) || 0) / 100;
    return '<div style="display:flex;justify-content:space-between;align-items:center;border:1px solid #e8e8e5;border-radius:8px;padding:8px 12px">'
      + '<div style="font-size:12px"><span style="font-weight:600">' + tr('orc_parcela_label') + ' ' + (i + 1) + '</span> — ' + Number(p.percentual).toFixed(1) + '% · ' + (p.condicao || '') + '</div>'
      + '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:12px;font-weight:600">$' + valor.toFixed(2) + '</span>'
      + '<button type="button" onclick="excluirParcelaOrcamento(\'' + p.id + '\')" style="background:none;border:none;cursor:pointer;color:#bbb;font-size:14px">×</button></div>'
      + '</div>';
  }).join('')
    + '<div style="text-align:right;font-size:11px;color:' + somaCor + ';margin-top:2px">' + tr('orc_parcelas_soma') + ': ' + somaPct.toFixed(1) + '%' + (Math.abs(somaPct - 100) < 0.01 ? '' : ' ' + tr('orc_parcelas_soma_aviso')) + '</div>';
}

function abrirNovaParcela() {
  if (!orcEditandoId) return;
  const somaAtual = orcParcelasData.reduce((s, p) => s + (Number(p.percentual) || 0), 0);
  document.getElementById('op-percentual').value = somaAtual < 100 ? (100 - somaAtual).toFixed(2) : '';
  document.getElementById('op-condicao').value = '';
  abrirModal('m-orc-parcela');
}

async function salvarParcelaOrcamento() {
  if (!orcEditandoId) return;
  const percentual = parseFloat(document.getElementById('op-percentual')?.value);
  if (!(percentual > 0) || percentual > 100) { toast(tr('orc_parcela_percentual_invalido'), 'err'); return; }
  const condicao = document.getElementById('op-condicao')?.value.trim();
  if (!condicao) { toast(tr('orc_parcela_condicao_obrigatoria'), 'err'); return; }
  try {
    const [nova] = await sbPost('orcamento_parcelas', {
      orcamento_id: orcEditandoId,
      percentual, condicao,
      ordem: orcParcelasData.length
    });
    orcParcelasData.push(nova);
    fecharModal('m-orc-parcela');
    renderParcelasOrcamento();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirParcelaOrcamento(parcelaId) {
  if (!confirm(tr('orc_parcela_excluir_confirm'))) return;
  try {
    await sbDelete('orcamento_parcelas?id=eq.' + parcelaId);
    orcParcelasData = orcParcelasData.filter(p => p.id !== parcelaId);
    renderParcelasOrcamento();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}


// ── LOGO DA EMPRESA (usado em todos os PDFs gerados pelo sistema) ──────
// Mesmo arquivo usado na tela de login e na sidebar (é um "K" escuro sobre fundo
// transparente); pra usar em cima de uma barra escura no PDF, geramos uma versão
// branca por canvas (mesmo truque do filter:brightness(10) usado no CSS da sidebar).
const LOGO_KSH_BASE64 = 'data:image/png;base64,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';
const LOGO_KSH_RATIO = 303 / 392; // largura / altura do arquivo original

let logoKshBrancoCache = null;
function obterLogoKshBrancoDataUrl() {
  if (logoKshBrancoCache) return Promise.resolve(logoKshBrancoCache);
  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = function() {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        logoKshBrancoCache = canvas.toDataURL('image/png');
        resolve(logoKshBrancoCache);
      } catch(e) { reject(e); }
    };
    img.onerror = reject;
    img.src = LOGO_KSH_BASE64;
  });
}

// Desenha o cabecalho padrao (barra escura + logo branco + nome da empresa) usado
// como capa em todos os PDFs do sistema. Devolve a altura da barra, pra quem chamou
// saber de onde continuar desenhando o resto do conteudo.
async function desenharCabecalhoPDF(doc, tituloDoc) {
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  const alturaBarra = 108;
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, pageW, alturaBarra, 'F');
  const logoH = 40;
  const logoW = logoH * LOGO_KSH_RATIO;
  try {
    const logoBranco = await obterLogoKshBrancoDataUrl();
    doc.addImage(logoBranco, 'PNG', margin, 24, logoW, logoH);
  } catch(e) {}
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.text('KILIAN SMART HOMES', margin + logoW + 14, 46);
  doc.setFontSize(8.5);
  doc.setTextColor(190, 190, 190);
  doc.text('South Florida  ·  Smart Home & AV Integration', margin + logoW + 14, 60);
  if (tituloDoc) {
    doc.setFontSize(9);
    doc.setTextColor(190, 190, 190);
    doc.text(tituloDoc.toUpperCase(), pageW - margin, 46, { align: 'right' });
  }
  return alturaBarra;
}

// Cabecalho leve (sem imagem) pra paginas de continuacao, onde a barra escura cheia
// ficaria repetitiva - so uma linha fina + o nome da empresa em cinza.
function desenharCabecalhoLevePDF(doc, tituloDoc) {
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  doc.setDrawColor(230, 230, 226);
  doc.setLineWidth(1);
  doc.line(margin, 34, pageW - margin, 34);
  doc.setFontSize(9);
  doc.setTextColor(140);
  doc.text('KILIAN SMART HOMES', margin, 24);
  if (tituloDoc) doc.text(tituloDoc, pageW - margin, 24, { align: 'right' });
  return 50;
}

// Numera as paginas no final (depois que todo o conteudo ja foi desenhado), pra nao
// precisar saber o total de paginas com antecedencia.
// So adiciona o numero da pagina (canto inferior direito) - o rodape com o nome
// da empresa fica por conta de cada PDF (alguns ja tem um rodape proprio com
// referencia/numero de OS etc, pra nao duplicar texto em cima do outro).
function numerarPaginasPDF(doc) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const total = doc.internal.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(160);
    doc.text((LANG === 'pt' ? 'Página ' : 'Page ') + i + ' / ' + total, pageW - margin, pageH - 24, { align: 'right' });
  }
}

// ── GERAR PDF DA PROPOSTA (modelo cover / areas & itens / resumo financeiro / parcelamento) ──
async function gerarPropostaPDF() {
  if (!orcEditandoId) return;
  const o = orcamentosData.find(x => x.id === orcEditandoId);
  const titulo = document.getElementById('orc-titulo')?.value.trim() || (o && o.titulo) || '';
  const descricao = document.getElementById('orc-descricao')?.value.trim() || '';
  const clienteNome = orcClienteSel?.nome || (o && o.cliente_nome) || '';
  const clienteTel = orcClienteSel?.telefone || (o && o.cliente_tel) || '';
  const clienteEmail = orcClienteSel?.email || (o && o.cliente_email) || '';
  const temAreas = orcAreasData.length > 0;
  const totais = temAreas ? calcularTotaisOrcamentoProposta() : null;
  const valorManual = parseFloat(document.getElementById('orc-valor')?.value) || 0;
  const totalProposta = temAreas ? totais.total : valorManual;
  const dataHoje = new Date().toLocaleDateString(LANG === 'pt' ? 'pt-BR' : 'en-US');
  const refCurta = orcEditandoId.slice(0, 8).toUpperCase();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  let y = 0;

  function rodape() {
    doc.setFontSize(8);
    doc.setTextColor(160);
    doc.text('Kilian Smart Homes © ' + new Date().getFullYear() + '  ·  ' + tr('orc_pdf_ref') + ' ' + refCurta, margin, pageH - 24);
  }
  function novaPagina() {
    rodape();
    doc.addPage();
    y = 50;
  }
  function garantirEspaco(altura) {
    if (y + altura > pageH - 50) novaPagina();
  }

  // ── Capa ──
  const alturaBarraOrc = await desenharCabecalhoPDF(doc, tr('orc_pdf_proposta_titulo'));

  y = alturaBarraOrc + 38;
  doc.setFontSize(10.5);
  doc.setTextColor(150);
  doc.text(tr('orc_pdf_proposta_titulo').toUpperCase(), margin, y);
  y += 20;
  doc.setTextColor(20, 20, 20);
  doc.setFontSize(17);
  doc.text(titulo || tr('orc_pdf_sem_titulo'), margin, y);
  y += 20;
  doc.setFontSize(9);
  doc.setTextColor(140);
  doc.text(tr('orc_pdf_data') + ': ' + dataHoje + '   ·   ' + tr('orc_pdf_ref') + ': ' + refCurta, margin, y);
  y += 30;

  function campoCapa(label, valor) {
    if (!valor) return;
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.text(label.toUpperCase(), margin, y);
    y += 13;
    doc.setFontSize(12);
    doc.setTextColor(30);
    const linhas = doc.splitTextToSize(String(valor), pageW - margin * 2);
    doc.text(linhas, margin, y);
    y += linhas.length * 14 + 12;
  }

  doc.setFontSize(11);
  doc.setTextColor(20);
  doc.text(tr('orc_pdf_cliente_secao'), margin, y);
  y += 16;
  campoCapa(tr('orc_pdf_cliente_nome'), clienteNome);
  campoCapa(tr('orc_pdf_cliente_tel'), clienteTel);
  campoCapa(tr('orc_pdf_cliente_email'), clienteEmail);

  if (descricao) {
    doc.setFontSize(11);
    doc.setTextColor(20);
    doc.text(tr('orc_pdf_escopo'), margin, y);
    y += 16;
    doc.setFontSize(10);
    doc.setTextColor(60);
    const linhas = doc.splitTextToSize(descricao, pageW - margin * 2);
    doc.text(linhas, margin, y);
    y += linhas.length * 13 + 16;
  }

  // total destacado na capa
  garantirEspaco(60);
  doc.setFillColor(247, 247, 245);
  doc.roundedRect(margin, y, pageW - margin * 2, 46, 6, 6, 'F');
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(tr('orc_pdf_total_proposta_label'), margin + 16, y + 18);
  doc.setFontSize(18);
  doc.setTextColor(20);
  doc.text('$' + totalProposta.toFixed(2), margin + 16, y + 37);
  y += 70;

  // ── Areas & Itens ──
  if (temAreas) {
    novaPagina();
    doc.setFontSize(14);
    doc.setTextColor(20);
    doc.text(tr('orc_pdf_areas_itens_titulo'), margin, y);
    y += 24;

    orcAreasData.forEach(area => {
      garantirEspaco(50);
      doc.setFillColor(245, 245, 243);
      doc.rect(margin, y, pageW - margin * 2, 22, 'F');
      doc.setFontSize(11);
      doc.setTextColor(20);
      doc.text(area.nome, margin + 8, y + 15);
      y += 30;

      const itens = area.itens || [];
      if (!itens.length) {
        doc.setFontSize(9);
        doc.setTextColor(160);
        doc.text(tr('orc_area_sem_itens'), margin + 8, y);
        y += 18;
      } else {
        const colNome = margin + 8, colTipo = margin + 300, colQtd = margin + 360, colPreco = margin + 410, colTotal = pageW - margin - 8;
        doc.setFontSize(8.5);
        doc.setTextColor(140);
        doc.text(tr('orc_pdf_col_item').toUpperCase(), colNome, y);
        doc.text(tr('orc_pdf_col_qtd').toUpperCase(), colQtd, y, { align: 'right' });
        doc.text(tr('orc_pdf_col_preco').toUpperCase(), colPreco, y, { align: 'right' });
        doc.text(tr('orc_pdf_col_total').toUpperCase(), colTotal, y, { align: 'right' });
        y += 12;
        doc.setDrawColor(230);
        doc.line(margin, y, pageW - margin, y);
        y += 10;

        itens.forEach(it => {
          garantirEspaco(30);
          const nomeLinhas = doc.splitTextToSize(it.nome, 240);
          doc.setFontSize(9.5);
          doc.setTextColor(30);
          doc.text(nomeLinhas, colNome, y);
          doc.setFontSize(7.5);
          doc.setTextColor(150);
          doc.text(it.tipo === 'mao_obra' ? tr('cat_tipo_mao_obra') : tr('cat_tipo_material'), colTipo, y);
          doc.setFontSize(9.5);
          doc.setTextColor(60);
          doc.text(String(it.quantidade), colQtd, y, { align: 'right' });
          doc.text('$' + Number(it.preco_unitario).toFixed(2), colPreco, y, { align: 'right' });
          doc.setTextColor(20);
          doc.text('$' + (Number(it.preco_unitario) * Number(it.quantidade)).toFixed(2), colTotal, y, { align: 'right' });
          y += Math.max(nomeLinhas.length * 12, 16) + 6;
        });
      }

      garantirEspaco(20);
      doc.setFontSize(9.5);
      doc.setTextColor(20);
      doc.text(tr('orc_area_total') + ' $' + orcTotaisArea(area).toFixed(2), pageW - margin - 8, y, { align: 'right' });
      y += 26;
    });

    // ── Financial Summary ──
    garantirEspaco(140);
    doc.setFontSize(13);
    doc.setTextColor(20);
    doc.text(tr('orc_pdf_resumo_financeiro_titulo'), margin, y);
    y += 20;

    function linhaResumo(label, valor, destaque) {
      doc.setFontSize(destaque ? 12 : 10);
      doc.setTextColor(destaque ? 20 : 90);
      doc.text(label, margin, y);
      doc.text('$' + valor.toFixed(2), pageW - margin, y, { align: 'right' });
      y += destaque ? 20 : 16;
    }
    linhaResumo(tr('orc_total_parts'), totais.totalParts, false);
    linhaResumo(tr('orc_total_labor'), totais.totalLabor, false);
    linhaResumo(tr('orc_subtotal'), totais.subtotal, false);
    linhaResumo(tr('orc_imposto') + ' (' + totais.impostoPct + '%)', totais.imposto, false);
    doc.setDrawColor(220);
    doc.line(margin, y, pageW - margin, y);
    y += 14;
    linhaResumo(tr('orc_total_proposta'), totais.total, true);
    y += 20;
  }

  // ── Payment Schedule ──
  if (orcParcelasData.length) {
    garantirEspaco(100);
    doc.setFontSize(13);
    doc.setTextColor(20);
    doc.text(tr('orc_parcelamento_label'), margin, y);
    y += 22;

    orcParcelasData.forEach((p, i) => {
      garantirEspaco(30);
      const valor = totalProposta * (Number(p.percentual) || 0) / 100;
      doc.setFontSize(10.5);
      doc.setTextColor(20);
      doc.text(tr('orc_parcela_label') + ' ' + (i + 1), margin, y);
      doc.setFontSize(9.5);
      doc.setTextColor(100);
      doc.text(Number(p.percentual).toFixed(1) + '%  ·  ' + (p.condicao || ''), margin + 90, y);
      doc.setFontSize(10.5);
      doc.setTextColor(20);
      doc.text('$' + valor.toFixed(2), pageW - margin, y, { align: 'right' });
      y += 20;
    });
  }

  rodape();
  numerarPaginasPDF(doc);
  doc.save('Proposta-' + refCurta + (titulo ? '-' + titulo.replace(/[^a-zA-Z0-9]+/g, '-') : '') + '.pdf');
  toast(tr('orc_pdf_gerado'), 'ok');
}

async function excluirOrcamento(id) {
  if (!confirm(tr('orc_excluir_confirm'))) return;
  try {
    await sbDelete('crm_orcamentos?id=eq.' + id);
    orcamentosData = orcamentosData.filter(o => o.id !== id);
    renderOrcView();
    renderKpisOrcamentos();
    toast(tr('orc_excluido'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// ── TÉCNICOS ──────────────────────────────────────────────────
let tecnicosData = [];

let funcoesData = [];

async function carregarFuncoesTecnico() {
  try {
    funcoesData = await sbGet('funcoes_tecnico?order=nome');
  } catch(e) {
    funcoesData = [];
  }
}

function popularSelectFuncao(selecionado) {
  const sel = document.getElementById('tec-funcao');
  if (!sel) return;
  sel.innerHTML = '<option value="">—</option>'
    + funcoesData.map(f => '<option value="' + f.nome + '"' + (f.nome === selecionado ? ' selected' : '') + '>' + f.nome + '</option>').join('')
    + '<option value="__nova__">' + tr('funcao_adicionar_nova') + '</option>';
}

async function tratarSelecaoFuncao(selectEl) {
  if (selectEl.value === '__nova__') {
    const nome = (prompt(tr('funcao_prompt_nome')) || '').trim();
    if (!nome) { selectEl.value = ''; atualizarVisibilidadePermTec(); return; }
    try {
      const existente = funcoesData.find(f => f.nome.toLowerCase() === nome.toLowerCase());
      if (!existente) {
        await sbPost('funcoes_tecnico', { nome });
        await carregarFuncoesTecnico();
        toast(tr('funcao_criada'), 'ok');
      }
      popularSelectFuncao(nome);
    } catch(e) {
      toast(tr('erro_prefix') + e.message, 'err');
      selectEl.value = '';
    }
  }
  atualizarVisibilidadePermTec();
}

let tecPermEstado = {};

function permEstadoPadrao() {
  const estado = {};
  PERMISSOES_ESTRUTURA.forEach(sec => sec.itens.forEach(it => { estado[it.id] = sec.label === 'Operações'; }));
  return estado;
}

async function carregarTecPermEstado(email) {
  if (!email) return permEstadoPadrao();
  try {
    const rows = await sbGet('usuarios?email=eq.' + encodeURIComponent(email) + '&limit=1');
    const u = rows[0];
    if (!u) return permEstadoPadrao();
    const permitidas = Array.isArray(u.paginas_permitidas) ? u.paginas_permitidas : [];
    const estado = {};
    PERMISSOES_ESTRUTURA.forEach(sec => sec.itens.forEach(it => { estado[it.id] = permitidas.includes(it.id); }));
    return estado;
  } catch(e) { return permEstadoPadrao(); }
}

function renderArvorePermissoesTec() {
  const container = document.getElementById('tec-perm-tree');
  if (!container) return;
  container.innerHTML = PERMISSOES_ESTRUTURA.map(sec => {
    const ligados = sec.itens.filter(it => tecPermEstado[it.id]).length;
    const total = sec.itens.length;
    return '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px;margin-bottom:8px">'
      + '<div style="display:flex;align-items:center;gap:8px;cursor:pointer" onclick="togglePermSecaoTec(\'' + sec.label + '\')">'
      + '<input type="checkbox" ' + (ligados === total ? 'checked' : '') + ' onclick="event.stopPropagation();togglePermSecaoTec(\'' + sec.label + '\')">'
      + '<span style="font-size:12px;font-weight:600;flex:1">' + sec.label + '</span>'
      + '<span style="font-size:11px;color:#999">' + ligados + '/' + total + '</span>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:2px 10px;margin-top:8px;padding-left:2px">'
      + sec.itens.map(it => '<label style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#555;padding:2px 0;cursor:pointer">'
          + '<input type="checkbox" ' + (tecPermEstado[it.id] ? 'checked' : '') + ' onchange="togglePermItemTec(\'' + it.id + '\')">' + it.label + '</label>').join('')
      + '</div></div>';
  }).join('');
}

function togglePermItemTec(id) { tecPermEstado[id] = !tecPermEstado[id]; renderArvorePermissoesTec(); }

function togglePermSecaoTec(label) {
  const sec = PERMISSOES_ESTRUTURA.find(s => s.label === label);
  if (!sec) return;
  const todosOn = sec.itens.every(it => tecPermEstado[it.id]);
  sec.itens.forEach(it => { tecPermEstado[it.id] = !todosOn; });
  renderArvorePermissoesTec();
}

function atualizarVisibilidadePermTec() {
  const funcao = document.getElementById('tec-funcao')?.value; const email = document.getElementById('tec-email')?.value.trim();
  const locked = document.getElementById('tec-perm-locked');
  const tree = document.getElementById('tec-perm-tree');
  if (!locked || !tree) return;
  if (funcao === 'Gestor' || !email) {
    locked.style.display = 'block';
    locked.innerHTML = funcao==='Gestor' ? ('🔒 ' + tr('perm_acesso_total')) : tr('perm_sem_email');
    tree.style.display = 'none';
  } else {
    locked.style.display = 'none';
    tree.style.display = 'block';
    renderArvorePermissoesTec();
  }
}

async function upsertUsuarioPermissoes(email, nome, funcao) {
  if (!email) { toast(tr('perm_sem_email'), 'err'); return; }
  const paginas = funcao === 'Gestor' ? [] : Object.keys(tecPermEstado).filter(id => tecPermEstado[id]);
  try {
    const rows = await sbGet('usuarios?email=eq.' + encodeURIComponent(email) + '&limit=1');
    if (rows[0]) {
      await sbPatch('usuarios?email=eq.' + encodeURIComponent(email), { nome, funcao: funcao || 'Técnico', paginas_permitidas: paginas });
    } else {
      await sbPost('usuarios', { email, nome, funcao: funcao || 'Técnico', paginas_permitidas: paginas });
    }
  } catch(e) {
    toast(tr('erro_prefix') + e.message, 'err');
  }
}

async function renderTecnicos() {
  const el = document.getElementById('mod-content');
  el.innerHTML = `
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <input placeholder="${tr('tecnicos_search_ph')}" style="flex:1;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" id="tec-busca" oninput="filtrarTecnicos()">
  </div>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>${tr('clientes_th_nome')}</th><th>${tr('tecnicos_th_funcao')}</th><th>${tr('clientes_th_email')}</th><th>${tr('clientes_th_tel')}</th><th>${tr('tecnicos_th_valor')}</th><th>${tr('clientes_th_acoes')}</th></tr></thead>
      <tbody id="tec-tbody"><tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">${tr('loading')}</td></tr></tbody>
    </table>
  </div>`;
  try {
    tecnicosData = await sbGet('tecnicos?ativo=eq.true&order=nome');
    renderTabelaTecnicos(tecnicosData);
  } catch(e) {
    document.getElementById('tec-tbody').innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</td></tr>';
  }
}

function filtrarTecnicos() {
  const q = (document.getElementById('tec-busca')?.value || '').toLowerCase();
  renderTabelaTecnicos(q ? tecnicosData.filter(t => (t.nome||'').toLowerCase().includes(q) || (t.email||'').toLowerCase().includes(q) || (t.telefone||'').toLowerCase().includes(q)) : tecnicosData);
}

function renderTabelaTecnicos(lista) {
  const tb = document.getElementById('tec-tbody');
  if (!tb) return;
  if (!lista.length) { tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#bbb">' + tr('tecnicos_none') + '</td></tr>'; return; }
  tb.innerHTML = lista.map(t => `<tr>
    <td style="font-weight:500">${t.nome||'—'}</td>
    <td>${t.funcao||'—'}</td>
    <td>${t.email||'—'}</td>
    <td>${t.telefone||'—'}</td>
    <td>${t.valor_hora != null ? '$' + Number(t.valor_hora).toFixed(2) : '—'}</td>
    <td><button onclick="editarTecnico('${t.id}')" style="padding:3px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit">${tr('btn_editar')}</button></td>
  </tr>`).join('');
}

async function abrirNovoTecnico() {
  ['tec-nome','tec-email','tec-tel','tec-valor'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  if (!funcoesData.length) await carregarFuncoesTecnico();
  popularSelectFuncao(null);
  tecPermEstado = permEstadoPadrao();
  atualizarVisibilidadePermTec();
  document.getElementById('m-novo-tec').querySelector('.modal-hd-title').textContent = tr('modal_novo_tecnico');
  document.getElementById('m-novo-tec').querySelector('.btn-pri').textContent = tr('btn_cadastrar');
  document.getElementById('m-novo-tec').querySelector('.btn-pri').onclick = salvarTecnico;
  abrirModal('m-novo-tec');
}

async function salvarTecnico() {
  const nome = document.getElementById('tec-nome')?.value.trim();
  if (!nome) { toast(tr('tecnico_nome_obrigatorio'), 'err'); return; }
  const funcao = document.getElementById('tec-funcao')?.value || null;
  const email = document.getElementById('tec-email')?.value.trim() || null;
  try {
    await sbPost('tecnicos', {
      nome,
      funcao,
      email,
      telefone: document.getElementById('tec-tel')?.value.trim() || null,
      valor_hora: document.getElementById('tec-valor')?.value ? parseFloat(document.getElementById('tec-valor').value) : null,
      ativo: true
    });
    await upsertUsuarioPermissoes(email, nome, funcao);
    fecharModal('m-novo-tec');
    toast(tr('tecnico_cadastrado'), 'ok');
    renderTecnicos();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function editarTecnico(id) {
  const t = tecnicosData.find(x => x.id === id);
  if (!t) return;
  document.getElementById('tec-nome').value = t.nome || '';
  if (!funcoesData.length) await carregarFuncoesTecnico();
  popularSelectFuncao(t.funcao || null);
  document.getElementById('tec-email').value = t.email || '';
  document.getElementById('tec-tel').value = t.telefone || '';
  document.getElementById('tec-valor').value = t.valor_hora != null ? t.valor_hora : '';
  tecPermEstado = await carregarTecPermEstado(t.email || null);
  atualizarVisibilidadePermTec();
  document.getElementById('m-novo-tec').querySelector('.modal-hd-title').textContent = tr('modal_editar_tecnico');
  document.getElementById('m-novo-tec').querySelector('.btn-pri').textContent = tr('btn_salvar');
  document.getElementById('m-novo-tec').querySelector('.btn-pri').onclick = async () => {
    const nome = document.getElementById('tec-nome').value.trim();
    const funcao = document.getElementById('tec-funcao')?.value || null;
    const email = document.getElementById('tec-email').value.trim() || null;
    try {
      await sbPatch('tecnicos?id=eq.' + id, {
        nome,
        funcao,
        email,
        telefone: document.getElementById('tec-tel').value.trim() || null,
        valor_hora: document.getElementById('tec-valor').value ? parseFloat(document.getElementById('tec-valor').value) : null
      });
      await upsertUsuarioPermissoes(email, nome, funcao);
      fecharModal('m-novo-tec');
      toast(tr('tecnico_atualizado'), 'ok');
      renderTecnicos();
    } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
  };
  abrirModal('m-novo-tec');
}

// ── KSHCAM ────────────────────────────────────────────────────
let osData = [];
const S_LABEL = { aberta: tr('status_aberta'), agendada: tr('status_agendada'), em_campo: tr('status_em_campo'), concluida: tr('status_concluida') };
const S_COLOR = { aberta:'#d97706', agendada:'#7c3aed', em_campo:'#2563eb', concluida:'#16a34a' };
const S_BG    = { aberta:'#fffbeb', agendada:'#f5f3ff', em_campo:'#eff6ff', concluida:'#f0fdf4' };

function bannerDriveDesconectadoHTML() {
  const podeReconectar = ME && ME.funcao === 'Gestor';
  if (podeReconectar) {
    const detalhe = ultimoErroDrive ? '<div style="font-size:10px;color:#a16207;margin-top:4px">' + (LANG==='pt'?'Detalhe tecnico: ':'Technical detail: ') + ultimoErroDrive + '</div>' : '';
    return tr('drive_nao_conectado') + '<span style="cursor:pointer;text-decoration:underline" onclick="conectarGoogle()">' + tr('drive_conectar_agora') + '</span>' + tr('drive_conectar_suffix') + detalhe;
  }
  return tr('drive_nao_conectado_tecnico');
}

async function renderKSHCam() {
  const el = document.getElementById('mod-content');
  el.innerHTML = `
  <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#92400e" id="g-drive-status">
    ${bannerDriveDesconectadoHTML()}
  </div>
  <div class="kpis kpis-4" style="margin-bottom:14px">
    <div class="kpi"><div class="kpi-l">${tr('kpi_total')}</div><div class="kpi-v" id="kpi-tot">—</div></div>
    <div class="kpi"><div class="kpi-l">${tr('kpi_abertas')}</div><div class="kpi-v" id="kpi-ab" style="color:#d97706">—</div></div>
    <div class="kpi"><div class="kpi-l">${tr('kpi_em_campo')}</div><div class="kpi-v" id="kpi-ec" style="color:#2563eb">—</div></div>
    <div class="kpi"><div class="kpi-l">${tr('kpi_concluidas')}</div><div class="kpi-v" id="kpi-co" style="color:#16a34a">—</div></div>
  </div>
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <input placeholder="${tr('os_search_ph')}" style="flex:1;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" id="os-busca" oninput="filtrarOS()">
    <select style="padding:7px 10px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;background:#fff;outline:none" id="os-filtro" onchange="filtrarOS()">
      <option value="em_aberto" selected>Em aberto</option>
      <option value="">${tr('os_filtro_todos')}</option>
      <option value="aberta">${tr('status_aberta')}</option>
      <option value="agendada">${tr('status_agendada')}</option>
      <option value="em_campo">${tr('status_em_campo')}</option>
      <option value="concluida">${tr('status_concluida')}</option>
    </select>
  </div>
  <div id="os-lista"></div>`;

  if (await garantirTokenDrive()) {
    atualizarDriveStatus(true);
  } else {
    // segunda chance em segundo plano (ex: celular que ainda estava conectando na rede ao abrir a pagina)
    setTimeout(async () => { if (await garantirTokenDrive()) atualizarDriveStatus(true); }, 5000);
  }
  await carregarOS();
}

async function carregarOS() {
  const el = document.getElementById('os-lista');
  if (!el) return;
  try {
    osData = await sbGet('ordens_servico?order=created_at.desc');
    filtrarOS();
    if (document.getElementById('kpi-tot')) {
      document.getElementById('kpi-tot').textContent = osData.length;
      document.getElementById('kpi-ab').textContent = osData.filter(o=>o.status==='aberta').length;
      document.getElementById('kpi-ec').textContent = osData.filter(o=>o.status==='em_campo').length;
      document.getElementById('kpi-co').textContent = osData.filter(o=>o.status==='concluida').length;
    }
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c;font-size:12px">' + tr('erro_prefix') + e.message + '</div>';
  }
}

function filtrarOS() {
  const q = (document.getElementById('os-busca')?.value||'').toLowerCase();
  const s = document.getElementById('os-filtro')?.value||'';
  renderOSLista(osData.filter(o => {
    if (s === 'em_aberto') return o.status !== 'concluida';
    if (s) return o.status === s;
    return true;
  }).filter(o => (!q||(o.titulo||'').toLowerCase().includes(q)||(o.cliente||o.cliente_nome||'').toLowerCase().includes(q)||String(o.numero||'').includes(q))));
}

function renderOSLista(lista) {
  const el = document.getElementById('os-lista');
  if (!el) return;
  if (!lista.length) { el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb;font-size:13px">' + tr('os_none_found') + '</div>'; return; }
  el.innerHTML = lista.map(o => `
  <div style="background:#fff;border:1px solid #e8e8e5;border-radius:10px;padding:14px 16px;margin-bottom:8px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:11px;color:#888">${tr('os_prefix')}${o.numero||'—'}</span>
        <span style="font-size:11px;font-weight:500;padding:2px 8px;border-radius:99px;background:${S_BG[o.status]||'#f5f5f3'};color:${S_COLOR[o.status]||'#888'}">${S_LABEL[o.status]||o.status}</span>
        ${o.origem==='manual'?'<span style="font-size:10px;padding:2px 7px;border-radius:99px;background:#f5f5f3;color:#888;border:1px solid #e8e8e5">'+tr('os_manual')+'</span>':'<span style="font-size:10px;padding:2px 7px;border-radius:99px;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe">'+tr('os_de_orcamento')+'</span>'}
      </div>
      <span style="font-size:11px;color:#bbb">${new Date(o.created_at).toLocaleDateString(LANG==='pt'?'pt-BR':'en-US')}</span>
    </div>
    <div style="font-size:14px;font-weight:600;margin-bottom:6px;cursor:pointer" onclick="abrirOS('${o.id}')">${o.titulo||tr('os_sem_titulo')}</div>
    <div style="display:flex;align-items:center;gap:16px;font-size:12px;color:#888;margin-bottom:10px">
      ${(o.cliente||o.cliente_nome)?'<span>👤 '+(o.cliente||o.cliente_nome)+'</span>':''}
      ${o.tecnico_nome?'<span>🔧 '+o.tecnico_nome+'</span>':''}
      ${o.endereco?'<span>📍 '+o.endereco+'</span>':''}
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div>${o.drive_folder_url?'<a href="'+o.drive_folder_url+'" target="_blank" style="font-size:11px;color:#2563eb;text-decoration:none">'+tr('os_ver_no_drive')+'</a>':''}</div>
      <div style="display:flex;gap:6px">
        <button onclick="abrirOS('${o.id}')" style="padding:4px 12px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit;color:#1a1a1a;font-weight:500">${tr('btn_ver_detalhes')}</button>
        <button onclick="editarOS('${o.id}')" style="padding:4px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit;color:#555">${tr('btn_editar')}</button>
        <button onclick="deletarOS('${o.id}','${(o.titulo||'').replace(/'/g,'')}')" style="padding:4px 10px;border:1px solid #fecaca;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit;color:#e74c3c">${tr('btn_deletar')}</button>
      </div>
    </div>
  </div>`).join('');
}

// Abrir OS — modal de detalhe
const OS_TABS = [
  { id: 'geral', key: 'os_tab_geral', icon: '📋' },
  { id: 'dias', key: 'os_tab_dias', icon: '📅' },
  { id: 'gastos', key: 'os_tab_gastos', icon: '💰' },
  { id: 'financeiro', key: 'os_tab_financeiro', icon: '📊' },
  { id: 'fotos', key: 'os_tab_fotos', icon: '📷' },
  { id: 'anotacoes', key: 'os_tab_anotacoes', icon: '📝' },
];

function osTabBarHTML(osId, ativa) {
  return OS_TABS.map(t => '<button onclick="mudarAbaOS(\'' + osId + '\',\'' + t.id + '\')" data-os-tab="' + t.id + '" style="flex-shrink:0;padding:6px 12px;border-radius:99px;font-size:11px;border:1px solid ' + (ativa===t.id?'#1a1a1a':'#e8e8e5') + ';background:' + (ativa===t.id?'#1a1a1a':'#fff') + ';color:' + (ativa===t.id?'#fff':'#555') + ';cursor:pointer;font-family:inherit;white-space:nowrap">' + t.icon + ' ' + tr(t.key) + '</button>').join('');
}

let osAbaAtual = {};

function mudarAbaOS(osId, tabId) {
  osAbaAtual[osId] = tabId;
  OS_TABS.forEach(t => {
    const pane = document.getElementById('os-tab-' + t.id + '-' + osId);
    if (pane) pane.style.display = (t.id === tabId) ? 'block' : 'none';
  });
  const bar = document.getElementById('os-tabbar-' + osId);
  if (bar) bar.innerHTML = osTabBarHTML(osId, tabId);
}

// ── Auto-atualizacao da OS aberta (poll leve, sem precisar apertar Atualizar) ──
let osPollingTimer = null;
let osPollingId = null;

function pararPollingOS() {
  if (osPollingTimer) { clearInterval(osPollingTimer); osPollingTimer = null; }
  osPollingId = null;
}

function iniciarPollingOS(id) {
  if (osPollingId === id) return;
  pararPollingOS();
  osPollingId = id;
  osPollingTimer = setInterval(async () => {
    if (osPollingId !== id) return;
    const modal = document.getElementById('m-det-os');
    if (!modal || modal.style.display === 'none') { pararPollingOS(); return; }
    if (osTemEdicaoPendente(id)) return;
    try { await abrirOS(id, { silencioso: true }); } catch(e) {}
  }, 25000);
}

function osTemEdicaoPendente(id) {
  const idsBotaoSalvar = ['notepad-save-' + id, 'status-save-' + id, 'servico-save-' + id];
  if (idsBotaoSalvar.some(elId => { const el = document.getElementById(elId); return el && el.style.display !== 'none'; })) return true;
  const notaInput = document.getElementById('nota-input-' + id);
  if (notaInput && notaInput.value.trim()) return true;
  return false;
}

function fecharOSDetalhe() {
  pararPollingOS();
  fecharModal('m-det-os');
}


async function abrirOS(id, opts) {
  const silencioso = !!(opts && opts.silencioso);
  const os = osData.find(o => o.id === id);
  if (!os) return;
  const content = document.getElementById('m-det-os-content');
  const scrollAnterior = content.scrollTop;
  if (!silencioso) {
    content.innerHTML = '<div style="padding:40px;text-align:center;color:#bbb">' + tr('loading') + '</div>';
    abrirModal('m-det-os');
  }

  function driveFileId(url) {
    const m = (url || '').match(/\/d\/([a-zA-Z0-9_-]+)/);
    return m ? m[1] : null;
  }
  function fotoThumb(f) {
    if (f.thumb_url) return f.thumb_url;
    const fid = driveFileId(f.drive_url);
    return fid ? ('https://drive.google.com/thumbnail?id=' + fid + '&sz=w400') : '';
  }

  let fotos = [], notas = [], dias = [], gastos = [], racksVinculados = [], plantasVinculadas = [];
  try {
    [fotos, notas, dias, gastos, racksVinculados, plantasVinculadas] = await Promise.all([
      sbGet('os_fotos?os_id=eq.' + id + '&order=criado_em.desc'),
      sbGet('os_notas?os_id=eq.' + id + '&order=criado_em.asc'),
      sbGet('os_dias?os_id=eq.' + id + '&order=data.asc'),
      sbGet('os_gastos?os_id=eq.' + id + '&order=criado_em.desc'),
      sbGet('projetos_racks?os_id=eq.' + id),
      sbGet('projetos_plantas?os_id=eq.' + id)
    ]);
  } catch(e) {}
  await garantirTecnicosAtivosCache();
  const resumoValores = calcularResumoValores(dias, gastos, tecnicosAtivosCache);

  content.innerHTML = `
  <div style="padding:16px 20px;border-bottom:1px solid #e8e8e5;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:10">
    <div>
      <div style="font-size:11px;color:#888;margin-bottom:1px">${tr('os_prefix')}${os.numero||'—'} · <span id="os-status-header-${id}" style="color:${S_COLOR[os.status]||'#888'}">${S_LABEL[os.status]||os.status}</span></div>
      <div style="font-size:16px;font-weight:700">${os.titulo||tr('os_sem_titulo')}</div>
    </div>
    <button onclick="fecharOSDetalhe()" style="background:none;border:none;cursor:pointer;font-size:22px;color:#bbb">×</button>
  </div>
  <div id="os-tabbar-${id}" style="display:flex;gap:6px;padding:10px 20px;border-bottom:1px solid #e8e8e5;overflow-x:auto">${osTabBarHTML(id,'geral')}</div>
  <div style="padding:18px 20px">
    <div id="os-tab-geral-${id}">
    <div class="os-grid-2" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      <div style="background:#f9f9f7;border-radius:8px;padding:12px">
        <div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">${tr('os_cliente_label')}</div>
        <div style="font-size:13px;font-weight:600">${os.cliente_nome||os.cliente||'—'}</div>
        ${os.cliente_tel?'<div style="font-size:12px;color:#555;margin-top:2px">📞 '+os.cliente_tel+'</div>':''}
        ${os.cliente_email?'<div style="font-size:12px;color:#555;margin-top:1px">✉️ '+os.cliente_email+'</div>':''}
      </div>
      <div style="background:#f9f9f7;border-radius:8px;padding:12px">
        <div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">${tr('os_tecnico_label')}</div>
        <div style="font-size:13px;font-weight:600">${os.tecnico_nome||'—'}</div>
        <div style="font-size:11px;color:#888;margin-top:3px">${tr('os_por')}${os.criado_por||'—'}</div>
      </div>
      ${os.endereco?'<div style="background:#f9f9f7;border-radius:8px;padding:12px;grid-column:span 2"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px"><div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:.5px">'+tr('os_endereco_label')+'</div><div style="display:flex;gap:10px"><a href="https://waze.com/ul?q='+encodeURIComponent(os.endereco)+'&navigate=yes" target="_blank" style="font-size:11px;color:#2563eb;text-decoration:none;font-weight:500">🚗 Waze</a><a href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(os.endereco)+'" target="_blank" style="font-size:11px;color:#2563eb;text-decoration:none;font-weight:500">📍 Maps</a></div></div><div style="font-size:13px">'+os.endereco+'</div></div>':''}
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px;grid-column:span 2">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
          <div style="font-size:9px;color:#92400e;text-transform:uppercase;letter-spacing:.5px">${tr('os_servico_label')}</div>
          <button id="servico-save-${id}" onclick="salvarDescricaoOS('${id}')" style="display:none;padding:3px 10px;border:none;border-radius:6px;background:#92400e;color:#fff;font-size:10px;cursor:pointer;font-family:inherit">${tr('os_salvar_alteracoes')}</button>
        </div>
        <textarea id="os-servico-${id}" oninput="document.getElementById('servico-save-${id}').style.display='inline-block'" style="width:100%;min-height:20px;padding:0;border:none;background:transparent;font-size:13px;color:#78350f;font-family:inherit;outline:none;resize:vertical">${os.descricao||''}</textarea>
      </div>
    </div>
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <div style="font-size:13px;font-weight:600">${tr('os_notepad_label')}</div>
        <button id="notepad-save-${id}" onclick="salvarNotepad('${id}')" style="display:none;padding:5px 12px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:11px;cursor:pointer;font-family:inherit">${tr('os_notepad_salvar')}</button>
      </div>
      <div id="notepad-form-${id}">
        <textarea id="os-notepad-${id}" placeholder="${tr('os_notepad_ph')}" oninput="document.getElementById('notepad-save-${id}').style.display='inline-block'" style="width:100%;min-height:60px;padding:9px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none;resize:vertical;background:#fffdf7">${os.notepad||''}</textarea>
        <div style="display:flex;gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap">
          <button id="notepad-mic-${id}" onclick="toggleGravacaoNotepad('${id}')" title="${tr('nota_gravar_title')}" style="padding:7px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;color:#555;font-size:14px;cursor:pointer;font-family:inherit">🎤</button>
          <button id="notepad-resumir-${id}" onclick="resumirNotepad('${id}')" style="padding:7px 14px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#333">${tr('os_notepad_resumir')}</button>
          <div id="notepad-rec-status-${id}" style="display:none;font-size:11px;color:#e74c3c"></div>
        </div>
      </div>
      <div id="notepad-previa-${id}" style="display:none;margin-top:8px"></div>
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:500;color:#444;margin-bottom:8px">${tr('os_status_label')}</div>
      <div id="status-pills-${id}" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
        ${Object.entries(S_LABEL).filter(([s]) => s !== 'concluida').map(([s,l]) => '<button data-status="'+s+'" onclick="selecionarStatusOS(\''+id+'\',\''+s+'\')" style="padding:5px 14px;border-radius:99px;border:1.5px solid '+(os.status===s?S_COLOR[s]:'#e8e8e5')+';background:'+(os.status===s?S_BG[s]:'#fff')+';color:'+(os.status===s?S_COLOR[s]:'#555')+';font-size:12px;font-weight:'+(os.status===s?'600':'400')+';cursor:pointer;font-family:inherit">'+l+'</button>').join('')}
      </div>
      <button id="status-save-${id}" onclick="salvarStatusOS('${id}')" style="display:none;padding:6px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">${tr('os_salvar_alteracoes')}</button>
    </div>
    </div>
    <div id="os-tab-dias-${id}" style="display:none">
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600">${tr('os_dias_label')} (${dias.length})</div>
        <button onclick="abrirNovoDiaTrabalho('${id}')" style="padding:5px 12px;border:1px dashed #d4d4d0;border-radius:7px;font-size:11px;cursor:pointer;color:#555;background:#fff">${tr('dia_adicionar_btn')}</button>
      </div>
      <div id="dias-${id}" style="display:flex;flex-direction:column;gap:8px">
        ${dias.length ? dias.map(d => diaTrabalhoCardHTML(d, id)).join('') : '<div style="color:#bbb;font-size:12px">'+tr('dia_sem_registro')+'</div>'}
      </div>
    </div>
    </div>
    <div id="os-tab-gastos-${id}" style="display:none">
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600">${tr('os_gastos_label')} (${gastos.length})</div>
        <button onclick="abrirNovoGasto('${id}')" style="padding:5px 12px;border:1px dashed #d4d4d0;border-radius:7px;font-size:11px;cursor:pointer;color:#555;background:#fff">${tr('gasto_lancar_btn')}</button>
      </div>
      <div id="gastos-${id}" style="display:flex;flex-direction:column;gap:8px">
        ${gastos.length ? gastos.map(g => gastoCardHTML(g, id)).join('') : '<div style="color:#bbb;font-size:12px">'+tr('gasto_sem_registro')+'</div>'}
      </div>
    </div>
    </div>
    <div id="os-tab-financeiro-${id}" style="display:none">
    <div style="margin-bottom:16px">
      <div style="font-size:13px;font-weight:600;margin-bottom:10px">${tr('resumo_valores_label')}</div>
      ${resumoValoresHTML(resumoValores, id, os)}
    </div>
    ${os.resumo_ia ? '<div style="margin-bottom:16px"><div style="font-size:13px;font-weight:600;margin-bottom:8px">'+tr('resumo_trabalho_label')+'</div><div style="background:#f9f9f7;border-radius:8px;padding:10px 12px;font-size:12px;white-space:pre-wrap">'+os.resumo_ia+'</div></div>' : ''}
    </div>
    <div id="os-tab-fotos-${id}" style="display:none">
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600">${tr('os_fotos_label')} (${fotos.length})</div>
        <label style="padding:5px 12px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;cursor:pointer;color:#555;background:#fff">
          ${tr('os_adicionar_foto')}
          <input type="file" accept="image/*" multiple style="display:none" onchange="uploadFotos(event,'${id}')">
        </label>
      </div>
      <div id="fotos-${id}" class="fotos-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${fotos.length ? fotos.map(f => { const src = fotoThumb(f); const priv = !!f.interna; const temMarca = Array.isArray(f.anotacoes) && f.anotacoes.length > 0; return '<div onclick="abrirFotoEditor(\''+f.id+'\',\''+id+'\')" style="position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;border:1px solid #e8e8e5;cursor:pointer' + (priv ? ';opacity:.55' : '') + '"><div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f5f5f3">'+(src?'<img src="'+src+'" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">':'<span style="font-size:28px">🖼️</span>')+'</div><button onclick="event.preventDefault();event.stopPropagation();toggleFotoInterna(\''+f.id+'\',\''+id+'\','+(!priv)+')" title="'+(priv?tr('foto_marcar_publica'):tr('foto_marcar_privada'))+'" style="position:absolute;top:4px;right:4px;width:30px;height:30px;border:none;border-radius:50%;background:rgba(255,255,255,.9);cursor:pointer;font-size:14px;line-height:1;display:flex;align-items:center;justify-content:center">'+(priv?'🔒':'👁')+'</button>'+'<button onclick="event.preventDefault();event.stopPropagation();excluirFotoOS(\''+f.id+'\',\''+id+'\',\''+(f.drive_url||'')+'\')" title="'+tr('foto_excluir_title')+'" style="position:absolute;bottom:4px;right:4px;width:30px;height:30px;border:none;border-radius:50%;background:rgba(255,255,255,.9);cursor:pointer;font-size:14px;line-height:1;display:flex;align-items:center;justify-content:center">🗑</button>'+(temMarca?'<span title="'+tr('foto_tem_marcacao')+'" style="position:absolute;top:4px;left:4px;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.9);font-size:12px;display:flex;align-items:center;justify-content:center">✏️</span>':'')+(priv?'<div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.55);color:#fff;font-size:9px;text-align:center;padding:2px 0">'+tr('foto_privada_badge')+'</div>':'')+'</div>'; }).join('') : '<div style="grid-column:span 3;text-align:center;padding:20px;color:#bbb;font-size:12px;border:1px dashed #e8e8e5;border-radius:8px">'+tr('os_sem_fotos')+'</div>'}
      </div>
      <div id="upload-prog" style="display:none;text-align:center;font-size:12px;color:#2563eb;margin-top:8px">${tr('os_enviando')}</div>
    </div>
    </div>
    <div id="os-tab-anotacoes-${id}" style="display:none">
    ${racksVinculados.length?'<div style="margin-bottom:16px"><div style="font-size:13px;font-weight:600;margin-bottom:8px">'+tr('rack_vinculado_label')+'</div>'+racksVinculados.map(r=>'<div onclick="abrirPreviewRackDaOS(\''+r.id+'\')" style="display:flex;align-items:center;justify-content:space-between;font-size:13px;padding:10px 12px;background:#f9f9f7;border-radius:8px;cursor:pointer;margin-bottom:6px"><span style="font-weight:600">'+r.nome+' — '+r.tamanho_u+'U</span><span style="font-size:11px;color:#888">'+tr('rack_ver_preview')+' →</span></div>').join('')+'</div>':''}
    ${plantasVinculadas.length?'<div style="margin-bottom:16px"><div style="font-size:13px;font-weight:600;margin-bottom:8px">'+tr('planta_vinculada_label')+'</div>'+plantasVinculadas.map(p=>'<div onclick="abrirPreviewPlantaDaOS(\''+p.id+'\')" style="display:flex;align-items:center;justify-content:space-between;font-size:13px;padding:10px 12px;background:#f9f9f7;border-radius:8px;cursor:pointer;margin-bottom:6px"><span style="font-weight:600">'+p.nome+'</span><span style="font-size:11px;color:#888">'+tr('rack_ver_preview')+' →</span></div>').join('')+'</div>':''}
    <div>
      <div style="font-size:13px;font-weight:600;margin-bottom:10px">${tr('os_anotacoes_label')} (${notas.length})</div>
      <div id="notas-${id}" style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
        ${notas.length ? notas.map(n => notaCardHTML(n, id)).join('') : '<div style="color:#bbb;font-size:12px">'+tr('os_sem_anotacoes')+'</div>'}
      </div>
      <div id="nota-previa-${id}" style="display:none"></div>
      <div id="nota-form-${id}" style="display:flex;gap:8px">
        <input id="nota-input-${id}" placeholder="${tr('os_add_nota_ph')}" style="flex:1;padding:8px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" onkeydown="if(event.key==='Enter')gerarResumoNota('${id}')">
        <button id="nota-mic-${id}" onclick="toggleGravacaoAudio('${id}')" title="${tr('nota_gravar_title')}" style="padding:8px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;color:#555;font-size:14px;cursor:pointer;font-family:inherit">🎤</button>
        <button id="nota-btn-${id}" onclick="gerarResumoNota('${id}')" style="padding:8px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">${tr('os_enviar')}</button>
      </div>
      <div id="nota-rec-status-${id}" style="display:none;font-size:11px;color:#e74c3c;margin-top:6px"></div>
    </div>
    </div>
    <div style="margin-top:16px;padding-top:14px;border-top:1px solid #e8e8e5">
      ${os.status === 'concluida'
        ? '<div style="background:#f0fdf4;border-radius:8px;padding:10px 14px;font-size:12px;color:#166534;display:flex;justify-content:space-between;align-items:center;gap:10px"><span style="font-weight:600">✓ ' + tr('os_finalizada_label') + '</span><button onclick="reabrirOS(\'' + id + '\')" style="background:none;border:none;cursor:pointer;color:#166534;font-size:12px;text-decoration:underline;padding:8px 4px">↩ ' + tr('os_reabrir_btn') + '</button></div>'
        : '<div style="background:#eff6ff;border-radius:8px;padding:12px 14px">'
          + '<div style="font-size:12px;font-weight:600;color:#1d4ed8;margin-bottom:2px">' + tr('os_finalizar_label') + '</div>'
          + '<div style="font-size:11px;color:#1d4ed8;margin-bottom:10px">' + tr('os_finalizar_desc') + '</div>'
          + '<button onclick="concluirOS(\'' + id + '\')" style="width:100%;padding:9px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit">✓ ' + tr('os_concluir_btn') + '</button>'
          + '</div>'}
      <div id="resumo-ia-status-${id}" style="display:none;font-size:11px;color:#2563eb;margin-top:8px"></div>
      <div id="resumo-ia-preview-${id}" style="display:none;margin-top:8px"></div>
    </div>
    <div style="margin-top:14px;padding-top:14px;border-top:1px solid #e8e8e5;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
      ${os.drive_folder_url?'<a href="'+os.drive_folder_url+'" target="_blank" style="font-size:12px;color:#2563eb;text-decoration:none">'+tr('os_abrir_drive')+'</a>':'<span></span>'}
      <button id="pdf-btn-${id}" onclick="gerarResumoPDF('${id}')" style="padding:7px 14px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#333">${tr('os_gerar_pdf')}</button>
    </div>
  </div>`;
  mudarAbaOS(id, osAbaAtual[id] || 'geral');
  content.scrollTop = scrollAnterior;
  if (!silencioso) iniciarPollingOS(id);
}

function calcularResumoValores(dias, gastos, tecnicosLista) {
  const valorHoraPorNome = {};
  (tecnicosLista || []).forEach(t => { valorHoraPorNome[t.nome] = t.valor_hora != null ? Number(t.valor_hora) : null; });

  function horasDoDia(d) {
    if (!d.hora_inicio || !d.hora_fim) return 0;
    const [h1, m1] = String(d.hora_inicio).slice(0,5).split(':').map(Number);
    const [h2, m2] = String(d.hora_fim).slice(0,5).split(':').map(Number);
    let min = (h2*60+m2) - (h1*60+m1);
    if (min < 0) min += 24*60;
    return min / 60;
  }

  const porTecnico = {};
  (dias || []).forEach(d => {
    if (d.executado === false) return;
    const horas = horasDoDia(d);
    (Array.isArray(d.tecnicos) ? d.tecnicos : []).forEach(nome => {
      if (!porTecnico[nome]) porTecnico[nome] = { nome, horas: 0, valorHora: valorHoraPorNome[nome] != null ? valorHoraPorNome[nome] : null, subtotal: 0 };
      porTecnico[nome].horas += horas;
      if (porTecnico[nome].valorHora != null) porTecnico[nome].subtotal += horas * porTecnico[nome].valorHora;
    });
  });

  const listaTecnicos = Object.values(porTecnico);
  const totalMaoObra = listaTecnicos.reduce((s, t) => s + t.subtotal, 0);
  const gastosAprovados = (gastos || []).filter(g => g.status === 'aprovado');
  const totalGastos = gastosAprovados.reduce((s, g) => s + Number(g.valor||0), 0);

  return {
    porTecnico: listaTecnicos,
    totalMaoObra,
    totalGastos,
    totalGeral: totalMaoObra + totalGastos,
    qtdGastosPendentes: (gastos || []).filter(g => g.status === 'pendente').length,
    qtdDiasAgendados: (dias || []).filter(d => d.executado === false).length
  };
}

function resumoValoresHTML(r, id, os) {
  const linhasTec = r.porTecnico.length
    ? r.porTecnico.map(t => '<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0">'
        + '<span>' + tr('resumo_mao_obra') + ' — ' + t.nome + ' (' + t.horas.toFixed(1) + 'h' + (t.valorHora != null ? ' × $' + t.valorHora.toFixed(2) : ' · ' + tr('resumo_sem_valor_hora')) + ')</span>'
        + '<span>' + (t.valorHora != null ? '$' + t.subtotal.toFixed(2) : '—') + '</span></div>').join('')
    : '<div style="font-size:12px;color:#bbb">' + tr('resumo_sem_dias') + '</div>';

  const orcado = os && os.valor_orcado != null ? Number(os.valor_orcado) : null;
  const margem = orcado != null ? (orcado - r.totalGeral) : null;
  const margemPct = (orcado != null && orcado > 0) ? (margem / orcado * 100) : null;
  const corMargem = margem != null ? (margem >= 0 ? '#166534' : '#991b1b') : '#888';
  const bgMargem = margem != null ? (margem >= 0 ? '#f0fdf4' : '#fef2f2') : '#f5f5f3';
  const cobranca = (os && os.status_cobranca) || 'a_cobrar';

  const avisoAgendados = r.qtdDiasAgendados
    ? '<div style="font-size:11px;color:#92400e;background:#fffbeb;border-radius:6px;padding:6px 9px;margin-bottom:8px">⚠ ' + r.qtdDiasAgendados + ' ' + tr('resumo_dias_agendados_aviso') + '</div>'
    : '';

  return '<div style="background:#f9f9f7;border-radius:8px;padding:12px 14px">'
    + avisoAgendados
    + linhasTec
    + '<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0">'
      + '<span>' + tr('os_gastos_label') + (r.qtdGastosPendentes ? ' <span style="color:#92400e">(' + r.qtdGastosPendentes + ' ' + tr('resumo_pendentes') + ')</span>' : '') + '</span>'
      + '<span>$' + r.totalGastos.toFixed(2) + '</span></div>'
    + '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;padding-top:8px;margin-top:6px;border-top:1px solid #e8e8e5">'
      + '<span>' + (orcado != null ? tr('resumo_custo_real') : tr('resumo_total')) + '</span><span>$' + r.totalGeral.toFixed(2) + '</span></div>'
    + '</div>'
    + '<div style="margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">'
      + '<label style="font-size:11px;color:#888">' + tr('label_valor_orcado') + '</label>'
      + '<input type="number" step="0.01" id="resumo-orcado-' + id + '" value="' + (orcado != null ? orcado : '') + '" placeholder="0.00" oninput="document.getElementById(\'resumo-orcado-save-' + id + '\').style.display=\'inline-block\'" style="width:110px;padding:5px 8px;border:1px solid #e8e8e5;border-radius:6px;font-size:12px;font-family:inherit">'
      + '<button id="resumo-orcado-save-' + id + '" onclick="salvarValorOrcadoOS(\''+id+'\')" style="display:none;padding:5px 10px;border:none;border-radius:6px;background:#1a1a1a;color:#fff;font-size:11px;cursor:pointer">' + tr('os_salvar_alteracoes') + '</button>'
    + '</div>'
    + (orcado != null
        ? '<div style="background:' + bgMargem + ';border-radius:8px;padding:10px 12px;margin-top:8px;display:flex;justify-content:space-between;align-items:center">'
          + '<span style="font-size:12px;font-weight:600;color:' + corMargem + '">' + tr('resumo_margem') + '</span>'
          + '<span style="font-size:14px;font-weight:700;color:' + corMargem + '">$' + margem.toFixed(2) + (margemPct != null ? ' (' + margemPct.toFixed(0) + '%)' : '') + '</span>'
          + '</div>'
        : '')
    + '<div style="margin-top:10px;display:flex;align-items:center;gap:6px">'
      + '<span style="font-size:11px;color:#888">' + tr('resumo_cobranca_label') + '</span>'
      + '<button onclick="alterarStatusCobranca(\''+id+'\',\'a_cobrar\')" style="font-size:11px;padding:4px 10px;border-radius:99px;border:1px solid ' + (cobranca==='a_cobrar'?'#92400e':'#e8e8e5') + ';background:' + (cobranca==='a_cobrar'?'#fffbeb':'#fff') + ';color:' + (cobranca==='a_cobrar'?'#92400e':'#555') + ';cursor:pointer;font-weight:' + (cobranca==='a_cobrar'?'600':'400') + '">' + tr('resumo_a_cobrar') + '</button>'
      + '<button onclick="alterarStatusCobranca(\''+id+'\',\'sem_custo\')" style="font-size:11px;padding:4px 10px;border-radius:99px;border:1px solid ' + (cobranca==='sem_custo'?'#1e40af':'#e8e8e5') + ';background:' + (cobranca==='sem_custo'?'#eff6ff':'#fff') + ';color:' + (cobranca==='sem_custo'?'#1e40af':'#555') + ';cursor:pointer;font-weight:' + (cobranca==='sem_custo'?'600':'400') + '">' + tr('resumo_sem_custo') + '</button>'
      + '<button onclick="alterarStatusCobranca(\''+id+'\',\'cobrado\')" style="font-size:11px;padding:4px 10px;border-radius:99px;border:1px solid ' + (cobranca==='cobrado'?'#166534':'#e8e8e5') + ';background:' + (cobranca==='cobrado'?'#f0fdf4':'#fff') + ';color:' + (cobranca==='cobrado'?'#166534':'#555') + ';cursor:pointer;font-weight:' + (cobranca==='cobrado'?'600':'400') + '">' + tr('resumo_cobrado') + '</button>'
    + '</div>'
    ;
}

async function salvarValorOrcadoOS(osId) {
  const el = document.getElementById('resumo-orcado-' + osId);
  const valor = el?.value ? parseFloat(el.value) : null;
  try {
    await sbPatch('ordens_servico?id=eq.' + osId, { valor_orcado: valor });
    const os = osData.find(o => o.id === osId);
    if (os) os.valor_orcado = valor;
    toast(tr('resumo_orcado_salvo'), 'ok');
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function alterarStatusCobranca(osId, status) {
  try {
    await sbPatch('ordens_servico?id=eq.' + osId, { status_cobranca: status });
    const os = osData.find(o => o.id === osId);
    if (os) os.status_cobranca = status;
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function diaTrabalhoCardHTML(d, osId) {
  const horaTxt = d.hora_inicio ? String(d.hora_inicio).slice(0,5) + (d.hora_fim ? ' - ' + String(d.hora_fim).slice(0,5) : '') : '';
  const tecs = Array.isArray(d.tecnicos) ? d.tecnicos.join(', ') : '';
  const agendado = d.executado === false;
  return '<div style="background:' + (agendado ? '#fffbeb' : '#f9f9f7') + ';border-radius:8px;padding:10px 12px">'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px">'
    + '<div style="font-size:12px;font-weight:600">' + (d.data||'') + (horaTxt ? ' · ' + horaTxt : '') + '</div>'
    + '<span style="display:flex;gap:8px;flex-shrink:0;align-items:center">'
    + (agendado ? '<span style="font-size:9px;padding:2px 7px;border-radius:99px;background:#fef3c7;color:#92400e">' + tr('dia_status_agendado') + '</span>' : '')
    + '<button onclick="abrirEditarDiaTrabalho(\'' + d.id + '\',\'' + osId + '\')" style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;padding:8px;line-height:1">✎</button>'
    + '<button onclick="excluirDiaTrabalho(\'' + d.id + '\',\'' + osId + '\')" style="background:none;border:none;cursor:pointer;color:#888;font-size:19px;padding:8px;line-height:1">×</button>'
    + '</span></div>'
    + (tecs ? '<div style="font-size:11px;color:#888;margin-top:2px">' + tecs + '</div>' : '')
    + (d.observacao ? '<div style="font-size:11px;color:#555;margin-top:4px">' + d.observacao + '</div>' : '')
    + (agendado ? '<button onclick="marcarDiaExecutado(\'' + d.id + '\',\'' + osId + '\')" style="margin-top:8px;font-size:11px;padding:4px 10px;border:1px solid #fde68a;border-radius:6px;background:#fff;color:#92400e;cursor:pointer">✓ ' + tr('dia_marcar_executado') + '</button>' : '')
    + '</div>';
}

async function marcarDiaExecutado(diaId, osId) {
  try {
    await sbPatch('os_dias?id=eq.' + diaId, { executado: true });
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

let ndTecnicosSelecionados = [];
let ndDiaEditandoId = null;

async function abrirNovoDiaTrabalho(osId) {
  ndDiaEditandoId = null;
  document.getElementById('nd-modal-title').textContent = tr('dia_novo_title');
  document.getElementById('nd-modal-btn').textContent = tr('btn_criar_dia');
  document.getElementById('nd-os-id').value = osId;
  document.getElementById('nd-dia-id').value = '';
  document.getElementById('nd-data').value = new Date().toISOString().slice(0,10);
  document.getElementById('nd-hora-inicio').value = '';
  document.getElementById('nd-hora-fim').value = '';
  document.getElementById('nd-observacao').value = '';
  document.getElementById('nd-executado').checked = true;
  ndTecnicosSelecionados = [];
  await garantirTecnicosAtivosCache();
  renderNdTecnicosChips();
  abrirModal('m-dia-trabalho');
}

async function abrirEditarDiaTrabalho(diaId, osId) {
  try {
    const rows = await sbGet('os_dias?id=eq.' + diaId);
    const d = rows[0];
    if (!d) return;
    ndDiaEditandoId = diaId;
    document.getElementById('nd-modal-title').textContent = tr('dia_editar_title');
    document.getElementById('nd-modal-btn').textContent = tr('btn_salvar');
    document.getElementById('nd-os-id').value = osId;
    document.getElementById('nd-dia-id').value = diaId;
    document.getElementById('nd-data').value = d.data || '';
    document.getElementById('nd-hora-inicio').value = d.hora_inicio ? String(d.hora_inicio).slice(0,5) : '';
    document.getElementById('nd-hora-fim').value = d.hora_fim ? String(d.hora_fim).slice(0,5) : '';
    document.getElementById('nd-observacao').value = d.observacao || '';
    document.getElementById('nd-executado').checked = d.executado !== false;
    ndTecnicosSelecionados = Array.isArray(d.tecnicos) ? d.tecnicos.slice() : [];
    await garantirTecnicosAtivosCache();
    renderNdTecnicosChips();
    abrirModal('m-dia-trabalho');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function renderNdTecnicosChips() {
  const el = document.getElementById('nd-tecnicos-chips');
  if (!el) return;
  el.innerHTML = tecnicosAtivosCache.map(t => chipTecnicoHTML(t.nome, t.nome, ndTecnicosSelecionados.includes(t.nome), 'toggleNdTecnico')).join('');
}

function toggleNdTecnico(nome) {
  ndTecnicosSelecionados = ndTecnicosSelecionados.includes(nome) ? ndTecnicosSelecionados.filter(n => n !== nome) : [...ndTecnicosSelecionados, nome];
  renderNdTecnicosChips();
}

async function salvarDiaTrabalho() {
  const osId = document.getElementById('nd-os-id').value;
  const data = document.getElementById('nd-data').value;
  if (!data) { toast(tr('dia_data_obrigatoria'), 'err'); return; }
  const hora_inicio = document.getElementById('nd-hora-inicio').value || null;
  const hora_fim = document.getElementById('nd-hora-fim').value || null;
  const observacao = document.getElementById('nd-observacao').value.trim();
  const tecnicos = ndTecnicosSelecionados.slice();
  const executado = document.getElementById('nd-executado')?.checked !== false;
  try {
    if (ndDiaEditandoId) {
      await sbPatch('os_dias?id=eq.' + ndDiaEditandoId, { data, hora_inicio, hora_fim, observacao, tecnicos, executado });
    } else {
      await sbPost('os_dias', { os_id: osId, data, hora_inicio, hora_fim, observacao, tecnicos, executado });
    }
    fecharModal('m-dia-trabalho');
    toast(tr('dia_salvo'), 'ok');
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirDiaTrabalho(diaId, osId) {
  if (!confirm(tr('dia_excluir_confirm'))) return;
  try {
    await sbDelete('os_dias?id=eq.' + diaId);
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function gerarResumoTrabalhoOS(osId) {
  let dias = [];
  try { dias = await sbGet('os_dias?os_id=eq.' + osId + '&order=data.asc'); } catch(e) {}
  const comObservacao = dias.filter(d => (d.observacao || '').trim());
  if (!comObservacao.length) { toast(tr('resumo_sem_observacoes'), 'err'); return; }

  const texto = comObservacao.map(d => {
    const tecs = Array.isArray(d.tecnicos) && d.tecnicos.length ? ' (' + d.tecnicos.join(', ') + ')' : '';
    return 'Dia ' + d.data + tecs + ': ' + d.observacao.trim();
  }).join('\n');

  const statusEl = document.getElementById('resumo-ia-status-' + osId);
  if (statusEl) statusEl.style.display = 'none';
  mostrarPreviaResumoOS(osId, texto);
}

function mostrarPreviaResumoOS(osId, resumo) {
  const el = document.getElementById('resumo-ia-preview-' + osId);
  if (!el) return;
  el.style.display = 'block';
  el.innerHTML = `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 12px">
      <div style="font-size:10px;color:#166534;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;font-weight:600">${tr('os_resumo_ia')}</div>
      <div id="resumo-trabalho-texto-${osId}" contenteditable="false" style="font-size:12px;background:#fff;border:1.5px solid #e8e8e5;border-radius:7px;padding:9px 11px;margin-bottom:8px;outline:none;white-space:pre-wrap">${resumo}</div>
      <div style="display:flex;gap:8px">
        <button onclick="toggleEditarResumoOS('${osId}')" id="resumo-trabalho-edit-btn-${osId}" style="padding:6px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:11px;cursor:pointer">${tr('os_editar_nota')}</button>
        <button onclick="cancelarResumoOS('${osId}')" style="padding:6px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:11px;cursor:pointer">${tr('btn_cancelar')}</button>
        <button onclick="confirmarResumoOS('${osId}')" style="padding:6px 12px;border:none;border-radius:7px;background:#166534;color:#fff;font-size:11px;cursor:pointer">${tr('os_confirmar')}</button>
      </div>
    </div>`;
}

function toggleEditarResumoOS(osId) {
  const el = document.getElementById('resumo-trabalho-texto-' + osId);
  const btn = document.getElementById('resumo-trabalho-edit-btn-' + osId);
  if (!el) return;
  const editando = el.getAttribute('contenteditable') === 'true';
  el.setAttribute('contenteditable', editando ? 'false' : 'true');
  el.style.borderColor = editando ? '#e8e8e5' : '#166534';
  if (btn) btn.textContent = editando ? tr('os_editar_nota') : tr('os_concluir_edicao');
  if (!editando) el.focus();
}

function cancelarResumoOS(osId) {
  const el = document.getElementById('resumo-ia-preview-' + osId);
  if (el) { el.style.display = 'none'; el.innerHTML = ''; }
  delete concluirAposResumo[osId];
}

async function confirmarResumoOS(osId) {
  const el = document.getElementById('resumo-trabalho-texto-' + osId);
  const texto = el?.innerText.trim();
  if (!texto) return;
  try {
    await sbPatch('ordens_servico?id=eq.' + osId, { resumo_ia: texto });
    const os = osData.find(o => o.id === osId);
    if (os) os.resumo_ia = texto;
    const el2 = document.getElementById('resumo-ia-preview-' + osId);
    if (el2) { el2.style.display = 'none'; el2.innerHTML = ''; }
    toast(tr('resumo_salvo'), 'ok');
    if (concluirAposResumo[osId]) {
      delete concluirAposResumo[osId];
      await finalizarStatusConcluido(osId);
    } else {
      abrirOS(osId);
    }
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

let concluirAposResumo = {};

async function concluirOS(osId) {
  let dias = [];
  try { dias = await sbGet('os_dias?os_id=eq.' + osId + '&order=data.asc'); } catch(e) {}
  const comObservacao = dias.filter(d => (d.observacao || '').trim());
  if (comObservacao.length) {
    concluirAposResumo[osId] = true;
    await gerarResumoTrabalhoOS(osId);
  } else {
    if (!confirm(tr('os_concluir_sem_resumo_confirm'))) return;
    await finalizarStatusConcluido(osId);
  }
}

async function finalizarStatusConcluido(osId) {
  try {
    const agora = new Date().toISOString();
    await sbPatch('ordens_servico?id=eq.' + osId, { status: 'concluida', concluida_em: agora });
    try { await sbPatch('tarefas?os_gerada_id=eq.' + osId, { status: 'concluida' }); } catch(e2) {}
    const os = osData.find(o => o.id === osId);
    if (os) { os.status = 'concluida'; os.concluida_em = agora; }
    toast(tr('os_concluida_sucesso'), 'ok');
    setTimeout(() => carregarOS && carregarOS(), 500);
    // Pergunta se quer criar tarefa de orçamento
    mostrarModalTarefaOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function mostrarModalTarefaOS(osId) {
  const os = osData.find(o => o.id === osId);
  if (!os) return;
  const clienteNome = os.cliente_nome || os.cliente || '';
  const descDefault = 'Orçamento pendente — ' + clienteNome + ' (OS #' + (os.numero||osId.substring(0,6)) + ')';
  
  // Remove modal anterior se existir
  const existing = document.getElementById('modal-tarefa-os');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'modal-tarefa-os';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:2000;display:flex;align-items:center;justify-content:center';
  modal.innerHTML = `
    <div style="background:#fff;border-radius:12px;padding:24px;width:480px;max-width:95vw;box-shadow:0 8px 40px rgba(0,0,0,.15)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <div style="font-size:16px;font-weight:700">OS #${os.numero||''} concluída! 🎉</div>
        <button onclick="document.getElementById('modal-tarefa-os').remove();abrirOS('${osId}')" style="background:none;border:none;cursor:pointer;font-size:20px;color:#bbb">×</button>
      </div>
      <div style="font-size:12px;color:#888;margin-bottom:16px">${os.titulo||''} · ${clienteNome}</div>

      <div id="tarefa-opt" style="display:flex;align-items:center;gap:10px;padding:12px;border:1.5px solid #2563eb;background:#eff6ff;border-radius:8px;cursor:pointer;margin-bottom:10px" onclick="toggleTarefaOpt()">
        <span style="font-size:20px">📋</span>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:#1e40af">Criar tarefa de orçamento</div>
          <div style="font-size:11px;color:#3b82f6">Adiciona automaticamente no Kanban de Tarefas</div>
        </div>
        <div id="tarefa-check" style="width:18px;height:18px;border-radius:4px;background:#2563eb;border:1.5px solid #2563eb;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700">✓</div>
      </div>

      <div id="tarefa-form">
        <div style="background:#f9f9f7;border-radius:8px;padding:12px">
          <div style="font-size:11px;font-weight:500;color:#444;margin-bottom:4px">Descrição da tarefa</div>
          <input id="tarefa-desc-input" value="${descDefault}" style="width:100%;padding:7px 10px;border:1.5px solid #e8e8e5;border-radius:6px;font-size:12px;font-family:inherit;outline:none;margin-bottom:8px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div>
              <div style="font-size:11px;font-weight:500;color:#444;margin-bottom:4px">Responsável</div>
              <input id="tarefa-resp-input" value="${ME?.nome||''}" style="width:100%;padding:7px 10px;border:1.5px solid #e8e8e5;border-radius:6px;font-size:12px;font-family:inherit;outline:none">
            </div>
            <div>
              <div style="font-size:11px;font-weight:500;color:#444;margin-bottom:4px">Prazo (opcional)</div>
              <input id="tarefa-prazo-input" type="date" style="width:100%;padding:7px 10px;border:1.5px solid #e8e8e5;border-radius:6px;font-size:12px;font-family:inherit;outline:none">
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">
        <button onclick="document.getElementById('modal-tarefa-os').remove();abrirOS('${osId}')" style="padding:8px 16px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit">Não, só concluir</button>
        <button onclick="criarTarefaDeOS('${osId}')" style="padding:8px 16px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit">Concluir e criar tarefa</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function toggleTarefaOpt() {
  const opt = document.getElementById('tarefa-opt');
  const check = document.getElementById('tarefa-check');
  const form = document.getElementById('tarefa-form');
  const isOn = check.style.background === 'rgb(37, 99, 235)' || check.style.background === '#2563eb';
  if (isOn) {
    check.style.background = '#fff'; check.style.borderColor = '#e8e8e5'; check.textContent = '';
    opt.style.borderColor = '#e8e8e5'; opt.style.background = '#fff';
    form.style.display = 'none';
  } else {
    check.style.background = '#2563eb'; check.style.borderColor = '#2563eb'; check.textContent = '✓';
    opt.style.borderColor = '#2563eb'; opt.style.background = '#eff6ff';
    form.style.display = 'block';
  }
}

async function criarTarefaDeOS(osId) {
  const os = osData.find(o => o.id === osId);
  const desc = document.getElementById('tarefa-desc-input')?.value.trim();
  const resp = document.getElementById('tarefa-resp-input')?.value.trim();
  const prazo = document.getElementById('tarefa-prazo-input')?.value;
  const criarTarefa = document.getElementById('tarefa-check')?.textContent === '✓';

  document.getElementById('modal-tarefa-os').remove();

  if (criarTarefa && desc) {
    try {
      await sbPost('tarefas', {
        titulo: desc,
        descricao: 'Gerada automaticamente ao concluir OS #' + (os?.numero||osId.substring(0,6)),
        cliente_nome: os?.cliente_nome || os?.cliente || '',
        responsavel: resp || ME?.nome || '',
        prazo: prazo || null,
        status: 'pendente',
        prioridade: 'media',
        origem: 'os_concluida',
        os_gerada_id: osId
      });
      toast('Tarefa criada no Kanban! 📋', 'ok');
    } catch(e) {
      toast('OS concluída, mas erro ao criar tarefa: ' + e.message, 'err');
    }
  }
  abrirOS(osId);
}

async function reabrirOS(osId) {
  if (!confirm(tr('os_reabrir_confirm'))) return;
  try {
    await sbPatch('ordens_servico?id=eq.' + osId, { status: 'em_campo', concluida_em: null });
    try { await sbPatch('tarefas?os_gerada_id=eq.' + osId, { status: 'pendente' }); } catch(e2) {}
    const os = osData.find(o => o.id === osId);
    if (os) { os.status = 'em_campo'; os.concluida_em = null; }
    toast(tr('os_reaberta_sucesso'), 'ok');
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function reabrirOSDoEdit() {
  const id = document.getElementById('edit-os-id').value;
  fecharModal('m-edit-os');
  await reabrirOS(id);
}

// ── Gravação por voz da observação do dia de trabalho (transcreve e acrescenta) ──
async function toggleGravacaoDia() {
  const chave = 'nd-obs';
  const ativa = gravacoesAtivas[chave];
  if (ativa) { ativa.recorder.stop(); return; }

  if (!navigator.mediaDevices || !window.MediaRecorder) { toast(tr('nota_erro_microfone'), 'err'); return; }

  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch(e) { toast(tr('nota_erro_microfone'), 'err'); return; }

  const candidatos = ['audio/webm', 'audio/mp4', 'audio/ogg'];
  const mime = candidatos.find(m => window.MediaRecorder.isTypeSupported && window.MediaRecorder.isTypeSupported(m)) || '';
  const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
  const chunks = [];
  recorder.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };

  const micBtn = document.getElementById('nd-mic');
  const statusEl = document.getElementById('nd-rec-status');
  const inicioEm = Date.now();
  let timerId = null;

  function atualizarTimer() {
    if (!statusEl) return;
    const seg = Math.floor((Date.now() - inicioEm) / 1000);
    const m = String(Math.floor(seg / 60)).padStart(2, '0');
    const s = String(seg % 60).padStart(2, '0');
    statusEl.textContent = '● ' + tr('nota_gravando') + ' (' + m + ':' + s + ')';
  }

  recorder.onstop = async () => {
    clearInterval(timerId);
    stream.getTracks().forEach(t => t.stop());
    delete gravacoesAtivas[chave];
    if (micBtn) { micBtn.textContent = '🎤'; micBtn.style.background = '#fff'; micBtn.style.color = '#555'; }
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#2563eb'; statusEl.textContent = tr('nota_transcrevendo'); }

    const blob = new Blob(chunks, { type: mime || 'audio/webm' });
    if (!blob.size) { if (statusEl) statusEl.style.display = 'none'; return; }

    try {
      const audio_base64 = await blobParaBase64(blob);
      const r = await fetch(SB_URL + '/functions/v1/bright-processor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
        body: JSON.stringify({ audio_base64, mime_type: blob.type, idioma: LANG })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erro');
      const texto = (d.texto || '').trim();
      if (statusEl) statusEl.style.display = 'none';
      if (!texto) { toast(tr('nota_audio_vazio'), 'err'); return; }

      const ta = document.getElementById('nd-observacao');
      if (ta) {
        ta.value = ta.value.trim() ? (ta.value.replace(/\s+$/, '') + '\n' + texto) : texto;
      }
    } catch(e) {
      if (statusEl) statusEl.style.display = 'none';
      console.error('transcrever-audio (dia) falhou:', e);
      toast(tr('nota_erro_transcricao') + ': ' + e.message, 'err');
    }
  };

  recorder.start();
  gravacoesAtivas[chave] = { recorder };
  if (micBtn) { micBtn.textContent = '⏹'; micBtn.style.background = '#e74c3c'; micBtn.style.color = '#fff'; }
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; }
  atualizarTimer();
  timerId = setInterval(atualizarTimer, 1000);
}

// ── GASTOS (despesas por OS) ──────────────────────────────────
const GASTO_STATUS_COR = {
  pendente: { c: '#92400e', bg: '#fffbeb' },
  aprovado: { c: '#166534', bg: '#f0fdf4' },
  rejeitado: { c: '#991b1b', bg: '#fef2f2' }
};

function gastoCardHTML(g, osId) {
  const sc = GASTO_STATUS_COR[g.status] || GASTO_STATUS_COR.pendente;
  const podeAprovar = ME && ME.funcao === 'Gestor' && g.status === 'pendente';
  return '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px">'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px">'
    + '<div>'
    + '<div style="font-size:12px;font-weight:600">' + (g.descricao || tr('gasto_sem_descricao')) + '</div>'
    + '<div style="font-size:11px;color:#888">' + [g.fornecedor, g.data].filter(Boolean).join(' · ') + '</div>'
    + '</div>'
    + '<div style="text-align:right;flex-shrink:0">'
    + '<div style="font-size:13px;font-weight:700">$' + Number(g.valor||0).toFixed(2) + '</div>'
    + '<span style="font-size:9px;padding:2px 7px;border-radius:99px;background:' + sc.bg + ';color:' + sc.c + '">' + tr('gasto_status_' + g.status) + '</span>'
    + '</div></div>'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;flex-wrap:wrap;gap:6px">'
    + '<span style="font-size:10px;color:#888">' + tr('cat_' + (g.categoria||'outro')) + (g.foto_drive_url ? ' · <a href="'+g.foto_drive_url+'" target="_blank" style="color:#2563eb;text-decoration:none">'+tr('gasto_ver_comprovante')+'</a>' : '') + '</span>'
    + '<span style="display:flex;gap:8px;align-items:center">'
    + (podeAprovar ? '<button onclick="aprovarGasto(\''+g.id+'\',\''+osId+'\')" style="font-size:10px;padding:2px 8px;border:1px solid #bbf7d0;border-radius:6px;background:#fff;color:#166534;cursor:pointer">'+tr('gasto_aprovar')+'</button><button onclick="rejeitarGasto(\''+g.id+'\',\''+osId+'\')" style="font-size:10px;padding:2px 8px;border:1px solid #fecaca;border-radius:6px;background:#fff;color:#dc2626;cursor:pointer">'+tr('gasto_rejeitar')+'</button>' : '')
    + '<button onclick="abrirEditarGasto(\''+g.id+'\',\''+osId+'\')" style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;padding:8px;line-height:1">✎</button>'
    + '<button onclick="excluirGasto(\''+g.id+'\',\''+osId+'\')" style="background:none;border:none;cursor:pointer;color:#888;font-size:19px;padding:8px;line-height:1">×</button>'
    + '</span></div>'
    + '</div>';
}

let ngFotoFile = null;

async function abrirNovoGasto(osId) {
  document.getElementById('ng-modal-title').textContent = tr('gasto_novo_title');
  document.getElementById('ng-modal-btn').textContent = tr('btn_lancar_gasto');
  document.getElementById('ng-os-id').value = osId;
  document.getElementById('ng-gasto-id').value = '';
  document.getElementById('ng-foto-drive-id').value = '';
  document.getElementById('ng-foto-drive-url').value = '';
  document.getElementById('ng-fornecedor').value = '';
  document.getElementById('ng-descricao').value = '';
  document.getElementById('ng-categoria').value = 'outro';
  document.getElementById('ng-data').value = new Date().toISOString().slice(0,10);
  document.getElementById('ng-qtd').value = 1;
  document.getElementById('ng-valor-unit').value = '';
  document.getElementById('ng-valor').value = '';
  document.getElementById('ng-foto-nome').textContent = '';
  document.getElementById('ng-ia-status').style.display = 'none';
  const btnIA0 = document.getElementById('ng-preencher-ia-btn');
  if (btnIA0) { btnIA0.disabled = true; btnIA0.style.color = '#999'; btnIA0.style.background = '#f5f5f3'; }
  ngFotoFile = null;
  await renderNgDiaOptions(osId, null);
  abrirModal('m-gasto');
}

async function renderNgDiaOptions(osId, selecionado) {
  const sel = document.getElementById('ng-dia');
  if (!sel) return;
  let dias = [];
  try { dias = await sbGet('os_dias?os_id=eq.' + osId + '&order=data.asc'); } catch(e) {}
  sel.innerHTML = '<option value="">' + tr('gasto_sem_dia_vinculado') + '</option>'
    + dias.map(d => '<option value="' + d.id + '"' + (selecionado === d.id ? ' selected' : '') + '>' + d.data + (Array.isArray(d.tecnicos) && d.tecnicos.length ? ' · ' + d.tecnicos.join(', ') : '') + '</option>').join('');
}

async function abrirEditarGasto(gastoId, osId) {
  try {
    const rows = await sbGet('os_gastos?id=eq.' + gastoId);
    const g = rows[0];
    if (!g) return;
    document.getElementById('ng-modal-title').textContent = tr('gasto_editar_title');
    document.getElementById('ng-modal-btn').textContent = tr('btn_salvar');
    document.getElementById('ng-os-id').value = osId;
    document.getElementById('ng-gasto-id').value = gastoId;
    document.getElementById('ng-foto-drive-id').value = g.foto_drive_id || '';
    document.getElementById('ng-foto-drive-url').value = g.foto_drive_url || '';
    document.getElementById('ng-fornecedor').value = g.fornecedor || '';
    document.getElementById('ng-descricao').value = g.descricao || '';
    document.getElementById('ng-categoria').value = g.categoria || 'outro';
    document.getElementById('ng-data').value = g.data || '';
    document.getElementById('ng-qtd').value = g.quantidade != null ? g.quantidade : 1;
    document.getElementById('ng-valor-unit').value = g.valor_unitario != null ? g.valor_unitario : '';
    document.getElementById('ng-valor').value = g.valor != null ? g.valor : '';
    document.getElementById('ng-foto-nome').textContent = g.foto_drive_url ? tr('gasto_foto_ja_anexada') : '';
    document.getElementById('ng-ia-status').style.display = 'none';
    const btnIA1 = document.getElementById('ng-preencher-ia-btn');
    if (btnIA1) { btnIA1.disabled = true; btnIA1.style.color = '#999'; btnIA1.style.background = '#f5f5f3'; }
    ngFotoFile = null;
    await renderNgDiaOptions(osId, g.os_dia_id);
    abrirModal('m-gasto');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function calcularValorGasto() {
  const qtd = parseFloat(document.getElementById('ng-qtd')?.value) || 0;
  const unit = parseFloat(document.getElementById('ng-valor-unit')?.value) || 0;
  if (qtd && unit) document.getElementById('ng-valor').value = (qtd * unit).toFixed(2);
}

function selecionarFotoGasto(event) {
  const file = event.target.files[0];
  if (!file) return;
  ngFotoFile = file;
  document.getElementById('ng-foto-nome').textContent = file.name;
  const btnIA = document.getElementById('ng-preencher-ia-btn');
  if (btnIA) { btnIA.disabled = false; btnIA.style.color = '#333'; btnIA.style.background = '#fff'; }
}

async function preencherGastoComIA() {
  if (!ngFotoFile) return;
  const btn = document.getElementById('ng-preencher-ia-btn');
  const statusEl = document.getElementById('ng-ia-status');
  if (btn) { btn.disabled = true; }
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#555'; statusEl.textContent = tr('gasto_ia_lendo'); }
  try {
    // Garante que o token ainda é válido antes de chamar a Edge Function
    // (esta chamada não passa por sbGet/sbPost, então precisa renovar sozinha)
    await garantirSessao();
    const imagem_base64 = await blobParaBase64(ngFotoFile);
    const r = await fetch(SB_URL + '/functions/v1/extrair-gasto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ imagem_base64, mime_type: ngFotoFile.type || 'image/jpeg' })
    });
    const d = await r.json();
    console.log('[extrair-gasto] resposta da IA:', d);
    if (!r.ok) throw new Error(d.error || 'Erro');
    if (d.fornecedor) document.getElementById('ng-fornecedor').value = d.fornecedor;
    if (d.descricao) document.getElementById('ng-descricao').value = d.descricao;
    if (d.categoria) document.getElementById('ng-categoria').value = d.categoria;
    if (d.data) document.getElementById('ng-data').value = d.data;
    if (d.valor) {
      document.getElementById('ng-valor-unit').value = '';
      document.getElementById('ng-qtd').value = d.quantidade && d.quantidade > 0 ? d.quantidade : 1;
      document.getElementById('ng-valor').value = Number(d.valor).toFixed(2);
    }
    const nadaEncontrado = !d.fornecedor && !d.descricao && !d.valor && !d.data;
    if (nadaEncontrado) {
      if (statusEl) {
        statusEl.style.display = 'block'; statusEl.style.color = '#92400e';
        statusEl.innerHTML = tr('gasto_ia_vazio') + '<br><span style="font-size:9px;color:#999;word-break:break-all;user-select:text">' + JSON.stringify(d).replace(/</g,'&lt;') + '</span>';
      }
      toast(tr('gasto_ia_vazio'), 'err');
    } else {
      if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#166534'; statusEl.textContent = tr('gasto_ia_sucesso'); }
      toast(tr('gasto_ia_sucesso'), 'ok');
    }
  } catch(e) {
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('gasto_ia_erro') + (e.message ? ' (' + e.message + ')' : ''); }
    toast(tr('erro_prefix') + e.message, 'err');
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function salvarGasto() {
  const osId = document.getElementById('ng-os-id').value;
  const gastoId = document.getElementById('ng-gasto-id').value;
  const valor = parseFloat(document.getElementById('ng-valor')?.value) || 0;
  if (!valor) { toast(tr('gasto_valor_obrigatorio'), 'err'); return; }
  const body = {
    os_id: osId,
    fornecedor: document.getElementById('ng-fornecedor')?.value.trim() || '',
    descricao: document.getElementById('ng-descricao')?.value.trim() || '',
    categoria: document.getElementById('ng-categoria')?.value || 'outro',
    data: document.getElementById('ng-data')?.value || null,
    os_dia_id: document.getElementById('ng-dia')?.value || null,
    quantidade: parseFloat(document.getElementById('ng-qtd')?.value) || 1,
    valor_unitario: document.getElementById('ng-valor-unit')?.value ? parseFloat(document.getElementById('ng-valor-unit').value) : null,
    valor
  };

  const btn = document.getElementById('ng-modal-btn');
  if (btn) { btn.disabled = true; btn.textContent = tr('os_gerando'); }

  try {
    if (ngFotoFile) {
      const conectado = await garantirTokenDrive();
      if (conectado) {
        const os = osData.find(o => o.id === osId);
        let folderId = os?.drive_folder_id;
        if (!folderId) {
          const parentId = await getPastaPortal();
          const nomeCliente = (os?.cliente_nome || os?.cliente || 'Cliente').trim();
          const nomePasta = 'OS ' + (os?.numero || osId) + ' - ' + nomeCliente;
          folderId = await criarPastaDrive(nomePasta, parentId);
          if (folderId) {
            await sbPatch('ordens_servico?id=eq.' + osId, { drive_folder_id: folderId, drive_folder_url: 'https://drive.google.com/drive/folders/' + folderId });
            if (os) os.drive_folder_id = folderId;
          }
        }
        const d = await uploadDrive(ngFotoFile, folderId);
        if (d?.id) {
          body.foto_drive_id = d.id;
          body.foto_drive_url = 'https://drive.google.com/file/d/' + d.id + '/view';
        }
      } else {
        toast(tr('drive_conecte_primeiro'), 'err');
      }
    }

    if (gastoId) {
      await sbPatch('os_gastos?id=eq.' + gastoId, body);
    } else {
      body.status = 'pendente';
      body.criado_por = ME.nome;
      await sbPost('os_gastos', body);
    }
    fecharModal('m-gasto');
    toast(tr('gasto_salvo'), 'ok');
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
  finally { if (btn) { btn.disabled = false; btn.textContent = gastoId ? tr('btn_salvar') : tr('btn_lancar_gasto'); } }
}

async function excluirGasto(gastoId, osId) {
  if (!confirm(tr('gasto_excluir_confirm'))) return;
  try {
    let fotoDriveId = null;
    try { const rows = await sbGet('os_gastos?id=eq.' + gastoId + '&select=foto_drive_id'); fotoDriveId = rows[0]?.foto_drive_id || null; } catch(e2) {}
    await sbDelete('os_gastos?id=eq.' + gastoId);
    if (fotoDriveId && googleToken) {
      try {
        await fetch('https://www.googleapis.com/drive/v3/files/' + fotoDriveId, {
          method: 'PATCH',
          headers: { 'Authorization': 'Bearer ' + googleToken, 'Content-Type': 'application/json' },
          body: JSON.stringify({ trashed: true })
        });
      } catch(e3) {}
    }
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function aprovarGasto(gastoId, osId) {
  try {
    await sbPatch('os_gastos?id=eq.' + gastoId, { status: 'aprovado' });
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function rejeitarGasto(gastoId, osId) {
  if (!confirm(tr('gasto_rejeitar_confirm'))) return;
  try {
    await sbPatch('os_gastos?id=eq.' + gastoId, { status: 'rejeitado' });
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function salvarDescricaoOS(osId) {
  const ta = document.getElementById('os-servico-' + osId);
  if (!ta) return;
  const descricao = ta.value.trim();
  try {
    await sbPatch('ordens_servico?id=eq.' + osId, { descricao: descricao || null });
    const os = osData.find(o => o.id === osId);
    if (os) os.descricao = descricao;
    const btn = document.getElementById('servico-save-' + osId);
    if (btn) btn.style.display = 'none';
    toast(tr('os_servico_salvo'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function salvarNotepad(osId) {
  const ta = document.getElementById('os-notepad-' + osId);
  if (!ta) return;
  const notepad = ta.value.trim();
  try {
    await sbPatch('ordens_servico?id=eq.' + osId, { notepad: notepad || null });
    const os = osData.find(o => o.id === osId);
    if (os) os.notepad = notepad;
    const btn = document.getElementById('notepad-save-' + osId);
    if (btn) btn.style.display = 'none';
    toast(tr('os_notepad_salvo'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function toggleFotoInterna(fotoId, osId, novoValor) {
  try {
    await sbPatch('os_fotos?id=eq.' + fotoId, { interna: novoValor });
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirFotoOS(fotoId, osId, driveUrl) {
  if (!confirm(tr('foto_excluir_confirm'))) return;
  try {
    await sbDelete('os_fotos?id=eq.' + fotoId);
    if (driveUrl && googleToken) {
      const m = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      const fid = m ? m[1] : null;
      if (fid) {
        try {
          await fetch('https://www.googleapis.com/drive/v3/files/' + fid, {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + googleToken, 'Content-Type': 'application/json' },
            body: JSON.stringify({ trashed: true })
          });
        } catch(e2) {}
      }
    }
    toast(tr('foto_excluida'), 'ok');
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// ── Editor de foto: desenhar, marcar texto, mover e comentar por foto ──
let feState = null;

function feCentroid(pts) {
  let sx = 0, sy = 0;
  pts.forEach(p => { sx += p.x; sy += p.y; });
  return { x: sx / pts.length, y: sy / pts.length };
}

function feHandlePoints(s) {
  if (s.type === 'text') return [{ key: 'a', x: s.x1, y: s.y1 }];
  if (s.type === 'arrow' || s.type === 'circle') return [{ key: '1', x: s.x1, y: s.y1 }, { key: '2', x: s.x2, y: s.y2 }];
  if (s.type === 'pen') { const c = feCentroid(s.pts); return [{ key: 'move', x: c.x, y: c.y }]; }
  return [];
}

function feDrawStroke(ctx, s, scale) {
  scale = scale || 1;
  ctx.strokeStyle = s.color;
  ctx.fillStyle = s.color;
  ctx.lineWidth = 3 * scale;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (s.type === 'pen') {
    ctx.beginPath();
    s.pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();
  } else if (s.type === 'circle') {
    const rx = Math.abs(s.x2 - s.x1) / 2, ry = Math.abs(s.y2 - s.y1) / 2;
    const cx = (s.x1 + s.x2) / 2, cy = (s.y1 + s.y2) / 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (s.type === 'arrow') {
    ctx.beginPath();
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
    ctx.stroke();
    const ang = Math.atan2(s.y2 - s.y1, s.x2 - s.x1);
    ctx.beginPath();
    ctx.moveTo(s.x2, s.y2);
    ctx.lineTo(s.x2 - 14 * scale * Math.cos(ang - 0.4), s.y2 - 14 * scale * Math.sin(ang - 0.4));
    ctx.lineTo(s.x2 - 14 * scale * Math.cos(ang + 0.4), s.y2 - 14 * scale * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
  } else if (s.type === 'text') {
    ctx.save();
    const fsz = (s.size || 40) * scale;
    ctx.font = 'bold ' + fsz + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.lineWidth = Math.max(2, fsz / 9);
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.fillStyle = s.color;
    ctx.strokeText(s.text, s.x1, s.y1);
    ctx.fillText(s.text, s.x1, s.y1);
    ctx.restore();
  }
}

function feRedraw(preview) {
  if (!feState) return;
  const canvas = document.getElementById('fe-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  feState.strokes.forEach(s => feDrawStroke(ctx, s));
  if (preview) feDrawStroke(ctx, preview);
  if (feState.textTarget) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(feState.textTarget.x, feState.textTarget.y, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  if (feState.tool === 'move') {
    feState.strokes.forEach(s => {
      feHandlePoints(s).forEach(hp => {
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });
    });
  }
}

function feFindHandle(p) {
  const thresh = 16;
  const strokes = feState.strokes;
  for (let i = strokes.length - 1; i >= 0; i--) {
    const s = strokes[i];
    for (const hp of feHandlePoints(s)) {
      if (Math.hypot(p.x - hp.x, p.y - hp.y) < thresh) return { s, key: hp.key };
    }
  }
  return null;
}

function feRenderComments() {
  const list = document.getElementById('fe-comments');
  if (!list || !feState) return;
  const cs = feState.comentarios;
  list.innerHTML = cs.length ? '' : '<div style="font-size:12px;color:#bbb">' + tr('fe_sem_comentarios') + '</div>';
  cs.forEach(c => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;align-items:flex-start';
    const ini = (c.autor || '?').substring(0, 2).toUpperCase();
    const quando = new Date(c.criado_em).toLocaleString(LANG === 'pt' ? 'pt-BR' : 'en-US');
    row.innerHTML = '<div style="width:24px;height:24px;border-radius:50%;background:#eef2ff;color:#4338ca;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0">' + ini + '</div>' +
      '<div><div style="font-size:12px;font-weight:600">' + (c.autor || '—') + '</div>' +
      '<div style="font-size:10px;color:#bbb;margin-bottom:2px">' + quando + '</div>' +
      '<div style="font-size:12px">' + c.texto + '</div></div>';
    list.appendChild(row);
  });
}

async function abrirFotoEditor(fotoId, osId) {
  const content = document.getElementById('m-foto-editor-content');
  content.innerHTML = '<div style="padding:40px;text-align:center;color:#bbb">' + tr('loading') + '</div>';
  abrirModal('m-foto-editor');

  let foto, comentarios = [];
  try {
    const [fs, cs] = await Promise.all([
      sbGet('os_fotos?id=eq.' + fotoId),
      sbGet('os_foto_comentarios?foto_id=eq.' + fotoId + '&order=criado_em.asc')
    ]);
    foto = fs[0];
    comentarios = cs;
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); fecharModal('m-foto-editor'); return; }
  if (!foto) { fecharModal('m-foto-editor'); return; }

  const fid = driveFileIdFromUrl(foto.drive_url);
  const src = foto.thumb_url || (fid ? ('https://drive.google.com/thumbnail?id=' + fid + '&sz=w1200') : '');

  feState = { fotoId, osId, strokes: Array.isArray(foto.anotacoes) ? JSON.parse(JSON.stringify(foto.anotacoes)) : [], comentarios, tool: 'move', color: '#f59e0b', fontSize: 40, selectedText: null, drawing: false, start: null, textTarget: null, dragHandle: null };

  content.innerHTML = `
  <div style="display:flex;flex-wrap:wrap">
    <div style="flex:1;min-width:320px;padding:16px;border-right:1px solid #e8e8e5">
      <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">
        <button class="fe-tool btn-sec" data-tool="move">${tr('fe_mover')}</button>
        <button class="fe-tool btn-sec" data-tool="pen">${tr('fe_caneta')}</button>
        <button class="fe-tool btn-sec" data-tool="arrow">${tr('fe_seta')}</button>
        <button class="fe-tool btn-sec" data-tool="circle">${tr('fe_circulo')}</button>
        <button class="fe-tool btn-sec" data-tool="text">${tr('fe_texto')}</button>
        <span style="width:1px;background:#e8e8e5;margin:2px 6px"></span>
        <button class="fe-color" data-color="#f59e0b" style="width:24px;height:24px;padding:0;border-radius:50%;background:#f59e0b;border:2px solid #1a1a1a;cursor:pointer"></button>
        <button class="fe-color" data-color="#e74c3c" style="width:24px;height:24px;padding:0;border-radius:50%;background:#e74c3c;border:2px solid transparent;cursor:pointer"></button>
        <button class="fe-color" data-color="#2563eb" style="width:24px;height:24px;padding:0;border-radius:50%;background:#2563eb;border:2px solid transparent;cursor:pointer"></button>
        <span style="width:1px;background:#e8e8e5;margin:2px 6px"></span>
        <button class="fe-size btn-sec" data-size="26" title="${tr('fe_tam_title')}" style="padding:6px 10px;font-size:11px">${tr('fe_tam_p')}</button>
        <button class="fe-size btn-sec" data-size="40" title="${tr('fe_tam_title')}" style="padding:6px 10px;font-size:13px">${tr('fe_tam_m')}</button>
        <button class="fe-size btn-sec" data-size="60" title="${tr('fe_tam_title')}" style="padding:6px 10px;font-size:15px">${tr('fe_tam_g')}</button>
        <span style="flex:1"></span>
        <button id="fe-undo" class="btn-sec">${tr('btn_desfazer')}</button>
        <button id="fe-clear" class="btn-sec">${tr('btn_limpar')}</button>
      </div>
      <div id="fe-canvas-wrap" style="position:relative;background:#f5f5f3;border-radius:8px;overflow:hidden;line-height:0">
        <img id="fe-photo" src="${src}" style="width:100%;display:block">
        <canvas id="fe-canvas" style="position:absolute;left:0;top:0;width:100%;height:100%;cursor:crosshair;touch-action:none"></canvas>
      </div>
      <div id="fe-text-panel" style="display:none;gap:6px;margin-top:8px">
        <input id="fe-text-input" placeholder="${tr('fe_texto_ph')}" class="f-inp" style="margin-bottom:0;flex:1">
        <button class="btn-pri" id="fe-text-confirm">${tr('btn_adicionar')}</button>
        <button class="btn-sec" id="fe-text-cancel">${tr('btn_cancelar')}</button>
      </div>
      <div style="font-size:11px;color:#bbb;margin-top:6px">${tr('fe_dica')}</div>
    </div>
    <div style="width:230px;flex-shrink:0;padding:16px;display:flex;flex-direction:column">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
        <span style="font-size:13px;font-weight:600">${tr('os_fotos_label')}</span>
        <button class="modal-close" onclick="fecharModal('m-foto-editor')">×</button>
      </div>
      <a href="${foto.drive_url}" target="_blank" style="font-size:11px;color:#2563eb;margin-bottom:10px;text-decoration:none">${tr('fe_abrir_original')}</a>
      <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.5px;margin:10px 0 8px">${tr('os_anotacoes_label')}</div>
      <div id="fe-comments" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px;margin-bottom:10px;min-height:100px"></div>
      <input id="fe-comment-input" class="f-inp" placeholder="${tr('fe_comentario_ph')}" style="margin-bottom:6px">
      <button class="btn-pri" id="fe-comment-post" style="width:100%">${tr('fe_postar')}</button>
      <button class="btn-pri" id="fe-save" style="width:100%;margin-top:14px">${tr('btn_salvar')}</button>
    </div>
  </div>`;

  feRenderComments();

  const img = document.getElementById('fe-photo');
  const canvas = document.getElementById('fe-canvas');
  function sizeCanvas() {
    canvas.width = img.naturalWidth || 800;
    canvas.height = img.naturalHeight || 600;
    feRedraw();
  }
  if (img.complete && img.naturalWidth) sizeCanvas(); else img.onload = sizeCanvas;

  document.querySelectorAll('.fe-tool').forEach(b => {
    b.onclick = () => {
      feState.tool = b.dataset.tool;
      document.querySelectorAll('.fe-tool').forEach(x => x.style.background = '');
      b.style.background = '#f5f5f3';
      feRedraw();
    };
  });
  document.querySelector('.fe-tool[data-tool="move"]').style.background = '#f5f5f3';
  document.querySelectorAll('.fe-color').forEach(b => {
    b.onclick = () => {
      feState.color = b.dataset.color;
      document.querySelectorAll('.fe-color').forEach(x => x.style.border = '2px solid transparent');
      b.style.border = '2px solid #1a1a1a';
      if (feState.selectedText) { feState.selectedText.color = feState.color; feRedraw(); }
    };
  });
  document.querySelectorAll('.fe-size').forEach(b => {
    b.onclick = () => {
      feState.fontSize = parseInt(b.dataset.size, 10);
      document.querySelectorAll('.fe-size').forEach(x => x.style.background = '');
      b.style.background = '#f5f5f3';
      if (feState.selectedText) { feState.selectedText.size = feState.fontSize; feRedraw(); }
    };
  });
  document.querySelector('.fe-size[data-size="40"]').style.background = '#f5f5f3';

  document.getElementById('fe-undo').onclick = () => { feState.strokes.pop(); feRedraw(); };
  document.getElementById('fe-clear').onclick = () => { feState.strokes = []; feRedraw(); };

  document.getElementById('fe-text-confirm').onclick = () => {
    const inp = document.getElementById('fe-text-input');
    const val = inp.value.trim();
    if (val && feState.textTarget) {
      feState.strokes.push({ type: 'text', color: feState.color, size: feState.fontSize, text: val, x1: feState.textTarget.x, y1: feState.textTarget.y });
    }
    inp.value = '';
    feState.textTarget = null;
    document.getElementById('fe-text-panel').style.display = 'none';
    feRedraw();
  };
  document.getElementById('fe-text-cancel').onclick = () => {
    document.getElementById('fe-text-input').value = '';
    feState.textTarget = null;
    document.getElementById('fe-text-panel').style.display = 'none';
    feRedraw();
  };
  document.getElementById('fe-text-input').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('fe-text-confirm').click(); });

  document.getElementById('fe-comment-post').onclick = async () => {
    const inp = document.getElementById('fe-comment-input');
    const texto = inp.value.trim();
    if (!texto) return;
    try {
      await sbPost('os_foto_comentarios', { foto_id: fotoId, os_id: osId, autor: ME.nome, texto });
      feState.comentarios.push({ autor: ME.nome, texto, criado_em: new Date().toISOString() });
      inp.value = '';
      feRenderComments();
    } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
  };

  document.getElementById('fe-save').onclick = async () => {
    try {
      await sbPatch('os_fotos?id=eq.' + fotoId, { anotacoes: feState.strokes });
      toast(tr('fe_salvo'), 'ok');
      fecharModal('m-foto-editor');
      abrirOS(osId);
    } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
  };

  function fePos(e) {
    const r = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - r.left) * (canvas.width / r.width), y: (cy - r.top) * (canvas.height / r.height) };
  }

  canvas.addEventListener('pointerdown', e => {
    const p = fePos(e);
    if (feState.tool === 'text') {
      feState.textTarget = p;
      document.getElementById('fe-text-panel').style.display = 'flex';
      document.getElementById('fe-text-input').focus();
      feRedraw();
      return;
    }
    if (feState.tool === 'move') {
      feState.dragHandle = feFindHandle(p);
      feState.selectedText = (feState.dragHandle && feState.dragHandle.s.type === 'text') ? feState.dragHandle.s : null;
      if (feState.dragHandle && feState.dragHandle.key === 'move') {
        feState.dragHandle.origPts = feState.dragHandle.s.pts.map(pt => ({ x: pt.x, y: pt.y }));
        feState.dragHandle.startPos = p;
      }
      return;
    }
    feState.drawing = true;
    feState.start = p;
    if (feState.tool === 'pen') feState.strokes.push({ type: 'pen', color: feState.color, pts: [p] });
  });
  canvas.addEventListener('pointermove', e => {
    const p = fePos(e);
    if (feState.tool === 'move' && feState.dragHandle) {
      const dh = feState.dragHandle;
      if (dh.key === 'a' || dh.key === '1') { dh.s.x1 = p.x; dh.s.y1 = p.y; }
      else if (dh.key === '2') { dh.s.x2 = p.x; dh.s.y2 = p.y; }
      else if (dh.key === 'move') {
        const dx = p.x - dh.startPos.x, dy = p.y - dh.startPos.y;
        dh.s.pts = dh.origPts.map(pt => ({ x: pt.x + dx, y: pt.y + dy }));
      }
      feRedraw();
      return;
    }
    if (!feState.drawing) return;
    if (feState.tool === 'pen') {
      feState.strokes[feState.strokes.length - 1].pts.push(p);
      feRedraw();
    } else {
      feRedraw({ type: feState.tool, color: feState.color, x1: feState.start.x, y1: feState.start.y, x2: p.x, y2: p.y });
    }
  });
  canvas.addEventListener('pointerup', e => {
    if (feState.tool === 'move') { feState.dragHandle = null; return; }
    if (!feState.drawing) return;
    feState.drawing = false;
    if (feState.tool !== 'pen') {
      const p = fePos(e);
      feState.strokes.push({ type: feState.tool, color: feState.color, x1: feState.start.x, y1: feState.start.y, x2: p.x, y2: p.y });
      feRedraw();
    }
  });
}

function driveFileIdFromUrl(url) {
  const m = (url || '').match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

async function gerarResumoPDF(osId) {
  const os = osData.find(o => o.id === osId);
  if (!os) return;
  const btn = document.getElementById('pdf-btn-' + osId);
  if (btn) { btn.textContent = tr('os_gerando_pdf'); btn.disabled = true; }
  try {
    const [notas, fotos] = await Promise.all([
      sbGet('os_notas?os_id=eq.' + osId + '&order=criado_em.asc'),
      sbGet('os_fotos?os_id=eq.' + osId + '&interna=eq.false&order=criado_em.asc')
    ]);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const alturaBarraOS = await desenharCabecalhoPDF(doc, tr('os_pdf_titulo'));
    let y = alturaBarraOS + 34;

    doc.setFontSize(16);
    doc.setTextColor(20);
    doc.text(tr('os_pdf_titulo') + ' #' + (os.numero || '—'), margin, y);
    y += 20;
    doc.setFontSize(11);
    doc.text(os.titulo || '', margin, y);
    y += 26;

    function campo(label, valor) {
      if (!valor) return;
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(label.toUpperCase(), margin, y);
      doc.setTextColor(20);
      doc.setFontSize(11);
      y += 14;
      const linhas = doc.splitTextToSize(String(valor), pageW - margin*2);
      doc.text(linhas, margin, y);
      y += linhas.length * 14 + 10;
    }

    campo(tr('os_pdf_cliente'), os.cliente_nome || os.cliente);
    campo(tr('os_pdf_endereco'), os.endereco);
    campo(tr('os_pdf_status'), S_LABEL[os.status] || os.status);
    campo(tr('os_pdf_servico'), os.descricao);

    doc.setFontSize(12);
    doc.setTextColor(20);
    doc.text(tr('os_pdf_anotacoes'), margin, y);
    y += 16;
    doc.setFontSize(10);
    if (notas.length) {
      notas.forEach(n => {
        if (y > 760) { doc.addPage(); y = 50; }
        const dataStr = new Date(n.criado_em || n.created_at).toLocaleString(LANG==='pt'?'pt-BR':'en-US');
        const linhas = doc.splitTextToSize('- ' + n.texto + '  (' + (n.autor||'—') + ', ' + dataStr + ')', pageW - margin*2);
        doc.text(linhas, margin, y);
        y += linhas.length * 13 + 6;
      });
    } else {
      doc.text(tr('os_pdf_sem_anotacoes'), margin, y);
      y += 16;
    }
    y += 10;

    if (y > 700) { doc.addPage(); y = 50; }
    doc.setFontSize(12);
    doc.text(tr('os_pdf_fotos') + ' (' + fotos.length + ')', margin, y);
    y += 16;

    if (!fotos.length) {
      doc.setFontSize(10);
      doc.text(tr('os_pdf_sem_fotos'), margin, y);
    } else {
      const temDrive = await garantirTokenDrive();
      if (!temDrive) {
        doc.setFontSize(10);
        doc.text(tr('os_pdf_fotos_drive_offline'), margin, y);
      } else {
        const imgW = (pageW - margin*2 - 20) / 2;
        const imgH = imgW * 0.75;
        let col = 0;
        for (const f of fotos) {
          const fid = driveFileIdFromUrl(f.drive_url);
          if (!fid) continue;
          try {
            const resp = await fetch('https://www.googleapis.com/drive/v3/files/' + fid + '?alt=media', { headers: { 'Authorization': 'Bearer ' + googleToken } });
            if (!resp.ok) continue;
            const blob = await resp.blob();
            const dataUrl = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });
            if (y + imgH > 780) { doc.addPage(); y = 50; col = 0; }
            const x = margin + col * (imgW + 20);
            const fmt = blob.type && blob.type.includes('png') ? 'PNG' : 'JPEG';
            doc.addImage(dataUrl, fmt, x, y, imgW, imgH);
            col++;
            if (col >= 2) { col = 0; y += imgH + 14; }
          } catch(e) { console.error('foto pdf falhou', e); }
        }
      }
    }

    numerarPaginasPDF(doc);
    doc.save('OS-' + (os.numero||osId) + '-resumo.pdf');
    toast(tr('os_pdf_gerado'), 'ok');
  } catch(e) {
    toast(tr('erro_prefix') + e.message, 'err');
  } finally {
    if (btn) { btn.textContent = tr('os_gerar_pdf'); btn.disabled = false; }
  }
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
    if (status === 'concluida') {
      try { await sbPatch('tarefas?os_gerada_id=eq.' + id, { status: 'concluida' }); } catch(e2) {}
    }
    const os = osData.find(o => o.id === id);
    if (os) os.status = status;
    const saveBtn = document.getElementById('status-save-' + id);
    if (saveBtn) saveBtn.style.display = 'none';
    const headerEl = document.getElementById('os-status-header-' + id);
    if (headerEl) { headerEl.textContent = S_LABEL[status] || status; headerEl.style.color = S_COLOR[status] || '#888'; }
    toast(tr('os_status_atualizado'), 'ok');
    carregarOS();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function notaCardHTML(n, osId) {
  return '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px">'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px">'
    + '<div style="font-size:13px;margin-bottom:3px;flex:1;white-space:pre-wrap">' + n.texto + '</div>'
    + '<span style="display:flex;gap:8px;flex-shrink:0">'
    + '<button onclick="editarNotaOS(\'' + n.id + '\',\'' + osId + '\')" style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;padding:8px;line-height:1">✎</button>'
    + '<button onclick="excluirNotaOS(\'' + n.id + '\',\'' + osId + '\')" style="background:none;border:none;cursor:pointer;color:#888;font-size:19px;padding:8px;line-height:1">×</button>'
    + '</span></div>'
    + '<div style="font-size:10px;color:#bbb">' + (n.autor||'—') + ' · ' + new Date(n.criado_em||n.created_at).toLocaleString(LANG==='pt'?'pt-BR':'en-US') + '</div>'
    + '</div>';
}

async function renderNotasOS(osId) {
  const listEl = document.getElementById('notas-' + osId);
  if (!listEl) return;
  try {
    const notas = await sbGet('os_notas?os_id=eq.' + osId + '&order=criado_em.asc');
    listEl.innerHTML = notas.length ? notas.map(n => notaCardHTML(n, osId)).join('') : '<div style="color:#bbb;font-size:12px">' + tr('os_sem_anotacoes') + '</div>';
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function editarNotaOS(notaId, osId) {
  try {
    const rows = await sbGet('os_notas?id=eq.' + notaId);
    const n = rows[0];
    if (!n) return;
    const novoTexto = prompt(tr('nota_editar_prompt'), n.texto);
    if (novoTexto === null) return;
    const texto = novoTexto.trim();
    if (!texto) { toast(tr('nota_texto_obrigatorio'), 'err'); return; }
    await sbPatch('os_notas?id=eq.' + notaId, { texto });
    await renderNotasOS(osId);
    toast(tr('nota_atualizada'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirNotaOS(notaId, osId) {
  if (!confirm(tr('nota_excluir_confirm'))) return;
  try {
    await sbDelete('os_notas?id=eq.' + notaId);
    await renderNotasOS(osId);
    toast(tr('nota_excluida'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function salvarNota(osId) {
  const inp = document.getElementById('nota-input-' + osId);
  const texto = inp?.value.trim();
  if (!texto) return;
  try {
    await sbPost('os_notas', { os_id: osId, texto, autor: ME.nome });
    inp.value = '';
    await renderNotasOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// Anotações com resumo aprimorado por IA (revisão do técnico antes de salvar)
// ── Anotação por voz: grava, transcreve (Whisper) e cai no mesmo fluxo de resumo por IA ──
let gravacoesAtivas = {};

function blobParaBase64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] || '');
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

async function toggleGravacaoAudio(osId) {
  const ativa = gravacoesAtivas[osId];
  if (ativa) {
    ativa.recorder.stop();
    return;
  }

  if (!navigator.mediaDevices || !window.MediaRecorder) {
    toast(tr('nota_erro_microfone'), 'err');
    return;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch(e) {
    toast(tr('nota_erro_microfone'), 'err');
    return;
  }

  const candidatos = ['audio/webm', 'audio/mp4', 'audio/ogg'];
  const mime = candidatos.find(m => window.MediaRecorder.isTypeSupported && window.MediaRecorder.isTypeSupported(m)) || '';
  const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
  const chunks = [];
  recorder.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };

  const micBtn = document.getElementById('nota-mic-' + osId);
  const statusEl = document.getElementById('nota-rec-status-' + osId);
  const inicioEm = Date.now();
  let timerId = null;

  function atualizarTimer() {
    if (!statusEl) return;
    const seg = Math.floor((Date.now() - inicioEm) / 1000);
    const m = String(Math.floor(seg / 60)).padStart(2, '0');
    const s = String(seg % 60).padStart(2, '0');
    statusEl.textContent = '● ' + tr('nota_gravando') + ' (' + m + ':' + s + ')';
  }

  recorder.onstop = async () => {
    clearInterval(timerId);
    stream.getTracks().forEach(t => t.stop());
    delete gravacoesAtivas[osId];
    if (micBtn) { micBtn.textContent = '🎤'; micBtn.style.background = '#fff'; micBtn.style.color = '#555'; }
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#2563eb'; statusEl.textContent = tr('nota_transcrevendo'); }

    const blob = new Blob(chunks, { type: mime || 'audio/webm' });
    if (!blob.size) { if (statusEl) statusEl.style.display = 'none'; return; }

    try {
      const audio_base64 = await blobParaBase64(blob);
      const r = await fetch(SB_URL + '/functions/v1/bright-processor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
        body: JSON.stringify({ audio_base64, mime_type: blob.type, idioma: LANG })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erro');
      const texto = (d.texto || '').trim();
      if (statusEl) statusEl.style.display = 'none';
      if (!texto) { toast(tr('nota_audio_vazio'), 'err'); return; }
      const inp = document.getElementById('nota-input-' + osId);
      if (inp) inp.value = texto;
      gerarResumoNota(osId);
    } catch(e) {
      if (statusEl) statusEl.style.display = 'none';
      console.error('transcrever-audio falhou:', e);
      toast(tr('nota_erro_transcricao') + ': ' + e.message, 'err');
    }
  };

  recorder.start();
  gravacoesAtivas[osId] = { recorder };
  if (micBtn) { micBtn.textContent = '⏹'; micBtn.style.background = '#e74c3c'; micBtn.style.color = '#fff'; }
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; }
  atualizarTimer();
  timerId = setInterval(atualizarTimer, 1000);
}

async function gerarResumoNota(osId) {
  const inp = document.getElementById('nota-input-' + osId);
  const texto = inp?.value.trim();
  if (!texto) return;
  const btn = document.getElementById('nota-btn-' + osId);
  if (btn) { btn.textContent = tr('os_gerando'); btn.disabled = true; }
  try {
    mostrarPreviaNota(osId, texto);
  } catch(e) {
    console.error('gerarResumoNota erro:', e);
    await salvarNotaDireta(osId, texto);
  } finally {
    if (btn) { btn.textContent = tr('os_enviar'); btn.disabled = false; }
  }
}

async function salvarNotaDireta(osId, texto) {
  try {
    await sbPost('os_notas', { os_id: osId, texto, autor: ME.nome });
    const inp = document.getElementById('nota-input-' + osId);
    if (inp) inp.value = '';
    await renderNotasOS(osId);
    toast(tr('anotacao_salva'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function mostrarPreviaNota(osId, resumo) {
  document.getElementById('nota-form-' + osId).style.display = 'none';
  const wrap = document.getElementById('nota-previa-' + osId);
  wrap.style.display = 'block';
  wrap.innerHTML = `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-size:10px;color:#166534;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;font-weight:600">${tr('os_resumo_ia')}</div>
      <div id="nota-texto-ia-${osId}" contenteditable="false" style="font-size:13px;background:#fff;border:1.5px solid #e8e8e5;border-radius:7px;padding:9px 11px;margin-bottom:8px;outline:none">${resumo}</div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button onclick="cancelarPreviaNota('${osId}')" style="padding:6px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#555">${tr('btn_cancelar')}</button>
        <button id="nota-editbtn-${osId}" onclick="toggleEditarPreviaNota('${osId}')" style="padding:6px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#555">${tr('os_editar_nota')}</button>
        <button onclick="confirmarNota('${osId}')" style="padding:6px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">${tr('os_confirmar')}</button>
      </div>
    </div>`;
}

function toggleEditarPreviaNota(osId) {
  const el = document.getElementById('nota-texto-ia-' + osId);
  const btn = document.getElementById('nota-editbtn-' + osId);
  const editing = el.getAttribute('contenteditable') === 'true';
  el.setAttribute('contenteditable', editing ? 'false' : 'true');
  el.style.borderColor = editing ? '#e8e8e5' : '#1a1a1a';
  btn.textContent = editing ? tr('os_editar_nota') : tr('os_concluir_edicao');
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

// ── Bloco de notas: gravação por voz acumulativa + resumo sob demanda ──
async function toggleGravacaoNotepad(osId) {
  const chave = 'np-' + osId;
  const ativa = gravacoesAtivas[chave];
  if (ativa) {
    ativa.recorder.stop();
    return;
  }

  if (!navigator.mediaDevices || !window.MediaRecorder) {
    toast(tr('nota_erro_microfone'), 'err');
    return;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch(e) {
    toast(tr('nota_erro_microfone'), 'err');
    return;
  }

  const candidatos = ['audio/webm', 'audio/mp4', 'audio/ogg'];
  const mime = candidatos.find(m => window.MediaRecorder.isTypeSupported && window.MediaRecorder.isTypeSupported(m)) || '';
  const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
  const chunks = [];
  recorder.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };

  const micBtn = document.getElementById('notepad-mic-' + osId);
  const statusEl = document.getElementById('notepad-rec-status-' + osId);
  const inicioEm = Date.now();
  let timerId = null;

  function atualizarTimer() {
    if (!statusEl) return;
    const seg = Math.floor((Date.now() - inicioEm) / 1000);
    const m = String(Math.floor(seg / 60)).padStart(2, '0');
    const s = String(seg % 60).padStart(2, '0');
    statusEl.textContent = '● ' + tr('nota_gravando') + ' (' + m + ':' + s + ')';
  }

  recorder.onstop = async () => {
    clearInterval(timerId);
    stream.getTracks().forEach(t => t.stop());
    delete gravacoesAtivas[chave];
    if (micBtn) { micBtn.textContent = '🎤'; micBtn.style.background = '#fff'; micBtn.style.color = '#555'; }
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#2563eb'; statusEl.textContent = tr('nota_transcrevendo'); }

    const blob = new Blob(chunks, { type: mime || 'audio/webm' });
    if (!blob.size) { if (statusEl) statusEl.style.display = 'none'; return; }

    try {
      const audio_base64 = await blobParaBase64(blob);
      const r = await fetch(SB_URL + '/functions/v1/bright-processor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
        body: JSON.stringify({ audio_base64, mime_type: blob.type, idioma: LANG })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erro');
      const texto = (d.texto || '').trim();
      if (statusEl) statusEl.style.display = 'none';
      if (!texto) { toast(tr('nota_audio_vazio'), 'err'); return; }

      const ta = document.getElementById('os-notepad-' + osId);
      if (ta) {
        ta.value = ta.value.trim() ? (ta.value.replace(/\s+$/, '') + '\n' + texto) : texto;
      }
      await salvarNotepad(osId);
    } catch(e) {
      if (statusEl) statusEl.style.display = 'none';
      console.error('transcrever-audio (notepad) falhou:', e);
      toast(tr('nota_erro_transcricao') + ': ' + e.message, 'err');
    }
  };

  recorder.start();
  gravacoesAtivas[chave] = { recorder };
  if (micBtn) { micBtn.textContent = '⏹'; micBtn.style.background = '#e74c3c'; micBtn.style.color = '#fff'; }
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; }
  atualizarTimer();
  timerId = setInterval(atualizarTimer, 1000);
}

async function resumirNotepad(osId) {
  const ta = document.getElementById('os-notepad-' + osId);
  const texto = ta?.value.trim();
  if (!texto) return;
  const btn = document.getElementById('notepad-resumir-' + osId);
  if (btn) { btn.textContent = tr('os_gerando'); btn.disabled = true; }
  try {
    mostrarPreviaNotepad(osId, texto);
  } catch(e) {
    console.error('resumirNotepad erro:', e);
  } finally {
    if (btn) { btn.textContent = tr('os_notepad_resumir'); btn.disabled = false; }
  }
}

function mostrarPreviaNotepad(osId, resumo) {
  document.getElementById('notepad-form-' + osId).style.display = 'none';
  const wrap = document.getElementById('notepad-previa-' + osId);
  wrap.style.display = 'block';
  wrap.innerHTML = `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px">
      <div style="font-size:10px;color:#166534;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;font-weight:600">${tr('os_resumo_ia')}</div>
      <div id="notepad-texto-ia-${osId}" contenteditable="false" style="font-size:12px;background:#fff;border:1.5px solid #e8e8e5;border-radius:7px;padding:9px 11px;margin-bottom:8px;outline:none;white-space:pre-wrap">${resumo}</div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button onclick="cancelarPreviaNotepad('${osId}')" style="padding:6px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#555">${tr('btn_cancelar')}</button>
        <button id="notepad-editbtn-${osId}" onclick="toggleEditarPreviaNotepad('${osId}')" style="padding:6px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#555">${tr('os_editar_nota')}</button>
        <button onclick="confirmarNotepad('${osId}')" style="padding:6px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">${tr('os_confirmar')}</button>
      </div>
    </div>`;
}

function toggleEditarPreviaNotepad(osId) {
  const el = document.getElementById('notepad-texto-ia-' + osId);
  const btn = document.getElementById('notepad-editbtn-' + osId);
  const editing = el.getAttribute('contenteditable') === 'true';
  el.setAttribute('contenteditable', editing ? 'false' : 'true');
  el.style.borderColor = editing ? '#e8e8e5' : '#1a1a1a';
  btn.textContent = editing ? tr('os_editar_nota') : tr('os_concluir_edicao');
  if (!editing) el.focus();
}

function cancelarPreviaNotepad(osId) {
  const wrap = document.getElementById('notepad-previa-' + osId);
  wrap.style.display = 'none';
  wrap.innerHTML = '';
  document.getElementById('notepad-form-' + osId).style.display = 'block';
}

async function confirmarNotepad(osId) {
  const el = document.getElementById('notepad-texto-ia-' + osId);
  const texto = el?.innerText.trim();
  if (!texto) return;
  cancelarPreviaNotepad(osId);
  const ta = document.getElementById('os-notepad-' + osId);
  if (ta) ta.value = texto;
  await salvarNotepad(osId);
}

// ── TAREFAS ───────────────────────────────────────────────────
let tarefasData = [];
let tarefasTecnicosLista = [];
let tarefaNotasAbertas = {};
let tarefaNotasCache = {};
let tarefaArrastando = null;
let tarefaOrigemOS = null;
let ntTecnicosSelecionados = [];

const TAREFA_COLS = [
  { id: 'media', key: 'tarefas_col_media', color: '#666', bg: '#f1f1ee' },
  { id: 'alta', key: 'tarefas_col_alta', color: '#92400e', bg: '#fffbeb' },
  { id: 'urgente', key: 'tarefas_col_urgente', color: '#991b1b', bg: '#fef2f2' },
  { id: 'os_criada', key: 'tarefas_col_os_criada', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'concluido', key: 'tarefas_col_concluido', color: '#166534', bg: '#f0fdf4' },
];

function tarefaColuna(t) {
  if (t.status === 'concluida') return 'concluido';
  if (t.os_gerada_numero) return 'os_criada';
  return t.prioridade || 'media';
}

async function renderTarefas() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    const [tarefas, tecnicos] = await Promise.all([
      sbGet('tarefas?order=ordem.asc'),
      sbGet('tecnicos?ativo=eq.true&order=nome')
    ]);
    tarefasData = tarefas.map(t => ({ ...t, tecnicos: Array.isArray(t.tecnicos) ? t.tecnicos : [] }));
    tarefasTecnicosLista = tecnicos;
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }
  el.innerHTML = '<div style="overflow-x:auto"><div id="tarefas-board" style="display:grid;grid-template-columns:repeat(5,minmax(150px,1fr));gap:10px;min-width:820px"></div></div>';
  renderTarefasBoard();
}

function tarefaTecnicoChipsHTML(t) {
  return tarefasTecnicosLista.map(tec => {
    const sel = (t.tecnicos || []).includes(tec.nome);
    const nomeEsc = String(tec.nome).replace(/'/g, "\\'");
    return '<span onclick="toggleTecnicoTarefa(\'' + t.id + '\',\'' + nomeEsc + '\')" style="font-size:10px;padding:3px 8px;border-radius:99px;cursor:pointer;border:1px solid ' + (sel?'#1a1a1a':'#e8e8e5') + ';background:' + (sel?'#1a1a1a':'#fff') + ';color:' + (sel?'#fff':'#555') + '">' + tec.nome + '</span>';
  }).join('');
}

function renderTarefasBoard() {
  const board = document.getElementById('tarefas-board');
  if (!board) return;
  board.innerHTML = TAREFA_COLS.map(col => {
    const itens = tarefasData.filter(t => tarefaColuna(t) === col.id).sort((a,b) => (a.ordem||0) - (b.ordem||0));
    return '<div style="min-width:0">'
      + '<div style="background:' + col.bg + ';color:' + col.color + ';border-radius:8px 8px 0 0;padding:8px 10px;font-size:12px;font-weight:600;display:flex;justify-content:space-between">'
      + '<span>' + tr(col.key) + '</span><span>' + itens.length + '</span></div>'
      + '<div ondragover="event.preventDefault()" ondrop="tarefaDropColuna(event,\'' + col.id + '\')" style="background:#f9f9f7;border-radius:0 0 8px 8px;padding:8px;min-height:120px;display:flex;flex-direction:column;gap:8px">'
      + (itens.length ? itens.map(t => tarefaCardHTML(t)).join('') : '<div style="text-align:center;color:#bbb;font-size:11px;padding:14px">' + tr('tarefas_vazio_coluna') + '</div>')
      + '</div></div>';
  }).join('');
}

function tarefaCardHTML(t) {
  const abertas = tarefaNotasAbertas[t.id];
  const notasCount = tarefaNotasCache[t.id] ? tarefaNotasCache[t.id].length : '';
  return '<div draggable="true" ondragstart="tarefaDragStart(event,\'' + t.id + '\')" ondragover="event.preventDefault();event.stopPropagation()" ondrop="event.stopPropagation();tarefaDropCard(event,\'' + t.id + '\')" style="background:#fff;border:1px solid #e8e8e5;border-radius:8px;padding:9px 11px;cursor:grab">'
    + '<div style="display:flex;justify-content:space-between;gap:6px">'
    + '<div style="font-size:12px;line-height:1.4">' + t.titulo + '</div>'
    + '<span style="display:flex;gap:6px;flex-shrink:0">'
    + '<button onclick="abrirEditarTarefa(\'' + t.id + '\')" title="' + tr('tarefa_editar') + '" style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;line-height:1;padding:8px">✎</button>'
    + '<button onclick="excluirTarefa(\'' + t.id + '\')" title="' + tr('tarefa_excluir') + '" style="background:none;border:none;cursor:pointer;color:#888;font-size:19px;line-height:1;padding:8px">×</button>'
    + '</span></div>'
    + (t.os_gerada_numero ? '<div style="font-size:10px;color:#166534;margin-top:4px">' + tr('tarefa_os_gerada_badge').replace('NUM', t.os_gerada_numero) + '</div>' : '')
    + (t.prazo ? '<div style="font-size:11px;color:#888;margin-top:4px">📅 ' + t.prazo + (t.hora ? ' ' + String(t.hora).slice(0,5) + (t.hora_fim ? '-' + String(t.hora_fim).slice(0,5) : '') : '') + (t.calendar_event_id ? ' ✓' : '') + '</div>' : '')
    + (t.cliente_nome ? '<div style="font-size:11px;color:#888;margin-top:2px">' + t.cliente_nome + '</div>' : '')
    + (t.descricao ? '<div style="font-size:11px;color:#555;margin-top:6px;padding:6px 8px;background:#f7f7f5;border-radius:6px;white-space:pre-wrap;line-height:1.4">' + t.descricao + '</div>' : '')
    + '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin:6px 0">'
    + '<button onclick="toggleTarefaNotas(\'' + t.id + '\')" style="font-size:10px;padding:2px 6px;border:1px solid #e8e8e5;border-radius:6px;background:#fff;cursor:pointer">📝 ' + notasCount + '</button>'
    + (!t.os_gerada_numero
        ? '<button onclick="abrirNovaOSDeTarefa(\'' + t.id + '\')" style="font-size:10px;padding:2px 8px;border:none;border-radius:6px;background:#1a1a1a;color:#fff;cursor:pointer">' + tr('tarefa_gerar_os') + '</button>'
        : '<button onclick="cancelarOSDaTarefa(\'' + t.id + '\')" style="font-size:10px;padding:2px 8px;border:1px solid #fecaca;border-radius:6px;background:#fff;color:#dc2626;cursor:pointer">' + tr('tarefa_cancelar_os') + '</button>')
    + '</div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:' + (abertas?'6':'0') + 'px">'
    + (tarefasTecnicosLista.length ? tarefaTecnicoChipsHTML(t) : '<span style="font-size:10px;color:#bbb">' + tr('tarefa_sem_tecnico') + '</span>')
    + '</div>'
    + (abertas ? tarefaNotasHTML(t.id) : '')
    + '</div>';
}

function tarefaNotasHTML(id) {
  const notas = tarefaNotasCache[id] || [];
  return '<div style="border-top:1px solid #f0f0ee;padding-top:6px;margin-top:6px">'
    + notas.map(n => '<div style="font-size:10px;color:#666;margin-bottom:3px">• ' + n.texto + '</div>').join('')
    + '<div style="display:flex;gap:4px">'
    + '<input id="tarefa-nota-input-' + id + '" placeholder="' + tr('tarefa_notas_ph') + '" style="flex:1;font-size:11px;padding:4px 6px;border:1px solid #e8e8e5;border-radius:6px" onkeydown="if(event.key===\'Enter\')addTarefaNota(\'' + id + '\')">'
    + '<button onclick="addTarefaNota(\'' + id + '\')" style="font-size:11px;padding:4px 8px;border:1px solid #e8e8e5;border-radius:6px;background:#fff;cursor:pointer">' + tr('btn_add') + '</button>'
    + '</div></div>';
}

async function toggleTarefaNotas(id) {
  tarefaNotasAbertas[id] = !tarefaNotasAbertas[id];
  if (tarefaNotasAbertas[id] && !tarefaNotasCache[id]) {
    try { tarefaNotasCache[id] = await sbGet('tarefa_notas?tarefa_id=eq.' + id + '&order=criado_em.asc'); }
    catch(e) { tarefaNotasCache[id] = []; }
  }
  renderTarefasBoard();
}

async function addTarefaNota(id) {
  const inp = document.getElementById('tarefa-nota-input-' + id);
  const texto = inp?.value.trim();
  if (!texto) return;
  try {
    await sbPost('tarefa_notas', { tarefa_id: id, texto, autor: ME.nome });
    tarefaNotasCache[id] = await sbGet('tarefa_notas?tarefa_id=eq.' + id + '&order=criado_em.asc');
    renderTarefasBoard();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function tarefaDragStart(ev, id) { tarefaArrastando = id; }

function tarefaAplicarColuna(t, colId) {
  if (colId === 'os_criada') return; // coluna automatica (segue o status da OS vinculada)
  if (colId === 'concluido') { t.status = 'concluida'; }
  else { t.status = 'pendente'; t.prioridade = colId; }
}

async function tarefaDropCard(ev, destId) {
  if (!tarefaArrastando || tarefaArrastando === destId) return;
  const origem = tarefasData.find(t => t.id === tarefaArrastando);
  const destino = tarefasData.find(t => t.id === destId);
  if (!origem || !destino) return;
  const colDestino = tarefaColuna(destino);
  if (colDestino === 'os_criada' || tarefaColuna(origem) === 'os_criada') {
    toast(tr('tarefa_os_criada_automatica'), 'err');
    tarefaArrastando = null;
    return;
  }
  tarefaAplicarColuna(origem, colDestino);
  const semOrigem = tarefasData.filter(t => t.id !== origem.id);
  const idxDestino = semOrigem.findIndex(t => t.id === destId);
  semOrigem.splice(idxDestino, 0, origem);
  tarefasData = semOrigem;
  tarefaArrastando = null;
  renderTarefasBoard();
  await persistirOrdemColuna(colDestino);
}

async function tarefaDropColuna(ev, destColId) {
  if (!tarefaArrastando) return;
  const origem = tarefasData.find(t => t.id === tarefaArrastando);
  if (!origem) return;
  if (destColId === 'os_criada' || tarefaColuna(origem) === 'os_criada') {
    toast(tr('tarefa_os_criada_automatica'), 'err');
    tarefaArrastando = null;
    return;
  }
  tarefaAplicarColuna(origem, destColId);
  tarefaArrastando = null;
  renderTarefasBoard();
  await persistirOrdemColuna(destColId);
}

async function persistirOrdemColuna(colId) {
  const itens = tarefasData.filter(t => tarefaColuna(t) === colId);
  await Promise.all(itens.map((t, i) => {
    t.ordem = i;
    return sbPatch('tarefas?id=eq.' + t.id, { status: t.status, prioridade: t.prioridade, ordem: i }).catch(() => {});
  }));
}

async function toggleTecnicoTarefa(id, nome) {
  const t = tarefasData.find(x => x.id === id);
  if (!t) return;
  const atual = t.tecnicos || [];
  t.tecnicos = atual.includes(nome) ? atual.filter(n => n !== nome) : [...atual, nome];
  renderTarefasBoard();
  try { await sbPatch('tarefas?id=eq.' + id, { tecnicos: t.tecnicos, responsavel: t.tecnicos.join(', ') || '' }); }
  catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirTarefa(id) {
  if (!confirm(tr('tarefa_confirma_excluir'))) return;
  const t = tarefasData.find(x => x.id === id);
  try {
    await sbDelete('tarefas?id=eq.' + id);
    tarefasData = tarefasData.filter(x => x.id !== id);
    delete tarefaNotasCache[id];
    delete tarefaNotasAbertas[id];
    renderTarefasBoard();
    if (document.getElementById('agenda-grade')) renderAgendaGrade();
    if (t && t.calendar_event_id) excluirEventoAgenda(t.calendar_event_id);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function cancelarOSDaTarefa(id) {
  const t = tarefasData.find(x => x.id === id);
  if (!t || !t.os_gerada_numero) return;
  if (!confirm(tr('tarefa_cancelar_os_confirm').replace('NUM', t.os_gerada_numero))) return;
  try {
    let osId = t.os_gerada_id;
    if (!osId) {
      // tarefa antiga, gerada antes do vinculo por id existir: acha a OS pelo numero
      try {
        const rows = await sbGet('ordens_servico?numero=eq.' + t.os_gerada_numero + '&select=id');
        osId = rows[0]?.id;
      } catch(e2) {}
    }
    if (osId) await sbDelete('ordens_servico?id=eq.' + osId);
    await sbPatch('tarefas?id=eq.' + id, { os_gerada_numero: null, os_gerada_id: null, status: 'pendente' });
    t.os_gerada_numero = null;
    t.os_gerada_id = null;
    t.status = 'pendente';
    renderTarefasBoard();
    toast(tr('tarefa_os_cancelada'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirEventoAgenda(eventId) {
  try {
    const r = await fetch(SB_URL + '/functions/v1/criar-evento-agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ acao: 'excluir', event_id: eventId })
    });
    if (!r.ok) { const d = await r.json().catch(()=>({})); throw new Error(d.error || 'Erro'); }
  } catch(e) { console.error('excluir evento da agenda falhou:', e); }
}

function renderNtTecnicosChips() {
  const el = document.getElementById('nt-tecnicos-chips');
  if (!el) return;
  el.innerHTML = tarefasTecnicosLista.map(tec => {
    const sel = ntTecnicosSelecionados.includes(tec.nome);
    const nomeEsc = String(tec.nome).replace(/'/g, "\\'");
    return '<span onclick="toggleNtTecnico(\'' + nomeEsc + '\')" style="font-size:12px;padding:5px 10px;border-radius:99px;cursor:pointer;border:1px solid ' + (sel?'#1a1a1a':'#e8e8e5') + ';background:' + (sel?'#1a1a1a':'#fff') + ';color:' + (sel?'#fff':'#555') + '">' + tec.nome + '</span>';
  }).join('');
}

function toggleNtTecnico(nome) {
  ntTecnicosSelecionados = ntTecnicosSelecionados.includes(nome) ? ntTecnicosSelecionados.filter(n => n !== nome) : [...ntTecnicosSelecionados, nome];
  renderNtTecnicosChips();
}

async function abrirNovaTarefa() {
  tarefaEditandoId = null;
  document.getElementById('nt-modal-title').textContent = tr('tarefa_nova_title');
  document.getElementById('nt-modal-btn').textContent = tr('btn_criar_tarefa');
  document.getElementById('nt-titulo').value = '';
  document.getElementById('nt-cliente').value = '';
  document.getElementById('nt-data').value = '';
  document.getElementById('nt-hora').value = '';
  document.getElementById('nt-hora-fim').value = '';
  document.getElementById('nt-descricao').value = '';
  document.getElementById('nt-agenda').checked = false;
  ntTecnicosSelecionados = [];
  if (!tarefasTecnicosLista.length) {
    try { tarefasTecnicosLista = await sbGet('tecnicos?ativo=eq.true&order=nome'); } catch(e) {}
  }
  renderNtTecnicosChips();
  abrirModal('m-nova-tarefa');
  setTimeout(() => document.getElementById('nt-titulo')?.focus(), 100);
}

async function abrirEditarTarefa(id) {
  const t = tarefasData.find(x => x.id === id);
  if (!t) return;
  tarefaEditandoId = id;
  document.getElementById('nt-modal-title').textContent = tr('tarefa_editar_title');
  document.getElementById('nt-modal-btn').textContent = tr('btn_salvar_tarefa');
  document.getElementById('nt-titulo').value = t.titulo || '';
  document.getElementById('nt-cliente').value = t.cliente_nome || '';
  document.getElementById('nt-data').value = t.prazo || '';
  document.getElementById('nt-hora').value = t.hora ? String(t.hora).slice(0,5) : '';
  document.getElementById('nt-hora-fim').value = t.hora_fim ? String(t.hora_fim).slice(0,5) : '';
  document.getElementById('nt-descricao').value = t.descricao || '';
  document.getElementById('nt-agenda').checked = false;
  ntTecnicosSelecionados = (t.tecnicos || []).slice();
  if (!tarefasTecnicosLista.length) {
    try { tarefasTecnicosLista = await sbGet('tecnicos?ativo=eq.true&order=nome'); } catch(e) {}
  }
  renderNtTecnicosChips();
  abrirModal('m-nova-tarefa');
  setTimeout(() => document.getElementById('nt-titulo')?.focus(), 100);
}

async function salvarNovaTarefa() {
  const titulo = document.getElementById('nt-titulo')?.value.trim();
  if (!titulo) { toast(tr('tarefa_titulo_obrigatorio'), 'err'); return; }
  const tecnicos = ntTecnicosSelecionados.slice();
  const cliente_nome = document.getElementById('nt-cliente')?.value.trim() || null;
  const prazo = document.getElementById('nt-data')?.value || null;
  const hora = document.getElementById('nt-hora')?.value || null;
  const hora_fim = document.getElementById('nt-hora-fim')?.value || null;
  const descricao = document.getElementById('nt-descricao')?.value.trim() || '';
  const querAgenda = document.getElementById('nt-agenda')?.checked;

  if (tarefaEditandoId) {
    const id = tarefaEditandoId;
    try {
      await sbPatch('tarefas?id=eq.' + id, {
        titulo, tecnicos, responsavel: tecnicos.join(', ') || '', cliente_nome, prazo, hora, hora_fim, descricao
      });
      fecharModal('m-nova-tarefa');
      toast(tr('tarefa_atualizada'), 'ok');
      const t = tarefasData.find(x => x.id === id);
      const jaTinhaAgenda = t && t.calendar_event_id;
      if (t) { t.titulo = titulo; t.tecnicos = tecnicos; t.cliente_nome = cliente_nome; t.prazo = prazo; t.hora = hora; t.hora_fim = hora_fim; t.descricao = descricao; }
      renderTarefasBoard();
      if (document.getElementById('agenda-grade')) renderAgendaGrade();
      if (jaTinhaAgenda && prazo) {
        atualizarEventoAgenda(t.calendar_event_id, titulo, cliente_nome, prazo, tecnicos.join(', '), hora, hora_fim);
      } else if (querAgenda && prazo && !jaTinhaAgenda) {
        criarEventoAgenda(id, titulo, cliente_nome, prazo, tecnicos.join(', '), hora, hora_fim);
      }
    } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
    return;
  }

  try {
    const ordem = tarefasData.filter(t => tarefaColuna(t) === 'media').length;
    const [nova] = await sbPost('tarefas', {
      titulo, tecnicos, responsavel: tecnicos.join(', ') || '',
      cliente_nome, prazo, hora, hora_fim, descricao, status: 'pendente', prioridade: 'media', ordem,
      origem: 'manual', criado_por: ME.nome
    });
    fecharModal('m-nova-tarefa');
    toast(tr('tarefa_criada'), 'ok');
    tarefasData = await sbGet('tarefas?order=ordem.asc');
    tarefasData = tarefasData.map(t => ({ ...t, tecnicos: Array.isArray(t.tecnicos) ? t.tecnicos : [] }));
    renderTarefasBoard();
    if (querAgenda && prazo && nova) {
      criarEventoAgenda(nova.id, titulo, cliente_nome, prazo, tecnicos.join(', '), hora, hora_fim);
    }
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function criarEventoAgenda(tarefaId, titulo, cliente_nome, prazo, tecnicosTexto, hora, hora_fim) {
  try {
    const r = await fetch(SB_URL + '/functions/v1/criar-evento-agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({
        titulo,
        descricao: cliente_nome ? ('Cliente: ' + cliente_nome) : '',
        data: prazo,
        hora: hora || null,
        hora_fim: hora_fim || null,
        tecnico_nome: tecnicosTexto
      })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Erro');
    await sbPatch('tarefas?id=eq.' + tarefaId, { calendar_event_id: d.event_id || null });
    const t = tarefasData.find(x => x.id === tarefaId);
    if (t) t.calendar_event_id = d.event_id;
    toast(tr('tarefa_agenda_sucesso'), 'ok');
    renderTarefasBoard();
  } catch(e) {
    console.error('criar-evento-agenda falhou:', e);
    toast(tr('tarefa_agenda_erro') + ': ' + e.message, 'err');
  }
}

async function atualizarEventoAgenda(eventId, titulo, cliente_nome, prazo, tecnicosTexto, hora, hora_fim) {
  try {
    const r = await fetch(SB_URL + '/functions/v1/criar-evento-agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({
        acao: 'atualizar',
        event_id: eventId,
        titulo,
        descricao: cliente_nome ? ('Cliente: ' + cliente_nome) : '',
        data: prazo,
        hora: hora || null,
        hora_fim: hora_fim || null,
        tecnico_nome: tecnicosTexto
      })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Erro');
    toast(tr('tarefa_agenda_sucesso'), 'ok');
  } catch(e) {
    console.error('atualizar-evento-agenda falhou:', e);
    toast(tr('tarefa_agenda_erro') + ': ' + e.message, 'err');
  }
}

let osEscolhaTarefaId = null;
let osEscolhaOSAlvo = null;

async function abrirNovaOSDeTarefa(tarefaId) {
  const t = tarefasData.find(x => x.id === tarefaId);
  if (!t) return;
  let osExistente = null;
  if (t.cliente_nome) {
    try {
      osExistente = await sbGet('ordens_servico?cliente_nome=eq.' + encodeURIComponent(t.cliente_nome) + '&status=in.(aberta,em_campo)&order=created_at.desc&limit=1').then(r => r[0] || null);
    } catch(e) {}
  }
  if (osExistente) {
    osEscolhaTarefaId = tarefaId;
    osEscolhaOSAlvo = osExistente;
    document.getElementById('os-existente-info').innerHTML =
      tr('os_existente_info').replace('NUM', osExistente.numero).replace('CLIENTE', t.cliente_nome).replace('TITULO', osExistente.titulo || '');
    abrirModal('m-os-existente');
    return;
  }
  criarNovaOSDeTarefa(tarefaId);
}

async function criarNovaOSDeTarefa(tarefaId) {
  const t = tarefasData.find(x => x.id === tarefaId);
  if (!t) return;
  await abrirNovaOS();
  tarefaOrigemOS = tarefaId;
  document.getElementById('os-titulo').value = t.titulo;
  if (t.descricao) document.getElementById('os-desc').value = t.descricao;
  if (t.tecnicos && t.tecnicos.length) {
    osTecnicosSelecionados = t.tecnicos.slice();
    renderOsTecnicoChips();
  }
  if (t.cliente_nome) {
    document.getElementById('os-cli-busca').value = t.cliente_nome;
    buscarClienteOS(t.cliente_nome);
  }
}

function escolherCriarNovaOS() {
  const tarefaId = osEscolhaTarefaId;
  fecharModal('m-os-existente');
  osEscolhaTarefaId = null;
  osEscolhaOSAlvo = null;
  criarNovaOSDeTarefa(tarefaId);
}

async function escolherAnexarOS() {
  const tarefaId = osEscolhaTarefaId;
  const os = osEscolhaOSAlvo;
  fecharModal('m-os-existente');
  osEscolhaTarefaId = null;
  osEscolhaOSAlvo = null;
  const t = tarefasData.find(x => x.id === tarefaId);
  if (!t || !os) return;
  try {
    await sbPost('os_dias', {
      os_id: os.id,
      data: t.prazo || new Date().toISOString().slice(0,10),
      tecnicos: t.tecnicos || [],
      hora_inicio: t.hora || null,
      hora_fim: t.hora_fim || null,
      observacao: t.descricao || '',
      tarefa_origem_id: t.id,
      executado: false
    });
    await sbPatch('tarefas?id=eq.' + tarefaId, { os_gerada_numero: os.numero, os_gerada_id: os.id });
    t.os_gerada_numero = os.numero;
    t.os_gerada_id = os.id;
    renderTarefasBoard();
    toast(tr('tarefa_anexada_os').replace('NUM', os.numero), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// ── AGENDA (visao semanal por tecnico) ──────────────────────────
let agendaSemanaBase = null;
let agendaTecnicosAtivos = null;
let agendaPrioridadesAtivas = ['media','alta','urgente'];
let agendaModoView = 'semana';

function agendaSegundaDaSemana(d) {
  const dt = new Date(d);
  const dia = dt.getDay();
  const diff = (dia === 0 ? -6 : 1 - dia);
  dt.setDate(dt.getDate() + diff);
  dt.setHours(0,0,0,0);
  return dt;
}

function agendaFormatarISO(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function agendaFormatarCurta(d) {
  return String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0');
}

async function renderAgenda() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    const [tarefas, tecnicos] = await Promise.all([
      sbGet('tarefas?status=eq.pendente&prazo=not.is.null&order=prazo.asc'),
      sbGet('tecnicos?ativo=eq.true&order=nome')
    ]);
    tarefasData = tarefas.map(t => ({ ...t, tecnicos: Array.isArray(t.tecnicos) ? t.tecnicos : [] }));
    tarefasTecnicosLista = tecnicos;
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }
  if (!agendaSemanaBase) agendaSemanaBase = agendaSegundaDaSemana(new Date());
  if (!agendaTecnicosAtivos) agendaTecnicosAtivos = tarefasTecnicosLista.map(t => t.nome);

  el.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">'
    + '<button class="btn-sec" onclick="agendaMudarSemana(-1)">‹</button>'
    + '<span id="agenda-label-semana" style="font-size:13px;font-weight:500;min-width:170px;text-align:center;display:inline-block"></span>'
    + '<button class="btn-sec" onclick="agendaMudarSemana(1)">›</button>'
    + '<button class="btn-sec" onclick="agendaIrHoje()">' + tr('agenda_hoje') + '</button>'
    + '</div>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:center">'
    + '<input id="agenda-busca" oninput="renderAgendaGrade()" placeholder="' + tr('agenda_busca_ph') + '" style="flex:1;min-width:160px;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none">'
    + '<div id="agenda-filtro-view" style="display:flex;gap:4px"></div>'
    + '</div>'
    + '<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px">'
    + '<div><div style="font-size:11px;color:#888;margin-bottom:6px">' + tr('agenda_filtro_tecnico') + '</div><div id="agenda-filtro-tecnicos" style="display:flex;gap:6px;flex-wrap:wrap"></div></div>'
    + '<div><div style="font-size:11px;color:#888;margin-bottom:6px">' + tr('agenda_filtro_prioridade') + '</div><div id="agenda-filtro-prioridade" style="display:flex;gap:6px;flex-wrap:wrap"></div></div>'
    + '</div>'
    + '<div id="agenda-grade" style="overflow-x:auto"></div>';

  renderAgendaGrade();
}

function agendaMudarSemana(delta) {
  agendaSemanaBase.setDate(agendaSemanaBase.getDate() + delta * (agendaModoView === 'dia' ? 1 : 7));
  renderAgendaGrade();
}

function agendaIrHoje() {
  agendaSemanaBase = agendaSegundaDaSemana(new Date());
  renderAgendaGrade();
}

function agendaToggleTecnico(nome) {
  agendaTecnicosAtivos = agendaTecnicosAtivos.includes(nome) ? agendaTecnicosAtivos.filter(n => n !== nome) : [...agendaTecnicosAtivos, nome];
  renderAgendaGrade();
}

function agendaTogglePrioridade(p) {
  agendaPrioridadesAtivas = agendaPrioridadesAtivas.includes(p) ? agendaPrioridadesAtivas.filter(x => x !== p) : [...agendaPrioridadesAtivas, p];
  renderAgendaGrade();
}

function agendaSetModoView(m) {
  agendaModoView = m;
  renderAgendaGrade();
}

function agendaAbrirTarefa(id) {
  abrirEditarTarefa(id);
}

// paleta de cores por tecnico (indice = posicao na lista de tecnicos ativos, ordem alfabetica)
const AGENDA_PALETA_TECNICOS = ['#3b82f6','#a855f7','#14b8a6','#f59e0b','#ef4444','#6366f1','#ec4899','#84cc16','#0ea5e9','#f97316'];
function agendaCorTecnico(nome) {
  const idx = tarefasTecnicosLista.findIndex(t => t.nome === nome);
  return AGENDA_PALETA_TECNICOS[(idx < 0 ? 0 : idx) % AGENDA_PALETA_TECNICOS.length];
}

function renderAgendaGrade() {
  const labelEl = document.getElementById('agenda-label-semana');
  if (!labelEl) return;

  document.getElementById('agenda-filtro-tecnicos').innerHTML = tarefasTecnicosLista.map(t =>
    chipTecnicoHTML(t.nome, '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:' + agendaCorTecnico(t.nome) + ';margin-right:5px;vertical-align:middle"></span>' + t.nome, agendaTecnicosAtivos.includes(t.nome), 'agendaToggleTecnico')
  ).join('');

  const labelPrioridade = { media: tr('tarefas_col_media'), alta: tr('tarefas_col_alta'), urgente: tr('tarefas_col_urgente') };
  const prioridadeDotCor = { media: '#94a3b8', alta: '#f59e0b', urgente: '#ef4444' };
  document.getElementById('agenda-filtro-prioridade').innerHTML = ['media','alta','urgente'].map(p =>
    chipTecnicoHTML(p, '<span style="display:inline-block;width:7px;height:7px;border-radius:2px;background:' + prioridadeDotCor[p] + ';margin-right:5px;vertical-align:middle"></span>' + labelPrioridade[p], agendaPrioridadesAtivas.includes(p), 'agendaTogglePrioridade')
  ).join('');

  document.getElementById('agenda-filtro-view').innerHTML =
    chipTecnicoHTML('semana', tr('agenda_semana'), agendaModoView === 'semana', 'agendaSetModoView')
    + chipTecnicoHTML('dia', tr('agenda_dia'), agendaModoView === 'dia', 'agendaSetModoView');

  const nDias = agendaModoView === 'dia' ? 1 : 7;
  const dias = [];
  for (let i = 0; i < nDias; i++) {
    const d = new Date(agendaSemanaBase);
    d.setDate(d.getDate() + i);
    dias.push(d);
  }
  labelEl.textContent = agendaModoView === 'dia'
    ? agendaFormatarCurta(dias[0]) + '/' + dias[0].getFullYear()
    : agendaFormatarCurta(dias[0]) + ' - ' + agendaFormatarCurta(dias[dias.length-1]) + '/' + dias[0].getFullYear();

  const busca = (document.getElementById('agenda-busca')?.value || '').toLowerCase();

  const tecnicosVisiveis = tarefasTecnicosLista.filter(t => agendaTecnicosAtivos.includes(t.nome));
  const diasISO = dias.map(agendaFormatarISO);

  const grade = document.getElementById('agenda-grade');
  if (!tecnicosVisiveis.length) { grade.innerHTML = '<div style="text-align:center;color:#bbb;font-size:12px;padding:30px">' + tr('agenda_sem_tarefas') + '</div>'; return; }

  let html = '<table style="width:100%;border-collapse:collapse;table-layout:fixed;min-width:' + (agendaModoView==='dia' ? 380 : 860) + 'px">';
  html += '<tr><td style="width:120px;font-size:11px;color:#888;padding:6px 8px"></td>'
    + dias.map(d => '<td style="text-align:center;font-size:12px;color:#555;padding:6px 4px;border-left:1px solid #f0f0ee"><div>' + ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'][(d.getDay()+6)%7] + '</div><div style="font-size:11px;color:#aaa">' + agendaFormatarCurta(d) + '</div></td>').join('')
    + '</tr>';

  html += tecnicosVisiveis.map(tec => {
    const corTec = agendaCorTecnico(tec.nome);
    const evsPorDia = diasISO.map(iso => tarefasData.filter(t => {
      if (!t.tecnicos.includes(tec.nome)) return false;
      if (t.prazo !== iso) return false;
      if (!agendaPrioridadesAtivas.includes(t.prioridade || 'media')) return false;
      if (busca && !((t.titulo||'').toLowerCase().includes(busca) || (t.cliente_nome||'').toLowerCase().includes(busca))) return false;
      return true;
    }));
    return '<tr>'
      + '<td style="font-size:12px;font-weight:500;padding:10px 8px;border-top:1px solid #f0f0ee;vertical-align:top">'
        + '<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:' + corTec + ';margin-right:6px;vertical-align:middle"></span>' + tec.nome
      + '</td>'
      + evsPorDia.map(evs => '<td style="vertical-align:top;padding:6px;min-height:64px;border-top:1px solid #f0f0ee;border-left:1px solid #f0f0ee">'
        + evs.map(t => {
            const dotCor = prioridadeDotCor[t.prioridade || 'media'];
            const hora = t.hora ? String(t.hora).slice(0,5) + (t.hora_fim ? ' - ' + String(t.hora_fim).slice(0,5) : '') : '';
            return '<div onclick="agendaAbrirTarefa(\'' + t.id + '\')" style="cursor:pointer;position:relative;background:' + corTec + '14;border-left:3px solid ' + corTec + ';border-radius:6px;padding:6px 8px;margin-bottom:6px">'
              + '<span style="position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:50%;background:' + dotCor + '"></span>'
              + '<div style="font-weight:500;font-size:12px;padding-right:12px">' + t.titulo + '</div>'
              + (hora ? '<div style="font-size:11px;color:#888;margin-top:3px">' + hora + '</div>' : '')
              + (t.cliente_nome ? '<div style="font-size:11px;color:#888;opacity:.85">' + t.cliente_nome + '</div>' : '')
              + '</div>';
          }).join('')
        + '</td>').join('')
      + '</tr>';
  }).join('');

  html += '</table>';
  grade.innerHTML = html;
}



// FINANCEIRO: Rentabilidade por OS
let rentabilidadeData = { os: [], dias: [], gastos: [], tecnicos: [] };
let rentFiltroCobranca = 'todos';
let rentFiltroTecnico = 'todos';
let rentFiltroStatus = 'todos';

async function renderRentabilidadeOS() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px">Carregando...</div>';
  try {
    const [os, gastos, despesas, tecnicos, dias] = await Promise.all([
      sbGet('ordens_servico?status=eq.concluida&order=created_at.desc'),
      sbGet('os_gastos?order=criado_em.desc'),
      sbGet('os_despesas?order=criado_em.desc'),
      sbGet('tecnicos?order=nome'), sbGet('os_dias?order=data.asc')
    ]);
    rentabilidadeData = { os, gastos, despesas, tecnicos, dias };
    renderDashRent('quinzena', null);
  } catch(e) {
    const el2 = document.getElementById('mod-content');
    if (el2) el2.innerHTML = '<div style="text-align:center;padding:40px;color:red">Erro: ' + e.message + '</div>';
  }
}

function renderDashRent(periodo, tecFiltro) {
  if (!rentabilidadeData) return;
  const { os, gastos, despesas, tecnicos, dias } = rentabilidadeData;
  const el = document.getElementById('mod-content');
  const agora = new Date();
  let d0 = new Date(agora);
  if (periodo === 'semana') d0.setDate(agora.getDate() - 7);
  else if (periodo === 'quinzena') d0.setDate(agora.getDate() - 15);
  else if (periodo === 'mes') d0.setMonth(agora.getMonth() - 1);
  else d0.setMonth(agora.getMonth() - 3);

  let osF = os.filter(o => new Date(o.created_at) >= d0).sort((a,b)=>(a.numero||0)-(b.numero||0));
  if (tecFiltro) osF = osF.filter(o => (o.tecnico_nome||'').includes(tecFiltro));

  const linhas = osF.map(o => {
    const rec = Number(o.valor_orcado||0);
    const mo  = calcularResumoValores((dias||[]).filter(d=>d.os_id===o.id), [], tecnicos).totalMaoObra;
    const desp = despesas.filter(d => d.os_id===o.id).reduce((s,d)=>s+Number(d.valor||0),0)
               + gastos.filter(g => g.os_id===o.id).reduce((s,g)=>s+Number(g.valor||0),0);
    const custo = mo + desp;
    const lucro = rec - custo;
    const margem = rec > 0 ? Math.round(lucro/rec*100) : null;
    return { os:o, rec, mo, desp, custo, lucro, margem };
  });

  const totRec  = linhas.reduce((s,l)=>s+l.rec,0);
  const totCusto= linhas.reduce((s,l)=>s+l.custo,0);
  const totLucro= totRec - totCusto;
  const margM   = totRec > 0 ? Math.round(totLucro/totRec*100) : 0;
  const aRec    = linhas.filter(l=>l.os.status_cobranca==='a_cobrar').reduce((s,l)=>s+l.rec,0);

  const porTec = {};
  linhas.forEach(l => {
    const t = l.os.tecnico_nome||'Sem técnico';
    if (!porTec[t]) porTec[t]={rec:0,custo:0};
    porTec[t].rec+=l.rec; porTec[t].custo+=l.custo;
  });
  const tOrd = Object.keys(porTec).map(t=>({t,m:porTec[t].rec>0?Math.round((porTec[t].rec-porTec[t].custo)/porTec[t].rec*100):0})).sort((a,b)=>b.m-a.m).slice(0,4); const tNomes = tOrd.map(x=>x.t);
  const tMarg  = tOrd.map(x=>x.m);

  const fmt = v => '$' + Number(v).toLocaleString('en-US',{maximumFractionDigits:0});
  const mc  = m => m>=60?'#0ca30c':m>=40?'#fab219':'#d03b3b';
  const ct  = c => c==='cobrado'?'<span style="font-size:10px;padding:2px 7px;border-radius:99px;background:var(--bg-success);color:var(--text-success)">Cobrado</span>'
                 : c==='sem_custo'?'<span style="font-size:10px;padding:2px 7px;border-radius:99px;background:var(--bg-accent);color:var(--text-accent)">Sem custo</span>'
                 : '<span style="font-size:10px;padding:2px 7px;border-radius:99px;background:var(--bg-warning);color:var(--text-warning)">A cobrar</span>';

  const pBtns = ['semana','quinzena','mes','trimestre'].map(p =>
    '<button data-p="' + p + '" style="padding:5px 10px;font-size:11px;border:none;cursor:pointer;font-family:inherit;' + (periodo===p?'background:var(--text-primary);color:var(--surface-2)':'background:none;color:var(--text-secondary)') + '">' + p.charAt(0).toUpperCase()+p.slice(1) + '</button>'
  ).join('');

  const tOpts = tecnicos.map(t =>
    '<option value="'+t.nome+'"'+(tecFiltro===t.nome?' selected':'')+'>'+t.nome+'</option>'
  ).join('');

  const rows = linhas.length ? linhas.map(l =>
    '<tr style="border-bottom:0.5px solid var(--border)">'
    +'<td style="padding:8px 12px;font-weight:500">#'+(l.os.numero||'—')+'</td>'
    +'<td style="padding:8px 12px;color:var(--text-secondary)">'+(l.os.cliente_nome||l.os.cliente||'—')+'</td>'
    +'<td style="padding:8px 12px;color:var(--text-secondary)">'+(l.os.tecnico_nome||'—')+'</td>'
    +'<td style="padding:8px 12px;text-align:right">'+fmt(l.rec)+'</td>'
    +'<td style="padding:8px 12px;text-align:right;color:var(--text-secondary)">'+fmt(l.mo)+'</td>'
    +'<td style="padding:8px 12px;text-align:right;color:var(--text-secondary)">'+fmt(l.desp)+' <button data-osid="'+l.os.id+'" class="btn-ver-desp" style="padding:1px 6px;border:0.5px solid var(--border);border-radius:4px;font-size:10px;cursor:pointer;background:none;color:var(--text-muted);font-family:inherit">ver</button></td>'
    +'<td style="padding:8px 12px;text-align:right;font-weight:500;color:'+(l.lucro>=0?'#0ca30c':'#d03b3b')+'">'+fmt(l.lucro)+'</td>'
    +'<td style="padding:8px 12px;text-align:right">'+(l.margem!==null?'<span style="font-weight:500;color:'+mc(l.margem)+'">'+l.margem+'%</span>':'<span style="color:var(--text-muted)">—</span>')+'</td>'
    +'<td style="padding:8px 12px;text-align:center">'+ct(l.os.status_cobranca)+'</td>'
    +'</tr>'
  ).join('') : '<tr><td colspan="9" style="padding:40px;text-align:center;color:var(--text-muted)">Nenhuma OS neste período</td></tr>';

  el.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">'
    +'<div style="display:flex;gap:6px">'
    +'<div id="rent-periodo" style="display:flex;background:var(--surface-1);border:0.5px solid var(--border);border-radius:var(--radius);overflow:hidden">'+pBtns+'</div>'
    +'<select id="rent-tec" style="font-size:11px;padding:5px 10px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-2);color:var(--text-primary)"><option value="">Todos os técnicos</option>'+tOpts+'</select>'
    +'</div>'
    +'<button id="rent-export" style="padding:5px 12px;font-size:11px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-2);color:var(--text-primary);cursor:pointer;font-family:inherit">Exportar CSV</button>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">'
    +'<div style="background:var(--surface-1);border-radius:var(--radius);padding:12px 14px"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">RECEITA</div><div style="font-size:20px;font-weight:500">'+fmt(totRec)+'</div><div style="font-size:10px;color:var(--text-muted);margin-top:3px">'+linhas.length+' OS</div></div>'
    +'<div style="background:var(--surface-1);border-radius:var(--radius);padding:12px 14px"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">CUSTO TOTAL</div><div style="font-size:20px;font-weight:500">'+fmt(totCusto)+'</div><div style="font-size:10px;color:var(--text-muted);margin-top:3px">MO + despesas</div></div>'
    +'<div style="background:var(--surface-1);border-radius:var(--radius);padding:12px 14px"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">MARGEM MÉDIA</div><div style="font-size:20px;font-weight:500;color:'+mc(margM)+'">'+margM+'%</div><div style="font-size:10px;color:var(--text-muted);margin-top:3px">Lucro: '+fmt(totLucro)+'</div></div>'
    +'<div style="background:var(--surface-1);border-radius:var(--radius);padding:12px 14px"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">A RECEBER</div><div style="font-size:20px;font-weight:500;color:'+(aRec>0?'#d03b3b':'#0ca30c')+'">'+fmt(aRec)+'</div><div style="font-size:10px;color:var(--text-muted);margin-top:3px">'+linhas.filter(l=>l.os.status_cobranca==='a_cobrar').length+' pendentes</div></div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">'
    +'<div style="background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:14px"><div style="font-size:11px;font-weight:500;color:var(--text-secondary);margin-bottom:10px">Receita vs Custo por OS</div><div style="position:relative;height:280px"><canvas id="rent-c1" role="img" aria-label="Receita vs custo">Receita e custo por OS.</canvas></div></div>'
    +'<div style="background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:14px"><div style="font-size:11px;font-weight:500;color:var(--text-secondary);margin-bottom:10px">Margem por técnico</div><div style="position:relative;height:280px"><canvas id="rent-c2" role="img" aria-label="Margem técnico">Margem por técnico.</canvas></div></div>'
    +'</div>'
    +'<div style="background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;overflow:hidden">'
    +'<div style="padding:12px 14px;border-bottom:0.5px solid var(--border);font-size:12px;font-weight:500">Detalhe por OS</div>'
    +'<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">'
    +'<thead><tr style="border-bottom:0.5px solid var(--border)"><th style="padding:8px 12px;text-align:left;font-weight:500;color:var(--text-muted);font-size:10px">OS</th><th style="padding:8px 12px;text-align:left;font-weight:500;color:var(--text-muted);font-size:10px">Cliente</th><th style="padding:8px 12px;text-align:left;font-weight:500;color:var(--text-muted);font-size:10px">Técnico</th><th style="padding:8px 12px;text-align:right;font-weight:500;color:var(--text-muted);font-size:10px">Receita</th><th style="padding:8px 12px;text-align:right;font-weight:500;color:var(--text-muted);font-size:10px">Mão de obra</th><th style="padding:8px 12px;text-align:right;font-weight:500;color:var(--text-muted);font-size:10px">Despesas</th><th style="padding:8px 12px;text-align:right;font-weight:500;color:var(--text-muted);font-size:10px">Lucro</th><th style="padding:8px 12px;text-align:right;font-weight:500;color:var(--text-muted);font-size:10px">Margem</th><th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted);font-size:10px">Cobrança</th></tr></thead>'
    +'<tbody>'+rows+'</tbody></table></div>'+(linhas.length?('<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;padding:10px 14px;border-top:0.5px solid var(--border);background:var(--surface-1);font-size:11px;color:var(--text-secondary)"><span>'+linhas.length+' OS &middot; Receita '+fmt(totRec)+' &middot; Mão de obra '+fmt(linhas.reduce((s,l)=>s+l.mo,0))+' &middot; Despesas '+fmt(linhas.reduce((s,l)=>s+l.desp,0))+'</span><span style="font-weight:500;color:'+mc(margM)+'">Lucro '+fmt(totLucro)+' ('+margM+'%)</span></div>'):'')+'</div>';

  // Event listeners
  document.getElementById('rent-periodo').querySelectorAll('button').forEach(btn => {
    btn.onclick = () => renderDashRent(btn.dataset.p, document.getElementById('rent-tec').value||null);
  });
  document.getElementById('rent-tec').onchange = function() {
    renderDashRent(periodo, this.value||null);
  };
  document.getElementById('rent-export').onclick = exportarRentCSV;
  document.querySelectorAll('.btn-ver-desp').forEach(btn => {
    btn.onclick = () => verDespesasOS(btn.dataset.osid);
  });

  // Gráficos
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const gridC = isDark ? '#2c2c2a' : '#e1e0d9';
  const textC = '#898781';
  const baseOpts = { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } } };

  const l8 = linhas.slice(0,8);
  if (l8.length && document.getElementById('rent-c1')) {
    new Chart(document.getElementById('rent-c1'), { type:'bar', data:{ labels:l8.map(l=>'#'+(l.os.numero||'?')), datasets:[{ label:'Receita', data:l8.map(l=>l.rec), backgroundColor:(c)=>{const g=c.chart.ctx.createLinearGradient(0,0,0,240);g.addColorStop(0,'#4f9cf0');g.addColorStop(1,'#2a5ea8');return g;}, borderRadius:6, barPercentage:0.85, categoryPercentage:0.8 },{ label:'Custo', data:l8.map(l=>l.custo), backgroundColor:(c)=>{const g=c.chart.ctx.createLinearGradient(0,0,0,240);g.addColorStop(0,'#f2955a');g.addColorStop(1,'#c94f1f');return g;}, borderRadius:6, barPercentage:0.85, categoryPercentage:0.8 },{ label:'Sobra', data:l8.map(l=>l.lucro), backgroundColor:(c)=>{const g=c.chart.ctx.createLinearGradient(0,0,0,240);g.addColorStop(0,'#4ad991');g.addColorStop(1,'#1f9c63');return g;}, borderRadius:6, barPercentage:0.85, categoryPercentage:0.8 }] }, options:{...baseOpts, plugins:{legend:{display:true,position:'top',labels:{color:textC,boxWidth:10,font:{size:10}}}}, scales:{ x:{grid:{display:false},ticks:{color:textC,font:{size:11,weight:'600'}}}, y:{grid:{color:gridC},ticks:{color:textC,font:{size:10},callback:v=>'$'+Math.round(v/1000)+'k'}} }}, plugins:[{id:'valLabels',afterDatasetsDraw(chart){const {ctx}=chart;ctx.save();ctx.font='9px sans-serif';ctx.fillStyle=textC;ctx.textAlign='center';chart.data.datasets.forEach((ds,i)=>{const meta=chart.getDatasetMeta(i);meta.data.forEach((bar,idx)=>{const v=ds.data[idx];if(Math.abs(v)>=1)ctx.fillText('$'+Math.round(v),bar.x,v>=0?bar.y-4:bar.y+12);});});ctx.restore();}}] });
  }
  if (tNomes.length && document.getElementById('rent-c2')) {
    new Chart(document.getElementById('rent-c2'), { type:'bar', data:{ labels:tNomes, datasets:[{ data:tMarg, backgroundColor:tMarg.map(mc), borderRadius:8, barPercentage:0.7, categoryPercentage:0.7 }] }, options:{...baseOpts, indexAxis:'y', scales:{ x:{grid:{color:gridC},ticks:{color:textC,font:{size:10},callback:v=>v+'%'},min:0,max:100}, y:{grid:{display:false},ticks:{color:textC,font:{size:11,weight:'600'}}} }}, plugins:[{id:'margLabels',afterDatasetsDraw(chart){const {ctx}=chart;ctx.save();ctx.font='11px sans-serif';ctx.fillStyle=textC;ctx.textAlign='left';const meta=chart.getDatasetMeta(0);meta.data.forEach((bar,idx)=>{const v=tMarg[idx];ctx.fillText(v+'%',bar.x+6,bar.y+4);});ctx.restore();}}] });
  }
}

async function verDespesasOS(osId) {
  const desp = await sbGet('os_despesas?os_id=eq.' + osId + '&order=criado_em.desc');
  const os = rentabilidadeData && rentabilidadeData.os ? rentabilidadeData.os.find(o => o.id === osId) : null;
  const existing = document.getElementById('modal-desp-os');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'modal-desp-os';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:2000;display:flex;align-items:center;justify-content:center';
  const lista = desp.length
    ? desp.map(d => '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:0.5px solid var(--border)"><span>'+d.descricao+'</span><span style="font-weight:500">$'+Number(d.valor).toFixed(2)+'</span></div>').join('')
    : '<div style="color:var(--text-muted);text-align:center;padding:20px">Nenhuma despesa lançada</div>';
  modal.innerHTML = '<div style="background:var(--surface-2);border-radius:12px;padding:24px;width:460px;max-width:95vw;max-height:90vh;overflow-y:auto">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px"><div style="font-size:15px;font-weight:500">Despesas — OS #'+(os?os.numero:'')+'</div><button id="btn-fecha-desp" style="background:none;border:none;cursor:pointer;font-size:20px;color:var(--text-muted)">×</button></div>'
    +lista
    +'<div style="margin-top:14px;padding-top:14px;border-top:0.5px solid var(--border)"><div style="font-size:11px;font-weight:500;color:var(--text-secondary);margin-bottom:8px">Lançar despesa</div>'
    +'<div style="display:flex;gap:8px"><input id="desp-desc-inp" placeholder="Descrição" style="flex:2;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px;font-family:inherit"><input id="desp-val-inp" type="number" placeholder="Valor $" style="flex:1;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);font-size:12px;font-family:inherit"><button id="btn-lanc-desp" style="padding:7px 12px;border:none;border-radius:var(--radius);background:var(--text-primary);color:var(--surface-2);font-size:12px;cursor:pointer;font-family:inherit">+</button></div>'
    +'</div></div>';
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
  document.getElementById('btn-fecha-desp').onclick = () => modal.remove();
  document.getElementById('btn-lanc-desp').onclick = () => lancaDespesaOS(osId);
}

async function lancaDespesaOS(osId) {
  const desc = document.getElementById('desp-desc-inp') ? document.getElementById('desp-desc-inp').value.trim() : '';
  const val  = document.getElementById('desp-val-inp') ? parseFloat(document.getElementById('desp-val-inp').value) : 0;
  if (!desc || !val) { toast('Preencha descrição e valor', 'err'); return; }
  try {
    await sbPost('os_despesas', { os_id: osId, descricao: desc, valor: val, lancado_por: ME ? ME.nome : '' });
    toast('Despesa lançada!', 'ok');
    document.getElementById('modal-desp-os').remove();
    renderDashRent('quinzena', null);
  } catch(e) { toast('Erro: ' + e.message, 'err'); }
}

function exportarRentCSV() {
  if (!rentabilidadeData || !rentabilidadeData.os) return;
  const header = 'OS,Cliente,Tecnico,Receita,Mao de obra,Despesas,Lucro,Margem,Cobranca';
  const rows = rentabilidadeData.os.map(o => {
    const rec  = Number(o.valor_orcado||0);
    const mo   = calcularResumoValores((rentabilidadeData.dias||[]).filter(d=>d.os_id===o.id), [], rentabilidadeData.tecnicos).totalMaoObra;
    const desp = (rentabilidadeData.despesas||[]).filter(d=>d.os_id===o.id).reduce((s,d)=>s+Number(d.valor||0),0);
    const lucro = rec - mo - desp;
    const margem = rec > 0 ? Math.round(lucro/rec*100)+'%' : '';
    return ['#'+(o.numero||''), o.cliente_nome||o.cliente||'', o.tecnico_nome||'', rec, mo, desp, lucro, margem, o.status_cobranca||''].join(',');
  });
  const csv = [header].concat(rows).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'rentabilidade-os.csv';
  a.click();
}


async function garantirTecnicosAtivosCache() {
  try { tecnicosAtivosCache = await sbGet('tecnicos?ativo=eq.true&order=nome'); tecnicosData = tecnicosAtivosCache; }
  catch(e) { tecnicosAtivosCache = tecnicosData || []; }
  return tecnicosAtivosCache;
}

function chipTecnicoHTML(valor, label, sel, onclickFn) {
  const valorEsc = String(valor).replace(/'/g, "\\'");
  return '<span onclick="' + onclickFn + '(\'' + valorEsc + '\')" style="font-size:12px;padding:5px 10px;border-radius:99px;cursor:pointer;border:1px solid ' + (sel?'#1a1a1a':'#e8e8e5') + ';background:' + (sel?'#1a1a1a':'#fff') + ';color:' + (sel?'#fff':'#555') + '">' + label + '</span>';
}

function renderOsTecnicoChips() {
  const el = document.getElementById('os-tecnico-chips');
  if (!el) return;
  const nomesCadastrados = tecnicosAtivosCache.map(t => t.nome);
  let html = tecnicosAtivosCache.map(t => chipTecnicoHTML(t.nome, t.nome, osTecnicosSelecionados.includes(t.nome), 'toggleOsTecnico')).join('');
  osTecnicosSelecionados.filter(n => !nomesCadastrados.includes(n)).forEach(n => {
    html += chipTecnicoHTML(n, n + ' (' + tr('os_tecnico_nao_cadastrado') + ')', true, 'toggleOsTecnico');
  });
  el.innerHTML = html;
}

function toggleOsTecnico(nome) {
  osTecnicosSelecionados = osTecnicosSelecionados.includes(nome) ? osTecnicosSelecionados.filter(n => n !== nome) : [...osTecnicosSelecionados, nome];
  renderOsTecnicoChips();
}

function renderEditOsTecnicoChips() {
  const el = document.getElementById('edit-os-tecnico-chips');
  if (!el) return;
  const nomesCadastrados = tecnicosAtivosCache.map(t => t.nome);
  let html = tecnicosAtivosCache.map(t => chipTecnicoHTML(t.nome, t.nome, editOsTecnicosSelecionados.includes(t.nome), 'toggleEditOsTecnico')).join('');
  editOsTecnicosSelecionados.filter(n => !nomesCadastrados.includes(n)).forEach(n => {
    html += chipTecnicoHTML(n, n + ' (' + tr('os_tecnico_nao_cadastrado') + ')', true, 'toggleEditOsTecnico');
  });
  el.innerHTML = html;
}

function toggleEditOsTecnico(nome) {
  editOsTecnicosSelecionados = editOsTecnicosSelecionados.includes(nome) ? editOsTecnicosSelecionados.filter(n => n !== nome) : [...editOsTecnicosSelecionados, nome];
  renderEditOsTecnicoChips();
}

async function abrirNovaOS() {
  osCliSel = null;
  tarefaOrigemOS = null;
  osTecnicosSelecionados = [];
  ['os-titulo','os-desc','os-cli-busca'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  await garantirTecnicosAtivosCache();
  renderOsTecnicoChips();
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
  if (!nome||!email||!telefone||!endereco) { toast(tr('cliente_required_fields'),'err'); return; }
  try {
    const [c] = await sbPost('clientes', { nome, email, telefone, endereco, contato: document.getElementById('nc-contato')?.value.trim()||null, ativo: true });
    fecharModal('m-novo-cli');
    selecionarCliente(c);
    abrirModal('m-nova-os');
    toast(tr('cliente_cadastrado'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function salvarNovaOS() {
  const titulo = document.getElementById('os-titulo')?.value.trim();
  if (!titulo) { toast(tr('os_titulo_obrigatorio'), 'err'); return; }
  if (!osCliSel) { toast(tr('cliente_selecione_um'), 'err'); document.getElementById('os-cli-busca')?.focus(); return; }
  try {
    // Próximo número
    const nums = await sbGet('ordens_servico?select=numero&order=numero.desc.nullslast&limit=1');
    const numero = (nums[0]?.numero || 0) + 1;
    const [novaOS] = await sbPost('ordens_servico', {
      numero, titulo,
      cliente: osCliSel.nome, cliente_nome: osCliSel.nome,
      cliente_tel: osCliSel.telefone||null, cliente_email: osCliSel.email||null,
      endereco: osCliSel.endereco||null,
      tecnico_nome: osTecnicosSelecionados.join(', ')||null,
      tecnicos: osTecnicosSelecionados,
      descricao: document.getElementById('os-desc')?.value.trim()||null,
      valor_orcado: document.getElementById('os-valor-orcado')?.value ? parseFloat(document.getElementById('os-valor-orcado').value) : null,
      status: 'aberta', origem: 'manual', criado_por: ME.nome
    });
    fecharModal('m-nova-os');
    toast(tr('os_criada') + numero + tr('os_criada_suffix'), 'ok');
    // Cria lead no CRM
    try { await sbPost('crm_leads', { nome: osCliSel.nome, origem: 'os_manual', status: 'lead', criado_por: ME.nome }); } catch(e) {}
    carregarOS();
    if (tarefaOrigemOS) {
      const tId = tarefaOrigemOS;
      tarefaOrigemOS = null;
      try {
        await sbPatch('tarefas?id=eq.' + tId, { os_gerada_numero: numero, os_gerada_id: novaOS?.id || null });
        const t = tarefasData.find(x => x.id === tId);
        if (t) { t.os_gerada_numero = numero; t.os_gerada_id = novaOS?.id || null; }
        renderTarefasBoard();
        if (t && novaOS?.id) {
          try {
            await sbPost('os_dias', {
              os_id: novaOS.id,
              data: t.prazo || new Date().toISOString().slice(0,10),
              tecnicos: t.tecnicos || [],
              hora_inicio: t.hora || null,
              hora_fim: t.hora_fim || null,
              observacao: t.descricao || '',
              tarefa_origem_id: t.id,
              executado: false
            });
          } catch(e2) {}
        }
      } catch(e) {}
    }
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function editarOS(id) {
  const os = osData.find(o => o.id === id);
  if (!os) return;
  document.getElementById('edit-os-id').value = id;
  document.getElementById('edit-os-titulo').value = os.titulo||'';
  const concluida = os.status === 'concluida';
  document.getElementById('edit-os-status-wrap').style.display = concluida ? 'none' : 'block';
  document.getElementById('edit-os-status-readonly').style.display = concluida ? 'flex' : 'none';
  if (!concluida) document.getElementById('edit-os-status').value = os.status||'aberta';
  editOsTecnicosSelecionados = (os.tecnicos && os.tecnicos.length) ? os.tecnicos.slice() : (os.tecnico_nome ? [os.tecnico_nome] : []);
  await garantirTecnicosAtivosCache();
  renderEditOsTecnicoChips();
  document.getElementById('edit-os-desc').value = os.descricao||'';
  // Data de abertura editável
  const dataAbertura = os.created_at ? new Date(os.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  const dataEl = document.getElementById('edit-os-data-abertura');
  if (dataEl) dataEl.value = dataAbertura;
  document.getElementById('edit-os-valor-orcado').value = os.valor_orcado != null ? os.valor_orcado : '';
  document.getElementById('edit-os-cli-info').textContent = tr('cliente_colon') + (os.cliente_nome||os.cliente||'—');
  abrirModal('m-edit-os');
}

async function salvarEditOS() {
  const id = document.getElementById('edit-os-id').value;
  const titulo = document.getElementById('edit-os-titulo').value.trim();
  if (!titulo) { toast(tr('os_titulo_obrigatorio'),'err'); return; }
  const statusEditavel = document.getElementById('edit-os-status-wrap').style.display !== 'none';
  const statusNovo = document.getElementById('edit-os-status').value;
  const body = {
    titulo,
    tecnico_nome: editOsTecnicosSelecionados.join(', ')||null,
    tecnicos: editOsTecnicosSelecionados,
    descricao: document.getElementById('edit-os-desc').value.trim()||null,
    valor_orcado: document.getElementById('edit-os-valor-orcado')?.value ? parseFloat(document.getElementById('edit-os-valor-orcado').value) : null,
    created_at: document.getElementById('edit-os-data-abertura')?.value ? new Date(document.getElementById('edit-os-data-abertura').value + 'T00:00:00').toISOString() : undefined
  };
  if (statusEditavel) body.status = statusNovo;
  try {
    await sbPatch('ordens_servico?id=eq.' + id, body);
    if (statusEditavel && statusNovo === 'concluida') {
      try { await sbPatch('tarefas?os_gerada_id=eq.' + id, { status: 'concluida' }); } catch(e2) {}
    }
    fecharModal('m-edit-os');
    toast(tr('os_atualizada'), 'ok');
    carregarOS();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function deletarOS(id, titulo) {
  if (!confirm(tr('os_deletar_confirm') + titulo + tr('os_deletar_confirm2'))) return;
  const os = osData.find(o => o.id === id);
  let apagarDrive = false;
  if (os?.drive_folder_id) {
    apagarDrive = confirm(tr('os_drive_confirm'));
  }
  try {
    if (apagarDrive) {
      if (!googleToken) {
        toast(tr('os_drive_nao_conectado_del'), 'err');
      } else {
        try {
          await fetch('https://www.googleapis.com/drive/v3/files/' + os.drive_folder_id, {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + googleToken, 'Content-Type': 'application/json' },
            body: JSON.stringify({ trashed: true })
          });
        } catch(e) { console.error(e); toast(tr('os_drive_erro_del'), 'err'); }
      }
    }
    await sbDelete('ordens_servico?id=eq.' + id);
    try { await sbPatch('tarefas?os_gerada_id=eq.' + id, { os_gerada_numero: null, os_gerada_id: null }); } catch(e2) {}
    toast(tr('os_deletada'), 'ok');
    carregarOS();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// ── GOOGLE DRIVE ──────────────────────────────────────────────
function atualizarDriveStatus(ok) {
  const el = document.getElementById('g-drive-status');
  if (!el) return;
  if (ok) { el.style.background='#f0fdf4'; el.style.borderColor='#bbf7d0'; el.style.color='#166534'; el.innerHTML=tr('drive_conectado')+' &middot; <span style="cursor:pointer;text-decoration:underline" onclick="conectarGoogle()">'+tr('drive_reconectar')+'</span>'; }
}

function conectarGoogle() {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' + GID
    + '&redirect_uri=' + encodeURIComponent(window.location.origin + window.location.pathname)
    + '&response_type=code&access_type=offline&prompt=consent'
    + '&scope=' + encodeURIComponent('https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/calendar.events');
  window.location.href = url;
}

async function trocarCodigoGoogle(code) {
  try {
    const r = await fetch(SB_URL + '/functions/v1/swift-function', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY },
      body: JSON.stringify({ code })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || tr('erro_prefix') + 'Google Drive');
    googleToken = d.access_token;
    googleTokenExpira = Date.now() + Math.max((d.expires_in || 3600) - 60, 60) * 1000;
    sessionStorage.setItem('ksh_drive_token', googleToken);
    sessionStorage.setItem('ksh_drive_token_exp', String(googleTokenExpira));
    atualizarDriveStatus(true);
    toast(d.has_refresh ? (LANG==='pt'?'Google Drive conectado! Vai continuar conectado automaticamente.':'Google Drive connected! It will stay connected automatically.') : tr('drive_conectado'), 'ok');
  } catch(e) {
    toast(tr('erro_prefix') + e.message, 'err');
  }
}

let ultimoErroDrive = null;
async function renovarTokenDrive(tentativa) {
  tentativa = tentativa || 0;
  try {
    const r = await fetch(SB_URL + '/functions/v1/swift-worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY }
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error((d && d.error) || ('HTTP ' + r.status));
    googleToken = d.access_token;
    googleTokenExpira = Date.now() + Math.max((d.expires_in || 3600) - 60, 60) * 1000;
    sessionStorage.setItem('ksh_drive_token', googleToken);
    sessionStorage.setItem('ksh_drive_token_exp', String(googleTokenExpira));
    ultimoErroDrive = null;
    return true;
  } catch(e) {
    console.error('renovarTokenDrive falhou (tentativa ' + (tentativa + 1) + '):', e);
    ultimoErroDrive = e.message || String(e);
    // Rede instável (comum em celular) pode falhar uma vez só; tenta mais 2x antes de desistir
    // e mostrar "desconectado" (o tecnico em campo nao tem como reconectar manualmente).
    if (tentativa < 2) {
      await new Promise(res => setTimeout(res, 700 * (tentativa + 1)));
      return renovarTokenDrive(tentativa + 1);
    }
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

async function getOuCriarPastaOS(osId, osObj) {
  const os = osObj || osData.find(o => o.id === osId);
  let folderId = os?.drive_folder_id;
  if (!folderId) {
    const parentId = await getPastaPortal();
    const nomeCliente = (os?.cliente_nome || os?.cliente || 'Cliente').trim();
    const nomePasta = 'OS ' + (os?.numero || osId) + ' - ' + nomeCliente;
    folderId = await criarPastaDrive(nomePasta, parentId);
    if (folderId) {
      await sbPatch('ordens_servico?id=eq.' + osId, { drive_folder_id: folderId, drive_folder_url: 'https://drive.google.com/drive/folders/' + folderId });
      if (os) os.drive_folder_id = folderId;
    }
  }
  return folderId;
}

async function uploadFotos(event, osId) {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  const conectado = await garantirTokenDrive();
  if (!conectado) { toast(tr('drive_conecte_primeiro'),'err'); return; }
  const prog = document.getElementById('upload-prog');
  if (prog) prog.style.display = 'block';
  const folderId = await getOuCriarPastaOS(osId);
  if (!folderId) toast(tr('drive_erro_pasta'), 'err');
  for (let i = 0; i < files.length; i++) {
    if (prog) prog.textContent = tr('os_enviando_progresso') + (i+1) + '/' + files.length + '...';
    try {
      const d = await uploadDrive(files[i], folderId);
      if (d?.id) {
        await sbPost('os_fotos', { os_id: osId, nome: files[i].name, drive_url: 'https://drive.google.com/file/d/'+d.id+'/view', thumb_url: d.thumbnailLink||null, enviado_por: ME.nome });
      }
    } catch(e) { console.error(e); }
  }
  if (prog) prog.style.display = 'none';
  toast(tr('fotos_enviadas'), 'ok');
  abrirOS(osId);
}

function limparTokenDrive() {
  googleToken = null;
  googleTokenExpira = 0;
  sessionStorage.removeItem('ksh_drive_token');
  sessionStorage.removeItem('ksh_drive_token_exp');
  const el = document.getElementById('g-drive-status');
  if (el) { el.style.background='#fffbeb'; el.style.borderColor='#fde68a'; el.style.color='#92400e'; el.innerHTML=bannerDriveDesconectadoHTML(); }
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

// Pasta "Racks" dentro de Portal — cria uma vez e reaproveita (cacheada na sessão)
let racksFolderId = null;
async function getPastaRacks() {
  if (racksFolderId) return racksFolderId;
  const cached = sessionStorage.getItem('ksh_racks_folder_id');
  if (cached) { racksFolderId = cached; return racksFolderId; }
  try {
    const parentId = await getPastaPortal();
    const q = encodeURIComponent("name='Racks' and mimeType='application/vnd.google-apps.folder' and trashed=false and '" + parentId + "' in parents");
    const r = await fetch('https://www.googleapis.com/drive/v3/files?q=' + q + '&fields=files(id,name)', { headers: { 'Authorization': 'Bearer ' + googleToken } });
    const d = await r.json();
    racksFolderId = (d.files && d.files[0] && d.files[0].id) || await criarPastaDrive('Racks', parentId);
  } catch(e) {
    const parentId = await getPastaPortal();
    racksFolderId = await criarPastaDrive('Racks', parentId);
  }
  if (racksFolderId) sessionStorage.setItem('ksh_racks_folder_id', racksFolderId);
  return racksFolderId;
}

async function salvarFotoOriginalRack(rackId, file) {
  try {
    const conectado = await garantirTokenDrive();
    if (!conectado) return null;
    const folderId = await getPastaRacks();
    const d = await uploadDrive(file, folderId);
    if (!d.id) return null;
    const url = 'https://drive.google.com/file/d/' + d.id + '/view';
    await sbPatch('projetos_racks?id=eq.' + rackId, { foto_original_drive_id: d.id, foto_original_drive_url: url });
    return url;
  } catch(e) { return null; }
}

// Pasta "Documentos" dentro de Portal — cria uma vez e reaproveita (cacheada na sessão)
let documentosFolderId = null;
async function getPastaDocumentos() {
  if (documentosFolderId) return documentosFolderId;
  const cached = sessionStorage.getItem('ksh_documentos_folder_id');
  if (cached) { documentosFolderId = cached; return documentosFolderId; }
  try {
    const parentId = await getPastaPortal();
    const q = encodeURIComponent("name='Documentos' and mimeType='application/vnd.google-apps.folder' and trashed=false and '" + parentId + "' in parents");
    const r = await fetch('https://www.googleapis.com/drive/v3/files?q=' + q + '&fields=files(id,name)', { headers: { 'Authorization': 'Bearer ' + googleToken } });
    const d = await r.json();
    documentosFolderId = (d.files && d.files[0] && d.files[0].id) || await criarPastaDrive('Documentos', parentId);
  } catch(e) {
    const parentId = await getPastaPortal();
    documentosFolderId = await criarPastaDrive('Documentos', parentId);
  }
  if (documentosFolderId) sessionStorage.setItem('ksh_documentos_folder_id', documentosFolderId);
  return documentosFolderId;
}

// Pasta "Plantas" dentro de Portal — cria uma vez e reaproveita (cacheada na sessão)
let plantasFolderId = null;
async function getPastaPlantas() {
  if (plantasFolderId) return plantasFolderId;
  const cached = sessionStorage.getItem('ksh_plantas_folder_id');
  if (cached) { plantasFolderId = cached; return plantasFolderId; }
  try {
    const parentId = await getPastaPortal();
    const q = encodeURIComponent("name='Plantas' and mimeType='application/vnd.google-apps.folder' and trashed=false and '" + parentId + "' in parents");
    const r = await fetch('https://www.googleapis.com/drive/v3/files?q=' + q + '&fields=files(id,name)', { headers: { 'Authorization': 'Bearer ' + googleToken } });
    const d = await r.json();
    plantasFolderId = (d.files && d.files[0] && d.files[0].id) || await criarPastaDrive('Plantas', parentId);
  } catch(e) {
    const parentId = await getPastaPortal();
    plantasFolderId = await criarPastaDrive('Plantas', parentId);
  }
  if (plantasFolderId) sessionStorage.setItem('ksh_plantas_folder_id', plantasFolderId);
  return plantasFolderId;
}

// Drive só devolve uma thumbnail pequena por padrão (=s220); pedimos uma versão maior
// pra usar como imagem de fundo da planta sem ficar borrada.
function urlImagemDriveGrande(thumbnailLink) {
  if (!thumbnailLink) return null;
  return thumbnailLink.replace(/=s\d+$/, '=s1600');
}

// Renderiza a 1a pagina de um PDF como PNG (usado pra transformar a planta em PDF
// numa imagem de fundo sobre a qual dá pra posicionar os marcadores de dispositivo).
async function renderizarPdfComoPngFile(file, nomeBase) {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  const page = await pdf.getPage(1);
  const base = page.getViewport({ scale: 1 });
  const scale = Math.max(0.1, Math.min(2200 / base.width, 2200 / base.height, 3));
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.92));
  return new File([blob], (nomeBase || 'planta').replace(/[^a-z0-9 _-]/gi, '') + '.png', { type: 'image/png' });
}


// ── DOCUMENTOS ────────────────────────────────────────────────
const DOC_CATEGORIA_COR = {
  licenca: { c: '#1d4ed8', bg: '#eff6ff' },
  seguro: { c: '#7c3aed', bg: '#f5f3ff' },
  alvara: { c: '#c2410c', bg: '#fff7ed' },
  manual: { c: '#166534', bg: '#f0fdf4' },
  tecnico: { c: '#0f766e', bg: '#f0fdfa' },
  registro: { c: '#be123c', bg: '#fff1f2' },
  outro: { c: '#555', bg: '#f5f5f3' }
};
const DOC_CATEGORIAS = ['licenca', 'seguro', 'alvara', 'manual', 'tecnico', 'registro', 'outro'];

let documentosData = [];
let docFiltroCategoria = 'todos';
let ndocArquivoFile = null;

function fmtDataBR(str) {
  if (!str) return '';
  const p = String(str).slice(0, 10).split('-');
  if (p.length !== 3) return str;
  return p[2] + '/' + p[1] + '/' + p[0];
}

function diasParaValidade(dataStr) {
  if (!dataStr) return null;
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const [y, m, d] = String(dataStr).slice(0,10).split('-').map(Number);
  const alvo = new Date(y, m - 1, d);
  return Math.round((alvo - hoje) / 86400000);
}

async function renderDocumentos() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    documentosData = await sbGet('documentos?order=criado_em.desc');
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }
  docFiltroCategoria = 'todos';
  el.innerHTML = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px" id="doc-filtros"></div>'
    + '<div id="doc-alerta" style="margin-bottom:14px"></div>'
    + '<div id="doc-grid"></div>';
  renderDocumentosGrid();
}

function renderDocumentosGrid() {
  const filtrosEl = document.getElementById('doc-filtros');
  const alertaEl = document.getElementById('doc-alerta');
  const gridEl = document.getElementById('doc-grid');
  if (!filtrosEl || !gridEl) return;

  filtrosEl.innerHTML = '<button onclick="docFiltrar(\'todos\')" style="padding:6px 14px;border-radius:99px;font-size:11px;cursor:pointer;border:1px solid ' + (docFiltroCategoria==='todos'?'#111':'#e8e8e5') + ';background:' + (docFiltroCategoria==='todos'?'#111':'#fff') + ';color:' + (docFiltroCategoria==='todos'?'#fff':'#555') + '">' + tr('doc_filtro_todos') + '</button>'
    + DOC_CATEGORIAS.map(cat => {
        const ativo = docFiltroCategoria === cat;
        const cor = DOC_CATEGORIA_COR[cat];
        return '<button onclick="docFiltrar(\'' + cat + '\')" style="padding:6px 14px;border-radius:99px;font-size:11px;cursor:pointer;border:1px solid ' + (ativo?cor.c:'#e8e8e5') + ';background:' + (ativo?cor.bg:'#fff') + ';color:' + (ativo?cor.c:'#555') + '">' + tr('cat_' + cat) + '</button>';
      }).join('');

  const vencidos = documentosData.filter(d => { const dd = diasParaValidade(d.data_validade); return dd !== null && dd < 0; });
  const vencendo = documentosData.filter(d => { const dd = diasParaValidade(d.data_validade); return dd !== null && dd >= 0 && dd <= 30; });
  if (vencidos.length || vencendo.length) {
    const partes = [];
    if (vencidos.length) partes.push(vencidos.length + ' ' + (LANG==='pt' ? (vencidos.length>1?'vencidos':'vencido') : (vencidos.length>1?'expired':'expired')));
    if (vencendo.length) partes.push(vencendo.length + ' ' + (LANG==='pt' ? 'vencendo nos próximos 30 dias' : 'expiring in the next 30 days'));
    alertaEl.innerHTML = '<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:8px;font-size:12px;color:#92400e">⚠️ ' + partes.join(' · ') + '</div>';
  } else {
    alertaEl.innerHTML = '';
  }

  const lista = docFiltroCategoria === 'todos' ? documentosData : documentosData.filter(d => (d.categoria || 'outro') === docFiltroCategoria);
  if (!lista.length) {
    gridEl.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('doc_none_found') + '</div>';
    return;
  }
  gridEl.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px">'
    + lista.map(documentoCardHTML).join('')
    + '</div>';
}

function docFiltrar(cat) { docFiltroCategoria = cat; renderDocumentosGrid(); }

function documentoCardHTML(d) {
  const cor = DOC_CATEGORIA_COR[d.categoria || 'outro'] || DOC_CATEGORIA_COR.outro;
  const dd = diasParaValidade(d.data_validade);
  let validadeHTML;
  if (dd === null) {
    validadeHTML = '<div style="font-size:11px;color:#bbb">' + tr('doc_sem_validade') + '</div>';
  } else if (dd < 0) {
    validadeHTML = '<div style="display:inline-flex;align-items:center;gap:5px;background:#fef2f2;border-radius:6px;padding:3px 8px;font-size:11px;color:#991b1b;font-weight:600">' + (LANG==='pt' ? 'Venceu em ' : 'Expired on ') + fmtDataBR(d.data_validade) + '</div>';
  } else if (dd <= 30) {
    validadeHTML = '<div style="display:inline-flex;align-items:center;gap:5px;background:#fffbeb;border-radius:6px;padding:3px 8px;font-size:11px;color:#92400e;font-weight:600">' + (LANG==='pt' ? ('Vence em ' + dd + ' dias') : ('Expires in ' + dd + ' days')) + '</div>';
  } else {
    validadeHTML = '<div style="font-size:11px;color:#888">' + (LANG==='pt' ? 'Válido até ' : 'Valid until ') + fmtDataBR(d.data_validade) + '</div>';
  }
  return '<div style="background:#fff;border:1px solid #e8e8e5;border-radius:12px;padding:14px">'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">'
    + '<span style="font-size:10px;padding:2px 8px;border-radius:6px;background:' + cor.bg + ';color:' + cor.c + '">' + tr('cat_' + (d.categoria||'outro')) + '</span>'
    + '</div>'
    + '<div style="font-size:13px;font-weight:600;margin-bottom:2px">' + (d.titulo || '—') + '</div>'
    + '<div style="font-size:11px;color:#888;margin-bottom:8px">' + [d.orgao_emissor, d.numero_documento].filter(Boolean).join(' · ') + '</div>'
    + validadeHTML
    + '<div style="display:flex;gap:6px;margin-top:12px;border-top:1px solid #f0f0ee;padding-top:10px">'
    + (d.arquivo_drive_url ? '<a href="' + d.arquivo_drive_url + '" target="_blank" style="flex:1;text-align:center;font-size:11px;padding:5px;border:1px solid #e8e8e5;border-radius:6px;color:#333;text-decoration:none">' + tr('doc_abrir') + '</a>' : '<span style="flex:1"></span>')
    + '<button onclick="abrirEditarDocumento(\'' + d.id + '\')" style="font-size:11px;padding:5px 9px;border:1px solid #e8e8e5;border-radius:6px;background:#fff;cursor:pointer;color:#555">✎</button>'
    + '<button onclick="excluirDocumento(\'' + d.id + '\')" style="font-size:11px;padding:5px 9px;border:1px solid #e8e8e5;border-radius:6px;background:#fff;cursor:pointer;color:#999">×</button>'
    + '</div></div>';
}

function abrirNovoDocumento() {
  document.getElementById('nd2-modal-title').textContent = tr('doc_novo_title');
  document.getElementById('nd2-modal-btn').textContent = tr('btn_novo_documento');
  document.getElementById('nd2-doc-id').value = '';
  document.getElementById('nd2-arquivo-drive-id').value = '';
  document.getElementById('nd2-arquivo-drive-url').value = '';
  document.getElementById('nd2-titulo').value = '';
  document.getElementById('nd2-categoria').value = 'outro';
  document.getElementById('nd2-orgao').value = '';
  document.getElementById('nd2-numero').value = '';
  document.getElementById('nd2-data-emissao').value = '';
  document.getElementById('nd2-data-validade').value = '';
  document.getElementById('nd2-observacoes').value = '';
  document.getElementById('nd2-arquivo-nome').textContent = '';
  document.getElementById('nd2-ia-status').style.display = 'none';
  const btnIA0 = document.getElementById('nd2-preencher-ia-btn');
  if (btnIA0) { btnIA0.disabled = true; btnIA0.style.color = '#999'; btnIA0.style.background = '#f5f5f3'; }
  ndocArquivoFile = null;
  abrirModal('m-documento');
}

async function abrirEditarDocumento(id) {
  try {
    const d = documentosData.find(x => x.id === id) || (await sbGet('documentos?id=eq.' + id))[0];
    if (!d) return;
    document.getElementById('nd2-modal-title').textContent = tr('doc_editar_title');
    document.getElementById('nd2-modal-btn').textContent = tr('btn_salvar');
    document.getElementById('nd2-doc-id').value = d.id;
    document.getElementById('nd2-arquivo-drive-id').value = d.arquivo_drive_id || '';
    document.getElementById('nd2-arquivo-drive-url').value = d.arquivo_drive_url || '';
    document.getElementById('nd2-titulo').value = d.titulo || '';
    document.getElementById('nd2-categoria').value = d.categoria || 'outro';
    document.getElementById('nd2-orgao').value = d.orgao_emissor || '';
    document.getElementById('nd2-numero').value = d.numero_documento || '';
    document.getElementById('nd2-data-emissao').value = d.data_emissao || '';
    document.getElementById('nd2-data-validade').value = d.data_validade || '';
    document.getElementById('nd2-observacoes').value = d.observacoes || '';
    document.getElementById('nd2-arquivo-nome').textContent = d.arquivo_drive_url ? tr('doc_arquivo_ja_anexado') : '';
    document.getElementById('nd2-ia-status').style.display = 'none';
    const btnIA1 = document.getElementById('nd2-preencher-ia-btn');
    if (btnIA1) { btnIA1.disabled = true; btnIA1.style.color = '#999'; btnIA1.style.background = '#f5f5f3'; }
    ndocArquivoFile = null;
    abrirModal('m-documento');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function selecionarArquivoDocumento(event) {
  const file = event.target.files[0];
  if (!file) return;
  ndocArquivoFile = file;
  document.getElementById('nd2-arquivo-nome').textContent = file.name;
  const btnIA = document.getElementById('nd2-preencher-ia-btn');
  const statusEl = document.getElementById('nd2-ia-status');
  if (file.type && file.type.startsWith('image/')) {
    if (btnIA) { btnIA.disabled = false; btnIA.style.color = '#333'; btnIA.style.background = '#fff'; }
    if (statusEl) statusEl.style.display = 'none';
  } else {
    if (btnIA) { btnIA.disabled = true; btnIA.style.color = '#999'; btnIA.style.background = '#f5f5f3'; }
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#92400e'; statusEl.textContent = tr('doc_ia_disponivel_apenas_foto'); }
  }
}

async function preencherDocumentoComIA() {
  if (!ndocArquivoFile) return;
  const btn = document.getElementById('nd2-preencher-ia-btn');
  const statusEl = document.getElementById('nd2-ia-status');
  if (btn) btn.disabled = true;
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#555'; statusEl.textContent = tr('doc_ia_lendo'); }
  try {
    // Garante que o token ainda é válido antes de chamar a Edge Function
    await garantirSessao();
    const imagem_base64 = await blobParaBase64(ndocArquivoFile);
    const r = await fetch(SB_URL + '/functions/v1/extrair-documento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ imagem_base64, mime_type: ndocArquivoFile.type || 'image/jpeg' })
    });
    const d = await r.json();
    console.log('[extrair-documento] resposta da IA:', d);
    if (!r.ok) throw new Error(d.error || 'Erro');
    if (d.titulo) document.getElementById('nd2-titulo').value = d.titulo;
    if (d.categoria) document.getElementById('nd2-categoria').value = d.categoria;
    if (d.orgao_emissor) document.getElementById('nd2-orgao').value = d.orgao_emissor;
    if (d.numero_documento) document.getElementById('nd2-numero').value = d.numero_documento;
    if (d.data_emissao) document.getElementById('nd2-data-emissao').value = d.data_emissao;
    if (d.data_validade) document.getElementById('nd2-data-validade').value = d.data_validade;
    const nadaEncontrado = !d.titulo && !d.orgao_emissor && !d.numero_documento && !d.data_emissao && !d.data_validade;
    if (nadaEncontrado) {
      if (statusEl) {
        statusEl.style.display = 'block'; statusEl.style.color = '#92400e';
        statusEl.innerHTML = tr('doc_ia_vazio') + '<br><span style="font-size:9px;color:#999;word-break:break-all;user-select:text">' + JSON.stringify(d).replace(/</g,'&lt;') + '</span>';
      }
      toast(tr('doc_ia_vazio'), 'err');
    } else {
      if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#166534'; statusEl.textContent = tr('doc_ia_sucesso'); }
      toast(tr('doc_ia_sucesso'), 'ok');
    }
  } catch(e) {
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('doc_ia_erro') + (e.message ? ' (' + e.message + ')' : ''); }
    toast(tr('erro_prefix') + e.message, 'err');
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function salvarDocumento() {
  const docId = document.getElementById('nd2-doc-id').value;
  const titulo = document.getElementById('nd2-titulo')?.value.trim();
  if (!titulo) { toast(tr('doc_titulo_obrigatorio'), 'err'); return; }
  const body = {
    titulo,
    categoria: document.getElementById('nd2-categoria')?.value || 'outro',
    orgao_emissor: document.getElementById('nd2-orgao')?.value.trim() || '',
    numero_documento: document.getElementById('nd2-numero')?.value.trim() || '',
    data_emissao: document.getElementById('nd2-data-emissao')?.value || null,
    data_validade: document.getElementById('nd2-data-validade')?.value || null,
    observacoes: document.getElementById('nd2-observacoes')?.value.trim() || ''
  };

  const btn = document.getElementById('nd2-modal-btn');
  if (btn) { btn.disabled = true; btn.textContent = tr('os_gerando'); }

  try {
    if (ndocArquivoFile) {
      const conectado = await garantirTokenDrive();
      if (conectado) {
        const folderId = await getPastaDocumentos();
        const up = await uploadDrive(ndocArquivoFile, folderId);
        if (up?.id) {
          body.arquivo_drive_id = up.id;
          body.arquivo_drive_url = 'https://drive.google.com/file/d/' + up.id + '/view';
        }
      } else {
        toast(tr('drive_conecte_primeiro'), 'err');
      }
    }

    if (docId) {
      await sbPatch('documentos?id=eq.' + docId, body);
    } else {
      body.criado_por = ME.nome;
      await sbPost('documentos', body);
    }
    fecharModal('m-documento');
    toast(tr('doc_salvo'), 'ok');
    renderDocumentos();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
  finally { if (btn) { btn.disabled = false; btn.textContent = docId ? tr('btn_salvar') : tr('btn_novo_documento'); } }
}

async function excluirDocumento(id) {
  if (!confirm(tr('doc_excluir_confirm'))) return;
  try {
    const doc = documentosData.find(d => d.id === id);
    const driveId = doc?.arquivo_drive_id || null;
    await sbDelete('documentos?id=eq.' + id);
    if (driveId && googleToken) {
      try {
        await fetch('https://www.googleapis.com/drive/v3/files/' + driveId, {
          method: 'PATCH',
          headers: { 'Authorization': 'Bearer ' + googleToken, 'Content-Type': 'application/json' },
          body: JSON.stringify({ trashed: true })
        });
      } catch(e2) {}
    }
    toast(tr('doc_excluido'), 'ok');
    renderDocumentos();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}


// ── CATALOGO (Materiais e Mão de obra) ─────────────────────────
let catalogoData = [];
let catFiltroTipo = 'todos';
let catFiltroBusca = '';

async function renderCadastros() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    catalogoData = await sbGet('catalogo_itens?order=nome');
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }
  catFiltroTipo = 'todos';
  catFiltroBusca = '';
  el.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">'
    + '<input id="cat-busca" placeholder="' + tr('cat_busca_ph') + '" style="flex:1;min-width:180px;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" oninput="catFiltrar()">'
    + '<div id="cat-filtro-tipo" style="display:flex;gap:6px"></div>'
    + '</div>'
    + '<div id="cat-tbody-wrap"></div>';
  document.getElementById('cat-filtro-tipo').innerHTML = ['todos','material','mao_obra'].map(v =>
    chipTecnicoHTML(v, v==='todos'?tr('cat_filtro_todos'):(v==='material'?tr('cat_tipo_material'):tr('cat_tipo_mao_obra')), catFiltroTipo===v, 'catTogglefiltroTipo')
  ).join('');
  catFiltrar();
}

function catTogglefiltroTipo(v) { catFiltroTipo = v; catFiltrar(); }

function catFiltrar() {
  catFiltroBusca = (document.getElementById('cat-busca')?.value || '').toLowerCase();
  const lista = catalogoData.filter(c => {
    if (catFiltroTipo !== 'todos' && c.tipo !== catFiltroTipo) return false;
    if (catFiltroBusca && !((c.nome||'').toLowerCase().includes(catFiltroBusca) || (c.descricao||'').toLowerCase().includes(catFiltroBusca))) return false;
    return true;
  });
  renderTabelaCatalogo(lista);
}

function renderTabelaCatalogo(lista) {
  const wrap = document.getElementById('cat-tbody-wrap');
  if (!wrap) return;
  if (!lista.length) { wrap.innerHTML = '<div style="text-align:center;color:#bbb;font-size:12px;padding:30px">' + tr('cat_none_found') + '</div>'; return; }
  wrap.innerHTML = '<div class="tbl-wrap"><table class="tbl">'
    + '<thead><tr>'
      + '<th>' + tr('cat_th_nome') + '</th>'
      + '<th>' + tr('cat_th_tipo') + '</th>'
      + '<th>' + tr('cat_th_unidade') + '</th>'
      + '<th>' + tr('cat_th_preco') + '</th>'
      + '<th>' + tr('clientes_th_status') + '</th>'
      + '<th>' + tr('clientes_th_acoes') + '</th>'
    + '</tr></thead><tbody>'
    + lista.map(c => '<tr>'
        + '<td style="font-weight:500">' + c.nome + (c.descricao ? '<div style="font-size:11px;color:#888;font-weight:400">' + c.descricao + '</div>' : '') + '</td>'
        + '<td><span style="font-size:10px;padding:2px 8px;border-radius:99px;background:' + (c.tipo === 'material' ? '#eff6ff' : '#fffbeb') + ';color:' + (c.tipo === 'material' ? '#1d4ed8' : '#92400e') + '">' + (c.tipo === 'material' ? tr('cat_tipo_material') : tr('cat_tipo_mao_obra')) + '</span></td>'
        + '<td>' + (c.unidade || '—') + '</td>'
        + '<td>$' + Number(c.preco_venda || 0).toFixed(2) + '</td>'
        + '<td><span style="font-size:10px;padding:2px 8px;border-radius:99px;background:' + (c.ativo ? '#f0fdf4' : '#f5f5f3') + ';color:' + (c.ativo ? '#166534' : '#888') + '">' + (c.ativo ? tr('cliente_status_ativo') : tr('cliente_status_inativo')) + '</span></td>'
        + '<td style="display:flex;gap:6px">'
          + '<button onclick="abrirEditarCatalogoItem(\'' + c.id + '\')" style="padding:3px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit">' + tr('btn_editar') + '</button>'
          + '<button onclick="excluirCatalogoItem(\'' + c.id + '\')" style="padding:3px 10px;border:1px solid #fecaca;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;color:#dc2626;font-family:inherit">' + tr('orc_excluir') + '</button>'
        + '</td>'
      + '</tr>').join('')
    + '</tbody></table></div>';
}

function abrirNovoCatalogoItem() {
  document.getElementById('cat-item-id').value = '';
  document.getElementById('cat-item-nome').value = '';
  document.getElementById('cat-item-descricao').value = '';
  document.getElementById('cat-item-unidade').value = '';
  document.getElementById('cat-item-preco').value = '';
  document.getElementById('cat-item-tipo').value = 'material';
  document.getElementById('cat-item-ativo').checked = true;
  document.getElementById('m-cat-item').querySelector('.modal-hd-title').textContent = tr('cat_novo_title');
  const btn = document.getElementById('m-cat-item').querySelector('.btn-pri');
  btn.textContent = tr('btn_cadastrar');
  btn.onclick = salvarCatalogoItem;
  abrirModal('m-cat-item');
}

function abrirEditarCatalogoItem(id) {
  const c = catalogoData.find(x => x.id === id);
  if (!c) return;
  document.getElementById('cat-item-id').value = c.id;
  document.getElementById('cat-item-nome').value = c.nome || '';
  document.getElementById('cat-item-descricao').value = c.descricao || '';
  document.getElementById('cat-item-unidade').value = c.unidade || '';
  document.getElementById('cat-item-preco').value = c.preco_venda != null ? c.preco_venda : '';
  document.getElementById('cat-item-tipo').value = c.tipo || 'material';
  document.getElementById('cat-item-ativo').checked = c.ativo !== false;
  document.getElementById('m-cat-item').querySelector('.modal-hd-title').textContent = tr('cat_editar_title');
  const btn = document.getElementById('m-cat-item').querySelector('.btn-pri');
  btn.textContent = tr('btn_salvar');
  btn.onclick = salvarCatalogoItem;
  abrirModal('m-cat-item');
}

// ── Normalizacao padrao de nomes do catalogo (Materiais/Mao de obra) ──
// Regra: iniciais maiusculas e restante minusculo em cada palavra; tokens com
// numero (codigo/numero de serie, ex: "C4-FP1-C-BL") ficam todo em maiuscula;
// siglas tecnicas conhecidas (TV, LED, HDMI...) tambem ficam sempre maiuscula;
// excecao: nomes de marca como "Control4" nao viram tudo maiusculo.
const CAT_ACRONIMOS = new Set([
  'TV','LED','HDMI','DVR','NVR','UPS','WIFI','IP','POE','AV','IR','RGB','USB',
  'LAN','WAN','VLAN','PVC','EMT','GFCI','HVAC','AC','DC','VOIP','SIP','RF',
  'UHD','HD','AI','NFC','BLE','GPS','PTZ','NAS','SSD','HDD','RAM','CPU','GPU',
  'LCD','OLED','QLED','CCTV','ADA','UL','ETL','FCC','ROHS','AM','FM','XLR',
  'HDBASET','SATA','PCB','LTE','5G','4G','OS','ID','PIN','QR',
  'THX','DTS','AOC','JBL','ELAN','RTI','KNX','DMX','PDU'
]);
const CAT_MARCAS = { 'control4': 'Control4' };

function normalizarTokenItem(tok) {
  if (!tok) return tok;
  const m = tok.match(/^(.*?)([®©™]*)$/);
  const core = m ? m[1] : tok;
  const suffix = m ? m[2] : '';
  if (CAT_MARCAS[core.toLowerCase()]) return CAT_MARCAS[core.toLowerCase()] + suffix;
  if (/[0-9]/.test(tok)) return tok.toUpperCase();
  if (CAT_ACRONIMOS.has(tok.toUpperCase())) return tok.toUpperCase();
  return tok.charAt(0).toUpperCase() + tok.slice(1).toLowerCase();
}

function normalizarSubpalavraItem(word) {
  return word.split(/([\-:/])/).map(p => (p === '-' || p === ':' || p === '/') ? p : normalizarTokenItem(p)).join('');
}

function normalizarNomeItem(nome) {
  if (!nome) return nome;
  return nome.trim().replace(/\s+/g, ' ').split(' ').map(normalizarSubpalavraItem).join(' ');
}

async function salvarCatalogoItem() {
  const id = document.getElementById('cat-item-id').value;
  const nome = normalizarNomeItem(document.getElementById('cat-item-nome')?.value.trim());
  if (!nome) { toast(tr('cat_nome_obrigatorio'), 'err'); return; }
  const body = {
    nome,
    tipo: document.getElementById('cat-item-tipo')?.value || 'material',
    descricao: document.getElementById('cat-item-descricao')?.value.trim() || '',
    unidade: document.getElementById('cat-item-unidade')?.value.trim() || '',
    preco_venda: parseFloat(document.getElementById('cat-item-preco')?.value) || 0,
    ativo: document.getElementById('cat-item-ativo')?.checked !== false,
    atualizado_em: new Date().toISOString()
  };
  try {
    if (id) await sbPatch('catalogo_itens?id=eq.' + id, body);
    else await sbPost('catalogo_itens', body);
    fecharModal('m-cat-item');
    toast(tr('cat_salvo'), 'ok');
    renderCadastros();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirCatalogoItem(id) {
  if (!confirm(tr('cat_excluir_confirm'))) return;
  try {
    await sbDelete('catalogo_itens?id=eq.' + id);
    toast(tr('cat_excluido'), 'ok');
    renderCadastros();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// ── PROJETOS > RACK ──────────────────────────────────────────────
let racksData = [];
let rackEditandoId = null;
let rackAtual = null;
let rackItemSlotAlvo = null;
let rackDrag = null;

const RACK_CORES = [
  { fill: '#0C447C', text: '#B5D4F4' },
  { fill: '#085041', text: '#9FE1CB' },
  { fill: '#3C3489', text: '#CECBF6' },
  { fill: '#712B13', text: '#F5C4B3' },
  { fill: '#72243E', text: '#F4C0D1' },
  { fill: '#633806', text: '#FAC775' }
];
const RACK_ROW_H = 24;

async function renderRacks() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    racksData = await sbGet('projetos_racks?order=criado_em.desc');
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }
  if (!racksData.length) {
    el.innerHTML = '<div style="text-align:center;color:#bbb;font-size:12px;padding:40px">' + tr('rack_none_found') + '</div>';
    return;
  }
  el.innerHTML = '<div class="tbl-wrap"><table class="tbl" style="min-width:0"><thead><tr>'
    + '<th>' + tr('rack_th_nome') + '</th>'
    + '<th>' + tr('rack_th_tamanho') + '</th>'
    + '<th class="rack-th-criado">' + tr('rack_th_criado') + '</th>'
    + '<th></th>'
    + '</tr></thead><tbody>'
    + racksData.map(r => '<tr onclick="abrirEditorRack(\'' + r.id + '\')" style="cursor:pointer">'
        + '<td style="font-weight:500">' + r.nome + '</td>'
        + '<td>' + r.tamanho_u + 'U</td>'
        + '<td class="rack-th-criado">' + new Date(r.criado_em).toLocaleDateString(LANG === 'pt' ? 'pt-BR' : 'en-US') + '</td>'
        + '<td style="text-align:right">'
          + '<button onclick="event.stopPropagation();excluirRack(\'' + r.id + '\')" style="padding:3px 10px;border:1px solid #fecaca;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;color:#dc2626;font-family:inherit">' + tr('orc_excluir') + '</button>'
        + '</td>'
      + '</tr>').join('')
    + '</tbody></table></div>';
}

function abrirNovoRack() {
  document.getElementById('rack-nome').value = '';
  const sel = document.getElementById('rack-tamanho');
  if (!sel.options.length) {
    for (let n = 1; n <= 60; n++) {
      const o = document.createElement('option');
      o.value = n; o.textContent = n + 'U';
      if (n === 21) o.selected = true;
      sel.appendChild(o);
    }
  } else {
    sel.value = '21';
  }
  rackNovaFotoFile = null;
  const fotoNomeEl = document.getElementById('rack-nova-foto-nome');
  if (fotoNomeEl) fotoNomeEl.textContent = '';
  const fotoInputEl = document.getElementById('rack-nova-foto-input');
  if (fotoInputEl) fotoInputEl.value = '';
  const lerBtn = document.getElementById('rack-nova-ler-ia-btn');
  if (lerBtn) { lerBtn.style.display = 'none'; lerBtn.disabled = false; }
  const statusEl = document.getElementById('rack-nova-ia-status');
  if (statusEl) statusEl.style.display = 'none';
  abrirModal('m-novo-rack');
}

async function salvarNovoRack() {
  const nome = document.getElementById('rack-nome')?.value.trim();
  if (!nome) { toast(tr('rack_nome_obrigatorio'), 'err'); return; }
  const tamanho = parseInt(document.getElementById('rack-tamanho')?.value, 10) || 21;
  try {
    await sbPost('projetos_racks', { nome, tamanho_u: tamanho, criado_por: ME.nome });
    fecharModal('m-novo-rack');
    toast(tr('rack_salvo'), 'ok');
    renderRacks();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirRack(id) {
  if (!confirm(tr('rack_excluir_confirm'))) return;
  try {
    const r = racksData.find(x => x.id === id);
    if (r && r.foto_original_drive_id) {
      try {
        const conectado = await garantirTokenDrive();
        if (conectado) {
          await fetch('https://www.googleapis.com/drive/v3/files/' + r.foto_original_drive_id, {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + googleToken, 'Content-Type': 'application/json' },
            body: JSON.stringify({ trashed: true })
          });
        }
      } catch(e) {}
    }
    await sbDelete('projetos_racks?id=eq.' + id);
    toast(tr('rack_excluido'), 'ok');
    renderRacks();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function abrirPreviewRackDaOS(rackId) {
  try {
    const rows = await sbGet('projetos_racks?id=eq.' + rackId);
    const r = rows[0];
    if (!r) { toast(tr('rack_nao_encontrado'), 'err'); return; }
    let itens = [];
    try { itens = await sbGet('projetos_rack_itens?rack_id=eq.' + rackId + '&order=ordem.asc'); } catch(e) {}
    document.getElementById('rack-preview-titulo').textContent = r.nome;
    document.getElementById('rack-preview-nome').textContent = r.nome + ' — ' + r.tamanho_u + 'U';
    const trilho = gerarRailHtml(r.tamanho_u);
    document.getElementById('rack-preview-rail-l').innerHTML = trilho;
    document.getElementById('rack-preview-rail-r').innerHTML = trilho;
    const occupied = construirOcupacao(itens);
    renderRackFrame(document.getElementById('rack-preview-body'), r.tamanho_u, occupied, { interativo: false });
    const abrirBtn = document.getElementById('rack-preview-abrir-btn');
    abrirBtn.onclick = function () { fecharModal('m-rack-preview'); abrirRackDaOS(rackId); };
    abrirModal('m-rack-preview');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function abrirRackDaOS(rackId) {
  fecharOSDetalhe();
  goPage(null, 'projetos-rack', 'Rack', 'Projetos');
  try {
    const rows = await sbGet('projetos_racks?id=eq.' + rackId);
    const r = rows[0];
    if (!r) { toast(tr('rack_nao_encontrado'), 'err'); return; }
    if (!racksData.find(x => x.id === rackId)) racksData.push(r);
    rackEditandoId = rackId;
    let itens = [];
    try { itens = await sbGet('projetos_rack_itens?rack_id=eq.' + rackId + '&order=ordem.asc'); } catch(e) {}
    rackAtual = { ...r, itens };
    document.getElementById('rack-editor-titulo').textContent = r.nome;
    renderRackEditor();
    abrirModal('m-rack-editor');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function abrirEditorRack(id) {
  const r = racksData.find(x => x.id === id);
  if (!r) return;
  rackEditandoId = id;
  let itens = [];
  try { itens = await sbGet('projetos_rack_itens?rack_id=eq.' + id + '&order=ordem.asc'); } catch(e) {}
  rackAtual = { ...r, itens };
  document.getElementById('rack-editor-titulo').textContent = r.nome;
  renderRackEditor();
  abrirModal('m-rack-editor');
}

function gerarRailHtml(size) {
  let html = '';
  for (let n = 1; n <= size; n++) {
    html += '<div style="height:' + RACK_ROW_H + 'px;display:flex;align-items:center;justify-content:center;font-size:8px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:#55554f">' + n + '</div>';
  }
  return html;
}

function construirOcupacao(itens) {
  const occupied = {};
  itens.forEach(it => {
    const bottomU = it.u_inicio + it.u_altura - 1;
    for (let u = it.u_inicio; u <= bottomU; u++) occupied[u] = it;
  });
  return occupied;
}

function renderRackFrame(bodyEl, size, occupied, opts) {
  bodyEl.innerHTML = '';
  let u = 1;
  let stripe = 0;
  while (u <= size) {
    const item = occupied[u];
    if (item) {
      const bottomU = item.u_inicio + item.u_altura - 1;
      const cor = RACK_CORES[(item.cor_idx || 0) % RACK_CORES.length];
      const label = 'U' + item.u_inicio + (item.u_altura > 1 ? '-U' + bottomU : '');
      const div = document.createElement('div');
      const ledCor = cor.fill;
      const aparencia = item.sugerido
        ? ';background:transparent;border:1px dashed ' + ledCor + ';color:' + ledCor
        : ';background:#1a1a17;border:1px solid #2c2c28;color:#d8d8d2';
      div.style.cssText = 'height:' + (item.u_altura * RACK_ROW_H - 2) + 'px;margin:1px 2px;border-radius:3px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;font-size:11.5px;font-weight:500;gap:6px' + aparencia + (opts.interativo ? ';cursor:pointer' : '');
      const textoCompleto = label + ' — ' + item.nome + (item.observacoes ? ' (' + item.observacoes + ')' : '');
      const ledDot = '<span aria-hidden="true" style="width:5px;height:5px;border-radius:50%;background:' + ledCor + ';flex-shrink:0;display:inline-block"></span>';
      div.innerHTML = '<span style="flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">' + label + ' &mdash; ' + item.nome + (item.sugerido ? ' <span style="opacity:.7;font-weight:400">(sugestão)</span>' : '') + '</span>' + (item.observacoes ? '<span aria-hidden="true" style="opacity:.75;flex-shrink:0">&#128221;</span>' : '') + ledDot + (opts.interativo ? '<span class="rack-item-x" aria-hidden="true" style="opacity:.7;padding:2px 4px;flex-shrink:0">&times;</span>' : '');
      div.title = textoCompleto;
      if (opts.interativo && !item.sugerido) {
        div.style.position = 'relative';
        div.style.touchAction = 'none';
        div.onpointerdown = function (e) { iniciarDragRack(e, item, 'mover'); };
        const xSpan = div.querySelector('.rack-item-x');
        if (xSpan) {
          xSpan.onpointerdown = function (e) { e.stopPropagation(); };
          xSpan.onclick = function (e) { e.stopPropagation(); removerItemRack(item.id); };
        }
        const alca = document.createElement('div');
        alca.title = tr('rack_arrastar_redimensionar');
        alca.style.cssText = 'position:absolute;left:4px;right:4px;bottom:-4px;height:12px;cursor:ns-resize;touch-action:none';
        alca.onpointerdown = function (e) { e.stopPropagation(); iniciarDragRack(e, item, 'redimensionar'); };
        div.appendChild(alca);
      }
      bodyEl.appendChild(div);
      u += item.u_altura;
      continue;
    }
    let count = 0;
    let scanU = u;
    while (scanU <= size && !occupied[scanU]) { count++; scanU++; }
    const topFree = u;
    const bottomFree = u + count - 1;
    const div = document.createElement('div');
    const bg = stripe % 2 === 0 ? '#232320' : '#1c1c1a';
    div.style.cssText = 'height:' + (count * RACK_ROW_H - 2) + 'px;margin:1px 2px;border-radius:3px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:#6b6b66;background:' + bg + (opts.interativo ? ';cursor:pointer' : '');
    div.textContent = count === 1
      ? ('U' + topFree + ' — ' + tr('rack_espaco_livre'))
      : ('U' + topFree + '-U' + bottomFree + ' — ' + tr('rack_espaco_livre') + ' (' + count + ' ' + tr('rack_u_expansao') + ')');
    if (opts.interativo) div.onclick = function () { abrirNovoItemRack(topFree, count); };
    bodyEl.appendChild(div);
    stripe++;
    u = bottomFree + 1;
  }
}

function iniciarDragRack(e, item, tipo) {
  if (!rackAtual) return;
  e.preventDefault();
  const posOriginais = {};
  rackAtual.itens.forEach(it => { posOriginais[it.id] = { u_inicio: it.u_inicio, u_altura: it.u_altura }; });
  rackDrag = {
    tipo: tipo,
    itemId: item.id,
    uInicioOrig: item.u_inicio,
    uAlturaOrig: item.u_altura,
    startY: e.clientY,
    posOriginais: posOriginais,
    moveu: false
  };
  document.body.style.userSelect = 'none';
  document.addEventListener('pointermove', moverDragRack);
  document.addEventListener('pointerup', finalizarDragRack);
  document.addEventListener('pointercancel', finalizarDragRack);
}

function renderRackFrameAtual() {
  if (!rackAtual) return;
  const occupied = construirOcupacao(rackAtual.itens);
  renderRackFrame(document.getElementById('rack-body'), rackAtual.tamanho_u, occupied, { interativo: true });
}

function moverDragRack(e) {
  if (!rackDrag || !rackAtual) return;
  const item = rackAtual.itens.find(it => it.id === rackDrag.itemId);
  if (!item) return;
  const deltaY = e.clientY - rackDrag.startY;
  if (Math.abs(deltaY) > 3) rackDrag.moveu = true;
  const deltaU = Math.round(deltaY / RACK_ROW_H);
  const posOriginais = rackDrag.posOriginais;

  if (rackDrag.tipo === 'mover') {
    const origU = rackDrag.uInicioOrig;
    const altura = rackDrag.uAlturaOrig;
    let novoInicio = origU + deltaU;
    novoInicio = Math.max(1, Math.min(novoInicio, rackAtual.tamanho_u - altura + 1));

    const tentativas = {};
    rackAtual.itens.forEach(it => {
      if (it.id === item.id) { tentativas[it.id] = novoInicio; return; }
      const orig = posOriginais[it.id];
      let pos = orig.u_inicio;
      if (novoInicio < origU) {
        if (orig.u_inicio >= novoInicio && orig.u_inicio < origU) pos = orig.u_inicio + altura;
      } else if (novoInicio > origU) {
        if (orig.u_inicio > origU && orig.u_inicio <= novoInicio + altura - 1) pos = orig.u_inicio - altura;
      }
      tentativas[it.id] = pos;
    });

    let valido = true;
    const faixasOcupadas = {};
    rackAtual.itens.forEach(it => {
      const altItem = it.id === item.id ? altura : posOriginais[it.id].u_altura;
      const inicio = tentativas[it.id];
      if (inicio < 1 || inicio + altItem - 1 > rackAtual.tamanho_u) { valido = false; return; }
      for (let u = inicio; u <= inicio + altItem - 1; u++) {
        if (faixasOcupadas[u]) { valido = false; }
        faixasOcupadas[u] = true;
      }
    });

    if (valido) {
      rackAtual.itens.forEach(it => { it.u_inicio = tentativas[it.id]; });
    }
  } else {
    let novaAltura = rackDrag.uAlturaOrig + deltaU;
    novaAltura = Math.max(1, Math.min(novaAltura, rackAtual.tamanho_u - rackDrag.uInicioOrig + 1));
    const outros = rackAtual.itens.filter(it => it.id !== rackDrag.itemId);
    const ocupadoOutros = construirOcupacao(outros);
    let livre = true;
    for (let u = rackDrag.uInicioOrig; u <= rackDrag.uInicioOrig + novaAltura - 1; u++) { if (ocupadoOutros[u]) { livre = false; break; } }
    if (livre) item.u_altura = novaAltura;
  }
  renderRackFrameAtual();
}

function finalizarDragRack() {
  document.removeEventListener('pointermove', moverDragRack);
  document.removeEventListener('pointerup', finalizarDragRack);
  document.removeEventListener('pointercancel', finalizarDragRack);
  document.body.style.userSelect = '';
  if (!rackDrag || !rackAtual) { rackDrag = null; return; }
  const drag = rackDrag;
  rackDrag = null;
  const item = rackAtual.itens.find(it => it.id === drag.itemId);
  if (!item) return;

  if (!drag.moveu) {
    abrirEditarItemRack(item.id);
    return;
  }

  const mudaram = rackAtual.itens.filter(it => {
    const orig = drag.posOriginais[it.id];
    return orig.u_inicio !== it.u_inicio || orig.u_altura !== it.u_altura;
  });
  if (!mudaram.length) { renderRackEditor(); return; }

  Promise.all(mudaram.map(it => sbPatch('projetos_rack_itens?id=eq.' + it.id, { u_inicio: it.u_inicio, u_altura: it.u_altura })))
    .then(function () { toast(tr('rack_item_atualizado'), 'ok'); renderRackEditor(); })
    .catch(function (e) {
      rackAtual.itens.forEach(it => {
        const orig = drag.posOriginais[it.id];
        if (orig) { it.u_inicio = orig.u_inicio; it.u_altura = orig.u_altura; }
      });
      toast(tr('erro_prefix') + e.message, 'err');
      renderRackEditor();
    });
}

function atualizarBotaoFotoOriginalRack() {
  const btn = document.getElementById('rack-ver-foto-original-btn');
  if (!btn || !rackAtual) return;
  if (rackAtual.foto_original_drive_url) {
    btn.style.display = 'block';
    btn.href = rackAtual.foto_original_drive_url;
  } else {
    btn.style.display = 'none';
    btn.href = '#';
  }
}

async function anexarFotoRackSemIA(event) {
  const file = event.target.files[0];
  if (!file || !rackAtual) return;
  const statusEl = document.getElementById('rack-anexo-status');
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#555'; statusEl.textContent = tr('rack_anexando_foto'); }
  const url = await salvarFotoOriginalRack(rackAtual.id, file);
  event.target.value = '';
  if (url) {
    rackAtual.foto_original_drive_url = url;
    atualizarBotaoFotoOriginalRack();
    if (statusEl) { statusEl.style.color = '#166534'; statusEl.textContent = tr('rack_foto_anexada_sucesso'); }
    toast(tr('rack_foto_anexada_sucesso'), 'ok');
  } else if (statusEl) {
    statusEl.style.color = '#e74c3c';
    statusEl.textContent = tr('drive_conecte_primeiro');
  }
}

let rackOSListaCache = null;

async function abrirEnviarRackOS() {
  if (!rackAtual) return;
  document.getElementById('reos-busca').value = '';
  document.getElementById('reos-lista').innerHTML = '<div style="padding:14px;text-align:center;color:#bbb;font-size:12px">' + tr('loading') + '</div>';
  document.getElementById('reos-status').style.display = 'none';
  abrirModal('m-rack-enviar-os');
  try {
    rackOSListaCache = await sbGet('ordens_servico?status=in.(aberta,agendada,em_campo)&order=created_at.desc');
  } catch(e) {
    rackOSListaCache = [];
  }
  renderizarListaOSParaRack(rackOSListaCache);
}

function filtrarOSParaRack(q) {
  if (!rackOSListaCache) return;
  const termo = (q || '').toLowerCase();
  const filtrada = rackOSListaCache.filter(o =>
    (o.cliente_nome || '').toLowerCase().includes(termo) ||
    String(o.numero || '').toLowerCase().includes(termo)
  );
  renderizarListaOSParaRack(filtrada);
}

function renderizarListaOSParaRack(lista) {
  const cont = document.getElementById('reos-lista');
  if (!lista.length) {
    cont.innerHTML = '<div style="padding:14px;text-align:center;color:#bbb;font-size:12px">' + tr('rack_os_nenhuma_aberta') + '</div>';
    return;
  }
  cont.innerHTML = lista.map(o =>
    '<div onclick="selecionarOSParaRack(\'' + o.id + '\')" style="padding:10px 14px;border-bottom:1px solid #f0f0ed;cursor:pointer;font-size:13px" onmouseover="this.style.background=\'#f9f9f7\'" onmouseout="this.style.background=\'\'">'
      + '<div style="font-weight:500">' + (o.cliente_nome || '') + '</div>'
      + '<div style="font-size:11px;color:#888">' + tr('rack_os_numero_label') + ' ' + (o.numero || o.id.slice(0,8)) + ' · ' + tr('status_' + o.status) + '</div>'
    + '</div>'
  ).join('');
}

async function gerarRackPDFBlob() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const alturaBarra = await desenharCabecalhoPDF(doc, tr('rack_pdf_titulo'));
  let y = alturaBarra + 38;
  doc.setFontSize(10.5);
  doc.setTextColor(150);
  doc.text(tr('rack_pdf_titulo').toUpperCase(), margin, y);
  y += 20;
  doc.setFontSize(17);
  doc.setTextColor(20, 20, 20);
  doc.text(rackAtual.nome, margin, y);
  y += 20;
  doc.setFontSize(10);
  doc.setTextColor(140);
  doc.text(rackAtual.tamanho_u + 'U · ' + new Date().toLocaleDateString(LANG === 'pt' ? 'pt-BR' : 'en-US'), margin, y);
  y += 30;
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  const ordenados = rackAtual.itens.slice().sort((a, b) => a.u_inicio - b.u_inicio);
  ordenados.forEach(it => {
    const bottomU = it.u_inicio + it.u_altura - 1;
    const label = 'U' + it.u_inicio + (it.u_altura > 1 ? '-U' + bottomU : '');
    doc.setFont(undefined, 'bold');
    doc.text(label + '  —  ' + it.nome, margin, y);
    doc.setFont(undefined, 'normal');
    y += 16;
    if (it.observacoes) {
      doc.setFontSize(10);
      doc.setTextColor(100);
      const linhas = doc.splitTextToSize(it.observacoes, 480);
      doc.text(linhas, margin + 14, y);
      y += linhas.length * 12 + 4;
      doc.setFontSize(12);
      doc.setTextColor(20, 20, 20);
    }
    y += 6;
    if (y > pageH - 60) { doc.addPage(); y = 60; desenharCabecalhoLevePDF(doc, rackAtual.nome); y = 80; }
  });
  numerarPaginasPDF(doc);
  return doc.output('blob');
}

async function selecionarOSParaRack(osId) {
  if (!rackAtual) return;
  const statusEl = document.getElementById('reos-status');
  statusEl.style.display = 'block';
  statusEl.style.color = '#555';
  statusEl.textContent = tr('rack_enviando_os');
  try {
    const conectado = await garantirTokenDrive();
    if (!conectado) { statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('drive_conecte_primeiro'); return; }
    const os = rackOSListaCache.find(o => o.id === osId);
    const folderId = await getOuCriarPastaOS(osId, os);
    if (!folderId) { statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('drive_erro_pasta'); return; }
    const blob = await gerarRackPDFBlob();
    const nomeArquivo = 'Rack - ' + rackAtual.nome + '.pdf';
    const arquivo = new File([blob], nomeArquivo, { type: 'application/pdf' });
    const d = await uploadDrive(arquivo, folderId);
    if (!d.id) throw new Error('upload');
    await sbPatch('projetos_racks?id=eq.' + rackAtual.id, { os_id: osId });
    rackAtual.os_id = osId;
    statusEl.style.color = '#166534';
    statusEl.textContent = tr('rack_enviado_os_sucesso');
    toast(tr('rack_enviado_os_sucesso'), 'ok');
    setTimeout(() => fecharModal('m-rack-enviar-os'), 900);
  } catch(e) {
    statusEl.style.color = '#e74c3c';
    statusEl.textContent = tr('erro_prefix') + e.message;
  }
}

function renderRackEditor() {
  if (!rackAtual) return;
  document.getElementById('rack-editor-nome').textContent = rackAtual.nome + ' — ' + rackAtual.tamanho_u + 'U';
  const size = rackAtual.tamanho_u;
  const occupied = construirOcupacao(rackAtual.itens);
  const trilho = gerarRailHtml(size);
  document.getElementById('rack-rail-l').innerHTML = trilho;
  document.getElementById('rack-rail-r').innerHTML = trilho;
  renderRackFrame(document.getElementById('rack-body'), size, occupied, { interativo: true });
  const usados = rackAtual.itens.reduce((s, it) => s + it.u_altura, 0);
  document.getElementById('rack-ocupacao-txt').textContent = usados + ' / ' + size + ' U';
  renderRackSugestao();
  atualizarBotaoFotoOriginalRack();
}

const RACK_GRUPOS = [
  { id: 'cabeamento', label: 'cabeamento/patch panel', kw: ['patch panel', 'patch-panel', 'organizador de cabos', 'organizador'] },
  { id: 'rede', label: 'equipamento de rede', kw: ['switch', 'udm', 'router', 'roteador', 'gateway', 'modem', 'access point', 'unifi', 'dream machine'] },
  { id: 'controle', label: 'processador de controle', kw: ['crestron', 'control4', 'rti', 'elan', 'processador', 'processor'] },
  { id: 'fontes_av', label: 'fontes de áudio/vídeo', kw: ['dvr', 'nvr', 'matrix', 'streamer', 'blu-ray', 'media player', 'source', 'apple tv'] },
  { id: 'amplificacao', label: 'amplificação', kw: ['receiver', 'amplificador', 'amp', 'preamp', 'denon', 'marantz', 'yamaha', 'anthem', 'rotel'] },
  { id: 'armazenamento', label: 'armazenamento', kw: ['nas', 'servidor', 'storage', 'server'] },
  { id: 'energia', label: 'energia/condicionador', kw: ['nobreak', 'ups', 'wattbox', 'whatbox', 'pdu', 'condicionador', 'power'] }
];

function classificarItemRack(nome) {
  const n = (nome || '').toLowerCase();
  for (const g of RACK_GRUPOS) {
    if (g.kw.some(k => n.includes(k))) return g.id;
  }
  return 'outros';
}

function calcularSugestaoRack(rack) {
  const ordemGrupos = ['cabeamento', 'rede', 'controle', 'fontes_av', 'amplificacao', 'armazenamento', 'outros', 'energia'];
  const classificados = rack.itens.map(it => ({ nome: it.nome, u_altura: it.u_altura, cor_idx: it.cor_idx, grupo: classificarItemRack(it.nome) }));
  classificados.sort((a, b) => {
    const ia = ordemGrupos.indexOf(a.grupo), ib = ordemGrupos.indexOf(b.grupo);
    if (ia !== ib) return ia - ib;
    return 0;
  });
  const itensSugeridos = [];
  let cursor = 1;
  classificados.forEach((it, idx) => {
    itensSugeridos.push({ nome: it.nome, u_inicio: cursor, u_altura: it.u_altura, cor_idx: it.cor_idx != null ? it.cor_idx : idx });
    cursor += it.u_altura;
  });
  const livre = rack.tamanho_u - (cursor - 1);
  const gruposPresentes = new Set(classificados.map(it => it.grupo));
  const faltando = [];
  if (!gruposPresentes.has('cabeamento')) faltando.push({ nome: tr('rack_sugestao_falta_cabeamento'), grupo: 'cabeamento' });
  if (!gruposPresentes.has('energia')) faltando.push({ nome: tr('rack_sugestao_falta_energia'), grupo: 'energia' });
  let restante = livre;
  faltando.forEach(f => {
    if (restante >= 1) {
      itensSugeridos.push({ nome: f.nome, u_inicio: cursor, u_altura: 1, cor_idx: 0, sugerido: true });
      cursor += 1;
      restante -= 1;
    }
  });

  const contagemGrupos = {};
  classificados.forEach(it => { contagemGrupos[it.grupo] = (contagemGrupos[it.grupo] || 0) + 1; });
  const partesResumo = ordemGrupos
    .filter(g => contagemGrupos[g])
    .map(g => contagemGrupos[g] + ' ' + (RACK_GRUPOS.find(x => x.id === g) ? RACK_GRUPOS.find(x => x.id === g).label : 'item(ns)'));
  let resumo = rack.itens.length
    ? (tr('rack_sugestao_resumo_intro') + ' ' + partesResumo.join(', ') + '. ' + tr('rack_sugestao_resumo_criterio'))
    : tr('rack_sugestao_resumo_vazio');
  if (faltando.length) {
    resumo += ' ' + tr('rack_sugestao_resumo_faltantes') + ' ' + faltando.map(f => f.nome).join(', ') + '.';
  }

  return { itens: itensSugeridos, resumo };
}

function renderRackSugestao() {
  if (!rackAtual) return;
  const sugestao = calcularSugestaoRack(rackAtual);
  const size = rackAtual.tamanho_u;
  const trilho = gerarRailHtml(size);
  document.getElementById('rack-sug-rail-l').innerHTML = trilho;
  document.getElementById('rack-sug-rail-r').innerHTML = trilho;
  const occupied = construirOcupacao(sugestao.itens);
  renderRackFrame(document.getElementById('rack-sug-body'), size, occupied, { interativo: false });
  document.getElementById('rack-sug-resumo').textContent = sugestao.resumo;
}

function abrirNovoItemRack(topU, maxAltura) {
  rackItemSlotAlvo = { topU: topU, maxAltura: maxAltura };
  document.getElementById('ri-item-id').value = '';
  document.getElementById('ri-nome').value = '';
  document.getElementById('ri-observacoes').value = '';
  const alturaInput = document.getElementById('ri-altura');
  alturaInput.value = '1';
  alturaInput.max = String(maxAltura);
  document.getElementById('rack-item-titulo').textContent = tr('rack_item_add_title') + ' — U' + topU;
  document.getElementById('ri-excluir-btn').style.display = 'none';
  document.getElementById('ri-salvar-btn').textContent = tr('btn_add');
  abrirModal('m-rack-item');
}

function abrirEditarItemRack(itemId) {
  if (!rackAtual) return;
  const item = rackAtual.itens.find(it => it.id === itemId);
  if (!item) return;
  const bottomU = item.u_inicio + item.u_altura - 1;
  const ocupado = {};
  rackAtual.itens.forEach(it => { if (it.id !== itemId) for (let x = it.u_inicio; x <= it.u_inicio + it.u_altura - 1; x++) ocupado[x] = true; });
  let livre = 0, u = bottomU + 1;
  while (u <= rackAtual.tamanho_u && !ocupado[u]) { livre++; u++; }
  const maxAltura = item.u_altura + livre;
  rackItemSlotAlvo = null;
  document.getElementById('ri-item-id').value = item.id;
  document.getElementById('ri-nome').value = item.nome;
  document.getElementById('ri-observacoes').value = item.observacoes || '';
  const alturaInput = document.getElementById('ri-altura');
  alturaInput.value = item.u_altura;
  alturaInput.max = String(maxAltura);
  document.getElementById('rack-item-titulo').textContent = tr('rack_editar_item_title') + ' — U' + item.u_inicio + (item.u_altura > 1 ? '-U' + bottomU : '');
  document.getElementById('ri-excluir-btn').style.display = 'inline-block';
  document.getElementById('ri-salvar-btn').textContent = tr('btn_salvar');
  abrirModal('m-rack-item');
}

async function salvarItemRack() {
  if (!rackAtual) return;
  const itemId = document.getElementById('ri-item-id')?.value;
  const nomeDigitado = document.getElementById('ri-nome')?.value.trim();
  if (!nomeDigitado) { toast(tr('orc_item_nome_obrigatorio'), 'err'); return; }
  const nome = normalizarNomeItem(nomeDigitado);
  const alturaInput = document.getElementById('ri-altura');
  let altura = parseInt(alturaInput?.value, 10) || 1;
  const alturaMax = parseInt(alturaInput?.max, 10) || altura;
  altura = Math.max(1, Math.min(altura, alturaMax));

  const observacoes = document.getElementById('ri-observacoes')?.value.trim() || '';

  if (itemId) {
    const item = rackAtual.itens.find(it => it.id === itemId);
    if (!item) return;
    try {
      await sbPatch('projetos_rack_itens?id=eq.' + itemId, { nome: nome, u_altura: altura, observacoes: observacoes });
      item.nome = nome;
      item.u_altura = altura;
      item.observacoes = observacoes;
      fecharModal('m-rack-item');
      renderRackEditor();
    } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
    return;
  }

  if (!rackItemSlotAlvo) return;
  const uInicio = rackItemSlotAlvo.topU;
  const corIdx = rackAtual.itens.length % RACK_CORES.length;
  try {
    const [novo] = await sbPost('projetos_rack_itens', {
      rack_id: rackAtual.id, nome: nome, u_inicio: uInicio, u_altura: altura,
      cor_idx: corIdx, ordem: rackAtual.itens.length, observacoes: observacoes
    });
    rackAtual.itens.push(novo);
    fecharModal('m-rack-item');
    renderRackEditor();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirItemRackModal() {
  const itemId = document.getElementById('ri-item-id')?.value;
  if (!itemId || !rackAtual) return;
  if (!confirm(tr('rack_item_excluir_confirm'))) return;
  try {
    await sbDelete('projetos_rack_itens?id=eq.' + itemId);
    rackAtual.itens = rackAtual.itens.filter(it => it.id !== itemId);
    fecharModal('m-rack-item');
    renderRackEditor();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function removerItemRack(itemId) {
  if (!confirm(tr('rack_item_excluir_confirm'))) return;
  try {
    await sbDelete('projetos_rack_itens?id=eq.' + itemId);
    rackAtual.itens = rackAtual.itens.filter(it => it.id !== itemId);
    renderRackEditor();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

let rackFotoFile = null;
let rackNovaFotoFile = null;

const RACK_PALAVRAS_VAZIO = [
  'espaco livre', 'espaço livre', 'livre', 'vazio', 'vazia',
  'expansao', 'expansão', 'free space', 'empty', 'unused', 'available', 'n/a'
];

function ehEspacoVazioNome(nome) {
  const n = (nome || '').trim().toLowerCase();
  if (!n) return true;
  return RACK_PALAVRAS_VAZIO.some(p => n.includes(p));
}

function selecionarFotoRack(event) {
  const file = event.target.files[0];
  if (!file) return;
  rackFotoFile = file;
  document.getElementById('rack-foto-nome').textContent = file.name;
  const btn = document.getElementById('rack-ler-ia-btn');
  if (btn) btn.style.display = 'block';
}

async function importarRackDeFoto() {
  if (!rackFotoFile || !rackAtual) return;
  const btn = document.getElementById('rack-ler-ia-btn');
  const statusEl = document.getElementById('rack-ia-status');
  if (btn) btn.disabled = true;
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#555'; statusEl.textContent = tr('rack_ia_lendo'); }
  try {
    await garantirSessao();
    const imagem_base64 = await blobParaBase64(rackFotoFile);
    const r = await fetch(SB_URL + '/functions/v1/extrair-rack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ imagem_base64, mime_type: rackFotoFile.type || 'image/jpeg', tamanho_u: rackAtual.tamanho_u })
    });
    const d = await r.json();
    console.log('[extrair-rack] resposta da IA:', d);
    if (!r.ok) throw new Error(d.error || 'Erro');
    const itensDetectados = Array.isArray(d.itens) ? d.itens : [];
    if (!itensDetectados.length) {
      if (statusEl) { statusEl.style.color = '#92400e'; statusEl.textContent = tr('rack_ia_vazio'); }
      toast(tr('rack_ia_vazio'), 'err');
      return;
    }
    const ocupado = {};
    rackAtual.itens.forEach(it => { for (let u = it.u_inicio; u <= it.u_inicio + it.u_altura - 1; u++) ocupado[u] = true; });
    let adicionados = 0, ignorados = 0;
    let cursor = 1;
    for (const det of itensDetectados) {
      if (ehEspacoVazioNome(det.nome)) { ignorados++; continue; }
      const nome = normalizarNomeItem(det.nome || '');
      if (!nome) { ignorados++; continue; }
      while (cursor <= rackAtual.tamanho_u && ocupado[cursor]) cursor++;
      if (cursor > rackAtual.tamanho_u) { ignorados++; continue; }
      const uInicio = cursor;
      const corIdx = rackAtual.itens.length % RACK_CORES.length;
      try {
        const [novo] = await sbPost('projetos_rack_itens', {
          rack_id: rackAtual.id, nome: nome, u_inicio: uInicio, u_altura: 1,
          cor_idx: corIdx, ordem: rackAtual.itens.length
        });
        rackAtual.itens.push(novo);
        ocupado[uInicio] = true;
        cursor++;
        adicionados++;
      } catch(e) { ignorados++; }
    }
    renderRackEditor();
    const fotoParaSalvar2 = rackFotoFile;
    const rackIdAlvo = rackAtual.id;
    rackFotoFile = null;
    document.getElementById('rack-foto-nome').textContent = '';
    document.getElementById('rack-foto-input').value = '';
    if (btn) btn.style.display = 'none';
    salvarFotoOriginalRack(rackIdAlvo, fotoParaSalvar2).then(url => { if (url && rackAtual && rackAtual.id === rackIdAlvo) { rackAtual.foto_original_drive_url = url; atualizarBotaoFotoOriginalRack(); } });
    if (statusEl) {
      statusEl.style.color = adicionados ? '#166534' : '#92400e';
      statusEl.textContent = adicionados + ' ' + tr('rack_ia_itens_adicionados') + (ignorados ? ' · ' + ignorados + ' ' + tr('rack_ia_itens_ignorados') : '');
    }
    if (adicionados) toast(tr('rack_ia_sucesso'), 'ok');
  } catch(e) {
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('rack_ia_erro') + (e.message ? ' (' + e.message + ')' : ''); }
    toast(tr('erro_prefix') + e.message, 'err');
  } finally {
    if (btn) btn.disabled = false;
  }
}

function selecionarFotoNovoRack(event) {
  const file = event.target.files[0];
  if (!file) return;
  rackNovaFotoFile = file;
  document.getElementById('rack-nova-foto-nome').textContent = file.name;
  const btn = document.getElementById('rack-nova-ler-ia-btn');
  if (btn) btn.style.display = 'block';
}

async function criarRackDeFoto() {
  if (!rackNovaFotoFile) return;
  const btn = document.getElementById('rack-nova-ler-ia-btn');
  const statusEl = document.getElementById('rack-nova-ia-status');
  if (btn) btn.disabled = true;
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#555'; statusEl.textContent = tr('rack_ia_lendo'); }
  try {
    await garantirSessao();
    const imagem_base64 = await blobParaBase64(rackNovaFotoFile);
    const r = await fetch(SB_URL + '/functions/v1/extrair-rack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ imagem_base64, mime_type: rackNovaFotoFile.type || 'image/jpeg' })
    });
    const d = await r.json();
    console.log('[extrair-rack] resposta da IA (novo rack):', d);
    if (!r.ok) throw new Error(d.error || 'Erro');
    const itensDetectados = (Array.isArray(d.itens) ? d.itens : []).filter(it => !ehEspacoVazioNome(it.nome));

    const nomeDigitado = document.getElementById('rack-nome')?.value.trim();
    const nome = nomeDigitado || tr('rack_nome_padrao_importado');
    let tamanho = (typeof d.tamanho_u === 'number' && d.tamanho_u > 0) ? Math.round(d.tamanho_u) : 0;
    if (!tamanho) tamanho = Math.max(itensDetectados.length, 21);
    tamanho = Math.max(1, Math.min(tamanho, 60));

    const [novoRack] = await sbPost('projetos_racks', { nome, tamanho_u: tamanho, criado_por: ME.nome });

    const itensFinal = [];
    let cursor = 1;
    for (const det of itensDetectados) {
      const nomeItem = normalizarNomeItem(det.nome || '');
      if (!nomeItem) continue;
      if (cursor > tamanho) break;
      const uInicio = cursor;
      const corIdx = itensFinal.length % RACK_CORES.length;
      try {
        const [criado] = await sbPost('projetos_rack_itens', {
          rack_id: novoRack.id, nome: nomeItem, u_inicio: uInicio, u_altura: 1,
          cor_idx: corIdx, ordem: itensFinal.length
        });
        itensFinal.push(criado);
        cursor++;
      } catch(e) {}
    }

    const fotoParaSalvar = rackNovaFotoFile;
    rackNovaFotoFile = null;
    fecharModal('m-novo-rack');
    toast(tr('rack_ia_sucesso'), 'ok');
    renderRacks();
    rackEditandoId = novoRack.id;
    rackAtual = { ...novoRack, itens: itensFinal };
    document.getElementById('rack-editor-titulo').textContent = novoRack.nome;
    salvarFotoOriginalRack(novoRack.id, fotoParaSalvar).then(url => { if (url) { rackAtual.foto_original_drive_url = url; atualizarBotaoFotoOriginalRack(); } });
    renderRackEditor();
    abrirModal('m-rack-editor');
  } catch(e) {
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('rack_ia_erro') + (e.message ? ' (' + e.message + ')' : ''); }
    toast(tr('erro_prefix') + e.message, 'err');
  } finally {
    if (btn) btn.disabled = false;
  }
}


// ── PLANTA (dispositivos marcados na planta baixa da casa) ──────
const PLANTA_CORES = {
  blue:   { bg: '#E6F1FB', text: '#0C447C' },
  coral:  { bg: '#FAECE7', text: '#712B13' },
  purple: { bg: '#EEEDFE', text: '#3C3489' },
  teal:   { bg: '#E1F5EE', text: '#085041' },
  amber:  { bg: '#FAEEDA', text: '#633806' },
  gray:   { bg: '#F1EFE8', text: '#444441' },
  green:  { bg: '#E6F6EA', text: '#0F5C2E' },
  red:    { bg: '#FCE8E8', text: '#7A1414' }
};

const PLANTA_ICONES_PADRAO = [
  { chave: 'camera', nome: 'Câmera CFTV', emoji: '📷', cor: 'blue', kw: 'camera cftv ip analogica seguranca video vigilancia circuito fechado' },
  { chave: 'dvr_nvr', nome: 'Gravador CFTV (DVR/NVR)', emoji: '🖥️', cor: 'gray', kw: 'dvr nvr gravador cftv storage armazenamento video servidor' },
  { chave: 'central_alarme', nome: 'Central de alarme', emoji: '🛡️', cor: 'red', kw: 'central alarme painel seguranca monitoramento' },
  { chave: 'teclado_alarme', nome: 'Teclado de alarme', emoji: '🔢', cor: 'coral', kw: 'teclado alarme keypad painel senha codigo' },
  { chave: 'sirene', nome: 'Sirene', emoji: '📢', cor: 'coral', kw: 'sirene alarme sonoro alerta strobe' },
  { chave: 'quebra_vidro', nome: 'Sensor de quebra de vidro', emoji: '🔨', cor: 'coral', kw: 'quebra vidro sensor seguranca janela' },
  { chave: 'panico', nome: 'Botão de pânico', emoji: '🆘', cor: 'red', kw: 'panico emergencia botao sos assalto' },
  { chave: 'acesso', nome: 'Controle de acesso', emoji: '🪪', cor: 'green', kw: 'acesso controle cartao biometria catraca leitora proximidade' },
  { chave: 'fechadura', nome: 'Fechadura digital', emoji: '🔑', cor: 'coral', kw: 'fechadura porta digital trava smart lock eletronica' },
  { chave: 'presenca', nome: 'Sensor de presença', emoji: '🚶', cor: 'teal', kw: 'sensor presenca movimento pir infravermelho' },
  { chave: 'abertura', nome: 'Sensor de abertura', emoji: '🚪', cor: 'teal', kw: 'sensor porta janela abertura contato magnetico' },
  { chave: 'som', nome: 'Caixa de som', emoji: '🔊', cor: 'purple', kw: 'som audio caixa speaker gesso embutida musica' },
  { chave: 'interruptor', nome: 'Interruptor inteligente', emoji: '💡', cor: 'amber', kw: 'interruptor luz switch iluminacao dimmer' },
  { chave: 'wifi', nome: 'Wi-Fi / Access Point', emoji: '📶', cor: 'teal', kw: 'wifi ap access point rede sem fio roteador' },
  { chave: 'rack_rede', nome: 'Rack de rede', emoji: '🗄️', cor: 'gray', kw: 'rack rede switch servidor patch' },
  { chave: 'ar_condicionado', nome: 'Ar-condicionado', emoji: '❄️', cor: 'blue', kw: 'termostato ar condicionado climatizacao hvac' },
  { chave: 'cortina', nome: 'Cortina motorizada', emoji: '🪟', cor: 'amber', kw: 'cortina persiana motorizada automacao' },
  { chave: 'campainha', nome: 'Campainha inteligente', emoji: '🔔', cor: 'coral', kw: 'campainha interfone video porteiro doorbell' },
  { chave: 'tomada', nome: 'Tomada inteligente', emoji: '🔌', cor: 'amber', kw: 'tomada smart plug energia' },
  { chave: 'tv', nome: 'TV / Display', emoji: '📺', cor: 'purple', kw: 'tv televisao display tela' },
  { chave: 'projetor', nome: 'Projetor', emoji: '📽️', cor: 'purple', kw: 'projetor home theater cinema' },
  { chave: 'central', nome: 'Central de automação', emoji: '🧠', cor: 'teal', kw: 'central hub controladora crestron control4' },
  { chave: 'fumaca', nome: 'Detector de fumaça', emoji: '🔥', cor: 'red', kw: 'fumaca incendio detector alarme incendio' },
  { chave: 'vazamento', nome: 'Detector de vazamento', emoji: '💧', cor: 'blue', kw: 'agua vazamento sensor de agua' },
  { chave: 'nobreak', nome: 'Nobreak / UPS', emoji: '🔋', cor: 'green', kw: 'nobreak ups bateria energia' },
  { chave: 'ponto_rede', nome: 'Ponto de rede (RJ45)', emoji: '🔲', cor: 'amber', kw: 'ponto de rede rj45 cabo ethernet' },
  { chave: 'repetidor', nome: 'Repetidor de sinal', emoji: '📡', cor: 'amber', kw: 'repetidor sinal antena extensor' },
  { chave: 'spot', nome: 'Spot / trilho', emoji: '💡', cor: 'amber', kw: 'spot trilho iluminacao luminaria' },
  { chave: 'cofre', nome: 'Cofre', emoji: '🔐', cor: 'gray', kw: 'cofre seguranca protecao' },
  { chave: 'portao', nome: 'Portão automático', emoji: '🚧', cor: 'coral', kw: 'portao automatico motor de portao' },
  { chave: 'irrigacao', nome: 'Irrigação', emoji: '🌱', cor: 'green', kw: 'irrigacao jardim valvula' },
  { chave: 'piscina', nome: 'Automação de piscina', emoji: '🏊', cor: 'blue', kw: 'piscina bomba automacao piscina' },
  { chave: 'generico', nome: 'Genérico / outro', emoji: '📍', cor: 'gray', kw: 'outro generico diverso' }
];

let plantasData = [];
let plantaTiposCustom = [];
let plantaTiposCarregados = false;
let plantaEditandoId = null;
let plantaAtual = null;
let plantaTipoArmado = null;
let plantaMarcadorAtual = null;
let plantaNovaPdfFile = null;
let plantaUltimoToquePlantaMs = 0;
let plantaCorEscolhida = 'blue';
const PLANTA_ZOOM_MIN = 100;
const PLANTA_ZOOM_MAX = 400;
let plantaZoomPct = 100;
let plantaPinch = null;
let plantaArmandoPonto = false;
let plantaPontoEditandoId = null;
let plantaPontoNovoXY = null;
let plantaLinhasVisiveis = true;

async function renderPlantas() {
  const el = document.getElementById('mod-content');
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    plantasData = await sbGet('projetos_plantas?order=criado_em.desc');
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }
  if (!plantasData.length) {
    el.innerHTML = '<div style="text-align:center;color:#bbb;font-size:12px;padding:40px">' + tr('planta_none_found') + '</div>';
    return;
  }
  el.innerHTML = '<div class="tbl-wrap"><table class="tbl" style="min-width:0"><thead><tr>'
    + '<th>' + tr('planta_th_nome') + '</th>'
    + '<th class="rack-th-criado">' + tr('rack_th_criado') + '</th>'
    + '<th></th>'
    + '</tr></thead><tbody>'
    + plantasData.map(function(p) {
        return '<tr onclick="abrirEditorPlanta(\'' + p.id + '\')" style="cursor:pointer">'
        + '<td style="font-weight:500">' + p.nome + '</td>'
        + '<td class="rack-th-criado">' + new Date(p.criado_em).toLocaleDateString(LANG === 'pt' ? 'pt-BR' : 'en-US') + '</td>'
        + '<td style="text-align:right">'
          + '<button onclick="event.stopPropagation();excluirPlanta(\'' + p.id + '\')" style="padding:3px 10px;border:1px solid #fecaca;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;color:#dc2626;font-family:inherit">' + tr('orc_excluir') + '</button>'
        + '</td>'
      + '</tr>';
      }).join('')
    + '</tbody></table></div>';
}

function abrirNovaPlanta() {
  document.getElementById('planta-nome').value = '';
  plantaNovaPdfFile = null;
  const nomeEl = document.getElementById('planta-pdf-nome');
  if (nomeEl) nomeEl.textContent = '';
  const inputEl = document.getElementById('planta-pdf-input');
  if (inputEl) inputEl.value = '';
  const statusEl = document.getElementById('planta-pdf-status');
  if (statusEl) statusEl.style.display = 'none';
  const btn = document.getElementById('planta-nova-salvar-btn');
  if (btn) btn.disabled = false;
  abrirModal('m-nova-planta');
}

function selecionarPdfNovaPlanta(event) {
  const file = event.target.files[0];
  if (!file) return;
  plantaNovaPdfFile = file;
  const nomeEl = document.getElementById('planta-pdf-nome');
  if (nomeEl) nomeEl.textContent = file.name;
}

async function salvarNovaPlanta() {
  const nome = document.getElementById('planta-nome')?.value.trim();
  if (!nome) { toast(tr('planta_nome_obrigatorio'), 'err'); return; }
  if (!plantaNovaPdfFile) { toast(tr('planta_pdf_obrigatorio'), 'err'); return; }
  const btn = document.getElementById('planta-nova-salvar-btn');
  const statusEl = document.getElementById('planta-pdf-status');
  if (btn) btn.disabled = true;
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#555'; statusEl.textContent = tr('planta_processando_pdf'); }
  try {
    const conectado = await garantirTokenDrive();
    if (!conectado) throw new Error(tr('drive_conecte_primeiro'));

    const pngFile = await renderizarPdfComoPngFile(plantaNovaPdfFile, nome);
    const folderId = await getPastaPlantas();
    const [imgUp, pdfUp] = await Promise.all([
      uploadDrive(pngFile, folderId),
      uploadDrive(plantaNovaPdfFile, folderId)
    ]);
    if (!imgUp?.id) throw new Error(tr('planta_erro_processar'));

    const imagemUrl = 'https://drive.google.com/thumbnail?id=' + imgUp.id + '&sz=w1600';
    const pdfUrl = pdfUp?.id ? ('https://drive.google.com/file/d/' + pdfUp.id + '/view') : '';

    const [nova] = await sbPost('projetos_plantas', {
      nome,
      imagem_drive_id: imgUp.id, imagem_url: imagemUrl,
      pdf_drive_id: pdfUp?.id || '', pdf_drive_url: pdfUrl,
      criado_por: ME.nome
    });

    fecharModal('m-nova-planta');
    toast(tr('planta_salva'), 'ok');
    renderPlantas();
    abrirEditorPlanta(nova.id);
  } catch(e) {
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('erro_prefix') + e.message; }
    toast(tr('erro_prefix') + e.message, 'err');
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function excluirPlanta(id) {
  if (!confirm(tr('planta_excluir_confirm'))) return;
  try {
    const p = plantasData.find(function(x) { return x.id === id; });
    if (p && (p.imagem_drive_id || p.pdf_drive_id)) {
      try {
        const conectado = await garantirTokenDrive();
        if (conectado) {
          const ids = [p.imagem_drive_id, p.pdf_drive_id].filter(Boolean);
          await Promise.all(ids.map(function(fid) {
            return fetch('https://www.googleapis.com/drive/v3/files/' + fid, {
              method: 'PATCH',
              headers: { 'Authorization': 'Bearer ' + googleToken, 'Content-Type': 'application/json' },
              body: JSON.stringify({ trashed: true })
            });
          }));
        }
      } catch(e) {}
    }
    await sbDelete('projetos_plantas?id=eq.' + id);
    toast(tr('planta_excluida'), 'ok');
    renderPlantas();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function abrirEditorPlanta(id) {
  let planta;
  try {
    const rows = await sbGet('projetos_plantas?id=eq.' + id);
    planta = rows[0];
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); return; }
  if (!planta) { toast(tr('planta_nao_encontrada'), 'err'); return; }
  let marcadores = [], pontosEquip = [];
  try {
    [marcadores, pontosEquip] = await Promise.all([
      sbGet('projetos_planta_marcadores?planta_id=eq.' + id + '&order=criado_em.asc'),
      sbGet('projetos_planta_pontos?planta_id=eq.' + id + '&order=criado_em.asc')
    ]);
  } catch(e) {}
  if (!plantaTiposCarregados) {
    try { plantaTiposCustom = await sbGet('projetos_planta_tipos_icone?order=criado_em.asc'); } catch(e) {}
    plantaTiposCarregados = true;
  }
  plantaEditandoId = id;
  plantaAtual = { ...planta, marcadores, pontos: pontosEquip, roteamento_padrao: planta.roteamento_padrao || {} };
  document.getElementById('planta-editor-titulo').textContent = planta.nome;
  const imgEl = document.getElementById('planta-editor-img');
  imgEl.onload = function() { renderLinhasPlanta(); };
  imgEl.src = planta.imagem_url;
  const pdfBtn = document.getElementById('planta-ver-pdf-btn');
  if (pdfBtn) {
    if (planta.pdf_drive_url) { pdfBtn.style.display = 'inline-block'; pdfBtn.href = planta.pdf_drive_url; }
    else pdfBtn.style.display = 'none';
  }
  plantaArmandoPonto = false;
  plantaLinhasVisiveis = true;
  atualizarBotaoLinhasPlanta();
  desarmarTipoPlanta();
  plantaZoomPct = 100;
  aplicarZoomPlanta();
  configurarCanvasPlanta();
  configurarZoomPlanta();
  renderMarcadoresPlanta();
  renderPontosPlanta();
  renderPainelRoteamentoPlanta();
  if (imgEl.complete) renderLinhasPlanta();
  abrirModal('m-planta-editor');
}

function ajustarZoomPlanta(direcao) {
  plantaZoomPct = direcao === 0 ? 100 : Math.max(PLANTA_ZOOM_MIN, Math.min(PLANTA_ZOOM_MAX, plantaZoomPct + direcao * 30));
  aplicarZoomPlanta();
}

function aplicarZoomPlanta() {
  const canvasEl = document.getElementById('planta-editor-canvas');
  const label = document.getElementById('planta-zoom-label');
  if (canvasEl) canvasEl.style.width = plantaZoomPct + '%';
  if (label) label.textContent = Math.round(plantaZoomPct) + '%';
}

// Muda o zoom mantendo o ponto (clientX/clientY na tela) fixo visualmente - assim
// da zoom "no dedo"/"no cursor" em vez de sempre no canto superior esquerdo.
function aplicarZoomNoPonto(novoZoomPct, clientX, clientY) {
  const scrollEl = document.getElementById('planta-editor-scroll');
  const canvasEl = document.getElementById('planta-editor-canvas');
  if (!scrollEl || !canvasEl) return;
  const scrollRect = scrollEl.getBoundingClientRect();
  const oldWidth = canvasEl.offsetWidth || 1;
  const oldHeight = canvasEl.offsetHeight || 1;
  const cursorX = clientX - scrollRect.left;
  const cursorY = clientY - scrollRect.top;
  const fracX = (scrollEl.scrollLeft + cursorX) / oldWidth;
  const fracY = (scrollEl.scrollTop + cursorY) / oldHeight;

  plantaZoomPct = Math.max(PLANTA_ZOOM_MIN, Math.min(PLANTA_ZOOM_MAX, novoZoomPct));
  aplicarZoomPlanta();

  const newWidth = canvasEl.offsetWidth || 1;
  const newHeight = canvasEl.offsetHeight || 1;
  scrollEl.scrollLeft = fracX * newWidth - cursorX;
  scrollEl.scrollTop = fracY * newHeight - cursorY;
}

// Zoom com scroll do mouse (PC) e pinca com dois dedos (celular) - substitui os
// botoes de +/-, que ficam so como reforço visual/reset.
function configurarZoomPlanta() {
  const scrollEl = document.getElementById('planta-editor-scroll');
  const canvasEl = document.getElementById('planta-editor-canvas');
  if (!scrollEl || !canvasEl) return;

  scrollEl.onwheel = function(e) {
    e.preventDefault();
    const fator = e.deltaY < 0 ? 1.15 : (1 / 1.15);
    aplicarZoomNoPonto(plantaZoomPct * fator, e.clientX, e.clientY);
  };

  const dedos = new Map();

  canvasEl.onpointerdown = function(e) {
    if (e.pointerType !== 'touch') return;
    dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (dedos.size === 2) {
      const pts = Array.from(dedos.values());
      plantaPinch = {
        distInicial: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1,
        zoomInicial: plantaZoomPct
      };
    }
  };
  canvasEl.onpointermove = function(e) {
    if (!dedos.has(e.pointerId)) return;
    dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (dedos.size === 2 && plantaPinch) {
      e.preventDefault();
      const pts = Array.from(dedos.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;
      aplicarZoomNoPonto(plantaPinch.zoomInicial * (dist / plantaPinch.distInicial), midX, midY);
    }
  };
  function soltarDedo(e) {
    dedos.delete(e.pointerId);
    if (dedos.size < 2 && plantaPinch) {
      plantaPinch = null;
      // evita que o "click" fantasma que vem logo depois da pinça crie um marcador
      plantaUltimoToquePlantaMs = Date.now();
    }
  }
  canvasEl.onpointerup = soltarDedo;
  canvasEl.onpointercancel = soltarDedo;
}

function configurarCanvasPlanta() {
  const canvasEl = document.getElementById('planta-editor-canvas');
  if (!canvasEl) return;
  canvasEl.onclick = function(e) {
    if (Date.now() - plantaUltimoToquePlantaMs < 200) return;
    if (!plantaAtual) return;
    const rect = canvasEl.getBoundingClientRect();
    const x = Math.max(1, Math.min(99, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(1, Math.min(99, ((e.clientY - rect.top) / rect.height) * 100));
    if (plantaArmandoPonto) {
      plantaArmandoPonto = false;
      atualizarHintPlanta();
      abrirNomePontoPlanta(null, x, y);
      return;
    }
    if (!plantaTipoArmado) { toast(tr('planta_escolha_icone_primeiro'), 'err'); return; }
    criarMarcadorPlanta(x, y);
  };
}

// Decide o que mostrar na faixa de dica no topo do editor, de acordo com o modo
// atual: marcando ponto de equipamento, com um tipo de dispositivo armado, ou padrao.
function atualizarHintPlanta() {
  const hint = document.getElementById('planta-editor-hint');
  if (!hint) return;
  if (plantaArmandoPonto) {
    hint.textContent = tr('planta_hint_marcar_ponto');
    hint.style.background = '#eef6ff';
  } else if (plantaTipoArmado) {
    hint.textContent = tr('planta_hint_armado_prefix') + ' ' + plantaTipoArmado.emoji + ' ' + plantaTipoArmado.nome;
    hint.style.background = '#f9f9f7';
  } else {
    hint.textContent = tr('planta_hint_padrao');
    hint.style.background = '#f9f9f7';
  }
}

function armarTipoPlanta(tipo) {
  plantaTipoArmado = tipo;
  plantaArmandoPonto = false;
  atualizarHintPlanta();
  fecharModal('m-planta-biblioteca');
}

function desarmarTipoPlanta() {
  plantaTipoArmado = null;
  plantaArmandoPonto = false;
  atualizarHintPlanta();
}

function abrirNovoPontoPlanta() {
  plantaArmandoPonto = true;
  plantaTipoArmado = null;
  atualizarHintPlanta();
}

async function criarMarcadorPlanta(x, y) {
  const tipo = plantaTipoArmado;
  if (!tipo) return;
  try {
    // Se essa categoria ainda nao tem um ponto de equipamento padrao definido e
    // ja existe pelo menos um ponto na planta, assume o primeiro como padrao -
    // assim, se for tudo centralizado (so um rack), ja funciona sem precisar
    // configurar nada; se tiver mais de um ponto, da pra trocar no painel depois.
    const rot = plantaAtual.roteamento_padrao || (plantaAtual.roteamento_padrao = {});
    if (!rot[tipo.nome] && (plantaAtual.pontos || []).length) {
      rot[tipo.nome] = plantaAtual.pontos[0].id;
      sbPatch('projetos_plantas?id=eq.' + plantaEditandoId, { roteamento_padrao: rot }).catch(function(){});
    }
    const pontoId = rot[tipo.nome] || null;
    const [criado] = await sbPost('projetos_planta_marcadores', {
      planta_id: plantaEditandoId, nome: tipo.nome, cor: tipo.cor,
      icone_chave: tipo.chave || '', emoji: tipo.chave ? '' : (tipo.emoji || ''),
      ponto_id: pontoId,
      x_pct: x, y_pct: y, observacoes: '', criado_por: ME.nome
    });
    plantaAtual.marcadores.push(criado);
    criarElementoMarcadorPlanta(criado, document.getElementById('planta-editor-marcadores'));
    renderLinhasPlanta();
    renderPainelRoteamentoPlanta();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// Ponto de equipamento: liga/desliga o texto do botao de mostrar/ocultar linhas.
function atualizarBotaoLinhasPlanta() {
  const btn = document.getElementById('planta-toggle-linhas-btn');
  if (!btn) return;
  btn.textContent = plantaLinhasVisiveis ? tr('planta_ocultar_linhas_btn') : tr('planta_mostrar_linhas_btn');
}

function iniciaisPonto(nome) {
  const partes = (nome || '').trim().split(/\s+/).filter(Boolean);
  if (!partes.length) return '?';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

function renderPontosPlanta() {
  const cont = document.getElementById('planta-editor-pontos');
  if (!cont) return;
  cont.innerHTML = '';
  (plantaAtual.pontos || []).forEach(function(p) { criarElementoPontoPlanta(p, cont); });
}

// Badge arrastavel de um ponto de equipamento (rack, central de som, DVR...).
// Tocar sem arrastar abre o modal de renomear; arrastar persiste a nova posicao.
function criarElementoPontoPlanta(ponto, cont) {
  if (!cont) return;
  // O container pai (#planta-editor-pontos) tem pointer-events:none pra nao
  // bloquear cliques no resto do canvas (marcadores/criacao de dispositivo) nas
  // areas vazias - por isso o wrap precisa reativar pointer-events so onde tem
  // o badge de verdade.
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:absolute;left:' + ponto.x_pct + '%;top:' + ponto.y_pct + '%;transform:translate(-50%,-50%);z-index:2;pointer-events:auto';

  const badge = document.createElement('div');
  badge.style.cssText = 'min-width:34px;height:34px;padding:0 7px;border-radius:9px;background:#1a1a1a;color:#fff;display:flex;align-items:center;justify-content:center;cursor:grab;font-size:11px;font-weight:700;letter-spacing:.2px;box-shadow:0 2px 6px rgba(0,0,0,.3);touch-action:none;border:2px solid #fff';
  badge.textContent = iniciaisPonto(ponto.nome);
  badge.title = ponto.nome;

  const xBtn = document.createElement('div');
  xBtn.setAttribute('aria-hidden', 'true');
  xBtn.textContent = '×';
  xBtn.style.cssText = 'position:absolute;top:-6px;right:-6px;width:17px;height:17px;border-radius:50%;background:#dc2626;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;line-height:1;cursor:pointer';

  wrap.appendChild(badge);
  wrap.appendChild(xBtn);
  cont.appendChild(wrap);

  xBtn.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
  xBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    excluirPontoPlantaDireto(ponto, wrap);
  });

  let moveu = false;
  badge.addEventListener('pointerdown', function(e) {
    e.stopPropagation();
    moveu = false;
    const canvasEl = document.getElementById('planta-editor-canvas');
    const rect = canvasEl.getBoundingClientRect();
    function mover(ev) {
      moveu = true;
      let x = ((ev.clientX - rect.left) / rect.width) * 100;
      let y = ((ev.clientY - rect.top) / rect.height) * 100;
      x = Math.max(1, Math.min(99, x));
      y = Math.max(1, Math.min(99, y));
      wrap.style.left = x + '%';
      wrap.style.top = y + '%';
      ponto.x_pct = x; ponto.y_pct = y;
      renderLinhasPlanta();
    }
    function soltar() {
      document.removeEventListener('pointermove', mover);
      document.removeEventListener('pointerup', soltar);
      plantaUltimoToquePlantaMs = Date.now();
      if (moveu) {
        sbPatch('projetos_planta_pontos?id=eq.' + ponto.id, { x_pct: ponto.x_pct, y_pct: ponto.y_pct }).catch(function(){});
      } else {
        abrirNomePontoPlanta(ponto);
      }
    }
    document.addEventListener('pointermove', mover);
    document.addEventListener('pointerup', soltar);
  });
  badge.addEventListener('click', function(e) { e.stopPropagation(); });
}

// Exclusao direta pelo x no badge (sem precisar abrir o modal de nome primeiro,
// que tambem tem um botao excluir como caminho alternativo).
async function excluirPontoPlantaDireto(ponto, wrapEl) {
  if (!confirm(tr('planta_ponto_excluir_confirm'))) return;
  try {
    await sbDelete('projetos_planta_pontos?id=eq.' + ponto.id);
    plantaAtual.pontos = (plantaAtual.pontos || []).filter(function(p) { return p.id !== ponto.id; });
    (plantaAtual.marcadores || []).forEach(function(m) { if (m.ponto_id === ponto.id) m.ponto_id = null; });
    const rot = plantaAtual.roteamento_padrao || {};
    Object.keys(rot).forEach(function(k) { if (rot[k] === ponto.id) delete rot[k]; });
    sbPatch('projetos_plantas?id=eq.' + plantaEditandoId, { roteamento_padrao: rot }).catch(function(){});
    wrapEl.remove();
    renderPainelRoteamentoPlanta();
    renderLinhasPlanta();
    toast(tr('planta_ponto_excluido'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// Modal de nome do ponto serve tanto para criar (ponto null, com x/y do toque no
// canvas) quanto para renomear (ponto existente, sem x/y).
function abrirNomePontoPlanta(ponto, x, y) {
  plantaPontoEditandoId = ponto ? ponto.id : null;
  plantaPontoNovoXY = ponto ? null : { x: x, y: y };
  document.getElementById('planta-ponto-nome-titulo').textContent = ponto ? tr('planta_ponto_renomear_title') : tr('planta_ponto_novo_title');
  document.getElementById('ponto-nome-input').value = ponto ? ponto.nome : '';
  const excluirBtn = document.getElementById('ponto-excluir-btn');
  if (excluirBtn) excluirBtn.style.display = ponto ? 'inline-block' : 'none';
  abrirModal('m-planta-ponto-nome');
}

async function salvarNomePontoPlanta() {
  const nome = (document.getElementById('ponto-nome-input')?.value || '').trim();
  if (!nome) { toast(tr('planta_ponto_nome_obrigatorio'), 'err'); return; }
  try {
    if (plantaPontoEditandoId) {
      await sbPatch('projetos_planta_pontos?id=eq.' + plantaPontoEditandoId, { nome: nome });
      const ponto = (plantaAtual.pontos || []).find(function(p) { return p.id === plantaPontoEditandoId; });
      if (ponto) ponto.nome = nome;
    } else {
      const [criado] = await sbPost('projetos_planta_pontos', {
        planta_id: plantaEditandoId, nome: nome,
        x_pct: plantaPontoNovoXY.x, y_pct: plantaPontoNovoXY.y, criado_por: ME.nome
      });
      plantaAtual.pontos = plantaAtual.pontos || [];
      plantaAtual.pontos.push(criado);
    }
    fecharModal('m-planta-ponto-nome');
    renderPontosPlanta();
    renderPainelRoteamentoPlanta();
    renderLinhasPlanta();
    toast(tr('planta_ponto_salvo'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirPontoPlantaModal() {
  if (!plantaPontoEditandoId) return;
  if (!confirm(tr('planta_ponto_excluir_confirm'))) return;
  const id = plantaPontoEditandoId;
  try {
    await sbDelete('projetos_planta_pontos?id=eq.' + id);
    plantaAtual.pontos = (plantaAtual.pontos || []).filter(function(p) { return p.id !== id; });
    (plantaAtual.marcadores || []).forEach(function(m) { if (m.ponto_id === id) m.ponto_id = null; });
    const rot = plantaAtual.roteamento_padrao || {};
    Object.keys(rot).forEach(function(k) { if (rot[k] === id) delete rot[k]; });
    sbPatch('projetos_plantas?id=eq.' + plantaEditandoId, { roteamento_padrao: rot }).catch(function(){});
    fecharModal('m-planta-ponto-nome');
    renderPontosPlanta();
    renderPainelRoteamentoPlanta();
    renderLinhasPlanta();
    toast(tr('planta_ponto_excluido'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

// Painel com uma linha por categoria de dispositivo ja colocada na planta, cada
// uma com um <select> pra escolher pra qual ponto de equipamento ela vai. So
// aparece quando ja existe pelo menos um ponto criado.
function renderPainelRoteamentoPlanta() {
  const cont = document.getElementById('planta-roteamento-painel');
  if (!cont) return;
  cont.innerHTML = '';
  const pontos = plantaAtual.pontos || [];
  if (!pontos.length) return;
  const categorias = {};
  (plantaAtual.marcadores || []).forEach(function(m) { if (!categorias[m.nome]) categorias[m.nome] = m.cor; });
  const nomes = Object.keys(categorias);
  if (!nomes.length) return;
  const rot = plantaAtual.roteamento_padrao || {};
  const titulo = document.createElement('div');
  titulo.style.cssText = 'font-size:11.5px;color:#999;font-weight:600;margin-bottom:2px';
  titulo.textContent = tr('planta_roteamento_titulo');
  cont.appendChild(titulo);
  nomes.forEach(function(nome) {
    const cor = PLANTA_CORES[categorias[nome]] || PLANTA_CORES.gray;
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:8px;font-size:12.5px';
    const dot = document.createElement('span');
    dot.style.cssText = 'width:10px;height:10px;border-radius:50%;background:' + cor.text + ';flex-shrink:0';
    const label = document.createElement('span');
    label.style.cssText = 'flex:1';
    label.textContent = nome;
    const select = document.createElement('select');
    select.style.cssText = 'padding:4px 8px;border:1px solid #e8e8e5;border-radius:6px;font-size:12px;background:#fff';
    pontos.forEach(function(p) {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.nome;
      if (rot[nome] === p.id) opt.selected = true;
      select.appendChild(opt);
    });
    select.onchange = function() { atribuirPontoCategoria(nome, select.value); };
    row.appendChild(dot); row.appendChild(label); row.appendChild(select);
    cont.appendChild(row);
  });
}

// Muda o ponto de equipamento de destino de todos os marcadores de uma categoria
// de uma vez (ex: todo mundo que for "Camera CFTV" passa a apontar pro novo rack).
async function atribuirPontoCategoria(nome, pontoId) {
  const rot = plantaAtual.roteamento_padrao || (plantaAtual.roteamento_padrao = {});
  rot[nome] = pontoId;
  (plantaAtual.marcadores || []).forEach(function(m) { if (m.nome === nome) m.ponto_id = pontoId; });
  renderLinhasPlanta();
  try {
    await Promise.all([
      sbPatch('projetos_plantas?id=eq.' + plantaEditandoId, { roteamento_padrao: rot }),
      sbPatch('projetos_planta_marcadores?planta_id=eq.' + plantaEditandoId + '&nome=eq.' + encodeURIComponent(nome), { ponto_id: pontoId })
    ]);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function toggleLinhasPlanta() {
  plantaLinhasVisiveis = !plantaLinhasVisiveis;
  atualizarBotaoLinhasPlanta();
  renderLinhasPlanta();
}

// Convencao de desenho tecnico: quando o trecho HORIZONTAL de uma rota de
// cabeamento cruza o trecho VERTICAL de outra rota de categoria/rack
// diferente, em vez de deixar as duas linhas se tocando retas (parecendo uma
// conexao entre elas), o horizontal da uma "alca" (meia-lua) por cima do
// cruzamento. Recebe uma lista de trechos {grupo, dx, dy, mx, my} (dx,dy =
// posicao do dispositivo; mx,my = ponto de fusao da categoria dele) e devolve
// a mesma lista com um array `furos` (posicoes x do cruzamento, no trecho
// horizontal desse dispositivo) adicionado em cada trecho.
function calcularAlcasCruzamentoPlanta(trechos) {
  const folga = 0.6;
  trechos.forEach(function(t) { t.furos = []; });
  trechos.forEach(function(h, i) {
    const hy = h.my;
    const hx1 = Math.min(h.dx, h.mx), hx2 = Math.max(h.dx, h.mx);
    if (hx2 - hx1 < folga * 2) return;
    trechos.forEach(function(v, j) {
      if (i === j || v.grupo === h.grupo) return;
      const vx = v.dx;
      const vy1 = Math.min(v.dy, v.my), vy2 = Math.max(v.dy, v.my);
      if (vy2 - vy1 < folga * 2) return;
      if (vx > hx1 + folga && vx < hx2 - folga && hy > vy1 + folga && hy < vy2 - folga) {
        h.furos.push(vx);
      }
    });
    h.furos.sort(function(a, b) { return a - b; });
  });
  return trechos;
}

// Monta o "d" de um <path> SVG para o trecho horizontal (y constante), pulando
// com uma alca por cima de cada cruzamento marcado em `furos`.
function pathHorizontalComAlcasPlanta(x1, x2, y, furos, raio) {
  const dir = x2 >= x1 ? 1 : -1;
  const sweep = dir > 0 ? 0 : 1;
  const ordenados = (furos || []).slice().sort(function(a, b) { return dir * (a - b); });
  let d = 'M ' + x1 + ' ' + y;
  ordenados.forEach(function(fx) {
    const antes = fx - dir * raio;
    const depois = fx + dir * raio;
    d += ' L ' + antes + ' ' + y;
    d += ' A ' + raio + ' ' + raio + ' 0 0 ' + sweep + ' ' + depois + ' ' + y;
  });
  d += ' L ' + x2 + ' ' + y;
  return d;
}

// Mesma alca, mas desenhada com 2 curvas de bezier no PDF (jsPDF nao tem um
// comando nativo de arco de circulo aberto) - kappa e a constante padrao pra
// aproximar um quarto de circulo com bezier cubica.
function desenharAlcaCruzamentoPDF(doc, fx, y, raio) {
  const k = 0.5522847498;
  const S = { x: fx - raio, y: y };
  const TOPO = { x: fx, y: y - raio };
  const E = { x: fx + raio, y: y };
  const P1a = { x: S.x, y: S.y - k * raio };
  const P2a = { x: TOPO.x - k * raio, y: TOPO.y };
  const P1b = { x: TOPO.x + k * raio, y: TOPO.y };
  const P2b = { x: E.x, y: E.y - k * raio };
  doc.lines([
    [P1a.x - S.x, P1a.y - S.y, P2a.x - S.x, P2a.y - S.y, TOPO.x - S.x, TOPO.y - S.y],
    [P1b.x - TOPO.x, P1b.y - TOPO.y, P2b.x - TOPO.x, P2b.y - TOPO.y, E.x - TOPO.x, E.y - TOPO.y]
  ], S.x, S.y, [1, 1], 'S', false);
}

// Desenha o trecho horizontal no PDF (linha reta ou com alcas nos cruzamentos).
function desenharHorizontalComAlcasPDF(doc, x1, x2, y, furos, raio) {
  const dir = x2 >= x1 ? 1 : -1;
  const ordenados = (furos || []).slice().sort(function(a, b) { return dir * (a - b); });
  let atual = x1;
  ordenados.forEach(function(fx) {
    const antes = fx - dir * raio;
    const depois = fx + dir * raio;
    doc.line(atual, y, antes, y);
    desenharAlcaCruzamentoPDF(doc, fx, y, raio);
    atual = depois;
  });
  doc.line(atual, y, x2, y);
}

// Desenha as linhas de roteamento de cabeamento em coordenadas de pixel reais
// (viewBox do SVG casado com o tamanho do canvas), para o tracado nao distorcer
// em plantas que nao sao quadradas. Cada dispositivo manda uma linha pontilhada
// e cotovelada ate um ponto de fusao da sua categoria, perto do ponto de
// equipamento designado - e dali sai um unico tronco ate o ponto, para nao
// poluir com um monte de linhas soltas convergindo direto.
function renderLinhasPlanta() {
  const svg = document.getElementById('planta-editor-linhas');
  const canvasEl = document.getElementById('planta-editor-canvas');
  if (!svg || !canvasEl) return;
  svg.innerHTML = '';
  if (!plantaLinhasVisiveis || !plantaAtual) return;
  const pontos = plantaAtual.pontos || [];
  const marcadores = (plantaAtual.marcadores || []).filter(function(m) { return m.ponto_id; });
  if (!pontos.length || !marcadores.length) return;
  const w = canvasEl.offsetWidth || 1;
  const h = canvasEl.offsetHeight || 1;
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

  const pontosPorId = {};
  pontos.forEach(function(p) { pontosPorId[p.id] = p; });

  const grupos = {};
  marcadores.forEach(function(m) {
    if (!pontosPorId[m.ponto_id]) return;
    if (!grupos[m.ponto_id]) grupos[m.ponto_id] = {};
    if (!grupos[m.ponto_id][m.nome]) grupos[m.ponto_id][m.nome] = { cor: m.cor, marcadores: [] };
    grupos[m.ponto_id][m.nome].marcadores.push(m);
  });

  const NS = 'http://www.w3.org/2000/svg';

  // Primeiro monta um trecho por dispositivo (com o grupo = rack + categoria
  // dele) pra poder calcular os cruzamentos ENTRE grupos diferentes antes de
  // desenhar qualquer coisa - so assim da pra saber onde colocar as alcas.
  const troncos = []; // { cor, px, py, mx, my }
  const trechos = []; // { grupo, dx, dy, mx, my, cor }
  Object.keys(grupos).forEach(function(pontoId) {
    const ponto = pontosPorId[pontoId];
    if (!ponto) return;
    const px = (ponto.x_pct / 100) * w;
    const py = (ponto.y_pct / 100) * h;
    const categorias = Object.keys(grupos[pontoId]);
    categorias.forEach(function(nome, idx) {
      const info = grupos[pontoId][nome];
      const cor = (PLANTA_CORES[info.cor] || PLANTA_CORES.gray).text;
      const angulo = (-60 + idx * 40) * Math.PI / 180;
      const raioManifold = 24;
      const mx = px + Math.cos(angulo) * raioManifold;
      const my = py + Math.sin(angulo) * raioManifold;
      const grupo = pontoId + '|' + nome;
      troncos.push({ cor: cor, px: px, py: py, mx: mx, my: my });
      info.marcadores.forEach(function(m) {
        const dx = (m.x_pct / 100) * w;
        const dy = (m.y_pct / 100) * h;
        trechos.push({ grupo: grupo, dx: dx, dy: dy, mx: mx, my: my, cor: cor });
      });
    });
  });

  calcularAlcasCruzamentoPlanta(trechos);
  const raioAlca = 5;

  trechos.forEach(function(t) {
    const vertical = document.createElementNS(NS, 'line');
    vertical.setAttribute('x1', t.dx); vertical.setAttribute('y1', t.dy);
    vertical.setAttribute('x2', t.dx); vertical.setAttribute('y2', t.my);
    vertical.setAttribute('stroke', t.cor);
    vertical.setAttribute('stroke-width', '1.6');
    vertical.setAttribute('stroke-dasharray', '4,3');
    vertical.setAttribute('opacity', '0.75');
    svg.appendChild(vertical);

    const horizontal = document.createElementNS(NS, 'path');
    horizontal.setAttribute('d', pathHorizontalComAlcasPlanta(t.dx, t.mx, t.my, t.furos, raioAlca));
    horizontal.setAttribute('fill', 'none');
    horizontal.setAttribute('stroke', t.cor);
    horizontal.setAttribute('stroke-width', '1.6');
    horizontal.setAttribute('stroke-dasharray', '4,3');
    horizontal.setAttribute('opacity', '0.75');
    svg.appendChild(horizontal);
  });

  troncos.forEach(function(t) {
    const tronco = document.createElementNS(NS, 'line');
    tronco.setAttribute('x1', t.mx); tronco.setAttribute('y1', t.my);
    tronco.setAttribute('x2', t.px); tronco.setAttribute('y2', t.py);
    tronco.setAttribute('stroke', t.cor);
    tronco.setAttribute('stroke-width', '2.4');
    tronco.setAttribute('stroke-dasharray', '4,3');
    svg.appendChild(tronco);
  });
}

function renderMarcadoresPlanta() {
  const cont = document.getElementById('planta-editor-marcadores');
  if (!cont) return;
  cont.innerHTML = '';
  (plantaAtual.marcadores || []).forEach(function(m) { criarElementoMarcadorPlanta(m, cont); });
}

function criarElementoMarcadorPlanta(marcador, cont) {
  if (!cont) return;
  const cor = PLANTA_CORES[marcador.cor] || PLANTA_CORES.gray;
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:absolute;left:' + marcador.x_pct + '%;top:' + marcador.y_pct + '%;transform:translate(-50%,-50%)';

  const bola = document.createElement('div');
  bola.style.cssText = 'width:30px;height:30px;border-radius:50%;background:' + cor.bg + ';border:1.5px solid ' + cor.text + ';display:flex;align-items:center;justify-content:center;cursor:grab;font-size:15px;box-shadow:0 1px 3px rgba(0,0,0,.18);touch-action:none';
  bola.textContent = emojiDoMarcador(marcador);
  bola.title = marcador.nome + (marcador.observacoes ? ' — ' + marcador.observacoes : '');

  const xBtn = document.createElement('div');
  xBtn.setAttribute('aria-hidden', 'true');
  xBtn.textContent = '×';
  xBtn.style.cssText = 'position:absolute;top:-6px;right:-6px;width:17px;height:17px;border-radius:50%;background:#dc2626;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;line-height:1;cursor:pointer';

  wrap.appendChild(bola);
  wrap.appendChild(xBtn);
  cont.appendChild(wrap);

  xBtn.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
  xBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    excluirMarcadorPlanta(marcador, wrap);
  });

  let moveu = false;
  bola.addEventListener('pointerdown', function(e) {
    e.stopPropagation();
    moveu = false;
    const canvasEl = document.getElementById('planta-editor-canvas');
    const rect = canvasEl.getBoundingClientRect();
    function mover(ev) {
      moveu = true;
      let x = ((ev.clientX - rect.left) / rect.width) * 100;
      let y = ((ev.clientY - rect.top) / rect.height) * 100;
      x = Math.max(1, Math.min(99, x));
      y = Math.max(1, Math.min(99, y));
      wrap.style.left = x + '%';
      wrap.style.top = y + '%';
      marcador.x_pct = x; marcador.y_pct = y;
      renderLinhasPlanta();
    }
    function soltar() {
      document.removeEventListener('pointermove', mover);
      document.removeEventListener('pointerup', soltar);
      plantaUltimoToquePlantaMs = Date.now();
      if (moveu) {
        sbPatch('projetos_planta_marcadores?id=eq.' + marcador.id, { x_pct: marcador.x_pct, y_pct: marcador.y_pct }).catch(function(){});
      } else {
        abrirObsMarcadorPlanta(marcador);
      }
    }
    document.addEventListener('pointermove', mover);
    document.addEventListener('pointerup', soltar);
  });
  // Sem isso, o "click" nativo disparado apos o pointerup vaza pro canvas e
  // cria um marcador novo em cima do que a gente acabou de tocar/mover.
  bola.addEventListener('click', function(e) { e.stopPropagation(); });
}

async function excluirMarcadorPlanta(marcador, wrapEl) {
  if (!confirm(tr('planta_marcador_excluir_confirm'))) return;
  try {
    await sbDelete('projetos_planta_marcadores?id=eq.' + marcador.id);
    plantaAtual.marcadores = plantaAtual.marcadores.filter(function(m) { return m.id !== marcador.id; });
    wrapEl.remove();
    renderLinhasPlanta();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function abrirObsMarcadorPlanta(marcador) {
  plantaMarcadorAtual = marcador;
  document.getElementById('planta-obs-titulo').textContent = emojiDoMarcador(marcador) + ' ' + marcador.nome;
  document.getElementById('planta-obs-texto').value = marcador.observacoes || '';
  abrirModal('m-planta-obs');
}

async function salvarObsPlanta() {
  if (!plantaMarcadorAtual) return;
  const texto = document.getElementById('planta-obs-texto')?.value || '';
  try {
    await sbPatch('projetos_planta_marcadores?id=eq.' + plantaMarcadorAtual.id, { observacoes: texto });
    plantaMarcadorAtual.observacoes = texto;
    fecharModal('m-planta-obs');
    toast(tr('planta_obs_salva'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function excluirMarcadorPlantaAtual() {
  if (!plantaMarcadorAtual) return;
  if (!confirm(tr('planta_marcador_excluir_confirm'))) return;
  const marcador = plantaMarcadorAtual;
  try {
    await sbDelete('projetos_planta_marcadores?id=eq.' + marcador.id);
    plantaAtual.marcadores = plantaAtual.marcadores.filter(function(m) { return m.id !== marcador.id; });
    fecharModal('m-planta-obs');
    renderMarcadoresPlanta();
    renderLinhasPlanta();
    toast(tr('planta_marcador_excluido'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function todosTiposIconePlanta() {
  const custom = plantaTiposCustom.map(function(t) {
    return { chave: '', id: t.id, nome: t.nome, emoji: t.emoji, cor: t.cor || 'gray', kw: (t.nome || '').toLowerCase() };
  });
  return PLANTA_ICONES_PADRAO.concat(custom);
}

// Ícones padrão são resolvidos pela chave (nunca guardamos o emoji deles no banco,
// só o das customizados) - evita qualquer corrupção de encoding no ida-e-volta com o banco.
function emojiDoMarcador(marcador) {
  if (marcador.icone_chave) {
    const padrao = PLANTA_ICONES_PADRAO.find(function(t) { return t.chave === marcador.icone_chave; });
    if (padrao) return padrao.emoji;
  }
  return marcador.emoji || '📍';
}

function abrirBibliotecaIcones() {
  document.getElementById('planta-icone-busca').value = '';
  document.getElementById('planta-novo-tipo-form').style.display = 'none';
  document.getElementById('pti-nome').value = '';
  document.getElementById('pti-emoji').value = '';
  montarCoresPickerPlanta();
  renderizarGradeIcones('');
  abrirModal('m-planta-biblioteca');
}

function renderizarGradeIcones(q) {
  const grid = document.getElementById('planta-icones-grid');
  if (!grid) return;
  const termo = (q || '').trim().toLowerCase();
  const todos = todosTiposIconePlanta();
  const filtrados = termo ? todos.filter(function(t) { return t.kw.indexOf(termo) !== -1 || t.nome.toLowerCase().indexOf(termo) !== -1; }) : todos;
  grid.innerHTML = '';
  if (!filtrados.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#bbb;font-size:12px;padding:20px">' + tr('planta_icone_nao_encontrado') + '</div>';
    return;
  }
  filtrados.forEach(function(tipo) {
    const cor = PLANTA_CORES[tipo.cor] || PLANTA_CORES.gray;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;border-radius:10px;border:1px solid #e8e8e5;background:' + cor.bg + ';cursor:pointer';
    btn.innerHTML = '<span style="font-size:20px">' + tipo.emoji + '</span><span style="font-size:9.5px;color:' + cor.text + ';text-align:center;line-height:1.2">' + tipo.nome + '</span>';
    btn.onclick = function() { armarTipoPlanta(tipo); };
    grid.appendChild(btn);
  });
}

function toggleNovoTipoIcone() {
  const form = document.getElementById('planta-novo-tipo-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function montarCoresPickerPlanta() {
  plantaCorEscolhida = 'blue';
  const cont = document.getElementById('pti-cores');
  if (!cont) return;
  cont.innerHTML = '';
  Object.keys(PLANTA_CORES).forEach(function(key) {
    const cor = PLANTA_CORES[key];
    const b = document.createElement('button');
    b.type = 'button';
    b.style.cssText = 'width:26px;height:26px;border-radius:50%;background:' + cor.bg + ';border:2px solid ' + (key === plantaCorEscolhida ? cor.text : 'transparent') + ';cursor:pointer';
    b.onclick = function() {
      plantaCorEscolhida = key;
      Array.from(cont.children).forEach(function(c) { c.style.borderColor = 'transparent'; });
      b.style.borderColor = cor.text;
    };
    cont.appendChild(b);
  });
}

async function salvarNovoTipoIcone() {
  const nome = document.getElementById('pti-nome')?.value.trim();
  const emoji = document.getElementById('pti-emoji')?.value.trim();
  if (!nome || !emoji) { toast(tr('planta_tipo_campos_obrigatorios'), 'err'); return; }
  try {
    const [criado] = await sbPost('projetos_planta_tipos_icone', { nome, emoji, cor: plantaCorEscolhida, criado_por: ME.nome });
    plantaTiposCustom.push(criado);
    toggleNovoTipoIcone();
    renderizarGradeIcones(document.getElementById('planta-icone-busca')?.value || '');
    toast(tr('planta_tipo_salvo'), 'ok');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function hexParaRgbPlanta(hex) {
  const h = (hex || '#888888').replace('#', '');
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
}

// Relatorio em PDF da planta: capa, resumo por tipo de dispositivo (com quantidade),
// croqui com a planta e os marcadores numerados, e lista detalhada com as observacoes
// de cada um - serve tanto de referencia pra equipe (croqui) quanto pra mandar pro cliente.
// Monta o PDF do relatorio da planta e devolve o objeto jsPDF pronto (ja numerado),
// sem salvar/baixar - quem chama decide se baixa (gerarRelatorioPlanta) ou sobe pro
// Drive de uma OS (selecionarOSParaPlanta), igual ao gerarRackPDFBlob do Rack.
async function construirRelatorioPlantaPDF() {
  if (!plantaAtual.imagem_drive_id) throw new Error(tr('planta_relatorio_erro_imagem'));
  const conectado = await garantirTokenDrive();
  if (!conectado) throw new Error(tr('drive_conecte_primeiro'));

  // Baixa a imagem de fundo autenticada via API do Drive (evita problema de CORS
  // que o link publico de compartilhamento teria dentro de um <canvas>/jsPDF).
  const imgResp = await fetch('https://www.googleapis.com/drive/v3/files/' + plantaAtual.imagem_drive_id + '?alt=media', {
    headers: { 'Authorization': 'Bearer ' + googleToken }
  });
  if (!imgResp.ok) throw new Error(tr('planta_relatorio_erro_imagem'));
  const imgBlob = await imgResp.blob();
  const imgDataUrl = await new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.onload = function() { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(imgBlob);
  });
  const dims = await new Promise(function(resolve, reject) {
    const im = new Image();
    im.onload = function() { resolve({ w: im.naturalWidth, h: im.naturalHeight }); };
    im.onerror = reject;
    im.src = imgDataUrl;
  });

  const marcadores = (plantaAtual.marcadores || []).slice();

  // Agrupa os marcadores por ponto de equipamento (rack), na ordem em que os
  // pontos foram criados - o relatorio separa a "Resumo por tipo" e a "Lista
  // detalhada" por rack em vez de uma lista unica, pra facilitar a instalacao.
  // Marcadores sem ponto atribuido (ou apontando pra um ponto ja excluido)
  // caem num grupo "Sem ponto definido" no final. O indice original (idx) e
  // preservado pra numeracao continuar batendo com os circulos do croqui.
  const pontosRelatorio = plantaAtual.pontos || [];
  const pontosPorIdPdf = {};
  pontosRelatorio.forEach(function(p) { pontosPorIdPdf[p.id] = p; });
  function agruparPorPontoPlanta(lista) {
    const porPonto = {};
    lista.forEach(function(item) {
      const chave = (item.marcador.ponto_id && pontosPorIdPdf[item.marcador.ponto_id]) ? item.marcador.ponto_id : '__sem_ponto__';
      if (!porPonto[chave]) porPonto[chave] = [];
      porPonto[chave].push(item);
    });
    const grupos = [];
    pontosRelatorio.forEach(function(p) {
      if (porPonto[p.id]) grupos.push({ nome: p.nome, itens: porPonto[p.id] });
    });
    if (porPonto['__sem_ponto__']) grupos.push({ nome: tr('planta_relatorio_sem_ponto'), itens: porPonto['__sem_ponto__'] });
    return grupos;
  }
  const marcadoresComIdx = marcadores.map(function(m, idx) { return { marcador: m, idx: idx }; });
  const gruposRack = pontosRelatorio.length ? agruparPorPontoPlanta(marcadoresComIdx) : [{ nome: null, itens: marcadoresComIdx }];

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const dataHoje = new Date().toLocaleDateString(LANG === 'pt' ? 'pt-BR' : 'en-US');
  let y = 0;

  function garantirEspaco(altura, tituloContinuacao) {
    if (y + altura > pageH - 60) {
      doc.addPage();
      y = desenharCabecalhoLevePDF(doc, tituloContinuacao || plantaAtual.nome) + 14;
    }
  }

  // ── Capa: barra da empresa + titulo do documento + nome da planta ──
  const alturaBarra = await desenharCabecalhoPDF(doc, tr('planta_relatorio_pdf_titulo'));
  y = alturaBarra + 38;
  doc.setFontSize(10.5);
  doc.setTextColor(150);
  doc.text(tr('planta_relatorio_pdf_titulo').toUpperCase(), margin, y);
  y += 20;
  doc.setTextColor(20, 20, 20);
  doc.setFontSize(19);
  doc.text(plantaAtual.nome, margin, y);
  y += 18;
  doc.setFontSize(9.5);
  doc.setTextColor(140);
  doc.text(tr('planta_relatorio_data') + ': ' + dataHoje + '   ·   ' + tr('planta_relatorio_total_dispositivos') + ': ' + marcadores.length, margin, y);
  y += 34;

  // ── Resumo por tipo, separado por rack (tabela com listras por grupo) ──
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('planta_relatorio_resumo_titulo'), margin, y);
  y += 20;

  if (!marcadores.length) {
    doc.setFillColor(247, 247, 245);
    doc.roundedRect(margin, y, pageW - margin * 2, 40, 6, 6, 'F');
    doc.setFontSize(10.5);
    doc.setTextColor(140);
    doc.text(tr('planta_relatorio_sem_dispositivos'), margin + 14, y + 24);
    y += 56;
  } else {
    const linhaAltura = 24;
    const tabelaW = pageW - margin * 2;

    gruposRack.forEach(function(grupo) {
      garantirEspaco(40, plantaAtual.nome);
      if (grupo.nome) {
        doc.setFontSize(10.5);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text(grupo.nome, margin, y);
        doc.setFont(undefined, 'normal');
        y += 16;
      }

      const contagem = {};
      grupo.itens.forEach(function(item) {
        const m = item.marcador;
        if (!contagem[m.nome]) contagem[m.nome] = { nome: m.nome, cor: m.cor, qtd: 0 };
        contagem[m.nome].qtd++;
      });
      const resumo = Object.values(contagem).sort(function(a, b) { return b.qtd - a.qtd; });

      doc.setFontSize(8.5);
      doc.setTextColor(150);
      doc.text(tr('planta_relatorio_col_dispositivo').toUpperCase(), margin + 18, y);
      doc.text(tr('planta_relatorio_col_qtd').toUpperCase(), pageW - margin, y, { align: 'right' });
      y += 8;
      doc.setDrawColor(225, 225, 220);
      doc.setLineWidth(1);
      doc.line(margin, y, pageW - margin, y);
      y += linhaAltura - 8;

      resumo.forEach(function(item, i) {
        garantirEspaco(linhaAltura, plantaAtual.nome);
        if (i % 2 === 0) {
          doc.setFillColor(249, 249, 247);
          doc.rect(margin, y - 16, tabelaW, linhaAltura, 'F');
        }
        const cor = PLANTA_CORES[item.cor] || PLANTA_CORES.gray;
        const rgb = hexParaRgbPlanta(cor.text);
        doc.setFillColor(rgb.r, rgb.g, rgb.b);
        doc.circle(margin + 9, y - 5, 5, 'F');
        doc.setFontSize(10.5);
        doc.setTextColor(30);
        doc.text(item.nome, margin + 22, y);
        doc.setFontSize(10.5);
        doc.setTextColor(20, 20, 20);
        const qtdTxt = String(item.qtd) + ' ' + (item.qtd === 1 ? tr('planta_relatorio_unidade') : tr('planta_relatorio_unidades'));
        doc.text(qtdTxt, pageW - margin, y, { align: 'right' });
        y += linhaAltura;
      });
      y += 18;
    });
  }

  // ── Croqui: planta com marcadores numerados (referencia visual pra equipe) ──
  doc.addPage();
  y = desenharCabecalhoLevePDF(doc, plantaAtual.nome);
  y += 16;
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('planta_relatorio_croqui_titulo'), margin, y);
  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(140);
  doc.text(tr('planta_relatorio_croqui_legenda'), margin, y + 12);
  y += 26;

  const maxW = pageW - margin * 2;
  const maxH = pageH - y - 60;
  let drawW = maxW;
  let drawH = drawW * (dims.h / dims.w);
  if (drawH > maxH) { drawH = maxH; drawW = drawH * (dims.w / dims.h); }
  const imgX = margin + (maxW - drawW) / 2;
  const imgY = y;

  doc.setDrawColor(225, 225, 220);
  doc.setLineWidth(1);
  doc.rect(imgX - 1, imgY - 1, drawW + 2, drawH + 2);
  doc.addImage(imgDataUrl, 'PNG', imgX, imgY, drawW, drawH);

  // ── Rotas de cabeamento (linhas pontilhadas ate o ponto de equipamento,
  // com uma alca por cima onde uma rota cruza a de outro rack/categoria) ──
  // desenhadas ANTES dos circulos numerados, pra ficarem por baixo deles no croqui.
  const marcadoresComPonto = marcadores.filter(function(m) { return m.ponto_id && pontosPorIdPdf[m.ponto_id]; });
  if (pontosRelatorio.length && marcadoresComPonto.length) {
    const gruposPdf = {};
    marcadoresComPonto.forEach(function(m) {
      if (!gruposPdf[m.ponto_id]) gruposPdf[m.ponto_id] = {};
      if (!gruposPdf[m.ponto_id][m.nome]) gruposPdf[m.ponto_id][m.nome] = { cor: m.cor, marcadores: [] };
      gruposPdf[m.ponto_id][m.nome].marcadores.push(m);
    });

    const troncosPdf = [];
    const trechosPdf = [];
    Object.keys(gruposPdf).forEach(function(pontoId) {
      const ponto = pontosPorIdPdf[pontoId];
      const px = imgX + (ponto.x_pct / 100) * drawW;
      const py = imgY + (ponto.y_pct / 100) * drawH;
      const categorias = Object.keys(gruposPdf[pontoId]);
      categorias.forEach(function(nome, idx) {
        const info = gruposPdf[pontoId][nome];
        const cor = PLANTA_CORES[info.cor] || PLANTA_CORES.gray;
        const angulo = (-60 + idx * 40) * Math.PI / 180;
        const raioManifold = 16;
        const mx = px + Math.cos(angulo) * raioManifold;
        const my = py + Math.sin(angulo) * raioManifold;
        const grupo = pontoId + '|' + nome;
        troncosPdf.push({ cor: cor, px: px, py: py, mx: mx, my: my });
        info.marcadores.forEach(function(m) {
          const dx = imgX + (m.x_pct / 100) * drawW;
          const dy = imgY + (m.y_pct / 100) * drawH;
          trechosPdf.push({ grupo: grupo, dx: dx, dy: dy, mx: mx, my: my, cor: cor });
        });
      });
    });

    calcularAlcasCruzamentoPlanta(trechosPdf);
    const raioAlcaPdf = 3.2;

    doc.setLineDashPattern([2.2, 1.6], 0);
    trechosPdf.forEach(function(t) {
      const rgb = hexParaRgbPlanta(t.cor.text);
      doc.setDrawColor(rgb.r, rgb.g, rgb.b);
      doc.setLineWidth(0.8);
      doc.line(t.dx, t.dy, t.dx, t.my);
      desenharHorizontalComAlcasPDF(doc, t.dx, t.mx, t.my, t.furos, raioAlcaPdf);
    });
    troncosPdf.forEach(function(t) {
      const rgb = hexParaRgbPlanta(t.cor.text);
      doc.setDrawColor(rgb.r, rgb.g, rgb.b);
      doc.setLineWidth(1.3);
      doc.line(t.mx, t.my, t.px, t.py);
    });
    doc.setLineDashPattern([], 0);

    pontosRelatorio.forEach(function(p) {
      const px = imgX + (p.x_pct / 100) * drawW;
      const py = imgY + (p.y_pct / 100) * drawH;
      doc.setFillColor(26, 26, 26);
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(1.2);
      doc.roundedRect(px - 11, py - 11, 22, 22, 4, 4, 'FD');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(iniciaisPonto(p.nome), px, py + 2.6, { align: 'center' });
    });
  }

  marcadores.forEach(function(m, idx) {
    const cor = PLANTA_CORES[m.cor] || PLANTA_CORES.gray;
    const rgb = hexParaRgbPlanta(cor.text);
    const px = imgX + (m.x_pct / 100) * drawW;
    const py = imgY + (m.y_pct / 100) * drawH;
    doc.setFillColor(rgb.r, rgb.g, rgb.b);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.2);
    doc.circle(px, py, 9, 'FD');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(String(idx + 1), px, py + 2.8, { align: 'center' });
  });

  // ── Lista detalhada, separada por rack: cada dispositivo num "card" proprio,
  // numeracao bate com o croqui (o indice original e preservado no agrupamento) ──
  doc.addPage();
  y = desenharCabecalhoLevePDF(doc, plantaAtual.nome);
  y += 16;
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('planta_relatorio_lista_titulo'), margin, y);
  y += 24;

  if (!marcadores.length) {
    doc.setFillColor(247, 247, 245);
    doc.roundedRect(margin, y, pageW - margin * 2, 40, 6, 6, 'F');
    doc.setFontSize(10.5);
    doc.setTextColor(140);
    doc.text(tr('planta_relatorio_sem_dispositivos'), margin + 14, y + 24);
  } else {
    const larguraCard = pageW - margin * 2;
    gruposRack.forEach(function(grupo) {
      garantirEspaco(30, plantaAtual.nome);
      if (grupo.nome) {
        doc.setFontSize(11.5);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text(grupo.nome, margin, y);
        doc.setFont(undefined, 'normal');
        y += 20;
      }
      grupo.itens.forEach(function(item) {
        const m = item.marcador;
        const idx = item.idx;
        const obsTexto = (m.observacoes && m.observacoes.trim()) ? m.observacoes.trim() : tr('planta_relatorio_sem_obs');
        const linhas = doc.splitTextToSize(obsTexto, larguraCard - 34);
        const alturaCard = 22 + linhas.length * 12 + 14;
        garantirEspaco(alturaCard + 8, plantaAtual.nome);

        const cor = PLANTA_CORES[m.cor] || PLANTA_CORES.gray;
        const rgb = hexParaRgbPlanta(cor.text);

        doc.setFillColor(249, 249, 247);
        doc.roundedRect(margin, y - 16, larguraCard, alturaCard, 6, 6, 'F');

        doc.setFillColor(rgb.r, rgb.g, rgb.b);
        doc.circle(margin + 17, y - 3, 9, 'F');
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.text(String(idx + 1), margin + 17, y, { align: 'center' });

        doc.setFontSize(11.5);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text(m.nome, margin + 34, y);
        doc.setFont(undefined, 'normal');

        doc.setFontSize(9.5);
        doc.setTextColor(m.observacoes && m.observacoes.trim() ? 90 : 165);
        doc.text(linhas, margin + 34, y + 16);

        y += alturaCard + 8;
      });
      y += 6;
    });
  }

  numerarPaginasPDF(doc);
  return doc;
}
async function gerarRelatorioPlanta() {
  if (!plantaAtual) return;
  const btn = document.getElementById('planta-relatorio-btn');
  const statusEl = document.getElementById('planta-relatorio-status');
  if (btn) btn.disabled = true;
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#555'; statusEl.textContent = tr('planta_relatorio_gerando'); }
  try {
    const doc = await construirRelatorioPlantaPDF();
    doc.save((plantaAtual.nome || 'planta').replace(/[^a-z0-9 _-]/gi, '') + ' - Relatorio.pdf');
    if (statusEl) statusEl.style.display = 'none';
    toast(tr('planta_relatorio_gerado'), 'ok');
  } catch(e) {
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('erro_prefix') + e.message; }
    toast(tr('erro_prefix') + e.message, 'err');
  } finally {
    if (btn) btn.disabled = false;
  }
}
let plantaOSListaCache = null;

async function abrirEnviarPlantaOS() {
  if (!plantaAtual) return;
  document.getElementById('peos-busca').value = '';
  document.getElementById('peos-lista').innerHTML = '<div style="padding:14px;text-align:center;color:#bbb;font-size:12px">' + tr('loading') + '</div>';
  document.getElementById('peos-status').style.display = 'none';
  abrirModal('m-planta-enviar-os');
  try {
    plantaOSListaCache = await sbGet('ordens_servico?status=in.(aberta,agendada,em_campo)&order=created_at.desc');
  } catch(e) {
    plantaOSListaCache = [];
  }
  renderizarListaOSParaPlanta(plantaOSListaCache);
}

function filtrarOSParaPlanta(q) {
  if (!plantaOSListaCache) return;
  const termo = (q || '').toLowerCase();
  const filtrada = plantaOSListaCache.filter(function(o) {
    return (o.cliente_nome || '').toLowerCase().includes(termo) || String(o.numero || '').toLowerCase().includes(termo);
  });
  renderizarListaOSParaPlanta(filtrada);
}

function renderizarListaOSParaPlanta(lista) {
  const cont = document.getElementById('peos-lista');
  if (!lista.length) {
    cont.innerHTML = '<div style="padding:14px;text-align:center;color:#bbb;font-size:12px">' + tr('rack_os_nenhuma_aberta') + '</div>';
    return;
  }
  cont.innerHTML = lista.map(function(o) {
    return '<div onclick="selecionarOSParaPlanta(\'' + o.id + '\')" style="padding:10px 14px;border-bottom:1px solid #f0f0ed;cursor:pointer;font-size:13px" onmouseover="this.style.background=\'#f9f9f7\'" onmouseout="this.style.background=\'\'">'
      + '<div style="font-weight:500">' + (o.cliente_nome || '') + '</div>'
      + '<div style="font-size:11px;color:#888">' + tr('rack_os_numero_label') + ' ' + (o.numero || o.id.slice(0,8)) + ' · ' + tr('status_' + o.status) + '</div>'
    + '</div>';
  }).join('');
}

async function selecionarOSParaPlanta(osId) {
  if (!plantaAtual) return;
  const statusEl = document.getElementById('peos-status');
  statusEl.style.display = 'block';
  statusEl.style.color = '#555';
  statusEl.textContent = tr('planta_enviando_os');
  try {
    const os = plantaOSListaCache.find(function(o) { return o.id === osId; });
    const folderId = await getOuCriarPastaOS(osId, os);
    if (!folderId) { statusEl.style.color = '#e74c3c'; statusEl.textContent = tr('drive_erro_pasta'); return; }
    const doc = await construirRelatorioPlantaPDF();
    const blob = doc.output('blob');
    const nomeArquivo = 'Planta - ' + plantaAtual.nome + '.pdf';
    const arquivo = new File([blob], nomeArquivo, { type: 'application/pdf' });
    const d = await uploadDrive(arquivo, folderId);
    if (!d.id) throw new Error('upload');
    await sbPatch('projetos_plantas?id=eq.' + plantaAtual.id, { os_id: osId });
    plantaAtual.os_id = osId;
    statusEl.style.color = '#166534';
    statusEl.textContent = tr('planta_enviado_os_sucesso');
    toast(tr('planta_enviado_os_sucesso'), 'ok');
    setTimeout(function() { fecharModal('m-planta-enviar-os'); }, 900);
  } catch(e) {
    statusEl.style.color = '#e74c3c';
    statusEl.textContent = tr('erro_prefix') + e.message;
  }
}

async function abrirPreviewPlantaDaOS(plantaId) {
  try {
    const rows = await sbGet('projetos_plantas?id=eq.' + plantaId);
    const p = rows[0];
    if (!p) { toast(tr('planta_nao_encontrada'), 'err'); return; }
    let marcadores = [];
    try { marcadores = await sbGet('projetos_planta_marcadores?planta_id=eq.' + plantaId + '&order=criado_em.asc'); } catch(e) {}
    document.getElementById('planta-preview-titulo').textContent = p.nome;
    document.getElementById('planta-preview-img').src = p.imagem_url;
    const cont = document.getElementById('planta-preview-marcadores');
    cont.innerHTML = '';
    marcadores.forEach(function(m, idx) {
      const cor = PLANTA_CORES[m.cor] || PLANTA_CORES.gray;
      const dot = document.createElement('div');
      dot.style.cssText = 'position:absolute;left:' + m.x_pct + '%;top:' + m.y_pct + '%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:50%;background:' + cor.text + ';border:1.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:600';
      dot.textContent = String(idx + 1);
      dot.title = m.nome + (m.observacoes ? ' — ' + m.observacoes : '');
      cont.appendChild(dot);
    });
    document.getElementById('planta-preview-contagem').textContent = marcadores.length + ' ' + (marcadores.length === 1 ? tr('planta_relatorio_unidade') : tr('planta_relatorio_unidades'));
    const abrirBtn = document.getElementById('planta-preview-abrir-btn');
    abrirBtn.onclick = function () { fecharModal('m-planta-preview'); abrirPlantaDaOS(plantaId); };
    abrirModal('m-planta-preview');
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function abrirPlantaDaOS(plantaId) {
  fecharOSDetalhe();
  goPage(null, 'projetos-planta', 'Planta', 'Projetos');
  await abrirEditorPlanta(plantaId);
}



// ── PERMISSÕES POR FUNCIONÁRIO ──────────────────────────────────
const PERMISSOES_ESTRUTURA = [
  { label: 'Comercial', itens: [
      { id: 'acomp-vendas', label: 'Acomp. de vendas' },
      { id: 'contratos', label: 'Contratos' },
      { id: 'fat-consolidado', label: 'Fat. consolidado' },
      { id: 'crm-clientes', label: 'Clientes' },
      { id: 'crm-orcamentos', label: 'Orçamentos' },
      { id: 'crm-followups', label: 'Follow-ups' },
      { id: 'crm-comissoes', label: 'Comissões' },
      { id: 'crm-consultores', label: 'Consultores' },
      { id: 'crm-reprovacao', label: 'Motivos de reprovação' }
  ]},
  { label: 'Financeiro', itens: [
      { id: 'fin-banco', label: 'Banco' },
      { id: 'fin-dre', label: 'DRE' },
      { id: 'fin-indicadores', label: 'Indicadores' },
      { id: 'fin-analise', label: 'Análise CR/CP' },
      { id: 'fin-fluxo', label: 'Fluxo de caixa' },
      { id: 'ferramentas', label: 'Gestão patrimônio · Ferramentas' },
      { id: 'fin-veiculos', label: 'Gestão patrimônio · Veículos' },
      { id: 'fin-custeio', label: 'Custeio' },
      { id: 'fin-rentabilidade', label: 'Rentabilidade por OS' },
      { id: 'desp-lancar', label: 'Despesas · Lançar' },
      { id: 'desp-aprovar', label: 'Despesas · Aprovar' },
      { id: 'fin-frota', label: 'Controle de frota' },
      { id: 'fin-cadastros', label: 'Cadastros' }
  ]},
  { label: 'Operações', itens: [
      { id: 'kshcam', label: 'Ordem de serviço' },
      { id: 'tarefas', label: 'Tarefas' },
      { id: 'agenda', label: 'Agenda' }
  ]},
  { label: 'Projetos', itens: [ { id: 'projetos-rack', label: 'Rack' }, { id: 'projetos-planta', label: 'Planta' } ] },
  { label: 'Gestão de Pessoas', itens: [ { id: 'tecnicos', label: 'Funcionários' } ] },
  { label: 'Registros', itens: [ { id: 'documentos', label: 'Documentos' } ] }
];

function temPermissao(pageId) {
  if (pageId === 'inicio') return true;
  if (!ME) return true;
  if (ME.funcao === 'Gestor') return true;
  return Array.isArray(ME.paginas_permitidas) && ME.paginas_permitidas.includes(pageId);
}

function aplicarPermissoesSidebar() {
  if (!ME || ME.funcao === 'Gestor') return;
  document.querySelectorAll('.sb-item,.sb-child,.h-card').forEach(el => {
    const m = (el.getAttribute('onclick') || '').match(/goPage\(([^,]+),\s*'([^']+)'/);
    if (!m) return;
    const pageId = m[2];
    if (pageId === 'inicio' || temPermissao(pageId)) return;
    el.style.display = 'none';
  });
}

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('load', function() {
  aplicarI18n();
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
