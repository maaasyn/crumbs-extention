const FROM = "background-script";

const F = `[${FROM}]`;

export default defineBackground(() => {
  console.log("Hello background!");

  // browser.runtime.getURL("/injected.js").
  // chrome.scripting
  // .executeScript(

  // );
  // console.log("Hello background!", { id: browser.runtime.id });

  // window.addEventListener("eip6963:announceProvider", (data) => {
  //   console.log({ data, background: true });
  // });

  // console.log({ window });

  // window.dispatchEvent(new CustomEvent("eip6963:requestProvider"));

  // // listen for messages from content script
  // browser.runtime.onMessage.addListener((message) => {
  //   if (message.type === "GET_CURRENT_TAB_INFO") {
  //     console.log("Sending current tab info");
  //     browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  //       browser.runtime.sendMessage({
  //         type: "CURRENT_TAB_INFO",
  //         data: tabs[0],
  //       });
  //     });
  //   }
  // });
});
