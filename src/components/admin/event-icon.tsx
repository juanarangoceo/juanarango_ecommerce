import { CalendarCheck, FileDown, FileInput, Mail, MailX, StickyNote, Send, Workflow } from "lucide-react";
import type { EventType } from "@/lib/crm/config";

const ICONS: Record<EventType, typeof Mail> = {
  form_submit: FileInput,
  newsletter_subscribe: Mail,
  newsletter_unsubscribe: MailX,
  lead_magnet: FileDown,
  booking: CalendarCheck,
  status_change: Workflow,
  note: StickyNote,
  email: Send,
};

// Verde = señal de intención; naranja = pérdida (baja); neutro = gestión interna.
export function EventIcon({ type, className = "" }: { type: EventType; className?: string }) {
  const Icon = ICONS[type] ?? FileInput;
  const tone =
    type === "newsletter_unsubscribe"
      ? "bg-[#FF6A13]/12 text-[#FF9A5C]"
      : type === "status_change" || type === "note" || type === "email"
        ? "bg-white/[0.06] text-white/60"
        : "bg-[#B7FF2A]/12 text-[#B7FF2A]";
  return (
    <span className={`grid size-8 shrink-0 place-items-center rounded-full ${tone} ${className}`}>
      <Icon className="size-4" aria-hidden />
    </span>
  );
}
