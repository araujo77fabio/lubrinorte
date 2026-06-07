import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://zctawwyidjjuyfxemjbm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjdGF3d3lpZGpqdXlmeGVtamJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY3ODY2OCwiZXhwIjoyMDk2MjU0NjY4fQ.B9D5FIJlSDIB_7dMgQ-HqDKo_MXj-iH9sSw0Uv7t-uM',
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const REGRAS = {
  'a1000000-0000-0000-0000-000000000001': 3.5,
  'a1000000-0000-0000-0000-000000000002': 3.0,
  'a1000000-0000-0000-0000-000000000003': 3.5,
}

const { data: pedidos } = await supabase
  .from('pedidos')
  .select('id, total, vendedor_id')
  .in('status', ['aprovado', 'entregue'])
  .not('vendedor_id', 'is', null)

const { data: existentes } = await supabase.from('comissoes').select('pedido_id')
const jaExistem = new Set((existentes ?? []).map(c => c.pedido_id))
const novas = (pedidos ?? [])
  .filter(p => !jaExistem.has(p.id))
  .map(p => {
    const pct = REGRAS[p.vendedor_id] ?? 3.5
    return { vendedor_id: p.vendedor_id, pedido_id: p.id, valor_pedido: p.total, percentual: pct, valor_comissao: p.total * pct / 100, status: 'pendente' }
  })

if (novas.length > 0) {
  const { error } = await supabase.from('comissoes').insert(novas)
  console.log(error ? 'ERRO: ' + error.message : `OK - ${novas.length} comissoes criadas`)
} else {
  console.log('Nada a criar')
}

const { count } = await supabase.from('comissoes').select('*', { count: 'exact', head: true })
console.log('Total comissoes:', count)
