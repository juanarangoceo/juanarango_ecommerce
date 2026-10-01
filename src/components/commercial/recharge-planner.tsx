"use client";

// «¿Cuánto recargo?» para la modalidad Prepago (NIT-89). Dos usos reales de
// la recarga: atender la tienda todos los días o cubrir una campaña de ads
// puntual. Todo sale de los paquetes publicados y de UNITS_PER_CONVERSATION;
// no promete ventas ni resultados.

import { useId, useState } from "react";
import { Megaphone, Store } from "lucide-react";
import {
  UNITS_PER_CONVERSATION,
  formatCop,
  nitroCompletePlans,
  nitroCompleteStarterKit,
  packFor,
  planUnitPrice,
} from "@/lib/commercial-content";

type Use = "store" | "campaign";

const int = new Intl.NumberFormat("es-CO");
const DAYS_PER_MONTH = 30;

const USES = {
  store: {
    icon: Store,
    title: "Atiendo mi tienda",
    hint: "Respuestas todos los días, a tu ritmo",
    label: "Conversaciones de venta al día",
    min: 3,
    max: 150,
    step: 1,
    initial: 15,
  },
  campaign: {
    icon: Megaphone,
    title: "Lanzo una campaña de ads",
    hint: "Un pico de mensajes que quieres atender completo",
    label: "Conversaciones que esperas de la campaña",
    min: 100,
    max: 6000,
    step: 50,
    initial: 800,
  },
} as const;

export function RechargePlanner() {
  const [use, setUse] = useState<Use>("store");
  const [values, setValues] = useState<Record<Use, number>>({ store: USES.store.initial, campaign: USES.campaign.initial });
  const sliderId = useId();
  const config = USES[use];
  const value = values[use];
  const kitUnits = nitroCompleteStarterKit.units;

  // Todos empiezan con el kit; la recarga es lo que viene DESPUÉS.
  // Atender: un mes a su ritmo, una vez gastado el kit. Campaña: lo que el kit
  // no alcanza a cubrir (si la lanza apenas empieza).
  const perDay = value * UNITS_PER_CONVERSATION;
  const kitDays = use === "store" ? Math.floor(kitUnits / perDay) : null;
  const units = use === "store" ? perDay * DAYS_PER_MONTH : Math.max(0, value * UNITS_PER_CONVERSATION - kitUnits);
  const needsRecharge = units > 0;
  const { pack, count } = packFor(Math.max(units, 1));
  const totalUnits = pack.units * count;
  const totalCop = pack.priceCop * count;
  const daysItLasts = use === "store" ? Math.floor(totalUnits / perDay) : null;

  // Si con su ritmo diario un plan sale más barato que recargar, se lo decimos.
  const monthlyRechargeCop = use === "store" ? (units / pack.units) * pack.priceCop : 0;
  const plan = use === "store" ? nitroCompletePlans.find((p) => p.units >= units) : undefined;
  const planCop = plan ? Number(plan.price.replace(/[^0-9]/g, "")) : 0;
  const planIsCheaper = Boolean(plan) && planCop < monthlyRechargeCop;

  return (
    <div className="rounded-3xl border border-white/10 bg-superficie-nitro p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">Paso 2 · Después del kit</p>
      <p className="mt-2 text-lg font-semibold text-white">Recargas a tu medida. ¿Cuánto?</p>
      <div role="radiogroup" aria-label="Para qué vas a usar la recarga" className="mt-4 grid gap-2 sm:grid-cols-2">
        {(Object.keys(USES) as Use[]).map((key) => {
          const option = USES[key];
          const Icon = option.icon;
          const on = key === use;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setUse(key)}
              className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                on ? "border-primary bg-primary/[0.08]" : "border-white/10 hover:border-white/25"
              }`}
            >
              <Icon className={`mt-0.5 size-5 shrink-0 ${on ? "text-primary" : "text-white/45"}`} aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold text-white">{option.title}</span>
                <span className="mt-0.5 block text-xs leading-5 text-white/50">{option.hint}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={sliderId} className="text-sm font-medium text-white/80">{config.label}</label>
          <output htmlFor={sliderId} className="shrink-0 font-mono text-sm font-semibold tabular-nums text-white">{int.format(value)}</output>
        </div>
        <input
          id={sliderId}
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(event) => setValues((prev) => ({ ...prev, [use]: Number(event.target.value) }))}
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#B7FF2A]"
        />
      </div>

      <div className="mt-6 rounded-2xl bg-background p-5" aria-live="polite">
        <p className="text-sm leading-6 text-white/62">
          {kitDays != null ? (
            <>Las {int.format(kitUnits)} unidades de tu kit te alcanzan para <strong className="font-semibold text-white">≈ {int.format(Math.max(kitDays, 1))} {kitDays === 1 ? "día" : "días"}</strong>. Después:</>
          ) : needsRecharge ? (
            <>Tu kit cubre las primeras ≈ {int.format(Math.floor(kitUnits / UNITS_PER_CONVERSATION))} conversaciones. Para el resto de la campaña:</>
          ) : (
            <>Las {int.format(kitUnits)} unidades de tu kit <strong className="font-semibold text-white">ya cubren esta campaña</strong>. Recargas solo si viene otra.</>
          )}
        </p>
        {needsRecharge ? (
          <>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-white/45">{use === "store" ? "Recarga para un mes" : "Tu recarga"}</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-semibold tabular-nums tracking-tight text-white">{formatCop(totalCop)}</span>
              <span className="text-sm text-white/55">
                {count > 1 ? `${count} × ` : ""}{int.format(pack.units)} unidades
              </span>
            </p>
            <p className="mt-2 text-sm leading-6 text-white/62">
              {daysItLasts != null
                ? <>A tu ritmo te dura <strong className="font-semibold text-white">≈ {int.format(daysItLasts)} días</strong>. Recargas de nuevo cuando quieras.</>
                : <>Cubre <strong className="font-semibold text-white">≈ {int.format(Math.floor(totalUnits / UNITS_PER_CONVERSATION))} conversaciones</strong> más. Lo que sobre queda para la próxima.</>}
            </p>
          </>
        ) : null}
        {planIsCheaper && plan ? (
          <p className="mt-3 rounded-xl border border-primary/30 bg-primary/[0.07] px-3 py-2.5 text-sm leading-6 text-white/75">
            Con ese ritmo, <strong className="font-semibold text-white">{plan.name}</strong> te sale más barato:{" "}
            {plan.price} al mes ({formatCop(planUnitPrice(plan))} por turno) contra ≈ {formatCop(monthlyRechargeCop)} en recargas.{" "}
            <a href={`#plan-${plan.slug}`} className="font-semibold text-primary hover:underline">Ver plan</a>
          </p>
        ) : use === "store" && units >= 3_000 ? (
          <p className="mt-3 text-sm leading-6 text-white/55">
            Si tu volumen sigue creciendo, un plan mensual baja el turno hasta {formatCop(Math.min(...nitroCompletePlans.map(planUnitPrice)))} e incluye plantillas cada mes.{" "}
            <a href="#planes" className="font-semibold text-primary hover:underline">Comparar planes</a>
          </p>
        ) : null}
      </div>

      <p className="mt-4 text-xs leading-5 text-white/45">
        Recargas desde tu panel cuando las necesites, con Nequi, PSE o Bancolombia. {UNITS_PER_CONVERSATION} unidades por conversación en
        promedio; precios con IVA incluido. Lo que compras no vence.
      </p>
    </div>
  );
}
