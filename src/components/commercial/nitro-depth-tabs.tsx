"use client";

import { useEffect, useState, type ReactNode } from "react";

// «Todo lo que hace» en /nitro-complete: recorrido de la venta, herramientas y
// voz eran tres secciones largas seguidas; aquí se elige una. Las tres siguen
// en el HTML (buscadores y enlaces con ancla): solo se oculta la que no se ve.
export interface DepthTab {
  /** Coincide con el id de la sección que contiene (ancla). */
  id: string;
  label: string;
  content: ReactNode;
}

export function NitroDepthTabs({ tabs }: { tabs: DepthTab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  // Un enlace a #voz o #herramientas abre su pestaña y baja hasta ella.
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1);
      if (!tabs.some((tab) => tab.id === id)) return;
      setActive(id);
      requestAnimationFrame(() => document.getElementById("todo")?.scrollIntoView({ block: "start" }));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [tabs]);

  return (
    <div id="todo" className="scroll-mt-20">
      <section className="border-t border-white/7 px-5 pb-8 pt-16 lg:px-8 lg:pt-24" data-nitro-orb="ecosystem">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">
              No solo responde.<br /><span className="text-primary">Lleva la venta hasta la entrega.</span>
            </h2>
          </div>
          <div role="tablist" aria-label="Lo que hace Nitro Complete" className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActive(tab.id)}
                  className={`min-h-12 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selected ? "border-primary bg-primary text-ink" : "border-white/15 text-white/80 hover:bg-white/7 hover:text-white"}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {tabs.map((tab) => (
        <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} hidden={tab.id !== active}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
