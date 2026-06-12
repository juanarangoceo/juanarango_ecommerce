import { NitroCtaButton } from "@/components/nitro-cta-button"

export function NitroBanner() {
  return (
    <section className="relative pt-24 md:pt-48 pb-24 px-6 z-10 overflow-hidden">
      {/* Subtle Glow Effect Background - Reduced intensity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[40px] md:blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">

          <p className="font-dm-mono text-xs md:text-sm uppercase tracking-[0.3em] text-primary mb-6">
            Ecommerce · Automatización · IA aplicada
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8 text-balance">
            <span className="text-white">
              Llevo 15 años construyendo ecommerce en Latinoamérica.
            </span>
            <span className="block text-primary mt-2">Ahora construyo los sistemas que venden por ti.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed text-pretty max-w-[65ch]">
            Soy Juan Arango. Ayudo a empresas de Colombia y Latinoamérica a automatizar su operación y escalar
            sus ventas con arquitectura avanzada e inteligencia artificial. Sin humo: te muestro cómo funciona
            antes de que me contrates.
          </p>

          <NitroCtaButton />
        </div>
      </div>
    </section>
  )
}
