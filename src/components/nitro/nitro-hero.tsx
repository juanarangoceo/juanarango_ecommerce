import Image from "next/image";
import { CheckCheck, PackageCheck } from "lucide-react";
import { NitroLive } from "@/components/nitro/nitro-live";

// Columna derecha del hero de /nitro-complete (NIT-79): Nitro vivo y, debajo,
// lo que queda registrado en el panel. La conversación completa se ve más abajo,
// en «Así se ve en el chat de tu cliente».
const events = [
  { key: "respondio", title: "Nitro respondió a las 10:14 p. m.", detail: "Fuera de horario, con tu catálogo" },
  { key: "pedido", icon: PackageCheck, title: "Pedido #2087 creado", detail: "Datos de entrega completos" },
  { key: "confirmado", icon: CheckCheck, title: "Confirmado por Sara", detail: "Listo para despachar" },
] as const;

export function NitroHero() {
  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
      <div className="pointer-events-none absolute inset-x-0 top-[8%] mx-auto aspect-square w-[80%] rounded-full bg-primary/[0.08] blur-[90px]" aria-hidden="true" />
      <NitroLive />

      <div className="relative mt-4 w-full max-w-[340px] min-[820px]:max-w-none">
        <p className="mb-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-white/60 lg:justify-start">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          En tu panel Nitro
        </p>
        <ol className="grid gap-2.5 min-[820px]:grid-cols-3" aria-label="Lo que registra el panel">
          {events.map((event) => (
            <li key={event.key} className="flex gap-3 rounded-2xl border border-primary/25 bg-[#111611] p-3 text-left">
              {"icon" in event ? (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-ink">
                  <event.icon className="size-3.5" aria-hidden="true" />
                </span>
              ) : (
                <Image src="/nitro/nitro-base-icono-96.png" alt="" width={28} height={28} className="size-7 shrink-0 object-contain" />
              )}
              <span className="min-w-0">
                <span className="block text-[12.5px] font-semibold leading-tight text-white">{event.title}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-white/50">{event.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
