import type { Treatment } from "./_components/types";
import { DemoHeaderIsland } from "./_components/demo-header-island";
import { TreatmentsSectionIsland } from "./_components/treatments-section-island";
import { NitroFooterIsland } from "./_components/nitro-footer-island";

// Client Components loaded directly (they are already islands or interactive leaves)
import { HeroSection } from "./_components/hero-section";
import { BeautyQuiz } from "./_components/beauty-quiz";
import { VideoTestimonialSection } from "./_components/video-testimonial-section";
import { ReviewsSection } from "./_components/reviews-section";
import { MapSection } from "./_components/map-section";

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

        <TreatmentsSectionIsland treatments={treatments} />

        <VideoTestimonialSection />

        <ReviewsSection />

        <MapSection />
      </div>

      {/* --- SMOOTH TRANSITION SEPARATOR --- */}
      <div className="w-full h-40 bg-gradient-to-b from-stone-50 via-neutral-900 to-black pointer-events-none" />

      {/* --- NITRO ECOM SECTION (Footer Area) & BOOKING MODAL --- */}
      <NitroFooterIsland />
      <footer className="py-12 text-center text-zinc-800 text-xs bg-black">
        <p className="opacity-40 tracking-widest">© 2026 NITRO ECOM. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>
    </main>
  );
}
