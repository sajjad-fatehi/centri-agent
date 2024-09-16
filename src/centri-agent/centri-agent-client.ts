import { CentriAgentResult, HttpClient, HttpClientName, HttpClients } from './types';
import EventEmitter from 'events';

export class CentrifugoAgentClient<T extends HttpClientName> implements HttpClient<T> {
  private _client: HttpClients[T];
  private _eventEmitter = new EventEmitter();
  constructor(
    readonly name: T,
    protected readonly url: string,
    protected readonly key: string,
  ) {
    this.url = this._serializeUrl(this.url);
    this._client = this._setupClient();
  }

  private _serializeUrl(url: string) {
    while (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }
    return url;
  }

  private _setupClient() {
    switch (this.name) {
      case 'fetch':
        return (async (url: string, options: RequestInit = {}) => {
          const headers = {
            ...options.headers,
            'X-API-Key': this.key,
          };

          const response = await fetch(url, {
            ...options,
            headers,
          });

          if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
          }

          try {
            return await response.json(); // Assuming JSON response type
          } catch (error) {
            return error;
          }
        }) as HttpClients[T];

      default:
        throw new Error('Unsupported client');
    }
  }

  public Client(): HttpClients[T] {
    return this._client;
  }

  private async makeRequest<R>(path: string, data: Record<string, any>): Promise<R> {
    switch (this.name) {
      case 'fetch':
        return (this._client as typeof fetch)(`${this.url}${path}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }) as R;

      default:
        throw new Error('Unsupported client');
    }
  }

  public async Request<TResponse extends Record<string, any>>(
    path: string,
    request: Record<string, any>,
  ): Promise<TResponse> {
    const start = Date.now();
    try {
      const apiResponse = await this.makeRequest<CentriAgentResult<TResponse>>(path, request);
      if (apiResponse.error) {
        const { code, message } = apiResponse.error;
        throw new Error('failed request api centrifugo', { cause: `${code} - ${message}` });
      }
      this._eventEmitter.emit('fulfilled', { path, duration: Date.now() - start });
      return apiResponse.result || {};
    } catch (error) {
      this._eventEmitter.emit('failed', { path, duration: Date.now() - start });
      throw error;
    }
  }

  public onFulfilledRequest(listener: (options: { path: string; duration: number }) => void): this {
    this._eventEmitter.on('fulfilled', listener);
    return this;
  }

  public onFailedRequest(listener: (options: { path: string; duration: number }) => void): this {
    this._eventEmitter.on('failed', listener);
    return this;
  }
}
