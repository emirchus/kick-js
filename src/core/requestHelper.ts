export interface RequestConfig {
  bearerToken: string;
  xsrfToken: string;
  cookies: string;
  channelSlug: string;
}

export const createHeaders = ({
  bearerToken,
  cookies,
  channelSlug,
  xsrfToken: _xsrfToken, // XSRF token is included in cookies, not needed as separate header
}: RequestConfig): Record<string, string> => {
  return {
    accept: "application/json",
    "accept-language": "en-US,en;q=0.9",
    authorization: `Bearer ${bearerToken}`,
    "cache-control": "max-age=0",
    cluster: "v2",
    "content-type": "application/json",
    priority: "u=1, i",
    cookie: cookies,
    Referer: `https://kick.com/${channelSlug}`,
    "x-CSRF-token": _xsrfToken,
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "User-Agent": "Bot/1.0",
  };
};

export const makeRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  headers: Record<string, string>,
  data?: unknown,
): Promise<T | null> => {
  try {
    if (process.env.LOG === "debug") {
      console.log(`Request: ${method} ${url}`);
      console.log(`Headers: ${JSON.stringify(headers)}`);
      console.log(`Data: ${JSON.stringify(data)}`);
    }

    const fetchOptions: RequestInit = {
      method: method.toUpperCase(),
      headers,
      mode: "cors",
      credentials: "include",
    };

    if (data && (method === "post" || method === "put")) {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, fetchOptions);

    if (response.status === 200 || response.status === 204) {
      // For DELETE requests, response might be empty
      if (method === "delete" && response.status === 204) {
        return { success: true } as T;
      }
      return await response.json();
    }

    const errorData = await response.json().catch(() => ({}));
    console.error(`Request failed with status: ${response.status}`, errorData);
    return null;
  } catch (error) {
    console.error(`Request error for ${url}:`, error);
    return null;
  }
};
