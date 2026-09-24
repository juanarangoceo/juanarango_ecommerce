import { Metadata } from 'next';
import { TickerBar } from './_components/ticker-bar';
import { HeroSection } from './_components/hero-section';
import { ShopifyReality } from './_components/shopify-reality';
import { PainCycle } from './_components/pain-cycle';
import { TechStack } from './_components/tech-stack';
import { PensumSection } from './_components/pensum-section';
import { ShowcaseCarousel } from './_components/showcase-carousel';
import { AudienceFilter } from './_components/audience-filter';
import { VIPSection } from './_components/vip-section';
import { PricingSection } from './_components/pricing-section';
import { FAQSection } from './_components/faq-section';
import { CTASection } from './_components/cta-section';

export const metadata: Metadata = {
  title: 'Nitro Dropshipping | Academia',
  description: 'Aprende a prototipar y desplegar una tienda con IA, Next.js y servicios cloud, entendiendo sus decisiones técnicas y operativas.',
};

export default function NitroDropshippingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <TickerBar />
      <HeroSection />
      <PainCycle />
      <ShopifyReality />
      <TechStack />
      <PensumSection />
      <ShowcaseCarousel />
      <AudienceFilter />
      <VIPSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
