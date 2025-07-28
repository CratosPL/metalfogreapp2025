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
  FaCrown,
  FaSkullCrossbones
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
    <section 
      className="py-16 bg-[#f5f5e8] relative zine-section"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-8xl text-red-800"><GiBattleAxe /></div>
        <div className="absolute top-40 right-40 text-6xl text-black"><GiVikingHelmet /></div>
        <div className="absolute bottom-20 left-1/3 text-7xl text-red-800"><GiGothicCross /></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-6 text-black font-zine-title">
            <FaSkullCrossbones className="inline mr-4 text-red-800 skull-icon" />
            FORGE YOUR DESTINY
            <GiBattleAxe className="inline ml-4 text-red-800 skull-icon" />
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto font-zine-body">
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
            className="bg-[#f5f5e8] border-4 border-black hover:border-red-800 transition-all duration-300 rounded-none overflow-hidden shadow-metal group zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <div className="bg-red-800 border-b-4 border-black p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <GiCrossedSwords className="text-3xl text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 text-3xl text-red-100 group-hover:animate-ping opacity-30">
                      <GiCrossedSwords />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide text-white font-zine-title">LEGION DATABASE</h3>
                    <p className="text-xs text-red-100 font-bold font-zine-body">BUILD THE ULTIMATE REGISTRY</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg font-zine-body">0.005 ETH</div>
                  <div className="text-xs text-red-100 font-zine-body">per verified band</div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-black mb-6 leading-relaxed font-zine-body">
                Add bands to our blockchain registry and earn reputation points. Get verified by the community for bonus crypto rewards.
              </p>
              
              <div className="space-y-3 mb-6">
                {featuredBands.slice(0, 3).map((band, i) => (
                  <div key={i} className="bg-[#e0e0d8] border-2 border-black rounded-none p-3 hover:border-red-800 transition-colors duration-300 zine-card">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-black font-bold font-zine-body">{band.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-800 font-bold text-sm font-zine-body">{band.reward}</span>
                        <div className="text-xs bg-red-800 text-white px-2 py-1 rounded-none font-bold font-zine-body uppercase">
                          {band.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-black flex justify-between font-zine-body">
                      <span>{band.country} • {band.genre}</span>
                      <span>Since {band.formed} • {band.albums} albums</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/bands"
                  className="skull-button text-[#d0d0d0] py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-none shadow-metal font-zine-body"
                >
                  EXPLORE LEGIONS
                </Link>
                <Link
                  href="/profile"
                  className="bg-[#f5f5e8] border-2 border-black text-black hover:bg-red-800 hover:border-red-800 hover:text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-none font-zine-body"
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
            className="bg-[#f5f5e8] border-4 border-black hover:border-red-800 transition-all duration-300 rounded-none overflow-hidden shadow-metal group zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <div className="bg-black border-b-4 border-black p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <FaMusic className="text-3xl text-red-800 group-hover:scale-110 transition-transform duration-300" />
                    {isPlaying && (
                      <div className="absolute inset-0 text-3xl text-red-600 animate-pulse">
                        <FaVolumeUp />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide text-white font-zine-title">DEMO VAULT</h3>
                    <p className="text-xs text-red-800 font-bold font-zine-body">UNDERGROUND TREASURY</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-800 font-bold text-lg font-zine-body">0.001 ETH</div>
                  <div className="text-xs text-gray-300 font-zine-body">per stream</div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-black mb-6 leading-relaxed font-zine-body">
                Stream underground demos with micropayments. Artists get paid instantly via Optimism smart contracts.
              </p>
              
              <div className="bg-black border-2 border-red-800 rounded-none p-4 mb-6 zine-card">
                <div className="flex items-center gap-3 mb-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="bg-red-800 hover:bg-red-700 text-white p-2 rounded-none transition-colors duration-300"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <div>
                    <div className="text-white font-bold text-sm font-zine-body">
                      {demoTracks[currentTrack]?.title || "Mayhem - Freezing Moon"}
                    </div>
                    <div className="text-xs text-gray-400 font-zine-body">
                      {demoTracks[currentTrack]?.year || "Demo '92"} • 
                      {demoTracks[currentTrack]?.plays || "1,247"} plays
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 h-8 mb-3 bg-gray-800 rounded-none overflow-hidden">
                  {[20, 40, 60, 30, 80, 50, 70, 90, 45, 65, 35, 75, 25, 85, 55, 40, 20].map((height, i) => (
                    <div
                      key={i}
                      className={`bg-red-800 flex-1 transition-all duration-300 ${
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
                  <span className="text-gray-400 font-zine-body">Artist gets 80%</span>
                  <span className="text-red-800 font-bold font-zine-body">
                    Earned: {demoTracks[currentTrack]?.earnings || "2.4 ETH"}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/player"
                  className="skull-button text-[#d0d0d0] py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-none shadow-metal font-zine-body"
                >
                  ENTER VAULT
                </Link>
                <Link
                  href="/profile"
                  className="bg-[#f5f5e8] border-2 border-black text-black hover:bg-red-800 hover:border-red-800 hover:text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-none font-zine-body"
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
            className="bg-[#f5f5e8] border-4 border-black hover:border-red-800 transition-all duration-300 rounded-none overflow-hidden shadow-metal group zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <div className="bg-gradient-to-r from-[#3a1c1c] to-[#1a1a1a] border-b-4 border-black p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <FaUsers className="text-3xl text-red-800 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide text-white font-zine-title">METAL BROTHERHOOD</h3>
                    <p className="text-xs text-red-800 font-bold font-zine-body">UNITE THE UNDERGROUND</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-800 font-bold text-lg font-zine-body">Monthly</div>
                  <div className="text-xs text-gray-300 font-zine-body">crypto prizes</div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-black mb-6 leading-relaxed font-zine-body">
                Build your Metal DNA profile, compete in rankings, and earn crypto rewards for community contributions.
              </p>
              
              <div className="bg-gradient-to-br from-black to-[#3a1c1c] border-2 border-red-800 rounded-none p-6 mb-6 text-center zine-card">
                <div className="relative mb-4">
                  <FaTrophy className="text-4xl text-yellow-400 mx-auto" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-sm text-gray-300 mb-1 font-zine-body uppercase">Your Metal Score</div>
                <div className="text-3xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2 font-zine-title">
                  {metalScore} 
                  <FaBolt className="text-yellow-500 text-lg animate-pulse" />
                </div>
                <div className="text-xs text-gray-300 mb-3 font-zine-body">Top 13% Metalhead Worldwide</div>
                <div className="flex justify-center gap-2">
                  <div className="bg-red-800 text-white px-2 py-1 rounded-none text-xs font-bold font-zine-body uppercase tracking-wide">
                    KVLT MEMBER
                  </div>
                  <div className="bg-black border border-red-800 text-red-800 px-2 py-1 rounded-none text-xs font-bold font-zine-body uppercase tracking-wide">
                    VERIFIED
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/community"
                  className="skull-button text-[#d0d0d0] py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-none shadow-metal font-zine-body"
                >
                  JOIN RANKS
                </Link>
                <Link
                  href="/profile"
                  className="bg-[#f5f5e8] border-2 border-black text-black hover:bg-red-800 hover:border-red-800 hover:text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-center rounded-none font-zine-body"
                >
                  MY PROFILE
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .skull-icon {
          text-shadow: 0 0 10px rgba(139, 0, 0, 0.6);
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
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
    </section>
  )
}

export default FeaturesGrid
