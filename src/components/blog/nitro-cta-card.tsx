import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { primaryCta } from "@/lib/commercial-content";

// CTA lateral del blog: lleva el tráfico orgánico al producto principal.
const points = ["Responde con tu catálogo real", "Confirma pedidos contraentrega", "Avisa el envío y hace seguimiento"] as const;

export function NitroCtaCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-ground text-ink">
      <div className="p-6 sm:p-7">
        <p className="text-sm font-semibold">Nitro Complete</p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
          ¿Vendes por WhatsApp? <span className="text-nitro-text">Que el chat no se quede en chat.</span>
        </h3>
        <ul className="mt-5 space-y-2.5">
          {points.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm text-ink/70">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary"><Check className="size-3" aria-hidden="true" /></span>
              {point}
            </li>
          ))}
        </ul>
        <Link href="/nitro-complete" className="group mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:bg-ink/85">
          Conocer Nitro Complete <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link href={primaryCta.href} className="mt-3 block text-center text-xs font-medium text-ink/55 underline-offset-4 hover:text-ink hover:underline">
          O comprueba si encaja con tu negocio
        </Link>
      </div>
    </div>
  );
}
