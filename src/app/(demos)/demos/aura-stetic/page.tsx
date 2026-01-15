"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  MapPin, 
  ArrowRight,
  MonitorPlay
} from "lucide-react";
import Link from "next/link";
import type { Treatment } from "./_components/types";

// Imported Components from DEMO
import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero-section";
import { TreatmentsGrid } from "./_components/treatments-grid";
import { ReviewsSection } from "./_components/reviews-section";
import { VideoTestimonialSection } from "./_components/video-testimonial-section";
import { MapSection } from "./_components/map-section";
import { ChatWidget } from "./_components/chat-widget";
import { ServiceModal } from "./_components/service-modal";
import { BeautyQuiz } from "./_components/beauty-quiz";
import { NitroBookingModal } from "./_components/nitro-booking-modal";

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
  const [showDemoChat, setShowDemoChat] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [isNitroModalOpen, setIsNitroModalOpen] = useState(false);
  
  const nitroSectionRef = useRef<HTMLElement>(null);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const openServiceModal = (treatment: Treatment) => setSelectedTreatment(treatment);
  const closeServiceModal = () => setSelectedTreatment(null);
  
  const scrollToBooking = () => {
    // In this demo page, maybe we scroll to top or just open the services?
    // Let's scroll to treatments for the "Agendar Cita" button within the demo context
    document.getElementById("treatments")?.scrollIntoView({ behavior: "smooth" });
  };

  // Logic to hide chat when reaching Nitro section
  useEffect(() => {
    const handleScroll = () => {
      if (nitroSectionRef.current) {
        const rect = nitroSectionRef.current.getBoundingClientRect();
        // If the top of the Nitro section is near the bottom of the viewport (meaning we are entering it)
        // or if we have scrolled past it.
        // We want to hide the chat as soon as the Nitro section starts becoming visible.
        const triggerPoint = window.innerHeight * 0.8;
        if (rect.top <= triggerPoint) {
            setShowDemoChat(false);
        } else {
            setShowDemoChat(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 overflow-x-hidden font-sans">
      
      {/* --- LIVE DEMO HEADER --- */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950 text-white border-b border-white/10 shadow-2xl h-20 flex items-center justify-between px-6">
           <div className="w-10 md:w-0" /> {/* Spacer to balance flex for absolute centering safety */}

           {/* Center Badge - Absolute Center - GREEN */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-8 py-3 rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                 <span className="text-emerald-500 text-base md:text-lg font-black tracking-[0.2em] uppercase">Nitro Live Demo</span>
           </div>
           
           {/* Exit Link */}
           <div className="flex items-center z-10">
                <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="hidden md:inline">Salir de la demo</span> 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
           </div>
      </nav>

      {/* --- REAL DEMO NAVBAR (Shifted down) --- */}
      <div className="relative z-40">
        <Navbar onContactClick={openChat} />
      </div>


      {/* --- PAGE CONTENT (Added padding-top for the fixed headers) --- */}
      <div className="pt-40"> 
        <HeroSection />

        <BeautyQuiz onBookingClick={scrollToBooking} />

        <TreatmentsGrid treatments={treatments} onServiceClick={openServiceModal} />

        <VideoTestimonialSection />

        <ReviewsSection />

        <MapSection />
      </div>

      {/* --- SMOOTH TRANSITION SEPARATOR --- */}
      <div className="w-full h-40 bg-gradient-to-b from-stone-50 via-neutral-900 to-black pointer-events-none" />

      {/* --- NITRO ECOM SECTION (Footer Area) --- */}
      <section ref={nitroSectionRef} className="py-24 bg-black relative z-10">
        
        <div className="container mx-auto px-6 relative z-10">
            
            {/* TECH SPECS */}
            <div className="flex flex-col items-center text-center gap-8 mb-20">
                {/* Removed Nitro Badge */}
                
                <h3 className="text-4xl md:text-6xl font-black text-white max-w-5xl leading-tight tracking-tight">
                    La velocidad convierte visitantes en pacientes.
                </h3>
                
                <p className="text-zinc-400 max-w-2xl text-xl leading-relaxed">
                    Esta demo carga en menos de 0.5 segundos. En la industria estética, la primera impresión es la única que cuenta.
                    ¿Tu sitio actual es así de rápido?
                </p>

                <div className="flex gap-8 justify-center mt-10">
                    <div className="text-center">
                        <span className="block text-5xl font-black text-white mb-2">100</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">SEO Score</span>
                    </div>
                    <div className="w-px h-16 bg-white/10" />
                    <div className="text-center">
                        <span className="block text-5xl font-black text-teal-400 mb-2">98</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Performance</span>
                    </div>
                    <div className="w-px h-16 bg-white/10" />
                    <div className="text-center">
                        <span className="block text-5xl font-black text-emerald-500 mb-2">0s</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Downtime</span>
                    </div>
                </div>
            </div>

            {/* CALL TO ACTION */}
            <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-24">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-10">
                    ¿Listo para escalar?
                </h2>
                <p className="text-2xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                    No solo diseñamos webs bonitas. Construimos ecosistemas digitales que llenan tu agenda automáticamente.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <Link href="/" className="px-10 py-5 rounded-full border border-white/10 hover:bg-white/5 text-white transition-colors font-medium text-lg">
                        Volver al inicio
                    </Link>
                    <button 
                        onClick={() => setIsNitroModalOpen(true)}
                        className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        Quiero este sistema
                    </button>
                </div>
            </div>

        </div>
      </section>

      <footer className="py-12 text-center text-zinc-800 text-xs bg-black">
        <p className="opacity-40 tracking-widest">© 2026 NITRO ECOM. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>
      
      {showDemoChat && (
        <ChatWidget isOpen={isChatOpen} onOpen={() => setIsChatOpen(true)} onClose={closeChat} />
      )}
      
      <ServiceModal treatment={selectedTreatment} onClose={closeServiceModal} />
      <NitroBookingModal isOpen={isNitroModalOpen} onClose={() => setIsNitroModalOpen(false)} />
      
    </main>
  );
}

