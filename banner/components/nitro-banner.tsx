"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Zap } from "lucide-react"

export function NitroBanner() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Parallax transforms for different layers
  const textX = useTransform(springX, [-0.5, 0.5], [-30, 30])
  const textY = useTransform(springY, [-0.5, 0.5], [-20, 20])

  const glowX = useTransform(springX, [-0.5, 0.5], [-50, 50])
  const glowY = useTransform(springY, [-0.5, 0.5], [-30, 30])

  const orb1X = useTransform(springX, [-0.5, 0.5], [40, -40])
  const orb1Y = useTransform(springY, [-0.5, 0.5], [30, -30])

  const orb2X = useTransform(springX, [-0.5, 0.5], [-60, 60])
  const orb2Y = useTransform(springY, [-0.5, 0.5], [-40, 40])

  const lineRotate = useTransform(springX, [-0.5, 0.5], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen overflow-hidden bg-background flex items-center justify-center cursor-crosshair"
    >
      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            style={{ rotate: lineRotate }}
            className="absolute left-0 right-0 h-px bg-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="absolute inset-0" style={{ top: `${(i + 1) * 8}%` }} />
          </motion.div>
        ))}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            style={{ rotate: lineRotate }}
            className="absolute top-0 bottom-0 w-px bg-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="absolute inset-0" style={{ left: `${(i + 1) * 8}%` }} />
          </motion.div>
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-full h-full rounded-full bg-primary" />
      </motion.div>

      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 rounded-full blur-3xl opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="w-full h-full rounded-full bg-accent" />
      </motion.div>

      {/* Central glow effect that follows mouse */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-40"
      >
        <div className="w-full h-full rounded-full bg-primary/50" />
      </motion.div>

      {/* Speed lines animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`speed-${i}`}
            className="absolute h-px bg-primary/40"
            style={{
              top: `${15 + i * 10}%`,
              left: "-100%",
              width: "50%",
            }}
            animate={{
              x: ["0%", "400%"],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div style={{ x: textX, y: textY }} className="relative z-10 text-center px-4">
        {/* Logo icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-primary/50 rounded-full" />
            <div className="relative bg-secondary/80 backdrop-blur-sm p-4 rounded-2xl border border-border">
              <Zap className="w-10 h-10 md:w-14 md:h-14 text-primary" fill="currentColor" />
            </div>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-balance">
            <span className="text-primary">NITRO</span>
            <span className="text-foreground ml-2 md:ml-4">ECOM</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-md mx-auto text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Acelera tu negocio con velocidad extrema
        </motion.p>

        {/* Animated underline */}
        <motion.div
          className="mt-8 mx-auto h-1 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 text-muted-foreground text-sm font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {"<speed>"}
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 text-muted-foreground text-sm font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        {"</speed>"}
      </motion.div>
    </div>
  )
}
