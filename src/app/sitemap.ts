import { MetadataRoute } from 'next'
import { client } from "@/sanity/lib/client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://juanarango.com' // Placeholder, ideally from env

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/blog',
    '/soluciones/clinicas',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Fetch Blog Posts from Sanity
  // We query for all posts and their last updated date
  const posts = await client.fetch(`
    *[_type == "post"] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  const postRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
