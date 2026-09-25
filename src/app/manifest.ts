import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Juan Arango · Nitro Ecom",
    short_name: "Nitro Ecom",
    description: "Nitro Complete: ventas por WhatsApp con IA y consultoría ecommerce para Colombia y Latinoamérica.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0D0B",
    theme_color: "#0B0D0B",
    lang: "es-CO",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
