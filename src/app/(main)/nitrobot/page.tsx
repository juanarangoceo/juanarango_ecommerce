import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ChatMockup } from "@/components/nitrobot/chat-mockup"
import { PanelMockup } from "@/components/nitrobot/panel-mockup"
import { ConversationGallery } from "@/components/nitrobot/conversation-gallery"
import { NitroBotCta } from "@/components/nitrobot/nitrobot-cta"
import { heroConversation, stepFragments } from "@/components/nitrobot/conversations"
import { NitroBotForm } from "@/components/nitrobot/nitrobot-form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const SITE_URL = "https://www.juanarangoecommerce.com"

export const metadata: Metadata = {
  title: "NitroBot | Ventas y atención por WhatsApp con IA",
  description:
    "NitroBot atiende, asesora y cierra ventas por WhatsApp con inteligencia artificial entrenada en tu catálogo y en tu forma de hablar. Tú defines hasta dónde llega; él hace el resto.",
  alternates: {
    canonical: `${SITE_URL}/nitrobot`,
  },
  openGraph: {
    title: "NitroBot | Tu mejor vendedor ahora responde en segundos",
    description:
      "Ventas y atención por WhatsApp con IA entrenada en tu catálogo y en tu forma de hablar. La mejor forma de evaluarlo: habla con él.",
    url: `${SITE_URL}/nitrobot`,
    siteName: "Juan Arango Ecommerce",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Tu mejor vendedor ahora responde en segundos")}&category=NITROBOT`,
        width: 1200,
        height: 630,
        alt: "NitroBot — Ventas y atención por WhatsApp con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NitroBot | Ventas y atención por WhatsApp con IA",
    description:
      "Tu mejor vendedor ahora responde en segundos. A toda hora, todos los días.",
  },
}

// S2 · Datos del mercado. REGLA INNEGOCIABLE: solo cifras reales con fuente verificable
// y enlazada. Si no hay cifra validada, la sección NO se muestra.
// TODO: Juan debe validar cada cifra y su fuente (Meta, Statista, cámaras de comercio)
// y llenar este array. Mientras esté vacío, la sección no se renderiza.
const whatsappStats: { value: string; label: string; sourceName: string; sourceUrl: string }[] = []

// Schema.org: SoftwareApplication sin precio (modelo de contacto directo)
const nitrobotSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NitroBot",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, WhatsApp",
  description:
    "Ventas y atención por WhatsApp con inteligencia artificial entrenada en el catálogo y el tono de cada negocio. Implementado a la medida por Juan Arango (NITRO ECOM).",
  url: `${SITE_URL}/nitrobot`,
  author: {
    "@id": `${SITE_URL}/#person`,
  },
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
}

const faqs = [
  {
    q: "¿Va a sonar robótico con mis clientes?",
    a: "Va a sonar como tu mejor asesor. Entrenamos a NitroBot con tu catálogo, tus políticas y tu forma de hablar — y tú apruebas cómo suena antes de que atienda a tu primer cliente. La prueba está arriba: las conversaciones que viste son el estilo real del producto.",
  },
  {
    q: "¿Qué pasa cuando necesita criterio humano?",
    a: "Te la pasa a ti. Cuando una conversación requiere criterio — una negociación, un caso especial — NitroBot la transfiere a tu equipo con todo el contexto a la vista en el panel. Así cada cliente recibe siempre la mejor respuesta: la instantánea del bot o la de tu equipo cuando aporta más valor.",
  },
  {
    q: "¿Qué pasa con los datos de mis clientes?",
    a: "Tus conversaciones y tus clientes son tuyos. Los datos se usan únicamente para que NitroBot atienda tu negocio y permanecen bajo tu control. El detalle completo está en la política de privacidad del sitio.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "Depende del tamaño de tu catálogo y de las integraciones que necesites. En el diagnóstico revisamos tu operación y te doy un cronograma real desde el primer día, antes de cualquier pago.",
  },
  {
    q: "¿Necesito cambiar mi número o mi tienda?",
    a: "Sigues con tu número y tu tienda de siempre: NitroBot se conecta a lo que ya tienes y empieza a trabajar.",
  },
]

