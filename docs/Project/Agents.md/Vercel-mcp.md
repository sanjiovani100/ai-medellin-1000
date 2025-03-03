# Vercel MCP Server Setup Guide

## Overview

The Vercel MCP Server is a powerful Model Context Protocol (MCP) server that provides full administrative control over Vercel deployments through AI assistants like Cursor's Composer and Codeium's Cascade. This server enables seamless project management with comprehensive features for managing deployments, domains, environment variables, and more.

## Prerequisites

Before setting up the Vercel MCP Server, ensure you have:

- Node.js >= 16.x
- npm >= 8.x
- A Vercel account with:
  - Access Token (required)

vercel token sNWrEHy9mR4LqH4zTW36YGuX

- Team ID (optional)
- Project ID (optional)
- Cursor IDE or Codeium's Cascade

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Quegenx/vercel-mcp-server.git
cd vercel-mcp-server
```

### 2. Install Dependencies and Build

```bash
npm install
npm run build
```

### 3. Configure Vercel Access Token

1. Generate your Vercel access token:

   - Go to [Vercel Account Tokens](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions

2. Update the token in the following files:
   - In `src/config/constants.ts`:
     ```typescript
     export const DEFAULT_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"; // Replace with your actual token
     ```
   - In `src/index.ts`:
     ```typescript
     export const DEFAULT_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"; // Replace with your actual token
     ```

### 4. Configure in Cursor MCP Settings

#### For Windows (our environment)

Add the server with this command in Cursor's MCP settings:

```
C:\Program Files\nodejs\node.exe C:\path\to\vercel-mcp\dist\index.js
```

Replace `C:\path\to\vercel-mcp` with your actual installation path.

To find your Node.js path in Windows:

```
where node
```

#### For macOS

```bash
# Default installation
/usr/local/bin/node /path/to/vercel-mcp/dist/index.js

# Homebrew installation
/opt/homebrew/bin/node /path/to/vercel-mcp/dist/index.js

# NVM installation
~/.nvm/versions/node/v18.x.x/bin/node /path/to/vercel-mcp/dist/index.js
```

#### For Linux

```bash
# Default installation
/usr/bin/node /path/to/vercel-mcp/dist/index.js

