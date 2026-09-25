// Atribución de campaña leída en el navegador para adjuntarla a un formulario.
// El servidor la vuelve a limpiar con `cleanAttribution`.

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"] as const;

export function readAttribution(placement?: string) {
  const params = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) attribution[key] = value;
  }
  attribution.landing_path = window.location.pathname;
  if (document.referrer && !document.referrer.startsWith(window.location.origin)) attribution.referrer = document.referrer;
  if (placement) attribution.placement = placement;
  return JSON.stringify(attribution);
}
