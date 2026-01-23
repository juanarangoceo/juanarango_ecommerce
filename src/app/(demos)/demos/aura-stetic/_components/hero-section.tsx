import { HeroContent } from "./hero-content"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Static & Prioritized for LCP */}
      {/* Background Video - Optimized for Mobile LCP */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="https://res.cloudinary.com/dphw03goy/video/upload/f_auto,q_auto,w_1920/v1737471465/f712ac23-8370-4cc2-a083-d2d142079040_1_d7qisd.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Mobile Source (Max 768px) - 720p & 3mbps limit */}
        <source
          media="(max-width: 768px)"
          src="https://res.cloudinary.com/dphw03goy/video/upload/f_auto:video,q_auto:best,w_720,br_3m/v1737471465/f712ac23-8370-4cc2-a083-d2d142079040_1_d7qisd.mp4"
          type="video/mp4"
        />
        
        {/* Desktop Source (Min 769px) - 1080p & 5mbps limit */}
        <source
          media="(min-width: 769px)"
          src="https://res.cloudinary.com/dphw03goy/video/upload/f_auto:video,q_auto:best,w_1920,br_5m/v1737471465/f712ac23-8370-4cc2-a083-d2d142079040_1_d7qisd.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />


      <HeroContent />
    </section>
  )
}
