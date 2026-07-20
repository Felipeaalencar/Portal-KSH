create table if not exists tarefas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  status text not null default 'media' check (status in ('media','alta','urgente','concluido')),
  ordem integer not null default 0,
  tecnico_nome text,
  cliente_nome text,
  data_agenda date,
  origem text not null default 'manual' check (origem in ('manual','email')),
  os_gerada_numero integer,
  criado_por text,
  criado_em timestamptz not null default now()
);

create table if not exists tarefa_notas (
  id uuid primary key default gen_random_uuid(),
  tarefa_id uuid not null references tarefas(id) on delete cascade,
  texto text not null,
  autor text,
  criado_em timestamptz not null default now()
);

alter table tarefas enable row level security;
alter table tarefa_notas enable row level security;

create policy "tarefas_authenticated" on tarefas
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "tarefa_notas_authenticated" on tarefa_notas
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
