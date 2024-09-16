export type CentriAgentError = {
  code: number;
  message: string;
};

export type CentriAgentResult<T> = {
  result: T;
  error?: CentriAgentError;
};

/**
 * Enumeration of Centrifugo server API methods.
 * Methods reference:
 * https://centrifugal.dev/docs/server/server_api#publish
 */
export type CentriAgentMethods =
  | 'publish'
  | 'broadcast'
  | 'subscribe'
  | 'unsubscribe'
  | 'disconnect'
  | 'refresh'
  | 'presence'
  | 'presence_stats'
  | 'history'
  | 'history_remove'
  | 'channels'
  | 'info'
  | 'batch';

/**
 * Represents the stream position, consisting of an offset and an epoch.
 */
export type StreamPosition = {
  offset: number;
  epoch: string;
};

export type OverrideObject = {
  presence?: boolean;
  join_leave?: boolean;
  force_push_join_leave?: boolean;
  force_positioning?: boolean;
  force_recovery?: boolean;
};

export type ChannelInfo = {
  num_clients: number;
};

export type CentriAgentNodeInfo = {
  name: string;
  num_channels: number;
  num_clients: number;
  nun_users: number;
  uid: string;
  uptime: number;
  version: string;
};

/**
 * Client information associated with presence or connections.
 */
export type CentriAgentClientInfo = {
  client: string;
  user: string;
  conn_info?: Record<string, any>;
  chan_info?: Record<string, any>;
};

/**
 * Publication information including data and its stream offset.
 */
export type CentriAgentPublication = {
  data: Record<string, any>;
  offset: number;
};

/**
 * Params for the publish method.
 * - `channel`: The channel to which the data is published.
 * - `data`: The actual data being sent.
 * - `skip_history`: Optionally skip saving this message to history.
 * - `tags`: Tags for message categorization.
 * - `b64data`: Optional base64-encoded data for special handling.
 * - `idempotency_key`: Key for ensuring idempotent requests.
 * - `delta`: Whether this is a delta update.
 * Reference: https://centrifugal.dev/docs/server/server_api#publish
 */
export type CentriAgentPublishParams = {
  channel: string;
  data: Record<string, any>;
  skip_history?: boolean;
  tags?: Record<string, string>;
  b64data?: string;
  idempotency_key?: string;
  delta?: boolean;
};

/**
 * Response structure for the publish method.
 * - `offset`: The offset in the stream after the message is published.
 * - `epoch`: The epoch identifier for the stream.
 * Reference: https://centrifugal.dev/docs/server/server_api#publish
 */
export type CentriAgentPublishResponse = {
  offset?: number;
  epoch?: string;
};

/**
 * Request parameters for broadcasting data to multiple channels.
 * - `channels`: A list of channel names to broadcast the data to.
 * - `data`: The data to broadcast to the channels.
 */
export type CentriAgentBroadcastParams = Omit<CentriAgentPublishParams, 'channel'> & {
  channels: string[];
};

/**
 * Response for broadcasting data.
 * - `responses`: `CentriAgentPublishResponse` for each channel
 */
export type CentriAgentBroadcastResponse = {
  responses: CentriAgentPublishResponse[];
};

/**
 * Params for subscribing a user to a channel.
 * - `channel`: The channel to subscribe to.
 */
export type CentriAgentSubscribeParams = {
  user: string;
  channel: string;
  info?: string;
  b64info?: string;
  client?: string;
  session?: string;
  data?: string;
  b64data?: string;
  recover_since?: StreamPosition;
  override?: OverrideObject;
};

/**
 * Empty response for the subscribe method.
 * Reference: https://centrifugal.dev/docs/server/server_api#subscribe
 */
export type CentriAgentSubscribeResponse = Record<string, never>;

/**
 * Params for unsubscribing a user from a channel.
 * - `channel`: The channel to unsubscribe from.
 */
export type CentriAgentUnsubscribeParams = {
  user: string;
  channel: string;
  client?: string;
  session?: string;
};

/**
 * Empty response for the unsubscribe method.
 */
export type CentriAgentUnsubscribeResponse = Record<string, never>;

/**
 * Params for disconnecting a user.
 * - `code`: The disconnect code.
 * - `reason`: A textual reason for the disconnect.
 * Reference: https://centrifugal.dev/docs/server/server_api#disconnect
 */
