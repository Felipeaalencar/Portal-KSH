-- Tabela de Técnicos (nome, contato, valor da hora trabalhada)
create table if not exists tecnicos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text,
  telefone text,
  valor_hora numeric,
  ativo boolean default true,
  created_at timestamptz default now()
);

alter table tecnicos enable row level security;

create policy "Usuarios autenticados podem ver tecnicos"
  on tecnicos for select
  using (auth.role() = 'authenticated');

create policy "Usuarios autenticados podem criar tecnicos"
  on tecnicos for insert
  with check (auth.role() = 'authenticated');

create policy "Usuarios autenticados podem editar tecnicos"
  on tecnicos for update
  using (auth.role() = 'authenticated');
