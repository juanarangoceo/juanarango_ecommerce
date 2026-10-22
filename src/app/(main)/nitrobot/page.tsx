import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { SalesContact } from "@/components/commercial/sales-contact";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  CircleDollarSign,
  Clock3,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { nitroCompleteStarterKit } from "@/lib/commercial-content";
import { ShopifyLogo } from "@/components/commercial/brand-logos";
import { WaTicks } from "@/components/commercial/whatsapp-ui";
import { NitroFilmPlayer } from "@/components/nitro/nitro-film";
import { NITRO_FILMS } from "@/lib/nitro-film";

const SITE_URL = "https://www.juanarangoecommerce.com";

export const metadata: Metadata = {
  title: "NitroBot | Convierte conversaciones de WhatsApp en pedidos",
  description:
    "NitroBot atiende, recomienda productos, cotiza con datos reales y crea pedidos desde WhatsApp. Conecta Shopify o administra tu catálogo directamente.",
  alternates: { canonical: `${SITE_URL}/nitrobot` },
  openGraph: {
    images: [{ url: "/og-nitro.png", width: 1200, height: 630 }],
    title: "NitroBot | Un sistema de ventas completo dentro de WhatsApp",
    description:
      "Atiende, vende, registra pedidos y escala casos humanos con tu catálogo real.",
    url: `${SITE_URL}/nitrobot`,
    siteName: "Juan Arango Ecommerce",
    type: "website",
    locale: "es_CO",
  },
};

const faqs = [
  [
    "¿NitroBot es solo un chatbot?",
    "No. El chat es la interfaz. Detrás hay catálogo real, cálculo de precios en el servidor, creación de pedidos, seguimiento, escalamiento humano, métricas y control operativo en un panel.",
  ],
  [
    "¿Necesito Shopify?",
    "No. NitroBot puede sincronizarse con Shopify o usar un catálogo administrado directamente en su panel. Por WhatsApp revisamos cuál ruta reduce más trabajo y riesgo para tu negocio.",
  ],
  [
    "¿La inteligencia artificial puede inventar precios?",
    "Los precios, envíos y totales no se dejan a criterio del modelo. NitroBot consulta y calcula esos datos desde el sistema antes de responder.",
  ],
  [
    "¿Qué pasa cuando el bot no debe responder?",
    "Escala la conversación a tu equipo con el contexto completo. La automatización no elimina el criterio humano: lo reserva para los casos donde sí aporta valor.",
  ],
  [
    "¿Cómo se define la capacidad que necesito?",
    "Revisamos el volumen de conversaciones, la complejidad del catálogo y la participación del equipo. La propuesta se ajusta a esa operación para no sobredimensionarla.",
  ],
  [
    "¿Cuánto cuesta empezar?",
    `La activación de Nitro Complete cuesta ${nitroCompleteStarterKit.price} COP una sola vez, con instalación, ${nitroCompleteStarterKit.units} turnos y ${nitroCompleteStarterKit.templates} plantillas. Después recargas cuando lo necesites, sin mensualidad. El saldo comprado no vence.`,
  ],
];

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NitroBot",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, WhatsApp",
  description:
    "Sistema de ventas por WhatsApp con IA, catálogo conectado, creación de pedidos, seguimiento y panel operativo.",
  url: `${SITE_URL}/nitrobot`,
  provider: { "@id": `${SITE_URL}/#organization` },
};

