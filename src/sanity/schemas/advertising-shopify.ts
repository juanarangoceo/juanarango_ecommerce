import { defineField, defineType } from "sanity";
import { ShoppingBag } from "lucide-react"; 

export default defineType({
  name: "advertisingShopify",
  title: "Publicidad Shopify (/shopify)",
  type: "document",
  icon: ShoppingBag as any,
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
      description: "Imagen para pantallas grandes (PC/Tablet). Recomendado: 1456 x 180 px.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Imagen Móvil",
      type: "image",
      options: { hotspot: true },
      description: "Imagen para celulares. Recomendado: 672 x 560 px.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Enlace de Destino (Afiliado)",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "desktopImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Publicidad Shopify",
        subtitle: "Se muestra en /shopify",
        media,
      };
    },
  },
});
