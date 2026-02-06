import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
})

// pSEO Variables - These will be replaced programmatically
const cityVar = "{{ciudad}}"
const industryVar = "{{industria}}"

export const metadata: Metadata = {
  title: `Desarrollo Ecommerce Headless en ${cityVar} | NitroCommerce - Arquitectura de Alto Rendimiento`,
  description: `Transformamos tu tienda online en ${cityVar} con arquitectura headless. Carga en <200ms, 99.9% uptime, +150% conversiones. Especialistas en ${industryVar}. Diagnóstico gratuito.`,
  keywords: [
    `ecommerce ${cityVar}`,
    `desarrollo web ${cityVar}`,
    `tienda online ${cityVar}`,
    'arquitectura headless',
    'ecommerce escalable',
    'optimización conversiones',
    `${industryVar} ecommerce`,
    'Next.js ecommerce',
    'velocidad web',
    'Core Web Vitals',
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
    title: `Desarrollo Ecommerce Headless en ${cityVar} | NitroCommerce`,
    description: `Arquitectura headless de alto rendimiento para ecommerce en ${cityVar}. Carga en <200ms, escalabilidad infinita.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Ecommerce Headless ${cityVar} | NitroCommerce`,
    description: `Transformamos tu tienda online en ${cityVar}. Velocidad extrema, conversiones que explotan.`,
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#22c55e',
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
