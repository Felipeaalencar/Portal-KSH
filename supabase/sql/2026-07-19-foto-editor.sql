alter table os_fotos add column if not exists anotacoes jsonb;

create table if not exists os_foto_comentarios (
  id uuid primary key default gen_random_uuid(),
  foto_id uuid references os_fotos(id) on delete cascade,
  os_id uuid,
  autor text,
  texto text not null,
  criado_em timestamptz default now()
);

alter table os_foto_comentarios enable row level security;

create policy "Usuarios autenticados podem ver comentarios de foto"
  on os_foto_comentarios for select
  using (auth.role() = 'authenticated');

create policy "Usuarios autenticados podem criar comentarios de foto"
  on os_foto_comentarios for insert
  with check (auth.role() = 'authenticated');
