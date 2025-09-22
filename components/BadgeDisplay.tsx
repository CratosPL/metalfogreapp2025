'use client';

import { useReadContract, useWriteContract } from 'wagmi';
import { useState } from 'react';

// ABI dla naszego Base kontraktu
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
  // 🚀 UPDATED CONTRACT ADDRESS - Base Network
  const CONTRACT_ADDRESS = '0xFA45e05917c220116b58E043F1CE60a8b1C11365'
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Sprawdź ile zespołów ma user
  const { data: bandCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'getUserBandCount',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  // Sprawdź czy ma Bronze Badge  
  const { data: hasBronze } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasBronzeBadge',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  // Write contract dla testowania
  const { writeContract } = useWriteContract();

// Lub usuń gas limit całkowicie (wagmi ustali automatycznie):
const handleTestBadge = async () => {
  if (!address) return;
  
  setIsUpdating(true);
  try {
    await writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: [{
        "inputs": [{"name": "user", "type": "address"}, {"name": "newCount", "type": "uint256"}],
        "name": "updateBandCount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      functionName: 'updateBandCount',
      args: [address as `0x${string}`, BigInt(1)], // ✅ Główna oszczędność tutaj!
      chainId: 8453,
      // No gas limit - wagmi will estimate
    });
  } catch (error) {
    console.error('Badge update failed:', error);
  } finally {
    setIsUpdating(false);
  }
};



  if (!address) return null;

  return (
    <div className="badge-container p-4 bg-black/20 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-bold">
          🏅 Your Metal Badges
        </h3>
        {/* TEST BUTTON */}
        <button 
          onClick={handleTestBadge}
          disabled={isUpdating}
          className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 disabled:opacity-50"
        >
          {isUpdating ? 'Updating...' : 'Test Badge ($0.10)'}
        </button>
      </div>
      
      <div className="badge-stats mb-4">
        <p className="text-gray-300">
          Bands Added: <span className="text-white font-bold">{bandCount?.toString() || '0'}</span>
        </p>
        <p className="text-gray-400 text-xs">
          Network: Base • Contract: {CONTRACT_ADDRESS.substring(0,10)}...
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
            <br />
            <span className="text-xs text-gray-500">Switch to Base network and click "Test Badge"!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BadgeDisplay;
