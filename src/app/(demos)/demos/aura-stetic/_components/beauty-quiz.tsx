"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Droplets, Sun, Clock, Heart, Shield, Zap, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react"
import Image from "next/image"

type Answer = {
  id: string
  text: string
  icon: React.ReactNode
  value: string
}

type Question = {
  id: number
  title: string
  subtitle: string
  image: string
  answers: Answer[]
}

const questions: Question[] = [
  {
    id: 1,
    title: "¿Cuál es tu principal objetivo de belleza?",
    subtitle: "Selecciona lo que más te gustaría mejorar",
    image: "/elegant-woman-skincare-routine-luxury-spa.jpg",
    answers: [
      { id: "a1", text: "Reducir arrugas y líneas", icon: <Sparkles className="w-5 h-5" />, value: "anti-aging" },
      { id: "a2", text: "Hidratar y luminosidad", icon: <Droplets className="w-5 h-5" />, value: "hydration" },
      { id: "a3", text: "Tratar manchas solares", icon: <Sun className="w-5 h-5" />, value: "pigmentation" },
      { id: "a4", text: "Relajación y bienestar", icon: <Heart className="w-5 h-5" />, value: "wellness" },
    ],
  },
  {
    id: 2,
    title: "¿Cuánto tiempo puedes dedicar a tu tratamiento?",
    subtitle: "Esto nos ayuda a personalizar tu experiencia",
    image: "/luxury-spa-treatment-room-candles-ambient.jpg",
    answers: [
      { id: "b1", text: "30 minutos express", icon: <Zap className="w-5 h-5" />, value: "express" },
      { id: "b2", text: "45-60 minutos ideal", icon: <Clock className="w-5 h-5" />, value: "standard" },
      { id: "b3", text: "90+ minutos de lujo", icon: <Sparkles className="w-5 h-5" />, value: "luxury" },
    ],
  },
  {
    id: 3,
    title: "¿Cómo describirías tu piel?",
    subtitle: "Selecciona la opción que mejor te represente",
    image: "/beautiful-woman-touching-face-skincare-beauty.jpg",
    answers: [
      { id: "c1", text: "Seca o deshidratada", icon: <Droplets className="w-5 h-5" />, value: "dry" },
      { id: "c2", text: "Mixta o grasa", icon: <Sun className="w-5 h-5" />, value: "oily" },
      { id: "c3", text: "Sensible o reactiva", icon: <Shield className="w-5 h-5" />, value: "sensitive" },
      { id: "c4", text: "Normal y equilibrada", icon: <CheckCircle2 className="w-5 h-5" />, value: "normal" },
    ],
  },
]

type TreatmentResult = {
  title: string
  description: string
  treatments: string[]
  savings: string
}

const getResult = (answers: string[]): TreatmentResult => {
  const hasAntiAging = answers.includes("anti-aging")
  const hasHydration = answers.includes("hydration")
  const hasWellness = answers.includes("wellness")
  const isLuxury = answers.includes("luxury")

  if (hasAntiAging && isLuxury) {
    return {
      title: "Plan Premium Anti-Edad",
      description: "Un programa completo de rejuvenecimiento facial diseñado exclusivamente para ti.",
      treatments: ["Botox Preventivo", "Hydrafacial Deluxe", "Masaje Facial Lifting"],
      savings: "Ahorra $150 con este plan",
    }
  }

  if (hasHydration) {
    return {
      title: "Ritual de Luminosidad",
      description: "Tu piel recuperará su brillo natural con esta combinación hidratante.",
      treatments: ["Hydrafacial Signature", "Mascarilla de Oro", "Sérum Personalizado"],
      savings: "Ahorra $80 con este plan",
    }
  }

  if (hasWellness) {
    return {
      title: "Experiencia Bienestar Total",
      description: "Relájate profundamente mientras cuidamos tu belleza interior y exterior.",
      treatments: ["Masaje Terapéutico 90min", "Aromaterapia", "Hydrafacial Express"],
      savings: "Ahorra $120 con este plan",
    }
  }

  return {
    title: "Plan Personalizado Aura",
    description: "Hemos creado un programa único basado en tus respuestas.",
    treatments: ["Consulta Especializada", "Tratamiento a Medida", "Seguimiento Incluido"],
    savings: "Ahorra $100 con este plan",
  }
}

