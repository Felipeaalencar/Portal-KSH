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
  planta_zoom_hint: { en: 'drag to pan when zoomed in', pt: 'arraste pra navegar quando der zoom' },
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

// ── GERAR PDF DA PROPOSTA (modelo cover / areas & itens / resumo financeiro / parcelamento) ──
function gerarPropostaPDF() {
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
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, pageW, 130, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text('KILIAN SMART HOMES', margin, 55);
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text('South Florida  ·  Smart Home & AV Integration', margin, 74);
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text(tr('orc_pdf_proposta_titulo').toUpperCase(), margin, 108);

  y = 165;
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
  const funcao = document.getElementById('tec-funcao')?.value;
  const locked = document.getElementById('tec-perm-locked');
  const tree = document.getElementById('tec-perm-tree');
  if (!locked || !tree) return;
  if (funcao === 'Gestor') {
    locked.style.display = 'block';
    locked.innerHTML = '🔒 ' + tr('perm_acesso_total');
    tree.style.display = 'none';
  } else {
    locked.style.display = 'none';
    tree.style.display = 'block';
    renderArvorePermissoesTec();
  }
}

async function upsertUsuarioPermissoes(email, nome, funcao) {
  if (!email) return;
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
    renderOSLista(osData);
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
  renderOSLista(osData.filter(o => (!s||o.status===s) && (!q||(o.titulo||'').toLowerCase().includes(q)||(o.cliente||o.cliente_nome||'').toLowerCase().includes(q)||String(o.numero||'').includes(q))));
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

  let fotos = [], notas = [], dias = [], gastos = [], racksVinculados = [];
  try {
    [fotos, notas, dias, gastos, racksVinculados] = await Promise.all([
      sbGet('os_fotos?os_id=eq.' + id + '&order=criado_em.desc'),
      sbGet('os_notas?os_id=eq.' + id + '&order=criado_em.asc'),
      sbGet('os_dias?os_id=eq.' + id + '&order=data.asc'),
      sbGet('os_gastos?os_id=eq.' + id + '&order=criado_em.desc'),
      sbGet('projetos_racks?os_id=eq.' + id)
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
  if (statusEl) { statusEl.style.display = 'block'; statusEl.textContent = tr('os_gerando'); }
  try {
    const r = await fetch(SB_URL + '/functions/v1/resumo-nota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ texto })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Erro');
    if (statusEl) statusEl.style.display = 'none';
    mostrarPreviaResumoOS(osId, d.resumo || texto);
  } catch(e) {
    if (statusEl) statusEl.style.display = 'none';
    toast(tr('erro_prefix') + e.message, 'err');
  }
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
    abrirOS(osId);
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
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
    let y = 50;

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
    const r = await fetch(SB_URL + '/functions/v1/resumo-nota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ texto })
    });
    if (!r.ok) {
      let detalhe = '';
      try { const dj = await r.json(); detalhe = dj.error || ''; } catch(e2) {}
      throw new Error('HTTP ' + r.status + (detalhe ? ' - ' + detalhe : ''));
    }
    const d = await r.json();
    mostrarPreviaNota(osId, d.resumo || texto);
  } catch(e) {
    // IA ainda não disponível: mostra o motivo (debug) e não trava o técnico, salva a anotação direto
    console.error('resumo-nota falhou:', e);
    toast((LANG==='pt' ? 'IA indisponível: ' : 'AI unavailable: ') + e.message, 'err');
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
    const r = await fetch(SB_URL + '/functions/v1/resumo-nota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({ texto })
    });
    if (!r.ok) {
      let detalhe = '';
      try { const dj = await r.json(); detalhe = dj.error || ''; } catch(e2) {}
      throw new Error('HTTP ' + r.status + (detalhe ? ' - ' + detalhe : ''));
    }
    const d = await r.json();
    mostrarPreviaNotepad(osId, d.resumo || texto);
  } catch(e) {
    console.error('resumo-nota (notepad) falhou:', e);
    toast((LANG==='pt' ? 'IA indisponível: ' : 'AI unavailable: ') + e.message, 'err');
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
  el.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb">' + tr('loading') + '</div>';
  try {
    const [os, dias, gastos, tecnicos] = await Promise.all([
      sbGet('ordens_servico?order=numero.desc'),
      sbGet('os_dias?order=data.asc'),
      sbGet('os_gastos?order=criado_em.desc'),
      sbGet('tecnicos?order=nome')
    ]);
    rentabilidadeData = { os, dias, gastos, tecnicos };
    osData = os;
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:#e74c3c">' + e.message + '</div>';
    return;
  }

  rentFiltroCobranca = 'todos';
  rentFiltroTecnico = 'todos';
  rentFiltroStatus = 'todos';

  el.innerHTML = '<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:14px;align-items:center">'
    + '<div id="rent-filtro-status" style="display:flex;gap:6px"></div>'
    + '<div id="rent-filtro-cobranca" style="display:flex;gap:6px"></div>'
    + '<div id="rent-filtro-tecnico" style="display:flex;gap:6px;flex-wrap:wrap"></div>'
    + '</div>'
    + '<div id="rent-tabela"></div>';

  renderRentabilidadeTabela();
}

function rentToggleCobranca(v) { rentFiltroCobranca = v; renderRentabilidadeTabela(); }
function rentToggleTecnico(nome) { rentFiltroTecnico = (rentFiltroTecnico === nome) ? 'todos' : nome; renderRentabilidadeTabela(); }
function rentToggleStatus(v) { rentFiltroStatus = v; renderRentabilidadeTabela(); }

function renderRentabilidadeTabela() {
  const { os, dias, gastos, tecnicos } = rentabilidadeData;

  const filtroStatusEl = document.getElementById('rent-filtro-status');
  if (filtroStatusEl) filtroStatusEl.innerHTML = ['todos','andamento','concluida'].map(v =>
    chipTecnicoHTML(v, v==='todos'?tr('rent_status_todos'):(v==='andamento'?tr('rent_status_andamento'):tr('rent_status_concluida')), rentFiltroStatus===v, 'rentToggleStatus')
  ).join('');
  const filtroEl = document.getElementById('rent-filtro-cobranca');
  if (filtroEl) filtroEl.innerHTML = ['todos','a_cobrar','cobrado'].map(v =>
    chipTecnicoHTML(v, v==='todos'?tr('resumo_todos'):(v==='a_cobrar'?tr('resumo_a_cobrar'):tr('resumo_cobrado')), rentFiltroCobranca===v, 'rentToggleCobranca')
  ).join('');
  const filtroTecEl = document.getElementById('rent-filtro-tecnico');
  if (filtroTecEl) filtroTecEl.innerHTML = tecnicos.map(t =>
    chipTecnicoHTML(t.nome, t.nome, rentFiltroTecnico===t.nome, 'rentToggleTecnico')
  ).join('');

  let linhasOS = os.slice();
  if (rentFiltroStatus === 'andamento') linhasOS = linhasOS.filter(o => o.status !== 'concluida');
  else if (rentFiltroStatus === 'concluida') linhasOS = linhasOS.filter(o => o.status === 'concluida');
  if (rentFiltroCobranca !== 'todos') linhasOS = linhasOS.filter(o => (o.status_cobranca||'a_cobrar') === rentFiltroCobranca);

  let linhas = linhasOS.map(o => {
    const diasOS = dias.filter(d => d.os_id === o.id);
    const gastosOS = gastos.filter(g => g.os_id === o.id);
    const r = calcularResumoValores(diasOS, gastosOS, tecnicos);
    const tecsDaOS = new Set();
    diasOS.forEach(d => (d.tecnicos||[]).forEach(n => tecsDaOS.add(n)));
    return { os: o, resumo: r, tecnicos: Array.from(tecsDaOS) };
  });
  if (rentFiltroTecnico !== 'todos') linhas = linhas.filter(l => l.tecnicos.includes(rentFiltroTecnico));

  const tabela = document.getElementById('rent-tabela');
  if (!tabela) return;
  if (!linhas.length) { tabela.innerHTML = '<div style="text-align:center;color:#bbb;font-size:12px;padding:30px">' + tr('rentabilidade_vazio') + '</div>'; return; }

  let totalOrcado = 0, totalCusto = 0;

  let html = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px;min-width:640px">';
  html += '<tr style="background:#f5f5f3;text-align:left">'
    + '<th style="padding:8px 10px">' + tr('rent_th_os') + '</th>'
    + '<th style="padding:8px 10px">' + tr('rent_th_cliente') + '</th>'
    + '<th style="padding:8px 10px">' + tr('os_status_label') + '</th>'
    + '<th style="padding:8px 10px">' + tr('label_valor_orcado') + '</th>'
    + '<th style="padding:8px 10px">' + tr('resumo_custo_real') + '</th>'
    + '<th style="padding:8px 10px">' + tr('resumo_margem') + '</th>'
    + '<th style="padding:8px 10px">' + tr('resumo_cobranca_label') + '</th>'
    + '</tr>';

  linhas.forEach(l => {
    const orcado = l.os.valor_orcado != null ? Number(l.os.valor_orcado) : null;
    const custo = l.resumo.totalGeral;
    totalCusto += custo;
    if (orcado != null) totalOrcado += orcado;
    const margem = orcado != null ? (orcado - custo) : null;
    const margemPct = (orcado != null && orcado > 0) ? (margem / orcado * 100) : null;
    const corMargem = margem == null ? '#888' : (margem >= 0 ? '#166534' : '#991b1b');
    const cobranca = l.os.status_cobranca || 'a_cobrar';
    html += '<tr style="border-top:1px solid #f0f0ee;cursor:pointer" onclick="abrirRelatorioFinanceiroOS(\''+l.os.id+'\')">'
      + '<td style="padding:8px 10px">#' + (l.os.numero||'—') + '</td>'
      + '<td style="padding:8px 10px">' + (l.os.cliente_nome||l.os.cliente||'—') + '</td>'
      + '<td style="padding:8px 10px"><span style="font-size:10px;padding:2px 8px;border-radius:99px;background:'+(S_BG[l.os.status]||'#f5f5f3')+';color:'+(S_COLOR[l.os.status]||'#888')+'">'+(S_LABEL[l.os.status]||l.os.status)+'</span></td>'
      + '<td style="padding:8px 10px">' + (orcado != null ? '$'+orcado.toFixed(2) : '—') + '</td>'
      + '<td style="padding:8px 10px">$' + custo.toFixed(2) + '</td>'
      + '<td style="padding:8px 10px;color:'+corMargem+';font-weight:600">' + (margem != null ? '$'+margem.toFixed(2) + (margemPct!=null?' ('+margemPct.toFixed(0)+'%)':'') : '—') + '</td>'
      + '<td style="padding:8px 10px"><span style="font-size:10px;padding:2px 8px;border-radius:99px;background:'+(cobranca==='cobrado'?'#f0fdf4':'#fffbeb')+';color:'+(cobranca==='cobrado'?'#166534':'#92400e')+'">'+(cobranca==='cobrado'?tr('resumo_cobrado'):tr('resumo_a_cobrar'))+'</span></td>'
      + '</tr>';
  });

  const totalMargem = totalOrcado - totalCusto;
  const totalMargemPct = totalOrcado > 0 ? (totalMargem / totalOrcado * 100) : null;
  html += '<tr style="border-top:2px solid #e8e8e5;font-weight:700;background:#f9f9f7">'
    + '<td style="padding:8px 10px" colspan="3">' + tr('rent_total_periodo') + '</td>'
    + '<td style="padding:8px 10px">$' + totalOrcado.toFixed(2) + '</td>'
    + '<td style="padding:8px 10px">$' + totalCusto.toFixed(2) + '</td>'
    + '<td style="padding:8px 10px;color:' + (totalMargem>=0?'#166534':'#991b1b') + '">$' + totalMargem.toFixed(2) + (totalMargemPct!=null?' ('+totalMargemPct.toFixed(0)+'%)':'') + '</td>'
    + '<td></td></tr>';

  html += '</table></div>';
  tabela.innerHTML = html;
}

let relatorioChartBarras = null;
let relatorioChartDonut = null;

function abrirRelatorioFinanceiroOS(osId) {
  const os = rentabilidadeData.os.find(o => o.id === osId) || (typeof osData !== 'undefined' ? osData.find(o => o.id === osId) : null);
  if (!os) return;
  const dias = rentabilidadeData.dias.filter(d => d.os_id === osId);
  const gastos = rentabilidadeData.gastos.filter(g => g.os_id === osId);
  const tecnicos = rentabilidadeData.tecnicos.length ? rentabilidadeData.tecnicos : tecnicosAtivosCache;
  const r = calcularResumoValores(dias, gastos, tecnicos);

  const orcado = os.valor_orcado != null ? Number(os.valor_orcado) : null;
  const margem = orcado != null ? (orcado - r.totalGeral) : null;
  const margemPct = (orcado != null && orcado > 0) ? (margem / orcado * 100) : null;
  const corMargem = margem != null ? (margem >= 0 ? '#166534' : '#991b1b') : '#333';

  const datasOrdenadas = dias.map(d => d.data).filter(Boolean).sort();
  const periodo = datasOrdenadas.length ? (datasOrdenadas[0] + (datasOrdenadas.length > 1 ? ' – ' + datasOrdenadas[datasOrdenadas.length - 1] : '')) : '';
  const tecsEnvolvidos = Array.from(new Set(dias.flatMap(d => d.tecnicos || [])));

  const content = document.getElementById('m-relatorio-os-content');
  content.innerHTML = '<div style="padding:20px 24px">'
    + '<div id="relatorio-print-hide" style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:10px">'
      + '<button onclick="window.print()" style="font-size:12px;padding:7px 14px;border:1px solid #e8e8e5;border-radius:8px;background:#fff;cursor:pointer">🖨️ ' + tr('rel_imprimir') + '</button>'
      + '<button onclick="fecharModal(\'m-relatorio-os\')" style="background:none;border:none;cursor:pointer;font-size:20px;color:#bbb">×</button>'
    + '</div>'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px">'
      + '<div>'
        + '<div style="font-size:11px;color:#888">' + tr('os_prefix') + (os.numero||'—') + ' · ' + (S_LABEL[os.status]||os.status) + '</div>'
        + '<div style="font-size:18px;font-weight:700">' + (os.cliente_nome||os.cliente||'—') + '</div>'
        + '<div style="font-size:12px;color:#888;margin-top:2px">' + periodo + (tecsEnvolvidos.length ? ' · ' + tecsEnvolvidos.join(', ') : '') + '</div>'
      + '</div>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">'
      + '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:12px 14px">'
        + '<div style="font-size:11px;color:#888">' + tr('label_valor_orcado') + '</div>'
        + '<div style="font-size:20px;font-weight:700;margin-top:2px">' + (orcado != null ? '$'+orcado.toFixed(2) : '—') + '</div>'
      + '</div>'
      + '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:12px 14px">'
        + '<div style="font-size:11px;color:#888">' + tr('resumo_custo_real') + '</div>'
        + '<div style="font-size:20px;font-weight:700;margin-top:2px">$' + r.totalGeral.toFixed(2) + '</div>'
      + '</div>'
      + '<div style="border:1px solid ' + (margem!=null ? (margem>=0?'#bbf7d0':'#fecaca') : '#e8e8e5') + ';background:' + (margem!=null ? (margem>=0?'#f0fdf4':'#fef2f2') : '#f5f5f3') + ';border-radius:10px;padding:12px 14px">'
        + '<div style="font-size:11px;color:' + corMargem + '">' + tr('resumo_margem') + '</div>'
        + '<div style="font-size:20px;font-weight:700;margin-top:2px;color:' + corMargem + '">' + (margem != null ? '$'+margem.toFixed(2) + (margemPct!=null?' ('+margemPct.toFixed(0)+'%)':'') : '—') + '</div>'
      + '</div>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:' + (orcado != null ? '1.3fr 1fr' : '1fr') + ';gap:16px;margin-bottom:20px">'
      + (orcado != null
        ? '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:14px">'
          + '<div style="font-size:12px;font-weight:600;margin-bottom:8px">' + tr('rel_grafico_orcado_custo') + '</div>'
          + '<div style="height:160px"><canvas id="relatorio-chart-barras-' + osId + '"></canvas></div>'
          + '</div>'
        : '')
      + '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:14px">'
        + '<div style="font-size:12px;font-weight:600;margin-bottom:8px">' + tr('rel_grafico_composicao') + '</div>'
        + '<div style="height:160px"><canvas id="relatorio-chart-donut-' + osId + '"></canvas></div>'
      + '</div>'
    + '</div>'
    + '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:14px;margin-bottom:20px">'
      + '<div style="font-size:12px;font-weight:600;margin-bottom:10px">' + tr('os_dias_label') + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:8px">'
      + (dias.length ? dias.map(d => {
          const horaTxt = d.hora_inicio ? String(d.hora_inicio).slice(0,5) + (d.hora_fim ? ' - ' + String(d.hora_fim).slice(0,5) : '') : '';
          const tecs = Array.isArray(d.tecnicos) ? d.tecnicos.join(', ') : '';
          return '<div style="display:flex;justify-content:space-between;align-items:flex-start;font-size:12px;gap:10px"><span>' + (d.data||'') + (tecs?' · '+tecs:'') + (horaTxt?' · '+horaTxt:'') + '</span><span style="color:#888;text-align:right">' + (d.observacao ? '"'+d.observacao+'"' : '') + '</span></div>';
        }).join('') : '<div style="font-size:12px;color:#bbb">'+tr('dia_sem_registro')+'</div>')
      + '</div>'
    + '</div>'
    + (os.resumo_ia
        ? '<div style="border:1px solid #e8e8e5;border-radius:10px;padding:14px">'
          + '<div style="font-size:12px;font-weight:600;margin-bottom:6px">' + tr('resumo_trabalho_label') + '</div>'
          + '<div style="font-size:12px;color:#555;line-height:1.5;white-space:pre-wrap">' + os.resumo_ia + '</div>'
          + '</div>'
        : '')
    + '</div>';

  abrirModal('m-relatorio-os');

  setTimeout(() => {
    if (relatorioChartBarras) { relatorioChartBarras.destroy(); relatorioChartBarras = null; }
    if (relatorioChartDonut) { relatorioChartDonut.destroy(); relatorioChartDonut = null; }

    if (orcado != null) {
      const elB = document.getElementById('relatorio-chart-barras-' + osId);
      if (elB && window.Chart) {
        relatorioChartBarras = new Chart(elB, {
          type: 'bar',
          data: {
            labels: [tr('label_valor_orcado'), tr('resumo_custo_real')],
            datasets: [{ data: [orcado, r.totalGeral], backgroundColor: ['#94a3b8', margem != null && margem >= 0 ? '#166534' : '#991b1b'], borderRadius: 6, barThickness: 46 }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: v => '$' + v } } } }
        });
      }
    }

    const elD = document.getElementById('relatorio-chart-donut-' + osId);
    if (elD && window.Chart) {
      const paleta = ['#3b82f6','#a855f7','#14b8a6','#f59e0b','#ef4444','#6366f1','#ec4899','#84cc16'];
      const labels = r.porTecnico.filter(t => t.valorHora != null).map(t => t.nome + ' (' + tr('resumo_mao_obra').toLowerCase() + ')');
      const dados = r.porTecnico.filter(t => t.valorHora != null).map(t => t.subtotal);
      if (r.totalGastos > 0) { labels.push(tr('os_gastos_label')); dados.push(r.totalGastos); }
      if (dados.length) {
        relatorioChartDonut = new Chart(elD, {
          type: 'doughnut',
          data: { labels, datasets: [{ data: dados, backgroundColor: paleta, borderWidth: 0 }] },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } } }
        });
      }
    }
  }, 50);
}

