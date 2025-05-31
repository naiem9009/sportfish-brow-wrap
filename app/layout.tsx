/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */

import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import TawkMessenger from "@/components/TawkMessenger"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  icons : {
    icon: '/favicon.ico',
  },
  title: "Custom Boat Brow Wraps in South Florida - From Port St. Lucie to Miami | browwraps.com",
  description:
    "Upgrade your sportfish yacht with sleek, gloss black boat brow wraps. We service Port St. Lucie, Stuart, Jupiter, West Palm Beach, Boca Raton, Fort Lauderdale, Miami & more. On-water installation, low maintenance, luxury finish.",
  keywords:
    "boat brow wraps, yacht brow wraps, sportfish window wraps, faux brow mask, gloss black yacht wrap, South Florida, Stuart, Jupiter, Fort Lauderdale, Miami",
  openGraph: {
    title: "Custom Boat Brow Wraps in South Florida - From Port St. Lucie to Miami",
    description:
      "Upgrade your sportfish yacht with sleek, gloss black boat brow wraps. On-water installation, low maintenance, luxury finish.",
    type: "website",
    locale: "en_US",
    siteName: "browwraps.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <TawkMessenger />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
