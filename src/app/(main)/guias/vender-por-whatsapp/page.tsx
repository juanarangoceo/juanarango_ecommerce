import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle, GuideCard } from "@/components/guias/guide-article";
import { hubCollectionJsonLd } from "@/lib/guias/json-ld";
import { GUIDE_GROUPS, getGuideHub, guidePath } from "@/lib/guias/hubs";
import { SITE_URL, getGuide, getHubGuides } from "@/lib/guias/queries";
import { constructMetadata } from "@/lib/utils";

// El webhook de Sanity revalida al publicar; esta hora es la red de seguridad.
export const revalidate = 3600;

const hub = getGuideHub("vender-por-whatsapp")!;

export async function generateMetadata(): Promise<Metadata> {
  const pilar = await getGuide(hub.slug, { pilar: true });
  if (!pilar) return { title: hub.headline, robots: { index: false } };
  return constructMetadata({
    title: pilar.title,
    description: pilar.metaDescription,
    image: `${SITE_URL}/api/og?title=${encodeURIComponent(pilar.title)}&category=${encodeURIComponent("Guías")}`,
    canonical: `${SITE_URL}${guidePath(hub.slug)}`,
  });
}

export default async function VenderPorWhatsAppHub() {
  const [pilar, guides] = await Promise.all([getGuide(hub.slug, { pilar: true }), getHubGuides(hub.slug)]);
  // Sin guía pilar publicada el hub no existe: evita indexar una página vacía.
  if (!pilar) notFound();

  const articles = guides.filter((guide) => guide.tipo === "articulo");
  const groups = GUIDE_GROUPS.map((group) => ({ ...group, guides: articles.filter((guide) => guide.grupo === group.value) })).filter((group) => group.guides.length);

  return (
    <GuideArticle hub={hub} guide={pilar} extraJsonLd={hubCollectionJsonLd(hub, guides)}>
      {groups.length > 0 && (
        <section aria-labelledby="todas-las-guias" className="mt-16">
          <h2 id="todas-las-guias" className="text-3xl font-semibold tracking-[-0.035em] text-white">Todas las guías</h2>
          <div className="mt-8 space-y-10">
            {groups.map((group) => (
              <div key={group.value}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/45">{group.title}</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {group.guides.map((guide) => <GuideCard key={guide._id} hub={hub.slug} guide={guide} />)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </GuideArticle>
  );
}
