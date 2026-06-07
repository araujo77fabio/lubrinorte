'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const produtosLista = [
  { sku: 'TEX-15W40-20L', nome: 'Texaco Delo 400 15W40 — Galão 20L', estoque: 48 },
  { sku: 'TEX-15W40-01L', nome: 'Texaco Delo 400 15W40 — Litro',      estoque: 320 },
  { sku: 'UNI-15W40-20L', nome: 'UNI Diesel 15W40 — Galão 20L',       estoque: 12 },
  { sku: 'UNI-20W50-01L', nome: 'UNI Gasolina 20W50 — Litro',         estoque: 180 },
  { sku: 'TEX-10W30-01L', nome: 'Texaco Havoline 10W30 — Litro',       estoque: 6 },
  { sku: 'GRX-MP2-20KG',  nome: 'Graxa MP-2 Multiuso — Balde 20kg',   estoque: 22 },
  { sku: 'BAT-60AH-MRA',  nome: 'Bateria Moura 60Ah',                  estoque: 8 },
  { sku: 'BAT-90AH-MRB',  nome: 'Bateria Moura 90Ah Truck',            estoque: 4 },
]

const motivos = ['Venda — Pedido', 'Uso interno', 'Devolução ao fornecedor', 'Avaria / perda', 'Brinde / amostra', 'Ajuste de inventário']

interface Item { sku: string; estoque: number; qtd: string; motivo: string }

export default function SaidaEstoquePage() {
  const router = useRouter()
  const [loading, setLoading]   = useState(false)
  const [pedidoId, setPedidoId] = useState('')
  const [itens, setItens]       = useState<Item[]>([{ sku: '', estoque: 0, qtd: '', motivo: '' }])

  function addItem() {
    setItens(i => [...i, { sku: '', estoque: 0, qtd: '', motivo: '' }])
  }

  function removeItem(idx: number) {
    setItens(i => i.filter((_, j) => j !== idx))
  }

  function updateItem(idx: number, field: keyof Item, value: string) {
    setItens(i => i.map((item, j) => {
      if (j !== idx) return item
      if (field === 'sku') {
        const p = produtosLista.find(p => p.sku === value)
        return { ...item, sku: value, estoque: p?.estoque ?? 0, qtd: '' }
      }
      return { ...item, [field]: value }
    }))
  }

  function qtdValida(item: Item) {
    const q = parseInt(item.qtd)
    return !isNaN(q) && q > 0 && q <= item.estoque
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    router.push('/dashboard/estoque')
  }

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem', fontSize: '.875rem', color: 'var(--muted)' }}>
        <Link href="/dashboard/estoque" style={{ color: 'var(--muted)' }}>Estoque</Link>
        <span>/</span>
        <span style={{ color: '#fff' }}>Saída de Estoque</span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Pedido vinculado */}
        <div className="card">
          <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>📤 Dados da Saída</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Pedido vinculado (opcional)</label>
              <input className="input" placeholder="Ex: #1042" value={pedidoId} onChange={e => setPedidoId(e.target.value)} />
            </div>
            <div>
              <label className="label">Data</label>
              <input className="input" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
        </div>

        {/* Itens */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Itens da Saída</h2>
            <button type="button" onClick={addItem} className="btn-secondary" style={{ padding: '.4rem .875rem', fontSize: '.8rem' }}>
              + Adicionar item
            </button>
          </div>

          <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            {itens.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1.5fr auto', gap: '.75rem', alignItems: 'end' }}>
                <div>
                  {idx === 0 && <label className="label">Produto *</label>}
                  <select className="input" value={item.sku} onChange={e => updateItem(idx, 'sku', e.target.value)} required style={{ color: item.sku ? '#fff' : 'rgba(255,255,255,.28)' }}>
                    <option value="" disabled>Selecionar produto...</option>
                    {produtosLista.map(p => (
                      <option key={p.sku} value={p.sku}>{p.nome} (estoque: {p.estoque})</option>
                    ))}
                  </select>
                </div>
                <div>
                  {idx === 0 && <label className="label">Quantidade *</label>}
                  <input
                    className="input"
                    type="number" min="1" max={item.estoque || undefined}
                    placeholder="0"
                    value={item.qtd}
                    onChange={e => updateItem(idx, 'qtd', e.target.value)}
                    required
                    style={{ borderColor: item.qtd && !qtdValida(item) ? 'rgba(200,22,29,.5)' : '' }}
                  />
                  {item.sku && item.qtd && !qtdValida(item) && (
                    <p style={{ fontSize: '.68rem', color: '#f87171', marginTop: '.25rem' }}>
                      Estoque disponível: {item.estoque}
                    </p>
                  )}
                </div>
                <div>
                  {idx === 0 && <label className="label">Motivo *</label>}
                  <select className="input" value={item.motivo} onChange={e => updateItem(idx, 'motivo', e.target.value)} required style={{ color: item.motivo ? '#fff' : 'rgba(255,255,255,.28)' }}>
                    <option value="" disabled>Motivo...</option>
                    {motivos.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <button
                  type="button" onClick={() => removeItem(idx)} disabled={itens.length === 1}
                  style={{ padding: '.625rem', borderRadius: '.75rem', background: 'rgba(200,22,29,.1)', border: '1px solid rgba(200,22,29,.2)', color: '#f87171', cursor: 'pointer', fontSize: '1rem', marginTop: idx === 0 ? '1.375rem' : 0 }}
                >×</button>
              </div>
            ))}
          </div>

          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--line)', textAlign: 'right' }}>
            <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Total saindo</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 800, color: '#fff', marginTop: '.2rem' }}>
              {itens.reduce((s, i) => s + (parseInt(i.qtd) || 0), 0)} unidades
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
          <Link href="/dashboard/estoque" className="btn-secondary">Cancelar</Link>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registrando…' : '✓ Registrar Saída'}
          </button>
        </div>
      </form>
    </div>
  )
}
