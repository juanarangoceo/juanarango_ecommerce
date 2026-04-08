
import { AboutSection } from "@/components/about-section";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Sobre Mí - Juan Arango",
  description: "Conoce más sobre Juan Arango, Experto en Ecommerce y automatización para estrategias de comercio electrónico.",
});

export default function SobreMiPage() {
  return (
    <main className="pt-20">
      <AboutSection />
    </main>
  );
}
