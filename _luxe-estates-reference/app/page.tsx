import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PropertiesGrid } from "@/components/properties-grid";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PropertiesGrid />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  );
}
