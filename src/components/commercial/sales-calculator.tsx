"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Clock3, MessagesSquare, TrendingUp } from "lucide-react";
import { primaryCta } from "@/lib/commercial-content";

// Estimación transparente: todo sale de los datos del visitante y de supuestos
// visibles y editables. No publica resultados de clientes ni promete uplift;
// la evaluación comercial trabaja luego con los números reales del negocio.

const cop = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const int = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 1 });

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-white/80">{label}</label>
        <output htmlFor={id} className="shrink-0 font-mono text-sm font-semibold tabular-nums text-white">{format(value)}</output>
      </div>
      {hint ? <p className="mt-0.5 text-xs text-white/40">{hint}</p> : null}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#B7FF2A]"
      />
    </div>
  );
}

export function SalesCalculator() {
  const [chats, setChats] = useState(1500);
  const [ticket, setTicket] = useState(150000);
  const [closeRate, setCloseRate] = useState(8);
  const [offHours, setOffHours] = useState(30);
  const [lostOffHours, setLostOffHours] = useState(50);
  const [repetitive, setRepetitive] = useState(70);
  const [minutes, setMinutes] = useState(6);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const delegable = chats * (repetitive / 100);
  const hours = (delegable * minutes) / 60;
  const recoveredOrders = chats * (offHours / 100) * (lostOffHours / 100) * (closeRate / 100);
  const recoveredValue = recoveredOrders * ticket;
  const newCloseRate = closeRate * (1 + (offHours / 100) * (lostOffHours / 100));

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-superficie-nitro lg:grid-cols-[1fr_1fr]">
      <div className="space-y-7 p-6 sm:p-9">
        <p className="text-sm font-semibold text-white">Tu operación hoy</p>
        <Slider label="Conversaciones de venta al mes" value={chats} min={100} max={10000} step={100} format={int.format} onChange={setChats} />
        <Slider label="Ticket promedio" value={ticket} min={30000} max={800000} step={10000} format={cop.format} onChange={setTicket} />
        <Slider label="Chats que hoy terminan en venta" value={closeRate} min={1} max={30} step={0.5} format={(v) => `${pct.format(v)}%`} onChange={setCloseRate} />
        <Slider label="Chats que llegan fuera de horario" value={offHours} min={0} max={70} step={5} format={(v) => `${v}%`} onChange={setOffHours} />

        <div className="rounded-2xl border border-white/8">
          <button
            type="button"
            onClick={() => setShowAssumptions((open) => !open)}
            aria-expanded={showAssumptions}
            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
          >
            Ver y ajustar los supuestos
            <ChevronDown className={`size-4 transition-transform ${showAssumptions ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          {showAssumptions ? (
            <div className="space-y-6 border-t border-white/8 px-4 pb-5 pt-5">
              <Slider label="De esos, se pierden por no responder a tiempo" hint="Supuesto: ajústalo a tu caso." value={lostOffHours} min={0} max={100} step={5} format={(v) => `${v}%`} onChange={setLostOffHours} />
              <Slider label="Conversaciones que el asesor resuelve solo" hint="Supuesto: preguntas de producto, precio, envío y datos de entrega." value={repetitive} min={0} max={100} step={5} format={(v) => `${v}%`} onChange={setRepetitive} />
              <Slider label="Minutos de tu equipo por conversación" hint="Supuesto: tiempo promedio que hoy dedica una persona." value={minutes} min={1} max={20} step={1} format={(v) => `${v} min`} onChange={setMinutes} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col border-t border-white/10 bg-[#0d110e] p-6 sm:p-9 lg:border-l lg:border-t-0" aria-live="polite">
        <p className="text-sm font-semibold text-white">Lo que Nitro Complete podría cambiar</p>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8">
          <div className="bg-[#0d110e] p-5">
            <dt className="flex items-center gap-2 text-xs font-medium text-white/55"><MessagesSquare className="size-4 text-primary" aria-hidden="true" />Conversaciones que puedes delegar</dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-white">{int.format(delegable)} <span className="text-base font-normal text-white/45">al mes</span></dd>
            <dd className="mt-1 text-xs text-white/45">El resto pasa a tu equipo con la conversación completa.</dd>
          </div>
          <div className="bg-[#0d110e] p-5">
            <dt className="flex items-center gap-2 text-xs font-medium text-white/55"><Clock3 className="size-4 text-primary" aria-hidden="true" />Tiempo que libera tu equipo</dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-white">{int.format(hours)} <span className="text-base font-normal text-white/45">horas al mes</span></dd>
          </div>
          <div className="bg-[#0d110e] p-5">
            <dt className="flex items-center gap-2 text-xs font-medium text-white/55"><TrendingUp className="size-4 text-primary" aria-hidden="true" />Ventas que hoy se quedan en el chat</dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-primary">{cop.format(recoveredValue)} <span className="text-base font-normal text-white/45">al mes</span></dd>
            <dd className="mt-1 text-xs text-white/45">≈ {int.format(recoveredOrders)} pedidos · tu cierre pasaría de {pct.format(closeRate)}% a {pct.format(newCloseRate)}%</dd>
          </div>
        </dl>

        <p className="mt-5 text-xs leading-5 text-white/40">
          Estimación con tus datos y los supuestos visibles, no una promesa de resultados. Supone que los chats que hoy se pierden fuera de horario cerrarían a tu tasa actual si se responden a tiempo. En la evaluación lo revisamos con tus números reales.
        </p>

        <Link href={primaryCta.href} className="group mt-6 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-primary px-6 text-sm font-bold text-ink transition hover:bg-[#c8ff5a] lg:mt-auto">
          Revisarlo con mis números <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