function Cta({ children = "Hablar por WhatsApp", dark = false }: { children?: React.ReactNode; dark?: boolean }) {
  return <WhatsAppJuanButton context={{ kind: "evaluation" }} placement="organic_product" variant={dark ? "dark" : "primary"}>{children}</WhatsAppJuanButton>;
}

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-16 bg-[radial-gradient(circle,rgba(183,255,42,.13),transparent_60%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0c100d] shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="nitro-icon-mark flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-[#111311]">
              <Bot className="nitro-icon-glyph h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Asesor de ventas</p>
              <p className="text-xs text-primary">
                En línea · catálogo sincronizado
              </p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-white/45">
            WhatsApp
          </span>
        </div>
        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-3 border-b border-white/8 bg-[#0a0d0b] p-5 lg:border-b-0 lg:border-r">
            <div className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-primary/12 px-4 py-3 text-sm text-white">
              Busco un vestido negro para una cena. ¿Qué me recomiendas?
              <span className="ml-2 inline-flex translate-y-0.5 items-center gap-1 text-[10px] text-white/45">10:14 p. m. <WaTicks /></span>
            </div>
            <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/[.07] px-4 py-3 text-sm leading-relaxed text-white/84">
              Tengo dos opciones disponibles. El Aurora es más formal y el Siena
              tiene un corte más relajado. ¿Qué talla usas?
            </div>
            <div className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-primary/12 px-4 py-3 text-sm text-white">
              M. Quiero el Aurora, pago contraentrega.
              <span className="ml-2 inline-flex translate-y-0.5 items-center gap-1 text-[10px] text-white/45">10:16 p. m. <WaTicks /></span>
            </div>
            <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/[.07] px-4 py-3 text-sm leading-relaxed text-white/84">
              Perfecto. Ya verifiqué talla M y el total. Confírmame ciudad,
              dirección y quién recibe.
            </div>
            <div className="flex items-center gap-2 pt-2 text-xs text-white/38">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Datos reales consultados antes de responder
            </div>
          </div>
          <div className="p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-white/45">
              La venta en el sistema
            </p>
            <div className="space-y-3">
              {[
                [PackageCheck, "Pedido listo", "Todos los datos completos"],
                [ShoppingBag, "Vestido Aurora · M", "Catálogo real"],
                [CircleDollarSign, "Total validado", "Producto + envío"],
                [RefreshCw, "Sincronización", "Pedido creado en Shopify"],
              ].map(([Icon, title, body]) => {
                const I = Icon as typeof PackageCheck;
                return (
                  <div
                    key={String(title)}
                    className="flex gap-3 rounded-xl border border-white/8 bg-white/[.025] p-3"
                  >
                    <I className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold text-white/84">
                        {String(title)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/38">
                        {String(body)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-xl border border-primary/15 bg-primary/7 p-3 text-center text-xs font-bold text-primary">
              Del chat al pedido, sin transcribir
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NitroBotPage() {
  return (
    <main className="overflow-hidden bg-[#080a09] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative px-5 pb-20 pt-32 sm:px-6 lg:pb-28 lg:pt-40" data-nitro-orb="idle">
        <div className="absolute inset-0 bg-grid-white opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,.84fr)_minmax(26rem,1fr)] lg:gap-16">
            <div className="text-center lg:text-left">
              <Link href="/nitro-complete" className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[.06] px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:border-primary/50">
                NitroBot es el asesor de <span className="font-semibold text-primary">Nitro Complete</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <h1 className="max-w-3xl font-display text-[clamp(2.8rem,4.7vw,4.9rem)] font-bold leading-[.96] tracking-[-.05em]">
                Tu WhatsApp puede{" "}
                <span className="text-primary">cerrar ventas</span>, no solo
                responder chats.
              </h1>
              <p className="mx-auto mt-7 max-w-xl text-left text-lg leading-relaxed text-white/58 lg:mx-0">
                NitroBot{" "}<strong className="nitro-hl">consulta tu catálogo</strong>,{" "}
                <strong className="nitro-hl">recomienda</strong>,{" "}
                <strong className="nitro-hl">cotiza con cifras reales</strong>,{" "}
                <strong className="nitro-hl">recoge los datos</strong> y{" "}
                <strong className="nitro-hl">crea el pedido</strong>. Tu equipo
                entra solo cuando hace falta criterio humano.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Cta />
                <a
                  href="#como-funciona"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-bold text-white/84 transition hover:bg-white/5"
                >
                  Ver cómo trabaja
                </a>
              </div>
              <p className="mt-4 text-xs text-white/38">
                Evaluación gratuita · Resultado inmediato · Sin compromiso
              </p>
            </div>
            <ProductPreview />
          </div>
        </div>
      </section>

      {/* Nitro en 30 segundos */}
      <section id="video" className="scroll-mt-20 px-5 pb-16 pt-4 sm:px-6 lg:pb-24" data-nitro-orb="flow">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-balance text-center font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Nitro en <span className="text-primary">30 segundos.</span>
          </h2>
          <NitroFilmPlayer film={NITRO_FILMS.cut30} />
        </div>
      </section>

      <section
        id="como-funciona"
        className="bg-ground px-5 py-20 text-ink sm:px-6 lg:py-28"
        data-nitro-orb="flow"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-left">
              La conversación es solo <span className="text-nitro-text">la parte visible.</span>
            </h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-ink/65 lg:mx-0 lg:justify-self-end lg:text-left">
              Cada mensaje activa una operación diseñada para vender con
              control: datos reales, reglas de negocio y trazabilidad para tu
              equipo.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                MessageCircle,
                "01",
                "Entiende",
                "Interpreta intención, producto y contexto.",
              ],
              [
                Store,
                "02",
                "Consulta",
                "Busca catálogo, disponibilidad y políticas reales.",
              ],
              [
                CircleDollarSign,
                "03",
                "Calcula",
                "Precios, envíos y totales se resuelven en servidor.",
              ],
              [
                PackageCheck,
                "04",
                "Ejecuta",
                "Crea el pedido o entrega el caso completo a tu equipo.",
              ],
            ].map(([Icon, n, t, d]) => {
              const I = Icon as typeof MessageCircle;
              return (
                <article key={String(n)} className="group bg-white p-7">
                  <div className="flex items-center justify-between">
                    <span className="nitro-icon-mark flex size-10 items-center justify-center rounded-xl bg-ink text-primary"><I className="nitro-icon-glyph h-5 w-5" /></span>
                    <span className="font-mono text-xs text-ink/45">
                      {String(n)}
                    </span>
                  </div>
                  <h3 className="mt-10 text-xl font-bold">{String(t)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/62">
                    {String(d)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Automatiza el trabajo repetitivo. Conserva el control.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/58">
                NitroBot está diseñado alrededor de lo que ocurre antes, durante
                y después del pedido.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  Clock3,
                  "Atención continua",
                  "Responde consultas incluso cuando el equipo no está conectado.",
                ],
                [
                  Users,
                  "Escalamiento humano",
                  "Entrega los casos especiales con conversación y contexto.",
                ],
                [
                  RefreshCw,
                  "Seguimiento",
                  "Retoma conversaciones y acompaña el proceso posterior a la venta.",
                ],
                [
                  LayoutDashboard,
                  "Panel operativo",
                  "Centraliza chats, pedidos, tickets, clientes, consumo y métricas.",
                ],
                [
                  ShieldCheck,
                  "Reglas duras",
                  "Cifras y decisiones críticas no dependen de que la IA las recuerde.",
                ],
                [
                  Headphones,
                  "Implementación acompañada",
                  "Configuramos catálogo, comportamiento, pruebas y salida controlada.",
                ],
              ].map(([Icon, title, body]) => {
                const I = Icon as typeof Clock3;
                return (
                  <article
                    key={String(title)}
                    className="group rounded-2xl border border-white/9 bg-white/[.025] p-6"
                  >
                    <span className="nitro-icon-mark flex size-10 items-center justify-center rounded-2xl bg-primary/9 text-primary"><I className="nitro-icon-glyph h-5 w-5" /></span>
                    <h3 className="mt-5 text-lg font-bold">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {String(body)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#0b0e0c] px-5 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Dos formas de conectar <span className="text-primary">tu catálogo real.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/52">La ruta depende de cómo opera hoy tu negocio. En ambos casos el asesor consulta información gestionada por el sistema antes de responder.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="group rounded-2xl border border-primary/24 bg-primary/7 p-6 text-white">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-white/[.06]"><ShopifyLogo className="size-6" /></span>
              <h3 className="mt-5 text-xl font-bold">Shopify</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/52">
                Sincroniza productos y deja los pedidos creados en la tienda.
              </p>
            </div>
            <div className="group rounded-2xl border border-white/10 bg-[#0d110e] p-6">
              <span className="nitro-icon-mark flex size-11 items-center justify-center rounded-2xl bg-primary/9 text-primary"><ShoppingBag className="nitro-icon-glyph h-5 w-5" /></span>
              <h3 className="mt-5 text-xl font-bold">Catálogo Nitro</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/52">
                Administra productos directamente cuando no usas Shopify.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="recarga" className="px-5 py-16 sm:px-6 lg:py-24" data-nitro-orb="pricing">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-primary/30 bg-superficie-nitro p-7 sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div><h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Tu asesor empieza con una activación.<br /><span className="text-primary">Después, recargas.</span></h2><p className="mt-5 text-lg leading-8 text-white/75">{nitroCompleteStarterKit.price} COP, una sola vez. Incluye instalación, número gestionado por Nitro, {nitroCompleteStarterKit.units} turnos y {nitroCompleteStarterKit.templates} plantillas. Sin mensualidad.</p></div>
          <div className="flex flex-col gap-4"><WhatsAppJuanButton context={{ kind: "kit" }} placement="organic_activation">Activar mi asesor</WhatsAppJuanButton><Link href="/nitro-complete#recarga" className="py-2 text-center text-sm font-semibold text-white underline underline-offset-4 hover:text-primary">Ver qué incluye y precios de recargas</Link><Link href="/nitro-complete#empresas" className="py-2 text-center text-sm font-semibold text-white/75 underline underline-offset-4 hover:text-primary">Contacto para empresas con mayor capacidad</Link></div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[.018] px-5 py-20 sm:px-6 lg:py-28" data-nitro-orb="faq">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Lo que deberías aclarar antes de conectarlo.
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="border-t border-white/10"
          >
            {faqs.map(([q, a], index) => (
              <AccordionItem
                key={q}
                value={`faq-${index}`}
                className="border-white/10"
              >
                <AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-sm leading-relaxed text-white/58">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:py-32" data-nitro-orb="diagnostic">
        <SalesContact placement="organic_closing" />
      </section>
    </main>
  );
}
