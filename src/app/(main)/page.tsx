import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HomeGuidesSection } from "@/components/landing/home-guides-section";
import { AfterHours } from "@/components/commercial/after-hours";
import { NewsletterSection } from "@/components/commercial/newsletter-section";
import {
  formatCop,
  nitroCompleteMonthly,
  nitroCompleteUnitPacks,
  solutions,
} from "@/lib/commercial-content";
import { WhatsAppStory } from "@/components/commercial/whatsapp-story";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { SalesContact } from "@/components/commercial/sales-contact";
import { NitroFilmTeaser } from "@/components/nitro/nitro-film";
import { NITRO_FILMS } from "@/lib/nitro-film";

export const metadata: Metadata = {
  title: "Juan Arango · Ventas por WhatsApp con IA y consultoría ecommerce",
  description: "Soy Juan Arango. Construí Nitro Complete, un sistema que vende por WhatsApp con tu catálogo real, confirma pedidos y acompaña la entrega. También te asesoro para hacer crecer tu ecommerce.",
  alternates: { canonical: "https://www.juanarangoecommerce.com" },
  openGraph: {
    images: [{ url: "/og-nitro.png", width: 1200, height: 630 }], title: "Juan Arango · NITRO ECOM", description: "Tu WhatsApp vende, confirma y hace seguimiento. Tú diriges.", url: "https://www.juanarangoecommerce.com", type: "website", locale: "es_CO" },
};

