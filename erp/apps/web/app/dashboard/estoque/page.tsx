import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Estoque' }
export const revalidate = 0

const marcaCls: Record<string, string> = {
  Texaco: 'badge-red', UNI: 'badge-blue', Moura: 'badge-gold',
}

function estoqueStatus(atual: number, minimo: number) {
  if (atual === 0)            return { label: 'Zerado',  cls: 'badge-red',   pct: 0 }
  if (atual <= minimo)        return { label: 'Critico', cls: 'badge-red',   pct: Math.round((atual / minimo) * 100) }
  if (atual <= minimo * 1.5)  return { label: 'Baixo',   cls: 'badge-gold',  pct: Math.round((atual / (minimo * 2)) * 100) }
  return                             { label: 'Normal',  cls: 'badge-green', pct: 100 }
}

export default async function EstoquePage() {
  const supabase = await createClient()
  const { data: _produtos } = await supabase
    .from('produtos')
    .select('*')
    .eq('ativo', true)
    .order('nome')
  const produtos = _produtos ?? []

  const criticos   = produtos.filter(p => p.estoque_atual <= p.estoque_minimo)
  const baixos     = produtos.filter(p => p.estoque_atual > p.estoque_minimo && p.estoque_atual <= p.estoque_minimo * 1.5)
  const valorTotal = produtos.reduce((s, p) => s + p.preco_custo * p.estoque_atual, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em' }}>Estoque</h1>
          <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.25rem' }}>{produtos.length} SKUs cadastrados</p>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <Link href="/dashboard/estoque/saida"   className="btn-secondary">📤 Saída</Link>
          <Link href="/dashboard/estoque/entrada" className="btn-primary">📥 Entrada</Link>
        </div>
      </div>

      {criticos.length > 0 && (
        <div style={{ padding: '1rem 1.25rem', borderRadius: '1rem', background: 'rgba(200,22,29,.08)', border: '1px solid rgba(200,22,29,.25)', display: 'flex', alignItems: 'center', gap: '.875rem' }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: '.875rem', color: '#f87171' }}>
              {criticos.length} produto{criticos.length > 1 ? 's' : ''} com estoque crítico
            </p>
            <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginTop: '.2rem' }}>
              {criticos.map(p => p.nome).join(' · ')}
            </p>
          </div>
          <Link href="/dashboard/estoque/entrada" className="btn-danger" style={{ marginLeft: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Repor →
          </Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1rem' }}>
        {[
          { label: 'Críticos',       value: criticos.length.toString(),   color: '#f87171' },
          { label: 'Baixos',         value: baixos.length.toString(),      color: '#f0d47a' },
          { label: 'Normais',        value: (produtos.length - criticos.length - baixos.length).toString(), color: '#4ade80' },
          { label: 'Valor em estoque', value: `R$ ${Math.round(valorTotal / 1000)}k`, color: 'var(--gold-l)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1.125rem' }}>
            <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, marginTop: '.25rem' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="th">SKU</th>
                <th className="th">Produto</th>
                <th className="th">Marca</th>
                <th className="th">Unidade</th>
                <th className="th">Estoque</th>
                <th className="th">Nível</th>
                <th className="th">Preço Venda</th>
                <th className="th">Status</th>
                <th className="th"></th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(p => {
                const st = estoqueStatus(p.estoque_atual, p.estoque_minimo)
                return (
                  <tr key={p.id} className="tr">
                    <td className="td" style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', color: 'var(--muted)' }}>{p.sku}</td>
                    <td className="td">
                      <p style={{ fontWeight: 600, fontSize: '.875rem' }}>{p.nome}</p>
                      <p style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{p.categoria}</p>
                    </td>
                    <td className="td"><span className={`badge ${marcaCls[p.marca] ?? 'badge-gray'}`}>{p.marca}</span></td>
                    <td className="td" style={{ color: 'rgba(255,255,255,.6)', fontSize: '.875rem' }}>{p.unidade}</td>
                    <td className="td">
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: p.estoque_atual <= p.estoque_minimo ? '#f87171' : '#fff' }}>
                        {p.estoque_atual}
                      </span>
                      <span style={{ fontSize: '.72rem', color: 'var(--muted)', marginLeft: '.25rem' }}>/ mín {p.estoque_minimo}</span>
                    </td>
                    <td className="td">
                      <div style={{ height: '6px', background: 'rgba(255,255,255,.08)', borderRadius: '999px', overflow: 'hidden', width: '80px' }}>
                        <div style={{ height: '100%', borderRadius: '999px', width: `${Math.min(st.pct, 100)}%`, background: st.pct <= 50 ? '#f87171' : st.pct <= 75 ? '#f0d47a' : '#4ade80' }} />
                      </div>
                    </td>
                    <td className="td" style={{ fontWeight: 600, color: 'var(--gold-l)' }}>
                      R$ {p.preco_venda.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="td"><span className={`badge ${st.cls}`}>{st.label}</span></td>
                    <td className="td">
                      <Link href={`/dashboard/estoque/${p.id}`} style={{ fontSize: '.8rem', color: 'var(--gold)', padding: '.375rem .75rem', borderRadius: '.5rem', background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)', whiteSpace: 'nowrap' }}>
                        Ver →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
