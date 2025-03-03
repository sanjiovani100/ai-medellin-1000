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

### Updated Configuration

We've updated the `vercel.json` file to use a rewrites approach instead of build commands:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/template-solar/$1" }
  ]
}
```

This configuration:
1. Redirects all requests from the root URL to the template-solar directory
2. Simplifies the configuration by avoiding potential conflicts with dashboard settings
3. Works better with Vercel's default behavior for monorepo structures

### Previous Configuration (Not Working)

Our previous configuration had issues with Vercel's dashboard settings:

```json
{
  "framework": "nextjs",
  "buildCommand": "cd template-solar && npm install && npm run build",
  "outputDirectory": "template-solar/.next",
  "installCommand": "cd template-solar && npm install"
}
```

### Why the Solar Template Wasn't Showing as Main

After reviewing the project and Vercel settings, we identified several reasons why the Solar template wasn't appearing as the main site:

1. **Root Directory Mismatch**: The Vercel dashboard had the Root Directory setting empty, but our build commands were trying to run from the template-solar directory. This created a conflict.

2. **Build Command Confusion**: The `cd template-solar` prefix in the build commands was causing issues because Vercel already executes commands relative to the Root Directory setting.

3. **Path Resolution Issues**: Without proper rewrites, Vercel was trying to serve files from the wrong location, leading to the main site showing the basic Next.js app instead of the Solar template.

4. **Dashboard vs. Configuration File**: There was a conflict between settings in the Vercel dashboard UI and in our vercel.json file.

### Steps Taken to Fix the Issue

We took the following steps to resolve the Solar template deployment issues:

1. ✅ **Switched to Rewrites Approach**
   - Updated vercel.json to use the simpler and more reliable rewrites method
   - This approach works regardless of Root Directory setting
   - Pushed changes to GitHub

2. ✅ **Created Comprehensive Documentation**
   - Added detailed troubleshooting steps in vercel-hosting-revised.md
   - Created a prompt template for requesting AI assistance
   - Documented all approaches for fixing the issue

3. ✅ **Identified Dashboard Setting Conflicts**
   - Documented that the Root Directory setting should either:
     - Be set to "template-solar" if using the build command approach
     - Be left empty if using the rewrites approach
   - Added instructions for checking build logs and verifying settings

### Implementation Steps Completed

We've taken several steps to set up the Vercel deployment:

1. ✅ **Merged Solar Template branch**
   - Merged `solar-template` into `main` branch
   - Pushed changes to GitHub repository

2. ✅ **Added deployment configuration**
   - Initially created `vercel.json` with build command configuration
   - Updated to rewrites approach for better compatibility
   - Set up proper project structure

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
3. With the rewrites configuration, it serves all requests from the template-solar directory
4. It deploys the built application to your main URL

### Current Deployment Status

Currently, there are two deployments:

1. **Main URL**: https://ai-medellin-1000.vercel.app/
   - Should display the Solar template (currently showing a basic Next.js app)
   - After the rewrites configuration update, this should now show the Solar template

2. **Solar Template URL**: https://ai-medellin-1000-1w9ygi7lc-ai-socialmediavs-projects.vercel.app/
   - Requires Vercel login to access
   - Shows the professional Solar template design

## Troubleshooting

### Issue: Main Site Not Showing Solar Template

If after the rewrites update the main site still doesn't show the Solar template:

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
3. Look for any errors related to the configuration

#### 3. Verify Project Settings

Ensure your Vercel project settings are correct:
1. Go to the project settings
2. For the rewrites approach:
   - Root Directory should be empty (not specified)
   - Framework Preset should be Next.js
   - Let Vercel use its default build, install, and output settings

#### 4. Try Setting Root Directory Directly

If rewrites don't work, try this alternative:
1. Go to Vercel project settings
2. Set "Root Directory" to `template-solar`
3. Use default build and install commands (no need for cd prefix)
4. Redeploy the project

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

After implementing the rewrites approach and pushing to GitHub, the Solar template should now appear at your main URL. If it doesn't, follow the troubleshooting steps above to resolve any remaining issues.