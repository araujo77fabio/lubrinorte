import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Produto — Estoque' }

const movimentacoes = [
  { id: '1', tipo: 'entrada', data: '01/06/2026', qtd: 100, saldo: 148, descricao: 'Compra NF-e 001.234 — Texaco Brasil',     usuario: 'Admin' },
  { id: '2', tipo: 'saida',   data: '01/06/2026', qtd: 50,  saldo: 98,  descricao: 'Pedido #1040 — Frota Municipal Manaus',   usuario: 'Carlos' },
  { id: '3', tipo: 'saida',   data: '03/06/2026', qtd: 30,  saldo: 68,  descricao: 'Pedido #1041 — Transportadora Rápida',    usuario: 'Carlos' },
  { id: '4', tipo: 'saida',   data: '04/06/2026', qtd: 20,  saldo: 48,  descricao: 'Pedido #1042 — Frota Municipal Manaus',   usuario: 'Ana' },
]

export default function ProdutoDetailPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.875rem', color: 'var(--muted)' }}>
        <Link href="/dashboard/estoque" style={{ color: 'var(--muted)' }}>Estoque</Link>
        <span>/</span>
        <span style={{ color: '#fff' }}>Texaco Delo 400 15W40</span>
      </div>

      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg,#c8161d33,#c8161d11)', border: '1px solid rgba(200,22,29,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
              🛢
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Texaco Delo 400 15W40</h1>
              <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.2rem', fontFamily: 'var(--font-mono)' }}>SKU: TEX-15W40-20L · Galão 20L</p>
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
                <span className="badge badge-red">Texaco</span>
                <span className="badge badge-blue">Diesel</span>
                <span className="badge badge-green">Normal</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <Link href="/dashboard/estoque/saida"   className="btn-secondary">📤 Saída</Link>
            <Link href="/dashboard/estoque/entrada" className="btn-primary">📥 Entrada</Link>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px,1fr))', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
          {[
            { label: 'Estoque atual',  value: '48 galões',    color: '#fff' },
            { label: 'Nível mínimo',   value: '20 galões',    color: 'var(--muted)' },
            { label: 'Preço de venda', value: 'R$ 320,00',    color: 'var(--gold-l)' },
            { label: 'Custo unitário', value: 'R$ 210,00',    color: 'var(--muted)' },
            { label: 'Margem',         value: '52,4%',        color: '#4ade80' },
            { label: 'Giro/mês',       value: '~100 unid',    color: 'var(--muted)' },
          ].map(k => (
            <div key={k.label}>
              <p style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{k.label}</p>
              <p style={{ fontWeight: 700, color: k.color, marginTop: '.25rem' }}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico de nível */}
      <div className="card">
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>Nível de Estoque</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ flex: 1, height: '12px', background: 'rgba(255,255,255,.08)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: '48%', height: '100%', background: 'linear-gradient(90deg, #4ade80, #22c55e)', borderRadius: '999px' }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#4ade80', flexShrink: 0 }}>48 / 100</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem' }}>
          <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>0</span>
          <span style={{ fontSize: '.72rem', color: '#f87171' }}>Crítico: 20</span>
          <span style={{ fontSize: '.72rem', color: 'var(--gold)' }}>Baixo: 30</span>
          <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>Max: 100</span>
        </div>
      </div>

      {/* Histórico de movimentações */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.125rem 1.5rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Histórico de Movimentações</h2>
          <span className="badge badge-gray">Junho 2026</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="th">Data</th>
                <th className="th">Tipo</th>
                <th className="th">Descrição</th>
                <th className="th">Quantidade</th>
                <th className="th">Saldo</th>
                <th className="th">Usuário</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map(m => (
                <tr key={m.id} className="tr">
                  <td className="td" style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '.78rem' }}>{m.data}</td>
                  <td className="td">
                    <span className={`badge ${m.tipo === 'entrada' ? 'badge-green' : 'badge-red'}`}>
                      {m.tipo === 'entrada' ? '📥 Entrada' : '📤 Saída'}
                    </span>
                  </td>
                  <td className="td" style={{ color: 'rgba(255,255,255,.7)', fontSize: '.875rem' }}>{m.descricao}</td>
                  <td className="td">
                    <span style={{ fontWeight: 700, color: m.tipo === 'entrada' ? '#4ade80' : '#f87171' }}>
                      {m.tipo === 'entrada' ? '+' : '-'}{m.qtd}
                    </span>
                  </td>
                  <td className="td" style={{ fontWeight: 600 }}>{m.saldo}</td>
                  <td className="td" style={{ color: 'var(--muted)', fontSize: '.875rem' }}>{m.usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
