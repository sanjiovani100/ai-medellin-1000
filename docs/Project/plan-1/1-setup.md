# Medellin AI Platform Implementation Plan

## Executive Summary

This document outlines a comprehensive, error-resistant implementation plan for the Medellin AI event platform. It provides a structured approach to project setup, development, and deployment that emphasizes best practices, standardization, and error prevention at every step. Following this plan will ensure a solid foundation for the platform while minimizing common deployment issues, dependency conflicts, and configuration errors.

## Table of Contents

1. [Project Structure & Architecture](#1-project-structure--architecture)
2. [Dependency Management Strategy](#2-dependency-management-strategy)
3. [Event Management System](#3-event-management-system)
4. [Authentication System](#4-authentication-system)
5. [Responsive UI Implementation](#5-responsive-ui-implementation)
6. [Supabase Database Setup](#6-supabase-database-setup)
7. [Test Implementation](#7-test-implementation)
8. [CI/CD and Deployment Strategy](#8-cicd-and-deployment-strategy)
9. [Error Prevention Features](#9-error-prevention-features)
10. [Documentation Strategy](#10-documentation-strategy)
11. [Implementation Timeline](#11-implementation-timeline)

## 1. Project Structure & Architecture

### 1.1 Directory Structure

The project will follow a flat, optimized structure for clarity and maintainability:

```
medellinai-event-platform/
├── public/                    # Static assets
│   ├── images/                # Image assets
│   ├── fonts/                 # Font files
│   └── favicon.ico            # Site favicon
├── src/                       # Application source code
│   ├── app/                   # Next.js App Router pages
│   │   ├── (auth)/            # Authentication-related routes
│   │   ├── (main)/            # Main application routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Shared components
│   │   ├── events/            # Event-specific components
│   │   ├── forms/             # Form components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Basic UI elements
│   ├── lib/                   # Utility functions and libraries
│   │   ├── supabase/          # Supabase client and utilities
│   │   ├── validation/        # Form validation schemas
│   │   └── utils/             # General utility functions
│   ├── hooks/                 # Custom React hooks
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript type definitions
├── tests/                     # Test files
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # End-to-end tests
├── .github/                   # GitHub Actions workflows
│   └── workflows/             # CI/CD workflow definitions
├── supabase/                  # Supabase configurations and migrations
│   ├── migrations/            # Database migrations
│   └── functions/             # Edge and database functions
├── docs/                      # Documentation (not deployed)
│   ├── architecture/          # Architecture diagrams and docs
│   ├── development/           # Development guides
│   └── deployment/            # Deployment procedures
├── scripts/                   # Build and utility scripts
├── .env.example               # Example environment variables
├── .eslintrc.json            # ESLint configuration
├── .prettierrc               # Prettier configuration
├── .npmrc                     # NPM configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest configuration
├── cypress.config.ts         # Cypress configuration
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel deployment configuration
└── README.md                 # Project overview
```

### 1.2 Configuration Files

#### Next.js Configuration (next.config.js)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "app.medellinai.events"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["canvas"],
    instrumentationHook: true,
  },
  // Enable output file tracing for Vercel
  output: "standalone",
};

module.exports = nextConfig;
```

#### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 1.3 Environment Variables

Create a comprehensive `.env.example` file:

```
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_ADVANCED_FEATURES=false
```

Add environment validation script in `scripts/validate-env.js`:

```javascript
#!/usr/bin/env node
const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_APP_URL",
];

const missing = requiredEnvVars.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missing.join(", ")
  );
  process.exit(1);
}

console.log("✅ All required environment variables are present");
```

Add TypeScript environment variable validation in `src/lib/env.ts`:

```typescript
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

// Validate environment variables at runtime
try {
  envSchema.parse(process.env);
} catch (error) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(error.format(), null, 2)
  );
  throw new Error("Invalid environment variables");
}

export const env = envSchema.parse(process.env);
```

### 1.4 Implementation Steps

1. Initialize the project with the correct directory structure
2. Set up all configuration files at the root level
3. Configure environment variable validation
4. Set up import aliases for cleaner imports

## 2. Dependency Management Strategy

### 2.1 Package.json Configuration

```json
{
  "name": "medellinai-event-platform",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=18.0.0 <19.0.0",
    "npm": ">=10.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "node scripts/validate-env.js && next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "prepare": "husky install",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "0.8.7",
    "@supabase/supabase-js": "2.39.3",
    "next": "14.1.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "3.4.1",
    "zod": "3.22.4",
    "react-hook-form": "7.48.2",
    "@hookform/resolvers": "3.3.2",
    "date-fns": "2.30.0",
    "react-query": "3.39.3",
    "clsx": "2.0.0",
    "tailwind-merge": "1.14.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.1.4",
    "@testing-library/react": "14.1.0",
    "@types/jest": "29.5.7",
    "@types/node": "18.18.6",
    "@types/react": "18.2.33",
    "@types/react-dom": "18.2.14",
    "autoprefixer": "10.4.16",
    "cypress": "13.5.0",
    "eslint": "8.52.0",
    "eslint-config-next": "14.0.1",
    "husky": "8.0.3",
    "jest": "29.7.0",
    "jest-environment-jsdom": "29.7.0",
    "lint-staged": "15.0.2",
    "postcss": "8.4.31",
    "prettier": "3.0.3",
    "typescript": "5.2.2"
  }
}
```

### 2.2 Package Manager Configuration

Create `.npmrc` file:

```
engine-strict=true
save-exact=true
```

### 2.3 Dependency Update Strategy

1. Schedule monthly dependency reviews
2. Use Dependabot for automated security updates
3. Test thoroughly when updating major versions
4. Document all dependency changes in CHANGELOG.md

### 2.4 Implementation Steps

1. Set up package.json with exact version numbers
2. Configure `.npmrc` with standardized settings
3. Set up Dependabot for security updates
4. Create dependency update documentation

## 3. Event Management System

### 3.1 Data Models

Create comprehensive TypeScript interfaces in `src/types/events.ts`:

```typescript
// Base types for database entities
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// Event types
export interface EventType extends BaseEntity {
  name: string;
  description: string;
  slug: string;
}

export interface EventCategory extends BaseEntity {
  name: string;
  description: string;
  slug: string;
}

export interface EventLocation extends BaseEntity {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude?: number;
  longitude?: number;
}

export interface Event extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  short_description: string;
  start_date: string;
  end_date: string;
  is_published: boolean;
  is_featured: boolean;
  image_url?: string;
  max_attendees?: number;
  event_type_id: string;
  event_category_id: string;
  location_id?: string;
  organizer_id: string;
  event_type?: EventType;
  event_category?: EventCategory;
  location?: EventLocation;
}

// Ticket types
export interface TicketTier extends BaseEntity {
  event_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  start_sale_date: string;
  end_sale_date: string;
  is_active: boolean;
}

export interface Ticket extends BaseEntity {
  event_id: string;
  ticket_tier_id: string;
  user_id: string;
  order_id: string;
  status: "reserved" | "purchased" | "cancelled" | "checked_in";
  ticket_number: string;
  purchase_date?: string;
  check_in_date?: string;
}

// User types
export interface User extends BaseEntity {
  email: string;
  name?: string;
  avatar_url?: string;
  is_organizer: boolean;
}

// Complete event with all relationships
export interface EventComplete extends Event {
  event_type: EventType;
  event_category: EventCategory;
  location?: EventLocation;
  organizer: User;
  ticket_tiers: TicketTier[];
}
```

### 3.2 Supabase Data Access Layer

Create a data access layer in `src/lib/supabase/events.ts`:

```typescript
import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Event, EventComplete, TicketTier } from "@/types/events";

// Type for query responses
type DbResult<T> = {
  data: T | null;
  error: PostgrestError | null;
};

// Create event
export async function createEvent(
  event: Omit<Event, "id" | "created_at" | "updated_at">
): Promise<DbResult<Event>> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select("*")
      .single();

    return { data, error };
  } catch (err) {
    console.error("Error creating event:", err);
    return { data: null, error: err as PostgrestError };
  }
}

