"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  GiDragonHead, 
  GiBloodySword, 
  GiBattleAxe, 
  GiSpikedDragonHead, 
  GiCrossedSwords, 
  GiBlackFlag,
  GiThorHammer,
  GiGothicCross
} from "react-icons/gi"
import { FaWallet, FaEthereum, FaVolumeUp, FaBolt } from "react-icons/fa"
import { featuredBands } from "./data/mockData"

const HERO_BANNER_URL = "/tlobannmetall1.png"

interface HeroSectionProps {
  glitchActive: boolean
  setGlitchActive: (value: boolean) => void
  displayStats: any
  setRandomBand: (value: string | null) => void
  metalScore: number
  setMetalScore: (value: number | ((prev: number) => number)) => void
}

const HeroSection = ({ glitchActive, setGlitchActive, displayStats, setRandomBand, metalScore, setMetalScore }: HeroSectionProps) => {
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [setGlitchActive])

  const discoverRandomBand = () => {
    if (!featuredBands?.length) return
    const randomIndex = Math.floor(Math.random() * featuredBands.length)
    const selectedBand = featuredBands[randomIndex]
    
    setRandomBand(selectedBand.name)
    setMetalScore(prev => prev + 13)

    alert(
      `🔥 DISCOVERED: ${selectedBand.name} (${selectedBand.formed})\n` +
      `📍 Origin: ${selectedBand.country}\n` +
      `🎵 Genre: ${selectedBand.genre}\n` +
      `🏆 Status: ${selectedBand.status}\n` +
      `💿 Albums: ${selectedBand.albums}\n\n` +
      `💰 Earned: ${selectedBand.reward} + 13 reputation points!\n` +
      `⚡ Your Metal Score: ${metalScore + 13}\n\n` +
      `Check them out in Legion Database! 🗡️`
    )
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center border-b-4 border-red-600 overflow-hidden">
      {/* Background Image */}
      {!imageError ? (
        <Image
          src={HERO_BANNER_URL}
          alt="Metal Forge - Underground Eternal"
          fill
          className="object-cover object-center"
          style={{
            filter: "grayscale(0.7) contrast(1.3) brightness(0.6) saturate(1.2)",
            opacity: 0.85,
          }}
          priority
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 via-black to-gray-900 opacity-90"></div>
      )}

      {/* Enhanced Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/95"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-red-900/20"></div>

      {/* Nordic Runes */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div 
          className="animate-pulse text-6xl text-red-300 absolute top-16 left-16 transform rotate-12 drop-shadow-lg"
          style={{ 
            textShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
            animationDelay: '0s',
            animationDuration: '4s',
            fontFamily: 'serif'
          }}
        >
          ᚦ
        </div>
        
        <div
          className="animate-pulse text-5xl text-blue-300 absolute top-24 right-20 transform -rotate-15 drop-shadow-lg"
          style={{ 
            textShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
            animationDelay: '1s',
            animationDuration: '5s',
            fontFamily: 'serif'
          }}
        >
          ᚱ
        </div>
        
        <div
          className="animate-pulse text-5xl text-yellow-300 absolute bottom-24 left-24 transform rotate-10 drop-shadow-lg"
          style={{ 
            textShadow: '0 0 15px rgba(253, 224, 71, 0.5)',
            animationDelay: '2s',
            animationDuration: '6s',
            fontFamily: 'serif'
          }}
        >
          ᚠ
        </div>
        
        <div
          className="animate-pulse text-4xl text-purple-300 absolute bottom-20 right-24 transform -rotate-8 drop-shadow-lg"
          style={{ 
            textShadow: '0 0 12px rgba(147, 51, 234, 0.5)',
            animationDelay: '3s',
            animationDuration: '4.5s',
            fontFamily: 'serif'
          }}
        >
          ᚹ
        </div>

        <div 
          className="animate-pulse text-4xl text-green-300 absolute top-1/3 left-1/4 transform rotate-20 drop-shadow-lg"
          style={{ 
            textShadow: '0 0 10px rgba(34, 197, 94, 0.4)',
            animationDelay: '4s',
            animationDuration: '5.5s',
            fontFamily: 'serif'
          }}
        >
          ᚨ
        </div>
      </div>

      {/* Enhanced Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-6"
        >
          <div className="relative">
            <GiDragonHead className="text-8xl md:text-9xl text-red-600 drop-shadow-2xl mb-4 filter brightness-110" />
            {glitchActive && (
              <GiDragonHead className="absolute top-0 left-0 text-8xl md:text-9xl text-red-400 drop-shadow-2xl mb-4 filter brightness-125 animate-ping opacity-30" />
            )}
          </div>
        </motion.div>

        <motion.h1
          className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest mb-4 text-white drop-shadow-2xl ${
            glitchActive ? "animate-pulse text-red-100" : ""
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            textShadow: glitchActive 
              ? '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5)' 
              : '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(239, 68, 68, 0.3)'
          }}
        >
          METAL FORGE
        </motion.h1>

        <motion.h2
          className="text-xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-red-400 mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
          }}
        >
          <GiBloodySword className="inline mr-3 text-red-500" />
          Underground • Eternal • Web3
          <GiBattleAxe className="inline ml-3 text-red-500" />
        </motion.h2>

        <motion.div
          className="bg-black/85 backdrop-blur-sm border-2 border-red-600 rounded-lg p-8 mb-8 max-w-4xl shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          style={{
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            The first <span className="text-red-400 font-bold">gamified metal platform</span> on blockchain. 
            Add bands to earn reputation, stream demos for <span className="text-green-400 font-bold">crypto micropayments</span>, 
            and compete with metalheads worldwide. Your underground knowledge becomes <span className="text-yellow-400 font-bold">valuable digital assets</span>.
          </p>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-red-600/20 border border-red-600/50 rounded p-3">
              <div className="text-2xl font-bold text-red-400">{displayStats.bands}</div>
              <div className="text-xs text-gray-400 uppercase">Metal Bands</div>
            </div>
            <div className="bg-blue-600/20 border border-blue-600/50 rounded p-3">
              <div className="text-2xl font-bold text-blue-400">{displayStats.demos}</div>
              <div className="text-xs text-gray-400 uppercase">Underground Demos</div>
            </div>
            <div className="bg-green-600/20 border border-green-600/50 rounded p-3">
              <div className="text-2xl font-bold text-green-400">{displayStats.users}</div>
              <div className="text-xs text-gray-400 uppercase">Metalheads</div>
            </div>
            <div className="bg-yellow-600/20 border border-yellow-600/50 rounded p-3">
              <div className="text-2xl font-bold text-yellow-400">{displayStats.earnings}</div>
              <div className="text-xs text-gray-400 uppercase">ETH Earned</div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <button
            onClick={discoverRandomBand}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 font-black text-lg uppercase tracking-wide border-2 border-red-600 shadow-2xl transition-all duration-300 hover:shadow-red-600/50 hover:scale-105 rounded-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              <GiSpikedDragonHead className="text-2xl animate-bounce" /> 
              DISCOVER & EARN
              <FaBolt className="text-yellow-400" />
            </span>
          </button>
          <Link
            href="/profile"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 font-black text-lg uppercase tracking-wide border-2 border-green-600 shadow-2xl transition-all duration-300 hover:shadow-green-600/50 hover:scale-105 rounded-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              <FaWallet className="text-xl" /> 
              CONNECT WALLET
              <FaEthereum className="text-blue-300" />
            </span>
          </Link>
          <Link
            href="/bands"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 font-black text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <GiCrossedSwords className="text-xl" /> 
              LEGION DATABASE
              <GiBlackFlag />
            </span>
          </Link>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <Link href="/player" className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1">
            <FaVolumeUp /> Demo Vault
          </Link>
          <Link href="/nft" className="text-purple-400 hover:text-purple-300 underline flex items-center gap-1">
            <GiThorHammer /> NFT Forge
          </Link>
          <Link href="/community" className="text-yellow-400 hover:text-yellow-300 underline flex items-center gap-1">
            <GiGothicCross /> Community
          </Link>
          <Link href="/about" className="text-gray-400 hover:text-white underline">Manifesto</Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
