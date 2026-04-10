import {
  Body,
  Button,
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

// ─── TIPOS ───────────────────────────────────────────────────────────────────
type Sector = "clinica" | "retail" | "inmobiliaria";

export interface NitroProposalEmailProps {
  prospectName: string;
  companyName?: string;
  sector?: Sector;
  // 7 micro-bloques semánticos — máx 2 frases cada uno
  hook: string;           // El anzuelo: genera curiosidad/incomodidad
  observation: string;    // Lo que viste en su web/operación
  pain: string;           // El costo real del problema
  solution: string;       // Cómo Nitro lo resuelve
  proof?: string;         // Micro-prueba social/estadística (opcional)
  invitation: string;     // Invitación suave al CTA
  ctaText: string;
  ctaUrl: string;
  closingLine: string;
}

// ─── COLORES DE ACENTO POR SECTOR ────────────────────────────────────────────
const sectorAccent: Record<Sector, { cta: string; ctaHover: string; hookColor: string }> = {
  clinica:      { cta: "#0d9488", ctaHover: "#0f766e", hookColor: "#0f766e" },
  retail:       { cta: "#d97706", ctaHover: "#b45309", hookColor: "#b45309" },
  inmobiliaria: { cta: "#4f46e5", ctaHover: "#4338ca", hookColor: "#4338ca" },
};

const defaultAccent = sectorAccent.inmobiliaria;

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export const NitroProposalEmail = ({
  prospectName = "equipo",
  companyName = "la empresa",
  sector = "inmobiliaria",
  hook,
  observation,
  pain,
  solution,
  proof,
  invitation,
  ctaText = "Ver diagnóstico personalizado →",
  ctaUrl = "https://www.juanarangoecommerce.com",
  closingLine = "Si prefiere conversarlo directamente antes, puede responderme aquí o escribirme por WhatsApp: wa.me/573146681896",
}: NitroProposalEmailProps) => {
  const accent = sectorAccent[sector] ?? defaultAccent;
  const previewText = `${hook.slice(0, 80)}`;

  return (
    <Html lang="es">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>

          {/* Logo */}
          <Section style={{ marginBottom: "36px", marginTop: "24px" }}>
            <Img
              src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
              width="68"
              height="auto"
              alt="Nitro Ecom"
              style={{ borderRadius: "6px" }}
            />
          </Section>

          {/* Saludo */}
          <Text style={greetingStyle}>
            Hola <strong>{prospectName}</strong>,
          </Text>

          {/* ── BLOQUE 1: HOOK ─────────────────────────────────────── */}
          {/* El anzuelo. Tipografía más grande y color de acento del sector. */}
          <Text style={{ ...hookStyle, color: accent.hookColor }}>
            {hook}
          </Text>

          <Hr style={thinDividerStyle} />

          {/* ── BLOQUE 2: OBSERVATION ──────────────────────────────── */}
          {/* Lo que viste en su web. Específico, no genérico. */}
          <Text style={blockStyle}>{observation}</Text>

          {/* ── BLOQUE 3: PAIN ─────────────────────────────────────── */}
          {/* El costo real del problema. Hace que duela suavemente. */}
          <Text style={blockStyle}>{pain}</Text>

          {/* ── BLOQUE 4: SOLUTION ─────────────────────────────────── */}
          {/* Cómo Nitro lo resuelve. Sin tecnicismos excesivos. */}
          <Text style={blockStyle}>{solution}</Text>

          {/* ── BLOQUE 5: PROOF (opcional) ─────────────────────────── */}
          {/* Micro-prueba social o estadística del sector. */}
          {proof && (
            <Text style={proofStyle}>{proof}</Text>
          )}

          {/* ── BLOQUE 6: INVITATION ───────────────────────────────── */}
          {/* Invitación suave. No "compra ya". */}
          <Text style={{ ...blockStyle, marginTop: "24px" }}>{invitation}</Text>

          {/* ── BLOQUE 7: CTA ──────────────────────────────────────── */}
          <Section style={{ marginTop: "28px", marginBottom: "28px" }}>
            <Button
              href={ctaUrl}
              style={{
                ...ctaButtonStyle,
                backgroundColor: accent.cta,
              }}
            >
              {ctaText}
            </Button>
          </Section>

          {/* Cierre humano */}
          <Text style={closingStyle}>{closingLine}</Text>

          <Hr style={dividerStyle} />

          {/* Firma */}
          <Text style={signatureNameStyle}>Juan Arango</Text>
          <Text style={signatureTitleStyle}>Arquitecto de Infraestructura Digital & IA</Text>
          <Text style={signatureCompanyStyle}>
            NITRO ECOM &nbsp;·&nbsp;{" "}
            <Link
              href="https://www.juanarangoecommerce.com"
              style={{ color: "#6b7280", textDecoration: "none" }}
            >
              juanarangoecommerce.com
            </Link>
            {" "}&nbsp;·&nbsp;{" "}
            <Link
              href="https://wa.me/573146681896"
              style={{ color: "#6b7280", textDecoration: "none" }}
            >
              WhatsApp (+57) 314 668 1896
            </Link>
          </Text>

        </Container>

        {/* Footer legal */}
        <Text style={footerStyle}>
          Este es un contacto profesional B2B. Si no deseas recibir más información de mi parte, responde &quot;no gracias&quot; y detendré el seguimiento de inmediato.
        </Text>
      </Body>
    </Html>
  );
};

// ─── SISTEMA DE ESTILOS ───────────────────────────────────────────────────────
const fontStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#f9f9f9",
  margin: "0",
  padding: "0",
  fontFamily: fontStack,
};

const containerStyle: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "40px 28px 48px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
};

const greetingStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#6b7280",
  margin: "0 0 20px 0",
};

// Hook: más grande, color de acento, semi-bold — el anzuelo que genera apertura
const hookStyle: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: "28px",
  fontWeight: "600",
  margin: "0 0 20px 0",
  letterSpacing: "-0.01em",
};

const thinDividerStyle: React.CSSProperties = {
  borderColor: "#f0f0f0",
  margin: "20px 0 24px 0",
};

// Bloques del cuerpo: tamaño legible, espaciado generoso para efecto cascada
const blockStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "26px",
  color: "#1a1a1a",
  margin: "0 0 20px 0",
  fontWeight: "400",
};

// Proof: más pequeño y en gris — apoyo, no protagonista
const proofStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "22px",
  color: "#6b7280",
  margin: "0 0 20px 0",
  fontStyle: "italic",
  borderLeft: "3px solid #e5e7eb",
  paddingLeft: "12px",
};

const closingStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#374151",
  margin: "0 0 0 0",
};

// CTA: botón real con color de acento del sector
const ctaButtonStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "13px 28px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  borderRadius: "6px",
  fontFamily: fontStack,
  letterSpacing: "0.01em",
};

const dividerStyle: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "32px 0 20px 0",
};

const signatureNameStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "22px",
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
  lineHeight: "17px",
  color: "#9ca3af",
  padding: "24px 24px 40px",
  fontFamily: fontStack,
  maxWidth: "460px",
  margin: "0 auto",
};

export default NitroProposalEmail;
