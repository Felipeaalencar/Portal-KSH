alter table clientes add column if not exists cnpj_cpf text;
alter table clientes add column if not exists cidade text;
alter table clientes add column if not exists uf text;
alter table clientes add column if not exists tem_contrato boolean not null default false;

alter table ordens_servico add column if not exists concluida_em timestamptz;
