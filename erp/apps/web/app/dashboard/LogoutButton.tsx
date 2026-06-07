'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.78rem', color: 'rgba(255,255,255,.35)', padding: '.375rem .75rem', borderRadius: '.5rem', transition: 'color .15s' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.35)')}
    >
      Sair →
    </button>
  )
}
