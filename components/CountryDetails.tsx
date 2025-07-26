"use client"

import { motion } from 'framer-motion'
import { FaTimes, FaCrown, FaMusic, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'
import { GiCrossedSwords, GiFlame } from 'react-icons/gi'

interface CountryDetailsProps {
  country: any
  onClose: () => void
}

const CountryDetails = ({ country, onClose }: CountryDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-600 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 border-b border-red-600/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{country.flag}</span>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-wide text-white">{country.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <FaCrown className="text-yellow-400" />
                  <span className="text-yellow-400 font-bold">Influence: {country.metalScene.influence}/100</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaTimes className="text-xl text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 text-center">
              <GiCrossedSwords className="text-3xl text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{country.metalScene.totalBands}</div>
              <div className="text-xs text-gray-400 uppercase">Total Bands</div>
            </div>
            <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4 text-center">
              <FaMusic className="text-3xl text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{country.festivals.length}</div>
              <div className="text-xs text-gray-400 uppercase">Festivals</div>
            </div>
            <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4 text-center">
              <FaUsers className="text-3xl text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{country.statistics.venueCount}</div>
              <div className="text-xs text-gray-400 uppercase">Venues</div>
            </div>
            <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 text-center">
              <GiFlame className="text-3xl text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{country.statistics.albumsReleased.toLocaleString()}</div>
              <div className="text-xs text-gray-400 uppercase">Albums</div>
            </div>
          </div>

          {/* Dominant Genres */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Dominant Genres</h3>
            <div className="flex flex-wrap gap-2">
              {country.metalScene.dominantGenres.map((genre: string) => (
                <span key={genre} className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg border border-red-600/50 font-bold">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Legendary Bands */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Legendary Bands</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {country.metalScene.legendaryBands.map((band: string) => (
                <div key={band} className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center">
                  <div className="font-bold text-white">{band}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Major Festivals */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Major Festivals</h3>
            <div className="space-y-3">
              {country.festivals.map((festival: any) => (
                <div key={festival.name} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-white">{festival.name}</div>
                    <div className="text-sm text-gray-400">Since {festival.founded}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-400" />
                      {festival.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMusic className="text-purple-400" />
                      {festival.genre}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-green-400" />
                      {festival.attendance.toLocaleString()} attendees
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CountryDetails
