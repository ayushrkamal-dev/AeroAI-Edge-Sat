import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { TelemetryProvider } from '@/lib/telemetry-context'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AeroAI Edge-Sat | AI-Powered Aerospace Mission Control',
  description:
    'AeroAI Edge-Sat — AI-powered edge intelligence for next generation environmental monitoring. A miniature aerospace mission control platform.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <TelemetryProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </TelemetryProvider>
      </body>
    </html>
  )
}
