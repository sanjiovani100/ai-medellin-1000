# Medellin AI Platform - Supabase Database Schema (Part 4)

> This is part 4 of the database schema documentation. See the master document at [supabase.md](./supabase.md) for the complete schema.

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
```

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