interface BeautyQuizProps {
  onBookingClick?: () => void
}

export function BeautyQuiz({ onBookingClick }: BeautyQuizProps) {
  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick()
    } else {
      document.getElementById("treatments")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [direction, setDirection] = useState(1)

  const totalSteps = questions.length + 1
  const progress = ((currentStep + 1) / totalSteps) * 100
  const isComplete = currentStep >= questions.length

  const handleAnswer = useCallback((value: string) => {
    setAnswers((prev) => [...prev, value])
    setDirection(1)
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
    }, 300)
  }, [])

  const resetQuiz = useCallback(() => {
    setDirection(-1)
    setAnswers([])
    setTimeout(() => {
      setCurrentStep(0)
      setDirection(1)
    }, 300)
  }, [])

  const result = isComplete ? getResult(answers) : null

  const currentImage = isComplete ? "/luxury-spa-results-happy-woman-glowing-skin.jpg" : questions[currentStep]?.image

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <section id="quiz" className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            Descubre tu tratamiento ideal
          </span>
          <h2 className="font-serif font-light tracking-tight text-4xl md:text-5xl text-stone-900 mb-4">
            Quiz de Belleza Personalizado
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Responde 3 preguntas rápidas y descubre el plan perfecto para ti
          </p>
        </div>

        {/* Quiz Container */}
        <div className="relative bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-stone-200 z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-300 to-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image src={currentImage || ""} alt="Beauty Quiz" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/80 via-white/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Step Indicator on Image */}
              <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <span className="text-sm font-medium text-stone-700">
                    {isComplete ? "Resultado" : `Paso ${currentStep + 1} de ${questions.length}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Question/Result Side */}
            <div className="relative p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                {!isComplete ? (
                  <motion.div
                    key={`question-${currentStep}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    {/* Question */}
                    <div>
                      <h3 className="font-serif font-light tracking-tight text-2xl md:text-3xl text-stone-900 mb-2">
                        {questions[currentStep].title}
                      </h3>
                      <p className="text-stone-500">{questions[currentStep].subtitle}</p>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3">
                      {questions[currentStep].answers.map((answer) => (
                        <motion.button
                          key={answer.id}
                          onClick={() => handleAnswer(answer.value)}
                          className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-stone-200 bg-white/50 hover:bg-white hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-0.5"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-100 group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-200 flex items-center justify-center transition-all duration-300">
                            <span className="text-stone-600 group-hover:text-amber-700 transition-colors">
                              {answer.icon}
                            </span>
                          </div>
                          <span className="flex-1 text-left font-medium text-stone-700 group-hover:text-stone-900 transition-colors">
                            {answer.text}
                          </span>
                          <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    {/* Result Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-amber-700">Tu plan personalizado está listo</span>
                    </div>

                    {/* Result Title */}
                    <div>
                      <h3 className="font-serif font-light tracking-tight text-3xl md:text-4xl text-stone-900 mb-3">
                        {result?.title}
                      </h3>
                      <p className="text-stone-600 text-lg">{result?.description}</p>
                    </div>

                    {/* Treatments List */}
                    <div className="bg-stone-50 rounded-2xl p-6 space-y-4">
                      <h4 className="font-medium text-stone-900">Incluye:</h4>
                      <ul className="space-y-3">
                        {result?.treatments.map((treatment, index) => (
                          <motion.li
                            key={treatment}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-stone-700">{treatment}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-stone-200">
                        <span className="text-amber-600 font-semibold">{result?.savings}</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        onClick={handleBookingClick}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-300 to-amber-500 text-stone-900 font-semibold rounded-full shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-0.5 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Reservar Mi Plan</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                      <button
                        onClick={resetQuiz}
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-stone-300 text-stone-600 font-medium rounded-full hover:bg-stone-100 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Repetir Quiz</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
