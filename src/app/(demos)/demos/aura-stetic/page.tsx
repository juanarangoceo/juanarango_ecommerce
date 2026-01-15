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
      <nav className="fixed top-0 w-full z-50 bg-neutral-950 text-white border-b border-white/10 shadow-2xl h-14 md:h-16 flex items-center justify-center">
        
           {/* Center Badge */}
           <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-6 py-2 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                 <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                 <span className="text-red-500 text-sm md:text-base font-black tracking-widest uppercase">Nitro Live Demo</span>
           </div>
           
           {/* Exit Link (Absolute Right) */}
           <div className="absolute right-4 md:right-8">
                <Link href="/" className="text-xs font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="hidden md:inline">Salir de la demo</span> 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
           </div>
      </nav>

      {/* --- REAL DEMO NAVBAR (Shifted down) --- */}
      <Navbar onContactClick={openChat} />


      {/* --- PAGE CONTENT (Added padding-top for the fixed headers) --- */}
      <div className="pt-32">
        <HeroSection />

        <BeautyQuiz onBookingClick={scrollToBooking} />

        <TreatmentsGrid treatments={treatments} onServiceClick={openServiceModal} />

        <VideoTestimonialSection />

        <ReviewsSection />

        <MapSection />
      </div>

      {/* --- SEPARATOR --- */}
      <div className="h-24 bg-gradient-to-b from-stone-50 to-black w-full" />

      {/* --- NITRO ECOM SECTION --- */}
      <section ref={nitroSectionRef} className="py-24 bg-black relative overflow-hidden">
        
        {/* Clean background - removed gradients/lines as requested */}
        <div className="container mx-auto px-6 relative z-10">
            
            {/* TECH SPECS */}
            <div className="flex flex-col items-center text-center gap-8 mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase mb-4">
                    <MonitorPlay className="w-3 h-3" /> Nitro Performance
                </div>
                
                <h3 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
                    La velocidad convierte visitantes en pacientes.
                </h3>
                
                <p className="text-zinc-400 max-w-2xl text-lg">
                    Esta demo carga en menos de 0.5 segundos. En la industria estética, la primera impresión es la única que cuenta.
                    ¿Tu sitio actual es así de rápido?
                </p>

                <div className="flex gap-8 justify-center mt-6">
                    <div className="text-center">
                        <span className="block text-4xl font-bold text-white mb-1">100</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest">SEO Score</span>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                    <div className="text-center">
                        <span className="block text-4xl font-bold text-teal-400 mb-1">98</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest">Performance</span>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                    <div className="text-center">
                        <span className="block text-4xl font-bold text-emerald-500 mb-1">0s</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest">Downtime</span>
                    </div>
                </div>
            </div>

            {/* CALL TO ACTION */}
            <div className="max-w-3xl mx-auto text-center border-t border-white/10 pt-20">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
                    ¿Listo para escalar tu negocio?
                </h2>
                <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                    No solo diseñamos webs bonitas. Construimos ecosistemas digitales que llenan tu agenda automáticamente.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link href="/" className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 text-white transition-colors font-medium">
                        Volver al inicio
                    </Link>
                    <button 
                        onClick={() => setIsNitroModalOpen(true)}
                        className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                        Quiero este sistema
                    </button>
                </div>
            </div>

        </div>
      </section>

      <footer className="py-8 text-center text-zinc-800 text-xs bg-black border-t border-zinc-900">
        <p className="opacity-40">© 2026 Nitro Ecom. Todos los derechos reservados.</p>
      </footer>
      
      {showDemoChat && (
        <ChatWidget isOpen={isChatOpen} onOpen={() => setIsChatOpen(true)} onClose={closeChat} />
      )}
      
      <ServiceModal treatment={selectedTreatment} onClose={closeServiceModal} />
      <NitroBookingModal isOpen={isNitroModalOpen} onClose={() => setIsNitroModalOpen(false)} />
      
    </main>
  );
}

