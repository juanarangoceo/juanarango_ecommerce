"use client";

import { useMemo, useRef, useState } from "react";
import { formLabel } from "@/lib/crm/config";
import type { DailyPoint } from "@/lib/crm/metrics";

const RANGES = [
  { days: 7, label: "7 días" },
  { days: 30, label: "30 días" },
  { days: 90, label: "90 días" },
] as const;

function niceMax(value: number) {
  if (value <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s * 4 >= value) ?? pow * 10;
  return step * 4;
}

const dayFormat = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", timeZone: "UTC" });
const weekdayFormat = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const asDate = (day: string) => new Date(`${day}T12:00:00Z`);

// Capturas por día (suscripciones, formularios, recursos y reservas). Una sola
// serie en verde Nitro; el desglose por formulario vive en el tooltip. En
// móvil se arrastra el dedo sobre las barras para recorrer los días.
export function ActivityChart({ points }: { points: DailyPoint[] }) {
  const [range, setRange] = useState<(typeof RANGES)[number]["days"]>(30);
  const [active, setActive] = useState<number | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => points.slice(-range), [points, range]);
  const total = data.reduce((sum, p) => sum + p.total, 0);
  const max = niceMax(Math.max(...data.map((p) => p.total), 0));
  const ticks = [max, max / 2, 0];
  const current = active !== null ? data[active] : null;

  const pick = (clientX: number) => {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect) return;
    const index = Math.floor(((clientX - rect.left) / rect.width) * data.length);
    setActive(Math.max(0, Math.min(data.length - 1, index)));
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/55">
          <span className="text-2xl font-semibold tracking-[-0.03em] text-white tabular-nums">{total.toLocaleString("es-CO")}</span> capturas en {range} días
        </p>
        <div className="flex rounded-full border border-white/10 bg-black/20 p-0.5" role="group" aria-label="Rango de fechas">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => {
                setRange(r.days);
                setActive(null);
              }}
              aria-pressed={range === r.days}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${range === r.days ? "bg-white text-[#111311]" : "text-white/55 hover:text-white"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex gap-2">
        <div className="relative h-48 w-6 shrink-0 font-mono text-[10px] text-white/35 md:h-56" aria-hidden>
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 translate-y-1/2 leading-none" style={{ bottom: `${(t / max) * 100}%` }}>
              {Number.isInteger(t) ? t : t.toFixed(1)}
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          <div
            ref={plotRef}
            className="relative flex h-48 touch-pan-y items-end border-b border-white/15 md:h-56"
            style={{ gap: data.length > 45 ? 1 : 2 }}
            onPointerMove={(e) => pick(e.clientX)}
            onPointerDown={(e) => pick(e.clientX)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
            role="img"
            aria-label={`Capturas diarias de los últimos ${range} días, total ${total}`}
          >
            {ticks.slice(0, 2).map((t) => (
              <span key={t} aria-hidden className="pointer-events-none absolute inset-x-0 border-t border-dashed border-white/[0.06]" style={{ bottom: `${(t / max) * 100}%` }} />
            ))}
            {data.map((p, i) => (
              <div key={p.day} className="relative flex h-full min-w-0 flex-1 items-end">
                <div
                  className={`w-full rounded-t-[4px] transition-[height,background-color] duration-500 ease-out ${
                    active === null || active === i ? "bg-[#B7FF2A]" : "bg-[#B7FF2A]/35"
                  }`}
                  style={{ height: p.total ? `max(3px, ${(p.total / max) * 100}%)` : "0" }}
                />
              </div>
            ))}
          </div>

          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-white/35" aria-hidden>
            <span>{data[0] ? dayFormat.format(asDate(data[0].day)) : ""}</span>
            <span>{data.at(-1) ? dayFormat.format(asDate(data.at(-1)!.day)) : ""}</span>
          </div>

          {current && active !== null ? (
            <div
              className="pointer-events-none absolute top-0 z-10 w-52 rounded-xl border border-white/10 bg-[#1A1E1A]/95 p-3 text-xs shadow-2xl backdrop-blur"
              style={{
                left: `clamp(0px, calc(${((active + 0.5) / data.length) * 100}% - 6.5rem), calc(100% - 13rem))`,
              }}
            >
              <p className="font-medium text-white first-letter:uppercase">{weekdayFormat.format(asDate(current.day))}</p>
              <p className="mt-0.5 text-white/55">
                <span className="font-semibold text-white tabular-nums">{current.total}</span> capturas
              </p>
              {Object.entries(current.byForm).length ? (
                <ul className="mt-2 space-y-1 border-t border-white/10 pt-2">
                  {Object.entries(current.byForm)
                    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
                    .map(([form, count]) => (
                      <li key={form} className="flex justify-between gap-3 text-white/70">
                        <span>{formLabel(form)}</span>
                        <span className="tabular-nums text-white">{count}</span>
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <details className="mt-3 text-xs text-white/45">
        <summary className="cursor-pointer select-none hover:text-white/70">Ver como tabla</summary>
        <div className="mt-2 max-h-56 overflow-auto rounded-lg border border-white/[0.07]">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-[#131613] text-white/55">
              <tr>
                <th className="px-3 py-1.5 font-medium">Día</th>
                <th className="px-3 py-1.5 text-right font-medium">Capturas</th>
              </tr>
            </thead>
            <tbody>
              {[...data].reverse().map((p) => (
                <tr key={p.day} className="border-t border-white/[0.05]">
                  <td className="px-3 py-1.5">{dayFormat.format(asDate(p.day))}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-white/80">{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
