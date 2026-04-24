import { inngest } from '@/lib/inngest/client'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { render } from '@react-email/render'
import { NewsletterEmail } from '@/emails/newsletter-email'
import { toHTML } from '@portabletext/to-html'

const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Supabase Admin ─────────────────────────────────────────────────────────
const getSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

// ─── Sanity Write Client ────────────────────────────────────────────────────
const getSanityClient = async () => {
  const { createClient: createSanityClient } = await import('next-sanity')
  return createSanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })
}

// ─── Types ──────────────────────────────────────────────────────────────────
interface NewsletterDocument {
  _id: string
  title: string
  previewText?: string
  slug: string
  body: unknown[]
  ctaButton?: { text?: string; url?: string }
}

interface SendEmailPayload {
  newsletterId: string
  title: string
  previewText?: string
  contentHtml: string
  ctaButton?: { text?: string; url?: string }
  subscriber: {
    id: string
    email: string
    first_name?: string
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. CRON SCHEDULER — Revisa cada minuto si hay newsletters programados listos
// ═════════════════════════════════════════════════════════════════════════════
export const newsletterSchedulerCron = inngest.createFunction(
  {
    id: 'newsletter-scheduler-cron',
    triggers: [{ cron: '* * * * *' }], // Cada minuto
  },
  async ({ step }: { step: any }) => {
    const dueNewsletters = await step.run('find-due-newsletters', async () => {
      const { createClient: sc } = await import('next-sanity')
      const sanity = sc({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: '2024-01-01',
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
      })
      const now = new Date().toISOString()
      return sanity.fetch<NewsletterDocument[]>(
        `*[_type == "newsletter" && sendStatus == "scheduled" && scheduledFor <= $now]{
          _id, title, previewText, "slug": slug.current, body, ctaButton
        }`,
        { now }
      )
    })

    if (!dueNewsletters || dueNewsletters.length === 0) {
      return { triggered: 0, message: 'No newsletters due' }
    }

    await step.sendEvent(
      'trigger-newsletter-dispatch',
      dueNewsletters.map((nl: NewsletterDocument) => ({
        name: 'newsletter/dispatch',
        data: nl,
      }))
    )

    return { triggered: dueNewsletters.length }
  }
)

// ═════════════════════════════════════════════════════════════════════════════
// 2. ORCHESTRATOR — Obtiene suscriptores y fan-out
// ═════════════════════════════════════════════════════════════════════════════
export const newsletterOrchestrator = inngest.createFunction(
  {
    id: 'newsletter-orchestrator',
    triggers: [{ event: 'newsletter/dispatch' }],
    concurrency: {
      limit: 1,
      key: 'event.data._id',
    },
    idempotency: 'event.data._id',
  },
  async ({ event, step }: { event: any; step: any }) => {
    const newsletter = event.data as NewsletterDocument

    // 0. Validar idempotencia y concurrencia: si ya está 'sending' o 'sent', abortamos.
    // Esto evita duplicados si el Cron empujó múltiples eventos por retrasos.
    const isAlreadyProcessing = await step.run('check-status', async () => {
      const sanity = await getSanityClient()
      const doc = await sanity.fetch(`*[_id == $id][0]{sendStatus}`, { id: newsletter._id })
      return doc?.sendStatus === 'sending' || doc?.sendStatus === 'sent'
    })

    if (isAlreadyProcessing) {
      return { skipped: true, message: 'Newsletter ya estaba en proceso o enviado' }
    }

    // 1. Marcar como "sending" en Sanity
    await step.run('mark-as-sending', async () => {
      const sanity = await getSanityClient()
      await sanity
        .patch(newsletter._id)
        .set({ sendStatus: 'sending', sentAt: new Date().toISOString() })
        .commit()
    })

    // 2. Convertir Portable Text → HTML
    const contentHtml: string = await step.run('convert-body-to-html', async () => {
      if (!newsletter.body || newsletter.body.length === 0) return ''
      return toHTML(newsletter.body as any, {
        components: {
          types: {
            callout: ({ value }: any) =>
              `<div style="background:#1a2e1a;border-left:4px solid #4ade80;padding:16px 20px;margin:16px 0;border-radius:0 8px 8px 0;">
                <p style="margin:0;color:#e2e8f0;font-size:15px;">${value.emoji || '📌'} ${value.text || ''}</p>
              </div>`,
            image: ({ value }: any) => {
              if (!value?.asset?._ref) return ''
              const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
              const ref = value.asset._ref
                .replace('image-', '')
                .replace(/-(\w+)$/, '.$1')
                .replace(/-/g, '/')
              return `<img src="https://cdn.sanity.io/images/${projectId}/production/${ref}" alt="${value.alt || ''}" style="max-width:100%;border-radius:8px;margin:16px 0;" />`
            },
          },
          block: {
            h2: ({ children }: any) =>
              `<h2 style="color:#ffffff;font-size:22px;font-weight:700;margin:24px 0 12px 0;font-family:Inter,sans-serif;">${children}</h2>`,
            h3: ({ children }: any) =>
              `<h3 style="color:#ffffff;font-size:18px;font-weight:600;margin:20px 0 10px 0;font-family:Inter,sans-serif;">${children}</h3>`,
            normal: ({ children }: any) =>
              `<p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 16px 0;font-family:Inter,sans-serif;">${children}</p>`,
            blockquote: ({ children }: any) =>
              `<blockquote style="border-left:3px solid #4ade80;margin:16px 0;padding:12px 20px;color:#71717a;font-style:italic;">${children}</blockquote>`,
          },
          marks: {
            strong: ({ children }: any) => `<strong style="color:#ffffff;">${children}</strong>`,
            em: ({ children }: any) => `<em>${children}</em>`,
            code: ({ children }: any) =>
              `<code style="background:#1f1f1f;padding:2px 6px;border-radius:4px;font-family:monospace;color:#4ade80;font-size:13px;">${children}</code>`,
            link: ({ children, value }: any) =>
              `<a href="${value?.href || '#'}" style="color:#4ade80;text-decoration:underline;" target="_blank" rel="noopener noreferrer">${children}</a>`,
          },
        },
      })
    })

    // 3. Obtener suscriptores activos de Supabase
    const subscribers: Array<{ id: string; email: string; first_name?: string }> =
      await step.run('fetch-subscribers', async () => {
        const supabase = getSupabase()
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .select('id, email, first_name')
          .eq('unsubscribed', false)

        if (error) throw new Error(`Supabase error: ${error.message}`)
        return data || []
      })

    if (subscribers.length === 0) {
      await step.run('mark-no-subscribers', async () => {
        const sanity = await getSanityClient()
        await sanity.patch(newsletter._id).set({ sendStatus: 'sent', recipientCount: 0 }).commit()
      })
      return { sent: 0, message: 'No active subscribers' }
    }

    // 4. Fan-out: 1 evento por suscriptor
    await step.sendEvent(
      'fan-out-emails',
      subscribers.map((sub) => ({
        name: 'newsletter/send-email',
        data: {
          newsletterId: newsletter._id,
          title: newsletter.title,
          previewText: newsletter.previewText,
          contentHtml,
          ctaButton: newsletter.ctaButton,
          subscriber: { id: sub.id, email: sub.email, first_name: sub.first_name },
        } satisfies SendEmailPayload,
      }))
    )

    // 5. Marcar como sent con el conteo
    await step.run('mark-as-sent', async () => {
      const sanity = await getSanityClient()
      await sanity
        .patch(newsletter._id)
        .set({ sendStatus: 'sent', recipientCount: subscribers.length })
        .commit()
    })

    return { sent: subscribers.length }
  }
)

// ═════════════════════════════════════════════════════════════════════════════
// 3. EMAIL WORKER — Envía el email a un suscriptor individual (paralelo)
// ═════════════════════════════════════════════════════════════════════════════
export const newsletterEmailWorker = inngest.createFunction(
  {
    id: 'newsletter-send-email-worker',
    triggers: [{ event: 'newsletter/send-email' }],
    retries: 3,
  },
  async ({ event, step }: { event: any; step: any }) => {
    const { title, previewText, contentHtml, ctaButton, subscriber } =
      event.data as SendEmailPayload

    await step.run('send-email', async () => {
      const firstName = subscriber.first_name || deriveFirstName(subscriber.email)
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || 'https://www.juanarangoecommerce.com'
      const unsubscribeUrl = `${siteUrl}/api/newsletter-unsubscribe?email=${encodeURIComponent(
        subscriber.email
      )}`

      const html = await render(
        NewsletterEmail({
          title,
          previewText,
          contentHtml,
          ctaText: ctaButton?.text,
          ctaUrl: ctaButton?.url,
          firstName,
          unsubscribeUrl,
        })
      )

      const { error } = await resend.emails.send({
        from: 'Juan Arango <nitro@juanarangoecommerce.com>',
        to: subscriber.email,
        subject: title,
        html,
      })

      if (error) {
        throw new Error(`Resend error for ${subscriber.email}: ${error.message}`)
      }
    })

    return { email: subscriber.email, status: 'sent' }
  }
)

// ─── Helpers ─────────────────────────────────────────────────────────────────
function deriveFirstName(email: string): string | undefined {
  const alias = email.split('@')[0]
  const cleaned = alias
    .replace(/[._\-+0-9]/g, ' ')
    .trim()
    .split(' ')[0]
  if (cleaned.length > 2) {
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase()
  }
  return undefined
}
