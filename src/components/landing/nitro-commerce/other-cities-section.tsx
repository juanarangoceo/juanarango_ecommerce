import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

interface PSEOPage {
  slug: string
  ciudad: string
  nicho: string
}

interface OtherCitiesProps {
  currentSlug: string
}

async function getPSEOPages(excludeSlug: string): Promise<PSEOPage[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, ciudad, nicho')
    .neq('slug', excludeSlug)
    .limit(3)

  return data || []
}

export async function OtherCitiesSection({ currentSlug }: OtherCitiesProps) {
  const otherPages = await getPSEOPages(currentSlug)

  if (otherPages.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-zinc-950/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          También disponible en otras <span className="text-primary">ciudades</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {otherPages.map((page) => (
            <Link
              key={page.slug}
              href={`/soluciones/nitro-commerce/${page.slug}`}
              className="group p-4 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {page.ciudad}
                  </h3>
                  <p className="text-sm text-zinc-500">{page.nicho}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
