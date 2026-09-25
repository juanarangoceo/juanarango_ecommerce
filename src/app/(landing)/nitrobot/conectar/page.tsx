import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole, Sparkles } from "lucide-react";
import { NitroBotForm } from "@/components/nitrobot/nitrobot-form";
import { NitroMark } from "@/components/commercial/nitro-mark";

export const metadata: Metadata = {
  title: "Evaluación de conexión | Nitro Complete",
  description:
    "Comprueba si tu catálogo, volumen y operación están listos para conectar Nitro Complete.",
  robots: { index: false, follow: false },
};

function TrustNotes({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="space-y-4 lg:mt-8">
        {[
          "Resultado inmediato y sin costo",
          "Precios visibles, sin llamada obligatoria",
          "Tus datos llegan al panel privado de Nitro",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-sm text-white/78"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3.5 w-3.5 text-primary" />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-9 flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[.025] p-4">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-white/45" />
        <p className="text-xs leading-relaxed text-white/45">
          No compartimos tus respuestas con terceros ni las usamos para
          campañas sin tu autorización. Solo sirven para esta evaluación y
          el contacto comercial solicitado.
        </p>
      </div>
    </div>
  );
}

export default function NitroBotConnectPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#080a09] text-white">
      <header className="border-b border-white/8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6">
          <Link
            href="/nitro-complete"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sm:hidden">Volver</span>
            <span className="hidden sm:inline">Volver a Nitro Complete</span>
          </Link>
          <span className="flex items-center gap-2.5"><span className="flex size-8 items-center justify-center text-primary"><NitroMark className="size-6" /></span><span className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-white/45">Nitro Ecom · Juan Arango</span></span>
        </div>
      </header>
      <section className="relative overflow-hidden px-5 py-12 sm:px-6 lg:py-20">
        <div className="absolute inset-0 bg-grid-white opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="pointer-events-none absolute left-[8%] top-16 size-72 rounded-full bg-primary/[0.055] blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.68fr_1.32fr] lg:gap-16">
          <aside className="min-w-0 lg:sticky lg:top-12 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/7 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Evaluación Nitro Complete
            </div>
            <h1 className="mt-6 break-words font-display text-4xl font-bold leading-[1.02] tracking-[-.04em] sm:text-6xl">
              Antes de venderte un plan, comprobamos si encaja.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/58">
              La evaluación cruza tu catálogo, demanda, operación y momento de
              implementación. Así evitamos sobredimensionar el plan o
              automatizar un proceso que todavía necesita orden.
            </p>
            <TrustNotes className="hidden lg:block" />
          </aside>
          <div className="relative min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d110e] p-5 shadow-2xl shadow-black/40 sm:p-8 lg:p-10"><span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            <NitroBotForm source="nitrobot_connect" />
          </div>
          {/* En móvil el formulario va primero; las garantías quedan debajo. */}
          <TrustNotes className="lg:hidden" />
        </div>
      </section>
      <footer className="border-t border-white/8 px-5 py-6 text-center text-xs text-white/38">
        <Link
          href="/legal/privacidad"
          target="_blank"
          className="transition hover:text-white/78"
        >
          Política de privacidad
        </Link>
        <span className="mx-2">·</span>© {new Date().getFullYear()} Nitro Ecom
      </footer>
    </main>
  );
}
