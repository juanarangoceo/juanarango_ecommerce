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

const pSEOVariables = {
  ciudad: "Bogota",
  departamento: "Colombia",
  nicho: "inmobiliarias",
  nichoPlural: "inmobiliarias",
  subtituloContextual:
    "En Bogota, la competencia inmobiliaria ha crecido un 35% en el ultimo ano. Las inmobiliarias que no digitalizan su catalogo y procesos estan perdiendo compradores frente a competidores con presencia online superior.",
  textoAutoridad:
    "Especialistas en presencia digital para inmobiliarias en Colombia",
  mencionLocal:
    "Nuestra tecnologia esta disenada para las exigencias del mercado inmobiliario en Bogota",
  parrafoValor: `El mercado inmobiliario en Bogota enfrenta una transformacion sin precedentes. Con miles de propiedades compitiendo por la atencion de compradores cada vez mas exigentes, la diferenciacion ya no esta solo en la ubicacion o el precio, sino en como presentas tu inventario y que tan facil es para un comprador encontrarte.

Los compradores de hoy investigan online semanas antes de contactar a una inmobiliaria. Comparan fichas tecnicas, revisan fotos, exploran ubicaciones en Google Maps y leen resenas. Si tu presencia digital no transmite el profesionalismo que tu inmobiliaria representa, estas perdiendo compradores antes de que siquiera te consideren.

Las inmobiliarias que estan ganando en Bogota son aquellas que invierten en experiencias digitales impecables: catalogos que cargan instantaneamente, fichas de propiedades con toda la informacion relevante, y una presencia online que convierte visitantes curiosos en prospectos calificados que llaman listos para agendar visitas.`,
}

export default function NitroCommerceLanding() {
  return (
    <main className="min-h-screen bg-background">
      {/* TOFU - Awareness */}
      <Navbar />
      <HeroSection pSEO={pSEOVariables} />
      <MetricsSection />

      {/* MOFU - Consideration */}
      <LocalValueSection pSEO={pSEOVariables} />
      <ProblemSection pSEO={pSEOVariables} />
      <SolutionSection pSEO={pSEOVariables} />
      <BenefitsSection pSEO={pSEOVariables} />

      {/* BOFU - Decision */}
      <ProcessSection />
      <TestimonialsSection pSEO={pSEOVariables} />
      <FAQSection />
      <CTASection pSEO={pSEOVariables} />
      <Footer />
    </main>
  )
}
