import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Detalhe do Cliente' }

const interacoes = [
  { id: '1', tipo: 'Ligação',    data: '04/06/2026', usuario: 'Carlos Silva',  descricao: 'Confirmou pedido mensal de 500L 15W40. Solicitou cotação de graxas industriais.' },
  { id: '2', tipo: 'WhatsApp',   data: '02/06/2026', usuario: 'Carlos Silva',  descricao: 'Enviado catálogo atualizado com preços de junho.' },
  { id: '3', tipo: 'Visita',     data: '28/05/2026', usuario: 'João Mendes',   descricao: 'Visita técnica ao pátio. 43 caminhões na frota, troca a cada 10.000km.' },
  { id: '4', tipo: 'E-mail',     data: '20/05/2026', usuario: 'Ana Ferreira',  descricao: 'Proposta de contrato anual enviada. Aguardando resposta do financeiro.' },
  { id: '5', tipo: 'Pedido',     data: '15/05/2026', usuario: 'Carlos Silva',  descricao: 'Pedido #1028 confirmado: 500L 15W40 + 20kg graxa MP-2.' },
]

const tipoIcon: Record<string, string> = {
  Ligação: '📞', WhatsApp: '💬', Visita: '🏢', 'E-mail': '✉️', Pedido: '📋',
}
const tipoCls: Record<string, string> = {
  Ligação: 'badge-blue', WhatsApp: 'badge-green', Visita: 'badge-gold', 'E-mail': 'badge-gray', Pedido: 'badge-gold',
}

export default function ClienteDetailPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-in">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.875rem', color: 'var(--muted)' }}>
        <Link href="/dashboard/crm" style={{ color: 'var(--muted)' }}>Clientes</Link>
        <span>/</span>
        <span style={{ color: '#fff' }}>Frota Municipal Manaus</span>
      </div>

      {/* Header do cliente */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px', flexShrink: 0,
              background: 'linear-gradient(135deg,var(--gold-d),var(--gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 800, color: '#111',
            }}>F</div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Frota Municipal Manaus</h1>
              <p style={{ color: 'var(--muted)', fontSize: '.875rem', marginTop: '.2rem' }}>CNPJ: 04.970.177/0001-51 · Manaus, AM</p>
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-green">Ativo</span>
                <span className="badge badge-gold">Frota</span>
                <span className="badge badge-blue">Contrato Anual</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <button className="btn-secondary">✉️ E-mail</button>
            <button className="btn-secondary">💬 WhatsApp</button>
            <Link href="/dashboard/vendas/nova" className="btn-primary">+ Nova Cotação</Link>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
          {[
            { label: 'Faturamento/mês', value: 'R$ 28.000',   color: 'var(--gold-l)' },
            { label: 'Ticket médio',    value: 'R$ 9.333',    color: 'var(--gold-l)' },
            { label: 'Pedidos totais',  value: '47',           color: '#fff' },
            { label: 'Veículos',        value: '43 caminhões', color: '#fff' },
            { label: 'Vendedor',        value: 'Carlos Silva', color: 'var(--muted)' },
            { label: 'Cliente desde',   value: 'Jan/2023',     color: 'var(--muted)' },
          ].map(k => (
            <div key={k.label}>
              <p style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{k.label}</p>
              <p style={{ fontWeight: 700, fontSize: '.9rem', color: k.color, marginTop: '.25rem' }}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Interações + Próximos passos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Histórico de interações */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.125rem 1.5rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Histórico de Interações</h2>
            <button className="btn-primary" style={{ padding: '.5rem .875rem', fontSize: '.78rem' }}>+ Registrar</button>
          </div>
          <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {interacoes.map((i, idx) => (
              <div key={i.id} style={{ display: 'flex', gap: '1rem' }}>
                {/* Timeline line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'var(--surf2)', border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.875rem',
                  }}>
                    {tipoIcon[i.tipo]}
                  </div>
                  {idx < interacoes.length - 1 && (
                    <div style={{ width: '1px', flex: 1, minHeight: '24px', background: 'var(--line)', marginTop: '4px' }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ flex: 1, paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '.375rem' }}>
                    <span className={`badge ${tipoCls[i.tipo]}`}>{i.tipo}</span>
                    <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{i.data}</span>
                    <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)' }}>por {i.usuario}</span>
                  </div>
                  <p style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.75)', lineHeight: 1.5 }}>{i.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Painel lateral */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Próxima ação */}
          <div className="card" style={{ borderColor: 'rgba(201,168,76,.2)' }}>
            <p style={{ fontSize: '.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: '.75rem' }}>
              Próxima Ação
            </p>
            <p style={{ fontSize: '.875rem', fontWeight: 600, marginBottom: '.375rem' }}>Ligar para confirmar pedido de julho</p>
            <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: '.75rem' }}>Prazo: 10/06/2026</p>
            <button className="btn-primary" style={{ width: '100%', fontSize: '.8rem' }}>✓ Concluir</button>
          </div>

          {/* Produtos comprados */}
          <div className="card">
            <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: '.75rem' }}>
              Produtos Frequentes
            </p>
            {[
              { nome: 'Texaco 15W40 Diesel 20L', pct: 72 },
              { nome: 'Texaco 15W40 Diesel 1L',  pct: 18 },
              { nome: 'Graxa MP-2 20kg',          pct: 10 },
            ].map(p => (
              <div key={p.nome} style={{ marginBottom: '.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.3rem' }}>
                  <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.75)' }}>{p.nome}</p>
                  <p style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{p.pct}%</p>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.pct}%`, height: '100%', background: 'var(--gold)', borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Pedidos recentes */}
          <div className="card">
            <p style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: '.75rem' }}>
              Últimos Pedidos
            </p>
            {[
              { id: '#1040', data: '01/06', valor: 'R$ 9.000', status: 'entregue' },
              { id: '#1028', data: '15/05', valor: 'R$ 9.200', status: 'entregue' },
              { id: '#1015', data: '01/05', valor: 'R$ 8.800', status: 'entregue' },
            ].map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.5rem 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                <div>
                  <p style={{ fontSize: '.8rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{p.id}</p>
                  <p style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{p.data}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--gold-l)' }}>{p.valor}</p>
                  <span className="badge badge-green" style={{ fontSize: '.65rem' }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
