"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaHeart,
  FaShare, FaDownload, FaCoins, FaUpload, FaFilter, FaSearch,
  FaEthereum, FaBolt, FaFire, FaChartLine, FaTrophy, FaCrown, FaMusic
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCoffin, GiGhost, GiDragonHead, GiThorHammer,
  GiSkullCrossedBones, GiVikingHelmet, GiGothicCross, GiFlame,
  GiBloodySword, GiBattleAxe, GiWolfHead
} from 'react-icons/gi';
import Link from 'next/link';
import AudioPlayer from './components/AudioPlayer';
import TrackCard from './components/TrackCard';

// Enhanced mock data
const mockTracks = [
  {
    id: "1",
    title: "Freezing Moon",
    artist: "MAYHEM",
    album: "De Mysteriis Dom Sathanas",
    duration: "6:23",
    genre: "Black Metal",
    year: 1994,
    country: "Norway",
    audioUrl: "/audio/mayhem-freezing-moon.mp3",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    pricePerPlay: 0.001,
    totalPlays: 15420,
    earnings: 15.42,
    uploadedBy: "MAYHEM_OFFICIAL",
    uploadDate: "2024-12-01",
    isDemo: false,
    verified: true,
    quality: "HD",
    tags: ["black metal", "norwegian", "classic", "atmospheric", "legendary"],
    description: "Classic black metal masterpiece from the legendary Norwegian band. A journey into the frozen depths of darkness.",
    likes: 2847,
    recentActivity: "🔥 Trending #1 this week"
  },
  {
    id: "2", 
    title: "Winter Winds",
    artist: "FROSTY TORMENT",
    album: "Demo 2025",
    duration: "4:47",
    genre: "Black Metal",
    year: 2025,
    country: "Poland",
    audioUrl: "/audio/frosty-torment-winter-winds.mp3",
    coverUrl: "https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=300&h=300&fit=crop",
    pricePerPlay: 0.0005,
    totalPlays: 892,
    earnings: 0.446,
    uploadedBy: "FROSTY_TORMENT",
    uploadDate: "2025-01-15",
    isDemo: true,
    verified: false,
    quality: "Demo",
    tags: ["black metal", "polish", "atmospheric", "demo", "underground"],
    description: "Raw atmospheric black metal demo from emerging Polish band. Pure underground essence.",
    likes: 156,
    recentActivity: "📈 +89 plays today"
  },
  {
    id: "3",
    title: "Cosmic Wisdom",
    artist: "SOLAR WISDOM", 
    album: "Astral Paths",
    duration: "8:12",
    genre: "Atmospheric Black Metal",
    year: 2024,
    country: "Poland",
    audioUrl: "/audio/solar-wisdom-cosmic.mp3",
    coverUrl: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=300&fit=crop",
    pricePerPlay: 0.0008,
    totalPlays: 3421,
    earnings: 2.737,
    uploadedBy: "SOLAR_WISDOM",
    uploadDate: "2024-11-20",
    isDemo: false,
    verified: true,
    quality: "HD",
    tags: ["atmospheric", "black metal", "polish", "cosmic", "epic"],
    description: "Epic atmospheric journey through cosmic black metal landscapes. Transcendent experience.",
    likes: 734,
    recentActivity: "⭐ Editor's choice"
  },
  {
    id: "4",
    title: "Eternal Frost",
    artist: "NORDKVIST",
    album: "Winter Chronicles",
    duration: "7:33",
    genre: "Black Metal",
    year: 2024,
    country: "Sweden",
    audioUrl: "/audio/nordkvist-eternal-frost.mp3",
    coverUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    pricePerPlay: 0.0007,
    totalPlays: 1847,
    earnings: 1.293,
    uploadedBy: "NORDKVIST_BAND",
    uploadDate: "2024-12-15",
    isDemo: false,
    verified: true,
    quality: "HD",
    tags: ["black metal", "swedish", "melodic", "winter", "epic"],
    description: "Swedish black metal with melodic undertones. Winter-themed atmospheric masterpiece.",
    likes: 423,
    recentActivity: "🎵 New release"
  }
];

const genres = ["All", "Black Metal", "Death Metal", "Doom Metal", "Atmospheric Black Metal", "Symphonic Black Metal"];
const countries = ["All", "Norway", "Poland", "Sweden", "Finland", "USA", "Germany"];
const qualities = ["All", "HD", "Demo", "Remastered"];

