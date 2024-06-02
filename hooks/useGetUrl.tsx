import { urlAtom } from "@/state/url";
import { useAtom } from "jotai";
import { useEffect } from "react";

const useCurrentUrl = () => {
  const [url, setUrl] = useAtom(urlAtom);

  useEffect(() => {
    const getCurrentTabUrl = (
      callback: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        const activeTabUrl = activeTab.url ?? null;
        callback(activeTabUrl);
      });
    };

    // Call getCurrentTabUrl when the component mounts
    getCurrentTabUrl(setUrl);

    // Add an event listener for the chrome.tabs.onUpdated event
    const handleTabUpdated = (
      tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: chrome.tabs.Tab
    ) => {
      if (changeInfo.url) {
        getCurrentTabUrl(setUrl);
      }
    };

    chrome.tabs.onUpdated.addListener(handleTabUpdated);

    // Remove the event listener when the component unmounts
    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdated);
    };
  }, []);

  return url;
};

export default useCurrentUrl;
