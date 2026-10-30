import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guias/guide-article";
import { getGuideHub, guidePath } from "@/lib/guias/hubs";
import { SITE_URL, getGuide, getHubGuides } from "@/lib/guias/queries";
import { constructMetadata } from "@/lib/utils";

// Las guías publicadas después del build se generan a demanda y quedan en caché.
export const revalidate = 3600;
export const dynamicParams = true;

const hub = getGuideHub("vender-por-whatsapp")!;

type Props = { params: Promise<{ tema: string }> };

export async function generateStaticParams() {
  const guides = await getHubGuides(hub.slug);
  return guides.filter((guide) => guide.tipo === "articulo").map((guide) => ({ tema: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tema } = await params;
  const guide = await getGuide(hub.slug, { slug: tema });
  if (!guide) return { title: "Guía no encontrada" };
  return constructMetadata({
    title: guide.title,
    description: guide.metaDescription,
    image: `${SITE_URL}/api/og?title=${encodeURIComponent(guide.title)}&category=${encodeURIComponent("Guías")}`,
    canonical: `${SITE_URL}${guidePath(hub.slug, guide.slug)}`,
  });
}

export default async function VenderPorWhatsAppGuide({ params }: Props) {
  const { tema } = await params;
  const guide = await getGuide(hub.slug, { slug: tema });
  if (!guide) notFound();
  return <GuideArticle hub={hub} guide={guide} />;
}
