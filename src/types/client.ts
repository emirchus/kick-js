import type { ChatEventData, ChatEvents } from "../core/messageHandling";
import type { Channel, Livestream } from "./video";

/**
 * Generic event handler type for processing event data
 */
export type EventHandler<T extends ChatEvents> = (
  data: ChatEventData<T>,
) => void;

/**
 * Configuration options for the Kick client
 */
export interface ClientOptions {
  /** Whether to convert emote tags to plain text (e.g., [emote:123:name] -> name) */
  plainEmote?: boolean;
  /** Enable logging for debugging purposes */
  logger?: boolean;
  /** If true, client operates in read-only mode without authentication */
  readOnly?: boolean;
}

/**
 * Video information returned from the VOD API
 */
export interface Video {
  /** Unique video identifier */
  id: number;
  /** Video title */
  title: string;
  /** URL to the video thumbnail image */
  thumbnail: string;
  /** Video duration in seconds */
  duration: number;
  /** Associated live stream identifier */
  live_stream_id: number;
  /** When the stream started */
  start_time: Date;
  /** When the video was created */
  created_at: Date;
  /** When the video was last updated */
  updated_at: Date;
  /** Unique video UUID */
  uuid: string;
  /** Total number of views */
  views: number;
  /** Stream source URL */
  stream: string;
  /** Language of the video */
  language: string;
  /** Livestream details */
  livestream: Livestream;
  /** Channel information */
  channel: Channel;
}

/**
 * Main Kick client interface providing all client functionality
 */
export interface KickClient {
  /** Register an event listener for WebSocket events */
  on: <T extends ChatEvents>(event: T, listener: EventHandler<T>) => void;
  /** Fetch video on demand (VOD) information by video ID */
  vod: (video_id: string) => Promise<Video>;
  /** Authenticate the client with login credentials or tokens */
  login: (credentials: LoginOptions) => Promise<boolean>;
  /** Current user information, or null if not authenticated */
  user: {
    id: number;
    username: string;
    tag: string;
  } | null;
  /** Send a message to the chatroom */
  sendMessage: (messageContent: string) => Promise<void>;
  /** Ban or timeout a user from the channel */
  banUser: (
    targetUser: string,
    durationInMinutes?: number,
    permanent?: boolean,
    reason?: string,
  ) => Promise<void>;
  /** Remove a ban from a user */
  unbanUser: (targetUser: string) => Promise<void>;
  /** Delete a message from the chatroom */
  deleteMessage: (messageId: string) => Promise<void>;
  /** Enable or disable slow mode in the chatroom */
  slowMode: (mode: "on" | "off", durationInSeconds?: number) => Promise<void>;
  /** Get the current poll for a channel */
  getPoll: (targetChannel?: string) => Promise<Poll | null>;
  /** Get leaderboard information for a channel */
  getLeaderboards: (targetChannel?: string) => Promise<Leaderboard | null>;
}

/**
 * Authentication settings for login-based authentication
 */
export interface AuthenticationSettings {
  /** Kick username */
  username: string;
  /** User password */
  password: string;
  /** OTP secret for two-factor authentication */
  otp_secret: string;
}

/**
 * Credentials for username/password login
 */
type LoginCredentials = {
  /** Kick username */
  username: string;
  /** User password */
  password: string;
  /** OTP secret for two-factor authentication */
  otp_secret: string;
};

/**
 * Credentials for token-based authentication
 */
type TokenCredentials = {
  /** Bearer token for API authentication */
  bearerToken: string;
  /** XSRF token for CSRF protection */
  xsrfToken: string;
  /** Session cookies */
  cookies: string;
};

/**
 * Login options supporting either username/password or token-based authentication
 */
export type LoginOptions =
  | { type: "login"; credentials: LoginCredentials }
  | { type: "tokens"; credentials: TokenCredentials };

/**
 * Poll data structure from the Kick API
 */
export type Poll = {
  /** Poll status information */
  status: {
    /** HTTP status code */
    code: number;
    /** Status message */
    message: string;
    /** Whether an error occurred */
    error: boolean;
  };
  /** Poll data */
  data: {
    /** Poll title/question */
    title: string;
    /** Poll duration in seconds */
    duration: number;
    /** How long to display results after poll ends */
    result_display_duration: number;
    /** When the poll was created */
    created_at: Date;
    /** Available poll options */
    options: {
      /** Option identifier */
      id: number;
      /** Option label/text */
      label: string;
      /** Number of votes for this option */
      votes: number;
    }[];
    /** Time remaining in seconds */
    remaining: number;
    /** Whether the current user has voted */
    has_voted: boolean;
    /** ID of the option the user voted for, or null */
    voted_option_id: null;
  };
};

/**
 * Leaderboard data structure containing gift statistics
 */
export type Leaderboard = {
  /** All-time gift leaderboard */
  gifts: Gift[];
  /** Whether all-time gifts are enabled */
  gifts_enabled: boolean;
  /** Weekly gift leaderboard */
  gifts_week: Gift[];
  /** Whether weekly gifts are enabled */
  gifts_week_enabled: boolean;
  /** Monthly gift leaderboard */
  gifts_month: Gift[];
  /** Whether monthly gifts are enabled */
  gifts_month_enabled: boolean;
};

/**
 * Gift information for leaderboard entries
 */
export type Gift = {
  /** User ID who received/sent the gift */
  user_id: number;
  /** Username */
  username: string;
  /** Number of gifts */
  quantity: number;
};