export type CentriAgentDisconnectParams = {
  user: string;
  client?: string;
  session?: string;
  whitelist?: string[];
  disconnect?: Record<string, any>;
};

/**
 * Empty response for the disconnect method.
 */
export type CentriAgentDisconnectResponse = {
  code: number;
  reason: string;
};

/**
 * Params for refreshing the user connection.
 * - `user`: The user identifier.
 * - `client`: Optionally, the client identifier.
 * - `session`: Optionally, the session identifier.
 * - `expired`: Whether the token has expired.
 * - `expire_at`: The timestamp when the token expires.
 * Reference: https://centrifugal.dev/docs/server/server_api#refresh
 */
export type CentriAgentRefreshParams = {
  user: string;
  client?: string;
  session?: string;
  expired?: boolean;
  expire_at?: number;
};

/**
 * Empty response for the refresh method.
 */
export type CentriAgentRefreshResponse = Record<string, never>;

/**
 * Params for querying presence data in a channel.
 * - `channel`: The channel to check for presence.
 * Reference: https://centrifugal.dev/docs/server/server_api#presence
 */
export type CentriAgentPresenceParams = {
  channel: string;
};

/**
 * Response for querying presence data in a channel.
 * - `presence`: A record of client and user presence.
 * Reference: https://centrifugal.dev/docs/server/server_api#presence
 */
export type CentriAgentPresenceResponse = {
  presence: Record<string, CentriAgentClientInfo>;
};

/**
 * Params for querying presence statistics in a channel.
 * - `channel`: The channel to query statistics for.
 * Reference: https://centrifugal.dev/docs/server/server_api#presence_stats
 */
export type CentriAgentPresenceStatsParams = {
  channel: string;
};

/**
 * Response for querying presence statistics.
 * - `num_clients`: The number of clients present.
 * - `num_users`: The number of unique users present.
 */
export type CentriAgentPresenceStatsResponse = {
  num_clients: number;
  num_users: number;
};

/**
 * Params for retrieving the history of a channel.
 * - `channel`: The channel to retrieve history from.
 * - `limit`: The maximum number of messages to return.
 * - `since`: The stream position to start from.
 * - `reverse`: Whether to return messages in reverse order.
 * Reference: https://centrifugal.dev/docs/server/server_api#history
 */
export type CentriAgentHistoryParams = {
  channel: string;
  limit?: number;
  since?: StreamPosition;
  reverse?: boolean;
};

/**
 * Response for retrieving the history of a channel.
 * - `epoch`: The current stream epoch.
 * - `offset`: The offset of the last message in the history.
 * - `publications`: A list of publications in the channel's history.
 */
export type CentriAgentHistoryResponse = {
  epoch?: string;
  offset?: number;
  publications?: CentriAgentPublication[];
};

/**
 * Params for removing the history of a channel.
 * - `channel`: The channel to remove history from.
 * Reference: https://centrifugal.dev/docs/server/server_api#history_remove
 */
export type CentriAgentHistoryRemoveParams = {
  channel: string;
};

/**
 * Empty response for removing channel history.
 */
export type CentriAgentHistoryRemoveResponse = Record<string, never>;

/**
 * Params for querying all active channels.
 */
export type CentriAgentChannelsParams = {
  pattern?: string;
};

/**
 * Response for querying all active channels.
 * - `channels`: A list of currently active channels.
 */
export type CentriAgentChannelsResponse = {
  channels: {
    [key: string]: ChannelInfo;
  };
};

/**
 * Request parameters for retrieving server information.
 * - No parameters are required.
 */
export type CentriAgentInfoParams = Record<string, never>;

/**
 * Response for querying server information.
 * - `version`: The version of the Centrifugo server.
 * - `nodes`: A list of nodes with their details.
 *   - `name`: Name of the node.
 *   - `num_clients`: Number of connected clients.
 *   - `num_channels`: Number of active channels.
 *   - `uptime`: Uptime in seconds.
 *   - `metrics` (optional): Additional metrics data.
 */
export type CentriAgentInfoResponse = {
  nodes: CentriAgentNodeInfo[];
};

type SingleKeyCommand<T> = {
  [K in keyof T]: { [key in K]: T[K] };
}[keyof T];

