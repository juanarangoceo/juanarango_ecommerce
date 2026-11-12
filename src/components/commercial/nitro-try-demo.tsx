import { MessageCircle, ShoppingBag, Tag } from "lucide-react";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";

// «Pruébalo con tu tienda» (NIT-218): antes de pagar, el dueño ve al asesor
// atendiendo SU tienda. El botón abre WhatsApp con el vendedor de Nitro
// (bot_super_admin), que por unos mensajes responde como el asesor de la
// tienda con los productos y precios que el dueño le confirma.
// Lo que se promete aquí es lo que hace esa demo (bot_super_admin/docs/
// demo-prospectos.md): no crea pedidos ni cobros y no instala nada.
const steps = [
  {
    icon: MessageCircle,
    title: "Escríbenos por WhatsApp",
    text: "Tocas el botón y llegas al chat. No llenas formularios ni das datos de pago.",
  },
  {
    icon: Tag,
    title: "Dinos un producto y su precio",
    text: "Con uno basta. Si quieres, agrega cuánto cobras de envío y si manejas contraentrega.",
  },
  {
    icon: ShoppingBag,
    title: "Escríbele como si fueras tu cliente",
    text: "Pregunta, regatea, pide. Te atiende como el asesor de tu tienda y toma el pedido de ejemplo.",
  },
] as const;

export function NitroTryDemo({ placement, id = "probar" }: { placement: string; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="conversation">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">
            No nos creas.<br /><span className="text-nitro-text">Pruébalo con tu tienda.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-center text-lg leading-8 text-ink/75 lg:mx-0 lg:text-left">
            En dos minutos y sin pagar, ves cómo atendería a tus clientes: con tus productos y tus precios, aquí mismo en WhatsApp.
          </p>
        </div>
        <ol className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white md:mt-10 md:grid md:grid-cols-3 md:gap-3 md:divide-y-0 md:rounded-none md:border-0 md:bg-transparent">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex items-start gap-4 p-5 md:block md:rounded-2xl md:border md:border-line md:bg-white md:p-7">
              <div className="flex shrink-0 items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-primary"><Icon className="size-5" aria-hidden="true" /></span>
                <span className="hidden font-mono text-xs text-ink/45 md:inline">0{i + 1}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight md:mt-5 md:text-xl">{title}</h3>
                <p className="mt-1.5 text-base leading-7 text-ink/70 md:mt-2">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col items-center gap-4 lg:flex-row lg:gap-6">
          <WhatsAppJuanButton context={{ kind: "demo" }} placement={placement} variant="dark" className="w-full sm:w-auto">Probarlo con mi tienda</WhatsAppJuanButton>
          <p className="max-w-xl text-center text-sm leading-6 text-ink/70 lg:text-left">
            Al terminar recibes un resumen: cuántos mensajes respondió, en cuánto tiempo y qué pedido tomó. Es una muestra dentro del chat: no crea pedidos ni cobros reales y no deja nada instalado.
          </p>
        </div>
      </div>
    </section>
  );
}
