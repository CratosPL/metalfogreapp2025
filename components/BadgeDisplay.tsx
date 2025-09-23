'use client';

import { useReadContract, useWriteContract } from 'wagmi';
import { useState } from 'react';
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
  optimismBandCount?: number;
}

export function BadgeDisplay({ address, optimismBandCount = 0 }: BadgeDisplayProps) {
  const CONTRACT_ADDRESS = '0xFA45e05917c220116b58E043F1CE60a8b1C11365';
  const { switchChain } = useSwitchChain();
  const [claiming, setClaiming] = useState(false);
  
  // Read current states from Base
  const { data: baseBandCount, refetch: refetchBaseBandCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'getUserBandCount',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { data: hasBronze, refetch: refetchBronze } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasBronzeBadge',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { data: hasSilver, refetch: refetchSilver } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasSilverBadge',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { data: hasGold, refetch: refetchGold } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasGoldBadge',
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { writeContract } = useWriteContract();

  // ✅ SMART LOGIC - check what badges user can claim
  const canClaimBronze = optimismBandCount >= 1 && !hasBronze;
  const canClaimSilver = optimismBandCount >= 5 && !hasSilver;
  const canClaimGold = optimismBandCount >= 10 && !hasGold;
  
  // ✅ Only show sync if counts don't match OR can claim new badges
  const needsSync = Number(baseBandCount || 0) !== optimismBandCount;
  const hasUnclaimedBadges = canClaimBronze || canClaimSilver || canClaimGold;

  // ✅ Define badge states
  const badges = [
    {
      id: 'bronze',
      name: 'Bronze Veteran',
      icon: '🥉',
      description: 'First band added to blockchain',
      threshold: 1,
      claimed: !!hasBronze,
      canClaim: canClaimBronze,
      gradient: 'from-orange-600 to-orange-800'
    },
    {
      id: 'silver',
      name: 'Silver Contributor',
      icon: '🥈',
      description: '5 bands added to the underground',
      threshold: 5,
      claimed: !!hasSilver,
      canClaim: canClaimSilver,
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      id: 'gold',
      name: 'Gold Archivist',
      icon: '🥇',
      description: '10 bands - true metal encyclopedia',
      threshold: 10,
      claimed: !!hasGold,
      canClaim: canClaimGold,
      gradient: 'from-yellow-400 to-yellow-600'
    }
  ];

  // ✅ CLAIM BADGES - only when new badges available
  const handleClaimBadges = async () => {
    if (!hasUnclaimedBadges && !needsSync) {
      console.log('No badges to claim and counts match');
      return;
    }
    
    setClaiming(true);
    
    try {
      // Switch to Base
      await switchChain({ chainId: 8453 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update band count on Base (this will trigger badge minting in contract)
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BADGE_ABI,
        functionName: 'updateBandCount',
        args: [address as `0x${string}`, BigInt(optimismBandCount)],
        chainId: 8453,
      });
      
      // ✅ Refetch all badge states after transaction
      setTimeout(() => {
        refetchBaseBandCount();
        refetchBronze();
        refetchSilver();
        refetchGold();
      }, 3000);
      
    } catch (error) {
      console.error('Badge claim failed:', error);
    } finally {
      setClaiming(false);
    }
  };

  if (!address) return null;

  return (
    <div className="badge-container p-6 bg-black/20 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-bold flex items-center gap-2">
          🏅 Your Metal Badges
        </h3>
        
        {/* ✅ ONLY SHOW BUTTON when there's something to claim */}
        {(hasUnclaimedBadges || needsSync) && (
          <button 
            onClick={handleClaimBadges}
            disabled={claiming}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 animate-pulse"
          >
            {claiming ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Claiming...
              </>
            ) : hasUnclaimedBadges ? (
              <>
                🏆 CLAIM NEW BADGES!
              </>
            ) : (
              <>
                🔄 Sync Count
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
            {Number(baseBandCount || 0) === optimismBandCount && (
              <span className="text-green-400 ml-2">✅ Synced</span>
            )}
          </p>
        </div>
      </div>

      {/* ✅ BADGE GRID */}
      <div className="badge-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id}
            className={`badge-card p-4 rounded-lg border transition-all duration-300 ${
              badge.claimed 
                ? `bg-gradient-to-br ${badge.gradient} border-white/30 shadow-lg` 
                : badge.canClaim
                ? `bg-gradient-to-br ${badge.gradient} border-green-400 shadow-lg animate-pulse`
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
                <div className="text-green-400 text-xs font-bold animate-pulse">
                  🎉 READY TO CLAIM!
                </div>
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

      {/* Progress Bar */}
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

      {/* ✅ STATUS MESSAGE */}
      {!hasUnclaimedBadges && Number(baseBandCount || 0) === optimismBandCount && (
        <div className="mt-4 text-center text-green-400 text-sm">
          🎯 All badges up to date! Add more bands to unlock new badges.
        </div>
      )}
    </div>
  );
}

export default BadgeDisplay;
