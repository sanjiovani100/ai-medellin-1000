# Technical Documentation for Medellin AI Events Platform

## 1. Architecture Documentation

### System Overview

```mermaid
graph TD
    Client[Client Browser] --> FE[Frontend Next.js App]
    FE --> API[API Layer]
    API --> Auth[Auth Service]
    API --> Events[Event Service]
    API --> Users[User Service]
    API --> Payments[Payment Service]
    API --> Notifications[Notification Service]
    Auth --> DB[(Supabase PostgreSQL)]
    Events --> DB
    Users --> DB
    Payments --> DB
    Notifications --> DB
    Payments --> PaymentProvider[Payment Provider]
    Notifications --> EmailService[Email Service]
    Notifications --> SMSService[SMS Service]
    Notifications --> WhatsAppAPI[WhatsApp API]
```

### Component Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant APIGateway
    participant EventService
    participant Database
    
    User->>Frontend: Access event page
    Frontend->>APIGateway: Request event data
    APIGateway->>EventService: Forward request
    EventService->>Database: Query event details
    Database-->>EventService: Return event data
    EventService-->>APIGateway: Process and format data
    APIGateway-->>Frontend: Return formatted data
    Frontend-->>User: Display event information
    
    User->>Frontend: Register for event
    Frontend->>APIGateway: Send registration request
    APIGateway->>EventService: Process registration
    EventService->>Database: Create registration record
    Database-->>EventService: Confirm registration
    EventService-->>APIGateway: Return confirmation
    APIGateway-->>Frontend: Return success response
    Frontend-->>User: Display confirmation
```

### Infrastructure Topology

```mermaid
graph TD
    subgraph Production Environment
        LB[Load Balancer] --> WebApp1[Web App Instance 1]
        LB --> WebApp2[Web App Instance 2]
        WebApp1 --> Cache[Redis Cache]
        WebApp2 --> Cache
        WebApp1 --> DB[(Primary DB)]
        WebApp2 --> DB
        DB --> DBReplica[(DB Replica)]
    end
    
    subgraph Development Environment
        DevApp[Development Server] --> DevDB[(Development DB)]
    end
    
    subgraph Testing Environment
        TestApp[Testing Server] --> TestDB[(Testing DB)]
    end
    
    CDN[Content Delivery Network] --> LB
```

### Data Flow Diagram

```mermaid
graph LR
    User[User] --> |Request| FE[Frontend]
    FE --> |API Request| BE[Backend]
    BE --> |Query| DB[(Database)]
    DB --> |Results| BE
    BE --> |Response| FE
    FE --> |Render| User
    
    BE --> |Event| MQ[Message Queue]
    MQ --> |Notification| NS[Notification Service]
    NS --> |Email| ES[Email Service]
    NS --> |SMS| SMS[SMS Service]
    NS --> |WhatsApp| WA[WhatsApp API]
```

### Technology Stack Specification

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Frontend | Next.js | 14.0.0 | React framework for server-side rendering and static site generation |
| UI Components | shadcn/ui | 0.5.0 | Component library built on Radix UI |
| Styling | Tailwind CSS | 3.3.0 | Utility-first CSS framework |
| State Management | React Query | 5.0.0 | Data fetching and state management |
| Backend API | Next.js API Routes | 14.0.0 | API endpoints for client-server communication |
| Database | Supabase PostgreSQL | 16.0 | Relational database for data persistence |
| Authentication | Supabase Auth | 2.38.0 | User authentication and authorization |
| Realtime | Supabase Realtime | 2.38.0 | Realtime updates for collaborative features |
| Caching | Redis | 7.2.0 | In-memory data store for caching |
| Messaging | Bull.js | 4.11.0 | Queue management for async operations |
| Email Service | SendGrid | 7.7.0 | Email delivery service |
| SMS Service | Twilio | 4.19.0 | SMS messaging service |
| WhatsApp Integration | WhatsApp Business API | 2.44.0 | WhatsApp messaging service |
| Payment Processing | Stripe | 13.0.0 | Payment processing and subscription management |
| CI/CD | GitHub Actions | N/A | Continuous integration and deployment |
| Hosting | Vercel | N/A | Production hosting platform |

### Third-Party Integration Specifications

#### WhatsApp Integration

- **Service**: WhatsApp Business API
- **Purpose**: Send event notifications, tickets, and updates to attendees
- **Authentication**: OAuth 2.0 with token refresh
- **Rate Limits**: 1000 messages per day per phone number
- **Endpoint Base URL**: `https://graph.facebook.com/v18.0/`
- **Key Endpoints**:
  - `POST /{phone-number-id}/messages`: Send messages
  - `GET /{phone-number-id}/message_templates`: Retrieve templates