export default function PlayerPage() {
  const [currentTrack, setCurrentTrack] = useState<any>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedQuality, setSelectedQuality] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced filtering
  const filteredTracks = mockTracks.filter(track => {
    const searchMatch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       track.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       track.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const genreMatch = selectedGenre === "All" || track.genre === selectedGenre;
    const countryMatch = selectedCountry === "All" || track.country === selectedCountry;
    const qualityMatch = selectedQuality === "All" || track.quality === selectedQuality;
    
    return searchMatch && genreMatch && countryMatch && qualityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter overflow-x-hidden">
      
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="animate-pulse text-6xl text-blue-300 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>ᚦ</div>
        <div className="animate-pulse text-5xl text-red-300 absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>ᚱ</div>
        <div className="animate-pulse text-4xl text-yellow-300 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>ᚠ</div>
        <div className="animate-pulse text-5xl text-purple-300 absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '9s', animationDelay: '6s' }}>ᚹ</div>
      </div>

      {/* ENHANCED HEADER */}
      <header className="bg-gradient-to-b from-gray-800 to-gray-900 border-b-4 border-blue-600 p-8 relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className={`relative transition-all duration-300 ${glitchActive ? 'filter brightness-125 saturate-150' : ''}`}>
                <GiDragonHead className="text-6xl md:text-7xl text-blue-500 drop-shadow-2xl" />
                {glitchActive && (
                  <GiDragonHead className="absolute top-0 left-0 text-6xl md:text-7xl text-blue-400 animate-ping opacity-30" />
                )}
              </div>
              <div>
                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest text-white mb-2 ${glitchActive ? 'animate-pulse text-blue-100' : ''}`}
                    style={{
                      textShadow: glitchActive 
                        ? '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.5)' 
                        : '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(59, 130, 246, 0.3)'
                    }}>
                  DEMO VAULT
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-gray-400 text-lg uppercase tracking-wide flex items-center gap-2">
                    <GiSkullCrossedBones className="text-blue-500" />
                    Stream • Earn • Support Underground Music
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold border border-blue-600/50">
                      {mockTracks.length} Underground Tracks
                    </span>
                    <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-600/50 flex items-center gap-1">
                      <FaEthereum className="text-xs" />
                      Crypto Rewards
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link
                href="/player/upload"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 border-2 border-blue-600 transition-all duration-300 hover:scale-105 uppercase font-bold text-sm tracking-wide rounded-lg shadow-lg hover:shadow-blue-600/50 flex items-center gap-2"
              >
                <FaUpload /> UPLOAD DEMO
              </Link>
              <Link
                href="/player/earnings"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 border-2 border-green-600 transition-all duration-300 hover:scale-105 uppercase font-bold text-sm tracking-wide rounded-lg shadow-lg hover:shadow-green-600/50 flex items-center gap-2"
              >
                <FaCoins /> EARNINGS
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Enhanced Search & Filters */}
      <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-b-2 border-gray-600 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-6"
          >
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search tracks, artists, albums, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium text-lg transition-all duration-300 shadow-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hidden lg:flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-700 rounded border">Ctrl</span>
              <span>+</span>
              <span className="px-2 py-1 bg-gray-700 rounded border">K</span>
            </div>
          </motion.div>

          {/* Enhanced Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          >
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 border-2 transition-all duration-300 uppercase font-bold text-sm tracking-wide rounded-lg hover:scale-105 ${
                  showFilters 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/50' 
                    : 'bg-transparent border-gray-600 text-gray-300 hover:border-blue-600 hover:text-blue-400'
                }`}
              >
                <FaFilter className="inline mr-2" /> 
                {showFilters ? 'HIDE FILTERS' : 'SHOW FILTERS'}
              </button>
              
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-4 py-3 bg-gray-800 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium text-sm uppercase transition-all duration-300"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-gray-800">
                    {genre === "All" ? "All Genres" : genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-400 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaMusic className="text-blue-400" />
                {filteredTracks.length} tracks
              </span>
              <span className="flex items-center gap-1">
                <FaFire className="text-orange-400" />
                {mockTracks.reduce((sum, t) => sum + t.totalPlays, 0).toLocaleString()} plays
              </span>
              <span className="flex items-center gap-1">
                <FaEthereum className="text-green-400" />
                {mockTracks.reduce((sum, t) => sum + t.earnings, 0).toFixed(3)} ETH earned
              </span>
            </div>
          </motion.div>

          {/* Enhanced Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-6 bg-gray-800/50 rounded-lg border border-gray-600 backdrop-blur-sm"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FaFilter className="text-blue-400" />
                Advanced Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-3 bg-gray-800 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none"
                  >
                    {countries.map(country => (
                      <option key={country} value={country} className="bg-gray-800">
                        {country === "All" ? "All Countries" : country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Quality</label>
                  <select
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    className="w-full p-3 bg-gray-800 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none"
                  >
                    {qualities.map(quality => (
                      <option key={quality} value={quality} className="bg-gray-800">
                        {quality === "All" ? "All Qualities" : quality}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedGenre("All");
                      setSelectedCountry("All");
                      setSelectedQuality("All");
                      setSearchTerm("");
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold uppercase text-sm transition-all duration-300"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Stats Bar */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-600 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FaMusic, value: mockTracks.length, label: 'Underground Tracks', color: 'from-blue-600/20 to-blue-800/20', borderColor: 'border-blue-600' },
              { icon: FaFire, value: `${Math.floor(mockTracks.reduce((sum, t) => sum + t.totalPlays, 0) / 1000)}K`, label: 'Total Plays', color: 'from-orange-600/20 to-orange-800/20', borderColor: 'border-orange-600' },
              { icon: FaEthereum, value: mockTracks.reduce((sum, t) => sum + t.earnings, 0).toFixed(2), label: 'ETH Distributed', color: 'from-green-600/20 to-green-800/20', borderColor: 'border-green-600' },
              { icon: FaTrophy, value: mockTracks.filter(t => t.verified).length, label: 'Verified Artists', color: 'from-yellow-600/20 to-yellow-800/20', borderColor: 'border-yellow-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} border-2 ${stat.borderColor} rounded-xl p-6 text-center backdrop-blur-sm shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <stat.icon className={`text-4xl mx-auto mb-3 ${stat.borderColor.replace('border', 'text')}`} />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs uppercase text-gray-400 font-bold tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Enhanced Track List */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <GiCoffin className="text-3xl text-blue-400" />
            <h2 className="text-2xl font-black uppercase tracking-wide text-white">Underground Tracks</h2>
            <div className="ml-auto bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">
              {filteredTracks.length} found
            </div>
          </motion.div>
          
          {filteredTracks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <GiDeathSkull className="text-8xl text-gray-600 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-black text-gray-400 mb-4 uppercase tracking-wide">No Tracks Found</h3>
              <p className="text-gray-500 mb-8 text-lg">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('All');
                  setSelectedCountry('All');
                  setSelectedQuality('All');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TrackCard
                    track={track}
                    isCurrentTrack={currentTrack?.id === track.id}
                    isPlaying={isPlaying && currentTrack?.id === track.id}
                    onPlay={() => {
                      setCurrentTrack(track);
                      setIsPlaying(true);
                    }}
                    onPause={() => setIsPlaying(false)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Player Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AudioPlayer
              track={currentTrack}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onNext={() => {
                const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack?.id);
                const nextTrack = filteredTracks[currentIndex + 1] || filteredTracks[0];
                setCurrentTrack(nextTrack);
              }}
              onPrevious={() => {
                const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack?.id);
                const prevTrack = filteredTracks[currentIndex - 1] || filteredTracks[filteredTracks.length - 1];
                setCurrentTrack(prevTrack);
              }}
            />
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 mt-8 shadow-lg backdrop-blur-sm"
          >
            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wide flex items-center gap-2">
              <FaChartLine className="text-yellow-400" />
              Platform Stats
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Total Tracks', value: mockTracks.length, icon: FaMusic, color: 'text-blue-400' },
                { label: 'Total Plays', value: mockTracks.reduce((sum, t) => sum + t.totalPlays, 0).toLocaleString(), icon: FaFire, color: 'text-orange-400' },
                { label: 'Artist Earnings', value: `${mockTracks.reduce((sum, t) => sum + t.earnings, 0).toFixed(3)} ETH`, icon: FaEthereum, color: 'text-green-400' },
                { label: 'Verified Artists', value: mockTracks.filter(t => t.verified).length, icon: FaCrown, color: 'text-yellow-400' }
              ].map((stat, index) => (
                <div key={stat.label} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`${stat.color}`} />
                    <span className="text-gray-300 text-sm">{stat.label}:</span>
                  </div>
                  <span className={`${stat.color} font-bold`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trending Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-600 rounded-xl p-6 mt-8 shadow-lg backdrop-blur-sm"
          >
            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wide flex items-center gap-2">
              <FaFire className="text-red-500" />
              Trending Now
            </h3>
            <div className="space-y-3">
              {mockTracks.slice(0, 3).map((track, index) => (
                <div key={track.id} className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded transition-colors cursor-pointer"
                     onClick={() => {
                       setCurrentTrack(track);
                       setIsPlaying(true);
                     }}>
                  <div className="text-red-500 font-bold text-sm">#{index + 1}</div>
                  <img src={track.coverUrl} alt={track.title} className="w-8 h-8 rounded grayscale" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-bold truncate">{track.title}</div>
                    <div className="text-gray-400 text-xs truncate">{track.artist}</div>
                  </div>
                  <FaPlay className="text-gray-500 hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-blue-600 p-8 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            {[GiDeathSkull, GiCoffin, GiGhost, GiSkullCrossedBones, GiVikingHelmet].map((Icon, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.2, rotate: 15 }} 
                className="cursor-pointer"
              >
                <Icon className="text-3xl text-gray-600 hover:text-blue-500 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">
            DEMO VAULT
          </h3>
          <p className="text-gray-400 uppercase tracking-wider mb-4">
            Stream • Earn • Support Underground Music
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Artists get 80% • Listeners earn rewards • Powered by Optimism
          </p>
          <div className="flex justify-center items-center gap-2 text-xs text-gray-500">
            <FaEthereum className="text-blue-400" />
            <span>Powered by Optimism Blockchain</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
