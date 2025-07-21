'use client';

import { useState, useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useMetalForgeContract } from './useMetalForgeContract';

interface UserData {
  reputation: number;
  totalBands: number;
  verifiedBands: number;
  discoveryScore: number;
  joinedDate: string;
  contributionLevel: string;
  metalDNA: {
    favoriteGenres: string[];
    topCountries: string[];
    activeYears: number[];
  };
}

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

export function useUserData() {
  const { address, isConnected } = useAppKitAccount();
  const { useUserStats, useUserBands, addBand: addBandToContract } = useMetalForgeContract();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userBands, setUserBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(false);

  // Get data from smart contract
  const { data: contractUserStats } = useUserStats(address || '');
  const { data: contractUserBands } = useUserBands(address || '');

  // Calculate user data from contract data
  const calculateUserData = (contractStats: any, bands: Band[]): UserData => {
    if (!contractStats) {
      return {
        reputation: 0,
        totalBands: 0,
        verifiedBands: 0,
        discoveryScore: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        contributionLevel: 'Underground Newbie',
        metalDNA: { favoriteGenres: [], topCountries: [], activeYears: [] }
      };
    }

    const genres = bands.map(band => band.genre);
    const countries = bands.map(band => band.country);
    const years = bands.map(band => band.yearFormed);

    const favoriteGenres = [...new Set(genres)];
    const topCountries = [...new Set(countries)];
    const activeYears = [...new Set(years)].sort((a, b) => b - a);

    let contributionLevel = 'Underground Newbie';
    const reputation = Number(contractStats.reputation);
    
    if (reputation >= 500) contributionLevel = 'Metal Legend';
    else if (reputation >= 300) contributionLevel = 'Underground Master';
    else if (reputation >= 150) contributionLevel = 'Metal Archivist';
    else if (reputation >= 50) contributionLevel = 'Underground Explorer';

    return {
      reputation,
      totalBands: Number(contractStats.totalBands),
      verifiedBands: Number(contractStats.verifiedBands),
      discoveryScore: Math.min(100, favoriteGenres.length * 20),
      joinedDate: new Date(Number(contractStats.joinDate) * 1000).toISOString().split('T')[0],
      contributionLevel,
      metalDNA: {
        favoriteGenres: favoriteGenres.slice(0, 3),
        topCountries: topCountries.slice(0, 3),
        activeYears: activeYears.slice(0, 5)
      }
    };
  };

  useEffect(() => {
    if (isConnected && address && contractUserStats) {
      setLoading(true);
      
      // Calculate from contract data
      const calculatedData = calculateUserData(contractUserStats, userBands);
      setUserData(calculatedData);
      
      setLoading(false);
    } else {
      setUserData(null);
      setUserBands([]);
    }
  }, [address, isConnected, contractUserStats, contractUserBands]);

  // Add band function - uses smart contract
  const addBand = async (bandData: Omit<Band, 'id' | 'addedBy' | 'addedAt' | 'verified'>) => {
    if (!address) return;

    try {
      // To wywołuje MetaMask popup!
      await addBandToContract(
        bandData.name, 
        bandData.genre, 
        bandData.country, 
        bandData.yearFormed
      );
    } catch (error) {
      console.error('Error adding band to contract:', error);
    }
  };

  return {
    userData,
    userBands,
    loading,
    addBand, // Teraz używa smart contract!
    isConnected
  };
}
