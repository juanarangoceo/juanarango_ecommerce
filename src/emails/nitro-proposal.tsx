import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

// ─── INTERFAZ EXACTA ─────────────────────────────────────────────────────────
export interface NitroProposalEmailProps {
  prospectName: string;
  companyName?: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  paragraph5: string;
  ctaText: string;
  ctaUrl: string;
  closingLine: string;
}

export const NitroProposalEmail = ({
  prospectName = "equipo",
  companyName = "la empresa",
  paragraph1 = "Mi nombre es Juan Arango, soy Arquitecto de Infraestructura Digital e IA...",
  paragraph2 = "Revisé el flujo de su web desde la perspectiva de un cliente y detecté un detalle...",
  paragraph3 = "A escala, los procesos manuales o la latencia se traducen en ventas que no cierran.",
  paragraph4 = "En Nitro Ecom resolvemos esto implementando Agentes de IA 24/7 y arquitectura Headless.",
  paragraph5 = "Preparé un diagnóstico breve y visual aplicado específicamente a su empresa.",
  ctaText = "Ver diagnóstico personalizado →",
  ctaUrl = "https://www.juanarangoecommerce.com",
  closingLine = "Si prefiere conversarlo directamente antes, puede responderme aquí o escribirme por WhatsApp: wa.me/573146681896",
}: NitroProposalEmailProps) => {
  
  const previewText = `Una oportunidad que vi en ${companyName}`;

  return (
    <Html lang="es">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={mainBodyStyle}>
        <Container style={containerStyle}>

          <Section style={{ marginBottom: "40px", marginTop: "20px" }}>
            <Img
              src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
              width="72"
              height="auto"
              alt="Nitro Ecom"
              style={{ borderRadius: "6px" }}
            />
          </Section>

          <Text style={textStyle}>
            Hola <strong>{prospectName}</strong>,
          </Text>

          <Text style={textStyle}>{paragraph1}</Text>
          <Text style={textStyle}>{paragraph2}</Text>
          <Text style={textStyle}>{paragraph3}</Text>
          <Text style={textStyle}>{paragraph4}</Text>
          {paragraph5 && <Text style={textStyle}>{paragraph5}</Text>}

          <Text style={{ ...textStyle, marginTop: "32px", marginBottom: "32px" }}>
            <Link href={ctaUrl} style={linkStyle}>
              {ctaText}
            </Link>
          </Text>

          <Text style={textStyle}>{closingLine}</Text>

          <Hr style={dividerStyle} />

          <Text style={signatureNameStyle}>
            Juan Arango
          </Text>
          <Text style={signatureTitleStyle}>
            Arquitecto de Infraestructura Digital & IA
          </Text>
          <Text style={signatureCompanyStyle}>
            NITRO ECOM &nbsp;·&nbsp;{" "}
            <Link href="https://www.juanarangoecommerce.com" style={{ color: "#6b7280", textDecoration: "none" }}>
              juanarangoecommerce.com
            </Link>
            {" "}&nbsp;·&nbsp;{" "}
            <Link href="https://wa.me/573146681896" style={{ color: "#6b7280", textDecoration: "none" }}>
              WhatsApp (+57) 314 668 1896
            </Link>
          </Text>

        </Container>

        <Text style={footerStyle}>
          Este es un contacto profesional B2B. Si no deseas recibir más información de mi parte, por favor responde "no gracias" y detendré el seguimiento de inmediato.
        </Text>
      </Body>
    </Html>
  );
};

// ─── ESTILOS ─────────────────────────────────────────────────────────────────
const fontFamilyStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif";

const mainBodyStyle: React.CSSProperties = { backgroundColor: "#ffffff", margin: "0", padding: "0", fontFamily: fontFamilyStack };
const containerStyle: React.CSSProperties = { maxWidth: "560px", margin: "0 auto", padding: "48px 24px" };
const textStyle: React.CSSProperties = { fontSize: "15px", lineHeight: "26px", color: "#1a1a1a", margin: "0 0 24px 0", textAlign: "left", fontWeight: "400" };
const linkStyle: React.CSSProperties = { color: "#000000", textDecoration: "underline", textUnderlineOffset: "4px", fontWeight: "600" };
const dividerStyle: React.CSSProperties = { borderColor: "#eaeaea", margin: "40px 0" };
const signatureNameStyle: React.CSSProperties = { fontSize: "15px", lineHeight: "24px", color: "#111827", fontWeight: "600", margin: "0 0 2px 0" };
const signatureTitleStyle: React.CSSProperties = { fontSize: "13px", lineHeight: "20px", color: "#4b5563", margin: "0 0 4px 0" };
const signatureCompanyStyle: React.CSSProperties = { fontSize: "12px", lineHeight: "18px", color: "#6b7280", margin: "0" };
const footerStyle: React.CSSProperties = { textAlign: "center", fontSize: "11px", lineHeight: "16px", color: "#9ca3af", padding: "0 24px 48px", fontFamily: fontFamilyStack, maxWidth: "400px", margin: "0 auto" };

export default NitroProposalEmail;
