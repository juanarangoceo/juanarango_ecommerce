import { TypingDots } from "./typing-dots"

// El número de WhatsApp del bot es un dato de Juan: vive en NEXT_PUBLIC_NITROBOT_WA.
// Si la variable no está definida, el CTA cae al formulario de respaldo (#contacto-nitrobot)
// en lugar de inventar un número.
const WA_NUMBER = process.env.NEXT_PUBLIC_NITROBOT_WA
const WA_MESSAGE = "Hola NitroBot, quiero ver cómo funcionas para mi negocio"

export function nitrobotWaHref(): string {
  return WA_NUMBER
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`
    : "#contacto-nitrobot"
}

// CTA primario con el gradiente NitroBot. En hover, los tres puntos de "escribiendo...".
export function NitroBotCta({ children = "Habla con NitroBot ahora", className = "" }: { children?: React.ReactNode; className?: string }) {
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
