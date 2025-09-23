'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';
import { useSwitchChain } from 'wagmi';

// ✅ POPRAWNY ABI - based na bytecode analysis
const BADGE_ABI = [
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "newCount", "type": "uint256"}],
    "name": "updateBandCount", 
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "userBandCount", // ✅ This is the mapping in storage
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "hasBadge", // ✅ mapping(address => bool) hasBadge
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
  
  const { writeContract, data: txHash } = useWriteContract();
  const { isSuccess: txSuccess, isLoading: txPending } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // ✅ POPRAWNE READ CALLS
  const { data: baseBandCount, refetch: refetchBaseBandCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'userBandCount', // ✅ This exists in contract
    args: [address as `0x${string}`],
    chainId: 8453
  });

  const { data: hasBadge, refetch: refetchHasBadge } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BADGE_ABI,
    functionName: 'hasBadge', // ✅ This might exist
    args: [address as `0x${string}`],
    chainId: 8453
  });

  // ✅ AUTO REFRESH after transaction
  useEffect(() => {
    if (txSuccess) {
      console.log('🎉 Transaction confirmed! Refreshing states...');
      setTimeout(() => {
        refetchBaseBandCount();
        refetchHasBadge();
        setClaiming(false);
      }, 2000);
    }
  }, [txSuccess, refetchBaseBandCount, refetchHasBadge]);

  // ✅ SIMPLE BADGE LOGIC
  const needsSync = Number(baseBandCount || 0) !== optimismBandCount;
  const canClaimBadge = optimismBandCount >= 1 && !hasBadge; // Bronze at 1 band

  // ✅ CLAIM FUNCTION
  const handleClaimBadges = async () => {
    if (!needsSync && !canClaimBadge) {
      console.log('Nothing to claim');
      return;
    }
    
    setClaiming(true);
    
    try {
      console.log('🔄 Switching to Base...');
      await switchChain({ chainId: 8453 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('🏆 Updating band count to:', optimismBandCount);
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BADGE_ABI,
        functionName: 'updateBandCount',
        args: [address as `0x${string}`, BigInt(optimismBandCount)],
        chainId: 8453,
      });
      
      console.log('✅ Transaction submitted');
    } catch (error) {
      console.error('❌ Failed:', error);
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
        
        {(needsSync || canClaimBadge) && (
          <button 
            onClick={handleClaimBadges}
            disabled={claiming || txPending}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          >
            {claiming || txPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {txPending ? 'Confirming...' : 'Updating...'}
              </>
            ) : (
              <>🏆 UPDATE BADGES</>
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

      {/* ✅ SIMPLE BADGE DISPLAY */}
      <div className="badge-grid grid grid-cols-1 gap-4">
        <div className={`badge-card p-4 rounded-lg border transition-all duration-300 ${
          hasBadge 
            ? 'bg-gradient-to-br from-orange-600 to-orange-800 border-white/30 shadow-lg'
            : optimismBandCount >= 1
            ? 'bg-gradient-to-br from-orange-600 to-orange-800 border-green-400 shadow-lg animate-pulse'
            : 'bg-gray-800 border-gray-600 opacity-50'
        }`}>
          <div className="text-center">
            <div className="text-3xl mb-2">🥉</div>
            <div className="text-white font-bold text-sm mb-1">Metal Veteran Badge</div>
            <div className="text-white/80 text-xs mb-3">Added bands to blockchain</div>
            
            {hasBadge && (
              <div className="text-green-400 text-xs font-bold">✅ CLAIMED</div>
            )}
            
            {!hasBadge && optimismBandCount >= 1 && (
              <div className="text-green-400 text-xs font-bold animate-pulse">
                🎉 READY TO CLAIM!
              </div>
            )}
            
            {optimismBandCount === 0 && (
              <div className="text-gray-400 text-xs">Add bands to unlock</div>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-300 mb-2">
          <span>Progress</span>
          <span>{optimismBandCount} bands added</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-600 to-yellow-600 h-2 rounded-full transition-all duration-500"
            style={{ width: optimismBandCount > 0 ? '100%' : '0%' }}
          ></div>
        </div>
      </div>

      {/* Status */}
      {!needsSync && !canClaimBadge && (
        <div className="mt-4 text-center text-green-400 text-sm">
          🎯 Badge up to date!
        </div>
      )}
      
      {/* Debug */}
      <div className="mt-4 text-xs text-gray-500 border-t border-gray-600 pt-4">
        Debug: Badge:{String(hasBadge)} | Base:{Number(baseBandCount || 0)} | Optimism:{optimismBandCount} | Claiming:{String(claiming)}
      </div>
    </div>
  );
}

export default BadgeDisplay;
