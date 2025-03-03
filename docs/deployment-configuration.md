# AI Medellin Deployment Configuration

This document explains how the AI Medellin project is configured for deployment on Vercel, focusing on the proper setup of the Solar template as the main site.

## Project Structure

The AI Medellin project has the following key components:

- **Solar Template**: Located in `/template-solar/`, this is the public-facing website for users
- **Main Project Files**: Located in the root and `/src/` directory, these include configuration and shared files

## Vercel Configuration

The `vercel.json` file in the root directory is crucial for configuring how the project deploys on Vercel:

```json
{
  "framework": "nextjs",
  "buildCommand": "cd template-solar && npm install && npm run build",
  "outputDirectory": "template-solar/.next",
  "installCommand": "cd template-solar && npm install"
}
```

This configuration ensures that:

1. Vercel recognizes the project as a Next.js application
2. The build process focuses on the Solar template directory
3. The output from the Solar template build becomes the main deployed website

## Why This Configuration

This setup ensures that:

- The Solar template appears at the main URL: https://ai-medellin-1000.vercel.app/
- Users see the professionally designed user interface
- The proper directory is built and deployed

## Deployment Workflow

When you push changes to your GitHub repository:

1. Vercel detects the push and starts a new deployment
2. It reads the `vercel.json` configuration
3. It follows the specified build commands, focusing on the `/template-solar/` directory
4. It deploys the built Solar template site to your main URL

## Updating the Deployment

If you need to make changes to the deployment configuration:

1. Edit the `vercel.json` file
2. Commit and push the changes to GitHub
3. Vercel will use the updated configuration for the next deployment

## Multiple Deployments and Custom Domains

If you want to set up multiple deployments (e.g., for a separate admin dashboard):

1. Create a new Vercel project pointing to the same repository
2. Configure it to build from a different directory
3. Assign a different domain or subdomain to this deployment

## Verifying Your Configuration

To verify that your deployment is correctly configured:

1. Visit your main site URL: https://ai-medellin-1000.vercel.app/
2. Confirm that you see the Solar template design
3. Check the Vercel dashboard to see which directory was built

If you encounter issues with the deployment configuration, the Vercel MCP server can help diagnose and resolve them.