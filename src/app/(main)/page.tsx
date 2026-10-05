import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LatestPostsSection } from "@/components/landing/latest-posts-section";
import { NewsletterSection } from "@/components/commercial/newsletter-section";
import {
  formatCop,
  nitroCompleteImplementation,
  nitroCompletePlans,
  nitroCompleteStarterKit,
  nitroCompleteUnitPacks,
  PLAN_TEMPLATES_PER_CYCLE,
  solutions,
} from "@/lib/commercial-content";
import { WhatsAppStory } from "@/components/commercial/whatsapp-story";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { SalesContact } from "@/components/commercial/sales-contact";
import { NitroHero } from "@/components/nitro/nitro-hero";

export const metadata: Metadata = {
  title: "Juan Arango · Ventas por WhatsApp con IA y consultoría ecommerce",
  description: "Soy Juan Arango. Construí Nitro Complete, un sistema que vende por WhatsApp con tu catálogo real, confirma pedidos y acompaña la entrega. También te asesoro para hacer crecer tu ecommerce.",
  alternates: { canonical: "https://www.juanarangoecommerce.com" },
  openGraph: {
    images: [{ url: "/og-nitro.png", width: 1200, height: 630 }], title: "Juan Arango · NITRO ECOM", description: "Tu WhatsApp vende, confirma y hace seguimiento. Tú diriges.", url: "https://www.juanarangoecommerce.com", type: "website", locale: "es_CO" },
};

// Momentos donde hoy se pierde una venta que ya estaba empezada. Cada uno
// corresponde a un módulo real de Nitro Complete (ver nitroCompleteModules).
const gaps = [
  { pain: "Escribe a las 10 p. m.", text: "Nadie responde hasta el día siguiente y el cliente compra en otra tienda.", fix: "El asesor responde con tu catálogo, a cualquier hora." },
  { pain: "Pide contraentrega", text: "Despachas sin confirmar y el pedido vuelve con el flete pagado.", fix: "El comprador confirma con un botón antes del despacho." },
  { pain: "Pregunta dónde va su pedido", text: "Tu equipo pasa la tarde copiando guías en chats.", fix: "Aviso de despacho, guía y pregunta de entrega automáticos." },
  { pain: "Dice “luego te confirmo”", text: "La cotización queda en el chat y nadie vuelve a escribir.", fix: "Seguimiento y, con permiso, un segundo intento medido." },
] as const;

const steps = [
  { title: "Empezamos por WhatsApp", text: "Mi asistente pregunta por tu catálogo, volumen y equipo. Revisamos si encaja antes de avanzar." },
  { title: "Conectamos tu WhatsApp", text: "Con Shopify o con el catálogo de Nitro, y las plantillas que Meta debe aprobar." },
  { title: "Entrenamos a tu asesor", text: "Tono, reglas, lo que puede negociar y cuándo debe pasar el chat a una persona." },
  { title: "Salimos con control", text: "Lo encendemos por partes, revisamos conversaciones reales y ajustamos contigo." },
] as const;

