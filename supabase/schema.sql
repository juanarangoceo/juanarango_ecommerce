-- Run this in your Supabase SQL Editor

create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  interest text,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Optional but recommended)
alter table leads enable row level security;

-- Policy: Allow inserts from service role (our server action)
create policy "Enable insert for service role only" on leads
  for insert
  with check (true);

