"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Home, TrendingUp, Key, Building2, ArrowRight } from "lucide-react";
import { useState } from "react";

const OPTIONS = [
  { icon: Home, label: "Comprar propiedad", value: "buy" },
  { icon: TrendingUp, label: "Inversión", value: "invest" },
  { icon: Key, label: "Vender mi propiedad", value: "sell" },
  { icon: Building2, label: "Arrendamiento", value: "rent" },
];

export function AdvancedSearchSection() {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <section 
      id="advanced-search" 
      className="py-24"
      style={{ background: 'linear-gradient(to bottom, var(--theme-bg), color-mix(in srgb, var(--theme-primary) 5%, white))' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Content (Contact Info) */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4">
                <span 
                  className="uppercase tracking-[0.2em] text-xs font-bold"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  Contáctanos
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                Cuéntanos qué <span className="italic" style={{ color: 'var(--theme-primary)' }}>estás buscando</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Nuestros asesores especializados te guiarán en cada paso. 
                Completa el formulario y recibirás una propuesta personalizada en menos de 24 horas.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                { icon: Phone, title: "Línea directa", text: "+57 300 123 4567" },
                { icon: Mail, title: "Email", text: "asesores@luxeestates.com" },
                { icon: MapPin, title: "Oficina principal", text: "Calle 10 #34-56, El Poblado, Medellín" },
                { icon: Clock, title: "Horario de atención", text: "Lun - Vie: 8:00 AM - 6:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div 
                    className="p-3 rounded-lg shrink-0"
                    style={{ backgroundColor: 'var(--theme-bg)' }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'var(--theme-accent)' }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 mb-1">{item.title}</h4>
                    <p className="font-semibold text-slate-900">{item.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content (Form) */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b border-white/20 pb-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-white">Tu búsqueda personalizada</h3>
                  <div className="h-1 w-12 mt-2 rounded-full" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                </div>
                <span className="text-white/60 text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
                  Paso {step} de 3
                </span>
              </div>

              {/* Step 1 Content */}
              <div className="bg-white rounded-2xl p-8">
                <h4 className="text-lg font-bold text-slate-900 mb-6">¿Qué te gustaría hacer?</h4>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedOption(option.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 group ${
                        selectedOption === option.value 
                          ? 'border-[var(--theme-accent)] bg-[var(--theme-bg)]' 
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                      style={selectedOption === option.value ? { borderColor: 'var(--theme-accent)' } : {}}
                    >
                      <option.icon 
                        className={`w-5 h-5 transition-colors ${
                          selectedOption === option.value ? '' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                        style={selectedOption === option.value ? { color: 'var(--theme-accent)' } : {}}
                      />
                      <span className={`font-medium ${
                        selectedOption === option.value ? 'text-slate-900' : 'text-slate-600'
                      }`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>

                <Button 
                  disabled={!selectedOption}
                  className="w-full py-6 text-lg font-medium text-white shadow-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                  onClick={() => setStep(step < 3 ? step + 1 : 1)}
                >
                  Continuar
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
