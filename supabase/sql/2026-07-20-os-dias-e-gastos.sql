create table if not exists os_dias (
  id uuid primary key default gen_random_uuid(),
  os_id uuid not null references ordens_servico(id) on delete cascade,
  data date not null,
  tecnicos text[] not null default '{}',
  hora_inicio time,
  hora_fim time,
  observacao text default '',
  tarefa_origem_id uuid,
  criado_em timestamptz not null default now()
);

create index if not exists os_dias_os_id_idx on os_dias(os_id);

create table if not exists os_gastos (
  id uuid primary key default gen_random_uuid(),
  os_id uuid not null references ordens_servico(id) on delete cascade,
  os_dia_id uuid references os_dias(id) on delete set null,
  fornecedor text default '',
  descricao text default '',
  categoria text default 'outro',
  data date,
  quantidade numeric default 1,
  valor_unitario numeric,
  valor numeric not null default 0,
  foto_drive_id text,
  foto_drive_url text,
  status text not null default 'pendente',
  criado_por text default '',
  criado_em timestamptz not null default now()
);

create index if not exists os_gastos_os_id_idx on os_gastos(os_id);

alter table os_dias enable row level security;
alter table os_gastos enable row level security;

create policy "os_dias_authenticated" on os_dias
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "os_gastos_authenticated" on os_gastos
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
