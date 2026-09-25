"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, MoreVertical, Phone, ShoppingBag, Video } from "lucide-react";

// Piezas de interfaz que imitan WhatsApp Business visto desde el teléfono del
// negocio: el asesor escribe a la derecha (con los dos checks) y el comprador a
// la izquierda. Son ilustrativas; las conversaciones se rotulan como tales.

export type WaMessage =
  | { id: string; from: "buyer"; text: string; time: string }
  | {
      id: string;
      from: "business";
      text: string;
      time: string;
      product?: { name: string; detail: string; price: string };
      buttons?: readonly string[];
    }
  | { id: string; from: "system"; text: string };

/** Doble check de WhatsApp. `read` lo pinta azul, como un mensaje leído. */
export function WaTicks({ read = true, className = "" }: { read?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 16 11" className={`inline-block h-[11px] w-4 shrink-0 ${read ? "text-[#53bdeb]" : "text-[#8696a0]"} ${className}`} aria-label={read ? "Leído" : "Entregado"} role="img" fill="currentColor">
      <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.146.47.47 0 0 0-.343.146l-.311.31a.445.445 0 0 0-.14.337c0 .136.047.25.14.343l2.996 2.996a.724.724 0 0 0 .501.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.19-.374L11.07.653Zm-2.426 7.87-.855-.806-.458.567 1.297 1.297a.724.724 0 0 0 .502.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.19-.374l-.337-.281a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.574 8.3Z" />
    </svg>
  );
}

export function WaBubble({ message }: { message: WaMessage }) {
  if (message.from === "system") {
    return (
      <div className="flex justify-center py-1">
        <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#54656f] shadow-[0_1px_0.5px_rgba(11,20,26,.13)]">{message.text}</span>
      </div>
    );
  }

  const business = message.from === "business";
  return (
    <div className={`flex ${business ? "justify-end" : "justify-start"}`}>
      <div className={`relative max-w-[82%] rounded-lg px-2.5 pb-1.5 pt-1.5 text-[13.5px] leading-[1.35] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,.13)] ${business ? "rounded-tr-none bg-[#d9fdd3]" : "rounded-tl-none bg-white"}`}>
        {business && message.product ? (
          <div className="mb-1.5 overflow-hidden rounded-md bg-white/70">
            <div className="flex h-20 items-center justify-center bg-gradient-to-br from-[#1f2a22] to-[#0f1411]">
              <ShoppingBag className="size-8 text-primary" aria-hidden="true" />
            </div>
            <div className="px-2 py-1.5">
              <p className="text-[12.5px] font-semibold leading-tight">{message.product.name}</p>
              <p className="text-[11px] text-[#667781]">{message.product.detail}</p>
              <p className="mt-0.5 text-[12.5px] font-semibold">{message.product.price}</p>
            </div>
          </div>
        ) : null}
        <span className="whitespace-pre-line">{message.text}</span>
        <span className="float-right ml-2 mt-1.5 flex translate-y-0.5 items-center gap-1 text-[10.5px] leading-none text-[#667781]">
          {message.time}
          {business ? <WaTicks /> : null}
        </span>
        {business && message.buttons?.length ? (
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
    <div className="flex justify-end">
      <div className="flex items-center gap-1 rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2.5 shadow-[0_1px_0.5px_rgba(11,20,26,.13)]" aria-label="Escribiendo">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-1.5 animate-bounce rounded-full bg-[#667781]" style={{ animationDelay: `${dot * 140}ms` }} />
        ))}
      </div>
    </div>
  );
}

/** Marco de teléfono con la cabecera de un chat de WhatsApp Business. */
export function WaPhone({
  storeName,
  status,
  children,
  className = "",
}: {
  storeName: string;
  status: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[2.2rem] border-[7px] border-[#1b1f1c] bg-[#1b1f1c] shadow-[0_40px_120px_rgba(0,0,0,.5)] ${className}`}>
      <div className="flex items-center gap-2.5 bg-[#008069] px-3 py-2.5 text-white">
        <ChevronLeft className="size-5 shrink-0 opacity-90" aria-hidden="true" />
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-black text-primary">{storeName.charAt(0)}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold leading-tight">{storeName}</p>
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
 * del negocio. Se detiene fuera de pantalla y, con movimiento reducido,
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

  return {
    containerRef,
    visible: reduceMotion ? total : visible,
    typing: reduceMotion ? false : typing,
    setVisible,
  };
}
