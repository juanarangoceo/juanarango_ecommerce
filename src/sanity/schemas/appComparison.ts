import { GenerateComparisonInput } from '../components/GenerateComparisonInput'

export default {
  name: 'appComparison',
  title: 'Comparación de Apps',
  type: 'document',
  icon: () => '⚔️',
  groups: [
    { name: 'apps', title: '📱 Apps a Comparar', default: true },
    { name: 'generated', title: '🤖 Contenido Generado' },
  ],
  fields: [
    // ===== APP SELECTION =====
    {
      name: 'generateTrigger',
      title: 'Generar Comparación',
      type: 'string',
      group: 'apps',
      components: {
        input: GenerateComparisonInput,
      },
    },
    {
      name: 'app1',
      title: 'App 1',
      type: 'reference',
      to: [{ type: 'appTool' }],
      group: 'apps',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'app2',
      title: 'App 2',
      type: 'reference',
      to: [{ type: 'appTool' }],
      group: 'apps',
      validation: (Rule: any) => Rule.required(),
    },

    // ===== GENERATED FIELDS =====
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'generated',
      description: 'Generado automáticamente por IA.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'generated',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Generado automáticamente.',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'generated',
      description: 'SEO meta description generada por IA.',
    },
    {
      name: 'introText',
      title: 'Texto Introductorio',
      type: 'text',
      rows: 3,
      group: 'generated',
      description: 'Introducción breve de la comparación.',
    },
    {
      name: 'app1Summary',
      title: 'Resumen App 1',
      type: 'text',
      rows: 3,
      group: 'generated',
    },
    {
      name: 'app2Summary',
      title: 'Resumen App 2',
      type: 'text',
      rows: 3,
      group: 'generated',
    },
    {
      name: 'app1BestFor',
      title: 'Ideal para (App 1)',
      type: 'string',
      group: 'generated',
    },
    {
      name: 'app2BestFor',
      title: 'Ideal para (App 2)',
      type: 'string',
      group: 'generated',
    },
    {
      name: 'content',
      title: 'Contenido (Markdown)',
      type: 'text',
      rows: 30,
      group: 'generated',
      description: 'Contenido de la comparación en markdown.',
    },
    {
      name: 'comparisonTable',
      title: 'Tabla Comparativa',
      type: 'array',
      group: 'generated',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'feature', title: 'Característica', type: 'string' },
            { name: 'app1Value', title: 'Valor App 1', type: 'string' },
            { name: 'app2Value', title: 'Valor App 2', type: 'string' },
          ],
          preview: {
            select: { title: 'feature', subtitle: 'app1Value' },
          },
        },
      ],
      description: 'Tabla comparativa estructurada.',
    },
    {
      name: 'verdict',
      title: 'Veredicto',
      type: 'text',
      rows: 5,
      group: 'generated',
      description: 'Conclusión y veredicto final.',
    },
    {
      name: 'faq',
      title: 'Preguntas Frecuentes',
      type: 'array',
      group: 'generated',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Pregunta', type: 'string' },
            { name: 'answer', title: 'Respuesta', type: 'text' },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      group: 'generated',
    },
  ],
  preview: {
    select: {
      title: 'title',
      app1: 'app1.appName',
      app2: 'app2.appName',
    },
    prepare({ title, app1, app2 }: any) {
      return {
        title: title || `${app1 || '?'} vs ${app2 || '?'}`,
        subtitle: `Comparación: ${app1 || '?'} vs ${app2 || '?'}`,
      }
    },
  },
}
