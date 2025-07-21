import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { optimism } from '@reown/appkit/networks';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// ✅ Custom Optimism z lepszymi RPC endpoints
const customOptimism = {
  ...optimism,
  rpcUrls: {
    default: {
      http: [
        'https://mainnet.optimism.io',
        'https://opt-mainnet.g.alchemy.com/v2/demo',
        'https://optimism.gateway.tenderly.co',
      ],
    },
    public: {
      http: [
        'https://mainnet.optimism.io',
        'https://opt-mainnet.g.alchemy.com/v2/demo',
      ],
    },
  },
};

export const networks = [customOptimism];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
});

export const config = wagmiAdapter.wagmiConfig;
