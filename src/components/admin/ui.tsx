import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { AnimatedNumber } from "@/components/admin/animated-number";

// Piezas comunes del panel. Identidad Nitro (docs/diseno-y-narrativa.md):
// lienzo #0B0D0B, superficies #131613, verde #B7FF2A para lo que avanza y
// naranja #FF6A13 solo para lo que espera atención. Sin 'use client'.

export function AdminPage({ title, description, actions, children }: { title: string; description?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-5 md:px-8 md:pb-14 md:pt-9">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
        <div className="min-w-0">
          <h1 className="text-[1.65rem] font-semibold leading-tight tracking-[-0.035em] text-white md:text-[2.1rem]">{title}</h1>
          {description ? <p className="mt-1.5 max-w-2xl text-sm leading-6 text-white/55">{description}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </header>
      {children}
    </div>
  );
}

export function Section({ title, description, actions, children, className = "" }: { title: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`mt-8 md:mt-10 ${className}`}>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-[-0.02em] text-white md:text-lg">{title}</h2>
          {description ? <p className="mt-0.5 text-sm text-white/50">{description}</p> : null}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[1.35rem] border border-white/[0.07] bg-[#131613] ${className}`}>{children}</div>;
}

export function StatTile({
  label,
  value,
  hint,
  change,
  tone = "default",
  icon,
}: {
  label: string;
  value: number;
  hint?: string;
  /** Variación % contra el periodo anterior; `null` = sin base para comparar. */
  change?: number | null;
  tone?: "default" | "green" | "alert";
  icon?: ReactNode;
}) {
  const valueColor = tone === "green" ? "text-[#B7FF2A]" : tone === "alert" ? "text-[#FF8A45]" : "text-white";
  return (
    <Card className="relative overflow-hidden p-4 md:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] font-medium text-white/55">{label}</p>
        {icon ? <span className="text-white/35">{icon}</span> : null}
      </div>
      <p className={`mt-2 text-[1.9rem] font-semibold leading-none tracking-[-0.04em] tabular-nums md:text-[2.25rem] ${valueColor}`}>
        <AnimatedNumber value={value} />
      </p>
      <div className="mt-2 flex min-h-5 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45">
        {change !== undefined ? <ChangeBadge change={change} /> : null}
        {hint ? <span>{hint}</span> : null}
      </div>
    </Card>
  );
}

export function ChangeBadge({ change, inverse = false }: { change: number | null; inverse?: boolean }) {
  if (change === null) return <span className="rounded-full bg-[#B7FF2A]/10 px-1.5 py-0.5 font-medium text-[#B7FF2A]">nuevo</span>;
  if (change === 0)
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-white/[0.06] px-1.5 py-0.5 font-medium text-white/55">
        <Minus className="size-3" aria-hidden /> 0%
      </span>
    );
  const good = inverse ? change < 0 : change > 0;
  const Icon = change > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium tabular-nums ${good ? "bg-[#B7FF2A]/10 text-[#B7FF2A]" : "bg-[#FF6A13]/12 text-[#FF8A45]"}`}>
      <Icon className="size-3" aria-hidden />
      {change > 0 ? "+" : ""}
      {change}%<span className="sr-only"> frente a los 30 días anteriores</span>
    </span>
  );
}

const PILL = {
  green: "border-[#B7FF2A]/25 bg-[#B7FF2A]/10 text-[#CFFF6B]",
  alert: "border-[#FF6A13]/30 bg-[#FF6A13]/12 text-[#FF9A5C]",
  muted: "border-white/10 bg-white/[0.05] text-white/60",
  white: "border-white/15 bg-white/[0.09] text-white/85",
} as const;

export function Pill({ tone = "muted", children }: { tone?: keyof typeof PILL; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium ${PILL[tone]}`}>{children}</span>;
}

export const LIFECYCLE_TONE = {
  suscriptor: "muted",
  prospecto: "alert",
  calificado: "white",
  cliente: "green",
  descartado: "muted",
} as const;

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Card className="flex flex-col items-center px-6 py-12 text-center">
      <p className="font-medium text-white">{title}</p>
      {children ? <div className="mt-1.5 max-w-md text-sm leading-6 text-white/50">{children}</div> : null}
    </Card>
  );
}

export function SetupNotice({ reason }: { reason: string }) {
  return (
    <Card className="border-[#FF6A13]/30 bg-[#FF6A13]/[0.06] p-5 md:p-6">
      <p className="font-semibold text-[#FF9A5C]">El CRM todavía no está listo</p>
      <p className="mt-1.5 text-sm leading-6 text-white/70">{reason}</p>
    </Card>
  );
}