// Get event by slug
export async function getEventBySlug(
  slug: string
): Promise<DbResult<EventComplete>> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("events")
      .select(
        `
        *,
        event_type:event_type_id(*),
        event_category:event_category_id(*),
        location:location_id(*),
        organizer:organizer_id(*),
        ticket_tiers(*)
      `
      )
      .eq("slug", slug)
      .single();

    return { data: data as EventComplete, error };
  } catch (err) {
    console.error("Error getting event by slug:", err);
    return { data: null, error: err as PostgrestError };
  }
}

// List events with filters
export async function listEvents({
  category,
  type,
  featured,
  published = true,
  page = 1,
  limit = 10,
}: {
  category?: string;
  type?: string;
  featured?: boolean;
  published?: boolean;
  page?: number;
  limit?: number;
}): Promise<DbResult<Event[]>> {
  const supabase = createClient();
  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from("events")
      .select(
        `
        *,
        event_type:event_type_id(*),
        event_category:event_category_id(*)
      `
      )
      .eq("is_published", published)
      .order("start_date", { ascending: true });

    if (category) {
      query = query.eq("event_category.slug", category);
    }

    if (type) {
      query = query.eq("event_type.slug", type);
    }

    if (featured !== undefined) {
      query = query.eq("is_featured", featured);
    }

    const { data, error } = await query.range(offset, offset + limit - 1);

    return { data, error };
  } catch (err) {
    console.error("Error listing events:", err);
    return { data: null, error: err as PostgrestError };
  }
}

