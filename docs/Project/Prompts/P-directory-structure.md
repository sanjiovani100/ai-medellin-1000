# Prompt: Medellin AI Event Platform Directory Structure

## Objective

Generate a comprehensive and optimized file directory structure for the Medellin AI Event Platform based on the Solar template, implementing industry best practices for Next.js applications. The directory structure should prioritize:

1. Performance optimization
2. SEO enhancement
3. Developer experience and maintainability
4. Scalability for future growth
5. Proper separation of concerns

## Context

The Medellin AI Event Platform is being built with:

- Next.js framework
- TypeScript for type safety
- Tailwind CSS for styling
- Supabase for backend and authentication
- Follows the Solar template architecture pattern

The platform will need to support:

- Multiple user roles (attendees, organizers, speakers, sponsors, administrators)
- Event discovery, registration, and management
- Content management for blogs and resources
- Localization (Spanish/English)
- Analytics and reporting features
- Mobile responsiveness
- SEO optimization

## Requirements

### 1. Root-Level Organization

Provide a complete directory structure starting from the project root, including:

- Standard Next.js directories and configuration files
- Custom directories specific to an event platform
- Configuration files for TypeScript, ESLint, Prettier, etc.
- Environment configuration
- Documentation structure

### 2. Source Code Organization

Detail the structure within the `src` directory (or equivalent based on Solar template), including:

- Pages/route organization
- Components hierarchy with clear naming conventions
- Hooks, utilities, and helpers
- API routes and services
- State management approach
- Authentication flow
- Localization implementation
- Analytics integration

### 3. Component Architecture

Specify the organization of components, including:

- Atomic design principles (atoms, molecules, organisms, templates, pages)
- Shared vs. page-specific components
- Component grouping strategies (by feature, by type, etc.)
- Documentation and testing approach for components

### 4. Performance Considerations

Include directories and structure for:

- Static assets optimization
- Image optimization strategy
- Code splitting approach
- Font loading strategy
- Third-party script management

### 5. SEO Structure

Include directories and files dedicated to:

- Metadata management
- Sitemap generation
- Structured data implementation
- Analytics and tracking

### 6. Content Management

Outline the organization for:

- Blog content
- Event content
- Marketing materials
- User-generated content
- Media library

### 7. Testing Infrastructure

Detail the structure for:

- Unit tests
- Integration tests
- E2E tests
- Test utilities and mocks

### 8. Localization Structure

Explain the directory organization for:

- Translation files
- Language-specific assets
- RTL support (if needed)

### 9. API and Backend Integration

Outline the structure for:

- API routes
- Supabase integration
- External services integration
- Webhook handlers
- Middleware implementation

## Format Requirements

1. Provide the complete directory structure in a tree format, using indentation to represent nesting:

```
medellin-ai/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
└── ...
```

2. Include detailed explanations for key directories, explaining:

   - Purpose of the directory
   - Organizational principles
   - Naming conventions
   - Special considerations

3. For critical files, provide brief descriptions of their purpose and content.

4. Mark recommended directories with appropriate emoji indicators:
   - ⚡ Performance-critical
   - 🔍 SEO-important
   - 🌐 Localization-related
   - 📱 Mobile-specific
   - 🧪 Testing-related

## Best Practices to Include

Ensure the directory structure incorporates these best practices:

### Next.js Best Practices

- Proper use of the App Router or Pages Router (depending on Solar template's approach)
- Efficient loading of components (server vs. client)
- Optimal handling of API routes
- Strategic use of Static Site Generation (SSG) vs. Server-Side Rendering (SSR)

### Performance Best Practices

- Chunk splitting strategy
- Asset optimization approach
- Lazy loading implementation
- Service worker implementation (if applicable)

### SEO Best Practices

- Metadata organization
- Structured data implementation
- URL structure considerations
- Sitemap generation approach

### Maintainability Best Practices

- Clear separation of concerns
- Consistent naming conventions
- Modular architecture
- Documentation approach

### Solar Template Alignment

- Follow existing patterns from the Solar template
- Maintain consistency with Solar's architectural decisions
- Extend Solar's structure to accommodate event-specific requirements

## Examples and References

Include specific examples from successful event platforms or high-performance Next.js applications, such as:

1. Vercel's Next.js examples repository
2. Modern event platforms like Luma, Hopin, or Eventbrite
3. High-performance Next.js sites like TikTok's web experience or Notion

## Specific Sections to Address

### Routing Structure

How should routes be organized for an event platform? Consider:

- Event discovery and detail pages
- User dashboards for different roles
- Authentication flows
- Admin sections
- Blog and content areas

### Data Fetching Strategy

What directories and files should handle:

- Server components vs. client components
- API calls and data fetching logic
- Caching strategies
- Error handling

### UI Component Organization

How should UI components be structured considering:

- Reusability across different sections
- Maintaining consistent design language
- Supporting multiple themes or white-labeling
- Adapting to different device sizes

The final directory structure should be comprehensive yet practical, balancing current needs with future scalability, and optimizing for both developer experience and end-user performance.
