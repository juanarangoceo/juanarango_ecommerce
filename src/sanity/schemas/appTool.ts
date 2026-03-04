import { GenerateAppToolInput } from '../components/GenerateAppToolInput'

export default {
  name: 'appTool',
  title: 'App Tool',
  type: 'document',
  groups: [
    { name: 'manual', title: '✏️ Manual', default: true },
    { name: 'generated', title: '🤖 Generado por IA' },
    { name: 'config', title: '⚙️ Configuración' },
  ],
  fields: [
    // ===== MANUAL FIELDS =====
    {
      name: 'appName',
      title: 'Nombre de la App',
      type: 'string',
      group: 'manual',
      components: {
        input: GenerateAppToolInput,
      },
      description: 'Ingresa el nombre y la URL, luego presiona "Crear Contenido" para generar todo automáticamente.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'websiteUrl',
      title: 'URL del Sitio Web',
      type: 'url',
      group: 'manual',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'affiliateUrl',
      title: 'URL de Afiliado (Opcional)',
      type: 'url',
      group: 'manual',
      description: 'Si tienes un link de afiliado, colócalo aquí. Si no, se usará la URL principal.',
    },
    {
      name: 'logo',
      title: '🖼️ Logo de la App (Opcional)',
      type: 'image',
      group: 'manual',
      options: { hotspot: true },
      description: 'Sube el logo de la app. Si está disponible, reemplaza el ícono de color genérico.',
    },

    // ===== GENERATED FIELDS =====
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'generated',
      options: {
        source: 'appName',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Descripción Corta',
      type: 'string',
      group: 'generated',
      description: 'Generada automáticamente por IA.',
    },
    {
      name: 'longDescription',
      title: 'Descripción Larga',
      type: 'text',
      group: 'generated',
      rows: 5,
      description: 'Generada automáticamente por IA.',
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'generated',
      options: {
        list: [
          { title: 'Chatbots', value: 'chatbot' },
          { title: 'Escritura', value: 'writing' },
          { title: 'Imagen', value: 'image-gen' },
          { title: 'Video', value: 'video' },
          { title: 'Audio', value: 'audio' },
          { title: 'Código', value: 'coding' },
          { title: 'Productividad', value: 'productivity' },
          { title: 'Diseño', value: 'design' },
          { title: 'Marketing', value: 'marketing' },
        ],
      },
      description: 'Asignada automáticamente por IA.',
    },
    {
      name: 'pricing',
      title: 'Precio',
      type: 'string',
      group: 'generated',
      options: {
        list: [
          { title: 'Free', value: 'Free' },
          { title: 'Freemium', value: 'Freemium' },
          { title: 'Paid', value: 'Paid' },
        ],
      },
      description: 'Asignado automáticamente por IA.',
    },
    {
      name: 'priceDetail',
      title: 'Detalle de Precio',
      type: 'string',
      group: 'generated',
      description: 'Ej: "$20/mes", "Gratis", "Desde $9.99/mes". Generado por IA.',
    },
    {
      name: 'rating',
      title: 'Calificación (Estrellas)',
      type: 'number',
      group: 'generated',
      validation: (Rule: any) => Rule.min(0).max(5),
      description: 'Calificación de 0 a 5 estrellas. Asignada por IA.',
    },
    {
      name: 'features',
      title: 'Funcionalidades Principales',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'generated',
      description: 'Generadas automáticamente por IA.',
    },
    {
      name: 'pros',
      title: 'Ventajas',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'generated',
      description: 'Generadas automáticamente por IA.',
    },
    {
      name: 'cons',
      title: 'Desventajas',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'generated',
      description: 'Generadas automáticamente por IA.',
    },
    {
      name: 'platforms',
      title: 'Plataformas',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'generated',
      options: {
        layout: 'tags',
      },
      description: 'Ej: Web, iOS, Android, Desktop, API. Generadas por IA.',
    },
    {
      name: 'iconBg',
      title: 'Color de Fondo del Ícono',
      type: 'string',
      group: 'generated',
      description: 'Clase TailwindCSS, ej: bg-emerald-500. Asignado por IA.',
    },

    // ===== CONFIG FIELDS =====
    {
      name: 'rank',
      title: 'Ranking',
      type: 'number',
      group: 'config',
      description: 'Posición en la tabla de ranking. Menor número = más arriba.',
      initialValue: 99,
    },
    {
      name: 'isFeatured',
      title: '⭐ App Destacada',
      type: 'boolean',
      group: 'config',
      description: 'Aparecerá como app principal en el hero banner.',
      initialValue: false,
    },
    {
      name: 'isTrending',
      title: '🔥 Trending',
      type: 'boolean',
      group: 'config',
      description: 'Aparecerá en la sección de apps en tendencia.',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Ranking',
      name: 'rankAsc',
      by: [{ field: 'rank', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'appName',
      subtitle: 'category',
    },
    prepare({ title, subtitle }: any) {
      const categoryLabels: Record<string, string> = {
        chatbot: '💬 Chatbot',
        writing: '✍️ Escritura',
        'image-gen': '🖼️ Imagen',
        video: '🎬 Video',
        audio: '🎵 Audio',
        coding: '💻 Código',
        productivity: '⚡ Productividad',
        design: '🎨 Diseño',
        marketing: '📢 Marketing',
      }
      return {
        title: title || 'Sin nombre',
        subtitle: categoryLabels[subtitle] || subtitle || 'Sin categoría',
      }
    },
  },
}
