import { ethers } from "ethers";

// Contract ABIs
export const STABLECOIN_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "deny",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "rely",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "wards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const VAT_ABI = [
  {
    inputs: [],
    name: "Line",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "ilks",
    outputs: [
      {
        internalType: "uint256",
        name: "Art",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "spot",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "line",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dust",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "urns",
    outputs: [
      {
        internalType: "uint256",
        name: "ink",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "art",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "gem",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "dai",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "i",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "u",
        type: "address",
      },
      {
        internalType: "address",
        name: "v",
        type: "address",
      },
      {
        internalType: "address",
        name: "w",
        type: "address",
      },
      {
        internalType: "int256",
        name: "dink",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "dart",
        type: "int256",
      },
    ],
    name: "frob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rad",
        type: "uint256",
      },
    ],
    name: "move",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "hope",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "rely",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "deny",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "what",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "data",
        type: "uint256",
      },
    ],
    name: "file",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const SPOT_ABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "ilks",
    outputs: [
      {
        internalType: "contract PipLike",
        name: "pip",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "mat",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32",
      },
    ],
    name: "poke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "rely",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "what",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "file",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const JOIN_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "join",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "exit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const DAI_JOIN_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "join",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "exit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const ERC20_ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Contract addresses for deployed Sepolia contracts
export const CONTRACT_ADDRESSES = {
  // Ethereum Sepolia - Amaz-One Dollar System
  sepolia: {
    // Core System
    vat: "0x7E198F35577fCbaA93c9Cf983A8d9d96979cdD25",
    stablecoin: "0x3B3Dc8305bd491cffe41DC955C0fCa16bfbE1E3A",
    spot: "0x8583bcD939571Eaa21D9BBfDCc82e7A0Fda2c38f",
    pot: "0x34C886c7C6407A65d193DF006f3Ef600e9b992d7",
    dog: "0x75af7fF5098beCBA8a8d483bEfd11ed12ad9525F",
    jug: "0x1Db55dA3a3eD1BC092E297A5D166C9F1d4EC0283",
    vow: "0x171949B94fE913a21BCD1Fb97dC1F08359C3b8Bc",
    daiJoin: "0xd8D7Ab4762e0d70DdCDEF22f757c5662E1488dB8",
    
    // Environmental Token Addresses
    cbiomehToken: "0x56050c12F0571DdA13621cBcb7c1c333EA4842BB",
    
    // Collateral Join Contracts
    cbiomehJoin: "0xBafCF10F52e206c67De3cd82951088f94d3fC6F5",
    
    // Auction Mechanisms
    cbiomehClipper: "0x65FCfFDA4E4DA7562DECb4347e0B7b8BD440FB44",
    
    // Faucet
    cbiomehFaucet: "0xc6a75D90B155C151D4ab564587972D4AA608f7e7",
    // ETH Faucet (Sepolia ETH drip)
    ethFaucet: "0xDc8E20701103C5B1Ef9134B1BBd85F4Ba0Cfc77B",
  },
};

// Collateral types for Brazilian Environmental Tokens
export const COLLATERAL_TYPES = {
  CBiomaH: ethers.encodeBytes32String("CBiomaH"),
};

// Constants
export const WAD = ethers.parseUnits("1", 18);
export const RAY = ethers.parseUnits("1", 27);
export const RAD = ethers.parseUnits("1", 45);

// Export contracts for Sepolia (current deployment)
export const CONTRACTS = CONTRACT_ADDRESSES.sepolia;

// Export ILK constants for environmental tokens
export const ILK_CBiomaH = COLLATERAL_TYPES.CBiomaH;

// Environmental token information
export const ENVIRONMENTAL_TOKENS = {
  CBiomaH: {
    name: "BiomeH Credit",
    symbol: "CBiomaH",
    description: "Backed by biome H conservation credits",
    address: CONTRACT_ADDRESSES.sepolia.cbiomehToken,
    joinAddress: CONTRACT_ADDRESSES.sepolia.cbiomehJoin,
    clipperAddress: CONTRACT_ADDRESSES.sepolia.cbiomehClipper,
  },
};

// Faucet ABI for claim UI
export const FAUCET_ABI = [
  { inputs: [{ name: "_token", type: "address" }], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "claim", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "claimAmount", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "cooldown", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "enabled", outputs: [{ type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "who", type: "address" }], name: "lastClaim", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "owner", outputs: [{ type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "token", outputs: [{ type: "address" }], stateMutability: "view", type: "function" },
];

// ETH Faucet ABI
export const ETH_FAUCET_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "claim", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "user", type: "address" }], name: "canClaim", outputs: [{ type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "user", type: "address" }], name: "getClaimTimeRemaining", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "enabled", outputs: [{ type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "CLAIM_AMOUNT", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "COOLDOWN", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "owner", outputs: [{ type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "_enabled", type: "bool" }], name: "setEnabled", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
];

