import { Metadata } from 'next';
import { CTAForm } from '@/components/nitro-bot/cta-form';
import { Hero } from '@/components/nitro-bot/hero';
import { Features } from '@/components/nitro-bot/features';
import { HowItWorks } from '@/components/nitro-bot/how-it-works';
import { FAQ } from '@/components/nitro-bot/faq';
import { NewsletterForm } from '@/components/newsletter-form';

export const metadata: Metadata = {
  title: 'Nitro Bot | Agentes de Inteligencia Artificial para E-commerce',
  description: 'Automatiza el 80% de tus ventas y atención al cliente con agentes de Inteligencia Artificial omnicanal para WhatsApp, Web y Redes Sociales.',
  keywords: ['chatbot automatización', 'IA para ecommerce', 'agentes conversacionales', 'soporte al cliente IA', 'bots WhatsApp business', 'Juan Arango IA'],
  alternates: {
    canonical: 'https://www.juanarangoecommerce.com/soluciones/nitro-bot'
  }
};

export default function NitroBotPage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      
      <CTAForm />

      {/* ===== NEWSLETTER SUBSCRIPTION ===== */}
      <section className="py-20 px-6 bg-black border-t border-white/5">
        <div className="container mx-auto max-w-xl">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
