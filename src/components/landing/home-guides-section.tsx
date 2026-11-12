import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GuideCard } from "@/components/guias/guide-article";
import { getGuideHub, guidePath } from "@/lib/guias/hubs";
import { getHubGuides } from "@/lib/guias/queries";

// La home es comercial: en vez de las últimas noticias del blog muestra las
// guías de «Vender por WhatsApp», que responden lo que pregunta quien está
// evaluando Nitro Complete. Sin guías publicadas, la sección no aparece.
export async function HomeGuidesSection() {
  const hub = getGuideHub("vender-por-whatsapp");
  if (!hub) return null;
  const guides = await getHubGuides(hub.slug).catch(() => []);
  // Primero los artículos; mientras solo exista la guía pilar, se muestra esa.
  const published = guides.filter((guide) => guide.tipo === "articulo");
  const articles = (published.length ? published : guides).slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-white/9 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="ideas">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl md:text-left">
            Guías para <span className="text-primary">vender por WhatsApp.</span>
          </h2>
          <Link href={guidePath(hub.slug)} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Ver todas las guías <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className={articles.length === 1 ? "max-w-2xl" : "grid gap-4 md:grid-cols-3"}>
          {articles.map((guide) => <GuideCard key={guide._id} hub={hub.slug} guide={guide} />)}
        </div>
      </div>
    </section>
  );
}
