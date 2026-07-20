create table if not exists documentos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null default '',
  categoria text not null default 'outro',
  orgao_emissor text default '',
  numero_documento text default '',
  data_emissao date,
  data_validade date,
  observacoes text default '',
  arquivo_drive_id text,
  arquivo_drive_url text,
  criado_por text default '',
  criado_em timestamptz not null default now()
);

create index if not exists documentos_categoria_idx on documentos(categoria);
create index if not exists documentos_validade_idx on documentos(data_validade);

alter table documentos enable row level security;

create policy "documentos_authenticated" on documentos
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
