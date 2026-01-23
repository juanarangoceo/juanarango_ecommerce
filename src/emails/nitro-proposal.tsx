import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface NitroProposalEmailProps {
  prospectName?: string;
  companyName?: string;
  previewText?: string;
}

export const NitroProposalEmail = ({
  prospectName = "Visionario",
  companyName = "tu empresa",
  previewText = "Transforma tu infraestructura digital con Nitro Ecom",
}: NitroProposalEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#10b981", // Emerald 500
                dark: "#0a0a0a",
              },
            },
          },
        }}
      >
        <Body className="bg-black my-auto mx-auto font-sans text-white">
          <Container className="border border-white/10 rounded-lg p-8 my-8 mx-auto max-w-xl bg-neutral-950">
            {/* Logo Section */}
            <Section className="mb-8">
               <Text className="text-2xl font-bold tracking-tighter text-white m-0">
                  NITRO <span className="text-brand">ECOM</span>
               </Text>
            </Section>

            {/* Hero Text */}
            <Heading className="text-white text-[24px] font-normal text-start p-0 my-8 mx-0">
              Hola, <span className="font-bold">{prospectName}</span>.
            </Heading>
            
            <Text className="text-zinc-400 text-[16px] leading-[24px]">
              Hemos analizado el potencial de <strong className="text-white">{companyName}</strong> y creemos que está listo para el siguiente nivel.
            </Text>

            <Text className="text-zinc-400 text-[16px] leading-[24px]">
              Imagina tener una infraestructura tecnológica tan robusta y estética como la que construimos para <strong>Aura Stetic</strong> (nuestro caso de éxito más reciente).
            </Text>

            <Section className="my-8 p-0">
              <Img
                src="https://res.cloudinary.com/dohwyszdj/image/upload/v1707166000/aura-stetic-demo-preview_xyz.jpg" // Placeholder URL - user should replace or we use a generic one
                width="100%"
                height="auto"
                alt="Aura Stetic Demo Preview"
                className="rounded-lg border border-white/20 object-cover"
              />
              <Text className="text-zinc-500 text-xs text-center mt-2 italic">
                Interfaz inmersiva de Aura Stetic desarrollada por Nitro Ecom.
              </Text>
            </Section>

            <Text className="text-zinc-400 text-[16px] leading-[24px]">
              No es solo "una página web". Es un ecosistema de ventas, agendamiento y retención con tiempos de carga instantáneos y diseño de clase mundial.
            </Text>

            {/* Call to Action */}
            <Section className="text-center mt-8 mb-8">
              <Button
                className="bg-brand rounded-full text-black px-8 py-3 font-bold text-[14px] no-underline hover:bg-emerald-400 transition-colors"
                href="https://juanarango-ecommerce.vercel.app/demos/aura-stetic"
              >
                Ver Demo en Vivo
              </Button>
            </Section>

            <Hr className="border-white/10 my-6" />

            <Text className="text-zinc-600 text-[12px] leading-[20px] text-center">
              ¿Listo para escalar {companyName}? <Link href="mailto:contacto@nitroecom.com" className="text-brand underline">Hablemos.</Link>
            </Text>
             <Text className="text-zinc-700 text-[10px] text-center mt-4">
              © 2026 Nitro Ecom. Infraestructura para Ventas.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NitroProposalEmail;
