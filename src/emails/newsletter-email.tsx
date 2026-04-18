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
  Tailwind,
} from '@react-email/components'
import * as React from 'react'

// ─── Props ────────────────────────────────────────────────────────────────────
export interface NewsletterEmailProps {
  /** Título/asunto del newsletter */
  title: string
  /** Texto de preview (aparece debajo del asunto en clientes de email) */
  previewText?: string
  /** Contenido HTML convertido desde Portable Text */
  contentHtml: string
  /** Nombre del suscriptor (opcional) */
  firstName?: string
  /** Texto del botón CTA (opcional) */
  ctaText?: string
  /** URL del botón CTA (opcional) */
  ctaUrl?: string
  /** URL de desuscripción */
  unsubscribeUrl?: string
}

// ─── Defaults para preview en react-email dev server ─────────────────────────
const defaultProps: NewsletterEmailProps = {
  title: 'Cómo usar Claude Code para escalar tu tienda en 48 horas',
  previewText: 'La estrategia exacta que usamos con un cliente para pasar de 0 a 120 pedidos.',
  contentHtml: `
    <p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 16px 0;">
      Esta semana trabajé con una tienda de ropa que llevaba 6 meses estancada en 15 pedidos al mes.
      Implementamos Claude Code + automatización de catálogo y en 48 horas el número cambió.
    </p>
    <h2 style="color:#ffffff;font-size:22px;font-weight:700;margin:24px 0 12px 0;">El problema real</h2>
    <p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 16px 0;">
      No era el producto ni el precio. Era la velocidad de iteración. Cuando tu equipo tarda 2 semanas
      en implementar un cambio de copy, <strong style="color:#ffffff;">pierdes el timing del mercado</strong>.
    </p>
  `,
  firstName: 'Carlos',
  ctaText: 'Ver el análisis completo →',
  ctaUrl: 'https://www.juanarangoecommerce.com/laboratorio',
  unsubscribeUrl: 'https://www.juanarangoecommerce.com/api/newsletter-unsubscribe?email=test@test.com',
}

