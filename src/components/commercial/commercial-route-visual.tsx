"use client";

import { useEffect, useRef } from "react";
import { MessageSquareText, MousePointerClick, ShoppingBag } from "lucide-react";

const stages = [
  { label: "Tráfico", icon: MousePointerClick },
  { label: "Conversación", icon: MessageSquareText },
  { label: "Venta", icon: ShoppingBag },
] as const;

export function CommercialRouteVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const signal = visual.querySelector<HTMLElement>(".nitro-route-signal");
    const fill = visual.querySelector<HTMLElement>(".nitro-route-fill");
    const track = visual.querySelector<HTMLElement>(".nitro-route-track");
    const status = visual.querySelector<HTMLElement>(".nitro-route-status");
    const nodes = visual.querySelectorAll<HTMLElement>(".nitro-route-node");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const rect = visual.getBoundingClientRect();
      const start = window.innerHeight * 0.92;
      const end = window.innerHeight * 0.18;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const signalOffset = progress * (track?.clientWidth ?? 0);

      visual.dataset.scrollProgress = progress.toFixed(2);
      visual.dataset.motionPreference = reducedMotion ? "reduced" : "full";
      signal?.style.setProperty("--nitro-route-x", `${signalOffset}px`);
      signal?.style.setProperty("--nitro-route-opacity", reducedMotion || progress < 0.01 ? "0" : "1");
      fill?.style.setProperty("--nitro-route-progress", progress.toString());
      status?.style.setProperty("--nitro-route-status-opacity", progress > 0.02 ? "1" : "0.35");

      const thresholds = [0.08, 0.48, 0.84];
      nodes.forEach((node, index) => {
        node.classList.toggle("nitro-route-node-is-active", progress >= thresholds[index]);
      });
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div
      ref={visualRef}
      role="img"
      aria-label="Recorrido comercial entre tráfico, conversación y venta"
      className="nitro-route-visual w-full max-w-xl rounded-[1.75rem] border border-white/9 bg-black/25 p-6 sm:p-8 lg:justify-self-end"
    >
      <div aria-hidden="true">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className="text-white/35">Recorrido comercial</span>
          <span className="flex items-center gap-2 text-primary"><span className="nitro-route-status size-1.5 rounded-full bg-primary" /> Señal Nitro</span>
        </div>
        <div className="relative mt-9">
          <div className="nitro-route-track absolute left-[12%] right-[12%] top-5 h-px bg-white/10">
            <span className="nitro-route-fill absolute inset-0 origin-left bg-primary/20" />
            <span className="nitro-route-signal absolute left-0 top-1/2 block size-3 rounded-full bg-primary" />
          </div>
          <div className="relative grid grid-cols-3">
            {stages.map((stage, index) => (
              <div key={stage.label} className="flex flex-col items-center text-center">
                <span className="nitro-route-node relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#0b0e0c] text-white/45">
                  <stage.icon className="size-[1.125rem]" />
                </span>
                <span className="mt-3 text-xs font-semibold text-white/58">{stage.label}</span>
                <span className="mt-1 font-mono text-[9px] text-white/22">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