export default function NitroBotPage() {
  return (
    <main className="min-h-screen bg-negro-profundo">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nitrobotSchema) }}
      />

      {/* ============ S1 · Hero — La conversación que vende sola ============ */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left order-1">
              <p className="font-dm-mono text-xs md:text-sm uppercase tracking-[0.25em] text-primary mb-6">
                NitroBot · Ventas y atención por WhatsApp con IA
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6 text-balance">
                Tu mejor vendedor ahora responde en segundos.{" "}
                <span className="text-primary">A toda hora, todos los días.</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-[60ch] mx-auto lg:mx-0 mb-10">
                NitroBot atiende, asesora y cierra ventas por WhatsApp con inteligencia artificial
                entrenada en tu catálogo y en tu forma de hablar. Tú defines hasta dónde llega;
                él hace el resto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start order-3">
                <NitroBotCta />
                <a
                  href="#contacto-nitrobot"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-bold border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                >
                  Solicitar diagnóstico
                </a>
              </div>
            </div>
            <div className="flex justify-center order-2">
              <ChatMockup messages={heroConversation} loop />
            </div>
          </div>
        </div>
      </section>

      {/* ============ S2 · El contexto — solo se muestra con cifras validadas y con fuente ============ */}
      {whatsappStats.length > 0 && (
        <section className="py-16 md:py-24 px-6 bg-azul-estructura">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-12">
              {whatsappStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-3">{stat.value}</p>
                  <p className="text-lg text-zinc-300 mb-3">{stat.label}</p>
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-dm-mono text-xs text-zinc-400 underline hover:text-white"
                  >
                    Fuente: {stat.sourceName}
                  </a>
                </div>
              ))}
            </div>
            <p className="text-center text-xl text-zinc-200 mt-16 font-medium">
              Tus clientes ya viven en WhatsApp. La pregunta es quién les responde — y qué tan rápido.
            </p>
          </div>
        </section>
      )}

      {/* ============ S3 · Cómo funciona — Tres pasos, cero jerga ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-balance">
            Cómo funciona — tres pasos, cero jerga
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stepFragments.map((step) => (
              <div
                key={step.step}
                className="relative p-8 rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-4 -right-2 text-[7rem] font-bold leading-none text-primary/20 select-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.step}
                </span>
                <h3 className="text-2xl font-bold mb-3 relative z-10">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 relative z-10">{step.desc}</p>
                {/* Mini-fragmento de chat, no ícono genérico */}
                <div className="space-y-2 relative z-10">
                  {step.chat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === "cliente" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[90%] rounded-xl px-3 py-1.5 text-xs leading-relaxed ${
                          msg.from === "cliente"
                            ? "bg-white/10 text-white"
                            : "bg-primary/10 text-zinc-200 font-dm-mono border border-primary/20"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ S4 · NitroBot en acción — Galería de conversaciones ============ */}
      <section className="py-16 md:py-24 px-6 bg-zinc-950/60">
        <div className="container mx-auto max-w-7xl">
          <p className="font-dm-mono text-xs md:text-sm uppercase tracking-[0.25em] text-primary mb-4">
            NitroBot en acción
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-balance">
            La mejor demo es verlo conversar.
          </h2>
          <ConversationGallery />
        </div>
      </section>

      {/* ============ S5 · El panel — Lo que tú ves mientras él trabaja ============ */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                Lo que tú ves mientras él trabaja
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cada conversación, cada venta y cada cliente quedan en tu panel. NitroBot trabaja solo,
                pero nunca a tus espaldas: tú decides cuándo entra un humano a la conversación.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                El traspaso bot → humano no es un truco de marketing: es un botón en tu panel.
                Cuando una conversación necesita criterio, la toma tu equipo con todo el contexto a la vista.
              </p>
            </div>
            <PanelMockup />
          </div>
        </div>
      </section>

      {/* ============ S6 · Quién está detrás — Juan ============ */}
      <section className="py-16 md:py-24 px-6 bg-zinc-950/60">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-center">
            <div className="relative max-w-sm w-full mx-auto">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-primary/25 via-transparent to-transparent blur-xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-zinc-900">
                <Image
                  src="https://res.cloudinary.com/dohwyszdj/image/upload/f_auto,q_auto,w_700/v1781237424/Juan_arango_Ecommerce_r96gjj.png"
                  alt="Juan Arango, creador de NitroBot"
                  width={700}
                  height={875}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 90vw, 380px"
                />
              </div>
            </div>
            <div>
              <p className="font-dm-mono text-xs md:text-sm uppercase tracking-[0.25em] text-primary mb-4">
                Quién está detrás
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                Te lo implemento yo, <span className="text-primary">con mi equipo.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Soy Juan Arango. Llevo 15 años construyendo ecommerce en Latinoamérica y NitroBot es la
                herramienta que construí para resolver el cuello de botella que veo en casi todos los
                negocios que asesoro: las ventas que se enfrían esperando una respuesta. Te lo implemento
                yo, con mi equipo, adaptado a tu operación.
              </p>
              <Link
                href="/laboratorio"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Mira cómo lo estoy construyendo
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ S7 · CTA final — Habla con NitroBot ============ */}
      <section id="contacto-nitrobot" className="py-16 md:py-24 px-6 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          {/* Único momento de color total: la burbuja gigante con el gradiente NitroBot */}
          <div className="rounded-[2.5rem] rounded-bl-lg [background:var(--gradiente-nitrobot)] p-10 md:p-16 text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
              La mejor forma de evaluar a NitroBot es hablar con él.
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-[50ch] mx-auto">
              Cada implementación se diseña a la medida de tu operación. El diagnóstico inicial no tiene costo.
            </p>
            <NitroBotCta className="!bg-none bg-negro-profundo hover:bg-black text-white" />
          </div>

          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2">¿Prefieres que te escriba yo?</h3>
            <p className="text-muted-foreground">Cuéntame de tu operación y te escribo personalmente por WhatsApp.</p>
          </div>
          <NitroBotForm />
        </div>
      </section>

      {/* ============ S8 · FAQ — Las objeciones, de frente ============ */}
      <section className="py-16 md:py-24 px-6 bg-zinc-950/60">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-balance">
            Las objeciones, de frente
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  )
}
