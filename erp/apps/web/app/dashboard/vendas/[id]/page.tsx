import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '../../../../lib/supabase/server'
import AvancarStatus from './AvancarStatus'

export const metadata: Metadata = { title: 'Detalhe do Pedido' }
export const revalidate = 0

const statusFlow: Record<string, string> = {
  rascunho: 'enviado', enviado: 'aprovado', aprovado: 'entregue',
}
const statusMap: Record<string, { label: string; cls: string }> = {
  rascunho:  { label: 'Rascunho',  cls: 'badge-gray'  },
  enviado:   { label: 'Enviado',   cls: 'badge-blue'  },
  aprovado:  { label: 'Aprovado',  cls: 'badge-gold'  },
  entregue:  { label: 'Entregue',  cls: 'badge-green' },
  cancelado: { label: 'Cancelado', cls: 'badge-red'   },
}

export default async function PedidoDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: pedido } = await supabase
    .from('pedidos')
    .select('*, clientes(razao_social, nome_fantasia, cnpj, email, telefone, cidade, uf), vendedores(nome, telefone)')
    .eq('id', params.id)
    .single()

  const { data: _itens } = await supabase
    .from('pedido_itens')
    .select('*, produtos(sku, nome, unidade, marca)')
    .eq('pedido_id', params.id)
  const itens = _itens ?? []

  if (!pedido) return <div style={{ color: 'var(--muted)', padding: '3rem' }}>Pedido não encontrado.</div>

  const cliente  = pedido.clientes  as any
  const vendedor = pedido.vendedores as any
  const status   = statusMap[pedido.status] ?? { label: pedido.status, cls: 'badge-gray' }
  const proximoStatus = statusFlow[pedido.status]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.875rem', color: 'var(--muted)' }}>
        <Link href="/dashboard/vendas" style={{ color: 'var(--muted)' }}>Vendas</Link>
        <span>/</span>
        <span style={{ color: '#fff' }}>#{pedido.numero}</span>
      </div>

      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {pedido.tipo === 'cotacao' ? 'Cotação' : 'Pedido'} #{pedido.numero}
              </h1>
              <span className={`badge ${status.cls}`}>{status.label}</span>
              <span className="badge badge-gray">{new Date(pedido.created_at).toLocaleDateString('pt-BR')}</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '.875rem' }}>
              {cliente?.nome_fantasia ?? cliente?.razao_social} · Vendedor: {vendedor?.nome ?? '—'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            {proximoStatus && (
              <AvancarStatus pedidoId={pedido.id} proximoStatus={proximoStatus} label={statusMap[proximoStatus]?.label ?? proximoStatus} />
            )}
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px,1fr))', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
          {[
            { label: 'Subtotal',  value: `R$ ${pedido.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,     color: '#fff' },
            { label: 'Desconto',  value: pedido.desconto_pct > 0 ? `${pedido.desconto_pct}%` : '—',                          color: '#f87171' },
            { label: 'Total',     value: `R$ ${pedido.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,         color: 'var(--gold-l)' },
            { label: 'Itens',     value: itens.length.toString(),                                                             color: '#fff' },
            { label: 'Cliente',   value: cliente?.nome_fantasia ?? cliente?.razao_social ?? '—',                             color: 'var(--muted)' },
            { label: 'Vendedor',  value: vendedor?.nome ?? '—',                                                              color: 'var(--muted)' },
          ].map(k => (
            <div key={k.label}>
              <p style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{k.label}</p>
              <p style={{ fontWeight: 600, color: k.color, marginTop: '.25rem', fontSize: '.9rem' }}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Itens + Cliente */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>

        {/* Itens do pedido */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.125rem 1.5rem', borderBottom: '1px solid var(--line)' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Itens do Pedido</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="th">Produto</th>
                  <th className="th">SKU</th>
                  <th className="th">Qtd</th>
                  <th className="th">Preço unit.</th>
                  <th className="th">Desc</th>
                  <th className="th">Total</th>
                </tr>
              </thead>
              <tbody>
                {itens.map(item => {
                  const produto = item.produtos as any
                  return (
                    <tr key={item.id} className="tr">
                      <td className="td">
                        <p style={{ fontWeight: 500, fontSize: '.875rem' }}>{produto?.nome ?? '—'}</p>
                        <p style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{produto?.unidade}</p>
                      </td>
                      <td className="td" style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', color: 'var(--muted)' }}>{produto?.sku}</td>
                      <td className="td" style={{ fontWeight: 600 }}>{item.quantidade}</td>
                      <td className="td" style={{ color: 'rgba(255,255,255,.7)' }}>
                        R$ {item.preco_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="td" style={{ color: item.desconto_pct > 0 ? '#f87171' : 'var(--muted)' }}>
                        {item.desconto_pct > 0 ? `${item.desconto_pct}%` : '—'}
                      </td>
                      <td className="td" style={{ fontWeight: 700, color: 'var(--gold-l)' }}>
                        R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="td" style={{ textAlign: 'right', fontWeight: 700, fontSize: '.875rem', paddingTop: '1rem' }}>Total</td>
                  <td className="td" style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--gold-l)', paddingTop: '1rem' }}>
                    R$ {pedido.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {pedido.observacoes && (
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line)' }}>
              <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.375rem' }}>Observações</p>
              <p style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.7)' }}>{pedido.observacoes}</p>
            </div>
          )}
        </div>

        {/* Painel cliente */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <p style={{ fontSize: '.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: '.75rem' }}>Cliente</p>
            <p style={{ fontWeight: 700, marginBottom: '.375rem' }}>{cliente?.razao_social}</p>
            {cliente?.cnpj    && <p style={{ fontSize: '.8rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{cliente.cnpj}</p>}
            {cliente?.email   && <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginTop: '.25rem' }}>✉ {cliente.email}</p>}
            {cliente?.telefone && <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginTop: '.25rem' }}>📞 {cliente.telefone}</p>}
            {cliente?.cidade  && <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginTop: '.25rem' }}>📍 {cliente.cidade}/{cliente.uf}</p>}
            <Link href={`/dashboard/crm/${pedido.cliente_id}`} style={{ display: 'block', marginTop: '.875rem', fontSize: '.8rem', color: 'var(--gold)', textAlign: 'center', padding: '.5rem', borderRadius: '.75rem', border: '1px solid rgba(201,168,76,.2)', background: 'rgba(201,168,76,.06)' }}>
              Ver ficha do cliente →
            </Link>
          </div>

          {/* Timeline de status */}
          <div className="card">
            <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: '.875rem' }}>Progresso</p>
            {['rascunho','enviado','aprovado','entregue'].map((s, idx) => {
              const statusOrder = ['rascunho','enviado','aprovado','entregue']
              const atual       = statusOrder.indexOf(pedido.status)
              const reached     = idx <= atual
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: idx < 3 ? '.625rem' : 0 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', background: reached ? 'linear-gradient(135deg,var(--gold-l),var(--gold))' : 'rgba(255,255,255,.08)', color: reached ? '#111' : 'rgba(255,255,255,.3)', fontWeight: 700 }}>
                    {reached ? '✓' : idx + 1}
                  </div>
                  <span style={{ fontSize: '.8rem', fontWeight: reached ? 600 : 400, color: reached ? '#fff' : 'rgba(255,255,255,.3)', textTransform: 'capitalize' }}>{statusMap[s]?.label ?? s}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
