import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/og'],
      // Studio de Sanity, herramientas internas, callbacks y APIs no son contenido.
      disallow: ['/studio', '/api/', '/auth/'],
    },
    sitemap: 'https://www.juanarangoecommerce.com/sitemap.xml',
  }
}
