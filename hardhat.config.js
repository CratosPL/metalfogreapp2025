require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env.deployment" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "optimism-goerli": {
      url: "https://goerli.optimism.io", 
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 420,
    },
    optimism: {
      url: "https://mainnet.optimism.io",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 10,
    },
    base: {
      url: "https://mainnet.base.org",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 8453,
    }
  },
  etherscan: {
    apiKey: {
      optimism: ETHERSCAN_API_KEY,
      base: "NOKEY", // Base nie wymaga API key
    },
    customChains: [
      {
        network: "optimism-goerli", 
        chainId: 420,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api",
          browserURL: "https://goerli-optimism.etherscan.io"
        }
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  },
};
