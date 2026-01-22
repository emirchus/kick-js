import type {
  MessageEvent,
  ChatMessage,
  Subscription,
  GiftedSubscriptionsEvent,
  StreamHostEvent,
  UserBannedEvent,
  UserUnbannedEvent,
  PinnedMessageCreatedEvent,
  MessageDeletedEvent,
} from "../types/events";
import { parseJSON } from "../utils/utils";

export type ChatEvents =
  | "ChatMessage"
  | "Subscription"
  | "GiftedSubscriptions"
  | "StreamHost"
  | "MessageDeleted"
  | "UserBanned"
  | "UserUnbanned"
  | "PinnedMessageCreated"
  | "PinnedMessageDeleted"
  | "PollUpdate"
  | "PollDelete"
  | "ready"
  | 'error'
  | 'disconnect';

type ChannelInfo = {
  id: number;
  username: string;
  tag: string;
} | null;

// Infere the type of the data based on the event type
export type ChatEventData<T extends ChatEvents> = T extends "ChatMessage"
  ? ChatMessage
  : T extends "Subscription"
  ? Subscription
  : T extends "GiftedSubscriptions"
  ? GiftedSubscriptionsEvent
  : T extends "StreamHost"
  ? StreamHostEvent
  : T extends "MessageDeleted"
  ? MessageDeletedEvent
  : T extends "UserBanned"
  ? UserBannedEvent
  : T extends "UserUnbanned"
  ? UserUnbannedEvent
  : T extends "PinnedMessageCreated"
  ? PinnedMessageCreatedEvent
  : T extends "PinnedMessageDeleted"
  ? MessageDeletedEvent
  : T extends "PollUpdate"
  ? unknown
  : T extends "PollDelete"
  ? unknown
  : T extends "ready"
  ? ChannelInfo
  : T extends "error"
  ? Error
  : T extends "disconnect"
  ? void
  : never;

export const parseMessage = (message: string) => {
  try {
    const messageEventJSON = parseJSON<MessageEvent>(message);

    // switch event type
    switch (messageEventJSON.event) {
      case "App\\Events\\ChatMessageEvent": {
        const data = parseJSON<ChatMessage>(messageEventJSON.data);
        return { type: "ChatMessage", data };
      }
      case "App\\Events\\SubscriptionEvent": {
        const data = parseJSON<Subscription>(messageEventJSON.data);
        return { type: "Subscription", data };
      }
      case "App\\Events\\GiftedSubscriptionsEvent": {
        const data = parseJSON<GiftedSubscriptionsEvent>(messageEventJSON.data);
        return { type: "GiftedSubscriptions", data };
      }
      case "App\\Events\\StreamHostEvent": {
        const data = parseJSON<StreamHostEvent>(messageEventJSON.data);
        return { type: "StreamHost", data };
      }
      case "App\\Events\\MessageDeletedEvent": {
        const data = parseJSON<MessageDeletedEvent>(messageEventJSON.data);
        return { type: "MessageDeleted", data };
      }
      case "App\\Events\\UserBannedEvent": {
        const data = parseJSON<UserBannedEvent>(messageEventJSON.data);
        return { type: "UserBanned", data };
      }
      case "App\\Events\\UserUnbannedEvent": {
        const data = parseJSON<UserUnbannedEvent>(messageEventJSON.data);
        return { type: "UserUnbanned", data };
      }
      case "App\\Events\\PinnedMessageCreatedEvent": {
        const data = parseJSON<PinnedMessageCreatedEvent>(
          messageEventJSON.data,
        );
        return { type: "PinnedMessageCreated", data };
      }
      case "App\\Events\\PinnedMessageDeletedEvent": {
        const data = parseJSON<MessageDeletedEvent>(messageEventJSON.data);
        return { type: "PinnedMessageDeleted", data };
      }
      case "App\\Events\\PollUpdateEvent": {
        const data = parseJSON(messageEventJSON.data);
        return { type: "PollUpdate", data };
      }
      case "App\\Events\\PollDeleteEvent": {
        const data = parseJSON(messageEventJSON.data);
        return { type: "PollDelete", data };
      }

      default: {
        console.log("Unknown event type:", messageEventJSON.event);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error("Error parsing message:", error);
    return null;
  }
};
