# Medellin AI Event Platform: Directory Structure

## Overview

This document outlines the comprehensive file directory structure for the Medellin AI Event Platform, optimized for performance, SEO, developer experience, and scalability. The structure follows the Next.js App Router architecture with inspiration from the Solar template while extending it to accommodate the specific needs of an event management platform.

## Complete Directory Structure

```
medellin-ai/
├── .github/                                # GitHub configuration
│   ├── ISSUE_TEMPLATE/                     # Issue templates
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── workflows/                          # CI/CD pipelines
│       ├── ci.yml                          # Continuous integration
│       ├── deploy-preview.yml              # Preview deployment
│       └── deploy-production.yml           # Production deployment
│
├── .husky/                                 # Git hooks
│   ├── pre-commit                          # Lint and format before commits
│   └── commit-msg                          # Enforce commit message standards
│
├── .vscode/                                # Editor configuration
│   ├── extensions.json                     # Recommended extensions
│   └── settings.json                       # Project-specific settings
│
├── docs/                                   # Project documentation
│   ├── architecture/                       # Architecture documents
│   ├── components/                         # Component documentation
│   ├── contributing/                       # Contribution guidelines
│   └── api/                                # API documentation
│
├── locales/                              🌐 # Translation files
│   ├── en/                                 # English translations
│   │   ├── common.json
│   │   ├── events.json
│   │   └── ...
│   └── es/                                 # Spanish translations
│       ├── common.json
│       ├── events.json
│       └── ...
│
├── public/                               ⚡ # Static assets
│   ├── favicon.ico                         # Favicon
│   ├── robots.txt                        🔍 # SEO robots configuration
│   ├── site.webmanifest                  📱 # PWA manifest
│   ├── sitemap.xml                       🔍 # XML sitemap for SEO
│   ├── fonts/                            ⚡ # Self-hosted fonts
│   │   ├── inter/                          # Inter font files
│   │   └── ...
│   ├── images/                           ⚡ # Static images
│   │   ├── brand/                          # Branding assets
│   │   ├── icons/                          # UI icons
│   │   ├── social/                         # Social sharing images
│   │   └── ...
│   └── locales/                          🌐 # Static language resources
│       ├── en/
│       └── es/
│
├── src/                                    # Application source code
│   ├── app/                                # Next.js App Router
│   │   ├── (auth)/                         # Authentication routes
│   │   │   ├── login/
│   │   │   │   ├── page.tsx                # Login page
│   │   │   │   └── actions.ts              # Server actions for login
│   │   │   ├── register/
│   │   │   │   ├── page.tsx                # Registration page
│   │   │   │   └── actions.ts              # Server actions for registration
│   │   │   └── ...
│   │   │
│   │   ├── (marketing)/                    # Public marketing pages
│   │   │   ├── page.tsx                  🔍 # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx                # About page
│   │   │   ├── contact/
│   │   │   │   └── page.tsx                # Contact page
│   │   │   └── blog/
│   │   │       ├── page.tsx                # Blog listing
│   │   │       └── [slug]/
│   │   │           └── page.tsx            # Blog article page
│   │   │
│   │   ├── events/                       🔍 # Event pages (public)
│   │   │   ├── page.tsx                    # Events listing
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx                # Categories overview
│   │   │   │   └── [category]/
│   │   │   │       └── page.tsx            # Category-specific events
│   │   │   └── [slug]/
│   │   │       ├── page.tsx                # Event details
│   │   │       ├── register/
│   │   │       │   └── page.tsx            # Event registration
│   │   │       └── success/
│   │   │           └── page.tsx            # Registration success
│   │   │
│   │   ├── dashboard/                      # User dashboard
│   │   │   ├── layout.tsx                  # Dashboard layout
│   │   │   ├── page.tsx                    # Dashboard home
│   │   │   ├── profile/
│   │   │   │   └── page.tsx                # User profile
│   │   │   ├── tickets/
│   │   │   │   ├── page.tsx                # Ticket listing
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx            # Individual ticket
│   │   │   └── saved/
│   │   │       └── page.tsx                # Saved events
│   │   │
│   │   ├── organizer/                      # Organizer dashboard
│   │   │   ├── layout.tsx                  # Organizer layout
│   │   │   ├── page.tsx                    # Organizer home
│   │   │   └── events/
│   │   │       ├── page.tsx                # Events management
│   │   │       ├── create/
│   │   │       │   └── page.tsx            # Create event
│   │   │       └── [id]/
│   │   │           ├── page.tsx            # Event management
│   │   │           ├── attendees/
│   │   │           │   └── page.tsx        # Attendee management
│   │   │           ├── analytics/
│   │   │           │   └── page.tsx        # Event analytics
│   │   │           └── ...
│   │   │
│   │   ├── admin/                          # Admin dashboard
│   │   │   ├── layout.tsx                  # Admin layout
│   │   │   ├── page.tsx                    # Admin home
│   │   │   ├── users/
│   │   │   │   └── page.tsx                # User management
│   │   │   ├── events/
│   │   │   │   └── page.tsx                # Events moderation
│   │   │   └── settings/
│   │   │       └── page.tsx                # System settings
│   │   │
│   │   ├── api/                            # API Routes
│   │   │   ├── events/
│   │   │   │   └── route.ts                # Events API
│   │   │   ├── webhooks/
│   │   │   │   └── route.ts                # Webhook handlers
│   │   │   └── ...
│   │   │
│   │   ├── [locale]/                     🌐 # Localized routes
│   │   │   └── [...] (mirrors the above structure)
│   │   │
│   │   ├── layout.tsx                      # Root layout
│   │   ├── page.tsx                      🔍 # Home page
│   │   ├── error.tsx                       # Error boundary
│   │   ├── loading.tsx                     # Loading state
│   │   ├── not-found.tsx                   # 404 page
│   │   ├── sitemap.ts                    🔍 # Dynamic sitemap generator
│   │   └── robots.ts                     🔍 # Dynamic robots.txt
│   │
│   ├── components/                        ⚡ # UI Components
│   │   ├── atoms/                          # Atomic components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx              # Component
│   │   │   │   └── index.ts                # Export
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   │
│   │   ├── molecules/                      # Molecular components
│   │   │   ├── SearchBar/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── EventCard/
│   │   │   │   ├── EventCard.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   │
│   │   ├── organisms/                      # Organism components
│   │   │   ├── EventList/
│   │   │   │   ├── EventList.tsx
│   │   │   │   └── index.ts
│   │   │   ├── RegistrationForm/
│   │   │   │   ├── RegistrationForm.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   │
│   │   ├── templates/                      # Page templates
│   │   │   ├── EventDetailTemplate/
│   │   │   │   ├── EventDetailTemplate.tsx
│   │   │   │   └── index.ts
│   │   │   ├── DashboardTemplate/
│   │   │   │   ├── DashboardTemplate.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   │
│   │   ├── ui/                           ⚡ # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layouts/                        # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   │
│   │   └── providers/                    ⚡ # Context providers
│   │       ├── ThemeProvider.tsx
│   │       ├── AuthProvider.tsx
│   │       └── ...
│   │
│   ├── hooks/                              # Custom React hooks
│   │   ├── useEventData.ts
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── ...
│   │
│   ├── libs/                               # Shared libraries
│   │   ├── supabase/                       # Supabase integration
│   │   │   ├── client.ts                   # Supabase client
│   │   │   ├── schema.ts                   # Database types
│   │   │   └── ...
│   │   │
│   │   ├── auth/                           # Authentication
│   │   │   ├── session.ts
│   │   │   ├── middleware.ts
│   │   │   └── ...
│   │   │
│   │   ├── api/                            # API utilities
│   │   │   ├── eventApi.ts
│   │   │   ├── userApi.ts
│   │   │   └── ...
│   │   │
│   │   ├── analytics/                    🔍 # Analytics integration
│   │   │   ├── gtm.ts
│   │   │   ├── events.ts
│   │   │   └── ...
│   │   │
│   │   ├── seo/                          🔍 # SEO utilities
│   │   │   ├── metadata.ts
│   │   │   ├── schema.ts
│   │   │   └── ...
│   │   │
│   │   ├── i18n/                         🌐 # Internationalization
│   │   │   ├── config.ts
│   │   │   ├── client.ts
│   │   │   └── ...
│   │   │
│   │   └── utils/                          # Utility functions
│   │       ├── dates.ts
│   │       ├── formatting.ts
│   │       ├── validation.ts
│   │       └── ...
│   │
│   ├── types/                              # TypeScript type definitions
│   │   ├── event.ts
│   │   ├── user.ts
│   │   ├── supabase.ts                     # Generated types
│   │   └── ...
│   │
│   ├── styles/                             # Global styles
│   │   ├── globals.css                     # Global CSS
│   │   └── theme.ts                        # Theme configuration
│   │
│   ├── config/                             # Application configuration
│   │   ├── site.ts                       🔍 # Site metadata
│   │   ├── navigation.ts                   # Navigation config
│   │   ├── features.ts                     # Feature flags
│   │   └── ...
│   │
│   └── content/                          🔍 # Static content
│       ├── blog/                           # Blog content (MDX)
│       │   ├── post-1.mdx
│       │   └── ...
│       ├── events/                         # Static event content
│       │   ├── featured.json
│       │   └── ...
│       └── ...
│
├── test/                                 🧪 # Testing infrastructure
│   ├── e2e/                                # End-to-end tests
│   │   ├── auth.spec.ts
│   │   ├── events.spec.ts
│   │   └── ...
│   ├── integration/                        # Integration tests
│   │   ├── api.test.ts
│   │   └── ...
│   ├── unit/                               # Unit tests
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── mocks/                              # Test mocks
│       ├── data/
│       ├── handlers/
│       └── ...
│
├── scripts/                                # Utility scripts
│   ├── generate-sitemap.js               🔍 # Sitemap generator
│   ├── i18n-extract.js                   🌐 # Translation key extractor
│   └── ...
│
├── .env.example                            # Example environment variables
├── .env.development                        # Development env variables
├── .env.production                         # Production env variables
├── .env.test                               # Test env variables
├── .eslintrc.js                            # ESLint configuration
├── .gitignore                              # Git ignore rules
├── .prettierrc                             # Prettier configuration
├── next.config.js                        ⚡ # Next.js configuration
├── package.json                            # Project dependencies
├── postcss.config.js                       # PostCSS configuration
├── tailwind.config.js                      # Tailwind CSS configuration
├── tsconfig.json                           # TypeScript configuration
└── README.md                               # Project documentation
```

