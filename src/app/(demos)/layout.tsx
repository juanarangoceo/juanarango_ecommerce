import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Aura Stetic | Demo Premium",
  description: "Experiencia digital de alto rendimiento para medicina estética.",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-black text-white antialiased selection:bg-teal-500/30">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
