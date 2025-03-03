# Core Phase Development Plan for Medellin AI

This document provides a comprehensive implementation plan for the Core Phase of the Medellin AI event platform, focusing exclusively on the Solar template foundation and emphasizing error prevention from the start.

## Overview & Context

### Platform Description

The Medellin AI Platform is a comprehensive event management and marketing system designed to streamline AI-focused events in Medellín, Colombia. The platform transforms event management from a complex task into a streamlined, profitable operation, enabling organizers to focus on creating valuable experiences while maximizing revenue through ticket sales and sponsorships.

### Technical Stack

```typescript
{
  "project": "Medellin AI Platform",
  "stack": {
    "frontend": {
      "framework": "Next.js 14",
      "language": "TypeScript",
      "styling": "Tailwind CSS",
      "components": {
        "public": "Solar Template",
        "admin": "Tremor Dashboard (Phase 2)",
        "custom": "Platform Components"
      }
    },
    "backend": {
      "database": "Supabase",
      "auth": "Next-Auth + Supabase Auth",
      "storage": "Supabase Storage",
      "cache": "Redis"
    },
    "infrastructure": {
      "hosting": "Vercel",
      "ci_cd": "GitHub Actions",
      "monitoring": "Vercel Analytics"
    }
  }
}
```

### Implementation Timeline

The Core Phase (Weeks 1-2) focuses on:

1. **Foundation Phase** (Week 1):

   - Core infrastructure setup
   - Solar template configuration
   - Development environment setup
   - Project structure organization

2. **Basic Features** (Week 2):
   - User authentication system
   - Basic event management foundation
   - Responsive design implementation
   - Initial database schema setup

This phase aims to establish a solid foundation for the platform while implementing the essential features required for basic functionality. The focus is on creating a stable, error-free base that can be expanded in subsequent phases.

### Core Features Scope

For the Core Phase, we will focus on implementing these essential features:

1. **Project Infrastructure**: Setting up the development environment, configuring the Solar template, and establishing coding standards.
2. **User Authentication**: Creating secure user registration and login flows.
3. **Basic Event Management**: Implementing event creation, listing, and detail views.
4. **Responsive UI**: Adapting the Solar template for mobile-first design.
5. **Database Foundation**: Setting up the initial Supabase schema and security policies.
6. **Deployment Configuration**: Establishing the Vercel deployment pipeline.

### User Journey Integration

The Core Phase will support the following user journeys:

1. **Event Organizer**:

   - Account creation and setup
   - Event creation and basic management
   - Simple dashboard for event metrics

2. **Attendee**:
   - Event discovery and browsing
   - User registration and profile creation
   - Event details viewing

## 1. Project Structure & Initialization

### 1.1. Project Setup

```bash
# Clone the Solar template
git clone https://github.com/your-repo/template-solar.git medellinai
cd medellinai

# Install dependencies
npm install

# Initialize Git repository
git init
git add .
git commit -m "Initial commit: Solar template foundation"
```

### 1.2. Project Structure Organization

```
medellinai/
├── public/                  # Static assets
│   ├── images/              # Image assets
│   ├── MedellinAILogo.tsx   # Logo components
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── (auth)/          # Authentication routes
│   │   │   ├── login/       # Login page
│   │   │   ├── register/    # Registration page
│   │   │   └── profile/     # User profile page
│   │   ├── (events)/        # Event routes
│   │   │   ├── [id]/        # Event detail page
│   │   │   ├── create/      # Event creation page
│   │   │   └── page.tsx     # Events listing page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable components
│   │   ├── auth/            # Authentication components
│   │   ├── events/          # Event-related components
│   │   ├── layout/          # Layout components
│   │   ├── ui/              # UI components
│   │   └── shared/          # Shared utility components
│   ├── lib/                 # Utility functions
│   │   ├── auth.ts          # Authentication utilities
│   │   ├── database.ts      # Database utilities
│   │   ├── events.ts        # Event utilities
│   │   └── validation.ts    # Form validation utilities
│   ├── types/               # TypeScript type definitions
│   │   ├── auth.ts          # Authentication types
│   │   ├── events.ts        # Event types
│   │   └── index.ts         # Shared types
│   └── styles/              # Global styles
├── .env.local               # Local environment variables
├── .env.production          # Production environment variables
├── .eslintrc.json           # ESLint configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

### 1.3. Development Tools Configuration

#### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es5",
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
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

#### ESLint Configuration (.eslintrc.json)

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "react/no-unescaped-entities": "off",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### 1.4. Environment Variables Setup

#### .env.local Template

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Medellin AI

# Authentication Settings
NEXT_PUBLIC_AUTH_REDIRECT=/dashboard
```

