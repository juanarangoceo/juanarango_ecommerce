import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Script from 'next/script'
import { constructMetadata } from '@/lib/utils'
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
import { OtherCitiesSection } from '@/components/landing/nitro-commerce/other-cities-section'

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
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPSEOPage(slug)

  if (!page) {
    return {
      title: 'Página no encontrada',
    }
  }

  // SEO-optimized title and description for local search
  const title = `Marketing para ${page.nicho_plural} en ${page.ciudad} | Nitro Commerce`
  const description = `Impulsa tu ${page.nicho.toLowerCase()} en ${page.ciudad}, ${page.departamento} con NitroCommerce. ${page.subtitulo_contextual} Infraestructura digital de alto rendimiento para ${page.nicho_plural.toLowerCase()}.`

  return constructMetadata({
    title,
    description,
    canonical: `https://www.juanarangoecommerce.com/soluciones/nitro-commerce/${slug}`,
  })
}

export default async function NitroCommercePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPSEOPage(slug)

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

  // JSON-LD Structured Data for Local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": `Marketing Digital para ${page.nicho_plural}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Nitro Commerce",
      "description": `Servicios de marketing digital y desarrollo web para ${page.nicho_plural.toLowerCase()} en ${page.ciudad}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": page.ciudad,
        "addressRegion": page.departamento,
        "addressCountry": "CO"
      },
      "areaServed": {
        "@type": "City",
        "name": page.ciudad,
        "containedIn": {
          "@type": "State",
          "name": page.departamento
        }
      },
      "url": `https://www.juanarangoecommerce.com/soluciones/nitro-commerce/${slug}`,
      "telephone": "+573146681896",
      "priceRange": "$$",
      "image": "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
    },
    "areaServed": {
      "@type": "City",
      "name": page.ciudad
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://www.juanarangoecommerce.com/soluciones/nitro-commerce/${slug}`
    }
  }

  return (
    <>
      {/* JSON-LD Structured Data for Local SEO */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <main className="min-h-screen bg-background">
        <HeroSection pSEO={pSEOVariables} />
        <MetricsSection />
        <LocalValueSection pSEO={pSEOVariables} />
        <ProblemSection pSEO={pSEOVariables} />
        <SolutionSection pSEO={pSEOVariables} />
        <BenefitsSection pSEO={pSEOVariables} />
        <ProcessSection />
        <TestimonialsSection pSEO={pSEOVariables} />
        <OtherCitiesSection currentSlug={slug} />
        <FAQSection />
        <CTASection pSEO={pSEOVariables} />
      </main>
    </>
  )
}
