alter table ordens_servico add column if not exists tecnicos text[] not null default '{}';
update ordens_servico set tecnicos = array_remove(array[tecnico_nome], null)
  where tecnico_nome is not null and (tecnicos is null or tecnicos = '{}');
