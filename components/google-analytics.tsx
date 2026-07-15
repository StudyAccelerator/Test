'use client'

import Script from 'next/script'

/* Google Analytics 4. Dormant until NEXT_PUBLIC_GA_ID is set in the deployment
   environment (or a real id is pasted below). With no id, nothing loads and no
   cookie is set, so GA only starts once the Measurement ID is provided. Once it
   loads, the window.gtag('event', 'generate_lead') calls already in the parents
   form and the diagnostic record those conversions in GA automatically.

   A GA4 Measurement ID looks like G-XXXXXXXXXX and is found in Google Analytics
   under Admin, then Data streams, then the web stream. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

export default function GoogleAnalytics() {
  if (!GA_ID) return null
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');`}
      </Script>
    </>
  )
}
