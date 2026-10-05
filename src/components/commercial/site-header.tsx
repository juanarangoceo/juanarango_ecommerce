"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { NitroMark } from "@/components/commercial/nitro-mark";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { WhatsAppSalesLink } from "@/components/commercial/whatsapp-sales-link";
import { WhatsAppLogo } from "@/components/commercial/brand-logos";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { primaryNavigation } from "@/lib/commercial-content";

interface SiteHeaderProps {
  loginUrl: string;
}

export function SiteHeader({ loginUrl }: SiteHeaderProps) {
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
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-2 px-5 sm:gap-5 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2 sm:gap-3" onClick={() => setOpen(false)}>
          <span className="nitro-brand-mark flex size-6 sm:size-8 items-center justify-center text-primary">
            <NitroMark className="size-5 sm:size-6" />
          </span>
          <span className="whitespace-nowrap leading-none max-[359px]:hidden">
            <span className="block text-xs font-bold tracking-[0.13em] sm:text-sm text-white">JUAN ARANGO</span>
            <span className="mt-1 block font-mono text-[9px] tracking-[0.27em] text-white/45">NITRO ECOM</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegación principal">
          {primaryNavigation.map((item) =>
            "featured" in item ? (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-white transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <Link key={item.href} href={item.href} className="text-sm text-white/68 transition-colors hover:text-white">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <a href={loginUrl} className="hidden min-h-11 items-center rounded-full px-3 text-sm font-medium text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary xl:inline-flex">
            Ingresar
          </a>
          <WhatsAppJuanButton context={{ kind: "hero" }} placement="header" className="hidden min-h-11 px-5 text-sm sm:inline-flex">Hablar por WhatsApp</WhatsAppJuanButton>
          <WhatsAppSalesLink context={{ kind: "hero" }} placement="header_mobile" aria-label="Consultar Nitro Complete por WhatsApp" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:hidden">
            <WhatsAppLogo className="size-5" mono title="" />
          </WhatsAppSalesLink>
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
            {primaryNavigation.map((item) =>
              "featured" in item ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mb-2 flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/[0.06] px-4 py-3.5 hover:border-primary/45"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-white">{item.label}</span>
                    <span className="block text-sm text-white/55">Vende por WhatsApp con tu catálogo</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-white/78 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-3 border-t border-white/8 pt-4">
              <WhatsAppSalesLink context={{ kind: "hero" }} placement="menu_mobile" onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                <WhatsAppLogo className="size-5" mono title="" />
                Hablar por WhatsApp
              </WhatsAppSalesLink>
              <p className="mt-3 text-center text-xs leading-5 text-white/55">Mi asistente te orienta sobre Nitro Complete.</p>
              <a href={loginUrl} onClick={() => setOpen(false)} className="mt-4 flex min-h-12 items-center justify-center rounded-xl border border-white/12 px-3 text-sm font-medium text-white/80 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-primary">
                Ya soy cliente · Ingresar
              </a>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
