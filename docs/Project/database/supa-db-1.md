# Medellin AI Platform - Supabase Database Schema (Part 1)

> This is part 1 of the database schema documentation. See the master document at [supabase.md](./supabase.md) for the complete schema.

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

## 2. Core Tables (Part 1)

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
