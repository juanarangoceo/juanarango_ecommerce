import type { WaStore } from "@/components/commercial/whatsapp-ui";

// Tiendas ficticias para las conversaciones ilustrativas. Cada una tiene su
// propio logo y producto para que los ejemplos no se repitan entre secciones.

function AlmaBotanicaLogo() {
  return (
    <svg viewBox="0 0 36 36" className="size-full" aria-hidden="true">
      <rect width="36" height="36" fill="#F1EADB" />
      <path d="M18 27c-5.5-3.2-7.4-9.6-3.9-15.4 5.8 1.4 8.6 7.6 3.9 15.4Z" fill="#5E7F4E" />
      <path d="M18 27c3.8-3 8.8-3.4 10-8.4-4.4-1.1-8.5 1.8-10 8.4Z" fill="#8FAE6B" />
      <path d="M18 27c-.6-4.6-1.7-9-3.9-15.4" stroke="#F1EADB" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function PasoUrbanoLogo() {
  return (
    <svg viewBox="0 0 36 36" className="size-full" aria-hidden="true">
      <rect width="36" height="36" fill="#141414" />
      <path d="M7 22.5c5.5-1 11.5-4.6 22-9.5" stroke="#FF6A13" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <text x="18" y="21" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="11" fill="#ffffff" letterSpacing="-0.5">PU</text>
    </svg>
  );
}

export function SerumArt() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-auto" aria-hidden="true">
      <ellipse cx="60" cy="84" rx="26" ry="3" fill="#000" opacity=".08" />
      <rect x="53" y="8" width="14" height="14" rx="3" fill="#2E2E2E" />
      <rect x="56" y="3" width="8" height="8" rx="4" fill="#3C3C3C" />
      <path d="M45 30c0-5 4-8 8-8h14c4 0 8 3 8 8v46c0 4-3 7-7 7H52c-4 0-7-3-7-7V30Z" fill="#E79A3B" />
      <path d="M49 30c0-3 2-5 5-5h3v56h-4c-2 0-4-2-4-4V30Z" fill="#fff" opacity=".22" />
      <rect x="48" y="44" width="24" height="22" rx="2" fill="#F7F1E6" />
      <text x="60" y="54" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="6.5" fill="#5E7F4E">VIT C</text>
      <text x="60" y="61.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.6" fill="#6b6b6b">15% · 30 ml</text>
    </svg>
  );
}

export function SneakerArt() {
  return (
    <svg viewBox="0 0 140 90" className="h-full w-auto" aria-hidden="true">
      <ellipse cx="70" cy="78" rx="52" ry="4" fill="#000" opacity=".08" />
      <path d="M20 66c0-9 3-20 10-26l14-10c4-3 9-2 12 1l6 7c6 6 15 9 24 10l26 4c9 1.5 14 7 14 14v4H20v-4Z" fill="#FFFFFF" stroke="#D8D8D8" strokeWidth="1.4" />
      <path d="M20 66h106v6c0 2-2 4-4 4H24c-2 0-4-2-4-4v-6Z" fill="#E9E9E9" />
      <path d="M52 50c12 8 34 11 54 9" stroke="#FF6A13" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M46 34l8 8M41 38l8 8M36 42l7 7" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export const almaBotanica: WaStore = { name: "Alma Botánica", logo: <AlmaBotanicaLogo /> };
export const pasoUrbano: WaStore = { name: "Paso Urbano", logo: <PasoUrbanoLogo /> };
