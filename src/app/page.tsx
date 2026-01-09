import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

// Dynamic import for the heavy interactive banner
// Using ssr: true ensures the H1 is present in the initial HTML for SEO
const NitroBanner = dynamic(() => import("@/components/nitro-banner"), {
  ssr: true,
  loading: () => <div className="min-h-[80vh] w-full bg-background animate-pulse" />,
})

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* ISLA 1: Banner Interactivo */}
        <NitroBanner />
        
        {/* AQUÍ: Deja preparado el espacio para futuras secciones de servidor */}
        <section className="py-20 container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Nuestros Servicios (Server Component)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 pointer-events-none grayscale">
             {/* Placeholder placeholders to visualize layout */}
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-64 border border-border rounded-xl bg-card/50 flex items-center justify-center">
                 <span className="text-muted-foreground">Próximamente</span>
               </div>
             ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
