import { Hero } from "@/components/nitro-strategy/hero"
import { PainPoints } from "@/components/nitro-strategy/pain-points"
import { Services } from "@/components/nitro-strategy/services"
import { About } from "@/components/nitro-strategy/about"
import { Methodology } from "@/components/nitro-strategy/methodology"
import { Results } from "@/components/nitro-strategy/results"
import { FAQ } from "@/components/nitro-strategy/faq"
import { UrgencyBanner } from "@/components/nitro-strategy/urgency-banner"
import { CTAForm } from "@/components/nitro-strategy/cta-form"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consultoría en Arquitectura Headless y Escalamiento | Nitro Strategy',
  description: 'Ingeniería de alto nivel para empresas que necesitan escalar. Consultoría en arquitectura headless, automatización con IA y optimización de infraestructura.',
  keywords: ['arquitectura headless', 'escalamiento e-commerce', 'automatización IA', 'consultoría técnica', 'Juan Arango'],
}

export default function NitroStrategyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <PainPoints />
      <Services />
      <About />
      <Methodology />
      <Results />
      <FAQ />
      <UrgencyBanner />
      <CTAForm />
    </main>
  )
}
