# Medellin AI Platform - Product Requirements Document

## Executive Summary
```typescript
{
  "product": "Medellin AI Platform",
  "vision": "Central hub for AI education and community in Medellín",
  "mainComponents": [
    "Community Platform",
    "Event Management",
    "Resource Center",
    "Analytics Dashboard"
  ]
}
```

## 1. Product Overview

### 1.1 Vision & Goals
- Central hub for AI education
- Community building platform
- Professional networking
- Knowledge sharing center

### 1.2 Target Audience
1. AI Professionals and Developers
2. Students and Academics
3. Tech Companies and Startups
4. AI Enthusiasts
5. Event Organizers
6. Corporate Training Departments

### 1.3 Key Differentiators
1. Focused on Medellin's AI ecosystem
2. Bilingual platform (Spanish/English)
3. Community-driven content
4. Integrated event management
5. Professional networking
6. Resource sharing

### 1.4 Technical Foundation
```typescript
// Base Template
{
  "template": {
    "name": "template-solar",
    "path": "C:/Users/sanji/oo-projects/medellin-ai/template-solar",
    "usage": {
      "primary": "Homepage and public-facing pages",
      "components": ["Hero", "Features", "Navigation", "Layout"]
    },
    "components": {
      "base": "src/components/*",
      "layout": "src/components/Layout",
      "navigation": "src/components/Nav"
    },
    "integration": {
      "type": "Primary",
      "areas": [
        "Homepage",
        "Marketing Pages",
        "Public Content",
        "Authentication UI"
      ]
    }
  }
}

// Dashboard Template
{
  "template": {
    "name": "tremor-dashboard",
    "source": "https://github.com/tremorlabs/template-dashboard.git",
    "path": "C:/Users/sanji/oo-projects/template-dashboard",
    "usage": "Admin and User Dashboards",
    "features": [
      "Analytics Overview",
      "KPI Tracking",
      "User Management",
      "Resource Monitoring"
    ],
    "components": {
      "charts": "src/components/charts/*",
      "tables": "src/components/tables/*",
      "cards": "src/components/cards/*",
      "layout": "src/components/layout/*"
    }
  }
}

// Technical Stack
{
  "frontend": {
    "framework": "Next.js 14",
    "ui": {
      "base": "template-solar components",
      "dashboard": "tremor-dashboard components",
      "enhanced": "@tremor/react v3.18.7"
    },
    "styling": "Tailwind CSS v3.4+"
  },
  "backend": {
    "database": "Supabase",
    "auth": "Next-Auth",
    "deployment": "Vercel"
  }
}
```

## 2. Technical Architecture

### 2.1 Frontend Architecture
```typescript
{
  "templates": {
    "marketing": {
      "name": "template-solar",
      "path": "C:/Users/sanji/oo-projects/medellin-ai/template-solar",
      "components": {
        "base": "src/components/*",
        "layout": "src/components/Layout",
        "navigation": "src/components/Nav"
      }
    },
    "dashboard": {
      "name": "tremor-dashboard",
      "source": "https://github.com/tremorlabs/template-dashboard.git",
      "path": "C:/Users/sanji/oo-projects/template-dashboard",
      "usage": "Admin and User Dashboards"
    }
  },
  "stack": {
    "framework": "Next.js 14",
    "ui": {
      "base": "template-solar components",
      "dashboard": "tremor-dashboard components",
      "enhanced": "@tremor/react v3.18.7"
    },
    "styling": "Tailwind CSS v3.4+"
  }
}
```

## 3. Core Features

### 3.1 Event Management
```typescript
{
  "features": {
    "creation": {
      "wizard": {
        "documentation": "docs/event-creation-wizard.md",
        "components": ["Tremor Form Wizard", "Solar Templates"],
        "integration": ["@tremor/react", "template-solar"]
      },
      "capabilities": [
        "Multi-step Form",
        "Real-time Validation",
        "Media Management",
        "Draft System"
      ]
    },
    "management": {
      "components": ["Event List", "Analytics", "Attendee Management"],
      "capabilities": ["Bulk Actions", "Reports", "Communications"]
    },
    "registration": {
      "components": ["Registration Flow", "Payment Integration"],
      "capabilities": ["Waitlist", "Refunds", "Notifications"]
    }
  }
}
```

