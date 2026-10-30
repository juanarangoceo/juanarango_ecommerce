import type { PortableTextBlock } from "next-sanity";
import { client } from "@/sanity/lib/client";

export const SITE_URL = "https://www.juanarangoecommerce.com";

export type GuideFaq = { question: string; answer: string };

export type GuideSummary = {
  _id: string;
  title: string;
  slug: string;
  hub: string;
  tipo: "pilar" | "articulo";
  grupo?: string;
  orden?: number;
  respuestaCorta: string;
  publishedAt: string;
  revisadoEn: string;
};

export type Guide = GuideSummary & {
  puntosClave: string[];
  body: PortableTextBlock[];
  faq: GuideFaq[];
  busquedaObjetivo: string;
  metaDescription: string;
  bloqueNitro: { titulo: string; texto: string };
  relacionados: GuideSummary[];
};

// Solo documentos publicados. Los borradores de Studio nunca llegan al sitio.
const PUBLISHED = `_type == "guia" && defined(slug.current) && !(_id in path("drafts.**"))`;
const SUMMARY = `_id, title, "slug": slug.current, hub, tipo, grupo, orden, respuestaCorta, publishedAt, revisadoEn`;

export function getHubGuides(hub: string) {
  return client.fetch<GuideSummary[]>(
    `*[${PUBLISHED} && hub == $hub] | order(orden asc, publishedAt asc) { ${SUMMARY} }`,
    { hub },
  );
}

export function getAllGuides() {
  return client.fetch<(GuideSummary & { _updatedAt: string })[]>(
    `*[${PUBLISHED}] | order(hub asc, orden asc) { ${SUMMARY}, _updatedAt }`,
  );
}

export function getGuide(hub: string, filter: { slug: string } | { pilar: true }) {
  const match = "pilar" in filter ? `tipo == "pilar"` : `tipo == "articulo" && slug.current == $slug`;
  return client.fetch<Guide | null>(
    `*[${PUBLISHED} && hub == $hub && ${match}] | order(publishedAt desc)[0] {
      ${SUMMARY}, puntosClave, body, faq, busquedaObjetivo, metaDescription, bloqueNitro,
      "relacionados": relacionados[]->[${PUBLISHED}] { ${SUMMARY} }
    }`,
    { hub, slug: "slug" in filter ? filter.slug : "" },
  );
}
