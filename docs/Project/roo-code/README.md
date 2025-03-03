# Roo Code Model Selection

## Quick Reference

### Code Tasks → Claude 3.7
```json
{
  "model": "claude-3.7-sonnet",
  "temperature": 0.3,
  "max_tokens": 2048,
  "powerSteering": false
}
```
Use for: Code analysis, refactoring, implementation, testing, documentation

### Planning Tasks → OpenAI o3 mini
```json
{
  "model": "o3-mini",
  "temperature": 0.4,
  "max_tokens": 4096
}
```
Use for: Project planning, requirements analysis, technical specifications

### Quick Tasks → o3-mini
```json
{
  "model": "o3-mini",
  "temperature": 0.2,
  "max_tokens": 1024
}
```
Use for: Quick lookups, simple clarifications, status checks

### Learning Tasks → Gemini Pro
```json
{
  "model": "gemini-pro",
  "temperature": 0.3,
  "max_tokens": 2048
}
```
Use for: Concept explanations, best practices research, learning resources

## Detailed Documentation

See the [Model Usage Guide](./model-usage-guide.md) for:
- Complete configuration settings
- Best practices and examples
- Error handling patterns
- Implementation details
- Cost optimization strategies