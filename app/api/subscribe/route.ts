import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Handle CORS preflight from static HTML on Hostinger
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, email } = await req.json()

    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'firstName and email are required' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    const API_KEY = process.env.MAILERLITE_API_KEY
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID

    if (!API_KEY || !GROUP_ID) {
      console.error('Missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID env vars')
      return NextResponse.json(
        { error: 'Server misconfiguration' },
        { status: 500, headers: CORS_HEADERS }
      )
    }

    // Step 1: Upsert the subscriber (creates or updates by email)
    const subRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: { name: firstName },
      }),
    })

    if (!subRes.ok) {
      const body = await subRes.text()
      console.error('MailerLite upsert failed:', subRes.status, body)
      return NextResponse.json(
        { error: 'Failed to add subscriber' },
        { status: 502, headers: CORS_HEADERS }
      )
    }

    const { data: subscriber } = await subRes.json()

    // Step 2: Add to "Revision Tracker Users" group
    const groupRes = await fetch(
      `https://connect.mailerlite.com/api/subscribers/${subscriber.id}/groups/${GROUP_ID}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    )

    if (!groupRes.ok) {
      // Subscriber was created — log but don't fail the whole request
      console.warn('MailerLite group assignment failed:', groupRes.status)
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error('Unexpected error in /api/subscribe:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
