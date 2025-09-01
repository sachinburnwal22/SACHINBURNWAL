import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import GsapBackground from "@/components/effects/gsap-background"
import RouteTransition from "@/components/effects/route-transition"
import LoaderMarigold from "@/components/effects/loader-mariegold"
import CursorTrail from "@/components/effects/cursor-trail"

import { Source_Sans_3, Playfair_Display } from "next/font/google"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Sachin Burnwal — Portfolio",
  description: "Impressive developer portfolio for Sachin Burnwal",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <body className="relative font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <GsapBackground />
          <CursorTrail />
          <Suspense fallback={<LoaderMarigold />}>
            <div className="relative z-10">
              <RouteTransition>{children}</RouteTransition>
            </div>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
