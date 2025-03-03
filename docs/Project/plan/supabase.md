# Medellin AI Platform - Supabase Database Schema

## Overview

This document outlines the comprehensive database schema for the Medellin AI Platform, implemented using PostgreSQL through Supabase. The schema is designed for optimal performance, security, and scalability.

## 1. Database Types and Enums

```sql
-- Core enums
CREATE TYPE user_role AS ENUM ('admin', 'organizer', 'member', 'attendee');
CREATE TYPE registration_status AS ENUM ('pending', 'confirmed', 'cancelled', 'waitlisted');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE notification_type AS ENUM ('event', 'system', 'message', 'reminder');
CREATE TYPE resource_type AS ENUM ('document', 'video', 'link', 'presentation', 'code');
```

## 2. Core Tables

### User Management

```sql
-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  first_name text,
  last_name text,
  email text UNIQUE,
  avatar_url text,
  bio text,
  ai_interests jsonb DEFAULT '[]',
  skills jsonb DEFAULT '[]',
  contact_preferences jsonb DEFAULT '{"email": true, "phone": false}',
  signup_completed boolean DEFAULT false,
  experience_level text,
  linkedin_url text,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now()),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- User roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role user_role DEFAULT 'attendee',
  permissions jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_by uuid REFERENCES auth.users,
  CONSTRAINT unique_user_role UNIQUE (user_id, role)
);

-- Role history for audit
CREATE TABLE public.role_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  old_role user_role,
  new_role user_role NOT NULL,
  changed_by uuid REFERENCES auth.users NOT NULL,
  reason text,
  changed_at timestamptz DEFAULT timezone('utc'::text, now())
);
```

### Event Management

```sql
-- Venues
CREATE TABLE public.venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  address text NOT NULL,
  area text NOT NULL,
  city text NOT NULL DEFAULT 'Medellín',
  country text NOT NULL DEFAULT 'Colombia',
  coordinates point,
  capacity integer,
  facilities jsonb DEFAULT '[]',
  amenities jsonb DEFAULT '[]',
  accessibility_info jsonb DEFAULT '{"wheelchair_accessible": false}',
  parking_info jsonb DEFAULT '{"available": false}',
  transit_info jsonb DEFAULT '{}',
  images text[],
  contact_info jsonb DEFAULT '{}',
  is_approved boolean DEFAULT false,
  created_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_coordinates CHECK (
    coordinates IS NULL OR
    (coordinates[0] BETWEEN -180 AND 180 AND
     coordinates[1] BETWEEN -90 AND 90)
  )
);

-- Events
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  short_description text,
  date timestamptz NOT NULL,
  end_date timestamptz,
  timezone text DEFAULT 'America/Bogota',
  location text NOT NULL,
  format text DEFAULT 'in-person',
  status text DEFAULT 'draft',
  capacity integer,
  current_registrations integer DEFAULT 0,
  max_capacity integer,
  price_type text DEFAULT 'free',
  price numeric,
  currency text DEFAULT 'COP',
  early_bird_deadline timestamptz,
  early_bird_price numeric,
  registration_deadline timestamptz,
  actual_attendees integer DEFAULT 0,
  views_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  event_type text[],
  image_url text,
  event_url text,
  organizer_id uuid REFERENCES auth.users NOT NULL,
  venue_id uuid REFERENCES venues,
  meta_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now()),
  CONSTRAINT valid_dates CHECK (
    date > timezone('utc'::text, now()) AND
    (end_date IS NULL OR end_date > date) AND
    (early_bird_deadline IS NULL OR early_bird_deadline < date) AND
    (registration_deadline IS NULL OR registration_deadline < date)
  ),
  CONSTRAINT valid_capacity CHECK (
    (capacity IS NULL OR capacity > 0) AND
    (max_capacity IS NULL OR max_capacity >= capacity)
  )
);

-- Event Categories
CREATE TABLE public.event_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES event_categories(id),
  icon_url text,
  sort_order integer DEFAULT 999,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_category_name UNIQUE (name)
);

-- Event-Category Mapping
CREATE TABLE public.event_category_mappings (
  event_id uuid REFERENCES events NOT NULL,
  category_id uuid REFERENCES event_categories NOT NULL,
  PRIMARY KEY (event_id, category_id)
);
```

### Communication System

```sql
-- Notifications
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type notification_type NOT NULL,
  read boolean DEFAULT false,
  archived boolean DEFAULT false,
  action_url text,
  meta_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  expires_at timestamptz
);

-- Communication Preferences
CREATE TABLE public.communication_preferences (
  user_id uuid REFERENCES auth.users PRIMARY KEY,
  email_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT true,
  sms_notifications boolean DEFAULT false,
  whatsapp_notifications boolean DEFAULT false,
  notification_frequency text DEFAULT 'immediate',
  quiet_hours jsonb DEFAULT '{"start": "22:00", "end": "08:00"}',
  categories jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);
```

