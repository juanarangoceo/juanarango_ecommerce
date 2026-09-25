"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Download, ExternalLink, LayoutDashboard, LogOut, Mail, MessagesSquare, PenSquare, Rocket, Users, FileInput } from "lucide-react";
import { NitroMark } from "@/components/commercial/nitro-mark";
import { InstallAppButton } from "@/components/admin/install-app";

const LINKS = [
  { href: "/admin", label: "Resumen", short: "Resumen", icon: LayoutDashboard, exact: true },
  { href: "/admin/contactos", label: "Contactos", short: "Contactos", icon: Users },
  { href: "/admin/newsletter", label: "Newsletter", short: "Newsletter", icon: Mail },
  { href: "/admin/formularios", label: "Formularios", short: "Formularios", icon: FileInput },
  { href: "/admin/crecimiento", label: "Crecimiento", short: "Crecer", icon: Rocket },
] as const;

// Navegación: barra lateral en escritorio; en móvil, cabecera compacta y barra
// de pestañas inferior al alcance del pulgar (como una app nativa).
export function AdminNav({ nitroBotLeadsUrl }: { nitroBotLeadsUrl: string | null }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));
  const external = [
    { href: "/studio", label: "Studio (contenido)", icon: PenSquare },
    ...(nitroBotLeadsUrl ? [{ href: nitroBotLeadsUrl, label: "Leads en Nitro Bot", icon: MessagesSquare }] : []),
    { href: "/", label: "Ver el sitio", icon: ExternalLink },
  ];

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  };

  const item = (active: boolean) =>
    `flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-[#B7FF2A] text-[#111311]" : "text-white/60 hover:bg-white/[0.05] hover:text-white"
    }`;

  return (
    <>
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-white/[0.07] bg-[#0E100E] px-3 py-5 md:flex">
        <Link href="/admin" className="mb-6 flex items-center gap-2 px-3">
          <NitroMark className="h-7 w-auto text-[#B7FF2A]" />
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[-0.02em] text-white">Nitro Admin</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">juanarangoecommerce</span>
          </span>
        </Link>
        <nav className="flex flex-col gap-1" aria-label="Panel">
          {LINKS.map(({ href, label, icon: Icon, ...rest }) => (
            <Link key={href} href={href} className={item(isActive(href, "exact" in rest))}>
              <Icon className="size-4" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-1 border-t border-white/[0.07] pt-4">
          {external.map(({ href, label, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={item(false)}>
              <Icon className="size-4" aria-hidden />
              {label}
            </a>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <InstallAppButton className={item(false)}>
            <Download className="size-4" aria-hidden />
            Instalar app
          </InstallAppButton>
          <button type="button" onClick={logout} className={item(false)}>
            <LogOut className="size-4" aria-hidden />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#0B0D0B]/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <NitroMark className="h-6 w-auto text-[#B7FF2A]" />
            <span className="text-[15px] font-semibold tracking-[-0.02em]">Nitro Admin</span>
          </Link>
          <div className="flex items-center gap-1">
            <InstallAppButton className="flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/80">
              <Download className="size-3.5" aria-hidden />
              Instalar
            </InstallAppButton>
            <a href="/studio" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full text-white/55" aria-label="Abrir Studio">
              <PenSquare className="size-[18px]" />
            </a>
            <button type="button" onClick={logout} className="grid size-10 place-items-center rounded-full text-white/55" aria-label="Cerrar sesión">
              <LogOut className="size-[18px]" />
            </button>
          </div>
        </div>
      </header>

      <nav
        aria-label="Panel"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#0E100E]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      >
        <div className="grid grid-cols-5">
          {LINKS.map(({ href, short, icon: Icon, ...rest }) => {
            const active = isActive(href, "exact" in rest);
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-1 py-2.5 text-[10.5px] font-medium" aria-current={active ? "page" : undefined}>
                <span className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${active ? "bg-[#B7FF2A] text-[#111311]" : "text-white/50"}`}>
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className={active ? "text-white" : "text-white/50"}>{short}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