## 2. Basic Event Management System

### 2.1. Event Data Models

```typescript
// src/types/events.ts
export interface EventLocation {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface EventOrganizer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface EventBase {
  title: string;
  description: string;
  shortDescription: string;
  startDate: Date | string;
  endDate: Date | string;
  location: EventLocation;
  capacity: number;
  imageUrl?: string;
  organizerId: string;
  organizer?: EventOrganizer;
  status: "draft" | "published" | "cancelled";
  category: string;
  tags: string[];
}

export interface Event extends EventBase {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  registrationCount: number;
}

export type EventCreateInput = Omit<EventBase, "organizerId">;
export type EventUpdateInput = Partial<EventBase>;
```

### 2.2. Event CRUD Operations

```typescript
// src/lib/events.ts
import { createClient } from "@supabase/supabase-js";
import { Event, EventCreateInput, EventUpdateInput } from "@/types/events";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*, organizer:organizers(id, name, email, phone)")
    .eq("status", "published")
    .order("startDate", { ascending: true });

  if (error) throw new Error(`Error fetching events: ${error.message}`);
  return data || [];
}

export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*, organizer:organizers(id, name, email, phone)")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Record not found
    throw new Error(`Error fetching event: ${error.message}`);
  }
  return data;
}

export async function createEvent(
  event: EventCreateInput,
  userId: string
): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .insert({
      ...event,
      organizerId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      registrationCount: 0,
    })
    .select()
    .single();

  if (error) throw new Error(`Error creating event: ${error.message}`);
  return data;
}

export async function updateEvent(
  id: string,
  event: EventUpdateInput,
  userId: string
): Promise<Event> {
  // First check if user is authorized to update this event
  const { data: existingEvent, error: fetchError } = await supabase
    .from("events")
    .select("organizerId")
    .eq("id", id)
    .single();

  if (fetchError)
    throw new Error(`Error fetching event: ${fetchError.message}`);
  if (existingEvent.organizerId !== userId)
    throw new Error("Unauthorized: You can only update your own events");

  const { data, error } = await supabase
    .from("events")
    .update({
      ...event,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error updating event: ${error.message}`);
  return data;
}

export async function deleteEvent(id: string, userId: string): Promise<void> {
  // First check if user is authorized to delete this event
  const { data: existingEvent, error: fetchError } = await supabase
    .from("events")
    .select("organizerId")
    .eq("id", id)
    .single();

  if (fetchError)
    throw new Error(`Error fetching event: ${fetchError.message}`);
  if (existingEvent.organizerId !== userId)
    throw new Error("Unauthorized: You can only delete your own events");

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) throw new Error(`Error deleting event: ${error.message}`);
}

export async function searchEvents(query: string): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*, organizer:organizers(id, name, email, phone)")
    .eq("status", "published")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order("startDate", { ascending: true });

  if (error) throw new Error(`Error searching events: ${error.message}`);
  return data || [];
}
```

### 2.3. Event Components

#### Event Card Component

```tsx
// src/components/events/EventCard.tsx
import { Event } from "@/types/events";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={event.imageUrl || "/images/event-placeholder.jpg"}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.shortDescription}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{formatDate(event.startDate)}</span>
          <span>
            {event.location.city}, {event.location.country}
          </span>
        </div>
        <Link
          href={`/events/${event.id}`}
          className="block text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
```

#### Events List Page

```tsx
// src/app/(events)/page.tsx
import { getAllEvents } from "@/lib/events";
import EventCard from "@/components/events/EventCard";
import EventSearch from "@/components/events/EventSearch";
import { Suspense } from "react";

