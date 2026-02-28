import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Guía Definitiva de OpenClaw AI | Instalación y Consejos Pro',
  description: 'Descubre qué es OpenClaw AI, cómo instalarlo paso a paso, advertencias de seguridad y consejos avanzados. La guía interactiva más completa en español, optimizada para SEO y SGO.',
  keywords: ['OpenClaw AI', 'Instalar OpenClaw', 'Guía OpenClaw AI', 'Inteligencia Artificial', 'Tutorial OpenClaw', 'SGO', 'SEO'],
  openGraph: {
    title: 'Guía Definitiva de OpenClaw AI',
    description: 'Aprende a dominar OpenClaw AI desde cero. Instalación, riesgos y consejos pro.',
    type: 'website',
    locale: 'es_ES',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="font-sans bg-[#050505] text-gray-200 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
