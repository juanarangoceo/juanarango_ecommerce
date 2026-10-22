import Link from "next/link";
import { ArrowDown, Check, ChevronDown, MessageCircle, Wallet } from "lucide-react";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { formatCop, nitroCompleteStarterKit as activation, nitroCompleteTemplatePrice, nitroCompleteUnitPacks } from "@/lib/commercial-content";

export function PrepaidPricing() {
  const packs = nitroCompleteUnitPacks;
  const packCard = (pack: (typeof packs)[number]) => (
    <li key={pack.units} className="rounded-2xl border border-white/12 bg-background p-5 sm:p-6">
      <p className="text-2xl font-semibold tracking-tight text-white">{pack.units.toLocaleString("es-CO")} <span className="text-sm font-normal text-white/65">turnos</span></p>
      <p className="mt-3 text-xl font-semibold tabular-nums text-primary">{formatCop(pack.priceCop)}</p>
    </li>
  );
  return (
    <section id="recarga" className="scroll-mt-24 px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="pricing">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">Activa tu asesor.<br /><span className="text-primary">Después, recarga a tu ritmo.</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/75">Un pago inicial para preparar Nitro con tu negocio. Después compras saldo cuando lo necesitas, como recargas el celular. <strong className="font-semibold text-white">Sin mensualidad. Tu saldo comprado no vence.</strong></p>
        </div>

        <article className="mt-10 overflow-hidden rounded-[2rem] border border-primary/35 bg-superficie-nitro">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="p-7 sm:p-10">
              <p className="flex items-center gap-2 text-base font-semibold text-white"><MessageCircle className="size-5 text-primary" aria-hidden="true" />Tu activación de Nitro Complete</p>
              <p className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">{activation.price}</p>
              <p className="mt-2 text-sm text-white/65">COP · pago inicial, una sola vez</p>
              <p className="mt-6 max-w-sm text-base leading-7 text-white/75">Dejamos el asesor conectado a tu catálogo y te entregamos el panel con saldo para empezar a atender.</p>
              <WhatsAppJuanButton context={{ kind: "kit" }} placement="product_activation" className="mt-7 w-full sm:w-auto">Activar mi asesor</WhatsAppJuanButton>
              <p className="mt-4 text-sm leading-6 text-white/65">Te compartimos el enlace de pago por WhatsApp.</p>
            </div>
            <div className="border-t border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:border-l lg:border-t-0">
              <h3 className="text-xl font-semibold text-white">Empiezas con todo esto</h3>
              <ul className="mt-6 space-y-5">
                {[
                  ["Número de WhatsApp e instalación", `Un número gestionado por Nitro. Instalación en máximo ${activation.installHours} horas desde el pago y la ficha completos.`],
                  [`${activation.units.toLocaleString("es-CO")} turnos de saldo inicial`, "Cada respuesta que envía tu asesor cuenta como un turno. Los mensajes que escribe el comprador no se cobran como turnos."],
                  [`${activation.templates} plantillas de WhatsApp`, "Saldo inicial para mensajes como confirmaciones y avisos de envío, según configuración y aprobación de Meta."],
                  ["Tu asesor y tu panel", "Catálogo real, conversaciones, pedidos y los casos que necesita atender tu equipo."],
                ].map(([title, text]) => <li key={title} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /><div><h4 className="text-base font-semibold text-white">{title}</h4><p className="mt-1 text-sm leading-6 text-white/70">{text}</p></div></li>)}
              </ul>
            </div>
          </div>
          <ol className="grid border-t border-white/10 sm:grid-cols-3">
            {[
              ["Creamos tu cuenta", "Por WhatsApp te damos el enlace y resolvemos tus dudas para empezar."],
              ["Preparas tu activación", "Completas la ficha y el pago. Nosotros revisamos el catálogo y hacemos la instalación."],
              ["Usas y recargas", "Ves tu saldo en el panel y compras más turnos o plantillas cuando los necesites."],
            ].map(([title, text], i) => <li key={title} className="border-white/10 p-6 sm:border-l sm:first:border-l-0"><span className="font-mono text-sm text-primary">0{i + 1}</span><h3 className="mt-3 font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/70">{text}</p></li>)}
          </ol>
        </article>

        <div className="mt-8 rounded-[2rem] border border-white/12 bg-superficie-nitro p-6 sm:p-9">
          <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div><Wallet className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">Cuando necesites más, recargas.</h3></div>
            <p className="text-base leading-7 text-white/75">Estas recargas son para después de la activación. Elige cuánto saldo agregar desde tu panel: <strong className="font-semibold text-white">no tienes que pagar otra instalación ni renovar cada mes.</strong></p>
          </div>
          <ul className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">{packs.slice(0, 4).map(packCard)}</ul>
          <details className="group mt-5 border-t border-white/10 pt-2">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">Ver recargas de mayor capacidad<ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
            <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">{packs.slice(4).map(packCard)}</ul>
          </details>
          <p className="mt-4 text-sm leading-6 text-white/65">Precios en pesos colombianos (COP), con IVA incluido. Las plantillas se recargan por separado a {nitroCompleteTemplatePrice} cada una. Llamadas y seguimiento con 17TRACK tienen su propio saldo y se habilitan por separado.</p>
          <Link href="#calculadora" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline">Estimar cuántos turnos necesito<ArrowDown className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
