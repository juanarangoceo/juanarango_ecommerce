import { Metadata } from 'next';
import GuideInteractiveViewer from './_components/GuideInteractiveViewer';
import { guideSteps } from '@/lib/guias/guide-content';

export const metadata: Metadata = {
  title: 'Guía Definitiva Shopify 2024 | Nitro Ecom',
  description: 'Aprende paso a paso cómo crear y configurar tu tienda Shopify desde cero. Guía completa con prompts de IA, estrategias y configuración.',
  openGraph: {
    title: 'Guía Definitiva Shopify 2024 | Nitro Ecom',
    description: 'La hoja de ruta paso a paso para crear tu imperio en e-commerce con Shopify.',
    url: 'https://nitro-commerce.com/guias/shopify',
    siteName: 'Nitro Commerce',
    locale: 'es_ES',
    type: 'article',
  },
};

export default function ShopifyGuidePage() {
  // Generar Schema de HowTo dinámicamente basado en los steps
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo crear una tienda en Shopify paso a paso",
    "description": "Guía completa para configurar, diseñar y lanzar una tienda online en Shopify exitosamente.",
    "step": guideSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description,
      "url": `https://nitro-commerce.com/guias/shopify#${step.id}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* 
        This wrapper has pt-24/pt-28 to account for the fixed Navbar.
        The wrapper itself uses full height to let the interactive viewer handle the layout.
      */}
      <div className="bg-slate-50 relative">
        <div className="pt-[72px] lg:pt-24 min-h-screen">
          <GuideInteractiveViewer />
        </div>
      </div>
    </>
  );
}
