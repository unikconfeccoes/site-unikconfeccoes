-- Registros dos envios do site. O WhatsApp continua sendo o canal de atendimento;
-- estas tabelas guardam uma cópia de cada orçamento e briefing do Lab.
-- O site (chave pública/anon) só pode INSERIR. Leitura fica no painel do Supabase
-- (ou service_role), nunca no navegador.

create table public.orcamentos (
  id          uuid primary key default gen_random_uuid(),
  codigo      text not null unique check (char_length(codigo) <= 32),
  created_at  timestamptz not null default now(),
  nome        text not null check (char_length(nome) between 2 and 200),
  empresa     text check (char_length(empresa) <= 200),
  whatsapp    text not null check (char_length(whatsapp) <= 30),
  email       text check (char_length(email) <= 200),
  cidade      text check (char_length(cidade) <= 200),
  prazo       text check (char_length(prazo) <= 200),
  observacoes text check (char_length(observacoes) <= 4000),
  itens       jsonb not null check (jsonb_typeof(itens) = 'array' and pg_column_size(itens) <= 100000),
  total_pecas integer not null default 0 check (total_pecas >= 0),
  status      text not null default 'novo' check (status in ('novo', 'em_atendimento', 'fechado', 'perdido'))
);

create table public.lab_briefings (
  id          uuid primary key default gen_random_uuid(),
  codigo      text not null unique check (char_length(codigo) <= 32),
  created_at  timestamptz not null default now(),
  nome        text not null check (char_length(nome) between 2 and 200),
  marca       text check (char_length(marca) <= 200),
  instagram   text check (char_length(instagram) <= 200),
  whatsapp    text not null check (char_length(whatsapp) <= 30),
  email       text check (char_length(email) <= 200),
  estagio     text not null check (char_length(estagio) <= 200),
  pecas       text[] not null default '{}' check (cardinality(pecas) <= 50),
  quantidade  text check (char_length(quantidade) <= 100),
  tecnicas    text[] not null default '{}' check (cardinality(tecnicas) <= 50),
  prazo       text check (char_length(prazo) <= 200),
  ideia       text not null check (char_length(ideia) between 20 and 2000),
  qtd_referencias integer not null default 0 check (qtd_referencias between 0 and 6),
  status      text not null default 'novo' check (status in ('novo', 'em_atendimento', 'fechado', 'perdido'))
);

create index orcamentos_created_at_idx on public.orcamentos (created_at desc);
create index lab_briefings_created_at_idx on public.lab_briefings (created_at desc);

alter table public.orcamentos enable row level security;
alter table public.lab_briefings enable row level security;

-- Somente inserção pelo site; status sempre nasce 'novo'.
create policy "site insere orcamentos" on public.orcamentos
  for insert to anon, authenticated with check (status = 'novo');
create policy "site insere briefings" on public.lab_briefings
  for insert to anon, authenticated with check (status = 'novo');

revoke all on public.orcamentos, public.lab_briefings from anon, authenticated;
grant insert on public.orcamentos, public.lab_briefings to anon, authenticated;
