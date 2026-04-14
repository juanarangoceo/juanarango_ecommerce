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
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
    // --- Dedicated Page Block ---
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Headline for the dedicated page.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      description: "Introductory text for the dedicated page.",
    }),
    defineField({
      name: "whatYouGet",
      title: "What You Get (Features)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "icon", title: "Icon (Lucide name)", type: "string", description: "e.g., Zap, Smartphone, Calendar" }
          ]
        }
      ]
    }),
    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "text",
      description: "Who is this service for?",
    }),
    defineField({
      name: "pageImage",
      title: "Page Image",
      type: "image",
      options: { hotspot: true },
      description: "Image for the top of the dedicated page.",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "text",
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
