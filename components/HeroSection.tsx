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
  GiGothicCross,
  GiDeathSkull,
  GiSkullCrossedBones
} from "react-icons/gi"
import { FaWallet, FaEthereum, FaVolumeUp, FaBolt, FaSkullCrossbones } from "react-icons/fa"
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
      setTimeout(() => setGlitchActive(false), 666) // Evil timing
    }, 6666) // Every 6.666 seconds for kvlt effect
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
    <section 
      className="relative py-16 sm:py-20 lg:py-24 zine-section border-b-4 border-black"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f5f5e8"
      }}
    >
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="bg-[#f5f5e8] p-6 sm:p-8 border-4 border-black zine-border max-w-6xl mx-auto"
             style={{
               backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
               backgroundSize: "cover",
               backgroundPosition: "center",
             }}>
          
          {/* Hero Skull Icon */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-6"
          >
            <div className="relative">
              <FaSkullCrossbones className="text-8xl md:text-9xl text-black drop-shadow-2xl mb-4 filter grayscale contrast-200" />
              {glitchActive && (
                <FaSkullCrossbones className="absolute top-0 left-0 text-8xl md:text-9xl text-red-800 drop-shadow-2xl mb-4 animate-ping opacity-40" />
              )}
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest mb-4 text-black font-zine-title ${
              glitchActive ? "animate-pulse text-red-800" : ""
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{
              textShadow: glitchActive 
                ? '0 0 30px rgba(139, 0, 0, 0.8), 0 0 60px rgba(139, 0, 0, 0.5)' 
                : '2px 2px 8px rgba(0,0,0,0.9)'
            }}
          >
            METAL FORGE
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="text-xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-red-800 mb-6 font-zine-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            <FaSkullCrossbones className="inline mr-3 text-red-800" />
            Underground • Kvlt • Web3
            <GiBloodySword className="inline ml-3 text-red-800" />
          </motion.h2>

          {/* Description Box */}
          <motion.div
            className="bg-[#f5f5e8] backdrop-blur-sm border-4 border-black rounded-none p-6 mb-8 max-w-4xl mx-auto shadow-metal zine-border"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <p className="text-lg md:text-xl text-black mb-6 leading-relaxed font-zine-body">
              The only true <span className="text-red-800 font-bold">underground metal platform</span> forged in darkness. 
              Contribute rare band knowledge to earn <span className="text-red-800 font-bold">blood tokens</span>, 
              stream forbidden demos for <span className="text-red-800 font-bold">crypto rewards</span>, 
              and prove your metal worth in the <span className="text-red-800 font-bold">eternal brotherhood</span>.
            </p>

            {/* Stats Grid w stylu Zine */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-[#f5f5e8] border-2 border-black rounded-none p-3 zine-border">
                <div className="text-2xl font-bold text-red-800 font-zine-title">666</div>
                <div className="text-xs text-black uppercase font-zine-body">Cult Bands</div>
              </div>
              <div className="bg-[#f5f5e8] border-2 border-black rounded-none p-3 zine-border">
                <div className="text-2xl font-bold text-black font-zine-title">1,984</div>
                <div className="text-xs text-black uppercase font-zine-body">Forbidden Demos</div>
              </div>
              <div className="bg-[#f5f5e8] border-2 border-black rounded-none p-3 zine-border">
                <div className="text-2xl font-bold text-red-800 font-zine-title">777</div>
                <div className="text-xs text-black uppercase font-zine-body">Underground Warriors</div>
              </div>
              <div className="bg-[#f5f5e8] border-2 border-black rounded-none p-3 zine-border">
                <div className="text-2xl font-bold text-black font-zine-title">13.37</div>
                <div className="text-xs text-black uppercase font-zine-body">ETH Forged</div>
              </div>
            </div>
          </motion.div>

          {/* Buttons w stylu Zine */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <button
              onClick={discoverRandomBand}
              className="skull-button text-[#d0d0d0] px-8 py-4 font-bold text-lg uppercase tracking-wide shadow-metal transition-all duration-300 hover:scale-105 rounded-none relative overflow-hidden group font-zine-body"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <FaSkullCrossbones className="text-2xl animate-pulse" /> 
                DISCOVER & EARN
                <FaBolt className="text-yellow-400" />
              </span>
            </button>
            
            <Link
              href="/profile"
              className="bg-gradient-to-r from-[#3a1c1c] to-[#1a1a1a] hover:from-[#5a2e2e] hover:to-[#2a2a2a] text-[#d0d0d0] px-8 py-4 font-bold text-lg uppercase tracking-wide border-2 border-[#8a4a4a] shadow-metal transition-all duration-300 hover:scale-105 rounded-none relative overflow-hidden group font-zine-body"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <FaWallet className="text-xl" /> 
                CONNECT WALLET
                <FaEthereum className="text-blue-400" />
              </span>
            </Link>
            
            <Link
              href="/bands"
              className="bg-[#f5f5e8] border-4 border-black text-black hover:bg-[#e0e0d8] hover:text-red-800 hover:border-red-800 px-8 py-4 font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-none relative overflow-hidden group font-zine-body zine-border"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <GiCrossedSwords className="text-xl" /> 
                LEGION DATABASE
                <GiBlackFlag />
              </span>
            </Link>
          </motion.div>

          {/* Quick Access Links */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <Link href="/player" className="text-black hover:text-red-800 underline flex items-center gap-1 font-zine-body">
              <FaVolumeUp /> Demo Vault
            </Link>
            <Link href="/nft" className="text-black hover:text-red-800 underline flex items-center gap-1 font-zine-body">
              <GiThorHammer /> NFT Forge
            </Link>
            <Link href="/community" className="text-black hover:text-red-800 underline flex items-center gap-1 font-zine-body">
              <GiGothicCross /> Brotherhood
            </Link>
            <Link href="/about" className="text-black hover:text-red-800 underline font-zine-body">Manifesto</Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
