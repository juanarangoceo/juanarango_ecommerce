export function normalizeTagSlug(tag: string): string {
  return tag
    .toString()
    .toLowerCase()
    .normalize('NFD') // Descompone caracteres con acentos
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza no alfanuméricos con guiones
    .replace(/(^-|-$)/g, '') // Elimina guiones al inicio y final
    .slice(0, 96); // Limita longitud
}
