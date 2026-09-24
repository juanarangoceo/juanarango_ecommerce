import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  PackageCheck,
  Store,
} from "lucide-react";
import { VslHero } from "@/components/nitrobot/vsl-hero";
import { VslConversations } from "@/components/nitrobot/vsl-conversations";
import { NitroMark } from "@/components/commercial/nitro-mark";

export const metadata: Metadata = {
  title: "NitroBot | Convierte chats de WhatsApp en pedidos",
  description:
    "NitroBot consulta tu catálogo, cotiza y registra pedidos desde WhatsApp. Conecta Shopify o carga tus productos directamente. Descubre si sirve para tu negocio.",
  // Landing de campaña pagada: fuera del índice para que no compita en orgánico
  // con /nitrobot, que es la página pensada para buscadores.
  robots: {
    index: false,
    follow: false,
  },
};

const proofPoints = [
  {
    icon: Store,
    title: "Tu catálogo, esté donde esté",
    text: "Conectamos Shopify o cargamos tus productos directamente en NitroBot para que responda con información real.",
  },
  {
    icon: PackageCheck,
    title: "Del chat al pedido",
    text: "Recomienda, cotiza y registra los datos de entrega. Con Shopify, también deja el pedido creado directamente allí.",
  },
  {
    icon: LayoutDashboard,
    title: "Tu equipo siempre ve todo",
    text: "Puede leer los chats, tomar los casos especiales y seguir los pedidos desde el panel.",
  },
];

const salesFlow = [
  "Consulta tu catálogo",
  "Recomienda y cotiza",
  "Pide y confirma la entrega",
  "Registra el pedido",
];

export default function NitroBotVslPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#080a09]">
      <div className="pointer-events-none absolute left-[8%] top-24 size-80 rounded-full bg-primary/[0.055] blur-[110px]" />
      {/* Marca sin enlaces: en tráfico pago la única acción es el formulario */}
      <header className="relative w-full border-b border-white/8">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-5 py-5">
          <span className="flex size-8 items-center justify-center text-primary"><NitroMark className="size-6" /></span>
          <span className="leading-none"><span className="block text-xs font-bold tracking-[0.13em] text-white">JUAN ARANGO</span><span className="mt-1 block font-mono text-[8px] tracking-[0.27em] text-white/45">NITRO ECOM · NITROBOT</span></span>
        </div>
      </header>

      <section className="relative w-full flex-1 px-5 py-10 md:px-6 md:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <VslHero />

          <VslConversations />

          <section className="mx-auto mt-14 max-w-5xl rounded-[2rem] border border-white/9 bg-[#0d110e] p-7 sm:p-9 lg:mt-16" aria-labelledby="sales-flow-title">
            <div className="mb-6 text-center">
              <p className="mb-2 font-[family-name:var(--font-dm-mono)] text-xs uppercase tracking-[0.18em] text-primary">
                Así avanza cada venta
              </p>
              <h2 id="sales-flow-title" className="text-2xl font-bold text-foreground md:text-3xl">
                Del primer mensaje al pedido, sin cambiar de chat
              </h2>
            </div>

            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {salesFlow.map((step, index) => (
                <li
                  key={step}
                  className="relative flex items-center gap-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-[family-name:var(--font-dm-mono)] text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold leading-snug text-white/84">{step}</span>
                  {index < salesFlow.length - 1 ? (
                    <ArrowRight
                      className="absolute -right-6 hidden h-4 w-4 text-white/78 lg:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <div className="mx-auto mt-10 grid max-w-5xl gap-px overflow-hidden rounded-[2rem] border border-white/8 bg-white/8 md:grid-cols-3">
            {proofPoints.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-[#0d110e] p-7 text-left">
                <span className="mb-3 inline-flex text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-bold text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meta exige un enlace visible a la política de privacidad en las
          landings que captan datos. Abre en pestaña nueva para no sacar a la
          persona del embudo. */}
      <footer className="relative w-full border-t border-white/8">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Nitro Ecom — Juan Arango</span>
          <Link
            href="/legal/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Política de privacidad
          </Link>
        </div>
      </footer>
    </main>
  );
}
