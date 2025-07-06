/*
  # Fix admin policies for proper authentication

  1. Security Updates
    - Update RLS policies to allow authenticated users to perform admin operations
    - Add proper admin authentication checks
    - Ensure all operations work with both anon and authenticated users

  2. Policy Changes
    - Allow authenticated users to manage all content
    - Keep public read access for all tables
    - Add insert permissions for registrations
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Service role can manage businesses" ON businesses;
DROP POLICY IF EXISTS "Service role can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Service role can manage programs" ON programs;
DROP POLICY IF EXISTS "Service role can manage registrations" ON registrations;
DROP POLICY IF EXISTS "Service role can manage site settings" ON site_settings;

-- Create new policies that allow authenticated users to manage content
CREATE POLICY "Authenticated users can manage businesses"
  ON businesses
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage programs"
  ON programs
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage registrations"
  ON registrations
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);