'use client';

import { useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { readContract } from '@wagmi/core';
import { config } from '@/config';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

const ABI = [
  {
    "inputs": [
      {"name": "_name", "type": "string"}, 
      {"name": "_genre", "type": "string"}, 
      {"name": "_country", "type": "string"}, 
      {"name": "_yearFormed", "type": "uint256"}
    ],
    "name": "addBand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_bandId", "type": "uint256"}],
    "name": "getBand",
    "outputs": [{
      "components": [
        {"name": "id", "type": "uint256"}, 
        {"name": "name", "type": "string"}, 
        {"name": "genre", "type": "string"}, 
        {"name": "country", "type": "string"}, 
        {"name": "yearFormed", "type": "uint256"}, 
        {"name": "addedBy", "type": "address"}, 
        {"name": "addedAt", "type": "uint256"}, 
        {"name": "isVerified", "type": "bool"}, 
        {"name": "verifier", "type": "address"}, 
        {"name": "reputation", "type": "uint256"}, 
        {"name": "metadataURI", "type": "string"}
      ], 
      "name": "", 
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "_user", "type": "address"}],
    "name": "getUserBands",
    "outputs": [{"name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "_user", "type": "address"}],
    "name": "getUserStats",
    "outputs": [{
      "components": [
        {"name": "totalBands", "type": "uint256"}, 
        {"name": "verifiedBands", "type": "uint256"}, 
        {"name": "reputation", "type": "uint256"}, 
        {"name": "joinDate", "type": "uint256"}, 
        {"name": "exists", "type": "bool"}
      ], 
      "name": "", 
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalBands",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export function useMetalForgeContract() {
  const [isLoading, setIsLoading] = useState(false);

  // Write Contract Hook (wagmi v2)
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

  // Read Contract Hooks
  const useUserBands = (address: string) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'getUserBands',
      args: [address as `0x${string}`],
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
      functionName: 'getUserStats',
      args: [address as `0x${string}`],
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
      functionName: 'getTotalBands',
      query: {
        enabled: !!CONTRACT_ADDRESS,
        retry: 3,
        retryDelay: 2000,
      }
    });
  };

  const useGetBand = (bandId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'getBand',
      args: [BigInt(bandId)],
      query: {
        enabled: !!CONTRACT_ADDRESS && bandId > 0,
        retry: 3,
        retryDelay: 2000,
      }
    });
  };

  const handleAddBand = async (name: string, genre: string, country: string, yearFormed: number) => {
    if (!CONTRACT_ADDRESS) {
      console.error('Contract address not configured');
      return;
    }

    setIsLoading(true);
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'addBand',
        args: [name, genre, country, BigInt(yearFormed)],
      });
    } catch (error) {
      console.error('Error adding band:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ POPRAWIONA FUNKCJA z retry logic i cache
  const getBandDetails = async (bandId: number, maxRetries = 3) => {
    if (!CONTRACT_ADDRESS || bandId <= 0) return null;
    
    // Cache check
    const cacheKey = `band_${bandId}_${CONTRACT_ADDRESS}`;
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
        console.log(`📡 Fetching band ${bandId} (attempt ${attempt}/${maxRetries})`);
        
        const bandData = await readContract(config, {
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: 'getBand',
          args: [BigInt(bandId)]
        });
        
        const formattedBand = {
          id: Number(bandData.id),
          name: bandData.name,
          genre: bandData.genre,
          country: bandData.country,
          yearFormed: Number(bandData.yearFormed),
          addedBy: bandData.addedBy,
          verified: bandData.isVerified,
          addedAt: new Date(Number(bandData.addedAt) * 1000).toISOString().split('T')[0]
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

  // ✅ Batch fetch z delay między requests
  const fetchUserBandDetails = async (userBandIds: readonly bigint[]) => {
    if (!CONTRACT_ADDRESS || !userBandIds?.length) return [];
    
    console.log('🎸 Fetching details for bands:', userBandIds.map(id => Number(id)));
    
    const bandDetails = [];
    
    for (let i = 0; i < userBandIds.length; i++) {
      const bandId = userBandIds[i];
      const bandIdNumber = Number(bandId);
      
      try {
        const bandData = await getBandDetails(bandIdNumber);
        
        if (bandData) {
          bandDetails.push(bandData);
        } else {
          // Fallback data
          bandDetails.push({
            id: bandIdNumber,
            name: `Band ${bandIdNumber} (Loading failed)`,
            genre: "Unknown",
            country: "Unknown",
            yearFormed: 2024,
            addedBy: '',
            verified: false,
            addedAt: new Date().toISOString().split('T')[0]
          });
        }
        
        // Delay between requests to avoid rate limiting
        if (i < userBandIds.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`Error fetching band ${bandId}:`, error);
      }
    }
    
    return bandDetails;
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
  };
}
