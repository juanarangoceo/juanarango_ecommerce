import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/nitro-commerce/hero-section'
import { MetricsSection } from '@/components/landing/nitro-commerce/metrics-section'
import { LocalValueSection } from '@/components/landing/nitro-commerce/local-value-section'
import { ProblemSection } from '@/components/landing/nitro-commerce/problem-section'
import { SolutionSection } from '@/components/landing/nitro-commerce/solution-section'
import { BenefitsSection } from '@/components/landing/nitro-commerce/benefits-section'
import { ProcessSection } from '@/components/landing/nitro-commerce/process-section'
import { TestimonialsSection } from '@/components/landing/nitro-commerce/testimonials-section'
import { FAQSection } from '@/components/landing/nitro-commerce/faq-section'
import { CTASection } from '@/components/landing/nitro-commerce/cta-section'
import { NitroFooter } from '@/components/landing/nitro-commerce/nitro-footer'

// Configure ISR - revalidate every hour
export const revalidate = 3600

// Allow dynamic routes that weren't pre-generated
export const dynamicParams = true

// Create Supabase client for server-side operations
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseKey)
}

// Generate static params for all pSEO pages at build time
export async function generateStaticParams() {
  const supabase = getSupabaseClient()
  
  const { data: pages } = await supabase
    .from('pseo_pages')
    .select('slug')

  if (!pages) return []

  return pages.map((page) => ({
    slug: page.slug,
  }))
}

interface PSEOPage {
  id: string
  slug: string
  nicho: string
  nicho_plural: string
  ciudad: string
  departamento: string
  subtitulo_contextual: string
  texto_autoridad: string
  mencion_local: string
  parrafo_valor: string
  demo_url: string | null
  config: Record<string, any>
}

// Fetch pSEO page data
async function getPSEOPage(slug: string): Promise<PSEOPage | null> {
  const supabase = getSupabaseClient()
  
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

  return data as PSEOPage
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getPSEOPage(params.slug)

  if (!page) {
    return {
      title: 'Página no encontrada',
    }
  }

  const title = `${page.nicho_plural} en ${page.ciudad} | NitroCommerce`
  const description = page.subtitulo_contextual

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_CO',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function NitroCommercePage({
  params,
}: {
  params: { slug: string }
}) {
  const page = await getPSEOPage(params.slug)

  if (!page) {
    notFound()
  }

  // Map database fields to pSEO variables
  const pSEOVariables = {
    ciudad: page.ciudad,
    departamento: page.departamento,
    nicho: page.nicho,
    nichoPlural: page.nicho_plural,
    subtituloContextual: page.subtitulo_contextual,
    textoAutoridad: page.texto_autoridad,
    mencionLocal: page.mencion_local,
    parrafoValor: page.parrafo_valor,
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection pSEO={pSEOVariables} />
      <MetricsSection />
      <LocalValueSection pSEO={pSEOVariables} />
      <ProblemSection pSEO={pSEOVariables} />
      <SolutionSection pSEO={pSEOVariables} />
      <BenefitsSection pSEO={pSEOVariables} />
      <ProcessSection />
      <TestimonialsSection pSEO={pSEOVariables} />
      <FAQSection />
      <CTASection pSEO={pSEOVariables} />
      <NitroFooter />
    </main>
  )
}
