"use client"

import { useEffect, useState, useRef } from "react"

const metrics = [
  {
    value: 50,
    suffix: "+",
    prefix: "",
    label: "Inmobiliarias Transformadas",
    description: "Confiaron en nosotros para crecer",
  },
  {
    value: 3,
    suffix: "x",
    prefix: "",
    label: "Mas Prospectos",
    description: "Aumento promedio de compradores",
  },
  {
    value: 98,
    suffix: "%",
    prefix: "",
    label: "Clientes Satisfechos",
    description: "Nos recomendarian sin dudar",
  },
  {
    value: 4,
    suffix: " sem",
    prefix: "",
    label: "Resultados Rapidos",
    description: "Tiempo promedio a primeros resultados",
  },
]

function AnimatedCounter({
  value,
  suffix,
  prefix,
  duration = 2000,
}: {
  value: number
  suffix: string
  prefix: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (value - startValue) * easeOutQuart

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  const displayValue = value % 1 === 0 ? Math.floor(count) : count.toFixed(1)

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

export function MetricsSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tagline */}
        <p className="text-center text-primary-foreground/70 mb-10 text-sm font-medium uppercase tracking-wider">
          Numeros que hablan por si solos
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-3xl md:text-5xl font-bold text-accent mb-2">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                />
              </div>
              <div className="text-sm md:text-base font-medium text-primary-foreground mb-1">
                {metric.label}
              </div>
              <div className="text-xs md:text-sm text-primary-foreground/60">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
