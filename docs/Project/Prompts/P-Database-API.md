# Prompt for Medellin AI Event Platform - Database & API Documentation

Create a comprehensive database and API documentation for the Medellin AI Event Platform that provides detailed information about the database schema, API endpoints, authentication mechanisms, and Supabase integration. This document should serve as the definitive reference for developers working with the platform's data layer and APIs.

## Document Structure and Content

1. **Introduction (5-10 lines)**

   - Purpose and scope of this documentation
   - Relationship to other technical documentation
   - Overview of the data architecture approach

2. **Database Schema Documentation (40-50 lines)**

   - Overview of database design philosophy and principles
   - Complete table documentation for each entity:
     - Table name and purpose
     - Column definitions (name, type, constraints, default values)
     - Primary and foreign keys
     - Indexes and their purposes
     - Triggers and stored procedures (if any)
   - Schema organization and namespaces
   - Soft deletion implementation
   - Audit trail and history tracking
   - Performance considerations

3. **Entity-Relationship Diagrams (20-30 lines)**

   - High-level ER diagram showing all major entities and their relationships
   - Detailed ER diagrams for specific domains:
     - User and authentication entities
     - Event management entities
     - Registration and ticketing entities
     - AI feature entities
   - Cardinality and relationship types
   - Text description of key relationships and their business logic
   - Notes on circular dependencies or complex relationships

4. **API Specification (50-60 lines)**

   - API design principles and standards
   - Authentication and authorization requirements
   - Base URL structure and versioning approach
   - Detailed endpoint documentation for each resource:
     - HTTP method and path
     - Request parameters, headers, and body schema
     - Response status codes and body schema
     - Rate limiting information
     - Caching behavior
   - Error handling and response format
   - Pagination implementation
   - Search and filtering capabilities
   - Sample requests and responses

5. **Authentication and Authorization (30-40 lines)**

   - Authentication mechanisms:
     - JWT implementation
     - Social login integration
     - Refresh token handling
   - Role-based access control:
     - Available roles and their capabilities
     - Permission granularity
     - Resource-level permissions
   - Row-Level Security implementation in Supabase
   - Security best practices for API consumers
   - Rate limiting and abuse prevention
   - Session management
   - Multi-factor authentication implementation

6. **Data Migration Procedures (20-30 lines)**

   - Migration philosophy and approach
   - Tools and frameworks used
   - Migration development workflow:
     - Creating new migrations
     - Testing migrations
     - Applying migrations to different environments
   - Versioning strategy
   - Rollback procedures
   - Handling large data migrations
   - Monitoring and validation procedures
   - Common migration patterns and examples

7. **Supabase Integration (40-50 lines)**

   - Supabase architecture overview
   - Authentication configuration:
     - Email/password auth setup
     - OAuth provider configuration
     - Custom claims and user metadata
   - Database access patterns:
     - Server-side vs. client-side queries
     - Supabase client usage
     - Query optimization for Supabase
   - Row Level Security policies:
     - Policy definition examples
     - Testing RLS policies
     - Common patterns and best practices
   - Realtime functionality implementation
   - Storage bucket configuration and usage
   - Edge Functions usage (if applicable)
   - Supabase Hooks and Triggers

8. **Query Patterns and Examples (20-30 lines)**

   - Common query patterns
   - Complex join examples
   - Performance optimization techniques
   - Pagination implementation
   - Full-text search implementation
   - Transaction management
   - Batch operations
   - Code examples for key data access patterns

9. **API Versioning and Evolution (15-20 lines)**

   - API versioning strategy
   - Deprecation policy and process
   - Backwards compatibility guidelines
   - API changelog management
   - Breaking vs. non-breaking changes
   - API evolution best practices

10. **Data Validation and Integrity (15-20 lines)**
    - Validation approach at different layers
    - Database-level constraints and checks
    - API-level validation
    - Client-side validation
    - Cross-field validation rules
    - Data integrity maintenance procedures
    - Handling validation errors

## Important Guidelines

1. **Technical Accuracy:**

   - Ensure all schema definitions match the actual database implementation
   - Verify API endpoints with actual code implementation
   - Confirm authentication flows through testing
   - Validate all SQL examples and migrations

2. **Code Examples:**

   - Include SQL DDL statements for key tables
   - Provide example API requests and responses in curl and JavaScript
   - Show Supabase client usage examples
   - Include migration script examples
   - Demonstrate authentication flow with code

3. **Visual Elements:**

   - Create entity-relationship diagrams using standard notation
   - Include flow diagrams for authentication processes
   - Provide request/response sequence diagrams for complex API flows
   - Use tables for schema definitions and API endpoints
   - Include permission matrices for role-based access

4. **Specific Supabase Focus:**

   - Detail how Supabase features map to application requirements
   - Explain Supabase-specific optimizations and constraints
   - Address Supabase authentication peculiarities
   - Document any workarounds for Supabase limitations
   - Include Supabase dashboard configuration screenshots

5. **Developer Usability:**
   - Structure content for both reference and learning
   - Make API documentation easy to navigate
   - Include troubleshooting sections for common issues
   - Provide guidance on local development with the database
   - Link between related sections for better discoverability

The final documentation should be maximum 400 lines total - comprehensive enough to serve as a complete reference for the database and API architecture while remaining focused on essential information and practical examples. Use code blocks, tables, and bullet points to improve readability and technical accuracy.
