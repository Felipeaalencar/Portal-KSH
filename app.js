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
  nav_tecnicos: { en: 'Technicians', pt: 'Técnicos' },
  nav_tarefas: { en: 'Tasks', pt: 'Tarefas' },
  nav_ferramentas: { en: 'Tools', pt: 'Ferramentas' },
  nav_documentos: { en: 'Documents', pt: 'Documentos' },

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
  card_tecnicos_title: { en: 'Technicians', pt: 'Técnicos' },
  card_tecnicos_desc: { en: 'Field team records and hourly rate', pt: 'Cadastro da equipe técnica e valor da hora trabalhada' },
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
  clientes_none_found: { en: 'No clients found', pt: 'Nenhum cliente encontrado' },
  btn_novo_cliente: { en: '+ New Client', pt: '+ Novo Cliente' },
  clientes_subtitle: { en: 'Client base with full history and details', pt: 'Base de clientes com histórico e dados completos' },
  cliente_required_fields: { en: 'Fill in all required fields', pt: 'Preencha todos os campos obrigatórios' },
  cliente_cadastrado: { en: 'Client registered!', pt: 'Cliente cadastrado!' },
  cliente_atualizado: { en: 'Client updated!', pt: 'Cliente atualizado!' },
  modal_editar_cliente: { en: 'Edit Client', pt: 'Editar Cliente' },

  // Técnicos module
  tecnicos_subtitle: { en: 'Field team records and hourly rate', pt: 'Cadastro da equipe técnica e valor da hora trabalhada' },
  btn_novo_tecnico: { en: '+ New Technician', pt: '+ Novo Técnico' },
  tecnicos_search_ph: { en: 'Search by name, email or phone...', pt: 'Buscar por nome, email ou telefone...' },
  tecnicos_th_valor: { en: 'Hourly rate', pt: 'Valor/hora' },
  tecnicos_none: { en: 'No technicians registered', pt: 'Nenhum técnico cadastrado' },
  tecnico_nome_obrigatorio: { en: 'Name is required', pt: 'Nome é obrigatório' },
  tecnico_cadastrado: { en: 'Technician registered!', pt: 'Técnico cadastrado!' },
  tecnico_atualizado: { en: 'Technician updated!', pt: 'Técnico atualizado!' },
  modal_novo_tecnico: { en: 'New Technician', pt: 'Novo Técnico' },
  modal_editar_tecnico: { en: 'Edit Technician', pt: 'Editar Técnico' },

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
  pt_fin_cadastros: { en: 'Records', pt: 'Cadastros' },
  pt_kshcam: { en: 'Work Order', pt: 'Ordem de Serviço' },
  pt_tecnicos: { en: 'Technicians', pt: 'Técnicos' },
  pt_tarefas: { en: 'Tasks', pt: 'Tarefas' },
  pt_ferramentas: { en: 'Tools', pt: 'Ferramentas' },
  pt_documentos: { en: 'Documents', pt: 'Documentos' },
  sub_tarefas: { en: 'Team schedule synced with Google Calendar', pt: 'Agenda da equipe sincronizada com Google Calendar' },
  sub_ferramentas: { en: 'Equipment, toolkit and materials inventory', pt: 'Inventário de equipamentos, maletas e materiais' },
  sub_documentos: { en: 'Licenses, insurance, permits and manuals', pt: 'Licenças, seguros, alvarás e manuais' },
  tarefas_col_media: { en: 'Medium', pt: 'Média' },
  tarefas_col_alta: { en: 'High', pt: 'Alta' },
  tarefas_col_urgente: { en: 'Urgent', pt: 'Urgente' },
  tarefas_col_concluido: { en: 'Done', pt: 'Concluído' },
  tarefa_nova_title: { en: 'New task', pt: 'Nova tarefa' },
  tarefa_titulo_ph: { en: 'Ex: Call the Aqua Vista client', pt: 'Ex: Ligar pro cliente da Aqua Vista' },
  tarefa_titulo_obrigatorio: { en: 'Enter a title', pt: 'Preencha o título' },
  label_cliente_opcional: { en: 'Client (optional)', pt: 'Cliente (opcional)' },
  label_data: { en: 'Date', pt: 'Data' },
  tarefa_add_agenda: { en: 'Also add to the technician\'s Google Calendar', pt: 'Adicionar também na agenda (Google Calendar) do técnico' },
  tarefa_agenda_sucesso: { en: 'Added to Google Calendar', pt: 'Adicionado na agenda (Google Calendar)' },
  tarefa_agenda_erro: { en: "Couldn't add to Google Calendar", pt: 'Não deu pra adicionar na agenda' },
  btn_criar_tarefa: { en: 'Create task', pt: 'Criar tarefa' },
  tarefa_criada: { en: 'Task created', pt: 'Tarefa criada' },
  tarefa_gerar_os: { en: 'Generate OS', pt: 'Gerar OS' },
  tarefa_os_gerada_badge: { en: 'OS #NUM created', pt: 'OS #NUM gerada' },
  tarefa_notas_ph: { en: 'Add information...', pt: 'Adicionar informação...' },
  btn_add: { en: 'Add', pt: 'Add' },
  tarefa_sem_tecnico: { en: 'No technician', pt: 'Sem técnico' },
  tarefas_vazio_coluna: { en: 'No tasks', pt: 'Sem tarefas' },
  tarefa_excluir: { en: 'Delete task', pt: 'Excluir tarefa' },
  tarefa_confirma_excluir: { en: 'Delete this task?', pt: 'Excluir esta tarefa?' },
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
    'kshcam':'pt_kshcam','tecnicos':'pt_tecnicos','tarefas':'pt_tarefas','ferramentas':'pt_ferramentas','documentos':'pt_documentos'
  };
  return m[id] ? tr(m[id]) : null;
}