### 3.2 User Management
```typescript
{
  "features": {
    "authentication": {
      "provider": "Next-Auth",
      "methods": ["Email", "OAuth", "Magic Links"]
    },
    "profiles": {
      "types": ["Personal", "Organization"],
      "features": ["Portfolio", "Connections", "History"]
    },
    "roles": {
      "types": ["Admin", "Organizer", "Member"],
      "permissions": "Role-based Access Control"
    }
  }
}
```

### 3.3 Ticketing System
```typescript
{
  "architecture": {
    "frontend": {
      "templates": {
        "public": {
          "base": "Solar Template",
          "components": {
            "EventList": "Public event listing with ticket options",
            "TicketSelection": "Ticket type and quantity selector",
            "CheckoutFlow": "Multi-step purchase process",
            "OrderConfirmation": "Post-purchase confirmation page"
          }
        },
        "dashboard": {
          "base": "Tremor Dashboard",
          "components": {
            "TicketManagement": "Admin ticket type configuration",
            "OrdersView": "Order tracking and management",
            "Analytics": "Sales and revenue analytics",
            "InventoryControl": "Stock level monitoring"
          }
        }
      }
    },
    "infrastructure": {
      "backend": {
        "database": "Supabase PostgreSQL",
        "auth": "Next-Auth with Supabase integration",
        "storage": "Supabase Storage for attachments",
        "caching": "Redis for session and cart management"
      },
      "services": {
        "payment": "Stripe API integration",
        "email": "Resend for transactional emails",
        "pdf": "React-PDF for ticket generation",
        "qr": "QRCode.react for ticket validation"
      }
    }
  },
  "features": {
    "ticketTypes": {
      "categories": {
        "earlyBird": {
          "features": ["Limited quantity", "Time-bound", "Discounted"],
          "implementation": "Tremor Card with countdown"
        },
        "regular": {
          "features": ["Standard pricing", "Main category"],
          "implementation": "Solar Card component"
        },
        "vip": {
          "features": ["Premium access", "Special benefits"],
          "implementation": "Solar Premium Card"
        },
        "group": {
          "features": ["Bulk pricing", "Corporate packages"],
          "implementation": "Tremor Table with calculations"
        }
      },
      "pricing": {
        "dynamic": ["Time-based", "Quantity-based", "Demand-based"],
        "discounts": ["Early bird", "Group rates", "Promotional codes"],
        "bundles": ["Workshop + Conference", "Multi-event packages"]
      }
    },
    "purchaseFlow": {
      "discovery": {
        "component": "Solar EventBrowser",
        "features": ["Grid layout", "Advanced filtering", "Price display"]
      },
      "selection": {
        "component": "Solar TicketSelector",
        "features": ["Type selection", "Quantity adjustment", "Add-ons"]
      },
      "checkout": {
        "component": "Solar CheckoutFlow",
        "steps": ["Cart review", "Attendee info", "Payment", "Confirmation"]
      },
      "postPurchase": {
        "features": ["Order confirmation", "Ticket delivery", "Calendar integration"]
      }
    },
    "management": {
      "inventory": {
        "component": "Tremor InventoryDashboard",
        "features": ["Stock monitoring", "Sales tracking", "Alerts"]
      },
      "analytics": {
        "component": "Tremor Analytics",
        "charts": ["Sales trends", "Revenue metrics", "Distribution"]
      },
      "orders": {
        "component": "Tremor OrderManager",
        "features": ["Tracking", "Modifications", "Refunds"]
      }
    }
  },
  "database": {
    "schema": {
      "tables": [
        "ticket_types",
        "ticket_pricing_rules",
        "ticket_orders",
        "order_items",
        "payment_transactions",
        "discount_codes"
      ],
      "documentation": "docs/ticketing-doc.md"
    },
    "optimization": {
      "indexes": ["ticket queries", "order lookups"],
      "caching": {
        "redis": ["Session data", "Cart items"],
        "supabase": ["Frequently accessed data"]
      }
    }
  },
  "security": {
    "payment": {
      "compliance": "PCI DSS",
      "provider": "Stripe",
      "features": ["Encryption", "Fraud prevention"]
    },
    "access": {
      "roles": ["Admin", "Organizer", "Attendee"],
      "permissions": "Role-based access control"
    }
  },
  "integrations": {
    "payment": {
      "provider": "Stripe",
      "features": ["Processing", "Refunds", "Disputes"]
    },
    "email": {
      "provider": "Resend",
      "templates": ["Confirmation", "Tickets", "Updates"]
    },
    "calendar": {
      "features": ["Add to calendar", "Updates", "Reminders"]
    },
    "wallet": {
      "providers": ["Apple Wallet", "Google Pay"],
      "features": ["Pass generation", "Updates"]
    }
  }
}
```

