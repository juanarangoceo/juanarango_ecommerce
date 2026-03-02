import { NextResponse } from "next/server";

/**
 * Verifies that the request carries the correct internal API secret.
 * Used to protect admin/internal API routes from unauthorized access.
 *
 * Usage: const authError = requireInternalAuth(request);
 *        if (authError) return authError;
 */
export function requireInternalAuth(request: Request): NextResponse | null {
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    // Misconfiguration: fail closed (deny access) rather than open.
    console.error("❌ INTERNAL_API_SECRET is not set. Denying request.");
    return NextResponse.json(
      { error: "Server misconfiguration: authentication not configured." },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null; // Auth passed
}