function goPage(btn, pageId, title, section) {
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
    'crm-clientes': '<button class="btn-pri" onclick="abrirModal(\'m-novo-cli-crm\')">' + tr('btn_novo_cliente') + '</button>',
    'crm-orcamentos': '<button class="btn-sec" onclick="loadModule(\'crm-orcamentos\')">' + tr('btn_atualizar') + '</button>',
    'tarefas': '<button class="btn-pri" onclick="abrirNovaTarefa()">+ ' + tr('tarefa_nova_title') + '</button>',
    'ferramentas': '<button class="btn-pri" onclick="toast(tr(\'btn_em_breve\'))">+ ' + (LANG==='pt'?'Novo Item':'New Item') + '</button>',
  };
  return m[id] || '';
}

function getSubtitle(id) {
  const m = {
    'crm-clientes': tr('clientes_subtitle'),
    'crm-orcamentos': LANG==='pt' ? 'Pipeline de propostas por status' : 'Proposal pipeline by status',
    'kshcam': tr('os_subtitle'),
    'tecnicos': tr('tecnicos_subtitle'),
    'tarefas': tr('sub_tarefas'),
    'ferramentas': tr('sub_ferramentas'),
    'documentos': tr('sub_documentos'),
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
  else if (id === 'kshcam') renderKSHCam();
  else if (id === 'tecnicos') renderTecnicos();
  else if (id === 'tarefas') renderTarefas();
  else el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;padding:60px;color:#bbb;gap:10px"><div style="font-size:36px">🚧</div><div style="font-size:14px;font-weight:500;color:#555">Em desenvolvimento</div></div>';
}

// ── CLIENTES ──────────────────────────────────────────────────
let clientesData = [];

async function renderClientes() {
  const el = document.getElementById('mod-content');
  el.innerHTML = `
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <input placeholder="${tr('clientes_search_ph')}" style="flex:1;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" id="cli-busca" oninput="filtrarClientes()">
  </div>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>${tr('clientes_th_nome')}</th><th>${tr('clientes_th_email')}</th><th>${tr('clientes_th_tel')}</th><th>${tr('clientes_th_end')}</th><th>${tr('clientes_th_acoes')}</th></tr></thead>
      <tbody id="cli-tbody"><tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">${tr('loading')}</td></tr></tbody>
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
  if (!lista.length) { tb.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">' + tr('clientes_none_found') + '</td></tr>'; return; }
  tb.innerHTML = lista.map(c => `<tr>
    <td style="font-weight:500">${c.nome||'—'}</td>
    <td>${c.email||'—'}</td>
    <td>${c.telefone||'—'}</td>
    <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.endereco||'—'}</td>
    <td><button onclick="editarCliente('${c.id}')" style="padding:3px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit">${tr('btn_editar')}</button></td>
  </tr>`).join('');
}

async function salvarClienteCRM() {
  const nome = document.getElementById('crm-cli-nome')?.value.trim();
  const email = document.getElementById('crm-cli-email')?.value.trim();
  const telefone = document.getElementById('crm-cli-tel')?.value.trim();
  const endereco = document.getElementById('crm-cli-end')?.value.trim();
  if (!nome||!email||!telefone||!endereco) { toast(tr('cliente_required_fields'),'err'); return; }
  try {
    await sbPost('clientes', { nome, email, telefone, endereco, equipamentos: document.getElementById('crm-cli-equip')?.value.trim()||null, observacoes: document.getElementById('crm-cli-obs')?.value.trim()||null, ativo: true });
    fecharModal('m-novo-cli-crm');
    toast(tr('cliente_cadastrado'), 'ok');
    renderClientes();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
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
  document.getElementById('m-novo-cli-crm').querySelector('.modal-hd-title').textContent = tr('modal_editar_cliente');
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
      toast(tr('cliente_atualizado'),'ok');
      renderClientes();
    } catch(e) { toast(tr('erro_prefix')+e.message,'err'); }
  };
  abrirModal('m-novo-cli-crm');
}

// ── TÉCNICOS ──────────────────────────────────────────────────
let tecnicosData = [];

async function renderTecnicos() {
  const el = document.getElementById('mod-content');
  el.innerHTML = `
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <input placeholder="${tr('tecnicos_search_ph')}" style="flex:1;padding:7px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" id="tec-busca" oninput="filtrarTecnicos()">
  </div>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>${tr('clientes_th_nome')}</th><th>${tr('clientes_th_email')}</th><th>${tr('clientes_th_tel')}</th><th>${tr('tecnicos_th_valor')}</th><th>${tr('clientes_th_acoes')}</th></tr></thead>
      <tbody id="tec-tbody"><tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">${tr('loading')}</td></tr></tbody>
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
  if (!lista.length) { tb.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:#bbb">' + tr('tecnicos_none') + '</td></tr>'; return; }
  tb.innerHTML = lista.map(t => `<tr>
    <td style="font-weight:500">${t.nome||'—'}</td>
    <td>${t.email||'—'}</td>
    <td>${t.telefone||'—'}</td>
    <td>${t.valor_hora != null ? '$' + Number(t.valor_hora).toFixed(2) : '—'}</td>
    <td><button onclick="editarTecnico('${t.id}')" style="padding:3px 10px;border:1px solid #e8e8e5;border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit">${tr('btn_editar')}</button></td>
  </tr>`).join('');
}

function abrirNovoTecnico() {
  ['tec-nome','tec-email','tec-tel','tec-valor'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('m-novo-tec').querySelector('.modal-hd-title').textContent = tr('modal_novo_tecnico');
  document.getElementById('m-novo-tec').querySelector('.btn-pri').textContent = tr('btn_cadastrar');
  document.getElementById('m-novo-tec').querySelector('.btn-pri').onclick = salvarTecnico;
  abrirModal('m-novo-tec');
}

async function salvarTecnico() {
  const nome = document.getElementById('tec-nome')?.value.trim();
  if (!nome) { toast(tr('tecnico_nome_obrigatorio'), 'err'); return; }
  try {
    await sbPost('tecnicos', {
      nome,
      email: document.getElementById('tec-email')?.value.trim() || null,
      telefone: document.getElementById('tec-tel')?.value.trim() || null,
      valor_hora: document.getElementById('tec-valor')?.value ? parseFloat(document.getElementById('tec-valor').value) : null,
      ativo: true
    });
    fecharModal('m-novo-tec');
    toast(tr('tecnico_cadastrado'), 'ok');
    renderTecnicos();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function editarTecnico(id) {
  const t = tecnicosData.find(x => x.id === id);
  if (!t) return;
  document.getElementById('tec-nome').value = t.nome || '';
  document.getElementById('tec-email').value = t.email || '';
  document.getElementById('tec-tel').value = t.telefone || '';
  document.getElementById('tec-valor').value = t.valor_hora != null ? t.valor_hora : '';
  document.getElementById('m-novo-tec').querySelector('.modal-hd-title').textContent = tr('modal_editar_tecnico');
  document.getElementById('m-novo-tec').querySelector('.btn-pri').textContent = tr('btn_salvar');
  document.getElementById('m-novo-tec').querySelector('.btn-pri').onclick = async () => {
    try {
      await sbPatch('tecnicos?id=eq.' + id, {
        nome: document.getElementById('tec-nome').value.trim(),
        email: document.getElementById('tec-email').value.trim() || null,
        telefone: document.getElementById('tec-tel').value.trim() || null,
        valor_hora: document.getElementById('tec-valor').value ? parseFloat(document.getElementById('tec-valor').value) : null
      });
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
async function abrirOS(id) {
  const os = osData.find(o => o.id === id);
  if (!os) return;
  const content = document.getElementById('m-det-os-content');
  content.innerHTML = '<div style="padding:40px;text-align:center;color:#bbb">' + tr('loading') + '</div>';
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
      <div style="font-size:11px;color:#888;margin-bottom:1px">${tr('os_prefix')}${os.numero||'—'} · <span id="os-status-header-${id}" style="color:${S_COLOR[os.status]||'#888'}">${S_LABEL[os.status]||os.status}</span></div>
      <div style="font-size:16px;font-weight:700">${os.titulo||tr('os_sem_titulo')}</div>
    </div>
    <button onclick="fecharModal('m-det-os')" style="background:none;border:none;cursor:pointer;font-size:22px;color:#bbb">×</button>
  </div>
  <div style="padding:18px 20px">
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
        ${Object.entries(S_LABEL).map(([s,l]) => '<button data-status="'+s+'" onclick="selecionarStatusOS(\''+id+'\',\''+s+'\')" style="padding:5px 14px;border-radius:99px;border:1.5px solid '+(os.status===s?S_COLOR[s]:'#e8e8e5')+';background:'+(os.status===s?S_BG[s]:'#fff')+';color:'+(os.status===s?S_COLOR[s]:'#555')+';font-size:12px;font-weight:'+(os.status===s?'600':'400')+';cursor:pointer;font-family:inherit">'+l+'</button>').join('')}
      </div>
      <button id="status-save-${id}" onclick="salvarStatusOS('${id}')" style="display:none;padding:6px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">${tr('os_salvar_alteracoes')}</button>
    </div>
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600">${tr('os_fotos_label')} (${fotos.length})</div>
        <label style="padding:5px 12px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;cursor:pointer;color:#555;background:#fff">
          ${tr('os_adicionar_foto')}
          <input type="file" accept="image/*" capture="environment" multiple style="display:none" onchange="uploadFotos(event,'${id}')">
        </label>
      </div>
      <div id="fotos-${id}" class="fotos-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${fotos.length ? fotos.map(f => { const src = fotoThumb(f); const priv = !!f.interna; const temMarca = Array.isArray(f.anotacoes) && f.anotacoes.length > 0; return '<div onclick="abrirFotoEditor(\''+f.id+'\',\''+id+'\')" style="position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;border:1px solid #e8e8e5;cursor:pointer' + (priv ? ';opacity:.55' : '') + '"><div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f5f5f3">'+(src?'<img src="'+src+'" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">':'<span style="font-size:28px">🖼️</span>')+'</div><button onclick="event.preventDefault();event.stopPropagation();toggleFotoInterna(\''+f.id+'\',\''+id+'\','+(!priv)+')" title="'+(priv?tr('foto_marcar_publica'):tr('foto_marcar_privada'))+'" style="position:absolute;top:4px;right:4px;width:22px;height:22px;border:none;border-radius:50%;background:rgba(255,255,255,.9);cursor:pointer;font-size:11px;line-height:1;display:flex;align-items:center;justify-content:center">'+(priv?'🔒':'👁')+'</button>'+(temMarca?'<span title="'+tr('foto_tem_marcacao')+'" style="position:absolute;top:4px;left:4px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.9);font-size:11px;display:flex;align-items:center;justify-content:center">✏️</span>':'')+(priv?'<div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.55);color:#fff;font-size:9px;text-align:center;padding:2px 0">'+tr('foto_privada_badge')+'</div>':'')+'</div>'; }).join('') : '<div style="grid-column:span 3;text-align:center;padding:20px;color:#bbb;font-size:12px;border:1px dashed #e8e8e5;border-radius:8px">'+tr('os_sem_fotos')+'</div>'}
      </div>
      <div id="upload-prog" style="display:none;text-align:center;font-size:12px;color:#2563eb;margin-top:8px">${tr('os_enviando')}</div>
    </div>
    <div>
      <div style="font-size:13px;font-weight:600;margin-bottom:10px">${tr('os_anotacoes_label')} (${notas.length})</div>
      <div id="notas-${id}" style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
        ${notas.length ? notas.map(n => '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px"><div style="font-size:13px;margin-bottom:3px">'+n.texto+'</div><div style="font-size:10px;color:#bbb">'+( n.autor||'—')+' · '+new Date(n.criado_em||n.created_at).toLocaleString(LANG==='pt'?'pt-BR':'en-US')+'</div></div>').join('') : '<div style="color:#bbb;font-size:12px">'+tr('os_sem_anotacoes')+'</div>'}
      </div>
      <div id="nota-previa-${id}" style="display:none"></div>
      <div id="nota-form-${id}" style="display:flex;gap:8px">
        <input id="nota-input-${id}" placeholder="${tr('os_add_nota_ph')}" style="flex:1;padding:8px 11px;border:1px solid #e8e8e5;border-radius:7px;font-size:12px;font-family:inherit;outline:none" onkeydown="if(event.key==='Enter')gerarResumoNota('${id}')">
        <button id="nota-mic-${id}" onclick="toggleGravacaoAudio('${id}')" title="${tr('nota_gravar_title')}" style="padding:8px 12px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;color:#555;font-size:14px;cursor:pointer;font-family:inherit">🎤</button>
        <button id="nota-btn-${id}" onclick="gerarResumoNota('${id}')" style="padding:8px 14px;border:none;border-radius:7px;background:#1a1a1a;color:#fff;font-size:12px;cursor:pointer;font-family:inherit">${tr('os_enviar')}</button>
      </div>
      <div id="nota-rec-status-${id}" style="display:none;font-size:11px;color:#e74c3c;margin-top:6px"></div>
    </div>
    <div style="margin-top:14px;padding-top:14px;border-top:1px solid #e8e8e5;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
      ${os.drive_folder_url?'<a href="'+os.drive_folder_url+'" target="_blank" style="font-size:12px;color:#2563eb;text-decoration:none">'+tr('os_abrir_drive')+'</a>':'<span></span>'}
      <button id="pdf-btn-${id}" onclick="gerarResumoPDF('${id}')" style="padding:7px 14px;border:1px solid #e8e8e5;border-radius:7px;background:#fff;font-size:12px;cursor:pointer;font-family:inherit;color:#333">${tr('os_gerar_pdf')}</button>
    </div>
  </div>`;
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

async function salvarNota(osId) {
  const inp = document.getElementById('nota-input-' + osId);
  const texto = inp?.value.trim();
  if (!texto) return;
  try {
    await sbPost('os_notas', { os_id: osId, texto, autor: ME.nome });
    inp.value = '';
    const notas = await sbGet('os_notas?os_id=eq.' + osId + '&order=created_at.asc');
    const el = document.getElementById('notas-' + osId);
    if (el) el.innerHTML = notas.map(n => '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px;margin-bottom:8px"><div style="font-size:13px;margin-bottom:3px">'+n.texto+'</div><div style="font-size:10px;color:#bbb">'+(n.autor||'—')+' · '+new Date(n.criado_em||n.created_at).toLocaleString(LANG==='pt'?'pt-BR':'en-US')+'</div></div>').join('');
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
    const notas = await sbGet('os_notas?os_id=eq.' + osId + '&order=criado_em.asc');
    const listEl = document.getElementById('notas-' + osId);
    if (listEl) listEl.innerHTML = notas.length ? notas.map(n => '<div style="background:#f9f9f7;border-radius:8px;padding:10px 12px"><div style="font-size:13px;margin-bottom:3px">'+n.texto+'</div><div style="font-size:10px;color:#bbb">'+(n.autor||'—')+' · '+new Date(n.criado_em||n.created_at).toLocaleString(LANG==='pt'?'pt-BR':'en-US')+'</div></div>').join('') : '<div style="color:#bbb;font-size:12px">'+tr('os_sem_anotacoes')+'</div>';
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
  { id: 'concluido', key: 'tarefas_col_concluido', color: '#166534', bg: '#f0fdf4' },
];

function tarefaColuna(t) { return t.status === 'concluida' ? 'concluido' : (t.prioridade || 'media'); }

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
  el.innerHTML = '<div id="tarefas-board" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px"></div>';
  renderTarefasBoard();
}

function tarefaTecnicoChipsHTML(t) {
  return tarefasTecnicosLista.map(tec => {
    const sel = (t.tecnicos || []).includes(tec.nome);
    return '<span onclick="toggleTecnicoTarefa(\'' + t.id + '\',' + JSON.stringify(tec.nome) + ')" style="font-size:10px;padding:3px 8px;border-radius:99px;cursor:pointer;border:1px solid ' + (sel?'#1a1a1a':'#e8e8e5') + ';background:' + (sel?'#1a1a1a':'#fff') + ';color:' + (sel?'#fff':'#555') + '">' + tec.nome + '</span>';
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
    + '<button onclick="excluirTarefa(\'' + t.id + '\')" title="' + tr('tarefa_excluir') + '" style="background:none;border:none;cursor:pointer;color:#bbb;font-size:13px;line-height:1;padding:0">×</button>'
    + '</div>'
    + (t.os_gerada_numero ? '<div style="font-size:10px;color:#166534;margin-top:4px">' + tr('tarefa_os_gerada_badge').replace('NUM', t.os_gerada_numero) + '</div>' : '')
    + (t.prazo ? '<div style="font-size:11px;color:#888;margin-top:4px">📅 ' + t.prazo + (t.calendar_event_id ? ' ✓' : '') + '</div>' : '')
    + (t.cliente_nome ? '<div style="font-size:11px;color:#888;margin-top:2px">' + t.cliente_nome + '</div>' : '')
    + '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin:6px 0">'
    + '<button onclick="toggleTarefaNotas(\'' + t.id + '\')" style="font-size:10px;padding:2px 6px;border:1px solid #e8e8e5;border-radius:6px;background:#fff;cursor:pointer">📝 ' + notasCount + '</button>'
    + (!t.os_gerada_numero ? '<button onclick="abrirNovaOSDeTarefa(\'' + t.id + '\')" style="font-size:10px;padding:2px 8px;border:none;border-radius:6px;background:#1a1a1a;color:#fff;cursor:pointer">' + tr('tarefa_gerar_os') + '</button>' : '')
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
  if (colId === 'concluido') { t.status = 'concluida'; }
  else { t.status = 'pendente'; t.prioridade = colId; }
}

async function tarefaDropCard(ev, destId) {
  if (!tarefaArrastando || tarefaArrastando === destId) return;
  const origem = tarefasData.find(t => t.id === tarefaArrastando);
  const destino = tarefasData.find(t => t.id === destId);
  if (!origem || !destino) return;
  const colDestino = tarefaColuna(destino);
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
  try {
    await sbDelete('tarefas?id=eq.' + id);
    tarefasData = tarefasData.filter(t => t.id !== id);
    delete tarefaNotasCache[id];
    delete tarefaNotasAbertas[id];
    renderTarefasBoard();
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

function renderNtTecnicosChips() {
  const el = document.getElementById('nt-tecnicos-chips');
  if (!el) return;
  el.innerHTML = tarefasTecnicosLista.map(tec => {
    const sel = ntTecnicosSelecionados.includes(tec.nome);
    return '<span onclick="toggleNtTecnico(' + JSON.stringify(tec.nome) + ')" style="font-size:12px;padding:5px 10px;border-radius:99px;cursor:pointer;border:1px solid ' + (sel?'#1a1a1a':'#e8e8e5') + ';background:' + (sel?'#1a1a1a':'#fff') + ';color:' + (sel?'#fff':'#555') + '">' + tec.nome + '</span>';
  }).join('');
}

function toggleNtTecnico(nome) {
  ntTecnicosSelecionados = ntTecnicosSelecionados.includes(nome) ? ntTecnicosSelecionados.filter(n => n !== nome) : [...ntTecnicosSelecionados, nome];
  renderNtTecnicosChips();
}

async function abrirNovaTarefa() {
  document.getElementById('nt-titulo').value = '';
  document.getElementById('nt-cliente').value = '';
  document.getElementById('nt-data').value = '';
  document.getElementById('nt-agenda').checked = false;
  ntTecnicosSelecionados = [];
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
  const querAgenda = document.getElementById('nt-agenda')?.checked;
  try {
    const ordem = tarefasData.filter(t => tarefaColuna(t) === 'media').length;
    const [nova] = await sbPost('tarefas', {
      titulo, tecnicos, responsavel: tecnicos.join(', ') || '',
      cliente_nome, prazo, status: 'pendente', prioridade: 'media', ordem,
      origem: 'manual', criado_por: ME.nome
    });
    fecharModal('m-nova-tarefa');
    toast(tr('tarefa_criada'), 'ok');
    tarefasData = await sbGet('tarefas?order=ordem.asc');
    tarefasData = tarefasData.map(t => ({ ...t, tecnicos: Array.isArray(t.tecnicos) ? t.tecnicos : [] }));
    renderTarefasBoard();
    if (querAgenda && prazo && nova) {
      criarEventoAgenda(nova.id, titulo, cliente_nome, prazo, tecnicos.join(', '));
    }
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function criarEventoAgenda(tarefaId, titulo, cliente_nome, prazo, tecnicosTexto) {
  try {
    const r = await fetch(SB_URL + '/functions/v1/criar-evento-agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ME.token, 'apikey': SB_KEY },
      body: JSON.stringify({
        titulo,
        descricao: cliente_nome ? ('Cliente: ' + cliente_nome) : '',
        data: prazo,
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

function abrirNovaOSDeTarefa(tarefaId) {
  const t = tarefasData.find(x => x.id === tarefaId);
  if (!t) return;
  abrirNovaOS();
  tarefaOrigemOS = tarefaId;
  document.getElementById('os-titulo').value = t.titulo;
  if (t.tecnicos && t.tecnicos.length) popularSelectTecnicos('os-tecnico', t.tecnicos.join(', '));
  if (t.cliente_nome) {
    document.getElementById('os-cli-busca').value = t.cliente_nome;
    buscarClienteOS(t.cliente_nome);
  }
}



// Nova OS
let osCliSel = null;

async function popularSelectTecnicos(selectId, selecionado) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  let lista = [];
  try {
    lista = await sbGet('tecnicos?ativo=eq.true&order=nome');
    tecnicosData = lista;
  } catch(e) { lista = tecnicosData || []; }
  const nomes = lista.map(t => t.nome);
  let opts = '<option value="">' + tr('os_tecnico_selecione') + '</option>';
  opts += lista.map(t => '<option value="' + String(t.nome).replace(/"/g,'&quot;') + '"' + (t.nome === selecionado ? ' selected' : '') + '>' + t.nome + '</option>').join('');
  if (selecionado && !nomes.includes(selecionado)) {
    opts += '<option value="' + String(selecionado).replace(/"/g,'&quot;') + '" selected>' + selecionado + ' (' + tr('os_tecnico_nao_cadastrado') + ')</option>';
  }
  sel.innerHTML = opts;
}

function abrirNovaOS() {
  osCliSel = null;
  tarefaOrigemOS = null;
  ['os-titulo','os-desc','os-cli-busca'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  popularSelectTecnicos('os-tecnico', '');
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
    toast(tr('os_criada') + numero + tr('os_criada_suffix'), 'ok');
    // Cria lead no CRM
    try { await sbPost('crm_leads', { nome: osCliSel.nome, origem: 'os_manual', status: 'lead', criado_por: ME.nome }); } catch(e) {}
    carregarOS();
    if (tarefaOrigemOS) {
      const tId = tarefaOrigemOS;
      tarefaOrigemOS = null;
      try {
        await sbPatch('tarefas?id=eq.' + tId, { os_gerada_numero: numero, status: 'concluido' });
        const t = tarefasData.find(x => x.id === tId);
        if (t) { t.os_gerada_numero = numero; t.status = 'concluido'; }
        renderTarefasBoard();
      } catch(e) {}
    }
  } catch(e) { toast(tr('erro_prefix') + e.message, 'err'); }
}

async function editarOS(id) {
  const os = osData.find(o => o.id === id);
  if (!os) return;
  document.getElementById('edit-os-id').value = id;
  document.getElementById('edit-os-titulo').value = os.titulo||'';
  document.getElementById('edit-os-status').value = os.status||'aberta';
  await popularSelectTecnicos('edit-os-tecnico', os.tecnico_nome||'');
  document.getElementById('edit-os-desc').value = os.descricao||'';
  document.getElementById('edit-os-cli-info').textContent = tr('cliente_colon') + (os.cliente_nome||os.cliente||'—');
  abrirModal('m-edit-os');
}

async function salvarEditOS() {
  const id = document.getElementById('edit-os-id').value;
  const titulo = document.getElementById('edit-os-titulo').value.trim();
  if (!titulo) { toast(tr('os_titulo_obrigatorio'),'err'); return; }
  try {
    await sbPatch('ordens_servico?id=eq.' + id, {
      titulo, status: document.getElementById('edit-os-status').value,
      tecnico_nome: document.getElementById('edit-os-tecnico').value.trim()||null,
      descricao: document.getElementById('edit-os-desc').value.trim()||null
    });
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

async function uploadFotos(event, osId) {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  const conectado = await garantirTokenDrive();
  if (!conectado) { toast(tr('drive_conecte_primeiro'),'err'); return; }
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
      toast(tr('drive_erro_pasta'), 'err');
    }
  }
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