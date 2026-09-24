import type { Metadata } from "next";
import { Check, Clock3, Route, ShieldCheck } from "lucide-react";
import { DiagnosticWizard } from "@/components/commercial/diagnostic-wizard";

export const metadata: Metadata = {
  title: "Diagnóstico ecommerce",
  description: "Identifica qué oportunidad de tu recorrido comercial vale la pena revisar primero.",
  alternates: { canonical: "https://www.juanarangoecommerce.com/diagnostico" },
};

const expectations = [
  { icon: Clock3, title: "Seis preguntas", text: "Se completa en unos tres minutos y no exige datos técnicos." },
  { icon: Route, title: "Una orientación inicial", text: "Relaciona tu prioridad con Nitro Complete, NitroCommerce o Nitro Landing." },
  { icon: ShieldCheck, title: "Tú decides si continúas", text: "El contacto se solicita al final y enlaza la Política de Privacidad." },
] as const;

export default function DiagnosticPage() {
  return (
    <div className="relative overflow-hidden bg-background px-5 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
      <div className="pointer-events-none absolute left-[5%] top-20 size-80 rounded-full bg-primary/[.055] blur-[120px]" />
      <section className="relative mx-auto max-w-7xl">
        <div className="grid gap-9 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-16">
          <h1 className="text-center font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[.94] tracking-[-.055em] text-white lg:text-left">Aclaremos qué oportunidad merece <span className="text-primary">tu atención primero.</span></h1>
          <div>
            <p className="mx-auto max-w-xl text-left text-base leading-7 text-white/55 lg:mx-0">Cuéntame cómo capta, atiende y vende hoy tu negocio. Recibirás una lectura inicial para decidir el siguiente paso sin empezar por una herramienta.</p>
            <ul className="mt-6 border-t border-white/9 text-left">
            {expectations.map(({ icon: Icon, title, text }) => (
              <li key={title} className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-white/9 py-3.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/8 text-primary"><Icon className="size-3.5" /></span>
                <div><p className="text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-white/42">{text}</p></div>
              </li>
            ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-left text-xs leading-5 text-white/35"><Check className="mt-0.5 size-3.5 shrink-0 text-primary" />No calcula ingresos ni promete resultados a partir de seis respuestas.</p>
          </div>
        </div>
        <div className="mx-auto mt-12 min-w-0 max-w-6xl lg:mt-16"><DiagnosticWizard /></div>
      </section>
    </div>
  );
}
