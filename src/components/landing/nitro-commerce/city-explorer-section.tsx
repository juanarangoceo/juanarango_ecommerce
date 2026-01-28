import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/spotlight-card'

interface PSEOPage {
  slug: string
  ciudad: string
  nicho: string
  departamento: string
}

async function getPSEOPages(): Promise<PSEOPage[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, ciudad, nicho, departamento')
    .order('ciudad', { ascending: true })

  return data || []
}

export async function CityExplorerSection() {
  const pages = await getPSEOPages()

  if (pages.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-zinc-950/50 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explora Soluciones por <span className="text-primary">Ciudad</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Descubre cómo NitroCommerce impulsa negocios en diferentes ciudades y sectores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/soluciones/nitro-commerce/${page.slug}`}
              className="group"
            >
              <SpotlightCard className="p-6 bg-zinc-900/50 border-white/5 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {page.ciudad}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      {page.nicho} • {page.departamento}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      Ver solución
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
