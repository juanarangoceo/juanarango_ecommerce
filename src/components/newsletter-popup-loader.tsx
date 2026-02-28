"use client";

/**
 * Thin client wrapper to allow lazy-loading the NewsletterPopup
 * from a Server Component layout (ssr:false requires a Client Component boundary).
 */
import dynamic from "next/dynamic";

const NewsletterPopup = dynamic(
  () => import("@/components/newsletter-popup").then((m) => m.NewsletterPopup),
  { ssr: false }
);

export function NewsletterPopupLoader() {
  return <NewsletterPopup />;
}
