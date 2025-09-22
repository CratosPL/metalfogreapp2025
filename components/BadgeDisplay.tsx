// components/BadgeDisplay.tsx
'use client';

import { useReadContract } from 'wagmi';

// ABI dla naszego kontraktu
const BADGE_ABI = [
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserBandCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "hasBronzeBadge", 
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

interface BadgeDisplayProps {
  address: string;
}

export function BadgeDisplay({ address }: BadgeDisplayProps) {
  const CONTRACT_ADDRESS = '0xC67ffAd6e443D76Daa242b6Bbcd395Ebe840cF38' // ✅ BASE MAINNET
  
  // Sprawdź ile zespołów ma user
  const { data: bandCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'getUserBandCount',
    args: [address as `0x${string}`],
    chainId: 8453 // Base mainnet
  });

  // Sprawdź czy ma Bronze Badge  
  const { data: hasBronze } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasBronzeBadge',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  if (!address) return null;

  return (
    <div className="badge-container p-4 bg-black/20 rounded-lg border border-gray-700">
      <h3 className="text-white text-lg font-bold mb-4">
        🏅 Your Metal Badges
      </h3>
      
      <div className="badge-stats mb-4">
        <p className="text-gray-300">
          Bands Added: <span className="text-white font-bold">{bandCount?.toString() || '0'}</span>
        </p>
      </div>

      <div className="badge-grid">
        {hasBronze ? (
          <div className="badge-card bg-gradient-to-br from-orange-600 to-orange-800 p-3 rounded-lg border border-orange-500">
            <div className="text-center">
              <div className="text-2xl mb-1">🥉</div>
              <div className="text-white font-bold text-sm">Bronze Veteran</div>
              <div className="text-orange-200 text-xs">First band added</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            Add your first band to earn the Bronze Veteran badge! 🥉
          </div>
        )}
      </div>
    </div>
  );
}

export default BadgeDisplay;
