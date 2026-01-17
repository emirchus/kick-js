/**
 * Raw video information from the Kick API
 */
export type VideoInfo = {
  /** Unique video identifier */
  id: number;
  /** Associated live stream identifier */
  live_stream_id: number;
  /** Video slug (usually null) */
  slug: null;
  /** Thumbnail URL (usually null) */
  thumb: null;
  /** S3 storage information (usually null) */
  s3: null;
  /** Trading platform identifier (usually null) */
  trading_platform_id: null;
  /** When the video was created */
  created_at: Date;
  /** When the video was last updated */
  updated_at: Date;
  /** Unique video UUID */
  uuid: string;
  /** Total number of views */
  views: number;
  /** Deletion timestamp (null if not deleted) */
  deleted_at: null;
  /** Stream source URL */
  source: string;
  /** Associated livestream information */
  livestream: Livestream;
};

/**
 * Livestream information and metadata
 */
export type Livestream = {
  /** Unique livestream identifier */
  id: number;
  /** Livestream slug */
  slug: string;
  /** Associated channel identifier */
  channel_id: number;
  /** When the livestream was created */
  created_at: Date;
  /** Stream session title */
  session_title: string;
  /** Whether the stream is currently live */
  is_live: boolean;
  /** Risk level identifier (usually null) */
  risk_level_id: null;
  /** When the stream started */
  start_time: Date;
  /** Stream source (usually null) */
  source: null;
  /** Associated Twitch channel (usually null) */
  twitch_channel: null;
  /** Stream duration in seconds */
  duration: number;
  /** Stream language */
  language: string;
  /** Whether the stream is marked as mature content */
  is_mature: boolean;
  /** Current viewer count */
  viewer_count: number;
  /** Thumbnail image URL */
  thumbnail: string;
  /** Channel information */
  channel: Channel;
  /** Associated categories */
  categories: CategoryElement[];
};

/**
 * Category element with viewer statistics
 */
export type CategoryElement = {
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
  /** Parent category information */
  category: CategoryCategory;
};

/**
 * Parent category information
 */
export type CategoryCategory = {
  /** Category identifier */
  id: number;
  /** Category name */
  name: string;
  /** Category slug */
  slug: string;
  /** Category icon URL */
  icon: string;
};

/**
 * Channel information and settings
 */
export type Channel = {
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
  /** When the channel name was last updated (null if never) */
  name_updated_at: null;
  /** Whether VOD (Video On Demand) is enabled */
  vod_enabled: boolean;
  /** Whether subscriptions are enabled */
  subscription_enabled: boolean;
  /** Total number of followers */
  followersCount: number;
  /** User information */
  user: User;
  /** Whether the channel can host other streams */
  can_host: boolean;
  /** Verification status */
  verified: Verified;
};

/**
 * User profile information
 */
export type User = {
  /** Profile picture URL */
  profilepic: string;
  /** User bio/description */
  bio: string;
  /** Twitter handle */
  twitter: string;
  /** Facebook profile */
  facebook: string;
  /** Instagram handle */
  instagram: string;
  /** YouTube channel */
  youtube: string;
  /** Discord username */
  discord: string;
  /** TikTok handle */
  tiktok: string;
  /** Kick username */
  username: string;
};

/**
 * Channel verification status
 */
export type Verified = {
  /** Verification identifier */
  id: number;
  /** Associated channel identifier */
  channel_id: number;
  /** When verification was created */
  created_at: Date;
  /** When verification was last updated */
  updated_at: Date;
};
