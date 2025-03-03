# Simple Plan to Fix Solar Template as Main Site

This document outlines the exact steps needed to make the Solar template appear as the main site at https://ai-medellin-1000.vercel.app/

## Step 1: Verify Template-Solar Directory Has Content

```bash
# Check if template-solar directory exists and has content
ls -la template-solar
ls -la template-solar/src
```

If the directory is empty or missing files, clone the Solar template files into it.

## Step 2: Update vercel.json to Use Rewrites

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/template-solar/$1" }
  ]
}
```

## Step 3: Push Changes to GitHub

```bash
git add .
git commit -m "Fix template-solar directory and update vercel.json"
git push origin main
```

## Step 4: Set Root Directory in Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" > "General"
4. In "Build & Development Settings":
   - Set "Root Directory" to `template-solar`
   - Leave other settings at default
5. Click "Save"

## Step 5: Trigger a Manual Redeploy

1. Go to "Deployments" tab
2. Find latest deployment
3. Click "..." > "Redeploy"

## Step 6: Verify the Site

1. Wait for deployment to complete
2. Open https://ai-medellin-1000.vercel.app/
3. The Solar template should now appear

That's it! These simple steps should fix the issue and make the Solar template appear as the main site.