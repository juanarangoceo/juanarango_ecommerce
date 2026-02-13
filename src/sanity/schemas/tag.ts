import { defineField, defineType } from 'sanity'
import { GenerateTagInput } from '../components/GenerateTagInput'

export default defineType({
  name: 'tag',
  title: 'Etiqueta',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'aiGenerator',
        title: 'Generador AI',
        type: 'string', 
        components: {
            input: GenerateTagInput
        },
        description: 'Usa este botón para generar descripción y SEO automáticamente.'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'h1',
      title: 'H1 Personalizado (SEO)',
      type: 'string',
      description: 'Título principal de la página. Si se deja vacío, se usa el Nombre.',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Rica (Markdown)',
      type: 'text',
      rows: 15, 
      description: 'Texto introductorio con H2, listas, etc. (Soporta Markdown)',
    }),
    defineField({
      name: 'faq',
      title: 'Preguntas Frecuentes (FAQ Schema)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Pregunta' },
            { name: 'answer', type: 'text', title: 'Respuesta' }
          ]
        }
      ]
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Opcional)',
      type: 'string',
      description: 'Título personalizado para buscadores. Si se deja vacío, se genera automáticamente.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Opcional)',
      type: 'text',
      rows: 3,
      description: 'Meta descripción para buscadores.',
    }),
  ],
})
