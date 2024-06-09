import { getOffChainClient } from "@/offchain/client";
import { accountAtom } from "@/state/account";
import {
  pendingCommentsAtom,
  PendingCommentStatus,
} from "@/state/pending-comments";
import { MessageType } from "@/utils/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { keccak256, toHex } from "viem";
import { browser } from "wxt/browser";
import { ulid } from "ulid";

const useSendMessage = () => {
  const [userAddress] = useAtom(accountAtom);

  const offChainClient = getOffChainClient();

  const [isPending, setIsPending] = useState(false);

  const [pendingComments, setPendingComments] = useAtom(pendingCommentsAtom);

  useEffect(() => {
    pendingComments.forEach(async (comment, idx) => {
      switch (comment.status) {
        case PendingCommentStatus.BEFORE_WALLET_INTERACTION:
          const [tab] = await browser.tabs.query({
            active: true,
            currentWindow: true,
          });

          //TODO: This needs some redesign.
          const isAllOk = await Promise.all([
            offChainClient.setHashValue(comment.comment),
            offChainClient.setHashValue(comment.url),
          ]);

          if (!isAllOk) {
            throw new Error("Failed to set hash value");
          }

          try {
            await browser.tabs.sendMessage(tab.id!, {
              type: MessageType.SEND_MESSAGE,
              message: comment.comment.value,
              from: userAddress,
              internalId: comment.internalId,
            });

            setPendingComments((comments) =>
              comments.map((c, i) =>
                i === idx ? { ...c, status: PendingCommentStatus.ON_WALLET } : c
              )
            );
          } catch (e) {
            console.error(e);
            setPendingComments((comments) =>
              comments.map((c, i) =>
                i === idx
                  ? {
                      ...c,
                      status: PendingCommentStatus.WALLET_INTERACTION_REJECTED,
                    }
                  : c
              )
            );
          }
          break;
        case PendingCommentStatus.WALLET_INTERACTION_SUCCESS: {
          setPendingComments((comments) =>
            comments.map((c, i) =>
              i === idx ? { ...c, status: PendingCommentStatus.TX_PENDING } : c
            )
          );
          break;
        }

        default:
          break;
      }
    });
  }, [pendingComments]);

  useEffect(() => {
    // @ts-ignore
    const handleMessage = (request, sender, sendResponse) => {
      if (request.type == MessageType.PONG_SEND_MESSAGE) {
        console.log("Received PONG_SEND_MESSAGE", request);
        if (request.isSuccess) {
          setPendingComments((comments) =>
            comments.map((c) =>
              c.internalId === request.internalId
                ? {
                    ...c,
                    status: PendingCommentStatus.WALLET_INTERACTION_SUCCESS,
                    txHash: request.tx,
                  }
                : c
            )
          );
        }

        if (!request.isSuccess) {
          setPendingComments((comments) =>
            comments.map((c) =>
              c.internalId === request.internalId
                ? {
                    ...c,
                    status: PendingCommentStatus.WALLET_INTERACTION_REJECTED,
                  }
                : c
            )
          );
        }
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
    setPendingComments((pendingComments) => [
      ...pendingComments,
      {
        url: {
          value: input.url,
          hash: keccak256(toHex(input.url)),
        },
        comment: {
          value: input.messageContent,
          hash: keccak256(toHex(input.messageContent)),
        },
        txHash: null,
        internalId: ulid(),
        status: PendingCommentStatus.BEFORE_WALLET_INTERACTION,
      },
    ]);
  };

  return { isPending, sendMessage };
};

export default useSendMessage;
