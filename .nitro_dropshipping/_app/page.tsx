import { TickerBar } from "@/components/landing/ticker-bar"
import { HeroSection } from "@/components/landing/hero-section"
import { ShopifyReality } from "@/components/landing/shopify-reality"
import { PainCycle } from "@/components/landing/pain-cycle"
import { ComparisonTable } from "@/components/landing/comparison-table"
import { TechStack } from "@/components/landing/tech-stack"
import { ShowcaseCarousel } from "@/components/landing/showcase-carousel"
import { AudienceFilter } from "@/components/landing/audience-filter"
import { SocialProof } from "@/components/landing/social-proof"
import { VIPSection } from "@/components/landing/vip-section"
import { CTASection } from "@/components/landing/cta-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FAQSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main>
      <TickerBar />
      <HeroSection />
      <ShopifyReality />
      <PainCycle />
      <section id="comparativa">
        <ComparisonTable />
      </section>
      <section id="metodo">
        <TechStack />
      </section>
      <ShowcaseCarousel />
      <AudienceFilter />
      <SocialProof />
      <section id="comunidad">
        <VIPSection />
      </section>
      <CTASection />
      <PricingSection />
      <section id="faq">
        <FAQSection />
      </section>
      <Footer />
    </main>
  )
}
