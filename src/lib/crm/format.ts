// Formatos de fecha del panel (zona horaria de Colombia).

const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
const dateTime = new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Bogota" });
const dateOnly = new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeZone: "America/Bogota" });

export function timeAgo(iso: string | null | undefined, now = Date.now()) {
  if (!iso) return "—";
  const seconds = Math.round((Date.parse(iso) - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return "ahora";
  if (abs < 3600) return rtf.format(Math.round(seconds / 60), "minute");
  if (abs < 86_400) return rtf.format(Math.round(seconds / 3600), "hour");
  if (abs < 86_400 * 30) return rtf.format(Math.round(seconds / 86_400), "day");
  if (abs < 86_400 * 365) return rtf.format(Math.round(seconds / (86_400 * 30)), "month");
  return rtf.format(Math.round(seconds / (86_400 * 365)), "year");
}

export const formatDateTime = (iso: string) => dateTime.format(new Date(iso));
export const formatDate = (iso: string) => dateOnly.format(new Date(iso));

export function displayName(contact: { name: string | null; email: string | null; phone?: string | null }) {
  return contact.name?.trim() || contact.email?.split("@")[0] || contact.phone || "Sin nombre";
}

export function initials(contact: { name: string | null; email: string | null }) {
  const base = contact.name?.trim() || contact.email || "?";
  const parts = base.replace(/@.*/, "").split(/[\s._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
}
