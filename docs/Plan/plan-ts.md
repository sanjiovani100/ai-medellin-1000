# Prompt for Technical Documentation Generation for Medellin AI Events Platform

```
Generate comprehensive technical documentation for the Medellin AI Events Platform based on the implementation plan. The documentation should serve as a complete reference for developers, architects, and technical stakeholders involved in building, maintaining, and extending the platform.

## Core Documentation Requirements

Create detailed technical documentation that adheres to the following requirements:

1. **Architecture Documentation**
   - System architecture diagrams (use mermaid or PlantUML notation)
   - Component interaction flows
   - Infrastructure topology
   - Data flow diagrams
   - Technology stack specification with version requirements
   - Third-party integration specifications
   - Environment configuration requirements

2. **Code Documentation**
   - Directory structure explanation
   - Module organization and responsibilities
   - Type definitions and interfaces
   - Component hierarchies
   - State management approach
   - Error handling patterns
   - Security implementation details
   - Performance optimization strategies

3. **API Documentation**
   - RESTful endpoint specifications
   - Request/response schemas
   - Authentication requirements
   - Rate limiting policies
   - Error response formats
   - Example requests and responses
   - Webhook implementation details
   - GraphQL schema documentation (if applicable)

4. **Database Documentation**
   - Schema diagrams
   - Entity relationship diagrams
   - Table definitions with constraints
   - Indexed fields and optimization notes
   - Migration procedures
   - Backup and recovery processes
   - Query optimization guidelines
   - Data validation rules

5. **Environment Configuration**
   - Environment variable documentation
   - Configuration file formats and options
   - Feature flag implementation
   - Environment-specific settings
   - Secret management approach
   - Configuration validation procedures
   - Deployment environment differences

6. **Security Documentation**
   - Authentication mechanisms
   - Authorization models
   - Data encryption approaches
   - CSRF protection implementation
   - XSS prevention strategies
   - API security measures
   - Security headers configuration
   - Security scanning procedures

7. **Testing Documentation**
   - Testing strategy overview
   - Unit testing approaches
   - Integration testing procedures
   - End-to-end testing frameworks
   - Performance testing methodologies
   - Security testing procedures
   - Test data management
   - CI/CD test integration

8. **Deployment Documentation**
   - Deployment pipeline architecture
   - Environment promotion procedures
   - Rollback procedures
   - Blue/green deployment strategy
   - Continuous integration workflow
   - Release management process
   - Infrastructure as Code implementation
   - Monitoring and alerting setup

9. **Maintenance Documentation**
   - Logging strategies
   - Monitoring setup
   - Performance metrics tracking
   - Error tracking and reporting
   - Backup procedures
   - Disaster recovery plans
   - Update and patching processes
   - Technical debt management

10. **Development Guides**
    - Local development setup
    - Development workflow
    - Coding standards and conventions
    - Pull request procedures
    - Code review checklists
    - Troubleshooting common issues
    - Debugging techniques
    - Development tools configuration

## Documentation Quality Requirements

Ensure all documentation meets these quality standards:

1. **Accuracy**: All information must be technically accurate and verified
2. **Completeness**: Cover all aspects of each system component
3. **Consistency**: Maintain consistent terminology and formatting
4. **Clarity**: Present information in clear, unambiguous language
5. **Currency**: Document the latest version of each component
6. **Usability**: Structure documentation for easy navigation and search
7. **Examples**: Include practical examples for complex concepts
8. **Cross-references**: Link related documentation sections

## Implementation Best Practices

Documentation should emphasize these implementation best practices:

1. **TypeScript Best Practices**
   - Strict type checking enabled
   - Interface-first design approach
   - Proper use of generics, unions, and intersections
   - Discriminated unions for type narrowing
   - Consistent nullability handling
   - Proper module import/export patterns
   - Type-safe API calls
   - Typed state management

2. **Security Implementation**
   - Sensitive information stored in environment variables
   - Input validation on all user inputs
   - Parameterized queries for database operations
   - Proper CORS configuration
   - CSP implementation
   - Rate limiting on authentication endpoints
   - Session management security
   - Regular dependency security audits

3. **Error Handling**
   - Centralized error handling strategy
   - Custom error classes with meaningful messages
   - Error logging with appropriate context
   - User-friendly error messages
   - Error boundary components for React
   - API error response standardization
   - Graceful degradation patterns
   - Retry mechanisms for transient failures

4. **Performance Optimization**
   - Asset optimization strategies
   - Code splitting implementation
   - Server-side rendering approach
   - Caching strategies
   - Database query optimization
   - Network request batching
   - Lazy loading implementation
   - Web vitals monitoring

5. **Accessibility Implementation**
   - WCAG 2.1 AA compliance measures
   - Semantic HTML usage
   - Keyboard navigation support
   - Screen reader compatibility
   - Color contrast requirements
   - Focus management
   - ARIA attributes usage
   - Accessibility testing procedures

6. **SEO Implementation**
   - Meta tag strategy
   - Structured data implementation
   - Canonical URL handling
   - Sitemap generation
   - robots.txt configuration
   - Open Graph and Twitter card integration
   - Performance optimization for Core Web Vitals
   - URL structure best practices

7. **CI/CD Implementation**
   - Automated testing in CI pipeline
   - Deployment automation
   - Environment-specific configuration
   - Artifact management
   - Version tagging strategy
   - Branch protection rules
   - Release notes generation
   - Deployment approval workflows

## Documentation Format Requirements

Provide documentation in these formats:

1. **Markdown Files**: Organized by system component
2. **API Reference**: OpenAPI/Swagger specification
3. **Database Schema**: Entity-relationship diagrams
4. **Architecture Diagrams**: Component and infrastructure visualizations
5. **Code Samples**: Practical implementation examples
6. **Configuration Templates**: Example configuration files
7. **Checklists**: Implementation verification lists
8. **Troubleshooting Guides**: Common issues and resolutions
```

