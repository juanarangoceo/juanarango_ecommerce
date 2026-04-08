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

// ─── 1. INTERFAZ EXACTA PARA VERCEL Y TYPESCRIPT ─────────────────────────────
// Aquí le decimos a Vercel que espere los 5 párrafos, evitando el error de "propiedad desconocida".
interface NitroProposalEmailProps {
  prospectName: string;
  companyName?: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  paragraph5: string; // <-- La propiedad clave para que no se rompa
  ctaText: string;
  ctaUrl: string;
  closingLine: string;
}

// ─── 2. COMPONENTE PRINCIPAL CON VALORES POR DEFECTO ─────────────────────────
export const NitroProposalEmail = ({
  prospectName = "equipo",
  companyName = "la empresa",
  paragraph1 = "Mi nombre es Juan Arango, soy Arquitecto de Infraestructura Digital e IA...",
  paragraph2 = "Revisé el flujo de su web desde la perspectiva de un cliente y detecté un detalle...",
  paragraph3 = "A escala, los procesos manuales o la latencia se traducen en ventas que no cierran.",
  paragraph4 = "En Nitro Ecom resolvemos esto implementando Agentes de IA 24/7 y arquitectura Headless.",
  paragraph5 = "Preparé un diagnóstico breve y visual aplicado específicamente a su empresa.",
  ctaText = "Ver diagnóstico personalizado →",
  ctaUrl = "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
  closingLine = "Si prefiere conversarlo directamente antes, puede responderme aquí o escribirme por WhatsApp: wa.me/573146681896",
}: NitroProposalEmailProps) => {
  
  // El texto previo que se lee en la bandeja de entrada antes de abrir el correo
  const previewText = `Una oportunidad que vi en ${companyName}`;

  return (
    <Html lang="es">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={mainBodyStyle}>
        <Container style={containerStyle}>

          {/* Logo — Discreto y moderno */}
          <Section style={{ marginBottom: "40px", marginTop: "20px" }}>
            <Img
              src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
              width="72"
              height="auto"
              alt="Nitro Ecom"
              style={{ borderRadius: "6px" }}
            />
          </Section>

          {/* Saludo dinámico */}
          <Text style={textStyle}>
            Hola <strong>{prospectName}</strong>,
          </Text>

          {/* Cuerpo del correo: Efecto Cascada con los 5 párrafos */}
          <Text style={textStyle}>{paragraph1}</Text>
          <Text style={textStyle}>{paragraph2}</Text>
          <Text style={textStyle}>{paragraph3}</Text>
          <Text style={textStyle}>{paragraph4}</Text>
          {paragraph5 && <Text style={textStyle}>{paragraph5}</Text>}

          {/* Call to Action (Enlace sobrio y técnico) */}
          <Text style={{ ...textStyle, marginTop: "32px", marginBottom: "32px" }}>
            <Link href={ctaUrl} style={linkStyle}>
              {ctaText}
            </Link>
          </Text>

          {/* Cierre enfocado en respuesta y WhatsApp */}
          <Text style={textStyle}>{closingLine}</Text>

          {/* Separador */}
          <Hr style={dividerStyle} />

          {/* Firma Técnica de Autoridad */}
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

        {/* Legal Footer para proteger tu entregabilidad */}
        <Text style={footerStyle}>
          Este es un contacto profesional B2B. Si no deseas recibir más información de mi parte, por favor responde "no gracias" y detendré el seguimiento de inmediato.
        </Text>
      </Body>
    </Html>
  );
};

// ─── 3. DICCIONARIO DE ESTILOS (UX / ESTÉTICA "SILENT LUXURY") ───────────────

// Fuentes de sistema Sans-Serif para velocidad de carga y lectura limpia
const fontFamilyStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif";

const mainBodyStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0",
  padding: "0",
  fontFamily: fontFamilyStack,
};

const containerStyle: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "48px 24px",
};

const textStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "26px", // Mucho aire interlineal
  color: "#1a1a1a", // Gris muy oscuro (menos cansancio visual)
  margin: "0 0 24px 0", // Margen inferior que crea la "cascada"
  textAlign: "left",
  fontWeight: "400",
};

const linkStyle: React.CSSProperties = {
  color: "#000000",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
  fontWeight: "600",
};

const dividerStyle: React.CSSProperties = {
  borderColor: "#eaeaea",
  margin: "40px 0",
};

const signatureNameStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#111827",
  fontWeight: "600",
  margin: "0 0 2px 0",
};

const signatureTitleStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#4b5563",
  margin: "0 0 4px 0",
};

const signatureCompanyStyle: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#6b7280",
  margin: "0",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "11px",
  lineHeight: "16px",
  color: "#9ca3af",
  padding: "0 24px 48px",
  fontFamily: fontFamilyStack,
  maxWidth: "400px",
  margin: "0 auto",
};

export default NitroProposalEmail;