## Key Directory Explanations

### Root Level Organization

#### `.github/`

Purpose: GitHub-specific configurations for repository management and CI/CD pipelines.

- Organizational principle: Grouped by GitHub feature (issues, workflows)
- Special considerations: CI/CD workflows are set up to deploy to staging and production environments

#### `docs/`

Purpose: Comprehensive project documentation.

- Organizational principle: Categorized by documentation type
- Special considerations: Technical documentation is kept separate from user-facing content

#### `locales/` 🌐

Purpose: Internationalization files for multilingual support.

- Organizational principle: Organized by language code
- Special considerations: Uses nested JSON files for modular translations
- Naming convention: Language codes follow ISO standards (en, es)

#### `public/` ⚡ 🔍

Purpose: Static assets served directly by the web server.

- Organizational principle: Grouped by asset type
- Special considerations: Contains SEO-critical files (robots.txt, sitemap.xml)
- Performance optimization: Pre-optimized assets and self-hosted fonts

### Source Code Organization (`src/`)

#### `app/` ⚡ 🔍

Purpose: Next.js application routes using the App Router.

- Organizational principle: Route groups for functional separation
- Naming convention:
  - Route groups in parentheses (e.g., `(auth)`, `(marketing)`)
  - Dynamic routes in square brackets (e.g., `[slug]`, `[id]`)
