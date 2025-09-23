'use client';

import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSwitchChain } from 'wagmi';
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
  FaMedal,
  FaSkullCrossbones
} from 'react-icons/fa';
import { useMetalForgeContract } from '@/hooks/useMetalForgeContract';
import BadgeDisplay from '@/components/BadgeDisplay';

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
  const { switchChain } = useSwitchChain();
  const [userBands, setUserBands] = useState<Band[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loadingBandDetails, setLoadingBandDetails] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [networkSwitching, setNetworkSwitching] = useState(false);
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

// ✅ POPRAWIONE - tylko useUserStats ma refetch
const { data: contractUserStats, refetch: refetchUserStats } = useUserStats(address || '');
const contractUserBands = useUserBands(address || ''); // ✅ Bez destructuring - to mock function
const { data: totalBands } = useTotalBands();


  const metalGenres = [
    'Black Metal', 'Death Metal', 'Doom Metal', 'Thrash Metal', 
    'Heavy Metal', 'Power Metal', 'Folk Metal', 'Progressive Metal',
    'Symphonic Metal', 'Grindcore', 'Sludge Metal', 'Post-Metal'
  ];

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // ✅ FIXED calculateUserData - handles contractStats as number
  const calculateUserData = (contractStats: any, bands: Band[] = []): UserData => {
    // ✅ Handle direct number or object
    const totalBands = typeof contractStats === 'number' ? contractStats : Number(contractStats?.data || 0);
    
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
    }, {} as Record<string, number>);

    const topCountries = Object.entries(countryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([country]) => country);

    const maxGenres = metalGenres.length;
    const discoveredGenres = Object.keys(genreCounts).length;
    const discoveryScore = Math.min(100, (discoveredGenres / maxGenres) * 100);

    // Enhanced contribution levels based on totalBands
    let contributionLevel = 'Underground Newbie';
    if (totalBands >= 10) contributionLevel = 'Metal Legend';
    else if (totalBands >= 7) contributionLevel = 'Underground Master';
    else if (totalBands >= 5) contributionLevel = 'Metal Archivist';
    else if (totalBands >= 3) contributionLevel = 'Underground Explorer';
    else if (totalBands >= 1) contributionLevel = 'Metal Apprentice';

    const diversityBonus = Object.keys(genreCounts).length * 15 + Object.keys(countryCounts).length * 10;

    return {
      reputation: totalBands * 5, // 5 points per band
      totalBands,
      verifiedBands: Math.floor(totalBands / 3), // Co trzeci zweryfikowany
      discoveryScore: Math.round(discoveryScore),
      joinedDate: new Date().toISOString().split('T')[0],
      contributionLevel,
      metalDNA: {
        favoriteGenres,
        topCountries,
        diversityBonus
      }
    };
  };

  // ✅ FIXED useEffect - prevent infinite loop
  useEffect(() => {
    let cancelled = false;

    const loadBandsData = async () => {
      if (!isConnected || !address || loadingBandDetails || cancelled) {
        return;
      }

      setLoadingBandDetails(true);
      
      try {
        const realBandsData = await fetchUserBandDetails(address);
        
        if (!cancelled) {
          setUserBands(realBandsData);
          // ✅ Use contractUserStats directly
          const calculatedData = calculateUserData(contractUserStats, realBandsData);
          setUserData(calculatedData);
        }
        
      } catch (error) {
        console.error('Error loading bands:', error);
        if (!cancelled) {
          setUserBands([]);
          setUserData(calculateUserData(0, []));
        }
      } finally {
        if (!cancelled) {
          setLoadingBandDetails(false);
        }
      }
    };

    // ✅ Only trigger when we have contractUserStats data
    if (contractUserStats !== undefined && !loadingBandDetails) {
      loadBandsData();
    }

    return () => {
      cancelled = true;
    };
  }, [address, isConnected, contractUserStats, fetchUserBandDetails]); // ✅ Simple dependencies

  const handleAddBand = async () => {
    if (!newBand.name || !newBand.genre || !newBand.country || !address) return;

    setNetworkSwitching(true);
    
    try {
      console.log('🔄 Switching to Optimism network...');
      await switchChain({ chainId: 10 });
      console.log('✅ Successfully switched to Optimism');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await addBand(
        newBand.name,
        newBand.genre, 
        newBand.country,
        newBand.yearFormed
      );
      
      setNewBand({ name: '', genre: '', country: '', yearFormed: new Date().getFullYear() });
      setShowAddForm(false);

    } catch (error) {
      console.error('❌ Error adding band or switching network:', error);
      alert('Failed to add band. Please make sure you\'re connected to Optimism network.');
    } finally {
      setNetworkSwitching(false);
    }
  };

  const handleTestBadge = async () => {
    setNetworkSwitching(true);
    
    try {
      console.log('🔄 Switching to Base network for badge test...');
      await switchChain({ chainId: 8453 });
      console.log('✅ Successfully switched to Base');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('🏆 Testing badge on Base network');
      
    } catch (error) {
      console.error('❌ Error switching to Base network:', error);
      alert('Failed to switch to Base network for badge testing.');
    } finally {
      setNetworkSwitching(false);
    }
  };

