import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, Check, Mail, ScanSearch, Sparkles, Wrench } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Newsletter de ecommerce, automatización e IA aplicada",
  description: "Decisiones, pruebas y guías de Juan Arango para aplicar ecommerce, automatización e IA con criterio.",
  alternates: { canonical: "https://www.juanarangoecommerce.com/newsletter" },
};

const contents = [
  { icon: ScanSearch, title: "Decisiones explicadas", text: "Qué evaluar antes de elegir una herramienta, cambiar un recorrido o automatizar un proceso." },
  { icon: Wrench, title: "Herramientas puestas a prueba", text: "Lo que una plataforma puede resolver, sus límites y el contexto en el que tiene sentido usarla." },
  { icon: BookOpenText, title: "Guías aplicables", text: "Ideas, prompts y recursos para llevar un aprendizaje a la operación real." },
  { icon: Sparkles, title: "Aprendizajes de construcción", text: "Decisiones que aparecen mientras diseño ecommerce, automatizaciones y productos Nitro." },
] as const;

const principles = [
  "Una idea central por envío.",
  "Enlaces y contexto para profundizar.",
  "Sin resultados inventados ni urgencia artificial.",
  "Puedes cancelar la suscripción cuando quieras.",
] as const;

export default function NewsletterPage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="relative px-5 pb-18 pt-32 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-20 size-96 -translate-x-1/2 rounded-full bg-primary/[.055] blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="font-display text-[clamp(3.2rem,6.6vw,6.4rem)] font-bold leading-[.94] tracking-[-.055em] text-white">Ideas para aplicar tecnología con <span className="text-primary">mejor criterio.</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-left text-lg leading-8 text-white/58 lg:mx-0">Comparto lo que aprendo construyendo ecommerce, automatizaciones y productos con IA: decisiones, pruebas y guías que puedas llevar a tu negocio.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs text-white/42 lg:justify-start"><span className="flex items-center gap-2"><Check className="size-4 text-primary" />Sin frecuencia forzada</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" />Sin spam</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" />Salida en cualquier momento</span></div>
          </div>
          <div className="relative rounded-[1.75rem] border border-primary/18 bg-[#0d110e] p-6 shadow-[0_30px_90px_rgba(0,0,0,.35)] sm:p-8"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/9 text-primary"><Mail className="size-6" /></span><h2 className="mt-7 text-2xl font-bold text-white">Recibe la próxima edición.</h2><p className="mt-3 text-sm leading-6 text-white/48">Solo escribiré cuando haya una idea que merezca llegar a tu bandeja.</p><div className="mt-7"><NewsletterForm variant="inline" /></div></div>
        </div>
      </section>

      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-18 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[1fr_.8fr] lg:items-end"><h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">Qué puedes encontrar <span className="text-primary">en cada lectura.</span></h2><p className="max-w-xl text-base leading-7 text-white/52">No es un resumen de titulares. El objetivo es ayudarte a entender una decisión y darte un punto de partida para aplicarla.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/8 sm:grid-cols-2 lg:mt-16">{contents.map(({ icon: Icon, title, text }) => <article key={title} className="bg-[#0d110e] p-7 sm:p-9"><Icon className="size-6 text-primary" /><h3 className="mt-8 text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/48">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="text-center lg:text-left"><h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">Tu bandeja no necesita más ruido.</h2><p className="mt-5 text-left text-base leading-7 text-white/52">Esta newsletter conserva el mismo criterio del sitio: explicar lo suficiente para tomar una mejor decisión, sin convertir cada novedad en una urgencia.</p></div><ul className="grid gap-3">{principles.map((item) => <li key={item} className="flex items-center gap-3 rounded-2xl border border-white/9 bg-[#0d110e] p-5 text-sm text-white/60"><Check className="size-4 shrink-0 text-primary" />{item}</li>)}</ul></div><div className="mx-auto mt-12 flex max-w-7xl justify-center lg:justify-end"><Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">Prefiero explorar el blog <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link></div></section>
    </div>
  );
}
