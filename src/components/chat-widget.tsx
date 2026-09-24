"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, ChartNoAxesCombined, LayoutTemplate } from "lucide-react";
import { PixelSphere, type PixelSphereShape } from "@/components/commercial/pixel-sphere";

type SphereContext = { shape: PixelSphereShape; label: string };

const CONTEXTS: Record<string, SphereContext> = {
  idle: { shape: "orb", label: "Explora Nitro" },
  flow: { shape: "pulse", label: "Mira cómo cobra vida" },
  ecosystem: { shape: "network", label: "Conecta soluciones" },
  diagnostic: { shape: "chat", label: "Cuéntame qué necesitas" },
  about: { shape: "spark", label: "Conoce cómo te acompaño" },
  ideas: { shape: "spark", label: "Descubre una idea" },
};

const choices = [
  { icon: Bot, label: "Vender por WhatsApp", href: "/nitro-complete" },
  { icon: ChartNoAxesCombined, label: "Mejorar mi ecommerce", href: "/soluciones/nitro-commerce" },
  { icon: LayoutTemplate, label: "Crear una landing", href: "/soluciones/nitro-landing" },
] as const;

export function ChatWidget() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [sphereContext, setSphereContext] = useState<SphereContext>(CONTEXTS.idle);
  const [contextGesture, setContextGesture] = useState<PixelSphereShape | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const contextTimerRef = useRef<number | null>(null);
  const activeContextRef = useRef("idle");

  useEffect(() => {
    if (pathname?.startsWith("/demos")) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nitro-orb]"));
    if (sections.length === 0) {
      const resetFrame = window.requestAnimationFrame(() => {
        activeContextRef.current = "idle";
        setSphereContext(CONTEXTS.idle);
        setContextGesture(null);
      });
      return () => window.cancelAnimationFrame(resetFrame);
    }

    const visibleSections = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.set(entry.target, entry.intersectionRatio);
          else visibleSections.delete(entry.target);
        });
        const active = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] as HTMLElement | undefined;
        const contextName = active?.dataset.nitroOrb ?? "idle";
        if (contextName === activeContextRef.current) return;

        const nextContext = CONTEXTS[contextName] ?? CONTEXTS.idle;
        activeContextRef.current = contextName;
        setSphereContext(nextContext);
        if (contextTimerRef.current) window.clearTimeout(contextTimerRef.current);

        if (nextContext.shape === "orb") {
          setContextGesture(null);
        } else {
          setContextGesture(nextContext.shape);
          contextTimerRef.current = window.setTimeout(() => setContextGesture(null), 3600);
        }
      },
      { rootMargin: "-24% 0px -48% 0px", threshold: [0.05, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      if (contextTimerRef.current) window.clearTimeout(contextTimerRef.current);
    };
  }, [pathname]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      if (!isOpen) setIsScrolling(true);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = window.setTimeout(() => setIsScrolling(false), 900);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    };
  }, [isOpen, shouldReduceMotion]);

  if (pathname?.startsWith("/demos")) return null;

  const currentShape: PixelSphereShape = isOpen
    ? "close"
    : isHovering
      ? "wink"
      : isScrolling
        ? "pulse"
        : contextGesture ?? "orb";

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
            aria-label="Asistente Nitro"
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <span className="grid size-10 place-items-center rounded-full border border-primary/20 bg-black/55">
                <span className="grid grid-cols-3 gap-0.5" aria-hidden="true">
                  {Array.from({ length: 9 }, (_, index) => <span key={index} className={`size-1 bg-primary ${index === 0 || index === 8 ? "opacity-35" : ""}`} />)}
                </span>
              </span>
              <div>
                <p className="text-sm font-bold text-white">Asistente Nitro</p>
                <p className="mt-0.5 text-xs text-white/45">Encuentra un buen punto de partida</p>
              </div>
            </div>

            <div className="overflow-y-auto p-5">
              <div className="max-w-[94%] rounded-2xl rounded-tl-md border border-white/8 bg-white/[0.035] p-4">
                <p className="text-sm leading-6 text-white/80">Hola. ¿Qué quieres mejorar en tu negocio?</p>
                <p className="mt-2 text-xs leading-5 text-white/45">Elige una opción y te muestro la solución que mejor encaja.</p>
              </div>

              <div className="mt-5 grid gap-2">
                {choices.map((choice) => (
                  <Link
                    key={choice.href}
                    href={choice.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex min-h-12 items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-left text-sm text-white/72 transition-colors hover:border-primary/28 hover:bg-primary/[0.055] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                  >
                    <choice.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{choice.label}</span>
                    <ArrowRight className="ml-auto size-4 text-white/25 transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                  </Link>
                ))}
              </div>

              <Link
                href="/diagnostico"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                No sé cuál necesito
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <div className="group relative flex items-center">
        <span
          className={`pointer-events-none absolute right-[calc(100%+0.65rem)] hidden whitespace-nowrap rounded-full border border-white/10 bg-[#0b0f0c]/92 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65 shadow-xl backdrop-blur-md transition-all duration-200 sm:block ${isHovering && !isOpen ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}
          aria-hidden="true"
        >
          {sphereContext.label}
        </span>
        <motion.button
          type="button"
          aria-label={isOpen ? "Cerrar asistente Nitro" : "Abrir asistente Nitro"}
          aria-expanded={isOpen}
          aria-controls="nitro-orb-panel"
          onClick={() => setIsOpen((current) => !current)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          className="relative grid size-[4.6rem] place-items-center overflow-hidden rounded-full border border-primary/22 bg-[#050806]/92 shadow-[0_14px_44px_rgba(0,0,0,0.5),0_0_28px_rgba(183,255,42,0.12)] outline-none transition-[border-color,box-shadow] hover:border-primary/45 hover:shadow-[0_16px_48px_rgba(0,0,0,0.58),0_0_42px_rgba(183,255,42,0.2)] focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:size-[5.25rem]"
        >
          <span className="pointer-events-none absolute inset-[7px] rounded-full border border-white/[0.045]" aria-hidden="true" />
          <PixelSphere shape={currentShape} />
        </motion.button>
      </div>
    </div>
  );
}
