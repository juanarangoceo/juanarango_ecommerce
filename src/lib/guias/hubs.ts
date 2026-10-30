// Hubs editoriales de /guias. Datos puros: los usan el esquema de Sanity
// (Studio) y las páginas del sitio, así que este archivo no importa nada.

export const GUIDE_HUBS = [
  {
    slug: "vender-por-whatsapp",
    title: "Vender por WhatsApp",
    headline: "Cómo vender por WhatsApp en Colombia",
    description:
      "Guías prácticas para tiendas colombianas: atender, cobrar con Nequi o PSE, confirmar pedidos contraentrega, avisar envíos y cumplir las reglas de Meta.",
  },
] as const;

export type GuideHubSlug = (typeof GUIDE_HUBS)[number]["slug"];

export const GUIDE_GROUPS = [
  { value: "empezar", title: "Empezar" },
  { value: "atender", title: "Atender" },
  { value: "cobrar", title: "Cobrar" },
  { value: "envios", title: "Envíos" },
  { value: "reglas-meta", title: "Reglas de Meta" },
  { value: "automatizar", title: "Automatizar" },
] as const;

export function getGuideHub(slug: string) {
  return GUIDE_HUBS.find((hub) => hub.slug === slug);
}

export function guideGroupTitle(value?: string | null) {
  return GUIDE_GROUPS.find((group) => group.value === value)?.title;
}

export function guidePath(hub: string, slug?: string, tipo?: string) {
  return tipo === "pilar" || !slug ? `/guias/${hub}` : `/guias/${hub}/${slug}`;
}
