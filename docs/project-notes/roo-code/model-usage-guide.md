# Roo Code Model Usage Guide

## Model Selection

### 1. Claude 3.7 (Sonnet)
**Use for all code-related tasks:**
```json
{
  "model": "claude-3.7-sonnet",
  "temperature": 0.3,
  "max_tokens": 2048,
  "powerSteering": false,
  "systemPrompt": "You are an expert software developer. Keep responses under 500 words, concise, and avoid unnecessary explanations."
}
```
- Code analysis and review
- Refactoring
- Implementation
- Testing
- Documentation
- Security analysis
- Performance optimization

### 2. OpenAI o3 mini
**Use for planning and architecture:**
```json
{
  "model": "o3-mini",
  "temperature": 0.4,
  "max_tokens": 4096,
  "systemPrompt": "You are an experienced technical architect focused on planning and analysis."
}
```
- Project planning
- Requirements analysis
- Technical specifications
- Design decisions
- Risk assessment
- Trade-off analysis

### 3. o3-mini
**Use for quick information:**
```json
{
  "model": "o3-mini",
  "temperature": 0.2,
  "max_tokens": 1024,
  "systemPrompt": "You are a helpful assistant focused on providing quick, accurate information."
}
```
- Quick lookups
- Simple clarifications
- Status checks
- Brief summaries
- Task tracking

### 4. Gemini Pro
**Use for learning content:**
```json
{
  "model": "gemini-pro",
  "temperature": 0.3,
  "max_tokens": 2048,
  "systemPrompt": "You are an expert instructor focused on explaining technical concepts."
}
```
- Concept explanations
- Best practices research
- Technology comparisons
- Learning resources
- Documentation review

## Best Practices

### Token Optimization
```typescript
const tokenOptimizer = {
  removeComments: (code: string) => code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''),
  removeWhitespace: (code: string) => code.replace(/\s+/g, ' '),
  extractRelevant: (code: string, context: string) => {
    const relevantPattern = new RegExp(`function.*${context}.*?}`, 's');
    return code.match(relevantPattern)?.[0] || code;
  }
};

// Optimize Claude query by trimming long prompts
async function optimizeClaudeQuery(prompt: string): Promise<string> {
  const trimmedPrompt = prompt.length > 5000 ? prompt.slice(0, 5000) : prompt; // Limit prompt size

  return await ai.generate({
    model: "claude-3.7-sonnet",
    temperature: 0.3,
    max_tokens: 2048,
    powerSteering: false,
    prompt: trimmedPrompt
  });
}
```

### Error Handling
```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(operation, retries - 1, delay * 2);
  }
}
```

### Model Selection Logic
```typescript
function selectModelForTask(task: {
  type: string,
  complexity: number,
  purpose: string
}): ModelConfig {
  // Code-related tasks always use Claude 3.7
  if (isCodeTask(task.type)) {
    return {
      model: "claude-3.7-sonnet",
      temperature: 0.3,
      max_tokens: 2048,
      powerSteering: false
    };
  }

  // Planning and architecture tasks
  if (task.purpose === "planning" || task.complexity > 0.7) {
    return {
      model: "o3-mini",
      temperature: 0.4,
      max_tokens: 4096
    };
  }

  // Quick information tasks
  if (task.complexity < 0.3) {
    return {
      model: "o3-mini",
      temperature: 0.2,
      max_tokens: 1024
    };
  }

  // Learning and explanation tasks
  if (task.purpose === "learning") {
    return {
      model: "gemini-pro",
      temperature: 0.3,
      max_tokens: 2048
    };
  }
}
```

### Cost Optimization
- Cache common responses
- Batch similar requests
- Use appropriate model for task complexity
- Monitor token usage
- Implement rate limiting
- Trim prompts to essential information
- Request concise responses

### Common Issues & Solutions

#### Token Limit Exceeded
```typescript
function chunkContent(content: string): string[] {
  return content
    .split('\n')
    .reduce((chunks: string[], line) => {
      const currentChunk = chunks[chunks.length - 1] || '';
      if ((currentChunk + line).length > 2000) {
        chunks.push(line);
      } else {
        chunks[chunks.length - 1] = currentChunk + '\n' + line;
      }
      return chunks;
    }, ['']);
}
```

#### Rate Limiting
```typescript
class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    this.processing = false;
  }
}
```

## Implementation Examples

### Code Analysis with Claude 3.7
```typescript
const codeAnalysis = await ai.analyze({
  model: "claude-3.7-sonnet",
  temperature: 0.3,
  max_tokens: 2048,
  prompt: `Analyze this code briefly:
${code}
Focus on:
- Performance
- Security
- Best practices`
});
```

### Project Planning with OpenAI o3 mini
```typescript
const planningResult = await ai.plan({
  model: "o3-mini",
  temperature: 0.4,
  prompt: `Create a technical plan for:
${requirements}
Consider:
- Architecture
- Scalability
- Security`
});
```

### Quick Info with o3-mini
```typescript
const quickInfo = await ai.lookup({
  model: "o3-mini",
  temperature: 0.2,
  prompt: "What is the syntax for Promise.all in TypeScript?"
});
```

### Learning Content with Gemini Pro
```typescript
const explanation = await ai.explain({
  model: "gemini-pro",
  temperature: 0.3,
  prompt: "Explain how React hooks work, with examples"
});