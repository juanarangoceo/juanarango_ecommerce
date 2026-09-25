-- Importa al CRM los registros de las tablas antiguas (25-09-2026).
--
-- Idempotente: cada fila lleva un `dedupe_key` con su tabla e id de origen, así
-- que se puede volver a correr justo antes de retirar las tablas para recoger
-- lo que haya llegado mientras tanto. Respaldo JSON previo en
-- /home/juan/respaldos/juanarangoecommerce-supabase-2026-09-25/ (fuera del repo).
-- `prospects` no se importa por decisión del usuario.

do $$
declare
  r record;
begin
  -- Newsletter: suscripción con su fecha original.
  for r in select * from public.newsletter_subscribers order by created_at loop
    perform public.crm_capture(jsonb_build_object(
      'email', r.email, 'name', r.first_name,
      'type', 'newsletter_subscribe', 'form', 'newsletter', 'newsletter', true,
      'summary', 'Suscripción a la newsletter',
      'occurred_at', r.created_at,
      'dedupe_key', 'legacy:newsletter_subscribers:' || r.id
    ));
    if coalesce(r.unsubscribed, false) then
      update public.contacts set newsletter_status = 'unsubscribed',
        unsubscribed_at = coalesce(r.unsubscribed_at, now())
      where email = lower(btrim(r.email));
    end if;
  end loop;

  -- Formulario de contacto y diagnóstico (tabla `leads`).
  for r in select * from public.leads order by created_at loop
    perform public.crm_capture(jsonb_build_object(
      'email', r.email, 'name', r.name, 'company', r.company, 'phone', r.phone,
      'form', case when r.interest ilike 'Diagnóstico%' then 'diagnostico' else 'contacto' end,
      'summary', r.interest,
      'data', jsonb_strip_nulls(jsonb_build_object(
        'interest', r.interest, 'message', r.message,
        'recommended_solution', r.recommended_solution, 'primary_problem', r.primary_problem)),
      'attribution', jsonb_strip_nulls(jsonb_build_object(
        'utm_source', r.source, 'utm_campaign', r.campaign, 'landing_path', r.landing_path)),
      'consent', r.consented_at is not null,
      'occurred_at', r.created_at,
      'dedupe_key', 'legacy:leads:' || r.id
    ));
  end loop;

  for r in select * from public.laboratorio_waitlist order by created_at loop
    perform public.crm_capture(jsonb_build_object(
      'email', r.email, 'name', r.name, 'form', 'laboratorio',
      'summary', 'Lista de espera del Laboratorio',
      'data', jsonb_strip_nulls(jsonb_build_object(
        'business_type', r.business_type, 'monthly_revenue', r.monthly_revenue, 'message', r.message)),
      'occurred_at', r.created_at,
      'dedupe_key', 'legacy:laboratorio_waitlist:' || r.id
    ));
  end loop;

  for r in select * from public.acceso_anticipado order by created_at loop
    perform public.crm_capture(jsonb_build_object(
      'email', r.email, 'name', r.nombre, 'phone', r.whatsapp, 'form', 'acceso_anticipado',
      'summary', 'Acceso anticipado · ' || r.curso_titulo,
      'data', jsonb_strip_nulls(jsonb_build_object(
        'curso_id', r.curso_id, 'curso_titulo', r.curso_titulo, 'message', r.mensaje)),
      'occurred_at', r.created_at,
      'dedupe_key', 'legacy:acceso_anticipado:' || r.id
    ));
  end loop;

  for r in select * from public.pdf_summary_leads order by created_at loop
    perform public.crm_capture(jsonb_build_object(
      'email', r.email, 'type', 'lead_magnet', 'form', 'resumen_pdf',
      'summary', 'Resumen PDF · ' || coalesce(r.post_title, r.post_slug),
      'data', jsonb_build_object('post_slug', r.post_slug, 'post_title', r.post_title),
      'path', '/blog/' || r.post_slug,
      'occurred_at', r.created_at,
      'dedupe_key', 'legacy:pdf_summary_leads:' || r.id
    ));
  end loop;

  -- Pruebas propias: se etiquetan para poder ocultarlas en el panel.
  update public.contacts set tags = array(select distinct unnest(tags || array['interno']))
  where email in ('juanarangopm@gmail.com', 'juanarangoecommerce@gmail.com');
end;
$$;
