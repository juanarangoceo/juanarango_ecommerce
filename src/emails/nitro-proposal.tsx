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
  ctaText = "Puedes ver cómo funciona aquí →",
  ctaUrl = "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
  closingLine = "Si te genera alguna pregunta, responde este mismo correo. Lo leo yo.",
}: NitroProposalEmailProps) => {
  const previewText = `${prospectName}, quería hablarte de algo que vi en ${companyName}.`;

  return (
    <Html lang="es">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ backgroundColor: "#ffffff", margin: "0", padding: "0", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        <Container style={{ maxWidth: "580px", margin: "0 auto", padding: "40px 32px 48px" }}>

          {/* Logo — pequeño, discreto */}
          <Section style={{ marginBottom: "36px" }}>
            <Img
              src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
              width="80"
              height="auto"
              alt="Nitro Ecom"
              style={{ borderRadius: "4px" }}
            />
          </Section>

          {/* Saludo */}
          <Text style={textStyle}>
            Hola <strong>{prospectName}</strong>,
          </Text>

          {/* Párrafos conversacionales */}
          <Text style={textStyle}>{paragraph1}</Text>
          <Text style={textStyle}>{paragraph2}</Text>
          <Text style={textStyle}>{paragraph3}</Text>
          <Text style={textStyle}>{paragraph4}</Text>

          {/* CTA como link de texto — sin botón */}
          <Text style={{ ...textStyle, marginTop: "28px" }}>
            <Link
              href={ctaUrl}
              style={{
                color: "#1d4ed8",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              {ctaText}
            </Link>
          </Text>

          {/* Cierre */}
          <Text style={{ ...textStyle, marginTop: "28px" }}>{closingLine}</Text>

          <Hr style={{ borderColor: "#e5e7eb", margin: "32px 0" }} />

          {/* Firma */}
          <Text style={{ ...textStyle, marginBottom: "4px", fontWeight: "700", color: "#111827" }}>
            Juan Arango
          </Text>
          <Text style={{ ...smallTextStyle, marginTop: "0" }}>
            Experto en Infraestructura Digital &amp; E-commerce de Alto Rendimiento
          </Text>
          <Text style={{ ...smallTextStyle, color: "#6b7280" }}>
            Nitro Ecom &nbsp;·&nbsp;{" "}
            <Link href="https://www.juanarangoecommerce.com" style={{ color: "#6b7280" }}>
              juanarangoecommerce.com
            </Link>
          </Text>

        </Container>

        {/* Legal */}
        <Text style={{ textAlign: "center", fontSize: "11px", color: "#9ca3af", padding: "0 32px 32px", fontFamily: "sans-serif" }}>
          Te escribo porque creo que puedo aportarte algo real.
          Si no te interesa, no hay problema — responde con "no gracias" y no vuelvo a escribir.
        </Text>
      </Body>
    </Html>
  );
};

const textStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "28px",
  color: "#1f2937",
  margin: "0 0 20px 0",
  fontFamily: "'Georgia', 'Times New Roman', serif",
};

const smallTextStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#374151",
  margin: "0 0 4px 0",
  fontFamily: "sans-serif",
};

export default NitroProposalEmail;
