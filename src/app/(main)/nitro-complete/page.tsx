import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Clock3, Hand, LayoutTemplate, Megaphone, Radar, ShieldCheck, SlidersHorizontal, Store } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NitroCompleteModules } from "@/components/commercial/nitro-complete-modules";
import { NitroHero } from "@/components/nitro/nitro-hero";
import nitroMotion from "@/components/nitro/nitro-live.module.css";
import { SalesCalculator } from "@/components/commercial/sales-calculator";
import { WhatsAppStory } from "@/components/commercial/whatsapp-story";
import { ShopifyLogo, WhatsAppLogo } from "@/components/commercial/brand-logos";
import {
  formatCop,
  nitroCompleteImplementation,
  nitroCompleteImplementationIncludes,
  nitroCompletePlans,
  nitroCompleteStarterKit,
  nitroCompleteTemplatePrice,
  nitroCompleteUnitPacks,
  PLAN_TEMPLATES_PER_CYCLE,
  planConversations,
  planUnitPrice,
  primaryCta,
  UNITS_PER_CONVERSATION,
} from "@/lib/commercial-content";
import { CONTACT_EMAILS } from "@/lib/contact-emails";
import { NITRO_COMPLETE_ENTITY } from "@/components/legal/legal-shell";
import { nitroAppUrl } from "@/lib/nitrobot-intake";

const SITE_URL = "https://www.juanarangoecommerce.com";

export const metadata: Metadata = {
  title: "Nitro Complete | Vende, confirma y haz seguimiento por WhatsApp con IA",
  description:
    "Nitro Complete atiende con tu catálogo real, crea el pedido, lo confirma antes del despacho, avisa el envío y retoma las ventas pendientes. Con Shopify o sin tienda online.",
  alternates: { canonical: `${SITE_URL}/nitro-complete` },
  openGraph: {
    images: [{ url: "/og-nitro.png", width: 1200, height: 630 }],
    title: "Nitro Complete | Un equipo de ventas completo dentro de tu WhatsApp",
    description: "Asesor con IA, confirmación de pedidos, postventa y seguimiento en un solo sistema, con tu equipo al mando.",
    url: `${SITE_URL}/nitro-complete`,
    siteName: "Juan Arango Ecommerce",
    type: "website",
    locale: "es_CO",
  },
};

const controls = [
  { icon: ShieldCheck, title: "Precios que no se inventan", text: "Precios, envíos y totales los calcula el sistema desde tu catálogo, no el modelo de IA." },
  { icon: Hand, title: "Una persona cuando hace falta", text: "Cambios, reclamos o casos delicados pasan a tu equipo con la conversación completa." },
  { icon: Clock3, title: "Horarios y permisos", text: "Los mensajes de seguimiento respetan tus horarios y solo llegan a quien no pidió dejar de recibirlos." },
  { icon: SlidersHorizontal, title: "Cada parte se enciende por separado", text: "Empezamos en observación, revisamos y activamos cuando está lista. Si algo no convence, se apaga." },
] as const;

const growth = [
  { icon: LayoutTemplate, title: "Nitro Landing", text: "Una página por producto que envía cada pedido a tu panel." },
  { icon: Megaphone, title: "Campañas por WhatsApp", text: "Promociones a tus compradores con plantillas aprobadas por Meta." },
  { icon: Radar, title: "Oportunidades", text: "Descubre por qué no compran los clientes que casi compran." },
] as const;

const shopifyFeatures = [
  ["Catálogo sincronizado", "Tus productos y precios llegan desde la tienda y se mantienen al día. El asesor responde con lo que tienes publicado."],
  ["El pedido se crea en tu tienda", "Cuando el cliente compra en el chat, el pedido contraentrega queda en Shopify con sus datos de entrega."],
  ["Confirmación a la vista", "El pedido que el comprador confirma por WhatsApp queda etiquetado en Shopify antes de despacharlo."],
  ["Aviso de envío automático", "Al registrar el despacho en Shopify, el comprador recibe la transportadora y la guía por WhatsApp."],
  ["Carritos abandonados", "Recuerda por WhatsApp a quien dejó el checkout a medias, con el carrito listo para terminar la compra. Requiere plantillas aprobadas por Meta."],
  ["Botón de WhatsApp en tu tienda", "Abre la conversación con el producto que el cliente está viendo. Lo instalamos en la implementación."],
] as const;

