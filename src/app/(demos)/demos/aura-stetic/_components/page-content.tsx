"use client";

import dynamic from "next/dynamic";
import { DemoHeaderIsland } from "./demo-header-island";
import { TreatmentsSectionIsland } from "./treatments-section-island";
import type { Treatment } from "./types";

// Client Components loaded dynamically
const HeroSection = dynamic(() => import("./hero-section").then(mod => mod.HeroSection));
const BeautyQuiz = dynamic(() => import("./beauty-quiz").then(mod => mod.BeautyQuiz));
const VideoTestimonialSection = dynamic(() => import("./video-testimonial-section").then(mod => mod.VideoTestimonialSection));
const ReviewsSection = dynamic(() => import("./reviews-section").then(mod => mod.ReviewsSection));
const FaqSection = dynamic(() => import("./faq-section").then(mod => mod.FaqSection));
const MapSection = dynamic(() => import("./map-section").then(mod => mod.MapSection), { ssr: false });
const BookingSimulation = dynamic(() => import("./booking-simulation").then(mod => mod.BookingSimulation));
const SkinAnalysisIsland = dynamic(() => import("./skin-analysis-island").then(mod => mod.SkinAnalysisIsland), { ssr: false });

interface PageContentProps {
    treatments: Treatment[];
}

export function PageContent({ treatments }: PageContentProps) {
  return (
    <main className="min-h-screen bg-stone-50 overflow-x-hidden font-sans">
      
      {/* --- LIVE DEMO HEADER & CHAT --- */}
      <DemoHeaderIsland />

      {/* --- PAGE CONTENT (Added padding-top for the fixed headers) --- */}
      <div className="pt-[120px] md:pt-[136px]"> 
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
