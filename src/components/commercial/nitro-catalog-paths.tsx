import { Check, FileSpreadsheet } from "lucide-react";
import { ShopifyLogo } from "@/components/commercial/brand-logos";

// Shopify es una conexión, no un requisito (NIT-209). Dos caminos con la misma
// jerarquía; el que no tiene tienda online va primero porque es el caso que
// más se pregunta. Capacidades verificadas en nitro_bot (catálogo nativo con
// CSV, sync de Shopify, pedidos en el panel o en Shopify).
const paths = [
  {
    key: "nativo",
    mark: <FileSpreadsheet className="size-6 text-nitro-text" aria-hidden="true" />,
    title: "Sin tienda online",
    lead: "Vendes por WhatsApp, Instagram o en persona.",
    items: [
      "Nos mandas tus productos como los tengas: Excel, fotos o una lista.",
      "Los dejamos cargados en Nitro con foto, precio y descripción.",
      "Los agregas o cambias tú desde tu panel, uno a uno o por CSV.",
      "Los pedidos quedan en tu panel, listos para despachar.",
    ],
  },
  {
    key: "shopify",
    mark: <ShopifyLogo className="size-6" />,
    title: "Con Shopify",
    lead: "Ya tienes tu tienda y quieres que WhatsApp venda con ella.",
    items: [
      "Conectas tu tienda con un clic de autorización.",
      "Productos, precios e inventario se sincronizan solos.",
      "Los pedidos del asesor se crean en tu Shopify.",
      "Suma recuperación de carritos y el botón de WhatsApp en tu tienda.",
    ],
  },
] as const;

export function NitroCatalogPaths() {
  return (
    <section id="catalogo" className="scroll-mt-24 bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="ecosystem">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            Tu catálogo, como lo tengas.<br /><span className="text-nitro-text">Con Shopify o sin él.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-ink/75">
            Lo único que necesitas son productos con foto y precio. El asesor vende con ellos igual en los dos casos.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {paths.map((p) => (
            <article key={p.key} className="rounded-[2rem] border border-line bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-ground">{p.mark}</span>
                <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-ink/70">{p.lead}</p>
              <ul className="mt-5 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7"><Check className="mt-1 size-5 shrink-0 text-nitro-text" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
