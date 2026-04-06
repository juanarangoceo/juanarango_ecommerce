import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'

// ── Types ──────────────────────────────────────────────────────────────────

interface SummarySection {
  heading: string
  bullets: string[]
}

export interface BlogSummaryPdfProps {
  postTitle: string
  postSlug: string
  postCategory?: string
  publishedAt?: string
  author?: string
  summary: {
    intro: string
    sections: SummarySection[]
    conclusion: string
    keyTakeaways: string[]
  }
}

// ── Font Registration ────────────────────────────────────────────────────────
// Using system fonts to avoid network calls during serverless execution
Font.registerHyphenationCallback((word) => [word])

// ── Brand Colors ────────────────────────────────────────────────────────────
const COLORS = {
  background: '#050505',
  card: '#111111',
  cardLight: '#1a1a1a',
  border: '#282828',
  green: '#4ade80',
  greenDim: '#16a34a',
  white: '#ffffff',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
  zinc600: '#52525b',
  zinc800: '#27272a',
} as const

// ── Styles ■─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.background,
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 0,
    fontFamily: 'Helvetica',
  },

  // ── Header band ────────────────────────────────────────────────────────
  headerBand: {
    height: 5,
    backgroundColor: COLORS.green,
    marginBottom: 0,
  },

  headerSection: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 48,
    paddingVertical: 36,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
  },

  logoSubtext: {
    color: COLORS.green,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 2,
  },

  headerRight: {
    alignItems: 'flex-end',
  },

  headerBadge: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  headerBadgeText: {
    color: COLORS.green,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.5,
  },

  headerDate: {
    color: COLORS.zinc500,
    fontSize: 10,
    marginTop: 6,
    textAlign: 'right',
  },

  // ── Title section ─────────────────────────────────────────────────────
  titleSection: {
    paddingHorizontal: 48,
    paddingTop: 36,
    paddingBottom: 32,
  },

  postLabel: {
    color: COLORS.zinc500,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },

  postTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.3,
    letterSpacing: -0.5,
    marginBottom: 16,
  },

  accentLine: {
    height: 3,
    backgroundColor: COLORS.green,
    width: 48,
    borderRadius: 2,
    marginBottom: 20,
  },

  introParagraph: {
    color: COLORS.zinc400,
    fontSize: 12,
    lineHeight: 1.75,
    fontFamily: 'Helvetica',
  },

  // ── Key Takeaways ─────────────────────────────────────────────────────
  takeawaysBox: {
    marginHorizontal: 48,
    marginBottom: 28,
    backgroundColor: COLORS.cardLight,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.green,
    padding: 20,
  },

  takeawaysLabel: {
    color: COLORS.green,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    marginBottom: 14,
  },

  takeawayRow: {
    flexDirection: 'row',
    marginBottom: 9,
    alignItems: 'flex-start',
  },

  takeawayBullet: {
    color: COLORS.green,
    fontSize: 14,
    lineHeight: 1,
    marginRight: 8,
    marginTop: -1,
    fontFamily: 'Helvetica-Bold',
  },

  takeawayText: {
    color: COLORS.white,
    fontSize: 11,
    lineHeight: 1.55,
    flex: 1,
    fontFamily: 'Helvetica',
  },

  // ── Section divider ───────────────────────────────────────────────────
  divider: {
    marginHorizontal: 48,
    marginBottom: 28,
    height: 1,
    backgroundColor: COLORS.border,
  },

  // ── Content sections ──────────────────────────────────────────────────
  contentSection: {
    marginHorizontal: 48,
    marginBottom: 24,
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionHeadingDot: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.green,
    borderRadius: 3,
    marginRight: 10,
  },

  sectionHeading: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.2,
    flex: 1,
  },

  bulletRow: {
    flexDirection: 'row',
    marginBottom: 7,
    paddingLeft: 16,
    alignItems: 'flex-start',
  },

  bulletArrow: {
    color: COLORS.zinc500,
    fontSize: 10,
    marginRight: 8,
    marginTop: 2,
    fontFamily: 'Helvetica',
  },

  bulletText: {
    color: COLORS.zinc400,
    fontSize: 11,
    lineHeight: 1.6,
    flex: 1,
    fontFamily: 'Helvetica',
  },

  // ── Conclusion ────────────────────────────────────────────────────────
  conclusionBox: {
    marginHorizontal: 48,
    marginBottom: 36,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
  },

  conclusionLabel: {
    color: COLORS.green,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    marginBottom: 10,
  },

  conclusionText: {
    color: COLORS.zinc400,
    fontSize: 12,
    lineHeight: 1.75,
    fontFamily: 'Helvetica',
  },

  // ── Footer ────────────────────────────────────────────────────────────
  footer: {
    marginHorizontal: 48,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerLeft: {
    flex: 1,
  },

  footerBrand: {
    color: COLORS.white,
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },

  footerUrl: {
    color: COLORS.zinc500,
    fontSize: 10,
  },

  footerRight: {
    alignItems: 'flex-end',
  },

  footerLabel: {
    color: COLORS.zinc600,
    fontSize: 9,
    letterSpacing: 0.5,
  },

  footerGreen: {
    color: COLORS.green,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
  },
})

