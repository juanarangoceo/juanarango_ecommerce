import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSection } from "@/components/landing/problem-section"
import { SolutionSection } from "@/components/landing/solution-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { MetricsSection } from "@/components/landing/metrics-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { ProcessSection } from "@/components/landing/process-section"
import { FAQSection } from "@/components/landing/faq-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"
import { LocalValueSection } from "@/components/landing/local-value-section"

// ============================================
// pSEO DYNAMIC VARIABLES
// ============================================
// Replace these values programmatically for each city/niche page
// Format: {{variable_name}} for automation systems
// ============================================

const pSEOVariables = {
  // Location Variables
  ciudad: "Bogotá",           // {{ciudad}} - City name
  departamento: "Colombia",    // {{departamento}} - State/Region
  
  // Industry Variables  
  nicho: "clínicas estéticas", // {{nicho}} - Business niche
  nichoPlural: "clínicas",     // {{nicho_plural}} - Plural form
  
  // Dynamic Content
  subtituloContextual: "En Bogotá, la competencia en el sector de clínicas estéticas ha crecido un 40% en el último año. Las empresas que no digitalizan sus procesos están perdiendo pacientes frente a competidores con presencia online superior.",
  
  // Localized Social Proof
  textoAutoridad: "Especialistas en transformar negocios digitales en Colombia",
  mencionLocal: "Nuestra tecnología está diseñada para las exigencias del mercado en Bogotá",
  
  // AI-Generated Value Paragraph (200-300 words)
  parrafoValor: `El sector de clínicas estéticas en Bogotá enfrenta desafíos únicos que requieren soluciones digitales especializadas. Con más de 2,000 clínicas compitiendo en la capital colombiana, la diferenciación ya no está solo en los servicios que ofreces, sino en cómo los presentas y qué tan fácil es para tus pacientes encontrarte y agendar.

Los pacientes de hoy investigan online antes de tomar cualquier decisión. Si tu página carga lento, si tu sistema de citas es confuso, o si tu presencia digital no transmite la confianza y profesionalismo que tu clínica representa, estás perdiendo pacientes antes de que siquiera te consideren.

Las clínicas que están ganando en Bogotá son aquellas que han invertido en experiencias digitales impecables: sitios web que cargan instantáneamente, sistemas de agendamiento que funcionan 24/7, y presencia online que convierte visitantes curiosos en pacientes agendados. No se trata de tener "un sitio web bonito" — se trata de tener una máquina de captación que trabaja para ti mientras duermes.`,
}

export default function NitroCommerceLanding() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
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
      <Footer />
    </main>
  )
}
