import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Braces, Bot, ShoppingBag, Workflow } from "lucide-react";
import { PageIntro } from "@/components/commercial/page-intro";

export const metadata: Metadata = { title: "Guías de ecommerce, tecnología e IA", description: "Guías prácticas para entender herramientas y tomar mejores decisiones en ecommerce, automatización e inteligencia artificial.", alternates: { canonical: "https://www.juanarangoecommerce.com/guias" } };

const guides = [
  { title: "Shopify desde cero", description: "Una guía paso a paso para entender la plataforma, configurar una tienda y tomar decisiones con mejor contexto.", href: "/guias/shopify", icon: ShoppingBag, meta: "Ecommerce" },
  { title: "Model Context Protocol", description: "Qué es MCP, cómo conecta modelos con herramientas y qué debes revisar antes de implementarlo.", href: "/guias/mcp", icon: Workflow, meta: "IA aplicada" },
  { title: "Claude Code", description: "Conceptos, configuración y patrones para integrar un agente de código en un flujo de trabajo real.", href: "/guias/claude-code", icon: Braces, meta: "Desarrollo" },
  { title: "OpenClaw AI", description: "Una introducción práctica a sus agentes, Skills y flujos de automatización.", href: "/guias/openclaw-ai", icon: Bot, meta: "Agentes" },
] as const;

export default function GuiasIndexPage() {
  return (
    <div className="pb-24 lg:pb-32">
      <PageIntro align="center" title={<>Aprende lo suficiente para <span className="text-primary">decidir mejor.</span></>} description="Guías prácticas sobre ecommerce, tecnología e IA. Cada una desarrolla su propio tema sin perder claridad, contexto ni criterio de implementación." />
      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">{guides.map(({ title, description, href, icon: Icon, meta }) => <Link key={href} href={href} className="group relative flex min-h-[20rem] flex-col overflow-hidden rounded-[2rem] border border-white/9 bg-[#0d110e] p-8 transition-[border-color,transform,background-color] hover:-translate-y-1 hover:border-primary/35 hover:bg-[#101611] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"><span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" /><div className="flex items-start justify-between"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/9 text-primary"><Icon className="size-6" /></span><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">{meta}</span></div><h2 className="mt-8 text-3xl font-bold text-white">{title}</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/50">{description}</p><span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary">Abrir guía <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></section>
      <section className="px-5 pt-16 text-center lg:px-8 lg:pt-24"><BookOpen className="mx-auto size-7 text-primary" /><h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-3xl font-bold text-white sm:text-5xl">El contenido debe ayudarte a actuar, no solo a acumular pestañas.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/50">Explora una guía completa o visita el blog para encontrar análisis más breves y recientes.</p><Link href="/blog" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver el blog <ArrowRight className="size-4" /></Link></section>
    </div>
  );
}
