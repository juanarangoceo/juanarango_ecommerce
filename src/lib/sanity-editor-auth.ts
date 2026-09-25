import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

// Autenticación de las herramientas del Studio (/studio). Los botones envían el
// token de la sesión del usuario de Sanity y aquí se verifica contra la API del
// proyecto que pertenece a él. Así no hace falta ningún secreto en el cliente:
// un secreto con prefijo NEXT_PUBLIC_ queda publicado en el JavaScript del sitio.

export type SanityEditor = { id: string; name?: string; email?: string; roles: string[] };

const ALLOWED_ROLES = new Set(["administrator", "editor", "developer"]);
const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { editor: SanityEditor; expires: number }>();

function tokenFrom(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

type SanityMe = { id?: string; name?: string; email?: string; role?: string; roles?: { name?: string }[] };

async function fetchEditor(token: string): Promise<SanityEditor | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;
  const response = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) return null;
  const me = (await response.json()) as SanityMe;
  // Un usuario que no pertenece al proyecto no trae roles en este endpoint.
  const roles = [...(me.roles ?? []).map((role) => role.name ?? ""), me.role ?? ""].filter(Boolean);
  if (!me.id || !roles.some((role) => ALLOWED_ROLES.has(role))) return null;
  return { id: me.id, name: me.name, email: me.email, roles };
}

/**
 * Exige un usuario del proyecto de Sanity. Devuelve la respuesta de error o el
 * editor verificado.
 */
export async function requireSanityEditor(request: Request): Promise<{ error: NextResponse } | { editor: SanityEditor }> {
  const token = tokenFrom(request);
  if (!token) return { error: NextResponse.json({ error: "Inicia sesión en el Studio para usar esta herramienta." }, { status: 401 }) };

  const key = createHash("sha256").update(token).digest("hex");
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return { editor: cached.editor };

  try {
    const editor = await fetchEditor(token);
    if (!editor) return { error: NextResponse.json({ error: "Tu usuario no tiene acceso a esta herramienta." }, { status: 403 }) };
    cache.set(key, { editor, expires: Date.now() + CACHE_TTL_MS });
    return { editor };
  } catch (error) {
    console.error("[sanity-editor-auth] no se pudo verificar el usuario:", error);
    return { error: NextResponse.json({ error: "No pudimos verificar tu sesión. Intenta de nuevo." }, { status: 503 }) };
  }
}
