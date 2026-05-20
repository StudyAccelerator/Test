'use client'

import { useState } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

// ─── Brand tokens ────────────────────────────────────────────────────────────
const PURPLE = '#2D1B69'
const GOLD   = '#C9A84C'
const CREAM  = '#FFF8E8'

// ─── Shared input style ───────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '12px 14px',
  border: '1.5px solid #DDD5C8',
  borderRadius: '8px',
  fontSize: '0.95rem',
  color: PURPLE,
  backgroundColor: '#FDFAF5',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.15s',
}

const BULLETS = [
  'Why effort alone is not enough to improve A-Level grades',
  'The 4-tier system that separates B students from A and A* students',
  'Three questions to ask your child this week that will tell you more than any exam result',
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ParentsPage() {
  const [form, setForm] = useState({ firstName: '', email: '', yearGroup: '' })
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error,   setError]     = useState('')

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/parent-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      // Fire conversion events (safe — only runs in browser after success)
      window.fbq?.('track', 'Lead')
      window.gtag?.('event', 'generate_lead')

      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Connection error. Please check your internet and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: CREAM, minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: 'clamp(32px, 6vw, 64px) 20px 80px' }}>

        {/* ── Logo ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Image
            src="/logo-header-new.png"
            alt="A-Level Accelerators"
            width={160}
            height={48}
            style={{ objectFit: 'contain', maxWidth: '160px', height: 'auto' }}
            priority
          />
        </div>

        {/* ── Success state ────────────────────────────────────────────────── */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '52px', marginBottom: '20px', lineHeight: 1 }}>✅</div>
            <h2 style={{
              color: PURPLE, fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 800, lineHeight: 1.2, marginBottom: '20px',
            }}>
              Thank you.
            </h2>
            <p style={{
              color: PURPLE, fontSize: '1.05rem', lineHeight: 1.75,
              marginBottom: '36px', opacity: 0.9,
            }}>
              Your guide is on its way. Check your inbox in the next few minutes.
              <br /><br />
              In the meantime, you can download it directly here:
            </p>
            <a
              href="/ALevel-Accelerators-Parent-Guide.pdf"
              download
              style={{
                display: 'inline-block',
                backgroundColor: GOLD,
                color: PURPLE,
                fontWeight: 700,
                fontSize: '1rem',
                padding: '15px 36px',
                borderRadius: '8px',
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Download the Parent Guide
            </a>
          </div>

        ) : (
          <>
            {/* ── Headline ───────────────────────────────────────────────── */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h1 style={{
                color: PURPLE,
                fontSize: 'clamp(1.55rem, 4.5vw, 2.15rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}>
                Is Your Child Working Hard But Still Not Getting the Grades They Need?
              </h1>
              <p style={{
                color: PURPLE,
                fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                lineHeight: 1.65,
                marginBottom: '14px',
                opacity: 0.85,
              }}>
                Download the free parent guide that explains exactly why — and what to do about it.
              </p>
              <p style={{ color: GOLD, fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.01em' }}>
                By Dr Waleed Ahmad M &nbsp;·&nbsp; Founder of A-Level Accelerators
              </p>
            </div>

            {/* ── Divider ────────────────────────────────────────────────── */}
            <div style={{
              height: '2px',
              background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
              opacity: 0.45,
              marginBottom: '28px',
            }} />

            {/* ── Bullet points ──────────────────────────────────────────── */}
            <ul style={{
              listStyle: 'none', padding: 0, margin: '0 0 36px',
              display: 'flex', flexDirection: 'column', gap: '14px',
            }}>
              {BULLETS.map((text, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{
                    flexShrink: 0,
                    width: '22px', height: '22px',
                    borderRadius: '50%',
                    backgroundColor: GOLD,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '1px',
                  }}>
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                      <path d="M1 4L4 7L10 1" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span style={{ color: PURPLE, fontSize: '1rem', lineHeight: 1.55, fontWeight: 500 }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* ── Form card ──────────────────────────────────────────────── */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: 'clamp(24px, 5vw, 36px)',
              boxShadow: '0 4px 32px rgba(45, 27, 105, 0.10)',
            }}>
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* First name */}
                  <div>
                    <label style={labelStyle}>
                      First Name <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={e => update('firstName', e.target.value)}
                      placeholder="e.g. Sarah"
                      maxLength={50}
                      style={inputBase}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>
                      Email Address <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="your@email.com"
                      maxLength={100}
                      style={inputBase}
                    />
                  </div>

                  {/* Year group */}
                  <div>
                    <label style={labelStyle}>
                      Child's Year Group <span style={{ color: GOLD }}>*</span>
                    </label>
                    <select
                      required
                      value={form.yearGroup}
                      onChange={e => update('yearGroup', e.target.value)}
                      style={{
                        ...inputBase,
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='%232D1B69' d='M0 0l5 6 5-6z'/></svg>")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        paddingRight: '38px',
                      } as React.CSSProperties}
                    >
                      <option value="" disabled>Select year group</option>
                      <option value="Year 10">Year 10</option>
                      <option value="Year 11">Year 11</option>
                      <option value="Year 12">Year 12</option>
                      <option value="Year 13">Year 13</option>
                    </select>
                  </div>

                  {/* Error message */}
                  {error && (
                    <p style={{
                      color: '#B91C1C', fontSize: '0.9rem', fontWeight: 500,
                      margin: 0, padding: '10px 14px',
                      backgroundColor: '#FEF2F2', borderRadius: '6px',
                      border: '1px solid #FECACA',
                    }}>
                      ⚠️ {error}
                    </p>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: loading ? '#d9bc72' : GOLD,
                      color: PURPLE,
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      letterSpacing: '0.01em',
                      padding: '15px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      width: '100%',
                      fontFamily: 'inherit',
                      transition: 'background-color 0.2s, opacity 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={spinnerStyle} />
                        Sending…
                      </>
                    ) : (
                      'Send Me the Free Guide'
                    )}
                  </button>

                  {/* Reassurance */}
                  <p style={{
                    textAlign: 'center', color: PURPLE,
                    opacity: 0.5, fontSize: '0.82rem', margin: 0,
                  }}>
                    No spam. Just useful advice for parents of A-Level students.
                  </p>

                </div>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Spinner keyframes */}
      <style>{`
        @keyframes _spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

// ─── Sub-styles ───────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: 'block',
  color: PURPLE,
  fontWeight: 600,
  fontSize: '0.875rem',
  marginBottom: '6px',
}

const spinnerStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '16px',
  height: '16px',
  border: `2px solid ${PURPLE}`,
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: '_spin 0.7s linear infinite',
  flexShrink: 0,
}
