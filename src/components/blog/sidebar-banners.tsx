import Link from "next/link"
import { Crown, Swords, ArrowRight, Star, Zap, Trophy, BookOpen, Sparkles } from "lucide-react"

export function SidebarAppsBanner() {
  return (
    <Link
      href="/app-tools"
      className="group relative block overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-superficie-nitro/80 via-[#0d110e]/90 to-[#0d110e]/80 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full blur-xl" />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/15 border border-primary/20">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
            Ranking 2025
          </span>
          <h3 className="text-sm font-bold text-white leading-tight">
            Top Apps de IA
          </h3>
        </div>
      </div>

      {/* Body */}
      <p className="relative text-xs text-white/58 leading-relaxed mb-3">
        Descubre las herramientas de IA más potentes del mercado. Rating, precios y análisis detallado.
      </p>

      {/* Mini stars row */}
      <div className="relative flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        ))}
        <span className="text-[10px] text-amber-400/80 ml-1 font-medium">+25 Apps Analizadas</span>
      </div>

      {/* CTA */}
      <div className="relative flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary transition-colors">
        <Crown className="w-3.5 h-3.5" />
        Ver Ranking Completo
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export function SidebarComparisonBanner() {
  return (
    <Link
      href="/comparar"
      className="group relative block overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-superficie-nitro/80 via-[#0d110e]/90 to-[#0d110e]/80 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl" />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/15 border border-primary/20">
          <Swords className="w-5 h-5 text-primary" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
            Cara a Cara
          </span>
          <h3 className="text-sm font-bold text-white leading-tight">
            Comparativas de Apps
          </h3>
        </div>
      </div>

      {/* Body */}
      <p className="relative text-xs text-white/58 leading-relaxed mb-3">
        ¿No sabes cuál elegir? Comparaciones lado a lado con veredicto final y tabla comparativa.
      </p>

      {/* VS Badge */}
      <div className="relative flex items-center gap-2 mb-3">
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">A</div>
          <div className="w-5 flex items-center justify-center">
            <Zap className="w-3 h-3 text-amber-400" />
          </div>
          <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">B</div>
        </div>
        <span className="text-[10px] text-white/45 font-medium">Análisis imparcial y detallado</span>
      </div>

      {/* CTA */}
      <div className="relative flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary transition-colors">
        <Swords className="w-3.5 h-3.5" />
        Ver Comparativas
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export function SidebarGuidesBanner() {
  const guides = [
    { label: "Shopify 2024", color: "text-primary" },
    { label: "MCP 2026", color: "text-primary" },
    { label: "Claude Code", color: "text-primary" },
    { label: "OpenClaw AI", color: "text-primary" },
  ]

  return (
    <Link
      href="/guias"
      className="group relative block overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-superficie-nitro/80 via-[#0d110e]/90 to-[#0d110e]/80 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full blur-xl" />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/15 border border-primary/20">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
            Recursos Gratuitos
          </span>
          <h3 className="text-sm font-bold text-white leading-tight">
            Guías Especializadas
          </h3>
        </div>
      </div>

      {/* Body */}
      <p className="relative text-xs text-white/58 leading-relaxed mb-3">
        Domina Shopify, IA y automatización con nuestras guías completas paso a paso.
      </p>

      {/* Guide chips */}
      <div className="relative flex flex-wrap gap-1.5 mb-3">
        {guides.map((g) => (
          <span
            key={g.label}
            className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary"
          >
            <Sparkles className="w-2.5 h-2.5" />
            {g.label}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="relative flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary transition-colors">
        <BookOpen className="w-3.5 h-3.5" />
        Ver Todas las Guías
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

