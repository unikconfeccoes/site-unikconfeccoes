-- Atalho de CNPJ: o orçamento passa a guardar CNPJ, tamanho da equipe e o
-- retrato da empresa na Receita (razão social, CNAE, cidade, situação).
alter table public.orcamentos
  add column cnpj text check (cnpj ~ '^\d{14}$'),
  add column equipe text check (char_length(equipe) <= 100),
  add column dados_empresa jsonb check (dados_empresa is null or (jsonb_typeof(dados_empresa) = 'object' and pg_column_size(dados_empresa) <= 10000));

create index orcamentos_cnpj_idx on public.orcamentos (cnpj) where cnpj is not null;
