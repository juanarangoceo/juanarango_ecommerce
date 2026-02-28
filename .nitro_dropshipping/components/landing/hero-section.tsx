"use client"

import { ArrowRight, Zap, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(200,255,0,0.07),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 py-16 md:py-20 lg:py-32 relative z-10 w-full">
        {/* Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-10">
          <div className="w-2 h-2 bg-primary pulse-dot" />
          <span className="font-mono text-[11px] md:text-xs text-primary tracking-[0.2em] uppercase">
            Por Juan Arango
          </span>
          <span className="font-mono text-[11px] md:text-xs text-foreground/30">{'///'}</span>
          <span className="font-mono text-[11px] md:text-xs text-foreground/50 tracking-wider uppercase">
            Experto en Ecommerce
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-[clamp(3.5rem,11vw,12rem)] leading-[0.85] tracking-tight mb-6">
          <span className="text-foreground">NITRO</span>
          <br />
          <span className="text-primary">DROPSHIPPING</span>
        </h1>

        {/* Subheadline */}
        <div className="max-w-2xl mb-8 md:mb-10">
          <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed font-semibold mb-4 text-pretty">
            Construye tu tienda de dropshipping con IA.
            <span className="text-primary"> Sin tocar una linea de codigo.</span>
          </p>
          <p className="text-foreground/60 text-base md:text-lg leading-relaxed text-pretty">
            Sin mensualidades. Sin comisiones. 100% personalizable y escalable.
            Valida productos sin quemar dinero en plataformas costosas.
          </p>
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-6 mb-12 md:mb-16">
          <a
            className="btn-glitch inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider py-4 md:py-5 px-8 md:px-10"
            href="#acceso"
          >
            <Zap className="w-4 h-4" />
            QUIERO EL CURSO
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-foreground/80 tracking-wider uppercase font-bold">
              Pago unico. Acceso de por vida.
            </span>
            <span className="font-mono text-[11px] text-foreground/40 tracking-wider">
              Aprende a construir webs sin costos mensuales.
            </span>
          </div>
        </div>

        {/* Video + Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Video Vertical */}
          <div className="lg:col-span-2 video-frame-glow aspect-[9/16] max-h-[420px] lg:max-h-[480px] bg-nitro-dark flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.04),transparent)] pointer-events-none" />
            <Sparkles className="w-8 h-8 text-primary/40 mb-4" />
            <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-widest">Video introductorio</span>
            <span className="font-mono text-[10px] text-foreground/20 mt-1">Proximamente</span>
          </div>

          {/* Stats */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-px bg-border border border-border h-full">
            {[
              { value: "$0", label: "Costo operativo mensual", sub: "Hosting, base de datos y deploy incluidos gratis" },
              { value: "<1s", label: "Velocidad de carga", sub: "Tiendas ultra rapidas que convierten mas" },
              { value: "0%", label: "Comision por venta", sub: "Todo lo que vendes es 100% tuyo" },
              { value: "~3h", label: "Para tu primera tienda", sub: "Tomando cafe y haciendo pausas" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-background p-5 md:p-6 lg:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary leading-none mb-3">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] md:text-[11px] text-foreground/70 uppercase tracking-wider leading-snug mb-2">
                    {stat.label}
                  </div>
                </div>
                <p className="text-foreground/40 text-[11px] md:text-xs leading-relaxed">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
