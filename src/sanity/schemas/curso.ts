import { Rule } from 'sanity'

export default {
  name: 'curso',
  title: 'Curso',
  type: 'document',
  groups: [
    { name: 'info', title: '✏️ Información Principal', default: true },
    { name: 'precio', title: '💰 Precio y Acceso' },
    { name: 'publicacion', title: '🚀 Publicación' },
  ],
  fields: [
    // --- GRUPO: INFO ---
    {
      name: 'titulo',
      title: 'Título del Curso',
      type: 'string',
      group: 'info',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'info',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'descripcionCorta',
      title: 'Descripción Corta',
      type: 'string',
      group: 'info',
      description: 'Aparece en la tarjeta del curso.',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'descripcionLarga',
      title: 'Descripción Larga',
      type: 'text',
      group: 'info',
      description: 'Aparece en la página de detalle del curso.',
    },
    {
      name: 'imagen',
      title: 'Imagen (Thumbnail)',
      type: 'image',
      group: 'info',
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'categoria',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'info',
      options: {
        list: [
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'IA y Automatización', value: 'ia-automatizacion' },
          { title: 'Headless Commerce', value: 'headless-commerce' },
          { title: 'Diseño', value: 'diseno' },
          { title: 'Ventas', value: 'ventas' },
        ],
      },
    },
    {
      name: 'temario',
      title: '¿Qué aprenderás?',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'info',
      description: 'Lista de los puntos clave del curso. Aparecerán listados en la UI.',
    },
    {
      name: 'tiempoEstudio',
      title: 'Tiempo de Estudio',
      type: 'string',
      group: 'info',
      description: 'Ej: "8 horas", "4 semanas", etc.',
    },
    {
      name: 'nivel',
      title: 'Nivel',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Principiante', value: 'principiante' },
          { title: 'Intermedio', value: 'intermedio' },
          { title: 'Avanzado', value: 'avanzado' },
          { title: 'Todos los niveles', value: 'todos' }
        ],
      },
    },

    // --- GRUPO: PRECIO ---
    {
      name: 'esPago',
      title: '¿Es de Pago?',
      type: 'boolean',
      group: 'precio',
      initialValue: true,
    },
    {
      name: 'precio',
      title: 'Precio (USD)',
      type: 'number',
      group: 'precio',
      hidden: ({ document }: any) => !document?.esPago,
    },
    {
      name: 'precioAnterior',
      title: 'Precio Anterior (USD)',
      type: 'number',
      group: 'precio',
      description: 'Se mostrará tachado para indicar descuento.',
      hidden: ({ document }: any) => !document?.esPago,
    },
    {
      name: 'urlLanding',
      title: 'URL de la Landing Page',
      type: 'url',
      group: 'precio',
      description: 'Opcional. Si el curso tiene una landing page externa o separada, enlaza aquí.',
    },

    // --- GRUPO: PUBLICACION ---
    {
      name: 'estado',
      title: 'Estado del Curso',
      type: 'string',
      group: 'publicacion',
      options: {
        list: [
          { title: 'Disponible', value: 'disponible' },
          { title: 'Próximamente', value: 'proximamente' },
          { title: 'Borrador', value: 'borrador' }
        ],
      },
      initialValue: 'borrador',
      validation: (Rule: Rule) => Rule.required(),
      description: 'Controla si el curso se ve disponible para comprar, en lista de espera (próximamente) u oculto (borrador).',
    },
    {
      name: 'fechaLanzamiento',
      title: 'Fecha de Lanzamiento',
      type: 'datetime',
      group: 'publicacion',
      hidden: ({ document }: any) => document?.estado !== 'proximamente',
      description: 'Visible solo si el curso está "Próximamente". (Opcional)',
    },
    {
      name: 'orden',
      title: 'Orden Manual',
      type: 'number',
      group: 'publicacion',
      description: 'Menor número = aparecerá primero.',
      initialValue: 99,
    },
    {
      name: 'destacado',
      title: '¿Destacar Curso?',
      type: 'boolean',
      group: 'publicacion',
      initialValue: false,
      description: 'Si es true, se mostrará más grande o con un estilo especial en la página.',
    },
  ],
  orderings: [
    {
      title: 'Orden Manual',
      name: 'ordenAsc',
      by: [{ field: 'orden', direction: 'asc' }],
    },
    {
      title: 'Últimos Creados',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    }
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'estado',
      media: 'imagen'
    },
    prepare({ title, subtitle, media }: any) {
      const stateLabels: Record<string, string> = {
        disponible: '🟢 Disponible',
        proximamente: '⏳ Próximamente',
        borrador: '⚪ Borrador'
      }
      return {
        title: title || 'Sin Nombre',
        subtitle: subtitle ? stateLabels[subtitle] || subtitle : 'Sin Estado',
        media
      }
    }
  }
}
