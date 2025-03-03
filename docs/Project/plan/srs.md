# Medellin AI Platform - Software Requirements Specification

## 1. System Design

### 1.1 Overall Architecture Overview
```typescript
{
  "architecture": {
    "frontend": {
      "framework": "Next.js 14",
      "templates": {
        "public": {
          "base": "Solar Template",
          "location": "template-solar",
          "usage": ["Homepage", "Marketing", "Events"]
        },
        "dashboard": {
          "base": "Tremor Dashboard",
          "usage": ["Admin", "Analytics", "Management"]
        }
      }
    },
    "backend": {
      "database": "Supabase",
      "auth": "Next-Auth",
      "storage": "Supabase Storage",
      "caching": "Redis (optional)"
    }
  }
}
```

### 1.2 System Components
1. Frontend Components
   - Public Pages (Solar Template)
   - Admin Dashboard (Tremor)
   - Authentication System
   - Event Management
   - Resource Center

2. Backend Services
   - Database (Supabase)
   - Authentication (Next-Auth)
   - File Storage
   - Real-time Updates
   - API Layer

### 1.3 Performance Requirements
```typescript
{
  "metrics": {
    "pageLoad": "< 3 seconds",
    "timeToInteractive": "< 5 seconds",
    "apiResponse": "< 500ms",
    "uptime": "99.9%"
  },
  "optimization": {
    "images": "Next/Image optimization",
    "caching": ["Static", "Dynamic"],
    "bundling": "Code splitting"
  }
}
```

### 1.4 Integration Points
- Supabase for Database and Auth
- Cloudinary for Image Management
- Next-Auth for Authentication
- Redis for Caching (optional)
- Email Service Provider
- Payment Gateway

## 2. Architecture Pattern

### 2.1 Frontend Architecture
```typescript
{
  "patterns": {
    "pages": {
      "public": "Solar Template Components",
      "dashboard": "Tremor Dashboard Components",
      "shared": ["Typography", "Colors", "Layout"]
    },
    "stateManagement": {
      "global": "React Context",
      "server": "React Query",
      "forms": "React Hook Form"
    },
    "routing": "Next.js App Router"
  }
}
```

### 2.2 Backend Architecture
```typescript
{
  "services": {
    "database": {
      "type": "PostgreSQL",
      "provider": "Supabase",
      "features": ["RLS", "Real-time", "Full-text Search"]
    },
    "storage": {
      "provider": "Supabase Storage",
      "buckets": ["events", "profiles", "resources"]
    },
    "auth": {
      "provider": "Next-Auth",
      "strategies": ["Email", "OAuth", "Magic Links"]
    }
  }
}
```

### 2.3 Component Organization
```typescript
{
  "structure": {
    "src/": {
      "app/": "Next.js App Router pages",
      "components/": "Reusable UI components",
      "lib/": "Utility functions",
      "features/": "Feature-specific logic",
      "hooks/": "Custom React hooks",
      "types/": "TypeScript definitions"
    }
  }
}
```

## 3. State Management

### 3.1 Client-side State
```typescript
{
  "global": {
    "tool": "React Context",
    "usage": ["Theme", "Auth", "Preferences"]
  },
  "server": {
    "tool": "React Query",
    "config": {
      "staleTime": "5 minutes",
      "cacheTime": "30 minutes",
      "retry": 2
    }
  },
  "forms": "React Hook Form + Zod"
}
```

### 3.2 Server-side State
- Database as source of truth
- Real-time subscriptions for live updates
- Cache invalidation strategies
- Optimistic updates for better UX

## 4. Data Flow

### 4.1 Request/Response Patterns
```typescript
interface APIResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
  };
  error?: string;
}
```

### 4.2 Real-time Communication
```typescript
{
  "subscriptions": {
    "events": ["status", "registration"],
    "chat": ["messages", "presence"],
    "notifications": ["system", "personal"]
  }
}
```

### 4.3 Error Handling
```typescript
{
  "strategies": {
    "api": {
      "retry": true,
      "fallback": "cached data",
      "notification": "user feedback"
    },
    "forms": {
      "validation": "client-side",
      "submission": "server-side",
      "feedback": "inline errors"
    }
  }
}
```

## 5. Technical Stack

### 5.1 Frontend Technologies
- Next.js 14
- TypeScript
- Tailwind CSS
- @tremor/react v3.18.7
- React Query
- React Hook Form
- Zod

### 5.2 Backend Services
- Supabase (PostgreSQL)
- Next-Auth
- Supabase Storage
- Redis (optional)
- Vercel (deployment)

### 5.3 Development Tools
- PNPM
- ESLint
- Prettier
- Jest
- Cypress
- GitHub Actions

## 6. Authentication Process

### 6.1 User Authentication Flow
```typescript
{
  "methods": {
    "email": "Email/Password",
    "oauth": ["Google", "GitHub"],
    "magic": "Magic Links"
  },
  "session": {
    "duration": "7 days",
    "renewal": "sliding expiration"
  }
}
```

### 6.2 Authorization Levels
```typescript
type UserRole = 'admin' | 'organizer' | 'member' | 'attendee';

interface Permissions {
  view: boolean;
  edit: boolean;
  delete: boolean;
  manage: boolean;
}
```

## 7. Route Design

### 7.1 Public Routes
```typescript
{
  "pages": {
    "/": "Homepage",
    "/events": "Event Discovery",
    "/about": "About Page",
    "/contact": "Contact Page",
    "/blog": "Blog Section"
  }
}
```

### 7.2 Protected Routes
```typescript
{
  "dashboard": {
    "/dashboard": "Overview",
    "/dashboard/events": "Event Management",
    "/dashboard/analytics": "Analytics",
    "/dashboard/settings": "Settings"
  }
}
```

## 8. API Design

### 8.1 REST Endpoints
```typescript
{
  "events": {
    "GET /api/events": "List events",
    "POST /api/events": "Create event",
    "GET /api/events/:id": "Get event",
    "PUT /api/events/:id": "Update event",
    "DELETE /api/events/:id": "Delete event"
  }
}
```

### 8.2 WebSocket Endpoints
```typescript
{
  "subscriptions": {
    "event_updates": "Real-time event updates",
    "chat_messages": "Live chat messages",
    "notifications": "System notifications"
  }
}
```

## 9. Database Design ERD

### 9.1 Core Tables
```sql
-- Users and Profiles
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  first_name text,
  last_name text,
  email text UNIQUE,
  avatar_url text,
  bio text,
  ai_interests jsonb DEFAULT '[]',
  skills jsonb DEFAULT '[]',
  signup_completed boolean DEFAULT false
);

-- Events
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  capacity integer,
  status text DEFAULT 'draft',
  organizer_id uuid REFERENCES auth.users
);

-- Registrations
CREATE TABLE registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events,
  user_id uuid REFERENCES auth.users,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
```

### 9.2 Relationships
- Users → Profiles (1:1)
- Users → Events (1:many, as organizer)
- Events → Registrations (1:many)
- Users → Registrations (1:many)

### 9.3 Indexes
```sql
-- Profiles
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_signup_completed ON profiles(signup_completed);

-- Events
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_organizer ON events(organizer_id);

-- Registrations
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_status ON registrations(status);
``` 