#!/usr/bin/env node
// Script para criar schema e seed no Supabase via REST API
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SUPABASE_URL         = 'https://zctawwyidjjuyfxemjbm.supabase.co'
const SERVICE_ROLE_KEY     = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjdGF3d3lpZGpqdXlmeGVtamJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY3ODY2OCwiZXhwIjoyMDk2MjU0NjY4fQ.B9D5FIJlSDIB_7dMgQ-HqDKo_MXj-iH9sSw0Uv7t-uM'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function runSQL(sql, label) {
  console.log(`\n⏳ ${label}...`)
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'apikey': SERVICE_ROLE_KEY,
    },
    body: JSON.stringify({ query: sql }),
  })
  if (!res.ok) {
    const text = await res.text()
    console.warn(`⚠️  ${label}: ${text.slice(0, 200)}`)
  } else {
    console.log(`✅ ${label} concluído`)
  }
}

async function executeSQLViaRestAPI(sql) {
  // Supabase não expõe SQL direto via REST público
  // Usamos pg via fetch para o endpoint de execução
  const response = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  })
  return response
}

async function insertViaSDK() {
  console.log('\n🌱 Inserindo dados via Supabase SDK...\n')

  // Vendedores
  const { error: e1 } = await supabase.from('vendedores').upsert([
    { id: 'a1000000-0000-0000-0000-000000000001', nome: 'Carlos Silva',  email: 'carlos@lubrinorte.com',  telefone: '(92) 99201-1111', meta_mensal: 50000, regiao: 'Zona Norte' },
    { id: 'a1000000-0000-0000-0000-000000000002', nome: 'Ana Ferreira',  email: 'ana@lubrinorte.com',     telefone: '(92) 99201-2222', meta_mensal: 45000, regiao: 'Zona Sul' },
    { id: 'a1000000-0000-0000-0000-000000000003', nome: 'João Mendes',   email: 'joao@lubrinorte.com',    telefone: '(92) 99201-3333', meta_mensal: 40000, regiao: 'Interior AM' },
  ], { onConflict: 'id' })
  if (e1) console.warn('Vendedores:', e1.message); else console.log('✅ Vendedores inseridos')

  // Produtos
  const { error: e2 } = await supabase.from('produtos').upsert([
    { id: 'c1000000-0000-0000-0000-000000000001', sku: 'TEX-15W40-20L', nome: 'Texaco Delo 400 15W40',    marca: 'Texaco', categoria: 'Diesel',   unidade: 'Galão 20L', preco_venda: 320.00, preco_custo: 210.00, estoque_atual: 48,  estoque_minimo: 20 },
    { id: 'c1000000-0000-0000-0000-000000000002', sku: 'TEX-15W40-01L', nome: 'Texaco Delo 400 15W40',    marca: 'Texaco', categoria: 'Diesel',   unidade: 'Litro',     preco_venda:  22.00, preco_custo:  14.00, estoque_atual: 320, estoque_minimo: 100 },
    { id: 'c1000000-0000-0000-0000-000000000003', sku: 'UNI-15W40-20L', nome: 'UNI Diesel 15W40',         marca: 'UNI',    categoria: 'Diesel',   unidade: 'Galão 20L', preco_venda: 248.00, preco_custo: 162.00, estoque_atual: 12,  estoque_minimo: 15 },
    { id: 'c1000000-0000-0000-0000-000000000004', sku: 'UNI-20W50-01L', nome: 'UNI Gasolina 20W50',       marca: 'UNI',    categoria: 'Gasolina', unidade: 'Litro',     preco_venda:  18.00, preco_custo:  11.50, estoque_atual: 180, estoque_minimo: 80 },
    { id: 'c1000000-0000-0000-0000-000000000005', sku: 'TEX-10W30-01L', nome: 'Texaco Havoline 10W30',    marca: 'Texaco', categoria: 'Gasolina', unidade: 'Litro',     preco_venda:  24.00, preco_custo:  15.50, estoque_atual:  6,  estoque_minimo: 50 },
    { id: 'c1000000-0000-0000-0000-000000000006', sku: 'GRX-MP2-20KG',  nome: 'Graxa MP-2 Multiuso',      marca: 'Texaco', categoria: 'Graxa',    unidade: 'Balde 20kg',preco_venda: 185.00, preco_custo: 118.00, estoque_atual: 22,  estoque_minimo: 10 },
    { id: 'c1000000-0000-0000-0000-000000000007', sku: 'FLD-ATF-01L',   nome: 'Fluido ATF Dextron III',   marca: 'UNI',    categoria: 'Fluido',   unidade: 'Litro',     preco_venda:  28.00, preco_custo:  18.00, estoque_atual: 55,  estoque_minimo: 20 },
    { id: 'c1000000-0000-0000-0000-000000000008', sku: 'BAT-60AH-MRA',  nome: 'Bateria Moura 60Ah',       marca: 'Moura',  categoria: 'Bateria',  unidade: 'Unidade',   preco_venda: 420.00, preco_custo: 290.00, estoque_atual:  8,  estoque_minimo: 5 },
    { id: 'c1000000-0000-0000-0000-000000000009', sku: 'BAT-90AH-MRB',  nome: 'Bateria Moura 90Ah Truck', marca: 'Moura',  categoria: 'Bateria',  unidade: 'Unidade',   preco_venda: 680.00, preco_custo: 470.00, estoque_atual:  4,  estoque_minimo: 4 },
    { id: 'c1000000-0000-0000-0000-000000000010', sku: 'UNI-10W40-01L', nome: 'UNI Moto 10W40',           marca: 'UNI',    categoria: 'Moto',     unidade: 'Litro',     preco_venda:  26.00, preco_custo:  17.00, estoque_atual: 90,  estoque_minimo: 40 },
  ], { onConflict: 'sku' })
  if (e2) console.warn('Produtos:', e2.message); else console.log('✅ Produtos inseridos')

  // Clientes
  const { error: e3 } = await supabase.from('clientes').upsert([
    { id: 'b1000000-0000-0000-0000-000000000001', razao_social: 'Transportadora Rápida Ltda', nome_fantasia: 'Trans Rápida',    cnpj: '04252011000110', email: 'compras@transrapida.com.br',   telefone: '(92) 3321-1001', cidade: 'Manaus', uf: 'AM', segmento: 'Transportadora', status: 'ativo',    vendedor_id: 'a1000000-0000-0000-0000-000000000001' },
    { id: 'b1000000-0000-0000-0000-000000000002', razao_social: 'Auto Center Silva',           nome_fantasia: 'AC Silva',         cnpj: '12345678000199', email: 'contato@acsilva.com.br',        telefone: '(92) 3322-2002', cidade: 'Manaus', uf: 'AM', segmento: 'Oficina',        status: 'ativo',    vendedor_id: 'a1000000-0000-0000-0000-000000000002' },
    { id: 'b1000000-0000-0000-0000-000000000003', razao_social: 'Frota Municipal Manaus',      nome_fantasia: 'Frota Municipal',  cnpj: '04970177000151', email: 'frotas@manaus.am.gov.br',       telefone: '(92) 3303-3003', cidade: 'Manaus', uf: 'AM', segmento: 'Frota',          status: 'ativo',    vendedor_id: 'a1000000-0000-0000-0000-000000000001' },
    { id: 'b1000000-0000-0000-0000-000000000004', razao_social: 'Estaleiro Boa Vista SA',      nome_fantasia: 'Estaleiro BV',     cnpj: '33000167000101', email: 'operacoes@estaleiroboavista.com',telefone: '(92) 3324-4004', cidade: 'Manaus', uf: 'AM', segmento: 'Náutico',        status: 'proposta', vendedor_id: 'a1000000-0000-0000-0000-000000000003' },
    { id: 'b1000000-0000-0000-0000-000000000005', razao_social: 'Indústria Metalúrgica AM',    nome_fantasia: 'MetalAM',          cnpj: '60746948000112', email: 'compras@metalurgicaam.com.br',  telefone: '(92) 3325-5005', cidade: 'Manaus', uf: 'AM', segmento: 'Indústria',      status: 'ativo',    vendedor_id: 'a1000000-0000-0000-0000-000000000002' },
    { id: 'b1000000-0000-0000-0000-000000000006', razao_social: 'Oficina Central Norte',       nome_fantasia: 'OC Norte',         cnpj: '23456789000133', email: 'contato@ocnorte.com.br',        telefone: '(92) 3326-6006', cidade: 'Manaus', uf: 'AM', segmento: 'Oficina',        status: 'inativo',  vendedor_id: 'a1000000-0000-0000-0000-000000000003' },
    { id: 'b1000000-0000-0000-0000-000000000007', razao_social: 'Madeireira Amazonas Ltda',    nome_fantasia: 'Madeireira AM',    cnpj: '34567890000144', email: 'compras@madeireiraaw.com.br',   telefone: '(92) 3327-7007', cidade: 'Manaus', uf: 'AM', segmento: 'Indústria',      status: 'proposta', vendedor_id: 'a1000000-0000-0000-0000-000000000001' },
  ], { onConflict: 'cnpj' })
  if (e3) console.warn('Clientes:', e3.message); else console.log('✅ Clientes inseridos')

  // Regras de comissão
  const { error: e4 } = await supabase.from('regras_comissao').insert([
    { vendedor_id: 'a1000000-0000-0000-0000-000000000001', tipo: 'percentual', percentual: 3.5, ativo: true },
    { vendedor_id: 'a1000000-0000-0000-0000-000000000002', tipo: 'percentual', percentual: 3.0, ativo: true },
    { vendedor_id: 'a1000000-0000-0000-0000-000000000003', tipo: 'percentual', percentual: 3.5, ativo: true },
  ])
  if (e4) console.warn('Regras comissão:', e4.message); else console.log('✅ Regras de comissão inseridas')

  console.log('\n🎉 Seed concluído com sucesso!')
}

insertViaSDK().catch(console.error)
