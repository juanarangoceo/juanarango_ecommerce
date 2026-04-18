-- ============================================================
-- MIGRATION: Newsletter Subscribers — Add unsubscribe fields
-- Run this in: https://supabase.com/dashboard/project/aadsgthwmdvpveksxvfx/sql/new
-- ============================================================

-- 1. Add unsubscribed boolean (default false = still subscribed)
ALTER TABLE public.newsletter_subscribers
ADD COLUMN IF NOT EXISTS unsubscribed BOOLEAN NOT NULL DEFAULT false;

-- 2. Add timestamp of when they unsubscribed
ALTER TABLE public.newsletter_subscribers
ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ;

-- 3. Add optional first name (for personalized emails)
ALTER TABLE public.newsletter_subscribers
ADD COLUMN IF NOT EXISTS first_name TEXT;

-- 4. Index to speed up "fetch active subscribers" query
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active
ON public.newsletter_subscribers (unsubscribed)
WHERE unsubscribed = false;

-- Verify the result:
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'newsletter_subscribers'
ORDER BY ordinal_position;
