"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaMapMarkerAlt, 
  FaMusic, 
  FaUsers, 
  FaCalendarAlt,
  FaCrown,
  FaFire,
  FaChartLine,
  FaSearch
} from 'react-icons/fa'
import { 
  GiCrossedSwords, 
  GiFlame, 
  GiDeathSkull,
  GiVikingHelmet,
  GiSkullCrossedBones,
  GiThorHammer,
  GiGothicCross
} from 'react-icons/gi'

interface BandOrigin {
  id: string
  name: string
  country: string
  city: string
  coordinates: [number, number]
  formed: number
  genre: string
  status: 'Active' | 'Split' | 'Hiatus'
  influence: number
  albums: number
  members: string[]
  significance: 'Legendary' | 'Influential' | 'Underground' | 'Emerging'
  description: string
  keyAlbums: string[]
  relatedBands: string[]
  scene: string
}

interface BandOriginsProps {
  countries: any[]
}

const BandOrigins = ({ countries }: BandOriginsProps) => {
  const [selectedBand, setSelectedBand] = useState<BandOrigin | null>(null)
  const [filterCountry, setFilterCountry] = useState<string>('all')
  const [filterGenre, setFilterGenre] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
  const [hoveredOrigin, setHoveredOrigin] = useState<string | null>(null)

  // Enhanced band origins data
  const bandOrigins: BandOrigin[] = [
    {
      id: 'black-sabbath',
      name: 'Black Sabbath',
      country: 'United Kingdom',
      city: 'Birmingham',
      coordinates: [-1.8904, 52.4862],
      formed: 1968,
      genre: 'Heavy Metal',
      status: 'Split',
      influence: 100,
      albums: 19,
      members: ['Ozzy Osbourne', 'Tony Iommi', 'Geezer Butler', 'Bill Ward'],
      significance: 'Legendary',
      description: 'The godfathers of heavy metal. Created the blueprint for all heavy music that followed.',
      keyAlbums: ['Black Sabbath', 'Paranoid', 'Master of Reality'],
      relatedBands: ['Led Zeppelin', 'Deep Purple'],
      scene: 'Birmingham Metal'
    },
    {
      id: 'bathory',
      name: 'Bathory',
      country: 'Sweden',
      city: 'Stockholm',
      coordinates: [18.0686, 59.3293],
      formed: 1983,
      genre: 'Black Metal',
      status: 'Split',
      influence: 95,
      albums: 12,
      members: ['Quorthon'],
      significance: 'Legendary',
      description: 'Pioneer of black metal and viking metal. Quorthon\'s vision created entire subgenres.',
      keyAlbums: ['Bathory', 'Under the Sign of the Black Mark', 'Hammerheart'],
      relatedBands: ['Venom', 'Celtic Frost'],
      scene: 'Swedish Extreme Metal'
    },
    {
      id: 'mayhem',
      name: 'Mayhem',
      country: 'Norway',
      city: 'Langhus',
      coordinates: [10.7522, 59.9139],
      formed: 1984,
      genre: 'Black Metal',
      status: 'Active',
      influence: 92,
      albums: 6,
      members: ['Necrobutcher', 'Hellhammer', 'Attila Csihar', 'Teloch'],
      significance: 'Legendary',
      description: 'The most notorious black metal band. Defined the Norwegian scene with chaos and controversy.',
      keyAlbums: ['De Mysteriis Dom Sathanas', 'Daemon'],
      relatedBands: ['Darkthrone', 'Emperor', 'Immortal'],
      scene: 'Norwegian Black Metal'
    },
    {
      id: 'death',
      name: 'Death',
      country: 'United States',
      city: 'Orlando',
      coordinates: [-81.3792, 28.5383],
      formed: 1983,
      genre: 'Death Metal',
      status: 'Split',
      influence: 98,
      albums: 7,
      members: ['Chuck Schuldiner'],
      significance: 'Legendary',
      description: 'Chuck Schuldiner created death metal and evolved it into progressive art. The father of death metal.',
      keyAlbums: ['Scream Bloody Gore', 'Human', 'Symbolic'],
      relatedBands: ['Possessed', 'Morbid Angel'],
      scene: 'Florida Death Metal'
    },
    {
      id: 'darkthrone',
      name: 'Darkthrone',
      country: 'Norway',
      city: 'Kolbotn',
      coordinates: [10.7947, 59.8183],
      formed: 1986,
      genre: 'Black Metal',
      status: 'Active',
      influence: 90,
      albums: 20,
      members: ['Fenriz', 'Nocturno Culto'],
      significance: 'Legendary',
      description: 'The unholy trinity creators. Stayed true to underground principles throughout their career.',
      keyAlbums: ['A Blaze in the Northern Sky', 'Under a Funeral Moon', 'Transilvanian Hunger'],
      relatedBands: ['Mayhem', 'Emperor'],
      scene: 'Norwegian Black Metal'
    },
    {
      id: 'at-the-gates',
      name: 'At the Gates',
      country: 'Sweden',
      city: 'Gothenburg',
      coordinates: [11.9746, 57.7089],
      formed: 1990,
      genre: 'Melodic Death Metal',
      status: 'Active',
      influence: 85,
      albums: 6,
      members: ['Tomas Lindberg', 'Anders Björler', 'Jonas Björler'],
      significance: 'Influential',
      description: 'Pioneers of the Gothenburg sound. "Slaughter of the Soul" influenced countless bands.',
      keyAlbums: ['Slaughter of the Soul', 'Terminal Spirit Disease'],
      relatedBands: ['In Flames', 'Dark Tranquillity'],
      scene: 'Gothenburg Metal'
    },
    {
      id: 'behemoth',
      name: 'Behemoth',
      country: 'Poland',
      city: 'Gdańsk',
      coordinates: [18.6466, 54.3520],
      formed: 1991,
      genre: 'Blackened Death Metal',
      status: 'Active',
      influence: 82,
      albums: 12,
      members: ['Nergal', 'Inferno', 'Orion'],
      significance: 'Influential',
      description: 'Poland\'s metal export. Evolved from black metal to blackened death metal mastery.',
      keyAlbums: ['Demigod', 'The Satanist', 'I Loved You at Your Darkest'],
      relatedBands: ['Vader', 'Decapitated'],
      scene: 'Polish Extreme Metal'
    },
    {
      id: 'emperor',
      name: 'Emperor',
      country: 'Norway',
      city: 'Notodden',
      coordinates: [9.2592, 59.5609],
      formed: 1991,
      genre: 'Symphonic Black Metal',
      status: 'Split',
      influence: 88,
      albums: 4,
      members: ['Ihsahn', 'Samoth', 'Trym'],
      significance: 'Legendary',
      description: 'Brought sophistication to black metal. Masters of symphonic and progressive elements.',
      keyAlbums: ['In the Nightside Eclipse', 'Anthems to the Welkin at Dusk'],
      relatedBands: ['Mayhem', 'Darkthrone'],
      scene: 'Norwegian Black Metal'
    }
  ]

  const countries_list = ['all', ...Array.from(new Set(bandOrigins.map(band => band.country)))]
  const genres = ['all', ...Array.from(new Set(bandOrigins.map(band => band.genre)))]

  const filteredOrigins = bandOrigins.filter(band => {
    const matchesCountry = filterCountry === 'all' || band.country === filterCountry
    const matchesGenre = filterGenre === 'all' || band.genre === filterGenre
    const matchesSearch = band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.genre.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCountry && matchesGenre && matchesSearch
  })

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'Legendary': return '#dc2626'
      case 'Influential': return '#2563eb'
      case 'Underground': return '#16a34a'
      case 'Emerging': return '#7c3aed'
      default: return '#6b7280'
    }
  }

  const getInfluenceSize = (influence: number) => {
    if (influence >= 90) return 16
    if (influence >= 80) return 14
    if (influence >= 70) return 12
    return 10
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 shadow-2xl">
      {/* Header with controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h3 className="text-xl font-black uppercase tracking-wide text-white flex items-center gap-2">
          <GiCrossedSwords className="text-red-500" />
          BAND ORIGINS
        </h3>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
            />
          </div>
          
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
          >
            {countries_list.map(country => (
              <option key={country} value={country}>
                {country === 'all' ? 'All Countries' : country}
              </option>
            ))}
          </select>
          
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>
          
          <div className="flex bg-gray-700 rounded overflow-hidden">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-2 text-sm font-bold ${
                viewMode === 'map' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              MAP
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm font-bold ${
                viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              LIST
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'map' ? (
        <>
          {/* Origins Map */}
          <div className="relative w-full h-80 bg-gray-900 border-2 border-gray-600 rounded-lg overflow-hidden mb-6">
            <svg viewBox="0 0 1000 400" className="w-full h-full">
              {/* Background */}
              <rect width="1000" height="400" fill="#111827" />
              
              {/* Grid */}
              <defs>
                <pattern id="originGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="1000" height="400" fill="url(#originGrid)" />

              {/* Continents outline */}
              <g stroke="#4b5563" strokeWidth="2" fill="#1f2937">
                {/* Europe */}
                <path d="M450,120 Q550,100 650,120 Q750,110 800,130 L800,220 Q750,240 650,230 Q550,245 450,235 Z" />
                {/* North America */}
                <path d="M150,100 Q250,80 350,100 Q400,90 420,110 L420,200 Q400,220 350,210 Q250,225 150,215 Z" />
              </g>

              {/* Band Origin Markers */}
              {filteredOrigins.map((band, index) => {
                // Simplified coordinate mapping
                const x = band.country === 'United States' ? 250 + (band.coordinates[0] + 100) * 0.8 :
                         band.country === 'United Kingdom' ? 480 : 
                         band.country === 'Norway' ? 520 :
                         band.country === 'Sweden' ? 540 :
                         band.country === 'Poland' ? 580 : 600
                const y = 180 + (60 - band.coordinates[1]) * 1.5
                
                const isHovered = hoveredOrigin === band.id
                const isSelected = selectedBand?.id === band.id
                const size = getInfluenceSize(band.influence)

                return (
                  <g key={band.id}>
                    {/* Influence Area */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={band.influence / 3}
                      fill={getSignificanceColor(band.significance)}
                      opacity="0.1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />

                    {/* Main Marker */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={size}
                      fill={getSignificanceColor(band.significance)}
                      stroke="#fff"
                      strokeWidth="3"
                      className="cursor-pointer"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isSelected ? 1.3 : isHovered ? 1.2 : 1,
                        opacity: 1
                      }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.2 }}
                      onMouseEnter={() => setHoveredOrigin(band.id)}
                      onMouseLeave={() => setHoveredOrigin(null)}
                      onClick={() => setSelectedBand(band)}
                    />

                    {/* Band Name */}
                    <motion.text
                      x={x}
                      y={y - size - 8}
                      textAnchor="middle"
                      className="fill-white text-sm font-bold pointer-events-none select-none"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: isHovered || isSelected ? 1 : 0.8
                      }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {band.name}
                    </motion.text>

                    {/* Influence Lines to related bands */}
                    {isSelected && band.relatedBands.map((relatedName, relIndex) => {
                      const relatedBand = bandOrigins.find(b => b.name === relatedName)
                      if (!relatedBand) return null
                      
                      const relX = relatedBand.country === 'United States' ? 250 : 
                                  relatedBand.country === 'United Kingdom' ? 480 : 520
                      const relY = 180
                      
                      return (
                        <motion.line
                          key={relIndex}
                          x1={x}
                          y1={y}
                          x2={relX}
                          y2={relY}
                          stroke="#ef4444"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          opacity="0.6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      )
                    })}
                  </g>
                )
              })}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-gray-800/90 border border-gray-600 rounded-lg p-3">
              <div className="text-xs font-bold text-white mb-2">SIGNIFICANCE</div>
              <div className="space-y-1">
                {[
                  { level: 'Legendary', color: '#dc2626' },
                  { level: 'Influential', color: '#2563eb' },
                  { level: 'Underground', color: '#16a34a' },
                  { level: 'Emerging', color: '#7c3aed' }
                ].map(item => (
                  <div key={item.level} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full border border-white"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-gray-300">{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* List View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredOrigins.map((band, index) => (
            <motion.div
              key={band.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              onClick={() => setSelectedBand(band)}
              className="bg-gray-700/50 border-2 border-gray-600 hover:border-red-500 rounded-lg p-4 cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: getSignificanceColor(band.significance) }}
                  />
                  <span className="font-black text-white">{band.name}</span>
                </div>
                <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded font-bold">
                  {band.formed}
                </span>
              </div>
              
              <div className="text-sm text-gray-400 mb-2">
                <FaMapMarkerAlt className="inline mr-1 text-blue-400" />
                {band.city}, {band.country}
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-purple-400 font-bold">{band.genre}</span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★ {band.influence}</span>
                  <span className={`px-2 py-1 rounded text-white font-bold ${
                    band.status === 'Active' ? 'bg-green-600' :
                    band.status === 'Split' ? 'bg-red-600' : 'bg-yellow-600'
                  }`}>
                    {band.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Selected Band Details */}
      {selectedBand && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-600 rounded-xl p-6 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
                style={{ backgroundColor: getSignificanceColor(selectedBand.significance) }}
              >
                <GiDeathSkull className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">{selectedBand.name}</h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span>{selectedBand.city}, {selectedBand.country}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedBand(null)}
              className="text-gray-400 hover:text-white text-xl p-2"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            {selectedBand.description}
          </p>

          {/* Band Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
              <FaCalendarAlt className="text-2xl text-blue-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{selectedBand.formed}</div>
              <div className="text-xs text-gray-400">FORMED</div>
            </div>
            
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
              <FaMusic className="text-2xl text-green-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{selectedBand.albums}</div>
              <div className="text-xs text-gray-400">ALBUMS</div>
            </div>
            
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
              <FaChartLine className="text-2xl text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{selectedBand.influence}</div>
              <div className="text-xs text-gray-400">INFLUENCE</div>
            </div>
            
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
              <FaUsers className="text-2xl text-purple-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{selectedBand.members.length}</div>
              <div className="text-xs text-gray-400">MEMBERS</div>
            </div>
          </div>

          {/* Key Albums */}
          <div className="mb-4">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <FaMusic className="text-green-500" />
              KEY ALBUMS
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedBand.keyAlbums.map((album, index) => (
                <span 
                  key={index}
                  className="bg-green-600/20 text-green-400 px-3 py-2 rounded-lg border border-green-600/50 font-bold"
                >
                  {album}
                </span>
              ))}
            </div>
          </div>

          {/* Related Bands */}
          <div className="mb-4">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <GiCrossedSwords className="text-red-500" />
              RELATED BANDS
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedBand.relatedBands.map((band, index) => (
                <span 
                  key={index}
                  className="bg-red-600/20 text-red-400 px-3 py-2 rounded-lg border border-red-600/50 font-bold hover:bg-red-600/30 transition-colors cursor-pointer"
                  onClick={() => {
                    const relatedBand = bandOrigins.find(b => b.name === band)
                    if (relatedBand) setSelectedBand(relatedBand)
                  }}
                >
                  {band}
                </span>
              ))}
            </div>
          </div>

          {/* Members */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <FaUsers className="text-purple-500" />
              MEMBERS
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedBand.members.map((member, index) => (
                <span 
                  key={index}
                  className="bg-purple-600/20 text-purple-400 px-3 py-2 rounded-lg border border-purple-600/50 font-bold"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default BandOrigins
