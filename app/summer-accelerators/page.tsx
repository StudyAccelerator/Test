'use client'

import { useEffect } from 'react'

export default function SummerAcceleratorsRedirect() {
  useEffect(() => {
    window.location.replace('/')
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-cream text-brand-text px-8 text-center">
      <p>
        This page has moved. <a href="/" className="text-brand-gold underline">Continue to the Summer Accelerator</a>.
      </p>
    </main>
  )
}
