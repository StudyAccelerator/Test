import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Top 1% Study System - A-Level Excellence Programme",
  description: "Master your A-Levels with our proven system. Choose from Series, Accelerator, or System tiers.",
  icons: {
    icon: "/favicon.png",
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
