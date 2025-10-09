type TBody = BodyInit | null;
type THeader = HeadersInit;

type TRequestOptions = {
  method: string;
  headers?: THeader;
  body?: TBody;
};

class ApiClient {
  private async request<T>(endpoint: string, options: TRequestOptions): Promise<T> {
    const { method = "GET", headers = {}, body = null } = options;
    const config: RequestInit = {
      method,
      headers: { "Content-Type": "application/json", ...headers },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`/api${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "API request failed");
    }

    return response.json();
  }

  async get<T>(endpoint: string, headers?: THeader) {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  async post<T>(endpoint: string, body?: TBody, headers?: THeader) {
    return this.request<T>(endpoint, { method: "POST", body, headers });
  }

  async put<T>(endpoint: string, body?: TBody, headers?: THeader) {
    return this.request<T>(endpoint, { method: "PUT", body, headers });
  }

  async delete<T>(endpoint: string, headers?: THeader) {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }
}

export const apiClient = new ApiClient();
