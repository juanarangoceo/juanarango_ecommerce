"use client"

import { ArrowRight, Zap, Sparkles, ShoppingBag, Cpu } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-border">
      {/* Subtle radial glow with project primary color */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,255,157,0.07),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 py-16 md:py-20 lg:py-32 relative z-10 w-full mt-10">
        {/* Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-10 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: "var(--primary)" }} />
          <span className="font-mono text-[11px] md:text-xs text-primary tracking-[0.2em] uppercase">
            Inscripciones Abiertas
          </span>
          <span className="font-mono text-[11px] md:text-xs text-foreground/30">{'///'}</span>
          <span className="font-mono text-[11px] md:text-xs text-foreground/50 tracking-wider uppercase">
            Curso por Juan Arango
          </span>
        </div>

        {/* Main Title */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className="font-heading text-[clamp(3.5rem,11vw,12rem)] leading-[0.85] tracking-tight">
            <span className="text-foreground">NITRO</span>
            <br />
            <span className="text-primary text-glow">DROPSHIPPING</span>
          </h1>
          {/* Visual course descriptor — users instantly know what it is */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1.5">
              <Cpu className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-[10px] md:text-xs text-primary uppercase tracking-widest font-bold">IA Generativa</span>
            </div>
            <div className="flex items-center gap-2 border border-border bg-background px-3 py-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-foreground/50" />
              <span className="font-mono text-[10px] md:text-xs text-foreground/60 uppercase tracking-widest font-bold">Tiendas a $0 / mes</span>
            </div>
            <div className="flex items-center gap-2 border border-border bg-background px-3 py-1.5">
              <Zap className="w-3.5 h-3.5 text-foreground/50" />
              <span className="font-mono text-[10px] md:text-xs text-foreground/60 uppercase tracking-widest font-bold">Deploy en &lt;1h</span>
            </div>
          </div>
        </div>

        {/* Subheadline */}
        <div className="max-w-2xl mb-8 md:mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed font-semibold mb-4 text-pretty">
            Tu primera venta antes de gastar en suscripciones. Garantizado.
            <span className="text-primary"> Sin tocar una línea de código.</span>
          </p>
          <p className="text-foreground/60 text-base md:text-lg leading-relaxed text-pretty">
            Sin mensualidades. Sin comisiones en Shopify. 100% personalizable y escalable.
            Valida productos ganadores con IA sin quemar dinero en plataformas costosas.
          </p>
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-6 mb-12 md:mb-16 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <a
            className="btn-glitch inline-flex items-center gap-3 bg-destructive text-destructive-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider py-4 md:py-5 px-8 md:px-10 hover:bg-destructive/90 transition-colors shadow-[0_0_30px_rgba(255,45,45,0.2)] hover:shadow-[0_0_50px_rgba(255,45,45,0.4)]"
            href="#acceso"
          >
            <Zap className="w-4 h-4" />
            QUIERO MI TIENDA A $0
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-foreground/80 tracking-wider uppercase font-bold">
              Pago único. Acceso de por vida.
            </span>
            <span className="font-mono text-[11px] text-foreground/40 tracking-wider">
              Aprende a construir webs sin costos mensuales.
            </span>
          </div>
        </div>

        {/* Video + Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          {/* Video Vertical — sized to properly show a 9:16 phone-style vertical video */}
          <div className="lg:col-span-2 video-frame-glow w-full bg-secondary/50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary transition-colors cursor-pointer" style={{ aspectRatio: '9/16', maxHeight: '640px' }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.04),transparent)] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,255,157,0.1)]">
               <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Demo de la tienda Nitro</span>
            <span className="font-mono text-[10px] text-primary mt-2 border border-primary/20 px-3 py-1 bg-primary/5">Video próximamente</span>
          </div>

          {/* Stats */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-px bg-border border border-border h-full">
            {[
              { value: "$0", label: "Costo operativo mensual", sub: "Hosting, base de datos y deploy incluidos gratis" },
              { value: "<1s", label: "Velocidad de carga", sub: "Tiendas ultra rápidas que convierten más" },
              { value: "0%", label: "Comisión por venta", sub: "Todo lo que vendes es 100% tuyo" },
              { value: "~3h", label: "Para tu primera tienda", sub: "Tomando café y haciendo pausas con IA" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-background/80 p-5 md:p-6 lg:p-8 flex flex-col justify-between hover:bg-card transition-colors"
              >
                <div>
                  <div className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary leading-none mb-3">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] md:text-[11px] text-foreground/70 uppercase tracking-wider leading-snug mb-2 font-bold">
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
