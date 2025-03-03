# AI Medellin Vercel Hosting Guide

This comprehensive guide covers all aspects of hosting the AI Medellin project on Vercel, including deployment configuration, the Vercel MCP server integration, and troubleshooting steps.

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Vercel Configuration](#vercel-configuration)
- [Vercel MCP Server](#vercel-mcp-server)
- [Deployment Workflow](#deployment-workflow)
- [Troubleshooting](#troubleshooting)
- [Long-Term Management](#long-term-management)

## Introduction

The AI Medellin project consists of two main components:
1. A public-facing website built using the Solar template
2. The Vercel MCP server integration for AI-powered deployment management

This guide covers how these components are set up, deployed, and managed.

## Project Structure

The AI Medellin project has the following key components:

- **Solar Template**: Located in `/template-solar/`, this is the professional user interface
- **Main Project Files**: Located in the root and `/src/` directory
- **Documentation**: Located in the `/docs/` directory
- **Vercel Configuration**: Located in `vercel.json` in the root directory

## Vercel Configuration

### Current Configuration

The `vercel.json` file in the root directory is configured to build and deploy the Solar template:

```json
{
  "framework": "nextjs",
  "buildCommand": "cd template-solar && npm install && npm run build",
  "outputDirectory": "template-solar/.next",
  "installCommand": "cd template-solar && npm install"
}
```

This configuration:
1. Tells Vercel to treat the project as a Next.js application
2. Directs the build process to the Solar template directory
3. Specifies that the output from the Solar template build becomes the main deployed website

### Alternative Configuration

If the current configuration doesn't work, this alternative can be tried:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/template-solar/$1" }
  ]
}
```

### Implementation Steps Completed

We've taken several steps to set up the Vercel deployment:

1. ✅ **Merged Solar Template branch**
   - Merged `solar-template` into `main` branch
   - Pushed changes to GitHub repository

2. ✅ **Added deployment configuration**
   - Created `vercel.json` with configuration pointing to Solar template
   - Set up proper build and install commands

3. ✅ **Added necessary configuration files**
   - Added postcss.config.mjs
   - Configured Next.js settings
   - Created proper project structure

## Vercel MCP Server

The Vercel MCP server allows AI assistants to help manage Vercel deployments.

### Setup Details

1. ✅ **Server Installation**
   - Location: `C:\Users\sanji\0-roo-code\vercel-mcp-server`
   - Added configuration files and dependencies

2. ✅ **Server Configuration**
   - Updated with token: `rEKao6EzB4nOyKKionDo0PyM`
   - Created missing configuration files

3. ✅ **Startup Script**
   - Created run script: `C:\Users\sanji\0-roo-code\run-vercel-mcp.bat`
   - Added to Cline MCP settings

### Using the Vercel MCP Server

To use the server:

1. Run the batch file:
   ```
   C:\Users\sanji\0-roo-code\run-vercel-mcp.bat
   ```

2. Once running, you can ask AI assistants to help with:
   - "Show me my Vercel project settings"
   - "List recent deployments and their status"
   - "Show me build logs for the latest deployment"
   - "Trigger a new deployment of the main branch"
   - "Add a custom domain to my project"

## Deployment Workflow

### How Deployment Works

When you push changes to your GitHub repository:

1. Vercel detects the push and starts a new deployment
2. It reads the `vercel.json` configuration
3. It follows the specified build commands, focusing on the `/template-solar/` directory
4. It deploys the built Solar template site to your main URL

### Current Deployment Status

Currently, there are two deployments:

1. **Main URL**: https://ai-medellin-1000.vercel.app/
   - Should display the Solar template (currently showing a basic Next.js app)

2. **Solar Template URL**: https://ai-medellin-1000-1w9ygi7lc-ai-socialmediavs-projects.vercel.app/
   - Requires Vercel login to access
   - Shows the professional Solar template design

## Troubleshooting

### Issue: Main Site Not Showing Solar Template

To resolve this issue:

#### 1. Manual Vercel Deployment Trigger

Log into your Vercel dashboard and trigger a manual redeploy:
1. Go to https://vercel.com/dashboard
2. Find the AI Medellin project
3. Go to Deployments tab
4. Click "Redeploy" on the latest deployment

#### 2. Check Build Logs

If redeploying doesn't help:
1. Go to the latest deployment
2. Click "View Build Logs"
3. Look for any errors related to the build command or configuration

#### 3. Verify Project Settings

Ensure your Vercel project settings are correct:
1. Go to the project settings
2. Check that the "Root Directory" is set to `/` (not a subdirectory)
3. Verify that the "Framework Preset" is Next.js
4. Check that there's no conflicting build command in the Vercel UI settings

### Issue: Preview Deployment Requires Login

For the preview deployment issue (requiring login):
1. Go to Vercel project settings
2. Find "Privacy" settings
3. Make sure "Automatically expose Preview Deployments" is enabled

## Long-Term Management

### Multiple Deployments and Custom Domains

If you want to set up multiple deployments (e.g., for a separate admin dashboard):

1. Create a new Vercel project pointing to the same repository
2. Configure it to build from a different directory
3. Assign a different domain or subdomain to this deployment

### Updating Configuration

If you need to make changes to the deployment configuration:

1. Edit the `vercel.json` file
2. Commit and push the changes to GitHub
3. Vercel will use the updated configuration for the next deployment

### Ongoing Development

Once deployment issues are resolved:
1. Continue development on the main branch
2. Use the Vercel MCP server for ongoing deployment management
3. Reference the CHANGELOG.md for a chronological record of project developments

## Conclusion

The AI Medellin project is set up with a robust deployment configuration using Vercel, with the Solar template as the main user interface. The Vercel MCP server integration provides powerful AI-assisted deployment management capabilities.

After resolving the current deployment issues, you'll have a solid foundation for continued development of the AI Medellin event platform.