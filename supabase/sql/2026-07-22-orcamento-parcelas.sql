create table if not exists orcamento_parcelas (
  id uuid primary key default gen_random_uuid(),
  orcamento_id uuid not null references crm_orcamentos(id) on delete cascade,
  percentual numeric not null default 0,
  condicao text not null default '',
  ordem integer default 0,
  criado_em timestamptz not null default now()
);

create index if not exists orcamento_parcelas_orcamento_idx on orcamento_parcelas(orcamento_id);

alter table orcamento_parcelas enable row level security;

create policy "orcamento_parcelas_authenticated" on orcamento_parcelas
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
