import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, DM_Mono } from "next/font/google";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import "../globals.css";

/**
 * Layout de las landings de campaña pagada.
 *
 * A diferencia de (main), aquí no hay navbar, footer, menú móvil ni popup de
 * newsletter: en tráfico pago cada enlace extra es una salida antes de que la
 * persona vea la oferta. Solo el contenido y el pixel de Meta.
 */

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
  icons: {
    icon: "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/favicon_htexox.jpg",
  },
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <div className="nitro-landing-content">{children}</div>
        <MetaPixel />
      </body>
    </html>
  );
}
