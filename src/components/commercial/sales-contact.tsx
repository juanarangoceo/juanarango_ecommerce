import Link from "next/link";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { SALES_EVALUATION_HREF } from "@/lib/juan-whatsapp";

const steps = [
  ["Cuéntanos qué vendes", "Te orientamos con Shopify o tu catálogo listo para cargar."],
  ["Activa tu asesor", "Un pago inicial con instalación y saldo para empezar."],
  ["Empieza a usarlo", "Completa pago y ficha; instalamos en máximo 48 horas."],
] as const;

export function SalesContact({ placement }: { placement: string }) {
  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/25 bg-superficie-nitro">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:p-12">
        <div className="text-center lg:text-left">
          <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-4xl">Tu asesor empieza aquí. <span className="text-primary">Te acompañamos por WhatsApp.</span></h2>
          <p className="mt-5 text-left text-base leading-7 text-white/75">Mi asistente te explica la activación, resuelve tus dudas y te da el enlace para crear tu cuenta. Después recargas desde el panel, sin mensualidad.</p>
          <WhatsAppJuanButton context={{ kind: "evaluation" }} placement={placement} className="mt-7 w-full sm:w-auto">Quiero activar mi asesor</WhatsAppJuanButton>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm leading-6 text-white/60 lg:justify-start">
            <Link href={SALES_EVALUATION_HREF} className="underline underline-offset-4 hover:text-white">Prefiero el formulario</Link>
            <Link href="/nitro-complete/privacidad" className="underline underline-offset-4 hover:text-white">Privacidad de mis datos</Link>
          </div>
        </div>
        <ol className="space-y-6 lg:border-l lg:border-white/10 lg:pl-10">
          {steps.map(([title, text], index) => (
            <li key={title} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs text-primary">0{index + 1}</span>
              <div><h3 className="text-base font-semibold text-white">{title}</h3><p className="mt-1 text-base leading-7 text-white/70">{text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
