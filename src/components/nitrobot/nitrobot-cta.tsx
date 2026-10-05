import { TypingDots } from "./typing-dots"

import { juanWhatsAppHref } from "@/lib/juan-whatsapp";

export function nitrobotWaHref(): string {
  return juanWhatsAppHref({ kind: "hero" });
}

// CTA primario con el gradiente NitroBot. En hover, los tres puntos de "escribiendo...".
export function NitroBotCta({ children = "Consultar por WhatsApp", className = "" }: { children?: React.ReactNode; className?: string }) {
  const href = nitrobotWaHref()
  const isExternal = href.startsWith("https://")
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-bold text-white [background:var(--gradiente-nitrobot)] shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] ${className}`}
    >
      <span className="transition-opacity group-hover:opacity-0">{children}</span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 text-white">
        <TypingDots />
      </span>
    </a>
  )
}
