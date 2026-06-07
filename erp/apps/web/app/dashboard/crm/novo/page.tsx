'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NovoClientePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cnpj, setCnpj] = useState('')
  const [buscando, setBuscando] = useState(false)
  const [form, setForm] = useState({
    razaoSocial: '', nomeFantasia: '', cnpj: '', email: '',
    telefone: '', cidade: 'Manaus', uf: 'AM',
    segmento: '', vendedor: '', observacoes: '',
  })

  function formatCNPJ(v: string) {
    return v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2').slice(0, 18)
  }

  async function buscarCNPJ(cnpjRaw: string) {
    const digits = cnpjRaw.replace(/\D/g, '')
    if (digits.length !== 14) return
    setBuscando(true)
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`)
      if (res.ok) {
        const data = await res.json()
        setForm(f => ({
          ...f,
          razaoSocial: data.razao_social ?? '',
          nomeFantasia: data.nome_fantasia ?? '',
          email: data.email ?? '',
          telefone: data.ddd_telefone_1 ?? '',
          cidade: data.municipio ?? 'Manaus',
          uf: data.uf ?? 'AM',
        }))
      }
    } catch { /* silenciar erro de rede */ }
    setBuscando(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    // TODO: Supabase insert
    router.push('/dashboard/crm')
  }

  function field(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }} className="animate-fade-in">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem', fontSize: '.875rem', color: 'var(--muted)' }}>
        <Link href="/dashboard/crm" style={{ color: 'var(--muted)' }}>Clientes</Link>
        <span>/</span>
        <span style={{ color: '#fff' }}>Novo Cliente</span>
      </div>

      <div className="card">
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Cadastrar Novo Cliente</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* CNPJ com busca automática */}
          <div>
            <label className="label">CNPJ</label>
            <div style={{ display: 'flex', gap: '.625rem' }}>
              <input
                className="input"
                placeholder="00.000.000/0001-00"
                value={cnpj}
                onChange={e => {
                  const v = formatCNPJ(e.target.value)
                  setCnpj(v)
                  setForm(f => ({ ...f, cnpj: v }))
                }}
                onBlur={() => buscarCNPJ(cnpj)}
                required
              />
              <button
                type="button"
                onClick={() => buscarCNPJ(cnpj)}
                className="btn-secondary"
                style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                disabled={buscando}
              >
                {buscando ? 'Buscando…' : '🔍 Buscar'}
              </button>
            </div>
            <p style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: '.375rem' }}>
              Dados preenchidos automaticamente via Brasil API
            </p>
          </div>

          {/* Razão Social / Nome Fantasia */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Razão Social *</label>
              <input className="input" placeholder="Empresa Ltda" value={form.razaoSocial} onChange={e => field('razaoSocial', e.target.value)} required />
            </div>
            <div>
              <label className="label">Nome Fantasia</label>
              <input className="input" placeholder="Nome comercial" value={form.nomeFantasia} onChange={e => field('nomeFantasia', e.target.value)} />
            </div>
          </div>

          {/* Contato */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">E-mail</label>
              <input className="input" type="email" placeholder="contato@empresa.com" value={form.email} onChange={e => field('email', e.target.value)} />
            </div>
            <div>
              <label className="label">Telefone / WhatsApp</label>
              <input className="input" placeholder="(92) 99999-9999" value={form.telefone} onChange={e => field('telefone', e.target.value)} />
            </div>
          </div>

          {/* Localização */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Cidade</label>
              <input className="input" placeholder="Manaus" value={form.cidade} onChange={e => field('cidade', e.target.value)} />
            </div>
            <div>
              <label className="label">UF</label>
              <input className="input" placeholder="AM" value={form.uf} onChange={e => field('uf', e.target.value)} maxLength={2} />
            </div>
          </div>

          {/* Segmento / Vendedor */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Segmento *</label>
              <select className="input" value={form.segmento} onChange={e => field('segmento', e.target.value)} required style={{ color: form.segmento ? '#fff' : 'rgba(255,255,255,.28)' }}>
                <option value="" disabled>Selecione...</option>
                <option>Transportadora</option>
                <option>Oficina</option>
                <option>Frota</option>
                <option>Náutico</option>
                <option>Indústria</option>
                <option>Auto Center</option>
                <option>Revenda</option>
              </select>
            </div>
            <div>
              <label className="label">Vendedor Responsável *</label>
              <select className="input" value={form.vendedor} onChange={e => field('vendedor', e.target.value)} required style={{ color: form.vendedor ? '#fff' : 'rgba(255,255,255,.28)' }}>
                <option value="" disabled>Selecione...</option>
                <option>Carlos Silva</option>
                <option>Ana Ferreira</option>
                <option>João Mendes</option>
              </select>
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="label">Observações</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Notas sobre o cliente, produtos de interesse, condições especiais..."
              value={form.observacoes}
              onChange={e => field('observacoes', e.target.value)}
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end', paddingTop: '.5rem', borderTop: '1px solid var(--line)' }}>
            <Link href="/dashboard/crm" className="btn-secondary">Cancelar</Link>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Salvando…' : '✓ Cadastrar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
