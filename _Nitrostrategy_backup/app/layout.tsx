import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: 'Nitro Strategy | Consultoría en Ingeniería de Alto Escalamiento y Automatización con IA Generativa',
  description: 'Consultoría especializada en arquitectura headless, automatización de procesos empresariales con inteligencia artificial generativa y escalamiento de infraestructura digital. +20 años de experiencia en e-commerce y transformación digital B2B.',
  keywords: [
    'consultoría arquitectura headless',
    'automatización procesos empresariales IA',
    'escalamiento infraestructura digital',
    'inteligencia artificial generativa para empresas',
    'consultor e-commerce B2B',
    'transformación digital empresarial',
    'arquitectura de software escalable',
    'automatización con IA para negocios',
    'consultoría técnica startups',
    'ingeniería de escalamiento acelerado'
  ],
  authors: [{ name: 'Juan Arango', url: 'https://nitroecom.com' }],
  creator: 'Nitro Strategy',
  publisher: 'Nitro ECOM',
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
    url: 'https://nitrostrategy.com',
    siteName: 'Nitro Strategy',
    title: 'Nitro Strategy | Consultoría en Ingeniería de Alto Escalamiento',
    description: 'Transforma tu infraestructura digital con consultoría experta en arquitectura headless, automatización con IA generativa y escalamiento empresarial.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nitro Strategy | Consultoría en Ingeniería de Alto Escalamiento',
    description: 'Consultoría experta en arquitectura headless, automatización con IA y escalamiento digital.',
    creator: '@nitroecom',
  },
  alternates: {
    canonical: 'https://nitrostrategy.com',
  },
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
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#00FF00',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Nitro Strategy",
              "description": "Consultoría en ingeniería de alto escalamiento, arquitectura headless y automatización con IA generativa",
              "url": "https://nitrostrategy.com",
              "founder": {
                "@type": "Person",
                "name": "Juan Arango",
                "jobTitle": "Consultor de Ingeniería de Escalamiento",
                "description": "Más de 20 años de experiencia en estrategias de e-commerce, escalando negocios que han facturado millones"
              },
              "serviceType": [
                "Consultoría en arquitectura headless",
                "Automatización de procesos con IA",
                "Ingeniería de escalamiento",
                "Transformación digital B2B"
              ],
              "areaServed": "Worldwide",
              "priceRange": "$$$"
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
