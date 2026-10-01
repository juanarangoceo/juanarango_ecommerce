// Correos de contacto del dominio (NIT-91/NIT-93). Todos son alias del buzón
// nitrocomplete@juanarangoecommerce.com en Hostinger. El panel de Nitro
// Complete (repo nitro_bot, `lib/contact-emails.ts`) usa la misma lista: si
// cambia uno, se cambia en los dos repos.

export const CONTACT_EMAILS = {
  /** General: pie del sitio, términos y aviso legal. */
  contacto: "contacto@juanarangoecommerce.com",
  /** Planes, compra, demos. */
  ventas: "ventas@juanarangoecommerce.com",
  /** Clientes activos de Nitro Complete. */
  soporte: "soporte@juanarangoecommerce.com",
  /** Facturas, pagos, recargas. */
  facturacion: "facturacion@juanarangoecommerce.com",
  /** Boletín. */
  newsletter: "newsletter@juanarangoecommerce.com",
  /**
   * Datos personales (Ley 1581) y eliminación de datos. privacidad@ todavía no
   * existe (NIT-92: el cupo de alias está lleno); mientras tanto entrega
   * contacto@. Al crearlo se cambia esta línea y nada más.
   */
  privacidad: "contacto@juanarangoecommerce.com",
} as const;