## 4. User Journeys

### 4.1 Event Organizer Journey
```typescript
{
  "phases": {
    "planning": {
      "activities": [
        "Event Conceptualization",
        "Market Research",
        "Budget Planning",
        "Venue Selection",
        "Theme Design"
      ],
      "components": {
        "planningTools": "Tremor Form blocks",
        "budgetCalculator": "Tremor Card with Charts",
        "venueSelector": "Map Integration"
      }
    },
    "creation": {
      "activities": [
        "Event Dashboard Setup",
        "Details Input",
        "Media Upload",
        "Ticketing Configuration"
      ],
      "components": {
        "eventForm": "Tremor Form Wizard",
        "mediaUpload": "Dropzone Integration",
        "ticketing": "Tremor Card blocks"
      }
    },
    "promotion": {
      "activities": [
        "Social Media Integration",
        "Email Campaign Setup",
        "Analytics Tracking"
      ],
      "components": {
        "socialDashboard": "Tremor Grid blocks",
        "emailBuilder": "Template Builder",
        "analytics": "Tremor Chart blocks"
      }
    },
    "execution": {
      "activities": [
        "Check-in Management",
        "Session Coordination",
        "Live Updates"
      ],
      "components": {
        "checkInSystem": "QR Scanner Integration",
        "sessionManager": "Tremor Timeline blocks",
        "liveUpdates": "Real-time Notification System"
      }
    }
  }
}
```

### 4.2 Attendee Journey
```typescript
{
  "phases": {
    "discovery": {
      "channels": [
        "Social Media",
        "Email Newsletter",
        "Community Forum"
      ],
      "components": {
        "eventSearch": "Tremor SearchInput",
        "filters": "Tremor MultiSelect",
        "recommendations": "AI-powered Suggestion Engine"
      }
    },
    "registration": {
      "steps": [
        "Account Creation",
        "Event Selection",
        "Payment Processing"
      ],
      "components": {
        "registrationForm": "Tremor Form blocks",
        "paymentGateway": "Stripe Integration",
        "confirmation": "Email Template System"
      }
    },
    "experience": {
      "touchpoints": [
        "Check-in Process",
        "Session Attendance",
        "Networking"
      ],
      "components": {
        "mobilePass": "Digital Ticket System",
        "sessionSchedule": "Tremor Timeline",
        "networking": "Chat Integration"
      }
    }
  }
}
```

### 4.3 WhatsApp Integration Journey
```typescript
{
  "phases": {
    "setup": {
      "components": {
        "templateBuilder": "Message Template System",
        "automationFlow": "Flow Builder Interface",
        "languageConfig": "Multi-language Support"
      }
    },
    "engagement": {
      "features": [
        "Automated Welcome Messages",
        "Event Information Delivery",
        "RSVP Management"
      ],
      "components": {
        "rsvpSystem": "Interactive Button Messages",
        "reminderSystem": "Scheduled Message Queue",
        "analytics": "Tremor Analytics Dashboard"
      }
    },
    "communication": {
      "types": [
        "Event Updates",
        "Location Sharing",
        "Support Chat"
      ],
      "components": {
        "broadcastSystem": "Bulk Message Manager",
        "locationShare": "Maps Integration",
        "supportQueue": "Chat Management System"
      }
    }
  }
}
```

## 5. Technical Implementation

### 5.1 Database Architecture

