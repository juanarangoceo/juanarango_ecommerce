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

interface NitroProposalEmailProps {
  prospectName: string;
  companyName?: string;
  sectorLabel?: string;
  websiteUrl?: string;
  headline: string;
  intro: string;
  hallazgoPrincipal: string;
  problemParagraph: string;
  solutionBullets: string[];
  urgencyLine?: string;
  ctaText: string;
  ctaUrl: string;
  ctaMessage: string;
}

export const NitroProposalEmail = ({
  prospectName = "Visionario",
  companyName = "tu empresa",
  sectorLabel = "Negocio Digital",
  websiteUrl,
  headline = "Tu plataforma tiene el potencial de convertirse en tu mejor vendedor",
  intro = "He revisado la estrategia digital actual de tu empresa y veo una oportunidad clara de escalamiento.",
  hallazgoPrincipal = "Tu plataforma actual está perdiendo leads calificados antes de que puedan contactarte.",
  problemParagraph = "Actualmente tu negocio funciona más como un escaparate que como un sistema activo de ventas.",
  solutionBullets = ["Captación Inteligente (IA)", "Seguimiento Automatizado", "Webs de Alto Rendimiento"],
  urgencyLine = "Cada semana sin este sistema es una semana de oportunidades perdidas.",
  ctaText = "VER DIAGNÓSTICO TÉCNICO",
  ctaUrl = "https://juanarangoecommerce.com",
  ctaMessage = "He preparado una demo técnica de cómo se vería tu negocio operando bajo el motor Nitro:",
}: NitroProposalEmailProps) => {
  const previewText = `Auditoría digital de ${companyName} — hay algo importante que debería ver.`;
  const displayUrl = websiteUrl
    ? websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  const bulletIcons = ["⚡", "🎯", "🚀"];

  return (
    <Html lang="es">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#09090b",
                accent: "#2563eb",
                muted: "#71717a",
                subtle: "#f4f4f5",
                border: "#e4e4e7",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-[#f0f0f0] my-auto mx-auto font-sans">
          <Container className="bg-white border border-solid border-[#e4e4e7] rounded-2xl my-[40px] mx-auto max-w-[560px] overflow-hidden shadow-sm">

            {/* ── TOP ACCENT BAR ── */}
            <Section className="bg-[#09090b] px-[32px] py-[20px]">
              <Row>
                <Column className="w-[130px]">
                  <Img
                    src="https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
                    width="100"
                    height="auto"
                    alt="Nitro Ecom"
                    className="rounded-sm"
                  />
                </Column>
                <Column align="right">
                  <Text className="text-[#a1a1aa] text-[11px] uppercase tracking-widest m-0 font-semibold">
                    {sectorLabel}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* ── MAIN BODY ── */}
            <Section className="px-[36px] pt-[32px] pb-[8px]">

              {/* Saludo */}
              <Text className="text-[#3f3f46] text-[16px] leading-[28px] mb-[4px]">
                Hola <strong className="text-[#09090b]">{prospectName}</strong>,
              </Text>

              {/* Intro */}
              <Text className="text-[#3f3f46] text-[16px] leading-[28px] mt-0">
                {displayUrl
                  ? <>He realizado una auditoría técnica automatizada sobre la infraestructura digital de <strong>{companyName}</strong> (<span className="text-[#2563eb]">{displayUrl}</span>). {intro}</>
                  : <>{intro}</>
                }
              </Text>

              {/* ── HALLAZGO BOX ── */}
              <Section className="border-l-4 border-solid border-[#2563eb] bg-[#eff6ff] rounded-r-xl my-[24px] px-[20px] py-[16px]">
                <Text className="text-[#1e3a8a] text-[11px] uppercase tracking-widest font-bold m-0 mb-[6px]">
                  Hallazgo Principal
                </Text>
                <Text className="text-[#1e40af] text-[15px] leading-[24px] font-medium m-0">
                  {hallazgoPrincipal}
                </Text>
              </Section>

              {/* Problem paragraph */}
              <Text className="text-[#3f3f46] text-[16px] leading-[28px]">
                {problemParagraph}
              </Text>

              {/* Divider text */}
              <Text className="text-[#09090b] text-[16px] leading-[28px] font-semibold">
                He desarrollado una arquitectura de alto rendimiento{" "}
                <span className="text-[#2563eb]">(Nitro Protocol)</span>{" "}
                que resuelve los 3 puntos críticos que frenan el crecimiento de{" "}
                <strong>{companyName}</strong>:
              </Text>

              {/* ── SOLUTION BULLETS ── */}
              <Section className="my-[16px]">
                {solutionBullets.map((bullet, i) => (
                  <Row key={i} className="mb-[12px]">
                    <Column className="w-[32px] align-top pt-[1px]">
                      <Text className="m-0 text-[18px]">{bulletIcons[i] ?? "✅"}</Text>
                    </Column>
                    <Column>
                      <Text className="text-[#09090b] text-[15px] leading-[24px] font-medium m-0">
                        {bullet}
                      </Text>
                    </Column>
                  </Row>
                ))}
              </Section>

              {/* Urgency line */}
              {urgencyLine && (
                <Section className="bg-[#fafafa] border border-solid border-[#e4e4e7] rounded-xl px-[20px] py-[14px] my-[20px]">
                  <Text className="text-[#52525b] text-[14px] leading-[22px] italic m-0">
                    ⏳ {urgencyLine}
                  </Text>
                </Section>
              )}

              {/* CTA message */}
              <Text className="text-[#3f3f46] text-[16px] leading-[28px]">
                {ctaMessage}
              </Text>
            </Section>

            {/* ── CTA BUTTON ── */}
            <Section className="px-[36px] pb-[32px] text-center">
              <Button
                className="bg-[#2563eb] text-white rounded-xl text-[15px] font-bold no-underline text-center px-0 py-[16px] block w-full"
                href={ctaUrl}
              >
                {ctaText}
              </Button>
            </Section>

            <Hr className="border border-solid border-[#e4e4e7] my-0 mx-0 w-full" />

            {/* ── FOOTER / FIRMA ── */}
            <Section className="px-[36px] py-[24px]">
              <Row>
                <Column>
                  <Text className="text-[#09090b] font-bold text-[15px] m-0">
                    Juan Arango
                  </Text>
                  <Text className="text-[#71717a] text-[13px] m-0 mt-[2px]">
                    Arquitecto de Sistemas de Alto Rendimiento
                  </Text>
                  <Text className="text-[#2563eb] text-[13px] m-0 mt-[2px] font-medium">
                    Nitro Ecom
                  </Text>
                </Column>
                <Column align="right" className="align-bottom">
                  <Text className="text-[#a1a1aa] text-[12px] m-0">
                    Responde este correo directamente
                  </Text>
                  <Text className="text-[#a1a1aa] text-[12px] m-0 mt-[2px]">
                    para agendar una sesión de 10 min.
                  </Text>
                </Column>
              </Row>
            </Section>

          </Container>

          {/* Legal footer */}
          <Text className="text-center text-[11px] text-[#a1a1aa] mt-2 mb-8 px-8">
            © 2026 Juan Arango · Nitro Ecom. Recibes este correo porque
            tu empresa fue identificada como candidato para nuestra
            infraestructura de alto rendimiento.
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NitroProposalEmail;
