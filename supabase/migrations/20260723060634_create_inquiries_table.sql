/*
# Create inquiries table (single-tenant, no auth)

1. New Tables
- `inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `company` (text, nullable) — optional company name
  - `service` (text, not null) — which service they're interested in
  - `message` (text, not null) — project details / message body
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `inquiries`.
- Allow anon + authenticated to INSERT (public contact form).
- No SELECT/UPDATE/DELETE for anon or authenticated — inquiries are
  managed server-side only, so visitors cannot read or modify submissions.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);
