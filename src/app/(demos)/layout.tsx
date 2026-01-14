import type { Metadata } from "next";
import "../globals.css"; 

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
      <body className="bg-black text-white antialiased selection:bg-teal-500/30">
        
        {/* --- NITRO DEMO CONTROLLER --- */}
        <div className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-[#00ff9d]/20 h-10 flex items-center justify-between px-4 text-[10px] uppercase tracking-widest font-mono">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"></span>
                <span className="text-zinc-400">Nitro Live Demo Environment</span>
            </div>
            <a href="/soluciones/clinicas" className="hover:text-[#00ff9d] transition-colors flex items-center gap-1 group">
                Salir de la Demo <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
        </div>

        {/* Padding top to push content below the controller */}
        <div className="pt-10">
            {children}
        </div>
      </body>
    </html>
  );
}
