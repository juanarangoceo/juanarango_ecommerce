-- CRM propio de juanarangoecommerce.com (25-09-2026).
--
-- Una persona = un contacto. Todo lo que hace (suscribirse, llenar un
-- formulario, pedir un PDF, agendar) queda como evento en su historial. Así el
-- panel /admin, los segmentos y la sincronización con Resend leen una sola
-- fuente de verdad en vez de siete tablas sueltas.
--
-- Solo el servidor (service_role) lee y escribe: RLS activo y sin políticas.

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  email text unique check (email is null or email = lower(btrim(email))),
  phone text,
  name text,
  company text,
  lifecycle text not null default 'suscriptor'
    check (lifecycle in ('suscriptor', 'prospecto', 'calificado', 'cliente', 'descartado')),
  newsletter_status text not null default 'none'
    check (newsletter_status in ('subscribed', 'unsubscribed', 'none')),
  subscribed_at timestamptz,
  unsubscribed_at timestamptz,
  source text,
  first_attribution jsonb not null default '{}'::jsonb,
  last_attribution jsonb not null default '{}'::jsonb,
  tags text[] not null default '{}',
  score integer not null default 0,
  notes text,
  consent_at timestamptz,
  last_activity_at timestamptz not null default now(),
  resend_contact_id text,
  resend_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contacts_identity check (email is not null or phone is not null)
);

create index if not exists contacts_phone_idx on public.contacts (phone) where phone is not null;
create index if not exists contacts_lifecycle_idx on public.contacts (lifecycle);
create index if not exists contacts_newsletter_idx on public.contacts (newsletter_status);
create index if not exists contacts_last_activity_idx on public.contacts (last_activity_at desc);
create index if not exists contacts_tags_idx on public.contacts using gin (tags);

create table if not exists public.contact_events (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.contacts (id) on delete cascade,
  type text not null check (type in (
    'form_submit', 'newsletter_subscribe', 'newsletter_unsubscribe',
    'lead_magnet', 'booking', 'status_change', 'note', 'email'
  )),
  form text,
  summary text,
  data jsonb not null default '{}'::jsonb,
  attribution jsonb not null default '{}'::jsonb,
  path text,
  -- Evita duplicados en reintentos (Cal.com, Inngest, importaciones).
  dedupe_key text unique,
  created_at timestamptz not null default now()
);

create index if not exists contact_events_contact_idx on public.contact_events (contact_id, created_at desc);
create index if not exists contact_events_created_idx on public.contact_events (created_at desc);
create index if not exists contact_events_form_idx on public.contact_events (form, created_at desc);

alter table public.contacts enable row level security;
alter table public.contact_events enable row level security;
revoke all on public.contacts, public.contact_events from anon, authenticated;

create or replace function public.crm_touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contacts_updated_at on public.contacts;
create trigger contacts_updated_at before update on public.contacts
  for each row execute function public.crm_touch_updated_at();

-- Puntos por señal de intención. El puntaje se recalcula desde el historial,
-- no se acumula a ciegas, para que reintentos o importaciones no lo inflen.
create or replace function public.crm_event_points(p_type text, p_form text)
returns integer language sql immutable set search_path = '' as $$
  select case
    when p_type = 'booking' then 50
    when p_type = 'form_submit' and p_form = 'nitro_complete' then 40
    when p_type = 'form_submit' and p_form = 'diagnostico' then 30
    when p_type = 'form_submit' then 20
    when p_type = 'lead_magnet' then 10
    when p_type = 'newsletter_subscribe' then 5
    else 0
  end;
$$;

create or replace function public.crm_lifecycle_rank(p_lifecycle text)
returns integer language sql immutable set search_path = '' as $$
  select case p_lifecycle
    when 'suscriptor' then 1 when 'prospecto' then 2
    when 'calificado' then 3 when 'cliente' then 4 else 0 end;
$$;

