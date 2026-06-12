import { TypingDots } from "./typing-dots"

// Mockup del panel de NitroBot: lo que el dueño del negocio ve mientras el bot
// conversa. Construido en CSS puro dentro de un marco de navegador oscuro.
const conversations = [
  { name: "Carolina P.", last: "Reservado hasta las 6:00 pm ✅", state: "bot", time: "ahora" },
  { name: "Andrés M.", last: "¿Me sirve para portátil de 15\"?", state: "typing", time: "1 min" },
  { name: "Clínica · Sara T.", last: "Agendado: sáb 9:00 am", state: "bot", time: "8 min" },
  { name: "Pedro G.", last: "Quiero cotizar 40 unidades", state: "humano", time: "12 min" },
]

export function PanelMockup() {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl shadow-black/50 text-left">
      {/* Barra de navegador */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-zinc-700" />
        <span className="w-3 h-3 rounded-full bg-zinc-700" />
        <span className="w-3 h-3 rounded-full bg-zinc-700" />
        <span className="ml-3 font-dm-mono text-[11px] text-zinc-500 truncate">panel.nitrobot — Conversaciones</span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Métricas del día */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Conversaciones hoy", value: "47" },
            { label: "Ventas cerradas", value: "9" },
            { label: "Tiempo de respuesta", value: "4 seg" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl bg-zinc-950/80 border border-white/5 px-3 py-3">
              <p className="text-xl sm:text-2xl font-bold text-white">{m.value}</p>
              <p className="font-dm-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Lista de conversaciones en vivo */}
        <div className="rounded-xl bg-zinc-950/80 border border-white/5 divide-y divide-white/5">
          {conversations.map((c) => (
            <div key={c.name} className="flex items-center gap-3 px-3.5 py-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[11px] font-bold text-zinc-300 shrink-0">
                {c.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                <p className="text-xs text-zinc-400 truncate font-dm-mono">
                  {c.state === "typing" ? <TypingDots className="text-primary" /> : c.last}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="font-dm-mono text-[10px] text-zinc-500">{c.time}</span>
                {c.state === "humano" ? (
                  <span className="font-dm-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-azul-estructura text-blue-200">
                    Tu equipo
                  </span>
                ) : (
                  <span className="font-dm-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                    NitroBot
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* El botón clave: traspaso bot → humano */}
        <div className="flex items-center justify-between rounded-xl border border-primary/25 bg-primary/5 px-4 py-3">
          <p className="text-xs text-zinc-300">
            Conversación de <span className="font-semibold text-white">Pedro G.</span> lista para tu criterio
          </p>
          <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shrink-0">
            Tomar conversación
          </span>
        </div>
      </div>
    </div>
  )
}
