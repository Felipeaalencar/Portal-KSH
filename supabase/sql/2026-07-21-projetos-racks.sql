create table if not exists projetos_racks (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tamanho_u integer not null default 21,
  cliente_id uuid references clientes(id) on delete set null,
  os_id uuid references ordens_servico(id) on delete set null,
  criado_por text default '',
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists projetos_racks_cliente_idx on projetos_racks(cliente_id);
create index if not exists projetos_racks_os_idx on projetos_racks(os_id);

alter table projetos_racks enable row level security;

drop policy if exists "projetos_racks_authenticated" on projetos_racks;
create policy "projetos_racks_authenticated" on projetos_racks
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists projetos_rack_itens (
  id uuid primary key default gen_random_uuid(),
  rack_id uuid not null references projetos_racks(id) on delete cascade,
  nome text not null,
  u_inicio integer not null,
  u_altura integer not null default 1,
  cor_idx integer default 0,
  ordem integer default 0,
  criado_em timestamptz not null default now()
);

create index if not exists projetos_rack_itens_rack_idx on projetos_rack_itens(rack_id);

alter table projetos_rack_itens enable row level security;

drop policy if exists "projetos_rack_itens_authenticated" on projetos_rack_itens;
create policy "projetos_rack_itens_authenticated" on projetos_rack_itens
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
