create table if not exists catalogo_itens (
  id uuid primary key default gen_random_uuid(),
  tipo text not null default 'material' check (tipo in ('material','mao_obra')),
  nome text not null,
  descricao text default '',
  unidade text default '',
  preco_venda numeric not null default 0,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists catalogo_itens_tipo_idx on catalogo_itens(tipo);

alter table catalogo_itens enable row level security;

create policy "catalogo_itens_authenticated" on catalogo_itens
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
