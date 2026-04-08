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

interface NitroProposalEmailProps {
  prospectName: string;
  companyName?: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  ctaText: string;
  ctaUrl: string;
  closingLine: string;
}

export const NitroProposalEmail = ({
  prospectName = "amigo",
  companyName = "tu empresa",
  paragraph1 = "Quería escribirte porque vi algo en lo que haces y sentí que tenía que decírtelo.",
  paragraph2 = "Muchas empresas en tu sector pasan por lo mismo: tienen un negocio real, con clientes reales, pero su presencia digital no les está vendiendo lo que deberían.",
  paragraph3 = "Lo que hacemos en Nitro es exactamente eso: construir la infraestructura que convierte tu web de un catálogo pasivo en algo que trabaja por ti las 24 horas.",
  paragraph4 = "No te hablo de rediseños visuales. Te hablo de velocidad, de captar el prospecto correcto antes de que llegue a la competencia, y de automatizar el seguimiento para que tus asesores solo hablen con gente lista para cerrar.",
  ctaText = "Ver diagnóstico de 10 minutos →",
  ctaUrl = "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
  closingLine = "Quedo a tu disposición para revisar la data técnica.",
}: NitroProposalEmailProps) => {
  const previewText = `Auditoría técnica de infraestructura en ${companyName}`;

  return (
    <Html lang="es">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={mainBodyStyle}>
        <Container style={containerStyle}>

          {/* Logo — Discreto, alineado a la izquierda */}
          <Section style={{ marginBottom: "40px", marginTop: "20px" }}>
            <Img
              src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
              width="72"
              height="auto"
              alt="Nitro Ecom"
              style={{ borderRadius: "6px" }}
            />
          </Section>

          {/* Saludo */}
          <Text style={textStyle}>
            Hola <strong>{prospectName}</strong>,
          </Text>

          {/* Párrafos con efecto Cascada */}
          <Text style={textStyle}>{paragraph1}</Text>
          <Text style={textStyle}>{paragraph2}</Text>
          <Text style={textStyle}>{paragraph3}</Text>
          <Text style={textStyle}>{paragraph4}</Text>

          {/* CTA Técnico y limpio */}
          <Text style={{ ...textStyle, marginTop: "32px", marginBottom: "32px" }}>
            <Link href={ctaUrl} style={linkStyle}>
              {ctaText}
            </Link>
          </Text>

          {/* Cierre */}
          <Text style={textStyle}>{closingLine}</Text>

          {/* Separador sutil */}
          <Hr style={dividerStyle} />

          {/* Firma estilo Ingeniero / Consultor */}
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
          </Text>

        </Container>

        {/* Footer Legal Minimalista */}
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
      </Body>
    </Html>
  );
};

// ─── Diccionario de Estilos ──────────────────────────────────────────────────

// Pila de fuentes del sistema: carga instantánea, 100% legibles, estética moderna.
const fontFamilyStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif";

const mainBodyStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0",
  padding: "0",
  fontFamily: fontFamilyStack,
};

const containerStyle: React.CSSProperties = {
  maxWidth: "560px", // Un poco más angosto para forzar líneas más cortas
  margin: "0 auto",
  padding: "48px 24px",
};

const textStyle: React.CSSProperties = {
  fontSize: "15px", // Tamaño ideal para móvil y desktop
  lineHeight: "26px", // Excelente "aire" interlineal para evitar bloques densos
  color: "#1a1a1a", // Gris casi negro, reduce fatiga visual vs #000 puro
  margin: "0 0 24px 0", // El secreto del efecto cascada
  textAlign: "left",
  fontWeight: "400",
};

const linkStyle: React.CSSProperties = {
  color: "#000000", // Enlace en negro sólido
  textDecoration: "underline",
  textUnderlineOffset: "4px", // Separa el subrayado del texto, toque premium
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
