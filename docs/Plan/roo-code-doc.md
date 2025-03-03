# Roo Code Optimization Settings

## Core Settings
- **Model**: Claude 3.7 
- **Temperature**: 0.3
- **Max Tokens**: 4096

## Custom Modes
Created `.roomodes` file with:
- **event-ui-designer**: For UI/UX development with Tailwind/shadcn
- **database-architect**: For Supabase schema design
- **architect**: For technical planning (markdown files only)

## Vercel Deployment
Updated `vercel.json` with:
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Vercel Dashboard Settings
- Framework: Next.js
- Root Directory: `template-solar`
- Node.js Version: 22.x

## Vercel MCP Integration
Start with: `C:\Users\sanji\0-roo-code\run-vercel-mcp.bat`