// import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const urlAtom = atomWithStorage<string | null>("url", null);
