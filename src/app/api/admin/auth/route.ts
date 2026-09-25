import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS, createAdminToken, passwordMatches } from "@/lib/admin-session";

// Entrada al panel /admin. La cookie lleva un token firmado y vive en `path=/`
// para que también la reciban las rutas /api/admin/crm/*.

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_DASHBOARD_PASSWORD?.trim()) {
    return NextResponse.json({ error: "El panel no está configurado (falta ADMIN_DASHBOARD_PASSWORD)." }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as { password?: unknown };
  const password = typeof body.password === "string" ? body.password : "";

  if (!(await passwordMatches(password))) {
    // Pausa corta: frena los intentos por fuerza bruta sin molestar a una persona.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const token = await createAdminToken();
  if (!token) return NextResponse.json({ error: "El panel no está configurado." }, { status: 503 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_SESSION_SECONDS,
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