// Catálogo nativo (nitro_bot: app/dashboard/catalogo y lib/catalog/upsert.ts).
// La IA no redacta el catálogo: genera el embedding con el que el asesor
// encuentra cada producto por significado, no por palabra exacta.
const nativeCatalog = [
  "Creas cada producto desde el panel, con sus fotos, precio y descripción.",
  "Si ya tienes tu lista en Excel, la importas en CSV de una vez.",
  "La IA aprende cada producto para que el asesor lo encuentre aunque el cliente lo describa con sus palabras.",
] as const;

// Radar de oportunidades (nitro_bot: docs/modules/sales-radar.md,
// lib/radar/taxonomy.ts). Solo causas reales de la taxonomía.
const lostReasons = ["Precio", "Costo de envío", "Tiempo de entrega", "Sin disponibilidad", "Medio de pago", "Garantía o confianza", "Información insuficiente"] as const;

const conversationsFormat = new Intl.NumberFormat("es-CO");

const faqs = [
  ["¿Es un chatbot?", "No. El chat es la parte visible. Detrás hay catálogo real, cálculo de precios en el servidor, creación de pedidos, confirmación, postventa, seguimiento, casos para tu equipo y un panel con lo vendido."],
  ["¿Qué diferencia hay con NitroBot?", "NitroBot es el asesor que conversa y crea el pedido. Nitro Complete es el sistema completo: ese asesor más todo lo que pasa después del chat, organizado en un solo panel."],
  ["¿Necesito Shopify?", "No. Puedes sincronizar tu tienda Shopify o administrar el catálogo directamente en Nitro. En la evaluación definimos la ruta que te da menos trabajo."],
  ["¿Puede equivocarse con los precios?", "Los precios, envíos y totales no quedan a criterio de la IA: se consultan y calculan desde el sistema antes de responder."],
  ["¿Le escribe a mis clientes sin permiso?", "No. Las respuestas ocurren cuando el cliente escribe. Los mensajes de seguimiento y recuperación usan plantillas aprobadas por Meta, respetan horarios y excluyen a quien pidió no recibir promociones."],
  ["¿Puedo empezar sin pagar mensualidad?", `Sí. Con Prepago compras el kit de arranque (${nitroCompleteStarterKit.price}: tu número, la instalación y tus primeras unidades y plantillas) y después recargas cuando quieras, desde ${formatCop(nitroCompleteUnitPacks[0].priceCop)}. Sin mensualidad ni fecha de corte, y lo que compras no se vence. Cuando vendas más, un plan mensual te sale más barato por unidad.`],
  ["¿Qué es una unidad?", `Cada respuesta que tu asesor le envía a un cliente. Si el cliente manda varios mensajes seguidos, el asesor los lee juntos y responde una vez. Una conversación de venta usa en promedio unas ${UNITS_PER_CONVERSATION}.`],
  ["¿Qué incluye la implementación de un plan?", `Se paga una sola vez (${nitroCompleteImplementation}) y no te entregamos un bot: lo dejamos vendiendo. Incluye ${nitroCompleteImplementationIncludes.map((i) => i.charAt(0).toLowerCase() + i.slice(1)).join("; ")}. El alcance se confirma antes de iniciar.`],
  ["¿Puedo pasar de recargas a un plan, o al revés?", "Sí, cuando quieras. Si pasas a un plan, lo que te quede de unidades se suma como paquete y no se pierde. Si vuelves a recargas, sigues con tu saldo y sin fecha de corte."],
  ["¿Cuánto tarda la implementación?", "Depende de tu catálogo y de la aprobación de Meta. Te damos el plan concreto después de la evaluación, antes de que pagues."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nitro Complete",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, WhatsApp",
  description: "Sistema de ventas por WhatsApp con IA: asesor con catálogo real, pedidos, confirmación, postventa, seguimiento y panel operativo.",
  url: `${SITE_URL}/nitro-complete`,
  provider: { "@id": `${SITE_URL}/#organization` },
  offers: nitroCompletePlans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.price.replace(/[^0-9]/g, ""),
    priceCurrency: "COP",
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
};

function PrimaryCta({ label = primaryCta.label }: { label?: string }) {
  return (
    <Button asChild size="lg" className="group h-13 rounded-full px-7 text-base font-bold">
      <Link href={primaryCta.href}>{label} <ArrowRight className="nitro-cta-arrow" /></Link>
    </Button>
  );
}

export default function NitroCompletePage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative px-5 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-40" data-nitro-orb="idle">
        <div className="pointer-events-none absolute right-[8%] top-24 size-96 rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0 text-center lg:text-left">
            <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-semibold text-white/80 lg:justify-start">
              <WhatsAppLogo className="size-4" />Para WhatsApp
              <span className="text-white/30" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">con <ShopifyLogo className="size-3.5" /> Shopify o sin tienda</span>
            </p>
            <h1 className="mt-5 text-white">
              <span className="block text-[clamp(2.6rem,5.6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">Nitro Complete</span>
              <span className="mt-4 block text-balance text-[clamp(1.6rem,3.1vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
                Un equipo de ventas completo <span className="text-primary">dentro de tu WhatsApp.</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/62 lg:mx-0">
              <strong className="nitro-hl">Atiende con tu catálogo real</strong>, <strong className="nitro-hl">crea el pedido</strong>, <strong className="nitro-hl">lo confirma antes del despacho</strong>, <strong className="nitro-hl">avisa el envío</strong> y <strong className="nitro-hl">retoma las ventas</strong> que quedaron pendientes. Tú ves todo desde un panel y decides cuándo entra tu equipo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <PrimaryCta />
              <Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent px-7 text-base text-white hover:bg-white/7 hover:text-white"><Link href="#recarga">Empieza desde {nitroCompleteStarterKit.price}</Link></Button>
            </div>
            <p className="mt-5 text-xs text-white/40">Empieza sin mensualidad · Implementación acompañada por Juan · Evaluación gratuita</p>
            <p className="mt-3 text-sm text-white/55">
              ¿Ya lo decidiste? <a href={nitroAppUrl("/registro")} className="font-semibold text-primary hover:underline">Crear mi cuenta</a>
              {" · "}
              <a href={nitroAppUrl("/login")} className="text-white/70 hover:text-white hover:underline">Ingresar</a>
            </p>
          </div>
          <NitroHero />
        </div>
      </section>

      {/* Recorrido del pedido */}
      <section className="bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="flow">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">Del primer mensaje <span className="text-nitro-text">a la entrega.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-ink/65 lg:mx-0 lg:justify-self-end lg:text-left">Cada parte trabaja en un momento distinto. Juntas cubren el recorrido en el que hoy se pierden más ventas.</p>
          </div>
          <NitroCompleteModules />
          <p className="mt-6 text-center text-xs leading-5 text-ink/50 lg:text-left">La confirmación aplica a pedidos contraentrega de Shopify y de Nitro Landing. Seguimiento y recuperación requieren plantillas aprobadas por Meta y el permiso del comprador.</p>
        </div>
      </section>

      {/* Shopify: la integración más completa. Solo capacidades verificadas en
          nitro_bot (sync, pedidos, etiqueta de Aria, despacho, carritos, botón). */}
      <section className="border-b border-white/7 bg-superficie-nitro px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="ecosystem">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div className="text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
            <ShopifyLogo className="mx-auto size-10 lg:mx-0" />
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">Hecho para vender <span className="text-primary">con Shopify.</span></h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/58 lg:mx-0">Conectas tu tienda y Nitro Complete trabaja con lo que ya tienes: tus productos, tus pedidos y tus envíos. No cambias de plataforma ni duplicas el catálogo.</p>
            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-background p-6 text-left lg:mx-0">
              <p className="flex items-center gap-2.5 text-base font-semibold text-white"><Store className="size-5 shrink-0 text-primary" aria-hidden="true" />¿Sin Shopify? Carga tu catálogo en Nitro.</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-white/58">
                {nativeCatalog.map((item) => (
                  <li key={item} className="flex gap-2.5"><Check className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <ol className="divide-y divide-white/8 border-y border-white/8">
            {shopifyFeatures.map(([title, text], index) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-6">
                <span className="pt-1 font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-white/55">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Una venta completa */}
      <section className="px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="conversation">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">Así se ve <span className="text-primary">en el chat de tu cliente.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-white/58 lg:mx-0 lg:justify-self-end lg:text-left">Elige un momento de la venta o deja que la conversación avance sola.</p>
          </div>
          <WhatsAppStory />
        </div>
      </section>

      {/* Por qué no compraron: la ventaja del chat frente a la web */}
      <section className="bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="about">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">Tu web no te dice por qué se fueron. <span className="text-nitro-text">Tu WhatsApp sí.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-ink/65 lg:mx-0 lg:justify-self-end lg:text-left">Cuando alguien abandona tu tienda, solo sabes que se fue. En el chat, el cliente escribe lo que lo frenó. Nitro Complete lo lee y te lo muestra ordenado.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
            <article className="rounded-2xl border border-line bg-white p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50">Solo con tu web</p>
              <p className="mt-4 text-xl font-semibold tracking-tight">Ves visitas, clics y carritos abandonados.</p>
              <p className="mt-3 text-sm leading-6 text-ink/60">Sabes cuántos se fueron, pero no si fue el precio, el envío o una duda que nadie respondió. Tienes que adivinar qué cambiar.</p>
            </article>
            <article className="rounded-2xl bg-ink p-7 text-white">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-primary">Con Nitro Complete</p>
              <p className="mt-4 text-xl font-semibold tracking-tight">Ves la causa de cada venta que no se dio.</p>
              <p className="mt-3 text-sm leading-6 text-white/62">Las conversaciones con intención de compra que llevan siete días sin compra se clasifican por causa, con los mensajes que la muestran. Así sabes cuántas oportunidades del mes se perdieron por la misma razón y qué revisar primero.</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Causas que detecta">
                {lostReasons.map((reason) => (
                  <li key={reason} className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/75">{reason}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-6 text-center text-xs leading-5 text-ink/50 lg:text-left">Lo hace el módulo Oportunidades, que se activa aparte. Muestra oportunidades observadas en tus conversaciones, no ventas garantizadas.</p>
        </div>
      </section>

      {/* Control */}
      <section className="border-t border-white/7 px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="about">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">Automatiza lo repetitivo. <span className="text-primary">Conserva el mando.</span></h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/55 lg:mx-0">Nitro Complete está diseñado para vender sin arriesgar tu reputación ni la relación con tus clientes.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2">
            {controls.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-background p-7">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/52">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Crecer */}
      <section className="px-5 py-16 lg:px-8 lg:py-20" data-nitro-orb="ecosystem">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-balance text-center text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-left">Cuando quieras vender más, <span className="text-primary">ya está conectado.</span></h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {growth.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-superficie-nitro p-6">
                <div className="flex items-center justify-between"><Icon className="size-5 text-primary" /><span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">Disponible</span></div>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/52">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="border-t border-white/7 px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="calculator">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">Calcula lo que hoy <span className="text-primary">se queda en el chat.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-white/58 lg:mx-0 lg:justify-self-end lg:text-left">Con los datos de tu negocio: conversaciones que puedes delegar, horas que liberas y ventas que se pierden por no responder a tiempo.</p>
          </div>
          <SalesCalculator />
        </div>
      </section>

      {/* Precios, puerta de entrada: el kit de arranque (NIT-89). Es la única
          forma de empezar sin mensualidad; las recargas vienen después, desde
          el panel, y sus precios quedan plegados dentro del kit. */}
      <section id="recarga" className="scroll-mt-20 px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="pricing">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">La forma más fácil de empezar</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">Empieza con el kit. <span className="text-primary">Sin mensualidad.</span></h2>
            <p className="mt-5 text-base leading-7 text-white/58">Un solo pago y en 48 horas tu asesor está vendiendo. Después recargas como recargas el celular: poquito para atender tu tienda o un paquete grande para una campaña de ads.</p>
          </div>

          <article className="mt-12 overflow-hidden rounded-[2rem] bg-ink text-white ring-1 ring-primary/30">
            <div className="grid lg:grid-cols-[.9fr_1.1fr]">
              <div className="flex flex-col p-7 sm:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">Kit de arranque</p>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-5xl font-extrabold tracking-tight tabular-nums sm:text-6xl">{nitroCompleteStarterKit.price}</span><span className="text-sm text-white/50">COP, un solo pago</span></p>
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/62">Todo lo que necesitas para que tu asesor empiece a vender. Sin mensualidad ni fecha de corte.</p>
                <a href={nitroAppUrl("/registro")} className="group mt-8 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-ink transition hover:bg-primary/85 sm:w-auto sm:self-start">Empezar con el kit <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
                <p className="mt-3 text-xs text-white/45">Pagas en línea con Nequi, PSE o Bancolombia.</p>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-7 sm:p-10 lg:border-l lg:border-t-0">
                <p className="text-sm font-semibold text-white">Incluye</p>
                <ul className="mt-5 space-y-4 text-sm leading-6 text-white/75">
                  {[
                    ["Tu WhatsApp listo para vender", `Número conectado e instalación en máximo ${nitroCompleteStarterKit.installHours} horas.`],
                    [`${nitroCompleteStarterKit.units.toLocaleString("es-CO")} unidades para tu asesor`, `≈ ${Math.floor(nitroCompleteStarterKit.units / UNITS_PER_CONVERSATION).toLocaleString("es-CO")} conversaciones de venta. Una unidad es una respuesta.`],
                    [`${nitroCompleteStarterKit.templates} plantillas de WhatsApp`, "Para confirmar pedidos y avisar envíos."],
                    ["Nitro Complete completo", "Asesor con tu catálogo real, pedidos, confirmaciones y tu panel."],
                  ].map(([title, text]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary"><Check className="size-3 text-ink" aria-hidden="true" /></span>
                      <span><strong className="block font-semibold text-white">{title}</strong>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ol className="grid border-t border-white/10 sm:grid-cols-3">
              {[
                ["Creas tu cuenta", "Y nos cuentas de tu negocio y tu catálogo."],
                ["Pagas el kit", `Instalamos y tu asesor sale a vender en máximo ${nitroCompleteStarterKit.installHours} horas.`],
                ["Recargas cuando quieras", `Desde ${formatCop(nitroCompleteUnitPacks[0].priceCop)}, en tu panel. Lo que compras no vence.`],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-3 border-white/10 p-6 sm:border-l sm:first:border-l-0 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-t-0">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 font-mono text-xs text-primary">{index + 1}</span>
                  <span className="text-sm leading-6 text-white/58"><strong className="block font-semibold text-white">{title}</strong>{text}</span>
                </li>
              ))}
            </ol>

            <details className="group border-t border-white/10">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-7 text-sm font-semibold text-white hover:text-primary sm:px-10 [&::-webkit-details-marker]:hidden">
                Ver precios de las recargas
                <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="px-7 pb-8 sm:px-10">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {nitroCompleteUnitPacks.map((pack) => (
                    <div key={pack.units} className="rounded-2xl bg-white/5 p-4">
                      <p className="text-lg font-semibold tabular-nums text-white">{pack.units.toLocaleString("es-CO")} <span className="text-xs font-normal text-white/45">unidades</span></p>
                      <p className="text-xs text-white/45">≈ {Math.floor(pack.units / UNITS_PER_CONVERSATION).toLocaleString("es-CO")} conversaciones</p>
                      <p className="mt-2 text-sm font-semibold tabular-nums text-primary">{formatCop(pack.priceCop)}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-white/45">Precios en pesos con IVA incluido. Plantillas aparte a {nitroCompleteTemplatePrice} cada una. Si se te acaban las unidades, las conversaciones en curso no se cortan.</p>
              </div>
            </details>
          </article>
        </div>
      </section>

      {/* Planes: para quien vende todos los días. El turno sale más barato y la
          implementación es asesoría personalizada con Juan. Sin meses gratis
          (se retiró el 2026-10-01). */}
      <section id="planes" className="scroll-mt-20 bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="pricing">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-nitro-text">Planes mensuales</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">¿Vendes todos los días? <span className="text-nitro-text">Un plan te sale más barato.</span></h2>
            <p className="mt-5 text-base leading-7 text-ink/62">El turno baja hasta {formatCop(Math.min(...nitroCompletePlans.map(planUnitPrice)))}, recibes {PLAN_TEMPLATES_PER_CYCLE} plantillas cada mes y empiezas con Juan a tu lado: la implementación es asesoría personalizada para dejar tu asesor vendiendo.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {nitroCompletePlans.map((plan) => (
              <article key={plan.name} id={`plan-${plan.slug}`} className={`relative flex scroll-mt-28 flex-col rounded-3xl p-7 outline-3 outline-offset-2 outline-transparent transition-[outline-color] duration-500 target:outline-[var(--verde-nitro)] sm:p-8 ${plan.featured ? "bg-ink text-white" : "border border-line bg-white"}`}>
                <div className="flex items-center justify-between">
                  <p className={`font-mono text-xs uppercase tracking-[0.12em] ${plan.featured ? "text-primary" : "text-ink/55"}`}>{plan.name}</p>
                  {plan.featured ? <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-ink">Recomendado</span> : null}
                </div>
                <p className="mt-5 flex items-baseline gap-2"><span className="text-4xl font-extrabold tracking-tight tabular-nums">{plan.price}</span><span className={`text-sm ${plan.featured ? "text-white/50" : "text-ink/50"}`}>COP / mes</span></p>
                <p className={`mt-4 text-sm font-semibold ${plan.featured ? "text-white" : "text-ink"}`}>{plan.capacity} · {formatCop(planUnitPrice(plan))} por turno</p>
                <p className={`mt-0.5 text-sm ${plan.featured ? "text-primary" : "text-nitro-text"}`}>≈ {conversationsFormat.format(planConversations(plan))} conversaciones de venta al mes</p>
                <p className={`mt-1 text-sm ${plan.featured ? "text-white/60" : "text-ink/60"}`}>{plan.fit}</p>
                <ul className={`mt-6 space-y-2.5 border-t pt-6 text-sm ${plan.featured ? "border-white/10 text-white/70" : "border-line text-ink/70"}`}>
                  {[
                    "Asesor con tu catálogo real, pedidos y panel",
                    `${PLAN_TEMPLATES_PER_CYCLE} plantillas de WhatsApp cada mes`,
                    "Campañas, Recovery y Nitro Marketing",
                    "Asesoría personalizada con Juan y soporte prioritario",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5"><Check className={`mt-0.5 size-4 shrink-0 ${plan.featured ? "text-primary" : "text-nitro-text"}`} />{item}</li>
                  ))}
                </ul>
                <Link href={primaryCta.href} className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition ${plan.featured ? "bg-primary text-ink hover:bg-primary/85" : "bg-ink text-white hover:bg-ink/85"}`}>Ver si es mi plan <ArrowRight className="size-4" /></Link>
              </article>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl bg-ink text-white">
            <div className="grid gap-6 p-7 sm:p-9 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">Implementación con Juan</p>
                <h3 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">No te entrego un bot. <span className="text-primary">Lo dejo vendiendo contigo.</span></h3>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-4xl font-extrabold tracking-tight tabular-nums">{nitroCompleteImplementation}</span><span className="text-sm text-white/50">COP, una sola vez</span></p>
                <p className="mt-3 text-sm leading-6 text-white/58">Trabajamos juntos tu operación de punta a punta: lo que vendes, cómo lo vendes y lo que tu asesor nunca debe decir. El alcance se confirma antes de iniciar.</p>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {nitroCompleteImplementationIncludes.map((item, index) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <span className="flex size-7 items-center justify-center rounded-full border border-primary/40 font-mono text-xs text-primary">{index + 1}</span>
                    <p className="mt-3 text-sm leading-6 text-white/78">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="border-t border-white/10 px-7 py-4 text-xs leading-5 text-white/45 sm:px-9">Desarrollos a medida e integraciones no soportadas se cotizan aparte.</p>
          </div>

          {/* Prepago o plan, en cinco líneas. Solo diferencias reales (nitro_bot:
              docs/modules/prepago.md). */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-line bg-white text-left text-sm">
              <caption className="sr-only">Prepago frente a plan mensual</caption>
              <thead>
                <tr className="text-xs uppercase tracking-[0.08em] text-ink/50">
                  <th scope="col" className="px-5 py-3 font-medium"></th>
                  <th scope="col" className="px-5 py-3 font-medium">Prepago</th>
                  <th scope="col" className="px-5 py-3 font-medium text-nitro-text">Plan mensual</th>
                </tr>
              </thead>
              <tbody className="[&_td]:border-t [&_td]:border-line [&_td]:px-5 [&_td]:py-3 [&_th]:border-t [&_th]:border-line [&_th]:px-5 [&_th]:py-3">
                {[
                  ["Para empezar", `Kit de ${nitroCompleteStarterKit.price}`, `Implementación de ${nitroCompleteImplementation} con Juan`],
                  ["Cómo pagas", "Recargas cuando quieras, sin fecha de corte", "Mensualidad con fecha de corte"],
                  ["Precio del turno", `De ${formatCop(Math.min(...nitroCompleteUnitPacks.map((p) => p.priceCop / p.units)))} a ${formatCop(Math.max(...nitroCompleteUnitPacks.map((p) => p.priceCop / p.units)))}`, `Desde ${formatCop(Math.min(...nitroCompletePlans.map(planUnitPrice)))}`],
                  ["Plantillas", `Las compras a ${nitroCompleteTemplatePrice}`, `${PLAN_TEMPLATES_PER_CYCLE} incluidas cada mes`],
                  ["Acompañamiento", `Instalación en ${nitroCompleteStarterKit.installHours} horas`, "Asesoría personalizada con Juan"],
                  ["Ideal para", "Probar, vender a tu ritmo o cubrir una campaña", "Vender todos los días con volumen"],
                ].map(([label, prepaid, plan]) => (
                  <tr key={label}>
                    <th scope="row" className="font-medium text-ink/60">{label}</th>
                    <td className="text-ink/80">{prepaid}</td>
                    <td className="font-medium text-ink">{plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="faq">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">Lo que conviene aclarar antes de conectarlo.</h2>
          <Accordion type="single" collapsible className="border-t border-white/10">
            {faqs.map(([question, answer]) => (
              <AccordionItem key={question} value={question} className="border-white/10">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-white hover:no-underline">{question}</AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-white/58">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8 lg:pb-24" data-nitro-orb="diagnostic">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/25 bg-superficie-nitro px-7 py-12 text-center sm:px-12">
          <Image src="/nitro/nitro-celebrando-512.webp" alt="" width={160} height={160} sizes="(min-width: 820px) 160px, 120px" loading="lazy" className={`mx-auto mb-4 size-[120px] object-contain min-[820px]:size-40 ${nitroMotion.floating}`} />
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Primero comprobamos <span className="text-primary">si encaja.</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">Responde una evaluación corta sobre tu catálogo, volumen y equipo. Recibes una recomendación inmediata y, si hay encaje, revisamos juntos la conexión.</p>
          <div className="mt-8 flex justify-center"><PrimaryCta /></div>
          <p className="mt-6 text-sm text-white/50">
            ¿Prefieres escribir? <a href={`mailto:${CONTACT_EMAILS.ventas}?subject=${encodeURIComponent("Quiero Nitro Complete")}`} className="font-semibold text-primary hover:underline">{CONTACT_EMAILS.ventas}</a>
            <span className="mx-2 text-white/25" aria-hidden="true">·</span>
            ¿Ya eres cliente? <a href={`mailto:${CONTACT_EMAILS.soporte}`} className="font-semibold text-white/75 hover:text-white hover:underline">{CONTACT_EMAILS.soporte}</a>
          </p>
        </div>
      </section>

      {/* Titular del producto (NIT-57): debe seguir siendo inequívoco para Meta
          y para quien ejerce sus derechos, pero como nota discreta de cierre. */}
      <section className="px-5 pb-12 lg:px-8" aria-label="Titular de Nitro Complete">
        <p className="mx-auto max-w-4xl text-center text-xs leading-5 text-white/40">
          Nitro Complete es un producto de {NITRO_COMPLETE_ENTITY.name} (NIT {NITRO_COMPLETE_ENTITY.nit}), {NITRO_COMPLETE_ENTITY.location}.{" "}
          <a href={`mailto:${NITRO_COMPLETE_ENTITY.email}`} className="underline underline-offset-2 hover:text-white/70">{NITRO_COMPLETE_ENTITY.email}</a>
          {" · "}
          <a href={NITRO_COMPLETE_ENTITY.whatsappLink} className="underline underline-offset-2 hover:text-white/70">WhatsApp {NITRO_COMPLETE_ENTITY.whatsapp}</a>
          {" · "}
          <Link href="/nitro-complete/privacidad" className="underline underline-offset-2 hover:text-white/70">Privacidad</Link>
          {" · "}
          <Link href="/nitro-complete/eliminacion-de-datos" className="underline underline-offset-2 hover:text-white/70">Eliminación de datos</Link>
        </p>
      </section>
    </div>
  );
}
