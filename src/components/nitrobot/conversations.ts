import type { ChatMessage } from "./chat-mockup"

// ============================================================================
// CONVERSACIONES DE EJEMPLO DE NITROBOT
// Productos, precios y nombres FICTICIOS pero verosímiles para Colombia.
// TODO REVISIÓN JUAN: validar tono, productos y respuestas antes de publicar.
// Estas conversaciones son el copy más importante de la landing — se escriben
// con el cuidado de un carrusel (tono natural colombiano, respuestas cortas).
// ============================================================================

// S1 · Hero — la conversación de venta que se escribe sola en bucle
export const heroConversation: ChatMessage[] = [
  { from: "cliente", text: "Hola! ¿Tienen el morral Nómada 30L disponible?" },
  { from: "bot", text: "¡Hola! Sí 👋 El Nómada 30L está disponible en negro y verde oliva. Está en $189.900 con envío gratis a todo el país 📦" },
  { from: "cliente", text: "¿Me sirve para un portátil de 15 pulgadas?" },
  { from: "bot", text: "Sí — trae bolsillo acolchado hasta 15.6\". ¿Te lo envío en negro o en verde?" },
  { from: "cliente", text: "Negro. ¿Cómo pago?" },
  { from: "bot", text: "Te acabo de enviar el link de pago seguro 🔗 Apenas se confirme, te comparto la guía del envío." },
]

// S3 · Cómo funciona — mini-fragmentos por paso (no íconos genéricos)
export const stepFragments: { step: string; title: string; desc: string; chat: ChatMessage[] }[] = [
  {
    step: "01",
    title: "Conectamos",
    desc: "Enlazamos NitroBot con tu WhatsApp y tu tienda. Sin cambiar tu número, sin tocar tu operación.",
    chat: [
      { from: "cliente", text: "¿Tengo que cambiar mi número?" },
      { from: "bot", text: "Sigues con tu número de siempre: me conecto a tu WhatsApp actual y a la tienda que ya tienes." },
    ],
  },
  {
    step: "02",
    title: "Entrenamos",
    desc: "NitroBot aprende tu catálogo, tus precios, tus políticas y tu tono. Responde como tu mejor asesor, no como un robot genérico.",
    chat: [
      { from: "bot", text: "Aprendí tu catálogo: 120 productos, precios, tallas y políticas de envío ✅" },
      { from: "cliente", text: "¿Y respondes como nosotros?" },
      { from: "bot", text: "Con tu tono. Tú apruebas cómo sueno antes de salir a producción." },
    ],
  },
  {
    step: "03",
    title: "Vendes",
    desc: "Tu equipo se concentra en lo que necesita criterio humano. NitroBot se encarga del resto, y tú lo ves todo desde el panel.",
    chat: [
      { from: "bot", text: "Venta cerrada 🎉 Pedido #1042 pagado y registrado en tu panel." },
      { from: "bot", text: "Tu equipo no tuvo que intervenir." },
    ],
  },
]

// S4 · Galería — cuatro casos de uso completos
export type GalleryCase = {
  id: string
  label: string
  title: string
  desc: string
  messages: ChatMessage[]
}

export const galleryCases: GalleryCase[] = [
  {
    id: "venta",
    label: "Venta asistida",
    title: "El cliente indeciso",
    desc: "Compara, recomienda según la necesidad real y cierra con link de pago.",
    messages: [
      { from: "cliente", text: "Estoy entre la cafetera Bari y la Toscana, ¿cuál me recomiendas?" },
      { from: "bot", text: "Buena elección las dos ☕ La Bari es manual, ideal si te gusta el ritual. La Toscana es automática: café listo en 2 minutos. ¿Cómo son tus mañanas: con calma o a las carreras?" },
      { from: "cliente", text: "A las carreras jaja" },
      { from: "bot", text: "Entonces la Toscana es la tuya. Está en $349.900 y hoy tiene envío gratis. ¿Te paso el link de pago?" },
      { from: "cliente", text: "Dale, pásamelo" },
      { from: "bot", text: "Listo, aquí está 🔗 Cualquier cosa me escribes por aquí." },
    ],
  },
  {
    id: "recuperacion",
    label: "Recuperación",
    title: "La venta que se estaba enfriando",
    desc: "Retoma la conversación con el producto exacto que el cliente miró ayer.",
    messages: [
      { from: "bot", text: "¡Hola, Caro! Ayer estuviste mirando el vestido Lino Mar en talla M 👗 Queda poco inventario y no quería que te quedaras sin él. ¿Te lo reservo?" },
      { from: "cliente", text: "Uy sí, ¿me lo guardas hasta la tarde?" },
      { from: "bot", text: "Reservado hasta las 6:00 pm ✅ Te dejo el link de pago listo para cuando puedas." },
      { from: "cliente", text: "¡Gracias!" },
    ],
  },
  {
    id: "agendamiento",
    label: "Agendamiento",
    title: "La cita de la clínica",
    desc: "Ofrece horarios reales, agenda y confirma sin que nadie del equipo intervenga.",
    messages: [
      { from: "cliente", text: "Buenas, quiero una cita para limpieza facial" },
      { from: "bot", text: "¡Claro! Esta semana tengo disponible: jueves 10:30 am, viernes 2:00 pm o sábado 9:00 am. ¿Cuál te queda mejor?" },
      { from: "cliente", text: "El sábado a las 9" },
      { from: "bot", text: "Agendado ✅ Sábado 9:00 am con la Dra. Salazar. Te llega la confirmación ahora y un recordatorio el día anterior." },
    ],
  },
  {
    id: "postventa",
    label: "Postventa",
    title: "¿Dónde está mi pedido?",
    desc: "Responde estado y fecha de entrega al instante, sin intervención humana.",
    messages: [
      { from: "cliente", text: "Hola, ¿qué pasó con mi pedido #4521?" },
      { from: "bot", text: "Déjame revisar… 📦 Tu pedido salió ayer con la transportadora, guía 240118765. Llega entre mañana y el jueves. ¿Te comparto el link de rastreo?" },
      { from: "cliente", text: "Sí, por favor" },
      { from: "bot", text: "Aquí está 🔗 Si no te llega el jueves, me escribes y lo escalo de una." },
    ],
  },
]
