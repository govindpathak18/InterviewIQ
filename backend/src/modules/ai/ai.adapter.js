const ApiError = require("../../utils/ApiError");
const env = require("../../config/env");

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * Generate content from Gemini API with retry logic
 * @param {Object} params - Parameters
 * @param {string} params.prompt - Prompt text
 * @param {string} [params.responseMimeType] - Response MIME type
 * @returns {Promise<Object>} - Response with model, rawText, and usage metadata
 * @throws {ApiError} - If generation fails after retries
 */
const generateFromGemini = async ({ prompt, responseMimeType = "application/json" }) => {
  if (!env?.gemini?.apiKey) {
    throw new ApiError(500, "Missing GEMINI_API_KEY in environment");
  }

  const model = env.gemini.model || "gemini-2.0-flash"; // More stable model
  const timeoutMs = env.gemini.timeoutMs || 30000;
  const maxRetries = env.gemini.maxRetries || 2;

  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutRef = setTimeout(() => controller.abort(), timeoutMs);

      const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${env.gemini.apiKey}`;

      const payload = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType,
          temperature: 0.3,
        },
      };

      let response;
      try {
        response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutRef);
      }

      if (!response.ok) {
        const rawError = await response.text();
        const errorMessage = `Gemini API error: ${response.status} - ${rawError}`;
        
        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw new ApiError(502, errorMessage);
        }
        
        // Retry on server errors (5xx)
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Gemini returned empty content");
      }

      return {
        model,
        rawText: text,
        usageMetadata: data?.usageMetadata || null,
      };
    } catch (error) {
      lastError = error;
      
      // Only retry on network/timeout errors, not API errors
      if (attempt < maxRetries - 1 && !error.statusCode) {
        // Exponential backoff: 1s, 2s
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
      
      break;
    }
  }

  // If we get here, all retries failed
  if (lastError instanceof ApiError) {
    throw lastError;
  }

  throw new ApiError(502, `AI generation failed after ${maxRetries} attempts: ${lastError.message}`);
};

module.exports = {
  generateFromGemini,
};
