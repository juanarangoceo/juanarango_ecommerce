import Link from "next/link"
import { Crown, Swords, ArrowRight, Star, Zap, Trophy } from "lucide-react"

export function SidebarAppsBanner() {
  return (
    <Link
      href="/app-tools"
      className="group relative block overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/80 via-zinc-900/90 to-zinc-900/80 p-5 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl" />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
          <Trophy className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/80">
            Ranking 2025
          </span>
          <h3 className="text-sm font-bold text-white leading-tight">
            Top Apps de IA
          </h3>
        </div>
      </div>

      {/* Body */}
      <p className="relative text-xs text-zinc-400 leading-relaxed mb-3">
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
      <div className="relative flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
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
      className="group relative block overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-950/80 via-zinc-900/90 to-zinc-900/80 p-5 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl" />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/20">
          <Swords className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400/80">
            Cara a Cara
          </span>
          <h3 className="text-sm font-bold text-white leading-tight">
            Comparativas de Apps
          </h3>
        </div>
      </div>

      {/* Body */}
      <p className="relative text-xs text-zinc-400 leading-relaxed mb-3">
        ¿No sabes cuál elegir? Comparaciones lado a lado con veredicto final y tabla comparativa.
      </p>

      {/* VS Badge */}
      <div className="relative flex items-center gap-2 mb-3">
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-emerald-400">A</div>
          <div className="w-5 flex items-center justify-center">
            <Zap className="w-3 h-3 text-amber-400" />
          </div>
          <div className="w-7 h-7 rounded-md bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[10px] font-bold text-blue-400">B</div>
        </div>
        <span className="text-[10px] text-zinc-500 font-medium">Análisis imparcial y detallado</span>
      </div>

      {/* CTA */}
      <div className="relative flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
        <Swords className="w-3.5 h-3.5" />
        Ver Comparativas
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
