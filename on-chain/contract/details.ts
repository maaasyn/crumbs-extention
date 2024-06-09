import { ChainNameToId } from "@/on-chain/chains";

export const CRUMBS_CONTRACT_ADDRESS =
  "0x57A74872eEdd6aA8a80Fb625db13c1ee5a9B51Fe";

export const CRUMBS_CONTRACT_ETH_SEPOLIA = {
  address: CRUMBS_CONTRACT_ADDRESS,
  chainId: ChainNameToId.ETH_SEPOLIA,
} as const;

export const CRUMBS_CONTRACT_ABI = [
  {
    type: "function",
    name: "commentsByCrumbCommitment",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "commentHash", type: "bytes32", internalType: "bytes32" },
      { name: "user", type: "address", internalType: "address" },
      { name: "additionalData", type: "uint96", internalType: "uint96" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllCommentsByCrumbCommitment",
    inputs: [{ name: "_commitment", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Crumbs.Comment[]",
        components: [
          { name: "commentHash", type: "bytes32", internalType: "bytes32" },
          { name: "user", type: "address", internalType: "address" },
          { name: "additionalData", type: "uint96", internalType: "uint96" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getComment",
    inputs: [
      { name: "_commitment", type: "bytes32", internalType: "bytes32" },
      { name: "index", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint96", internalType: "uint96" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCommentsByUrlHash",
    inputs: [{ name: "_commitment", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Crumbs.Comment[]",
        components: [
          { name: "commentHash", type: "bytes32", internalType: "bytes32" },
          { name: "user", type: "address", internalType: "address" },
          { name: "additionalData", type: "uint96", internalType: "uint96" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCurrentTimestamp",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "packAdditionalData",
    inputs: [
      { name: "timestamp", type: "uint40", internalType: "uint40" },
      { name: "rest", type: "uint56", internalType: "uint56" },
    ],
    outputs: [{ name: "", type: "uint96", internalType: "uint96" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "storeComment",
    inputs: [
      { name: "_commitment", type: "bytes32", internalType: "bytes32" },
      { name: "_commentHash", type: "bytes32", internalType: "bytes32" },
      { name: "_additionalData", type: "uint96", internalType: "uint96" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "storeCommentAndReplaceTimestamp",
    inputs: [
      { name: "_commitment", type: "bytes32", internalType: "bytes32" },
      { name: "_commentHash", type: "bytes32", internalType: "bytes32" },
      { name: "_additionalData", type: "uint96", internalType: "uint96" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "storeCommentRaw",
    inputs: [
      { name: "_commitment", type: "bytes32", internalType: "bytes32" },
      { name: "_commentHash", type: "bytes32", internalType: "bytes32" },
      { name: "_additionalData", type: "uint96", internalType: "uint96" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unpackAdditionalData",
    inputs: [{ name: "data", type: "uint96", internalType: "uint96" }],
    outputs: [
      { name: "timestamp", type: "uint40", internalType: "uint40" },
      { name: "rest", type: "uint56", internalType: "uint56" },
    ],
    stateMutability: "pure",
  },
  {
    type: "event",
    name: "CommentStored",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "commentHash",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      { name: "user", type: "address", indexed: true, internalType: "address" },
      {
        name: "additionalData",
        type: "uint96",
        indexed: false,
        internalType: "uint96",
      },
      {
        name: "commentIndex",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
