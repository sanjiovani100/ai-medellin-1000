# Prompt: Generate Cline Rules for Medellin AI Platform

You are an expert AI consultant specializing in Cline configuration for complex software projects. Your task is to create a comprehensive set of Cline rules for the Medellin AI Event Platform that optimizes AI assistance across different project domains.

## Project Context

The Medellin AI platform is an event management system with specialized components for:
- Event planning and management
- Attendee registration and ticketing
- UI/UX with Tailwind CSS and shadcn/ui components
- Database architecture using Supabase PostgreSQL
- Marketing and CRM functionality
- Sponsorship management
- Social media integration
- WhatsApp integration

## Requirements

Create a complete `.clinerules` configuration file that includes:

1. **Core Development Modes**
   - Define specialized AI modes for each major development domain
   - Each mode should have a clear, focused role definition
   - Configure appropriate file access permissions for each mode

2. **UI/UX Development Mode**
   - Specialized for frontend development with Tailwind CSS and shadcn/ui
   - Access to CSS, HTML, JSX, TSX files
   - Browser tool access for visual testing

3. **Database Architecture Mode**
   - Specialized for Supabase PostgreSQL schema design
   - Access to SQL, TypeScript, and JavaScript files
   - Command execution permissions for database operations

4. **Event Management Architecture Mode**
   - Specialized for designing event management systems
   - Documentation-focused with markdown file access
   - Read-only access to implementation files for reference

5. **Integration Development Mode**
   - Specialized for API and service integrations
   - Access to API configuration and integration files
   - Command execution permissions for testing integrations

6. **Documentation Mode**
   - Specialized for technical documentation
   - Access to markdown and documentation files
   - Read-only access to code files for reference documentation

7. **Testing/QA Mode**
   - Specialized for test creation and quality assurance
   - Access to test files and limited production code
   - Browser and command execution for test running

8. **DevOps Mode**
   - Specialized for deployment and infrastructure
   - Access to configuration and deployment files
   - Command execution for deployment operations

## Mode Configuration Guidelines

For each mode, provide:

1. **Slug**: Short, descriptive identifier (lowercase, hyphens for spaces)
2. **Name**: Human-readable name
3. **Role Definition**: Clear, detailed description of the mode's purpose and expertise
4. **File Access Groups**:
   - Read access patterns (which files can be read)
   - Edit access patterns (which files can be modified)
   - Command execution permissions (if applicable)
   - Browser access permissions (if applicable)
   - MCP tool access permissions (if applicable)

5. **Custom Instructions**: Specialized instructions for each mode that enhance its effectiveness

## Output Format

Provide the complete `.clinerules` file in valid JSON format, structured as follows:

```json
{
  "customModes": [
    {
      "slug": "mode-slug",
      "name": "Mode Name",
      "roleDefinition": "Detailed role description...",
      "groups": ["read", ["edit", { "fileRegex": "\\.ext$" }], "command", "browser", "mcp"],
      "customInstructions": "Mode-specific instructions..."
    },
    // Additional modes...
  ]
}
```

Ensure the configuration is comprehensive, follows best practices for separation of concerns, and provides clear boundaries between different development domains. The rules should enable efficient AI assistance while maintaining appropriate access controls.