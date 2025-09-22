'use client';

import { useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { readContract } from '@wagmi/core';
import { config } from '@/config';

// 🚀 NOWY OPTIMISM CONTRACT - hardcoded dla bezpieczeństwa
const CONTRACT_ADDRESS = '0xFA45e05917c220116b58E043F1CE60a8b1C11365' as `0x${string}`;
const OPTIMISM_CHAIN_ID = 10; // Optimism Mainnet

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
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "bandId", "type": "uint256"}],
    "name": "userBands",
    "outputs": [{
      "components": [
        {"name": "name", "type": "string"}, 
        {"name": "genre", "type": "string"}, 
        {"name": "country", "type": "string"}, 
        {"name": "year", "type": "uint256"}, 
        {"name": "verified", "type": "bool"}, 
        {"name": "timestamp", "type": "uint256"}
      ], 
      "name": "", 
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserBands",
    "outputs": [{
      "components": [
        {"name": "name", "type": "string"}, 
        {"name": "genre", "type": "string"}, 
        {"name": "country", "type": "string"}, 
        {"name": "year", "type": "uint256"}, 
        {"name": "verified", "type": "bool"}, 
        {"name": "timestamp", "type": "uint256"}
      ], // ✅ FIX - usunięte ][
      "name": "", 
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "bandId", "type": "uint256"}],
    "name": "verifyBand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;


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

  // ✅ UPDATED - Read Contract Hooks dla Optimism
  const useUserBands = (address: string) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'getUserBands',
      args: [address as `0x${string}`],
      chainId: OPTIMISM_CHAIN_ID,
      query: {
        enabled: !!address && !!CONTRACT_ADDRESS,
        retry: 3,
        retryDelay: 2000,
      }
    });
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

  const useGetBand = (address: string, bandId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'userBands',
      args: [address as `0x${string}`, BigInt(bandId)],
      chainId: OPTIMISM_CHAIN_ID,
      query: {
        enabled: !!CONTRACT_ADDRESS && !!address && bandId >= 0,
        retry: 3,
        retryDelay: 2000,
      }
    });
  };

  // ✅ UPDATED - Add Band Function dla Optimism
  const handleAddBand = async (name: string, genre: string, country: string, yearFormed: number) => {
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
    } catch (error) {
      console.error('❌ Error adding band:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ UPDATED - Get Band Details z cache dla Optimism
  const getBandDetails = async (userAddress: string, bandId: number, maxRetries = 3) => {
    if (!CONTRACT_ADDRESS || !userAddress || bandId < 0) return null;
    
    // Cache check
    const cacheKey = `band_${userAddress}_${bandId}_${CONTRACT_ADDRESS}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const cachedData = JSON.parse(cached);
        // Cache valid for 5 minutes
        if (Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
          console.log(`📁 Using cached data for band ${bandId}`);
          return cachedData.data;
        }
      } catch (e) {
        localStorage.removeItem(cacheKey);
      }
    }
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📡 Fetching band ${bandId} for user ${userAddress} (attempt ${attempt}/${maxRetries})`);
        
        const bandData = await readContract(config, {
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: 'userBands',
          args: [userAddress as `0x${string}`, BigInt(bandId)],
          chainId: OPTIMISM_CHAIN_ID,
        });
        
        const formattedBand = {
          id: bandId,
          name: bandData.name,
          genre: bandData.genre,
          country: bandData.country,
          yearFormed: Number(bandData.year),
          verified: bandData.verified,
          addedBy: userAddress,
          addedAt: new Date(Number(bandData.timestamp) * 1000).toISOString().split('T')[0]
        };
        
        // Cache successful result
        localStorage.setItem(cacheKey, JSON.stringify({
          data: formattedBand,
          timestamp: Date.now()
        }));
        
        console.log(`✅ Successfully loaded band: ${formattedBand.name}`);
        return formattedBand;
        
      } catch (error) {
        console.error(`❌ Attempt ${attempt} failed for band ${bandId}:`, error);
        
        if (attempt === maxRetries) {
          console.error(`💀 All attempts failed for band ${bandId}`);
          return null;
        }
        
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return null;
  };

  // ✅ UPDATED - Fetch User Band Details z Optimism
  const fetchUserBandDetails = async (userAddress: string) => {
    if (!CONTRACT_ADDRESS || !userAddress) return [];
    
    try {
      console.log('🎸 Fetching user bands from Optimism for:', userAddress);
      
      // Get user band count first
      const bandCount = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'userBandCount',
        args: [userAddress as `0x${string}`],
        chainId: OPTIMISM_CHAIN_ID,
      });
      
      console.log(`User has ${Number(bandCount)} bands`);
      
      if (!bandCount || Number(bandCount) === 0) {
        console.log('No bands found for user');
        return [];
      }
      
      const bandDetails = [];
      const totalBands = Number(bandCount);
      
      // Fetch each band individually
      for (let i = 0; i < totalBands; i++) {
        try {
          const bandData = await getBandDetails(userAddress, i);
          if (bandData) {
            bandDetails.push(bandData);
          }
          
          // Delay between requests to avoid rate limiting
          if (i < totalBands - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`Error fetching band ${i}:`, error);
        }
      }
      
      console.log(`✅ Loaded ${bandDetails.length} bands from Optimism`);
      return bandDetails;
      
    } catch (error) {
      console.error('❌ Error fetching user band count:', error);
      return [];
    }
  };

  return {
    addBand: handleAddBand,
    useUserBands,
    useUserStats,
    useTotalBands,
    useGetBand,
    getBandDetails,
    fetchUserBandDetails,
    isLoading: isLoading || isPending || isConfirming,
    isSuccess: isConfirmed,
    txHash,
    error: writeError || txError,
    contractAddress: CONTRACT_ADDRESS,
    chainId: OPTIMISM_CHAIN_ID,
  };
}
