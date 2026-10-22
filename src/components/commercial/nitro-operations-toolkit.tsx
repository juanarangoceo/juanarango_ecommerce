import { BarChart3, ChevronDown, MessageSquareText, RefreshCw, Settings2, ShoppingBag, Users } from "lucide-react";
import { ShopifyLogo } from "@/components/commercial/brand-logos";

const tools = [
  { icon: ShoppingBag, title: "Tu catálogo y tus pedidos", text: "Con Shopify o con catálogo en Nitro.", detail: "Sincroniza productos y pedidos de Shopify, o carga tus productos con fotos y precios en Nitro, uno a uno o por CSV. Define tus tarifas de envío, ciudades y condiciones de envío gratis." },
  { icon: Settings2, title: "Un asesor con tus reglas", text: "Tu tono, tus precios y tu forma de vender.", detail: "Nos cuentas cómo quieres que atienda y qué puede ofrecer. Revisamos y probamos esas instrucciones antes de aplicarlas. Los precios y totales los calcula el sistema desde tu catálogo." },
  { icon: Users, title: "Tu equipo con el contexto", text: "Conversaciones, clientes y casos en un panel.", detail: "Cuando hay un reclamo o una decisión que necesita una persona, el asesor entrega el caso con la conversación. Tu equipo lo resuelve y devuelve el chat al asesor; cada usuario tiene sus permisos." },
  { icon: RefreshCw, title: "Retoma la venta a tiempo", text: "Vuelve cuando el comprador te lo permite.", detail: "Puede retomar chats pendientes y acordar con el comprador un día y una franja para volver a escribir. Respeta horarios y permisos; fuera de la ventana de WhatsApp necesita plantillas aprobadas por Meta. La recuperación de carritos Shopify requiere configuración." },
  { icon: BarChart3, title: "Entiende lo que pasa al vender", text: "Ventas, búsquedas y motivos para no comprar.", detail: "Revisa pedidos, actividad del asesor y búsquedas de productos. El módulo Oportunidades, de activación separada, muestra motivos de compra detenida junto a los mensajes que los respaldan." },
  { icon: MessageSquareText, title: "Conecta más entradas a tu WhatsApp", text: "Tu tienda e Instagram pueden iniciar la conversación.", detail: "El botón de tu tienda abre WhatsApp con el producto que el comprador estaba viendo. Si conectas Instagram, Nitro puede atender mensajes con tu catálogo y llevar al cliente a WhatsApp para cerrar. Nitro Landing se define como un servicio aparte." },
] as const;

export function NitroOperationsToolkit() {
  return (
    <section id="shopify" className="scroll-mt-24 border-b border-white/10 bg-superficie-nitro px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="about">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div><h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">También organiza<br /><span className="text-primary">lo que hay detrás de vender.</span></h2></div>
          <div className="mx-auto max-w-lg lg:mx-0 lg:justify-self-end"><p className="text-pretty text-lg leading-8 text-white/75">Tus productos, tus clientes y tu equipo en el mismo lugar. Abre cada herramienta para conocer cómo funciona.</p><p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/80"><ShopifyLogo className="size-5" />Con Shopify o sin tienda online.</p></div>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ icon: Icon, title, text, detail }) => (
            <details key={title} className="group self-start rounded-2xl border border-white/12 bg-background">
              <summary className="cursor-pointer list-none p-6 focus-visible:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between"><Icon className="size-5 text-primary" aria-hidden="true" /><ChevronDown className="size-4 text-white/60 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></span>
                <h3 className="mt-5 text-lg font-semibold leading-6 text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
              </summary>
              <p className="mx-6 border-t border-white/12 pb-6 pt-4 text-sm leading-6 text-white/75">{detail}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
