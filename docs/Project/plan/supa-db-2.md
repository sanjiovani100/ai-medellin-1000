# Medellin AI Platform - Supabase Database Schema (Part 2)

> This is part 2 of the database schema documentation. See the master document at [supabase.md](./supabase.md) for the complete schema.

## 2. Core Tables (Part 2)

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
