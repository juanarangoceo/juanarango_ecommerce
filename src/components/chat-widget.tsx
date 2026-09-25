"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, X } from "lucide-react";
import { PixelSphere, type LookTarget, type PixelSphereShape } from "@/components/commercial/pixel-sphere";
import { WaTicks } from "@/components/commercial/whatsapp-ui";

// Asistente Nitro: una guía con respuestas predefinidas que lleva a rutas
// reales. No simula una IA ni envía datos; así se rotula en el panel.

type ContextName = "idle" | "flow" | "ecosystem" | "diagnostic" | "about" | "ideas" | "conversation" | "calculator" | "pricing" | "faq";
type SphereContext = { shape: PixelSphereShape; label: string; teaser?: string; opener?: NodeId };

const CONTEXTS: Record<ContextName, SphereContext> = {
  idle: { shape: "bolt", label: "Explora Nitro" },
  flow: { shape: "pulse", label: "Mira cómo cobra vida" },
  ecosystem: { shape: "network", label: "Conecta soluciones" },
  diagnostic: { shape: "chat", label: "Cuéntame qué necesitas" },
  about: { shape: "spark", label: "Conoce cómo te acompaño" },
  ideas: { shape: "spark", label: "Descubre una idea" },
  conversation: { shape: "ticks", label: "Así responde tu asesor", teaser: "¿Te gustaría vender así por WhatsApp? Te muestro cómo empezar.", opener: "sell" },
  calculator: { shape: "bars", label: "Calcula tu caso", teaser: "¿Revisamos estos números con tu caso real?", opener: "plans" },
  pricing: { shape: "chat", label: "Te ayudo a elegir", teaser: "¿Dudas con el plan? Te digo cómo elegirlo.", opener: "plans" },
  faq: { shape: "question", label: "¿Otra pregunta?", teaser: "¿No encuentras tu pregunta? Te oriento.", opener: "root" },
};

type NodeId = "root" | "sell" | "plans" | "ecommerce" | "landing" | "unsure";
type GuideNode = {
  bot: string;
  choices?: readonly { label: string; next: NodeId }[];
  links?: readonly { label: string; href: string; primary?: boolean }[];
};

const GUIDE: Record<NodeId, GuideNode> = {
  root: {
    bot: "Hola 👋 Soy la guía de Nitro. ¿Qué quieres resolver en tu negocio?",
    choices: [
      { label: "Vender más por WhatsApp", next: "sell" },
      { label: "Ordenar mi ecommerce", next: "ecommerce" },
      { label: "Lanzar una oferta", next: "landing" },
      { label: "No sé por dónde empezar", next: "unsure" },
    ],
  },
  sell: {
    bot: "Para eso está Nitro Complete: **atiende con tu catálogo real**, **crea el pedido**, **lo confirma antes del despacho** y **avisa el envío**. Tu equipo entra cuando hace falta.",
    links: [
      { label: "Comprobar si encaja", href: "/nitrobot/conectar", primary: true },
      { label: "Ver cómo funciona", href: "/nitro-complete" },
    ],
    choices: [{ label: "¿Cuánto cuesta?", next: "plans" }],
  },
  plans: {
    bot: "Los tres planes incluyen lo mismo: **asesor, pedidos, panel y control humano**. Cambia la capacidad mensual. La evaluación te dice cuál encaja con tu volumen, **sin llamada obligatoria**.",
    links: [
      { label: "Evaluar mi operación", href: "/nitrobot/conectar", primary: true },
      { label: "Ver planes y precios", href: "/nitro-complete#planes" },
    ],
    choices: [{ label: "Tengo otra consulta", next: "root" }],
  },
  ecommerce: {
    bot: "Con NitroCommerce revisamos juntos captación, conversión, atención y operación, elegimos una prioridad y te acompaño a implementarla.",
    links: [{ label: "Conocer NitroCommerce", href: "/soluciones/nitro-commerce", primary: true }],
    choices: [{ label: "Tengo otra consulta", next: "root" }],
  },
  landing: {
    bot: "Nitro Landing convierte una oferta en una página clara, rápida y medible, conectada con tu canal de ventas.",
    links: [{ label: "Conocer Nitro Landing", href: "/soluciones/nitro-landing", primary: true }],
    choices: [{ label: "Tengo otra consulta", next: "root" }],
  },
  unsure: {
    bot: "Sin problema. El diagnóstico son seis preguntas y te sugiere por dónde empezar, sin comprometerte a nada.",
    links: [{ label: "Hacer el diagnóstico", href: "/diagnostico", primary: true }],
    choices: [{ label: "Tengo otra consulta", next: "root" }],
  },
};

