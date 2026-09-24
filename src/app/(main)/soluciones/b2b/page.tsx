import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ConversionCta } from "@/components/commercial/conversion-cta";
import { PageIntro } from "@/components/commercial/page-intro";
import { industries } from "@/lib/commercial-content";

export const metadata: Metadata = { title: "Soluciones por industria", description: "Recorridos digitales adaptados a la forma en que compra y es atendido cada cliente.", alternates: { canonical: "https://www.juanarangoecommerce.com/soluciones/b2b" } };

export default function B2BHubPage() {
  return <div className="pb-16 lg:pb-20"><PageIntro align="center" title={<>Tu industria aporta el contexto. <span className="text-primary">La operación define el sistema.</span></>} description="Explora cómo puede aplicarse la captación, la atención y el seguimiento en recorridos comerciales diferentes." /><section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">{industries.map((industry) => <Link key={industry.href} href={industry.href} className="group relative overflow-hidden rounded-[2rem] border border-white/9 bg-[#0d110e] p-8 transition-[border-color,transform] hover:-translate-y-1 hover:border-primary/35"><span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" /><industry.icon className="size-9 text-primary" /><h2 className="mt-8 text-3xl font-bold text-white">{industry.title}</h2><p className="mt-4 text-sm leading-6 text-white/50">{industry.description}</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver aplicación <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></section><ConversionCta title="Revisemos tu recorrido antes de elegir herramientas." description="Un diagnóstico breve ayuda a separar una necesidad sectorial de un problema particular de tu operación." /></div>;
}
