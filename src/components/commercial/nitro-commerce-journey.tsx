import Image from "next/image";
import { ArrowRight, CreditCard, MessageCircle, PackageCheck, Truck } from "lucide-react";

const paymentMethods = [
  ["pse", "PSE"], ["nequi", "Nequi"], ["bancolombia", "Bancolombia"], ["daviplata", "DaviPlata"],
  ["visa", "Visa"], ["mastercard", "Mastercard"], ["amex", "American Express"],
] as const;

const carriers = [
  ["inter-rapidisimo", "Inter Rapidísimo"], ["coordinadora", "Coordinadora"], ["envia", "Envía"],
  ["servientrega", "Servientrega"], ["tcc", "TCC"], ["deprisa", "Deprisa"], ["4-72", "4-72"],
] as const;

const steps = [
  { icon: MessageCircle, title: "Conversa", text: "Recomienda productos de tu catálogo, por texto o audio." },
  { icon: CreditCard, title: "Cobra", text: "Comparte el enlace de pago o toma el pedido contraentrega." },
  { icon: PackageCheck, title: "Confirma", text: "Pide confirmar el pedido contraentrega antes de despacharlo." },
  { icon: Truck, title: "Acompaña", text: "Comparte la guía y avisa las novedades del envío." },
] as const;

export function NitroCommerceJourney() {
  return (
    <section id="integraciones" className="scroll-mt-24 bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="ecosystem">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">Del “¿cuánto vale?”<br /><span className="text-nitro-text">al pedido entregado.</span></h2>
          <p className="mx-auto max-w-lg text-pretty text-lg leading-8 text-ink/75 lg:mx-0 lg:justify-self-end">Pago en línea o contraentrega. Conecta el cobro y el seguimiento para que tu cliente encuentre las respuestas en el mismo WhatsApp.</p>
        </div>

        <ol aria-label="Recorrido de una compra con Nitro" className="my-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative rounded-2xl border border-line bg-white p-6">
              <div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-ink text-primary"><Icon className="size-5" aria-hidden="true" /></span><span className="font-mono text-xs text-ink/45">0{index + 1}</span></div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{text}</p>
              {index < steps.length - 1 ? <ArrowRight className="absolute -right-4 top-10 z-10 hidden size-5 rounded-full bg-ground text-ink/45 lg:block" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="flex flex-col rounded-[2rem] border border-line bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3"><Image src="/nitro/integraciones/confio.png" alt="" width={36} height={36} className="size-9 object-contain" /><p className="text-xl font-semibold">Confío</p></div>
            <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight">Que pagar sea parte de la conversación.</h3>
            <p className="mt-3 text-base leading-7 text-ink/75">Conectas tu cuenta Confío. Nitro envía el enlace por WhatsApp y recibe la confirmación del pago para continuar con el pedido.</p>
            <ul aria-label="Medios de pago de Confío" className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {paymentMethods.map(([id, name]) => <li key={id} className="flex h-16 items-center justify-center rounded-xl border border-line bg-white px-1"><Image src={`/nitro/integraciones/pagos/${id}.png`} alt={name} width={200} height={60} className="h-10 w-full object-contain" /></li>)}
            </ul>
            <p className="mt-5 text-sm leading-6 text-ink/65">Medios disponibles según tu cuenta Confío. Requiere conexión y habilitación del comercio; aplican las condiciones de la pasarela.</p>
          </article>

          <article className="flex flex-col rounded-[2rem] border border-line bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3"><Image src="/nitro/integraciones/17track.png" alt="" width={36} height={36} className="size-9 object-contain" /><p className="text-xl font-semibold">17TRACK</p></div>
            <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight">“¿Dónde va mi pedido?”<br />Dale seguimiento en el chat.</h3>
            <p className="mt-3 text-base leading-7 text-ink/75">17TRACK consulta las guías registradas. Al habilitar los avisos, Nitro informa novedades como salida a reparto, incidencias y entrega.</p>
            <ul aria-label="Transportadoras contempladas para seguimiento" className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {carriers.map(([id, name]) => <li key={id} className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border border-line bg-white px-1 py-3"><Image src={`/nitro/integraciones/transportadoras/${id}.png`} alt="" width={36} height={36} className="size-8 object-contain" /><span className="text-center text-[10px] font-medium leading-4 text-ink/75">{name}</span></li>)}
            </ul>
            <p className="mt-5 text-sm leading-6 text-ink/65">Disponibilidad según guía y transportadora. Se habilita por tienda y tiene saldo por guía; los avisos requieren configuración y plantillas de WhatsApp.</p>
          </article>
        </div>

        <aside className="mt-5 flex flex-col gap-4 rounded-2xl border border-line px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
          <Image src="/nitro/integraciones/skydropx.svg" alt="Skydropx" width={120} height={36} className="h-8 w-28 shrink-0 object-contain object-left" />
          <div><p className="text-sm font-semibold">Creación de guías · En preparación</p><p className="mt-1 text-sm leading-6 text-ink/65">Estamos preparando esta conexión. La creación de guías con Skydropx requiere validación antes de habilitarse; todavía no está disponible.</p></div>
        </aside>
      </div>
    </section>
  );
}
