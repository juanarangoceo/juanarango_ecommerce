import { Shield, TrendingUp, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--theme-primary)' }}
          >
            Servicios que Marcan la Diferencia
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Más que una transacción, te ofrecemos una experiencia completa de principio a fin
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group"
              >
                <CardContent className="p-8 text-center">
                  <div 
                    className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: 'var(--theme-accent)', opacity: 0.1 }}
                  >
                    <Icon 
                      size={32} 
                      style={{ color: 'var(--theme-accent)' }}
                    />
                  </div>
                  <h3 
                    className="font-bold text-xl mb-3"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
