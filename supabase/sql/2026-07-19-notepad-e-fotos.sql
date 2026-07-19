alter table ordens_servico add column if not exists notepad text;
alter table os_fotos add column if not exists interna boolean not null default false;
