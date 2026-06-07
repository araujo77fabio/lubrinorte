import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '../../../lib/supabase/server'
import AprovarComissao from './AprovarComissao'

export const metadata: Metadata = { title: 'Comissões' }
export const revalidate = 0

const statusMap: Record<string, { label: string; cls: string }> = {
  pendente:  { label: 'Pendente',  cls: 'badge-gold'  },
  aprovada:  { label: 'Aprovada',  cls: 'badge-blue'  },
  paga:      { label: 'Paga',      cls: 'badge-green' },
  cancelada: { label: 'Cancelada', cls: 'badge-red'   },
}

export default async function ComissoesPage() {
  const supabase = await createClient()

  const { data: _comissoes } = await supabase
    .from('comissoes')
    .select('*, vendedores(nome), pedidos(numero, total, clientes(nome_fantasia, razao_social))')
    .order('created_at', { ascending: false })
  const comissoes = _comissoes ?? []

  const totalPendente  = comissoes.filter(c => c.status === 'pendente').reduce((s, c) => s + c.valor_comissao, 0)
  const totalAprovada  = comissoes.filter(c => c.status === 'aprovada').reduce((s, c) => s + c.valor_comissao, 0)
  const totalPago      = comissoes.filter(c => c.status === 'paga').reduce((s, c) => s + c.valor_comissao, 0)
  const pendentes      = comissoes.filter(c => c.status === 'pendente')

  // Se não há comissões ainda, mostrar dados simulados para demonstração
  const semComissoes = comissoes.length === 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em' }}>Comissões</h1>
          <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.25rem' }}>{comissoes.length} registros</p>
        </div>
        {pendentes.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span style={{ fontSize: '.875rem', color: '#f0d47a' }}>
              {pendentes.length} aguardando aprovação
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
        {[
          { label: 'Pendente aprovação', value: `R$ ${totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: '#f0d47a', icon: '⏳' },
          { label: 'Aprovadas',           value: `R$ ${totalAprovada.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: '#60a5fa', icon: '✅' },
          { label: 'Pagas',               value: `R$ ${totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,    color: '#4ade80', icon: '💰' },
          { label: 'Total geral',         value: `R$ ${(totalPendente + totalAprovada + totalPago).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'var(--gold-l)', icon: '📊' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1.125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.375rem' }}>
              <span style={{ fontSize: '1rem' }}>{s.icon}</span>
              <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</p>
            </div>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Alerta pendentes */}
      {pendentes.length > 0 && (
        <div style={{ padding: '1rem 1.25rem', borderRadius: '1rem', background: 'rgba(240,212,122,.08)', border: '1px solid rgba(240,212,122,.25)', display: 'flex', alignItems: 'center', gap: '.875rem' }}>
          <span style={{ fontSize: '1.25rem' }}>⏳</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: '.875rem', color: '#f0d47a' }}>
              {pendentes.length} comissão{pendentes.length > 1 ? 'ões' : ''} aguardando aprovação
            </p>
            <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginTop: '.2rem' }}>
              Total: R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Filtros */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--line)', display: 'flex', gap: '.625rem', flexWrap: 'wrap' }}>
          {['Todas', 'Pendente', 'Aprovada', 'Paga'].map(f => (
            <button key={f} className="btn-secondary" style={{ padding: '.375rem .875rem', fontSize: '.8rem' }}>{f}</button>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="th">Vendedor</th>
                <th className="th">Pedido</th>
                <th className="th">Cliente</th>
                <th className="th">Valor pedido</th>
                <th className="th">% Comissão</th>
                <th className="th">Valor comissão</th>
                <th className="th">Status</th>
                <th className="th">Ação</th>
              </tr>
            </thead>
            <tbody>
              {comissoes.map(c => {
                const vendedor = c.vendedores as any
                const pedido   = c.pedidos as any
                const cliente  = pedido?.clientes as any
                const status   = statusMap[c.status] ?? { label: c.status, cls: 'badge-gray' }
                return (
                  <tr key={c.id} className="tr">
                    <td className="td">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold-d),var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, color: '#111', flexShrink: 0 }}>
                          {vendedor?.nome?.split(' ').map((n: string) => n[0]).slice(0, 2).join('') ?? '?'}
                        </div>
                        <span style={{ fontWeight: 500, fontSize: '.875rem' }}>{vendedor?.nome ?? '—'}</span>
                      </div>
                    </td>
                    <td className="td" style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--muted)' }}>#{pedido?.numero ?? '—'}</td>
                    <td className="td" style={{ color: 'rgba(255,255,255,.7)' }}>{cliente?.nome_fantasia ?? cliente?.razao_social ?? '—'}</td>
                    <td className="td" style={{ color: 'rgba(255,255,255,.7)' }}>R$ {(c.valor_pedido ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="td" style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>{c.percentual}%</td>
                    <td className="td" style={{ fontWeight: 700, color: 'var(--gold-l)', fontSize: '1rem' }}>
                      R$ {(c.valor_comissao ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="td"><span className={`badge ${status.cls}`}>{status.label}</span></td>
                    <td className="td">
                      {c.status === 'pendente' && <AprovarComissao comissaoId={c.id} />}
                      {c.status === 'aprovada' && <AprovarComissao comissaoId={c.id} marcarPago />}
                      {c.status === 'paga' && <span style={{ fontSize: '.8rem', color: '#4ade80' }}>✓ Pago</span>}
                    </td>
                  </tr>
                )
              })}
              {semComissoes && (
                <tr>
                  <td colSpan={8} className="td" style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem' }}>
                    <p style={{ marginBottom: '.5rem' }}>Nenhuma comissão ainda.</p>
                    <p style={{ fontSize: '.8rem' }}>Comissões são geradas automaticamente ao aprovar um pedido.</p>
                    <Link href="/dashboard/vendas" style={{ color: 'var(--gold)', fontSize: '.875rem', display: 'inline-block', marginTop: '.75rem' }}>
                      Ir para Vendas →
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info sobre cálculo */}
      <div className="card" style={{ borderColor: 'rgba(201,168,76,.15)', padding: '1.125rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'start', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>💡</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: '.875rem', color: 'var(--gold-l)', marginBottom: '.375rem' }}>Como funciona o cálculo</p>
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.6 }}>
              Comissões são geradas <strong style={{ color: '#fff' }}>automaticamente</strong> ao aprovar um pedido.
              O percentual padrão é <strong style={{ color: 'var(--gold)' }}>3,5%</strong> (Carlos e João) ou <strong style={{ color: 'var(--gold)' }}>3,0%</strong> (Ana).
              Fluxo: <strong style={{ color: '#fff' }}>Pendente → Aprovada → Paga</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
