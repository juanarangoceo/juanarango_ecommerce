import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, DM_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SiteHeader } from "@/components/commercial/site-header";
import { IconMotionObserver } from "@/components/commercial/icon-motion-observer";
import { SiteFooter } from "@/components/commercial/site-footer";
import { DynamicChatWidget } from "@/components/dynamic-chat-widget";
import { constructMetadata } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";
import "../globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  ...constructMetadata({
    title: "Juan Arango - Experto en Ecommerce",
    description: "Ayudo a empresas de Colombia y Latinoamérica a vender más con ecommerce avanzado, automatización e IA. Soy Juan Arango: 15 años de experiencia real.",
  }),
  // Los iconos salen de src/app/icon.svg, apple-icon.png y favicon.ico.
};

// Schema Markup: Person (Juan Arango) + Organization (NITRO ECOM) + WebSite
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.juanarangoecommerce.com/#person",
      name: "Juan Arango",
      url: "https://www.juanarangoecommerce.com",
      jobTitle: "Consultor de ecommerce, automatización e IA aplicada",
      description: "15 años construyendo ecommerce en Latinoamérica. Ayudo a empresas de Colombia y LATAM a vender más con ecommerce avanzado, automatización e IA.",
      sameAs: [
        "https://instagram.com/juanarangoecommerce",
        "https://www.tiktok.com/@juanarangoecommerce",
        "https://www.youtube.com/@NitroEcom",
        "https://www.linkedin.com/in/juanarangoecommerce"
      ],
      worksFor: {
        "@id": "https://www.juanarangoecommerce.com/#organization"
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "CO",
        addressLocality: "Pereira"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.juanarangoecommerce.com/#organization",
      name: "NITRO ECOM",
      url: "https://www.juanarangoecommerce.com",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg",
        width: 512,
        height: 512
      },
      description: "La estructura de implementación de Juan Arango: ecommerce, automatización e IA para empresas de Colombia y Latinoamérica.",
      founder: {
        "@id": "https://www.juanarangoecommerce.com/#person"
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "juanarangoecommerce@gmail.com",
        telephone: "+573146681896",
        contactType: "customer service",
        areaServed: "CO",
        availableLanguage: ["es"]
      },
      sameAs: [
        "https://instagram.com/juanarangoecommerce"
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "CO",
        addressLocality: "Pereira"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.juanarangoecommerce.com/#website",
      url: "https://www.juanarangoecommerce.com",
      name: "Juan Arango Ecommerce",
      description: "Ecommerce avanzado, automatización e IA aplicada para empresas de Colombia y Latinoamérica",
      publisher: {
        "@id": "https://www.juanarangoecommerce.com/#organization"
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.juanarangoecommerce.com/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

// Main Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`dark scroll-smooth ${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmMono.variable}`}>
      <head>
        {/* Performance: DNS prefetch for deferred scripts */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Schema Markup: Organization + WebSite - native script for SSR */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        <AuthProvider>
          <SiteHeader />
          <IconMotionObserver />
          <main className="nitro-site-content">{children}</main>
          <SiteFooter />
          <DynamicChatWidget />
        </AuthProvider>
        <GoogleAnalytics gaId="G-J2RT4C9YPR" />
      </body>
    </html>
  );
}
