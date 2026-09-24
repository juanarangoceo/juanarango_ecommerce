import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/commercial/page-intro";
import { caseStudies } from "@/lib/commercial-content";

export const metadata: Metadata = { title: "Productos y demostraciones", description: "Productos funcionales y demostraciones de diseño presentados con su estado y evidencia disponible.", alternates: { canonical: "https://www.juanarangoecommerce.com/casos" } };

export default function CasesPage() {
  return (
    <div className="pb-24 lg:pb-32">
      <PageIntro title={<>Cada experiencia dice <span className="text-primary">exactamente qué demuestra.</span></>} description="Separamos producto funcional, demostración y resultado comercial. No atribuimos métricas ni clientes cuando todavía no existe evidencia verificable y autorizada." />
      <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">{caseStudies.map((item) => <article key={item.title} className="relative flex min-h-[28rem] flex-col overflow-hidden rounded-[2rem] border border-white/9 bg-[#0d110e] p-8"><span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" /><span className="w-fit rounded-full border border-primary/25 bg-primary/7 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{item.status}</span><item.icon className="mt-10 size-8 text-white" /><h2 className="mt-6 text-3xl font-bold text-white">{item.title}</h2><p className="mt-4 text-sm leading-6 text-white/52">{item.description}</p><p className="mt-6 border-t border-white/8 pt-5 text-xs leading-5 text-white/38">{item.outcome}</p><Link href={item.href} className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary">Abrir experiencia <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link></article>)}</div></section>
      <section className="px-5 pt-16 lg:px-8 lg:pt-24"><div className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 pt-10 lg:grid-cols-[1fr_.8fr] lg:items-end"><h2 className="text-balance text-center font-display text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-left">Los resultados se publican cuando hay permiso, contexto y evidencia.</h2><p className="mx-auto max-w-xl text-center text-base leading-7 text-white/50 lg:mx-0 lg:justify-self-end lg:text-left">Mientras tanto, estas experiencias permiten evaluar el enfoque de producto y diseño sin convertir una demostración en un caso comercial.</p></div></section>
    </div>
  );
}
