import type { Livestream } from "./video";

/**
 * Complete channel information from the Kick API
 */
export interface KickChannelInfo {
  /** Unique channel identifier */
  id: number;
  /** Associated user identifier */
  user_id: number;
  /** Channel slug (URL-friendly name) */
  slug: string;
  /** Whether the channel is banned */
  is_banned: boolean;
  /** Playback URL for the stream */
  playback_url: string;
  /** Whether VOD (Video On Demand) is enabled */
  vod_enabled: boolean;
  /** Whether subscriptions are enabled */
  subscription_enabled: boolean;
  /** Total number of followers */
  followers_count: number;
  /** Available subscriber badges */
  subscriber_badges: SubscriberBadge[];
  /** Channel banner image */
  banner_image: BannerImage;
  /** Current livestream information, or null if offline */
  livestream: Livestream | null;
  /** User role in the channel (usually null) */
  role: null;
  /** Whether the channel is muted */
  muted: boolean;
  /** Follower badges (usually empty array) */
  follower_badges: unknown[];
  /** Offline banner image (usually null) */
  offline_banner_image: null;
  /** Whether the channel is verified */
  verified: boolean;
  /** Recently used categories */
  recent_categories: RecentCategory[];
  /** Whether the channel can host other streams */
  can_host: boolean;
  /** User information */
  user: User;
  /** Chatroom configuration */
  chatroom: Chatroom;
}

/**
 * Banner image information
 */
export interface BannerImage {
  /** Banner image URL */
  url: string;
}

/**
 * Chatroom configuration and settings
 */
export interface Chatroom {
  /** Unique chatroom identifier */
  id: number;
  /** Type of chatable entity */
  chatable_type: string;
  /** Associated channel identifier */
  channel_id: number;
  /** When the chatroom was created */
  created_at: Date;
  /** When the chatroom was last updated */
  updated_at: Date;
  /** Previous chat mode (legacy) */
  chat_mode_old: string;
  /** Current chat mode */
  chat_mode: string;
  /** Whether slow mode is enabled */
  slow_mode: boolean;
  /** Chatable entity identifier */
  chatable_id: number;
  /** Whether followers-only mode is enabled */
  followers_mode: boolean;
  /** Whether subscribers-only mode is enabled */
  subscribers_mode: boolean;
  /** Whether emotes are enabled */
  emotes_mode: boolean;
  /** Message interval in seconds (for slow mode) */
  message_interval: number;
  /** Minimum following duration required (for followers mode) */
  following_min_duration: number;
}

/**
 * Recently used category information
 */
export interface RecentCategory {
  /** Category element identifier */
  id: number;
  /** Parent category identifier */
  category_id: number;
  /** Category name */
  name: string;
  /** Category slug */
  slug: string;
  /** Associated tags */
  tags: string[];
  /** Category description (usually null) */
  description: null;
  /** Deletion timestamp (null if not deleted) */
  deleted_at: null;
  /** Number of viewers in this category */
  viewers: number;
  /** Category banner image */
  banner: Banner;
  /** Parent category information */
  category: Category;
}

/**
 * Banner image with responsive variants
 */
export interface Banner {
  /** Responsive image srcset */
  responsive: string;
  /** Banner image URL */
  url: string;
}

/**
 * Category information
 */
export interface Category {
  /** Category identifier */
  id: number;
  /** Category name */
  name: string;
  /** Category slug */
  slug: string;
  /** Category icon URL */
  icon: string;
}

/**
 * Subscriber badge information
 */
export interface SubscriberBadge {
  /** Badge identifier */
  id: number;
  /** Associated channel identifier */
  channel_id: number;
  /** Number of months required to unlock this badge */
  months: number;
  /** Badge image information */
  badge_image: BadgeImage;
}

/**
 * Badge image with srcset support
 */
export interface BadgeImage {
  /** Image srcset for responsive images */
  srcset: string;
  /** Image source URL */
  src: string;
}

/**
 * User profile information from channel data
 */
export interface User {
  /** User identifier */
  id: number;
  /** Kick username */
  username: string;
  /** Whether user agreed to terms */
  agreed_to_terms: boolean;
  /** When the email was verified */
  email_verified_at: Date;
  /** User bio/description */
  bio: string;
  /** User country (usually null) */
  country: null;
  /** User state (usually null) */
  state: null;
  /** User city (usually null) */
  city: null;
  /** Instagram handle */
  instagram: string;
  /** Twitter handle */
  twitter: string;
  /** YouTube channel */
  youtube: string;
  /** Discord username */
  discord: string;
  /** TikTok handle */
  tiktok: string;
  /** Facebook profile */
  facebook: string;
  /** Profile picture URL */
  profile_pic: string;
}