const alternatives = solutions.filter((solution) => solution.slug !== "nitro-complete");

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      {/* Hero: marca personal + producto principal */}
      <section className="relative px-5 pb-16 pt-28 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-40" data-nitro-orb="idle">
        <div className="pointer-events-none absolute right-[6%] top-24 size-96 rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0 text-center lg:text-left">
            <h1 className="text-balance text-[clamp(2.4rem,5.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
              Tu WhatsApp vende, confirma y hace seguimiento. <span className="text-primary">Tú diriges.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-left text-lg leading-8 text-white/62 lg:mx-0">
              Soy Juan Arango. Tras 15 años en ecommerce construí <strong className="font-semibold text-white">Nitro Complete</strong> para <strong className="nitro-hl">vender con tu catálogo real</strong> y acompañar cada pedido hasta la entrega. Con Shopify o sin tienda online.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <WhatsAppJuanButton context={{ kind: "hero" }} placement="home_hero">Hablar por WhatsApp</WhatsAppJuanButton>
              <Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent px-7 text-base text-white hover:bg-white/7 hover:text-white"><Link href="/nitro-complete">Conocer Nitro Complete</Link></Button>
            </div>
            <p className="mt-6 border-t border-white/8 pt-5 text-sm text-white/55">
              ¿Buscas asesoría para tu ecommerce?{" "}
              <Link href="/soluciones/nitro-commerce" className="inline-flex items-center gap-1 font-semibold text-white underline decoration-primary/60 underline-offset-4 hover:text-primary">Conoce la asesoría <ArrowRight className="size-3.5" aria-hidden="true" /></Link>
            </p>
          </div>
          <NitroHero />
        </div>
      </section>

      {/* Dónde se pierde la venta: sección clara (identidad "negro y blancos") */}
      <section className="bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="flow">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">
              La venta no termina cuando el cliente <span className="text-alert-text">te escribe.</span>
            </h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-ink/65 lg:mx-0 lg:justify-self-end lg:text-left">
              Muchas ventas por WhatsApp no se pierden por falta de tráfico, sino en lo que pasa después del primer mensaje. Nitro Complete cubre esos momentos.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gaps.map((gap) => (
              <article key={gap.pain} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <p className="text-lg font-semibold tracking-tight">«{gap.pain}»</p>
                <p className="mt-3 text-sm leading-6 text-ink/60">{gap.text}</p>
                <p className="mt-auto flex gap-2.5 border-t border-line pt-4 text-sm font-medium leading-6 text-ink">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary"><Check className="size-3 text-ink" aria-hidden="true" /></span>
                  {gap.fix}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Una venta completa en WhatsApp */}
      <section className="relative px-5 py-20 lg:px-8 lg:py-28" id="nitro-complete" data-nitro-orb="conversation">
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">
              Mira una venta completa <span className="text-primary">dentro de tu WhatsApp.</span>
            </h2>
            <div className="text-center lg:text-left">
              <p className="mx-auto max-w-lg text-base leading-7 text-white/58 lg:mx-0">De la pregunta a las 10 p. m. hasta la entrega. Cada parte de Nitro Complete trabaja en su momento y tu equipo entra solo cuando hace falta.</p>
              <Link href="/nitro-complete" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Ver todo lo que incluye <ArrowRight className="size-4" /></Link>
            </div>
          </div>
          <WhatsAppStory />
        </div>
      </section>

      {/* Implementación acompañada */}
      <section className="border-y border-white/7 bg-superficie-nitro px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="about">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="text-center lg:sticky lg:top-28 lg:text-left">
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">No te entrego un bot. <span className="text-primary">Lo dejo vendiendo.</span></h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/55 lg:mx-0">La implementación la hago contigo: configuramos, probamos con conversaciones reales y encendemos cada parte cuando está lista.</p>
            <WhatsAppJuanButton context={{ kind: "evaluation" }} placement="home_implementation" className="mt-8">Revisar mi negocio</WhatsAppJuanButton>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/8 bg-background p-7">
                <span className="flex size-8 items-center justify-center rounded-full border border-primary/40 font-mono text-xs text-primary">{index + 1}</span>
                <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/52">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Dos formas de empezar con Nitro Complete. La recarga va primero: es la
          entrada más fácil (NIT-89). Precios de lib/commercial-content. */}
      <section id="precios" className="px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="pricing">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">Empieza a tu medida. <span className="text-primary">Sin mensualidad, si quieres.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-white/58 lg:mx-0 lg:justify-self-end lg:text-left">Empieza con el kit y recarga cuando lo necesites, o elige un plan mensual para un volumen constante de consultas. Todos los precios están en pesos colombianos (COP).</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Link href="/nitro-complete#recarga" className="group flex flex-col rounded-3xl bg-ink p-7 ring-1 ring-primary/35 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:ring-primary sm:p-9">
              <span className="w-fit rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-ink">La forma más fácil de empezar</span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">Con recargas</h3>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-4xl font-extrabold tracking-tight tabular-nums text-white">{nitroCompleteStarterKit.price}</span><span className="text-sm text-white/50">COP, kit de arranque, un solo pago</span></p>
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm text-white/70">
                {[
                  `${nitroCompleteStarterKit.units.toLocaleString("es-CO")} turnos y tu número de WhatsApp gestionado por Nitro`,
                  `Recargas desde ${formatCop(nitroCompleteUnitPacks[0].priceCop)}, según lo que consumas`,
                  "Sin mensualidad ni fecha de corte. Lo que compras no vence",
                ].map((item) => <li key={item} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">Conocer el kit <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
            <Link href="/nitro-complete#planes" className="group flex flex-col rounded-3xl border border-white/10 bg-superficie-nitro p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-9">
              <span className="w-fit rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white/70">Para vender todos los días</span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">Con un plan mensual</h3>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-4xl font-extrabold tracking-tight tabular-nums text-white">{nitroCompletePlans[0].price}</span><span className="text-sm text-white/50">desde, COP al mes</span></p>
              <p className="mt-3 rounded-xl bg-white/5 px-3 py-2.5 text-sm leading-5 text-white/75">+ <strong className="font-semibold">{nitroCompleteImplementation}</strong> de implementación, una sola vez</p>
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm text-white/70">
                {[
                  "Implementación conmigo: catálogo, conexión y pruebas",
                  `El turno más barato y ${PLAN_TEMPLATES_PER_CYCLE} plantillas cada mes`,
                  "Campañas, recuperación de ventas y soporte prioritario",
                ].map((item) => <li key={item} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary">Ver planes <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Asesoría: la otra forma de trabajar juntos, al mismo nivel */}
      <section id="asesoria" className="px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="diagnostic">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">Si lo que necesitas es dirección, <span className="text-primary">te asesoro.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-white/55 lg:mx-0 lg:justify-self-end lg:text-left">No todo se resuelve automatizando. Reviso contigo tu ecommerce, elegimos la oportunidad que más pesa y te acompaño a implementarla, o lanzamos una página enfocada en tu oferta.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {alternatives.map((solution) => (
              <Link key={solution.slug} href={solution.href} className="group flex flex-col rounded-3xl border border-white/10 bg-superficie-nitro p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:outline-none sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="nitro-icon-mark flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><solution.icon className="nitro-icon-glyph size-6" /></span>
                  <ArrowRight className="mt-2 size-5 text-white/25 transition-[color,transform] group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                </div>
                <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">{solution.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{solution.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/75">{solution.result}</p>
                <ul className="mt-6 space-y-2.5 border-t border-white/9 pt-6">
                  {solution.fitPoints.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/55"><Check className="mt-1 size-3.5 shrink-0 text-primary" />{item}</li>)}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quién está detrás */}
      <section className="bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="about">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] bg-ink">
            <Image src="https://res.cloudinary.com/dohwyszdj/image/upload/f_auto,q_auto,w_800/v1781237424/Juan_arango_Ecommerce_r96gjj.png" alt="Juan Arango, especialista en ecommerce y automatización" width={800} height={1000} sizes="(max-width: 1024px) 90vw, 400px" className="h-auto w-full" />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">Lo que te propongo <span className="text-nitro-text">sale de operar negocios reales.</span></h2>
            <p className="mx-auto mt-6 max-w-2xl text-left text-lg leading-8 text-ink/65 lg:mx-0">Llevo 15 años en ecommerce: vendiendo en marketplaces, lanzando marcas propias y montando tiendas para otros. Nitro Complete nació de ver cuántas ventas se pierden en el chat y en el despacho, no en el anuncio.</p>
            <p className="mx-auto mt-4 max-w-2xl text-left text-lg leading-8 text-ink/65 lg:mx-0">NITRO ECOM es la estructura con la que lo implemento. Desde Pereira, para negocios de Colombia y Latinoamérica.</p>
            <Button asChild size="lg" className="mt-8 h-13 rounded-full bg-ink px-7 text-base font-bold text-white hover:bg-ink/85"><Link href="/sobre-mi">Conocer mi historia <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <LatestPostsSection />

      <NewsletterSection />

      <section className="px-5 pb-20 pt-4 lg:px-8 lg:pb-24" data-nitro-orb="diagnostic">
        <SalesContact placement="home_closing" />
      </section>
    </div>
  );
}
