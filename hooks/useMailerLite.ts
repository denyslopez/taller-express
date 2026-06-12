import { useState } from 'react'

type FormType = 'waitlist' | 'lead-magnet'
type Status = 'idle' | 'loading' | 'success' | 'error'

export function useMailerLite() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const submit = async (email: string, type: FormType) => {
    setStatus('loading')
    const endpoint = type === 'waitlist'
      ? '/api/subscribe'
      : '/api/lead-magnet'

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage(
          type === 'waitlist'
            ? '¡Listo! Te avisamos cuando estemos listos.'
            : '¡Revisá tu correo! La guía está en camino.'
        )
      } else {
        setStatus('error')
        setMessage('Algo salió mal. Intentá de nuevo.')
      }
    } catch {
      setStatus('error')
      setMessage('Error de conexión. Intentá de nuevo.')
    }
  }

  const reset = () => {
    setStatus('idle')
    setMessage('')
  }

  return { status, message, submit, reset }
}
