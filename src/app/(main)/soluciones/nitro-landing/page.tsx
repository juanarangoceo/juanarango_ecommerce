import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Blocks, Check, LayoutTemplate, MessageSquareText, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionCta } from "@/components/commercial/conversion-cta";

export const metadata: Metadata = {
  title: "Nitro Landing | Una oferta, un recorrido claro",
  description: "Diseño e implementación de landings rápidas, medibles y enfocadas en una oferta y un siguiente paso.",
  alternates: { canonical: "https://www.juanarangoecommerce.com/soluciones/nitro-landing" },
};

const architecture = [
  { icon: MessageSquareText, title: "Mensaje", text: "Una promesa principal que conecta con la campaña y se entiende sin contexto extra." },
  { icon: Blocks, title: "Evidencia", text: "Bloques que responden dudas, muestran la oferta y ayudan a evaluar la decisión." },
  { icon: MousePointerClick, title: "Acción", text: "Un siguiente paso visible, sin navegación ni caminos que compitan por atención." },
  { icon: BarChart3, title: "Medición", text: "Atribución y eventos para saber qué ocurre después de cada visita." },
] as const;

function BlockLandingPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="pointer-events-none absolute -inset-12 bg-[radial-gradient(circle,rgba(183,255,42,.09),transparent_62%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d110e] shadow-[0_30px_90px_rgba(0,0,0,.4)]">
        <div className="flex h-12 items-center justify-between border-b border-white/8 px-4"><div className="flex gap-1.5"><span className="size-2 rounded-full bg-white/18" /><span className="size-2 rounded-full bg-white/18" /><span className="size-2 rounded-full bg-primary" /></div><span className="font-mono text-[9px] uppercase tracking-[.18em] text-white/45">La oferta, bloque a bloque</span><span className="rounded-full bg-primary px-3 py-1 text-[9px] font-bold text-[#111311]">Lista</span></div>
        <div className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6.5rem_1fr]">
          <aside className="border-r border-white/8 bg-black/20 p-3 sm:p-4" aria-label="Bloques disponibles">
            <p className="hidden font-mono text-[8px] uppercase tracking-[.16em] text-white/30 sm:block">Bloques</p>
            <div className="mt-2 grid gap-2 sm:mt-4">
              {["Promesa", "Oferta", "Confianza", "Acción", "Dudas"].map((block, index) => <div key={block} className={`rounded-lg border p-2 text-center font-mono text-[7px] uppercase tracking-[.1em] sm:p-2.5 sm:text-[8px] ${index === 1 ? "border-primary/35 bg-primary/8 text-primary" : "border-white/8 text-white/35"}`}>{block}</div>)}
            </div>
          </aside>
          <div className="space-y-3 bg-[#090b0a] p-3 sm:p-5">
            <div className="rounded-xl border border-dashed border-primary/35 bg-primary/[.055] p-4 sm:p-5"><span className="rounded-full border border-primary/25 px-2 py-1 font-mono text-[7px] uppercase tracking-[.14em] text-primary">Oferta principal</span><div className="mt-4 h-4 w-[88%] rounded bg-white/88" /><div className="mt-2 h-4 w-[58%] rounded bg-primary" /><div className="mt-4 h-2 w-[80%] rounded bg-white/14" /><div className="mt-2 h-2 w-[65%] rounded bg-white/10" /><div className="mt-5 h-8 w-28 rounded-full bg-primary" /></div>
            <div className="grid grid-cols-3 gap-2">{["Decisión", "Confianza", "Acción"].map((label) => <div key={label} className="rounded-xl border border-white/8 bg-[#0d110e] p-3"><div className="size-5 rounded-md bg-primary/12" /><div className="mt-3 h-1.5 w-4/5 rounded bg-white/20" /><p className="mt-2 hidden font-mono text-[7px] uppercase tracking-[.12em] text-white/28 sm:block">{label}</p></div>)}</div>
            <div className="flex items-center justify-between rounded-xl border border-white/8 bg-[#0d110e] p-3"><div><div className="h-1.5 w-24 rounded bg-white/18" /><div className="mt-2 h-1.5 w-16 rounded bg-white/10" /></div><div className="h-7 w-20 rounded-full border border-primary/35 bg-primary/8" /></div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/8 px-4 py-3 font-mono text-[8px] uppercase tracking-[.14em] text-white/28"><span>Mobile primero</span><span className="text-primary">Atribución activa</span></div>
      </div>
    </div>
  );
}

export default function NitroLandingPage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="relative px-5 pb-18 pt-32 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(24rem,.86fr)] lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="font-display text-[clamp(2.8rem,4.7vw,4.9rem)] font-bold leading-[.96] tracking-[-.05em] text-white">Una oferta clara merece una landing que <span className="text-primary">conduzca a la acción.</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-left text-lg leading-8 text-white/58 lg:mx-0">Diseño e implemento una página enfocada en una sola oferta. Cada bloque responde una pregunta, construye confianza o acerca a la acción que tu equipo realmente puede atender.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"><Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-bold"><Link href="/diagnostico">Revisar mi oferta <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/15 bg-transparent px-7 text-white hover:bg-white/7 hover:text-white"><Link href="#arquitectura">Ver cómo la construimos</Link></Button></div>
          </div>
          <BlockLandingPreview />
        </div>
      </section>

      <section id="arquitectura" className="bg-ground px-5 py-18 text-ink lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Cada bloque responde una pregunta <span className="text-nitro-text">antes del clic.</span></h2><p className="max-w-2xl text-base leading-7 text-ink/62 lg:justify-self-end">La landing conecta anuncio, oferta y canal comercial. La estructura no nace de una plantilla fija: nace de lo que la persona necesita entender para avanzar.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{architecture.map(({ icon: Icon, title, text }, index) => <article key={title} className="group rounded-3xl border border-line bg-white p-7"><div className="flex items-center justify-between"><span className="nitro-icon-mark flex size-11 items-center justify-center rounded-xl bg-ink text-primary"><Icon className="nitro-icon-glyph size-5" /></span><span className="font-mono text-[10px] text-ink/40">0{index + 1}</span></div><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-ink/62">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start"><div className="text-center lg:text-left"><span className="nitro-icon-mark mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/9 text-primary lg:mx-0"><LayoutTemplate className="nitro-icon-glyph size-6" /></span><h2 className="mt-7 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">Lista para lanzar, medir y mejorar.</h2><p className="mt-5 text-left text-base leading-7 text-white/52">Pensamos primero en móvil y conectamos el CTA con el flujo que realmente atenderá la oportunidad.</p></div><ol className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2">{["Oferta y público definidos antes de diseñar.", "Jerarquía visual enfocada en una sola conversión.", "Eventos y atribución preparados para observar el recorrido.", "Entrega conectada con el canal comercial y la Política de Privacidad."].map((item, index) => <li key={item} className="bg-[#0d110e] p-6 sm:p-7"><span className="font-mono text-xs text-primary">0{index + 1}</span><p className="mt-6 text-sm leading-6 text-white/62">{item}</p><Check className="mt-5 size-4 text-primary" /></li>)}</ol></div></section>

      <ConversionCta title="Tu oferta no necesita más bloques. Necesita los bloques correctos." description="Revisemos el mensaje, la campaña y el siguiente paso antes de construir la landing." label="Revisar mi oferta" />
    </div>
  );
}