#### Users & Authentication
```sql
-- Core user profile
CREATE TABLE profiles (
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
  updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- User roles
CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role user_role DEFAULT 'attendee',
  created_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Role history tracking
CREATE TABLE role_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  changed_by uuid REFERENCES auth.users NOT NULL,
  old_role user_role,
  new_role user_role NOT NULL,
  changed_at timestamptz DEFAULT timezone('utc'::text, now())
);
```

#### Event Management
```sql
-- Events
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  format text DEFAULT 'in-person',
  status text DEFAULT 'draft',
  capacity integer,
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
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Event categories
CREATE TABLE event_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  parent_id uuid REFERENCES event_categories,
  sort_order integer DEFAULT 999,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Category mappings
CREATE TABLE event_category_mappings (
  event_id uuid REFERENCES events NOT NULL,
  category_id uuid REFERENCES event_categories NOT NULL,
  PRIMARY KEY (event_id, category_id)
);

-- Venues
CREATE TABLE venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  area text NOT NULL,
  capacity integer,
  facilities jsonb DEFAULT '[]',
  amenities jsonb DEFAULT '[]',
  accessibility_info jsonb DEFAULT '{"wheelchair_accessible": false}',
  parking_info jsonb DEFAULT '{"available": false}',
  transit_info jsonb DEFAULT '{}',
  is_approved boolean DEFAULT false,
  created_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### Event Registration & Submissions
```sql
-- Event registrations
CREATE TABLE event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  status registration_status DEFAULT 'pending',
  waitlist_position integer,
  created_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Event submissions
CREATE TABLE event_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events NOT NULL,
  submitter_id uuid REFERENCES auth.users NOT NULL,
  status submission_status DEFAULT 'pending',
  admin_feedback text,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Event requirements
CREATE TABLE event_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events,
  name text NOT NULL,
  description text,
  type requirement_type NOT NULL,
  is_mandatory boolean DEFAULT true,
  validation_rules jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### Notifications & Communications
```sql
-- Notifications
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  read boolean DEFAULT false,
  archived boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Notification preferences
CREATE TABLE notification_preferences (
  user_id uuid REFERENCES auth.users NOT NULL,
  notification_type notification_type NOT NULL,
  email_enabled boolean DEFAULT true,
  push_enabled boolean DEFAULT true,
  master_enabled boolean DEFAULT true,
  channel notification_channel DEFAULT 'both',
  notification_frequency text DEFAULT 'immediate',
  categories jsonb DEFAULT '[]',
  PRIMARY KEY (user_id, notification_type)
);

-- Communication templates
CREATE TABLE notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type notification_type NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  variables jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### Analytics & Tracking
```sql
-- Form analytics
CREATE TABLE form_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id text NOT NULL,
  user_id uuid REFERENCES auth.users,
  session_id text,
  completion_time interval,
  drop_off_step text,
  created_at timestamptz DEFAULT now()
);

-- Event metrics
CREATE TABLE event_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events NOT NULL,
  metric_type text NOT NULL,
  value numeric NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

