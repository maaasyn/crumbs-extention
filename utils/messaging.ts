import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
  getStringLength(data: string): number;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
