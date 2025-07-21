'use client';

import { wagmiAdapter, projectId } from '@/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { optimism } from '@reown/appkit/networks'; // TYLKO MAINNET
import React, { ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: "Metal Forge",
  description: "Underground Metal Community Platform",
  url: process.env.NODE_ENV === 'production' 
    ? "https://metalforge.com" 
    : "http://localhost:3000",
  icons: ["/logometalforge.jpeg"]
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [optimism], // ✅ Tylko mainnet
  defaultNetwork: optimism, // ✅ Mainnet jako default
  metadata,
  features: {
    socials: ['google', 'github', 'apple', 'facebook'],
    email: true,
    analytics: true
  }
});

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
