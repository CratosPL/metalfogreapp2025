"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaPlus, FaFilter, FaSort, FaMapMarkerAlt,
  FaCalendarAlt, FaMusic, FaUsers, FaEye, FaHeart,
  FaEthereum, FaBolt, FaChartLine, FaFire,
  FaSkullCrossbones
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCrossedSwords, GiDragonHead, GiWolfHead,
  GiThorHammer, GiCoffin, GiGhost, GiSwordman, GiSkullCrossedBones,
  GiVikingHelmet, GiGothicCross, GiBloodySword, GiBattleAxe,
  GiBlackFlag, GiFlame
} from 'react-icons/gi';
import Link from 'next/link';
import BandCard from '@/app/bands/components/BandCard';
import BandFilter from '@/app/bands/components/BandFilter';

const LegionDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedDecade, setSelectedDecade] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced mock data
  const mockBands = [
    {
      id: '1',
      name: 'DARKTHRONE',
      country: 'Norway',
      genre: 'Black Metal',
      formedYear: 1986,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      members: ['Fenriz', 'Nocturno Culto'],
      albums: 19,
      followers: 15420,
      reputation: 950,
      verified: true,
      description: 'Norwegian black metal pioneers who helped define the genre in the early 90s with their raw, uncompromising sound.',
      tags: ['Black Metal', 'Norwegian', 'Underground', 'Cult', 'KVLT'],
      recentActivity: 'Added 2 hours ago by DEATH_SCRIBE'
    },
    {
      id: '2',
      name: 'MORBID ANGEL',
      country: 'USA',
      genre: 'Death Metal',
      formedYear: 1983,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=300&h=300&fit=crop',
      members: ['Trey Azagthoth', 'Steve Tucker', 'Dan Vadim Von'],
      albums: 9,
      followers: 12890,
      reputation: 875,
      verified: true,
      description: 'Legendary Florida death metal masters, technical innovators of extreme music with occult themes.',
      tags: ['Death Metal', 'Technical', 'Florida', 'Legendary', 'Occult'],
      recentActivity: 'Added 5 hours ago by NECRO_HERALD'
    },
    {
      id: '3',
      name: 'EMPEROR',
      country: 'Norway',
      genre: 'Symphonic Black Metal',
      formedYear: 1991,
      status: 'Split-up',
      image: 'https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=300&fit=crop',
      members: ['Ihsahn', 'Samoth', 'Trym Torson'],
      albums: 4,
      followers: 9876,
      reputation: 820,
      verified: true,
      description: 'Symphonic black metal masters who elevated the genre to orchestral heights with epic compositions.',
      tags: ['Symphonic Black Metal', 'Norwegian', 'Progressive', 'Epic', 'Atmospheric'],
      recentActivity: 'Added 1 day ago by KVLT_WARRIOR'
    },
    {
      id: '4',
      name: 'BATHORY',
      country: 'Sweden',
      genre: 'Black Metal',
      formedYear: 1983,
      status: 'Split-up',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      members: ['Quorthon'],
      albums: 12,
      followers: 18765,
      reputation: 999,
      verified: true,
      description: 'Swedish black metal pioneer, creator of the viking metal subgenre. Eternal influence on extreme music.',
      tags: ['Black Metal', 'Viking Metal', 'Swedish', 'Pioneer', 'Legendary'],
      recentActivity: 'Added 3 days ago by VIKING_KEEPER'
    },
    {
      id: '5',
      name: 'MAYHEM',
      country: 'Norway',
      genre: 'Black Metal',
      formedYear: 1984,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
      members: ['Necrobutcher', 'Hellhammer', 'Attila Csihar'],
      albums: 6,
      followers: 14532,
      reputation: 888,
      verified: true,
      description: 'Notorious Norwegian black metal band with dark history. True pioneers of the underground scene.',
      tags: ['Black Metal', 'Norwegian', 'Controversial', 'True Kvlt', 'Underground'],
      recentActivity: 'Added 1 week ago by FROST_WARRIOR'
    },
    {
      id: '6',
      name: 'BURZUM',
      country: 'Norway',
      genre: 'Atmospheric Black Metal',
      formedYear: 1991,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      members: ['Varg Vikernes'],
      albums: 11,
      followers: 11234,
      reputation: 777,
      verified: false,
      description: 'Atmospheric black metal project exploring Nordic mythology, philosophy and ambient soundscapes.',
      tags: ['Atmospheric Black Metal', 'Ambient', 'Norwegian', 'Solo Project', 'Philosophical'],
      recentActivity: 'Submitted for verification by PHILOSOPHICAL_VOID'
    }
  ];

  const genres = ['all', 'Black Metal', 'Death Metal', 'Doom Metal', 'Thrash Metal', 'Progressive Metal', 'Symphonic Black Metal', 'Atmospheric Black Metal'];
  const countries = ['all', 'Norway', 'Sweden', 'Finland', 'USA', 'Germany', 'Poland', 'France', 'UK'];
  const decades = ['all', '1980s', '1990s', '2000s', '2010s', '2020s'];

  // Enhanced filtering
  const filteredBands = mockBands.filter(band => {
    const matchesSearch = band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGenre = selectedGenre === 'all' || band.genre === selectedGenre;
    const matchesCountry = selectedCountry === 'all' || band.country === selectedCountry;
    const matchesDecade = selectedDecade === 'all' || 
                         (selectedDecade === '1980s' && band.formedYear >= 1980 && band.formedYear < 1990) ||
                         (selectedDecade === '1990s' && band.formedYear >= 1990 && band.formedYear < 2000) ||
                         (selectedDecade === '2000s' && band.formedYear >= 2000 && band.formedYear < 2010) ||
                         (selectedDecade === '2010s' && band.formedYear >= 2010 && band.formedYear < 2020) ||
                         (selectedDecade === '2020s' && band.formedYear >= 2020);
    
    return matchesSearch && matchesGenre && matchesCountry && matchesDecade;
  });

  // Enhanced sorting
  const sortedBands = [...filteredBands].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'year':
        return a.formedYear - b.formedYear;
      case 'followers':
        return b.followers - a.followers;
      case 'albums':
        return b.albums - a.albums;
      case 'reputation':
        return b.reputation - a.reputation;
      default:
        return 0;
    }
  });

  return (
    <div 
      className="min-h-screen bg-[#f5f5e8] text-black font-zine-body overflow-x-hidden zine-layout"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      {/* Decorative skulls w tle */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-800 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>☠</div>
        <div className="animate-pulse text-5xl text-black absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>☠</div>
        <div className="animate-pulse text-4xl text-red-800 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>☠</div>
        <div className="animate-pulse text-5xl text-black absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '9s', animationDelay: '6s' }}>☠</div>
      </div>

      {/* ENHANCED HEADER w stylu Zine */}
      <header 
        className="bg-[#f5f5e8] border-b-4 border-black p-8 relative z-10 shadow-metal zine-header"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(245, 245, 232, 0.95)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className={`relative transition-all duration-300 ${glitchActive ? 'filter brightness-125 saturate-150' : ''}`}>
              <GiCrossedSwords className="text-6xl md:text-7xl text-red-800 drop-shadow-2xl" />
              {glitchActive && (
                <GiCrossedSwords className="absolute top-0 left-0 text-6xl md:text-7xl text-red-600 animate-ping opacity-30" />
              )}
            </div>
            <div>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest text-black mb-2 font-zine-title ${glitchActive ? 'animate-pulse text-red-800' : ''}`} 
                  style={{
                    textShadow: glitchActive 
                      ? '0 0 20px rgba(139, 0, 0, 0.8), 0 0 40px rgba(139, 0, 0, 0.5)' 
                      : '2px 2px 4px rgba(0,0,0,0.3)'
                  }}>
                LEGION DATABASE
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-black text-lg uppercase tracking-wide flex items-center gap-2 font-zine-body">
                  <FaSkullCrossbones className="text-red-800" />
                  Underground Metal Encyclopedia
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-red-800 text-white px-3 py-1 rounded-none text-sm font-bold border-2 border-black">
                    {mockBands.length} Legions Archived
                  </span>
                  <span className="bg-black text-red-800 px-3 py-1 rounded-none text-sm font-bold border-2 border-red-800 flex items-center gap-1">
                    <FaEthereum className="text-xs" />
                    Web3 Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Search Bar w stylu Zine */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-6"
          >
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-lg" />
            <input
              type="text"
              placeholder="Search legions by name, genre, country, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-[#e0e0d8] backdrop-blur-sm border-2 border-black hover:border-red-800 focus:border-red-800 text-black rounded-none outline-none font-medium text-lg transition-all duration-300 shadow-metal zine-card font-zine-body"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-black hidden lg:flex items-center gap-2 font-zine-body">
              <span className="px-2 py-1 bg-black text-white rounded-none border border-black">Ctrl</span>
              <span>+</span>
              <span className="px-2 py-1 bg-black text-white rounded-none border border-black">K</span>
            </div>
          </motion.div>

          {/* Enhanced Controls w stylu Zine */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          >
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 border-2 transition-all duration-300 uppercase font-bold text-sm tracking-wide rounded-none hover:scale-105 font-zine-body ${
                  showFilters 
                    ? 'bg-red-800 border-red-800 text-white shadow-metal' 
                    : 'bg-[#f5f5e8] border-black text-black hover:border-red-800 hover:text-red-800'
                }`}
              >
                <FaFilter className="inline mr-2" /> 
                {showFilters ? 'HIDE FILTERS' : 'SHOW FILTERS'}
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-[#e0e0d8] border-2 border-black hover:border-red-800 focus:border-red-800 text-black rounded-none outline-none font-medium text-sm uppercase transition-all duration-300 font-zine-body"
              >
                <option value="name">Sort by Name</option>
                <option value="year">Sort by Year</option>
                <option value="followers">Sort by Followers</option>
                <option value="albums">Sort by Albums</option>
                <option value="reputation">Sort by Reputation</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 border-2 transition-all duration-300 rounded-none hover:scale-105 ${
                  viewMode === 'grid' 
                    ? 'bg-red-800 border-red-800 text-white shadow-metal' 
                    : 'bg-[#f5f5e8] border-black text-black hover:border-red-800'
                }`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current w-1.5 h-1.5 rounded-none"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-none"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-none"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-none"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 border-2 transition-all duration-300 rounded-none hover:scale-105 ${
                  viewMode === 'list' 
                    ? 'bg-red-800 border-red-800 text-white shadow-metal' 
                    : 'bg-[#f5f5e8] border-black text-black hover:border-red-800'
                }`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current w-full h-0.5 rounded-none"></div>
                  <div className="bg-current w-full h-0.5 rounded-none"></div>
                  <div className="bg-current w-full h-0.5 rounded-none"></div>
                  <div className="bg-current w-full h-0.5 rounded-none"></div>
                </div>
              </button>
              
              <Link 
                href="/bands/add" 
                className="skull-button text-[#d0d0d0] px-6 py-3 border-2 border-red-800 transition-all duration-300 hover:scale-105 uppercase font-bold text-sm tracking-wide rounded-none shadow-metal font-zine-body"
              >
                <FaPlus className="inline mr-2" /> ADD LEGION
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Enhanced Filters w stylu Zine */}
      {showFilters && (
        <BandFilter
          genres={genres}
          countries={countries}
          decades={decades}
          selectedGenre={selectedGenre}
          selectedCountry={selectedCountry}
          selectedDecade={selectedDecade}
          onGenreChange={setSelectedGenre}
          onCountryChange={setSelectedCountry}
          onDecadeChange={setSelectedDecade}
        />
      )}

      {/* Enhanced Stats Bar w stylu Zine */}
      <section 
        className="bg-[#e0e0d8] border-b-2 border-black p-6 relative z-10 zine-card"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(224, 224, 216, 0.95)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: GiCrossedSwords, value: filteredBands.length, label: 'Found Legions' },
              { icon: FaMapMarkerAlt, value: countries.length - 1, label: 'Countries' },
              { icon: FaMusic, value: genres.length - 1, label: 'Genres' },
              { icon: FaFire, value: mockBands.reduce((sum, band) => sum + band.albums, 0), label: 'Total Albums' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#f5f5e8] border-2 border-black rounded-none p-4 text-center relative shadow-metal backdrop-blur-sm transition-all duration-300 hover:border-red-800 zine-card"
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.9)"
                }}
              >
                <stat.icon className="text-red-800 text-3xl mx-auto mb-2" />
                <div className="text-2xl font-bold text-black mb-1 font-zine-title">{stat.value}</div>
                <div className="text-black text-xs uppercase tracking-wider font-bold font-zine-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content w stylu Zine */}
      <main className="max-w-7xl mx-auto p-6">
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedBands.map((band, index) => (
            <motion.div
              key={band.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BandCard band={band} viewMode={viewMode} />
            </motion.div>
          ))}
        </div>

        {filteredBands.length === 0 && (
          <div 
            className="text-center py-20 bg-[#f5f5e8] border-4 border-black zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <GiWolfHead className="text-8xl mx-auto mb-6 opacity-50 text-black" />
            <p className="text-xl font-bold text-black font-zine-title uppercase">No Legions Found</p>
            <p className="text-sm mt-2 text-black font-zine-body">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <style jsx>{`
        .zine-layout {
          background-color: #f5f5e8;
          background-image: url("/images/zine/paper_texture_distressed.jpg");
          background-size: cover;
          background-position: center;
          position: relative;
          overflow-x: hidden;
        }
        
        .zine-header {
          border-image: url("/images/zine/jagged_border.png") 30 round;
        }
        
        .zine-card {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
      `}</style>
    </div>
  );
};

export default LegionDatabase;
