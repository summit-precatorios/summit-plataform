export class HttpClientError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = 'HttpClientError';
  }
}

interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

export function createHttpClient(config: HttpClientConfig) {
  const { baseURL, timeout = 60_000, headers: defaultHeaders = {} } = config;

  async function request<T>(
    resource: string,
    options: RequestConfig = {}
  ): Promise<T> {
    const { params, headers: requestHeaders, ...fetchOptions } = options;

    if (!resource) {
      throw new Error('API resource is required');
    }

    const resolvedBase = baseURL.startsWith('/')
      ? `${typeof window !== 'undefined' ? window.location.origin : ''}${baseURL}`
      : baseURL;
    const url = new URL(resource, resolvedBase);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value)
      );
    }

    const headers = new Headers({
      ...defaultHeaders,
      ...(requestHeaders || {}),
    });

    const isFormData = fetchOptions.body instanceof FormData;
    if (!headers.has('Content-Type') && !isFormData) {
      headers.set('Content-Type', 'application/json');
    }

    try {
      const response = await fetch(url.toString(), {
        ...fetchOptions,
        headers,
        signal: AbortSignal.timeout(timeout),
      });

      if (!response.ok) {
        const body = await response.json().catch(async () => {
          const text = await response.text().catch(() => '');
          return text ? { message: text } : null;
        });
        throw new HttpClientError(
          response.status,
          response.statusText,
          body
        );
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof HttpClientError) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Unknown request error';
      throw new Error(message);
    }
  }

  return {
    get: <T>(resource: string, config?: RequestConfig) =>
      request<T>(resource, { ...config, method: 'GET' }),
    post: <T>(resource: string, data?: unknown, config?: RequestConfig) =>
      request<T>(resource, {
        ...config,
        method: 'POST',
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    patch: <T>(resource: string, data?: unknown, config?: RequestConfig) =>
      request<T>(resource, {
        ...config,
        method: 'PATCH',
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    put: <T>(resource: string, data?: unknown, config?: RequestConfig) =>
      request<T>(resource, {
        ...config,
        method: 'PUT',
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    delete: <T>(resource: string, config?: RequestConfig) =>
      request<T>(resource, { ...config, method: 'DELETE' }),
  };
}
