"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  MapPin, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { BookingSection } from "@/components/booking-section";
import type { Treatment } from "./_components/types";

// Imported Components from DEMO
import { HeroSection } from "./_components/hero-section";
import { TreatmentsGrid } from "./_components/treatments-grid";
import { ReviewsSection } from "./_components/reviews-section";
import { VideoTestimonialSection } from "./_components/video-testimonial-section";
import { MapSection } from "./_components/map-section";
import { ChatWidget } from "./_components/chat-widget";
import { ServiceModal } from "./_components/service-modal";
import { BeautyQuiz } from "./_components/beauty-quiz";

export const treatments: Treatment[] = [
  {
    id: "botox",
    name: "Botox",
    description: "Relajación precisa de arrugas",
    longDescription:
      "Nuestro tratamiento de Botox utiliza la toxina botulínica de grado médico más pura para suavizar las líneas de expresión y prevenir nuevas arrugas. Aplicado por especialistas certificados con técnicas de micro-inyección para resultados naturales.",
    price: "Desde $299",
    duration: "30 minutos",
    benefits: ["Reduce arrugas visiblemente", "Resultados en 3-7 días", "Dura 3-4 meses", "Sin tiempo de recuperación"],
    image: "/luxury-botox-treatment-aesthetic-clinic.jpg",
  },
  {
    id: "hydrafacial",
    name: "Hydrafacial",
    description: "Limpieza profunda e hidratación",
    longDescription:
      "El Hydrafacial es un tratamiento revolucionario que combina limpieza, exfoliación, extracción e hidratación intensiva. Utilizamos tecnología patentada de vórtice para limpiar y nutrir tu piel en profundidad.",
    price: "Desde $199",
    duration: "45 minutos",
    benefits: [
      "Limpieza profunda de poros",
      "Hidratación instantánea",
      "Piel luminosa al instante",
      "Apto para todo tipo de piel",
    ],
    image: "/skin-hydrafacial.png",
  },
  {
    id: "masaje",
    name: "Masaje Terapéutico",
    description: "Bienestar corporal integral",
    longDescription:
      "Nuestros masajes terapéuticos combinan técnicas ancestrales con métodos modernos para aliviar tensiones, mejorar la circulación y promover un estado de relajación profunda. Personalizamos cada sesión según tus necesidades.",
    price: "Desde $149",
    duration: "60 minutos",
    benefits: ["Alivia tensión muscular", "Mejora circulación", "Reduce estrés", "Promueve el sueño reparador"],
    image: "/luxury-massage-spa-relaxation.jpg",
  },
]

export default function AuraSteticPage() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const openServiceModal = (treatment: Treatment) => setSelectedTreatment(treatment);
  const closeServiceModal = () => setSelectedTreatment(null);
  
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-stone-50 overflow-x-hidden font-sans">
      
      {/* --- FAKE NAVBAR (Solo para la demo) --- */}
      <nav className="fixed top-10 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
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
          <button 
            onClick={scrollToBooking}
            className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-teal-400 hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Agendar Cita
          </button>
        </div>
      </nav>

      {/* --- NEW HERO SECTION --- */}
      <HeroSection />

      {/* --- BEAUTY QUIZ --- */}
      <BeautyQuiz onBookingClick={scrollToBooking} />

      {/* --- SERVICES GRID --- */}
      <TreatmentsGrid treatments={treatments} onServiceClick={openServiceModal} />

      {/* --- VIDEO TESTIMONIALS --- */}
      <VideoTestimonialSection />

      {/* --- REVIEWS --- */}
      <ReviewsSection />

      {/* --- MAP --- */}
      <MapSection />

      {/* --- TECH SPECS & BOOKING (Original Footer Area) --- */}
      <section className="py-20 border-y border-white/5 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-900/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold uppercase">
                    <Zap className="w-3 h-3" /> Ultra Performance
                </div>
                <h3 className="text-3xl font-bold text-white">¿Notaste la velocidad?</h3>
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
                        {/* Booking Component */}
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
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white">¿Quieres una web así para tu negocio?</h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Esta tecnología está lista para implementarse en tu clínica. Aumenta tus pacientes y automatiza tu agenda.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm text-white">
                    Volver al inicio
                </Link>
                <a href="https://wa.me/tu-numero" className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors text-sm flex items-center gap-2">
                    Quiero este sistema
                </a>
            </div>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-700 text-xs border-t border-white/5 bg-black">
        <div className="flex items-center justify-center gap-2 opacity-50 mb-2">
            <MapPin className="w-3 h-3" />
            <span>Zona Rosa, Bogotá - Edificio Medical Center</span>
        </div>
        © 2026 Aura Stetic Demo. Powered by Nitro.
      </footer>
      
      <ChatWidget isOpen={isChatOpen} onOpen={() => setIsChatOpen(true)} onClose={closeChat} />
      <ServiceModal treatment={selectedTreatment} onClose={closeServiceModal} />
      
    </main>
  );
}

