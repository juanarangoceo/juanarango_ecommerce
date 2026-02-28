import type { Metadata, Viewport } from 'next'
import { Syne, Space_Mono, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '800'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Nitro Dropshipping — Lanza tu tienda a costo $0',
  description:
    'Aprende a lanzar tu tienda de dropshipping sin pagar mensualidades. Stack gratuito con Vercel, IA y cero comisiones. Valida antes de gastar.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${syne.variable} ${spaceMono.variable} ${bebasNeue.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
