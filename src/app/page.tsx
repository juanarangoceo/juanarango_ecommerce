import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

// OPTIMIZACIÓN NITRO: Carga dinámica (Lazy Load)
// Esto aísla el código pesado de animaciones (Cliente) del renderizado inicial (Servidor).
const NitroBanner = dynamic(
  () => import("@/components/nitro-banner").then((mod) => mod.NitroBanner),
  {
    ssr: true, // Mantenemos SSR para que el H1 sea legible por Google
    loading: () => (
      // Skeleton de carga para evitar CLS (Saltos de diseño)
      <div className="h-[600px] w-full bg-background/50 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Cargando experiencia Nitro...</div>
      </div>
    ),
  }
)

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
      {/* 1. SHELL: Navbar de Servidor (Carga Instantánea) */}
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* 2. ISLA: Banner Interactivo (Carga Diferida) */}
        <NitroBanner />

        {/* 3. CONTENIDO: Espacio preparado para secciones estáticas (SEO) */}
        {/* Aquí agregaremos las siguientes secciones de servidor en el futuro */}
      </main>

      {/* 4. SHELL: Footer de Servidor */}
      <Footer />
    </div>
  )
}
