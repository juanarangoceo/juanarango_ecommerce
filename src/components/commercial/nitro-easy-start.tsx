import { CalendarCheck, MessageCircle, Store } from "lucide-react";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { nitroCompleteMonthly as plan } from "@/lib/commercial-content";

// Lo primero que se entiende después del hero: empezar es corto y no exige
// una tienda online. Tres pasos reales del alta (NIT-209), sin promesas.
const steps = [
  {
    icon: MessageCircle,
    title: "Nos escribes",
    text: "Cuéntanos qué vendes. Mi asistente te resuelve las dudas y te manda el enlace de pago por el mismo chat.",
  },
  {
    icon: Store,
    title: `Pagas ${plan.price} y nos cuentas de tu negocio`,
    text: "Tus productos con foto y precio, cómo cobras y a dónde envías. Lo hacemos conversando; no necesitas página web.",
  },
  {
    icon: CalendarCheck,
    title: `En menos de ${plan.installHours} horas, tu asesor atiende`,
    text: "Te damos un número de WhatsApp listo para compartir. Tu primer mes empieza ese día, no el día que pagas.",
  },
] as const;

export function NitroEasyStart() {
  return (
    <section id="empezar" className="scroll-mt-24 bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="flow">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">
            Empezar toma un día.<br /><span className="text-nitro-text">Y tres pasos.</span>
          </h2>
          <p className="mx-auto max-w-lg text-pretty text-lg leading-8 text-ink/75 lg:mx-0 lg:justify-self-end">
            No necesitas saber de tecnología ni tener tienda online. Si vendes productos por WhatsApp, tu asesor puede empezar a atender esta semana.
          </p>
        </div>
        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rounded-2xl border border-line bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-primary"><Icon className="size-5" aria-hidden="true" /></span>
                <span className="font-mono text-xs text-ink/45">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight">{title}</h3>
              <p className="mt-2 text-base leading-7 text-ink/70">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <WhatsAppJuanButton context={{ kind: "kit" }} placement="product_easy_start" variant="dark" className="w-full sm:w-auto">Empezar por WhatsApp</WhatsAppJuanButton>
        </div>
      </div>
    </section>
  );
}
