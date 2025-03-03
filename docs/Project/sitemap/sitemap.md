# Medellin AI Platform Sitemap Documentation

## Overview
This document outlines the complete sitemap structure for the Medellin AI platform, detailing page hierarchies, access levels, navigation relationships, and template integrations.

## 1. Public Website Area (Solar Template)

### 1.1 Homepage (/)
- **Access Level**: Public
- **Template**: Solar
- **Components**:
  - Hero Section with animated gradient
  - Event Grid (Tremor Card Grid)
  - Community Metrics (Tremor Metrics)
  - About Section (Solar Two-Column)
  - Contact Form (Tremor Form)
- **URL Structure**: /
- **Meta Information**: 
  - Title: "Medellin AI - Building the Future of AI in Colombia"
  - Description: "Join Medellín's vibrant AI community. Discover AI events, workshops, and networking opportunities."
- **SEO Requirements**:
  - Schema.org markup for organization
  - Open Graph tags for social sharing
  - Event rich snippets
- **Cross-linking**: Events, About, Community, Authentication
- **Language Support**: ES/EN

### 1.2 Events Discovery (/events)
- **Access Level**: Public
- **Template**: Solar + Tremor
- **Components**:
  - Search Header (Solar)
  - Event Grid/List Toggle (Tremor)
  - Filter Panel (Tremor)
  - Event Cards (Solar Enhanced)
  - Pagination (Tremor)
- **URL Structure**:
  - Main: /events
  - Event Details: /events/:id
  - Categories: /events/categories/:category
- **Parent**: Homepage
- **Meta Information**:
  - Dynamic titles based on filters/categories
  - Event-specific meta descriptions
- **SEO Requirements**:
  - Event schema markup
  - Filterable/searchable content
  - Category-based organization
- **Cross-linking**: Individual events, Categories, Registration

### 1.3 Authentication Pages
- **Access Level**: Public
- **Template**: Solar
- **Components**:
  - Auth Forms (Solar + Tremor)
  - Social Login Buttons
  - Password Reset Flow
- **URL Structure**:
  - Main: /auth
  - Login: /auth/login
  - Register: /auth/register
  - Password Reset: /auth/reset-password
  - Password Reset Confirmation: /auth/reset-password/:token
- **Parent**: Homepage
- **SEO Requirements**: No indexing
- **Meta Information**: Security headers, no-cache directives

### 1.4 Static Pages
- **Access Level**: Public
- **URL Structure**:
  - About: /about
  - Privacy Policy: /privacy
  - Terms of Service: /terms
  - Contact: /contact
- **Parent**: Homepage
- **SEO Requirements**: Standard indexing
- **Meta Information**: 
  - Unique meta descriptions
  - Last updated timestamps
- **Cross-linking**: Footer navigation, Legal documentation

### 1.5 Content Pages
- **Access Level**: Public
- **URL Structure**:
  - Blog: /blog
  - Blog Post: /blog/:slug
  - Resources: /resources
  - Documentation: /docs
- **Parent**: Homepage
- **SEO Requirements**:
  - Blog post schema markup
  - Category and tag organization
  - Author information
- **Cross-linking**: Related posts, Categories, Author profiles

## 2. Dashboard Area (Tremor Dashboard Template)

### 2.1 Main Dashboard (/dashboard)
- **Access Level**: Private (Authenticated)
- **Template**: Tremor Dashboard
- **Components**:
  - KPI Cards Section
    * Total Events Card
    * Active Users Card
    * Engagement Rate Card
    * Resource Usage Card
  - Chart Compositions
    * User Growth Area Chart
    * Event Performance Bar Chart
    * Category Distribution Chart
  - Activity Feed
    * Recent Events List
    * Latest Registrations
    * System Updates
  - Quick Actions Menu
- **URL Structure**: /dashboard
- **Meta Information**: No indexing

### 2.2 Analytics Dashboard
- **Access Level**: Private
- **Template**: Tremor Dashboard
- **Components**:
  - Performance Metrics
    * Growth Rate Tracking
    * Conversion Metrics
    * Retention Analysis
  - Data Visualization
    * Trend Charts
    * Comparison Analytics
    * Distribution Graphs
  - Filtering Options
- **URL Structure**: /dashboard/analytics
- **Parent**: Dashboard

### 2.3 Event Management
- **Access Level**: Private (Organizer/Admin)
- **Template**: Tremor + Solar
- **Components**:
  - Event Creation Wizard
    * Multi-step Form (Tremor)
    * Media Upload (Solar)
    * Preview (Solar)
  - Event List (Tremor Table)
  - Analytics Dashboard (Tremor)
  - Registration Management (Tremor)