type Entry = { id: number; from: "bot" | "user"; text: string; node?: NodeId };

const SLEEP_AFTER_MS = 25000;
const LOOK_RADIUS = 280;
const MAX_TEASERS_PER_PAGE = 2;

function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") ? <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong> : part,
  );
}

function readSeen(): string[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("nitro-orb-teasers") ?? "[]") as string[];
  } catch {
    return [];
  }
}

function markSeen(context: string) {
  try {
    const seen = new Set(readSeen());
    seen.add(context);
    window.sessionStorage.setItem("nitro-orb-teasers", JSON.stringify([...seen]));
  } catch {
    // Sin almacenamiento el mensaje puede repetirse; no es un error.
  }
}

export function ChatWidget() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const [isAsleep, setIsAsleep] = useState(false);
  const [isWaking, setIsWaking] = useState(false);
  const [contextName, setContextName] = useState<ContextName>("idle");
  const [contextGesture, setContextGesture] = useState<PixelSphereShape | null>(null);
  const [teaserPhase, setTeaserPhase] = useState<"none" | "typing" | "shown">("none");
  const [teaserContext, setTeaserContext] = useState<ContextName | null>(null);
  const [unread, setUnread] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [botTyping, setBotTyping] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const lookRef = useRef<LookTarget | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const contextTimerRef = useRef<number | null>(null);
  const sleepTimerRef = useRef<number | null>(null);
  const teaserTimersRef = useRef<number[]>([]);
  const teasersShownRef = useRef(0);
  const activeContextRef = useRef<ContextName>("idle");
  const entryIdRef = useRef(0);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);
  const isAsleepRef = useRef(false);
  const isNearRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    isAsleepRef.current = isAsleep;
  }, [isAsleep]);

  const clearTeaserTimers = () => {
    teaserTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    teaserTimersRef.current = [];
  };

  const dismissTeaser = useCallback(() => {
    clearTeaserTimers();
    setTeaserPhase("none");
  }, []);

  // Mensaje proactivo: «escribiendo…» y luego una frase breve junto al orbe.
  const showTeaser = useCallback((name: ContextName) => {
    const context = CONTEXTS[name];
    if (!context.teaser || isOpenRef.current || teasersShownRef.current >= MAX_TEASERS_PER_PAGE) return;
    const key = `${window.location.pathname}:${name}`;
    if (readSeen().includes(key)) return;
    teasersShownRef.current += 1;
    markSeen(key);
    clearTeaserTimers();
    setTeaserContext(name);
    setTeaserPhase("typing");
    teaserTimersRef.current.push(
      window.setTimeout(() => {
        setTeaserPhase("shown");
        setUnread(true);
      }, 1400),
      window.setTimeout(() => setTeaserPhase("none"), 9000),
    );
  }, []);

  // Contexto de la sección visible.
  useEffect(() => {
    if (pathname?.startsWith("/demos")) return;
    teasersShownRef.current = 0;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nitro-orb]"));
    if (sections.length === 0) {
      const resetFrame = window.requestAnimationFrame(() => {
        activeContextRef.current = "idle";
        setContextName("idle");
        setContextGesture(null);
      });
      return () => window.cancelAnimationFrame(resetFrame);
    }

    const visibleSections = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.set(entry.target, entry.intersectionRatio);
          else visibleSections.delete(entry.target);
        });
        const active = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] as HTMLElement | undefined;
        const raw = active?.dataset.nitroOrb ?? "idle";
        const name = (raw in CONTEXTS ? raw : "idle") as ContextName;
        if (name === activeContextRef.current) return;

        activeContextRef.current = name;
        setContextName(name);
        const next = CONTEXTS[name];
        if (contextTimerRef.current) window.clearTimeout(contextTimerRef.current);
        if (next.shape === "bolt") {
          setContextGesture(null);
        } else {
          setContextGesture(next.shape);
          contextTimerRef.current = window.setTimeout(() => setContextGesture(null), 6000);
        }
        showTeaser(name);
      },
      { rootMargin: "-24% 0px -48% 0px", threshold: [0.05, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      if (contextTimerRef.current) window.clearTimeout(contextTimerRef.current);
    };
  }, [pathname, showTeaser]);

  // Scroll, cercanía del puntero y reposo.
  useEffect(() => {
    if (shouldReduceMotion) return;

    const scheduleSleep = () => {
      if (sleepTimerRef.current) window.clearTimeout(sleepTimerRef.current);
      sleepTimerRef.current = window.setTimeout(() => {
        if (!isOpenRef.current) setIsAsleep(true);
      }, SLEEP_AFTER_MS);
    };

    const wake = () => {
      if (isAsleepRef.current) {
        isAsleepRef.current = false;
        setIsAsleep(false);
        setIsWaking(true);
        window.setTimeout(() => setIsWaking(false), 900);
      }
      scheduleSleep();
    };

    let lastY = window.scrollY;
    const handleScroll = () => {
      wake();
      const y = window.scrollY;
      // Mientras se desplaza, los ojos miran hacia donde va la página.
      if (!isNearRef.current) lookRef.current = { x: 0.15, y: y >= lastY ? 1 : -1 };
      lastY = y;
      if (!isOpenRef.current) setIsScrolling(true);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = window.setTimeout(() => setIsScrolling(false), 900);
    };

    let frame = 0;
    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      wake();
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const near = distance < LOOK_RADIUS;
        lookRef.current = near ? { x: Math.max(-1, Math.min(1, dx / 160)), y: Math.max(-1, Math.min(1, dy / 160)) } : null;
        isNearRef.current = near;
        setIsNear((current) => (current === near ? current : near));
      });
    };

    scheduleSleep();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("keydown", wake);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("keydown", wake);
      window.cancelAnimationFrame(frame);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      if (sleepTimerRef.current) window.clearTimeout(sleepTimerRef.current);
    };
  }, [shouldReduceMotion]);

  useEffect(() => () => clearTeaserTimers(), []);

  useEffect(() => {
    scrollBodyRef.current?.scrollTo({ top: scrollBodyRef.current.scrollHeight, behavior: shouldReduceMotion ? "auto" : "smooth" });
  }, [entries, botTyping, shouldReduceMotion]);

  const pushBot = useCallback((node: NodeId) => {
    setBotTyping(true);
    window.setTimeout(() => {
      setBotTyping(false);
      entryIdRef.current += 1;
      setEntries((current) => [...current, { id: entryIdRef.current, from: "bot", text: GUIDE[node].bot, node }]);
    }, shouldReduceMotion ? 0 : 700);
  }, [shouldReduceMotion]);

  const open = (opener: NodeId = "root") => {
    dismissTeaser();
    setUnread(false);
    setIsAsleep(false);
    setIsOpen(true);
    if (entries.length === 0) pushBot(opener);
  };

  const choose = (label: string, next: NodeId) => {
    entryIdRef.current += 1;
    setEntries((current) => [...current, { id: entryIdRef.current, from: "user", text: label }]);
    pushBot(next);
  };

  const restart = () => {
    setEntries([]);
    pushBot("root");
  };

  if (pathname?.startsWith("/demos")) return null;

  const context = CONTEXTS[contextName];
  const currentShape: PixelSphereShape = isOpen
    ? "close"
    : isHovering || isWaking
      ? "wink"
      : teaserPhase === "typing"
        ? "typing"
        : isAsleep
          ? "sleep"
          : isScrolling || isNear
            ? "eyes"
            : contextGesture ?? "bolt";

  const lastBot = [...entries].reverse().find((entry) => entry.from === "bot");
  const teaserText = teaserContext ? CONTEXTS[teaserContext].teaser : null;

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            id="nitro-orb-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex max-h-[calc(100dvh-7rem)] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0b0f0c]/96 shadow-[0_26px_90px_rgba(0,0,0,0.62),0_0_50px_rgba(183,255,42,0.08)] backdrop-blur-xl sm:mb-4"
            aria-label="Guía Nitro"
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <span className="relative grid size-10 place-items-center rounded-full border border-primary/20 bg-black/55">
                <span className="grid grid-cols-3 gap-0.5" aria-hidden="true">
                  {Array.from({ length: 9 }, (_, index) => <span key={index} className={`size-1 bg-primary ${index === 0 || index === 8 ? "opacity-35" : ""}`} />)}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#0b0f0c] bg-primary" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">Guía Nitro</p>
                <p className="mt-0.5 truncate text-xs text-white/45">{botTyping ? "escribiendo…" : "Respuestas guiadas · te llevo a la página indicada"}</p>
              </div>
              {entries.length > 1 ? (
                <button type="button" onClick={restart} className="grid size-9 place-items-center rounded-full text-white/45 transition hover:bg-white/7 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45" aria-label="Empezar de nuevo">
                  <RotateCcw className="size-4" />
                </button>
              ) : null}
            </div>

            <div ref={scrollBodyRef} className="flex-1 space-y-3 overflow-y-auto p-5">
              {entries.map((entry) =>
                entry.from === "user" ? (
                  <div key={entry.id} className="wa-enter flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary/14 px-3.5 py-2.5 text-sm leading-6 text-white">
                      {entry.text}
                      <span className="ml-2 inline-flex translate-y-0.5"><WaTicks /></span>
                    </p>
                  </div>
                ) : (
                  <div key={entry.id} className="wa-enter max-w-[92%] rounded-2xl rounded-tl-md border border-white/8 bg-white/[0.035] px-4 py-3">
                    <p className="text-sm leading-6 text-white/78">{renderRich(entry.text)}</p>
                  </div>
                ),
              )}
              {botTyping ? (
                <div className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-md border border-white/8 bg-white/[0.035] px-4 py-3" aria-label="Escribiendo">
                  {[0, 1, 2].map((dot) => <span key={dot} className="size-1.5 animate-bounce rounded-full bg-white/50" style={{ animationDelay: `${dot * 140}ms` }} />)}
                </div>
              ) : null}

              {!botTyping && lastBot?.node ? (
                <div className="wa-enter grid gap-2 pt-1">
                  {GUIDE[lastBot.node].links?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={link.primary
                        ? "flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-ink transition-transform hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55"
                        : "flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-sm font-semibold text-white/80 transition hover:border-primary/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"}
                    >
                      {link.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  ))}
                  {GUIDE[lastBot.node].choices?.map((choice) => (
                    <button
                      key={choice.next}
                      type="button"
                      onClick={() => choose(choice.label, choice.next)}
                      className="min-h-11 rounded-2xl border border-white/8 bg-black/20 px-4 py-2.5 text-left text-sm text-white/75 transition-colors hover:border-primary/28 hover:bg-primary/[0.055] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <div className="group relative flex items-center">
        <AnimatePresence>
          {!isOpen && teaserPhase === "shown" && teaserText ? (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 10, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.22 }}
              className="absolute right-[calc(100%+0.75rem)] flex w-60 items-start gap-2 rounded-2xl rounded-br-md border border-white/12 bg-[#0b0f0c]/95 p-3 pr-2 shadow-2xl backdrop-blur-md"
            >
              <button type="button" onClick={() => open(CONTEXTS[teaserContext ?? "idle"].opener)} className="flex-1 text-left text-sm leading-5 text-white/85 focus-visible:outline-none">
                {teaserText}
              </button>
              <button type="button" onClick={dismissTeaser} className="grid size-6 shrink-0 place-items-center rounded-full text-white/40 hover:bg-white/8 hover:text-white" aria-label="Cerrar mensaje">
                <X className="size-3.5" />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <span
          className={`pointer-events-none absolute right-[calc(100%+0.65rem)] hidden whitespace-nowrap rounded-full border border-white/10 bg-[#0b0f0c]/92 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65 shadow-xl backdrop-blur-md transition-all duration-200 sm:block ${isHovering && !isOpen && teaserPhase !== "shown" ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}
          aria-hidden="true"
        >
          {isAsleep ? "Toca para despertarme" : context.label}
        </span>
        <motion.button
          ref={buttonRef}
          type="button"
          aria-label={isOpen ? "Cerrar guía Nitro" : "Abrir guía Nitro"}
          aria-expanded={isOpen}
          aria-controls="nitro-orb-panel"
          onClick={() => (isOpen ? setIsOpen(false) : open(context.opener))}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          animate={shouldReduceMotion || !isAsleep ? { opacity: 1 } : { opacity: 0.72 }}
          className="relative grid size-[4.6rem] place-items-center overflow-visible rounded-full border border-primary/22 bg-[#050806]/92 shadow-[0_14px_44px_rgba(0,0,0,0.5),0_0_28px_rgba(183,255,42,0.12)] outline-none transition-[border-color,box-shadow] hover:border-primary/45 hover:shadow-[0_16px_48px_rgba(0,0,0,0.58),0_0_42px_rgba(183,255,42,0.2)] focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:size-[5.25rem]"
        >
          <span className="pointer-events-none absolute inset-[7px] rounded-full border border-white/[0.045]" aria-hidden="true" />
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <PixelSphere shape={currentShape} lookRef={lookRef} />
          </span>
          {unread && !isOpen ? (
            <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full border-2 border-[#050806] bg-alert text-[10px] font-bold text-ink" aria-label="Mensaje nuevo">1</span>
          ) : null}
        </motion.button>
      </div>
    </div>
  );
}
