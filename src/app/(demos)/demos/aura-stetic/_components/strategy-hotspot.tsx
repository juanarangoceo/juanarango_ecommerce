"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface StrategyHotspotProps {
  tip: string
  className?: string
}

export function StrategyHotspot({ tip, className = "" }: StrategyHotspotProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-3 w-3 cursor-pointer">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
      </span>

      {/* Glassmorphism tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl backdrop-blur-md bg-black/80 text-white text-sm leading-relaxed shadow-xl"
          >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 backdrop-blur-md bg-black/80" />
            <p className="relative z-10">{tip}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
