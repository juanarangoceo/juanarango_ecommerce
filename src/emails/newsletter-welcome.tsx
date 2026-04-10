import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NewsletterWelcomeProps {
  firstName?: string;
  email?: string;
}

export const NewsletterWelcome = ({
  firstName = "futuro referente",
  email = "",
}: NewsletterWelcomeProps) => {
  const previewText = "Bienvenido. Lo que llega aquí no lo vas a encontrar en otro lado.";

  const resources = [
    {
      icon: "🧪",
      title: "Laboratorio Nitro",
      desc: "Experimentos reales de ecommerce e IA — estrategias que uso con mis clientes.",
      url: "https://www.juanarangoecommerce.com/laboratorio",
    },
    {
      icon: "📚",
      title: "Guías Técnicas",
      desc: "MCP, Claude Code, Shopify headless — las guías más completas en español.",
      url: "https://www.juanarangoecommerce.com/guias",
    },
    {
      icon: "⚡",
      title: "Comparativas de Herramientas",
      desc: "Qué herramienta usar y cuándo. Sin opiniones, con datos.",
      url: "https://www.juanarangoecommerce.com/comparar",
    },
  ];

  return (
    <Html lang="es">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={bodyStyle}>

        {/* Outer wrapper */}
        <Section style={{ backgroundColor: "#050505", padding: "40px 16px" }}>
          <Container style={cardStyle}>

            {/* Barra de acento superior — gradiente verde Nitro */}
            <Section style={accentBarStyle} />

            {/* Header con logo */}
            <Section style={{ padding: "40px 40px 0 40px", textAlign: "center" }}>
              <Img
                src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
                width="90"
                height="auto"
                alt="Nitro Ecom"
                style={{ margin: "0 auto 24px auto", borderRadius: "8px", display: "block" }}
              />

              {/* Badge */}
              <Section style={badgeStyle}>
                <Text style={badgeTextStyle}>✦ BIENVENIDO A NITRO</Text>
              </Section>
            </Section>

            {/* Titular */}
            <Section style={{ padding: "24px 40px 0 40px", textAlign: "center" }}>
              <Heading style={headingStyle}>
                Hola{firstName !== "futuro referente" ? `, ${firstName}` : ""}. Ya eres de los nuestros.
              </Heading>
              <Text style={subtitleStyle}>
                A partir de hoy recibirás lo que va directo a la práctica: estrategias de ecommerce,
                arquitectura con IA y los experimentos que hacemos con clientes reales.{" "}
                <span style={{ color: "#ffffff" }}>Sin relleno.</span>
              </Text>
            </Section>

            {/* Divider */}
            <Section style={{ padding: "0 40px" }}>
              <Hr style={hrStyle} />
            </Section>

            {/* Recursos disponibles ahora */}
            <Section style={{ padding: "0 40px 8px 40px" }}>
              <Text style={sectionLabelStyle}>✦ Disponible para ti ahora mismo</Text>

              {resources.map((r, i) => (
                <Section
                  key={i}
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: "10px",
                    border: "1px solid #282828",
                    padding: "18px 20px",
                    marginBottom: "12px",
                  }}
                >
                  <Row>
                    <Column style={{ width: "36px", verticalAlign: "top" }}>
                      <Text style={{ fontSize: "20px", margin: "0", lineHeight: "1" }}>{r.icon}</Text>
                    </Column>
                    <Column style={{ paddingLeft: "10px" }}>
                      <Text style={{ color: "#ffffff", fontSize: "14px", fontWeight: "700", margin: "0 0 4px 0" }}>
                        <a href={r.url} style={{ color: "#4ade80", textDecoration: "none" }}>{r.title}</a>
                      </Text>
                      <Text style={{ color: "#71717a", fontSize: "13px", margin: "0", lineHeight: "1.5" }}>
                        {r.desc}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              ))}
            </Section>

            {/* CTA principal */}
            <Section style={{ padding: "20px 40px 8px 40px", textAlign: "center" }}>
              <Button
                href="https://www.juanarangoecommerce.com/laboratorio"
                style={ctaButtonStyle}
              >
                Explorar el Laboratorio →
              </Button>
            </Section>

            {/* Divider */}
            <Section style={{ padding: "8px 40px 0 40px" }}>
              <Hr style={hrStyle} />
            </Section>

            {/* Micro-posicionamiento + CTA secundario */}
            <Section style={{ padding: "8px 40px 32px 40px" }}>
              <Text style={bodyTextStyle}>
                Si en algún momento quieres ver cómo esto se aplica a tu negocio
                específicamente —{" "}
                <a
                  href="https://www.juanarangoecommerce.com/nitro-strategy"
                  style={{ color: "#4ade80", textDecoration: "none" }}
                >
                  puedes agendar un diagnóstico gratuito aquí
                </a>
                . Sin compromiso.
              </Text>
            </Section>

            {/* Firma */}
            <Section style={{ padding: "0 40px 40px 40px" }}>
              <Hr style={hrStyle} />
              <Row style={{ marginTop: "20px" }}>
                <Column style={{ width: "46px", verticalAlign: "top" }}>
                  <Section
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#16a34a",
                      textAlign: "center",
                    }}
                  >
                    <Text style={{ color: "#050505", fontSize: "18px", fontWeight: "800", margin: "10px 0 0 0" }}>J</Text>
                  </Section>
                </Column>
                <Column style={{ paddingLeft: "12px" }}>
                  <Text style={{ color: "#ffffff", fontSize: "14px", fontWeight: "700", margin: "0 0 2px 0" }}>
                    Juan Arango
                  </Text>
                  <Text style={{ color: "#71717a", fontSize: "13px", margin: "0" }}>
                    Arquitecto de Infraestructura Digital & IA · Nitro Ecom
                  </Text>
                </Column>
              </Row>
              <Text style={{ ...bodyTextStyle, marginTop: "20px" }}>
                Si tienes cualquier pregunta, responde este correo directamente — lo leo yo.
                También puedes escribirme por{" "}
                <a href="https://wa.me/573146681896" style={{ color: "#4ade80", textDecoration: "none" }}>
                  WhatsApp (+57) 314 668 1896
                </a>
                .
              </Text>
            </Section>

            {/* Footer */}
            <Section style={footerSectionStyle}>
              <Text style={{ color: "#52525b", fontSize: "12px", margin: "0 0 6px 0" }}>
                © {new Date().getFullYear()} Nitro Ecom · Juan Arango
              </Text>
              <Text style={{ color: "#3f3f46", fontSize: "11px", margin: "0" }}>
                Recibiste este email porque te suscribiste en juanarangoecommerce.com
                {email && ` (${email})`}. Si no fuiste tú, puedes ignorarlo.
              </Text>
            </Section>

          </Container>
        </Section>

      </Body>
    </Html>
  );
};

