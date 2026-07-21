alter table crm_orcamentos add column if not exists imposto_pct numeric not null default 0;

create table if not exists orcamento_areas (
  id uuid primary key default gen_random_uuid(),
  orcamento_id uuid not null references crm_orcamentos(id) on delete cascade,
  nome text not null,
  ordem integer default 0,
  criado_em timestamptz not null default now()
);

create index if not exists orcamento_areas_orcamento_idx on orcamento_areas(orcamento_id);

alter table orcamento_areas enable row level security;

create policy "orcamento_areas_authenticated" on orcamento_areas
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists orcamento_itens (
  id uuid primary key default gen_random_uuid(),
  area_id uuid not null references orcamento_areas(id) on delete cascade,
  catalogo_item_id uuid references catalogo_itens(id) on delete set null,
  tipo text not null default 'material' check (tipo in ('material','mao_obra')),
  nome text not null,
  descricao text default '',
  preco_unitario numeric not null default 0,
  quantidade numeric not null default 1,
  ordem integer default 0,
  criado_em timestamptz not null default now()
);

create index if not exists orcamento_itens_area_idx on orcamento_itens(area_id);

alter table orcamento_itens enable row level security;

create policy "orcamento_itens_authenticated" on orcamento_itens
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
