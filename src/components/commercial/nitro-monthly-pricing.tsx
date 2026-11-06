import Link from "next/link";
import { ArrowDown, Check, ChevronDown, Wallet } from "lucide-react";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import {
  formatCop,
  nitroCompleteMonthly as plan,
  nitroCompleteMonthlyConversations as conversations,
  nitroCompleteTemplatePrice,
  nitroCompleteUnitPacks,
} from "@/lib/commercial-content";

// Precio de Nitro Complete para clientes nuevos (NIT-209). Un solo precio de
// entrada y las recargas aparte, separadas visualmente: lo del mes vence, lo
// recargado no. Condiciones en un desplegable, no en notas sueltas.
const includes = [
  ["Tu número de WhatsApp", "Gestionado por Nitro y listo para compartir en tus redes, anuncios y tienda."],
  [`${plan.turns} turnos cada mes`, `Alcanzan para unas ${conversations} conversaciones de venta. Un turno es cada respuesta que envía tu asesor.`],
  [`${plan.templates} envíos de plantilla`, "Para confirmar pedidos y avisar envíos fuera de la ventana de 24 horas de WhatsApp, según aprobación de Meta."],
  ["Tu asesor y tu panel", "Catálogo real, conversaciones, pedidos y los casos que necesita atender tu equipo."],
] as const;

const conditions = [
  "Pagas cada mes con Confío (Nequi, PSE o Bancolombia). No guardamos tarjetas y nada se cobra solo.",
  `Tu primer mes empieza el día que tu asesor queda atendiendo. La instalación toma menos de ${plan.installHours} horas desde el pago y la información de tu negocio.`,
  "Lo incluido en el mes se usa primero y vence con el mes: no se acumula.",
  "Renuevas desde tu panel cuando quieras, también antes de que termine el mes. Tu fecha de renovación se mantiene.",
  "Si no renuevas, tu asesor se pausa aunque tengas recargas. Tu panel, tus datos y tus recargas siguen ahí, y al pagar vuelve a atender.",
] as const;

export function NitroMonthlyPricing() {
  const packs = nitroCompleteUnitPacks;
  const packCard = (pack: (typeof packs)[number]) => (
    <li key={pack.units} className="rounded-2xl border border-white/12 bg-background p-5 sm:p-6">
      <p className="text-2xl font-semibold tracking-tight text-white">{pack.units.toLocaleString("es-CO")} <span className="text-sm font-normal text-white/65">turnos</span></p>
      <p className="mt-3 text-xl font-semibold tabular-nums text-white">{formatCop(pack.priceCop)}</p>
    </li>
  );
  return (
    <section id="precio" className="scroll-mt-24 px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="pricing">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">Un solo precio para empezar.<br /><span className="text-primary">{plan.price} al mes.</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/75">Sin contrato y sin cobro automático: pagas el mes cuando quieres seguir. Si un mes vendes más, recargas, y <strong className="font-semibold text-white">lo que recargas no vence.</strong></p>
        </div>

        <article className="mt-10 overflow-hidden rounded-[2rem] border border-primary/35 bg-superficie-nitro">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="p-7 sm:p-10">
              <p className="text-base font-semibold text-white">Nitro Complete</p>
              <p className="mt-6 flex items-baseline gap-2"><span className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">{plan.price}</span><span className="text-lg text-white/65">/ mes</span></p>
              <p className="mt-2 text-sm text-white/65">COP · IVA incluido</p>
              <p className="mt-6 max-w-sm text-base leading-7 text-white/75">Te instalamos el asesor con tu catálogo y tu forma de vender. Tu primer mes empieza cuando ya está atendiendo.</p>
              <WhatsAppJuanButton context={{ kind: "kit" }} placement="product_activation" className="mt-7 w-full sm:w-auto">Empezar mi primer mes</WhatsAppJuanButton>
              <p className="mt-4 text-sm leading-6 text-white/65">Te enviamos el enlace de pago por WhatsApp.</p>
            </div>
            <div className="border-t border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:border-l lg:border-t-0">
              <h3 className="text-xl font-semibold text-white">Cada mes incluye</h3>
              <ul className="mt-6 space-y-5">
                {includes.map(([title, text]) => <li key={title} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /><div><h4 className="text-base font-semibold text-white">{title}</h4><p className="mt-1 text-sm leading-6 text-white/70">{text}</p></div></li>)}
              </ul>
            </div>
          </div>
          <details className="group border-t border-white/10">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-7 text-sm font-semibold text-white sm:px-10 [&::-webkit-details-marker]:hidden">Cómo funciona la mensualidad<ChevronDown className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary>
            <ul className="space-y-3 px-7 pb-7 sm:px-10">
              {conditions.map((c) => <li key={c} className="flex gap-3 text-sm leading-6 text-white/75"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/50" aria-hidden="true" />{c}</li>)}
            </ul>
          </details>
        </article>

        <div id="recarga" className="mt-8 scroll-mt-24 rounded-[2rem] border border-white/12 bg-superficie-nitro p-6 sm:p-9">
          <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div><Wallet className="size-6 text-white/80" aria-hidden="true" /><h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">¿Vendes más? Recargas.</h3></div>
            <p className="text-base leading-7 text-white/75">Si se acaban los turnos del mes, compras más desde tu panel. Se usan después de los del mes y <strong className="font-semibold text-white">no vencen</strong>: lo que no gastes queda para los meses siguientes.</p>
          </div>
          <ul className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">{packs.slice(0, 4).map(packCard)}</ul>
          <details className="group mt-5 border-t border-white/10 pt-2">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">Ver recargas de mayor capacidad<ChevronDown className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary>
            <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">{packs.slice(4).map(packCard)}</ul>
          </details>
          <p className="mt-4 text-sm leading-6 text-white/65">Precios en pesos colombianos (COP), con IVA incluido. Plantillas adicionales a {nitroCompleteTemplatePrice} cada una. Llamadas y seguimiento con 17TRACK tienen su propio saldo y se habilitan por separado.</p>
          <Link href="#calculadora" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline">¿Me alcanza el mes? Calcúlalo<ArrowDown className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
