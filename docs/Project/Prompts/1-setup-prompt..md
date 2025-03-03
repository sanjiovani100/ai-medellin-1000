# Enhanced Prompt for Error-Free Medellin AI Platform Implementation

You are an expert software architect and developer specializing in Next.js applications. I need a comprehensive, error-resistant implementation plan for the Medellin AI event platform that follows industry best practices and prevents common deployment pitfalls.

## Core Requirements

Create a detailed implementation plan that:

1. Uses a flat, optimized project structure (no nested templates)
2. Implements essential event management functionality
3. Integrates robust error prevention strategies at every level
4. Creates a maintainable foundation with proper architecture
5. Provides complete code examples for key components
6. Establishes standardized configuration and dependency management
7. Sets up Supabase database with proper security
8. Implements authentication and authorization
9. Configures reliable deployment to Vercel

## Specific Areas to Cover

Please structure your implementation plan to include:

### 1. Project Structure & Architecture

- Implement the following optimized flat structure:

  ```
  medellinai-event-platform/
  ├── public/                    # Static assets
  ├── src/                       # Application source code
  │   ├── app/                   # Next.js App Router pages
  │   ├── components/            # Reusable UI components
  │   ├── lib/                   # Utility functions and libraries
  │   ├── hooks/                 # Custom React hooks
  │   ├── styles/                # Global styles
  │   └── types/                 # TypeScript type definitions
  ├── tests/                     # Test files
  ├── .github/                   # GitHub Actions workflows
  ├── supabase/                  # Supabase configurations and migrations
  ├── docs/                      # Documentation (not deployed)
  ├── scripts/                   # Build and utility scripts
  ├── [Configuration files]      # All configs at root level
  ```

- Standardize configuration files (next.config.js, tsconfig.json, etc.) using consistent formats
- Set up environment variables with proper validation

### 2. Dependency Management Strategy

- Use stable dependency versions:
  ```json
  {
    "dependencies": {
      "next": "14.1.0",
      "react": "18.2.0",
      "react-dom": "18.2.0",
      "tailwindcss": "3.4.1",
      "@supabase/supabase-js": "2.39.3",
      "@supabase/auth-helpers-nextjs": "0.8.7"
    },
    "engines": {
      "node": ">=18.0.0 <19.0.0",
      "npm": ">=10.0.0"
    }
  }
  ```
- Choose a single package manager (pnpm recommended) and configure properly
- Implement dependency security scanning
- Create a dependency update strategy

### 3. Event Management System

- Design comprehensive data models with TypeScript types
- Implement CRUD operations with Supabase
- Create event listing and details pages with proper error handling
- Build search and filtering functionality
- Document the entity relationships

### 4. Authentication System

- Integrate Supabase Auth with proper error handling
- Create reusable login/registration components
- Implement protected routes with proper redirection
- Set up user profiles with appropriate database security
- Configure row-level security policies

### 5. Responsive UI Implementation

- Adapt UI components for responsive design
- Implement component-level code splitting for performance
- Use Next.js Image component for optimized images
- Create reusable UI components with proper TypeScript typing

### 6. Supabase Database Setup

- Provide complete SQL schema for all required tables
- Implement Row-Level Security policies
- Create database utility functions
- Set up efficient data fetching with React Query
- Configure proper caching strategies

### 7. Test Implementation

- Set up Jest for unit and integration testing
- Configure Cypress for end-to-end testing
- Create example tests for critical user flows
- Implement test coverage requirements (minimum 80%)
- Set up pre-deployment verification tests

### 8. CI/CD and Deployment Strategy

- Configure GitHub Actions workflow:

  ```yaml
  name: Deploy
  on:
    push:
      branches: [main, staging]
    pull_request:
      branches: [main, staging]

  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: pnpm/action-setup@v2
          with:
            version: 8
        - uses: actions/setup-node@v3
          with:
            node-version: "18"
            cache: "pnpm"
        - run: pnpm install
        - run: pnpm lint
        - run: pnpm test

    preview-deploy:
      # Configuration for preview deployments

    production-deploy:
      # Configuration for production deployments
  ```

- Set up Vercel deployment configuration:

  ```json
  {
    "framework": "nextjs",
    "buildCommand": "pnpm build",
    "installCommand": "pnpm install",
    "outputDirectory": ".next",
    "regions": ["iad1"],
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "X-XSS-Protection", "value": "1; mode=block" }
        ]
      }
    ]
  }
  ```

- Implement environment-specific configurations
- Create rollback procedures

### 9. Error Prevention Features

- Implement environment validation scripts
- Set up Git hooks for pre-commit and pre-push validation
- Create feature flags for safe feature deployment
- Configure proper error boundary components
- Implement error logging and monitoring
- Set up security scanning in the CI/CD pipeline

### 10. Documentation Strategy

- Create clear developer onboarding documentation
- Implement architecture decision records (ADRs)
- Document API endpoints and database schema
- Create deployment checklists and troubleshooting guides
- Set up automated documentation generation where appropriate

## Code Example Requirements

For each section, provide complete, implementation-ready code examples:

1. **Configuration files** - Complete configuration files (next.config.js, tsconfig.json, etc.)
2. **Data models** - Full TypeScript interfaces and database schema
3. **UI components** - Complete React components with TypeScript and styling
4. **Database operations** - Complete utility functions for database interaction
5. **Authentication** - Full implementation of authentication flows
6. **Testing** - Complete test examples for critical functionality
7. **CI/CD** - Complete GitHub Actions workflow configuration

## Implementation Guidelines

- Focus on preventing common deployment errors at every step
- Implement proper error handling for all operations
- Ensure consistent coding standards throughout
- Optimize for performance and maintainability
- Follow Next.js 14+ and TypeScript best practices
- Prioritize security in all implementations

The result should be a comprehensive, error-resistant implementation plan that provides a solid foundation for the Medellin AI platform while preventing common deployment issues, dependency conflicts, and configuration errors.