// Nova OS
let osCliSel = null;
let osTecnicosSelecionados = [];
let editOsTecnicosSelecionados = [];
let tecnicosAtivosCache = [];

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
    valor_orcado: document.getElementById('edit-os-valor-orcado')?.value ? parseFloat(document.getElementById('edit-os-valor-orcado').value) : null
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

function gerarRackPDFBlob() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 48;
  let y = 60;
  doc.setFontSize(16);
  doc.setTextColor(20, 20, 20);
  doc.text(tr('rack_pdf_titulo') + ': ' + rackAtual.nome, margin, y);
  y += 22;
  doc.setFontSize(11);
  doc.setTextColor(100);
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
    if (y > 760) { doc.addPage(); y = 60; }
  });
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
    const blob = gerarRackPDFBlob();
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
  { chave: 'camera', nome: 'Câmera', emoji: '📷', cor: 'blue', kw: 'camera cftv seguranca video vigilancia' },
  { chave: 'alarme', nome: 'Alarme', emoji: '🚨', cor: 'coral', kw: 'alarme sirene seguranca alerta' },
  { chave: 'som', nome: 'Caixa de som', emoji: '🔊', cor: 'purple', kw: 'som audio caixa speaker gesso embutida musica' },
  { chave: 'acesso', nome: 'Controle de acesso', emoji: '🪪', cor: 'teal', kw: 'acesso controle cartao biometria catraca' },
  { chave: 'interruptor', nome: 'Interruptor inteligente', emoji: '💡', cor: 'amber', kw: 'interruptor luz switch iluminacao dimmer' },
  { chave: 'wifi', nome: 'Wi-Fi / Access Point', emoji: '📶', cor: 'blue', kw: 'wifi ap access point rede sem fio roteador' },
  { chave: 'rack_rede', nome: 'Rack de rede', emoji: '🗄️', cor: 'gray', kw: 'rack rede switch servidor patch' },
  { chave: 'fechadura', nome: 'Fechadura digital', emoji: '🔑', cor: 'coral', kw: 'fechadura porta digital trava smart lock' },
  { chave: 'presenca', nome: 'Sensor de presença', emoji: '🚶', cor: 'teal', kw: 'sensor presenca movimento pir' },
  { chave: 'abertura', nome: 'Sensor de abertura', emoji: '🚪', cor: 'teal', kw: 'sensor porta janela abertura contato' },
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
  { chave: 'botoeira', nome: 'Botoeira / keypad', emoji: '🔢', cor: 'gray', kw: 'botoeira keypad painel de controle teclado' },
  { chave: 'ponto_rede', nome: 'Ponto de rede (RJ45)', emoji: '🔲', cor: 'gray', kw: 'ponto de rede rj45 cabo ethernet' },
  { chave: 'repetidor', nome: 'Repetidor de sinal', emoji: '📡', cor: 'blue', kw: 'repetidor sinal antena extensor' },
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
const PLANTA_ZOOM_NIVEIS = [100, 130, 160, 200, 260, 320];
let plantaZoomIdx = 0;

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
  let marcadores = [];
  try { marcadores = await sbGet('projetos_planta_marcadores?planta_id=eq.' + id + '&order=criado_em.asc'); } catch(e) {}
  if (!plantaTiposCarregados) {
    try { plantaTiposCustom = await sbGet('projetos_planta_tipos_icone?order=criado_em.asc'); } catch(e) {}
    plantaTiposCarregados = true;
  }
  plantaEditandoId = id;
  plantaAtual = { ...planta, marcadores };
  document.getElementById('planta-editor-titulo').textContent = planta.nome;
  document.getElementById('planta-editor-img').src = planta.imagem_url;
  const pdfBtn = document.getElementById('planta-ver-pdf-btn');
  if (pdfBtn) {
    if (planta.pdf_drive_url) { pdfBtn.style.display = 'inline-block'; pdfBtn.href = planta.pdf_drive_url; }
    else pdfBtn.style.display = 'none';
  }
  desarmarTipoPlanta();
  plantaZoomIdx = 0;
  aplicarZoomPlanta();
  configurarCanvasPlanta();
  renderMarcadoresPlanta();
  abrirModal('m-planta-editor');
}

