import { sepolia } from "viem/chains";

export type Message = {
  address: string;
  text: string;
  timestamp: number;
  fromChain: typeof sepolia;
};

export enum Tabs {
  CHAT = "Chat",
  SETTINGS = "Settings",
}

export const MOCK_MESSAGES_POEM: Message[] = [
  {
    address: "0x1733b3e31118FB04D48d16E1aE9194Eb3Fcda5eF",
    text: "Siemanko",
    timestamp: 1717621010,
    fromChain: sepolia,
  },

  {
    address: "0x6beF2c00883443bD3D5D2353a4325D3718FeC2eb",
    text: "no hej witam",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x1733b3e31118FB04D48d16E1aE9194Eb3Fcda5eF",
    text: "i o zdrowie pytam",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x6beF2c00883443bD3D5D2353a4325D3718FeC2eb",
    text: "a co u ciebie słychać?",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x1733b3e31118FB04D48d16E1aE9194Eb3Fcda5eF",
    text: "a no nic, siedzę sobie",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x1733b3e31118FB04D48d16E1aE9194Eb3Fcda5eF",
    text: "i zmieniam opis na gg",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x1733b3e31118FB04D48d16E1aE9194Eb3Fcda5eF",
    text: "bo jestem stary jak węgiel",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x1733b3e31118FB04D48d16E1aE9194Eb3Fcda5eF",
    text: "i odczuwam przemijanie",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x1733b3e31118FB04D48d16E1aE9194Eb3Fcda5eF",
    text: "i ja też się zmieniam, zarówno ja jak i mój opis. Taka jest natura rzeczy, bez zmian nie ma życia. Zmiana to jedyna stała rzecz w życiu. Zmiana to życie. To chyba będzie mój opis na dziś. Zmiana to życie w niewyobrażalej ilości permutacji.",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x6beF2c00883443bD3D5D2353a4325D3718FeC2eb",
    text: "no to zmień sobie",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x6beF2c00883443bD3D5D2353a4325D3718FeC2eb",
    text: "ja ide na bojo",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0x6beF2c00883443bD3D5D2353a4325D3718FeC2eb",
    text: "zaraz bede",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
  {
    address: "0xc1da17e887d720bd936e9f28cfca530d7605dbce",
    text: "widziano 15 lat temu",
    timestamp: 1717621010,
    fromChain: sepolia,
  },
];
