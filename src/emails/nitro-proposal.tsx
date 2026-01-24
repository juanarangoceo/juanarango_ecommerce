import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface NitroProposalEmailProps {
  prospectName: string;
  companyName?: string;
}

export const NitroProposalEmail = ({
  prospectName = "Dr. / Dra.",
  companyName = "su clínica",
}: NitroProposalEmailProps) => {
  const previewText = `Ingeniería de Ventas para escalar ${companyName} - Nitro Ecom`;

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#000000", // Negro Corporativo (Nitro)
                accent: "#10b981", // Verde Nitro/Estético (Emerald-500)
                offWhite: "#f9fafb",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-offWhite my-auto mx-auto font-sans">
          <Container className="bg-white border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px] shadow-md">
            
            {/* LOGO SECTION */}
            <Section className="mt-[32px] mb-[32px] text-center">
              <Img
                src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
                width="150"
                height="auto"
                alt="Nitro Ecom Logo"
                className="my-0 mx-auto"
              />
            </Section>

            {/* HEADLINE */}
            <Heading className="text-brand text-[22px] font-bold text-center p-0 my-[30px] mx-0 leading-tight">
              Transformamos <span className="text-accent">{companyName}</span> con Ingeniería de Ventas
            </Heading>

            {/* BODY COPY */}
            <Text className="text-[#333] text-[15px] leading-[26px]">
              Hola <strong>{prospectName}</strong>,
            </Text>

            <Text className="text-[#333] text-[15px] leading-[26px]">
              Estuve revisando la web de <strong>{companyName}</strong> y veo un gran potencial. Sin embargo, noté que actualmente su sitio funciona más como un "folleto informativo" que como un sistema activo de ventas.
            </Text>

            <Text className="text-[#333] text-[15px] leading-[26px]">
              En <strong>Nitro Ecom</strong>, nos especializamos en el nicho de <strong>estética y spas</strong>. No solo diseñamos webs; implementamos infraestructura digital para atraer pacientes y cerrar citas automáticamente.
            </Text>

            {/* HIGHLIGHT BOX */}
            <Section className="bg-black p-5 rounded-lg my-6 text-center shadow-sm">
              <Text className="text-white text-[14px] font-medium m-0 mb-2">
                Lo que logramos con nuestra tecnología:
              </Text>
              <Text className="text-accent text-[16px] font-bold m-0 leading-snug">
                Más Conversión • Agendamiento Automático • Posicionamiento Premium
              </Text>
            </Section>

            <Text className="text-[#333] text-[15px] leading-[26px]">
              Para que veas exactamente cómo podría funcionar tu negocio, he preparado una demostración interactiva llamada <strong>Aura Stetic</strong>.
            </Text>

            {/* CTA BUTTON */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-accent text-white rounded text-[14px] font-bold no-underline text-center px-8 py-4 block w-full hover:bg-[#059669] transition-all shadow-lg"
                href="https://juanarangoecommerce.com/demos/aura-stetic"
              >
                VER DEMO: AURA STETIC
              </Button>
              <Text className="text-[#666] text-[12px] mt-3">
                👆 Haz clic para ver la ingeniería detrás de una clínica exitosa.
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* FOOTER */}
            <Text className="text-[#666] text-[13px] leading-[24px]">
              Si te interesa implementar este sistema en {companyName}, responde a este correo. Estamos listos para optimizar tus procesos.
            </Text>

            <Text className="text-brand font-bold text-[14px]">
              El equipo de Nitro Ecom.
            </Text>
          </Container>
          
          <Text className="text-center text-[12px] text-gray-400 mt-4">
            © 2025 Nitro Ecom. Todos los derechos reservados.
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NitroProposalEmail;
