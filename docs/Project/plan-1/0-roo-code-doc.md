# Roo Code: Comprehensive Setup & Optimization Guide for Medellin AI Event Platform

## Table of Contents

1. [Introduction to Roo Code for Medellin AI](#1-introduction-to-roo-code-for-medellin-ai)
2. [Installation & Setup](#2-installation--setup)
3. [Core Modes & Configuration for Event Platform Development](#3-core-modes--configuration-for-event-platform-development)
4. [Tools & Capabilities for Medellin AI Development](#4-tools--capabilities-for-medellin-ai-development)
5. [MCP Servers & Extensions for Event Management](#5-mcp-servers--extensions-for-event-management)
6. [Custom Instructions & Optimization for Medellin AI](#6-custom-instructions--optimization-for-medellin-ai)
7. [Medellin AI Development Workflows & Best Practices](#7-medellin-ai-development-workflows--best-practices)
8. [Event Platform Project Management & Collaboration](#8-event-platform-project-management--collaboration)
9. [Advanced Features & Techniques](#9-advanced-features--techniques)
10. [Medellin AI Troubleshooting & Support](#10-medellin-ai-troubleshooting--support)
11. [Glossary](#11-glossary)

## 1. Introduction to Roo Code for Medellin AI

### Overview

Roo Code is an AI-powered development assistant that integrates directly with your development environment to enhance productivity and streamline software development workflows for the Medellin AI Event Platform. Unlike traditional AI coding assistants, Roo Code provides comprehensive context awareness and robust tool usage capabilities that make it an ideal development partner for building a sophisticated event management system with React, TypeScript, Tailwind CSS, and Supabase.

### Key Differentiators for Medellin AI Event Platform Development

| Feature                   | Roo Code Value for Medellin AI                                              | Traditional Development Approach           |
| ------------------------- | --------------------------------------------------------------------------- | ------------------------------------------ |
| Event Platform Context    | Full visibility of React, TypeScript, Tailwind, and Supabase integration    | Fragmented understanding across tools      |
| Event Management Tools    | Direct interaction with event data, component creation, and API integration | Manual coding of each integration point    |
| Specialized Event Modes   | Modes for event planning, database design, UI implementation, and testing   | Generic development without specialization |
| Event Platform Extensions | Customizable MCP servers for Vercel deployment and integrations             | Limited deployment and integration options |
| Visual UI Verification    | Can analyze and validate event UI components and user flows                 | Manual testing and verification            |

### Core Philosophy for Medellin AI Development

Roo Code's approach for the Medellin AI Event Platform focuses on:

1. **Event-Centric Understanding** - Analyzing your entire project structure to understand event management flows
2. **Tool-Augmented Event Development** - Leveraging system tools to implement event registration, ticketing, and management features
3. **Specialized Event Platform Expertise** - Adapting to different roles (UI designer, backend developer, database architect)
4. **Continuous Platform Improvement** - Building the event platform iteratively with feedback-driven enhancements
5. **Structured Problem Solving** - Breaking down complex event management challenges into manageable development steps

> **💡 Tip:** Think of Roo Code as your event platform development partner that can understand, execute, and validate complex tasks across the entire Medellin AI Event Platform development lifecycle.

## 2. Installation & Setup for Medellin AI Development

### System Requirements for Event Platform Development

- **Operating Systems:** Windows 11 (recommended for Medellin AI development), macOS, or Linux
- **IDE:** Visual Studio Code (version 1.68.0 or higher)
- **Network:** Stable internet connection required for Supabase and Vercel integration
- **Storage:** Minimum 1GB free disk space for full Medellin AI project setup
- **Memory:** Minimum 8GB RAM recommended for running React development server and Supabase locally

### Installation Steps for Medellin AI Project

#### VS Code Integration for Event Platform Development

1. Open VS Code Extension Marketplace (Ctrl+Shift+X / Cmd+Shift+X)
2. Search for "Roo Code"
3. Click "Install"
4. Install recommended extensions for Medellin AI development:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript support
5. Reload VS Code when prompted

#### Medellin AI Project Setup

```bash
# Clone the Medellin AI repository
git clone [medellin-ai-repository-url]

# Navigate to project directory
cd medellin-ai

# Install dependencies with your preferred package manager
npm install
# or
yarn
# or
pnpm install
```

### Post-Installation Verification for Medellin AI

1. Open VS Code with the Medellin AI project
2. Access the Roo Code panel via the sidebar icon
3. Verify connection status shows "Connected"
4. Run a simple test command to verify project access: `Can you read the Medellin AI project structure for me?`
5. Start the development server to verify the setup:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

### Medellin AI Authentication Setup

1. Click on the Settings icon in the Roo Code panel
2. Select "Authentication Settings"
3. Configure authentication for Medellin AI development:
   - API Key for Roo Code (recommended for individual use)
   - Supabase credentials for database access
   - Vercel authentication if deploying to Vercel
4. Enter your credentials and click "Save"

> **⚠️ Important:** Keep all API keys secure and never share them in public repositories. Use environment variables (.env files) for the Medellin AI project configuration.

## 3. Core Modes & Configuration for Event Platform Development

Roo Code provides specialized modes tailored to different Medellin AI development tasks, each with unique capabilities and focus areas for event platform creation.

### Available Modes for Medellin AI

#### Code Mode for Event Platform Development

The default mode focused on implementing Medellin AI event features.

- **Best for:**
  - React component development for event cards, forms, and dashboards
  - TypeScript type definitions for event data models
  - Supabase integration for event storage and retrieval
  - User authentication and authorization implementation
- **Key capabilities:**
  - Direct file manipulation of React/TypeScript components
  - Terminal command execution for build and test processes
  - Browser interaction to verify event UI rendering
  - Integration with shadcn/ui components

```json
// Example mode configuration in custom modes file for Medellin AI
{
  "slug": "code",
  "name": "Code",
  "roleDefinition": "You are Roo, a highly skilled software engineer specializing in React, TypeScript, Tailwind CSS, and Supabase integration for the Medellin AI Event Platform...",
  "groups": ["read", "edit", "browser", "command", "mcp"]
}
```

#### Architect Mode for Event Platform Design

Specialized for planning and designing the Medellin AI event system architecture.

- **Best for:**
  - Event data modeling and database schema design
  - API architecture for event management workflows
  - Component hierarchy planning
  - Security implementation for event registrations
  - Performance optimization strategy
- **Key capabilities:**
  - Technical documentation for the event platform
  - System decomposition of event management features
  - Database schema evaluation
  - Risk assessment for scalability challenges

```json
{
  "slug": "architect",
  "name": "Event Architect",
  "roleDefinition": "You are Roo, an experienced technical architect specializing in event management systems with expertise in React, TypeScript, Supabase, and database design for the Medellin AI platform...",
  "groups": [
    "read",
    ["edit", { "fileRegex": "\\.md$", "description": "Markdown files only" }]
  ]
}
```

#### Ask Mode for Event Platform Knowledge

Focused on answering technical questions about event platform development.

- **Best for:**
  - Clarification on event data structures
  - Explanations of authentication flows
  - Best practices for event registration forms
  - Supabase query optimization
  - Performance considerations for event listings
- **Key capabilities:**
  - In-depth technical explanations of event management concepts
  - Code analysis for event platform components
  - Reference information on React and Supabase integration
  - Learning assistance for TypeScript type definitions

#### Debug Mode for Event Platform Troubleshooting

Specialized for troubleshooting and fixing issues in the Medellin AI platform.

- **Best for:**
  - Event registration flow errors
  - Database query performance issues
  - React component rendering problems
  - Authentication and authorization bugs
  - Form validation failures
- **Key capabilities:**
  - Error diagnosis in event management workflows
  - Step-by-step debugging of registration processes
  - Root cause analysis of data inconsistencies
  - Solution implementation for UI/UX issues

### Creating Custom Modes for Medellin AI Development

Custom modes can be configured in two ways to optimize your Medellin AI Event Platform development:

1. **Globally** via `c:\Users\{username}\AppData\Roaming\Code\User\globalStorage\rooveterinaryinc.roo-cline\settings\cline_custom_modes.json`
2. **Project-specific** via `.roomodes` in the Medellin AI workspace root directory (recommended)

Example of custom modes tailored for the Medellin AI Event Platform:

```json
{
  "customModes": [
    {
      "slug": "event-ui-designer",
      "name": "Event UI Designer",
      "roleDefinition": "You are Roo, a UI/UX expert specializing in event management interfaces with deep knowledge of Tailwind CSS, shadcn/ui components, and event ticketing systems...",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\.(css|scss|less|html|jsx|tsx)$" }],
        "browser"
      ],
      "customInstructions": "Focus on creating responsive, accessible event interfaces with mobile-first design principles. Prioritize clear visual hierarchies for event listings, registration forms, and attendee dashboards."
    },
    {
      "slug": "database-architect",
      "name": "Database Architect",
      "roleDefinition": "You are Roo, a database expert specializing in Supabase PostgreSQL schema design for event management systems...",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\.(sql|ts|js)$" }],
        "command"
      ],
      "customInstructions": "Design database schemas that prioritize data integrity for event registrations, optimize queries for event listings, and implement proper row-level security for event management."
    }
  ]
}
```

> **💡 Best Practice for Medellin AI:** Create specialized modes for the key event platform components: UI design, database operations, API integration, testing, and deployment workflows. This will help maintain focus and provide optimal assistance for each aspect of the event platform development.

### Mode Switching Techniques for Event Platform Development

1. **Using the UI:** Select the appropriate mode from the Roo Code panel dropdown based on your current development focus
2. **Using commands:** Type `/switch event-ui-designer` when working on event interface components
3. **Context-based switching:** Let Roo suggest the appropriate mode based on your current task:

```
<switch_mode>
<mode_slug>database-architect</mode_slug>
<reason>Need to design event registration schema with proper relationships to users and tickets</reason>
</switch_mode>
```

> **Medellin AI Workflow Tip:** Start your development sessions in Architect mode to plan features, switch to Code mode for implementation, use Debug mode for troubleshooting, and finally use Test mode to validate your event platform features.

## 4. Tools & Capabilities for Medellin AI Development

Roo Code's power comes from its ability to use tools that interact with your development environment. These tools enable it to perform tangible event platform development tasks rather than just providing suggestions.

### File Operations for Event Platform Development

#### read_file for Component Analysis

Reads file contents with line numbers for reference, essential for understanding existing components in the Medellin AI platform.

```
<read_file>
<path>src/components/events/EventCard.tsx</path>
</read_file>
```

#### write_to_file for Event Component Creation

Creates or overwrites files with specified content, perfect for implementing new event management features.

```
<write_to_file>
<path>src/utils/eventFormatters.ts</path>
<content>
/**
 * Event formatting utilities for Medellin AI platform
 */
export const formatEventDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(amount);
};

export const formatEventCapacity = (registered: number, capacity: number): string => {
  return `${registered}/${capacity} asistentes`;
};
```
