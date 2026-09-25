// Vocabulario del CRM compartido por formularios, panel y segmentos.
// Sin dependencias de servidor: lo importan también componentes cliente.

export const LIFECYCLES = ["suscriptor", "prospecto", "calificado", "cliente", "descartado"] as const;
export type Lifecycle = (typeof LIFECYCLES)[number];

export const LIFECYCLE_LABEL: Record<Lifecycle, string> = {
  suscriptor: "Suscriptor",
  prospecto: "Prospecto",
  calificado: "Calificado",
  cliente: "Cliente",
  descartado: "Descartado",
};

export type NewsletterStatus = "subscribed" | "unsubscribed" | "none";

export const NEWSLETTER_LABEL: Record<NewsletterStatus, string> = {
  subscribed: "Suscrito",
  unsubscribed: "Dado de baja",
  none: "Sin suscripción",
};

export type EventType =
  | "form_submit"
  | "newsletter_subscribe"
  | "newsletter_unsubscribe"
  | "lead_magnet"
  | "booking"
  | "status_change"
  | "note"
  | "email";

/**
 * Cada punto de captura del sitio. `live` indica si el formulario sigue
 * publicado; los que no, solo aparecen por su historial.
 */
export const FORMS = {
  newsletter: { label: "Newsletter", where: "Home, blog, guías y popup", live: true },
  diagnostico: { label: "Diagnóstico", where: "/diagnostico", live: true },
  nitro_complete: { label: "Nitro Complete", where: "/nitrobot/conectar y VSL", live: true },
  agenda: { label: "Agenda Cal.com", where: "Reservas de llamada", live: true },
  resumen_pdf: { label: "Resumen PDF", where: "Artículos del blog", live: true },
  contacto: { label: "Contacto", where: "Páginas locales de NitroCommerce", live: true },
  laboratorio: { label: "Laboratorio", where: "/laboratorio", live: true },
  acceso_anticipado: { label: "Acceso anticipado", where: "Cursos del Laboratorio", live: true },
} as const satisfies Record<string, { label: string; where: string; live: boolean }>;

export type FormKey = keyof typeof FORMS;

export function formLabel(form: string | null | undefined) {
  if (!form) return "Otro";
  return (FORMS as Record<string, { label: string }>)[form]?.label ?? form;
}

export const EVENT_LABEL: Record<EventType, string> = {
  form_submit: "Formulario",
  newsletter_subscribe: "Se suscribió",
  newsletter_unsubscribe: "Se dio de baja",
  lead_magnet: "Descargó recurso",
  booking: "Agendó llamada",
  status_change: "Cambio de etapa",
  note: "Nota",
  email: "Correo",
};

/** Etiqueta reservada para pruebas propias; el panel las oculta por defecto. */
export const INTERNAL_TAG = "interno";
