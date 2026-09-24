import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ConversionCta } from "@/components/commercial/conversion-cta";
import { PageIntro } from "@/components/commercial/page-intro";
import { industries } from "@/lib/commercial-content";

export const metadata: Metadata = { title: "Soluciones digitales por industria", description: "Aplicaciones de captación, atención y conversión para ecommerce, retail, clínicas e inmobiliarias.", alternates: { canonical: "https://www.juanarangoecommerce.com/industrias" } };
const needs = ["Cómo descubre y compara opciones tu cliente", "Qué información necesita antes de avanzar", "Quién atiende la oportunidad y cómo continúa"] as const;

export default function IndustriesPage() {
  return (
    <div className="pb-16 lg:pb-20">
      <PageIntro title={<>La tecnología se adapta a <span className="text-primary">cómo compra tu cliente.</span></>} description="Una clínica, una tienda y una inmobiliaria no deberían compartir el mismo recorrido. Partimos de la operación real para conectar captación, atención y seguimiento." aside={<div className="rounded-[1.75rem] border border-white/9 bg-[#0d110e] p-7 sm:p-8"><p className="text-sm font-semibold text-white">Antes de diseñar, revisamos:</p><ul className="mt-5 space-y-4">{needs.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/58"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div>} />
      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">{industries.map((industry) => <Link key={industry.title} href={industry.href} className="group relative overflow-hidden rounded-[2rem] border border-white/9 bg-[#0d110e] p-8 transition-[border-color,transform,background-color] hover:-translate-y-1 hover:border-primary/35 hover:bg-[#101611] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"><span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" /><industry.icon className="size-9 text-primary" /><h2 className="mt-9 text-3xl font-bold text-white">{industry.title}</h2><p className="mt-4 text-sm leading-6 text-white/52">{industry.description}</p><span className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver aplicación <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></section>
      <ConversionCta title="Tu industria aporta el contexto. Tu operación define la solución." description="Revisemos el recorrido actual antes de decidir qué página, automatización o acompañamiento conviene implementar." />
    </div>
  );
}
