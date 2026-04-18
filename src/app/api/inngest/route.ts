import { serve } from 'inngest/next'
import { inngest } from '@/lib/inngest/client'
import {
  newsletterSchedulerCron,
  newsletterOrchestrator,
  newsletterEmailWorker,
} from '@/lib/inngest/newsletter-functions'

export const maxDuration = 300 // 5 min para Vercel

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    newsletterSchedulerCron,
    newsletterOrchestrator,
    newsletterEmailWorker,
  ],
})
