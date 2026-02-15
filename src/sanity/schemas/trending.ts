import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'trending',
  title: 'Temas en Tendencia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno',
      type: 'string',
      description: 'Solo para identificar la lista en el estudio (ej: "Tendencias Febrero 2026")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Activo',
      type: 'boolean',
      description: 'Si está activo, este será el bloque de tendencias que se mostrará en el blog. (Si hay varios activos, se usará el más reciente)',
      initialValue: true,
    }),
    defineField({
      name: 'items',
      title: 'Temas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'topic',
              title: 'Nombre del Tema',
              type: 'string',
              description: 'El texto que se mostrará como tendencia (ej: "IA en Retail")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'post',
              title: 'Artículo Relacionado',
              type: 'reference',
              to: { type: 'post' },
              description: 'El artículo al que dirigirá este tema',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'topic',
              subtitle: 'post.title',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title,
        subtitle: isActive ? '🟢 Activo' : '⚪ Inactivo',
      }
    },
  },
})
