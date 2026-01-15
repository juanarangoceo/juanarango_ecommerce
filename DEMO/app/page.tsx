"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TreatmentsGrid } from "@/components/treatments-grid"
import { ReviewsSection } from "@/components/reviews-section"
import { VideoTestimonialSection } from "@/components/video-testimonial-section"
import { BookingSection } from "@/components/booking-section"
import { MapSection } from "@/components/map-section"
import { ChatWidget } from "@/components/chat-widget"
import { Footer } from "@/components/footer"
import { ServiceModal } from "@/components/service-modal"
import { BeautyQuiz } from "@/components/beauty-quiz"

export type Treatment = {
  id: string
  name: string
  description: string
  longDescription: string
  price: string
  duration: string
  benefits: string[]
  image: string
}

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

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null)

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)

  const openServiceModal = (treatment: Treatment) => setSelectedTreatment(treatment)
  const closeServiceModal = () => setSelectedTreatment(null)

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar onContactClick={openChat} />
      <HeroSection />
      <BeautyQuiz onBookingClick={scrollToBooking} />
      <TreatmentsGrid treatments={treatments} onServiceClick={openServiceModal} />
      <VideoTestimonialSection />
      <ReviewsSection />
      <BookingSection id="booking" />
      <MapSection />
      <Footer onContactClick={openChat} />
      <ChatWidget isOpen={isChatOpen} onOpen={() => setIsChatOpen(true)} onClose={closeChat} />
      <ServiceModal treatment={selectedTreatment} onClose={closeServiceModal} />
    </main>
  )
}