// ─── Component ────────────────────────────────────────────────────────────────
export const NewsletterEmail = ({
  title = defaultProps.title,
  previewText = defaultProps.previewText,
  contentHtml = defaultProps.contentHtml,
  firstName,
  ctaText,
  ctaUrl,
  unsubscribeUrl = defaultProps.unsubscribeUrl,
}: NewsletterEmailProps) => {
  const currentYear = new Date().getFullYear()
  const greeting = firstName ? `Hola ${firstName}` : 'Hola'

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#4ade80',
              'brand-dark': '#16a34a',
              surface: '#111111',
              'surface-2': '#1a1a1a',
              border: '#282828',
              muted: '#71717a',
              subtle: '#a1a1aa',
              base: '#050505',
            },
          },
        },
      }}
    >
      <Html lang="es">
        <Head />
        {previewText && <Preview>{previewText}</Preview>}

        <Body style={bodyStyle}>
          {/* Outer wrapper */}
          <Section style={{ backgroundColor: '#050505', padding: '40px 16px' }}>
            <Container style={cardStyle}>

              {/* ── Accent bar ── */}
              <Section style={accentBarStyle} />

              {/* ── Header ── */}
              <Section style={{ padding: '40px 40px 0 40px', textAlign: 'center' }}>
                <Img
                  src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
                  width="80"
                  height="auto"
                  alt="Nitro Ecom"
                  style={{ margin: '0 auto 20px auto', borderRadius: '8px', display: 'block' }}
                />
                <Section style={badgeStyle}>
                  <Text style={badgeTextStyle}>✦ NITRO NEWSLETTER</Text>
                </Section>
              </Section>

              {/* ── Greeting + Title ── */}
              <Section style={{ padding: '24px 40px 0 40px' }}>
                <Text style={greetingStyle}>{greeting},</Text>
                <Heading style={headingStyle}>{title}</Heading>
              </Section>

              {/* ── Divider ── */}
              <Section style={{ padding: '0 40px' }}>
                <Hr style={hrStyle} />
              </Section>

              {/* ── Content (HTML from Portable Text) ── */}
              <Section style={{ padding: '0 40px' }}>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </Section>

              {/* ── CTA Button (optional) ── */}
              {ctaText && ctaUrl && (
                <Section style={{ padding: '24px 40px 8px 40px', textAlign: 'center' }}>
                  <Button href={ctaUrl} style={ctaButtonStyle}>
                    {ctaText}
                  </Button>
                </Section>
              )}

              {/* ── Divider ── */}
              <Section style={{ padding: '24px 40px 0 40px' }}>
                <Hr style={hrStyle} />
              </Section>

              {/* ── Signature ── */}
              <Section style={{ padding: '8px 40px 40px 40px' }}>
                <Row>
                  <Column style={{ width: '46px', verticalAlign: 'top' }}>
                    <Section
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#16a34a',
                        textAlign: 'center',
                      }}
                    >
                      <Text style={{ color: '#050505', fontSize: '18px', fontWeight: '800', margin: '10px 0 0 0' }}>
                        J
                      </Text>
                    </Section>
                  </Column>
                  <Column style={{ paddingLeft: '12px' }}>
                    <Text style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' }}>
                      Juan Arango
                    </Text>
                    <Text style={{ color: '#71717a', fontSize: '13px', margin: '0' }}>
                      Arquitecto de Infraestructura Digital &amp; IA · Nitro Ecom
                    </Text>
                  </Column>
                </Row>
                <Text style={{ ...bodyTextStyle, marginTop: '20px' }}>
                  Si tienes alguna pregunta, responde este correo directamente — lo leo yo.
                </Text>
              </Section>

              {/* ── Footer ── */}
              <Section style={footerStyle}>
                <Text style={{ color: '#52525b', fontSize: '12px', margin: '0 0 8px 0' }}>
                  © {currentYear} Nitro Ecom · Juan Arango Ecommerce
                </Text>
                <Text style={{ color: '#3f3f46', fontSize: '11px', margin: '0 0 8px 0' }}>
                  Recibiste este email porque te suscribiste en{' '}
                  <a href="https://www.juanarangoecommerce.com" style={{ color: '#52525b' }}>
                    juanarangoecommerce.com
                  </a>
                </Text>
                {unsubscribeUrl && (
                  <Text style={{ color: '#3f3f46', fontSize: '11px', margin: '0' }}>
                    <a
                      href={unsubscribeUrl}
                      style={{ color: '#52525b', textDecoration: 'underline' }}
                    >
                      Desuscribirme
                    </a>
                  </Text>
                )}
              </Section>

            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const fontStack = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#050505',
  margin: '0',
  padding: '0',
  fontFamily: fontStack,
}

const cardStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#111111',
  borderRadius: '16px',
  border: '1px solid #282828',
  overflow: 'hidden',
}

const accentBarStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #16a34a 0%, #4ade80 50%, #16a34a 100%)',
  height: '4px',
  width: '100%',
}

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'rgba(74, 222, 128, 0.08)',
  border: '1px solid rgba(74, 222, 128, 0.2)',
  borderRadius: '50px',
  padding: '5px 16px',
  marginBottom: '0',
}

const badgeTextStyle: React.CSSProperties = {
  color: '#4ade80',
  fontSize: '10px',
  fontWeight: '700',
  letterSpacing: '0.12em',
  margin: '0',
}

const greetingStyle: React.CSSProperties = {
  color: '#71717a',
  fontSize: '15px',
  margin: '0 0 6px 0',
  fontFamily: fontStack,
}

const headingStyle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '26px',
  fontWeight: '800',
  lineHeight: '1.25',
  margin: '0',
  letterSpacing: '-0.02em',
  fontFamily: fontStack,
}

const hrStyle: React.CSSProperties = {
  borderColor: '#282828',
  margin: '24px 0',
}

const bodyTextStyle: React.CSSProperties = {
  color: '#a1a1aa',
  fontSize: '14px',
  lineHeight: '1.7',
  margin: '0',
  fontFamily: fontStack,
}

const ctaButtonStyle: React.CSSProperties = {
  backgroundColor: '#4ade80',
  color: '#050505',
  fontSize: '14px',
  fontWeight: '700',
  borderRadius: '8px',
  padding: '14px 36px',
  textDecoration: 'none',
  display: 'inline-block',
  letterSpacing: '0.025em',
  fontFamily: fontStack,
}

const footerStyle: React.CSSProperties = {
  backgroundColor: '#0a0a0a',
  borderTop: '1px solid #1f1f1f',
  padding: '24px 40px',
  textAlign: 'center',
}

export default NewsletterEmail
