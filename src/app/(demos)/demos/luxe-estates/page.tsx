import type { Metadata } from "next";
import { DemoHeader } from "./_components/demo-header";
import { DemoHero } from "./_components/demo-hero";
import { PropertiesSection } from "./_components/properties-section";
import { FeaturesSection } from "./_components/features-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { ConversionCTA } from "./_components/conversion-cta";
import { Footer } from "@/components/layout/Footer";

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
  urban: {
    label: "Urban Nature",
    colors: { primary: "#14532d", accent: "#ea580c", bg: "#f0fdf4", text: "#14532d" }
  }
};

// SEO Protection (No indexing of generated demos)
export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { brand?: string } 
}): Promise<Metadata> {
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
export default function LuxeEstatesDemoPage({
  searchParams,
}: {
  searchParams: { brand?: string; theme?: string; city?: string }
}) {
  // Extract params with safe fallbacks
  const brandName = searchParams.brand || "Tu Inmobiliaria";
  const city = searchParams.city || "Tu Ciudad";
  const themeKey = searchParams.theme && THEMES[searchParams.theme] ? searchParams.theme : "trust";
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

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Conversion CTA (The Money Shot) */}
      <ConversionCTA brandName={brandName} />

      {/* Nitro Footer */}
      <Footer />
    </main>
  );
}
