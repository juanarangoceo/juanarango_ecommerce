import { SITE_URL, type Guide } from "@/lib/guias/queries";
import { guidePath, type getGuideHub } from "@/lib/guias/hubs";

type Hub = NonNullable<ReturnType<typeof getGuideHub>>;

// Persona y organización ya están declaradas en el layout de (main); aquí solo
// se referencian por @id para que buscadores y agentes unan autoría y marca.
const PERSON = { "@id": `${SITE_URL}/#person` };
const ORGANIZATION = { "@id": `${SITE_URL}/#organization` };

export function guideBreadcrumbs(hub: Hub, guide?: Pick<Guide, "title" | "slug" | "tipo">) {
  const items = [
    { name: "Inicio", path: "/" },
    { name: "Guías", path: "/guias" },
    { name: hub.title, path: guidePath(hub.slug) },
  ];
  if (guide && guide.tipo !== "pilar") items.push({ name: guide.title, path: guidePath(hub.slug, guide.slug) });
  return items;
}

export function guideJsonLd(hub: Hub, guide: Guide) {
  const url = `${SITE_URL}${guidePath(hub.slug, guide.slug, guide.tipo)}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.title,
      description: guide.metaDescription,
      abstract: guide.respuestaCorta,
      url,
      mainEntityOfPage: url,
      inLanguage: "es-CO",
      datePublished: guide.publishedAt,
      dateModified: guide.revisadoEn,
      author: PERSON,
      publisher: ORGANIZATION,
      image: `${SITE_URL}/api/og?title=${encodeURIComponent(guide.title)}&category=${encodeURIComponent("Guías")}`,
      keywords: guide.busquedaObjetivo,
      about: { "@type": "Thing", name: hub.headline },
      ...(guide.tipo !== "pilar" && { isPartOf: { "@type": "CollectionPage", "@id": `${SITE_URL}${guidePath(hub.slug)}#hub`, name: hub.headline } }),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: guideBreadcrumbs(hub, guide).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
      })),
    },
  ];
  if (guide.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function hubCollectionJsonLd(hub: Hub, guides: { title: string; slug: string; tipo: string }[]) {
  const url = `${SITE_URL}${guidePath(hub.slug)}`;
  return {
    "@type": "CollectionPage",
    "@id": `${url}#hub`,
    name: hub.headline,
    description: hub.description,
    url,
    inLanguage: "es-CO",
    publisher: ORGANIZATION,
    hasPart: guides
      .filter((guide) => guide.tipo !== "pilar")
      .map((guide) => ({ "@type": "Article", headline: guide.title, url: `${SITE_URL}${guidePath(hub.slug, guide.slug)}` })),
  };
}

// Un "</script>" dentro de un texto de Sanity cerraría la etiqueta antes de tiempo.
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
