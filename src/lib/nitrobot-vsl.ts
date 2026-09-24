/**
 * Configuración del VSL de NitroBot (landing de campañas Meta, /nitrobot/vsl).
 *
 * El video vive en Cloudinary. Para conectarlo solo necesitas el "public id" que
 * Cloudinary muestra al subir el archivo, incluyendo la versión. Por ejemplo:
 *   v1769051872/nitrobot_vsl_ab12cd
 *
 * Defínelo en Vercel como NEXT_PUBLIC_NITROBOT_VSL_ID (y haz `vercel env pull`
 * para tenerlo en local). Mientras esté vacío, la landing muestra un panel de
 * prueba en lugar del video, para que puedas revisar el resto del embudo.
 */

const CLOUDINARY_CLOUD = "dohwyszdj";

/** Public id del video en Cloudinary, con versión. */
export const VSL_PUBLIC_ID = process.env.NEXT_PUBLIC_NITROBOT_VSL_ID ?? "";

/** Segundos de reproducción real que se deben ver antes de mostrar el formulario. */
export const VSL_UNLOCK_SECONDS = 10;

/**
 * Dos calidades para que el móvil no cargue el archivo pesado.
 *
 * La elección se hace en el cliente con matchMedia y no con el atributo `media`
 * de <source>: ese atributo solo se respeta dentro de <picture>, los navegadores
 * lo ignoran en <video> y terminarían bajando siempre la primera fuente.
 */
export function getVslVariants(publicId: string = VSL_PUBLIC_ID) {
  if (!publicId) return null;

  const base = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload`;

  return {
    mobile: `${base}/f_auto:video,q_auto:good,w_720,br_800k/${publicId}.mp4`,
    desktop: `${base}/f_auto:video,q_auto:good,w_1280,br_1500k/${publicId}.mp4`,
  };
}

/** Primer fotograma del video, servido como imagen para el estado de reposo. */
export function getVslPoster(publicId: string = VSL_PUBLIC_ID) {
  if (!publicId) return "";
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/so_0,f_auto,q_auto:good,w_1280/${publicId}.jpg`;
}
