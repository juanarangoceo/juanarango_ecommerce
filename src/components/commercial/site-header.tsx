"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NitroMark } from "@/components/commercial/nitro-mark";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { primaryCta, primaryNavigation } from "@/lib/commercial-content";

interface SiteHeaderProps {
  registerUrl: string;
  loginUrl: string;
}

export function SiteHeader({ registerUrl, loginUrl }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#0b0d0b]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="nitro-brand-mark flex size-8 items-center justify-center text-primary">
            <NitroMark className="size-6" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-bold tracking-[0.13em] text-white">JUAN ARANGO</span>
            <span className="mt-1 block font-mono text-[9px] tracking-[0.27em] text-white/45">NITRO ECOM</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegación principal">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-white/68 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <div className="hidden items-center gap-2 xl:flex">
            <a href={loginUrl} className="inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Ingresar
            </a>
            <a href={registerUrl} className="inline-flex min-h-10 items-center rounded-full border border-primary/30 bg-primary/5 px-4 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Crear cuenta
            </a>
          </div>
          <Button asChild className="hidden h-10 rounded-full px-5 font-semibold sm:inline-flex">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/12 text-white xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/8 bg-[#0b0d0b] px-5 py-5 xl:hidden" aria-label="Navegación móvil">
          <div className="mx-auto grid max-w-7xl gap-1">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base text-white/78 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-white/8 pt-4">
              <p className="px-4 text-sm text-white/45">Tu cuenta de Nitro Complete</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href={loginUrl} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-xl border border-white/12 px-3 text-sm font-medium text-white/80 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-primary">
                  Ingresar
                </a>
                <a href={registerUrl} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/5 px-3 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary">
                  Crear cuenta
                </a>
              </div>
            </div>
            <Button asChild className="mt-3 h-12 rounded-xl text-base sm:hidden">
              <Link href={primaryCta.href} onClick={() => setOpen(false)}>{primaryCta.label}</Link>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
