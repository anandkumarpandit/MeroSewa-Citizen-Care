/**
 * backend/services/aiService.js
 *
 * Small centralized AI/model selection helper and placeholder call function.
 * Purpose: keep model selection logic in one place and provide a simple
 * callModel() stub that can later be wired to Anthropic/OpenAI SDKs.
 *
 * Behavior:
 * - Reads ADMIN_DEFAULT_AI_MODEL and DEFAULT_AI_MODEL from env
 * - Exposes getModel(admin = false) -> returns selected model name
 * - Exposes callModel(options) -> placeholder implementation returning a mock
 *   response when no provider is configured. When a provider is later added,
 *   this function should be updated to call the provider's SDK.
 */

const DEFAULT = process.env.DEFAULT_AI_MODEL || "claude-haiku-4.5";
const ADMIN_DEFAULT = process.env.ADMIN_DEFAULT_AI_MODEL || "";

function getModel(isAdmin = false) {
  if (isAdmin && ADMIN_DEFAULT) return ADMIN_DEFAULT;
  return process.env.DEFAULT_AI_MODEL || DEFAULT;
}

/**
 * callModel
 * @param {Object} opts
 * @param {string} [opts.model] - optional override model name
 * @param {string} opts.prompt - the prompt or input text
 * @param {Object} [opts.meta] - optional metadata
 * @param {boolean} [opts.admin] - whether this is an admin-invoked call
 * @param {string} [opts.provider] - 'mock' (default) or later 'anthropic'/'openai'
 *
 * Returns: { model, output, meta }
 * Note: currently a synchronous mock response for safe local/dev usage.
 */
async function callModel({
  model,
  prompt = "",
  meta = {},
  admin = false,
  provider = "mock",
} = {}) {
  const chosen = model || (admin ? getModel(true) : getModel(false));

  // Placeholder: return a deterministic mock response so callers can be tested.
  if (!prompt) {
    return {
      model: chosen,
      output: "",
      meta: { warning: "empty prompt" },
    };
  }

  if (provider === "mock") {
    // Simple, small mock response — replace this with real provider call later.
    const snippet = prompt.length > 200 ? prompt.slice(0, 200) + "…" : prompt;
    return {
      model: chosen,
      output: `MOCK_RESPONSE (model=${chosen}): Received prompt length=${prompt.length}. Preview: "${snippet}"`,
      meta: { mocked: true, originalMeta: meta },
    };
  }

  // If provider wiring is added later, implement provider-specific calls here.
  throw new Error(
    "No AI provider configured. Update aiService.callModel to support your provider."
  );
}

module.exports = {
  getModel,
  callModel,
};
