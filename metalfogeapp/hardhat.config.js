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
      gasPrice: 1000000000, // 1 gwei
    },
    optimism: {
      url: "https://mainnet.optimism.io",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 10,
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "optimism-goerli", 
        chainId: 420,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api",
          browserURL: "https://goerli-optimism.etherscan.io"
        }
      }
    ]
  },
};
