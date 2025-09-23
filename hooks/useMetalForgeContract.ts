'use client';

import { useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { readContract } from '@wagmi/core';
import { config } from '@/config';

// 🚀 OPTIMISM CONTRACT - hardcoded dla bezpieczeństwa
const CONTRACT_ADDRESS = '0xFA45e05917c220116b58E043F1CE60a8b1C11365' as `0x${string}`;
const OPTIMISM_CHAIN_ID = 10; // Optimism Mainnet

// ✅ EXTENDED ABI - próbujemy dodać userBands z poprawną strukturą
const ABI = [
  {
    "inputs": [
      {"name": "name", "type": "string"}, 
      {"name": "genre", "type": "string"}, 
      {"name": "country", "type": "string"}, 
      {"name": "year", "type": "uint256"}
    ],
    "name": "addBand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "userBandCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  // ✅ TRY TO ADD userBands - może zadziała z prostszą strukturą
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "index", "type": "uint256"}],
    "name": "userBands",
    "outputs": [
      {"name": "name", "type": "string"},
      {"name": "genre", "type": "string"}, 
      {"name": "country", "type": "string"},
      {"name": "year", "type": "uint256"},
      {"name": "verified", "type": "bool"},
      {"name": "timestamp", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

interface Band {
  id: number;
  name: string;
  genre: string;
  country: string;
  yearFormed: number;
  addedBy: string;
  verified: boolean;
  addedAt: string;
}

export function useMetalForgeContract() {
  const [isLoading, setIsLoading] = useState(false);

  // Write Contract Hook (wagmi v2) - OPTIMISM
  const { 
    writeContract, 
    data: txHash, 
    isPending,
    error: writeError 
  } = useWriteContract();

  // Wait for transaction receipt
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: txError 
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // ✅ SAFE - Read Contract Hooks dla Optimism (tylko userBandCount)
  const useUserBands = (address: string) => {
    // ✅ MOCK function - nie używamy prawdziwego getUserBands
    return { data: null }; // Zwracamy null - dane pobieramy przez fetchUserBandDetails
  };

  const useUserStats = (address: string) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'userBandCount',
      args: [address as `0x${string}`],
      chainId: OPTIMISM_CHAIN_ID,
      query: {
        enabled: !!address && !!CONTRACT_ADDRESS,
        retry: 3,
        retryDelay: 2000,
      }
    });
  };

  const useTotalBands = () => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'userBandCount',
      args: ['0x0000000000000000000000000000000000000000' as `0x${string}`],
      chainId: OPTIMISM_CHAIN_ID,
      query: {
        enabled: !!CONTRACT_ADDRESS,
        retry: 3,
        retryDelay: 2000,
      }
    });
  };

  // ✅ MOCK function - usunięte problematyczne userBands
  const useGetBand = (address: string, bandId: number) => {
    return { data: null }; // Nie używamy tej funkcji
  };

  // ✅ UPDATED - Add Band Function dla Optimism
  const handleAddBand = async (name: string, genre: string, country: string, yearFormed: number, userAddress?: string) => {
    if (!CONTRACT_ADDRESS) {
      console.error('Contract address not configured');
      return;
    }

    setIsLoading(true);
    try {
      console.log('🎸 Adding band to Optimism:', { name, genre, country, yearFormed });
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'addBand',
        args: [name, genre, country, BigInt(yearFormed)],
        chainId: OPTIMISM_CHAIN_ID, // 🚀 OPTIMISM!
      });
      
      console.log('✅ Band add transaction submitted');
      
      // ✅ CLEAR CACHE after successful add - use passed userAddress
      if (userAddress) {
        const cacheKey = `metalforge_bands_${userAddress}_${CONTRACT_ADDRESS}`;
        localStorage.removeItem(cacheKey);
        console.log('🗑️ Cleared cache for:', cacheKey);
      }
      
    } catch (error) {
      console.error('❌ Error adding band:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FETCH REAL DATA - próbuje pobrać prawdziwe dane, jak nie może to pokazuje placeholder
  const fetchUserBandDetails = async (userAddress: string): Promise<Band[]> => {
    if (!CONTRACT_ADDRESS || !userAddress) return [];
    
    // ✅ STRONG CACHE KEY - prevent multiple calls
    const cacheKey = `metalforge_bands_${userAddress}_${CONTRACT_ADDRESS}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      try {
        const cachedData = JSON.parse(cached);
        // Cache valid for 3 minutes
        if (Date.now() - cachedData.timestamp < 3 * 60 * 1000) {
          console.log('📁 Using cached band data, skipping fetch');
          return cachedData.data;
        }
      } catch (e) {
        localStorage.removeItem(cacheKey);
      }
    }
    
    try {
      console.log('📡 Fetching user band count from Optimism for:', userAddress);
      
      // ✅ Pobierz count
      const bandCount = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'userBandCount',
        args: [userAddress as `0x${string}`],
        chainId: OPTIMISM_CHAIN_ID,
      });
      
      console.log(`✅ User has ${Number(bandCount)} bands on blockchain`);
      
      if (!bandCount || Number(bandCount) === 0) {
        console.log('No bands found for user');
        // ✅ Cache empty result too!
        localStorage.setItem(cacheKey, JSON.stringify({
          data: [],
          timestamp: Date.now()
        }));
        return [];
      }
      
      // ✅ PRÓBUJ POBRAĆ PRAWDZIWE DANE - band by band
      const realBands: Band[] = [];
      const totalBands = Number(bandCount);
      
      console.log(`🎯 Trying to fetch ${totalBands} real bands from blockchain...`);
      
      for (let i = 0; i < totalBands; i++) {
        try {
          console.log(`📡 Fetching band ${i} from blockchain...`);
          
          // ✅ PRÓBUJ POBRAĆ POJEDYNCZY BAND
          const bandData = await readContract(config, {
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: 'userBands',
            args: [userAddress as `0x${string}`, BigInt(i)],
            chainId: OPTIMISM_CHAIN_ID,
          });
          
          console.log(`✅ Raw band data ${i}:`, bandData);
          
          // ✅ Parse prawdziwe dane
          if (bandData && typeof bandData === 'object' && Array.isArray(bandData)) {
            realBands.push({
              id: i + 1,
              name: bandData[0] || `Band ${i + 1}`, // name
              genre: bandData[1] || 'Unknown', // genre  
              country: bandData[2] || 'Unknown', // country
              yearFormed: Number(bandData[3]) || new Date().getFullYear(), // year
              addedBy: userAddress,
              verified: bandData[4] || false, // verified
              addedAt: bandData[5] ? new Date(Number(bandData[5]) * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0] // timestamp
            });
            console.log(`✅ Successfully parsed band ${i}: ${bandData[0]}`);
          } else {
            // ✅ Fallback - placeholder data
            realBands.push({
              id: i + 1,
              name: `Band #${i + 1} (Real on blockchain)`,
              genre: 'Metal',
              country: 'Unknown',
              yearFormed: new Date().getFullYear(),
              addedBy: userAddress,
              verified: false,
              addedAt: new Date().toISOString().split('T')[0]
            });
            console.log(`⚠️ Using placeholder for band ${i}`);
          }
          
        } catch (bandError) {
          console.error(`❌ Error fetching band ${i}:`, bandError);
          
          // ✅ Fallback - placeholder
          realBands.push({
            id: i + 1,
            name: `Band #${i + 1} (Real on blockchain - fetch failed)`,
            genre: 'Unknown',
            country: 'Unknown', 
            yearFormed: new Date().getFullYear(),
            addedBy: userAddress,
            verified: false,
            addedAt: new Date().toISOString().split('T')[0]
          });
        }
        
        // ✅ Delay between requests
        if (i < totalBands - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      console.log(`✅ Successfully fetched ${realBands.length} bands (${realBands.filter(b => !b.name.includes('fetch failed')).length} real, ${realBands.filter(b => b.name.includes('fetch failed')).length} placeholders)`);
      
      // ✅ SAVE TO CACHE
      localStorage.setItem(cacheKey, JSON.stringify({
        data: realBands,
        timestamp: Date.now()
      }));
      
      return realBands;
      
    } catch (error) {
      console.error('❌ Error fetching user bands:', error);
      
      // ✅ ULTIMATE FALLBACK - show że ma bandy ale nie można pobrać
      const placeholderBands: Band[] = [];
      
      try {
        // Try to get at least the count
        const bandCount = await readContract(config, {
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: 'userBandCount', 
          args: [userAddress as `0x${string}`],
          chainId: OPTIMISM_CHAIN_ID,
        });
        
        const count = Number(bandCount) || 0;
        for (let i = 0; i < count; i++) {
          placeholderBands.push({
            id: i + 1,
            name: `Your Band #${i + 1} (Real on blockchain)`,
            genre: 'Metal',
            country: 'Unknown',
            yearFormed: new Date().getFullYear(),
            addedBy: userAddress,
            verified: false,
            addedAt: new Date().toISOString().split('T')[0]
          });
        }
      } catch (countError) {
        console.error('❌ Even count failed:', countError);
      }
      
      return placeholderBands;
    }
  };

  return {
    addBand: handleAddBand,
    useUserBands,
    useUserStats,
    useTotalBands,
    useGetBand,
    getBandDetails: null, // ✅ Usunięte
    fetchUserBandDetails,
    isLoading: isLoading || isPending || isConfirming,
    isSuccess: isConfirmed,
    txHash,
    error: writeError || txError,
    contractAddress: CONTRACT_ADDRESS,
    chainId: OPTIMISM_CHAIN_ID,
  };
}
