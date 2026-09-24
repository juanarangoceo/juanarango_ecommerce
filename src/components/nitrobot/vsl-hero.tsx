"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, UserRoundCheck } from "lucide-react";
import { VslFunnel } from "@/components/nitrobot/vsl-funnel";

const JUAN_PHOTO =
  "https://res.cloudinary.com/dohwyszdj/image/upload/f_auto,q_auto,w_800/v1781237424/Juan_arango_Ecommerce_r96gjj.png";

const trustSignals = [
  { icon: BadgeCheck, text: "15 años en ecommerce" },
  { icon: UserRoundCheck, text: "Se adapta a tu negocio" },
];

const heroMessages = [
  "pedidos listos para despachar",
  "cotizaciones con tus precios",
  "ventas registradas para tu equipo",
];

type TypewriterPhase = "deleting" | "pausing" | "typing";

export function VslHero() {
  const [formVisible, setFormVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typewriterPhase, setTypewriterPhase] =
    useState<TypewriterPhase>("pausing");
  const [visibleMessage, setVisibleMessage] = useState(heroMessages[0]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const activeMessage = heroMessages[messageIndex];
    const delay =
      typewriterPhase === "pausing"
        ? 2200
        : typewriterPhase === "deleting"
          ? visibleMessage.length > 0
            ? 28
            : 260
          : 48;

    const timeout = window.setTimeout(() => {
      if (typewriterPhase === "pausing") {
        setTypewriterPhase("deleting");
        return;
      }

      if (typewriterPhase === "deleting") {
        if (visibleMessage.length > 0) {
          setVisibleMessage((message) => message.slice(0, -1));
          return;
        }

        setMessageIndex((index) => (index + 1) % heroMessages.length);
        setTypewriterPhase("typing");
        return;
      }

      if (visibleMessage.length < activeMessage.length) {
        setVisibleMessage(activeMessage.slice(0, visibleMessage.length + 1));
        return;
      }

      setTypewriterPhase("pausing");
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [messageIndex, prefersReducedMotion, typewriterPhase, visibleMessage]);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10 xl:gap-14">
      <div className="text-center lg:text-left">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="mb-3 whitespace-nowrap font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.16em] uppercase text-primary sm:text-xs md:text-sm md:tracking-[0.2em]">
            NitroBot · Vende por WhatsApp con IA
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-[2.65rem] xl:text-5xl">
            <span aria-hidden="true">
              Convierte chats de WhatsApp en
              <span className="mt-1 grid text-primary">
                {heroMessages.map((message) => (
                  <span
                    key={message}
                    className="invisible col-start-1 row-start-1"
                  >
                    {message}
                  </span>
                ))}
                <span className="col-start-1 row-start-1">
                  {visibleMessage}
                  {!prefersReducedMotion && (
                    <span
                      className="ml-1 inline-block h-[0.9em] w-0.5 translate-y-[0.08em] bg-primary motion-safe:animate-pulse"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </span>
            </span>
            <span className="sr-only">
              Convierte chats de WhatsApp en {heroMessages[0]}.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/58 lg:mx-0 lg:text-lg">
            Conecta Shopify o sube tu catálogo directo a NitroBot. El asesor recomienda,
            cotiza, pide los datos de entrega y deja el pedido listo para despacho. Si el
            caso necesita criterio, pasa el chat a tu equipo con todo el contexto.
          </p>

          <div
            className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
            aria-label="Razones para confiar"
          >
            {trustSignals.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="whitespace-nowrap text-[11px] font-medium text-white/78 sm:text-xs">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {formVisible && (
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-8 hidden overflow-hidden rounded-2xl border border-border bg-card lg:block"
          >
            <div className="relative aspect-[4/4.6] max-h-[500px] overflow-hidden">
              <Image
                src={JUAN_PHOTO}
                alt="Juan Arango, creador de NitroBot"
                fill
                sizes="(min-width: 1024px) 34vw, 0px"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-2 font-[family-name:var(--font-dm-mono)] text-xs uppercase tracking-[0.18em] text-primary">
                  Juan Arango · Nitro Ecom
                </p>
                <h2 className="text-2xl font-bold text-white">Yo reviso personalmente tu caso.</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/78">
                  Llevo 15 años construyendo ecommerce en Latinoamérica. Revisaré cómo vendes
                  por WhatsApp y qué habría que conectar o cargar para trabajar con tu catálogo.
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </div>

      <VslFunnel onReveal={() => setFormVisible(true)} />
    </div>
  );
}
