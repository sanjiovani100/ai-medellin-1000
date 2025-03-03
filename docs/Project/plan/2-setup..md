# Intermediate Phase Prompt for Medellin AI Platform Development

## Objective

Build upon the Core Phase foundation by implementing advanced event management features and integrating the Dashboard template for admin interfaces. This phase focuses on expanding functionality and enhancing the user experience.

## Context

With the Core Phase successfully implemented, the Medellin AI Platform now needs more sophisticated event management, ticketing, and community features. This phase integrates the Dashboard template for admin interfaces while expanding the Solar template for public-facing pages.

## Technical Requirements

1. **Tech Stack Additions**

   - Tremor components for data visualization and dashboards
   - Dashboard template for admin interfaces
   - Enhanced Supabase integrations (Storage, Realtime)
   - Payment processing integration

2. **Features to Implement**

   - Complete ticketing system with pricing tiers
   - Dashboard for event organizers
   - Advanced analytics for events
   - User profile enhancements
   - Resource sharing functionality
   - Initial community features

3. **New Pages & Components**
   - Event organizer dashboard
   - Analytics views with Tremor charts
   - Ticket management interface
   - Registration management system
   - Community resource library
   - Enhanced user profiles

## Implementation Instructions

### 1. Dashboard Integration

```bash
# Add Dashboard template and Tremor components
npm install @tremor/react@^3.18.0
npm install tailwindcss@^3.4
npm install @headlessui/react@^2.2
```

- Integrate the Dashboard template into the existing project structure
- Configure Tremor components with the existing styling system
- Update the Tailwind configuration to include Tremor's specifications
- Create a consistent layout system that works with both templates

### 2. Ticketing System

Implement a comprehensive ticketing system with:

- Multiple ticket tiers (general, VIP, early bird, etc.)
- Pricing management with discounts
- Ticket inventory control
- Purchase flow with payment integration
- Ticket issuance and delivery (email, QR codes)
- Attendance tracking

### 3. Admin Dashboard

Create an admin dashboard for event organizers with:

- Event performance metrics (Tremor charts)
- Attendee management
- Revenue tracking
- Event analytics
- Marketing tools
- Resource management

### 4. Community Features

Implement initial community features:

- Enhanced user profiles with interests and skills
- Resource sharing system for event materials
- Simple networking capabilities
- Basic messaging system
- User activity feeds

### 5. Enhanced Event Management

Expand the event management system with:

- Multi-session event support
- Speaker/performer management
- Venue management with interactive maps
- Event cloning and templates
- Scheduling tools
- Event series management

### 6. Registration Enhancements

Improve the registration system with:

- Customizable registration forms
- Attendee grouping and team registration
- Waitlist management
- Registration transfers
- Check-in system for events

## Database Schema Expansion

Extend the existing database schema with additional tables:

```sql
-- Tickets table for the ticketing system
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  capacity INTEGER NOT NULL,
  available INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  sales_start TIMESTAMP WITH TIME ZONE,
  sales_end TIMESTAMP WITH TIME ZONE,
  attributes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Purchases table for ticket transactions
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ticket_id UUID REFERENCES tickets(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Resources table for shared materials
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  resource_type VARCHAR(50) NOT NULL,
  file_url VARCHAR(255),
  external_url VARCHAR(255),
  visibility VARCHAR(50) NOT NULL DEFAULT 'public',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sessions table for multi-session events
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location JSONB,
  capacity INTEGER,
  speakers JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Integration Requirements

1. **Template Integration**

   - Ensure consistent styling and UX between Solar and Dashboard templates
   - Create shared components that work in both contexts
   - Implement proper navigation between public and admin areas
   - Maintain responsive design across all interfaces

2. **API Integration**

   - Extend Supabase API functions for new features
   - Implement caching strategies for performance
   - Create reusable hooks for data fetching
   - Set up payment gateway integration

3. **Security Enhancements**
   - Implement role-based access control
   - Add additional authentication features
   - Enhance Row-Level Security policies
   - Implement audit logging

## Development Approach

1. Start by integrating the Dashboard template and Tremor components
2. Implement the database schema expansion
3. Build the admin dashboard with analytics features
4. Develop the ticketing system
5. Implement enhanced event management features
6. Add community and networking features
7. Connect all systems with proper integrations
8. Test thoroughly across both templates

## Expected Deliverables

1. Fully integrated Dashboard template with admin interfaces
2. Complete ticketing system with payment processing
3. Enhanced event management features
4. Community features and resource sharing
5. Advanced analytics and reporting
6. Updated documentation covering all new features
7. Comprehensive test coverage

## Limitations & Constraints

- Maintain backward compatibility with Core Phase features
- Ensure performance optimization with increased functionality
- Keep the UI consistent between Solar and Dashboard templates
- Focus on the integration between templates for a seamless experience
- Prioritize features based on user feedback from Core Phase

This prompt provides everything needed to implement the Intermediate Phase of the Medellin AI platform, expanding the Core Phase with advanced features and integrating the Dashboard template for admin interfaces.
