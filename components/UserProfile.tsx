'use client';

import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GiDeathSkull, 
  GiCrossedSwords, 
  GiThorHammer,
  GiFlame,
  GiDragonHead,
  GiSkullCrossedBones,
  GiCrossedBones,
  GiVikingHelmet,
  GiGothicCross,
  GiBloodySword,
  GiWolfHead
} from 'react-icons/gi';
import { 
  FaPlus, 
  FaEdit, 
  FaCheck, 
  FaTimes, 
  FaCog,
  FaWallet,
  FaStar,
  FaTrophy,
  FaFire,
  FaEthereum,
  FaBolt,
  FaChartLine,
  FaCrown,
  FaArrowUp,
  FaMedal
} from 'react-icons/fa';
import { useMetalForgeContract } from '@/hooks/useMetalForgeContract';

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
    diversityBonus: number;
  };
}

export default function UserProfile() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [userBands, setUserBands] = useState<Band[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loadingBandDetails, setLoadingBandDetails] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [newBand, setNewBand] = useState({
    name: '',
    genre: '',
    country: '',
    yearFormed: new Date().getFullYear()
  });

  const { 
    addBand, 
    useUserStats, 
    useUserBands, 
    useTotalBands, 
    fetchUserBandDetails,
    isLoading, 
    isSuccess,
    contractAddress 
  } = useMetalForgeContract();

  const { data: contractUserStats, refetch: refetchUserStats } = useUserStats(address || '');
  const { data: contractUserBands, refetch: refetchUserBands } = useUserBands(address || '');
  const { data: totalBands } = useTotalBands();

  const metalGenres = [
    'Black Metal', 'Death Metal', 'Doom Metal', 'Thrash Metal', 
    'Heavy Metal', 'Power Metal', 'Folk Metal', 'Progressive Metal',
    'Symphonic Metal', 'Grindcore', 'Sludge Metal', 'Post-Metal'
  ];

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const calculateUserData = (contractStats: any, bands: Band[] = []): UserData => {
    if (!contractStats || !contractStats.exists) {
      return {
        reputation: 0,
        totalBands: 0,
        verifiedBands: 0,
        discoveryScore: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        contributionLevel: 'Underground Newbie',
        metalDNA: {
          favoriteGenres: [],
          topCountries: [],
          diversityBonus: 0
        }
      };
    }

    const reputation = Number(contractStats.reputation);
    const totalBands = Number(contractStats.totalBands);
    const verifiedBands = Number(contractStats.verifiedBands);
    const joinDate = new Date(Number(contractStats.joinDate) * 1000).toISOString().split('T')[0];

    const genres = bands.map(band => band.genre).filter(Boolean);
    const genreCounts = genres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const favoriteGenres = Object.entries(genreCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    const countries = bands.map(band => band.country).filter(Boolean);
    const countryCounts = countries.reduce((acc, country) => {
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, country>);
    
    const topCountries = Object.entries(countryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([country]) => country);

    const maxGenres = metalGenres.length;
    const discoveredGenres = Object.keys(genreCounts).length;
    const discoveryScore = Math.min(100, (discoveredGenres / maxGenres) * 100);

    // Enhanced contribution levels
    let contributionLevel = 'Underground Newbie';
    if (reputation >= 1000) contributionLevel = 'Metal Legend';
    else if (reputation >= 750) contributionLevel = 'Underground Master';
    else if (reputation >= 500) contributionLevel = 'Metal Archivist';
    else if (reputation >= 250) contributionLevel = 'Underground Explorer';
    else if (reputation >= 100) contributionLevel = 'Metal Apprentice';

    const diversityBonus = Object.keys(genreCounts).length * 15 + Object.keys(countryCounts).length * 10;

    return {
      reputation,
      totalBands,
      verifiedBands,
      discoveryScore: Math.round(discoveryScore),
      joinedDate: joinDate,
      contributionLevel,
      metalDNA: {
        favoriteGenres,
        topCountries,
        diversityBonus
      }
    };
  };

  useEffect(() => {
    let cancelled = false;

    const loadBandsData = async () => {
      if (isConnected && address && contractUserStats && contractUserBands && contractUserBands.length > 0) {
        if (cancelled) return;
        
        setLoadingBandDetails(true);
        
        try {
          const realBandsData = await fetchUserBandDetails(contractUserBands);
          
          if (cancelled) return;
          
          setUserBands(realBandsData);
          const calculatedData = calculateUserData(contractUserStats, realBandsData);
          setUserData(calculatedData);
          
        } catch (error) {
          if (cancelled) return;
          
          console.error('Error loading band details:', error);
          setUserBands([]);
          const fallbackData = calculateUserData(contractUserStats, []);
          setUserData(fallbackData);
        } finally {
          if (!cancelled) {
            setLoadingBandDetails(false);
          }
        }
      } else if (isConnected && address && contractUserStats) {
        if (!cancelled) {
          setUserBands([]);
          const calculatedData = calculateUserData(contractUserStats, []);
          setUserData(calculatedData);
          setLoadingBandDetails(false);
        }
      } else {
        if (!cancelled) {
          setUserData(null);
          setUserBands([]);
          setLoadingBandDetails(false);
        }
      }
    };

    loadBandsData();

    return () => {
      cancelled = true;
    };

  }, [address, isConnected, contractUserStats, contractUserBands]);

  const handleAddBand = async () => {
    if (!newBand.name || !newBand.genre || !newBand.country || !address) return;

    try {
      await addBand(
        newBand.name,
        newBand.genre, 
        newBand.country,
        newBand.yearFormed
      );
      
      setNewBand({ name: '', genre: '', country: '', yearFormed: new Date().getFullYear() });
      setShowAddForm(false);

    } catch (error) {
      console.error('Error adding band:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        refetchUserStats();
        refetchUserBands();
      }, 10000);
    }
  }, [isSuccess, refetchUserStats, refetchUserBands]);

  const openReownProfile = () => {
    open({ view: 'Account' });
  };

  const verifyBand = (bandId: number) => {
    console.log('Verify band:', bandId);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="animate-pulse text-6xl text-red-300 absolute top-16 left-16 transform rotate-12" style={{ animationDuration: '4s' }}>ᚦ</div>
          <div className="animate-pulse text-5xl text-blue-300 absolute bottom-20 right-20 transform -rotate-15" style={{ animationDuration: '5s', animationDelay: '2s' }}>ᚱ</div>
          <div className="animate-pulse text-4xl text-yellow-300 absolute top-1/3 right-1/4 transform rotate-20" style={{ animationDuration: '6s', animationDelay: '4s' }}>ᚠ</div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-600 rounded-xl p-8 text-center max-w-md shadow-2xl backdrop-blur-sm"
          style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.3)' }}
        >
          <GiSkullCrossedBones className="text-red-500 text-8xl mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-4">JOIN THE UNDERGROUND</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">Connect your wallet to access your Metal Forge profile and start building your underground legacy on blockchain</p>
          
          <button 
            onClick={() => open()}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 text-white font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 w-full rounded-lg shadow-lg hover:shadow-red-600/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaWallet />
              Connect Wallet
            </span>
          </button>
          
          <div className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-2">
            <FaEthereum className="text-blue-400" />
            <span>Powered by Optimism</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 relative overflow-hidden">
      {/* Enhanced Background Runes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-300 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>ᚦ</div>
        <div className="animate-pulse text-5xl text-blue-300 absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>ᚱ</div>
        <div className="animate-pulse text-4xl text-yellow-300 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>ᚠ</div>
        <div className="animate-pulse text-5xl text-purple-300 absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '9s', animationDelay: '6s' }}>ᚹ</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Enhanced Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-600 rounded-xl p-8 mb-8 relative overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className={`relative w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${glitchActive ? 'animate-pulse scale-105' : ''}`}>
                <GiDragonHead className="text-white text-4xl" />
                {glitchActive && (
                  <GiDragonHead className="absolute text-white text-4xl opacity-30 animate-ping" />
                )}
                {userData && userData.reputation >= 500 && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                    <FaTrophy className="text-yellow-900 text-sm" />
                  </div>
                )}
                {isConnected && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              <div>
                <h1 className={`text-3xl font-black text-white mb-2 uppercase tracking-wide ${glitchActive ? 'animate-pulse' : ''}`}>
                  {userData?.contributionLevel || 'Underground Warrior'}
                </h1>
                <p className="text-gray-400 font-mono text-lg mb-1">
                  {address?.slice(0, 8)}...{address?.slice(-6)}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-red-400 font-bold flex items-center gap-1">
                    <FaBolt className="text-yellow-400" />
                    Member since {userData?.joinedDate || 'Today'}
                  </span>
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    <FaEthereum className="text-blue-400" />
                    Connected to Optimism
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={openReownProfile}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 text-white font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-lg shadow-lg"
              >
                <FaWallet />
                Wallet Settings
              </button>
              <button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 px-6 py-3 text-white font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-lg shadow-lg">
                <FaCog />
                Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: GiFlame, value: userData?.reputation || 0, label: 'Reputation', color: 'from-red-600/20 to-red-800/20', iconColor: 'text-red-500', borderColor: 'border-red-600' },
            { icon: GiCrossedSwords, value: userData?.totalBands || 0, label: 'Bands Added', color: 'from-blue-600/20 to-blue-800/20', iconColor: 'text-blue-400', borderColor: 'border-blue-600' },
            { icon: FaCheck, value: userData?.verifiedBands || 0, label: 'Verified', color: 'from-green-600/20 to-green-800/20', iconColor: 'text-green-400', borderColor: 'border-green-600' },
            { icon: GiThorHammer, value: `${userData?.discoveryScore || 0}%`, label: 'Discovery', color: 'from-yellow-600/20 to-yellow-800/20', iconColor: 'text-yellow-400', borderColor: 'border-yellow-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-gradient-to-br ${stat.color} border-2 ${stat.borderColor} rounded-xl p-6 text-center relative shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-${stat.borderColor.split('-')[1]}-600/20`}
            >
              <stat.icon className={`${stat.iconColor} text-4xl mx-auto mb-3`} />
              <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider font-bold">{stat.label}</div>
              {(stat.label === 'Reputation' && userData && userData.reputation >= 100) && (
                <FaStar className="absolute top-3 right-3 text-yellow-400 animate-pulse" />
              )}
              {(stat.label === 'Verified' && userData && userData.verifiedBands >= 5) && (
                <FaFire className="absolute top-3 right-3 text-orange-400 animate-bounce" />
              )}
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {stat.label === 'Reputation' && '+5 per band'}
                {stat.label === 'Verified' && '+10 bonus'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Reputation Progress */}
        {userData && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 mb-8 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-black text-xl flex items-center gap-2">
                <FaChartLine className="text-yellow-400" />
                Progress to Next Level
              </h3>
              <div className="flex items-center gap-2">
                <FaCrown className="text-yellow-400" />
                <span className="text-gray-400 font-mono">
                  {userData.reputation}/
                  {userData.reputation >= 1000 ? 'MAX' : 
                   userData.reputation >= 750 ? '1000' :
                   userData.reputation >= 500 ? '750' :
                   userData.reputation >= 250 ? '500' :
                   userData.reputation >= 100 ? '250' : '100'}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 opacity-50"></div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (userData.reputation % 
                  (userData.reputation >= 1000 ? 1000 :
                   userData.reputation >= 750 ? 250 :
                   userData.reputation >= 500 ? 250 :
                   userData.reputation >= 250 ? 250 :
                   userData.reputation >= 100 ? 150 : 100)) / 
                  (userData.reputation >= 1000 ? 1000 :
                   userData.reputation >= 750 ? 250 :
                   userData.reputation >= 500 ? 250 :
                   userData.reputation >= 250 ? 250 :
                   userData.reputation >= 100 ? 150 : 100) * 100)}%` }}
                transition={{ duration: 2, delay: 0.5 }}
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full animate-pulse opacity-70"></div>
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Current Level: {userData.contributionLevel}</span>
              <span className="flex items-center gap-1">
                <FaArrowUp className="text-green-400" />
                Next reward at {
                  userData.reputation >= 1000 ? 'MAX LEVEL' : 
                  userData.reputation >= 750 ? '1000 points' :
                  userData.reputation >= 500 ? '750 points' :
                  userData.reputation >= 250 ? '500 points' :
                  userData.reputation >= 100 ? '250 points' : '100 points'
                }
              </span>
            </div>
          </motion.div>
        )}

        {/* Enhanced Metal DNA Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-600 rounded-xl p-8 mb-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-purple-900/10"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <GiSkullCrossedBones className="text-purple-500 text-3xl" />
              METAL DNA ANALYSIS
              <div className="text-xs bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full font-bold">
                DIVERSITY: {userData?.metalDNA.diversityBonus || 0} pts
              </div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-600/30">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <GiBloodySword className="text-red-500" />
                  Favorite Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData?.metalDNA.favoriteGenres.length ? (
                    userData.metalDNA.favoriteGenres.map((genre, index) => (
                      <motion.span 
                        key={genre}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg border border-red-500"
                      >
                        #{index + 1} {genre}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">Add bands to discover your Metal DNA</span>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-600/30">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <GiVikingHelmet className="text-blue-500" />
                  Top Countries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData?.metalDNA.topCountries.length ? (
                    userData.metalDNA.topCountries.map((country, index) => (
                      <motion.span 
                        key={country}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg border border-blue-500"
                      >
                        #{index + 1} {country}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">Explore different countries</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Discovery Progress */}
            <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-purple-600/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold">Genre Discovery Progress</span>
                <span className="text-purple-400 font-bold">{userData?.discoveryScore || 0}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${userData?.discoveryScore || 0}%` }}
                  transition={{ duration: 2, delay: 1 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced My Bands Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-600 rounded-xl p-8 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <GiCrossedSwords className="text-red-500 text-3xl" />
              MY ADDED BANDS ({userBands.length})
              {loadingBandDetails && (
                <div className="flex items-center gap-2 text-blue-400 text-lg">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  Loading from blockchain...
                </div>
              )}
            </h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 text-white font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-lg shadow-lg disabled:opacity-50"
              disabled={isLoading}
            >
              <FaPlus />
              {isLoading ? 'Adding to Blockchain...' : 'Add Band'}
            </button>
          </div>

          {/* Enhanced Add Band Form */}
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-gray-800 to-gray-900 border border-red-600/50 rounded-xl p-6 mb-8 shadow-lg"
            >
              <h3 className="text-white font-black mb-6 flex items-center gap-2 text-xl">
                <GiThorHammer className="text-green-400" />
                ADD NEW BAND TO BLOCKCHAIN
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Band Name *</label>
                  <input
                    type="text"
                    value={newBand.name}
                    onChange={(e) => setNewBand({...newBand, name: e.target.value})}
                    className="w-full bg-gray-700 border-2 border-gray-600 focus:border-red-500 text-white px-4 py-3 rounded-lg outline-none transition-colors duration-300"
                    placeholder="Enter band name..."
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Genre *</label>
                  <select
                    value={newBand.genre}
                    onChange={(e) => setNewBand({...newBand, genre: e.target.value})}
                    className="w-full bg-gray-700 border-2 border-gray-600 focus:border-red-500 text-white px-4 py-3 rounded-lg outline-none transition-colors duration-300"
                    disabled={isLoading}
                  >
                    <option value="">Select genre...</option>
                    {metalGenres.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Country *</label>
                  <input
                    type="text"
                    value={newBand.country}
                    onChange={(e) => setNewBand({...newBand, country: e.target.value})}
                    className="w-full bg-gray-700 border-2 border-gray-600 focus:border-red-500 text-white px-4 py-3 rounded-lg outline-none transition-colors duration-300"
                    placeholder="e.g., Norway, Sweden, Finland..."
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Year Formed</label>
                  <input
                    type="number"
                    value={newBand.yearFormed}
                    onChange={(e) => setNewBand({...newBand, yearFormed: parseInt(e.target.value)})}
                    className="w-full bg-gray-700 border-2 border-gray-600 focus:border-red-500 text-white px-4 py-3 rounded-lg outline-none transition-colors duration-300"
                    min="1960"
                    max={new Date().getFullYear()}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={handleAddBand}
                  disabled={isLoading || !newBand.name || !newBand.genre || !newBand.country}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 px-8 py-3 text-white font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-lg shadow-lg"
                >
                  <FaCheck />
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding to Blockchain...
                    </>
                  ) : (
                    'Add Band (+5 Reputation)'
                  )}
                </button>
                <button 
                  onClick={() => setShowAddForm(false)}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 px-8 py-3 text-white font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-lg shadow-lg"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Enhanced Bands List */}
          {loadingBandDetails ? (
            <div className="text-center py-20 text-gray-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <GiSkullCrossedBones className="text-8xl mx-auto mb-6 opacity-50" />
              </motion.div>
              <p className="text-xl font-bold">Loading your bands from blockchain...</p>
              <p className="text-sm mt-2">⏳ Fetching band details from Optimism network...</p>
            </div>
          ) : userBands.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <GiWolfHead className="text-8xl mx-auto mb-6 opacity-50" />
              <p className="text-xl font-bold">No bands added yet</p>
              <p className="text-sm mt-2">Start building the underground encyclopedia and earn reputation!</p>
              <div className="mt-6 text-xs text-gray-600">
                <p>💰 Earn +5 reputation per band</p>
                <p>🏆 Get +10 bonus when verified by community</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBands.map((band, index) => (
                <motion.div 
                  key={band.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-red-600 rounded-xl p-6 relative shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-black text-lg">{band.name}</h3>
                    {band.verified ? (
                      <div className="flex items-center gap-2 bg-green-600/20 px-3 py-1 rounded-full">
                        <FaCheck className="text-green-400" />
                        <span className="text-green-400 text-xs font-bold">+10 Rep</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-xs font-bold bg-yellow-400/20 px-2 py-1 rounded">Pending</span>
                        <button 
                          onClick={() => verifyBand(band.id)}
                          className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full transition-colors duration-300"
                          title="Verify (TODO: Smart Contract)"
                        >
                          Verify
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-red-400 font-bold flex items-center gap-2">
                      <GiFlame className="text-sm" />
                      {band.genre}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <GiGothicCross className="text-sm" />
                      {band.country} • {band.yearFormed}
                    </p>
                    <p className="text-gray-500 text-xs">Added {band.addedAt}</p>
                  </div>
                  
                  <div className="absolute top-3 left-3 text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded font-bold">
                    +5
                  </div>
                  
                  {band.verified && (
                    <div className="absolute top-3 right-3">
                      <FaMedal className="text-yellow-400 animate-pulse" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
