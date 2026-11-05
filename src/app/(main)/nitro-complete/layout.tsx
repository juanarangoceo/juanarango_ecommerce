import { MetaPixel } from "@/components/analytics/meta-pixel";

/**
 * /nitro-complete es el destino de la campaña de Meta (Advantage+ de ventas).
 * Vive en (main) —con navegación— y no en (landing), así que el pixel se monta
 * aquí: sin él Meta no recibe PageView ni WhatsAppClick/Contact desde la
 * landing y la campaña no tiene evento de conversión.
 *
 * Igual que en (landing), solo se activa si existe NEXT_PUBLIC_META_PIXEL_ID
 * (se incrusta en el build: tras crearla en Vercel hay que redesplegar).
 */
export default function NitroCompleteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <MetaPixel />
    </>
  );
}
