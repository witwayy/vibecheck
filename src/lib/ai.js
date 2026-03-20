const PROVIDERS = {
  openrouter: {
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    getKey: () => import.meta.env.VITE_OPENROUTER_API_KEY,
    models: {
      'deepseek-v3': 'deepseek/deepseek-chat-v3-0324',
      'llama-4': 'meta-llama/llama-4-maverick',
      'qwen-3': 'qwen/qwen3-235b-a22b',
      'llama-70b': 'meta-llama/llama-3.3-70b-instruct',
    },
  },
  google: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    getKey: () => import.meta.env.VITE_GOOGLE_AI_API_KEY,
    models: {
      'gemini-flash': 'gemini-2.0-flash',
    },
  },
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
    getKey: () => import.meta.env.VITE_GROQ_API_KEY,
    models: {},
  },
}

function getProviderForModel(modelId) {
  for (const [providerName, provider] of Object.entries(PROVIDERS)) {
    if (modelId in provider.models) {
      return { providerName, provider, modelName: provider.models[modelId] }
    }
  }
  // Default to OpenRouter
  return {
    providerName: 'openrouter',
    provider: PROVIDERS.openrouter,
    modelName: PROVIDERS.openrouter.models['deepseek-v3'],
  }
}

export async function chatCompletion(modelId, messages, options = {}) {
  const { providerName, provider, modelName } = getProviderForModel(modelId)

  if (providerName === 'google') {
    return googleChat(provider, modelName, messages, options)
  }

  // OpenAI-compatible (OpenRouter, Groq)
  const res = await fetch(provider.baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.getKey()}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 4096,
    }),
  })

  if (!res.ok) throw new Error(`AI API error: ${res.status}`)
  const data = await res.json()
  return data.choices[0].message.content
}

async function googleChat(provider, modelName, messages, options) {
  const apiKey = provider.getKey()
  const url = `${provider.baseUrl}/${modelName}:generateContent?key=${apiKey}`

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 4096,
      },
    }),
  })

  if (!res.ok) throw new Error(`Google AI error: ${res.status}`)
  const data = await res.json()
  return data.candidates[0].content.parts[0].text
}

export const AI_MODELS = [
  { id: 'deepseek-v3', label: 'DeepSeek V3' },
  { id: 'llama-4', label: 'Llama 4' },
  { id: 'qwen-3', label: 'Qwen 3' },
  { id: 'gemini-flash', label: 'Gemini Flash' },
  { id: 'llama-70b', label: 'Llama 70B' },
]
