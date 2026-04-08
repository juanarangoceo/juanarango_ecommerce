import { Metadata } from 'next';
import { TickerBar } from './_components/ticker-bar';
import { HeroSection } from './_components/hero-section';
import { ShopifyReality } from './_components/shopify-reality';
import { PainCycle } from './_components/pain-cycle';
import { ComparisonTable } from './_components/comparison-table';
import { TechStack } from './_components/tech-stack';
import { PensumSection } from './_components/pensum-section';
import { ShowcaseCarousel } from './_components/showcase-carousel';
import { AudienceFilter } from './_components/audience-filter';
import { SocialProof } from './_components/social-proof';
import { VIPSection } from './_components/vip-section';
import { PricingSection } from './_components/pricing-section';
import { FAQSection } from './_components/faq-section';
import { CTASection } from './_components/cta-section';

export const metadata: Metadata = {
  title: 'Nitro Dropshipping | Academia',
  description: 'Aprende a desplegar tiendas ultrarrápidas con IA y Vercel sin pagar mensualidades a Shopify.',
};

export default function NitroDropshippingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <TickerBar />
      <HeroSection />
      <PainCycle />
      <ShopifyReality />
      <ComparisonTable />
      <TechStack />
      <PensumSection />
      <ShowcaseCarousel />
      <AudienceFilter />
      <SocialProof />
      <VIPSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
