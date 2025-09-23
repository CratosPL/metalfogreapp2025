'use client';

import { useReadContract, useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';
import { useSwitchChain } from 'wagmi';

const BADGE_ABI = [
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserBandCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "newCount", "type": "uint256"}],
    "name": "updateBandCount", 
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "hasBronzeBadge", 
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "hasSilverBadge", 
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "hasGoldBadge", 
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

interface BadgeDisplayProps {
  address: string;
  optimismBandCount?: number; // ✅ Get from Optimism contract
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  threshold: number;
  claimed: boolean;
  canClaim: boolean;
  gradient: string;
}

export function BadgeDisplay({ address, optimismBandCount = 0 }: BadgeDisplayProps) {
  const CONTRACT_ADDRESS = '0xFA45e05917c220116b58E043F1CE60a8b1C11365';
  const { switchChain } = useSwitchChain();
  const [syncingBadges, setSyncingBadges] = useState(false);
  
  // ✅ Read current badge states from Base
  const { data: baseBandCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'getUserBandCount',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { data: hasBronze } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasBronzeBadge',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { data: hasSilver } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasSilverBadge',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { data: hasGold } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasGoldBadge',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { writeContract } = useWriteContract();

  // ✅ Define badge thresholds
  const badges: Badge[] = [
    {
      id: 'bronze',
      name: 'Bronze Veteran',
      icon: '🥉',
      description: 'First band added to blockchain',
      threshold: 1,
      claimed: !!hasBronze,
      canClaim: optimismBandCount >= 1 && !hasBronze,
      gradient: 'from-orange-600 to-orange-800'
    },
    {
      id: 'silver',
      name: 'Silver Contributor',
      icon: '🥈',
      description: '5 bands added to the underground',
      threshold: 5,
      claimed: !!hasSilver,
      canClaim: optimismBandCount >= 5 && !hasSilver,
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      id: 'gold',
      name: 'Gold Archivist',
      icon: '🥇',
      description: '10 bands - true metal encyclopedia',
      threshold: 10,
      claimed: !!hasGold,
      canClaim: optimismBandCount >= 10 && !hasGold,
      gradient: 'from-yellow-400 to-yellow-600'
    }
  ];

  // ✅ Sync Optimism count to Base contract
  const handleSyncBadges = async () => {
    setSyncingBadges(true);
    
    try {
      // Switch to Base
      await switchChain({ chainId: 8453 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update band count on Base contract
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BADGE_ABI,
        functionName: 'updateBandCount',
        args: [address as `0x${string}`, BigInt(optimismBandCount)],
        chainId: 8453,
      });
      
    } catch (error) {
      console.error('Badge sync failed:', error);
    } finally {
      setSyncingBadges(false);
    }
  };

  // ✅ Check if sync is needed
  const needsSync = Number(baseBandCount || 0) !== optimismBandCount;

  if (!address) return null;

  return (
    <div className="badge-container p-6 bg-black/20 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-bold flex items-center gap-2">
          🏅 Your Metal Badges
        </h3>
        
        {/* ✅ SYNC BUTTON instead of Test Badge */}
        {needsSync && (
          <button 
            onClick={handleSyncBadges}
            disabled={syncingBadges}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {syncingBadges ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Syncing...
              </>
            ) : (
              <>
                🔄 Sync Badges ({optimismBandCount} bands)
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="badge-stats mb-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-300">
            Optimism Bands: <span className="text-white font-bold">{optimismBandCount}</span>
          </p>
        </div>
        <div>
          <p className="text-gray-300">
            Base Count: <span className="text-white font-bold">{Number(baseBandCount || 0)}</span>
          </p>
        </div>
      </div>

      {/* ✅ BADGE GRID - Auto show available badges */}
      <div className="badge-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id}
            className={`badge-card p-4 rounded-lg border transition-all duration-300 ${
              badge.claimed 
                ? `bg-gradient-to-br ${badge.gradient} border-white/30 shadow-lg` 
                : badge.canClaim
                ? `bg-gradient-to-br ${badge.gradient} border-white/50 shadow-lg animate-pulse`
                : 'bg-gray-800 border-gray-600 opacity-50'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{badge.icon}</div>
              <div className="text-white font-bold text-sm mb-1">{badge.name}</div>
              <div className="text-white/80 text-xs mb-3">{badge.description}</div>
              
              {badge.claimed && (
                <div className="text-green-400 text-xs font-bold">✅ CLAIMED</div>
              )}
              
              {badge.canClaim && !badge.claimed && (
                <button 
                  onClick={handleSyncBadges}
                  disabled={syncingBadges}
                  className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded transition-colors duration-300 disabled:opacity-50"
                >
                  {syncingBadges ? 'Claiming...' : 'CLAIM BADGE!'}
                </button>
              )}
              
              {!badge.canClaim && !badge.claimed && (
                <div className="text-gray-400 text-xs">
                  Need {badge.threshold} bands ({badge.threshold - optimismBandCount} more)
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ PROGRESS BAR */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-300 mb-2">
          <span>Badge Progress</span>
          <span>{optimismBandCount}/10 bands</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-600 to-yellow-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (optimismBandCount / 10) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default BadgeDisplay;
