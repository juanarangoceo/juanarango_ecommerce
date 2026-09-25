"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { WhatsAppLogo } from "@/components/commercial/brand-logos";
import { WaBubble, WaPhone, WaTyping, type WaMessage } from "@/components/commercial/whatsapp-ui";

// Una venta completa contada en WhatsApp. Cada capítulo corresponde a un
// módulo de Nitro Complete descrito en la ficha de producto; la conversación
// es ilustrativa y la postventa depende de la configuración de cada negocio.
type Chapter = { title: string; module: string; note: string; messages: readonly WaMessage[] };

const chapters: readonly Chapter[] = [
  {
    title: "Pregunta a las 10 p. m.",
    module: "Asesor con tu catálogo real",
    note: "Recomienda con los datos de tu catálogo. Precio y envío los calcula el sistema, no la IA.",
    messages: [
      { id: "1a", from: "system", text: "Hoy" },
      { id: "1b", from: "buyer", text: "Buenas noches, vi el morral en Instagram. ¿Le cabe un portátil de 15”?", time: "10:14 p. m." },
      { id: "1c", from: "business", text: "¡Hola! Sí: tiene compartimento acolchado para portátil de hasta 15,6”. Lo tenemos en negro y en gris.", time: "10:14 p. m.", product: { name: "Morral Nómada 30L", detail: "Negro · Gris", price: "$169.900" } },
      { id: "1d", from: "buyer", text: "El negro. ¿Cuánto con envío a Pereira?", time: "10:15 p. m." },
      { id: "1e", from: "business", text: "Con envío a Pereira queda en $189.900 y pagas al recibir. ¿Te lo separo?", time: "10:15 p. m." },
    ],
  },
  {
    title: "Pedido creado sin transcribir",
    module: "Pedidos",
    note: "El pedido queda en Shopify o en tu panel, con los datos de entrega completos. Nadie copia nada a mano.",
    messages: [
      { id: "2a", from: "buyer", text: "Sí. Laura Gómez, Cra 8 #21-40, Pereira", time: "10:16 p. m." },
      { id: "2b", from: "business", text: "Listo, Laura. Pedido creado:\nMorral Nómada 30L negro · $189.900 contraentrega.\nMañana te pido confirmarlo antes del despacho.", time: "10:16 p. m." },
    ],
  },
  {
    title: "Confirma antes del despacho",
    module: "Confirmación contraentrega",
    note: "El comprador confirma con un botón. Despachas pedidos confirmados y no a ciegas.",
    messages: [
      { id: "3a", from: "system", text: "Mañana" },
      { id: "3b", from: "business", text: "Hola Laura, ¿confirmas tu pedido del morral Nómada por $189.900?", time: "9:02 a. m.", buttons: ["Confirmar pedido", "Cambiar algo"] },
      { id: "3c", from: "buyer", text: "Confirmar pedido", time: "9:05 a. m." },
      { id: "3d", from: "business", text: "¡Confirmado! Te escribo apenas salga con la guía.", time: "9:05 a. m." },
    ],
  },
  {
    title: "Avisa el envío y pregunta si llegó",
    module: "Postventa",
    note: "Aviso de despacho con guía y pregunta de entrega. Tu equipo deja de responder «¿dónde va mi pedido?».",
    messages: [
      { id: "4a", from: "business", text: "Tu morral ya salió 📦\nGuía: 2140 5566 781", time: "3:40 p. m." },
      { id: "4b", from: "system", text: "Viernes" },
      { id: "4c", from: "business", text: "Hola Laura, ¿te llegó bien el morral?", time: "11:10 a. m." },
      { id: "4d", from: "buyer", text: "Sí, me encantó 🙌", time: "11:32 a. m." },
    ],
  },
  {
    title: "Tu equipo entra cuando hace falta",
    module: "Casos con contexto",
    note: "Cambios, reclamos o casos delicados pasan a una persona con toda la conversación.",
    messages: [
      { id: "5a", from: "buyer", text: "¿Lo puedo cambiar por el gris? Es para un regalo", time: "11:33 a. m." },
      { id: "5b", from: "business", text: "Claro. Te paso con Andrés, de nuestro equipo, para gestionar el cambio. Ya tiene toda la conversación.", time: "11:33 a. m." },
      { id: "5c", from: "system", text: "Caso asignado a tu equipo" },
    ],
  },
];

