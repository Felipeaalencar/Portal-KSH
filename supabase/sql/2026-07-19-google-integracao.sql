-- Guarda o refresh_token do Google Drive (conexão única da empresa, não por usuário).
-- So as Edge Functions (com a service role key) leem/escrevem aqui — por isso nao ha
-- policies de RLS liberando o app/anon a acessar esta tabela diretamente.
create table if not exists google_integracao (
  id int primary key,
  refresh_token text,
  updated_at timestamptz default now()
);

alter table google_integracao enable row level security;
