'use client';

import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useState, useEffect } from 'react';
import { 
  GiDeathSkull, 
  GiCrossedSwords, 
  GiThorHammer,
  GiFlame,
  GiDragonHead 
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
  FaFire
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
  const [newBand, setNewBand] = useState({
    name: '',
    genre: '',
    country: '',
    yearFormed: new Date().getFullYear()
  });

  // ✅ Import smart contract hooks
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

  // ✅ Get data from smart contract
  const { data: contractUserStats, refetch: refetchUserStats } = useUserStats(address || '');
  const { data: contractUserBands, refetch: refetchUserBands } = useUserBands(address || '');
  const { data: totalBands } = useTotalBands();

  const metalGenres = [
    'Black Metal', 'Death Metal', 'Doom Metal', 'Thrash Metal', 
    'Heavy Metal', 'Power Metal', 'Folk Metal', 'Progressive Metal',
    'Symphonic Metal', 'Grindcore', 'Sludge Metal', 'Post-Metal'
  ];

  // ✅ Funkcja kalkulacji danych użytkownika
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

    // Pobieraj dane z smart contractu
    const reputation = Number(contractStats.reputation);
    const totalBands = Number(contractStats.totalBands);
    const verifiedBands = Number(contractStats.verifiedBands);
    const joinDate = new Date(Number(contractStats.joinDate) * 1000).toISOString().split('T')[0];

    // Analiza gatunków z rzeczywistych danych zespołów
    const genres = bands.map(band => band.genre).filter(Boolean);
    const genreCounts = genres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const favoriteGenres = Object.entries(genreCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    // Analiza krajów
    const countries = bands.map(band => band.country).filter(Boolean);
    const countryCounts = countries.reduce((acc, country) => {
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topCountries = Object.entries(countryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([country]) => country);

    // Discovery Score (0-100%)
    const maxGenres = metalGenres.length;
    const discoveredGenres = Object.keys(genreCounts).length;
    const discoveryScore = Math.min(100, (discoveredGenres / maxGenres) * 100);

    // Contribution Level na podstawie reputacji
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

  // ✅ Ładowanie danych z blockchain
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

  // ✅ Dodawanie zespołu
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

  // ✅ Odświeżanie po udanej transakcji
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
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 text-center max-w-md">
          <GiDeathSkull className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Join the Underground</h2>
          <p className="text-gray-400 mb-6">Connect your wallet to access your Metal Forge profile and start building your underground legacy</p>
          <button 
            onClick={() => open()}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 text-white font-bold uppercase tracking-wider transition-all duration-200 w-full"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Profile Header */}
        <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center relative">
                <GiDragonHead className="text-white text-3xl" />
                {userData && userData.reputation >= 500 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <FaTrophy className="text-yellow-900 text-xs" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {userData?.contributionLevel || 'Underground Warrior'}
                </h1>
                <p className="text-gray-400 font-mono text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
                <p className="text-red-400 text-sm font-bold">
                  Member since {userData?.joinedDate || 'Today'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={openReownProfile}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
              >
                <FaWallet className="text-xs" />
                Wallet Settings
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 text-white text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2">
                <FaCog className="text-xs" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center relative">
            <GiFlame className="text-red-500 text-3xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userData?.reputation || 0}</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Reputation</div>
            {userData && userData.reputation >= 100 && (
              <FaStar className="absolute top-2 right-2 text-yellow-400" />
            )}
          </div>
          
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
            <GiCrossedSwords className="text-blue-400 text-3xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userData?.totalBands || 0}</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Bands Added</div>
          </div>
          
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center relative">
            <FaCheck className="text-green-400 text-3xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userData?.verifiedBands || 0}</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Verified</div>
            {userData && userData.verifiedBands >= 5 && (
              <FaFire className="absolute top-2 right-2 text-orange-400" />
            )}
          </div>
          
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
            <GiThorHammer className="text-yellow-400 text-3xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userData?.discoveryScore || 0}%</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Discovery</div>
          </div>
        </div>

        {/* Reputation Progress Bar */}
        {userData && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-bold">Progress to Next Level</h3>
              <span className="text-gray-400 text-sm">
                {userData.reputation}/
                {userData.reputation >= 1000 ? 'MAX' : 
                 userData.reputation >= 750 ? '1000' :
                 userData.reputation >= 500 ? '750' :
                 userData.reputation >= 250 ? '500' :
                 userData.reputation >= 100 ? '250' : '100'}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (userData.reputation % 
                    (userData.reputation >= 1000 ? 1000 :
                     userData.reputation >= 750 ? 250 :
                     userData.reputation >= 500 ? 250 :
                     userData.reputation >= 250 ? 250 :
                     userData.reputation >= 100 ? 150 : 100)) / 
                    (userData.reputation >= 1000 ? 1000 :
                     userData.reputation >= 750 ? 250 :
                     userData.reputation >= 500 ? 250 :
                     userData.reputation >= 250 ? 250 :
                     userData.reputation >= 100 ? 150 : 100) * 100)}%`
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Metal DNA Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <GiDeathSkull className="text-red-500" />
            Metal DNA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-bold mb-2">Favorite Genres</h3>
              <div className="flex flex-wrap gap-2">
                {userData?.metalDNA.favoriteGenres.length ? (
                  userData.metalDNA.favoriteGenres.map((genre) => (
                    <span 
                      key={genre}
                      className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">Add bands to discover your Metal DNA</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Top Countries</h3>
              <div className="flex flex-wrap gap-2">
                {userData?.metalDNA.topCountries.length ? (
                  userData.metalDNA.topCountries.map((country) => (
                    <span 
                      key={country}
                      className="bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider"
                    >
                      {country}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">Explore different countries</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* My Bands Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GiCrossedSwords className="text-red-500" />
              My Added Bands ({userBands.length})
              {loadingBandDetails && <span className="text-blue-400 text-sm ml-2">⏳ Loading...</span>}
            </h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
              disabled={isLoading}
            >
              <FaPlus className="text-xs" />
              {isLoading ? 'Adding...' : 'Add Band'}
            </button>
          </div>

          {/* Add Band Form */}
          {showAddForm && (
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="text-white font-bold mb-4">Add New Band to Encyclopedia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Band Name</label>
                  <input
                    type="text"
                    value={newBand.name}
                    onChange={(e) => setNewBand({...newBand, name: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:border-red-500 outline-none"
                    placeholder="Enter band name..."
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Genre</label>
                  <select
                    value={newBand.genre}
                    onChange={(e) => setNewBand({...newBand, genre: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:border-red-500 outline-none"
                    disabled={isLoading}
                  >
                    <option value="">Select genre...</option>
                    {metalGenres.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Country</label>
                  <input
                    type="text"
                    value={newBand.country}
                    onChange={(e) => setNewBand({...newBand, country: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:border-red-500 outline-none"
                    placeholder="e.g., Norway, Sweden..."
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Year Formed</label>
                  <input
                    type="number"
                    value={newBand.yearFormed}
                    onChange={(e) => setNewBand({...newBand, yearFormed: parseInt(e.target.value)})}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:border-red-500 outline-none"
                    min="1960"
                    max={new Date().getFullYear()}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={handleAddBand}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 text-white font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
                >
                  <FaCheck className="text-xs" />
                  {isLoading ? '⏳ Adding to Blockchain...' : 'Add Band (+5 Reputation)'}
                </button>
                <button 
                  onClick={() => setShowAddForm(false)}
                  disabled={isLoading}
                  className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 px-4 py-2 text-white font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
                >
                  <FaTimes className="text-xs" />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Bands List */}
          {loadingBandDetails ? (
            <div className="text-center py-12 text-gray-400">
              <GiDeathSkull className="text-6xl mx-auto mb-4 opacity-50 animate-pulse" />
              <p className="text-lg">Loading your bands from blockchain...</p>
              <p className="text-sm">⏳ Fetching band details from Optimism...</p>
            </div>
          ) : userBands.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <GiDeathSkull className="text-6xl mx-auto mb-4 opacity-50" />
              <p className="text-lg">No bands added yet</p>
              <p className="text-sm">Start building the underground encyclopedia and earn reputation!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userBands.map((band) => (
                <div key={band.id} className="bg-gray-800 border border-gray-600 rounded-lg p-4 relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold">{band.name}</h3>
                    {band.verified ? (
                      <div className="flex items-center gap-1">
                        <FaCheck className="text-green-400" />
                        <span className="text-green-400 text-xs">+10 Rep</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-xs">Pending</span>
                        <button 
                          onClick={() => verifyBand(band.id)}
                          className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                          title="Verify (TODO: Smart Contract)"
                        >
                          Verify
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-red-400 text-sm font-bold mb-1">{band.genre}</p>
                  <p className="text-gray-400 text-sm">{band.country} • {band.yearFormed}</p>
                  <p className="text-gray-500 text-xs mt-2">Added {band.addedAt}</p>
                  <div className="absolute top-2 left-2 text-xs text-blue-400">+5</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
