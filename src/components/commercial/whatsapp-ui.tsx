"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, MoreVertical, Phone, Video } from "lucide-react";

// Piezas de interfaz que imitan WhatsApp visto desde el teléfono del
// comprador: la tienda escribe a la izquierda y el comprador a la derecha, con
// el doble check real. Las tiendas y personas son ficticias y se rotulan así.

export type WaProduct = { name: string; detail: string; price: string; art: React.ReactNode };

export type WaMessage =
  | { id: string; from: "buyer"; text: string; time: string }
  | { id: string; from: "business"; text: string; time: string; product?: WaProduct; buttons?: readonly string[] }
  | { id: string; from: "system"; text: string };

export type WaStore = { name: string; logo: React.ReactNode };

/**
 * Doble check de WhatsApp (mismo trazo que WhatsApp Web). `read` lo pinta
 * azul; si no, queda gris como «entregado».
 */
export function WaTicks({ read = true, className = "" }: { read?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 16 15" width="16" height="15" className={`inline-block shrink-0 transition-colors duration-500 ${read ? "text-[#53bdeb]" : "text-[#8696a0]"} ${className}`} aria-label={read ? "Leído" : "Entregado"} role="img" fill="currentColor">
      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
    </svg>
  );
}

export function WaBubble({ message, read = true }: { message: WaMessage; read?: boolean }) {
  if (message.from === "system") {
    return (
      <div className="flex justify-center py-1">
        <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#54656f] shadow-[0_1px_0.5px_rgba(11,20,26,.13)]">{message.text}</span>
      </div>
    );
  }

  const buyer = message.from === "buyer";
  return (
    <div className={`flex ${buyer ? "justify-end" : "justify-start"}`}>
      <div className={`relative max-w-[84%] rounded-lg px-2.5 pb-1.5 pt-1.5 text-[13.5px] leading-[1.35] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,.13)] ${buyer ? "rounded-tr-none bg-[#d9fdd3]" : "rounded-tl-none bg-white"}`}>
        {!buyer && message.product ? (
          <div className="mb-1.5 overflow-hidden rounded-md bg-[#f5f6f6]">
            <div className="flex h-24 items-center justify-center">{message.product.art}</div>
            <div className="bg-white px-2 py-1.5">
              <p className="text-[12.5px] font-semibold leading-tight">{message.product.name}</p>
              <p className="text-[11px] text-[#667781]">{message.product.detail}</p>
              <p className="mt-0.5 text-[12.5px] font-semibold">{message.product.price}</p>
            </div>
          </div>
        ) : null}
        <span className="whitespace-pre-line">{message.text}</span>
        <span className="float-right ml-2 mt-1.5 flex translate-y-0.5 items-center gap-0.5 text-[10.5px] leading-none text-[#667781]">
          {message.time}
          {buyer ? <WaTicks read={read} /> : null}
        </span>
        {!buyer && message.buttons?.length ? (
          <div className="clear-both -mx-2.5 -mb-1.5 border-t border-black/[.07] pt-0.5">
            {message.buttons.map((button) => (
              <span key={button} className="block border-b border-black/[.07] py-2 text-center text-[13px] font-medium text-[#008069] last:border-b-0">{button}</span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function WaTyping() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow-[0_1px_0.5px_rgba(11,20,26,.13)]" aria-label="Escribiendo">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-1.5 animate-bounce rounded-full bg-[#8696a0]" style={{ animationDelay: `${dot * 140}ms` }} />
        ))}
      </div>
    </div>
  );
}

/** Lista de burbujas: un mensaje del comprador pasa a leído cuando la tienda responde. */
export function WaThread({ messages, dimmed = 0 }: { messages: readonly WaMessage[]; dimmed?: number }) {
  return (
    <>
      {messages.map((message, index) => {
        const read = message.from !== "buyer" || messages.slice(index + 1).some((next) => next.from === "business");
        return (
          <div key={message.id} className={index < dimmed ? "opacity-80" : "wa-enter"}>
            <WaBubble message={message} read={read} />
          </div>
        );
      })}
    </>
  );
}

/** Marco de teléfono con la cabecera del chat de una tienda en WhatsApp. */
export function WaPhone({ store, status, children, className = "" }: { store: WaStore; status: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2.2rem] border-[7px] border-[#1b1f1c] bg-[#1b1f1c] shadow-[0_40px_120px_rgba(0,0,0,.5)] ${className}`}>
      <div className="flex items-center gap-2.5 bg-[#008069] px-3 py-2.5 text-white">
        <ChevronLeft className="size-5 shrink-0 opacity-90" aria-hidden="true" />
        <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">{store.logo}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold leading-tight">{store.name}</p>
          <p className="truncate text-[11px] leading-tight text-white/80">{status}</p>
        </div>
        <Video className="size-[18px] shrink-0 opacity-90" aria-hidden="true" />
        <Phone className="size-4 shrink-0 opacity-90" aria-hidden="true" />
        <MoreVertical className="size-4 shrink-0 opacity-90" aria-hidden="true" />
      </div>
      <div className="relative bg-[#efeae2] [background-image:radial-gradient(rgba(0,0,0,.035)_1px,transparent_1px)] [background-size:14px_14px]">{children}</div>
    </div>
  );
}

/**
 * Revela los mensajes uno a uno, con «escribiendo…» antes de cada respuesta
 * de la tienda. Se detiene fuera de pantalla y, con movimiento reducido,
 * muestra la conversación completa sin animar.
 */
export function useChatPlayback(total: number, options: { loop?: boolean; isBusiness: (index: number) => boolean; startAt?: number }) {
  const { loop = true, isBusiness, startAt = 1 } = options;
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(startAt);
  const [typing, setTyping] = useState(false);
  const [inView, setInView] = useState(false);
  const isBusinessRef = useRef(isBusiness);
  useEffect(() => {
    isBusinessRef.current = isBusiness;
  }, [isBusiness]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let timer: number;
    if (visible >= total) {
      if (!loop) return;
      timer = window.setTimeout(() => setVisible(startAt), 4200);
      return () => window.clearTimeout(timer);
    }
    const nextIsBusiness = isBusinessRef.current(visible);
    if (nextIsBusiness && !typing) {
      timer = window.setTimeout(() => setTyping(true), 650);
    } else {
      timer = window.setTimeout(() => {
        setTyping(false);
        setVisible((count) => count + 1);
      }, nextIsBusiness ? 1250 : 1500);
    }
    return () => window.clearTimeout(timer);
  }, [visible, typing, inView, loop, total, startAt, reduceMotion]);

  return { containerRef, visible: reduceMotion ? total : visible, typing: reduceMotion ? false : typing };
}
