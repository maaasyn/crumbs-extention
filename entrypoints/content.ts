import { MessageType } from "@/utils/types";
import "mipd/window";

const FROM = "content-script";

const F = `[${FROM}]`;

export default defineContentScript({
  matches: ["*://*/*"],
  registration: "manifest",
  world: "ISOLATED",
  main() {
    console.log(F, "Hello content script!!");

    /// REACTING TO MESSAGES FROM POPUP
    /// Forward the message to the injected script
    browser.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.type == MessageType.GET_ACCOUNT) {
        window.postMessage({ type: MessageType.GET_ACCOUNT }, "*");
      }

      if (request.type == MessageType.SEND_MESSAGE) {
        window.postMessage(
          {
            type: MessageType.SEND_MESSAGE,
            message: request.message,
            from: request.from,
            internalId: request.internalId,
          },
          "*"
        );
      }
    });

    /// REACTING TO MESSAGES FROM INJECTED

    window.addEventListener("message", function (event) {
      if (event.data.type && event.data.type == MessageType.PONG_SEND_ACCOUNT) {
        // Forward the message to the popup script
        browser.runtime.sendMessage({
          type: MessageType.PONG_SEND_ACCOUNT,
          account: event.data.account,
        });
      }

      if (event.data.type && event.data.type == MessageType.PONG_SEND_MESSAGE) {
        // Forward the message to the popup script
        browser.runtime.sendMessage({
          type: MessageType.PONG_SEND_MESSAGE,
          tx: event.data.tx,
          isSuccess: event.data.isSuccess,
          error: event.data.error,
          ...event.data,
        });

        console.log(F, "Received PONG_SEND_MESSAGE", event.data);
      }
    });

    function injectScript() {
      const scriptElement = document.createElement("script");
      const path = browser.runtime.getURL("/injected.js");
      console.log({ path });
      scriptElement.src = path;
      // scriptElement.type = "module"; // <-- Add this line for ESM module support
      scriptElement.onload = () => scriptElement.remove();

      console.log(F, scriptElement);
      (document.head || document.documentElement).append(scriptElement);
    }

    injectScript();
  },
});
