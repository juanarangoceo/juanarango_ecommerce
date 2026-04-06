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
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface BlogSummaryEmailProps {
  postTitle: string;
  postSlug: string;
  postCategory?: string;
  recipientEmail?: string;
}

export const BlogSummaryEmail = ({
  postTitle = "Tu Post del Blog",
  postSlug = "mi-post",
  postCategory = "ecommerce",
  recipientEmail = "",
}: BlogSummaryEmailProps) => {
  const postUrl = postCategory
    ? `https://www.juanarangoecommerce.com/blog/${postCategory}/${postSlug}`
    : `https://www.juanarangoecommerce.com/blog/${postSlug}`;

  const previewText = `📄 Tu resumen de "${postTitle}" está listo — léelo cuando quieras`;

  return (
    <Html lang="es">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                nitro: "#050505",
                "nitro-card": "#111111",
                "nitro-border": "#282828",
                green: "#4ade80",
                "green-dim": "#16a34a",
              },
              fontFamily: {
                sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{previewText}</Preview>

        <Body style={{ backgroundColor: "#050505", margin: "0", padding: "0", fontFamily: "Inter, -apple-system, sans-serif" }}>

          {/* OUTER WRAPPER with subtle gradient */}
          <Section style={{ backgroundColor: "#050505", padding: "40px 16px" }}>

            <Container style={{
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor: "#111111",
              borderRadius: "16px",
              border: "1px solid #282828",
              overflow: "hidden",
            }}>

              {/* TOP ACCENT BAR */}
              <Section style={{
                background: "linear-gradient(90deg, #16a34a 0%, #4ade80 50%, #16a34a 100%)",
                height: "4px",
                width: "100%",
              }} />

              {/* HEADER */}
              <Section style={{ padding: "40px 40px 0px 40px", textAlign: "center" }}>
                <Img
                  src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
                  width="120"
                  height="auto"
                  alt="Nitro Ecom"
                  style={{ margin: "0 auto 24px auto", borderRadius: "8px", display: "block" }}
                />

                {/* PDF Icon badge */}
                <Section style={{
                  display: "inline-block",
                  backgroundColor: "rgba(74, 222, 128, 0.1)",
                  border: "1px solid rgba(74, 222, 128, 0.25)",
                  borderRadius: "50px",
                  padding: "6px 16px",
                  marginBottom: "20px",
                }}>
                  <Text style={{ color: "#4ade80", fontSize: "13px", fontWeight: "600", margin: "0", letterSpacing: "0.05em" }}>
                    📄 TU RESUMEN EN PDF
                  </Text>
                </Section>
              </Section>

              {/* HEADLINE */}
              <Section style={{ padding: "0 40px 0px 40px", textAlign: "center" }}>
                <Heading style={{
                  color: "#ffffff",
                  fontSize: "26px",
                  fontWeight: "800",
                  lineHeight: "1.25",
                  margin: "0 0 12px 0",
                  letterSpacing: "-0.02em",
                }}>
                  Tu resumen está listo 🎉
                </Heading>

                <Text style={{
                  color: "#a1a1aa",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  margin: "0 0 32px 0",
                }}>
                  Hemos generado un resumen profesional de{" "}
                  <span style={{ color: "#ffffff", fontWeight: "600" }}>"{postTitle}"</span>{" "}
                  especialmente para ti. Lo encontrarás adjunto a este correo.
                </Text>
              </Section>

              {/* DIVIDER */}
              <Section style={{ padding: "0 40px" }}>
                <Hr style={{ borderColor: "#282828", margin: "0 0 32px 0" }} />
              </Section>

              {/* WHAT'S INSIDE BOX */}
              <Section style={{ padding: "0 40px 32px 40px" }}>
                <Section style={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: "12px",
                  border: "1px solid #282828",
                  padding: "24px",
                }}>
                  <Text style={{
                    color: "#4ade80",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    margin: "0 0 16px 0",
                  }}>
                    ✦ Qué encontrarás en el PDF
                  </Text>

                  {[
                    "Los puntos clave del artículo sintetizados",
                    "Insights y estrategias accionables",
                    "Conclusiones y próximos pasos",
                  ].map((item, i) => (
                    <Row key={i} style={{ marginBottom: "10px" }}>
                      <Column style={{ width: "24px", verticalAlign: "top" }}>
                        <Text style={{ color: "#4ade80", fontSize: "14px", margin: "0", fontWeight: "700" }}>→</Text>
                      </Column>
                      <Column>
                        <Text style={{ color: "#d4d4d8", fontSize: "14px", margin: "0", lineHeight: "1.5" }}>{item}</Text>
                      </Column>
                    </Row>
                  ))}
                </Section>
              </Section>

              {/* CTA BUTTON */}
              <Section style={{ padding: "0 40px 32px 40px", textAlign: "center" }}>
                <Button
                  href={postUrl}
                  style={{
                    backgroundColor: "#4ade80",
                    color: "#050505",
                    fontSize: "14px",
                    fontWeight: "700",
                    borderRadius: "8px",
                    padding: "14px 32px",
                    textDecoration: "none",
                    display: "inline-block",
                    letterSpacing: "0.025em",
                  }}
                >
                  Leer el artículo completo →
                </Button>
                <Text style={{ color: "#52525b", fontSize: "12px", marginTop: "12px" }}>
                  ¿Quieres profundizar más? El artículo completo te espera.
                </Text>
              </Section>

              {/* DIVIDER */}
              <Section style={{ padding: "0 40px" }}>
                <Hr style={{ borderColor: "#282828", margin: "0 0 32px 0" }} />
              </Section>

              {/* ABOUT JUAN */}
              <Section style={{ padding: "0 40px 40px 40px" }}>
                <Row>
                  <Column style={{ width: "48px", verticalAlign: "top" }}>
                    <Section style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      backgroundColor: "#16a34a",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Text style={{ color: "#050505", fontSize: "18px", fontWeight: "800", margin: "10px 0 0 0" }}>J</Text>
                    </Section>
                  </Column>
                  <Column style={{ paddingLeft: "12px" }}>
                    <Text style={{ color: "#ffffff", fontSize: "14px", fontWeight: "700", margin: "0 0 2px 0" }}>
                      Juan Arango
                    </Text>
                    <Text style={{ color: "#71717a", fontSize: "13px", margin: "0" }}>
                      Estratega de Ecommerce & IA · Nitro Ecom
                    </Text>
                  </Column>
                </Row>

                <Text style={{
                  color: "#a1a1aa",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  marginTop: "20px",
                }}>
                  Espero que este resumen te sea útil. Si tienes alguna pregunta o quieres
                  implementar estas estrategias en tu negocio,{" "}
                  <a href="https://www.juanarangoecommerce.com" style={{ color: "#4ade80", textDecoration: "none" }}>
                    visítanos aquí
                  </a>.
                </Text>
              </Section>

              {/* FOOTER */}
              <Section style={{
                backgroundColor: "#0a0a0a",
                borderTop: "1px solid #282828",
                padding: "24px 40px",
                textAlign: "center",
              }}>
                <Text style={{ color: "#52525b", fontSize: "12px", margin: "0 0 8px 0" }}>
                  © 2025 Nitro Ecom · Juan Arango Ecommerce
                </Text>
                <Text style={{ color: "#3f3f46", fontSize: "11px", margin: "0" }}>
                  Recibiste este email porque lo solicitaste desde nuestro blog.
                  {recipientEmail && ` (${recipientEmail})`}
                </Text>
              </Section>

            </Container>
          </Section>

        </Body>
      </Tailwind>
    </Html>
  );
};

export default BlogSummaryEmail;
