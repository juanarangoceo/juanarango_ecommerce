import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'audioResource',
  title: 'Recurso de Audio',
  type: 'document',
  fields: [
    defineField({
      name: 'post',
      title: 'Artículo de Blog',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
      description: 'El artículo al que pertenece este audio.',
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pending' },
          { title: 'Generando', value: 'generating' },
          { title: 'Completado', value: 'completed' },
          { title: 'Error', value: 'error' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'voice',
      title: 'Voz (OpenAI)',
      type: 'string',
      options: {
        list: [
          { title: 'Alloy (Neutra)', value: 'alloy' },
          { title: 'Echo (Masculina)', value: 'echo' },
          { title: 'Fable (Británica)', value: 'fable' },
          { title: 'Onyx (Profunda)', value: 'onyx' },
          { title: 'Nova (Femenina)', value: 'nova' },
          { title: 'Shimmer (Clara)', value: 'shimmer' },
        ],
      },
      initialValue: 'onyx',
    }),
    defineField({
      name: 'audioSegments',
      title: 'Segmentos de Audio (URLs)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista ordenada de URLs de los segmentos de audio generados.',
    }),
    defineField({
      name: 'generatedAt',
      title: 'Fecha de Generación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      postTitle: 'post.title',
      status: 'status',
    },
    prepare({ postTitle, status }) {
      const statusIcons: Record<string, string> = {
        pending: '⏳',
        generating: '⚙️',
        completed: '✅',
        error: '❌',
      }
      return {
        title: postTitle || 'Sin Asignar',
        subtitle: `Audio: ${statusIcons[status as string] || 'Unknown'} ${status}`,
      }
    },
  },
})
