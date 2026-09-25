import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, CircleHelp, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionCta } from "@/components/commercial/conversion-cta";
import { solutions } from "@/lib/commercial-content";

export const metadata: Metadata = {
  title: "Soluciones para captar, atender y convertir",
  description: "Nitro Complete para vender por WhatsApp, consultoría ecommerce con NitroCommerce y Nitro Landing para tus ofertas. Encuentra la que encaja con tu negocio.",
  alternates: { canonical: "https://www.juanarangoecommerce.com/soluciones" },
};

export default function SolutionsPage() {
  return (
    <div className="pb-16 lg:pb-20">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 lg:px-8 lg:pb-20 lg:pt-36">
        <div className="pointer-events-none absolute left-[10%] top-20 size-72 rounded-full bg-primary/[.055] blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,.72fr)] lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="font-display text-[clamp(2.9rem,5.2vw,5.4rem)] font-bold leading-[.96] tracking-[-.05em] text-white">Tres formas de hacer crecer tu negocio, <span className="text-primary">una misma forma de trabajar.</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-left text-lg leading-8 text-white/58 lg:mx-0">Nitro Complete vende por WhatsApp y acompaña cada pedido hasta la entrega. NitroCommerce ordena tu ecommerce y Nitro Landing enfoca una oferta. En todas te acompaño hasta dejarlo funcionando.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"><Button asChild size="lg" className="h-13 rounded-full px-7 text-base font-bold"><Link href="/nitro-complete">Conocer Nitro Complete <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent px-7 text-base text-white hover:bg-white/7 hover:text-white"><Link href="/diagnostico">No sé por dónde empezar</Link></Button></div>
          </div>
          <aside className="rounded-[1.75rem] border border-white/10 bg-[#0d110e] p-6 sm:p-7" aria-label="Cómo elegir una solución">
            <div className="flex items-center gap-3 border-b border-white/8 pb-5"><span className="nitro-icon-mark flex size-11 items-center justify-center rounded-2xl bg-primary/9 text-primary"><CircleHelp className="nitro-icon-glyph size-5" /></span><div><h2 className="font-semibold text-white">¿Por dónde empezar?</h2><p className="mt-1 text-xs text-white/42">Relaciona tu oportunidad con el siguiente paso.</p></div></div>
            <div className="mt-3 divide-y divide-white/8">
              {["Vendes por WhatsApp → Nitro Complete", "Varias áreas por ordenar → NitroCommerce", "Una oferta por lanzar → Nitro Landing"].map((item) => <p key={item} className="flex gap-3 py-4 text-sm leading-6 text-white/68"><ArrowRight className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden="true" />{item}</p>)}
            </div>
            <p className="mt-3 flex gap-3 rounded-2xl border border-primary/16 bg-primary/6 p-4 text-xs leading-5 text-white/56"><Layers3 className="mt-0.5 size-4 shrink-0 text-primary" />Si dudas, el diagnóstico te orienta sin sobredimensionar el proyecto.</p>
          </aside>
        </div>
      </section>
      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-display text-3xl font-bold text-white sm:text-5xl">Compara por la oportunidad que quieres activar.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/48">Cada solución tiene un alcance diferente, pero comparte dirección, implementación y acompañamiento.</p></div></div>
          <div className="grid gap-5 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Link key={solution.slug} href={solution.href} className="group relative isolate flex min-h-[29rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d110e] p-7 transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-[#101611] focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 sm:p-8">
              <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/75 to-transparent" />
              <div className="flex items-start justify-between gap-4"><span className="nitro-icon-mark flex size-14 items-center justify-center rounded-2xl bg-primary/9 text-primary"><solution.icon className="nitro-icon-glyph size-7" /></span><ArrowRight className="mt-2 size-5 text-white/20 transition-[color,transform] group-hover:translate-x-1 group-hover:text-primary" /></div>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{solution.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold text-white">{solution.title}</h2>
              <p className="mt-4 text-lg font-medium leading-7 text-white/84">{solution.result}</p>
              <p className="mt-4 text-sm leading-6 text-white/50">{solution.description}</p>
              <div className="mt-7 border-t border-white/9 pt-6"><p className="text-xs font-semibold text-white/78">Puede ayudarte si...</p><ul className="mt-4 space-y-3">{solution.fitPoints.map((item) => <li key={item} className="flex gap-3 text-xs leading-5 text-white/58"><Check className="mt-0.5 size-3.5 shrink-0 text-primary" />{item}</li>)}</ul></div>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary">Conocer {solution.title}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
          </div>
        </div>
      </section>
      <ConversionCta title="No tienes que elegir a ciegas." description="Cuéntame cómo capta, atiende y vende hoy tu negocio. El diagnóstico te ayuda a identificar la opción que más sentido tiene en este momento." />
    </div>
  );
}
