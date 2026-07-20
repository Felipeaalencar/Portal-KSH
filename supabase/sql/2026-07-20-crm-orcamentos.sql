create table if not exists motivos_reprovacao (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  criado_em timestamptz not null default now()
);

alter table motivos_reprovacao enable row level security;

create policy "motivos_reprovacao_authenticated" on motivos_reprovacao
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into motivos_reprovacao (nome) values
  ('Preço'), ('Concorrência'), ('Desistiu'), ('Fora do prazo'), ('Sem resposta'), ('Outro')
on conflict (nome) do nothing;

create table if not exists crm_orcamentos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null default '',
  cliente_id uuid references clientes(id) on delete set null,
  cliente_nome text default '',
  cliente_tel text default '',
  cliente_email text default '',
  descricao text default '',
  valor numeric,
  status text not null default 'lead',
  motivo_perda text,
  os_gerada_id uuid references ordens_servico(id) on delete set null,
  ordem integer default 0,
  criado_por text default '',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists crm_orcamentos_status_idx on crm_orcamentos(status);

alter table crm_orcamentos enable row level security;

create policy "crm_orcamentos_authenticated" on crm_orcamentos
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
