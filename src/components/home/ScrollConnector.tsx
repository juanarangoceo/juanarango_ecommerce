"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

interface ScrollConnectorProps {
  onScrollChange: (progress: number) => void
}

export function ScrollConnector({ onScrollChange }: ScrollConnectorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress within this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth physics for the visual line (prevents "robotic" feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  })

  // Visual height based on smooth physics
  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  // Report raw progress to parent logic
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      onScrollChange(latest)
    })
  }, [scrollYProgress, onScrollChange])

  return (
    <div ref={containerRef} className="absolute top-0 bottom-0 pointer-events-none overflow-hidden left-8 md:left-24">
      {/* Background Track */}
      <div className="h-full w-[2px] bg-green-500/20" />

      {/* Animated Energy Line */}
      <motion.div
        style={{ 
          height,
          boxShadow: "0 0 15px #22c55e, 0 0 30px #22c55e"
        }}
        className="absolute top-0 w-[3px] bg-gradient-to-b from-green-500 via-green-400 to-green-500"
      >
        {/* Pulsing Head/End of line (High Voltage Spark) */}
         <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-white rounded-full blur-[4px]"
            style={{ boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.8), 0 0 40px 10px rgba(34, 197, 94, 0.6)" }}
            animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.3, 1] }}
            transition={{ duration: 0.1, repeat: Infinity }}
         />
      </motion.div>
    </div>
  )
}
