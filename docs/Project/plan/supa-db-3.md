# Medellin AI Platform - Supabase Database Schema (Part 3)

> This is part 3 of the database schema documentation. See the master document at [supabase.md](./supabase.md) for the complete schema.

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
