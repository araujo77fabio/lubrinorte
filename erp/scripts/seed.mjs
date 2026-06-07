import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://zctawwyidjjuyfxemjbm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjdGF3d3lpZGpqdXlmeGVtamJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY3ODY2OCwiZXhwIjoyMDk2MjU0NjY4fQ.B9D5FIJlSDIB_7dMgQ-HqDKo_MXj-iH9sSw0Uv7t-uM',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function seed() {
  console.log('🌱 Iniciando seed...\n')

  // 1. Vendedores
  const { error: e1 } = await supabase.from('vendedores').upsert([
    { id: 'a1000000-0000-0000-0000-000000000001', nome: 'Carlos Silva', email: 'carlos@lubrinorte.com', telefone: '(92) 99201-1111', meta_mensal: 50000, regiao: 'Zona Norte' },
    { id: 'a1000000-0000-0000-0000-000000000002', nome: 'Ana Ferreira', email: 'ana@lubrinorte.com',    telefone: '(92) 99201-2222', meta_mensal: 45000, regiao: 'Zona Sul' },
    { id: 'a1000000-0000-0000-0000-000000000003', nome: 'Joao Mendes',  email: 'joao@lubrinorte.com',   telefone: '(92) 99201-3333', meta_mensal: 40000, regiao: 'Interior AM' },
  ], { onConflict: 'id' })
  console.log(e1 ? `ERRO Vendedores: ${e1.message}` : 'OK Vendedores (3)')

  // 2. Produtos
  const { error: e2 } = await supabase.from('produtos').upsert([
    { id: 'c1000000-0000-0000-0000-000000000001', sku: 'TEX-15W40-20L', nome: 'Texaco Delo 400 15W40',   marca: 'Texaco', categoria: 'Diesel',   unidade: 'Galao 20L', preco_venda: 320.00, preco_custo: 210.00, estoque_atual: 48,  estoque_minimo: 20 },
    { id: 'c1000000-0000-0000-0000-000000000002', sku: 'TEX-15W40-01L', nome: 'Texaco Delo 400 15W40',   marca: 'Texaco', categoria: 'Diesel',   unidade: 'Litro',     preco_venda:  22.00, preco_custo:  14.00, estoque_atual: 320, estoque_minimo: 100 },
    { id: 'c1000000-0000-0000-0000-000000000003', sku: 'UNI-15W40-20L', nome: 'UNI Diesel 15W40',        marca: 'UNI',    categoria: 'Diesel',   unidade: 'Galao 20L', preco_venda: 248.00, preco_custo: 162.00, estoque_atual: 12,  estoque_minimo: 15 },
    { id: 'c1000000-0000-0000-0000-000000000004', sku: 'UNI-20W50-01L', nome: 'UNI Gasolina 20W50',      marca: 'UNI',    categoria: 'Gasolina', unidade: 'Litro',     preco_venda:  18.00, preco_custo:  11.50, estoque_atual: 180, estoque_minimo: 80 },
    { id: 'c1000000-0000-0000-0000-000000000005', sku: 'TEX-10W30-01L', nome: 'Texaco Havoline 10W30',   marca: 'Texaco', categoria: 'Gasolina', unidade: 'Litro',     preco_venda:  24.00, preco_custo:  15.50, estoque_atual:  6,  estoque_minimo: 50 },
    { id: 'c1000000-0000-0000-0000-000000000006', sku: 'GRX-MP2-20KG',  nome: 'Graxa MP-2 Multiuso',     marca: 'Texaco', categoria: 'Graxa',    unidade: 'Balde 20kg',preco_venda: 185.00, preco_custo: 118.00, estoque_atual: 22,  estoque_minimo: 10 },
    { id: 'c1000000-0000-0000-0000-000000000007', sku: 'FLD-ATF-01L',   nome: 'Fluido ATF Dextron III',  marca: 'UNI',    categoria: 'Fluido',   unidade: 'Litro',     preco_venda:  28.00, preco_custo:  18.00, estoque_atual: 55,  estoque_minimo: 20 },
    { id: 'c1000000-0000-0000-0000-000000000008', sku: 'BAT-60AH-MRA',  nome: 'Bateria Moura 60Ah',      marca: 'Moura',  categoria: 'Bateria',  unidade: 'Unidade',   preco_venda: 420.00, preco_custo: 290.00, estoque_atual:  8,  estoque_minimo: 5 },
    { id: 'c1000000-0000-0000-0000-000000000009', sku: 'BAT-90AH-MRB',  nome: 'Bateria Moura 90Ah Truck',marca: 'Moura',  categoria: 'Bateria',  unidade: 'Unidade',   preco_venda: 680.00, preco_custo: 470.00, estoque_atual:  4,  estoque_minimo: 4 },
    { id: 'c1000000-0000-0000-0000-000000000010', sku: 'UNI-10W40-01L', nome: 'UNI Moto 10W40',          marca: 'UNI',    categoria: 'Moto',     unidade: 'Litro',     preco_venda:  26.00, preco_custo:  17.00, estoque_atual: 90,  estoque_minimo: 40 },
  ], { onConflict: 'sku' })
  console.log(e2 ? `ERRO Produtos: ${e2.message}` : 'OK Produtos (10)')

  // 3. Clientes
  const { error: e3 } = await supabase.from('clientes').upsert([
    { id: 'b1000000-0000-0000-0000-000000000001', razao_social: 'Transportadora Rapida Ltda', nome_fantasia: 'Trans Rapida',   cnpj: '04252011000110', email: 'compras@transrapida.com.br',   telefone: '(92) 3321-1001', cidade: 'Manaus', uf: 'AM', segmento: 'Transportadora', status: 'ativo',    vendedor_id: 'a1000000-0000-0000-0000-000000000001' },
    { id: 'b1000000-0000-0000-0000-000000000002', razao_social: 'Auto Center Silva',           nome_fantasia: 'AC Silva',       cnpj: '12345678000199', email: 'contato@acsilva.com.br',        telefone: '(92) 3322-2002', cidade: 'Manaus', uf: 'AM', segmento: 'Oficina',        status: 'ativo',    vendedor_id: 'a1000000-0000-0000-0000-000000000002' },
    { id: 'b1000000-0000-0000-0000-000000000003', razao_social: 'Frota Municipal Manaus',      nome_fantasia: 'Frota Municipal',cnpj: '04970177000151', email: 'frotas@manaus.am.gov.br',       telefone: '(92) 3303-3003', cidade: 'Manaus', uf: 'AM', segmento: 'Frota',          status: 'ativo',    vendedor_id: 'a1000000-0000-0000-0000-000000000001' },
    { id: 'b1000000-0000-0000-0000-000000000004', razao_social: 'Estaleiro Boa Vista SA',      nome_fantasia: 'Estaleiro BV',   cnpj: '33000167000101', email: 'op@estaleiroboavista.com',      telefone: '(92) 3324-4004', cidade: 'Manaus', uf: 'AM', segmento: 'Nautico',        status: 'proposta', vendedor_id: 'a1000000-0000-0000-0000-000000000003' },
    { id: 'b1000000-0000-0000-0000-000000000005', razao_social: 'Industria Metalurgica AM',    nome_fantasia: 'MetalAM',        cnpj: '60746948000112', email: 'compras@metalurgicaam.com.br',  telefone: '(92) 3325-5005', cidade: 'Manaus', uf: 'AM', segmento: 'Industria',      status: 'ativo',    vendedor_id: 'a1000000-0000-0000-0000-000000000002' },
    { id: 'b1000000-0000-0000-0000-000000000006', razao_social: 'Oficina Central Norte',       nome_fantasia: 'OC Norte',       cnpj: '23456789000133', email: 'contato@ocnorte.com.br',        telefone: '(92) 3326-6006', cidade: 'Manaus', uf: 'AM', segmento: 'Oficina',        status: 'inativo',  vendedor_id: 'a1000000-0000-0000-0000-000000000003' },
    { id: 'b1000000-0000-0000-0000-000000000007', razao_social: 'Madeireira Amazonas Ltda',    nome_fantasia: 'Madeireira AM',  cnpj: '34567890000144', email: 'compras@madeireiraaw.com.br',   telefone: '(92) 3327-7007', cidade: 'Manaus', uf: 'AM', segmento: 'Industria',      status: 'proposta', vendedor_id: 'a1000000-0000-0000-0000-000000000001' },
  ], { onConflict: 'cnpj' })
  console.log(e3 ? `ERRO Clientes: ${e3.message}` : 'OK Clientes (7)')

  // 4. Pedidos
  const { error: e4 } = await supabase.from('pedidos').upsert([
    { id: 'd1000000-0000-0000-0000-000000000001', cliente_id: 'b1000000-0000-0000-0000-000000000003', vendedor_id: 'a1000000-0000-0000-0000-000000000001', tipo: 'pedido', status: 'entregue', subtotal: 9000, total: 9000 },
    { id: 'd1000000-0000-0000-0000-000000000002', cliente_id: 'b1000000-0000-0000-0000-000000000002', vendedor_id: 'a1000000-0000-0000-0000-000000000002', tipo: 'pedido', status: 'aprovado', subtotal: 780,  total: 780  },
    { id: 'd1000000-0000-0000-0000-000000000003', cliente_id: 'b1000000-0000-0000-0000-000000000001', vendedor_id: 'a1000000-0000-0000-0000-000000000001', tipo: 'pedido', status: 'aprovado', subtotal: 2160, total: 2160 },
    { id: 'd1000000-0000-0000-0000-000000000004', cliente_id: 'b1000000-0000-0000-0000-000000000004', vendedor_id: 'a1000000-0000-0000-0000-000000000003', tipo: 'cotacao',status: 'enviado',  subtotal: 1350, total: 1350 },
    { id: 'd1000000-0000-0000-0000-000000000005', cliente_id: 'b1000000-0000-0000-0000-000000000005', vendedor_id: 'a1000000-0000-0000-0000-000000000002', tipo: 'pedido', status: 'entregue', subtotal: 2400, total: 2400 },
  ], { onConflict: 'id' })
  console.log(e4 ? `ERRO Pedidos: ${e4.message}` : 'OK Pedidos (5)')

  // 5. Itens
  const { error: e5 } = await supabase.from('pedido_itens').upsert([
    { id: 'e1000000-0000-0000-0000-000000000001', pedido_id: 'd1000000-0000-0000-0000-000000000001', produto_id: 'c1000000-0000-0000-0000-000000000001', quantidade: 25,  preco_unitario: 320, total: 8000 },
    { id: 'e1000000-0000-0000-0000-000000000002', pedido_id: 'd1000000-0000-0000-0000-000000000001', produto_id: 'c1000000-0000-0000-0000-000000000006', quantidade: 5,   preco_unitario: 185, total: 925  },
    { id: 'e1000000-0000-0000-0000-000000000003', pedido_id: 'd1000000-0000-0000-0000-000000000002', produto_id: 'c1000000-0000-0000-0000-000000000004', quantidade: 60,  preco_unitario: 18,  total: 1080 },
    { id: 'e1000000-0000-0000-0000-000000000004', pedido_id: 'd1000000-0000-0000-0000-000000000003', produto_id: 'c1000000-0000-0000-0000-000000000001', quantidade: 6,   preco_unitario: 320, total: 1920 },
    { id: 'e1000000-0000-0000-0000-000000000005', pedido_id: 'd1000000-0000-0000-0000-000000000005', produto_id: 'c1000000-0000-0000-0000-000000000002', quantidade: 120, preco_unitario: 22,  total: 2640 },
  ], { onConflict: 'id' })
  console.log(e5 ? `ERRO Itens: ${e5.message}` : 'OK Itens de pedido (5)')

  // 6. Interacoes
  const { error: e6 } = await supabase.from('interacoes').insert([
    { cliente_id: 'b1000000-0000-0000-0000-000000000003', vendedor_id: 'a1000000-0000-0000-0000-000000000001', tipo: 'Ligacao',  descricao: 'Confirmou pedido mensal 500L 15W40. Solicitou cotacao de graxas.' },
    { cliente_id: 'b1000000-0000-0000-0000-000000000003', vendedor_id: 'a1000000-0000-0000-0000-000000000001', tipo: 'WhatsApp', descricao: 'Enviado catalogo atualizado com precos de junho.' },
    { cliente_id: 'b1000000-0000-0000-0000-000000000001', vendedor_id: 'a1000000-0000-0000-0000-000000000001', tipo: 'Pedido',   descricao: 'Pedido confirmado: 120L 15W40 entrega na segunda.' },
    { cliente_id: 'b1000000-0000-0000-0000-000000000002', vendedor_id: 'a1000000-0000-0000-0000-000000000002', tipo: 'E-mail',   descricao: 'Proposta de contrato trimestral enviada. Aguardando resposta.' },
  ])
  console.log(e6 ? `ERRO Interacoes: ${e6.message}` : 'OK Interacoes (4)')

  // 7. Oportunidades
  const { error: e7 } = await supabase.from('oportunidades').insert([
    { cliente_id: 'b1000000-0000-0000-0000-000000000004', vendedor_id: 'a1000000-0000-0000-0000-000000000003', titulo: 'Contrato anual oleos nauticos',  valor_estimado: 5200,  stage: 'proposta',   produto_interesse: 'Nautico' },
    { cliente_id: 'b1000000-0000-0000-0000-000000000007', vendedor_id: 'a1000000-0000-0000-0000-000000000001', titulo: 'Fornecimento mensal Madeireira', valor_estimado: 7100,  stage: 'proposta',   produto_interesse: 'Diesel e Graxas' },
    { cliente_id: 'b1000000-0000-0000-0000-000000000003', vendedor_id: 'a1000000-0000-0000-0000-000000000001', titulo: 'Expansao frota 2026',            valor_estimado: 28000, stage: 'negociacao', produto_interesse: 'Texaco 15W40' },
  ])
  console.log(e7 ? `ERRO Oportunidades: ${e7.message}` : 'OK Oportunidades (3)')

  // Verificacao final
  console.log('\n📊 Contagem final:')
  const [v, p, c, pd, it, in_, op] = await Promise.all([
    supabase.from('vendedores').select('*', { count: 'exact', head: true }),
    supabase.from('produtos').select('*',   { count: 'exact', head: true }),
    supabase.from('clientes').select('*',   { count: 'exact', head: true }),
    supabase.from('pedidos').select('*',    { count: 'exact', head: true }),
    supabase.from('pedido_itens').select('*',{ count: 'exact', head: true }),
    supabase.from('interacoes').select('*', { count: 'exact', head: true }),
    supabase.from('oportunidades').select('*',{ count: 'exact', head: true }),
  ])
  console.log(`  Vendedores:   ${v.count}`)
  console.log(`  Produtos:     ${p.count}`)
  console.log(`  Clientes:     ${c.count}`)
  console.log(`  Pedidos:      ${pd.count}`)
  console.log(`  Itens:        ${it.count}`)
  console.log(`  Interacoes:   ${in_.count}`)
  console.log(`  Oportunidades:${op.count}`)
  console.log('\n BANCO PRONTO!')
}

seed().catch(console.error)
