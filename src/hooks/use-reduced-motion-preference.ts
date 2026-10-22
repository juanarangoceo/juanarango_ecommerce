"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const serverSnapshot = () => false;
const clientSnapshot = () => window.matchMedia(QUERY).matches;
function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** El primer render del navegador coincide con el HTML antes de aplicar la preferencia. */
export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}
