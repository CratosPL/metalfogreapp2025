"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { 
  GiCrossedSwords, 
  GiThorHammer, 
  GiDeathSkull, 
  GiGothicCross, 
  GiSkullCrossedBones,
  GiBattleAxe,
  GiVikingHelmet
} from "react-icons/gi"
import { 
  FaMusic, 
  FaUsers, 
  FaStore, 
  FaNewspaper, 
  FaPlay, 
  FaPause, 
  FaTrophy, 
  FaVolumeUp, 
  FaBolt, 
  FaCrown 
} from "react-icons/fa"
import { featuredBands, marketplaceItems, demoTracks } from "./data/mockData"

interface FeaturesGridProps {
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
  currentTrack: number
  setCurrentTrack: (value: number) => void
  metalScore: number
}

const FeaturesGrid = ({ isPlaying, setIsPlaying, currentTrack, setCurrentTrack, metalScore }: FeaturesGridProps) => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900 relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-8xl text-red-600"><GiBattleAxe /></div>
        <div className="absolute top-40 right-40 text-6xl text-blue-600"><GiVikingHelmet /></div>
        <div className="absolute bottom-20 left-1/3 text-7xl text-purple-600"><GiGothicCross /></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 text-white">
            <GiSkullCrossedBones className="inline mr-4 text-red-600" />
            FORGE YOUR DESTINY
            <GiBattleAxe className="inline ml-4 text-red-600" />
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Enter the underground ecosystem where every action earns rewards and builds your metal legacy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Enhanced Legion Database */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-red-600 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl group"
          >
            <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 border-b-2 border-red-600/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <GiCrossedSwords className="text-3xl text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 text-3xl text-red-300 group-hover:animate-ping opacity-30">
                      <GiCrossedSwords />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-wide text-white">LEGION DATABASE</h3>
                    <p className="text-xs text-red-400 font-bold">BUILD THE ULTIMATE REGISTRY</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-lg">0.005 ETH</div>
                  <div className="text-xs text-gray-400">per verified band</div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Add bands to our blockchain registry and earn reputation points. Get verified by the community for bonus crypto rewards.
              </p>
              
              <div className="space-y-3 mb-6">
                {featuredBands.map((band, i) => (
                  <div key={i} className="bg-gray-900/50 border border-gray-700 rounded p-3 hover:border-red-600/50 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-bold">{band.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-bold text-sm">{band.reward}</span>
                        <div className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded font-bold">
                          {band.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 flex justify-between">
                      <span>{band.country} • {band.genre}</span>
                      <span>Since {band.formed} • {band.albums} albums</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/bands"
                  className="bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-lg shadow-lg"
                >
                  EXPLORE LEGIONS
                </Link>
                <Link
                  href="/profile"
                  className="bg-transparent border border-gray-500 text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-lg"
                >
                  ADD BAND
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Demo Vault */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-blue-600 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl group"
          >
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-b-2 border-blue-600/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <FaMusic className="text-3xl text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    {isPlaying && (
                      <div className="absolute inset-0 text-3xl text-blue-300 animate-pulse">
                        <FaVolumeUp />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-wide text-white">DEMO VAULT</h3>
                    <p className="text-xs text-blue-400 font-bold">UNDERGROUND TREASURY</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-lg">0.001 ETH</div>
                  <div className="text-xs text-gray-400">per stream</div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Stream underground demos with micropayments. Artists get paid instantly via Optimism smart contracts.
              </p>
              
              <div className="bg-gray-900/80 border-2 border-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <div>
                    <div className="text-white font-bold text-sm">
                      {demoTracks[currentTrack]?.title || "Mayhem - Freezing Moon"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {demoTracks[currentTrack]?.year || "Demo '92"} • 
                      {demoTracks[currentTrack]?.plays || "1,247"} plays
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 h-8 mb-3 bg-gray-800 rounded overflow-hidden">
                  {[20, 40, 60, 30, 80, 50, 70, 90, 45, 65, 35, 75, 25, 85, 55, 40, 20].map((height, i) => (
                    <div
                      key={i}
                      className={`bg-blue-600 flex-1 transition-all duration-300 ${
                        isPlaying ? "animate-pulse" : ""
                      }`}
                      style={{ 
                        height: `${height}%`,
                        opacity: isPlaying ? (i % 3 === 0 ? 1 : 0.7) : 0.5
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Artist gets 80%</span>
                  <span className="text-green-400 font-bold">
                    Earned: {demoTracks[currentTrack]?.earnings || "2.4 ETH"}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/player"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-lg shadow-lg"
                >
                  ENTER VAULT
                </Link>
                <Link
                  href="/profile"
                  className="bg-transparent border border-gray-500 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-lg"
                >
                  UPLOAD DEMO
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Community */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-purple-600 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl group"
          >
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 border-b-2 border-purple-600/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <FaUsers className="text-3xl text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-wide text-white">METAL BROTHERHOOD</h3>
                    <p className="text-xs text-purple-400 font-bold">UNITE THE UNDERGROUND</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-purple-400 font-bold text-lg">Monthly</div>
                  <div className="text-xs text-gray-400">crypto prizes</div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Build your Metal DNA profile, compete in rankings, and earn crypto rewards for community contributions.
              </p>
              
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-2 border-purple-600/30 rounded-lg p-6 mb-6 text-center">
                <div className="relative mb-4">
                  <FaTrophy className="text-4xl text-yellow-400 mx-auto" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-sm text-gray-300 mb-1">Your Metal Score</div>
                <div className="text-3xl font-black text-yellow-400 mb-2 flex items-center justify-center gap-2">
                  {metalScore} 
                  <FaBolt className="text-yellow-500 text-lg animate-pulse" />
                </div>
                <div className="text-xs text-gray-500 mb-3">Top 13% Metalhead Worldwide</div>
                <div className="flex justify-center gap-2">
                  <div className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs font-bold">
                    KVLT MEMBER
                  </div>
                  <div className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs font-bold">
                    VERIFIED
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/community"
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-lg shadow-lg"
                >
                  JOIN RANKS
                </Link>
                <Link
                  href="/profile"
                  className="bg-transparent border border-gray-500 text-gray-300 hover:bg-purple-600 hover:border-purple-600 hover:text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-lg"
                >
                  MY PROFILE
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Reszta komponentów - Marketplace, War Chronicles, NFT Forge */}
          {/* (te są już w attachment, więc dodaję w skrócie) */}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid
