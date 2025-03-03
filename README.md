# AI Medellin Project

AI Medellin is an AI-powered event platform built with Next.js and the Solar template, featuring Vercel MCP integration for advanced deployment management.

## Project Overview

This repository contains:
- A Next.js application using the Solar template
- Vercel MCP server integration for AI-powered deployments
- Comprehensive documentation and setup guides

## Live Deployments

- Main site: [https://ai-medellin-1000.vercel.app/](https://ai-medellin-1000.vercel.app/)
- Solar template deployment: [https://ai-medellin-1000-1w9ygi7lc-ai-socialmediavs-projects.vercel.app/](https://ai-medellin-1000-1w9ygi7lc-ai-socialmediavs-projects.vercel.app/) (requires Vercel login)

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/sanjiovani100/ai-medellin-1000.git
   cd ai-medellin-1000
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. To use the Vercel MCP server:
   ```
   C:\Users\sanji\0-roo-code\run-vercel-mcp.bat
   ```

## Project Structure

- `/src` - Main Next.js application code
- `/template-solar` - Solar template files
- `/docs` - Project documentation
- `vercel.json` - Vercel deployment configuration

## Documentation

- [Vercel Hosting Guide](./docs/vercel-hosting.md) - Comprehensive guide to Vercel deployment and MCP integration
- [Getting Started Guide](./docs/getting-started-guide.md) - Simple instructions for development
- [Solar Template Deployment](./docs/solar-template-deployment.md) - Guide for integrating the Solar template
- [Changelog](./CHANGELOG.md) - Detailed record of project changes and implementations

## Features

- **AI-Powered Event Platform**
  - Event creation and management
  - Attendee registration and tracking
  - Event marketing tools

- **Vercel Integration**
  - AI-powered Vercel project management
  - Automated deployment workflows
  - Enhanced development tools with AI integration

- **Solar Template**
  - Professional user interface
  - Responsive design
  - Modern component library

## Vercel MCP Server

The Vercel MCP server allows AI assistants to interact with your Vercel projects:

1. Run the server:
   ```
   C:\Users\sanji\0-roo-code\run-vercel-mcp.bat
   ```

2. Use AI to:
   - Manage deployments
   - Configure domains
   - Update environment variables
   - View analytics and logs

## Deployment Configuration

The project is configured to deploy the Solar template as the main site using the settings in `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "cd template-solar && npm install && npm run build",
  "outputDirectory": "template-solar/.next",
  "installCommand": "cd template-solar && npm install"
}
```

## Development Status

- Current completion: 30% (Core dependencies and initial setup)
- In progress: Component customization
- Remaining: 70% (Feature implementation and final deployment)

## License

[MIT](LICENSE)