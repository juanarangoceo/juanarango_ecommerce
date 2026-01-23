
export function HeroContent() {
  return (
    <>
      {/* Content - Static for LCP */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div>
          <h1 className="font-serif font-light tracking-tight text-5xl md:text-7xl text-white mb-6 leading-tight text-balance drop-shadow-xl animate-fade-in-up">
            Revela Tu Belleza Natural
          </h1>

          <p className="font-sans text-zinc-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-light">
            Tecnología Láser Avanzada & Cuidado Holístico
          </p>

          <div className="relative inline-flex items-center gap-3">
            <a
              href="#booking"
              className="bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-900 px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-1 inline-block"
            >
              Inicia Tu Diagnóstico
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-stone-400 rounded-full" />
        </div>
      </div>
    </>
  )
}
