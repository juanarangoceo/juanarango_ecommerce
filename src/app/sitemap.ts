import { MetadataRoute } from 'next'
import { client } from "@/sanity/lib/client"

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.juanarangoecommerce.com'

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/blog',
    '/soluciones/clinicas',
    '/demos/aura-stetic',
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

  // 3. Fetch pSEO Pages from Supabase
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: pseoPages } = await supabase
    .from('pseo_pages')
    .select('slug, updated_at')

  const pseoRoutes = (pseoPages || []).map((page: any) => ({
    url: `${baseUrl}/soluciones/nitro-commerce/${page.slug}`,
    lastModified: new Date(page.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes, ...pseoRoutes]
}
