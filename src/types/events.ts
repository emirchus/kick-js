/**
 * Raw message event from WebSocket
 */
export interface MessageEvent {
  /** Event type identifier */
  event: string;
  /** JSON stringified event data */
  data: string;
  /** Channel identifier */
  channel: string;
}

/**
 * Parsed chat message data
 */
export interface MessageData {
  /** Unique message identifier */
  id: string;
  /** Chatroom identifier where the message was sent */
  chatroom_id: number;
  /** Message content (may include emote tags) */
  content: string;
  /** Message type */
  type: string;
  /** ISO timestamp when the message was created */
  created_at: string;
  /** User who sent the message */
  sender: {
    /** User identifier */
    id: number;
    /** Username */
    username: string;
    /** User slug */
    slug: string;
    /** User identity information */
    identity: { color: string; badges: unknown };
  };
  /** Optional metadata for forwarded/reposted messages */
  metadata?: {
    /** Original sender information */
    original_sender: { id: string; username: string };
    /** Original message information */
    original_message: {
      id: string;
      content: string;
    };
  };
}

/**
 * Subscription event data
 */
export interface SubscriptionData {
  /** Username of the subscriber */
  username: string;
  /** Number of months subscribed */
  months: number;
}

/**
 * Chat message structure
 */
export interface ChatMessage {
  /** Unique message identifier */
  id: string;
  /** Chatroom identifier */
  chatroom_id: number;
  /** Message content */
  content: string;
  /** Message type */
  type: string;
  /** ISO timestamp when the message was created */
  created_at: string;
  /** User who sent the message */
  sender: {
    /** User identifier */
    id: number;
    /** Username */
    username: string;
    /** User slug */
    slug: string;
    /** User identity information */
    identity: { color: string; badges: unknown };
  };
}

/**
 * Subscription information
 */
export interface Subscription {
  /** Chatroom identifier */
  chatroom_id: number;
  /** Username of the subscriber */
  username: string;
  /** Number of months subscribed */
  months: number;
}

/**
 * Event fired when subscriptions are gifted
 */
export interface GiftedSubscriptionsEvent {
  /** Chatroom identifier */
  chatroom_id: number;
  /** List of usernames who received gifts */
  gifted_usernames: string[];
  /** Username of the user who gifted the subscriptions */
  gifter_username: string;
}

/**
 * Event fired when a stream host occurs
 */
export interface StreamHostEvent {
  /** Chatroom identifier */
  chatroom_id: number;
  /** Optional host message */
  optional_message: string;
  /** Number of viewers being hosted */
  number_viewers: number;
  /** Username of the hosting channel */
  host_username: string;
}

/**
 * Event fired when a message is deleted
 */
export interface MessageDeletedEvent {
  /** Event identifier */
  id: string;
  /** Deleted message information */
  message: {
    /** Message identifier */
    id: string;
  };
}

/**
 * Event fired when a user is banned
 */
export interface UserBannedEvent {
  /** Event identifier */
  id: string;
  /** User who was banned */
  user: {
    /** User identifier */
    id: number;
    /** Username */
    username: string;
    /** User slug */
    slug: string;
  };

  /** User who performed the ban */
  banned_by: {
    /** User identifier */
    id: number;
    /** Username */
    username: string;
    /** User slug */
    slug: string;
  };

  /** When the ban expires (undefined for permanent bans) */
  expires_at?: Date;
}

/**
 * Event fired when a user is unbanned
 */
export interface UserUnbannedEvent {
  /** Event identifier */
  id: string;
  /** User who was unbanned */
  user: {
    /** User identifier */
    id: number;
    /** Username */
    username: string;
    /** User slug */
    slug: string;
  };
  /** User who performed the unban */
  unbanned_by: {
    /** User identifier */
    id: number;
    /** Username */
    username: string;
    /** User slug */
    slug: string;
  };
}

/**
 * Event fired when a message is pinned
 */
export interface PinnedMessageCreatedEvent {
  /** Pinned message information */
  message: {
    /** Message identifier */
    id: string;
    /** Chatroom identifier */
    chatroom_id: number;
    /** Message content */
    content: string;
    /** Message type */
    type: string;
    /** When the message was created */
    created_at: Date;
    /** User who sent the message */
    sender: {
      /** User identifier */
      id: number;
      /** Username */
      username: string;
      /** User slug */
      slug: string;
      /** User identity with badges */
      identity: {
        /** Username color */
        color: string;
        /** User badges */
        badges: Array<{
          /** Badge type */
          type: string;
          /** Badge text */
          text: string;
          /** Optional badge count */
          count?: number;
        }>;
      };
    };
    /** Message metadata (usually null) */
    metadata: null;
  };
  /** Duration the message will be pinned */
  duration: string;
}