export const revalidate = 3600; // Revalidate every hour

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      <Suspense fallback={<div>Loading search...</div>}>
        <EventSearch />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No events found. Check back later!
          </p>
        )}
      </div>
    </div>
  );
}
```

#### Event Detail Page

```tsx
// src/app/(events)/[id]/page.tsx
import { getEventById } from "@/lib/events";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative h-64 w-full">
          <Image
            src={event.imageUrl || "/images/event-placeholder.jpg"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formatDate(event.startDate)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>
                {event.location.address}, {event.location.city},{" "}
                {event.location.country}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{event.capacity} attendees max</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">About this event</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Organizer</h2>
            <p className="text-gray-700">{event.organizer?.name}</p>
            <p className="text-gray-500">{event.organizer?.email}</p>
          </div>

          <button className="block w-full md:w-auto text-center py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Register for this event
          </button>
        </div>
      </div>
    </div>
  );
}
```

## 3. User Authentication

### 3.1. Supabase Authentication Setup

```typescript
// src/lib/auth.ts
import { createClient } from "@supabase/supabase-js";
import { type User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

export type AuthFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = AuthFormData & {
  name: string;
};

export async function signUp(
  data: RegisterFormData
): Promise<{ user: User | null; error: string | null }> {
  const { email, password, name } = data;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (authError) {
      return { user: null, error: authError.message };
    }

    return { user: authData.user, error: null };
  } catch (error: any) {
    return {
      user: null,
      error: error.message || "An error occurred during sign up",
    };
  }
}

export async function signIn(
  data: AuthFormData
): Promise<{ user: User | null; error: string | null }> {
  const { email, password } = data;

  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      return { user: null, error: authError.message };
    }

    return { user: authData.user, error: null };
  } catch (error: any) {
    return {
      user: null,
      error: error.message || "An error occurred during sign in",
    };
  }
}

export async function signOut(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch (error: any) {
    return { error: error.message || "An error occurred during sign out" };
  }
}

