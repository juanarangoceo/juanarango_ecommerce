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

// 1. Aquí agregamos 'companyName' para que TypeScript no se queje
interface NitroProposalEmailProps {
  prospectName: string;
  companyName?: string; 
}

export const NitroProposalEmail = ({
  prospectName = "Futuro Cliente",
  companyName = "tu empresa", // Valor por defecto
}: NitroProposalEmailProps) => {
  const previewText = `Propuesta exclusiva para ${prospectName} - Nitro Ecom`;

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#001F3F", // Navy Blue
                accent: "#FF8500", // Vibrant Orange
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="https://juanarangoecommerce.com/icon-dark-32x32.png" 
                width="40"
                height="40"
                alt="Nitro Ecom"
                className="my-0 mx-auto"
              />
            </Section>
            
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Transformamos {companyName}
            </Heading>
            
            <Text className="text-black text-[14px] leading-[24px]">
              Hola <strong>{prospectName}</strong>,
            </Text>
            
            <Text className="text-black text-[14px] leading-[24px]">
              Hemos analizado la presencia digital de <strong>{companyName}</strong> y vemos un potencial increíble. 
              En <strong>Nitro Ecom</strong>, no solo hacemos webs, creamos ecosistemas de venta automatizados.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#001F3F] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3 hover:bg-emerald-400 transition-colors"
                href="https://juanarangoecommerce.com/demos/aura-stetic"
              >
                Ver Demo Personalizada
              </Button>
            </Section>
            
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Si tienes dudas, responde a este correo. Estamos listos para escalar {companyName}.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NitroProposalEmail;
