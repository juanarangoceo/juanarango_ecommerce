-- Preparación local para el diagnóstico comercial.
-- Esta migración no se aplica automáticamente a producción.

alter table public.leads
  add column if not exists phone text,
  add column if not exists source text,
  add column if not exists campaign text,
  add column if not exists landing_path text,
  add column if not exists recommended_solution text,
  add column if not exists primary_problem text,
  add column if not exists consented_at timestamptz;

create table if not exists public.diagnostic_sessions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  status text not null default 'completed' check (status in ('started', 'completed')),
  maturity_level text not null,
  recommendation text not null,
  answers jsonb not null default '{}'::jsonb,
  attribution jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.diagnostic_sessions enable row level security;

revoke all on table public.diagnostic_sessions from anon, authenticated;
grant all on table public.diagnostic_sessions to service_role;

-- El formulario público pasa por una Server Action con service_role. La tabla
-- no necesita una política de INSERT para anon/authenticated.
drop policy if exists "Enable insert for service role only" on public.leads;

create index if not exists diagnostic_sessions_lead_id_idx
  on public.diagnostic_sessions (lead_id);

create index if not exists diagnostic_sessions_created_at_idx
  on public.diagnostic_sessions (created_at desc);

create or replace function public.submit_commercial_diagnostic(payload jsonb)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_lead_id uuid;
begin
  insert into public.leads (
    name,
    email,
    company,
    phone,
    interest,
    message,
    source,
    campaign,
    landing_path,
    recommended_solution,
    primary_problem,
    consented_at
  ) values (
    payload->>'name',
    payload->>'email',
    nullif(payload->>'company', ''),
    nullif(payload->>'phone', ''),
    concat('Diagnóstico · ', payload->>'recommendation'),
    'Lead creado desde el diagnóstico comercial estructurado.',
    nullif(payload#>>'{attribution,utm_source}', ''),
    nullif(payload#>>'{attribution,utm_campaign}', ''),
    nullif(payload#>>'{attribution,landing_path}', ''),
    payload->>'recommendation',
    payload->>'primary_problem',
    now()
  )
  returning id into new_lead_id;

  insert into public.diagnostic_sessions (
    lead_id,
    maturity_level,
    recommendation,
    answers,
    attribution
  ) values (
    new_lead_id,
    payload->>'maturity_level',
    payload->>'recommendation',
    coalesce(payload->'answers', '{}'::jsonb),
    coalesce(payload->'attribution', '{}'::jsonb)
  );

  return new_lead_id;
end;
$$;

revoke all on function public.submit_commercial_diagnostic(jsonb) from public, anon, authenticated;
grant execute on function public.submit_commercial_diagnostic(jsonb) to service_role;
