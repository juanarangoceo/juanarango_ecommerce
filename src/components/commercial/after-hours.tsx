"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";

// «Tu horario»: el visitante marca cuándo atiende y ve cuántas horas queda su
// WhatsApp sin nadie. Es aritmética con SUS datos (24 − horas abiertas): no
// hay cifras de mercado ni promedios inventados. Naranja = algo espera al
// dueño; lima = lo que cubre el asesor.
const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

function label(hour: number) {
  const h = hour % 24;
  const suffix = h < 12 ? "a. m." : "p. m.";
  return `${h % 12 === 0 ? 12 : h % 12} ${suffix}`;
}

const OTHER_MOMENTS = [
  ["Pide contraentrega", "El comprador confirma con un botón antes del despacho."],
  ["Pregunta dónde va su pedido", "Aviso de despacho, guía y pregunta de entrega, sin que nadie escriba."],
  ["Dice «luego te confirmo»", "Seguimiento y, con su permiso, un segundo intento."],
] as const;

export function AfterHours() {
  const id = useId();
  const [open, setOpen] = useState(8);
  const [close, setClose] = useState(18);
  const [days, setDays] = useState(6);

  const openHours = Math.max(0, close - open);
  const unattendedDay = 24 - openHours;
  const unattendedWeek = 168 - openHours * days;
  const select = "mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-3 text-base font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-nitro-text";

  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
      <div className="rounded-3xl border border-line bg-white p-6 sm:p-9">
        <div className="grid grid-cols-3 items-end gap-3">
          <label htmlFor={`${id}-open`} className="flex flex-col text-sm font-medium text-ink/75">
            Abres
            <select id={`${id}-open`} value={open} onChange={(e) => { const v = Number(e.target.value); setOpen(v); if (v >= close) setClose(v + 1); }} className={select}>
              {HOURS.slice(0, 23).map((hour) => <option key={hour} value={hour}>{label(hour)}</option>)}
            </select>
          </label>
          <label htmlFor={`${id}-close`} className="flex flex-col text-sm font-medium text-ink/75">
            Cierras
            <select id={`${id}-close`} value={close} onChange={(e) => setClose(Number(e.target.value))} className={select}>
              {HOURS.slice(1).concat(24).filter((hour) => hour > open).map((hour) => <option key={hour} value={hour}>{label(hour)}</option>)}
            </select>
          </label>
          <label htmlFor={`${id}-days`} className="flex flex-col text-sm font-medium text-ink/75">
            Días
            <select id={`${id}-days`} value={days} onChange={(e) => setDays(Number(e.target.value))} className={select}>
              {[5, 6, 7].map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        </div>

        <div aria-live="polite" aria-atomic="true" className="mt-9">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-6xl font-semibold tracking-[-0.05em] tabular-nums text-alert-text sm:text-7xl">{unattendedDay} h</span>
            <span className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">al día sin nadie que responda.</span>
          </p>
          <p className="mt-3 text-base leading-7 text-ink/75">
            Son <strong className="font-semibold text-ink">{unattendedWeek} de las 168 horas</strong> de la semana. Quien escribe en ese rato espera a que abras, o le compra a quien le responda primero.
          </p>
        </div>

        {/* El día por horas: abierto en tinta, sin nadie en naranja. */}
        <div className="mt-8" role="img" aria-label={`De ${label(open)} a ${label(close)} atiendes tú. Las otras ${unattendedDay} horas del día no hay quien responda.`}>
          <div className="flex gap-[3px]">
            {HOURS.map((hour) => {
              const attended = hour >= open && hour < close;
              return <span key={hour} className={`h-12 flex-1 rounded-[5px] transition-colors motion-reduce:transition-none ${attended ? "bg-ink" : "bg-alert/85"}`} />;
            })}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11px] text-ink/60">
            <span>12 a. m.</span><span>6 a. m.</span><span>12 p. m.</span><span>6 p. m.</span><span>12 a. m.</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/75">
            <span className="inline-flex items-center gap-2"><span className="size-3 rounded-[3px] bg-ink" />Atiendes tú</span>
            <span className="inline-flex items-center gap-2"><span className="size-3 rounded-[3px] bg-alert/85" />Nadie responde</span>
          </div>
        </div>

        <p className="mt-8 flex gap-3 border-t border-line pt-6 text-base font-medium leading-7 text-ink">
          <span className="mt-1.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary"><Check className="size-3 text-ink" aria-hidden="true" /></span>
          Tu asesor cubre esas {unattendedDay} horas: responde con tu catálogo y deja el pedido creado.
        </p>
      </div>

      <div className="rounded-3xl border border-line bg-white p-6 sm:p-9">
        <h3 className="text-xl font-semibold tracking-tight">Y después del primer mensaje</h3>
        <ul className="mt-2 divide-y divide-line">
          {OTHER_MOMENTS.map(([moment, fix]) => (
            <li key={moment} className="py-5">
              <p className="text-base font-semibold">{moment}</p>
              <p className="mt-1.5 flex gap-2.5 text-sm leading-6 text-ink/75">
                <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary"><Check className="size-3 text-ink" aria-hidden="true" /></span>
                {fix}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
