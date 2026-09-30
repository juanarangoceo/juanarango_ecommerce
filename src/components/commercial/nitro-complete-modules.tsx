"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { nitroCompleteModules } from "@/lib/commercial-content";

// «Del primer mensaje a la entrega»: cada tarjeta resume su momento y, al
// tocarla, explica cómo funciona y qué hace falta. Una abierta a la vez para
// que en móvil la lectura no se vuelva una pared de texto.
export function NitroCompleteModules() {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();

  return (
    <ol className="mt-12 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
      {nitroCompleteModules.map(({ key, moment, title, text, how, needs, icon: Icon }) => {
        const expanded = open === key;
        const panelId = `${baseId}-${key}`;
        return (
          <li key={key} className={`rounded-2xl border bg-white transition-colors ${expanded ? "border-ink/25" : "border-line"}`}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : key)}
              className="group block w-full rounded-2xl p-7 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span className="flex items-center gap-3">
                <span className="nitro-icon-mark flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-primary"><Icon className="nitro-icon-glyph size-5" aria-hidden="true" /></span>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50">{moment}</span>
              </span>
              <span className="mt-5 block text-xl font-semibold tracking-tight text-ink">{title}</span>
              <span className="mt-3 block text-sm leading-6 text-ink/62">{text}</span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-nitro-text">
                {expanded ? "Cerrar" : "Cómo funciona"}
                <Plus className={`size-4 transition-transform duration-200 ${expanded ? "rotate-45" : "group-hover:rotate-90"}`} aria-hidden="true" />
              </span>
            </button>
            <div id={panelId} role="region" aria-label={`${title}: cómo funciona`} hidden={!expanded} className="px-7 pb-7">
              <div className="space-y-4 border-t border-line pt-5 text-sm leading-6">
                <div>
                  <p className="font-semibold text-ink">Cómo funciona</p>
                  <p className="mt-1 text-ink/65">{how}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Qué necesitas</p>
                  <p className="mt-1 text-ink/65">{needs}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
