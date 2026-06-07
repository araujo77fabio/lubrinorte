-- =====================================================
-- LUBRINORTE ERP — Schema Completo
-- =====================================================

-- Extensões
create extension if not exists "uuid-ossp";
create extension if not exists "unaccent";

-- =====================================================
-- PROFILES (estende auth.users)
-- =====================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nome        text not null,
  email       text not null,
  role        text not null default 'vendedor' check (role in ('admin','gerente','vendedor','estoque')),
  ativo       boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- =====================================================
-- VENDEDORES
-- =====================================================
create table if not exists public.vendedores (
  id            uuid primary key default uuid_generate_v4(),
  profile_id    uuid references public.profiles(id),
  nome          text not null,
  email         text,
  telefone      text,
  meta_mensal   numeric(12,2) not null default 0,
  regiao        text,
  ativo         boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- =====================================================
-- CLIENTES
-- =====================================================
create table if not exists public.clientes (
  id              uuid primary key default uuid_generate_v4(),
  razao_social    text not null,
  nome_fantasia   text,
  cnpj            text unique,
  email           text,
  telefone        text,
  cidade          text not null default 'Manaus',
  uf              text not null default 'AM',
  segmento        text not null check (segmento in ('Transportadora','Oficina','Frota','Náutico','Indústria','Auto Center','Revenda','Outro')),
  status          text not null default 'ativo' check (status in ('ativo','proposta','inativo')),
  vendedor_id     uuid references public.vendedores(id),
  observacoes     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- =====================================================
-- CONTATOS
-- =====================================================
create table if not exists public.contatos (
  id          uuid primary key default uuid_generate_v4(),
  cliente_id  uuid not null references public.clientes(id) on delete cascade,
  nome        text not null,
  cargo       text,
  email       text,
  telefone    text,
  principal   boolean not null default false,
  created_at  timestamptz not null default now()
);

-- =====================================================
-- OPORTUNIDADES (pipeline)
-- =====================================================
create table if not exists public.oportunidades (
  id              uuid primary key default uuid_generate_v4(),
  cliente_id      uuid not null references public.clientes(id) on delete cascade,
  vendedor_id     uuid references public.vendedores(id),
  titulo          text not null,
  valor_estimado  numeric(12,2),
  stage           text not null default 'prospeccao' check (stage in ('prospeccao','contato','proposta','negociacao','fechado','perdido')),
  previsao        date,
  produto_interesse text,
  observacoes     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- =====================================================
-- INTERAÇÕES
-- =====================================================
create table if not exists public.interacoes (
  id          uuid primary key default uuid_generate_v4(),
  cliente_id  uuid not null references public.clientes(id) on delete cascade,
  vendedor_id uuid references public.vendedores(id),
  tipo        text not null check (tipo in ('Ligação','WhatsApp','Visita','E-mail','Pedido','Outro')),
  descricao   text not null,
  created_at  timestamptz not null default now()
);

-- =====================================================
-- PRODUTOS (estoque)
-- =====================================================
create table if not exists public.produtos (
  id              uuid primary key default uuid_generate_v4(),
  sku             text unique not null,
  nome            text not null,
  marca           text not null check (marca in ('Texaco','UNI','Moura','Outro')),
  categoria       text not null,
  unidade         text not null,
  preco_venda     numeric(12,2) not null default 0,
  preco_custo     numeric(12,2) not null default 0,
  estoque_atual   integer not null default 0,
  estoque_minimo  integer not null default 0,
  ativo           boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- =====================================================
-- MOVIMENTAÇÕES DE ESTOQUE
-- =====================================================
create table if not exists public.movimentacoes_estoque (
  id              uuid primary key default uuid_generate_v4(),
  produto_id      uuid not null references public.produtos(id),
  tipo            text not null check (tipo in ('entrada','saida')),
  quantidade      integer not null check (quantidade > 0),
  saldo_apos      integer not null,
  motivo          text,
  lote            text,
  nf_numero       text,
  fornecedor      text,
  pedido_id       uuid,
  usuario_id      uuid references public.profiles(id),
  created_at      timestamptz not null default now()
);

-- =====================================================
-- PEDIDOS / COTAÇÕES
-- =====================================================
create table if not exists public.pedidos (
  id              uuid primary key default uuid_generate_v4(),
  numero          serial unique,
  cliente_id      uuid not null references public.clientes(id),
  vendedor_id     uuid references public.vendedores(id),
  tipo            text not null default 'pedido' check (tipo in ('cotacao','pedido')),
  status          text not null default 'rascunho' check (status in ('rascunho','enviado','aprovado','entregue','cancelado')),
  validade        date,
  desconto_pct    numeric(5,2) not null default 0,
  subtotal        numeric(12,2) not null default 0,
  desconto_valor  numeric(12,2) not null default 0,
  total           numeric(12,2) not null default 0,
  observacoes     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- =====================================================
-- ITENS DO PEDIDO
-- =====================================================
create table if not exists public.pedido_itens (
  id              uuid primary key default uuid_generate_v4(),
  pedido_id       uuid not null references public.pedidos(id) on delete cascade,
  produto_id      uuid not null references public.produtos(id),
  quantidade      integer not null check (quantidade > 0),
  preco_unitario  numeric(12,2) not null,
  desconto_pct    numeric(5,2) not null default 0,
  total           numeric(12,2) not null,
  created_at      timestamptz not null default now()
);

-- =====================================================
-- REGRAS DE COMISSÃO
-- =====================================================
create table if not exists public.regras_comissao (
  id              uuid primary key default uuid_generate_v4(),
  vendedor_id     uuid references public.vendedores(id),
  categoria       text,
  marca           text,
  tipo            text not null default 'percentual' check (tipo in ('percentual','fixo','faixa')),
  percentual      numeric(5,2),
  valor_fixo      numeric(12,2),
  faixa_min       numeric(12,2),
  faixa_max       numeric(12,2),
  ativo           boolean not null default true,
  created_at      timestamptz not null default now()
);

-- =====================================================
-- COMISSÕES
-- =====================================================
create table if not exists public.comissoes (
  id              uuid primary key default uuid_generate_v4(),
  vendedor_id     uuid not null references public.vendedores(id),
  pedido_id       uuid not null references public.pedidos(id),
  valor_pedido    numeric(12,2) not null,
  percentual      numeric(5,2) not null,
  valor_comissao  numeric(12,2) not null,
  status          text not null default 'pendente' check (status in ('pendente','aprovada','paga','cancelada')),
  aprovado_por    uuid references public.profiles(id),
  aprovado_em     timestamptz,
  pago_em         timestamptz,
  observacoes     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- =====================================================
-- TRIGGERS — updated_at automático
-- =====================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_profiles_updated_at       before update on public.profiles       for each row execute function set_updated_at();
create trigger trg_vendedores_updated_at     before update on public.vendedores     for each row execute function set_updated_at();
create trigger trg_clientes_updated_at       before update on public.clientes       for each row execute function set_updated_at();
create trigger trg_oportunidades_updated_at  before update on public.oportunidades  for each row execute function set_updated_at();
create trigger trg_produtos_updated_at       before update on public.produtos       for each row execute function set_updated_at();
create trigger trg_pedidos_updated_at        before update on public.pedidos        for each row execute function set_updated_at();
create trigger trg_comissoes_updated_at      before update on public.comissoes      for each row execute function set_updated_at();

-- =====================================================
-- TRIGGER — atualizar estoque ao movimentar
-- =====================================================
create or replace function public.atualizar_estoque()
returns trigger language plpgsql as $$
begin
  if new.tipo = 'entrada' then
    update public.produtos set estoque_atual = estoque_atual + new.quantidade where id = new.produto_id;
  else
    update public.produtos set estoque_atual = estoque_atual - new.quantidade where id = new.produto_id;
  end if;
  new.saldo_apos := (select estoque_atual from public.produtos where id = new.produto_id);
  return new;
end; $$;

create trigger trg_movimentacao_estoque
  before insert on public.movimentacoes_estoque
  for each row execute function public.atualizar_estoque();

-- =====================================================
-- TRIGGER — calcular comissão ao confirmar pedido
-- =====================================================
create or replace function public.calcular_comissao()
returns trigger language plpgsql as $$
declare
  v_percentual numeric(5,2) := 3.5; -- padrão
  v_regra record;
begin
  if new.status = 'aprovado' and old.status != 'aprovado' and new.vendedor_id is not null then
    select percentual into v_regra from public.regras_comissao
      where vendedor_id = new.vendedor_id and ativo = true
      order by created_at desc limit 1;
    if found then v_percentual := v_regra.percentual; end if;

    insert into public.comissoes (vendedor_id, pedido_id, valor_pedido, percentual, valor_comissao)
    values (new.vendedor_id, new.id, new.total, v_percentual, new.total * v_percentual / 100);
  end if;
  return new;
end; $$;

create trigger trg_calcular_comissao
  after update on public.pedidos
  for each row execute function public.calcular_comissao();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table public.profiles               enable row level security;
alter table public.vendedores             enable row level security;
alter table public.clientes               enable row level security;
alter table public.contatos               enable row level security;
alter table public.oportunidades          enable row level security;
alter table public.interacoes             enable row level security;
alter table public.produtos               enable row level security;
alter table public.movimentacoes_estoque  enable row level security;
alter table public.pedidos                enable row level security;
alter table public.pedido_itens           enable row level security;
alter table public.regras_comissao        enable row level security;
alter table public.comissoes              enable row level security;

-- Policies: admin e gerente vêem tudo; vendedor vê só seus dados
create policy "admin_all" on public.clientes for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','gerente'))
);
create policy "vendedor_own_clients" on public.clientes for select using (
  vendedor_id in (select id from public.vendedores where profile_id = auth.uid())
);
create policy "produtos_all_authenticated" on public.produtos for all using (auth.uid() is not null);
create policy "pedidos_all_authenticated"  on public.pedidos  for all using (auth.uid() is not null);
create policy "movimentacoes_all_authenticated" on public.movimentacoes_estoque for all using (auth.uid() is not null);
create policy "comissoes_all_authenticated" on public.comissoes for all using (auth.uid() is not null);
create policy "vendedores_read_all" on public.vendedores for select using (auth.uid() is not null);
create policy "interacoes_all" on public.interacoes for all using (auth.uid() is not null);
create policy "oportunidades_all" on public.oportunidades for all using (auth.uid() is not null);
create policy "contatos_all" on public.contatos for all using (auth.uid() is not null);
create policy "pedido_itens_all" on public.pedido_itens for all using (auth.uid() is not null);
create policy "regras_comissao_all" on public.regras_comissao for all using (auth.uid() is not null);
create policy "profiles_own" on public.profiles for all using (id = auth.uid());
