const DEFAULT_API_BASE_URL = "http://localhost:5000/api/v1";

export async function apiRequest(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

  const response = await fetch(`${baseUrl}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.message || "Request failed";
    throw new Error(message);
  }

  return payload;
}
