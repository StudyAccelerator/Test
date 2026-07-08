import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://alevelaccelerators.com"),
  title: {
    default: "A-Level Accelerators | Live Online A-Level Courses & Tutoring",
    template: "%s | A-Level Accelerators",
  },
  description:
    "Live online A-level courses in Biology, Chemistry, Maths and Physics — small groups taught by subject specialists, led by Dr Waleed Ahmad, MBBS. Plus a free revision timetable tool and evidence-based revision guides.",
  keywords: [
    "a level tutoring",
    "a level courses online",
    "a level revision",
    "a level biology tutor",
    "a level chemistry tutor",
    "a level maths tutor",
    "a level physics tutor",
  ],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    siteName: "A-Level Accelerators",
    type: "website",
    url: "https://alevelaccelerators.com",
  },
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script
            id="gtm-head"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}
