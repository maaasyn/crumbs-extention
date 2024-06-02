import useCurrentUrl from "@/hooks/useGetUrl";
import { accountAtom } from "@/state/account";
import { urlAccountMapAtom } from "@/state/url-to-account";
import { MessageType } from "@/utils/types";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { browser } from "wxt/browser";

export const useAccount = () => {
  const [urlToAccountMap, setUrlToAccountMap] = useAtom(urlAccountMapAtom);
  const [userAddress, setUserAddress] = useAtom(accountAtom);

  const url = useCurrentUrl();

  useEffect(() => {
    // @ts-ignore
    const handleMessage = (request, sender, sendResponse) => {
      console.log({ request });
      if (request.type == MessageType.PONG_SEND_ACCOUNT) {
        setUserAddress(request.account);

        console.log("Received account", request.account);
        console.log("Current url", url);

        console.log("Setting url to account map");
        console.log({ urlToAccountMap });

        if (url) {
          setUrlToAccountMap((prev) => ({
            ...prev,
            [url]: request.account,
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

  return { userAddress, handleConnectWalletClick };
};

export default useAccount;
