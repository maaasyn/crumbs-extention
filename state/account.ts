// import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const accountAtom = atomWithStorage<string | null>("account", null);