- Special considerations:
  - Route groups do not affect URL paths but help organize routes logically
  - Server components used by default for improved performance
  - Route-specific layouts for consistent UI within sections

Route groups:

- `(auth)`: Authentication-related pages (login, register, password reset)
- `(marketing)`: Public-facing marketing pages (home, about, contact)
- `events/`: Event discovery and details (public-facing)
- `dashboard/`: User dashboard for registered attendees
- `organizer/`: Dashboard for event organizers
- `admin/`: Administration area with restricted access
- `api/`: API endpoints for client-side and external consumption
- `[locale]/`: Localized versions of routes

#### `components/` ⚡

Purpose: Reusable UI components organized using atomic design principles.

- Organizational principle: Atomic design (atoms → molecules → organisms → templates)
- Naming convention: PascalCase for component folders and files
- Special considerations:
  - Component-specific tests and styles kept alongside components
  - Each component exported via index.ts for clean imports

Categories:

- `atoms/`: Smallest building blocks (Button, Input, Icon)
- `molecules/`: Simple component combinations (SearchBar, EventCard)
- `organisms/`: Complex, self-contained sections (EventList, RegistrationForm)
- `templates/`: Page-level component arrangements (EventDetailTemplate)
- `ui/`: shadcn/ui components with Tailwind styling
- `layouts/`: Site-wide layout components (Header, Footer)
- `providers/`: React context providers for state management

#### `hooks/`

Purpose: Custom React hooks for shared behavior.

