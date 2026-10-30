import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { GuideBody, guideOutline } from "@/components/guias/guide-body";
import { NitroGuideBlock } from "@/components/guias/nitro-guide-block";
import { guideBreadcrumbs, guideJsonLd, serializeJsonLd } from "@/lib/guias/json-ld";
import { guideGroupTitle, guidePath, type getGuideHub } from "@/lib/guias/hubs";
import type { Guide, GuideSummary } from "@/lib/guias/queries";

type Hub = NonNullable<ReturnType<typeof getGuideHub>>;

const dateFormat = new Intl.DateTimeFormat("es-CO", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Bogota" });

function formatDate(value: string) {
  // `revisadoEn` es una fecha sin hora: fijarla al mediodía evita mostrar el día anterior.
  return dateFormat.format(new Date(value.length === 10 ? `${value}T12:00:00-05:00` : value));
}

export function GuideCard({ hub, guide }: { hub: string; guide: GuideSummary }) {
  return (
    <Link
      href={guidePath(hub, guide.slug, guide.tipo)}
      className="group flex h-full flex-col rounded-[1.5rem] border border-white/9 bg-[#0d110e] p-6 transition-[border-color,transform,background-color] hover:-translate-y-1 hover:border-primary/35 hover:bg-[#101611] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
    >
      <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-white">{guide.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/52">{guide.respuestaCorta}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
        Leer guía <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

type GuideArticleProps = {
  hub: Hub;
  guide: Guide;
  /** Contenido adicional bajo el cuerpo; en el pilar, el índice del hub. */
  children?: ReactNode;
  extraJsonLd?: Record<string, unknown>;
};

export function GuideArticle({ hub, guide, children, extraJsonLd }: GuideArticleProps) {
  const outline = guideOutline(guide.body);
  const breadcrumbs = guideBreadcrumbs(hub, guide);
  const jsonLd = guideJsonLd(hub, guide);
  if (extraJsonLd) jsonLd["@graph"].push(extraJsonLd);
  const group = guideGroupTitle(guide.grupo);
  const pageType = guide.tipo === "pilar" ? "guia_pilar" : "guia_articulo";

  return (
    <article className="pb-20 lg:pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <header className="relative overflow-hidden px-5 pb-12 pt-32 lg:px-8 lg:pb-16 lg:pt-40">
        <div className="pointer-events-none absolute left-[10%] top-24 size-72 rounded-full bg-primary/[0.055] blur-[110px]" />
        <div className="relative mx-auto max-w-3xl">
          <nav aria-label="Ruta de navegación">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/45">
              {breadcrumbs.map((item, index) => (
                <li key={item.path} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {index === breadcrumbs.length - 1
                    ? <span aria-current="page" className="text-white/70">{item.name}</span>
                    : <Link href={item.path} className="hover:text-white">{item.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-8 text-balance text-[clamp(2.3rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">{guide.title}</h1>
          <p className="mt-6 text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">{guide.respuestaCorta}</p>
          <p className="mt-6 text-sm text-white/45">
            Por <Link href="/sobre-mi" className="font-medium text-white/70 hover:text-white" rel="author">Juan Arango</Link>
            {group && <> · {group}</>}
            {" · "}Revisada el <time dateTime={guide.revisadoEn}>{formatDate(guide.revisadoEn)}</time>
          </p>
        </div>
      </header>

      <div className="px-5 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <section aria-labelledby="lo-esencial" className="rounded-[1.75rem] border border-white/9 bg-[#0d110e] p-6 sm:p-8">
            <h2 id="lo-esencial" className="text-lg font-semibold text-white">Lo esencial</h2>
            <ul className="mt-4 space-y-3">
              {guide.puntosClave.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-7 text-white/72">
                  <Check className="mt-1.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {outline.length > 2 && (
            <nav aria-labelledby="indice" className="mt-8 border-l border-white/10 pl-5">
              <h2 id="indice" className="text-sm font-semibold text-white/80">En esta guía</h2>
              <ol className="mt-3 space-y-2 text-sm">
                {outline.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`} className="text-white/55 hover:text-primary">{item.text}</a></li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-6">
            <GuideBody body={guide.body} />
          </div>

          {children}

          {guide.faq?.length > 0 && (
            <section aria-labelledby="preguntas" className="mt-16">
              <h2 id="preguntas" className="text-3xl font-semibold tracking-[-0.035em] text-white">Preguntas frecuentes</h2>
              {/* <details> deja las respuestas en el HTML: buscadores y agentes las leen sin ejecutar JavaScript. */}
              <div className="mt-6 divide-y divide-white/8 border-y border-white/8">
                {guide.faq.map((item) => (
                  <details key={item.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                      <h3>{item.question}</h3>
                      <ChevronDown className="mt-1 size-4 shrink-0 text-white/45 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-white/62">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <NitroGuideBlock titulo={guide.bloqueNitro.titulo} texto={guide.bloqueNitro.texto} guideTitle={guide.title} page={{ type: pageType, slug: guide.slug }} />

          {guide.relacionados?.length > 0 && (
            <section aria-labelledby="relacionadas">
              <h2 id="relacionadas" className="text-2xl font-semibold tracking-[-0.03em] text-white">Sigue leyendo</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {guide.relacionados.map((item) => <GuideCard key={item._id} hub={hub.slug} guide={item} />)}
              </div>
            </section>
          )}

          {guide.tipo !== "pilar" && (
            <p className="mt-12 text-sm text-white/50">
              Esta guía es parte de{" "}
              <Link href={guidePath(hub.slug)} className="font-semibold text-primary hover:text-primary/80">{hub.headline}</Link>.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
