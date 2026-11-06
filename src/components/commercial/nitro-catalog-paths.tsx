import { Check, Smartphone } from "lucide-react";
import { ShopifyLogo } from "@/components/commercial/brand-logos";

// Shopify es una conexión, no un requisito (NIT-209). Dos caminos con la misma
// jerarquía; el que no tiene tienda online va primero porque es el caso que
// más se pregunta. Sin tienda, los productos los crea el negocio en su panel
// (uno a uno con fotos del celular, o con la plantilla de Excel): Nitro no los
// carga por él. Verificado en nitro_bot /dashboard/catalogo.
const paths = [
  {
    key: "nativo",
    mark: <Smartphone className="size-6 text-nitro-text" aria-hidden="true" />,
    title: "Sin tienda online",
    lead: "Vendes por WhatsApp, Instagram o en persona.",
    items: [
      "Creas tus productos en tu panel: foto desde el celular, precio y descripción.",
      "¿Tienes muchos? Llenas la plantilla de Excel y los subes todos de una vez.",
      "Cambias precios, fotos o disponibilidad cuando quieras, y el asesor vende con lo actualizado.",
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
            Tus productos, en tus manos.<br /><span className="text-nitro-text">Con Shopify o sin él.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-ink/75">
            Lo único que necesitas son productos con foto y precio. Los subes tú en minutos o los trae tu Shopify, y el asesor vende con ellos igual en los dos casos.
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
