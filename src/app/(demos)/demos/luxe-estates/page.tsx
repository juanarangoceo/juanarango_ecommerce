import type { Metadata } from "next";
import { DemoHeader } from "./_components/demo-header";
import { DemoHero } from "./_components/demo-hero";
import { PropertiesSection } from "./_components/properties-section";
import { FeaturesSection } from "./_components/features-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { ConversionCTA } from "./_components/conversion-cta";
import { DemoPagePopup } from "./_components/demo-popup";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ui/contact-form";

// Theme Configuration (Centralized)
// Theme Configuration (Centralized)
const THEMES: Record<string, { label: string; colors: { primary: string; accent: string; bg: string; text: string } }> = {
  trust: {
    label: "Legacy Blue",
    colors: { primary: "#0f172a", accent: "#3b82f6", bg: "#f8fafc", text: "#1e293b" }
  },
  luxury: {
    label: "Gold Luxury",
    colors: { primary: "#1c1917", accent: "#d4af37", bg: "#fffbf0", text: "#44403c" }
  },
  minimal: {
    label: "Minimalist",
    colors: { primary: "#000000", accent: "#525252", bg: "#ffffff", text: "#171717" }
  }
};

// SEO Protection (No indexing of generated demos)
export async function generateMetadata(props: { 
  searchParams: Promise<{ brand?: string }> 
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const brand = searchParams.brand || "Tu Inmobiliaria";
  
  return {
    title: `Inicio - ${brand}`,
    description: "Sitio web inmobiliario premium generado con tecnología Nitro. Demo interactiva personalizada.",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: 'https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria'
    }
  };
}

// Main Server Component (Maximum Performance)
import { TrustSection } from "./_components/trust-section";
import { AdvancedSearchSection } from "./_components/advanced-search-section";

// ... existing imports

export default async function LuxeEstatesDemoPage(props: {
  searchParams: Promise<{ brand?: string; theme?: string; city?: string }>
}) {
  const searchParams = await props.searchParams;

  // Extract params with safe fallbacks
  const brandName = searchParams.brand || "Tu Inmobiliaria";
  const city = searchParams.city || "Tu Ciudad";
  // Default to minimal or trust, check against THEMES keys
  const requestedTheme = searchParams.theme || "trust";
  const themeKey = THEMES[requestedTheme] ? requestedTheme : "trust";
  const activeTheme = THEMES[themeKey];

  // Inject CSS Variables (Zero Runtime JS for theming)
  const themeStyles = {
    "--theme-primary": activeTheme.colors.primary,
    "--theme-accent": activeTheme.colors.accent,
    "--theme-bg": activeTheme.colors.bg,
    "--theme-text": activeTheme.colors.text,
  } as React.CSSProperties;

  return (
    <main 
      style={themeStyles} 
      className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-sans selection:bg-[var(--theme-accent)] selection:text-white"
    >
      {/* Header Island */}
      <DemoHeader brandName={brandName} />

      {/* Hero Island */}
      <DemoHero brandName={brandName} city={city} />

      {/* Properties Section */}
      <PropertiesSection city={city} />

      {/* Trust & Stats Section (NEW) */}
      <TrustSection />

      {/* Features Section */}
      <FeaturesSection />



// ... inside component

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Advanced Search (Demo Feature) */}
      <AdvancedSearchSection />
      
      {/* Nitro Lead Capture Section (Real Business) */}
      <section id="demo-contact" className="py-24 relative bg-black text-white overflow-hidden">
        {/* Aesthetic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>Oferta Especial Demo</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                ¿Te gusta el diseño de <span className="text-blue-500">{brandName}</span>?
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Esta tecnología puede ser tuya. Obtén una web inmobiliaria de alto rendimiento, optimizada para SEO y con captación automática de leads.
              </p>
              <div className="flex gap-4 mb-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">3x</span>
                  <span className="text-sm text-zinc-500 uppercase">Más Leads</span>
                </div>
                <div className="w-px bg-white/10 mx-4"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">99%</span>
                  <span className="text-sm text-zinc-500 uppercase">Automático</span>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6">Agenda tu Demo Personalizada</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Conversion Popup */}
      <DemoPagePopup brandName={brandName} />
    </main>
  );
}
