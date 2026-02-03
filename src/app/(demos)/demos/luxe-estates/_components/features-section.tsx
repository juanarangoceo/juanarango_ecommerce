"use client";

import { Shield, TrendingUp, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Shield,
    title: "Asesoría Legal Completa",
    description: "Acompañamiento jurídico en cada paso del proceso de compra o venta."
  },
  {
    icon: TrendingUp,
    title: "Valoración de Mercado",
    description: "Análisis profesional del valor real de tu propiedad basado en datos actuales."
  },
  {
    icon: Users,
    title: "Agentes Certificados",
    description: "Equipo de expertos con años de experiencia en el sector inmobiliario."
  },
  {
    icon: Sparkles,
    title: "Marketing Premium",
    description: "Fotografía profesional, tours virtuales y campañas digitales para tu propiedad."
  },
];

export function FeaturesSection() {
  return (
    <section id="servicios" className="py-24" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            style={{ color: 'var(--theme-primary)' }}
          >
            Servicios que Marcan la Diferencia
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto font-light"
          >
            Más que una transacción, te ofrecemos una experiencia completa de principio a fin
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white group h-full"
                >
                  <CardContent className="p-8 text-center flex flex-col items-center h-full">
                    <div className="relative w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-10"
                        style={{ backgroundColor: 'var(--theme-accent)' }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Icon 
                          size={32} 
                          style={{ color: 'var(--theme-accent)' }}
                        />
                      </div>
                    </div>
                    
                    <h3 
                      className="font-bold text-xl mb-3"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm font-light">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
