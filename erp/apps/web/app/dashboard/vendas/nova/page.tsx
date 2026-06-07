'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/client'

interface Produto { id: string; sku: string; nome: string; unidade: string; preco_venda: number; estoque_atual: number }
interface Cliente { id: string; razao_social: string; nome_fantasia: string | null }
interface Vendedor { id: string; nome: string }
interface Item { produto_id: string; nome: string; unidade: string; quantidade: number; preco_unitario: number; desconto_pct: number }

export default function NovaCotacaoPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading,    setLoading]    = useState(false)
  const [saving,     setSaving]     = useState(false)
  const [clientes,   setClientes]   = useState<Cliente[]>([])
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [produtos,   setProdutos]   = useState<Produto[]>([])

  const [tipo,        setTipo]        = useState<'cotacao' | 'pedido'>('cotacao')
  const [clienteId,   setClienteId]   = useState('')
  const [vendedorId,  setVendedorId]  = useState('')
  const [obs,         setObs]         = useState('')
  const [descGlobal,  setDescGlobal]  = useState(0)
  const [itens, setItens] = useState<Item[]>([{ produto_id: '', nome: '', unidade: '', quantidade: 1, preco_unitario: 0, desconto_pct: 0 }])

  useEffect(() => {
    setLoading(true)
    Promise.all([
      supabase.from('clientes').select('id, razao_social, nome_fantasia').eq('status', 'ativo').order('razao_social'),
      supabase.from('vendedores').select('id, nome').eq('ativo', true).order('nome'),
      supabase.from('produtos').select('id, sku, nome, unidade, preco_venda, estoque_atual').eq('ativo', true).order('nome'),
    ]).then(([{ data: c }, { data: v }, { data: p }]) => {
      setClientes(c ?? [])
      setVendedores(v ?? [])
      setProdutos(p ?? [])
      setLoading(false)
    })
  }, [])

  function addItem() {
    setItens(i => [...i, { produto_id: '', nome: '', unidade: '', quantidade: 1, preco_unitario: 0, desconto_pct: 0 }])
  }

  function removeItem(idx: number) {
    setItens(i => i.filter((_, j) => j !== idx))
  }

  function updateItem(idx: number, field: keyof Item, value: string | number) {
    setItens(prev => prev.map((item, j) => {
      if (j !== idx) return item
      if (field === 'produto_id') {
        const p = produtos.find(p => p.id === value)
        return { ...item, produto_id: value as string, nome: p?.nome ?? '', unidade: p?.unidade ?? '', preco_unitario: p?.preco_venda ?? 0 }
      }
      return { ...item, [field]: value }
    }))
  }

  function totalItem(item: Item) {
    return item.quantidade * item.preco_unitario * (1 - item.desconto_pct / 100)
  }

  const subtotal = itens.reduce((s, i) => s + totalItem(i), 0)
  const desconto = subtotal * (descGlobal / 100)
  const total    = subtotal - desconto

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!clienteId) return
    setSaving(true)

    const { data: pedido, error: ep } = await supabase
      .from('pedidos')
      .insert({ cliente_id: clienteId, vendedor_id: vendedorId || null, tipo, status: tipo === 'cotacao' ? 'enviado' : 'aprovado', desconto_pct: descGlobal, subtotal, desconto_valor: desconto, total, observacoes: obs })
      .select('id')
      .single()

    if (ep || !pedido) { setSaving(false); alert('Erro ao salvar: ' + ep?.message); return }

    const itensFiltrados = itens.filter(i => i.produto_id)
    if (itensFiltrados.length > 0) {
      await supabase.from('pedido_itens').insert(
        itensFiltrados.map(i => ({
          pedido_id: pedido.id,
          produto_id: i.produto_id,
          quantidade: i.quantidade,
          preco_unitario: i.preco_unitario,
          desconto_pct: i.desconto_pct,
          total: totalItem(i),
        }))
      )
    }

    router.push(`/dashboard/vendas/${pedido.id}`)
  }

  if (loading) return <div style={{ color: 'var(--muted)', padding: '3rem', textAlign: 'center' }}>Carregando...</div>

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }} className="animate-fade-in">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem', fontSize: '.875rem', color: 'var(--muted)' }}>
        <Link href="/dashboard/vendas" style={{ color: 'var(--muted)' }}>Vendas</Link>
        <span>/</span>
        <span style={{ color: '#fff' }}>Nova Cotação / Pedido</span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Tipo */}
        <div className="card">
          <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.25rem' }}>
            {(['cotacao', 'pedido'] as const).map(t => (
              <button key={t} type="button"
                onClick={() => setTipo(t)}
                style={{
                  padding: '.625rem 1.5rem', borderRadius: '.75rem', fontWeight: 700, fontSize: '.875rem', cursor: 'pointer', border: 'none',
                  background: tipo === t ? 'linear-gradient(135deg,var(--gold-l),var(--gold))' : 'rgba(255,255,255,.06)',
                  color: tipo === t ? '#111' : 'rgba(255,255,255,.6)',
                  outline: tipo === t ? 'none' : '1px solid rgba(255,255,255,.1)',
                }}
              >
                {t === 'cotacao' ? '📋 Cotação' : '✅ Pedido'}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Cliente *</label>
              <select className="input" value={clienteId} onChange={e => setClienteId(e.target.value)} required style={{ color: clienteId ? '#fff' : 'rgba(255,255,255,.28)' }}>
                <option value="" disabled>Selecionar cliente...</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome_fantasia ?? c.razao_social}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Vendedor</label>
              <select className="input" value={vendedorId} onChange={e => setVendedorId(e.target.value)} style={{ color: vendedorId ? '#fff' : 'rgba(255,255,255,.28)' }}>
                <option value="">Sem vendedor</option>
                {vendedores.map(v => <option key={v.id} value={v.id}>{v.nome}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Itens */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Itens</h2>
            <button type="button" onClick={addItem} className="btn-secondary" style={{ padding: '.375rem .875rem', fontSize: '.8rem' }}>+ Adicionar</button>
          </div>

          <div style={{ padding: '1rem 1.25rem' }}>
            {/* Header colunas */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1.2fr 1fr auto', gap: '.75rem', marginBottom: '.5rem' }}>
              {['Produto', 'Qtd', 'Preço unit.', 'Desc %', ''].map(h => (
                <p key={h} style={{ fontSize: '.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>{h}</p>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
              {itens.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1.2fr 1fr auto', gap: '.75rem', alignItems: 'center' }}>
                  <select className="input" value={item.produto_id} onChange={e => updateItem(idx, 'produto_id', e.target.value)} style={{ color: item.produto_id ? '#fff' : 'rgba(255,255,255,.28)' }}>
                    <option value="" disabled>Selecionar...</option>
                    {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} ({p.unidade}) — est: {p.estoque_atual}</option>)}
                  </select>
                  <input className="input" type="number" min="1" value={item.quantidade} onChange={e => updateItem(idx, 'quantidade', +e.target.value)} />
                  <input className="input" type="number" min="0" step="0.01" value={item.preco_unitario} onChange={e => updateItem(idx, 'preco_unitario', +e.target.value)} />
                  <input className="input" type="number" min="0" max="100" value={item.desconto_pct} onChange={e => updateItem(idx, 'desconto_pct', +e.target.value)} />
                  <button type="button" onClick={() => removeItem(idx)} disabled={itens.length === 1}
                    style={{ padding: '.5rem .625rem', borderRadius: '.75rem', background: 'rgba(200,22,29,.1)', border: '1px solid rgba(200,22,29,.2)', color: '#f87171', cursor: 'pointer', fontSize: '.875rem' }}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Totais */}
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '.75rem', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.375rem', minWidth: '240px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)', fontSize: '.875rem' }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--muted)', fontSize: '.875rem' }}>Desconto global (%)</span>
                <input className="input" type="number" min="0" max="100" value={descGlobal} onChange={e => setDescGlobal(+e.target.value)} style={{ width: '80px', textAlign: 'right' }} />
              </div>
              {desconto > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#f87171', fontSize: '.875rem' }}>- Desconto</span>
                  <span style={{ color: '#f87171', fontWeight: 600 }}>- R$ {desconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '.5rem', marginTop: '.25rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--gold-l)' }}>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Observações */}
        <div className="card">
          <label className="label">Observações</label>
          <textarea className="input" rows={2} placeholder="Condições de pagamento, prazo de entrega, observações..." value={obs} onChange={e => setObs(e.target.value)} style={{ resize: 'vertical' }} />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
          <Link href="/dashboard/vendas" className="btn-secondary">Cancelar</Link>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Salvando…' : tipo === 'cotacao' ? '📋 Criar Cotação' : '✅ Criar Pedido'}
          </button>
        </div>
      </form>
    </div>
  )
}
