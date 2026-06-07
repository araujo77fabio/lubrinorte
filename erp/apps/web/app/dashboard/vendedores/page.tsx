import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Vendedores' }
export const revalidate = 0

export default async function VendedoresPage() {
  const supabase = await createClient()

  const [
    { data: _vendedores },
    { data: _pedidos },
    { data: _clientes },
    { data: _comissoes },
  ] = await Promise.all([
    supabase.from('vendedores').select('*').eq('ativo', true).order('nome'),
    supabase.from('pedidos').select('vendedor_id, total, status'),
    supabase.from('clientes').select('vendedor_id, status'),
    supabase.from('comissoes').select('vendedor_id, valor_comissao, status'),
  ])

  const vendedores = _vendedores ?? []
  const pedidos    = _pedidos    ?? []
  const clientes   = _clientes   ?? []
  const comissoes  = _comissoes  ?? []

  // Calcular métricas por vendedor
  const metricas = vendedores.map(v => {
    const meusPedidos    = pedidos.filter(p => p.vendedor_id === v.id && ['aprovado','entregue'].includes(p.status))
    const meusClientes   = clientes.filter(c => c.vendedor_id === v.id && c.status === 'ativo')
    const minhasComissoes = comissoes.filter(c => c.vendedor_id === v.id)
    const faturamento    = meusPedidos.reduce((s, p) => s + (p.total ?? 0), 0)
    const comissaoPaga   = minhasComissoes.filter(c => c.status === 'paga').reduce((s, c) => s + (c.valor_comissao ?? 0), 0)
    const comissaoPendente = minhasComissoes.filter(c => c.status === 'pendente').reduce((s, c) => s + (c.valor_comissao ?? 0), 0)
    const pctMeta        = v.meta_mensal > 0 ? Math.min(Math.round((faturamento / v.meta_mensal) * 100), 100) : 0
    return { ...v, faturamento, clientes: meusClientes.length, pedidos: meusPedidos.length, pctMeta, comissaoPaga, comissaoPendente }
  })

  const totalFaturamento = metricas.reduce((s, v) => s + v.faturamento, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em' }}>Vendedores</h1>
          <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.25rem' }}>{vendedores.length} vendedores ativos</p>
        </div>
        <button className="btn-primary">+ Novo Vendedor</button>
      </div>

      {/* Cards de vendedor */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.25rem' }}>
        {metricas.map(v => (
          <div key={v.id} className="card-hover" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Header do card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,var(--gold-d),var(--gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem', fontWeight: 800, color: '#111',
              }}>
                {v.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1rem' }}>{v.nome}</p>
                <p style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{v.regiao ?? 'Manaus, AM'}</p>
                <p style={{ fontSize: '.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '.1rem' }}>{v.email}</p>
              </div>
            </div>

            {/* Meta mensal */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.375rem' }}>
                <span style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Meta mensal</span>
                <span style={{ fontSize: '.8rem', fontWeight: 700, color: v.pctMeta >= 100 ? '#4ade80' : v.pctMeta >= 60 ? '#f0d47a' : '#f87171' }}>
                  {v.pctMeta}%
                </span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,.08)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '999px',
                  width: `${v.pctMeta}%`,
                  background: v.pctMeta >= 100
                    ? 'linear-gradient(90deg,#4ade80,#22c55e)'
                    : v.pctMeta >= 60
                      ? 'linear-gradient(90deg,#f0d47a,#c9a84c)'
                      : 'linear-gradient(90deg,#f87171,#ef4444)',
                  transition: 'width .5s',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.375rem' }}>
                <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>
                  R$ {v.faturamento.toLocaleString('pt-BR')}
                </span>
                <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>
                  Meta: R$ {(v.meta_mensal ?? 0).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Métricas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.75rem' }}>
              {[
                { label: 'Clientes',   value: v.clientes.toString() },
                { label: 'Pedidos',    value: v.pedidos.toString() },
                { label: 'Comissão',   value: `R$ ${Math.round(v.comissaoPendente).toLocaleString('pt-BR')}` },
              ].map(m => (
                <div key={m.label} style={{ background: 'rgba(255,255,255,.04)', borderRadius: '.75rem', padding: '.75rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{m.value}</p>
                  <p style={{ fontSize: '.68rem', color: 'var(--muted)', marginTop: '.2rem' }}>{m.label}</p>
                </div>
              ))}
            </div>

            {/* Ações */}
            <div style={{ display: 'flex', gap: '.625rem', paddingTop: '.25rem', borderTop: '1px solid var(--line)' }}>
              <Link
                href={`/dashboard/comissoes?vendedor=${v.id}`}
                className="btn-secondary"
                style={{ flex: 1, fontSize: '.8rem', padding: '.5rem', textAlign: 'center' }}
              >
                💰 Comissões
              </Link>
              <button className="btn-secondary" style={{ flex: 1, fontSize: '.8rem', padding: '.5rem' }}>
                ✏️ Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo geral */}
      <div className="card">
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>Resumo da Equipe</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
          {[
            { label: 'Faturamento total',    value: `R$ ${totalFaturamento.toLocaleString('pt-BR')}`, color: 'var(--gold-l)' },
            { label: 'Total de pedidos',     value: metricas.reduce((s, v) => s + v.pedidos, 0).toString(),  color: '#fff' },
            { label: 'Clientes ativos',      value: metricas.reduce((s, v) => s + v.clientes, 0).toString(), color: '#fff' },
            { label: 'Comissões pendentes',  value: `R$ ${Math.round(metricas.reduce((s, v) => s + v.comissaoPendente, 0)).toLocaleString('pt-BR')}`, color: '#f0d47a' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</p>
              <p style={{ fontWeight: 800, fontSize: '1.125rem', color: s.color, marginTop: '.25rem' }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
