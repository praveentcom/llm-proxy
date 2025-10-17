// cost.ts
// Helper for calculating token-based LLM costs

export type Usage = {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  prompt_tokens_details?: {
    cached_tokens?: number;
  }
};

export type CostConfig = {
  input: number;  // cost per million prompt tokens (USD)
  cached: number; // cost per million cached tokens (USD)
  output: number; // cost per million completion tokens (USD)
};

// Cost table per model (USD per million tokens)
export const MODEL_COSTS: Record<string, CostConfig> = {
  "glm-4.5-air": { input: 0.2, cached: 0.03, output: 1.1 },
  "glm-4.6": { input: 0.6, cached: 0.11, output: 2.2 },
  "default": { input: 0, cached: 0, output: 0 },
};

// Compute total cost (in USD)
export function calculateCost(model: string, usage?: Usage): number | null {
  if (!usage) return null;

  const { prompt_tokens = 0, completion_tokens = 0, prompt_tokens_details = { cached_tokens: 0 } } = usage;
  const cost = MODEL_COSTS[model.toLowerCase()] || MODEL_COSTS["default"];

  let inputCost = 0;
  let cachedCost = 0;
  let outputCost = 0;

  if (prompt_tokens_details?.cached_tokens) {
    cachedCost = ((prompt_tokens_details.cached_tokens) / 1_000_000) * cost.cached;
    inputCost = ((prompt_tokens - prompt_tokens_details.cached_tokens) / 1_000_000) * cost.input;
  } else {
    inputCost = ((prompt_tokens) / 1_000_000) * cost.input;
  }

  outputCost = (completion_tokens / 1_000_000) * cost.output;

  const total = inputCost + cachedCost + outputCost;
  return total > 0 ? Number(total.toFixed(6)) : null;
}
