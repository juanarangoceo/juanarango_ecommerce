import { Check, Clock3, PackageCheck, Truck } from "lucide-react";

// Vista ilustrativa de Nitro Complete. Replica la jerarquía real del panel
// (lo vendido en tinta, lo que espera en naranja, el resto como contexto),
// pero sus cifras son de ejemplo y así se rotula.
const timeline = [
  { icon: Check, label: "Pedido creado", detail: "Morral Nómada 30L · contraentrega", done: true },
  { icon: PackageCheck, label: "Confirmado por el comprador", detail: "Respondió con el botón «Confirmar»", done: true },
  { icon: Truck, label: "Despachado", detail: "Guía compartida por WhatsApp", done: true },
  { icon: Clock3, label: "Entrega", detail: "Preguntaremos si llegó", done: false },
] as const;

export function NitroCompletePreview({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative mx-auto w-full max-w-xl ${className}`} aria-label="Vista ilustrativa del panel de Nitro Complete">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-primary/[0.08] blur-[90px]" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ground text-ink shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between border-b border-line bg-white px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-[11px] font-black text-primary">N</span>
            <span className="text-sm font-semibold">Nitro Complete</span>
          </div>
          <span className="rounded-full bg-alert px-2.5 py-1 text-[11px] font-bold text-ink">2 te esperan</span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-[1.05fr_.95fr] sm:p-5">
          <div className="rounded-2xl bg-ink p-5 text-white">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">Tu asesor vendió hoy</p>
            <p className="mt-2 text-[34px] font-extrabold leading-none tracking-tight text-primary tabular-nums">$1.284.000</p>
            <p className="mt-2 text-xs text-white/55">7 pedidos · 3 fuera de horario</p>
            <div className="mt-5 flex h-10 items-end gap-1.5" aria-hidden="true">
              {[35, 52, 40, 68, 58, 82, 74].map((h, i) => (
                <span key={i} className="flex-1 rounded-sm bg-primary/80" style={{ height: `${h}%`, opacity: 0.35 + i * 0.09 }} />
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="rounded-2xl rounded-tr-md bg-white p-3 text-[13px] leading-snug shadow-sm ring-1 ring-line">
              ¿Tienen el morral Nómada en negro? ¿Cuánto vale con envío a Pereira?
            </div>
            <div className="ml-4 rounded-2xl rounded-tl-md bg-[#E9F9D2] p-3 text-[13px] leading-snug ring-1 ring-[#d5efb0]">
              Sí, está disponible en negro. Con envío a Pereira queda en <b>$189.900</b>. ¿Te lo separo?
            </div>
            <div className="rounded-xl border border-alert/30 bg-alert-soft px-3 py-2 text-[12px] font-medium text-alert-text">
              Un comprador pide cambio de talla · pasa a tu equipo
            </div>
          </div>
        </div>

        <ol className="mx-4 mb-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mx-5 sm:mb-5 sm:grid-cols-4">
          {timeline.map(({ icon: Icon, label, detail, done }) => (
            <li key={label} className="bg-white p-3">
              <span className={`flex size-6 items-center justify-center rounded-full ${done ? "bg-primary text-ink" : "bg-ground text-ink/40 ring-1 ring-line"}`}>
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              <p className="mt-2 text-[12px] font-semibold leading-tight">{label}</p>
              <p className="mt-1 text-[11px] leading-snug text-ink/50">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-center text-[11px] text-white/35">Vista ilustrativa · cifras de ejemplo</figcaption>
    </figure>
  );
}
