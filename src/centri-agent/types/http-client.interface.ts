export type HttpClients = {
  fetch: typeof fetch;
};

export type HttpClientName = keyof HttpClients;

export interface HttpClient<T extends HttpClientName> {
  readonly name: T;
  Client(): HttpClients[T];
  Request<Response extends object>(path: string, data: Record<string, any>): Promise<Response>;
}
