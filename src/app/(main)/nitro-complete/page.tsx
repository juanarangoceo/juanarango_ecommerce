import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NitroVoiceShowcase } from "@/components/commercial/nitro-voice-showcase";
import { NitroCommerceJourney } from "@/components/commercial/nitro-commerce-journey";
import { NitroOperationsToolkit } from "@/components/commercial/nitro-operations-toolkit";
import { NitroHero } from "@/components/nitro/nitro-hero";
import { IntegrationLogoStrip } from "@/components/commercial/integration-logo-strip";
import { SalesCalculator } from "@/components/commercial/sales-calculator";
import { WhatsAppStory } from "@/components/commercial/whatsapp-story";
import { nitroCompleteMonthly as plan, nitroCompleteMonthlyConversations, nitroCompleteUnitPacks, formatCop } from "@/lib/commercial-content";
import { NitroMonthlyPricing } from "@/components/commercial/nitro-monthly-pricing";
import { NitroEasyStart } from "@/components/commercial/nitro-easy-start";
import { NitroCatalogPaths } from "@/components/commercial/nitro-catalog-paths";
import { EnterpriseContact } from "@/components/commercial/enterprise-contact";
import { CONTACT_EMAILS } from "@/lib/contact-emails";
import { NITRO_COMPLETE_ENTITY } from "@/components/legal/legal-shell";
import { nitroAppUrl } from "@/lib/nitrobot-intake";
import { SalesContact } from "@/components/commercial/sales-contact";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { NitroFilmPlayer } from "@/components/nitro/nitro-film";
import { NITRO_FILMS } from "@/lib/nitro-film";

const SITE_URL = "https://www.juanarangoecommerce.com";

export const metadata: Metadata = {
  title: "Nitro Complete | WhatsApp con IA, voz y pagos en Colombia",
  description:
    `Un asesor que vende por tu WhatsApp con tu catálogo real, con o sin Shopify. ${plan.price} al mes en Colombia, listo en menos de ${plan.installHours} horas.`,
  alternates: { canonical: `${SITE_URL}/nitro-complete` },
  openGraph: {
    images: [{ url: "/og-nitro.png", width: 1200, height: 630 }],
    title: `Nitro Complete | Tu WhatsApp vende solo. ${plan.price} / mes`,
    description: "Atiende, cotiza y deja el pedido creado con tu catálogo real. Con Shopify o con tus productos subidos a Nitro.",
    url: `${SITE_URL}/nitro-complete`,
    siteName: "Juan Arango Ecommerce",
    type: "website",
    locale: "es_CO",
  },
};