### Blog System

```sql
-- Blog Posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_id uuid REFERENCES auth.users NOT NULL,
  status text DEFAULT 'draft',
  featured_image text,
  reading_time integer,
  published_at timestamptz,
  tags text[],
  meta_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Comments
CREATE TABLE public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES blog_comments(id),
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Community Features

```sql
-- User Connections
CREATE TABLE public.user_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES auth.users NOT NULL,
  recipient_id uuid REFERENCES auth.users NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_connection UNIQUE (requester_id, recipient_id),
  CONSTRAINT no_self_connection CHECK (requester_id != recipient_id)
);

-- User Messages
CREATE TABLE public.user_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users NOT NULL,
  recipient_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forum Categories
CREATE TABLE public.forum_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES forum_categories(id),
  sort_order integer DEFAULT 999,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forum Topics
CREATE TABLE public.forum_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES forum_categories NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  status text DEFAULT 'active',
  is_pinned boolean DEFAULT false,
  view_count integer DEFAULT 0,
  last_activity_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forum Posts
CREATE TABLE public.forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES forum_topics NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES forum_posts(id),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Activities
CREATE TABLE public.user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  activity_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
```

### AI Features

```sql
-- AI Models
CREATE TABLE public.ai_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  type text NOT NULL,
  version text NOT NULL,
  parameters jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Content Embeddings
CREATE TABLE public.content_embeddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  content_id uuid NOT NULL,
  model_id uuid REFERENCES ai_models NOT NULL,
  embedding vector(1536) NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Interests
CREATE TABLE public.user_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  interest_type text NOT NULL,
  interest_value text NOT NULL,
  weight numeric DEFAULT 1.0,
  source text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_user_interest UNIQUE (user_id, interest_type, interest_value)
);

-- Content Recommendations
CREATE TABLE public.content_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  content_type text NOT NULL,
  content_id uuid NOT NULL,
  score numeric NOT NULL,
  reason jsonb NOT NULL,
  is_viewed boolean DEFAULT false,
  viewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT unique_recommendation UNIQUE (user_id, content_type, content_id)
);
```

### Reporting System

```sql
-- Report Templates
CREATE TABLE public.report_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  type text NOT NULL,
  query text NOT NULL,
  parameters jsonb DEFAULT '[]',
  output_format text DEFAULT 'csv',
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Report Schedules
CREATE TABLE public.report_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES report_templates NOT NULL,
  name text NOT NULL,
  frequency text NOT NULL,
  parameters jsonb DEFAULT '{}',
  recipients jsonb NOT NULL,
  last_run_at timestamptz,
  next_run_at timestamptz,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Report Executions
CREATE TABLE public.report_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES report_templates NOT NULL,
  schedule_id uuid REFERENCES report_schedules,
  status text DEFAULT 'pending',
  parameters jsonb DEFAULT '{}',
  result_url text,
  error_message text,
  started_at timestamptz,
  completed_at timestamptz,
  created_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now()
);
```

## 3. Indexes

```sql
-- Profiles
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_signup_completed ON profiles(signup_completed);
CREATE INDEX idx_profiles_experience ON profiles(experience_level);
CREATE INDEX idx_profiles_fts ON profiles USING GIN (
  to_tsvector('spanish', coalesce(first_name, '') || ' ' ||
  coalesce(last_name, '') || ' ' ||
  coalesce(bio, ''))
);