// ─── ESTILOS ─────────────────────────────────────────────────────────────────
const fontStack = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#050505",
  margin: "0",
  padding: "0",
  fontFamily: fontStack,
};

const cardStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#111111",
  borderRadius: "16px",
  border: "1px solid #282828",
  overflow: "hidden",
};

const accentBarStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #16a34a 0%, #4ade80 50%, #16a34a 100%)",
  height: "4px",
  width: "100%",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(74, 222, 128, 0.1)",
  border: "1px solid rgba(74, 222, 128, 0.25)",
  borderRadius: "50px",
  padding: "6px 16px",
  marginBottom: "16px",
};

const badgeTextStyle: React.CSSProperties = {
  color: "#4ade80",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.1em",
  margin: "0",
};

const headingStyle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "26px",
  fontWeight: "800",
  lineHeight: "1.25",
  margin: "0 0 14px 0",
  letterSpacing: "-0.02em",
};

const subtitleStyle: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "15px",
  lineHeight: "1.65",
  margin: "0 0 8px 0",
};

const hrStyle: React.CSSProperties = {
  borderColor: "#282828",
  margin: "24px 0",
};

const sectionLabelStyle: React.CSSProperties = {
  color: "#4ade80",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.1em",
  margin: "0 0 16px 0",
};

const bodyTextStyle: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: "0",
};

const ctaButtonStyle: React.CSSProperties = {
  backgroundColor: "#4ade80",
  color: "#050505",
  fontSize: "14px",
  fontWeight: "700",
  borderRadius: "8px",
  padding: "13px 32px",
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "0.025em",
  fontFamily: fontStack,
};

const footerSectionStyle: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  borderTop: "1px solid #282828",
  padding: "24px 40px",
  textAlign: "center",
};

export default NewsletterWelcome;
