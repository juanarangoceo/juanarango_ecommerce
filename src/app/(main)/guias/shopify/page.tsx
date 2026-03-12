import { Metadata } from 'next';
import GuideInteractiveViewer from './_components/GuideInteractiveViewer';
import { guideSteps } from '@/lib/guias/guide-content';
import { LatestNewsColumn } from '../_components/LatestNewsColumn';
import { client } from '@/sanity/lib/client';

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

const SHOPIFY_POSTS_QUERY = `
  *[_type == "post" && (
    "shopify" in tags[] ||
    "Shopify" in tags[] ||
    "sidekick" in tags[] ||
    "shopify-plus" in tags[] ||
    "liquid" in tags[] ||
    "ecommerce" in tags[] ||
    "Ecommerce" in tags[]
  ) && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) [0...5] {
    _id,
    title,
    slug,
    publishedAt,
    _createdAt,
    mainImage,
    excerpt
  }
`;



export default async function ShopifyGuidePage() {
  const posts = await client.fetch<any[]>(SHOPIFY_POSTS_QUERY);

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
      <div className="bg-slate-50 relative min-h-screen pt-[72px] lg:pt-24 pb-12">
        <div className="max-w-[1600px] mx-auto xl:px-8">
          <div className="flex flex-col xl:flex-row items-stretch gap-6">
            
            {/* Guide Interactive Viewer - Takes main space */}
            <div className="flex-1 bg-white xl:rounded-3xl xl:shadow-sm overflow-hidden border-x xl:border border-slate-200">
              <GuideInteractiveViewer />
            </div>

            {/* Latest News Sidebar - Fixed width on Desktop, Stacked on Mobile */}
            <div className="w-full xl:w-[320px] shrink-0 px-4 xl:px-0 pb-12 xl:pb-0">
              <div className="sticky top-28">
                <LatestNewsColumn 
                  posts={posts} 
                  tagLink="/blog/tags/shopify" 
                  theme="light"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
