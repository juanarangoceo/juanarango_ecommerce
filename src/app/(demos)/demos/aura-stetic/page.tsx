import type { Metadata } from "next";
import type { Treatment } from "./_components/types";
import { PageContent } from "./_components/page-content";

// Vercel execution timeout (in seconds)
export const maxDuration = 30;

export const metadata: Metadata = {
  title: "Aura Stetic - Tratamientos Estéticos Profesionales",
  description: "Descubre tratamientos de belleza profesionales: Botox, Hydrafacial, Masajes Terapéuticos. Resultados naturales con tecnología de vanguardia.",
  alternates: {
    canonical: 'https://www.juanarangoecommerce.com/demos/aura-stetic'
  },
  openGraph: {
    title: "Aura Stetic - Tratamientos Estéticos Profesionales",
    description: "Descubre tratamientos de belleza profesionales: Botox, Hydrafacial, Masajes Terapéuticos.",
    url: 'https://www.juanarangoecommerce.com/demos/aura-stetic',
    type: 'website',
    locale: 'es_CO',
  }
};

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
  return <PageContent treatments={treatments} />;
}
