import type { Treatment } from "./_components/types";

// Vercel execution timeout (in seconds)
export const maxDuration = 30;

import { DemoHeaderIsland } from "./_components/demo-header-island";
import { TreatmentsSectionIsland } from "./_components/treatments-section-island";


import dynamic from "next/dynamic";

// Client Components loaded dynamically
const HeroSection = dynamic(() => import("./_components/hero-section").then(mod => mod.HeroSection));
const BeautyQuiz = dynamic(() => import("./_components/beauty-quiz").then(mod => mod.BeautyQuiz));
const VideoTestimonialSection = dynamic(() => import("./_components/video-testimonial-section").then(mod => mod.VideoTestimonialSection));
const ReviewsSection = dynamic(() => import("./_components/reviews-section").then(mod => mod.ReviewsSection));
const FaqSection = dynamic(() => import("./_components/faq-section").then(mod => mod.FaqSection));
const MapSection = dynamic(() => import("./_components/map-section").then(mod => mod.MapSection), { ssr: false });
const BookingSimulation = dynamic(() => import("./_components/booking-simulation").then(mod => mod.BookingSimulation));
const SkinAnalysisIsland = dynamic(() => import("./_components/skin-analysis-island").then(mod => mod.SkinAnalysisIsland), { ssr: false });

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
];


export default function AuraSteticPage() {
  return (
    <main className="min-h-screen bg-stone-50 overflow-x-hidden font-sans">
      
      {/* --- LIVE DEMO HEADER & CHAT --- */}
      <DemoHeaderIsland />

      {/* --- PAGE CONTENT (Added padding-top for the fixed headers) --- */}
      <div className="pt-32 md:pt-40"> 
        <HeroSection />

        <BeautyQuiz />

        {/* --- SKIN ANALYSIS SECTION --- */}
        <section className="bg-stone-50 md:py-12">
           <div className="container mx-auto px-4">
              <SkinAnalysisIsland />
           </div>
        </section>

        <TreatmentsSectionIsland treatments={treatments} />

        <VideoTestimonialSection />

        <ReviewsSection />
        
        <FaqSection />

        <BookingSimulation />

        <MapSection />
      </div>


    </main>
  );
}
