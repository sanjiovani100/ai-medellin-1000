# AI Medellin Vercel Hosting Guide

This comprehensive guide covers all aspects of hosting the AI Medellin project on Vercel, including deployment configuration, the Vercel MCP server integration, troubleshooting, and verification of repository structure.

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Repository Structure Verification](#repository-structure-verification)
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

## Repository Structure Verification

### Critical: Verify Template-Solar Directory Contents

Before proceeding with deployment configuration, it's essential to verify that the `template-solar` directory exists and contains the necessary files:

1. **Check if directory exists**:
   ```bash
   ls -la template-solar
   ```

2. **Verify key files and directories exist**:
   - `template-solar/src/` (contains the actual Next.js application)
   - `template-solar/package.json` (contains dependencies and scripts)
   - `template-solar/next.config.js` or `template-solar/next.config.ts`

3. **Potential Issue**: If the directory exists but is empty or missing key files, you may need to:
   - Properly clone the Solar template into this directory
   - Ensure the `solar-template` branch contents were correctly merged
   - Check if the template is in a different location than expected

4. **Structure Dependencies**: The Vercel configuration depends on the correct structure. If files are not in the expected locations, the deployment will fail regardless of configuration.

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

After reviewing the project and Vercel settings, we identified several possible reasons why the Solar template isn't appearing as the main site:

1. **Repository Structure Issue**:
   - The `template-solar` directory might not contain the expected Solar template files
   - The structure might be different than what the configuration expects
   - The template might be in a different location

2. **Root Directory Mismatch**: 
   - The Vercel dashboard had the Root Directory setting empty, but our build commands were trying to run from the template-solar directory
   - This created a conflict in path resolution

3. **Build Command Confusion**: 
   - The `cd template-solar` prefix in the build commands was causing issues because Vercel executes commands relative to the Root Directory setting

4. **Path Resolution Issues**: 
   - Without proper rewrites or correct directory structure, Vercel was serving files from the wrong location

5. **Dashboard vs. Configuration File**: 
   - Conflicts between settings in the Vercel dashboard UI and our vercel.json file

### Steps Taken to Fix the Issue

We took the following steps to resolve the Solar template deployment issues:

1. ✅ **Switched to Rewrites Approach**
   - Updated vercel.json to use the simpler and more reliable rewrites method
   - This approach works if the directory structure is correct
   - Pushed changes to GitHub

2. ✅ **Created Comprehensive Documentation**
   - Added detailed troubleshooting steps
   - Created a prompt template for requesting AI assistance
   - Documented all approaches for fixing the issue

3. ✅ **Identified Dashboard Setting Conflicts**
   - Documented that the Root Directory setting should either:
     - Be set to "template-solar" if using the build command approach
     - Be left empty if using the rewrites approach

### Further Required Steps

Based on the latest review, these additional steps may be necessary:

1. **Verify template-solar directory content**:
   - Ensure the Solar template files are actually in this directory
   - Check that the directory contains a complete Next.js application

2. **If template-solar is empty or incomplete**:
   - Clone the Solar template into this directory
   - Push the changes to GitHub
   - Update configuration accordingly

3. **If template structure is different**:
   - Adjust the vercel.json configuration to match the actual structure
   - Update paths in the configuration to point to the correct locations

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
   - After fixing directory structure and configuration, this should show the Solar template

2. **Solar Template URL**: https://ai-medellin-1000-1w9ygi7lc-ai-socialmediavs-projects.vercel.app/
   - Requires Vercel login to access
   - Shows the professional Solar template design

## Troubleshooting

### Issue: Main Site Not Showing Solar Template

#### Critical: Verify Repository Structure First

Before trying other solutions, verify that the Solar template files are actually in the repository:

1. Clone the repository locally and check the `template-solar` directory
2. Ensure it contains a complete Next.js application with all necessary files
3. If the directory is empty or incomplete, add the Solar template files to it
4. Push the updated repository to GitHub

#### 1. Manual Vercel Deployment Trigger

After verifying the repository structure, trigger a manual redeploy:
1. Go to https://vercel.com/dashboard
2. Find the AI Medellin project
3. Go to Deployments tab
4. Click "Redeploy" on the latest deployment

#### 2. Check Build Logs

If redeploying doesn't help:
1. Go to the latest deployment
2. Click "View Build Logs"
3. Look for any errors related to the configuration or missing files
4. Pay special attention to path-related errors

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

The AI Medellin project should be set up with the Solar template as the main user interface, but we need to verify the repository structure first. The Vercel MCP server integration provides powerful AI-assisted deployment management capabilities.

After verifying the repository structure and implementing the appropriate configuration, the Solar template should appear at your main URL. If it doesn't, follow the troubleshooting steps above to resolve any remaining issues.