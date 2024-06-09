import {
  PendingComment,
  PendingCommentStatus,
  pendingCommentsAtom,
} from "@/state/pending-comments";
import { useAtom } from "jotai";
import { createPublicClient, http, keccak256, toHex } from "viem";
import { sepolia } from "viem/chains";
import { ulid } from "ulid";
import { useGetMessages } from "@/hooks/useGetMessages";
import { useEffect } from "react";

export const usePendingComments = (url: string | null) => {
  const { refresh } = useGetMessages();
  const removePendingComment = (internalId: string) => {
    setPendingComments((comments) =>
      comments.filter((comment) => comment.internalId !== internalId)
    );
  };

  const [pendingComments, setPendingComments] = useAtom(pendingCommentsAtom);

  const addComment = (comment: { url: string; comment: string }) => {
    const internalId = ulid();
    const pendingComment: PendingComment = {
      internalId,
      url: {
        value: comment.url,
        hash: keccak256(toHex(comment.url)),
      },
      comment: {
        value: comment.comment,
        hash: keccak256(toHex(comment.comment)),
      },
      txHash: null,
      status: PendingCommentStatus.BEFORE_WALLET_INTERACTION,
    };

    setPendingComments((comments) => [...comments, pendingComment]);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      pendingComments.forEach((comment) => {
        if (comment.status === PendingCommentStatus.TX_PENDING) {
          checkPendingCommentTxStatus(comment.txHash as `0x${string}`);
        }
      });
    }, 2500); // run every 5 seconds

    return () => clearInterval(interval); // clean up the interval on component unmount
  }, [pendingComments]);

  useEffect(() => {
    pendingComments.forEach((comment) => {
      if (comment.status === PendingCommentStatus.TX_SUCCESS) {
        removePendingComment(comment.internalId);
        refresh();
      }
    });
  }, [pendingComments]);

  const checkPendingCommentTxStatus = async (txHash: `0x${string}`) => {
    console.log("Im checking for real, i received: ", txHash);

    const client = createPublicClient({
      chain: sepolia,
      // transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
      transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
    });

    const receipt = await client
      .getTransactionReceipt({
        hash: txHash,
      })
      .then((x) => {
        console.log({ x });
        return x;
      });

    if (receipt.status === "success") {
      updatePendingComment(txHash, PendingCommentStatus.TX_SUCCESS);
    }

    console.log("checkPendingCommentTxStatus", receipt);
  };

  const updatePendingComment = (
    txHash: string,
    status: PendingComment["status"]
  ) => {
    setPendingComments((comments) =>
      comments.map((comment) =>
        comment.txHash === txHash ? { ...comment, status } : comment
      )
    );
  };

  return {
    pendingComments,
    addComment,
    updatePendingComment,
    removePendingComment,
    checkPendingCommentTxStatus,
  };
};
