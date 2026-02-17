import { defineField, defineType } from "sanity";
import { Megaphone } from "lucide-react"; // Using lucide icon if available or just text preview

export default defineType({
  name: "advertising",
  title: "Publicidad (In-Post)",
  type: "document",
  icon: Megaphone as any, // Type cast if needed
  fields: [
    defineField({
      name: "title",
      title: "Título Interno",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desktopImage",
      title: "Imagen Desktop",
      type: "image",
      options: { hotspot: true },
      description: "Imagen para pantallas grandes (PC/Tablet). Recomendado: Horizontal ancho.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Imagen Móvil",
      type: "image",
      options: { hotspot: true },
      description: "Imagen para celulares. Recomendado: Cuadrada o vertical.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Enlace de Destino (Afiliado)",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "targetPosts",
      title: "Mostrar en estos Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      description: "Selecciona los artículos donde quieres que aparezca esta publicidad.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "desktopImage",
    },
  },
});
