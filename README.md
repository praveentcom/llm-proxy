# LLM Proxy Server

A simple OpenAI-compatible proxy server that forwards requests to any LLM endpoint with logging and cost tracking. The logs are stored in a PostgreSQL database. It's not possible to ignore the logging at the moment.

## Configuration

| Environment Variable | Description | Default Value |
|----------------------|-------------|-----------------|
| `PORT` | Server port | `3007` |
| `UPSTREAM_URL` | Your LLM endpoint URL | `""` |
| `DATABASE_URL` | PostgreSQL connection string for logging | `""` |
| `DATABASE_TABLE` | Name of the table to store the logs | `"llm_proxy"` |

### Cost Calculation

The cost is calculated based on the model and the usage.

You'll need to add the cost configuration for your models in the `cost.ts` file. The default cost configuration in the project (with sample values from `z.ai` models) is:

```typescript
export const MODEL_COSTS: Record<string, CostConfig> = {
  "glm-4.5-air": { input: 0.2, cached: 0.03, output: 1.1 }, // cost per million prompt tokens (USD)
  "glm-4.6": { input: 0.6, cached: 0.11, output: 2.2 }, // cost per million cached tokens (USD)
  "default": { input: 0, cached: 0, output: 0 }, // default cost configuration
};
```

You can add more models to the `MODEL_COSTS` object.

## PostgreSQL Table Schema

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

## Usage

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

## Features

- ✅ OpenAI-compatible API
- ✅ Streaming support
- ✅ PostgreSQL logging
- ✅ Cost tracking
- ✅ CORS enabled
- ✅ Simple configuration - just set your endpoint URL
