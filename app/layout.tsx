import type { Metadata } from "next"
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
