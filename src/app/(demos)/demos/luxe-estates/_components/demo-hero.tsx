"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, Award, ArrowDown, BedDouble, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface DemoHeroProps {
  brandName: string;
  city: string;
}

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(end);
    }
  }, [isInView, end, spring]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
      <span>{prefix}</span>
      <motion.span>{display}</motion.span>
      <span>{suffix}</span>
    </div>
  );
}

import heroLuxuryImg from "../../../../../../public/imagenes-demo/hero-luxury.jpg";

export function DemoHero({ brandName, city }: DemoHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  const suggestions = [
    `Penthouse en ${city}`,
    "Casa moderna con piscina",
    "Apartamento céntrico",
  ];

  const scrollToProperties = () => {
    document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  // Entry animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" as const } 
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image Parallax/Scale Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" as const }}
          className="relative w-full h-full"
        >
          <Image
            src={heroLuxuryImg}
            alt="Propiedad de lujo"
            fill
            className="object-cover"
            priority
            quality={90}
            placeholder="blur"
          />
          {/* Aesthetic Overlay - Using theme primary color but with refined gradients */}
          <div 
            className="absolute inset-0 opacity-70"
            style={{ 
              background: `linear-gradient(to bottom, 
                rgba(0,0,0,0.4) 0%, 
                var(--theme-primary) 100%
              )` 
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <Award className="h-4 w-4" style={{ color: 'var(--theme-accent)' }} />
            <span className="text-sm font-medium text-white/90 tracking-wide">
              #1 en Bienes Raíces en {city}
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          <span className="block">Encuentra tu</span>
          <span className="block relative inline-block mt-2">
            <span className="relative z-10">Lugar Ideal</span>
            <motion.span 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1, ease: "circOut" }}
              className="absolute bottom-2 left-0 h-4 -z-0 opacity-40 mix-blend-overlay"
              style={{ backgroundColor: 'var(--theme-accent)' }}
            ></motion.span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={itemVariants} 
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Propiedades exclusivas seleccionadas por <span className="font-semibold text-white">{brandName}</span>. 
          Acompañamiento personalizado desde la primera visita hasta las llaves en tu mano.
        </motion.p>

        {/* Search Box */}
        <motion.div variants={itemVariants} className="relative max-w-2xl mx-auto z-20">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2 border border-white/50 ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Busca por zona, tipo de propiedad..."
                  className="w-full px-4 py-4 bg-transparent text-slate-900 placeholder:text-slate-500 focus:outline-none text-base sm:text-lg"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="rounded-xl px-6 py-6 font-medium text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">Buscando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Buscar</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {suggestions.map((suggestion, idx) => (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + idx * 0.1 }}
                type="button"
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full text-sm text-white/90 hover:bg-white/20 transition-all border border-white/10"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons - Hidden on mobile if search is prominent to reduce clutter, or kept simple */}
        <motion.div 
          variants={itemVariants} 
          className="hidden sm:flex items-center justify-center gap-4 mt-10"
        >
          <Button
            onClick={scrollToProperties}
            size="lg"
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Ver Propiedades
          </Button>
        </motion.div>

        {/* Animated Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto border-t border-white/10 pt-8"
        >
          <div className="text-center">
            <AnimatedCounter end={500} suffix="+" />
            <div className="text-sm font-light text-white/60 mt-1 uppercase tracking-wider">
              Propiedades
            </div>
          </div>
          <div className="text-center border-x border-white/10">
            <AnimatedCounter end={98} suffix="%" />
            <div className="text-sm font-light text-white/60 mt-1 uppercase tracking-wider">
              Satisfacción
            </div>
          </div>
          <div className="text-center">
            <AnimatedCounter end={15} suffix="+" />
            <div className="text-sm font-light text-white/60 mt-1 uppercase tracking-wider">
              Años Exp.
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Property Card - Only visible on large screens for minimalist look */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden xl:block absolute bottom-12 right-12 max-w-xs bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <p 
              className="text-[10px] font-bold uppercase tracking-widest mb-1 text-white/80"
            >
              Destacada
            </p>
            <p className="font-medium text-white text-lg leading-tight">Penthouse {city.split(' ')[0]}</p>
          </div>
        </div>
        <div className="flex gap-4 text-white/70 text-xs font-medium border-t border-white/10 pt-3 mt-2">
          <span className="flex items-center gap-1"><BedDouble size={14}/> 3</span>
          <span className="flex items-center gap-1"><Bath size={14}/> 2</span>
          <span className="flex items-center gap-1"><Square size={14}/> 180m²</span>
        </div>
      </motion.div>
    </section>
  );
}
