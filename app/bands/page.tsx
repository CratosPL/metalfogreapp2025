// src/app/bands/page.tsx - LEGION DATABASE
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaPlus, FaFilter, FaSort, FaMapMarkerAlt,
  FaCalendarAlt, FaMusic, FaUsers, FaEye, FaHeart
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCrossedSwords, GiDragonHead, GiWolfHead,
  GiThorHammer, GiCoffin, GiGhost, GiSwordman
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

  // Mock data - w przyszłości z Supabase
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
      description: 'Norwegian black metal pioneers who helped define the genre in the early 90s.',
      tags: ['Black Metal', 'Norwegian', 'Underground', 'Cult']
    },
    {
      id: '2',
      name: 'MORBID ANGEL',
      country: 'USA',
      genre: 'Death Metal',
      formedYear: 1983,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=300&h=300&fit=crop',
      members: ['Trey Azagthoth', 'Steve Tucker'],
      albums: 9,
      followers: 12890,
      description: 'Legendary death metal band from Florida, technical masters of extreme music.',
      tags: ['Death Metal', 'Technical', 'Florida', 'Legendary']
    },
    {
      id: '3',
      name: 'EMPEROR',
      country: 'Norway',
      genre: 'Symphonic Black Metal',
      formedYear: 1991,
      status: 'Split-up',
      image: 'https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=300&fit=crop',
      members: ['Ihsahn', 'Samoth', 'Trym'],
      albums: 4,
      followers: 9876,
      description: 'Symphonic black metal masters who elevated the genre to orchestral heights.',
      tags: ['Symphonic Black Metal', 'Norwegian', 'Progressive', 'Epic']
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
      description: 'Swedish black metal pioneer, creator of the viking metal subgenre.',
      tags: ['Black Metal', 'Viking Metal', 'Swedish', 'Pioneer']
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
      description: 'Notorious Norwegian black metal band with a dark and controversial history.',
      tags: ['Black Metal', 'Norwegian', 'Controversial', 'True Kvlt']
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
      description: 'Atmospheric black metal project exploring Nordic mythology and philosophy.',
      tags: ['Atmospheric Black Metal', 'Ambient', 'Norwegian', 'Solo Project']
    }
  ];

  const genres = ['all', 'Black Metal', 'Death Metal', 'Doom Metal', 'Thrash Metal', 'Progressive Metal', 'Symphonic Black Metal', 'Atmospheric Black Metal'];
  const countries = ['all', 'Norway', 'Sweden', 'Finland', 'USA', 'Germany', 'Poland', 'France', 'UK'];
  const decades = ['all', '1980s', '1990s', '2000s', '2010s', '2020s'];

  // Filtrowanie zespołów
  const filteredBands = mockBands.filter(band => {
    const matchesSearch = band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.country.toLowerCase().includes(searchTerm.toLowerCase());
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

  // Sortowanie zespołów
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
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <GiCrossedSwords className="text-4xl text-red-400" />
            <div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0]" style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                textShadow: '2px 2px 0 #333, 4px 4px 0 #666'
              }}>
                LEGION DATABASE
              </h1>
              <p className="text-[#999] text-sm md:text-base uppercase tracking-wide">
                Underground Metal Encyclopedia • {mockBands.length} Legions Archived
              </p>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search bands, genres, countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none font-mono"
            />
          </div>

          {/* CONTROLS */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 border-2 transition-colors uppercase font-bold text-xs tracking-wide ${
                  showFilters 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : 'bg-transparent border-[#666] text-[#ccc] hover:border-red-600'
                }`}
              >
                <FaFilter className="inline mr-2" /> FILTERS
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none font-mono text-xs uppercase"
              >
                <option value="name">Sort by Name</option>
                <option value="year">Sort by Year</option>
                <option value="followers">Sort by Followers</option>
                <option value="albums">Sort by Albums</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 border-2 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : 'bg-transparent border-[#666] text-[#ccc] hover:border-red-600'
                }`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 border-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : 'bg-transparent border-[#666] text-[#ccc] hover:border-red-600'
                }`}
              >
                ☰
              </button>
              
              <Link href="/bands/add" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 border-2 border-red-600 transition-colors uppercase font-bold text-xs tracking-wide">
                <FaPlus className="inline mr-2" /> ADD LEGION
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* FILTERS */}
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

      {/* STATS BAR */}
      <section className="bg-[#111] border-b-2 border-[#333] p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-[#0a0a0a] border border-[#333] p-3">
              <div className="text-red-400 font-bold text-lg">{filteredBands.length}</div>
              <div className="text-xs uppercase text-[#999]">Found Legions</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#333] p-3">
              <div className="text-blue-400 font-bold text-lg">{countries.length - 1}</div>
              <div className="text-xs uppercase text-[#999]">Countries</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#333] p-3">
              <div className="text-green-400 font-bold text-lg">{genres.length - 1}</div>
              <div className="text-xs uppercase text-[#999]">Genres</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#333] p-3">
              <div className="text-yellow-400 font-bold text-lg">
                {mockBands.reduce((sum, band) => sum + band.albums, 0)}
              </div>
              <div className="text-xs uppercase text-[#999]">Total Albums</div>
            </div>
          </div>
        </div>
      </section>

      {/* BANDS GRID/LIST */}
      <main className="max-w-7xl mx-auto p-6">
        {sortedBands.length === 0 ? (
          <div className="text-center py-12">
            <GiDeathSkull className="text-6xl text-[#666] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#999] mb-2 uppercase">No Legions Found</h3>
            <p className="text-[#666]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
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
        )}
      </main>

      {/* FOOTER INFO */}
      <footer className="bg-[#111] border-t-4 border-[#333] p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <GiDeathSkull className="text-xl text-[#666]" />
            <GiCrossedSwords className="text-xl text-[#666]" />
            <GiCoffin className="text-xl text-[#666]" />
            <GiGhost className="text-xl text-[#666]" />
          </div>
          <p className="text-[#666] text-sm uppercase tracking-widest">
            LEGION DATABASE • UNDERGROUND METAL ENCYCLOPEDIA
          </p>
          <p className="text-[#444] text-xs mt-2">
            Preserving the history of extreme music • Add your legion to the archives
          </p>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        body {
          background: #0a0a0a;
          font-family: 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
};

export default LegionDatabase;
