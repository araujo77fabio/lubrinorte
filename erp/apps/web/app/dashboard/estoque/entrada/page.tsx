'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const produtosLista = [
  { sku: 'TEX-15W40-20L', nome: 'Texaco Delo 400 15W40 — Galão 20L' },
  { sku: 'TEX-15W40-01L', nome: 'Texaco Delo 400 15W40 — Litro' },
  { sku: 'UNI-15W40-20L', nome: 'UNI Diesel 15W40 — Galão 20L' },
  { sku: 'UNI-20W50-01L', nome: 'UNI Gasolina 20W50 — Litro' },
  { sku: 'TEX-10W30-01L', nome: 'Texaco Havoline 10W30 — Litro' },
  { sku: 'GRX-MP2-20KG',  nome: 'Graxa MP-2 Multiuso — Balde 20kg' },
  { sku: 'FLD-ATF-01L',   nome: 'Fluido ATF Dextron III — Litro' },
  { sku: 'BAT-60AH-MRA',  nome: 'Bateria Moura 60Ah — Unidade' },
  { sku: 'BAT-90AH-MRB',  nome: 'Bateria Moura 90Ah Truck — Unidade' },
  { sku: 'UNI-10W40-01L', nome: 'UNI Moto 10W40 — Litro' },
]

interface Item { sku: string; nome: string; qtd: string; custoUnit: string; lote: string }

export default function EntradaEstoquePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fornecedor, setFornecedor] = useState('')
  const [nota, setNota] = useState('')
  const [obs, setObs]   = useState('')
  const [itens, setItens] = useState<Item[]>([
    { sku: '', nome: '', qtd: '', custoUnit: '', lote: '' },
  ])

  function addItem() {
    setItens(i => [...i, { sku: '', nome: '', qtd: '', custoUnit: '', lote: '' }])
  }

  function removeItem(idx: number) {
    setItens(i => i.filter((_, j) => j !== idx))
  }

  function updateItem(idx: number, field: keyof Item, value: string) {
    setItens(i => i.map((item, j) => {
      if (j !== idx) return item
      if (field === 'sku') {
        const p = produtosLista.find(p => p.sku === value)
        return { ...item, sku: value, nome: p?.nome ?? '' }
      }
      return { ...item, [field]: value }
    }))
  }

  const totalItens = itens.reduce((s, i) => s + (parseInt(i.qtd) || 0), 0)
  const totalValor = itens.reduce((s, i) => {
    const qtd  = parseInt(i.qtd) || 0
    const custo = parseFloat(i.custoUnit.replace(',', '.')) || 0
    return s + qtd * custo
  }, 0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    // TODO: Supabase insert stock_movements
    router.push('/dashboard/estoque')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }} className="animate-fade-in">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem', fontSize: '.875rem', color: 'var(--muted)' }}>
        <Link href="/dashboard/estoque" style={{ color: 'var(--muted)' }}>Estoque</Link>
        <span>/</span>
        <span style={{ color: '#fff' }}>Entrada de Mercadoria</span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Cabeçalho da NF */}
        <div className="card">
          <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>📥 Dados da Entrada</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Fornecedor *</label>
              <select className="input" value={fornecedor} onChange={e => setFornecedor(e.target.value)} required style={{ color: fornecedor ? '#fff' : 'rgba(255,255,255,.28)' }}>
                <option value="" disabled>Selecione o fornecedor...</option>
                <option>Texaco do Brasil Ltda</option>
                <option>UNI Lubrificantes</option>
                <option>Moura Baterias</option>
                <option>Distribuidora Central AM</option>
              </select>
            </div>
            <div>
              <label className="label">Nº Nota Fiscal</label>
              <input className="input" placeholder="NF-e 000.000" value={nota} onChange={e => setNota(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Itens */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Itens da Entrada</h2>
            <button type="button" onClick={addItem} className="btn-secondary" style={{ padding: '.4rem .875rem', fontSize: '.8rem' }}>
              + Adicionar item
            </button>
          </div>

          <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            {itens.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '.75rem', alignItems: 'end' }}>
                <div>
                  {idx === 0 && <label className="label">Produto *</label>}
                  <select
                    className="input"
                    value={item.sku}
                    onChange={e => updateItem(idx, 'sku', e.target.value)}
                    required
                    style={{ color: item.sku ? '#fff' : 'rgba(255,255,255,.28)' }}
                  >
                    <option value="" disabled>Selecionar produto...</option>
                    {produtosLista.map(p => (
                      <option key={p.sku} value={p.sku}>{p.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  {idx === 0 && <label className="label">Quantidade *</label>}
                  <input className="input" type="number" min="1" placeholder="0" value={item.qtd} onChange={e => updateItem(idx, 'qtd', e.target.value)} required />
                </div>
                <div>
                  {idx === 0 && <label className="label">Custo Unit. (R$)</label>}
                  <input className="input" placeholder="0,00" value={item.custoUnit} onChange={e => updateItem(idx, 'custoUnit', e.target.value)} />
                </div>
                <div>
                  {idx === 0 && <label className="label">Lote</label>}
                  <input className="input" placeholder="Lote / validade" value={item.lote} onChange={e => updateItem(idx, 'lote', e.target.value)} />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  disabled={itens.length === 1}
                  style={{ padding: '.625rem', borderRadius: '.75rem', background: 'rgba(200,22,29,.1)', border: '1px solid rgba(200,22,29,.2)', color: '#f87171', cursor: 'pointer', fontSize: '1rem', marginTop: idx === 0 ? '1.375rem' : 0 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Totais */}
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: '2rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Total de itens</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 800, color: '#fff', marginTop: '.2rem' }}>{totalItens} unidades</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Valor total</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--gold-l)', marginTop: '.2rem' }}>
                R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Observações */}
        <div className="card">
          <label className="label">Observações</label>
          <textarea className="input" rows={2} placeholder="Informações adicionais sobre esta entrada..." value={obs} onChange={e => setObs(e.target.value)} style={{ resize: 'vertical' }} />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
          <Link href="/dashboard/estoque" className="btn-secondary">Cancelar</Link>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registrando…' : '✓ Registrar Entrada'}
          </button>
        </div>
      </form>
    </div>
  )
}
