import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import MetaPixel from "@/components/meta-pixel"
import "./globals.css"

const SITE_URL = "https://alevelaccelerators.com"

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "A-Level Accelerators",
  description:
    "Improve your A-Level results with A-Level Accelerators: live online courses, structured study systems, and subject support for Biology, Chemistry, Maths and Physics.",
  inLanguage: "en-GB",
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "A-Level Accelerators",
  },
}

const educationalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "A-Level Accelerators",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-header-new.png`,
  founder: {
    "@type": "Person",
    name: "Dr Waleed Ahmad",
    honorificSuffix: "MBBS",
  },
  sameAs: [
    "https://www.linkedin.com/in/dr-waleed-ahmad-068134237",
    "https://www.facebook.com/profile.php?id=61589304930667",
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "A-Level Accelerators | Live Online A-Level Courses & Tutoring",
    template: "%s | A-Level Accelerators",
  },
  description:
    "Live online A-level courses in Biology, Chemistry, Maths and Physics. Small groups taught by subject specialists, led by Dr Waleed Ahmad, MBBS. Plus a free revision timetable tool and revision guides.",
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
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "A-Level Accelerators: top grades are a system, not a talent.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A-Level Accelerators | Live Online A-Level Courses & Tutoring",
    description:
      "Live online A-level courses in Biology, Chemistry, Maths and Physics, led by Dr Waleed Ahmad, MBBS, plus free revision tools.",
    images: ["/og-default.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  )
}
