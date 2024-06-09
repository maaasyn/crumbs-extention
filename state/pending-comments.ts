import { atomWithStorage } from "jotai/utils";

export enum PendingCommentStatus {
  "BEFORE_WALLET_INTERACTION" = "BEFORE_WALLET_INTERACTION",
  "ON_WALLET" = "ON_WALLET",
  "WALLET_INTERACTION_SUCCESS" = "WALLET_INTERACTION_SUCCESS",
  "WALLET_INTERACTION_REJECTED" = "WALLET_INTERACTION_REJECTED",
  "TX_PENDING" = "TX_PENDING",
  "TX_SUCCESS" = "TX_SUCCESS",
  "TX_REJECT" = "TX_REJECT",
}

export type PendingComment = {
  internalId: string;
  url: { value: string; hash: string };
  comment: { value: string; hash: string };
  txHash: string | null;
  status: PendingCommentStatus;
};

export const pendingCommentsAtom = atomWithStorage<PendingComment[]>(
  "pendingComments",
  []
);
