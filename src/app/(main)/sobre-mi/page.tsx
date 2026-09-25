
import { AboutSection } from "@/components/about-section";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Sobre Juan Arango | Ecommerce y ventas por WhatsApp con IA",
  description: "Juan Arango lleva 15 años en ecommerce: marketplaces, marcas propias y tiendas para otros negocios. Creó Nitro Complete para vender por WhatsApp y acompañar cada pedido hasta la entrega.",
});

export default function SobreMiPage() {
  return <AboutSection />;
}
