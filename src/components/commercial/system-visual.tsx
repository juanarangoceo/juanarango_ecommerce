"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  LayoutTemplate,
} from "lucide-react";

const solutions = [
  {
    id: "commerce",
    label: "NitroCommerce",
    mobileLabel: "NitroCommerce",
    category: "Asesoría personalizada",
    headline: "Aclaremos qué necesita tu ecommerce y hagámoslo realidad.",
    description: "Revisamos juntos tu negocio, elegimos las mejoras que más sentido tienen y te acompaño a implementarlas.",
    icon: ChartNoAxesCombined,
    href: "/soluciones/nitro-commerce",
  },
  {
    id: "landing",
    label: "Nitro Landing",
    mobileLabel: "Nitro Landing",
    category: "Páginas que convierten",
    headline: "Presenta tu oferta con claridad y guía cada visita al siguiente paso.",
    description: "Creamos una landing rápida, enfocada y lista para medir tus campañas desde el primer día.",
    icon: LayoutTemplate,
    href: "/soluciones/nitro-landing",
  },
  {
    id: "bot",
    label: "NitroBot",
    mobileLabel: "NitroBot",
    category: "Ventas por WhatsApp",
    headline: "Atiende los chats y convierte conversaciones en pedidos.",
    description: "NitroBot consulta tu catálogo, recomienda productos, cotiza y recopila los datos de entrega.",
    icon: Bot,
    href: "/nitrobot",
  },
] as const;

type SolutionId = (typeof solutions)[number]["id"];

export function SystemVisual() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<SolutionId>("commerce");
  const activeSolution = solutions.find((solution) => solution.id === activeId) ?? solutions[0];

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!("IntersectionObserver" in window)) {
      panel.classList.add("nitro-motion-active");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        panel.classList.toggle("nitro-motion-active", entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={panelRef}
      className="nitro-system-panel relative w-full min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d110e] p-5 shadow-2xl shadow-black/40 sm:p-7"
    >
      <div className="absolute inset-x-10 top-0 h-px overflow-hidden bg-white/8" aria-hidden="true">
        <span className="nitro-panel-signal block h-full w-2/5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Ecosistema Nitro</p>
          <p className="mt-2 max-w-xs text-sm leading-5 text-white/55">Elige la ayuda que tu negocio necesita hoy.</p>
        </div>
        <span className="flex shrink-0 items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 font-mono text-[10px] text-primary">
          <span className="nitro-status-dot size-1.5 rounded-full bg-primary" /> A TU MEDIDA
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2" role="group" aria-label="Elige una solución Nitro">
        {solutions.map((solution) => {
          const isActive = solution.id === activeId;
          return (
            <button
              key={solution.id}
              type="button"
              aria-pressed={isActive}
              data-solution={solution.id}
              onClick={() => setActiveId(solution.id)}
              onFocus={() => setActiveId(solution.id)}
              onMouseEnter={() => setActiveId(solution.id)}
              className={`nitro-solution-tab group flex min-h-[6.4rem] flex-col items-center justify-center rounded-2xl border px-2 py-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 ${isActive ? "nitro-solution-tab-is-active border-primary/35 bg-primary/[0.07]" : "border-white/8 bg-white/[0.02]"}`}
            >
              <span className={`flex size-9 items-center justify-center rounded-xl transition-colors ${isActive ? "bg-primary text-[#111311]" : "bg-primary/9 text-primary group-hover:bg-primary/16"}`}>
                <solution.icon className="size-[1.1rem]" aria-hidden="true" />
              </span>
              <span className="mt-3 hidden text-xs font-semibold text-white sm:block">{solution.label}</span>
              <span className="mt-3 text-[10px] font-semibold text-white sm:hidden">{solution.mobileLabel}</span>
            </button>
          );
        })}
      </div>

      <div
        key={activeSolution.id}
        role="region"
        aria-live="polite"
        aria-label={`Información sobre ${activeSolution.label}`}
        className="nitro-solution-detail relative mt-3 min-h-[13rem] overflow-hidden rounded-3xl border border-white/8 bg-[#111512] p-5 sm:p-6"
      >
        <span className="pointer-events-none absolute -right-10 -top-14 size-44 rounded-full bg-primary/[0.07] blur-3xl" aria-hidden="true" />
        <div className="relative">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">{activeSolution.category}</p>
          <h2 className="mt-3 max-w-md text-xl font-bold leading-7 text-white">{activeSolution.headline}</h2>
          <p className="mt-3 max-w-md text-xs leading-5 text-white/50">{activeSolution.description}</p>
          <Link href={activeSolution.href} className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45">
            Conocer {activeSolution.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mt-5 border-t border-white/8 pt-4">
        <p className="text-xs leading-5 text-white/48"><span className="font-semibold text-white/82">Una solución o las tres.</span> El ecosistema se adapta a lo que tu negocio necesita.</p>
      </div>
    </div>
  );
}