- Naming convention: camelCase with 'use' prefix (e.g., useEventData)
- Special considerations: Focused on single responsibility per hook

#### `libs/` ⚡

Purpose: Shared libraries and integrations with external services.

- Organizational principle: Grouped by functionality or integrated service
- Special considerations: Abstraction layers over external services for easier testing and switching

Key sections:

- `supabase/`: Database client and type definitions
- `auth/`: Authentication logic and session management
- `api/`: API integration and data fetching utilities
- `analytics/`: Analytics integration and tracking
- `seo/`: SEO utilities and metadata management
- `i18n/`: Internationalization configuration and utilities
- `utils/`: General utility functions

#### `types/`

Purpose: TypeScript type definitions for the application.

- Organizational principle: Domain-based type files
- Special considerations: Includes Supabase generated types

#### `styles/`

Purpose: Global styling and theme configuration.

- Organizational principle: Global vs. component-specific styling
- Special considerations: Uses Tailwind CSS utilities with minimal global styles

#### `config/` 🔍

Purpose: Application-wide configuration.

- Organizational principle: Configuration by feature area
- Special considerations: Used for site metadata, navigation, feature flags

#### `content/` 🔍

Purpose: Static content managed in the repository.

- Organizational principle: Content type (blog, events)
- Special considerations: MDX format for rich content with component support

### Testing Infrastructure (`test/`) 🧪

Purpose: Comprehensive testing setup separated by test type.

- Organizational principle: Test type (unit, integration, e2e)
- Naming convention: Component name + .test.ts or .spec.ts
- Special considerations: Shared mocks and test utilities

## Performance Optimizations ⚡

### Asset Optimization Strategy

1. **Image Handling**

   - Next.js Image component used throughout
   - Pre-optimized static images in public/images
   - Dynamic image optimization via Next.js

2. **Font Strategy**

   - Self-hosted fonts in public/fonts
   - Font display swap for improved perceived performance
   - Subset fonts for reduced file size

3. **Code Splitting**

   - Automatic code splitting at the route level
   - Dynamic imports for heavy components
   - Shared components properly chunked

4. **Server Components**
   - Server components used by default in the App Router
   - Client components only where interactivity is needed
   - Streaming enabled for progressive rendering

## SEO Strategy 🔍

1. **Metadata Structure**

   - Centralized site metadata in config/site.ts
   - Page-specific metadata in route files
   - JSON-LD structured data for events

2. **URL Structure**

   - Clean, semantic URLs (e.g., /events/[slug])
   - Proper handling of canonical URLs
   - Localized URLs with language prefixes

3. **Sitemap Generation**

   - Dynamic sitemap generation in app/sitemap.ts
   - Static fallback in public/sitemap.xml
   - Script for generating comprehensive sitemaps

4. **Analytics Integration**
   - Server-side analytics initialization
   - Privacy-focused tracking with proper consent management
   - Custom event tracking for key user flows

## Localization Structure 🌐

1. **Translation Files**

   - Nested JSON files by language
   - Namespaced by feature area (common, events, dashboard)
   - Translation key extraction script

2. **URL Strategy**

   - Language prefix in URLs (/en/events, /es/events)
   - Default language without prefix (configurable)
   - Language detection and redirection middleware

3. **Content Localization**
   - Translated metadata for SEO
   - Date/time/currency formatting by locale
   - RTL support infrastructure (for future languages)

## API and Backend Integration

1. **Supabase Integration**

   - Client initialization and type generation
   - Abstraction layer for database operations
   - Row-level security policies

2. **API Routes**

   - Route handlers in app/api
   - Authentication middleware
   - Rate limiting and error handling

3. **Webhook Handlers**
   - Dedicated endpoints for external services
   - Verification and security measures
   - Asynchronous processing for heavy operations

## Development and Deployment Workflow

1. **Environment Configuration**

   - Separate .env files for different environments
   - Example .env.example for onboarding
   - Secrets management strategy

2. **Quality Assurance**

   - ESLint and Prettier for code quality
   - Husky pre-commit hooks
   - Automated testing in CI pipeline

3. **Deployment Pipeline**
   - Preview deployments for pull requests
   - Staging environment for pre-production
   - Production deployment with rollback capability

## Conclusion

This directory structure balances comprehensive organization with practical development workflows. It's optimized for the specific needs of the Medellin AI Event Platform while leveraging the Solar template's architectural patterns and Next.js best practices. The structure prioritizes performance, SEO, developer experience, and scalability while maintaining a clear separation of concerns.
