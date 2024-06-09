import { PendingComment } from "@/state/pending-comments";

const FROM = "background-script";

const F = `[${FROM}]`;

// const pendingComments: PendingComment = [];

export default defineBackground(() => {
  console.log("Hello background!");

  // Listen for messages from the content script
  // browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   if (request.type == MessageType.SEND_MESSAGE) {
  //     console.log(F, "Received SEND_MESSAGE", request);
  //     // Forward the message to the injected script
  //     browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //       browser.tabs.sendMessage(tabs[0].id, request);
  //     });
  //   }
  // });
});
