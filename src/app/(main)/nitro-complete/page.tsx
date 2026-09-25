import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock3, Hand, LayoutTemplate, Megaphone, Radar, ShieldCheck, SlidersHorizontal, Store } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NitroCompletePreview } from "@/components/commercial/nitro-complete-preview";
import { SalesCalculator } from "@/components/commercial/sales-calculator";
import { WhatsAppStory } from "@/components/commercial/whatsapp-story";
import { ShopifyLogo, WhatsAppLogo } from "@/components/commercial/brand-logos";
import { nitroCompleteImplementation, nitroCompleteModules, nitroCompletePlans, primaryCta } from "@/lib/commercial-content";

const SITE_URL = "https://www.juanarangoecommerce.com";

export const metadata: Metadata = {
  title: "Nitro Complete | Vende, confirma y haz seguimiento por WhatsApp con IA",
  description:
    "Nitro Complete atiende con tu catálogo real, crea el pedido, lo confirma antes del despacho, avisa el envío y retoma las ventas pendientes. Con Shopify o sin tienda online.",
  alternates: { canonical: `${SITE_URL}/nitro-complete` },
  openGraph: {
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

const faqs = [
  ["¿Es un chatbot?", "No. El chat es la parte visible. Detrás hay catálogo real, cálculo de precios en el servidor, creación de pedidos, confirmación, postventa, seguimiento, casos para tu equipo y un panel con lo vendido."],
  ["¿Qué diferencia hay con NitroBot?", "NitroBot es el asesor que conversa y crea el pedido. Nitro Complete es el sistema completo: ese asesor más todo lo que pasa después del chat, organizado en un solo panel."],
  ["¿Necesito Shopify?", "No. Puedes sincronizar tu tienda Shopify o administrar el catálogo directamente en Nitro. En la evaluación definimos la ruta que te da menos trabajo."],
  ["¿Puede equivocarse con los precios?", "Los precios, envíos y totales no quedan a criterio de la IA: se consultan y calculan desde el sistema antes de responder."],
  ["¿Le escribe a mis clientes sin permiso?", "No. Las respuestas ocurren cuando el cliente escribe. Los mensajes de seguimiento y recuperación usan plantillas aprobadas por Meta, respetan horarios y excluyen a quien pidió no recibir promociones."],
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
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-white"><WhatsAppLogo className="size-4" />Nitro Complete para WhatsApp</p>
            <h1 className="mt-4 text-balance text-[clamp(2.5rem,5.8vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
              Un equipo de ventas completo <span className="text-primary">dentro de tu WhatsApp.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/62 lg:mx-0">
              Atiende con tu catálogo real, crea el pedido, lo confirma antes del despacho, avisa el envío y retoma las ventas que quedaron pendientes. Tú ves todo desde un panel y decides cuándo entra tu equipo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <PrimaryCta />
              <Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent px-7 text-base text-white hover:bg-white/7 hover:text-white"><Link href="#planes">Ver planes</Link></Button>
            </div>
            <p className="mt-5 text-xs text-white/40">Evaluación gratuita · Resultado inmediato · Sin llamada obligatoria</p>
          </div>
          <NitroCompletePreview />
        </div>
      </section>

      {/* Recorrido del pedido */}
      <section className="bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="flow">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">Del primer mensaje <span className="text-nitro-text">a la entrega.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-ink/65 lg:mx-0 lg:justify-self-end lg:text-left">Cada parte trabaja en un momento distinto. Juntas cubren el recorrido en el que hoy se pierden más ventas.</p>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nitroCompleteModules.map(({ key, moment, title, text, icon: Icon }) => (
              <li key={key} className="rounded-2xl border border-line bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="nitro-icon-mark flex size-10 items-center justify-center rounded-xl bg-ink text-primary"><Icon className="nitro-icon-glyph size-5" /></span>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50">{moment}</p>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/62">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-xs leading-5 text-ink/50 lg:text-left">La confirmación aplica a pedidos contraentrega de Shopify y de Nitro Landing. Seguimiento y recuperación requieren plantillas aprobadas por Meta y el permiso del comprador.</p>
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

      {/* Catálogo */}
      <section className="border-y border-white/7 bg-superficie-nitro px-5 py-16 lg:px-8 lg:py-20" data-nitro-orb="ecosystem">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Funciona con tu forma de vender.</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/55 lg:mx-0">En ambos casos el asesor consulta información real antes de responder y el pedido queda registrado.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-background p-6"><ShopifyLogo className="size-6" /><h3 className="mt-4 text-lg font-semibold text-white">Con Shopify</h3><p className="mt-2 text-sm leading-6 text-white/52">Sincroniza productos y crea los pedidos directamente en tu tienda.</p></article>
            <article className="rounded-2xl border border-white/10 bg-background p-6"><Store className="size-5 text-primary" /><h3 className="mt-4 text-lg font-semibold text-white">Sin tienda online</h3><p className="mt-2 text-sm leading-6 text-white/52">Sube tu catálogo a Nitro y gestiona los pedidos desde el panel.</p></article>
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

      {/* Planes */}
      <section id="planes" className="bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="pricing">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">Elige capacidad, <span className="text-nitro-text">no funciones recortadas.</span></h2>
            <p className="mt-5 text-base leading-7 text-ink/62">Los tres planes incluyen el asesor, los pedidos, el panel y el control humano. Cambia la capacidad mensual.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {nitroCompletePlans.map((plan) => (
              <article key={plan.name} className={`relative flex flex-col rounded-3xl p-7 sm:p-8 ${plan.featured ? "bg-ink text-white" : "border border-line bg-white"}`}>
                <div className="flex items-center justify-between">
                  <p className={`font-mono text-xs uppercase tracking-[0.12em] ${plan.featured ? "text-primary" : "text-ink/55"}`}>{plan.name}</p>
                  {plan.featured ? <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-ink">Recomendado</span> : null}
                </div>
                <p className="mt-5 flex items-baseline gap-2"><span className="text-4xl font-extrabold tracking-tight tabular-nums">{plan.price}</span><span className={`text-sm ${plan.featured ? "text-white/50" : "text-ink/50"}`}>COP / mes</span></p>
                <p className={`mt-4 text-sm font-semibold ${plan.featured ? "text-white" : "text-ink"}`}>{plan.capacity}</p>
                <p className={`mt-1 text-sm ${plan.featured ? "text-white/60" : "text-ink/60"}`}>{plan.fit}</p>
                <ul className={`mt-6 space-y-2.5 border-t pt-6 text-sm ${plan.featured ? "border-white/10 text-white/70" : "border-line text-ink/70"}`}>
                  {["Asesor con tu catálogo real", "Pedidos, casos y control humano", "Panel e implementación acompañada"].map((item) => (
                    <li key={item} className="flex gap-2.5"><Check className={`mt-0.5 size-4 shrink-0 ${plan.featured ? "text-primary" : "text-nitro-text"}`} />{item}</li>
                  ))}
                </ul>
                <Link href={primaryCta.href} className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition ${plan.featured ? "bg-primary text-ink hover:bg-primary/85" : "bg-ink text-white hover:bg-ink/85"}`}>Ver si es mi plan <ArrowRight className="size-4" /></Link>
              </article>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Implementación estándar: {nitroCompleteImplementation} COP, una sola vez.</p>
              <p className="mt-1 text-sm text-ink/55">El alcance final se confirma antes de iniciar. Plantillas de Meta, campañas, desarrollos a medida e integraciones no soportadas se cotizan aparte.</p>
            </div>
            <span className="shrink-0 rounded-full bg-nitro-soft px-3 py-1.5 text-xs font-semibold text-nitro-text">Sin compra automática</span>
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
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Primero comprobamos <span className="text-primary">si encaja.</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">Responde una evaluación corta sobre tu catálogo, volumen y equipo. Recibes una recomendación inmediata y, si hay encaje, revisamos juntos la conexión.</p>
          <div className="mt-8 flex justify-center"><PrimaryCta /></div>
        </div>
      </section>
    </div>
  );
}