-- Events
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_format ON events(format);
CREATE INDEX idx_events_price_type ON events(price_type);
CREATE INDEX idx_events_featured ON events(is_featured) WHERE is_featured = true;
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_venue ON events(venue_id);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_fts ON events USING GIN (
  to_tsvector('spanish',
    coalesce(title, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(short_description, '')
  )
);

-- Venues
CREATE INDEX idx_venues_coordinates ON venues USING GIST (coordinates);
CREATE INDEX idx_venues_area ON venues(area);
CREATE INDEX idx_venues_slug ON venues(slug);

-- Registrations
CREATE INDEX idx_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_registrations_user ON event_registrations(user_id);
CREATE INDEX idx_registrations_status ON event_registrations(status);
CREATE INDEX idx_registrations_payment ON event_registrations(payment_status);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(read) WHERE read = false;
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- Resources
CREATE INDEX idx_resources_author ON resources(author_id);
CREATE INDEX idx_resources_category ON resources(category_id);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_status ON resources(status);
CREATE INDEX idx_resources_featured ON resources(is_featured) WHERE is_featured = true;
CREATE INDEX idx_resources_fts ON resources USING GIN (
  to_tsvector('spanish',
    coalesce(title, '') || ' ' ||
    coalesce(description, '')
  )
);

-- Blog
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_fts ON blog_posts USING GIN (
  to_tsvector('spanish',
    coalesce(title, '') || ' ' ||
    coalesce(content, '') || ' ' ||
    coalesce(excerpt, '')
  )
);
CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX idx_blog_comments_user ON blog_comments(user_id);
CREATE INDEX idx_blog_comments_parent ON blog_comments(parent_id);
CREATE INDEX idx_blog_comments_status ON blog_comments(status);

-- Community
CREATE INDEX idx_connections_requester ON user_connections(requester_id);
CREATE INDEX idx_connections_recipient ON user_connections(recipient_id);
CREATE INDEX idx_connections_status ON user_connections(status);
CREATE INDEX idx_messages_sender ON user_messages(sender_id);
CREATE INDEX idx_messages_recipient ON user_messages(recipient_id);
CREATE INDEX idx_messages_read ON user_messages(read);
CREATE INDEX idx_forum_topics_category ON forum_topics(category_id);
CREATE INDEX idx_forum_topics_author ON forum_topics(author_id);
CREATE INDEX idx_forum_topics_status ON forum_topics(status);
CREATE INDEX idx_forum_topics_pinned ON forum_topics(is_pinned) WHERE is_pinned = true;
CREATE INDEX idx_forum_topics_fts ON forum_topics USING GIN (
  to_tsvector('spanish',
    coalesce(title, '') || ' ' ||
    coalesce(content, '')
  )
);
CREATE INDEX idx_forum_posts_topic ON forum_posts(topic_id);
CREATE INDEX idx_forum_posts_author ON forum_posts(author_id);
CREATE INDEX idx_forum_posts_parent ON forum_posts(parent_id);
CREATE INDEX idx_forum_posts_fts ON forum_posts USING GIN (
  to_tsvector('spanish', coalesce(content, ''))
);
CREATE INDEX idx_user_activities_user ON user_activities(user_id);
CREATE INDEX idx_user_activities_type ON user_activities(activity_type);
CREATE INDEX idx_user_activities_entity ON user_activities(entity_type, entity_id);
CREATE INDEX idx_user_activities_created ON user_activities(created_at);

-- AI Features
CREATE INDEX idx_content_embeddings_type_id ON content_embeddings(content_type, content_id);
CREATE INDEX idx_content_embeddings_model ON content_embeddings(model_id);
CREATE INDEX idx_content_embeddings_vector ON content_embeddings USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_user_interests_user ON user_interests(user_id);
CREATE INDEX idx_user_interests_type ON user_interests(interest_type);
CREATE INDEX idx_recommendations_user ON content_recommendations(user_id);
CREATE INDEX idx_recommendations_content ON content_recommendations(content_type, content_id);
CREATE INDEX idx_recommendations_score ON content_recommendations(score DESC);

-- Reporting
CREATE INDEX idx_report_executions_template ON report_executions(template_id);
CREATE INDEX idx_report_executions_schedule ON report_executions(schedule_id);
CREATE INDEX idx_report_executions_status ON report_executions(status);
```

## 4. Functions and Triggers

```sql
-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Event registration trigger
CREATE OR REPLACE FUNCTION process_event_registration()
RETURNS TRIGGER AS $$
BEGIN
  -- Update current registrations count
  UPDATE events
  SET current_registrations = (
    SELECT count(*)
    FROM event_registrations
    WHERE event_id = NEW.event_id
    AND status = 'confirmed'
  )
  WHERE id = NEW.event_id;

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_profiles_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_timestamp();

CREATE TRIGGER handle_event_registration
  AFTER INSERT OR UPDATE ON event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION process_event_registration();

-- AI content embedding update trigger
CREATE OR REPLACE FUNCTION update_content_embedding()
RETURNS trigger AS $$
DECLARE
  v_model_id uuid;
  v_embedding vector(1536);
BEGIN
  -- Get active model
  SELECT id INTO v_model_id
  FROM ai_models
  WHERE type = 'embedding'
  AND is_active = true
  LIMIT 1;

  -- Generate embedding based on content type
  CASE TG_TABLE_NAME
    WHEN 'events' THEN
      -- Generate event embedding
      SELECT embedding INTO v_embedding
      FROM ai_models am
      CROSS JOIN (
        SELECT NEW.title || ' ' || NEW.description as content
      ) e
      WHERE am.id = v_model_id;

    WHEN 'resources' THEN
      -- Generate resource embedding
      SELECT embedding INTO v_embedding
      FROM ai_models am
      CROSS JOIN (
        SELECT NEW.title || ' ' || NEW.description as content
      ) r
      WHERE am.id = v_model_id;

    WHEN 'blog_posts' THEN
      -- Generate blog post embedding
      SELECT embedding INTO v_embedding
      FROM ai_models am
      CROSS JOIN (
        SELECT NEW.title || ' ' || NEW.content as content
      ) b
      WHERE am.id = v_model_id;
  END CASE;

  -- Update or insert embedding
  INSERT INTO content_embeddings (
    content_type,
    content_id,
    model_id,
    embedding,
    metadata
  )
  VALUES (
    TG_TABLE_NAME,
    NEW.id,
    v_model_id,
    v_embedding,
    CASE TG_TABLE_NAME
      WHEN 'events' THEN
        jsonb_build_object(
          'title', NEW.title,
          'date', NEW.date,
          'categories', NEW.event_type
        )
      WHEN 'resources' THEN
        jsonb_build_object(
          'title', NEW.title,
          'type', NEW.type,
          'tags', NEW.tags
        )
      WHEN 'blog_posts' THEN
        jsonb_build_object(
          'title', NEW.title,
          'tags', NEW.tags
        )
    END
  )
  ON CONFLICT (content_type, content_id, model_id)
  DO UPDATE SET
    embedding = EXCLUDED.embedding,
    metadata = EXCLUDED.metadata,
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for content embedding updates
CREATE TRIGGER update_event_embedding
  AFTER INSERT OR UPDATE OF title, description, event_type ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_content_embedding();

CREATE TRIGGER update_resource_embedding
  AFTER INSERT OR UPDATE OF title, description, tags ON resources
  FOR EACH ROW
  EXECUTE FUNCTION update_content_embedding();

CREATE TRIGGER update_blog_embedding
  AFTER INSERT OR UPDATE OF title, content, tags ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_content_embedding();
```

````

## 5. Row Level Security (RLS)

```sql
-- Helper function for admin check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published events are viewable by everyone"
  ON events FOR SELECT
  USING (status = 'published');

CREATE POLICY "Organizers can manage their events"
  ON events FOR ALL
  USING (auth.uid() = organizer_id);

CREATE POLICY "Admins can manage all events"
  ON events FOR ALL
  USING (public.is_admin());

-- Resources
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published resources"
  ON resources FOR SELECT
  USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Users can manage their own resources"
  ON resources FOR ALL
  USING (author_id = auth.uid());

-- Blog
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authors can manage their posts"
  ON blog_posts FOR ALL
  USING (author_id = auth.uid());

-- Community
ALTER TABLE user_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active topics"
  ON forum_topics FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can create topics"
  ON forum_topics FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can manage their topics"
  ON forum_topics FOR UPDATE
  USING (author_id = auth.uid());

CREATE POLICY "Users can view their messages"
  ON user_messages FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON user_messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can manage their connections"
  ON user_connections FOR ALL
  USING (requester_id = auth.uid() OR recipient_id = auth.uid());

-- Reporting
ALTER TABLE report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage report templates"
  ON report_templates FOR ALL
  USING (public.is_admin());

CREATE POLICY "Users can view active report templates"
  ON report_templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can manage their own schedules"
  ON report_schedules FOR ALL
  USING (created_by = auth.uid());

CREATE POLICY "Admins can manage all schedules"
  ON report_schedules FOR ALL
  USING (public.is_admin());

CREATE POLICY "Users can view their own executions"
  ON report_executions FOR SELECT
  USING (created_by = auth.uid());

CREATE POLICY "Admins can view all executions"
  ON report_executions FOR SELECT
  USING (public.is_admin());
````

## 6. Performance Optimizations

```sql
-- Materialized view for event statistics
CREATE MATERIALIZED VIEW event_statistics AS
SELECT
  e.id as event_id,
  e.title,
  count(DISTINCT er.id) as total_registrations,
  count(DISTINCT CASE WHEN er.status = 'confirmed' THEN er.id END) as confirmed_registrations,
  count(DISTINCT CASE WHEN er.check_in_time IS NOT NULL THEN er.id END) as checked_in_count,
  avg(CASE WHEN er.amount_paid IS NOT NULL THEN er.amount_paid END) as avg_ticket_price,
  json_agg(DISTINCT ec.name) as categories
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id
LEFT JOIN event_category_mappings ecm ON e.id = ecm.event_id
LEFT JOIN event_categories ec ON ecm.category_id = ec.id
GROUP BY e.id, e.title;

-- Refresh function for materialized views
CREATE OR REPLACE FUNCTION refresh_event_statistics()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY event_statistics;
END;
$$ LANGUAGE plpgsql;
```
