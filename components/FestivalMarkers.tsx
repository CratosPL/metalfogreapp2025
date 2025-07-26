"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaMusic, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaCalendarAlt,
  FaTicketAlt,
  FaFire,
  FaStar,
  FaVolumeUp
} from 'react-icons/fa'
import { 
  GiFlame, 
  GiCrossedSwords, 
  GiDeathSkull,
  GiVikingHelmet,
  GiGothicCross
} from 'react-icons/gi'

interface Festival {
  id: string
  name: string
  location: string
  country: string
  coordinates: [number, number]
  genre: string
  attendance: number
  founded: number
  status: 'Active' | 'Cancelled' | 'Postponed'
  significance: 'Legendary' | 'Major' | 'Rising'
  lineup: string[]
  ticketPrice: string
  website: string
  description: string
}

interface FestivalMarkersProps {
  countries: any[]
}

const FestivalMarkers = ({ countries }: FestivalMarkersProps) => {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const [filterGenre, setFilterGenre] = useState<string>('all')
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null)
  const [animationActive, setAnimationActive] = useState(true)

  // Enhanced festival data
  const festivals: Festival[] = [
    {
      id: 'wacken',
      name: 'Wacken Open Air',
      location: 'Wacken',
      country: 'Germany',
      coordinates: [9.3833, 53.9167],
      genre: 'Heavy Metal',
      attendance: 85000,
      founded: 1990,
      status: 'Active',
      significance: 'Legendary',
      lineup: ['Iron Maiden', 'Metallica', 'Slayer', 'Judas Priest'],
      ticketPrice: '€249',
      website: 'wacken.com',
      description: 'The holy grail of metal festivals. Three days of pure metal mayhem in the German countryside.'
    },
    {
      id: 'hellfest',
      name: 'Hellfest',
      location: 'Clisson',
      country: 'France',
      coordinates: [-1.2833, 47.0833],
      genre: 'Extreme Metal',
      attendance: 60000,
      founded: 2006,
      status: 'Active',
      significance: 'Major',
      lineup: ['Mayhem', 'Behemoth', 'Gojira', 'Architect'],
      ticketPrice: '€189',
      website: 'hellfest.fr',
      description: 'France\'s premier extreme metal festival with the most brutal lineup in Europe.'
    },
    {
      id: 'maryland-deathfest',
      name: 'Maryland Deathfest',
      location: 'Baltimore',
      country: 'United States',
      coordinates: [-76.6122, 39.2904],
      genre: 'Death Metal',
      attendance: 12000,
      founded: 2003,
      status: 'Active',
      significance: 'Major',
      lineup: ['Morbid Angel', 'Cannibal Corpse', 'Origin', 'Pig Destroyer'],
      ticketPrice: '$180',
      website: 'deathfests.com',
      description: 'America\'s biggest death metal and grindcore festival. The most brutal weekend in the US.'
    },
    {
      id: 'tuska',
      name: 'Tuska Open Air',
      location: 'Helsinki',
      country: 'Finland',
      coordinates: [24.9384, 60.1699],
      genre: 'Metal',
      attendance: 35000,
      founded: 1998,
      status: 'Active',
      significance: 'Major',
      lineup: ['Children of Bodom', 'Nightwish', 'Ensiferum', 'Amorphis'],
      ticketPrice: '€129',
      website: 'tuska-festival.fi',
      description: 'Finland\'s premier metal festival showcasing the best of Nordic metal scene.'
    },
    {
      id: 'brutal-assault',
      name: 'Brutal Assault',
      location: 'Jaroměř',
      country: 'Czech Republic',
      coordinates: [15.9297, 50.3553],
      genre: 'Extreme Metal',
      attendance: 18000,
      founded: 1995,
      status: 'Active',
      significance: 'Rising',
      lineup: ['Vader', 'Dark Funeral', 'Decapitated', 'Mgła'],
      ticketPrice: '€99',
      website: 'brutalassault.cz',
      description: 'Extreme metal festival in an 18th century fortress. Unique atmosphere and brutal lineup.'
    },
    {
      id: 'party-san',
      name: 'Party.San',
      location: 'Bad Berka',
      country: 'Germany',
      coordinates: [11.2833, 50.9],
      genre: 'Death/Black Metal',
      attendance: 12000,
      founded: 2000,
      status: 'Active',
      significance: 'Rising',
      lineup: ['Darkthrone', 'Emperor', 'Immolation', 'Ulcerate'],
      ticketPrice: '€149',
      website: 'party-san.de',
      description: 'Underground festival for true extreme metal connoisseurs. Quality over quantity.'
    }
  ]

  const genres = ['all', 'Heavy Metal', 'Death Metal', 'Black Metal', 'Extreme Metal', 'Metal']

  const filteredFestivals = festivals.filter(festival => 
    filterGenre === 'all' || festival.genre === filterGenre
  )

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'Legendary': return '#dc2626'
      case 'Major': return '#2563eb'
      case 'Rising': return '#16a34a'
      default: return '#6b7280'
    }
  }

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'Legendary': return GiDeathSkull
      case 'Major': return GiCrossedSwords
      case 'Rising': return GiFlame
      default: return FaMusic
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container (SVG representation) */}
      <div className="relative w-full h-64 bg-gray-900 border-2 border-gray-600 rounded-lg overflow-hidden">
        <svg viewBox="0 0 800 300" className="w-full h-full">
          {/* Background */}
          <rect width="800" height="300" fill="#111827" />
          
          {/* Grid Pattern */}
          <defs>
            <pattern id="festivalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="800" height="300" fill="url(#festivalGrid)" />

          {/* Simplified World Outline */}
          <path
            d="M100,80 Q200,60 300,80 Q400,70 500,85 Q600,75 700,90 L700,200 Q600,220 500,210 Q400,225 300,215 Q200,230 100,220 Z"
            fill="#1f2937"
            stroke="#4b5563"
            strokeWidth="2"
          />

          {/* Festival Markers */}
          {filteredFestivals.map((festival, index) => {
            const [x, y] = [
              (festival.coordinates[0] + 20) * 10 + 100,
              (60 - festival.coordinates[1]) * 2.5 + 50
            ]
            const IconComponent = getSignificanceIcon(festival.significance)
            const isHovered = hoveredMarker === festival.id
            const isSelected = selectedFestival?.id === festival.id

            return (
              <g key={festival.id}>
                {/* Marker Circle */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 12 : isHovered ? 10 : 8}
                  fill={getSignificanceColor(festival.significance)}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    r: isSelected ? 12 : isHovered ? 10 : 8
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                    r: { duration: 0.2 }
                  }}
                  whileHover={{ scale: 1.2 }}
                  onMouseEnter={() => setHoveredMarker(festival.id)}
                  onMouseLeave={() => setHoveredMarker(null)}
                  onClick={() => setSelectedFestival(festival)}
                />

                {/* Pulse Animation */}
                {animationActive && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={8}
                    fill="none"
                    stroke={getSignificanceColor(festival.significance)}
                    strokeWidth="2"
                    opacity="0.6"
                    animate={{ 
                      r: [8, 20, 8],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                )}

                {/* Festival Name */}
                <motion.text
                  x={x}
                  y={y - 20}
                  textAnchor="middle"
                  className="fill-white text-xs font-bold pointer-events-none select-none"
                  initial={{ opacity: 0, y: y - 10 }}
                  animate={{ 
                    opacity: isHovered || isSelected ? 1 : 0.7, 
                    y: y - 20 
                  }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {festival.name}
                </motion.text>

                {/* Attendance Badge */}
                <motion.foreignObject
                  x={x + 10}
                  y={y - 10}
                  width="40"
                  height="20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isHovered || isSelected ? 1 : 0,
                    scale: isHovered || isSelected ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white font-bold">
                    {Math.floor(festival.attendance / 1000)}k
                  </div>
                </motion.foreignObject>
              </g>
            )
          })}
        </svg>

        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded text-sm font-bold"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>

          <button
            onClick={() => setAnimationActive(!animationActive)}
            className={`px-3 py-2 rounded font-bold text-sm transition-all duration-300 ${
              animationActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            {animationActive ? 'STOP' : 'ANIMATE'}
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-gray-800/90 border border-gray-600 rounded-lg p-3">
          <div className="text-xs font-bold text-white mb-2">SIGNIFICANCE</div>
          <div className="space-y-1">
            {[
              { level: 'Legendary', color: '#dc2626' },
              { level: 'Major', color: '#2563eb' },
              { level: 'Rising', color: '#16a34a' }
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

      {/* Festival Details Panel */}
      {selectedFestival && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-600 rounded-xl p-6 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {(() => {
                const IconComponent = getSignificanceIcon(selectedFestival.significance)
                return <IconComponent className="text-3xl text-red-500" />
              })()}
              <div>
                <h3 className="text-2xl font-black text-white">{selectedFestival.name}</h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span>{selectedFestival.location}, {selectedFestival.country}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedFestival(null)}
              className="text-gray-400 hover:text-white text-xl p-2"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            {selectedFestival.description}
          </p>

          {/* Festival Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
              <FaUsers className="text-2xl text-blue-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{selectedFestival.attendance.toLocaleString()}</div>
              <div className="text-xs text-gray-400">ATTENDANCE</div>
            </div>
            
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
              <FaCalendarAlt className="text-2xl text-green-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{selectedFestival.founded}</div>
              <div className="text-xs text-gray-400">FOUNDED</div>
            </div>
            
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
              <FaTicketAlt className="text-2xl text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{selectedFestival.ticketPrice}</div>
              <div className="text-xs text-gray-400">PRICE</div>
            </div>
            
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
              <FaMusic className="text-2xl text-purple-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{selectedFestival.genre}</div>
              <div className="text-xs text-gray-400">GENRE</div>
            </div>
          </div>

          {/* Lineup */}
          <div className="mb-4">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <GiCrossedSwords className="text-red-500" />
              FEATURED LINEUP
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedFestival.lineup.map((band, index) => (
                <span 
                  key={index}
                  className="bg-red-600/20 text-red-400 px-3 py-2 rounded-lg border border-red-600/50 font-bold hover:bg-red-600/30 transition-colors cursor-pointer"
                >
                  {band}
                </span>
              ))}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
              selectedFestival.status === 'Active' ? 'bg-green-600 text-white' :
              selectedFestival.status === 'Cancelled' ? 'bg-red-600 text-white' :
              'bg-yellow-600 text-black'
            }`}>
              {selectedFestival.status}
            </div>
            
            <a
              href={`https://${selectedFestival.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
            >
              VISIT WEBSITE
            </a>
          </div>
        </motion.div>
      )}

      {/* Festival List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFestivals.map((festival, index) => {
          const IconComponent = getSignificanceIcon(festival.significance)
          return (
            <motion.div
              key={festival.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              onClick={() => setSelectedFestival(festival)}
              className="bg-gray-800/50 border border-gray-600 hover:border-red-500 rounded-lg p-4 cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <IconComponent className="text-xl" style={{ color: getSignificanceColor(festival.significance) }} />
                  <span className="font-bold text-white">{festival.name}</span>
                </div>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                  {festival.significance}
                </span>
              </div>
              
              <div className="text-sm text-gray-400 mb-2">
                {festival.location}, {festival.country}
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">{festival.genre}</span>
                <span className="text-blue-400 font-bold">{Math.floor(festival.attendance / 1000)}k attendees</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default FestivalMarkers
