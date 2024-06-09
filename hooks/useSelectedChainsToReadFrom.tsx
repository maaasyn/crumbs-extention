import { allSupportedChains } from "@/utils/suppertedChains";

export const useSelectedChainsToReadFrom = () => {
  const chains = allSupportedChains;

  return { chains, chain: chains[0] };
};