const steps = [
  { title: "Empezamos por WhatsApp", text: "Mi asistente resuelve tus dudas y te manda el enlace para pagar tu primer mes por el mismo chat." },
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
            <div className="mx-auto mt-6 flex max-w-xl items-start gap-4 text-left lg:mx-0">
              <Image src="https://res.cloudinary.com/dohwyszdj/image/upload/f_auto,q_auto,c_thumb,g_face,w_160,h_160/v1781237424/Juan_arango_Ecommerce_r96gjj.png" alt="Juan Arango" width={160} height={160} sizes="56px" priority className="mt-1 size-14 shrink-0 rounded-full border border-white/15 object-cover" />
              <p className="text-lg leading-8 text-white/75">
              Soy Juan Arango. Tras 15 años en ecommerce construí <strong className="font-semibold text-white">Nitro Complete</strong> para <strong className="nitro-hl">vender con tu catálogo real</strong> y acompañar cada pedido hasta la entrega. Con Shopify o sin tienda online.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <WhatsAppJuanButton context={{ kind: "hero" }} placement="home_hero">Hablar por WhatsApp</WhatsAppJuanButton>
              <Button asChild size="lg" variant="outline" className="h-13 rounded-full border-white/15 bg-transparent px-7 text-base text-white hover:bg-white/7 hover:text-white"><Link href="/nitro-complete">Conocer Nitro Complete</Link></Button>
            </div>
            <p className="mt-6 border-t border-white/8 pt-5 text-sm text-white/72">
              ¿Buscas asesoría para tu ecommerce?{" "}
              <Link href="/soluciones/nitro-commerce" className="inline-flex items-center gap-1 font-semibold text-white underline decoration-primary/60 underline-offset-4 hover:text-primary">Conoce la asesoría <ArrowRight className="size-3.5" aria-hidden="true" /></Link>
            </p>
          </div>
          <NitroFilmTeaser teaser={NITRO_FILMS.teaser} full={NITRO_FILMS.full} />
        </div>
      </section>

      {/* Dónde se pierde la venta: sección clara (identidad "negro y blancos") */}
      <section className="bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="flow">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">
              ¿Cuántas horas al día <span className="text-alert-text">nadie responde tu WhatsApp?</span>
            </h2>
            <p className="mx-auto max-w-lg text-center text-lg leading-8 text-ink/75 lg:mx-0 lg:justify-self-end lg:text-left">
              Marca tu horario de atención. La cuenta sale de tus horas, no de un promedio.
            </p>
          </div>
          <AfterHours />
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
              <p className="mx-auto max-w-lg text-base leading-7 text-white/72 lg:mx-0">De la pregunta a las 10 p. m. hasta la entrega. Cada parte de Nitro Complete trabaja en su momento y tu equipo entra solo cuando hace falta.</p>
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
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/72 lg:mx-0">La implementación la hago contigo: configuramos, probamos con conversaciones reales y encendemos cada parte cuando está lista.</p>
            <WhatsAppJuanButton context={{ kind: "evaluation" }} placement="home_implementation" className="mt-8">Revisar mi negocio</WhatsAppJuanButton>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/8 bg-background p-7">
                <span className="flex size-8 items-center justify-center rounded-full border border-primary/40 font-mono text-xs text-primary">{index + 1}</span>
                <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mensualidad de entrada (NIT-209) y recargas; revisión empresarial como contacto secundario. */}
      <section id="precios" className="px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="pricing">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">{nitroCompleteMonthly.price} / mes.<br /><span className="text-primary">Recarga si vendes más.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-white/72 lg:mx-0 lg:justify-self-end lg:text-left">Sin costo de instalación: preparamos tu asesor con tu negocio, con o sin tienda online. Después pagas {nitroCompleteMonthly.price} al mes, solo si quieres seguir, y si vendes más recargas; lo recargado no vence.</p>
          </div>
          <div className="mt-10 flex flex-col gap-6 rounded-3xl bg-ink p-7 ring-1 ring-primary/35 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <ul className="space-y-2.5 text-base text-white/80">
              {[
                `Tu número de WhatsApp, ${nitroCompleteMonthly.turns} turnos (respuestas de tu asesor) y ${nitroCompleteMonthly.templates} plantillas cada mes`,
                `Recargas desde ${formatCop(nitroCompleteUnitPacks[0].priceCop)} si vendes más; no vencen`,
                `Sin contrato ni cobro automático. Listo en menos de ${nitroCompleteMonthly.installHours} horas`,
              ].map((item) => <li key={item} className="flex gap-2.5"><Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
            </ul>
            <div className="flex shrink-0 flex-col gap-4 lg:items-end">
              <Button asChild size="lg" className="h-13 rounded-full px-7 text-base font-bold"><Link href="/nitro-complete#precio">Ver precio y recargas <ArrowRight /></Link></Button>
              <Link href="/nitro-complete#empresas" className="text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:text-primary">Mi empresa necesita mayor capacidad</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Asesoría: la otra forma de trabajar juntos, al mismo nivel */}
      <section id="asesoria" className="px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="diagnostic">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">Si lo que necesitas es dirección, <span className="text-primary">te asesoro.</span></h2>
            <p className="mx-auto max-w-lg text-center text-base leading-7 text-white/72 lg:mx-0 lg:justify-self-end lg:text-left">No todo se resuelve automatizando. Reviso contigo tu ecommerce, elegimos la oportunidad que más pesa y te acompaño a implementarla, o lanzamos una página enfocada en tu oferta.</p>
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
                  {solution.fitPoints.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/72"><Check className="mt-1 size-3.5 shrink-0 text-primary" />{item}</li>)}
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
            <p className="mx-auto mt-6 max-w-2xl text-left text-lg leading-8 text-ink/75 lg:mx-0">Llevo 15 años en ecommerce: vendiendo en marketplaces, lanzando marcas propias y montando tiendas para otros. Nitro Complete nació de ver cuántas ventas se pierden en el chat y en el despacho, no en el anuncio.</p>
            <p className="mx-auto mt-4 max-w-2xl text-left text-lg leading-8 text-ink/75 lg:mx-0">NITRO ECOM es la estructura con la que lo implemento. Desde Pereira, para negocios de Colombia y Latinoamérica.</p>
            <Button asChild size="lg" className="mt-8 h-13 rounded-full bg-ink px-7 text-base font-bold text-white hover:bg-ink/85"><Link href="/sobre-mi">Conocer mi historia <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <HomeGuidesSection />

      <NewsletterSection />

      <section className="px-5 pb-20 pt-4 lg:px-8 lg:pb-24" data-nitro-orb="diagnostic">
        <SalesContact placement="home_closing" />
      </section>
    </div>
  );
}