export function WhatsAppStory() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [count, setCount] = useState(2);
  const [typing, setTyping] = useState(false);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const messages = chapters[chapter].messages;
  const visible = reduceMotion ? messages.length : count;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let timer: number;
    if (count >= messages.length) {
      if (!autoplay) return;
      timer = window.setTimeout(() => {
        setChapter((current) => (current + 1) % chapters.length);
        setCount(1);
      }, 2600);
      return () => window.clearTimeout(timer);
    }
    const next = messages[count];
    if (next.from === "business" && !typing) {
      timer = window.setTimeout(() => setTyping(true), 500);
    } else {
      timer = window.setTimeout(() => {
        setTyping(false);
        setCount((current) => current + 1);
      }, next.from === "business" ? 1200 : next.from === "system" ? 700 : 1400);
    }
    return () => window.clearTimeout(timer);
  }, [count, typing, inView, autoplay, messages, reduceMotion]);

  const select = (index: number) => {
    setAutoplay(false);
    setTyping(false);
    setChapter(index);
    setCount(1);
  };

  return (
    <div ref={rootRef} className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-16">
      <ol className="order-2 grid gap-2 lg:order-none" aria-label="Capítulos de la venta">
        {chapters.map((item, index) => {
          const active = index === chapter;
          const progress = active ? Math.min(visible / item.messages.length, 1) : index < chapter ? 1 : 0;
          return (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => select(index)}
                aria-current={active ? "step" : undefined}
                className={`group w-full rounded-2xl border p-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:p-5 ${active ? "border-primary/35 bg-[#111611]" : "border-white/8 bg-transparent hover:border-white/15 hover:bg-white/[.02]"}`}
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className={`text-base font-semibold sm:text-lg ${active ? "text-white" : "text-white/62"}`}>{item.title}</span>
                  <span className={`hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] sm:inline ${active ? "text-primary" : "text-white/35"}`}>{item.module}</span>
                </span>
                <span className={`grid transition-[grid-template-rows,opacity] duration-300 ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="overflow-hidden">
                    <span className="block pt-2 text-sm leading-6 text-white/58"><span className="font-semibold text-primary sm:hidden">{item.module}. </span>{item.note}</span>
                  </span>
                </span>
                <span className="mt-3 block h-0.5 overflow-hidden rounded-full bg-white/8" aria-hidden="true">
                  <span className="block h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${progress * 100}%` }} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <figure className="relative order-1 mx-auto w-full max-w-[23rem] lg:order-none">
        <div className="pointer-events-none absolute -inset-12 rounded-full bg-primary/[0.07] blur-[90px]" aria-hidden="true" />
        <WaPhone storeName="Tienda Nómada" status={typing ? "escribiendo…" : "en línea"} className="relative">
          <div className="flex h-[24rem] flex-col justify-end sm:h-[30rem] gap-1.5 overflow-hidden px-2.5 py-3" aria-live="polite">
            {chapters.slice(0, chapter).flatMap((item) => item.messages).map((message) => (
              <div key={message.id} className="opacity-80">
                <WaBubble message={message} />
              </div>
            ))}
            {messages.slice(0, visible).map((message) => (
              <div key={message.id} className="wa-enter">
                <WaBubble message={message} />
              </div>
            ))}
            {typing ? <WaTyping /> : null}
          </div>
        </WaPhone>
        <figcaption className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
          <WhatsAppLogo className="size-3.5" />
          Conversación ilustrativa · la postventa depende de tu configuración
        </figcaption>
      </figure>
    </div>
  );
}