- **Webhook Events**: Message received, delivered, read

#### Stripe Integration

- **Service**: Stripe API
- **Purpose**: Process payments for event tickets and services
- **Authentication**: API Key authentication
- **Rate Limits**: 100 requests per second
- **Endpoint Base URL**: `https://api.stripe.com/v1/`
- **Key Endpoints**:
  - `POST /payment_intents`: Create payment intents
  - `POST /customers`: Create customers
  - `POST /checkout/sessions`: Create checkout sessions
- **Webhook Events**: payment_intent.succeeded, checkout.session.completed

#### SendGrid Integration

- **Service**: SendGrid API
- **Purpose**: Send transactional emails for event confirmations and updates
- **Authentication**: API Key authentication
- **Rate Limits**: 100 emails per second
- **Endpoint Base URL**: `https://api.sendgrid.com/v3/`
- **Key Endpoints**:
  - `POST /mail/send`: Send emails
  - `GET /templates`: Retrieve email templates
- **Webhook Events**: Delivered, opened, clicked, unsubscribed

### Environment Configuration Requirements

The application requires the following environment configurations:

- Development: Local development environment with hot-reloading
- Testing: Isolated environment for automated testing
- Staging: Production-like environment for QA and final testing
- Production: Live environment for end users

Each environment requires specific configuration parameters as documented in the Environment Configuration section.

## 2. Code Documentation

### Directory Structure

```
medellin-ai/
├── .github/                    # GitHub Actions workflows
├── docs/                       # Documentation
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/                # API routes
│   │   ├── (auth)/             # Authentication pages
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── events/             # Event-related pages
│   │   └── [...]/              # Other app routes
│   ├── components/             # React components
│   │   ├── ui/                 # UI components (shadcn/ui)
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components
│   │   └── [...]/              # Feature-specific components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and libraries
│   │   ├── api/                # API client functions
│   │   ├── auth/               # Authentication utilities
│   │   ├── db/                 # Database utilities
│   │   └── [...]/              # Other utilities
│   ├── models/                 # Data models and types
│   ├── providers/              # Context providers
│   ├── server/                 # Server-side code
│   │   ├── auth/               # Authentication logic
│   │   ├── db/                 # Database access logic
│   │   └── [...]/              # Other server-side modules
│   ├── styles/                 # Global styles
│   └── types/                  # TypeScript type definitions
├── .env.local                  # Local environment variables
├── .env.development            # Development environment variables
├── .env.production             # Production environment variables
├── .env.example                # Example environment variables
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

### Module Organization and Responsibilities

#### Core Modules

| Module | Responsibility |
|--------|----------------|
| `app/` | Next.js application routes and page components |
| `components/` | Reusable UI components |
| `hooks/` | Custom React hooks for shared logic |
| `lib/` | Utility functions and services |
| `models/` | Data models and TypeScript interfaces |
| `providers/` | React context providers for state management |
| `server/` | Server-side logic and API implementations |
| `styles/` | Global CSS and styling utilities |
| `types/` | Global TypeScript type definitions |

#### Feature Modules

| Feature | Description | Key Components |
|---------|-------------|----------------|
| Authentication | User authentication and authorization | SignIn, SignUp, ResetPassword |
| Events | Event creation, management, and discovery | EventList, EventDetail, EventForm |
| Ticketing | Ticket purchasing and management | TicketCheckout, TicketList, TicketDetail |
| Payments | Payment processing and invoicing | PaymentForm, PaymentHistory, InvoiceDetail |
| Notifications | Email, SMS, and in-app notifications | NotificationCenter, NotificationPreferences |
| User Management | User profile and settings | UserProfile, AccountSettings, TeamManagement |
| Analytics | Event and user analytics | AnalyticsDashboard, ReportGenerator, MetricsDisplay |

### Type Definitions and Interfaces

#### Core Types

```typescript
// User-related types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  organization_id?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'admin' | 'organizer' | 'attendee';

