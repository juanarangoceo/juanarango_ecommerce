import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente de servicio del CRM. Solo servidor: usa SUPABASE_SERVICE_ROLE_KEY.

let adminClient: SupabaseClient | null | undefined;

export function crmAdminClient(): SupabaseClient | null {
  if (adminClient !== undefined) return adminClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  adminClient = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return adminClient;
}
