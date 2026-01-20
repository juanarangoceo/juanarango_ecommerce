-- Enable pgvector extension
create extension if not exists vector;

-- Create posts table if it doesn't exist
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  sanity_id text not null unique, -- ID from Sanity to prevent duplicates
  title text not null,
  slug text not null,
  excerpt text,
  content text, -- Optional: verify if you want to store full content
  published_at timestamp with time zone,
  embedding vector(1536) -- OpenAI text-embedding-3-small dimension
);

-- Enable RLS
alter table posts enable row level security;

-- Policy: Allow read access to everyone
drop policy if exists "Allow public read access" on posts;
create policy "Allow public read access"
  on posts
  for select
  to public
  using (true);

-- Policy: Allow service role to insert/update
drop policy if exists "Allow service role to manage posts" on posts;
create policy "Allow service role to manage posts"
  on posts
  for all
  to service_role
  using (true)
  with check (true);

-- Cleanup old function if it exists
drop function if exists match_posts;

-- Create match_posts function for semantic search
create or replace function match_blog_posts (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  title text,
  slug text,
  excerpt text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    posts.id,
    posts.title,
    posts.slug,
    posts.excerpt,
    1 - (posts.embedding <=> query_embedding) as similarity
  from posts
  where 1 - (posts.embedding <=> query_embedding) > match_threshold
  order by posts.embedding <=> query_embedding
  limit match_count;
end;
$$;
