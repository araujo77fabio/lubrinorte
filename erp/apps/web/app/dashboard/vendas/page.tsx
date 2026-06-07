import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Vendas' }
export const revalidate = 0

const statusMap: Record<string, { label: string; cls: string }> = {
  rascunho:  { label: 'Rascunho',  cls: 'badge-gray'  },
  enviado:   { label: 'Enviado',   cls: 'badge-blue'  },
  aprovado:  { label: 'Aprovado',  cls: 'badge-gold'  },
  entregue:  { label: 'Entregue',  cls: 'badge-green' },
  cancelado: { label: 'Cancelado', cls: 'badge-red'   },
}

const tipoMap: Record<string, { label: string; cls: string }> = {
  cotacao: { label: 'Cotação', cls: 'badge-blue' },
  pedido:  { label: 'Pedido',  cls: 'badge-gold' },
}

export default async function VendasPage() {
  const supabase = await createClient()

  const { data: _pedidos } = await supabase
    .from('pedidos')
    .select('*, clientes(nome_fantasia, razao_social), vendedores(nome)')
    .order('created_at', { ascending: false })
  const pedidos = _pedidos ?? []

  const totalMes     = pedidos.filter(p => ['aprovado','entregue'].includes(p.status)).reduce((s, p) => s + p.total, 0)
  const emAberto     = pedidos.filter(p => ['rascunho','enviado','aprovado'].includes(p.status)).length
  const cotacoes     = pedidos.filter(p => p.tipo === 'cotacao').length
  const ticketMedio  = pedidos.length > 0 ? pedidos.reduce((s, p) => s + p.total, 0) / pedidos.length : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em' }}>Vendas</h1>
          <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.25rem' }}>{pedidos.length} registros</p>
        </div>
        <Link href="/dashboard/vendas/nova" className="btn-primary">+ Nova Cotação / Pedido</Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
        {[
          { label: 'Faturamento',   value: `R$ ${totalMes.toLocaleString('pt-BR')}`, color: 'var(--gold-l)' },
          { label: 'Em aberto',     value: emAberto.toString(),                      color: '#fff' },
          { label: 'Cotações',      value: cotacoes.toString(),                      color: '#60a5fa' },
          { label: 'Ticket médio',  value: `R$ ${Math.round(ticketMedio).toLocaleString('pt-BR')}`, color: 'var(--gold-l)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1.125rem' }}>
            <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, marginTop: '.25rem' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filtros rápidos */}
      <div style={{ display: 'flex', gap: '.625rem', flexWrap: 'wrap' }}>
        {['Todos', 'Rascunho', 'Enviado', 'Aprovado', 'Entregue', 'Cancelado'].map(f => (
          <button key={f} className="btn-secondary" style={{ padding: '.375rem .875rem', fontSize: '.8rem', color: f === 'Todos' ? 'var(--gold-l)' : undefined, borderColor: f === 'Todos' ? 'rgba(201,168,76,.3)' : undefined }}>
            {f}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="th">Nº</th>
                <th className="th">Tipo</th>
                <th className="th">Cliente</th>
                <th className="th">Vendedor</th>
                <th className="th">Total</th>
                <th className="th">Data</th>
                <th className="th">Status</th>
                <th className="th"></th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(p => {
                const cliente = p.clientes as any
                const vendedor = p.vendedores as any
                const tipo = tipoMap[p.tipo] ?? { label: p.tipo, cls: 'badge-gray' }
                const status = statusMap[p.status] ?? { label: p.status, cls: 'badge-gray' }
                return (
                  <tr key={p.id} className="tr">
                    <td className="td" style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--muted)' }}>#{p.numero}</td>
                    <td className="td"><span className={`badge ${tipo.cls}`}>{tipo.label}</span></td>
                    <td className="td" style={{ fontWeight: 500 }}>{cliente?.nome_fantasia ?? cliente?.razao_social ?? '—'}</td>
                    <td className="td" style={{ color: 'rgba(255,255,255,.6)', fontSize: '.875rem' }}>{vendedor?.nome ?? '—'}</td>
                    <td className="td" style={{ fontWeight: 700, color: 'var(--gold-l)' }}>
                      R$ {(p.total ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="td" style={{ color: 'var(--muted)', fontSize: '.875rem' }}>
                      {new Date(p.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="td"><span className={`badge ${status.cls}`}>{status.label}</span></td>
                    <td className="td">
                      <Link href={`/dashboard/vendas/${p.id}`} style={{ fontSize: '.8rem', color: 'var(--gold)', padding: '.375rem .75rem', borderRadius: '.5rem', background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)', whiteSpace: 'nowrap' }}>
                        Ver →
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {pedidos.length === 0 && (
                <tr><td className="td" colSpan={8} style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem' }}>
                  Nenhum pedido ainda. <Link href="/dashboard/vendas/nova" style={{ color: 'var(--gold)' }}>Criar o primeiro →</Link>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