function ajustarZoomPlanta(direcao) {
  if (direcao === 0) plantaZoomIdx = 0;
  else plantaZoomIdx = Math.max(0, Math.min(PLANTA_ZOOM_NIVEIS.length - 1, plantaZoomIdx + direcao));
  aplicarZoomPlanta();
}

function aplicarZoomPlanta() {
  const nivel = PLANTA_ZOOM_NIVEIS[plantaZoomIdx];
  const canvasEl = document.getElementById('planta-editor-canvas');
  const label = document.getElementById('planta-zoom-label');
  if (canvasEl) canvasEl.style.width = nivel + '%';
  if (label) label.textContent = nivel + '%';
}

function configurarCanvasPlanta() {
  const canvasEl = document.getElementById('planta-editor-canvas');
  if (!canvasEl) return;
  canvasEl.onclick = function(e) {
    if (Date.now() - plantaUltimoToquePlantaMs < 200) return;
    if (!plantaTipoArmado) { toast(tr('planta_escolha_icone_primeiro'), 'err'); return; }
    if (!plantaAtual) return;
    const rect = canvasEl.getBoundingClientRect();
    const x = Math.max(1, Math.min(99, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(1, Math.min(99, ((e.clientY - rect.top) / rect.height) * 100));
    criarMarcadorPlanta(x, y);
  };
}

function armarTipoPlanta(tipo) {
  plantaTipoArmado = tipo;
  const hint = document.getElementById('planta-editor-hint');
  if (hint) hint.textContent = tr('planta_hint_armado_prefix') + ' ' + tipo.emoji + ' ' + tipo.nome;
  fecharModal('m-planta-biblioteca');
}

function desarmarTipoPlanta() {
  plantaTipoArmado = null;
  const hint = document.getElementById('planta-editor-hint');
  if (hint) hint.textContent = tr('planta_hint_padrao');
}

async function criarMarcadorPlanta(x, y) {
  const tipo = plantaTipoArmado;
  if (!tipo) return;
  try {
    const [criado] = await sbPost('projetos_planta_marcadores', {
      planta_id: plantaEditandoId, nome: tipo.nome, cor: tipo.cor,
      icone_chave: tipo.chave || '', emoji: tipo.chave ? '' : (tipo.emoji || ''),
      x_pct: x, y_pct: y, observacoes: '', criado_por: ME.nome
    });
    plantaAtual.marcadores.push(criado);
    criarElementoMarcadorPlanta(criado, document.getElementById('planta-editor-marcadores'));
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
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
async function gerarRelatorioPlanta() {
  if (!plantaAtual) return;
  const btn = document.getElementById('planta-relatorio-btn');
  const statusEl = document.getElementById('planta-relatorio-status');
  if (btn) btn.disabled = true;
  if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = '#555'; statusEl.textContent = tr('planta_relatorio_gerando'); }
  try {
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

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 48;
    const dataHoje = new Date().toLocaleDateString(LANG === 'pt' ? 'pt-BR' : 'en-US');
    let y = 0;

    function rodape() {
      doc.setFontSize(8);
      doc.setTextColor(160);
      doc.text('Kilian Smart Homes © ' + new Date().getFullYear() + '  ·  ' + plantaAtual.nome, margin, pageH - 24);
    }
    function novaPagina() {
      rodape();
      doc.addPage();
      y = 60;
    }
    function garantirEspaco(altura) {
      if (y + altura > pageH - 60) novaPagina();
    }

    // ── Capa ──
    doc.setFillColor(20, 20, 20);
    doc.rect(0, 0, pageW, 130, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('KILIAN SMART HOMES', margin, 55);
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text('South Florida  ·  Smart Home & AV Integration', margin, 74);
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.text(tr('planta_relatorio_pdf_titulo').toUpperCase(), margin, 108);

    y = 165;
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(17);
    doc.text(plantaAtual.nome, margin, y);
    y += 20;
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.text(tr('planta_relatorio_data') + ': ' + dataHoje + '   ·   ' + tr('planta_relatorio_total_dispositivos') + ': ' + marcadores.length, margin, y);
    y += 34;

    // ── Resumo por tipo (legenda com quantidade) ──
    doc.setFontSize(13);
    doc.setTextColor(20, 20, 20);
    doc.text(tr('planta_relatorio_resumo_titulo'), margin, y);
    y += 22;

    if (!marcadores.length) {
      doc.setFontSize(11);
      doc.setTextColor(140);
      doc.text(tr('planta_relatorio_sem_dispositivos'), margin, y);
      y += 20;
    } else {
      const contagem = {};
      marcadores.forEach(function(m) {
        const key = m.nome;
        if (!contagem[key]) contagem[key] = { nome: m.nome, cor: m.cor, qtd: 0 };
        contagem[key].qtd++;
      });
      const resumo = Object.values(contagem).sort(function(a, b) { return b.qtd - a.qtd; });
      resumo.forEach(function(item) {
        garantirEspaco(20);
        const cor = PLANTA_CORES[item.cor] || PLANTA_CORES.gray;
        const rgb = hexParaRgbPlanta(cor.text);
        doc.setFillColor(rgb.r, rgb.g, rgb.b);
        doc.circle(margin + 5, y - 4, 5, 'F');
        doc.setFontSize(11);
        doc.setTextColor(30);
        doc.text(item.nome, margin + 18, y);
        doc.setTextColor(120);
        const qtdTxt = String(item.qtd) + ' ' + (item.qtd === 1 ? tr('planta_relatorio_unidade') : tr('planta_relatorio_unidades'));
        doc.text(qtdTxt, pageW - margin, y, { align: 'right' });
        y += 19;
      });
    }

    // ── Croqui: planta com marcadores numerados (referencia visual pra equipe) ──
    rodape();
    doc.addPage();
    y = 60;
    doc.setFontSize(13);
    doc.setTextColor(20, 20, 20);
    doc.text(tr('planta_relatorio_croqui_titulo'), margin, y);
    y += 18;

    const maxW = pageW - margin * 2;
    const maxH = pageH - y - 60;
    let drawW = maxW;
    let drawH = drawW * (dims.h / dims.w);
    if (drawH > maxH) { drawH = maxH; drawW = drawH * (dims.w / dims.h); }
    const imgX = margin + (maxW - drawW) / 2;
    const imgY = y;
    doc.addImage(imgDataUrl, 'PNG', imgX, imgY, drawW, drawH);

    marcadores.forEach(function(m, idx) {
      const cor = PLANTA_CORES[m.cor] || PLANTA_CORES.gray;
      const rgb = hexParaRgbPlanta(cor.text);
      const px = imgX + (m.x_pct / 100) * drawW;
      const py = imgY + (m.y_pct / 100) * drawH;
      doc.setFillColor(rgb.r, rgb.g, rgb.b);
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(1);
      doc.circle(px, py, 9, 'FD');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(String(idx + 1), px, py + 2.8, { align: 'center' });
    });

    // ── Lista detalhada (numeracao bate com o croqui) ──
    novaPagina();
    doc.setFontSize(13);
    doc.setTextColor(20, 20, 20);
    doc.text(tr('planta_relatorio_lista_titulo'), margin, y);
    y += 26;

    if (!marcadores.length) {
      doc.setFontSize(11);
      doc.setTextColor(140);
      doc.text(tr('planta_relatorio_sem_dispositivos'), margin, y);
    } else {
      marcadores.forEach(function(m, idx) {
        garantirEspaco(34);
        const cor = PLANTA_CORES[m.cor] || PLANTA_CORES.gray;
        const rgb = hexParaRgbPlanta(cor.text);
        doc.setFillColor(rgb.r, rgb.g, rgb.b);
        doc.circle(margin + 7, y - 4, 7, 'F');
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(String(idx + 1), margin + 7, y - 1.2, { align: 'center' });
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text(m.nome, margin + 22, y);
        doc.setFont(undefined, 'normal');
        y += 15;
        doc.setFontSize(10);
        doc.setTextColor(100);
        const obsTexto = (m.observacoes && m.observacoes.trim()) ? m.observacoes.trim() : tr('planta_relatorio_sem_obs');
        const linhas = doc.splitTextToSize(obsTexto, pageW - margin * 2 - 22);
        doc.text(linhas, margin + 22, y);
        y += linhas.length * 12 + 16;
      });
    }
    rodape();

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