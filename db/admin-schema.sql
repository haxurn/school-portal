-- Create tables for admin dashboard functionality

-- Table for editable pages
CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  meta_description TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id),
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Table for blog categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

-- Table for blog post categories (many-to-many)
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Table for announcement targets (which roles can see which announcements)
CREATE TABLE IF NOT EXISTS announcement_targets (
  announcement_id INTEGER REFERENCES announcements(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (announcement_id, role_id)
);

-- Table for site settings
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for admin activities (audit log)
CREATE TABLE IF NOT EXISTS admin_activities (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_name VARCHAR(255),
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for school IDs (for student registration)
CREATE TABLE IF NOT EXISTS school_ids (
  id VARCHAR(50) PRIMARY KEY,
  is_used BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user if not exists
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  'admin@visionacademy.edu',
  crypt('supersecure', gen_salt('bf')),
  NOW(),
  '{"first_name":"Administrator","last_name":"User"}'
WHERE 
  NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@visionacademy.edu');

-- Insert admin profile if not exists
INSERT INTO profiles (id, email, first_name, last_name, role_id, status)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  'admin@visionacademy.edu',
  'Administrator',
  'User',
  1,
  'active'
WHERE 
  NOT EXISTS (SELECT 1 FROM profiles WHERE email = 'admin@visionacademy.edu');

-- Insert default roles if not exists
INSERT INTO roles (id, name, description)
VALUES 
  (1, 'admin', 'Administrator with full access to all features'),
  (2, 'teacher', 'Teacher with access to class management and student information'),
  (3, 'student', 'Student with access to their own information and classes')
ON CONFLICT (id) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value)
VALUES 
  ('site_name', 'Vision Academy'),
  ('site_description', 'A modern school portal for Vision Academy'),
  ('contact_email', 'info@visionacademy.edu'),
  ('contact_phone', '(123) 456-7890'),
  ('address', 'Gerji, Addis Ababa, Ethiopia'),
  ('enable_blog', 'true'),
  ('enable_announcements', 'true'),
  ('enable_gallery', 'true'),
  ('primary_color', '#0284c7')
ON CONFLICT (key) DO NOTHING;

-- Insert sample school IDs for testing
INSERT INTO school_ids (id)
VALUES 
  ('S2023001'),
  ('S2023002'),
  ('S2023003'),
  ('S2023004'),
  ('S2023005')
ON CONFLICT (id) DO NOTHING;

-- Insert sample pages
INSERT INTO pages (title, slug, content, meta_description)
VALUES 
  ('Home', 'home', '<h1>Welcome to Vision Academy</h1><p>A place for learning and growth.</p>', 'Vision Academy home page'),
  ('About Us', 'about', '<h1>About Vision Academy</h1><p>Learn about our history and mission.</p>', 'About Vision Academy'),
  ('Contact', 'contact', '<h1>Contact Us</h1><p>Get in touch with Vision Academy.</p>', 'Contact Vision Academy')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog categories
INSERT INTO blog_categories (name, slug, description)
VALUES 
  ('News', 'news', 'School news and updates'),
  ('Events', 'events', 'Upcoming and past school events'),
  ('Academic', 'academic', 'Academic information and resources'),
  ('Student Life', 'student-life', 'Student activities and experiences')
ON CONFLICT (slug) DO NOTHING;
