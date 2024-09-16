import { CentrifugoAgentClient } from './centri-agent-client';
import {
  CentriAgentRequests as CRequest,
  CentriAgentResponses as CResponse,
  CentrifugoAgentInterface,
  HttpClientName,
} from './types';

export class CentriAgent extends CentrifugoAgentClient<HttpClientName> implements CentrifugoAgentInterface {
  constructor(
    protected readonly url: string,
    protected readonly key: string,
    name: HttpClientName = 'fetch',
  ) {
    super(name, url, key);
  }

  /**
   * Publish data to a specific channel.
   * @param request - Publish request parameters.
   * @returns A promise resolving with the publish response.
   */
  async publish(request: CRequest['publish']): Promise<CResponse['publish']> {
    return this.Request('/publish', request);
  }

  /**
   * Broadcast data to multiple channels.
   * @param request - Broadcast request parameters.
   * @returns A promise resolving with the broadcast response.
   */
  async broadcast(request: CRequest['broadcast']): Promise<CResponse['broadcast']> {
    return this.Request('/broadcast', request);
  }

  /**
   * Subscribe a user to a specific channel.
   * @param request - Subscribe request parameters.
   * @returns A promise resolving with the subscribe response.
   */
  async subscribe(request: CRequest['subscribe']): Promise<CResponse['subscribe']> {
    return this.Request('/subscribe', request);
  }

  /**
   * Unsubscribe a user from a specific channel.
   * @param request - Unsubscribe request parameters.
   * @returns A promise resolving with the unsubscribe response.
   */
  async unsubscribe(request: CRequest['unsubscribe']): Promise<CResponse['unsubscribe']> {
    return this.Request('/unsubscribe', request);
  }

  /**
   * Disconnect a user from a channel by client ID.
   * @param request - Disconnect request parameters.
   * @returns A promise resolving with the disconnect response.
   */
  async disconnect(request: CRequest['disconnect']): Promise<CResponse['disconnect']> {
    return this.Request('/disconnect', request);
  }

  /**
   * Refresh the user's connection information, such as tokens or session info.
   * @param request - Refresh request parameters.
   * @returns A promise resolving with the refresh response.
   */
  async refresh(request: CRequest['refresh']): Promise<CResponse['refresh']> {
    return this.Request('/refresh', request);
  }

  /**
   * Get the presence information for a specific channel.
   * @param request - Presence request parameters.
   * @returns A promise resolving with the presence response.
   */
  async presence(request: CRequest['presence']): Promise<CResponse['presence']> {
    return this.Request('/presence', request);
  }

  /**
   * Get the presence statistics for a specific channel.
   * @param request - Presence statistics request parameters.
   * @returns A promise resolving with the presence statistics response.
   */
  async presence_stats(request: CRequest['presence_stats']): Promise<CResponse['presence_stats']> {
    return this.Request('/presence_stats', request);
  }

  /**
   * Retrieve the history of messages for a specific channel.
   * @param request - History request parameters.
   * @returns A promise resolving with the history response.
   */
  async history(request: CRequest['history']): Promise<CResponse['history']> {
    return this.Request('/history', request);
  }

  /**
   * Remove the history for a specific channel.
   * @param request - History removal request parameters.
   * @returns A promise resolving with the history removal response.
   */
  async history_remove(request: CRequest['history_remove']): Promise<CResponse['history_remove']> {
    return this.Request('/history_remove', request);
  }

  /**
   * Get the list of active channels.
   * @param request - Empty request for querying active channels.
   * @returns A promise resolving with the channels response.
   */
  async channels(request: CRequest['channels']): Promise<CResponse['channels']> {
    return this.Request('/channels', request);
  }

  /**
   * Get server information, such as version and configuration.
   * @param request - Empty request for server information.
   * @returns A promise resolving with the info response.
   */
  async info(request: CRequest['info']): Promise<CResponse['info']> {
    return this.Request('/info', request);
  }

  /**
   * Batch multiple requests into a single one.
   * @param request - Batch request parameters.
   * @returns A promise resolving with the batch response.
   */
  async batch(request: CRequest['batch']): Promise<CResponse['batch']> {
    return this.Request('/batch', request);
  }
}
