import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionCta } from "@/components/commercial/conversion-cta";
import { PageIntro } from "@/components/commercial/page-intro";

type IndustryPageProps = {
  title: string;
  highlight: string;
  description: string;
  icon: LucideIcon;
  situations: string[];
  modules: { title: string; description: string; icon: LucideIcon }[];
};

export function IndustryPage({ title, highlight, description, icon: Icon, situations, modules }: IndustryPageProps) {
  return (
    <div className="pb-16 lg:pb-20">
      <PageIntro
        title={<>{title} <span className="text-primary">{highlight}</span></>}
        description={description}
        actions={<><Button asChild size="lg" className="h-13 rounded-full px-7 text-base font-bold"><Link href="/diagnostico">Revisar mi operación <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent px-7 text-white hover:bg-white/7 hover:text-white"><Link href="/soluciones">Comparar soluciones</Link></Button></>}
        aside={<div className="group relative overflow-hidden rounded-[2rem] border border-white/9 bg-[#0d110e] p-8 sm:p-10"><span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" /><span className="nitro-icon-mark flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="nitro-icon-glyph size-7" /></span><h2 className="mt-8 text-xl font-semibold text-white">Puede ayudarte si...</h2><ul className="mt-5 space-y-4">{situations.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/58"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div>}
      />

      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end"><h2 className="text-balance text-center font-display text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-left">Un recorrido conectado, <span className="text-primary">adaptado a la operación.</span></h2><p className="mx-auto max-w-xl text-center text-base leading-7 text-white/52 lg:mx-0 lg:text-left">Los módulos se eligen después de revisar el proceso actual. No todos los negocios necesitan la misma combinación ni el mismo nivel de automatización.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:mt-16">{modules.map(({ title: moduleTitle, description: moduleDescription, icon: ModuleIcon }) => <article key={moduleTitle} className="group bg-[#0d110e] p-7 sm:p-9"><span className="nitro-icon-mark flex size-11 items-center justify-center rounded-2xl bg-primary/9 text-primary"><ModuleIcon className="nitro-icon-glyph size-5" /></span><h3 className="mt-7 text-xl font-bold text-white">{moduleTitle}</h3><p className="mt-3 text-sm leading-6 text-white/50">{moduleDescription}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr]"><h2 className="text-center font-display text-3xl font-bold text-white sm:text-5xl lg:text-left">Primero entendemos el recorrido. Después elegimos la tecnología.</h2><div className="grid gap-4 sm:grid-cols-3">{["Captación", "Atención", "Seguimiento"].map((step) => <div key={step} className="border-t border-primary/45 pt-4"><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{step}</p><p className="mt-3 text-sm leading-6 text-white/48">Revisamos qué ocurre hoy, quién participa y dónde se pierde continuidad.</p></div>)}</div></div></section>
      <ConversionCta title="Llevemos esta idea a tu operación real." description="El diagnóstico permite elegir una solución concreta sin asumir que todos los negocios de la industria funcionan igual." />
    </div>
  );
}
