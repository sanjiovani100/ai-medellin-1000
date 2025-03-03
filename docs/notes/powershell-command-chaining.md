# PowerShell Command Chaining Reference

## Command Separators in PowerShell

In PowerShell, commands are separated differently than in Bash or other Unix shells:

| Separator | Description | Example |
|-----------|-------------|---------|
| `;` | Sequential execution (run commands one after another) | `cd template-solar; npm run dev` |
| `&&` | NOT VALID in PowerShell | ❌ `cd template-solar && npm run dev` |
| `\|\|` | NOT VALID for conditional execution in PowerShell | ❌ |

## Correct Ways to Chain Commands in PowerShell

### Sequential Execution
```powershell
cd template-solar; npm run dev
```

### Conditional Execution (if first command succeeds)
```powershell
# Using if statement
if ($?) { command2 }

# Or more explicitly
if ($LASTEXITCODE -eq 0) { command2 }
```

### Running in a Subshell
```powershell
# Change directory only for a specific command
Push-Location template-solar; npm run dev; Pop-Location
```

## Common Examples

### Navigate to directory and run command
```powershell
cd template-solar; npm run dev
```

### Install dependencies and start development server
```powershell
npm install; npm run dev
```

### Build and then serve if build succeeds
```powershell
npm run build; if ($?) { npm run start }
```

## Remember
- PowerShell uses semicolons (`;`) for command separation
- PowerShell does NOT support `&&` or `||` for conditional execution
- Always use the correct PowerShell syntax for reliable command execution