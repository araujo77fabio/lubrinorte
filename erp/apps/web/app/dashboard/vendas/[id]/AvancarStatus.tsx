'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/client'

interface Props { pedidoId: string; proximoStatus: string; label: string }

export default function AvancarStatus({ pedidoId, proximoStatus, label }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function avancar() {
    setLoading(true)
    await supabase.from('pedidos').update({ status: proximoStatus }).eq('id', pedidoId)
    router.refresh()
    setLoading(false)
  }

  return (
    <button onClick={avancar} disabled={loading} className="btn-primary" style={{ fontSize: '.875rem' }}>
      {loading ? 'Atualizando…' : `→ Marcar como ${label}`}
    </button>
  )
}
