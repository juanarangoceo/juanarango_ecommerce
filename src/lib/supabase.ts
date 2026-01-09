import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // En build time (o local sin .env), esto puede faltar. 
  // No lanzamos error fatal para permitir que el build de Next.js termine, 
  // pero la app fallará en runtime si no están configuradas en Vercel.
  console.warn("⚠️ ADVERTENCIA: Faltan variables de entorno de Supabase (URL o Anon Key).")
}

// Fallback para evitar crash en build si las vars son undefined
const validSupabaseUrl = supabaseUrl || 'https://placeholder.supabase.co'
const validSupabaseAnonKey = supabaseAnonKey || 'placeholder-key'

// CLIENTE: Seguro para usar en el frontend (Browser)
export const supabaseClient = createClient(validSupabaseUrl, validSupabaseAnonKey)

// ADMIN: Solo para usar en el Server
// Usa la Service Role Key.
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(validSupabaseUrl, supabaseServiceKey)
  : undefined
