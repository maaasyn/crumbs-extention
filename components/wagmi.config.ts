// import { createConfig, http } from "@wagmi/core";
// import { sepolia } from "@wagmi/core/chains";
// import { storage } from "wxt/storage";

// export const config = createConfig({
//   chains: [sepolia],
//   syncConnectedChain: true,
//   storage: {
//     key: "wagmi",
//     getItem: async (key) => storage.getItem(`local:${key}`) as Promise<any>,
//     setItem: async (key, value) =>
//       storage.setItem(`local:${key}`, value) as Promise<void>,
//     removeItem: async (key) =>
//       storage.removeItem(`local:${key}`) as Promise<void>,
//   },
//   transports: {
//     [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
//   },
// });

// config.subscribe((x) => x.status, console.log, { emitImmediately: true });
