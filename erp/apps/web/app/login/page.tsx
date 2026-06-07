'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

function LoginForm() {
  const router      = useRouter()
  const params      = useSearchParams()
  const redirectTo  = params.get('redirectTo') ?? '/dashboard'

  const supabase    = createClient()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'E-mail ou senha incorretos.'
        : authError.message)
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }} className="animate-slide-up">
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.875rem', marginBottom: '.75rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg,#f0d47a,#c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(201,168,76,.35)', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.75rem', color: '#111', lineHeight: 1 }}>L</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontWeight: 800, fontSize: '1.125rem', color: '#fff' }}>Lubrinorte</p>
            <p style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '.1em' }}>ERP SYSTEM</p>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '.875rem' }}>Acesse sua conta para continuar</p>
      </div>

      {/* Card */}
      <div className="card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          <div>
            <label className="label">E-mail</label>
            <input type="email" className="input" placeholder="seu@lubrinorte.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <label className="label">Senha</label>
            <input type="password" className="input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          {error && (
            <div style={{ padding: '.75rem 1rem', borderRadius: '.75rem', background: 'rgba(200,22,29,.1)', border: '1px solid rgba(200,22,29,.25)', color: '#f87171', fontSize: '.875rem' }}>
              {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: '.25rem' }}>
            {loading ? 'Entrando…' : 'Entrar no sistema'}
          </button>
        </form>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: '.72rem', marginTop: '1.5rem', fontFamily: 'IBM Plex Mono, monospace' }}>
          MANAUS — AM · DISTRIBUIÇÃO B2B
        </p>
      </div>

      <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
        <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', textAlign: 'center', fontFamily: 'IBM Plex Mono, monospace', marginBottom: '.5rem' }}>CREDENCIAIS DEMO</p>
        <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.45)', textAlign: 'center' }}>
          admin@lubrinorte.com · Lubrinorte@2026
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#070707', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
      {/* Glows */}
      <div style={{ position: 'absolute', top: '-8rem', left: '-8rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'rgba(201,168,76,.12)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-8rem', right: '-8rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'rgba(200,22,29,.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <Suspense fallback={
        <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '.875rem' }}>Carregando…</div>
      }>
        <LoginForm />
      </Suspense>
    </main>
  )
}