- **URL Structure**:
  - Event Dashboard: /dashboard/events
  - Submissions: /dashboard/events/submissions
  - Tracking: /dashboard/events/tracking
  - Registrations: /dashboard/events/registrations
- **Parent**: Dashboard
- **Cross-linking**: Event details, Attendee lists, Analytics

### 2.4 Profile & Settings
- **Access Level**: Private
- **URL Structure**:
  - Profile: /dashboard/profile
  - Settings: /dashboard/settings
  - Notifications: /dashboard/notifications
  - Billing: /dashboard/billing
- **Parent**: Dashboard
- **Cross-linking**: Account preferences, Payment history

## 3. Admin Portal (Tremor Dashboard Template)

### 3.1 Admin Dashboard (/admin)
- **Access Level**: Admin only
- **Template**: Tremor Dashboard
- **Components**:
  - System Metrics (Tremor KPI)
  - User Analytics (Tremor Charts)
  - Activity Logs (Tremor Tables)
  - Quick Actions (Tremor Buttons)
- **URL Structure**: /admin
- **Meta Information**: No indexing, Strict security headers

### 3.2 User Management
- **Access Level**: Admin only
- **URL Structure**: 
  - Users List: /admin/users
  - User Details: /admin/users/:id
- **Parent**: Admin Dashboard
- **Features**: 
  - Role management
  - Account status
  - Activity monitoring

### 3.3 Content Moderation
- **Access Level**: Admin only
- **URL Structure**: 
  - Main: /admin/moderation
  - Event Reviews: /admin/moderation/events
  - Comment Reviews: /admin/moderation/comments
- **Parent**: Admin Dashboard

### 3.4 System Settings
- **Access Level**: Admin only
- **URL Structure**: 
  - Settings: /admin/settings
  - Analytics: /admin/analytics
  - Event Approvals: /admin/events/approvals
- **Parent**: Admin Dashboard

## 4. Navigation Structure

### 4.1 Primary Navigation
- **Template**: Solar
- **Components**:
  - Main Navigation Bar
  - User Menu Dropdown
  - Search Bar
  - Language Selector
- Home
- Events
- Resources
- Blog
- Dashboard (authenticated)
- Admin (admin users)

### 4.2 Dashboard Navigation
- **Template**: Tremor Dashboard
- **Components**:
  - Sidebar Navigation
  - Quick Actions Bar
  - Breadcrumbs
  - User Profile Menu

### 4.3 Mobile Navigation
- Hamburger menu for primary navigation
- Bottom navigation bar for key actions
- Collapsible dashboard sidebar

### 4.4 Breadcrumb Structure
Example hierarchies:
- Home > Events > Event Details
- Dashboard > Projects > Project Details > Tasks
- Admin > Users > User Profile

## 5. Utility Pages

### 5.1 System Pages
- **404 Not Found**: /404
- **Maintenance**: /maintenance
- **Error**: /error
- **Sitemap**: /sitemap

### 5.2 Dynamic Routes
Parameters handled:
- :id - Resource identifiers
- :slug - SEO-friendly URLs
- :category - Category filtering
- :tag - Tag filtering
- :language - Language variations (es/en)

## 6. Additional Considerations

### 6.1 Language Support
- URL Structure: /:language/[route]
- Language detection from browser
- Persistent language selection
- SEO considerations for multilingual content

### 6.2 Security Measures
- Protected routes
- Role-based access control
- Security headers
- Authentication state management

### 6.3 Performance Optimization
- Lazy loading for dashboard sections
- Code splitting by route
- Caching strategies
- Progressive loading

### 6.4 SEO Strategy
- Dynamic meta tags
- Structured data
- Canonical URLs
- Sitemap.xml generation
- Robots.txt configuration

### 6.5 Analytics Integration
- Page view tracking
- User journey analysis
- Event tracking
- Performance monitoring
- Error logging

## 7. Template Integration

### 7.1 Solar Template Usage
- Marketing pages
- Public-facing components
- Authentication flows
- Content pages
- Landing pages

### 7.2 Tremor Dashboard Usage
- Administrative interfaces
- Data visualization
- Analytics dashboards
- Management tools
- Form components

### 7.3 Hybrid Integration Areas
- Event creation wizard
- User profiles
- Settings pages
- Search interfaces

### 7.4 Component Library Organization
- Shared components
- Template-specific components
- Custom components
- Integration utilities

This sitemap serves as a living document and should be updated as the platform evolves. All routes should maintain consistency in naming conventions and follow REST principles where applicable