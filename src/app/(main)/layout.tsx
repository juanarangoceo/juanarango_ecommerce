import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { DynamicChatWidget } from "@/components/dynamic-chat-widget";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/utils";
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

export const metadata: Metadata = {
  ...constructMetadata({
    title: "Juan Arango - Ingeniería de Escalamiento",
    description: "Acelera tu crecimiento digital con infraestructura de alta velocidad.",
    icons: "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/favicon_htexox.jpg",
  }),
  verification: {
    google: "verification_code_here",
  },
  icons: {
    icon: "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/favicon_htexox.jpg",
    shortcut: "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/favicon_htexox.jpg",
    apple: "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/favicon_htexox.jpg",
  },
};

// Schema Markup: Organization + WebSite
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.juanarangoecommerce.com/#organization",
      name: "Nitro Ecom",
      url: "https://www.juanarangoecommerce.com",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg",
        width: 512,
        height: 512
      },
      description: "Ingeniería de escalamiento acelerado para negocios digitales",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+573146681896",
        contactType: "customer service",
        areaServed: "CO",
        availableLanguage: ["es", "en"]
      },
      sameAs: [
        "https://instagram.com/juanarangoecommerce"
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "CO",
        addressLocality: "Colombia"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.juanarangoecommerce.com/#website",
      url: "https://www.juanarangoecommerce.com",
      name: "Nitro Ecom - Ingeniería de Escalamiento",
      description: "Acelera tu crecimiento digital con infraestructura de alta velocidad",
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
    <html lang="es" className="dark scroll-smooth">
      <head>
        {/* Performance: DNS prefetch for deferred scripts */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        {/* Schema Markup: Organization + WebSite - native script for SSR */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <DynamicChatWidget />
        {/* Google Analytics - lazyOnload to avoid render-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J2RT4C9YPR"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J2RT4C9YPR');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
