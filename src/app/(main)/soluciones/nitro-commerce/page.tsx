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

// Configure ISR - revalidate every 60 seconds for faster updates
export const revalidate = 60

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseKey)
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

// Fetch generic page data
async function getGenericPage(): Promise<PSEOPage | null> {
  const supabase = getSupabaseClient()
  
  // Hardcoded slug for the generic global page - Update: User manually changed this in Supabase
  const genericSlug = 'alto-rendimiento-empresas-mundial'

  const { data, error } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('slug', genericSlug)
    .single()

  if (error || !data) {
    console.error('Error fetching generic page:', error)
    return null
  }

  return data as PSEOPage
}

export const metadata: Metadata = {
  title: 'NitroCommerce | Infraestructura para Clínicas Estéticas',
  description: 'La infraestructura digital que escala tu clínica estética a niveles internacionales.',
}

export default async function NitroCommerceIndexPage() {
  const page = await getGenericPage()

  if (!page) {
    notFound()
  }

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
    </main>
  )
}
