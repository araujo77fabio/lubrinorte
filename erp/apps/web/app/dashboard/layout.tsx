'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './LogoutButton'

const nav = [
  { href:'/dashboard',            label:'Visão Geral',  icon:'▦' },
  { href:'/dashboard/crm',        label:'CRM',          icon:'👥' },
  { href:'/dashboard/vendas',     label:'Vendas',       icon:'📋' },
  { href:'/dashboard/estoque',    label:'Estoque',      icon:'📦' },
  { href:'/dashboard/vendedores', label:'Vendedores',   icon:'🧑‍💼' },
  { href:'/dashboard/comissoes',  label:'Comissões',    icon:'💰' },
  { href:'/dashboard/relatorios', label:'Relatórios',   icon:'📊' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--dark)' }}>
      {/* Sidebar */}
      <aside style={{
        width:'240px', flexShrink:0,
        background:'var(--black)', borderRight:'1px solid var(--line)',
        display:'flex', flexDirection:'column',
        position:'sticky', top:0, height:'100vh',
      }}>
        {/* Logo */}
        <div style={{ padding:'1.25rem 1rem 1rem', borderBottom:'1px solid var(--line)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.625rem' }}>
            <div style={{
              width:'38px', height:'38px', borderRadius:'12px',
              background:'linear-gradient(135deg,var(--gold-l),var(--gold))',
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
            }}>
              <span style={{ fontFamily:'var(--font-bebas)', fontSize:'1.25rem', color:'#111' }}>L</span>
            </div>
            <div>
              <p style={{ fontWeight:800, fontSize:'.9rem', color:'#fff', lineHeight:1.2 }}>Lubrinorte</p>
              <p style={{ fontSize:'.6rem', color:'rgba(255,255,255,.35)', fontFamily:'var(--font-ibm-mono)', letterSpacing:'.08em' }}>ERP</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding:'.75rem .625rem', flex:1, overflowY:'auto' }}>
          <p style={{ fontSize:'.6rem', color:'rgba(255,255,255,.25)', textTransform:'uppercase', letterSpacing:'.1em', padding:'.25rem .5rem .5rem', fontWeight:700 }}>
            Menu
          </p>
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? 'nav-item-active' : 'nav-item'}
                style={{ display:'flex' }}
              >
                <span style={{ fontSize:'1rem', width:'1.25rem', textAlign:'center' }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding:'.75rem 1rem', borderTop:'1px solid var(--line)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.625rem' }}>
            <div style={{
              width:'32px', height:'32px', borderRadius:'50%',
              background:'linear-gradient(135deg,#334,#223)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'.875rem',
            }}>A</div>
            <div>
              <p style={{ fontSize:'.8rem', fontWeight:600, color:'#fff' }}>Admin</p>
              <p style={{ fontSize:'.68rem', color:'rgba(255,255,255,.35)' }}>admin@lubrinorte.com</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex:1, overflowY:'auto' }}>
        {/* Topbar */}
        <div style={{
          position:'sticky', top:0, zIndex:10,
          background:'rgba(13,13,17,.9)', backdropFilter:'blur(24px)',
          borderBottom:'1px solid var(--line)',
          padding:'.875rem 1.75rem',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--gold)', display:'inline-block', animation:'blink 2s infinite' }} />
            <span style={{ fontSize:'.78rem', color:'rgba(255,255,255,.45)', fontFamily:'var(--font-ibm-mono)', letterSpacing:'.04em' }}>
              MANAUS · AM
            </span>
          </div>
          <div style={{ display:'flex', gap:'.75rem', alignItems:'center' }}>
            <span className="badge-gold">Beta</span>
            <Link href="/dashboard/vendas/nova" className="btn-primary" style={{ padding:'.5rem 1rem', fontSize:'.8rem' }}>
              + Nova Cotação
            </Link>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding:'1.75rem', maxWidth:'1400px', margin:'0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
