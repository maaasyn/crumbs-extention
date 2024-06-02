import { Message } from "@/components/types";
import useCurrentUrl from "@/hooks/useGetUrl";
import { getOffChainClient } from "@/offchain/client";
import {
  CRUMBS_CONTRACT_ABI,
  CRUMBS_CONTRACT_ADDRESS,
} from "@/on-chain/contract/details";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export function keccakHashResolver(keccak: string): string {
  switch (keccak) {
    case "0x903618ee4423de6b15c1c05aaa9e60457558a25fef1e8620436245656021e3a7":
      return "freedom at all costs";
    case "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658":
      return "test";
    default:
      return keccak;
  }
}

export const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const url = useCurrentUrl();

  const offchainClient = getOffChainClient();

  const loadComments = async () => {
    const client = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    // console.log("url again", url);
    const data = await client.readContract({
      address: CRUMBS_CONTRACT_ADDRESS,
      abi: CRUMBS_CONTRACT_ABI,
      functionName: "getCommentsByUrl",
      args: [url!],
    });

    const dataResolved = await Promise.all(
      data.map(offchainClient.getHashValue)
    );

    console.log("Data resolved", dataResolved);

    setIsLoading(false);
    setMessages(
      dataResolved.map((message) => ({
        address:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        text: message,
      }))
    );
  };

  useEffect(() => {
    if (!url) return;

    console.log("Fetching messages for url", url);

    const fetchData = async () => {
      await loadComments();
    };

    fetchData();
  }, [url]);

  return { messages, setMessages, refresh: loadComments, isLoading };
};
