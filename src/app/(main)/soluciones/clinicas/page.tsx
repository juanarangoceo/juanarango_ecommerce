import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BookingSection } from "@/components/booking-section";
import { 
  Activity, 
  CalendarClock, 
  Smartphone, 
  Zap, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nitro Health | Web y Agendamiento para Clínicas",
  description: "Soluciones digitales para centros médicos y estéticos. Webs rápidas y agendamiento automático.",
};

export default function ClinicasPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-teal-500/30">
      <Navbar />

      {/* --- HERO SECTION (Server Side Rendered para SEO) --- */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-black to-black pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/30 border border-teal-800/30 text-teal-400 text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              <span>Especial para Sector Salud y Estética</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
              Transforma Pacientes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                En Citas Confirmadas.
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
              Dejamos atrás las webs lentas. Creamos experiencias digitales de lujo con 
              <strong> agendamiento automatizado 24/7</strong> integrado directamente a tu WhatsApp y Calendario.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/demos/aura-stetic"
                className="bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2"
              >
                Ver Demo Interactiva <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFITS GRID (Islands Architecture: SpotlightCard es Client Component) --- */}
      <section className="py-24 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Isla 1 */}
            <SpotlightCard spotlightColor="rgba(20, 184, 166, 0.1)" className="p-8 bg-zinc-900/20 border-white/5">
              <Zap className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Velocidad Instantánea</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Tus pacientes no esperan. Optimizamos la carga para que tu clínica aparezca en menos de 1 segundo, mejorando tu posición en Google.
              </p>
            </SpotlightCard>

            {/* Isla 2 */}
            <SpotlightCard spotlightColor="rgba(20, 184, 166, 0.1)" className="p-8 bg-zinc-900/20 border-white/5">
              <CalendarClock className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Recepción Virtual</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Sistema inteligente que permite agendar, cancelar y reprogramar citas automáticamente sin intervención humana.
              </p>
            </SpotlightCard>

            {/* Isla 3 */}
            <SpotlightCard spotlightColor="rgba(20, 184, 166, 0.1)" className="p-8 bg-zinc-900/20 border-white/5">
              <Smartphone className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Diseño "Mobile-First"</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                El 90% de las búsquedas de salud son móviles. Diseñamos pensando en el pulgar del usuario para máxima conversión.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- COMPARISON TABLE (Server Component puro - HTML/CSS ligero) --- */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Nitro Health vs. Web Tradicional</h2>
            <div className="space-y-4">
                {[
                    { feature: "Velocidad de Carga", us: "< 1 Segundo", them: "3-5 Segundos" },
                    { feature: "Agendamiento", us: "Automático (Cal.com)", them: "Formulario de Contacto" },
                    { feature: "Tecnología", us: "Next.js 16 (React)", them: "Wordpress / Wix" },
                    { feature: "SEO", us: "Optimizado por IA", them: "Básico" },
                ].map((item, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-zinc-900/30 border border-white/5 items-center">
                        <span className="font-medium text-zinc-300">{item.feature}</span>
                        <span className="text-teal-400 font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {item.us}</span>
                        <span className="text-zinc-600 line-through text-sm">{item.them}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- CTA / BOOKING (Isla de Cliente) --- */}
      <section id="demo" className="py-24 relative">
         <div className="absolute inset-0 bg-teal-900/5 pointer-events-none" />
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Agenda tu Diagnóstico</h2>
                <p className="text-zinc-400">Analicemos la presencia digital de tu clínica gratis.</p>
            </div>
            {/* Reutilizamos tu componente de booking existente */}
            <BookingSection />
         </div>
      </section>

      <Footer />
    </main>
  );
}