-- Realtime analytics
CREATE TABLE realtime_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  visitor_count integer DEFAULT 1,
  last_updated timestamptz DEFAULT now()
);
```

### 5.2 API Architecture

### 5.3 Security Implementation

## 6. Quality Assurance

### 6.1 Performance Requirements
```typescript
{
  "metrics": {
    "pageLoad": "< 3 seconds",
    "timeToInteractive": "< 5 seconds",
    "apiResponse": "< 500ms"
  },
  "optimization": {
    "images": "Next/Image optimization",
    "caching": "Static and Dynamic",
    "bundling": "Code splitting"
  }
}
```

### 6.2 Testing Requirements
```typescript
{
  "coverage": {
    "unit": "80% minimum",
    "integration": "70% minimum",
    "e2e": "Critical paths"
  },
  "types": [
    "Unit Testing",
    "Integration Testing",
    "E2E Testing",
    "Performance Testing",
    "Security Testing"
  ]
}
```

## 7. Deployment & Operations

### 7.1 Deployment Strategy
```typescript
{
  "environments": {
    "development": "dev.medellinai.com",
    "staging": "staging.medellinai.com",
    "production": "medellinai.com"
  },
  "ci_cd": {
    "provider": "GitHub Actions",
    "automation": ["Testing", "Building", "Deployment"]
  }
}
```

### 7.2 Monitoring & Maintenance
```typescript
{
  "monitoring": {
    "uptime": "99.9% target",
    "alerts": "Critical issues",
    "logging": "Centralized system"
  },
  "maintenance": {
    "updates": "Weekly schedule",
    "backups": "Daily automated",
    "security": "Regular audits"
  }
}
```

## 8. Site Architecture & Navigation

### 8.1 URL Structure
```typescript
{
  "publicRoutes": {
    "home": "/",
    "events": {
      "main": "/events",
      "details": "/events/:id",
      "categories": "/events/categories/:category"
    },
    "auth": {
      "main": "/auth",
      "login": "/auth/login",
      "register": "/auth/register",
      "resetPassword": "/auth/reset-password",
      "resetConfirm": "/auth/reset-password/:token"
    },
    "content": {
      "blog": "/blog",
      "blogPost": "/blog/:slug",
      "resources": "/resources",
      "docs": "/docs"
    }
  },
  "dashboardRoutes": {
    "main": "/dashboard",
    "analytics": "/dashboard/analytics",
    "events": {
      "main": "/dashboard/events",
      "submissions": "/dashboard/events/submissions",
      "tracking": "/dashboard/events/tracking",
      "registrations": "/dashboard/events/registrations"
    },
    "profile": {
      "main": "/dashboard/profile",
      "settings": "/dashboard/settings",
      "notifications": "/dashboard/notifications",
      "billing": "/dashboard/billing"
    }
  },
  "adminRoutes": {
    "main": "/admin",
    "users": {
      "list": "/admin/users",
      "details": "/admin/users/:id"
    },
    "moderation": {
      "main": "/admin/moderation",
      "events": "/admin/moderation/events",
      "comments": "/admin/moderation/comments"
    },
    "settings": {
      "main": "/admin/settings",
      "analytics": "/admin/analytics",
      "approvals": "/admin/events/approvals"
    }
  }
}
```

### 8.2 Template Integration
```typescript
{
  "templates": {
    "solar": {
      "usage": ["Marketing", "Public Pages", "Authentication"],
      "components": {
        "layout": "src/components/Layout",
        "navigation": "src/components/Nav",
        "forms": "src/components/Forms"
      }
    },
    "tremor": {
      "usage": ["Dashboard", "Analytics", "Admin"],
      "components": {
        "charts": "src/components/charts/*",
        "tables": "src/components/tables/*",
        "cards": "src/components/cards/*"
      }
    }
  }
}
```

### 8.3 Navigation Implementation
```typescript
{
  "navigationSystems": {
    "primary": {
      "type": "Solar Navigation",
      "items": ["Home", "Events", "Resources", "Blog"],
      "auth": ["Dashboard", "Admin"],
      "features": ["Search", "Language", "User Menu"]
    },
    "dashboard": {
      "type": "Tremor Sidebar",
      "sections": ["Overview", "Events", "Analytics", "Settings"],
      "features": ["Collapse", "Quick Actions", "Breadcrumbs"]
    },
    "mobile": {
      "primary": "Hamburger Menu",
      "dashboard": "Bottom Navigation",
      "features": ["Swipe Gestures", "Quick Actions"]
    }
  }
}
```

### 8.4 Access Control
```typescript
{
  "roles": {
    "public": {
      "access": ["Home", "Events", "Blog", "Resources"],
      "permissions": ["read"]
    },
    "authenticated": {
      "access": ["Dashboard", "Profile", "Events"],
      "permissions": ["read", "create", "update"]
    },
    "organizer": {
      "access": ["Event Management", "Analytics"],
      "permissions": ["read", "create", "update", "delete"]
    },
    "admin": {
      "access": ["All Routes"],
      "permissions": ["full"]
    }
  }
}
```

### 8.5 SEO Configuration
```typescript
{
  "seo": {
    "metadata": {
      "titleTemplate": "%s | Medellin AI Platform",
      "defaultDescription": "Join Medellín's vibrant AI community...",
      "openGraph": {
        "type": "website",
        "site_name": "Medellin AI"
      }
    },
    "structuredData": {
      "organization": "schema.org/Organization",
      "event": "schema.org/Event",
      "article": "schema.org/Article"
    },
    "sitemapConfig": {
      "changefreq": "daily",
      "priority": {
        "home": 1.0,
        "events": 0.9,
        "blog": 0.8
      }
    }
  }
}
```

### 8.6 Performance Optimization
```typescript
{
  "optimization": {
    "images": {
      "formats": ["webp", "avif"],
      "sizes": ["thumbnail", "medium", "large"],
      "loading": "lazy"
    },
    "caching": {
      "static": {
        "maxAge": "30d",
        "immutable": true
      },
      "dynamic": {
        "staleWhileRevalidate": true,
        "maxAge": "1h"
      }
    },
    "codeSplitting": {
      "routes": true,
      "components": true,
      "chunks": "optimal"
    }
  }
}
```

### 5.3 Extended Database Features

#### Resource Management System
```sql
-- Resources table with comprehensive metadata
CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type resource_type NOT NULL,
  url text,
  file_path text,
  mime_type text,
  size_bytes bigint,
  author_id uuid REFERENCES auth.users NOT NULL,
  category_id uuid REFERENCES resource_categories,
  tags text[],
  is_featured boolean DEFAULT false,
  download_count integer DEFAULT 0,
  status text DEFAULT 'draft',
  visibility text DEFAULT 'public',
  meta_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Resource categories for organization