// ✅ POPRAWIONE - tylko refetchUserStats
useEffect(() => {
  if (isSuccess) {
    setTimeout(() => {
      refetchUserStats();
      // ✅ Ręcznie reset userBands to trigger reload
      setUserBands([]);
      setLoadingBandDetails(false); // Reset loading state
    }, 5000); // Shorter timeout
  }
}, [isSuccess, refetchUserStats]); // ✅ Tylko refetchUserStats

  const openReownProfile = () => {
    open({ view: 'Account' });
  };

  const verifyBand = (bandId: number) => {
    console.log('Verify band:', bandId);
  };

  if (!isConnected) {
    return (
      <div 
        className="min-h-screen bg-[#f5f5e8] flex items-center justify-center p-4 relative overflow-hidden zine-layout"
        style={{
          backgroundColor: '#f5f5e8' // ✅ FIXED - removed problematic backgroundImage
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="animate-pulse text-6xl text-red-800 absolute top-16 left-16 transform rotate-12" style={{ animationDuration: '4s' }}>☠</div>
          <div className="animate-pulse text-5xl text-black absolute bottom-20 right-20 transform -rotate-15" style={{ animationDuration: '5s', animationDelay: '2s' }}>☠</div>
          <div className="animate-pulse text-4xl text-red-800 absolute top-1/3 right-1/4 transform rotate-20" style={{ animationDuration: '6s', animationDelay: '4s' }}>☠</div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#f5f5e8] border-4 border-black rounded-none p-8 text-center max-w-md shadow-metal backdrop-blur-sm zine-card"
          style={{
            backgroundColor: "rgba(245, 245, 232, 0.95)" // ✅ Solid background
          }}
        >
          <FaSkullCrossbones className="text-red-800 text-8xl mx-auto mb-6 animate-pulse skull-icon" />
          <h2 className="text-3xl font-bold uppercase tracking-widest text-black mb-4 font-zine-title">JOIN THE UNDERGROUND</h2>
          <p className="text-black mb-8 leading-relaxed font-zine-body">Connect your wallet to access your Metal Forge profile and start building your underground legacy on blockchain</p>
          
          <button 
            onClick={() => open()}
            className="skull-button text-[#d0d0d0] px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 w-full rounded-none shadow-metal relative overflow-hidden group font-zine-body"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d71c1c] to-[#000000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaWallet />
              Connect Wallet
            </span>
          </button>
          
          <div className="mt-6 text-xs text-black flex items-center justify-center gap-2 font-zine-body">
            <FaEthereum className="text-red-800" />
            <span>Powered by Optimism</span>
          </div>
        </motion.div>

        <style jsx>{`
          .skull-icon {
            text-shadow: 0 0 10px rgba(139, 0, 0, 0.6);
            filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
          }
          
          .shadow-metal {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(255, 0, 0, 0.2);
          }
          
          .skull-button {
            background: linear-gradient(to right, #b71c1c, #000000);
            border: 2px solid #ff0000;
            box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
          }

          .skull-button:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(255, 0, 0, 0.5);
            filter: brightness(1.2);
          }
          
          .font-zine-title {
            font-family: "Blackletter", serif;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .font-zine-body {
            font-family: "Special Elite", monospace;
          }

          .zine-layout {
            background-color: #f5f5e8;
            position: relative;
            overflow-x: hidden;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#f5f5e8] py-8 relative overflow-hidden zine-layout"
      style={{
        backgroundColor: '#f5f5e8' // ✅ FIXED - removed problematic backgroundImage
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-800 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>☠</div>
        <div className="animate-pulse text-5xl text-black absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>☠</div>
        <div className="animate-pulse text-4xl text-red-800 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>☠</div>
        <div className="animate-pulse text-5xl text-black absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '9s', animationDelay: '6s' }}>☠</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {networkSwitching && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#f5f5e8] border-4 border-red-800 rounded-none p-8 text-center">
              <FaBolt className="text-red-800 text-6xl mx-auto mb-4 animate-spin" />
              <h3 className="text-black font-bold text-xl mb-2 font-zine-title">SWITCHING NETWORK</h3>
              <p className="text-black font-zine-body">Please confirm network switch in your wallet...</p>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#f5f5e8] border-4 border-black rounded-none p-8 mb-8 relative overflow-hidden shadow-metal"
          style={{
            backgroundColor: "rgba(245, 245, 232, 0.95)" // ✅ Solid background
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#f0f0e0] via-transparent to-[#f0f0e0] opacity-30"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className={`relative w-20 h-20 bg-red-800 rounded-none flex items-center justify-center shadow-metal transition-all duration-300 ${glitchActive ? 'animate-pulse scale-105' : ''} border-2 border-black`}>
                <FaSkullCrossbones className="text-white text-4xl" />
                {glitchActive && (
                  <FaSkullCrossbones className="absolute text-white text-4xl opacity-30 animate-ping" />
                )}
                {userData && userData.reputation >= 500 && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-black rounded-none flex items-center justify-center border-2 border-red-800">
                    <FaTrophy className="text-red-800 text-sm" />
                  </div>
                )}
                {isConnected && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-800 rounded-none border-2 border-black flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-600 rounded-none animate-pulse"></div>
                  </div>
                )}
              </div>
              
              <div>
                <h1 className={`text-3xl font-bold text-black mb-2 uppercase tracking-wide font-zine-title ${glitchActive ? 'animate-pulse' : ''}`}>
                  {userData?.contributionLevel || 'Underground Warrior'}
                </h1>
                <p className="text-black font-zine-body text-lg mb-1">
                  {address?.slice(0, 8)}...{address?.slice(-6)}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-red-800 font-bold flex items-center gap-1 font-zine-body">
                    <FaBolt className="text-red-800" />
                    Member since {userData?.joinedDate || 'Today'}
                  </span>
                  <span className="text-black font-bold flex items-center gap-1 font-zine-body">
                    <FaEthereum className="text-red-800" />
                    Connected to Optimism
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={openReownProfile}
                className="skull-button text-[#d0d0d0] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-none shadow-metal font-zine-body"
              >
                <FaWallet />
                Wallet Settings
              </button>
              <button 
                onClick={handleTestBadge}
                disabled={networkSwitching}
                className="bg-black border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white disabled:opacity-50 px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-none shadow-metal font-zine-body"
              >
                <FaTrophy />
                Test Badge
              </button>
              <button className="bg-black border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-none shadow-metal font-zine-body">
                <FaCog />
                Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: FaSkullCrossbones, value: userData?.reputation || 0, label: 'Reputation', iconColor: 'text-red-800' },
            { icon: GiCrossedSwords, value: userData?.totalBands || 0, label: 'Bands Added', iconColor: 'text-red-800' },
            { icon: FaCheck, value: userData?.verifiedBands || 0, label: 'Verified', iconColor: 'text-red-800' },
            { icon: GiThorHammer, value: `${userData?.discoveryScore || 0}%`, label: 'Discovery', iconColor: 'text-red-800' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-[#f5f5e8] border-4 border-black rounded-none p-6 text-center relative shadow-metal backdrop-blur-sm transition-all duration-300"
              style={{
                backgroundColor: "rgba(245, 245, 232, 0.9)" // ✅ Solid background
              }}
            >
              <stat.icon className={`${stat.iconColor} text-4xl mx-auto mb-3 skull-icon`} />
              <div className="text-3xl font-bold text-black mb-2 font-zine-title">{stat.value}</div>
              <div className="text-black text-sm uppercase tracking-wider font-bold font-zine-body">{stat.label}</div>
              {(stat.label === 'Reputation' && userData && userData.reputation >= 100) && (
                <FaStar className="absolute top-3 right-3 text-red-800 animate-pulse" />
              )}
              {(stat.label === 'Verified' && userData && userData.verifiedBands >= 5) && (
                <FaFire className="absolute top-3 right-3 text-red-800 animate-bounce" />
              )}
              <div className="absolute bottom-2 right-2 text-xs text-black font-zine-body">
                {stat.label === 'Reputation' && '+5 per band'}
                {stat.label === 'Verified' && '+10 bonus'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badge Display */}
        {address && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <BadgeDisplay address={address} />
          </motion.div>
        )}

        {/* My Bands Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-[#f5f5e8] border-4 border-black rounded-none p-8 shadow-metal"
          style={{
            backgroundColor: "rgba(245, 245, 232, 0.9)" // ✅ Solid background
          }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-black flex items-center gap-3 font-zine-title uppercase">
              <GiCrossedSwords className="text-red-800 text-3xl skull-icon" />
              MY ADDED BANDS ({userBands.length})
              {loadingBandDetails && (
                <div className="flex items-center gap-2 text-red-800 text-lg">
                  <div className="w-4 h-4 border-2 border-red-800 border-t-transparent rounded-full animate-spin"></div>
                  Loading from blockchain...
                </div>
              )}
            </h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="skull-button text-[#d0d0d0] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-none shadow-metal disabled:opacity-50 font-zine-body"
              disabled={isLoading || networkSwitching}
            >
              <FaPlus />
              {(isLoading || networkSwitching) ? 'Processing...' : 'Add Band'}
            </button>
          </div>

          {/* Add Band Form */}
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#e0e0d8] border-2 border-black rounded-none p-6 mb-8 shadow-metal"
              style={{
                backgroundColor: "rgba(224, 224, 216, 0.9)" // ✅ Solid background
              }}
            >
              <h3 className="text-black font-bold mb-6 flex items-center gap-2 text-xl font-zine-title uppercase">
                <GiThorHammer className="text-red-800" />
                ADD NEW BAND TO BLOCKCHAIN
                <span className="text-xs bg-red-800 text-white px-2 py-1 rounded-none">
                  Auto-switches to Optimism
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-black text-sm font-bold mb-2 font-zine-body uppercase">Band Name *</label>
                  <input
                    type="text"
                    value={newBand.name}
                    onChange={(e) => setNewBand({...newBand, name: e.target.value})}
                    className="w-full bg-[#f5f5e8] border-2 border-black focus:border-red-800 text-black px-4 py-3 rounded-none outline-none transition-colors duration-300 font-zine-body"
                    placeholder="Enter band name..."
                    disabled={isLoading || networkSwitching}
                  />
                </div>
                
                <div>
                  <label className="block text-black text-sm font-bold mb-2 font-zine-body uppercase">Genre *</label>
                  <select
                    value={newBand.genre}
                    onChange={(e) => setNewBand({...newBand, genre: e.target.value})}
                    className="w-full bg-[#f5f5e8] border-2 border-black focus:border-red-800 text-black px-4 py-3 rounded-none outline-none transition-colors duration-300 font-zine-body"
                    disabled={isLoading || networkSwitching}
                  >
                    <option value="">Select genre...</option>
                    {metalGenres.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-black text-sm font-bold mb-2 font-zine-body uppercase">Country *</label>
                  <input
                    type="text"
                    value={newBand.country}
                    onChange={(e) => setNewBand({...newBand, country: e.target.value})}
                    className="w-full bg-[#f5f5e8] border-2 border-black focus:border-red-800 text-black px-4 py-3 rounded-none outline-none transition-colors duration-300 font-zine-body"
                    placeholder="e.g., Norway, Sweden, Finland..."
                    disabled={isLoading || networkSwitching}
                  />
                </div>
                
                <div>
                  <label className="block text-black text-sm font-bold mb-2 font-zine-body uppercase">Year Formed</label>
                  <input
                    type="number"
                    value={newBand.yearFormed}
                    onChange={(e) => setNewBand({...newBand, yearFormed: parseInt(e.target.value)})}
                    className="w-full bg-[#f5f5e8] border-2 border-black focus:border-red-800 text-black px-4 py-3 rounded-none outline-none transition-colors duration-300 font-zine-body"
                    min="1960"
                    max={new Date().getFullYear()}
                    disabled={isLoading || networkSwitching}
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={handleAddBand}
                  disabled={isLoading || networkSwitching || !newBand.name || !newBand.genre || !newBand.country}
                  className="skull-button text-[#d0d0d0] px-8 py-3 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-none shadow-metal disabled:opacity-50 font-zine-body"
                >
                  <FaCheck />
                  {networkSwitching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Switching Network...
                    </>
                  ) : isLoading ? (
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
                  disabled={isLoading || networkSwitching}
                  className="bg-black border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white disabled:opacity-50 px-8 py-3 font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-none shadow-metal font-zine-body"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Bands List */}
          {loadingBandDetails ? (
            <div className="text-center py-20 text-black">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaSkullCrossbones className="text-8xl mx-auto mb-6 opacity-50" />
              </motion.div>
              <p className="text-xl font-bold font-zine-title uppercase">Loading your bands from blockchain...</p>
              <p className="text-sm mt-2 font-zine-body">⏳ Fetching band details from Optimism network...</p>
            </div>
          ) : userBands.length === 0 ? (
            <div className="text-center py-20 text-black">
              <GiWolfHead className="text-8xl mx-auto mb-6 opacity-50" />
              <p className="text-xl font-bold font-zine-title uppercase">No bands added yet</p>
              <p className="text-sm mt-2 font-zine-body">Start building the underground encyclopedia and earn reputation!</p>
              <div className="mt-6 text-xs text-black font-zine-body">
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
                  className="bg-[#e0e0d8] border-2 border-black hover:border-red-800 rounded-none p-6 relative shadow-metal transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(224, 224, 216, 0.9)" // ✅ Solid background
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-black font-bold text-lg font-zine-title">{band.name}</h3>
                    {band.verified ? (
                      <div className="flex items-center gap-2 bg-red-800 text-white px-3 py-1 rounded-none">
                        <FaCheck className="text-white" />
                        <span className="text-white text-xs font-bold font-zine-body">+10 Rep</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-black text-xs font-bold bg-[#f5f5e8] border border-black px-2 py-1 rounded-none font-zine-body">Pending</span>
                        <button 
                          onClick={() => verifyBand(band.id)}
                          className="text-xs bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded-none transition-colors duration-300 font-zine-body"
                          title="Verify (TODO: Smart Contract)"
                        >
                          Verify
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-red-800 font-bold flex items-center gap-2 font-zine-body">
                      <GiFlame className="text-sm" />
                      {band.genre}
                    </p>
                    <p className="text-black flex items-center gap-2 font-zine-body">
                      <GiGothicCross className="text-sm" />
                      {band.country} • {band.yearFormed}
                    </p>
                    <p className="text-black text-xs font-zine-body">Added {band.addedAt}</p>
                  </div>
                  
                  <div className="absolute top-3 left-3 text-xs text-white bg-red-800 px-2 py-1 rounded-none font-bold font-zine-body">
                    +5
                  </div>
                  
                  {band.verified && (
                    <div className="absolute top-3 right-3">
                      <FaMedal className="text-red-800 animate-pulse" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .skull-icon {
          text-shadow: 0 0 10px rgba(139, 0, 0, 0.6);
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
        }
        
        .shadow-metal {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(255, 0, 0, 0.2);
        }
        
        .skull-button {
          background: linear-gradient(to right, #b71c1c, #000000);
          border: 2px solid #ff0000;
          box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
        }

        .skull-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 0, 0, 0.5);
          filter: brightness(1.2);
        }
        
        .font-zine-title {
          font-family: "Blackletter", serif;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .font-zine-body {
          font-family: "Special Elite", monospace;
        }

        .zine-layout {
          background-color: #f5f5e8;
          position: relative;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
