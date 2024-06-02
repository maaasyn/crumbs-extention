// import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// url -> account
export const urlAccountMapAtom = atomWithStorage<Record<string, string | null>>(
  "urlAccountMap",
  {}
);
