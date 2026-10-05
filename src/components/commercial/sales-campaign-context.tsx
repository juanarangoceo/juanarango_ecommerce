"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "nitro-sales-campaign-v1";
const MAX_AGE = 30 * 60 * 1000;
const KEYS = ["utm_source", "utm_campaign"] as const;

function currentCampaign(): URLSearchParams {
  const search = new URLSearchParams(window.location.search);
  const params = new URLSearchParams();
  for (const key of KEYS) {
    const value = search.get(key)?.replace(/[\r\n]/g, " ").slice(0, key === "utm_source" ? 80 : 120);
    if (value) params.set(key, value);
  }
  return params;
}

// Conservar solo etiquetas de campaña durante esta sesión de navegación.
// No guardar números, mensajes, datos de formularios ni identificadores de anuncios.
export function SalesCampaignContext() {
  const pathname = usePathname();
  useEffect(() => {
    const params = currentCampaign();
    if (!params.size) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ params: params.toString(), at: Date.now() }));
    } catch { /* El contacto también funciona sin almacenamiento. */ }
  }, [pathname]);
  return null;
}

export function readSalesCampaign(): URLSearchParams {
  const current = currentCampaign();
  if (current.size) return current;
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (typeof stored?.params === "string" && typeof stored.at === "number" && Date.now() - stored.at < MAX_AGE) {
      return new URLSearchParams(stored.params);
    }
  } catch { /* Sin campaña si el navegador bloquea almacenamiento. */ }
  return current;
}
