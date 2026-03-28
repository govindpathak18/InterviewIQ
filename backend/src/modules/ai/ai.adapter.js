const ApiError = require("../../utils/ApiError");
const env = require("../../config/env");

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const generateFromGemini = async ({ prompt, responseMimeType = "application/json" }) => {
  if (!env?.gemini?.apiKey) {
    throw new ApiError(500, "Missing GEMINI_API_KEY");
  }

  const model = env.gemini.model || "gemini-3-flash-preview";
  const timeoutMs = env.gemini.timeoutMs || 30000;

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
  } catch (error) {
    throw new ApiError(502, "Failed to reach Gemini API", [error.message]);
  } finally {
    clearTimeout(timeoutRef);
  }

  if (!response.ok) {
    const rawError = await response.text();
    throw new ApiError(502, "Gemini API request failed", [rawError]);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new ApiError(502, "Gemini returned empty content");
  }

  return {
    model,
    rawText: text,
    usageMetadata: data?.usageMetadata || null,
  };
};

module.exports = {
  generateFromGemini,
};