// ── Helper ─────────────────────────────────────────────────────────────────

function formatDate(isoString?: string): string {
  if (!isoString) return new Date().toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  return new Date(isoString).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// ── Component ───────────────────────────────────────────────────────────────

export function BlogSummaryPdf({
  postTitle,
  postSlug,
  postCategory,
  publishedAt,
  author = 'Juan Arango',
  summary,
}: BlogSummaryPdfProps) {
  const postUrl = postCategory
    ? `juanarangoecommerce.com/blog/${postCategory}/${postSlug}`
    : `juanarangoecommerce.com/blog/${postSlug}`

  return (
    <Document
      title={`Resumen: ${postTitle}`}
      author={author}
      creator="Nitro Ecom — juanarangoecommerce.com"
      producer="React PDF"
    >
      <Page size="A4" style={styles.page}>

        {/* GREEN ACCENT BAR */}
        <View style={styles.headerBand} />

        {/* HEADER */}
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.logoText}>NITRO ECOM</Text>
            <Text style={styles.logoSubtext}>JUANARANGOECOMMERCE.COM</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>RESUMEN EN PDF</Text>
            </View>
            <Text style={styles.headerDate}>{formatDate(publishedAt)}</Text>
          </View>
        </View>

        {/* POST TITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.postLabel}>ARTÍCULO DEL BLOG</Text>
          <Text style={styles.postTitle}>{postTitle}</Text>
          <View style={styles.accentLine} />
          <Text style={styles.introParagraph}>{summary.intro}</Text>
        </View>

        {/* KEY TAKEAWAYS */}
        {summary.keyTakeaways.length > 0 && (
          <View style={styles.takeawaysBox}>
            <Text style={styles.takeawaysLabel}>★  PUNTOS CLAVE</Text>
            {summary.keyTakeaways.map((item, i) => (
              <View key={i} style={styles.takeawayRow}>
                <Text style={styles.takeawayBullet}>→</Text>
                <Text style={styles.takeawayText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SECTION DIVIDER */}
        <View style={styles.divider} />

        {/* CONTENT SECTIONS */}
        {summary.sections.map((section, i) => (
          <View key={i} style={styles.contentSection} wrap={false}>
            <View style={styles.sectionHeadingRow}>
              <View style={styles.sectionHeadingDot} />
              <Text style={styles.sectionHeading}>{section.heading}</Text>
            </View>
            {section.bullets.map((bullet, j) => (
              <View key={j} style={styles.bulletRow}>
                <Text style={styles.bulletArrow}>›</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* CONCLUSION */}
        {summary.conclusion && (
          <View style={styles.conclusionBox} wrap={false}>
            <Text style={styles.conclusionLabel}>◆  CONCLUSIÓN</Text>
            <Text style={styles.conclusionText}>{summary.conclusion}</Text>
          </View>
        )}

        {/* FOOTER */}
        <View style={styles.footer} fixed>
          <View style={styles.footerLeft}>
            <Text style={styles.footerBrand}>Juan Arango · Nitro Ecom</Text>
            <Text style={styles.footerUrl}>{postUrl}</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerLabel}>Generado por</Text>
            <Text style={styles.footerGreen}>juanarangoecommerce.com</Text>
          </View>
        </View>

      </Page>
    </Document>
  )
}
