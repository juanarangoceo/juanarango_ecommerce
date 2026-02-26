"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Search, BookOpen } from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Inicio",
      href: "/",
      icon: Home,
      exact: true,
    },
    {
      name: "Blog",
      href: "/blog",
      icon: Search,
      exact: false,
    },
    {
      name: "Apps",
      href: "/app-tools",
      icon: BookOpen,
      exact: false,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pb-safe">
      <div className="bg-black/70 backdrop-blur-md border-t border-white/10 px-6 py-3 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                isActive ? "text-primary scale-110" : "text-white/50 hover:text-white/80"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}

        {/* Telegram Link */}
        <a
          href="https://t.me/juanarangoecommerce"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center transition-all duration-200 hover:brightness-110 active:scale-95 translate-y-[-2px]"
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image 
              src="https://res.cloudinary.com/dohwyszdj/image/upload/v1772079994/Telegram_2019_Logo.svg_xtftjk.png" 
              alt="Telegram Channel" 
              fill
              className="object-contain drop-shadow-lg"
              sizes="48px"
            />
          </div>
        </a>
      </div>
    </div>
  )
}
