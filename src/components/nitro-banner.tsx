import { NitroCtaButton } from "@/components/nitro-cta-button"

export function NitroBanner() {
  return (
    <section className="relative pt-24 md:pt-48 pb-24 px-6 z-10 overflow-hidden">
      {/* Subtle Glow Effect Background - Reduced intensity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[40px] md:blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8 text-balance">
            <span className="text-white">
              Ingeniería de escalamiento
            </span>
            <span className="block text-emerald-400 mt-2">acelerado.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed text-pretty max-w-[65ch]">
            No solo creamos webs. Diseñamos la estrategia, automatizaciones e infraestructura necesarias para eliminar tus cuellos de botella y acelerar tu crecimiento.
          </p>

          <NitroCtaButton />
        </div>
      </div>
    </section>
  )
}