// Update event
export async function updateEvent(
  id: string,
  updates: Partial<Event>
): Promise<DbResult<Event>> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    return { data, error };
  } catch (err) {
    console.error("Error updating event:", err);
    return { data: null, error: err as PostgrestError };
  }
}

// Delete event
export async function deleteEvent(id: string): Promise<DbResult<null>> {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("events").delete().eq("id", id);

    return { data: null, error };
  } catch (err) {
    console.error("Error deleting event:", err);
    return { data: null, error: err as PostgrestError };
  }
}

// Create ticket tier
export async function createTicketTier(
  ticketTier: Omit<TicketTier, "id" | "created_at" | "updated_at">
): Promise<DbResult<TicketTier>> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("ticket_tiers")
      .insert(ticketTier)
      .select("*")
      .single();

    return { data, error };
  } catch (err) {
    console.error("Error creating ticket tier:", err);
    return { data: null, error: err as PostgrestError };
  }
}
```

### 3.3 Event Listing Component

Create a reusable event listing component in `src/components/events/EventList.tsx`:

```typescript
import { useState, useEffect } from 'react';
import { listEvents } from '@/lib/supabase/events';
import type { Event } from '@/types/events';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const featured = searchParams.get('featured') === 'true';

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await listEvents({
          category: category || undefined,
          type: type || undefined,
          featured: featured || undefined,
          page: 1,
          limit: 12
        });

        if (error) {
          throw new Error(error.message);
        }

        setEvents(data || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [category, type, featured]);

  // Handle filter change
  const handleFilterChange = (filters: { category?: string; type?: string; featured?: boolean }) => {
    const params = new URLSearchParams();

    if (filters.category) params.set('category', filters.category);
    if (filters.type) params.set('type', filters.type);
    if (filters.featured) params.set('featured', 'true');

    router.push(`/events?${params.toString()}`);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading events...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md my-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EventFilters
        selectedCategory={category || undefined}
        selectedType={type || undefined}
        featuredOnly={featured}
        onFilterChange={handleFilterChange}
      />

      {events.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### 3.4 Event Card Component

Create the event card component in `src/components/events/EventCard.tsx`:

```typescript
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Event } from '@/types/events';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = format(new Date(event.start_date), 'MMM d, yyyy');
  const placeholderImage = 'https://via.placeholder.com/300x200?text=Event';

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.image_url || placeholderImage}
          alt={event.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        {event.is_featured && (
          <div className="absolute top-2 right-2 bg-primary px-2 py-1 text-xs font-semibold text-white rounded">
            Featured
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{formattedDate}</span>
          {event.event_category && (
            <>
              <span>•</span>
              <span>{event.event_category.name}</span>
            </>
          )}
        </div>

        <h3 className="text-lg font-semibold line-clamp-2 mb-2">
          {event.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {event.short_description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-primary font-medium">View details</span>
        </div>
      </div>
    </Link>
  );
}
```

### 3.5 Event Detail Page

Create the event detail page in `src/app/(main)/events/[slug]/page.tsx`:

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { getEventBySlug } from '@/lib/supabase/events';
import TicketSelection from '@/components/events/TicketSelection';
import EventLocation from '@/components/events/EventLocation';

interface EventPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { data: event } = await getEventBySlug(params.slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: event.title,
    description: event.short_description,
    openGraph: {
      images: event.image_url ? [event.image_url] : [],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { data: event, error } = await getEventBySlug(params.slug);

  if (error || !event || !event.is_published) {
    notFound();
  }

  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  const formattedStartDate = format(startDate, 'EEEE, MMMM d, yyyy');
  const formattedStartTime = format(startDate, 'h:mm a');
  const formattedEndTime = format(endDate, 'h:mm a');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-6">
            <Image
              src={event.image_url || 'https://via.placeholder.com/1200x600?text=Event+Image'}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedStartDate}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formattedStartTime} - {formattedEndTime}</span>
            </div>

            {event.event_category && (
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>{event.event_category.name}</span>
              </div>
            )}
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">About this event</h2>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>

          {event.location && (
            <EventLocation location={event.location} />
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Tickets</h2>

            {event.ticket_tiers && event.ticket_tiers.length > 0 ? (
              <TicketSelection
                eventId={event.id}
                ticketTiers={event.ticket_tiers}
              />
            ) : (
              <p className="text-gray-500">No tickets available for this event.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 3.6 Implementation Steps

1. Create TypeScript interfaces for all data models
2. Implement Supabase data access layer
3. Create reusable UI components for event listing and details
4. Implement event search and filtering

## 4. Authentication System

### 4.1 Supabase Authentication Setup

Create a Supabase client in `src/lib/supabase/client.ts`:

```typescript
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

// Client component supabase client
export function createClient() {
  return createClientComponentClient<Database>();
}

// Server component supabase client
export function createServerClient() {
  return createServerComponentClient<Database>({ cookies });
}
```

### 4.2 Authentication Hooks

Create a custom authentication hook in `src/hooks/useAuth.ts`:

```typescript
import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@/types/user';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
```

### 4.3 Login Form Component

Create a login form component in `src/components/auth/LoginForm.tsx`:

```typescript
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(data.email, data.password);

      if (error) {
        setError('Invalid email or password. Please try again.');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
```

### 4.4 Registration Form Component

Create a registration form component in `src/components/auth/RegisterForm.tsx`:

```typescript
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signUp(data.email, data.password, data.name);

      if (error) {
        if (error.message.includes('email')) {
          setError('This email is already registered. Please use a different email or sign in.');
        } else {
          setError(error.message);
        }
        return;
      }

      // Success - redirect to confirmation page
      router.push('/register/confirm');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register('password')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
```

### 4.5 Protected Route Component

Create a protected route wrapper in `src/app/(protected)/layout.tsx`:

```typescript
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/client';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession();

  // If not authenticated, redirect to login
  if (!session) {
    redirect('/login?returnTo=/dashboard');
  }

  return <>{children}</>;
}
```

### 4.6 Implementation Steps

1. Set up Supabase authentication client
2. Create authentication provider and custom hooks
3. Implement login and registration forms
4. Set up protected routes
5. Configure row-level security in Supabase

## 5. Responsive UI Implementation

### 5.1 Tailwind Configuration

Create a tailwind.config.js file:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070F3',
          dark: '#0050A3',
          light: '#4E9FFF',
        },
        secondary: {
          DEFAULT: '#7928CA',
          dark: '#5C1E9E',
```
