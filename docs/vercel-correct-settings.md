# Correct Vercel Configuration for AI Medellin Solar Template

This guide provides the exact settings needed to successfully deploy the AI Medellin Solar Template on Vercel.

## Current Issue

You're receiving the error:
```
The specified Root Directory "template-solar" does not exist. Please update your Project Settings.
```

This occurs due to a conflict between your Vercel dashboard settings and your vercel.json configuration.

## Solution: Choose ONE of These Approaches

You must choose either the Root Directory approach OR the Rewrites approach - not both simultaneously.

### Approach 1: Using Root Directory (Recommended)

1. **Vercel Dashboard Settings**:
   - **Framework**: Next.js
   - **Build Command**: `npm run build` or `next build`
   - **Output Directory**: Next.js default
   - **Install Command**: `npm install`
   - **Root Directory**: `template-solar`
   - **Node.js Version**: 22.x
   - **Prioritize Production Builds**: Enabled

2. **vercel.json**:
   Either delete this file entirely or update it to be empty:
   ```json
   {}
   ```

   When you set the Root Directory to `template-solar`, Vercel treats that directory as the project root, so there's no need for rewrites.

### Approach 2: Using Rewrites

1. **Vercel Dashboard Settings**:
   - **Framework**: Next.js
   - **Build Command**: `npm run build` or `next build`
   - **Output Directory**: Next.js default
   - **Install Command**: `npm install`
   - **Root Directory**: *(leave blank/empty)*
   - **Node.js Version**: 22.x
   - **Prioritize Production Builds**: Enabled

2. **vercel.json**:
   Keep your current rewrites configuration:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/template-solar/$1" }
     ]
   }
   ```

## Why This Fixes The Problem

Your current configuration is mixing both approaches:
- Your Vercel dashboard has "template-solar" as the Root Directory
- Your vercel.json is also using rewrites to the template-solar directory

These two approaches are mutually exclusive and conflict with each other:
- When Root Directory is set, Vercel runs commands INSIDE that directory
- When using rewrites, Vercel runs commands at the repository root but serves content from the rewritten path

## Verifying Your Repository Structure

Before applying either fix, verify that the `template-solar` directory contains all necessary files:

1. Make sure the `template-solar` directory contains:
   - A complete Next.js application structure
   - A package.json file with all dependencies
   - Source code files in `src/` directory

2. If the directory is empty or missing files:
   - Clone/copy the Solar template files into this directory
   - Commit and push these changes to your repository
   - Then apply the configuration changes above

## After Making Changes

1. After updating settings in the Vercel dashboard, trigger a new deployment
2. Check the build logs for any new issues
3. Verify the deployed site is displaying the Solar template correctly

By following this guide, your Solar template should successfully deploy as the main site for your AI Medellin project.