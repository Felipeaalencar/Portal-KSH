alter table ordens_servico add column if not exists valor_orcado numeric;
alter table ordens_servico add column if not exists status_cobranca text not null default 'a_cobrar';
