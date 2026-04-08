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
  headline: string;
  intro: string;
  problemParagraph: string;
  solutionBullets: string[];
  ctaText: string;
  ctaUrl: string;
  ctaMessage: string;
}

export const NitroProposalEmail = ({
  prospectName = "Visionario",
  companyName = "tu empresa",
  headline = "Transformamos tu empresa con Estrategias de Ventas",
  intro = "He revisado la estrategia digital actual y veo un gran potencial.",
  problemParagraph = "Actualmente tu negocio funciona más como un escaparate que como un sistema activo y comprobamos que es un punto de fuga de ventas.",
  solutionBullets = ["Más Conversión", "Atención Automática", "Posicionamiento Premium"],
  ctaText = "VER DEMO ESTRATÉGICA",
  ctaUrl = "https://juanarangoecommerce.com",
  ctaMessage = "👆 Haz clic para agendar tu sesión.",
}: NitroProposalEmailProps) => {
  const previewText = `Estrategias de Escalamiento para ${companyName} - Nitro Ecom`;

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#18181b",
                accent: "#3b82f6",
                offWhite: "#f4f4f5",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-[#f4f4f5] my-auto mx-auto font-sans">
          <Container className="bg-white border text-[#18181b] border-solid border-[#e4e4e7] rounded-xl my-[40px] mx-auto p-[32px] max-w-[500px] shadow-sm">
            
            {/* LOGO SECTION */}
            <Section className="mt-[10px] mb-[32px] text-center">
              <Img
                src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
                width="130"
                height="auto"
                alt="Nitro Ecom Logo"
                className="my-0 mx-auto rounded-sm"
              />
            </Section>

            {/* HEADLINE */}
            <Heading className="text-brand text-[24px] font-bold text-center p-0 mb-[30px] mx-0 leading-tight" dangerouslySetInnerHTML={{ __html: headline }} />

            {/* BODY COPY */}
            <Text className="text-[#3f3f46] text-[16px] leading-[26px]">
              Hola <strong>{prospectName}</strong>,
            </Text>

            <Text className="text-[#3f3f46] text-[16px] leading-[26px]">
              {intro}
            </Text>

            <Text className="text-[#3f3f46] text-[16px] leading-[26px]">
              {problemParagraph}
            </Text>

            {/* HIGHLIGHT BOX */}
            <Section className="bg-[#f8fafc] border border-[#e2e8f0] p-6 rounded-xl my-6 text-center">
              <Text className="text-[#334155] text-[14px] font-semibold m-0 mb-3 uppercase tracking-wider">
                LO QUE LOGRAMOS CON NUESTRA TECNOLOGÍA:
              </Text>
              <Text className="text-accent text-[16px] font-bold m-0 leading-snug">
                {solutionBullets.join(" • ")}
              </Text>
            </Section>

            <Text className="text-[#3f3f46] text-[16px] leading-[26px] text-center font-medium">
              {ctaMessage}
            </Text>

            {/* CTA BUTTON */}
            <Section className="text-center mt-[24px] mb-[32px]">
              <Button
                className="bg-accent text-white rounded-lg text-[15px] font-bold no-underline text-center px-8 py-4 block w-full hover:bg-[#2563eb] transition-all shadow-md"
                href={ctaUrl}
              >
                {ctaText}
              </Button>
            </Section>

            <Hr className="border border-solid border-[#e4e4e7] my-[26px] mx-0 w-full" />

            {/* FOOTER */}
            <Text className="text-[#71717a] text-[14px] leading-[24px]">
              Si te interesa implementar nuestra infraestructura en {companyName}, responde directamente a este correo o visita nuestra plataforma.
            </Text>

            <Text className="text-brand font-bold text-[15px] mt-4">
              El Equipo de Nitro Inmobiliaria.
            </Text>
          </Container>
          
          <Text className="text-center text-[12px] text-[#a1a1aa] mt-4 mb-8">
            © 2026 Nitro Inmobiliaria & Juan Arango. Todos los derechos reservados.
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NitroProposalEmail;
