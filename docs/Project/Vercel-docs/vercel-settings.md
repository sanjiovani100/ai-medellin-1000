# Vercel Dashboard Settings

## Project Name

medellinai_event_platform

## Framework Settings

- Root Directory: (leave empty)
- Build Command: npm run build
- Output Directory: .next
- Install Command: npm install
- Framework Preset: Next.js
- Node.js Version: 22.x
- Skip deployments when no changes: Enabled
- Prioritize Production Builds: Enabled

## Environment Variables

Add each of these with ALL environments (Production, Preview, Development):

| KEY                              | VALUE |
| -------------------------------- | ----- |
| NEXT_DISABLE_ESLINT              | 1     |
| DISABLE_ESLINT_PLUGIN            | true  |
| NEXT_DISABLE_ESLINT_DURING_BUILD | 1     |

Enable: "Automatically expose System Environment Variables"
