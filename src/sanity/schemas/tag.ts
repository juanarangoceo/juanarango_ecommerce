import { defineField, defineType } from 'sanity'

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
      name: 'description',
      title: 'Descripción (IA)',
      type: 'text',
      description: 'Breve descripción generada por IA para la landing page de la etiqueta.',
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
