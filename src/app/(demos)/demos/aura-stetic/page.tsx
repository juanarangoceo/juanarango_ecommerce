"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BookingSection } from "@/components/booking-section";
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function AuraSteticPage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden font-sans">
      
      {/* --- FAKE NAVBAR (Solo para la demo) --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="text-black w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-widest text-white">AURA<span className="text-teal-400">STETIC</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <span className="cursor-pointer hover:text-white transition-colors">Tratamientos</span>
            <span className="cursor-pointer hover:text-white transition-colors">Tecnología</span>
            <span className="cursor-pointer hover:text-white transition-colors">Doctores</span>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-teal-400 hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Agendar Cita
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-black to-black opacity-60" />
        
        <div className="container mx-auto px-6 relative z-10 text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs tracking-widest uppercase mb-6">
              Medicina Estética & Longevidad
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">
              Ciencia y Arte <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-white to-teal-200">
                En Tu Piel
              </span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Descubre la nueva era de tratamientos no invasivos. Resultados naturales potenciados por tecnología láser de última generación.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="#booking" className="w-full md:w-auto bg-teal-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-400 transition-all shadow-[0_0_30px_-5px_rgba(20,184,166,0.6)]">
                Reservar Valoración
              </a>
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                2 cupos disponibles hoy
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Excelencia Médica</h2>
                <p className="text-zinc-500">Procedimientos diseñados para resultados inmediatos.</p>
            </div>
            <ArrowRight className="text-zinc-700 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard spotlightColor="rgba(20,184,166,0.2)" className="group p-8 border border-white/5 bg-black hover:border-teal-500/30 transition-colors">
              <Star className="w-10 h-10 text-teal-500 mb-6" />
              <h3 className="text-2xl font-bold mb-3 text-white">Harmonización</h3>
              <p className="text-zinc-400 mb-6">Rellenos de ácido hialurónico premium y toxina botulínica aplicados por especialistas.</p>
              <span className="text-teal-400 text-sm border-b border-teal-400/30 pb-1">Ver antes y después</span>
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(20,184,166,0.2)" className="group p-8 border border-white/5 bg-black hover:border-teal-500/30 transition-colors">
              <Zap className="w-10 h-10 text-teal-500 mb-6" />
              <h3 className="text-2xl font-bold mb-3 text-white">Láser Fotona</h3>
              <p className="text-zinc-400 mb-6">Tecnología 4D para lifting sin cirugía, acné y rejuvenecimiento profundo.</p>
              <span className="text-teal-400 text-sm border-b border-teal-400/30 pb-1">Conocer tecnología</span>
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(20,184,166,0.2)" className="group p-8 border border-white/5 bg-black hover:border-teal-500/30 transition-colors">
              <ShieldCheck className="w-10 h-10 text-teal-500 mb-6" />
              <h3 className="text-2xl font-bold mb-3 text-white">Implante Capilar</h3>
              <p className="text-zinc-400 mb-6">Técnica FUE Zafiro. Recupera tu imagen con densidad natural y garantía de por vida.</p>
              <span className="text-teal-400 text-sm border-b border-teal-400/30 pb-1">Diagnóstico gratis</span>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- TECH SPECS (SPEED TEST) --- */}
      <section className="py-20 border-y border-white/5 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-900/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold uppercase">
                    <Zap className="w-3 h-3" /> Ultra Performance
                </div>
                <h3 className="text-3xl font-bold">¿Notaste la velocidad?</h3>
                <p className="text-zinc-400">
                    Mientras lees esto, tu competencia sigue cargando. Esta página carga en <strong>0.4 segundos</strong>. 
                    <br />En estética, la velocidad es sinónimo de tecnología y confianza.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                        <span className="block text-2xl font-bold text-white">100/100</span>
                        <span className="text-xs text-zinc-500 uppercase">Google SEO Score</span>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                        <span className="block text-2xl font-bold text-teal-400">0.0s</span>
                        <span className="text-xs text-zinc-500 uppercase">Blocking Time</span>
                    </div>
                </div>
            </div>
            
            {/* --- CALENDAR INTEGRATION (CTA) --- */}
            <div id="booking" className="flex-1 w-full relative z-10">
                <div className="bg-zinc-900/80 backdrop-blur-md p-1 rounded-2xl border border-teal-500/30 shadow-2xl">
                     <div className="bg-black rounded-xl overflow-hidden">
                        <div className="p-6 text-center border-b border-white/10">
                            <h4 className="text-xl font-bold text-white">Agenda tu Cita Online</h4>
                            <p className="text-sm text-zinc-400 mt-1">Sin llamadas. Sin esperas. Confirmación inmediata.</p>
                        </div>
                        {/* Aquí usamos tu componente real */}
                        <BookingSection />
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- THE SALES PITCH (Rompiendo la cuarta pared) --- */}
      <section className="py-16 bg-gradient-to-b from-black to-zinc-900 text-center">
        <div className="container mx-auto px-6">
            <p className="text-zinc-500 text-sm uppercase tracking-widest mb-4">Fin de la demostración</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-6">¿Quieres una web así para tu negocio?</h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Esta tecnología está lista para implementarse en tu clínica. Aumenta tus pacientes y automatiza tu agenda.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm">
                    Volver al inicio
                </Link>
                <a href="https://wa.me/tu-numero" className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors text-sm flex items-center gap-2">
                    Quiero este sistema
                </a>
            </div>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-700 text-xs border-t border-white/5">
        <div className="flex items-center justify-center gap-2 opacity-50 mb-2">
            <MapPin className="w-3 h-3" />
            <span>Zona Rosa, Bogotá - Edificio Medical Center</span>
        </div>
        © 2026 Aura Stetic Demo. Powered by Nitro.
      </footer>
    </main>
  );
}
