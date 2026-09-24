import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Code2, Rocket, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionCta } from "@/components/commercial/conversion-cta";

const JUAN_PHOTO = "https://res.cloudinary.com/dohwyszdj/image/upload/f_auto,q_auto,w_800/v1781237424/Juan_arango_Ecommerce_r96gjj.png";

const experiences = [
  { icon: Terminal, title: "Ecommerce y marketing en Latinoamérica", text: "Quince años trabajando entre operación, adquisición, conversión y tecnología aplicada.", signal: "Experiencia entre negocio y tecnología" },
  { icon: Rocket, title: "Acompañamiento de principio a fin", text: "Entendemos el problema, construimos la solución y la dejamos funcionando con tu equipo.", signal: "Del diagnóstico a la transferencia" },
  { icon: Code2, title: "NITRO ECOM como estructura de implementación", text: "Estrategia, automatización e infraestructura conectadas alrededor de una necesidad real.", signal: "Dirección, construcción y documentación" },
] as const;

export function AboutSection() {
  return (
    <div className="pb-16 lg:pb-20">
      <section className="relative overflow-hidden px-5 pb-16 pt-20 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="pointer-events-none absolute left-[8%] top-16 size-80 rounded-full bg-primary/[0.055] blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#111512]">
            <Image src={JUAN_PHOTO} alt="Juan Arango, especialista en ecommerce y automatización" width={800} height={1000} sizes="(max-width: 1024px) 90vw, 430px" className="h-auto w-full" priority />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-7 pt-24"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Pereira · Colombia</p></div>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-balance font-display text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[.97] tracking-[-0.05em] text-white">Trabajo contigo hasta dejar <span className="text-primary">el sistema funcionando.</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-left text-lg leading-8 text-white/58 lg:mx-0">Soy Juan Arango. Llevo 15 años trabajando en ecommerce, marketing y operación digital en Latinoamérica. NITRO ECOM es la estructura con la que convierto esa experiencia en implementación.</p>
            <p className="mx-auto mt-5 max-w-2xl text-left text-base leading-7 text-white/48 lg:mx-0">No parto de una herramienta favorita. Primero entendemos qué necesita el negocio, luego elegimos y construimos la solución que mejor encaja con su operación.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"><Button asChild size="lg" className="h-13 rounded-full px-7 text-base font-bold"><Link href="/diagnostico">Revisar mi caso <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent px-7 text-white hover:bg-white/7 hover:text-white"><Link href="/soluciones">Conocer las soluciones</Link></Button></div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end"><h2 className="text-balance text-center font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-left">Experiencia aplicada a <span className="text-primary">decisiones concretas.</span></h2><p className="mx-auto max-w-xl text-center text-base leading-7 text-white/52 lg:mx-0 lg:text-left">Cada proyecto combina criterio comercial, implementación técnica y transferencia para que el equipo conserve el control.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 lg:mt-16 md:grid-cols-3">
            {experiences.map(({ icon: Icon, title, text, signal }) => <article key={title} className="bg-[#0d110e] p-7 sm:p-8"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/9 text-primary"><Icon className="size-6" /></span><h3 className="mt-8 text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{text}</p><p className="mt-6 flex items-center gap-2 border-t border-white/8 pt-5 text-xs text-white/45"><Check className="size-4 shrink-0 text-primary" />{signal}</p></article>)}
          </div>
        </div>
      </section>
      <ConversionCta title="Empecemos por entender tu operación." description="Cuéntame qué estás intentando resolver y revisaremos juntos qué camino tiene más sentido para tu negocio." />
    </div>
  );
}
