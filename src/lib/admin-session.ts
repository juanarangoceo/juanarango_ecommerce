// Sesión del panel /admin: token firmado `v1.<expira>.<firma>` (HMAC-SHA256).
// Mismo patrón que el panel de Todópolis. La clave sale de ADMIN_SESSION_SECRET
// o, si no existe, de ADMIN_DASHBOARD_PASSWORD: cambiar la contraseña cierra
// todas las sesiones. Web Crypto para que sirva igual en middleware y en Node.
// Sin contraseña configurada el panel queda cerrado.

export const ADMIN_COOKIE = "jae_admin_session";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 24 * 14; // 14 días: es una app instalada en el celular

function secret(): string | null {
  const value = process.env.ADMIN_SESSION_SECRET?.trim() || process.env.ADMIN_DASHBOARD_PASSWORD?.trim();
  return value ? `jae-admin:${value}` : null;
}

async function hmac(key: string, data: string) {
  const cryptoKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** Compara sin filtrar por tiempo cuántos caracteres coincidieron. */
export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createAdminToken(now = Date.now()) {
  const key = secret();
  if (!key) return null;
  const exp = Math.floor(now / 1000) + ADMIN_SESSION_SECONDS;
  return `v1.${exp}.${await hmac(key, `v1.${exp}`)}`;
}

export async function verifyAdminToken(token: string | undefined | null, now = Date.now()) {
  const key = secret();
  if (!key || !token) return false;
  const [version, expRaw, signature] = token.split(".");
  const exp = Number(expRaw);
  if (version !== "v1" || !Number.isFinite(exp) || !signature) return false;
  if (exp * 1000 < now) return false;
  return safeEqual(signature, await hmac(key, `v1.${exp}`));
}

export async function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD?.trim();
  if (!expected || !candidate) return false;
  // Se comparan las firmas para que la longitud de la contraseña no se filtre.
  const [a, b] = await Promise.all([hmac("jae-admin-login", candidate), hmac("jae-admin-login", expected)]);
  return safeEqual(a, b);
}
