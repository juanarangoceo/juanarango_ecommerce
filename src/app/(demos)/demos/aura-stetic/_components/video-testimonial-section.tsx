"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Star, Quote } from "lucide-react"

const videoTestimonials = [
  {
    id: 1,
    name: "María García",
    treatment: "Hydrafacial",
    thumbnail: "/elegant-woman-spa-testimonial.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    quote: "Mi piel nunca se había sentido tan hidratada y luminosa",
    rating: 5,
  },
  {
    id: 2,
    name: "Carolina López",
    treatment: "Botox",
    thumbnail: "/professional-woman-beauty-testimonial.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    quote: "Resultados naturales, exactamente lo que buscaba",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Martínez",
    treatment: "Masaje Terapéutico",
    thumbnail: "/relaxed-woman-wellness-testimonial.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    quote: "Una experiencia de relajación incomparable",
    rating: 5,
  },
]

export function VideoTestimonialSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayVideo = (id: number) => {
    setActiveVideo(id)
    setIsPlaying(true)
  }

  const handleCloseVideo = () => {
    setActiveVideo(null)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const activeTestimonial = videoTestimonials.find((t) => t.id === activeVideo)

  return (
    <section className="py-24 px-6 bg-stone-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase mb-4 block font-sans">
            Testimonios en Video
          </span>
          <h2 className="font-serif font-light tracking-tight text-4xl md:text-5xl text-white mb-4">
            Historias Reales de Transformación
          </h2>
          <p className="font-sans text-stone-400 max-w-xl mx-auto">
            Escucha directamente de nuestras clientas sobre su experiencia en Aura Stetic
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {videoTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group cursor-pointer hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              onClick={() => handlePlayVideo(testimonial.id)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 ring-1 ring-inset ring-white/20 shadow-lg hover:shadow-xl hover:shadow-amber-500/20 transition-shadow">
                <img
                  src={testimonial.thumbnail || "/placeholder.svg"}
                  alt={`Testimonial de ${testimonial.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

                {/* Play Button - glassmorphism */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-amber-500 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-6 h-6 text-white fill-white ml-1 group-hover:text-stone-900 group-hover:fill-stone-900" />
                  </motion.div>
                </div>

                {/* Quote overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Quote className="w-6 h-6 text-amber-400 mb-2" />
                  <p className="text-white text-sm italic line-clamp-2 font-sans">"{testimonial.quote}"</p>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium font-sans">{testimonial.name}</h3>
                  <p className="text-amber-400 text-sm">{testimonial.treatment}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Quote - glassmorphism */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20">
            <div className="flex -space-x-3">
              {videoTestimonials.map((t) => (
                <img
                  key={t.id}
                  src={t.thumbnail || "/placeholder.svg"}
                  alt={t.name}
                  className="w-10 h-10 rounded-full border-2 border-stone-900 object-cover ring-1 ring-inset ring-white/20"
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-medium font-sans">+500 clientas satisfechas</p>
              <p className="text-stone-400 text-sm">Comparten su experiencia</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {activeVideo && activeTestimonial && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseVideo}
        >
          <motion.div
            className="relative w-full max-w-4xl aspect-video bg-stone-900 rounded-2xl overflow-hidden ring-1 ring-inset ring-white/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={activeTestimonial.videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            />

            {/* Video Controls - glassmorphism */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-serif font-light tracking-tight text-xl">{activeTestimonial.name}</h3>
                  <p className="text-amber-400 text-sm">{activeTestimonial.treatment}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button - glassmorphism */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
            >
              <span className="text-white text-xl">&times;</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
