"use client";

import { CheckCheck, Moon, PackageCheck } from "lucide-react";
import { WhatsAppLogo } from "@/components/commercial/brand-logos";
import { SerumArt, almaBotanica } from "@/components/commercial/demo-stores";
import { WaPhone, WaThread, WaTyping, useChatPlayback, type WaMessage } from "@/components/commercial/whatsapp-ui";

// Conversación ilustrativa del hero, vista desde el WhatsApp de la clienta,
// y al lado lo que queda registrado en el panel. Solo muestra capacidades de
// la ficha de producto (catálogo, pedido, confirmación).
const script: readonly WaMessage[] = [
  { id: "d1", from: "system", text: "Hoy" },
  { id: "q", from: "buyer", text: "Hola 👋 ¿el sérum de vitamina C sirve para piel grasa? ¿Cuánto vale con envío a Medellín?", time: "10:14 p. m." },
  {
    id: "a",
    from: "business",
    text: "¡Hola Sara! Sí, su textura es ligera y no deja sensación grasosa. Con envío a Medellín queda en $99.900 y pagas al recibir. ¿Te lo separo?",
    time: "10:14 p. m.",
    product: { name: "Sérum Vitamina C 15% · 30 ml", detail: "Piel grasa y mixta · disponible", price: "$89.900", art: <SerumArt /> },
  },
  { id: "b", from: "buyer", text: "Sí, porfa. Calle 10 #43-20, Medellín", time: "10:16 p. m." },
  { id: "c", from: "business", text: "Listo, Sara. Tu pedido quedó creado. Mañana te pido confirmarlo antes del despacho.", time: "10:16 p. m." },
  { id: "d2", from: "system", text: "Mañana" },
  { id: "e", from: "business", text: "Hola Sara, ¿confirmas tu pedido del sérum de vitamina C por $99.900?", time: "9:02 a. m.", buttons: ["Confirmar pedido", "Cambiar algo"] },
  { id: "f", from: "buyer", text: "Confirmar pedido", time: "9:05 a. m." },
  { id: "g", from: "business", text: "¡Confirmado! Te escribo con la guía apenas salga.", time: "9:05 a. m." },
];

const events = [
  { at: 3, icon: Moon, title: "Respondió a las 10:14 p. m.", detail: "Fuera de horario, con tu catálogo" },
  { at: 5, icon: PackageCheck, title: "Pedido #2087 creado", detail: "Datos de entrega completos" },
  { at: 8, icon: CheckCheck, title: "Confirmado por Sara", detail: "Listo para despachar" },
] as const;

export function NitroCompletePreview({ className = "" }: { className?: string }) {
  const { containerRef, visible, typing } = useChatPlayback(script.length, {
    startAt: 3,
    isBusiness: (index) => script[index]?.from === "business",
  });

  return (
    <figure ref={containerRef} className={`relative mx-auto w-full max-w-xl ${className}`} aria-label="Conversación ilustrativa de Nitro Complete en WhatsApp">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-primary/[0.08] blur-[90px]" aria-hidden="true" />

      <div className="relative grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_12.5rem]">
        <WaPhone store={almaBotanica} status={typing ? "escribiendo…" : "en línea"} className="mx-auto w-full max-w-[22rem]">
          <div className="flex h-[22rem] flex-col justify-end gap-1.5 overflow-hidden px-2.5 py-3 sm:h-[25rem]" aria-live="polite">
            <WaThread messages={script.slice(0, visible)} />
            {typing ? <WaTyping /> : null}
          </div>
        </WaPhone>

        <ol className="grid gap-2.5 sm:gap-3" aria-label="Lo que registra el panel">
          <li className="mb-1 hidden items-center gap-2 text-xs font-semibold text-white/60 sm:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            En tu panel Nitro
          </li>
          {events.map(({ at, icon: Icon, title, detail }) => {
            const done = visible >= at;
            return (
              <li
                key={title}
                className={`flex gap-3 rounded-2xl border p-3 transition-all duration-500 ${done ? "border-primary/30 bg-[#111611] opacity-100" : "border-white/8 bg-white/[.02] opacity-40"}`}
              >
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${done ? "bg-primary text-ink" : "bg-white/8 text-white/40"}`}>
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-semibold leading-tight text-white">{title}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-white/50">{detail}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <figcaption className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
        <WhatsAppLogo className="size-3.5" />
        Conversación ilustrativa · tienda de ejemplo
      </figcaption>
    </figure>
  );
}
