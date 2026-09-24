import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageCircleMore, MousePointerClick, ShoppingCart, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionCta } from "@/components/commercial/conversion-cta";

export const metadata: Metadata = {
  title: "NitroCommerce | Oportunidades para mejorar tu ecommerce",
  description: "Diagnóstico e implementación para convertir oportunidades de captación, conversión y operación en mejoras concretas.",
  alternates: { canonical: "https://www.juanarangoecommerce.com/soluciones/nitro-commerce" },
};

const opportunityAreas = [
  { icon: MousePointerClick, title: "Captación", text: "Conectar mejor la promesa con el tráfico que ya llega." },
  { icon: ShoppingCart, title: "Conversión", text: "Hacer más claro el recorrido hasta la compra o el contacto." },
  { icon: MessageCircleMore, title: "Atención", text: "Dar continuidad a las preguntas que frenan una decisión." },
  { icon: Workflow, title: "Operación", text: "Reducir tareas manuales y conectar mejor al equipo." },
] as const;

const workingPrinciples = [
  "Leemos datos, recorrido y operación en conjunto.",
  "Priorizamos por impacto, esfuerzo y dependencias reales.",
  "Implementamos una mejora verificable antes de sumar otra.",
] as const;

function PriorityReview() {
  return (
    <div className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#0d110e] p-6 shadow-[0_30px_90px_rgba(0,0,0,.35)] sm:p-8">
      <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="border-b border-white/8 pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">Primera revisión</p>
        <h2 className="mt-3 text-2xl font-bold text-white">De muchas ideas a una prioridad clara.</h2>
        <p className="mt-2 text-sm leading-6 text-white/48">No es un reporte decorativo. Es una conversación de decisión con una salida concreta.</p>
      </div>
      <div className="mt-3 divide-y divide-white/8">
        {[
          ["01", "Observamos", "Recorrido, datos disponibles y forma de operar."],
          ["02", "Comparamos", "Impacto, esfuerzo, riesgo y dependencias."],
          ["03", "Elegimos", "Una oportunidad y el siguiente cambio verificable."],
        ].map(([number, title, text]) => <div key={number} className="grid grid-cols-[2.25rem_1fr] gap-3 py-4"><span className="font-mono text-xs text-primary">{number}</span><div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-white/44">{text}</p></div></div>)}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-primary/18 bg-primary/6 p-4"><span className="size-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_rgba(183,255,42,.65)]" /><p className="text-xs font-medium leading-5 text-white/68">Salida: prioridad recomendada, alcance y plan de acción.</p></div>
    </div>
  );
}

export default function NitroCommercePage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="relative px-5 pb-18 pt-32 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="pointer-events-none absolute left-[8%] top-24 size-72 rounded-full bg-primary/[.055] blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,.92fr)_minmax(23rem,.78fr)] lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="font-display text-[clamp(2.8rem,4.7vw,4.9rem)] font-bold leading-[.96] tracking-[-.05em] text-white">Encuentra la oportunidad que puede mover <span className="text-primary">tu ecommerce ahora.</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-left text-lg leading-8 text-white/58 lg:mx-0">Reviso contigo captación, conversión, atención y operación. Elegimos dónde actuar primero y llevamos esa decisión hasta una implementación que tu equipo pueda sostener.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"><Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-bold"><Link href="/diagnostico">Descubrir mi oportunidad <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/15 bg-transparent px-7 text-white hover:bg-white/7 hover:text-white"><Link href="/soluciones">Comparar soluciones</Link></Button></div>
          </div>
          <PriorityReview />
        </div>
      </section>

      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-18 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div><h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">Cuatro áreas. <span className="text-primary">Una decisión conectada.</span></h2></div><p className="max-w-2xl text-base leading-7 text-white/52 lg:justify-self-end">Una oportunidad comercial puede crear carga operativa; una mejora técnica puede no cambiar la decisión del cliente. Por eso revisamos el sistema completo antes de priorizar.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {opportunityAreas.map(({ icon: Icon, title, text }) => <article key={title} className="group flex gap-5 rounded-3xl border border-white/9 bg-[#0d110e] p-6 sm:p-7"><span className="nitro-icon-mark flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/9 text-primary"><Icon className="nitro-icon-glyph size-5" /></span><div><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/48">{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start"><div><h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">Decidir, implementar y transferir.</h2><p className="mt-5 max-w-md text-base leading-7 text-white/52">NitroCommerce no termina en un diagnóstico. Acompaña la mejora hasta que tenga responsables, medición y continuidad.</p></div><ol className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-3">{workingPrinciples.map((item, index) => <li key={item} className="bg-[#0d110e] p-7"><span className="font-mono text-xs text-primary">0{index + 1}</span><p className="mt-8 text-sm font-medium leading-6 text-white/68">{item}</p><Check className="mt-6 size-4 text-primary" /></li>)}</ol></div></div></section>

      <ConversionCta title="Veamos qué oportunidad merece tu atención primero." description="El diagnóstico organiza el contexto y te orienta hacia una mejora concreta, sin obligarte a rehacer toda la operación." label="Encontrar mi oportunidad" />
    </div>
  );
}
