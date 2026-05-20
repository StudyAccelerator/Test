import { NextRequest, NextResponse } from 'next/server'

const PARENT_LEADS_GROUP_ID = '188021995515937985'

export async function POST(req: NextRequest) {
  try {
    const { firstName, email, yearGroup } = await req.json()

    if (!firstName || !email || !yearGroup) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    const API_KEY = process.env.MAILERLITE_API_KEY

    if (!API_KEY) {
      console.error('[parent-lead] Missing MAILERLITE_API_KEY env var')
      return NextResponse.json(
        { error: 'Server misconfiguration. Please contact us directly.' },
        { status: 500 }
      )
    }

    // Single request: upsert subscriber + assign group + set fields
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: { name: firstName, year_group: yearGroup },
        groups: [PARENT_LEADS_GROUP_ID],
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[parent-lead] MailerLite error:', res.status, body)
      return NextResponse.json(
        { error: 'Failed to send your guide. Please try again in a moment.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[parent-lead] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
