import { Metadata } from 'next';
import { CTAForm } from '@/components/nitro-search/cta-form';
import { Hero } from '@/components/nitro-search/hero';
import { Features } from '@/components/nitro-search/features';
import { Process } from '@/components/nitro-search/process';
import { FAQ } from '@/components/nitro-search/faq';
import { NewsletterForm } from '@/components/newsletter-form';

export const metadata: Metadata = {
  title: 'Nitro Search | Posicionamiento SEO e Inteligencia Artificial',
  description: 'Auditoría SEO, optimización SGE (Search Generative Experience) y crecimiento orgánico para e-commerce y empresas.',
  keywords: ['agencia SEO', 'SEO para ecommerce', 'posicionamiento SGE', 'SEO técnico', 'auditoría web', 'Juan Arango SEO'],
  alternates: {
    canonical: 'https://www.juanarangoecommerce.com/soluciones/nitro-search'
  }
};

export default function NitroSearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Process />
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
