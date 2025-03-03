# Revised Vercel Hosting Configuration

After reviewing the current setup, we've identified why the Solar template might not be appearing as the main site. This document provides an updated set of steps to properly configure Vercel for the AI Medellin project.

## Current Issue

Despite configuring `vercel.json` and merging the Solar template branch, the main site at https://ai-medellin-1000.vercel.app/ is still not showing the Solar template. This is likely due to a mismatch between our configuration and the Vercel dashboard settings.

## Vercel Dashboard Settings Review

Based on the information provided, your Vercel dashboard settings are:

- **Framework**: Next.js
- **Build Command**: `npm run build` or `next build`
- **Output Directory**: Next.js default
- **Install Command**: `yarn install`, `pnpm install`, `npm install`, or `bun install`
- **Root Directory**: Not specified (empty)

However, our `vercel.json` configuration specifies:

```json
{
  "framework": "nextjs",
  "buildCommand": "cd template-solar && npm install && npm run build",
  "outputDirectory": "template-solar/.next",
  "installCommand": "cd template-solar && npm install"
}
```

This discrepancy is likely the cause of the issue.

## Solution: Update Vercel Dashboard Settings

The most direct solution is to update your Vercel project settings to match our intended configuration:

1. Log in to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the AI Medellin project
3. Go to "Settings" > "General"
4. Under "Build & Development Settings":
   - **Framework Preset**: Ensure "Next.js" is selected
   - **Root Directory**: Enter `template-solar` (critical change)
   - **Build Command**: Change to `npm run build` (remove the cd part)
   - **Output Directory**: Set to `.next` (not template-solar/.next)
   - **Install Command**: Change to `npm install` (remove the cd part)
5. Click "Save" to apply these changes
6. Go to "Deployments" and click "Redeploy" on the latest deployment

By setting the **Root Directory** to `template-solar`, you're telling Vercel to treat that directory as the base of your project. This means all commands will execute relative to that directory, eliminating the need for the `cd template-solar` prefix in your commands.

## Alternative Solution: Using Rewrites

If changing the dashboard settings doesn't work, we can try an alternative approach using rewrites in `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/template-solar/$1" }
  ]
}
```

This configuration redirects all requests from the root to the template-solar directory. To implement this:

1. Update your `vercel.json` with the code above
2. Push the changes to GitHub
3. In the Vercel dashboard, ensure your "Root Directory" is empty (not specified)
4. Redeploy your project

## Verifying the Changes

After implementing either solution:

1. Visit your main URL: https://ai-medellin-1000.vercel.app/
2. The site should now display the Solar template
3. If it doesn't, check the build logs in the Vercel dashboard for any errors

## Using Vercel MCP to Debug

You can use the Vercel MCP server to help diagnose and fix any deployment issues:

1. Run the Vercel MCP server:
   ```
   C:\Users\sanji\0-roo-code\run-vercel-mcp.bat
   ```

2. Ask the AI to:
   - "Show me the current build configuration for my Vercel project"
   - "Show me the latest deployment build logs"
   - "Update my project's root directory to template-solar"
   - "Trigger a new deployment after changing settings"

## Summary of Required Changes

To make the Solar template appear as the main site:

1. ✅ Merge the Solar template branch to main (completed)
2. ✅ Add proper configuration files (completed)
3. ➡️ Set the Root Directory to `template-solar` in Vercel Dashboard (needed)
4. ➡️ Update build commands to remove the `cd template-solar` prefix (needed)
5. ➡️ Redeploy the project after making these changes (needed)

By aligning your Vercel dashboard settings with the structure of your repository, the Solar template should correctly deploy as your main site.