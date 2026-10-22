"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { formatCop, nitroCompleteStarterKit, nitroCompleteUnitPacks, UNITS_PER_CONVERSATION } from "@/lib/commercial-content";
import { estimateRecharge } from "@/lib/recharge-estimate";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";

export function SalesCalculator() {
  const [chats, setChats] = useState(300);
  const [turns, setTurns] = useState(UNITS_PER_CONVERSATION);
  const id = useId();
  const estimate = estimateRecharge(chats, turns, nitroCompleteUnitPacks);
  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-white/12 bg-superficie-nitro lg:grid-cols-2">
      <div className="space-y-8 p-6 sm:p-9">
        <h3 className="text-xl font-semibold text-white">¿Cómo conversa tu negocio?</h3>
        <div>
          <label htmlFor={`${id}-chats`} className="block text-base font-medium text-white">Conversaciones de venta al mes</label>
          <input id={`${id}-chats`} type="number" min={1} max={100000} value={chats} onChange={(e) => setChats(Math.max(1, Math.min(100000, Number(e.target.value) || 1)))} className="mt-3 min-h-13 w-full rounded-xl border border-white/20 bg-background px-4 text-xl tabular-nums text-white outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          <p className="mt-2 text-sm leading-6 text-white/65">Tu estimación de clientes que consultan en un mes.</p>
        </div>
        <div>
          <div className="flex items-center justify-between gap-4"><label htmlFor={`${id}-turns`} className="text-base font-medium text-white">Respuestas del asesor por conversación</label><output htmlFor={`${id}-turns`} className="text-xl font-semibold text-primary">{turns}</output></div>
          <input id={`${id}-turns`} type="range" min={1} max={15} value={turns} onChange={(e) => setTurns(Number(e.target.value))} className="mt-5 w-full accent-[#B7FF2A]" />
          <p className="mt-2 text-sm leading-6 text-white/65">Empezamos con {UNITS_PER_CONVERSATION} como referencia. Si tus ventas necesitan más conversación, sube este valor.</p>
        </div>
      </div>
      <div className="border-t border-white/10 bg-white/[0.035] p-6 sm:p-9 lg:border-l lg:border-t-0" aria-live="polite" aria-atomic="true">
        <p className="text-sm font-medium text-white/75">Tu consumo estimado</p>
        <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums text-white">{estimate.units.toLocaleString("es-CO")} <span className="text-lg font-normal text-white/65">turnos al mes</span></p>
        <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/[0.05] p-5">
          <p className="text-base font-semibold text-white">Una recarga para cubrir esa referencia</p>
          <p className="mt-3 text-xl font-semibold text-primary">{estimate.packCount > 1 ? `${estimate.packCount} × ` : ""}{estimate.pack.units.toLocaleString("es-CO")} turnos · {formatCop(estimate.totalCop)}</p>
          <p className="mt-2 text-sm leading-6 text-white/70">El saldo que no uses queda disponible. Esta es una compra de saldo, no una mensualidad.</p>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/65">Cálculo: {chats.toLocaleString("es-CO")} conversaciones × {turns} respuestas. No incluye plantillas. La activación de {nitroCompleteStarterKit.price} se paga aparte una sola vez e incluye {nitroCompleteStarterKit.units} turnos iniciales; aquí estimamos una recarga posterior.</p>
        <WhatsAppJuanButton context={{ kind: "calculator", chats, turns }} placement="calculator" className="mt-6 w-full sm:w-auto">Revisar mi consumo por WhatsApp</WhatsAppJuanButton>
        <Link href="#empresas" className="mt-4 block w-fit py-2 text-sm font-semibold text-white underline underline-offset-4 hover:text-primary">Mi empresa necesita una revisión de capacidad</Link>
      </div>
    </div>
  );
}
