import useCurrentUrl from "@/hooks/useGetUrl";
import { accountAtom } from "@/state/account";
import { urlAccountMapAtom } from "@/state/url-to-account";
import { MessageType } from "@/utils/types";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { browser } from "wxt/browser";

export const useAccount = () => {
  const url = useCurrentUrl();

  const urlBase = url ? getBaseUrl(url) : null;

  const [urlToAccountMap, setUrlToAccountMap] = useAtom(urlAccountMapAtom);
  const [userAddress, setUserAddress] = useAtom(accountAtom);
  const isConnected = !!userAddress;

  useEffect(() => {
    if (urlBase) {
      const accountForUrl = urlToAccountMap[urlBase];
      if (accountForUrl) {
        setUserAddress(accountForUrl);
      } else {
        setUserAddress(null);
      }
    }
  }, [urlBase, urlToAccountMap]);

  useEffect(() => {
    // @ts-ignore
    const handleMessage = (request, sender, sendResponse) => {
      console.log({ request });
      if (request.type == MessageType.PONG_SEND_ACCOUNT) {
        setUserAddress(request.account);

        if (urlBase) {
          setUrlToAccountMap((prev) => ({
            ...prev,
            [urlBase]: request.account,
          }));
        }
      }
    };

    browser.runtime.onMessage.addListener(handleMessage);

    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, [url]);

  const handleConnectWalletClick = async () => {
    // Send a message to the content script
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    await browser.tabs.sendMessage(tab.id!, { type: MessageType.GET_ACCOUNT });
  };

  return { userAddress, handleConnectWalletClick, isConnected };
};

const getBaseUrl = (url: string) => {
  const urlObject = new URL(url);
  return `${urlObject.protocol}//${urlObject.host}`;
};

export default useAccount;
