"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

// En celular, el detalle que no decide la compra queda plegado tras un botón;
// desde `lg` se muestra siempre. El contenido permanece en el HTML (buscadores
// y lectores de pantalla lo siguen encontrando).
export function MobileFold({ label, children, tone = "light", className = "" }: { label: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const colors = tone === "dark" ? "border-white/15 text-white" : "border-line text-ink";
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-4 text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:hidden ${colors}`}
      >
        {label}
        <ChevronDown className={`size-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <div id={id} className={open ? "pt-4 lg:pt-0" : "hidden lg:block"}>{children}</div>
    </div>
  );
}
