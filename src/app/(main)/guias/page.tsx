import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Braces, Bot, ShoppingBag, Workflow } from "lucide-react";
import { PageIntro } from "@/components/commercial/page-intro";
import { WhatsAppLogo } from "@/components/commercial/brand-logos";
import { GUIDE_HUBS, guidePath } from "@/lib/guias/hubs";
import { getAllGuides } from "@/lib/guias/queries";

// Los hubs aparecen solo cuando su guía pilar está publicada en Sanity.
export const revalidate = 3600;

export const metadata: Metadata = { title: "Guías para vender por WhatsApp, ecommerce e IA", description: "Guías prácticas para vender por WhatsApp en Colombia y tomar mejores decisiones en ecommerce, automatización e inteligencia artificial.", alternates: { canonical: "https://www.juanarangoecommerce.com/guias" } };

const guides = [
  { title: "Shopify desde cero", description: "Una guía paso a paso para entender la plataforma, configurar una tienda y tomar decisiones con mejor contexto.", href: "/guias/shopify", icon: ShoppingBag, meta: "Ecommerce" },
  { title: "Model Context Protocol", description: "Qué es MCP, cómo conecta modelos con herramientas y qué debes revisar antes de implementarlo.", href: "/guias/mcp", icon: Workflow, meta: "IA aplicada" },
  { title: "Claude Code", description: "Conceptos, configuración y patrones para integrar un agente de código en un flujo de trabajo real.", href: "/guias/claude-code", icon: Braces, meta: "Desarrollo" },
  { title: "OpenClaw AI", description: "Una introducción práctica a sus agentes, Skills y flujos de automatización.", href: "/guias/openclaw-ai", icon: Bot, meta: "Agentes" },
] as const;

export default async function GuiasIndexPage() {
  const published = await getAllGuides().catch(() => []);
  const hubs = GUIDE_HUBS.map((hub) => ({ ...hub, articles: published.filter((guide) => guide.hub === hub.slug && guide.tipo === "articulo").length }))
    .filter((hub) => published.some((guide) => guide.hub === hub.slug && guide.tipo === "pilar"));

  return (
    <div className="pb-24 lg:pb-32">
      <PageIntro align="center" title={<>Aprende lo suficiente para <span className="text-primary">decidir mejor.</span></>} description="Guías prácticas para vender por WhatsApp, ecommerce, tecnología e IA. Cada una desarrolla su propio tema sin perder claridad, contexto ni criterio de implementación." />
      {hubs.map((hub) => (
        <section key={hub.slug} className="px-5 pb-16 lg:px-8 lg:pb-20">
          <Link href={guidePath(hub.slug)} className="group relative mx-auto flex max-w-7xl flex-col gap-8 overflow-hidden rounded-[2rem] border border-primary/20 bg-[#0b0f0c] p-8 transition-[border-color,transform] hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
            <span className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-primary/[0.09] blur-[90px]" />
            <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            <span className="relative max-w-3xl">
              <WhatsAppLogo className="size-9" />
              <span className="mt-6 block text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-5xl">{hub.headline}</span>
              <span className="mt-4 block text-base leading-7 text-white/58">{hub.description}</span>
            </span>
            <span className="relative inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
              {hub.articles > 0 ? `Ver las ${hub.articles + 1} guías` : "Abrir la guía"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      ))}
      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24">{hubs.length > 0 && <h2 className="mx-auto mb-8 max-w-7xl text-2xl font-semibold tracking-[-0.03em] text-white">Tecnología e IA</h2>}<div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">{guides.map(({ title, description, href, icon: Icon, meta }) => <Link key={href} href={href} className="group relative flex min-h-[20rem] flex-col overflow-hidden rounded-[2rem] border border-white/9 bg-[#0d110e] p-8 transition-[border-color,transform,background-color] hover:-translate-y-1 hover:border-primary/35 hover:bg-[#101611] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"><span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" /><div className="flex items-start justify-between"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/9 text-primary"><Icon className="size-6" /></span><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">{meta}</span></div><h2 className="mt-8 text-3xl font-bold text-white">{title}</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/50">{description}</p><span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary">Abrir guía <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></section>
      <section className="px-5 pt-16 text-center lg:px-8 lg:pt-24"><BookOpen className="mx-auto size-7 text-primary" /><h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-3xl font-bold text-white sm:text-5xl">El contenido debe ayudarte a actuar, no solo a acumular pestañas.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/50">Explora una guía completa o visita el blog para encontrar análisis más breves y recientes.</p><Link href="/blog" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver el blog <ArrowRight className="size-4" /></Link></section>
    </div>
  );
}
