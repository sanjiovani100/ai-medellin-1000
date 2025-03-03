# Medellin AI Event Platform - Setup and Deployment Guide

**Version 1.0.0 | Last Updated: March 2, 2025**

## 1. Introduction

This document provides comprehensive instructions for setting up a development environment, deploying to Vercel, and configuring CI/CD pipelines for the Medellin AI Event Platform. It serves as the single source of truth for all environment setup and deployment processes.

This guide is intended for developers, DevOps engineers, and system administrators working on the Medellin AI Event Platform project. It assumes basic familiarity with JavaScript/TypeScript development, Git, and command-line operations.

## 2. Development Environment Setup

### 2.1 Required Software and Tools

| Software           | Version          | Installation Command/Link                                    |
| ------------------ | ---------------- | ------------------------------------------------------------ |
| Node.js            | v18.x or later   | `nvm install 18` or [nodejs.org](https://nodejs.org/)        |
| pnpm               | v8.x or later    | `npm install -g pnpm`                                        |
| Git                | v2.30.0 or later | [git-scm.com](https://git-scm.com/downloads)                 |
| Visual Studio Code | Latest           | [code.visualstudio.com](https://code.visualstudio.com/)      |
| Docker             | Latest           | [docker.com](https://www.docker.com/products/docker-desktop) |

#### Recommended VS Code Extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitHub Copilot
- Thunder Client (REST API client)

### 2.2 Local Environment Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/medellin-ai-event-platform.git
   cd medellin-ai-event-platform
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Update the variables in `.env.local` with your local configuration
   - Required variables include Supabase credentials and API keys

4. **Set up local Supabase:**

   - Option 1: Connect to Supabase cloud development project
     - Create a project at [supabase.com](https://supabase.com)
     - Use the provided API keys in your `.env.local`
   - Option 2: Run Supabase locally with Docker

     ```bash
     # Install Supabase CLI if you haven't already
     npm install -g supabase

     # Start local Supabase instance
     supabase start

     # Apply migrations
     supabase db push
     ```

### 2.3 Running the Application Locally

1. **Start the development server:**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

2. **Run tests:**

   ```bash
   # Run all tests
   pnpm test

   # Run tests in watch mode
   pnpm test:watch

   # Run specific test file
   pnpm test -- path/to/test/file.test.ts
   ```

3. **Run database migrations:**
   ```bash
   pnpm db:migrate
   ```

### 2.4 Common Local Setup Issues

| Issue                        | Solution                                                                    |
| ---------------------------- | --------------------------------------------------------------------------- |
| Node version conflicts       | Ensure you're using the correct Node version with `nvm use`                 |
| ENOENT errors during install | Check that you have the correct permissions for the directories             |
| Supabase connection errors   | Verify your Supabase URL and API keys in `.env.local`                       |
| Port conflicts               | Check if another service is using port 3000 and change in `next.config.mjs` |
| TypeScript errors            | Run `pnpm tsc` to check for type errors                                     |

## 3. Project Structure Overview

```
medellin-ai-event-platform/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   ├── lib/             # Utility functions and libraries
│   ├── hooks/           # React hooks
│   ├── types/           # TypeScript type definitions
│   ├── styles/          # Global styles
│   ├── services/        # External service integrations
│   └── middleware.ts    # Next.js middleware
├── .github/             # GitHub workflows
├── supabase/            # Supabase migrations and config
└── config/              # Application configuration
```

### Key Configuration Files

| File                 | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `next.config.mjs`    | Next.js configuration                    |
| `tailwind.config.ts` | Tailwind CSS configuration               |
| `tsconfig.json`      | TypeScript configuration                 |
| `.env.example`       | Example environment variables            |
| `.env.local`         | Local environment variables (gitignored) |
| `.github/workflows/` | CI/CD workflow definitions               |
| `package.json`       | Project dependencies and scripts         |

### Development vs. Production Differences

- Development uses Next.js development server with hot reloading
- Production uses optimized builds with prerendering where possible
- Environment variables are handled differently (more secure in production)
- Error handling is more verbose in development
- Development connects to test databases, production to production databases

## 4. Vercel Deployment Guide

### 4.1 Vercel Account Setup

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```

### 4.2 Project Deployment Configuration

1. Connect your GitHub repository to Vercel:

   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Authorize Vercel to access the repository

2. Configure build settings:

   - Framework preset: Next.js
   - Build command: `pnpm build`
   - Output directory: `.next`
   - Install command: `pnpm install`
   - Development command: `pnpm dev`

3. Configure environment variables:

   - Add all required environment variables from `.env.example`
   - Set environment-specific variables for Production/Preview
   - Mark sensitive variables as encrypted

4. Configure serverless functions:

   - Adjust function regions in `vercel.json`:
     ```json
     {
       "functions": {
         "api/*": {
           "memory": 1024,
           "maxDuration": 10
         }
       }
     }
     ```

5. Set up Edge Functions for performance-critical paths:
   - Add edge runtime configuration to route handlers:
     ```typescript
     export const runtime = "edge";
     ```

### 4.3 Domain Configuration

1. Add custom domain:

   - Go to Project → Settings → Domains
   - Add your domain (e.g., `events.medellin.ai`)
   - Follow DNS configuration instructions

2. Configure SSL:
   - Vercel handles SSL certificates automatically
   - Ensure your DNS configuration is correct
   - Verify SSL certificate is issued and active

### 4.4 Deployment Best Practices

- Use branch previews for testing before merging to main
- Set up automatic preview deployments for pull requests
- Configure protection rules for production deployments
- Use deployment caching for faster builds
- Implement staged rollouts for critical changes

### 4.5 Vercel-Specific Optimizations

- Enable Edge Middleware for auth and localization
- Configure Vercel Analytics for performance monitoring
- Set up Image Optimization API for media assets
- Use Vercel KV or Edge Config for configuration
- Implement ISR (Incremental Static Regeneration) for dynamic content

## 5. CI/CD Pipeline Documentation

### 5.1 CI/CD Architecture

```
[GitHub Push] → [GitHub Actions] → [Tests & Lint] → [Build Verification] → [Vercel Deployment]
                       ↓                                                          ↓
                [Quality Checks] ← → [Automated Tests] → [Preview Deployment] → [Production]
```

### 5.2 GitHub Actions Configuration

**Main workflow file: `.github/workflows/main.yml`**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, development]
  pull_request:
    branches: [main, development]

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

  build:
    needs: test
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
      - run: pnpm build
```

### 5.3 Automated Deployment Process

1. **Branch-based deployment rules:**

   - `main` branch → Production environment
   - `development` branch → Staging environment
   - Feature branches → Preview environments

2. **Preview deployments:**

   - Automatically created for pull requests
   - Unique URL for each deployment
   - Environment variables set for preview context

3. **Production safeguards:**
   - Require approval for production deployments
   - Automated smoke tests after deployment
   - Rollback capability on failure

### 5.4 Monitoring Deployments

- View deployment status in GitHub and Vercel dashboards
- Check deployment logs in Vercel for troubleshooting
- Set up status notifications via Slack/Discord/Email

## 6. Environment Configuration

### 6.1 Environment Variables Management

**Required Variables:**

| Variable                        | Purpose                        | Example                       |
| ------------------------------- | ------------------------------ | ----------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public Supabase URL            | `https://xxxx.supabase.co`    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase anonymous key  | `eyJhbGciOiJIUzI1NiIsInR5...` |
| `SUPABASE_SERVICE_ROLE_KEY`     | Private Supabase admin key     | `eyJhbGciOiJIUzI1NiIsInR5...` |
| `OPENAI_API_KEY`                | OpenAI API key for AI features | `sk-xxxxx`                    |
| `NEXTAUTH_SECRET`               | Secret for NextAuth            | `random-string`               |
| `NEXTAUTH_URL`                  | URL for NextAuth               | `https://your-app.vercel.app` |

### 6.2 Environment-Specific Configuration

**Development:**

- Use local or development Supabase instance
- Debug logging enabled
- Mock external services when possible

**Testing:**

- Isolated test database
- Mocked external services
- Stricter validation rules

**Staging:**

- Mirror of production environment
- Full integration with external services
- Production-like data with anonymization

**Production:**

- Full security measures
- Performance optimizations enabled
- Real external service integrations

### 6.3 Secrets Management

- Never commit secrets to the repository
- Use Vercel Environment Variables for sensitive data
- Rotate API keys periodically
- Use different keys for different environments
- Implement secret scoping (minimize access)

## 7. Supabase Integration

### 7.1 Supabase Project Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Set up your database schema:

   ```bash
   # Apply migrations to development environment
   pnpm supabase:migrate:dev

   # Generate types from database schema
   pnpm supabase:types
   ```

3. Configure authentication providers:
   - Email/password
   - Google OAuth
   - GitHub OAuth (optional)

### 7.2 Database Schema Management

- Schema migrations are stored in `supabase/migrations/`
- Create new migrations with:
  ```bash
  pnpm supabase:migration:new my_migration_name
  ```
- Apply migrations to production carefully, preferably during maintenance windows

### 7.3 Performance Considerations

- Use RLS (Row Level Security) policies for data access control
- Create appropriate indexes for frequent queries
- Use caching for read-heavy data
- Implement pagination for large data sets
- Consider using materialized views for complex reports

## 8. Monitoring and Logging

### 8.1 Application Monitoring

- Use Vercel Analytics for performance monitoring
- Implement error boundary components in React
- Set up custom events tracking with Vercel Web Vitals

### 8.2 Error Tracking

- Configure error tracking service (e.g., Sentry)
- Set up error notifications to Slack/email
- Implement correlation IDs for request tracing

### 8.3 Debugging in Production

- Enable source maps for production debugging
- Use structured logging format for better parsing
- Create custom debugging endpoints (protected by auth)

## 9. Troubleshooting Guide

### 9.1 Common Deployment Issues

| Issue                | Diagnosis                  | Solution                                    |
| -------------------- | -------------------------- | ------------------------------------------- |
| Build failures       | Check build logs in Vercel | Verify dependencies and build scripts       |
| API 500 errors       | Check function logs        | Debug serverless function issues            |
| Missing env vars     | Verify env vars in Vercel  | Add missing variables to deployment         |
| Database connection  | Check Supabase logs        | Verify connection strings and network rules |
| Auth issues          | Check auth logs            | Review auth configuration and API keys      |
| Performance problems | Use Vercel Analytics       | Optimize rendering and data fetching        |

### 9.2 Rollback Procedures

1. **For code changes:**
   - Revert the PR in GitHub
   - Redeploy from the previous stable commit
2. **For database changes:**

   - Execute rollback migration script
   - Restore from database backup if necessary

3. **For configuration changes:**
   - Revert environment variables in Vercel
   - Redeploy with previous configuration

## 10. Security Best Practices

- Keep all dependencies updated regularly
- Enable 2FA for all team members on GitHub and Vercel
- Implement strict Content Security Policy
- Configure proper CORS settings
- Rotate API keys quarterly
- Run security scans as part of CI/CD pipeline
- Conduct regular security audits
- Use least-privilege principle for all access controls
