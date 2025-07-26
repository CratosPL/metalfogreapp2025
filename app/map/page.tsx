"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaMusic, 
  FaUsers, 
  FaCalendarAlt,
  FaEthereum,
  FaBolt,
  FaFire,
  FaChartLine,
  FaCrown,
  FaGlobe
} from 'react-icons/fa'
import { 
  GiTreasureMap, 
  GiCrossedSwords, 
  GiDragonHead, 
  GiVikingHelmet,
  GiSkullCrossedBones,
  GiGothicCross,
  GiFlame,
  GiBloodySword,
  GiBattleAxe,
  GiDeathSkull
} from 'react-icons/gi'
import WorldMap from '@/components/WorldMap'
import CountryDetails from '@/components/CountryDetails'
import SceneTimeline from '@/components/SceneTimeline'
import FestivalMarkers from '@/components/FestivalMarkers'
import BandOrigins from '@/components/BandOrigins'

interface Country {
  id: string
  name: string
  flag: string
  coordinates: [number, number]
  metalScene: {
    totalBands: number
    activeScenes: string[]
    dominantGenres: string[]
    foundingYear: number
    influence: number
    reputation: number
    legendaryBands: string[]
    currentActivity: 'High' | 'Medium' | 'Low'
  }
  festivals: Array<{
    name: string
    location: string
    genre: string
    attendance: number
    founded: number
  }>
  statistics: {
    albumsReleased: number
    totalStreams: number
    exportRevenue: number
    venueCount: number
  }
}

const UndergroundMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [selectedDecade, setSelectedDecade] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'bands' | 'festivals' | 'scenes' | 'timeline'>('bands')
  const [searchTerm, setSearchTerm] = useState('')
  const [glitchActive, setGlitchActive] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Mock data with enhanced metal scene information
  const metalCountries: Country[] = [
    {
      id: 'norway',
      name: 'Norway',
      flag: '🇳🇴',
      coordinates: [10.7522, 59.9139],
      metalScene: {
        totalBands: 847,
        activeScenes: ['Black Metal', 'Viking Metal', 'Folk Metal'],
        dominantGenres: ['Black Metal', 'Viking Metal'],
        foundingYear: 1984,
        influence: 97,
        reputation: 999,
        legendaryBands: ['Darkthrone', 'Mayhem', 'Emperor', 'Bathory', 'Immortal'],
        currentActivity: 'High'
      },
      festivals: [
        { name: 'Hole in the Sky', location: 'Bergen', genre: 'Extreme Metal', attendance: 15000, founded: 2001 },
        { name: 'Inferno Metal Festival', location: 'Oslo', genre: 'Black/Death Metal', attendance: 8000, founded: 2001 },
        { name: 'Northern Discomfort', location: 'Kristiansand', genre: 'Black Metal', attendance: 3000, founded: 2005 }
      ],
      statistics: {
        albumsReleased: 12500,
        totalStreams: 890000000,
        exportRevenue: 45000000,
        venueCount: 234
      }
    },
    {
      id: 'sweden',
      name: 'Sweden',
      flag: '🇸🇪',
      coordinates: [18.0686, 59.3293],
      metalScene: {
        totalBands: 623,
        activeScenes: ['Melodic Death Metal', 'Black Metal', 'Progressive Metal'],
        dominantGenres: ['Melodic Death Metal', 'Progressive Metal'],
        foundingYear: 1983,
        influence: 94,
        reputation: 950,
        legendaryBands: ['Bathory', 'At the Gates', 'In Flames', 'Opeth', 'Amon Amarth'],
        currentActivity: 'High'
      },
      festivals: [
        { name: 'Sweden Rock Festival', location: 'Sölvesborg', genre: 'Heavy Metal', attendance: 33000, founded: 1992 },
        { name: 'Getaway Rock', location: 'Gävle', genre: 'Rock/Metal', attendance: 25000, founded: 2006 },
        { name: 'Copenhell', location: 'Stockholm', genre: 'Metal', attendance: 20000, founded: 2010 }
      ],
      statistics: {
        albumsReleased: 8900,
        totalStreams: 1200000000,
        exportRevenue: 67000000,
        venueCount: 189
      }
    },
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      coordinates: [-95.7129, 37.0902],
      metalScene: {
        totalBands: 1234,
        activeScenes: ['Death Metal', 'Thrash Metal', 'Metalcore', 'Progressive Metal'],
        dominantGenres: ['Death Metal', 'Thrash Metal'],
        foundingYear: 1981,
        influence: 96,
        reputation: 925,
        legendaryBands: ['Morbid Angel', 'Death', 'Slayer', 'Metallica', 'Cannibal Corpse'],
        currentActivity: 'High'
      },
      festivals: [
        { name: 'Maryland Deathfest', location: 'Baltimore', genre: 'Death/Grind', attendance: 12000, founded: 2003 },
        { name: 'Download Festival', location: 'Las Vegas', genre: 'Metal', attendance: 40000, founded: 2018 },
        { name: 'Summer Slaughter', location: 'Various Cities', genre: 'Death Metal', attendance: 8000, founded: 2007 }
      ],
      statistics: {
        albumsReleased: 25600,
        totalStreams: 2100000000,
        exportRevenue: 125000000,
        venueCount: 567
      }
    },
    {
      id: 'finland',
      name: 'Finland',
      flag: '🇫🇮',
      coordinates: [25.7482, 61.9241],
      metalScene: {
        totalBands: 445,
        activeScenes: ['Folk Metal', 'Symphonic Metal', 'Doom Metal'],
        dominantGenres: ['Folk Metal', 'Symphonic Metal'],
        foundingYear: 1985,
        influence: 89,
        reputation: 875,
        legendaryBands: ['Nightwish', 'Children of Bodom', 'Ensiferum', 'Korpiklaani', 'Amorphis'],
        currentActivity: 'High'
      },
      festivals: [
        { name: 'Tuska Open Air', location: 'Helsinki', genre: 'Metal', attendance: 35000, founded: 1998 },
        { name: 'Nummirock', location: 'Nummijärvi', genre: 'Rock/Metal', attendance: 15000, founded: 1986 },
        { name: 'Jalometalli', location: 'Oulu', genre: 'Metal', attendance: 8000, founded: 2002 }
      ],
      statistics: {
        albumsReleased: 5400,
        totalStreams: 456000000,
        exportRevenue: 23000000,
        venueCount: 123
      }
    },
    {
      id: 'germany',
      name: 'Germany',
      flag: '🇩🇪',
      coordinates: [10.4515, 51.1657],
      metalScene: {
        totalBands: 567,
        activeScenes: ['Thrash Metal', 'Power Metal', 'Industrial Metal'],
        dominantGenres: ['Thrash Metal', 'Power Metal'],
        foundingYear: 1982,
        influence: 91,
        reputation: 888,
        legendaryBands: ['Kreator', 'Sodom', 'Destruction', 'Helloween', 'Rammstein'],
        currentActivity: 'High'
      },
      festivals: [
        { name: 'Wacken Open Air', location: 'Wacken', genre: 'Metal', attendance: 85000, founded: 1990 },
        { name: 'Rock am Ring', location: 'Nürburgring', genre: 'Rock/Metal', attendance: 87000, founded: 1985 },
        { name: 'Party.San', location: 'Bad Berka', genre: 'Metal', attendance: 12000, founded: 2000 }
      ],
      statistics: {
        albumsReleased: 8700,
        totalStreams: 987000000,
        exportRevenue: 78000000,
        venueCount: 298
      }
    },
    {
      id: 'poland',
      name: 'Poland',
      flag: '🇵🇱',
      coordinates: [19.1344, 51.9194],
      metalScene: {
        totalBands: 389,
        activeScenes: ['Death Metal', 'Black Metal', 'Technical Death'],
        dominantGenres: ['Death Metal', 'Black Metal'],
        foundingYear: 1987,
        influence: 85,
        reputation: 820,
        legendaryBands: ['Vader', 'Behemoth', 'Decapitated', 'Hate', 'Graveland'],
        currentActivity: 'High'
      },
      festivals: [
        { name: 'Metalmania', location: 'Katowice', genre: 'Metal', attendance: 20000, founded: 1986 },
        { name: 'Brutal Assault', location: 'Jaroměř', genre: 'Extreme Metal', attendance: 18000, founded: 1995 },
        { name: 'Castle Party', location: 'Bolków', genre: 'Gothic/Metal', attendance: 15000, founded: 1994 }
      ],
      statistics: {
        albumsReleased: 4200,
        totalStreams: 234000000,
        exportRevenue: 12000000,
        venueCount: 156
      }
    }
  ]

  const genres = ['all', 'Black Metal', 'Death Metal', 'Doom Metal', 'Thrash Metal', 'Power Metal', 'Folk Metal', 'Progressive Metal']
  const decades = ['all', '1980s', '1990s', '2000s', '2010s', '2020s']

  const filteredCountries = metalCountries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.metalScene.dominantGenres.some(genre => 
                           genre.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    const matchesGenre = selectedGenre === 'all' || 
                        country.metalScene.dominantGenres.includes(selectedGenre)
    
    return matchesSearch && matchesGenre
  })

  const totalStats = metalCountries.reduce((acc, country) => ({
    bands: acc.bands + country.metalScene.totalBands,
    festivals: acc.festivals + country.festivals.length,
    albums: acc.albums + country.statistics.albumsReleased,
    venues: acc.venues + country.statistics.venueCount
  }), { bands: 0, festivals: 0, albums: 0, venues: 0 })

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter overflow-x-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-300 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '10s' }}>ᚦ</div>
        <div className="animate-pulse text-5xl text-blue-300 absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '12s', animationDelay: '2s' }}>ᚱ</div>
        <div className="animate-pulse text-4xl text-yellow-300 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '8s', animationDelay: '4s' }}>ᚠ</div>
        <div className="animate-pulse text-5xl text-purple-300 absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '11s', animationDelay: '6s' }}>ᚹ</div>
      </div>

      {/* Enhanced Header */}
      <header className="bg-gradient-to-b from-gray-800 to-gray-900 border-b-4 border-red-600 p-8 relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className={`relative transition-all duration-300 ${glitchActive ? 'filter brightness-125 saturate-150' : ''}`}>
              <GiTreasureMap className="text-6xl md:text-7xl text-red-500 drop-shadow-2xl" />
              {glitchActive && (
                <GiTreasureMap className="absolute top-0 left-0 text-6xl md:text-7xl text-red-400 animate-ping opacity-30" />
              )}
            </div>
            <div>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest text-white mb-2 ${glitchActive ? 'animate-pulse text-red-100' : ''}`} 
                  style={{
                    textShadow: glitchActive 
                      ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.5)' 
                      : '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(239, 68, 68, 0.3)'
                  }}>
                UNDERGROUND MAP
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-gray-400 text-lg uppercase tracking-wide flex items-center gap-2">
                  <GiSkullCrossedBones className="text-red-500" />
                  Global Metal Scene Explorer
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-600/50">
                    {metalCountries.length} Metal Strongholds
                  </span>
                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-600/50 flex items-center gap-1">
                    <FaEthereum className="text-xs" />
                    Web3 Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Search and Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6"
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search countries, genres, bands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-red-500 focus:border-red-500 text-white rounded-lg outline-none font-medium transition-all duration-300 shadow-lg"
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-red-500 focus:border-red-500 text-white rounded-lg outline-none font-medium transition-all duration-300 shadow-lg"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="bg-gray-800">
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              {['bands', 'festivals', 'scenes', 'timeline'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`flex-1 px-4 py-4 font-bold uppercase text-sm tracking-wide border-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    viewMode === mode
                      ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/50'
                      : 'bg-transparent border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-400'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Global Statistics */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-600 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: GiCrossedSwords, value: totalStats.bands.toLocaleString(), label: 'Metal Bands', color: 'from-red-600/20 to-red-800/20', borderColor: 'border-red-600' },
              { icon: FaMusic, value: totalStats.festivals, label: 'Festivals', color: 'from-blue-600/20 to-blue-800/20', borderColor: 'border-blue-600' },
              { icon: FaFire, value: totalStats.albums.toLocaleString(), label: 'Albums Released', color: 'from-yellow-600/20 to-yellow-800/20', borderColor: 'border-yellow-600' },
              { icon: FaMapMarkerAlt, value: totalStats.venues, label: 'Metal Venues', color: 'from-green-600/20 to-green-800/20', borderColor: 'border-green-600' }
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 border-b border-gray-600">
              <h2 className="text-xl font-black uppercase tracking-wide text-white flex items-center gap-2">
               <FaGlobe className="text-blue-400" />
                INTERACTIVE METAL MAP
                <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs font-bold">
                  {viewMode.toUpperCase()}
                </span>
              </h2>
            </div>
            
            <div className="relative h-[600px] bg-gray-900">
              <WorldMap 
                countries={filteredCountries}
                viewMode={viewMode}
                onCountrySelect={setSelectedCountry}
                selectedCountry={selectedCountry}
              />
              
              {viewMode === 'festivals' && (
                <FestivalMarkers countries={filteredCountries} />
              )}
              
              {viewMode === 'bands' && (
                <BandOrigins countries={filteredCountries} />
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Country List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-black uppercase tracking-wide text-white mb-4 flex items-center gap-2">
              <GiVikingHelmet className="text-yellow-400" />
              METAL STRONGHOLDS
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCountries
                .sort((a, b) => b.metalScene.influence - a.metalScene.influence)
                .map((country) => (
                <motion.div
                  key={country.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => setSelectedCountry(country)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedCountry?.id === country.id
                      ? 'bg-red-600/20 border-red-600 shadow-lg shadow-red-600/20'
                      : 'bg-gray-700/50 border-gray-600 hover:border-red-500 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-bold text-white">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCrown className="text-yellow-400" />
                      <span className="text-yellow-400 font-bold">{country.metalScene.influence}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <GiCrossedSwords /> {country.metalScene.totalBands} bands
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMusic /> {country.festivals.length} festivals
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Dominant Genres:</div>
                    <div className="flex flex-wrap gap-1">
                      {country.metalScene.dominantGenres.slice(0, 2).map(genre => (
                        <span key={genre} className="bg-red-600/20 text-red-400 px-2 py-1 text-xs rounded border border-red-600/50">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scene Timeline Preview */}
          {viewMode === 'timeline' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-black uppercase tracking-wide text-white mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-purple-400" />
                SCENE TIMELINE
              </h3>
              <SceneTimeline countries={filteredCountries} />
            </motion.div>
          )}

          {/* Top Festivals */}
          {viewMode === 'festivals' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-black uppercase tracking-wide text-white mb-4 flex items-center gap-2">
                <GiFlame className="text-orange-400" />
                TOP FESTIVALS
              </h3>
              
              <div className="space-y-3">
                {metalCountries
                  .flatMap(country => 
                    country.festivals.map(festival => ({
                      ...festival,
                      country: country.name,
                      flag: country.flag
                    }))
                  )
                  .sort((a, b) => b.attendance - a.attendance)
                  .slice(0, 5)
                  .map((festival, index) => (
                    <div key={festival.name} className="bg-gray-700/50 border border-gray-600 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{festival.flag}</span>
                          <span className="font-bold text-white text-sm">{festival.name}</span>
                        </div>
                        <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded font-bold">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                        <span>{festival.location}</span>
                        <span>{festival.attendance.toLocaleString()} attendees</span>
                        <span>{festival.genre}</span>
                        <span>Since {festival.founded}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Country Details Modal */}
      {selectedCountry && (
        <CountryDetails 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-red-600 p-8 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            {[GiDeathSkull, GiCrossedSwords, GiTreasureMap, GiVikingHelmet, GiSkullCrossedBones].map((Icon, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.2, rotate: 15 }} 
                className="cursor-pointer"
              >
                <Icon className="text-3xl text-gray-600 hover:text-red-500 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">
            UNDERGROUND MAP
          </h3>
          <p className="text-gray-400 uppercase tracking-wider mb-4">
            Global Metal Scene Explorer • Web3 Verified Data
          </p>
          <p className="text-gray-600 text-sm">
            Mapping the worldwide metal underground • Discover scenes, festivals & legendary bands
          </p>
          <div className="mt-6 flex justify-center items-center gap-2 text-xs text-gray-500">
            <FaEthereum className="text-blue-400" />
            <span>Powered by Optimism Blockchain</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UndergroundMap
