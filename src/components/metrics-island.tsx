"use client";

import { Counter } from "@/components/ui/counter";

interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

interface MetricsIslandProps {
  metrics: Metric[];
}

export function MetricsIsland({ metrics }: MetricsIslandProps) {
  return (
    <section id="resultados" className="py-12 md:py-24 px-6 relative z-10 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary to-emerald-600 mb-3 tracking-tight flex justify-center items-center gap-1">
                {/* Prefix */}
                {metric.prefix && <span>{metric.prefix}</span>}
                
                {/* Animated Number */}
                <Counter value={metric.value} decimals={metric.decimals} />

                {/* Suffix */}
                <span className="text-3xl text-primary/50 ml-1 align-top relative top-[-8px]">
                  {metric.suffix}
                </span>
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
