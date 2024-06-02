// import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type PendingComment = {
  url: string;
  comment: string;
  txHash: string;
};

export const pendingCommentsAtom = atomWithStorage<PendingComment[]>(
  "pendingComments",
  []
);
