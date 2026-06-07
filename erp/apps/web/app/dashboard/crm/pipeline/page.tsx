'use client'

import Link from 'next/link'

const colunas = [
  {
    id: 'prospeccao', label: 'Prospecção', color: '#60a5fa', count: 3,
    oportunidades: [
      { id: '1', empresa: 'Construtora Norte AM',  valor: 'R$ 8.000/mês',  responsavel: 'Carlos',  dias: 2,  produto: 'Texaco 15W40' },
      { id: '2', empresa: 'Fazenda Rio Negro',     valor: 'R$ 4.200/mês',  responsavel: 'Ana',     dias: 5,  produto: 'UNI Diesel' },
      { id: '3', empresa: 'Pesca Amazonas Ltda',   valor: 'R$ 2.800/mês',  responsavel: 'João',    dias: 1,  produto: 'Graxas' },
    ],
  },
  {
    id: 'contato', label: 'Em Contato', color: '#c9a84c', count: 2,
    oportunidades: [
      { id: '4', empresa: 'Transportadora AM Sul', valor: 'R$ 15.000/mês', responsavel: 'Carlos',  dias: 8,  produto: 'Texaco 15W40' },
      { id: '5', empresa: 'Mineradora do Norte',   valor: 'R$ 22.000/mês', responsavel: 'Ana',     dias: 12, produto: 'Linha Completa' },
    ],
  },
  {
    id: 'proposta', label: 'Proposta Enviada', color: '#a78bfa', count: 3,
    oportunidades: [
      { id: '6', empresa: 'Estaleiro Boa Vista',   valor: 'R$ 5.200/mês',  responsavel: 'João',    dias: 15, produto: 'Náutico' },
      { id: '7', empresa: 'Madeireira Amazonas',   valor: 'R$ 7.100/mês',  responsavel: 'Carlos',  dias: 18, produto: 'Diesel + Graxas' },
      { id: '8', empresa: 'Escola Técnica AM',     valor: 'R$ 1.800/mês',  responsavel: 'Ana',     dias: 20, produto: 'UNI 20W50' },
    ],
  },
  {
    id: 'negociacao', label: 'Negociação', color: '#fb923c', count: 1,
    oportunidades: [
      { id: '9', empresa: 'Porto de Manaus SA',    valor: 'R$ 35.000/mês', responsavel: 'Carlos',  dias: 25, produto: 'Linha Completa' },
    ],
  },
  {
    id: 'fechado', label: 'Fechado', color: '#4ade80', count: 2,
    oportunidades: [
      { id: '10', empresa: 'Indústria Metalúrgica AM', valor: 'R$ 9.600/mês', responsavel: 'Ana',  dias: 30, produto: 'UNI 10W30' },
      { id: '11', empresa: 'Auto Center Silva',        valor: 'R$ 3.800/mês', responsavel: 'João', dias: 32, produto: 'UNI 20W50' },
    ],
  },
]

function diasBadge(dias: number) {
  if (dias <= 7)  return { color: '#4ade80', label: `${dias}d` }
  if (dias <= 21) return { color: '#f0d47a', label: `${dias}d` }
  return { color: '#f87171', label: `${dias}d ⚠` }
}

export default function PipelinePage() {
  const totalOps = colunas.reduce((s, c) => s + c.oportunidades.length, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '100%' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <Link href="/dashboard/crm" style={{ color: 'var(--muted)', fontSize: '.875rem' }}>← Clientes</Link>
            <span style={{ color: 'rgba(255,255,255,.2)' }}>/</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-.02em' }}>Pipeline</h1>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.25rem' }}>
            {totalOps} oportunidades ativas · R$ 114.500/mês potencial
          </p>
        </div>
        <button className="btn-primary">+ Nova Oportunidade</button>
      </div>

      {/* Kanban */}
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        {colunas.map(col => (
          <div key={col.id} style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', minWidth: '240px', flex: '1 0 240px' }}>
            {/* Column header */}
            <div style={{
              padding: '.75rem 1rem', borderRadius: '.75rem',
              background: 'var(--surface)', border: '1px solid var(--line)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: '.8rem', fontWeight: 700, color: '#fff' }}>{col.label}</span>
              </div>
              <span style={{ fontSize: '.72rem', color: 'var(--muted)', background: 'rgba(255,255,255,.06)', padding: '.15rem .5rem', borderRadius: '999px' }}>
                {col.count}
              </span>
            </div>

            {/* Cards */}
            {col.oportunidades.map(op => {
              const db = diasBadge(op.dias)
              return (
                <div key={op.id} className="card-hover" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                  <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '.5rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '.875rem', lineHeight: 1.3 }}>{op.empresa}</p>
                    <span style={{ fontSize: '.7rem', color: db.color, whiteSpace: 'nowrap', flexShrink: 0 }}>{db.label}</span>
                  </div>
                  <p style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{op.produto}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '.25rem' }}>
                    <span style={{ fontSize: '.875rem', fontWeight: 700, color: '#f0d47a' }}>{op.valor}</span>
                    <span style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.5)', background: 'rgba(255,255,255,.06)', padding: '.2rem .5rem', borderRadius: '999px' }}>
                      {op.responsavel}
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Add button */}
            <button
              className="btn-secondary"
              style={{ fontSize: '.8rem', color: 'var(--muted)', border: '1px dashed rgba(255,255,255,.15)', background: 'transparent' }}
            >
              + Adicionar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
