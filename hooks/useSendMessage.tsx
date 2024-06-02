import { getOffChainClient } from "@/offchain/client";
import { accountAtom } from "@/state/account";
import { MessageType } from "@/utils/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { keccak256, toHex } from "viem";
import { browser } from "wxt/browser";

const useSendMessage = () => {
  const [tx, setTx] = useState(null);

  const [userAddress] = useAtom(accountAtom);

  const offChainClient = getOffChainClient();

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const handleMessage = (request, sender, sendResponse) => {
      if (request.type == MessageType.PONG_SEND_MESSAGE) {
        setTx(request.tx);
      }
    };
    browser.runtime.onMessage.addListener(handleMessage);
    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const sendMessage = async (input: {
    messageContent: string;
    url: string;
  }) => {
    setIsPending(true);
    // Send a message to the content script
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    console.log({
      hash: keccak256(toHex(input.messageContent)),
      value: input.messageContent,
    });

    const isAllOk = await Promise.all([
      offChainClient.setHashValue({
        hash: keccak256(toHex(input.messageContent)),
        value: input.messageContent,
      }),
      offChainClient.setHashValue({
        hash: keccak256(toHex(input.url)),
        value: input.url,
      }),
    ]);

    if (!isAllOk) {
      setIsPending(false);

      throw new Error("Failed to set hash value");
    }

    await browser.tabs.sendMessage(tab.id!, {
      type: MessageType.SEND_MESSAGE,
      message: input.messageContent,
      from: userAddress,
    });
  };

  return { isPending, tx, sendMessage };
};

export default useSendMessage;