const faqs = [
  ["¿Cuánto cuesta empezar?", `${plan.price} COP Cada mes trae tu número de WhatsApp gestionado por Nitro, ${plan.turns} turnos (unas ${nitroCompleteMonthlyConversations} conversaciones de venta) y ${plan.templates} envíos de plantilla. No hay contrato ni cobro automático: pagas el mes cuando quieres seguir.`],
  ["¿Necesito Shopify o una tienda online?", "No. Si no tienes tienda, creas tus productos en tu panel de Nitro: uno a uno con fotos desde el celular, o todos de una vez con la plantilla de Excel. Los pedidos quedan en tu panel. Si tienes Shopify, lo conectas y productos y pedidos se sincronizan con tu tienda."],
  ["¿Qué necesito para empezar?", "Productos con foto, precio y descripción, y los datos de tu negocio: cómo cobras, a dónde envías y quién atiende los casos que requieren una persona. Lo completamos contigo por WhatsApp."],
  ["¿Cuándo queda listo y cuándo empieza mi mes?", `La instalación toma menos de ${plan.installHours} horas desde que estén el pago y la información de tu negocio. Tu primer mes empieza el día que tu asesor queda atendiendo, no el día que pagas.`],
  ["¿Qué pasa si se me acaban los turnos del mes?", `Recargas desde tu panel cuando lo necesites; las recargas empiezan en ${formatCop(nitroCompleteUnitPacks[0].priceCop)}. Se usan después de lo incluido en el mes y no vencen. Existe un crédito temporal de 24 horas mientras recargas; lo consumido se descuenta de la siguiente recarga.`],
  ["¿Y si no renuevo el mes?", "Tu asesor se pausa, aunque tengas recargas, y tus clientes dejan de recibir respuesta automática. Tu panel, tus datos y lo que recargaste se conservan. Cuando pagas el mes, vuelve a atender y tu fecha de renovación se mantiene."],
  ["¿Puedo usar mi número actual?", "Nitro Complete incluye un número gestionado por Nitro. Si quieres usar el que ya tienes, revisamos su situación y el proceso con Meta antes de que pagues; no todos los números tienen la misma conexión."],
  ["¿Qué es un turno y qué es una plantilla?", "Un turno es cada respuesta que envía tu asesor; una conversación puede necesitar varios. Las plantillas son mensajes aprobados por Meta, como confirmaciones o avisos de envío, y tienen su propio saldo. La calculadora estima turnos, no conversaciones garantizadas."],
  ["¿Puede responder con mi voz y atender llamadas?", "Sí. Para las notas de voz puedes elegir Sara o Carlos, o solicitar una voz clonada con una grabación y tu autorización. Nitro prepara y prueba la voz antes de activarla. Nitro Call atiende llamadas entrantes de WhatsApp al habilitarlo, tiene 8 voces propias y saldo separado en COP que se consume por segundos. La voz clonada para audios no se usa en llamadas. La confirmación de compra continúa por escrito en el chat."],
  ["¿Cómo cobra a mis compradores?", "Conectas tu cuenta de comercio Confío y Nitro comparte un enlace de pago dentro de WhatsApp. La integración recibe la confirmación del pago para continuar con el pedido. Los medios disponibles y las condiciones dependen de tu cuenta Confío. También puedes trabajar con pedidos contraentrega."],
  ["¿El seguimiento y las guías están incluidos?", "17TRACK se habilita por tienda para consultar guías y tiene un saldo separado por guía rastreada. Los avisos al comprador requieren configuración y plantillas de WhatsApp. La disponibilidad depende de la guía y la transportadora. La creación de guías con Skydropx está en preparación y todavía no está disponible."],
  ["¿Qué pasa si mi empresa necesita más capacidad?", "Cuéntanos tu volumen y qué necesitas en el bloque para empresas. Juan revisará tu operación y te contactará para definir el alcance, las conexiones y la capacidad adecuada."],
  ["¿Qué diferencia hay con NitroBot?", "NitroBot es el asesor que conversa y crea el pedido. Nitro Complete reúne ese asesor con las herramientas para gestionar lo que ocurre después de la venta, en un solo panel. Algunas funciones requieren configuración y plantillas aprobadas."],
  ["¿Le escribe a mis clientes sin permiso?", "Responde cuando el cliente escribe. Los mensajes de seguimiento y recuperación respetan los horarios y permisos del comprador; fuera de la ventana de WhatsApp requieren plantillas aprobadas por Meta. Nunca escribe a quien pidió no recibir mensajes."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nitro Complete",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, WhatsApp",
  description: "Sistema de ventas por WhatsApp con IA para Colombia: catálogo real, texto y voz, llamadas entrantes, pagos con Confío y seguimiento con 17TRACK. Las conexiones y saldos se habilitan según cada función.",
  url: `${SITE_URL}/nitro-complete`,
  provider: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "Offer",
    name: "Nitro Complete · mensualidad",
    price: String(plan.priceCop),
    priceCurrency: "COP",
    description: `Mensualidad con número gestionado, ${plan.turns} turnos y ${plan.templates} plantillas; recargas aparte que no vencen.`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
};

export default function NitroCompletePage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-[73px]"><IntegrationLogoStrip /></div>

      <section className="relative px-5 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-16" data-nitro-orb="idle">
        <div className="pointer-events-none absolute right-[8%] top-24 size-96 rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0 text-center lg:text-left">
            <h1 className="text-white">
              <span className="block text-[clamp(2.6rem,5.6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">Nitro Complete</span>
              <span className="mt-4 block text-balance text-[clamp(1.6rem,3.1vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
                Tu WhatsApp vende solo.<br /><span className="text-primary">{plan.price} / mes.</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-left text-lg leading-8 text-white/62 lg:mx-0">
              Un asesor que le contesta a tus clientes a cualquier hora, <strong className="nitro-hl">vende con tu catálogo real</strong> y te deja el pedido creado. Con Shopify o con tus productos subidos a Nitro: <strong className="font-semibold text-white">no necesitas tienda online.</strong>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <WhatsAppJuanButton context={{ kind: "hero" }} placement="product_hero">Quiero empezar</WhatsAppJuanButton>
              <Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent px-7 text-base text-white hover:bg-white/7 hover:text-white"><Link href="#empezar">Cómo empiezo</Link></Button>
            </div>
            {/* Lo que decide la entrada, en una línea: qué cubre el pago, tiempo y requisito. */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold text-white/75 lg:justify-start">
              <li>Listo en menos de {plan.installHours} h</li>
              <li aria-hidden="true" className="text-white/30">·</li>
              <li><Link href="#catalogo" className="underline decoration-white/25 underline-offset-4 hover:text-white">Con o sin tienda online</Link></li>
              <li aria-hidden="true" className="text-white/30">·</li>
              <li>Sin contrato</li>
            </ul>
            <p className="mt-3 text-sm text-white/55">
              ¿Ya eres cliente? <a href={nitroAppUrl("/login")} className="font-semibold text-white/70 hover:text-white hover:underline">Ingresar</a>
            </p>
          </div>
          <NitroHero />
        </div>
      </section>

      <NitroEasyStart />

      {/* El film: la venta completa en 86 segundos, con voz y subtítulos */}
      <section id="video" className="scroll-mt-20 px-5 pb-4 pt-6 lg:px-8 lg:pt-10" data-nitro-orb="flow">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">Míralo vender <span className="text-primary">de principio a fin.</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-white/75">La venta, la confirmación, el envío y el seguimiento, en menos de un minuto y medio.</p>
          </div>
          <NitroFilmPlayer film={NITRO_FILMS.full} />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 pb-16 lg:px-0">
        <details className="group mt-6 rounded-2xl border border-white/12 bg-superficie-nitro">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">Explorar una conversación de ejemplo<ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary>
          <div className="border-t border-white/10 p-4 sm:p-6"><WhatsAppStory /></div>
        </details>
      </div>

      <NitroCatalogPaths />
      <NitroMonthlyPricing />
      <NitroCommerceJourney />
      <NitroOperationsToolkit />
      <NitroVoiceShowcase />

      {/* Calculadora */}
      <section id="calculadora" className="scroll-mt-24 border-t border-white/7 px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="calculator">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">¿Te alcanza el mes?<br /><span className="text-primary">Calcúlalo en un minuto.</span></h2>
            <p className="mx-auto max-w-lg text-center text-lg leading-8 text-white/75 lg:mx-0 lg:justify-self-end lg:text-left">Ajusta las consultas que recibes y las respuestas que suele necesitar cada cliente. Te mostramos si te alcanzan los {plan.turns} turnos del mes o cuánto recargar.</p>
          </div>
          <SalesCalculator />
        </div>
      </section>

      <EnterpriseContact />

      {/* FAQ */}
      <section id="preguntas" className="scroll-mt-24 px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="faq">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">Antes de empezar, resuelve tus dudas.</h2>
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
        <SalesContact placement="product_closing" />
        <p className="mx-auto mt-5 max-w-7xl text-center text-base leading-7 text-white/70">
          ¿Ya eres cliente? <a href={`mailto:${CONTACT_EMAILS.soporte}`} className="font-semibold text-white underline underline-offset-4 hover:text-primary">Escríbenos a soporte</a>
        </p>
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
