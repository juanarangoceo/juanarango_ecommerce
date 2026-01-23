-- Create the table for prospects
create table public.prospects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  full_name text,
  company_name text,
  status text default 'pending', -- 'pending', 'sent', 'error'
  notes text
);

-- Enable RLS (Row Level Security) if you want to restrict who can insert
alter table public.prospects enable row level security;

-- Policy to allow authenticated users (or service role) to insert
create policy "Enable insert for authenticated users only"
on public.prospects
for insert
to authenticated
with check (true);

-- Comment:
-- Once this table is created, go to Database -> Webhooks in Supabase Dashboard.
-- Create a new Webhook:
-- Name: Send Proposal Email
-- Table: public.prospects
-- Events: INSERT
-- HTTP Request:
--   Method: POST
--   URL: https://[TU-DOMINIO-VERCEL].vercel.app/api/webhooks/send-proposal
--   Headers: Content-Type: application/json
