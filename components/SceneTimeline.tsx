"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaCalendarAlt, 
  FaMusic, 
  FaPlay, 
  FaMapMarkerAlt,
  FaUsers,
  FaCrown,
  FaFire
} from 'react-icons/fa'
import { 
  GiCrossedSwords, 
  GiFlame, 
  GiSkullCrossedBones,
  GiVikingHelmet,
  GiDeathSkull,
  GiGothicCross
} from 'react-icons/gi'

interface TimelineEvent {
  id: string
  year: number
  title: string
  description: string
  country: string
  genre: string
  significance: 'Legendary' | 'Major' | 'Important' | 'Notable'
  bands: string[]
  impact: string
  icon: any
  color: string
}

interface SceneTimelineProps {
  countries: any[]
}

const SceneTimeline = ({ countries }: SceneTimelineProps) => {
  const [selectedDecade, setSelectedDecade] = useState<string>('all')
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [playingTimeline, setPlayingTimeline] = useState(false)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)

  // Enhanced timeline events data
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'black-sabbath-1970',
      year: 1970,
      title: 'Birth of Heavy Metal',
      description: 'Black Sabbath releases their debut album, creating the blueprint for heavy metal with dark themes and heavy riffs.',
      country: 'United Kingdom',
      genre: 'Heavy Metal',
      significance: 'Legendary',
      bands: ['Black Sabbath'],
      impact: 'Founded the entire heavy metal genre',
      icon: GiSkullCrossedBones,
      color: '#dc2626'
    },
    {
      id: 'nwobhm-1979',
      year: 1979,
      title: 'New Wave of British Heavy Metal',
      description: 'NWOBHM movement emerges with Iron Maiden, Judas Priest, and Saxon leading the charge.',
      country: 'United Kingdom',
      genre: 'Heavy Metal',
      significance: 'Legendary',
      bands: ['Iron Maiden', 'Judas Priest', 'Saxon', 'Diamond Head'],
      impact: 'Revolutionized metal with speed and technicality',
      icon: GiCrossedSwords,
      color: '#dc2626'
    },
    {
      id: 'thrash-birth-1983',
      year: 1983,
      title: 'Thrash Metal Explosion',
      description: 'Metallica releases "Kill \'Em All", Slayer forms, marking the birth of thrash metal.',
      country: 'United States',
      genre: 'Thrash Metal',
      significance: 'Legendary',
      bands: ['Metallica', 'Slayer', 'Megadeth', 'Anthrax'],
      impact: 'Created faster, more aggressive metal',
      icon: GiFlame,
      color: '#ea580c'
    },
    {
      id: 'bathory-1984',
      year: 1984,
      title: 'First Wave Black Metal',
      description: 'Bathory releases debut album, laying groundwork for extreme metal with lo-fi production and satanic themes.',
      country: 'Sweden',
      genre: 'Black Metal',
      significance: 'Legendary',
      bands: ['Bathory', 'Venom', 'Celtic Frost'],
      impact: 'Established black metal aesthetics',
      icon: GiDeathSkull,
      color: '#7c2d12'
    },
    {
      id: 'death-metal-1987',
      year: 1987,
      title: 'Death Metal Genesis',
      description: 'Death releases "Scream Bloody Gore", Possessed coins the term "death metal".',
      country: 'United States',
      genre: 'Death Metal',
      significance: 'Legendary',
      bands: ['Death', 'Possessed', 'Morbid Angel'],
      impact: 'Extreme brutality and technical prowess',
      icon: GiSkullCrossedBones,
      color: '#991b1b'
    },
    {
      id: 'norwegian-scene-1991',
      year: 1991,
      title: 'Norwegian Black Metal Scene',
      description: 'Mayhem, Darkthrone, and Emperor create the "unholy trinity" of Norwegian black metal.',
      country: 'Norway',
      genre: 'Black Metal',
      significance: 'Legendary',
      bands: ['Mayhem', 'Darkthrone', 'Emperor', 'Immortal'],
      impact: 'Defined modern black metal sound',
      icon: GiVikingHelmet,
      color: '#1e40af'
    },
    {
      id: 'gothenburg-sound-1993',
      year: 1993,
      title: 'Gothenburg Melodic Death',
      description: 'At the Gates and In Flames pioneer melodic death metal with "Slaughter of the Soul" approach.',
      country: 'Sweden',
      genre: 'Melodic Death Metal',
      significance: 'Major',
      bands: ['At the Gates', 'In Flames', 'Dark Tranquillity'],
      impact: 'Merged melody with extreme metal',
      icon: GiCrossedSwords,
      color: '#16a34a'
    },
    {
      id: 'finnish-scene-1996',
      year: 1996,
      title: 'Finnish Metal Renaissance',
      description: 'Children of Bodom and Nightwish emerge, creating unique Finnish metal identity.',
      country: 'Finland',
      genre: 'Symphonic/Melodic Metal',
      significance: 'Major',
      bands: ['Children of Bodom', 'Nightwish', 'Amorphis'],
      impact: 'Nordic metal with symphonic elements',
      icon: GiGothicCross,
      color: '#7c3aed'
    },
    {
      id: 'polish-extreme-2000',
      year: 2000,
      title: 'Polish Extreme Metal Rise',
      description: 'Behemoth and Vader gain international recognition, putting Polish extreme metal on the map.',
      country: 'Poland',
      genre: 'Death/Black Metal',
      significance: 'Important',
      bands: ['Behemoth', 'Vader', 'Decapitated'],
      impact: 'Eastern European extreme metal',
      icon: GiFlame,
      color: '#dc2626'
    },
    {
      id: 'metalcore-2003',
      year: 2003,
      title: 'Metalcore Mainstream',
      description: 'Killswitch Engage and As I Lay Dying bring metalcore to mainstream success.',
      country: 'United States',
      genre: 'Metalcore',
      significance: 'Notable',
      bands: ['Killswitch Engage', 'As I Lay Dying', 'Trivium'],
      impact: 'Metal-hardcore fusion goes mainstream',
      icon: GiCrossedSwords,
      color: '#059669'
    }
  ]

  const decades = ['all', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s']

  const filteredEvents = timelineEvents.filter(event => {
    if (selectedDecade === 'all') return true
    const decade = Math.floor(event.year / 10) * 10
    return selectedDecade === `${decade}s`
  })

  // Auto-play timeline
  useEffect(() => {
    if (playingTimeline) {
      const interval = setInterval(() => {
        setCurrentEventIndex(prev => (prev + 1) % filteredEvents.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [playingTimeline, filteredEvents.length])

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'Legendary': return 'from-red-600 to-red-800'
      case 'Major': return 'from-blue-600 to-blue-800'
      case 'Important': return 'from-green-600 to-green-800'
      case 'Notable': return 'from-purple-600 to-purple-800'
      default: return 'from-gray-600 to-gray-800'
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black uppercase tracking-wide text-white flex items-center gap-2">
          <FaCalendarAlt className="text-purple-400" />
          SCENE TIMELINE
        </h3>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlayingTimeline(!playingTimeline)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 ${
              playingTimeline 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <FaPlay className={`inline mr-2 ${playingTimeline ? 'animate-pulse' : ''}`} />
            {playingTimeline ? 'STOP' : 'PLAY'}
          </button>
          
          <select
            value={selectedDecade}
            onChange={(e) => setSelectedDecade(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg text-sm font-bold"
          >
            {decades.map(decade => (
              <option key={decade} value={decade}>
                {decade === 'all' ? 'All Decades' : decade}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-blue-600 to-purple-600"></div>

        {/* Timeline Events */}
        <div className="space-y-6">
          {filteredEvents.map((event, index) => {
            const isActive = playingTimeline && index === currentEventIndex
            const IconComponent = event.icon
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 ${
                  isActive ? 'scale-105' : ''
                } transition-all duration-300`}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Year Marker */}
                <div className={`relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center font-black text-white transition-all duration-300 ${
                  isActive 
                    ? 'bg-red-600 border-red-400 shadow-lg shadow-red-600/50' 
                    : hoveredEvent === event.id
                    ? 'bg-blue-600 border-blue-400'
                    : 'bg-gray-700 border-gray-500'
                }`}>
                  <div className="text-center">
                    <div className="text-xs font-bold">{event.year}</div>
                  </div>
                  
                  {isActive && (
                    <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-30"></div>
                  )}
                </div>

                {/* Event Content */}
                <motion.div
                  className={`flex-1 bg-gradient-to-br ${getSignificanceColor(event.significance)} border-2 border-gray-600 hover:border-red-500 rounded-xl p-6 transition-all duration-300 ${
                    isActive ? 'shadow-2xl shadow-red-600/20' : 'hover:shadow-lg'
                  }`}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`text-3xl ${event.color.replace('#', 'text-')} filter drop-shadow-lg`} />
                      <div>
                        <h4 className="text-lg font-black text-white">{event.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <FaMapMarkerAlt className="text-blue-400" />
                          <span>{event.country}</span>
                          <span>•</span>
                          <span className="font-bold text-yellow-400">{event.genre}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      event.significance === 'Legendary' ? 'bg-red-600' :
                      event.significance === 'Major' ? 'bg-blue-600' :
                      event.significance === 'Important' ? 'bg-green-600' :
                      'bg-purple-600'
                    }`}>
                      {event.significance}
                    </div>
                  </div>

                  <p className="text-gray-200 mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Impact */}
                  <div className="bg-black/30 border border-gray-600 rounded-lg p-3 mb-4">
                    <div className="text-xs text-yellow-400 font-bold mb-1 uppercase">Impact:</div>
                    <div className="text-gray-300 text-sm">{event.impact}</div>
                  </div>

                  {/* Key Bands */}
                  <div className="flex flex-wrap gap-2">
                    <div className="text-xs text-gray-400 font-bold mr-2">Key Bands:</div>
                    {event.bands.map((band, bandIndex) => (
                      <span 
                        key={bandIndex}
                        className="bg-gray-700/50 text-gray-300 px-2 py-1 text-xs rounded border border-gray-600 hover:border-red-500 transition-colors cursor-pointer"
                      >
                        {band}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Timeline Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Events', value: filteredEvents.length, icon: FaCalendarAlt, color: 'text-blue-400' },
          { label: 'Countries', value: new Set(filteredEvents.map(e => e.country)).size, icon: FaMapMarkerAlt, color: 'text-green-400' },
          { label: 'Genres', value: new Set(filteredEvents.map(e => e.genre)).size, icon: FaMusic, color: 'text-purple-400' },
          { label: 'Legendary', value: filteredEvents.filter(e => e.significance === 'Legendary').length, icon: FaCrown, color: 'text-yellow-400' }
        ].map((stat, index) => (
          <div key={stat.label} className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
            <stat.icon className={`text-xl mx-auto mb-1 ${stat.color}`} />
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SceneTimeline
