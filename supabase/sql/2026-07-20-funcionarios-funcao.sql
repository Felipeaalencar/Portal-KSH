create table if not exists funcoes_tecnico (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  criado_em timestamptz not null default now()
);

alter table funcoes_tecnico enable row level security;

create policy "funcoes_tecnico_authenticated" on funcoes_tecnico
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into funcoes_tecnico (nome) values
  ('Gestor'), ('Técnico'), ('Auxiliar'), ('Freelancer')
on conflict (nome) do nothing;

alter table tecnicos add column if not exists funcao text;