export async function getCurrentUser(): Promise<{
  user: User | null;
  error: string | null;
}> {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return { user: null, error: error.message };
    }
    return { user: data.user, error: null };
  } catch (error: any) {
    return {
      user: null,
      error: error.message || "An error occurred while fetching user",
    };
  }
}
```

### 3.2. Authentication Components

#### Login Form Component

```tsx
// src/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { user, error } = await signIn(formData);

      if (error || !user) {
        setError(error || "An error occurred during sign in");
        return;
      }

      router.push(process.env.NEXT_PUBLIC_AUTH_REDIRECT || "/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
```

#### Registration Form Component

```tsx
// src/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        setLoading(false);
        return;
      }

      const { user, error } = await signUp(formData);

      if (error || !user) {
        setError(error || "An error occurred during registration");
        return;
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
```

### 3.3. Auth Middleware for Protected Routes

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(request: NextRequest) {
  // Create a Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get the user from Supabase auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes pattern
  const protectedRoutes = ["/dashboard", "/events/create", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Auth routes that shouldn't be accessed when logged in
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If the route is protected and the user is not authenticated
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If the route is an auth route and the user is authenticated
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except for static files, api routes, and _next
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
};
```

## 4. Responsive UI Implementation

### 4.1. Adapting Solar Template Components

#### Layout Component

```tsx
// src/components/layout/Layout.tsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

#### Navbar Component

```tsx
// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser, signOut } from "@/lib/auth";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getCurrentUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-10">
              <Image
                src="/MedellinAILogo.svg"
                alt="Medellin AI"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Main links */}
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth buttons */}
            <div className="flex items-center ml-4 space-x-2">
              {loading ? (
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
              ) : user ? (
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                    <span className="mr-1">Account</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? "text-blue-600 bg-gray-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile auth section */}
        <div className="pt-4 pb-3 border-t border-gray-200">
          {loading ? (
            <div className="px-4">
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : user ? (
            <div className="px-4 space-y-1">
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  closeMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="px-4 space-y-1">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                onClick={closeMenu}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
```

### 4.2. UI Components for Events

#### Create Event Form

```tsx
// src/components/events/CreateEventForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/events";
import { EventCreateInput } from "@/types/events";

export default function CreateEventForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState<EventCreateInput>({
    title: "",
    description: "",
    shortDescription: "",
    startDate: "",
    endDate: "",
    location: {
      address: "",
      city: "",
      country: "",
    },
    capacity: 100,
    status: "draft",
    category: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof EventCreateInput],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createEvent(formData, userId);
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Event Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="shortDescription"
              className="block text-gray-700 mb-2"
            >
              Short Description
            </label>
            <input
              id="shortDescription"
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              maxLength={150}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Brief description for event cards (max 150 characters)
            </p>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-gray-700 mb-2">
              Start Date & Time
            </label>
            <input
              id="startDate"
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-gray-700 mb-2">
              End Date & Time
            </label>
            <input
              id="endDate"
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="location.address"
              className="block text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              id="location.address"
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="location.city" className="block text-gray-700 mb-2">
              City
            </label>
            <input
              id="location.city"
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="location.country"
              className="block text-gray-700 mb-2"
            >
              Country
            </label>
            <input
              id="location.country"
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="capacity" className="block text-gray-700 mb-2">
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="networking">Networking</option>
              <option value="hackathon">Hackathon</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="tags" className="block text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex items-center">
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                placeholder="Add a tag"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="status" className="block text-gray-700 mb-2">
              Status
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === "draft"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Draft</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === "published"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Published</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
```

## 5. Supabase Database Setup

### 5.1. Database Schema

```sql
-- Users table is automatically created by Supabase Auth

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(150) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location JSONB NOT NULL,
  capacity INTEGER NOT NULL,
  image_url VARCHAR(255),
  organizer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'published', 'cancelled')),
  category VARCHAR(50) NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  registration_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('registered', 'cancelled', 'attended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Organizers table
CREATE TABLE organizers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  organization VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Profiles table to extend auth.users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(100),
  avatar_url VARCHAR(255),
  bio TEXT,
  website VARCHAR(255),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### 5.2. Row-Level Security Policies

```sql
-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  USING (status = 'published');

CREATE POLICY "Users can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Users can update their own events"
  ON events FOR UPDATE
  USING (auth.uid() = organizer_id);

CREATE POLICY "Users can delete their own events"
  ON events FOR DELETE
  USING (auth.uid() = organizer_id);

-- Registrations policies
CREATE POLICY "Users can view their own registrations"
  ON registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Event organizers can view their event registrations"
  ON registrations FOR SELECT
  USING ((SELECT organizer_id FROM events WHERE id = registrations.event_id) = auth.uid());

CREATE POLICY "Users can register for events"
  ON registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registrations"
  ON registrations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Event organizers can update registrations for their events"
  ON registrations FOR UPDATE
  USING ((SELECT organizer_id FROM events WHERE id = registrations.event_id) = auth.uid());

-- Organizers policies
CREATE POLICY "Users can view organizers"
  ON organizers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own organizer profile"
  ON organizers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own organizer profile"
  ON organizers FOR UPDATE
  USING (auth.uid() = user_id);

-- Profiles policies
CREATE POLICY "Anyone can view public profiles"
  ON profiles FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can always view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 5.3. Supabase Client Setup

```typescript
// src/lib/database.ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Generated types for Supabase schema
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type EventRow = Tables<"events">;
export type RegistrationRow = Tables<"registrations">;
export type OrganizerRow = Tables<"organizers">;
export type ProfileRow = Tables<"profiles">;
```

## 6. Vercel Deployment Configuration

### 6.1. Vercel Configuration (vercel.json)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["sin1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@next_public_supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@next_public_supabase_anon_key",
    "NEXT_PUBLIC_APP_URL": "@next_public_app_url",
    "NEXT_PUBLIC_APP_NAME": "Medellin AI"
  },
  "redirects": [
    {
      "source": "/api/auth/callback",
      "destination": "/auth/callback"
    }
  ]
}
```

### 6.2. Environment Setup Script

```bash
#!/bin/bash
# setup-environments.sh

# Set up development environment
echo "Setting up development environment..."
cp .env.example .env.local

# Generate .env files for each environment
echo "Generating environment files..."

# Development (already done with .env.local)
echo "Development environment set up at .env.local"

# Staging
cat > .env.staging << EOL
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-staging-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-supabase-anon-key

# App Configuration
NEXT_PUBLIC_APP_URL=https://staging.medellinai.com
NEXT_PUBLIC_APP_NAME=Medellin AI (Staging)

# Authentication Settings
NEXT_PUBLIC_AUTH_REDIRECT=/dashboard
EOL
echo "Staging environment set up at .env.staging"

# Production
cat > .env.production << EOL
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-supabase-anon-key

# App Configuration
NEXT_PUBLIC_APP_URL=https://medellinai.com
NEXT_PUBLIC_APP_NAME=Medellin AI

# Authentication Settings
NEXT_PUBLIC_AUTH_REDIRECT=/dashboard
EOL
echo "Production environment set up at .env.production"

echo "Environment setup complete!"
```

### 6.3. CI/CD Configuration

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Run type check
        run: npm run type-check
      - name: Run tests
        run: npm test

  deploy-preview:
    needs: lint-and-test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-staging:
    needs: lint-and-test
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel (Staging)
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"

  deploy-production:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

## Error Prevention and Testing

### Type Safety with TypeScript

```typescript
// src/types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          short_description: string;
          start_date: string;
          end_date: string;
          location: Json;
          capacity: number;
          image_url: string | null;
          organizer_id: string;
          status: "draft" | "published" | "cancelled";
          category: string;
          tags: string[];
          registration_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          short_description: string;
          start_date: string;
          end_date: string;
          location: Json;
          capacity: number;
          image_url?: string | null;
          organizer_id: string;
          status: "draft" | "published" | "cancelled";
          category: string;
          tags?: string[];
          registration_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          short_description?: string;
          start_date?: string;
          end_date?: string;
          location?: Json;
          capacity?: number;
          image_url?: string | null;
          organizer_id?: string;
          status?: "draft" | "published" | "cancelled";
          category?: string;
          tags?: string[];
          registration_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          status: "registered" | "cancelled" | "attended";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          status: "registered" | "cancelled" | "attended";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          status?: "registered" | "cancelled" | "attended";
          created_at?: string;
          updated_at?: string;
        };
      };
      organizers: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string | null;
          organization: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          phone?: string | null;
          organization?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          organization?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          website: string | null;
          is_public: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          website?: string | null;
          is_public?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          website?: string | null;
          is_public?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
```

### Error Handling Utility

```typescript
// src/lib/error-handler.ts
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export function handleApiError(error: unknown): ApiError {
  if (typeof error === "string") {
    return { message: error };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      status: (error as any).status,
    };
  }

  return { message: "An unknown error occurred" };
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateEventDates(
  startDate: string | Date,
  endDate: string | Date
): void {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime())) {
    throw new ValidationError("Invalid start date");
  }

  if (isNaN(end.getTime())) {
    throw new ValidationError("Invalid end date");
  }

  if (start >= end) {
    throw new ValidationError("End date must be after start date");
  }

  const now = new Date();
  if (start < now) {
    throw new ValidationError("Start date cannot be in the past");
  }
}
```

### Form Validation Library

```typescript
// src/lib/validation.ts
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export const eventSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be at most 100 characters"),
  shortDescription: yup
    .string()
    .required("Short description is required")
    .max(150, "Short description must be at most 150 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),
  startDate: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Start date must be in the future"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be after start date"),
  location: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
  }),
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity must be positive")
    .integer("Capacity must be an integer"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["draft", "published", "cancelled"], "Invalid status"),
  category: yup.string().required("Category is required"),
  tags: yup.array().of(yup.string()),
});

export const profileSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  bio: yup.string().nullable(),
  website: yup.string().nullable().url("Must be a valid URL"),
  isPublic: yup.boolean().default(true),
});
```

### Unit Testing Setup

```typescript
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
};
```

### Example Test for Event Utilities

```typescript
// src/lib/__tests__/events.test.ts
import { validateEventDates, ValidationError } from "../error-handler";

describe("Event Validation Functions", () => {
  describe("validateEventDates", () => {
    it("should not throw an error for valid dates", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

      expect(() => {
        validateEventDates(tomorrow, dayAfterTomorrow);
      }).not.toThrow();
    });

    it("should throw an error if end date is before start date", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const today = new Date();

      expect(() => {
        validateEventDates(tomorrow, today);
      }).toThrow(ValidationError);
    });

    it("should throw an error if start date is in the past", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(() => {
        validateEventDates(yesterday, tomorrow);
      }).toThrow(ValidationError);
    });

    it("should throw an error for invalid date formats", () => {
      expect(() => {
        validateEventDates("invalid-date", "2023-12-31");
      }).toThrow(ValidationError);

      expect(() => {
        validateEventDates("2023-01-01", "invalid-date");
      }).toThrow(ValidationError);
    });
  });
});
```

## 7. Site Structure & Navigation

Based on the sitemap document, our Core Phase implementation will focus on the essential pages and navigation structure required for the platform's initial release.

### 7.1. Public Website Pages (Solar Template)

```
medellinai/
├── Homepage (/)
│   ├── Hero Section with animated gradient
│   ├── Featured Events Grid
│   ├── About Section with Two-Column layout
│   ├── Contact Form
│   └── Call to Action Section
│
├── Events Pages (/events)
│   ├── Events Listing (/events)
│   │   ├── Search Header
│   │   ├── Event Grid/List Toggle
│   │   ├── Filter Panel
│   │   └── Pagination
│   ├── Event Details (/events/:id)
│   │   ├── Event Header
│   │   ├── Event Details
│   │   ├── Registration Area
│   │   └── Organizer Information
│
├── Authentication Pages
│   ├── Login (/auth/login)
│   ├── Register (/auth/register)
│   ├── Password Reset (/auth/reset-password)
│   └── Email Verification (/auth/verify)
│
└── Static Pages
    ├── About (/about)
    ├── Privacy Policy (/privacy)
    ├── Terms of Service (/terms)
    └── Contact (/contact)
```

### 7.2. Navigation Structure

The Core Phase implementation will include:

1. **Primary Navigation**

   - Main Navigation Bar (Desktop)
   - Mobile Menu with Hamburger Toggle
   - User Menu (when authenticated)
   - Language Selector

2. **Site-wide Components**

   - Header with Navbar
   - Footer with Links and Information
   - Breadcrumb Navigation

3. **URL Structure**
   - SEO-friendly URLs with descriptive slugs
   - Consistent route naming conventions

For the Core Phase, we'll focus on implementing these key pages and navigation structure using Solar template components. The dashboard area will be implemented in the Intermediate Phase using the Tremor Dashboard template.

## 8. User Journey Implementation

Based on the user journey documentation, we'll implement the following key journeys in the Core Phase:

### 8.1. Event Organizer Journey

1. **Event Creation Phase**

   - Account creation and setup
   - Event dashboard access
   - Basic event details input (title, description, date, time, location)
   - Category and tag assignment
   - Media upload
   - Event visibility settings
   - Draft saving

2. **Event Management**
   - Basic event metrics
   - Attendee list viewing
   - Event status control (draft, published, cancelled)

### 8.2. Attendee Journey

1. **Discovery Phase**

   - Homepage featured events
   - Events listing page with search
   - Category filtering
   - Event recommendations

2. **Registration Phase**
   - Account creation/login
   - Personal information input
   - Event registration
   - Confirmation email

The more advanced aspects of the user journeys, such as the WhatsApp integration, comprehensive marketing tools, and advanced analytics, will be implemented in subsequent phases.

## 9. Implementation Steps & Deployment Flow

1. **Project Initialization**

   - Clone the Solar template
   - Set up project structure
   - Configure development tools

2. **Setup Supabase**

   - Create Supabase project
   - Set up database schema
   - Configure authentication
   - Implement row-level security policies

3. **Implement User Authentication**

   - Create authentication utility functions
   - Develop login and registration components
   - Set up auth middleware for protected routes

4. **Basic Event Management**

   - Create event data models and types
   - Implement CRUD operations for events
   - Develop event listing and detail views

5. **UI Components**

   - Adapt Solar template components for the platform
   - Implement responsive design patterns
   - Create event-related UI components

6. **Testing & Error Prevention**

   - Implement validation functions
   - Create error handling utilities
   - Write unit tests for core functionality

7. **Vercel Deployment**
   - Configure environment variables
   - Set up CI/CD pipeline
   - Deploy to Vercel

This comprehensive implementation plan provides a solid foundation for building the Medellin AI event platform. The Core Phase focuses on creating a functional and error-resistant system that can be deployed early and improved incrementally in subsequent phases.
