'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

interface Props {
  comissaoId: string
  marcarPago?: boolean
}

export default function AprovarComissao({ comissaoId, marcarPago = false }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleClick() {
    setLoading(true)
    const novoStatus = marcarPago ? 'paga' : 'aprovada'
    await supabase
      .from('comissoes')
      .update({
        status: novoStatus,
        ...(novoStatus === 'aprovada' ? { aprovado_em: new Date().toISOString() } : {}),
        ...(novoStatus === 'paga'     ? { pago_em:     new Date().toISOString() } : {}),
      })
      .eq('id', comissaoId)
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        padding: '.375rem .875rem', borderRadius: '.625rem', fontSize: '.78rem', fontWeight: 600,
        cursor: 'pointer', border: 'none', transition: 'opacity .2s',
        background: marcarPago
          ? 'linear-gradient(135deg,#4ade80,#22c55e)'
          : 'linear-gradient(135deg,var(--gold-l),var(--gold))',
        color: '#111',
        opacity: loading ? .6 : 1,
      }}
    >
      {loading ? '…' : marcarPago ? '💰 Marcar pago' : '✓ Aprovar'}
    </button>
  )
}
