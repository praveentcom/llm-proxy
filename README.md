# LLM Proxy Server

A lightweight, production-ready OpenAI-compatible proxy server that seamlessly forwards LLM API requests to any endpoint with comprehensive logging, cost tracking, and PostgreSQL integration. Perfect for monitoring API usage, calculating costs, and maintaining audit trails for your AI applications.

## ⚙️ Configuration

| Environment Variable | Description | Default Value |
|----------------------|-------------|-----------------|
| `PORT` | Server port | `3007` |
| `UPSTREAM_URL` | Your LLM endpoint URL | `""` |
| `DATABASE_URL` | PostgreSQL connection string for logging | `""` |
| `DATABASE_TABLE` | Name of the table to store the logs | `"llm_proxy"` |

### Cost Calculation

The cost is calculated based on the model and token usage with configurable pricing per model.

You'll need to add the cost configuration (in cost per million tokens) for your models in the `cost.ts` file. The default cost configuration in the project (with sample values from `z.ai` models) is:

```typescript
export const MODEL_COSTS: Record<string, CostConfig> = {
  "glm-4.5-air": { input: 0.2, cached: 0.03, output: 1.1 },
  "glm-4.6": { input: 0.6, cached: 0.11, output: 2.2 },
  "default": { input: 0, cached: 0, output: 0 },
};
```

You can add more models to the `MODEL_COSTS` object to support your specific LLM providers.

## 📊 PostgreSQL Table Schema

```sql
CREATE TABLE IF NOT EXISTS <DATABASE_TABLE> (
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  request_method VARCHAR(10) NOT NULL,
  request_path VARCHAR(255) NOT NULL,
  model VARCHAR(20) NOT NULL,
  completion_tokens INTEGER,
  prompt_tokens INTEGER,
  total_tokens INTEGER,
  cached_tokens INTEGER,
  total_cost NUMERIC,
  response_time INTEGER,
  request_body JSONB,
  response_body JSONB,
  response_status INTEGER,
  provider_url VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_<DATABASE_TABLE>_timestamp ON <DATABASE_TABLE> (timestamp);
```

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Configuration

Set your environment variables:

```bash
export PORT=3007
export UPSTREAM_URL="https://api.example.com/v1"
export DATABASE_URL="postgresql://user:password@localhost:5432/llm_logs"
export DATABASE_TABLE="llm_proxy"
```

### Running

```bash
# Development mode with auto-reload
npm run dev

# Production build
npm run build
npm start
```

## 💻 Usage

The proxy works with any OpenAI-compatible endpoint. Just point your client to the proxy:

```bash
curl -X POST http://localhost:3007/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "model": "your-model",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### Example Response with Cost Tracking

All responses are logged to PostgreSQL with detailed usage and cost information:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "glm-4.5-air",
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 30,
    "total_tokens": 50,
    "prompt_tokens_details": {
      "cached_tokens": 5
    }
  },
  "choices": [...]
}
```

The corresponding database entry will include:
- Token usage breakdown
- Calculated cost based on your model pricing
- Response time metrics
- Complete request/response bodies for audit purposes

## 🔧 Advanced Features

### Custom Cost Models

Extend the `cost.ts` file to support your specific pricing models:

```typescript
export const MODEL_COSTS: Record<string, CostConfig> = {
  "gpt-4": { input: 0.03, cached: 0.015, output: 0.06 },
  "claude-3": { input: 0.025, cached: 0.0125, output: 0.125 },
  "custom-model": { input: 0.01, cached: 0.005, output: 0.02 },
};
```

### Database Integration

The proxy automatically logs all requests to your PostgreSQL database with comprehensive metadata for analysis and reporting.

## 🛡️ Security

- Bearer token authentication required
- CORS headers configured for cross-origin requests
- No sensitive data stored in logs (authentication headers are not logged)
- Input validation and error handling

## 📈 Monitoring

Monitor your API usage through the PostgreSQL logs:
- Track costs across different models
- Analyze response times and performance
- Identify usage patterns and optimize costs
- Maintain compliance with audit requirements

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.
