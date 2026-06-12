// Los tres puntos de "escribiendo..." — la micro-firma de NitroBot.
// Se usa dentro de ChatMockup y en el hover del CTA primario.
export function TypingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-hidden="true">
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current" />
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current [animation-delay:0.18s]" />
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current [animation-delay:0.36s]" />
    </span>
  )
}