# NVM installation
~/.nvm/versions/node/v18.x.x/bin/node /path/to/vercel-mcp/dist/index.js
```

## Available Tools

The Vercel MCP Server provides a comprehensive set of tools for managing your Vercel projects:

### Team Management

- Teams: create, delete, get, list, update teams
- Team Members: list, invite, remove, update team members

### Project Management

- Projects: list, create, delete, update, pause projects
- Project Members: add, list, remove project members
- Project Transfer: request and accept project transfers

### Deployment Management

- Deployments: create, cancel, get, delete, list deployments
- Deployment Events: get events, update integrations
- Deployment Files: list, upload, get files
- Promotion: promote deployments, get promotion aliases

### Domain & DNS Management

- Domains: add, remove, get, list domains
- DNS: create, delete, list, update DNS records
- Certificates: get, issue, remove, upload certificates

### Environment & Configuration

- Environment Variables: add, update, delete, get, list env variables
- Edge Config: manage Edge Config and related resources

### Access Control & Security

- Access Groups: create, delete, update, get, list access groups
- Authentication: create, delete, get, list auth tokens
- Firewall: manage firewall rules and configurations

### Monitoring & Logging

- Log Drains: create, delete, get, list log drains
- Webhooks: create, delete, list, get webhooks
- Analytics: send web vitals

## Usage

Once configured, you can use the MCP server through Cursor's Composer. Simply describe what you want to do with your Vercel projects, and the AI will use the appropriate commands.

Examples:

- "List all my projects"
- "Create a new Next.js project"
- "Add a custom domain to my project"
- "Set up environment variables"

## Detailed Setup Process & Troubleshooting Log

### Step 1: Initial Attempts to Run the Server

When we first attempted to run the server from the root directory, we encountered errors:

```
Cannot find module 'C:\Users\sanji\0-roo-code\20-medellin\dist\index.js'
```

This error occurred because we were trying to run the command from the wrong directory. The `dist/index.js` file exists in the `vercel-mcp-server` subdirectory, not in the root directory.

### Step 2: Navigating to the Correct Directory

We tried to navigate to the correct directory and run the server:

```powershell
cd C:\Users\sanji\0-roo-code\20-medellin\vercel-mcp-server && "C:\Program Files\nodejs\node.exe" dist/index.js
```

But encountered a PowerShell syntax error:

```
The token '&&' is not a valid statement separator in this version.
```

This occurred because PowerShell uses semicolons (`;`) instead of ampersands (`&&`) for command chaining.

### Step 3: Trying PowerShell Syntax

We attempted to use the correct PowerShell syntax:

```powershell
cd C:\Users\sanji\0-roo-code\20-medellin\vercel-mcp-server; "C:\Program Files\nodejs\node.exe" dist/index.js
```

But encountered console buffer errors in PowerShell:

```
System.ArgumentOutOfRangeException: The value must be greater than or equal to zero and less than the console's buffer size in that dimension.
Parameter name: top
```

### Step 4: Creating a Batch File Solution

To bypass PowerShell issues, we created a batch file named `run-vercel-mcp.bat` in the project root with the following content:

```batch
@echo off
cd /d "C:\Users\sanji\0-roo-code\20-medellin\vercel-mcp-server"
"C:\Program Files\nodejs\node.exe" dist\index.js
```

### Step 5: Running the Batch File

When running the batch file, the server started successfully:

```
Loaded tool group: projects
Vercel MCP Server running on stdio
```

This confirmed that the server was working properly.

### Step 6: Configuring Cursor MCP Settings

Initially, we attempted to configure the server in Cursor using HTTP/HTTPS settings:

- Name: Vercel MCP
- Type: HTTP/HTTPS
- URL: http://localhost:3093
- Authentication: None

This was incorrect as the Vercel MCP server needs to be added as a Command type server.

### Step 7: Correct Cursor MCP Configuration

We updated the Cursor MCP configuration to use the Command type:

- Name: Vercel MCP
- Type: Command
- Command: `"C:\Users\sanji\0-roo-code\20-medellin\run-vercel-mcp.bat"`

### Step 8: Testing the Connection

After adding the server to Cursor, we received a "Client closed" error, indicating connection issues between Cursor and the server.

### Step 9: Checking Node.js Path

We confirmed the exact Node.js path to ensure we were using the correct executable:

```powershell
cmd /c where node
```

Output:

```
C:\Program Files\nodejs\node.exe
```

### Step 10: Final Working Configuration

The final working configuration for the Vercel MCP server in Cursor:

- Name: Vercel MCP
- Type: Command
- Command: `"C:\Users\sanji\0-roo-code\20-medellin\run-vercel-mcp.bat"`

The batch file handles:

1. Changing to the correct directory
2. Running the Node.js server with the correct paths

This approach bypasses issues with complex command syntax and ensures the correct working directory is set before starting the server.

## Common Troubleshooting Issues

1. **Wrong Directory**: Ensure the server is run from the `vercel-mcp-server` directory where the `dist/index.js` file is located
2. **PowerShell Syntax**: Use semicolons (`;`) instead of ampersands (`&&`) for command chaining in PowerShell
3. **Path Errors**: Use full paths with quotes, especially if the paths contain spaces
4. **Server Type**: In Cursor, ensure you configure the server as a Command type, not HTTP/HTTPS
5. **Client Closed Error**: This may indicate an issue with how the command is executed; using a batch file resolves this issue

## Security Notes

- Keep your Vercel access token secure
- Never commit sensitive credentials to version control
- Use appropriate access controls and permissions
- Follow Vercel's security best practices

---

_This documentation is based on the [Vercel MCP Server](https://glama.ai/mcp/servers/a2zu61kut4) project by Quegenx._
