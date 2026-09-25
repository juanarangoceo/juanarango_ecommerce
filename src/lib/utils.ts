import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ConstructMetadataProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  canonical?: string
}

export function constructMetadata({
  title = 'Juan Arango | E-commerce & Estrategia Digital',
  description = 'Experto en comercio electrónico, desarrollo web y estrategias de crecimiento digital.',
  image = '/og-nitro.png',
  noIndex = false,
  canonical,
}: ConstructMetadataProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: '%s | Juan Arango'
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      type: 'website',
      siteName: 'Juan Arango E-commerce',
      locale: 'es_CO',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@juanarangoecommerce',
    },
    metadataBase: new URL('https://www.juanarangoecommerce.com'),
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
