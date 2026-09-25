-- Retira las tablas que el sitio ya no usa (25-09-2026).
--
-- APLICAR SOLO DESPUÉS de desplegar el código que escribe en `contacts` y de
-- volver a correr 20260925120100_crm_import_legacy.sql (recoge lo que haya
-- entrado a las tablas viejas entre la importación y el despliegue).
--
-- `prospects` se elimina sin importar por decisión del usuario; con ella cae el
-- disparador «Enviar correo» que llamaba a /api/webhooks/send-proposal.
-- `bookings` nunca existió: el webhook de Cal.com ahora escribe en el CRM.
-- Se conservan `posts` (búsqueda semántica del blog) y `pseo_pages` (páginas
-- locales de NitroCommerce).

drop function if exists public.submit_commercial_diagnostic(jsonb);

drop table if exists public.diagnostic_sessions;
drop table if exists public.leads;
drop table if exists public.acceso_anticipado;
drop table if exists public.laboratorio_waitlist;
drop table if exists public.prompt_likes;
drop table if exists public.pdf_summary_leads;
drop table if exists public.newsletter_subscribers;
drop table if exists public.prospects;
