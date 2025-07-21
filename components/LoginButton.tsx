'use client';

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

export default function LoginButton() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-300">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button 
          onClick={() => open({ view: 'Account' })}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-bold text-white uppercase tracking-wider transition-all duration-200"
        >
          Profile
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => open()}
      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-2 text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 border border-red-500 shadow-lg hover:shadow-red-500/50"
    >
      Connect Wallet
    </button>
  );
}