# Review Checklist for Technical Documentation

Use this checklist to evaluate the quality and completeness of the generated technical documentation:

## Technical Completeness
1. [ ] All technical dependencies specified with exact versions
2. [ ] Development environment requirements clearly defined
3. [ ] All required third-party services identified with integration details
4. [ ] Deployment process fully documented with step-by-step instructions
5. [ ] Authentication and authorization mechanisms thoroughly explained
6. [ ] Error handling strategies comprehensively documented
7. [ ] Performance optimization techniques detailed
8. [ ] Security measures fully described

## Implementation Details
1. [ ] Each component has clear, actionable implementation tasks
2. [ ] Dependencies between components clearly identified
3. [ ] Security considerations addressed for each component
4. [ ] Error handling covered for all critical operations
5. [ ] Edge cases and failure scenarios documented
6. [ ] Performance considerations included for each component
7. [ ] Accessibility requirements specified for UI components
8. [ ] SEO considerations documented for public-facing pages

## Architecture Documentation
1. [ ] System architecture diagrams provided in standard notation
2. [ ] Component relationships clearly defined
3. [ ] Data flow between components visualized
4. [ ] Infrastructure requirements specified
5. [ ] Scalability considerations documented
6. [ ] Integration points with external systems defined
7. [ ] Security boundaries identified
8. [ ] Performance bottlenecks addressed

## Testing Coverage
1. [ ] Unit testing requirements specified for all components
2. [ ] Integration testing approaches documented
3. [ ] End-to-end testing scenarios defined
4. [ ] Performance testing methodologies outlined
5. [ ] Security testing procedures documented
6. [ ] Accessibility testing requirements specified
7. [ ] Test data management approach defined
8. [ ] Test coverage expectations clearly stated

## Performance Considerations
1. [ ] Optimization strategies defined for frontend and backend
2. [ ] Caching strategy documented with TTL specifications
3. [ ] Image and asset optimization techniques described
4. [ ] Database query optimization guidelines provided
5. [ ] Network request optimization strategies outlined
6. [ ] Bundle size management approach defined
7. [ ] Lazy loading implementation documented
8. [ ] Performance monitoring setup specified

## Security Review
1. [ ] Authentication flow fully documented
2. [ ] Authorization model clearly defined
3. [ ] Data encryption requirements specified
4. [ ] API security measures described in detail
5. [ ] CSRF, XSS, and injection prevention documented
6. [ ] Secure data handling procedures outlined
7. [ ] Security headers configuration specified
8. [ ] Security scanning and auditing procedures defined

## Maintenance Procedures
1. [ ] Backup strategy comprehensively documented
2. [ ] Update procedures clearly outlined
3. [ ] Monitoring setup fully specified
4. [ ] Alerting thresholds and procedures defined
5. [ ] Log management approach documented
6. [ ] Disaster recovery procedures specified
7. [ ] Database maintenance tasks outlined
8. [ ] Performance monitoring and optimization cycle defined

## Documentation Quality
1. [ ] All APIs documented with request/response examples
2. [ ] Configuration options fully explained
3. [ ] Deployment procedures documented step-by-step
4. [ ] Troubleshooting guidance provided for common issues
5. [ ] Code examples included for complex implementations
6. [ ] Technical concepts explained clearly
7. [ ] Documentation organized logically by component
8. [ ] Cross-references provided between related sections