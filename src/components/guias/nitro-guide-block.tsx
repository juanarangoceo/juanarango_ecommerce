import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NitroMark } from "@/components/commercial/nitro-mark";
import { WhatsAppLogo } from "@/components/commercial/brand-logos";
import { WhatsAppSalesLink } from "@/components/commercial/whatsapp-sales-link";

type Props = {
  titulo: string;
  texto: string;
  guideTitle: string;
  page: { type: "guia_pilar" | "guia_articulo"; slug: string };
};

// Cierre común de las guías. El texto cambia por artículo (Sanity); el mensaje
// de WhatsApp nombra la guía para que el vendedor sepa de dónde llega el lead.
export function NitroGuideBlock({ titulo, texto, guideTitle, page }: Props) {
  return (
    <aside aria-labelledby="nitro-guia" className="relative my-16 overflow-hidden rounded-[2rem] border border-primary/20 bg-[#0b0f0c] p-7 sm:p-10">
      <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-primary/[0.09] blur-[90px]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="relative">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <NitroMark className="size-5" />
          Nitro Complete
        </div>
        <h2 id="nitro-guia" className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-white">{titulo}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">{texto}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WhatsAppSalesLink
            context={{ kind: "guide", title: guideTitle }}
            placement="guia_nitro_block"
            page={page}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <WhatsAppLogo className="size-5" />
            Hablar con Juan por WhatsApp
          </WhatsAppSalesLink>
          <Link href="/nitro-complete" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-primary hover:text-primary/80">
            Ver cómo funciona Nitro Complete <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
