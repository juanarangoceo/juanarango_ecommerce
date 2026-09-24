import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionCta } from "@/components/commercial/conversion-cta";

type SolutionPageProps = {
  eyebrow: string;
  title: string;
  promise: string;
  description: string;
  icon: LucideIcon;
  suitableFor: string[];
  notFor: string[];
  steps: { title: string; description: string }[];
  outcomes: string[];
};

export function SolutionPage({ title, promise, description, icon: Icon, suitableFor, notFor, steps, outcomes }: SolutionPageProps) {
  return (
    <div className="bg-background px-5 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-44">
      <section className="mx-auto grid min-w-0 max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="break-words font-display text-[clamp(2.8rem,7vw,4.5rem)] font-bold leading-[.96] tracking-[-0.045em] text-white sm:leading-[.94] sm:tracking-[-0.05em]">{title}</h1>
          <p className="mt-7 max-w-3xl text-2xl font-medium leading-tight text-white sm:text-4xl">{promise}</p>
          <p className="mx-auto mt-6 max-w-2xl text-left text-lg leading-8 text-white/55 lg:mx-0">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild size="lg" className="h-13 rounded-full px-7 text-base font-bold"><Link href="/diagnostico">Revisar mi caso <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent text-white hover:bg-white/7 hover:text-white"><Link href="/soluciones">Comparar soluciones</Link></Button>
          </div>
        </div>
        <div className="relative min-w-0 rounded-[2rem] border border-white/9 bg-[#0d110e] p-8 sm:p-10">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="nitro-icon-mark flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="nitro-icon-glyph size-7" /></span>
          <h2 className="mt-8 text-xl font-semibold text-white">Lo que debe cambiar</h2>
          <ul className="mt-6 space-y-4">
            {outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-sm leading-6 text-white/58"><Check className="mt-1 size-4 shrink-0 text-primary" />{outcome}</li>)}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl border-t border-white/8 pt-20 lg:mt-32">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div><h2 className="text-4xl font-bold tracking-tight text-white">De la necesidad a un sistema funcionando.</h2><p className="mt-5 max-w-md text-base leading-7 text-white/52">Definimos el alcance, construimos contigo y comprobamos que cada parte tenga un siguiente paso claro.</p></div>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2">
            {steps.map((step, index) => <li key={step.title} className="bg-[#0d110e] p-7"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="mt-7 text-xl font-semibold text-white">{step.title}</h3><p className="mt-3 text-sm leading-6 text-white/48">{step.description}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-5 lg:mt-32 lg:grid-cols-2">
        <div className="rounded-3xl border border-primary/20 bg-primary/6 p-8"><h2 className="text-2xl font-bold text-white">Tiene sentido si…</h2><ul className="mt-6 space-y-4">{suitableFor.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/60"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div>
        <div className="rounded-3xl border border-white/8 p-8"><h2 className="text-2xl font-bold text-white">No es el primer paso si…</h2><ul className="mt-6 space-y-4">{notFor.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/50"><X className="mt-1 size-4 shrink-0 text-white/30" />{item}</li>)}</ul></div>
      </section>

      <ConversionCta title={`Veamos si ${title} es realmente lo que necesitas.`} description="Revisamos el momento de tu negocio antes de convertir una herramienta o servicio en la respuesta automática." label="Iniciar diagnóstico" />
    </div>
  );
}
