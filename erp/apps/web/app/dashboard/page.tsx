import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '../../lib/supabase/server'

export const metadata: Metadata = { title: 'Dashboard' }
export const revalidate = 0

const statusBadge: Record<string, string> = {
  aprovado: 'badge-gold', pendente: 'badge-gray', entregue: 'badge-green',
  rascunho: 'badge-gray', enviado:  'badge-blue', cancelado: 'badge-red',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    { count: totalClientes },
    { count: totalPedidosAbertos },
    { data: produtos },
    { data: pedidos },
  ] = await Promise.all([
    supabase.from('clientes').select('*', { count: 'exact', head: true }).eq('status', 'ativo'),
    supabase.from('pedidos').select('*',  { count: 'exact', head: true }).in('status', ['aprovado', 'enviado', 'rascunho']),
    supabase.from('produtos').select('estoque_atual, estoque_minimo').eq('ativo', true),
    supabase.from('pedidos')
      .select('id, numero, status, total, created_at, clientes(nome_fantasia, razao_social), vendedores(nome), pedido_itens(produtos(nome))')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const estoqueCritico = (produtos ?? []).filter(p => p.estoque_atual <= p.estoque_minimo).length
  const faturamentoMes = (pedidos ?? []).filter(p => ['aprovado','entregue'].includes(p.status)).reduce((s, p) => s + (p.total ?? 0), 0)

  const stats = [
    { label: 'Faturamento do mês',  value: `R$ ${faturamentoMes.toLocaleString('pt-BR')}`, delta: '↑ dados reais', up: true },
    { label: 'Pedidos em aberto',   value: String(totalPedidosAbertos ?? 0),                delta: 'aprovados + enviados', up: true },
    { label: 'Clientes ativos',     value: String(totalClientes ?? 0),                      delta: 'cadastrados', up: true },
    { label: 'Estoque crítico',     value: `${estoqueCritico} itens`,                       delta: 'abaixo do mínimo', up: estoqueCritico === 0 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="animate-fade-in">
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em' }}>Visão Geral</h1>
        <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.25rem' }}>
          {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric', timeZone: 'America/Manaus' })} · Manaus, AM
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1rem' }}>
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value" style={{ marginTop: '.5rem' }}>{s.value}</p>
            <p className={s.up ? 'stat-delta-up' : 'stat-delta-down'} style={{ marginTop: '.375rem' }}>
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Pedidos recentes */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Pedidos Recentes</h2>
          <Link href="/dashboard/vendas" style={{ fontSize: '.8rem', color: 'var(--gold)' }}>Ver todos →</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="th">Nº</th>
                <th className="th">Cliente</th>
                <th className="th">Vendedor</th>
                <th className="th">Total</th>
                <th className="th">Status</th>
              </tr>
            </thead>
            <tbody>
              {(pedidos ?? []).map(p => {
                const cliente = (p.clientes as any)
                const vendedor = (p.vendedores as any)
                return (
                  <tr key={p.id} className="tr">
                    <td className="td" style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--muted)' }}>#{p.numero}</td>
                    <td className="td" style={{ fontWeight: 500 }}>{cliente?.nome_fantasia ?? cliente?.razao_social ?? '—'}</td>
                    <td className="td" style={{ color: 'rgba(255,255,255,.6)' }}>{vendedor?.nome ?? '—'}</td>
                    <td className="td" style={{ fontWeight: 600, color: 'var(--gold-l)' }}>
                      R$ {(p.total ?? 0).toLocaleString('pt-BR')}
                    </td>
                    <td className="td">
                      <span className={`badge ${statusBadge[p.status] ?? 'badge-gray'}`}>{p.status}</span>
                    </td>
                  </tr>
                )
              })}
              {(pedidos ?? []).length === 0 && (
                <tr><td className="td" colSpan={5} style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>Nenhum pedido ainda</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ações rápidas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1rem' }}>
        {[
          { label: 'Nova Cotação',       href: '/dashboard/vendas/nova',    icon: '📋' },
          { label: 'Adicionar Cliente',  href: '/dashboard/crm/novo',       icon: '👤' },
          { label: 'Entrada de Estoque', href: '/dashboard/estoque/entrada',icon: '📦' },
          { label: 'Ver Comissões',      href: '/dashboard/comissoes',      icon: '💰' },
        ].map(a => (
          <Link key={a.label} href={a.href} className="card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{a.icon}</span>
            <span style={{ fontWeight: 600, fontSize: '.875rem' }}>{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
