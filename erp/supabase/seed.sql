-- =====================================================
-- LUBRINORTE ERP — Seed de Dados
-- =====================================================

-- Vendedores
insert into public.vendedores (id, nome, email, telefone, meta_mensal, regiao) values
  ('a1000000-0000-0000-0000-000000000001', 'Carlos Silva',  'carlos@lubrinorte.com',  '(92) 99201-1111', 50000, 'Zona Norte'),
  ('a1000000-0000-0000-0000-000000000002', 'Ana Ferreira',  'ana@lubrinorte.com',     '(92) 99201-2222', 45000, 'Zona Sul'),
  ('a1000000-0000-0000-0000-000000000003', 'João Mendes',   'joao@lubrinorte.com',    '(92) 99201-3333', 40000, 'Interior AM')
on conflict (id) do nothing;

-- Clientes
insert into public.clientes (id, razao_social, nome_fantasia, cnpj, email, telefone, cidade, uf, segmento, status, vendedor_id) values
  ('b1000000-0000-0000-0000-000000000001', 'Transportadora Rápida Ltda',  'Trans Rápida',     '04.252.011/0001-10', 'compras@transrapida.com.br',  '(92) 3321-1001', 'Manaus', 'AM', 'Transportadora', 'ativo',    'a1000000-0000-0000-0000-000000000001'),
  ('b1000000-0000-0000-0000-000000000002', 'Auto Center Silva',            'AC Silva',         '12.345.678/0001-99', 'contato@acsilva.com.br',       '(92) 3322-2002', 'Manaus', 'AM', 'Oficina',        'ativo',    'a1000000-0000-0000-0000-000000000002'),
  ('b1000000-0000-0000-0000-000000000003', 'Frota Municipal Manaus',       'Frota Municipal',  '04.970.177/0001-51', 'frotas@manaus.am.gov.br',      '(92) 3303-3003', 'Manaus', 'AM', 'Frota',          'ativo',    'a1000000-0000-0000-0000-000000000001'),
  ('b1000000-0000-0000-0000-000000000004', 'Estaleiro Boa Vista SA',       'Estaleiro BV',     '33.000.167/0001-01', 'operacoes@estaleiroboavista.com','(92) 3324-4004','Manaus', 'AM', 'Náutico',        'proposta', 'a1000000-0000-0000-0000-000000000003'),
  ('b1000000-0000-0000-0000-000000000005', 'Indústria Metalúrgica AM',     'MetalAM',          '60.746.948/0001-12', 'compras@metalurgicaam.com.br', '(92) 3325-5005', 'Manaus', 'AM', 'Indústria',      'ativo',    'a1000000-0000-0000-0000-000000000002'),
  ('b1000000-0000-0000-0000-000000000006', 'Oficina Central Norte',        'OC Norte',         '23.456.789/0001-33', 'contato@ocnorte.com.br',       '(92) 3326-6006', 'Manaus', 'AM', 'Oficina',        'inativo',  'a1000000-0000-0000-0000-000000000003'),
  ('b1000000-0000-0000-0000-000000000007', 'Madeireira Amazonas Ltda',     'Madeireira AM',    '34.567.890/0001-44', 'compras@madeireiraaw.com.br',  '(92) 3327-7007', 'Manaus', 'AM', 'Indústria',      'proposta', 'a1000000-0000-0000-0000-000000000001')
on conflict (cnpj) do nothing;

-- Produtos
insert into public.produtos (id, sku, nome, marca, categoria, unidade, preco_venda, preco_custo, estoque_atual, estoque_minimo) values
  ('c1000000-0000-0000-0000-000000000001', 'TEX-15W40-20L', 'Texaco Delo 400 15W40',     'Texaco', 'Diesel',   'Galão 20L', 320.00, 210.00, 48,  20),
  ('c1000000-0000-0000-0000-000000000002', 'TEX-15W40-01L', 'Texaco Delo 400 15W40',     'Texaco', 'Diesel',   'Litro',      22.00,  14.00, 320, 100),
  ('c1000000-0000-0000-0000-000000000003', 'UNI-15W40-20L', 'UNI Diesel 15W40',          'UNI',    'Diesel',   'Galão 20L', 248.00, 162.00, 12,  15),
  ('c1000000-0000-0000-0000-000000000004', 'UNI-20W50-01L', 'UNI Gasolina 20W50',        'UNI',    'Gasolina', 'Litro',      18.00,  11.50, 180,  80),
  ('c1000000-0000-0000-0000-000000000005', 'TEX-10W30-01L', 'Texaco Havoline 10W30',     'Texaco', 'Gasolina', 'Litro',      24.00,  15.50,   6,  50),
  ('c1000000-0000-0000-0000-000000000006', 'GRX-MP2-20KG',  'Graxa MP-2 Multiuso',       'Texaco', 'Graxa',    'Balde 20kg',185.00, 118.00, 22,  10),
  ('c1000000-0000-0000-0000-000000000007', 'FLD-ATF-01L',   'Fluido ATF Dextron III',    'UNI',    'Fluido',   'Litro',      28.00,  18.00, 55,  20),
  ('c1000000-0000-0000-0000-000000000008', 'BAT-60AH-MRA',  'Bateria Moura 60Ah',        'Moura',  'Bateria',  'Unidade',   420.00, 290.00,  8,   5),
  ('c1000000-0000-0000-0000-000000000009', 'BAT-90AH-MRB',  'Bateria Moura 90Ah Truck',  'Moura',  'Bateria',  'Unidade',   680.00, 470.00,  4,   4),
  ('c1000000-0000-0000-0000-000000000010', 'UNI-10W40-01L', 'UNI Moto 10W40',            'UNI',    'Moto',     'Litro',      26.00,  17.00, 90,  40)
on conflict (sku) do nothing;

-- Regras de comissão
insert into public.regras_comissao (vendedor_id, tipo, percentual, ativo) values
  ('a1000000-0000-0000-0000-000000000001', 'percentual', 3.5, true),
  ('a1000000-0000-0000-0000-000000000002', 'percentual', 3.0, true),
  ('a1000000-0000-0000-0000-000000000003', 'percentual', 3.5, true)
on conflict do nothing;

-- Oportunidades
insert into public.oportunidades (cliente_id, vendedor_id, titulo, valor_estimado, stage, produto_interesse) values
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'Contrato anual óleos náuticos', 5200,  'proposta',   'Náutico'),
  ('b1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001', 'Fornecimento mensal Madeireira', 7100, 'proposta',   'Diesel + Graxas'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'Expansão frota 2026',           28000, 'negociacao', 'Texaco 15W40')
on conflict do nothing;
