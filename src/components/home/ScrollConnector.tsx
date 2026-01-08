"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

interface ScrollConnectorProps {
  onConnect: () => void
}

export function ScrollConnector({ onConnect }: ScrollConnectorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress within this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the progress
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Trigger callback when connection is made (95%)
  useEffect(() => {
    return pathLength.on("change", (latest) => {
      if (latest >= 0.95) {
        onConnect()
      }
    })
  }, [pathLength, onConnect])

  return (
    <div ref={containerRef} className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#22c55e" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="90%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track (dim) */}
        <motion.path
          d="M 50% 0 L 50% 100%"
          stroke="#22c55e"
          strokeWidth="2"
          strokeOpacity="0.1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* Animated Connector */}
        <motion.path
          d="M 50% 0 L 50% 100%"
          stroke="url(#neonGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{ pathLength }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
