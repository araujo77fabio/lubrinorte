import type { Metadata } from 'next'
import { createClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Relatórios' }
export const revalidate = 0

export default async function RelatoriosPage() {
  const supabase = await createClient()

  const [
    { data: _pedidos },
    { data: _produtos },
    { data: _clientes },
    { data: _comissoes },
    { data: _vendedores },
  ] = await Promise.all([
    supabase.from('pedidos').select('status, tipo, total, created_at, vendedor_id'),
    supabase.from('produtos').select('nome, marca, categoria, estoque_atual, estoque_minimo, preco_venda, preco_custo'),
    supabase.from('clientes').select('status, segmento'),
    supabase.from('comissoes').select('status, valor_comissao, vendedor_id, vendedores(nome)'),
    supabase.from('vendedores').select('id, nome, meta_mensal'),
  ])

  const pedidos   = _pedidos   ?? []
  const produtos  = _produtos  ?? []
  const clientes  = _clientes  ?? []
  const comissoes = _comissoes ?? []
  const vendedores = _vendedores ?? []

  // Faturamento por status
  const faturamentoAprovado = pedidos.filter(p => ['aprovado','entregue'].includes(p.status)).reduce((s, p) => s + p.total, 0)
  const faturamentoCotacoes = pedidos.filter(p => p.tipo === 'cotacao').reduce((s, p) => s + p.total, 0)

  // Estoque
  const criticos   = produtos.filter(p => p.estoque_atual <= p.estoque_minimo)
  const valorEstoque = produtos.reduce((s, p) => s + p.preco_custo * p.estoque_atual, 0)
  const margemMedia  = produtos.length > 0
    ? produtos.reduce((s, p) => s + ((p.preco_venda - p.preco_custo) / p.preco_venda) * 100, 0) / produtos.length
    : 0

  // Clientes por segmento
  const segmentos = clientes.reduce((acc: Record<string, number>, c) => {
    acc[c.segmento] = (acc[c.segmento] ?? 0) + 1
    return acc
  }, {})

  // Comissões por vendedor
  const comissoesPorVendedor = vendedores.map(v => {
    const minhas = comissoes.filter(c => c.vendedor_id === v.id)
    return {
      nome: v.nome,
      total: minhas.reduce((s, c) => s + c.valor_comissao, 0),
      pendente: minhas.filter(c => c.status === 'pendente').reduce((s, c) => s + c.valor_comissao, 0),
      pago:     minhas.filter(c => c.status === 'paga').reduce((s, c) => s + c.valor_comissao, 0),
      faturamento: pedidos.filter(p => p.vendedor_id === v.id && ['aprovado','entregue'].includes(p.status)).reduce((s, p) => s + p.total, 0),
      meta: v.meta_mensal,
    }
  }).sort((a, b) => b.faturamento - a.faturamento)

  // Produtos mais vendidos (por valor de estoque como proxy)
  const topProdutos = [...produtos].sort((a, b) => (b.preco_venda - b.preco_custo) - (a.preco_venda - a.preco_custo)).slice(0, 5)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em' }}>Relatórios</h1>
        <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.25rem' }}>
          Visão analítica do negócio — dados em tempo real
        </p>
      </div>

      {/* KPIs principais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1rem' }}>
        {[
          { label: 'Faturamento confirmado', value: `R$ ${faturamentoAprovado.toLocaleString('pt-BR')}`, color: 'var(--gold-l)', icon: '💰' },
          { label: 'Em cotações',            value: `R$ ${faturamentoCotacoes.toLocaleString('pt-BR')}`, color: '#60a5fa',        icon: '📋' },
          { label: 'Valor em estoque',       value: `R$ ${Math.round(valorEstoque / 1000)}k`,            color: 'var(--gold-l)', icon: '📦' },
          { label: 'Margem média',           value: `${margemMedia.toFixed(1)}%`,                        color: '#4ade80',        icon: '📈' },
          { label: 'Clientes ativos',        value: clientes.filter(c => c.status === 'ativo').length.toString(), color: '#fff', icon: '👥' },
          { label: 'SKUs críticos',          value: criticos.length.toString(),                          color: criticos.length > 0 ? '#f87171' : '#4ade80', icon: '⚠️' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1.125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.375rem' }}>
              <span>{s.icon}</span>
              <p style={{ fontSize: '.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</p>
            </div>
            <p style={{ fontSize: '1.375rem', fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* Ranking de vendedores */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.125rem 1.5rem', borderBottom: '1px solid var(--line)' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>🏆 Ranking de Vendedores</h2>
          </div>
          <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comissoesPorVendedor.map((v, i) => {
              const pctMeta = v.meta > 0 ? Math.min((v.faturamento / v.meta) * 100, 100) : 0
              return (
                <div key={v.nome}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.375rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem' }}>
                      <span style={{
                        width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '.72rem', fontWeight: 800,
                        background: i === 0 ? 'linear-gradient(135deg,#f0d47a,#c9a84c)' : i === 1 ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.06)',
                        color: i === 0 ? '#111' : '#fff',
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: '.875rem' }}>{v.nome}</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--gold-l)', fontSize: '.875rem' }}>
                      R$ {Math.round(v.faturamento).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem' }}>
                    <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,.08)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pctMeta}%`, background: pctMeta >= 100 ? '#4ade80' : pctMeta >= 60 ? '#f0d47a' : '#f87171', borderRadius: '999px' }} />
                    </div>
                    <span style={{ fontSize: '.68rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{Math.round(pctMeta)}% meta</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.25rem' }}>
                    <span style={{ fontSize: '.68rem', color: 'var(--muted)' }}>Comissão: R$ {v.total.toFixed(2)}</span>
                    <span style={{ fontSize: '.68rem', color: '#f0d47a' }}>Pendente: R$ {v.pendente.toFixed(2)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Clientes por segmento */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.125rem 1.5rem', borderBottom: '1px solid var(--line)' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>👥 Clientes por Segmento</h2>
          </div>
          <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            {Object.entries(segmentos)
              .sort(([, a], [, b]) => b - a)
              .map(([seg, qtd]) => {
                const pct = Math.round((qtd / clientes.length) * 100)
                const segCls: Record<string,string> = { Transportadora: '#60a5fa', Oficina: '#9ca3af', Frota: '#f0d47a', Nautico: '#a78bfa', Industria: '#f87171', Outro: '#6b7280' }
                return (
                  <div key={seg}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.375rem' }}>
                      <span style={{ fontSize: '.875rem', fontWeight: 500 }}>{seg}</span>
                      <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{qtd} · {pct}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,.08)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: segCls[seg] ?? 'var(--gold)', borderRadius: '999px' }} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* Produtos maior margem */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.125rem 1.5rem', borderBottom: '1px solid var(--line)' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>💹 Produtos com Maior Margem</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="th">Produto</th>
                <th className="th">Marca</th>
                <th className="th">Preço venda</th>
                <th className="th">Custo</th>
                <th className="th">Margem R$</th>
                <th className="th">Margem %</th>
                <th className="th">Estoque</th>
              </tr>
            </thead>
            <tbody>
              {topProdutos.map(p => {
                const margemReais = p.preco_venda - p.preco_custo
                const margemPct   = ((margemReais / p.preco_venda) * 100).toFixed(1)
                return (
                  <tr key={p.nome} className="tr">
                    <td className="td" style={{ fontWeight: 500 }}>{p.nome}</td>
                    <td className="td"><span className="badge badge-gray">{p.marca}</span></td>
                    <td className="td" style={{ color: 'var(--gold-l)', fontWeight: 600 }}>R$ {p.preco_venda.toFixed(2).replace('.', ',')}</td>
                    <td className="td" style={{ color: 'var(--muted)' }}>R$ {p.preco_custo.toFixed(2).replace('.', ',')}</td>
                    <td className="td" style={{ color: '#4ade80', fontWeight: 600 }}>R$ {margemReais.toFixed(2).replace('.', ',')}</td>
                    <td className="td">
                      <span style={{ fontWeight: 700, color: parseFloat(margemPct) >= 40 ? '#4ade80' : parseFloat(margemPct) >= 30 ? '#f0d47a' : '#f87171' }}>
                        {margemPct}%
                      </span>
                    </td>
                    <td className="td" style={{ color: p.estoque_atual <= p.estoque_minimo ? '#f87171' : 'var(--muted)' }}>
                      {p.estoque_atual} {p.estoque_atual <= p.estoque_minimo ? '⚠️' : ''}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pedidos por status */}
      <div className="card">
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>📊 Pedidos por Status</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px,1fr))', gap: '1rem' }}>
          {['rascunho','enviado','aprovado','entregue','cancelado'].map(st => {
            const qtd   = pedidos.filter(p => p.status === st).length
            const valor  = pedidos.filter(p => p.status === st).reduce((s, p) => s + p.total, 0)
            const cores: Record<string,string> = { rascunho: '#9ca3af', enviado: '#60a5fa', aprovado: '#f0d47a', entregue: '#4ade80', cancelado: '#f87171' }
            return (
              <div key={st} style={{ textAlign: 'center', padding: '1rem', borderRadius: '.875rem', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${cores[st]}22`, border: `1px solid ${cores[st]}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .75rem' }}>
                  <span style={{ fontSize: '.72rem', fontWeight: 800, color: cores[st] }}>{qtd}</span>
                </div>
                <p style={{ fontSize: '.72rem', color: cores[st], textTransform: 'capitalize', fontWeight: 700 }}>{st}</p>
                <p style={{ fontSize: '.68rem', color: 'var(--muted)', marginTop: '.25rem' }}>R$ {Math.round(valor).toLocaleString('pt-BR')}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