-- Punto de entrada único de todos los formularios.
--
-- payload: email, phone, name, company, form, type, summary, data, attribution,
-- path, tags[], newsletter (bool), consent (bool), lifecycle (mínimo al que
-- sube), dedupe_key, occurred_at (solo importaciones).
create or replace function public.crm_capture(payload jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_email text := nullif(lower(btrim(payload->>'email')), '');
  v_phone text := nullif(regexp_replace(coalesce(payload->>'phone', ''), '[^0-9+]', '', 'g'), '');
  v_type text := coalesce(nullif(payload->>'type', ''), 'form_submit');
  v_form text := nullif(payload->>'form', '');
  v_at timestamptz := coalesce((payload->>'occurred_at')::timestamptz, now());
  v_attr jsonb := coalesce(payload->'attribution', '{}'::jsonb);
  v_min_lifecycle text := coalesce(nullif(payload->>'lifecycle', ''),
    case when v_type in ('form_submit', 'booking') then 'prospecto' else 'suscriptor' end);
  v_tags text[] := coalesce(array(select jsonb_array_elements_text(coalesce(payload->'tags', '[]'::jsonb))), '{}');
  v_contact public.contacts;
  v_created boolean := false;
  v_already boolean := false;
  v_event_id uuid;
begin
  if v_email is null and v_phone is null then
    raise exception 'crm_capture: se necesita email o teléfono';
  end if;

  if v_email is not null then
    select * into v_contact from public.contacts where email = v_email for update;
  end if;
  if v_contact.id is null and v_phone is not null then
    select * into v_contact from public.contacts
      where phone = v_phone and (email is null or v_email is null)
      order by created_at limit 1 for update;
  end if;

  if v_contact.id is null then
    insert into public.contacts (email, phone, name, company, lifecycle, source,
      first_attribution, last_attribution, tags, consent_at, last_activity_at, created_at)
    values (v_email, v_phone, nullif(btrim(payload->>'name'), ''), nullif(btrim(payload->>'company'), ''),
      v_min_lifecycle, v_form, v_attr, v_attr, v_tags,
      case when (payload->>'consent')::boolean then v_at end, v_at, v_at)
    returning * into v_contact;
    v_created := true;
  else
    update public.contacts set
      email = coalesce(email, v_email),
      phone = coalesce(v_phone, phone),
      name = coalesce(nullif(btrim(payload->>'name'), ''), name),
      company = coalesce(nullif(btrim(payload->>'company'), ''), company),
      lifecycle = case
        when lifecycle <> 'descartado'
          and public.crm_lifecycle_rank(v_min_lifecycle) > public.crm_lifecycle_rank(lifecycle)
        then v_min_lifecycle else lifecycle end,
      last_attribution = case when v_attr <> '{}'::jsonb then v_attr else last_attribution end,
      tags = array(select distinct unnest(tags || v_tags)),
      consent_at = coalesce(consent_at, case when (payload->>'consent')::boolean then v_at end),
      last_activity_at = greatest(last_activity_at, v_at)
    where id = v_contact.id
    returning * into v_contact;
  end if;

  if (payload->>'newsletter')::boolean then
    v_already := v_contact.newsletter_status = 'subscribed';
    if not v_already then
      update public.contacts set newsletter_status = 'subscribed',
        subscribed_at = v_at, unsubscribed_at = null
      where id = v_contact.id;
    end if;
  end if;

  insert into public.contact_events (contact_id, type, form, summary, data, attribution, path, dedupe_key, created_at)
  values (v_contact.id, v_type, v_form, nullif(payload->>'summary', ''),
    coalesce(payload->'data', '{}'::jsonb), v_attr, nullif(payload->>'path', ''),
    nullif(payload->>'dedupe_key', ''), v_at)
  on conflict (dedupe_key) do nothing
  returning id into v_event_id;

  update public.contacts c set score = least(100, coalesce((
    select sum(public.crm_event_points(e.type, e.form)) from public.contact_events e where e.contact_id = c.id
  ), 0))
  where c.id = v_contact.id;

  return jsonb_build_object(
    'contact_id', v_contact.id,
    'created', v_created,
    'already_subscribed', v_already,
    'duplicate_event', v_event_id is null
  );
end;
$$;

create or replace function public.crm_unsubscribe(p_email text, p_reason text default null)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  v_id uuid;
begin
  update public.contacts set newsletter_status = 'unsubscribed', unsubscribed_at = now()
  where email = lower(btrim(p_email)) and newsletter_status = 'subscribed'
  returning id into v_id;
  if v_id is null then return false; end if;
  insert into public.contact_events (contact_id, type, form, summary)
  values (v_id, 'newsletter_unsubscribe', 'newsletter', coalesce(p_reason, 'Baja desde el enlace del correo'));
  return true;
end;
$$;

-- Serie diaria para las gráficas del panel (zona horaria de Colombia).
create or replace function public.crm_daily_activity(p_days integer default 30)
returns table (day date, form text, total bigint)
language sql stable set search_path = '' as $$
  select (e.created_at at time zone 'America/Bogota')::date, coalesce(e.form, 'otro'), count(*)
  from public.contact_events e
  where e.created_at >= now() - make_interval(days => p_days)
    and e.type in ('form_submit', 'newsletter_subscribe', 'lead_magnet', 'booking')
  group by 1, 2
  order by 1;
$$;

-- Vista del panel: cada contacto con los formularios que ha usado.
create or replace view public.crm_contact_overview with (security_invoker = true) as
select c.*,
  coalesce(array_agg(distinct e.form) filter (where e.form is not null), '{}') as forms,
  count(e.id) as event_count
from public.contacts c
left join public.contact_events e on e.contact_id = c.id
group by c.id;

revoke all on public.crm_contact_overview from anon, authenticated;

revoke all on function public.crm_capture(jsonb), public.crm_unsubscribe(text, text),
  public.crm_daily_activity(integer) from public, anon, authenticated;
grant execute on function public.crm_capture(jsonb), public.crm_unsubscribe(text, text),
  public.crm_daily_activity(integer) to service_role;
