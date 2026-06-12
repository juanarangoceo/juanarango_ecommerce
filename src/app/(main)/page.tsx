import dynamic from "next/dynamic"
import Link from "next/link"
import { Metadata } from "next"
import { NitroBanner } from "@/components/nitro-banner"
import { ServicesGrid } from "@/components/services-grid"
import { NitroBusinessGrid } from "@/components/nitro-business-grid"
import { AboutSection } from "@/components/about-section"
import { ContactForm } from "@/components/ui/contact-form"
import { FlaskConical, BookOpen, Youtube, ArrowRight } from "lucide-react"
import { LatestPostsSection } from "@/components/landing/latest-posts-section"
import { ChatMockup } from "@/components/nitrobot/chat-mockup"
import { heroConversation } from "@/components/nitrobot/conversations"

export const metadata: Metadata = {
  title: 'Juan Arango | Ecommerce, Automatización e IA para LATAM',
  description: 'Ayudo a empresas de Colombia y Latinoamérica a vender más con ecommerce avanzado, automatización e IA. Soy Juan Arango: 15 años de experiencia real.',
  alternates: {
    canonical: 'https://www.juanarangoecommerce.com'
  },
  openGraph: {
    title: 'Juan Arango | Ecommerce, Automatización e IA para LATAM',
    description: 'Ayudo a empresas de Colombia y Latinoamérica a vender más con ecommerce avanzado, automatización e IA. Soy Juan Arango: 15 años de experiencia real.',
    url: 'https://www.juanarangoecommerce.com',
    siteName: 'Juan Arango Ecommerce',
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Arango | Ecommerce, Automatización e IA para LATAM',
    description: 'Ayudo a empresas de Colombia y Latinoamérica a vender más con ecommerce avanzado, automatización e IA. Soy Juan Arango: 15 años de experiencia real.',
  }
}

// NitroBanner: Importado estáticamente para que el Hero (LCP element) esté en el HTML inicial.
// Esto elimina el skeleton de carga que retrasaba el LCP en móviles.

const AnimatedBanner = dynamic(
  () => import("@/components/ui/animated-banner").then((mod) => mod.AnimatedBanner)
)

// "Lo construyo en público" — la prueba honesta que reemplaza a los testimonios anónimos
const proofLinks = [
  {
    icon: FlaskConical,
    title: "El Laboratorio",
    desc: "Proyectos reales — incluido NitroBot — con sus decisiones, sus errores y sus números.",
    href: "/laboratorio",
    cta: "Entrar al laboratorio"
  },
  {
    icon: BookOpen,
    title: "El Blog",
    desc: "Lo que aprendo construyendo, explicado para que lo apliques en tu negocio.",
    href: "/blog",
    cta: "Leer el blog"
  },
  {
    icon: Youtube,
    title: "YouTube",
    desc: "Me ves trabajar: implementaciones, pruebas de herramientas y resultados en pantalla.",
    href: "https://www.youtube.com/@NitroEcom",
    cta: "Ver el canal",
    external: true
  }
]

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Impact.com Site Verification */}
      <p className="sr-only">Impact-Site-Verification: edd0ee3e-a913-4b07-8829-d13195efdd99</p>

      {/* Notification Bar */}
      <div className="w-full bg-azul-estructura/40 border-b border-primary/20 py-1.5 text-center relative z-40 backdrop-blur-sm">
        <Link
          href="/nitrobot"
          className="text-xs md:text-sm text-primary hover:text-naranja-suave transition-colors font-medium flex items-center justify-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
          Nuevo: NitroBot — ventas y atención por WhatsApp con IA
          <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </Link>
      </div>

      {/* Aurora Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-negro-profundo">
        {/* Blobs - hidden on mobile for LCP performance, animated on desktop */}
        <div className="hidden md:block absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] animate-aurora-1 opacity-20" />
        <div className="hidden md:block absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-azul-estructura/40 blur-[100px] animate-aurora-2 opacity-20" />
      </div>

      <main className="flex-1 flex flex-col">
        {/* 1. Hero */}
        <NitroBanner />

        {/* 2. NitroBot — el producto estrella, en vivo */}
        <section className="py-12 md:py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="rounded-3xl border border-transparent [background:linear-gradient(#0c0c0c,#0c0c0c)_padding-box,var(--gradiente-nitrobot)_border-box] p-8 md:p-14">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="font-dm-mono text-xs md:text-sm uppercase tracking-[0.25em] text-primary mb-5">
                    NitroBot · Ventas y atención por WhatsApp con IA
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
                    Tu mejor vendedor responde en segundos.{" "}
                    <span className="text-primary">Míralo en acción.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-[55ch]">
                    NitroBot atiende, asesora y cierra ventas por WhatsApp con IA entrenada en tu
                    catálogo y en tu forma de hablar. Esta conversación es el producto funcionando.
                  </p>
                  <Link
                    href="/nitrobot"
                    className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-white [background:var(--gradiente-nitrobot)] shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
                  >
                    Conoce a NitroBot
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="flex justify-center">
                  <ChatMockup messages={heroConversation} loop />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Quién te habla */}
        <AboutSection />

        {/* 3. El ecosistema NITRO */}
        <ServicesGrid />

        {/* 4. Soluciones por industria */}
        <NitroBusinessGrid />

        {/* Animated Banner from External Source - Desktop Only */}
        <div className="hidden md:block">
          <AnimatedBanner />
        </div>

        {/* 5. La prueba: Lo construyo en público (reemplaza a los testimonios) */}
        <section className="py-12 md:py-24 px-6 bg-secondary/30">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-16">
              <p className="font-dm-mono text-xs md:text-sm uppercase tracking-[0.3em] text-primary mb-4">
                La prueba
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance">
                Lo construyo en público
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Te muestro lo que construyo, con sus números, mientras lo construyo.
                Si quieres saber cómo trabajo: mírame trabajar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {proofLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex flex-col"
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-6">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-primary font-medium">
                    {item.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Contacto */}
        <div id="contacto" className="py-12 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Hablemos de tu operación</h2>
              <p className="text-xl text-muted-foreground">
                Cuéntame en qué punto está tu negocio. Te digo qué haría yo — sin costo y sin compromiso.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>

        {/* Latest Blog Posts */}
        <LatestPostsSection />
      </main>
    </div>
  )
}
