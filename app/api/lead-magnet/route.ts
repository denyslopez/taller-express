import { NextRequest, NextResponse } from 'next/server'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY!
const GROUP_ID = process.env.MAILERLITE_LEADMAGNET_GROUP_ID!

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: [GROUP_ID],
        fields: {
          last_name: 'Lead Magnet - Guia'
        }
      }),
    })

    if (res.status === 200 || res.status === 201) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const errorData = await res.json()
    console.error('[/api/lead-magnet] MailerLite error:', errorData)
    return NextResponse.json(
      { error: 'Error al procesar solicitud' },
      { status: res.status }
    )

  } catch (error) {
    console.error('[/api/lead-magnet] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
