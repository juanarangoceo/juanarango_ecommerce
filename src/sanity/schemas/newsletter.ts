import { SendTestEmailButton } from '../components/SendTestEmailButton'
import { GenerateNewsletterFromPostButton } from '../components/GenerateNewsletterFromPostButton'

export default {
  name: 'newsletter',
  title: '📧 Newsletter',
  type: 'document',

  // ── Groups ──────────────────────────────────────────────────────────────────
  groups: [
    { name: 'content', title: '✏️ Contenido', default: true },
    { name: 'schedule', title: '📅 Programación' },
    { name: 'test', title: '🧪 Prueba de Envío' },
    { name: 'status', title: '📊 Estado de Envío' },
  ],

  fields: [
    // ── CONTENT GROUP ────────────────────────────────────────────────────────
    {
      name: 'sourcePost',
      title: 'Artículo Base (Opcional)',
      type: 'reference',
      to: [{ type: 'post' }],
      group: 'content',
      description: 'Selecciona un artículo del blog para generar el newsletter automáticamente con IA.',
    },
    {
      name: 'generateAction',
      title: 'Generador IA',
      type: 'string',
      group: 'content',
      components: {
        input: GenerateNewsletterFromPostButton,
      },
      hidden: ({ document }: any) => !document?.sourcePost,
    },
    {
      name: 'title',
      title: 'Asunto del Email (Subject)',
      type: 'string',
      description: 'Este texto aparecerá como asunto en la bandeja de entrada del suscriptor.',
      validation: (Rule: any) => Rule.required().min(5).max(80),
      group: 'content',
    },
    {
      name: 'previewText',
      title: 'Texto de Preview',
      type: 'string',
      description: 'Texto corto que aparece debajo del asunto en algunos clientes de email (max 90 chars).',
      validation: (Rule: any) => Rule.max(90),
      group: 'content',
    },
    {
      name: 'slug',
      title: 'Slug (ID único)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
      group: 'content',
    },
    {
      name: 'body',
      title: 'Contenido del Newsletter',
      type: 'array',
      group: 'content',
      of: [
        {
          title: 'Párrafo',
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule: any) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption (opcional)',
            },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: '📌 Callout Destacado',
          fields: [
            { name: 'emoji', title: 'Emoji', type: 'string' },
            { name: 'text', title: 'Texto', type: 'text', rows: 3 },
          ],
          preview: {
            select: { emoji: 'emoji', text: 'text' },
            prepare({ emoji, text }: any) {
              return { title: `${emoji || '📌'} ${text || ''}` }
            },
          },
        },
      ],
    },
    {
      name: 'ctaButton',
      title: '🔗 Botón CTA (opcional)',
      type: 'object',
      group: 'content',
      description: 'Botón de llamado a la acción principal del newsletter.',
      fields: [
        {
          name: 'text',
          title: 'Texto del Botón',
          type: 'string',
          placeholder: 'Ej: Ver el artículo completo →',
        },
        {
          name: 'url',
          title: 'URL del Botón',
          type: 'url',
          validation: (Rule: any) =>
            Rule.uri({ scheme: ['http', 'https'] }),
        },
      ],
    },

    // ── SCHEDULE GROUP ───────────────────────────────────────────────────────
    {
      name: 'scheduledFor',
      title: 'Programar para',
      type: 'datetime',
      group: 'schedule',
      description:
        'Fecha y hora de envío (UTC). El sistema revisará cada minuto y enviará automáticamente cuando llegue este momento.',
      options: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    },

    // ── TEST GROUP ───────────────────────────────────────────────────────────
    {
      name: 'testSend',
      title: '🧪 Envío de Prueba',
      type: 'string',
      group: 'test',
      components: {
        input: SendTestEmailButton,
      },
      // Este campo no almacena datos — es solo la UI del botón de prueba
      readOnly: false,
      hidden: false,
    },

    // ── STATUS GROUP ─────────────────────────────────────────────────────────
    {
      name: 'sendStatus',
      title: 'Estado de Envío',
      type: 'string',
      group: 'status',
      readOnly: true,
      initialValue: 'draft',
      options: {
        list: [
          { title: '📝 Borrador', value: 'draft' },
          { title: '⏳ Programado', value: 'scheduled' },
          { title: '🚀 Enviando', value: 'sending' },
          { title: '✅ Enviado', value: 'sent' },
          { title: '❌ Error', value: 'failed' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'sentAt',
      title: 'Enviado en',
      type: 'datetime',
      group: 'status',
      readOnly: true,
      description: 'Timestamp del momento en que se inició el envío.',
    },
    {
      name: 'recipientCount',
      title: 'Suscriptores alcanzados',
      type: 'number',
      group: 'status',
      readOnly: true,
      description: 'Cantidad de emails enviados en este batch.',
    },
  ],

  // ── Preview en el listado de Sanity Studio ──────────────────────────────
  preview: {
    select: {
      title: 'title',
      scheduledFor: 'scheduledFor',
      sendStatus: 'sendStatus',
    },
    prepare({ title, scheduledFor, sendStatus }: any) {
      const statusEmoji: Record<string, string> = {
        draft: '📝',
        scheduled: '⏳',
        sending: '🚀',
        sent: '✅',
        failed: '❌',
      }
      const emoji = statusEmoji[sendStatus] || '📧'
      const date = scheduledFor
        ? new Date(scheduledFor).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })
        : 'Sin fecha'
      return {
        title: `${emoji} ${title || 'Sin título'}`,
        subtitle: `${sendStatus?.toUpperCase()} · ${date}`,
      }
    },
  },
}
