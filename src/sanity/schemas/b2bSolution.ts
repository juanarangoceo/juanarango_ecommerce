import { defineField, defineType } from "sanity";
import { Briefcase } from "lucide-react"; 

export default defineType({
  name: "b2bSolution",
  title: "B2B Solutions (Micro-services)",
  type: "document",
  icon: Briefcase as any,
  fields: [
    // --- Card Block (Hub) ---
    defineField({
      name: "title",
      title: "Title (Service Name)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Enlace de Destino (URL interna o externa)",
      type: "string",
      description: "Ej: /soluciones/nitro-retail o https://tu-sitio.com",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "niche",
      title: "Niche/Category Badge",
      type: "string",
      description: "e.g., CLINICS, RETAIL, REAL ESTATE",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true },
      description: "Image to show on the card.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardDescription",
      title: "Card Description",
      type: "text",
      description: "Short description visible on the card.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      options: {
        list: [
          { title: "Emerald", value: "emerald" },
          { title: "Blue", value: "blue" },
          { title: "Orange", value: "orange" },
          { title: "Violet", value: "violet" },
          { title: "Rose", value: "rose" },
          { title: "Amber", value: "amber" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      description: "Text for the call to action button.",
      initialValue: "Explorar Solución",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Turn on/off without deleting.",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Highlight with recommended badge.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Order priority in the list (lower number comes first).",
      initialValue: 50,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "niche",
      media: "cardImage",
    },
  },
});
