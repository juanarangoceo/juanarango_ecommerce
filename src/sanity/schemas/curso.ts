import { Rule } from 'sanity'

export default {
  name: 'curso',
  title: 'Curso',
  type: 'document',
  groups: [
    { name: 'info', title: '✏️ Información Principal', default: true },
    { name: 'media', title: '🎬 Video y Contenido' },
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
      description: 'Aparece en la tarjeta del curso como hook inicial.',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'descripcionLarga',
      title: 'Descripción Larga',
      type: 'text',
      group: 'info',
      description: 'Texto persuasivo y completo del curso. Usa saltos de línea para separar párrafos.',
    },
    {
      name: 'publicoObjetivo',
      title: '¿Para quién es?',
      type: 'text',
      group: 'info',
      rows: 3,
      description: 'Describe el perfil ideal del estudiante. Ej: "Para emprendedores digitales que..."',
    },
    {
      name: 'imagen',
      title: 'Imagen de Portada (Thumbnail)',
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
      title: '¿Qué aprenderás? (Beneficios clave)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'info',
      description: 'Lista de beneficios/puntos clave del curso. Aparecerán con checkmarks.',
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
          { title: 'Todos los niveles', value: 'todos' },
        ],
      },
    },

    // --- GRUPO: MEDIA ---
    {
      name: 'urlVideo',
      title: 'URL del Video de Presentación (Cloudinary)',
      type: 'url',
      group: 'media',
      description: 'Link directo al MP4 de Cloudinary. Se reproduce inline al hacer click en play.',
    },
    {
      name: 'contenido',
      title: 'Contenido del Curso (Módulos)',
      type: 'array',
      group: 'media',
      description: 'Lista de módulos. Cada módulo tiene un título y sus lecciones. Se muestra con efecto de bloqueo para generar curiosidad.',
      of: [
        {
          type: 'object',
          name: 'modulo',
          title: 'Módulo',
          fields: [
            {
              name: 'titulo',
              title: 'Título del Módulo',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'lecciones',
              title: 'Lecciones',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Lista de lecciones dentro de este módulo.',
            },
          ],
          preview: {
            select: { title: 'titulo' },
          },
        },
      ],
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
      name: 'valorTotal',
      title: 'Valor Total Real (Opcional)',
      type: 'number',
      group: 'precio',
      description: 'El precio total si se vendiera por separado (Value Stacking). Ej: 500.',
    },
    {
      name: 'sloganOferta',
      title: 'Slogan de Oferta Especial (Opcional)',
      type: 'string',
      group: 'precio',
      description: 'Slogan corto como "⭐ HOT SALE" o "🔥 BLACK FRIDAY" que acompaña al precio.',
    },
    {
      name: 'mensajeUrgencia',
      title: 'Banner de Urgencia (Opcional)',
      type: 'string',
      group: 'precio',
      description: 'Mensaje que aparece arriba del bloque de pago. Ej: "Precio con descuento disponible solo esta semana".',
    },
    {
      name: 'garantia',
      title: 'Garantía',
      type: 'string',
      group: 'precio',
      description: 'Ej: "Garantía de devolución de 7 días". Aparece junto al precio para generar confianza.',
    },
    {
      name: 'urlLanding',
      title: 'URL de Landing (legado)',
      type: 'url',
      group: 'precio',
      description: 'Campo heredado. Usa urlPago para el nuevo flujo.',
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
          { title: 'Borrador', value: 'borrador' },
        ],
      },
      initialValue: 'borrador',
      validation: (Rule: Rule) => Rule.required(),
      description: 'Controla si el curso se ve disponible para comprar, en lista de espera u oculto.',
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
      description: 'Si es true, se mostrará con estilo especial en la página.',
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
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'estado',
      media: 'imagen',
    },
    prepare({ title, subtitle, media }: any) {
      const stateLabels: Record<string, string> = {
        disponible: '🟢 Disponible',
        proximamente: '⏳ Próximamente',
        borrador: '⚪ Borrador',
      }
      return {
        title: title || 'Sin Nombre',
        subtitle: subtitle ? stateLabels[subtitle] || subtitle : 'Sin Estado',
        media,
      }
    },
  },
}
