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
import { nitroCompletePlans } from "@/lib/commercial-content";

const SITE_URL = "https://www.juanarangoecommerce.com";

export const metadata: Metadata = {
  title: "NitroBot | Convierte conversaciones de WhatsApp en pedidos",
  description:
    "NitroBot atiende, recomienda productos, cotiza con datos reales y crea pedidos desde WhatsApp. Conecta Shopify o administra tu catálogo directamente.",
  alternates: { canonical: `${SITE_URL}/nitrobot` },
  openGraph: {
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
    "No. El chat es la interfaz. Detrás hay catálogo, cálculo server-side, creación de pedidos, seguimiento, escalamiento humano, métricas y control operativo en un panel.",
  ],
  [
    "¿Necesito Shopify?",
    "No. NitroBot puede sincronizarse con Shopify o usar un catálogo administrado directamente en su panel. En la evaluación definimos cuál ruta reduce más trabajo y riesgo para tu negocio.",
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
    "¿Cuánto cuesta la implementación?",
    "Primero revisamos compatibilidad, volumen, catálogo y alcance de implementación. Con ese contexto se presenta una propuesta clara antes de iniciar.",
  ],
];

const plans = nitroCompletePlans;

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

function Cta({
  children = "Evaluar mi operación",
  dark = false,
}: {
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Link
      href="/nitrobot/conectar"
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition ${dark ? "bg-black text-white hover:bg-[#111512]" : "bg-primary text-[#111311] hover:bg-[#c8ff5a]"}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
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
            </div>
            <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/[.07] px-4 py-3 text-sm leading-relaxed text-white/84">
              Tengo dos opciones disponibles. El Aurora es más formal y el Siena
              tiene un corte más relajado. ¿Qué talla usas?
            </div>
            <div className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-primary/12 px-4 py-3 text-sm text-white">
              M. Quiero el Aurora, pago contraentrega.
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
              Conversación → pedido, sin transcribir
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
      <section className="relative px-5 pb-20 pt-32 sm:px-6 lg:pb-28 lg:pt-40">
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
                NitroBot consulta tu catálogo, recomienda, cotiza con cifras
                reales, recoge los datos y crea el pedido. Tu equipo entra solo
                cuando hace falta criterio humano.
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

      <section
        id="como-funciona"
        className="border-y border-white/8 bg-white/[.018] px-5 py-20 sm:px-6 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
              La conversación es solo la parte visible.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/58">
              Cada mensaje activa una operación diseñada para vender con
              control: datos reales, reglas de negocio y trazabilidad para tu
              equipo.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
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
                <article key={String(n)} className="group bg-[#0c0f0d] p-7">
                  <div className="flex items-center justify-between">
                    <span className="nitro-icon-mark flex size-10 items-center justify-center rounded-2xl bg-primary/9 text-primary"><I className="nitro-icon-glyph h-5 w-5" /></span>
                    <span className="font-mono text-xs text-white/78">
                      {String(n)}
                    </span>
                  </div>
                  <h3 className="mt-12 text-xl font-bold">{String(t)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">
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
              <span className="nitro-icon-mark flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Store className="nitro-icon-glyph h-5 w-5" /></span>
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

      <section id="planes" className="px-5 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Elige capacidad sin perder <span className="text-primary">el núcleo del producto.</span>
            </h2>
            <p className="mt-5 text-white/58">
              Los tres planes incluyen el sistema de venta, el panel y el control humano. Cambia la capacidad mensual, no la posibilidad de cerrar pedidos.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => <article key={plan.name} className={`relative flex flex-col rounded-3xl border p-7 ${plan.featured ? "border-primary/38 bg-primary/[.065] shadow-[0_0_50px_rgba(183,255,42,.06)]" : "border-white/10 bg-[#0d110e]"}`}>{plan.featured ? <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 font-mono text-[9px] uppercase tracking-[.14em] text-[#111311]">Más elegido</span> : null}<p className="font-mono text-[10px] uppercase tracking-[.18em] text-primary">{plan.name}</p><div className="mt-7 flex items-end gap-2"><span className="text-4xl font-bold tracking-tight text-white">{plan.price}</span><span className="pb-1 text-xs text-white/38">COP / mes</span></div><p className="mt-5 border-t border-white/9 pt-5 text-sm font-semibold text-white/78">{plan.capacity}</p><p className="mt-3 text-sm leading-6 text-white/48">{plan.fit}</p><ul className="mt-6 space-y-3 text-xs leading-5 text-white/58">{["Catálogo conectado o administrado en NitroBot", "Pedidos, conversaciones y escalamiento humano", "Dashboard y acompañamiento de implementación"].map((item) => <li key={item} className="flex gap-2.5"><Check className="mt-0.5 size-3.5 shrink-0 text-primary" />{item}</li>)}</ul><div className="mt-auto pt-7"><Cta>Encontrar mi plan</Cta></div></article>)}
          </div>
          <div className="mt-6 grid gap-4 rounded-3xl border border-white/9 bg-[#0d110e] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7"><div><p className="font-semibold text-white">Implementación estándar: $700.000 COP una sola vez.</p><p className="mt-2 text-xs leading-5 text-white/42">El alcance final se confirma antes de iniciar. Plantillas de Meta, campañas, desarrollos a medida e integraciones no soportadas se cotizan aparte.</p></div><p className="rounded-full border border-primary/20 bg-primary/7 px-4 py-2 text-center text-xs font-medium text-primary">Evaluación sin compra automática</p></div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[.018] px-5 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
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

      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-primary/20 bg-[radial-gradient(circle_at_top_right,rgba(183,255,42,.14),transparent_38%),#0d110e] px-6 py-16 text-center sm:px-12">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Primero comprobamos si NitroBot puede generar valor en tu operación.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/58">
            Responde una evaluación corta. Recibirás una recomendación inmediata
            y, si hay encaje, pasamos a revisar la conexión.
          </p>
          <div className="mt-9">
            <Cta>Comprobar compatibilidad</Cta>
          </div>
        </div>
      </section>
    </main>
  );
}