// Event-related types
export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: EventLocation;
  is_virtual: boolean;
  virtual_meeting_url?: string;
  organizer_id: string;
  status: EventStatus;
  max_attendees?: number;
  categories: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export interface EventLocation {
  address: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

// Ticket-related types
export interface Ticket {
  id: string;
  event_id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  quantity: number;
  available: number;
  sale_start_date: string;
  sale_end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Order and payment types
export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  currency: string;
  status: OrderStatus;
  payment_intent_id?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  ticket_id: string;
  event_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  attendee_name?: string;
  attendee_email?: string;
}
```

### Component Hierarchies

```mermaid
graph TD
    App[App] --> Layout[Layout]
    Layout --> Navbar[Navbar]
    Layout --> Footer[Footer]
    Layout --> Content[Content]
    
    Content --> HomePage[HomePage]
    Content --> EventsPage[EventsPage]
    Content --> EventDetailPage[EventDetailPage]
    Content --> CheckoutPage[CheckoutPage]
    Content --> DashboardPage[DashboardPage]
    
    EventsPage --> EventList[EventList]
    EventList --> EventCard[EventCard]
    
    EventDetailPage --> EventHeader[EventHeader]
    EventDetailPage --> EventInfo[EventInfo]
    EventDetailPage --> TicketSelection[TicketSelection]
    
    TicketSelection --> TicketTypeList[TicketTypeList]
    TicketTypeList --> TicketTypeCard[TicketTypeCard]
    
    CheckoutPage --> OrderSummary[OrderSummary]
    CheckoutPage --> PaymentForm[PaymentForm]
    
    DashboardPage --> DashboardSidebar[DashboardSidebar]
    DashboardPage --> DashboardContent[DashboardContent]
    DashboardContent --> EventManagement[EventManagement]
    DashboardContent --> TicketManagement[TicketManagement]
    DashboardContent --> AttendeeManagement[AttendeeManagement]
    DashboardContent --> Analytics[Analytics]
```

### State Management Approach

The application uses a combination of React Query and React Context for state management:

1. **React Query**: Used for server state management
   - Fetching data from APIs
   - Caching responses
   - Background refetching
   - Pagination and infinite scrolling
   - Optimistic updates

2. **React Context**: Used for UI state and authentication
   - User authentication state
   - Theme preferences
   - Application configuration
   - Feature flags

3. **Local Component State**: Used for component-specific state
   - Form inputs
   - UI interactions
   - Component-specific loading states

Example React Query hook for fetching events:

```typescript
export function useEvents(params: EventQueryParams) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => fetchEvents(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

Example React Context for authentication:

```typescript
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const session = await supabase.auth.getSession();
        if (session.data.session) {
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.data.session.user.id)
            .single();
          setUser(data as User);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Subscribe to auth changes
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser(data as User);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  
  const value = {
    user,
    isLoading,
    signIn: async (email: string, password: string) => {
      // Implementation
    },
    signOut: async () => {
      // Implementation
    },
    // Other auth methods
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

### Error Handling Patterns

The application implements a multi-layered error handling approach:

1. **API Error Handling**:
   - Standardized error response format
   - HTTP status codes for error categorization
   - Detailed error messages for debugging

2. **Client-Side Error Handling**:
   - React Query error handling with onError callbacks
   - Error boundaries for component-level error containment
   - Fallback UI components for error states

3. **Global Error Handling**:
   - Error tracking with Sentry or similar service
   - Custom error logger with context information
   - Error notifications for critical failures

Example of API error structure:

```typescript
export interface ApiError {
  statusCode: number;
  message: string;
  code: string;
  details?: Record<string, any>;
}
```

Example of error boundary component:

```typescript
export class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service
    captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

### Security Implementation Details

1. **Authentication**:
   - JWT-based authentication with Supabase Auth
   - Secure password handling with bcrypt
   - Multi-factor authentication support
   - Session management with expiration and refresh tokens

2. **Authorization**:
   - Role-based access control (RBAC)
   - Resource-based permissions
   - Row-level security in Supabase
   - API route protection with middleware

3. **Data Protection**:
   - HTTPS for all communications
   - Encryption of sensitive data at rest
   - Data minimization principles
   - PII handling according to GDPR and other regulations

Example of protected API route:

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check authentication for protected routes
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

### Performance Optimization Strategies

1. **Frontend Optimizations**:
   - Code splitting with dynamic imports
   - Image optimization with Next.js Image component
   - Lazy loading of components and resources
   - Memoization of expensive computations
   - Debouncing and throttling of user inputs
   - Virtual scrolling for large lists

2. **API Optimizations**:
   - Response caching with Cache-Control headers
   - Edge caching for static content
   - Pagination and cursor-based pagination for large datasets
   - Query optimization with efficient database indexes
   - Background processing for long-running tasks

3. **Database Optimizations**:
   - Efficient indexing strategy
   - Query optimization
   - Connection pooling
   - Prepared statements
   - Database-level caching

Example of optimized image component:

```typescript
import Image from 'next/image';

export function EventImage({ event }: { event: Event }) {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
      <Image
        src={event.image_url || '/default-event-image.jpg'}
        alt={event.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        priority={false}
        loading="lazy"
      />
    </div>
  );
}
```

Example of paginated API endpoint:

```typescript
// src/app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  
  // Parse query parameters
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const page = parseInt(url.searchParams.get('page') || '1');
  const cursor = url.searchParams.get('cursor');
  
  // Build query
  let query = supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('start_date', { ascending: true });
  
  // Apply pagination
  if (cursor) {
    query = query.gt('id', cursor).limit(limit);
  } else {
    query = query.range((page - 1) * limit, page * limit - 1);
  }
  
  // Execute query
  const { data, error, count } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // Get total count for pagination
  const { count: totalCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');
  
  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total: totalCount,
      pages: Math.ceil(totalCount / limit),
      nextCursor: data.length === limit ? data[data.length - 1].id : null,
    },
  });
}
```

## 3. API Documentation

### RESTful Endpoint Specifications

#### Authentication Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register a new user | None |
| POST | `/api/auth/login` | Log in a user | None |
| POST | `/api/auth/logout` | Log out the current user | Required |
| POST | `/api/auth/refresh` | Refresh an access token | Required |
| POST | `/api/auth/reset-password` | Request a password reset | None |
| POST | `/api/auth/reset-password/confirm` | Confirm a password reset | None |

#### Event Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/events` | List events with pagination | Optional |
| GET | `/api/events/:id` | Get event details | Optional |
| POST | `/api/events` | Create a new event | Required (Organizer) |
| PUT | `/api/events/:id` | Update an event | Required (Owner) |
| DELETE | `/api/events/:id` | Delete an event | Required (Owner) |
| GET | `/api/events/:id/tickets` | List tickets for an event | Optional |
| POST | `/api/events/:id/tickets` | Create tickets for an event | Required (Owner) |

#### Ticket Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/tickets/:id` | Get ticket details | Optional |
| PUT | `/api/tickets/:id` | Update a ticket | Required (Owner) |
| DELETE | `/api/tickets/:id` | Delete a ticket | Required (Owner) |
| GET | `/api/tickets/:id/attendees` | List attendees for a ticket | Required (Owner) |

#### Order Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/orders` | Create a new order | Required |
| GET | `/api/orders/:id` | Get order details | Required (Owner) |
| GET | `/api/orders` | List user's orders | Required |
| POST | `/api/orders/:id/pay` | Process payment for an order | Required (Owner) |
| POST | `/api/orders/:id/cancel` | Cancel an order | Required (Owner) |

#### User Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/users/me` | Get current user profile | Required |
| PUT | `/api/users/me` | Update user profile | Required |
| GET | `/api/users/me/events` | List events created by user | Required |
| GET | `/api/users/me/tickets` | List tickets purchased by user | Required |

### Request/Response Schemas

#### Example: Create Event

**Request:**

```http
POST /api/events
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Tech Conference 2025",
  "description": "Annual technology conference featuring the latest innovations",
  "start_date": "2025-06-15T09:00:00Z",
  "end_date": "2025-06-17T18:00:00Z",
  "is_virtual": false,
  "location": {
    "address": "123 Conference Center",
    "city": "Medellin",
    "state": "Antioquia",
    "country": "Colombia",
    "postal_code": "050001"
  },
  "max_attendees": 500,
  "categories": ["technology", "innovation", "networking"],
  "image_url": "https://example.com/images/tech-conf-2025.jpg"
}
```

**Response:**

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "e12d3a4b-5c6d-7e8f-9g0h-1i2j3k4l5m6n",
  "title": "Tech Conference 2025",
  "description": "Annual technology conference featuring the latest innovations",
  "start_date": "2025-06-15T09:00:00Z",
  "end_date": "2025-06-17T18:00:00Z",
  "is_virtual": false,
  "location": {
    "address": "123 Conference Center",
    "city": "Medellin",
    "state": "Antioquia",
    "country": "Colombia",
    "postal_code": "050001"
  },
  "organizer_id": "u1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
  "status": "draft",
  "max_attendees": 500,
  "categories": ["technology", "innovation", "networking"],
  "image_url": "https://example.com/images/tech-conf-2025.jpg",
  "created_at": "2024-03-01T12:00:00Z",
  "updated_at": "2024-03-01T12:00:00Z"
}
```

#### Example: Error Response

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "statusCode": 400,
  "message": "Invalid request parameters",
  "code": "INVALID_PARAMETERS",
  "details": {
    "start_date": "Start date must be in the future",
    "end_date": "End date must be after start date"
  }
}
```

### Authentication Requirements

The API uses JWT-based authentication with the following requirements:

1. **Token Format**: Bearer token in Authorization header
2. **Token Expiration**: Access tokens expire after 1 hour
3. **Token Refresh**: Refresh tokens valid for 30 days
4. **Token Storage**: Client should store tokens securely (HttpOnly cookies)

#### Authentication Flow:

1. User logs in with email/password or social provider
2. Server returns access token and refresh token
3. Client includes access token in all authenticated requests
4. When access token expires, client uses refresh token to get a new access token
5. If refresh token is invalid or expired, user must log in again

Example authentication header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Rate Limiting Policies

The API implements rate limiting to prevent abuse and ensure fair usage:

1. **Authentication Endpoints**: 10 requests per minute per IP address
2. **Public Endpoints**: 60 requests per minute per IP address
3. **Authenticated Endpoints**: 120 requests per minute per user
4. **Admin Endpoints**: 300 requests per minute per admin user

Rate limit headers are included in all API responses:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1614556800
```

### Error Response Formats

All API errors follow a standardized format:

```typescript
interface ApiError {
  statusCode: number;  // HTTP status code
  message: string;     // Human-readable error message
  code: string;        // Machine-readable error code
  details?: object;    // Additional error details
}
```

Common error codes:

| Code | Description |
|------|-------------|
| `INVALID_PARAMETERS` | Invalid request parameters |
| `RESOURCE_NOT_FOUND` | Requested resource not found |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `INTERNAL_ERROR` | Server error |
| `VALIDATION_ERROR` | Input validation failed |
| `RATE_LIMIT_EXCEEDED` | Too many requests |

### Webhook Implementation Details

The platform provides webhooks for real-time event notifications:

1. **Webhook Registration**:
   - Endpoint: `POST /api/webhooks`
   - Required fields: `url`, `events` (array of event types)
   - Optional fields: `description`, `secret` (for signature verification)

2. **Webhook Events**:
   - `event.created`: When a new event is created
   - `event.updated`: When an event is updated
   - `event.cancelled`: When an event is cancelled
   - `ticket.purchased`: When a ticket is purchased
   - `order.completed`: When an order is completed
   - `order.cancelled`: When an order is cancelled

3. **Webhook Payloads**:
   - All webhook payloads include the event type, timestamp, and relevant data
   - Payloads are signed with HMAC-SHA256 for verification

Example webhook payload:

```json
{
  "event": "ticket.purchased",
  "timestamp": "2024-03-01T12:00:00Z",
  "data": {
    "order_id": "ord_123456",
    "ticket_id": "tkt_123456",
    "event_id": "evt_123456",
    "user_id": "usr_123456",
    "quantity": 2,
    "total_amount": 100,
    "currency": "USD"
  }
}
```

## 4. Database Documentation

### Schema Diagram

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email
        string password_hash
        string name
        string avatar_url
        uuid organization_id FK
        string role
        timestamp created_at
        timestamp updated_at
    }
    
    ORGANIZATIONS {
        uuid id PK
        string name
        string logo_url
        string website
        timestamp created_at
        timestamp updated_at
    }
    
    EVENTS {
        uuid id PK
        string title
        text description
        timestamp start_date
        timestamp end_date
        boolean is_virtual
        string virtual_meeting_url
        uuid organizer_id FK
        string status
        integer max_attendees
        array categories
        string image_url
        timestamp created_at
        timestamp updated_at
    }
    
    EVENT_LOCATIONS {
        uuid id PK
        uuid event_id FK
        string address
        string city
        string state
        string country
        string postal_code
        float latitude
        float longitude
        timestamp created_at
        timestamp updated_at
    }
    
    TICKETS {
        uuid id PK
        uuid event_id FK
        string name
        text description
        decimal price
        string currency
        integer quantity
        integer available
        timestamp sale_start_date
        timestamp sale_end_date
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    ORDERS {
        uuid id PK
        uuid user_id FK
        decimal total_amount
        string currency
        string status
        string payment_intent_id
        timestamp created_at
        timestamp updated_at
    }
    
    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid ticket_id FK
        uuid event_id FK
        integer quantity
        decimal unit_price
        decimal total_price
        string attendee_name
        string attendee_email
        timestamp created_at
        timestamp updated_at
    }
    
    ATTENDEES {
        uuid id PK
        uuid event_id FK
        uuid user_id FK
        uuid ticket_id FK
        uuid order_item_id FK
        string status
        string check_in_code
        timestamp checked_in_at
        timestamp created_at
        timestamp updated_at
    }
    
    USERS ||--o{ EVENTS : "organizes"
    ORGANIZATIONS ||--o{ USERS : "has members"
    EVENTS ||--o{ TICKETS : "offers"
    EVENTS ||--|| EVENT_LOCATIONS : "has location"
    USERS ||--o{ ORDERS : "places"
    ORDERS ||--o{ ORDER_ITEMS : "contains"
    ORDER_ITEMS ||--o{ ATTENDEES : "creates"
    EVENTS ||--o{ ATTENDEES : "has"
```

### Entity Relationship Diagram

Key database relationships:

1. **Users to Events**: One-to-many (user can organize multiple events)
2. **Organizations to Users**: One-to-many (organization can have multiple users)
3. **Events to Tickets**: One-to-many (event can have multiple ticket types)
