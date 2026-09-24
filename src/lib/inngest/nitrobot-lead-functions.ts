import { inngest } from "@/lib/inngest/client"
import { NitroBotIntakeError, sendNitroBotLead } from "@/lib/nitrobot-intake"
import type { NitroBotLeadPayload } from "@/lib/nitrobot-lead"

type RetryEvent = {
  payload: NitroBotLeadPayload
  idempotencyKey: string
  lastError?: string
}

export const nitroBotLeadRetry = inngest.createFunction(
  {
    id: "nitrobot-lead-retry",
    retries: 7,
    concurrency: { limit: 3 },
    idempotency: "event.data.idempotencyKey",
    triggers: [{ event: "nitrobot/lead.retry" }],
  },
  async ({ event, step }: { event: { data: RetryEvent }; step: any }) => {
    return step.run("deliver-nitrobot-lead", async () => {
      try {
        const result = await sendNitroBotLead(event.data.payload, event.data.idempotencyKey)
        return { delivered: true, leadId: result.leadId }
      } catch (error) {
        if (error instanceof NitroBotIntakeError && !error.retryable) {
          return { delivered: false, terminal: true, reason: error.message }
        }
        throw error
      }
    })
  },
)
