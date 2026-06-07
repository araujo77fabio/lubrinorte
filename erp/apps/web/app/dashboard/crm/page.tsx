import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'CRM — Clientes' }
export const revalidate = 0

const statusMap: Record<string, { label: string; cls: string }> = {
  ativo:    { label: 'Ativo',    cls: 'badge-green' },
  proposta: { label: 'Proposta', cls: 'badge-gold'  },
  inativo:  { label: 'Inativo', cls: 'badge-gray'   },
}
const segmentoCls: Record<string, string> = {
  Transportadora: 'badge-blue', Oficina: 'badge-gray', Frota: 'badge-gold',
  Nautico: 'badge-blue', Industria: 'badge-red', Outro: 'badge-gray',
}

export default async function CRMPage() {
  const supabase = await createClient()
  const { data: _clientes } = await supabase
    .from('clientes')
    .select('*, vendedores(nome)')
    .order('razao_social')
  const clientes = _clientes ?? []

  const ativos    = clientes.filter(c => c.status === 'ativo').length
  const propostas = clientes.filter(c => c.status === 'proposta').length
  const inativos  = clientes.filter(c => c.status === 'inativo').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-.02em' }}>CRM — Clientes</h1>
          <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.25rem' }}>{clientes.length} clientes cadastrados</p>
        </div>
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <Link href="/dashboard/crm/pipeline" className="btn-secondary">📊 Pipeline</Link>
          <Link href="/dashboard/crm/novo"     className="btn-primary">+ Novo Cliente</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1rem' }}>
        {[
          { label: 'Ativos',   value: ativos.toString(),    color: '#4ade80' },
          { label: 'Propostas',value: propostas.toString(), color: 'var(--gold-l)' },
          { label: 'Inativos', value: inativos.toString(),  color: '#f87171' },
          { label: 'Total',    value: clientes.length.toString(), color: '#fff' },
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
                <th className="th">Cliente</th>
                <th className="th">CNPJ</th>
                <th className="th">Segmento</th>
                <th className="th">Vendedor</th>
                <th className="th">Status</th>
                <th className="th"></th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id} className="tr">
                  <td className="td">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, background: 'linear-gradient(135deg,var(--surf2),var(--surf3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.875rem', fontWeight: 700, color: 'var(--gold)' }}>
                        {c.razao_social[0]}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '.875rem' }}>{c.nome_fantasia ?? c.razao_social}</p>
                        <p style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{c.cidade} — {c.uf}</p>
                      </div>
                    </div>
                  </td>
                  <td className="td" style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--muted)' }}>{c.cnpj ?? '—'}</td>
                  <td className="td"><span className={`badge ${segmentoCls[c.segmento] ?? 'badge-gray'}`}>{c.segmento}</span></td>
                  <td className="td" style={{ color: 'rgba(255,255,255,.7)' }}>{(c.vendedores as any)?.nome ?? '—'}</td>
                  <td className="td"><span className={`badge ${statusMap[c.status]?.cls ?? 'badge-gray'}`}>{statusMap[c.status]?.label ?? c.status}</span></td>
                  <td className="td">
                    <Link href={`/dashboard/crm/${c.id}`} style={{ fontSize: '.8rem', color: 'var(--gold)', padding: '.375rem .75rem', borderRadius: '.5rem', background: 'rgba(201,168,76,.08)', border: '1px solid rgba(201,168,76,.2)', whiteSpace: 'nowrap' }}>
                      Ver →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
