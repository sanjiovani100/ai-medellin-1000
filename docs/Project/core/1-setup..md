# Core Phase Prompt for Medellin AI Platform Development

## Objective

Create the foundation for the Medellin AI platform using ONLY the Solar template. This prompt guides the implementation of the Core Phase, focusing on essential features and robust architecture to prevent errors from the start.

## Context

The Medellin AI Platform is a comprehensive event management system for AI-focused events in Medellín, Colombia. We need to build the initial version focusing only on core functionality, using the Solar template for the frontend and Supabase for the backend.

## Technical Requirements

1. **Tech Stack**

   - Frontend: Next.js 14, TypeScript, Tailwind CSS, Solar Template
   - Backend: Supabase (database, auth, storage)
   - Deployment: Vercel

2. **Core Features to Implement**

   - User authentication (register, login, profile)
   - Basic event management (create, read, update, delete)
   - Event discovery (listing, search, filtering)
   - Responsive UI for all screen sizes

3. **Essential Pages**
   - Homepage with featured events
   - Events listing page with search
   - Event detail page
   - Authentication pages (login, register)
   - Basic user profile page
   - Event creation form

## Implementation Instructions

### 1. Project Setup & Configuration

```bash
# Clone the Solar template and set up the project structure
git clone https://github.com/your-repo/template-solar.git medellinai
cd medellinai
npm install

# Install essential dependencies
npm install @supabase/supabase-js
npm install yup # for form validation
npm install react-hook-form # for form management
npm install use-debounce # for search optimization
```

Configure the project structure exactly as described in the Core Phase Implementation Plan, with:

- src/app/ directory for Next.js App Router pages
- src/components/ for reusable UI components
- src/lib/ for utility functions
- src/types/ for TypeScript definitions

### 2. Supabase Integration

Create a Supabase project and implement the database schema as specified in the Core Phase plan, with tables for:

- users (managed by Supabase Auth)
- profiles (to extend user data)
- events (for event management)
- registrations (for event registrations)
- organizers (for event organizers)

Implement Row-Level Security policies as specified in the plan to ensure proper data access control.

### 3. Authentication System

Implement a complete authentication system using Supabase Auth with:

- Email and password authentication
- User registration with profile creation
- Login and logout functionality
- Password reset flow
- Protected routes via middleware

### 4. Event Management

Create the event management system with:

- Event data models and TypeScript types
- CRUD operations for events
- Event listing with search, filtering, and pagination
- Event detail view with complete information
- Event creation form with validation

### 5. UI Implementation

Adapt the Solar template components to create:

- Responsive navigation with mobile support
- Event cards for listing pages
- Detailed event view
- Authentication forms
- User profile interface

### 6. Deployment Configuration

Set up Vercel deployment with:

- Environment configuration for different environments
- CI/CD pipeline using GitHub Actions
- Proper caching and edge functions

## Error Prevention Strategies

1. **Type Safety**

   - Use TypeScript throughout the project
   - Create comprehensive type definitions for all data structures
   - Configure strict type checking

2. **Form Validation**

   - Implement client-side validation using Yup
   - Add server-side validation for all inputs
   - Create reusable validation schemas

3. **Error Handling**

   - Implement consistent error handling patterns
   - Create error boundary components
   - Add logging for production debugging

4. **Testing**
   - Write unit tests for critical functions
   - Implement component testing for UI elements
   - Add end-to-end tests for critical user flows

## Development Approach

1. Implement one feature at a time, following the order outlined in the Implementation Steps.
2. Use the Solar template components as a starting point, adapting them to the platform's needs.
3. Focus on responsive design from the beginning, ensuring mobile compatibility.
4. Implement proper error handling and validation throughout.
5. Test each feature thoroughly before moving to the next.
6. Document the code and architecture as you go.

## Expected Deliverables

1. Fully functional Core Phase of the Medellin AI platform
2. Complete GitHub repository with organized code
3. Deployed version on Vercel
4. Documentation for the implemented features
5. Type definitions and schemas for all data structures

## Limitations & Constraints

- Do NOT use any templates other than Solar for this phase
- Do NOT implement advanced features reserved for later phases
- Focus ONLY on the core functionality outlined in this document
- Aim for quality and stability over feature completeness

This prompt outlines everything needed to develop the Core Phase of the Medellin AI platform using only the Solar template, with a focus on preventing errors from the start through proper architecture, typing, and validation.