export type CentriAgentBatchCommand = SingleKeyCommand<{
  [key in CentriAgentMethods]: key extends 'batch'
    ? never
    : key extends keyof CentriAgentRequests
      ? CentriAgentRequests[key]
      : never;
}>;

/**
 * Request parameters for sending multiple requests in a single batch.
 * - `commands`: A list of commands to be processed in the batch.
 *   - `method`: The method to call.
 *   - `params`: Parameters specific to the method.
 */
export type CentriAgentBatchParams = {
  commands: CentriAgentBatchCommand[];
};

export type CentriAgentBatchResponseMap = {
  [key in keyof CentriAgentResponses]: CentriAgentResponses[key];
};

// type CommandToResponse<T extends CentriAgentBatchResponseMap> =
//   // T extends {info: {}} ? number :
//   T extends { error: any } ? CentriAgentError : CentriAgentBatchResponseMap[keyof T];

type ExtractResponses<TCommands extends CentriAgentBatchCommand[]> = {
  [OC in keyof TCommands]: {
    [X in keyof TCommands[OC] & CentriAgentMethods]: CentriAgentResponses[X];
  };
};

/**
 * Response for a batch request.
 * - `results`: A list of results corresponding to each request in the batch.
 */
export type CentriAgentBatchResponse<T extends CentriAgentBatchParams = CentriAgentBatchParams> = {
  replies: ExtractResponses<T['commands']>;
};

// Request and response mappings

export type CentriAgentRequests = { [k in CentriAgentMethods]: unknown } & {
  publish: CentriAgentPublishParams;
  broadcast: CentriAgentBroadcastParams;
  subscribe: CentriAgentSubscribeParams;
  unsubscribe: CentriAgentUnsubscribeParams;
  disconnect: CentriAgentDisconnectParams;
  refresh: CentriAgentRefreshParams;
  presence: CentriAgentPresenceParams;
  presence_stats: CentriAgentPresenceStatsParams;
  history: CentriAgentHistoryParams;
  history_remove: CentriAgentHistoryRemoveParams;
  channels: CentriAgentChannelsParams;
  info: CentriAgentInfoParams;
  batch: CentriAgentBatchParams;
};

export type CentriAgentResponses = { [k in CentriAgentMethods]: unknown } & {
  publish: CentriAgentPublishResponse;
  broadcast: CentriAgentBroadcastResponse;
  subscribe: CentriAgentSubscribeResponse;
  unsubscribe: CentriAgentUnsubscribeResponse;
  disconnect: CentriAgentDisconnectResponse;
  refresh: CentriAgentRefreshResponse;
  presence: CentriAgentPresenceResponse;
  presence_stats: CentriAgentPresenceStatsResponse;
  history: CentriAgentHistoryResponse;
  history_remove: CentriAgentHistoryRemoveResponse;
  channels: CentriAgentChannelsResponse;
  info: CentriAgentInfoResponse;
  batch: CentriAgentBatchResponse;
};

/**
 * Interface defining the Centrifugo Agent methods with their requests and responses.
 * This interface allows for interaction with the Centrifugo server API.
 */
export interface CentrifugoAgentInterface {
  publish(request: CentriAgentRequests['publish']): Promise<CentriAgentResponses['publish']>;

  subscribe(request: CentriAgentRequests['subscribe']): Promise<CentriAgentResponses['subscribe']>;

  unsubscribe(request: CentriAgentRequests['unsubscribe']): Promise<CentriAgentResponses['unsubscribe']>;

  disconnect(request: CentriAgentRequests['disconnect']): Promise<CentriAgentResponses['disconnect']>;

  refresh(request: CentriAgentRequests['refresh']): Promise<CentriAgentResponses['refresh']>;

  presence(request: CentriAgentRequests['presence']): Promise<CentriAgentResponses['presence']>;

  presence_stats(
    request: CentriAgentRequests['presence_stats'],
  ): Promise<CentriAgentResponses['presence_stats']>;

  history(request: CentriAgentRequests['history']): Promise<CentriAgentResponses['history']>;

  history_remove(
    request: CentriAgentRequests['history_remove'],
  ): Promise<CentriAgentResponses['history_remove']>;

  channels(request: CentriAgentRequests['channels']): Promise<CentriAgentResponses['channels']>;
}
