"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Terminal } from "lucide-react"
import { LanguageToggle } from "@/components/layout/LanguageToggle"

/** Rayito verde — relleno con cuerpo, para Blog */
function ZapSolidGreen({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

export function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pb-safe">
      <div className="bg-black/70 backdrop-blur-md border-t border-white/10 px-4 py-3 flex justify-around items-center">

        {/* 1. Inicio */}
        <Link
          href="/"
          prefetch={false}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            isActive("/", true) ? "text-primary scale-110" : "text-white/50 hover:text-white/80"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Inicio</span>
        </Link>

        {/* 2. Apps */}
        <Link
          href="/app-tools"
          prefetch={false}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            isActive("/app-tools") ? "text-primary scale-110" : "text-white/50 hover:text-white/80"
          }`}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-medium">Apps</span>
        </Link>

        {/* 3. Prompts */}
        <Link
          href="/blog/prompts"
          prefetch={false}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            isActive("/blog/prompts") ? "text-primary scale-110" : "text-white/50 hover:text-white/80"
          }`}
        >
          <Terminal className="w-6 h-6" />
          <span className="text-[10px] font-medium">Prompts</span>
        </Link>

        {/* 4. Blog — rayito verde con cuerpo */}
        <Link
          href="/blog"
          prefetch={false}
          className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
            isActive("/blog") ? "scale-110" : "hover:opacity-80"
          }`}
          style={{ color: isActive("/blog") ? "#00ff9d" : "rgba(0,255,157,0.6)" }}
        >
          <div className="flex items-center justify-center p-1">
            <ZapSolidGreen className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-medium">Blog</span>
        </Link>

        {/* 5. Language Toggle */}
        <div className="flex flex-col items-center gap-1">
          <LanguageToggle variant="mobile" />
        </div>

      </div>
    </div>
  )
}
