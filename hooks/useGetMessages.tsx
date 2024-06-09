import { Message } from "@/components/types";
import useCurrentUrl from "@/hooks/useGetUrl";
import { getOffChainClient } from "@/offchain/client";
import {
  CRUMBS_CONTRACT_ABI,
  CRUMBS_CONTRACT_ADDRESS,
} from "@/on-chain/contract/details";
import { createPublicClient, http, keccak256, toHex } from "viem";

import { useQuery } from "@tanstack/react-query";
import { useSelectedChainsToReadFrom } from "@/hooks/useSelectedChainsToReadFrom";

const uint96ToTimestamp = (uint96: bigint): number => {
  // take first 40 bits
  const timestamp = Number(uint96 >> BigInt(56));

  return timestamp;
};

export const useGetMessages = () => {
  const { chain } = useSelectedChainsToReadFrom();
  const url = useCurrentUrl();
  const offchainClient = getOffChainClient();

  const client = createPublicClient({
    chain,
    transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
  });

  const { data, error, refetch, isLoading, isFetched, isPending, isFetching } =
    useQuery({
      queryKey: ["messages", url],
      queryFn: async (): Promise<Message[]> => {
        const data = await client.readContract({
          address: CRUMBS_CONTRACT_ADDRESS,
          abi: CRUMBS_CONTRACT_ABI,
          functionName: "getAllCommentsByCrumbCommitment",
          args: [keccak256(toHex(url!))],
        });

        const resolvedDictionary = await offchainClient.getHashValues(
          data.map((comment) => comment.commentHash)
        );
        const dataResolved = data.map((comment) => ({
          address: comment.user,
          text: resolvedDictionary[comment.commentHash] ?? comment.commentHash,
          restData: comment.additionalData,
        }));

        return dataResolved.map((message) => ({
          address: message.address,
          text: message.text,
          timestamp: uint96ToTimestamp(message.restData),
          fromChain: chain,
        }));
      },
      enabled: !!url, // only run the query if `url` is defined
    });

  return {
    messages: data || [],
    refresh: refetch,
    isLoading,
  };
};
