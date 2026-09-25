import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-session";

// Segunda barrera del panel para Server Actions y Route Handlers. El
// middleware ya cierra /admin, pero una acción no debe fiarse solo de eso.
export async function requireAdmin() {
  const store = await cookies();
  if (!(await verifyAdminToken(store.get(ADMIN_COOKIE)?.value))) {
    throw new Error("Sesión del panel vencida. Vuelve a entrar.");
  }
}

export async function isAdmin() {
  const store = await cookies();
  return verifyAdminToken(store.get(ADMIN_COOKIE)?.value);
}
