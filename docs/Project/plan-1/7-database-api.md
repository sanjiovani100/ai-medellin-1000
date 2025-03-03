# Medellin AI Event Platform - Database & API Documentation

## 1. Introduction

This document provides comprehensive technical specifications for the Medellin AI Event Platform's data layer and APIs. It serves as the definitive reference for developers working with the platform's database, API endpoints, and Supabase integration. This documentation complements the System Requirements Specification and Setup/Deployment Guide by focusing specifically on data architecture, API design, and implementation details.

## 2. Database Schema Documentation

### 2.1 Design Philosophy

The Medellin AI Event Platform database follows these core principles:

- Normalized structure with selective denormalization for performance
- Extensive use of foreign key constraints for data integrity
- Consistent naming conventions (snake_case for all database objects)
- Temporal data tracking (created_at, updated_at) on all tables
- Soft deletion pattern throughout the system
- Role-based security implemented via Supabase RLS policies

### 2.2 Core Tables

#### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  encrypted_password VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(50),
  role VARCHAR(50) NOT NULL DEFAULT 'attendee',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  last_sign_in_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### Events Table

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location_type VARCHAR(50) NOT NULL,
  location_data JSONB,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  timezone VARCHAR(50) NOT NULL DEFAULT 'America/Bogota',
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  capacity INTEGER,
  banner_image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_private BOOLEAN DEFAULT FALSE,
  event_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);
CREATE INDEX idx_events_creator ON events(creator_id);
CREATE INDEX idx_events_dates ON events(start_date, end_date);
CREATE INDEX idx_events_status ON events(status);
```

#### Tickets Table

```sql
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'COP',
  quantity INTEGER NOT NULL,
  available_from TIMESTAMP WITH TIME ZONE,
  available_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_tickets_event ON tickets(event_id);
```

#### Registrations Table

```sql
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  event_id UUID NOT NULL REFERENCES events(id),
  ticket_id UUID NOT NULL REFERENCES tickets(id),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  quantity INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'COP',
  check_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  attendee_info JSONB,
  metadata JSONB
);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_ticket ON registrations(ticket_id);
CREATE INDEX idx_registrations_status ON registrations(status, payment_status);
```

### 2.3 Additional Key Tables

- `event_sessions`: Tracks individual sessions within events
- `speakers`: Manages speaker profiles
- `event_speakers`: Many-to-many relationship between events and speakers
- `categories`: Event categorization
- `event_categories`: Many-to-many relationship between events and categories
- `ai_recommendations`: Stores AI-generated personalized recommendations
- `user_preferences`: Stores user preferences for AI personalization
- `notifications`: System and event notifications

### 2.4 Soft Deletion Implementation

All tables implement soft deletion using a `deleted_at` timestamp column. Records are filtered using RLS policies:

```sql
CREATE POLICY "Hide deleted records" ON [table_name]
    USING (deleted_at IS NULL);
