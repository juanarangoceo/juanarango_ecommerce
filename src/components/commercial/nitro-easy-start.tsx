import { Check, MessageCircle, Rocket, Wallet } from "lucide-react";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { nitroCompleteMonthly as plan } from "@/lib/commercial-content";

// Lo primero que se entiende después del hero: arrancar cuesta poco y es
// corto (NIT-209). Pensado para quien vende por WhatsApp con poco
// presupuesto: primero conversa sin compromiso, luego activa y en menos de
// 24 horas atiende. Es el orden real del alta.
const steps = [
  {
    icon: MessageCircle,
    title: "Nos escribes por WhatsApp",
    text: "Nos cuentas qué vendes y cómo te llegan los pedidos. Te resolvemos las dudas sin compromiso.",
  },
  {
    icon: Wallet,
    title: `Activas con ${plan.price}`,
    text: "Pagas por Nequi, PSE o Bancolombia desde el mismo chat. Es tu mes: número, turnos y plantillas. Sin contrato.",
  },
  {
    icon: Rocket,
    title: `En menos de ${plan.installHours} horas, tu asesor atiende`,
    text: "Nos dices cómo cobras y a dónde envías, subes tus productos y te entregamos tu número de WhatsApp listo. Tu mes empieza ese día.",
  },
] as const;

const requisitos = ["Sin página web", "Sin saber de tecnología", "Sin contratar a nadie"] as const;

export function NitroEasyStart() {
  return (
    <section id="empezar" className="scroll-mt-24 bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="flow">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">
            Mañana mismo<br /><span className="text-nitro-text">puede estar atendiendo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-center text-lg leading-8 text-ink/75 lg:mx-0 lg:text-left">
            Si vendes productos por WhatsApp, ya tienes lo que hace falta.
          </p>
          {/* Las tres objeciones de entrada, a la vista y no dentro de un párrafo. */}
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            {requisitos.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
                <Check className="size-4 text-nitro-text" aria-hidden="true" />{item}
              </li>
            ))}
          </ul>
        </div>
        <ol className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white md:mt-10 md:grid md:grid-cols-3 md:gap-3 md:divide-y-0 md:rounded-none md:border-0 md:bg-transparent">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex items-start gap-4 p-5 md:block md:rounded-2xl md:border md:border-line md:bg-white md:p-7">
              <div className="flex shrink-0 items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-primary"><Icon className="size-5" aria-hidden="true" /></span>
                <span className="hidden font-mono text-xs text-ink/45 md:inline">0{i + 1}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight md:mt-5 md:text-xl">{title}</h3>
                <p className="mt-1.5 text-base leading-7 text-ink/70 md:mt-2">{text}</p>
              </div>
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
