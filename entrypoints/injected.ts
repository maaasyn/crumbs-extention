import {
  CRUMBS_CONTRACT_ABI,
  CRUMBS_CONTRACT_ETH_SEPOLIA,
} from "@/on-chain/contract/details";
import { MessageType } from "@/utils/types";
import { createStore } from "mipd";
import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  getContract,
  http,
  keccak256,
  toHex,
} from "viem";
import { sepolia } from "viem/chains";

const FROM = "injected";
const F = `[${FROM}]`;

export default defineUnlistedScript({
  async main() {
    let messagesCount = 0;
    // // send log each 2 seconds

    // setInterval(() => {
    //   console.log(F, "Messages counter:", messagesCount);
    // }, 2000);

    // console.log(F, "Hello injected.");
    const store = createStore();

    // Listen for messages from the popup script
    window.addEventListener("message", async function (event) {
      // We only accept messages from ourselves
      if (event.source != window) return;

      if (event.data.type && event.data.type == MessageType.GET_ACCOUNT) {
        console.log("Received getAccount message in injected script");

        const providers = await store.getProviders();

        const firstProvider = providers.at(0);

        if (!firstProvider) {
          console.error(F, "No provider found.");
          return;
        }

        const accounts = await firstProvider.provider.request({
          method: "eth_requestAccounts",
        });

        console.log(F, { accounts });

        // Send a response
        window.postMessage(
          { type: MessageType.PONG_SEND_ACCOUNT, account: accounts[0] },
          "*"
        );
      }

      if (event.data.type && event.data.type == MessageType.SEND_MESSAGE) {
        const eventData = {
          type: MessageType.SEND_MESSAGE,
          message: event.data.message as string,
          from: event.data.from as `0x${string}`,
        };

        const contract = getContract({
          abi: CRUMBS_CONTRACT_ABI,
          address: CRUMBS_CONTRACT_ETH_SEPOLIA.address,
          client: createPublicClient({
            chain: sepolia,
            transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
          }),
        });

        const url = window.location.href;

        const encodedFn = encodeFunctionData({
          abi: contract.abi,
          functionName: "storeComment",
          args: [
            keccak256(toHex(url)),
            keccak256(toHex(eventData.message)),
            0n,
          ],
        });

        const providers = await store.getProviders();

        const firstProvider = providers.at(0);

        if (!firstProvider) {
          console.error(F, "No provider found.");
          return;
        }

        const wallet = createWalletClient({
          transport: custom(firstProvider.provider),
          chain: sepolia,
          account: eventData.from,
        });

        try {
          const tx = await wallet.sendTransaction({
            to: contract.address,
            data: encodedFn,
          });

          messagesCount++;

          window.postMessage(
            {
              type: MessageType.PONG_SEND_MESSAGE,
              tx,
              isSuccess: true,
              error: null,
              internalId: event.data.internalId,
            },
            "*"
          );
        } catch (e) {
          console.warn(F, "Error sending transaction:", e);

          messagesCount++;

          window.postMessage(
            {
              type: MessageType.PONG_SEND_MESSAGE,
              tx: null,
              isSuccess: false,
              error: e,
              internalId: event.data.internalId,
            },
            "*"
          );
        }

        // const tx = await firstProvider.provider.request({
        //   method: "eth_sendTransaction",
        //   params: [
        //     {
        //       from: eventData.from,
        //       to: contract.address,
        //       data: encodedFn,
        //     },
        //   ],
        // });
      }
    });

    // window.addEventListener("eip6963:announceProvider", (data) => {
    //   console.log(F, `[${FROM}]`, { data });
    // });

    // window.dispatchEvent(new CustomEvent("eip6963:requestProvider"));
  },
});