```

### 2.5 Audit Trail

Changes to critical tables are tracked in audit tables created with:

```sql
CREATE TABLE [table_name]_audit (
  id SERIAL PRIMARY KEY,
  record_id UUID NOT NULL,
  user_id UUID REFERENCES users(id),
  operation VARCHAR(10) NOT NULL,
  old_data JSONB,
  new_data JSONB,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Triggers automatically populate these tables on INSERT, UPDATE, and DELETE operations.

## 3. Entity-Relationship Diagrams

### 3.1 High-Level ER Diagram

```
                        ┌──────────┐
                        │  Users   │
                        └────┬─────┘
                    ┌────────┼────────┐
           ┌────────┴─┐    ┌─┴──────┐ │
           │ Profiles │    │ Events │ │
           └──────────┘    └─┬──────┘ │
                     ┌───────┼────────┼───────┐
            ┌────────┴─┐ ┌───┴─────┐ ┌┴───────┴──┐ ┌─────────┐
            │  Tickets │ │Sessions │ │Categories │ │Speakers │
            └────┬─────┘ └─────────┘ └───────────┘ └────┬────┘
                 │                                      │
         ┌───────┴───────┐                   ┌──────────┴────────┐
         │ Registrations │                   │ Event_Speakers    │
         └───────────────┘                   └───────────────────┘
```

### 3.2 User and Authentication Entities

- **Users**: Central identity table with authentication details
- **Profiles**: Extended user information (one-to-one with Users)
- **OAuth_Accounts**: Stores third-party authentication providers (one-to-many with Users)
- **Sessions**: Manages user sessions and refresh tokens

Key Relationships:

- A User has one Profile (1:1)
- A User can have multiple OAuth accounts (1:N)
- A User can have multiple Sessions (1:N)

### 3.3 Event Management Entities

- **Events**: Core event information
- **Event_Sessions**: Individual sessions within an event (N:1 with Events)
- **Categories**: Event classification categories
- **Event_Categories**: Many-to-many relationship between Events and Categories

Key Relationships:

- An Event belongs to one User as creator (N:1)
- An Event can have multiple Sessions (1:N)
- An Event can have multiple Categories (N:M)
- An Event can have multiple Tickets (1:N)

### 3.4 Registration and Ticketing Entities

- **Tickets**: Different ticket types for an event
- **Registrations**: User registration for an event with a specific ticket
- **Payments**: Payment records for registrations

Key Relationships:

- A Ticket belongs to one Event (N:1)
- A Registration connects a User to an Event through a Ticket
- A Registration can have one Payment (1:1)

### 3.5 AI Feature Entities

- **User_Preferences**: Stores user preferences for AI personalization
- **AI_Recommendations**: Stores AI-generated recommendations
- **User_Interactions**: Tracks user interactions for AI learning

Key Relationships:

- User_Preferences belongs to one User (N:1)
- AI_Recommendations can target a User and/or an Event
- User_Interactions track a User's interactions with Events

## 4. API Specification

### 4.1 API Design Principles

- RESTful architecture with resource-oriented endpoints
- Consistent response format and error handling
- JWT-based authentication
- API versioning via URL path (/api/v1/...)
- JSON as the standard data interchange format
- HTTPS required for all endpoints

### 4.2 Base URL and Versioning

Base URL: `https://api.medellin-ai-events.com/api/v1`

### 4.3 Authentication

- All protected endpoints require an `Authorization` header
- Format: `Bearer {jwt_token}`
- Tokens expire after 1 hour
- Refresh tokens handled via `/auth/refresh` endpoint

### 4.4 Common Response Format

Success response:

```json
{
  "status": "success",
  "data": {
    // Resource data here
  }
}
```

Error response:

```json
{
  "status": "error",
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "details": {} // Optional additional error details
  }
}
```

### 4.5 Core Endpoints

#### Authentication Endpoints

| Method | Path                 | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | /auth/signup         | Register a new user                |
| POST   | /auth/signin         | Sign in a user                     |
| POST   | /auth/refresh        | Refresh authentication token       |
| POST   | /auth/signout        | Sign out a user (invalidate token) |
| POST   | /auth/reset-password | Request password reset             |

#### User Endpoints

| Method | Path        | Description                 |
| ------ | ----------- | --------------------------- |
| GET    | /users/me   | Get current user profile    |
| PUT    | /users/me   | Update current user profile |
| GET    | /users/{id} | Get public user profile     |

#### Event Endpoints

| Method | Path                   | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | /events                | List events with filtering |
| POST   | /events                | Create a new event         |
| GET    | /events/{id}           | Get event details          |
| PUT    | /events/{id}           | Update event               |
| DELETE | /events/{id}           | Delete event (soft)        |
| GET    | /events/{id}/sessions  | List event sessions        |
| GET    | /events/{id}/tickets   | List event tickets         |
| GET    | /events/{id}/attendees | List event attendees       |

#### Ticket Endpoints

| Method | Path                 | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | /events/{id}/tickets | Create ticket for event |
| PUT    | /tickets/{id}        | Update ticket           |
| DELETE | /tickets/{id}        | Delete ticket           |

#### Registration Endpoints

| Method | Path                         | Description              |
| ------ | ---------------------------- | ------------------------ |
| POST   | /events/{id}/register        | Register for an event    |
| GET    | /registrations               | List user registrations  |
| GET    | /registrations/{id}          | Get registration details |
| PUT    | /registrations/{id}/cancel   | Cancel registration      |
| POST   | /registrations/{id}/check-in | Check in attendee        |

### 4.6 Pagination

All list endpoints support pagination with these query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Response includes pagination metadata:

```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 243,
    "pages": 13
  }
}
```

### 4.7 Filtering and Searching

List endpoints support filtering with query parameters:

- Generic filter: `?field=value`
- Range filter: `?field_min=value&field_max=value`
- Search: `?q=search term`

Example: `GET /events?status=published&start_date_min=2023-01-01&q=conference`

### 4.8 Error Codes

| Code                    | Description                     |
| ----------------------- | ------------------------------- |
| `authentication_failed` | Invalid credentials             |
| `not_authorized`        | User lacks required permissions |
| `resource_not_found`    | Resource does not exist         |
| `validation_failed`     | Request data validation failed  |
| `rate_limit_exceeded`   | Too many requests               |
| `server_error`          | Internal server error           |

## 5. Authentication and Authorization

### 5.1 Authentication Flow

1. User signs up or logs in via email/password or OAuth provider
2. Server validates credentials and returns JWT token + refresh token
3. Client includes JWT token in Authorization header for subsequent requests
4. When token expires, client uses refresh token to get a new JWT
5. Server validates refresh token and issues new JWT if valid

### 5.2 JWT Implementation

- JWT payload structure:
  ```json
  {
    "sub": "user-uuid",
    "email": "user@example.com",
    "role": "organizer",
    "exp": 1672531200,
    "iat": 1672527600,
    "iss": "medellin-ai-events"
  }
  ```
- Tokens signed with RS256 algorithm
- 1-hour expiration for access tokens
- 30-day expiration for refresh tokens

### 5.3 Role-Based Access Control

| Role        | Capabilities                                         |
| ----------- | ---------------------------------------------------- |
| `admin`     | Full system access                                   |
| `organizer` | Create/manage events, view attendees, access reports |
| `attendee`  | Register for events, view own registrations          |
| `speaker`   | View assigned sessions, update own profile           |

### 5.4 Row-Level Security Policies

Events table example:

```sql
-- Organizers can only manage their own events
CREATE POLICY "Organizers manage own events" ON events
  USING (creator_id = auth.uid())
  WITH CHECK (creator_id = auth.uid());

-- Everyone can view published events
CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (status = 'published');
```

### 5.5 Permission Granularity

Permissions follow a resource-action pattern:

- `events:read` - View events
- `events:create` - Create events
- `events:update` - Update events
- `events:delete` - Delete events
- `registrations:manage` - Manage registrations

## 6. Data Migration Procedures

### 6.1 Migration Framework

The platform uses Supabase Migrations with SQL files stored in the `supabase/migrations` directory.

### 6.2 Migration Development Workflow

1. Create a new migration:

   ```bash
   pnpm supabase migration new migration_name
   ```

2. Edit the generated SQL file:

   ```sql
   -- Migration file: supabase/migrations/20230101000000_migration_name.sql

   -- Up migration
   CREATE TABLE new_feature (...);

   -- Add comment for down migration reference
   -- Down: DROP TABLE new_feature;
   ```

3. Apply migration locally:

   ```bash
   pnpm supabase db push
   ```

4. Test migration with database tests

### 6.3 Applying Migrations to Environments

- Development: Applied manually with `supabase db push`
- Staging/Production: Applied via CI/CD pipeline with verification

### 6.4 Rollback Procedures

1. Create a rollback migration that reverts changes
2. Apply the rollback migration
3. For critical issues, restore from last known good backup

### 6.5 Large Data Migration Pattern

For large datasets:

1. Use batched operations to prevent timeouts
2. Implement with minimal locking
3. Run during maintenance windows
4. Include progress tracking:
   ```sql
   DO $$
   DECLARE
     batch_size INT := 1000;
     total INT;
     processed INT := 0;
   BEGIN
     SELECT COUNT(*) INTO total FROM large_table;
     WHILE processed < total LOOP
       -- Process batch
       UPDATE large_table SET new_column = computed_value
       WHERE id IN (SELECT id FROM large_table WHERE new_column IS NULL LIMIT batch_size);

       processed := processed + batch_size;
       RAISE NOTICE 'Processed % of % rows', processed, total;
     END LOOP;
   END $$;
   ```

## 7. Supabase Integration

### 7.1 Supabase Architecture Overview

The platform leverages these Supabase components:

- PostgreSQL database with extensions
- Supabase Auth for authentication
- Storage for file management
- Realtime subscriptions for live updates
- Edge Functions for serverless logic

### 7.2 Authentication Configuration

#### Email/Password Setup

```typescript
// Client signup
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "secure-password",
  options: {
    data: {
      full_name: "User Name",
      role: "attendee",
    },
  },
});

// Server-side custom claims
await supabase.auth.admin.updateUserById(userId, {
  user_metadata: { permissions: ["events:read"] },
});
```

#### OAuth Configuration

```typescript
// Redirect to OAuth provider
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "https://medellin-ai-events.com/auth/callback",
  },
});

// Handle callback in Next.js API route
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  // Store session and redirect
}
```

### 7.3 Database Access Patterns

#### Server-Side Queries (API Routes)

```typescript
// In Next.js API route with RLS bypassed
export async function GET(request: Request) {
  // Get authenticated user from session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Query with admin permissions
  const { data, error } = await supabase
    .from("events")
    .select("*, tickets(*), sessions(*)")
    .eq("id", eventId);

  return Response.json({ data });
}
```

#### Client-Side Queries (React Components)

```typescript
// In React component
const fetchEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("id, title, description, start_date")
    .eq("status", "published")
    .order("start_date", { ascending: true })
    .range(0, 9);

  if (error) setError(error.message);
  else setEvents(data);
};
```

### 7.4 Row Level Security Policies

```sql
-- Allow users to read their own data
CREATE POLICY "Users can view own data" ON profiles
  FOR SELECT USING (id = auth.uid());

-- Allow users to update their own data
CREATE POLICY "Users can update own data" ON profiles
  FOR UPDATE USING (id = auth.uid());

-- Allow organizers to view registrations for their events
CREATE POLICY "Organizers view event registrations" ON registrations
  FOR SELECT USING (
    event_id IN (
      SELECT id FROM events WHERE creator_id = auth.uid()
    )
  );
```

### 7.5 Realtime Functionality

```typescript
// Subscribe to new registrations for an event
const subscription = supabase
  .channel("event-registrations")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "registrations",
      filter: `event_id=eq.${eventId}`,
    },
    (payload) => {
      console.log("New registration:", payload.new);
      // Update UI with new registration
    }
  )
  .subscribe();

// Unsubscribe when component unmounts
return () => {
  supabase.removeChannel(subscription);
};
```

### 7.6 Storage Implementation

```typescript
// Upload event banner image
const uploadBanner = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `event-banners/${fileName}`;

  const { error } = await supabase.storage
    .from("events")
    .upload(filePath, file);

  if (!error) {
    const { data } = supabase.storage.from("events").getPublicUrl(filePath);

    return data.publicUrl;
  }
};
```

Storage bucket RLS policies:

```sql
-- Allow organizers to upload to their event folders
CREATE POLICY "Organizers can upload event files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'events' AND
    auth.uid() IN (
      SELECT creator_id FROM events
      WHERE id::text = (storage.foldername(name))[1]
    )
  );
```

## 8. Query Patterns and Examples

### 8.1 Optimized Event Listing Query

```typescript
// Efficient query for events listing
const { data: events } = await supabase
  .from("events")
  .select(
    `
    id, 
    title,
    description,
    start_date,
    banner_image_url,
    creator:creator_id(id, full_name),
    categories:event_categories(categories(id, name)),
    ticket_count:tickets(count),
    min_price:tickets(price)
  `
  )
  .eq("status", "published")
  .gte("start_date", new Date().toISOString())
  .order("start_date", { ascending: true });
```

### 8.2 Complex Join Example

```typescript
// Get event with all related data
const { data: eventDetails } = await supabase
  .from("events")
  .select(
    `
    *,
    creator:creator_id(*),
    tickets(*),
    sessions(
      *,
      speakers:session_speakers(
        speaker:speaker_id(*)
      )
    ),
    categories:event_categories(
      category:category_id(*)
    )
  `
  )
  .eq("id", eventId)
  .single();
```

### 8.3 Full-Text Search Implementation

```sql
-- Add full-text search capabilities
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create search index
CREATE INDEX events_search_idx ON events
  USING GIN ((
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ));

-- Search function
CREATE FUNCTION search_events(search_term TEXT)
RETURNS SETOF events AS $$
BEGIN
  RETURN QUERY
  SELECT e.*
  FROM events e
  WHERE (
    to_tsvector('english', e.title) ||
    to_tsvector('english', e.description)
  ) @@ plainto_tsquery('english', search_term)
  ORDER BY ts_rank(
    setweight(to_tsvector('english', e.title), 'A') ||
    setweight(to_tsvector('english', e.description), 'B'),
    plainto_tsquery('english', search_term)
  ) DESC;
END;
$$ LANGUAGE plpgsql;
```

### 8.4 Transaction Example

```typescript
// Registration with payment in transaction
const { data, error } = await supabase.rpc("create_registration", {
  p_user_id: userId,
  p_event_id: eventId,
  p_ticket_id: ticketId,
  p_quantity: quantity,
  p_payment_method: paymentMethod,
  p_payment_id: paymentId,
});
```

Corresponding database function:

```sql
CREATE OR REPLACE FUNCTION create_registration(
  p_user_id UUID,
  p_event_id UUID,
  p_ticket_id UUID,
  p_quantity INT,
  p_payment_method TEXT,
  p_payment_id TEXT
) RETURNS UUID AS $$
DECLARE
  v_ticket_price DECIMAL(10,2);
  v_currency VARCHAR(3);
  v_registration_id UUID;
BEGIN
  -- Get ticket price and currency
  SELECT price, currency INTO v_ticket_price, v_currency
  FROM tickets
  WHERE id = p_ticket_id;

  -- Start transaction
  BEGIN
    -- Create registration
    INSERT INTO registrations (
      user_id, event_id, ticket_id, quantity,
      total_amount, currency, status, payment_status,
      payment_method, payment_id
    ) VALUES (
      p_user_id, p_event_id, p_ticket_id, p_quantity,
      v_ticket_price * p_quantity, v_currency, 'confirmed', 'paid',
      p_payment_method, p_payment_id
    )
    RETURNING id INTO v_registration_id;

    -- Update ticket quantity
    UPDATE tickets
    SET quantity = quantity - p_quantity
    WHERE id = p_ticket_id;

    RETURN v_registration_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END;
END;
$$ LANGUAGE plpgsql;
```

## 9. API Versioning and Evolution

### 9.1 Versioning Strategy

The API uses path-based versioning:

- Current stable version: `/api/v1/...`
- New experimental version: `/api/v2/...`
- Specific dated version: `/api/2023-01-01/...`

### 9.2 Backwards Compatibility Guidelines

- Never remove fields from responses
- Add new fields as optional
- Maintain support for all previously documented query parameters
- Keep old versions operational for at least 6 months after deprecation

### 9.3 API Changelog Management

- All API changes documented in CHANGELOG.md
- Breaking changes announced at least 3 months in advance
- Deprecation notices included in response headers

## 10. Data Validation and Integrity

### 10.1 Validation Layers

- **Database**: Constraints, checks, and triggers
- **API**: Request validation using Zod schemas
- **Client**: Form validation with React Hook Form + Zod

### 10.2 Database Constraints Example

```sql
-- Events table constraints
ALTER TABLE events
  ADD CONSTRAINT events_dates_check
  CHECK (end_date > start_date);

ALTER TABLE events
  ADD CONSTRAINT events_capacity_check
  CHECK (capacity IS NULL OR capacity > 0);
```

### 10.3 API-Level Validation Example

```typescript
// Zod schema for event creation
const createEventSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).optional(),
  location_type: z.enum(["physical", "virtual", "hybrid"]),
  location_data: z.record(z.string(), z.any()),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  timezone: z.string().default("America/Bogota"),
  event_type: z.enum(["conference", "workshop", "meetup", "other"]),
  capacity: z.number().positive().optional(),
});

// Validation in API route
export async function POST(request: Request) {
  const body = await request.json();

  // Validate request body
  const result = createEventSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        status: "error",
        error: {
          code: "validation_failed",
          message: "Invalid event data",
          details: result.error.format(),
        },
      },
      { status: 400 }
    );
  }

  // Process valid data
  const validatedData = result.data;
  // ...
}
```

### 10.4 Cross-Field Validation

```typescript
// Zod schema with cross-field validation
const ticketSchema = z
  .object({
    name: z.string().min(3).max(255),
    price: z.number().min(0),
    quantity: z.number().positive(),
    available_from: z.string().datetime().optional(),
    available_until: z.string().datetime().optional(),
  })
  .refine(
    (data) =>
      !data.available_from ||
      !data.available_until ||
      new Date(data.available_until) > new Date(data.available_from),
    {
      message: "Available until must be after available from",
      path: ["available_until"],
    }
  );
```
