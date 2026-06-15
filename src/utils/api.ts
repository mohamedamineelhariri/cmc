export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("medbot_token");
  }
  return null;
}

export function setAuthToken(token: string | null) {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("medbot_token", token);
    } else {
      localStorage.removeItem("medbot_token");
    }
  }
}

interface FetchOptions extends RequestInit {
  token?: string | null;
}

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const token = options.token !== undefined ? options.token : getAuthToken();
  
  const headers = new Headers(options.headers);
  headers.set("ngrok-skip-browser-warning", "true");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  // Set content-type if JSON body is passed
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Remove leading slash if it exists on the endpoint
  const url = `${API_BASE_URL}/${endpoint.replace(/^\//, "")}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch (_) {
      // Ignored, fallback to general message
    }
    throw new Error(errorMessage);
  }

  return response;
}
