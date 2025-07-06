/*
  # Create admin management tables

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo` (text)
      - `category` (text)
      - `description` (text)
      - `is_new` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `author` (text)
      - `date` (date)
      - `category` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `programs`
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `primary_color` (text)
      - `accent_colors` (jsonb)
      - `features` (jsonb)
      - `updated_at` (timestamp)
    
    - `registrations`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `phone_number` (text)
      - `country` (text)
      - `industry` (text)
      - `business_idea` (text)
      - `open_to_collaboration` (text)
      - `born_again` (text)
      - `available_8_weeks` (text)
      - `time_preference` (text)
      - `days_preference` (jsonb)
      - `payment_method` (text)
      - `payment_proof` (text)
      - `created_at` (timestamp)
    
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  date date NOT NULL,
  category text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  primary_color text NOT NULL,
  accent_colors jsonb NOT NULL DEFAULT '[]',
  features jsonb NOT NULL DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone_number text NOT NULL,
  country text NOT NULL,
  industry text NOT NULL,
  business_idea text NOT NULL,
  open_to_collaboration text NOT NULL,
  born_again text NOT NULL,
  available_8_weeks text NOT NULL,
  time_preference text NOT NULL,
  days_preference jsonb NOT NULL DEFAULT '[]',
  payment_method text NOT NULL,
  payment_proof text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read businesses"
  ON businesses
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read programs"
  ON programs
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for admin write access (we'll use service role for admin operations)
CREATE POLICY "Service role can manage businesses"
  ON businesses
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage blog posts"
  ON blog_posts
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage programs"
  ON programs
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage registrations"
  ON registrations
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage site settings"
  ON site_settings
  FOR ALL
  TO service_role
  USING (true);

-- Allow public to insert registrations
CREATE POLICY "Public can insert registrations"
  ON registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Insert default programs
INSERT INTO programs (id, name, description, primary_color, accent_colors, features) VALUES
('whats-in-your-hand', 'What''s in Your Hand', 'An 8-week business development studio for kingdom-minded individuals who want to build ventures rooted in God''s vision. Whether transitioning from a 9–5 or launching a business alongside your job, this program helps participants create, refine, and launch a profitable venture, guided by biblical values, spiritual clarity, and strategic structure.', 'royal-blue', '["mustard-yellow", "ivory"]', '["8-week intensive program", "Biblical business principles", "Spiritual clarity sessions", "Strategic structure development", "Peer collaboration", "Expert mentorship"]'),
('net-in-the-deep', 'Net in the Deep', 'A track for those ready to go deeper. It focuses on scaling, structure, spiritual discipline, and obedience-driven action. Ideal for those with businesses in development who want to formalize and scale in alignment with their faith.', 'mustard-yellow', '["ivory", "royal-blue"]', '["Business scaling strategies", "Spiritual discipline training", "Obedience-driven action plans", "Formalization processes", "Faith-aligned scaling", "Advanced mentorship"]'),
('the-boat', 'The Boat', 'A content hub for teaching, storytelling, and prophetic business conversations via YouTube. Join us for inspiring content that bridges faith and entrepreneurship.', 'royal-blue', '["mustard-yellow", "ivory"]', '["Weekly YouTube content", "Prophetic business insights", "Success stories", "Teaching sessions", "Community discussions", "Live Q&A sessions"]')
ON CONFLICT (id) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('registration_price', '3000'),
('contact_info', '{"phone": "+254 700 123 456", "email": "info@kingdombusinessstudio.com", "whatsapp": "+254700123456", "location": "Nairobi, Kenya"}'),
('social_media_links', '{"facebook": "https://facebook.com/kingdombusinessstudio", "instagram": "https://instagram.com/kingdombusinessstudio", "twitter": "https://twitter.com/kingdombusiness", "linkedin": "https://linkedin.com/company/kingdom-business-studio"}'),
('admin_password', '"kingdomstudio2025"')
ON CONFLICT (key) DO NOTHING;

-- Insert default businesses
INSERT INTO businesses (name, logo, category, description, is_new) VALUES
('Grace Catering Services', '🍽️', 'Food & Hospitality', 'Christian-owned catering service specializing in events and corporate functions.', true),
('Faithful Finance Consulting', '💰', 'Financial Services', 'Biblical financial planning and consulting services for individuals and businesses.', false),
('Kingdom Kids Academy', '🎓', 'Education', 'Christian early childhood education center focused on holistic development.', false),
('Blessed Boutique', '👗', 'Fashion & Retail', 'Modest fashion boutique promoting biblical values through clothing.', true),
('Cornerstone Construction', '🏗️', 'Construction', 'Christian construction company building homes and commercial spaces.', false),
('Harvest Digital Marketing', '📱', 'Digital Services', 'Faith-based digital marketing agency helping Christian businesses grow online.', false)
ON CONFLICT DO NOTHING;

-- Insert default blog posts
INSERT INTO blog_posts (title, excerpt, content, author, date, category, image_url) VALUES
('Building Your Business on Biblical Principles', 'Discover how to integrate your faith into every aspect of your business operations.', 'Full blog post content here...', 'Sarah Johnson', '2025-01-15', 'Faith & Business', 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800'),
('The Power of Stewardship in Entrepreneurship', 'Learn how viewing your business as a stewardship opportunity can transform your approach.', 'Full blog post content here...', 'David Williams', '2025-01-10', 'Stewardship', 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Finding Your Purpose in Business', 'Discover your God-given calling and how to align your business with His purpose.', 'Full blog post content here...', 'Grace Thompson', '2025-01-05', 'Purpose', 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();