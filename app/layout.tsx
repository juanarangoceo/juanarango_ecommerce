import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "NitroCommerce | Presencia Digital Premium para Inmobiliarias",
  description: "Transformamos la presencia digital de tu inmobiliaria. Mas propiedades vendidas, mas clientes calificados, menos esfuerzo. Agenda tu consulta gratuita.",
  keywords: [
    'inmobiliaria digital',
    'pagina web inmobiliaria',
    'marketing inmobiliario',
    'captar clientes inmobiliaria',
    'presencia digital bienes raices',
    'ecommerce inmobiliario',
  ],
  authors: [{ name: 'NitroCommerce' }],
  creator: 'NitroCommerce',
  publisher: 'NitroCommerce',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://nitrocommerce.com',
    siteName: 'NitroCommerce',
    title: 'NitroCommerce | Presencia Digital Premium para Inmobiliarias',
    description: 'Ayudamos a inmobiliarias a captar mas clientes con presencia digital de alto nivel.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NitroCommerce | Inmobiliarias Digitales',
    description: 'Presencia digital premium que vende propiedades por ti.',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a2744',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