CREATE TABLE resource_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES resource_categories(id),
  icon_url text,
  sort_order integer DEFAULT 999,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Resource access logging
CREATE TABLE resource_access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources NOT NULL,
  user_id uuid REFERENCES auth.users,
  access_type text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);
```

#### Blog System
```sql
-- Blog posts with full content management
CREATE TABLE blog_posts (
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

-- Blog comments system
CREATE TABLE blog_comments (
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

#### Community Features
```sql
-- User connections for networking
CREATE TABLE user_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES auth.users NOT NULL,
  recipient_id uuid REFERENCES auth.users NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_connection UNIQUE (requester_id, recipient_id),
  CONSTRAINT no_self_connection CHECK (requester_id != recipient_id)
);

-- Direct messaging system
CREATE TABLE user_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users NOT NULL,
  recipient_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forum system
CREATE TABLE forum_categories (
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

CREATE TABLE forum_topics (
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

CREATE TABLE forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES forum_topics NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES forum_posts(id),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### AI Features & Recommendations
```sql
-- AI model configurations
CREATE TABLE ai_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  type text NOT NULL,
  version text NOT NULL,
  parameters jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Content embeddings for AI features
CREATE TABLE content_embeddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  content_id uuid NOT NULL,
  model_id uuid REFERENCES ai_models NOT NULL,
  embedding vector(1536) NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User interests for recommendations
CREATE TABLE user_interests (
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

-- Content recommendations
CREATE TABLE content_recommendations (
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

#### Reporting & Exports
```sql
-- Report templates
CREATE TABLE report_templates (
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

-- Report schedules
CREATE TABLE report_schedules (
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

-- Report executions
CREATE TABLE report_executions (
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

### 5.3 Database Optimization & Management

#### Partitioning Strategy
```sql
-- Create partitioned events table
CREATE TABLE events_partition (
  LIKE events INCLUDING ALL
) PARTITION BY RANGE (date);

-- Create partitions
CREATE TABLE events_current_year 
  PARTITION OF events_partition
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE events_next_year 
  PARTITION OF events_partition
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE events_archive 
  PARTITION OF events_partition
  FOR VALUES FROM (MINVALUE) TO ('2024-01-01');
```

#### Backup & Recovery
```sql
-- Daily backup configuration
SELECT cron.schedule(
  'daily-backup',
  '0 0 * * *',
  $$SELECT backup.create_backup('medellin_ai_backup', ARRAY['public'], '/backups')$$
);

-- Retention policy
SELECT backup.set_retention_policy(
  'medellin_ai_backup',
  interval '30 days'
);
```

#### Performance Monitoring
```sql
-- Create monitoring schema
CREATE SCHEMA monitoring;

-- Performance metrics table
CREATE TABLE monitoring.performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz DEFAULT now(),
  query_type text,
  execution_time interval,
  rows_affected integer,
  table_name text,
  query_plan jsonb
);
```
