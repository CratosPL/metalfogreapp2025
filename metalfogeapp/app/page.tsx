"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import MetalDNA from "../components/MetalDNA"
import BandIncubator from "../components/BandIncubator"
import {
  FaMusic,
  FaUsers,
  FaStore,
  FaFire,
  FaPlay,
  FaPause,
  FaTrophy,
  FaWallet,
  FaNewspaper,
  FaHeadphones,
  FaQuoteLeft,
} from "react-icons/fa"
import {
  GiDeathSkull,
  GiCrossedBones,
  GiCrossedSwords,
  GiThorHammer,
  GiDragonHead,
  GiWolfHead,
  GiCoffin,
  GiGhost,
  GiTreasureMap,
} from "react-icons/gi"
import Link from "next/link"

const HERO_BANNER_URL = "/tlobannmetall1.png"

const MetalForgeApp = () => {
  const [glitchActive, setGlitchActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [randomBand, setRandomBand] = useState<string | null>(null)
  const [displayStats, setDisplayStats] = useState({ bands: 0, demos: 0, users: 0, news: 0 })
  const [imageError, setImageError] = useState(false)

  // MOCK DATA
  const featuredBands = [
    { name: "DARKTHRONE", country: "Norway", genre: "Black Metal", listeners: 1247 },
    { name: "MORBID ANGEL", country: "USA", genre: "Death Metal", listeners: 892 },
    { name: "EMPEROR", country: "Norway", genre: "Symphonic Black", listeners: 743 },
  ]

  const recentActivity = [
    { user: "METAL_SCRIBE", action: "added new band", target: "Frosty Torment", time: "2m ago" },
    { user: "DEATH_COLLECTOR", action: "minted NFT", target: "Bathory Logo #47", time: "5m ago" },
    { user: "UNDERGROUND_HERALD", action: "uploaded demo", target: "Winter's Wrath", time: "12m ago" },
    { user: "KVLT_WARRIOR", action: "reviewed album", target: "Darkthrone - Eternal Hails", time: "15m ago" },
    { user: "FROST_KEEPER", action: "joined community", target: "Welcome to the underground", time: "20m ago" },
  ]

  const marketplaceItems = [
    { title: "Mayhem - De Mysteriis Dom Sathanas (Vinyl)", price: "0.15 ETH", type: "Physical" },
    { title: "Darkthrone Logo NFT #23", price: "0.08 ETH", type: "NFT" },
    { title: "Emperor - In The Nightside Eclipse (CD)", price: "0.05 ETH", type: "Physical" },
  ]

  const hallOfFame = [
    { name: "Bathory", img: "/placeholder.svg?height=300&width=300" },
    { name: "Mayhem", img: "/placeholder.svg?height=300&width=300" },
    { name: "Emperor", img: "/placeholder.svg?height=300&width=300" },
    { name: "Vader", img: "/placeholder.svg?height=300&width=300" },
  ]

  const randomQuotes = [
    "No posers. No compromise. Only true underground.",
    "Where Web3 meets the true underground spirit.",
    "Your underground knowledge becomes valuable.",
    "Every stream rewards both fans and artists.",
    "Build the ultimate metal database on blockchain.",
  ]

  const stats = {
    bands: 2847,
    demos: 15392,
    users: 8921,
    news: 420,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIdx((q) => (q + 1) % randomQuotes.length)
    }, 7000)
    return () => clearInterval(quoteInterval)
  }, [randomQuotes])

  useEffect(() => {
    const targets = { bands: stats.bands, demos: stats.demos, users: stats.users, news: stats.news }
    const duration = 2000
    const steps = 60
    let step = 0

    const interval = setInterval(() => {
      step++
      const progress = step / steps
      setDisplayStats({
        bands: Math.floor(targets.bands * progress),
        demos: Math.floor(targets.demos * progress),
        users: Math.floor(targets.users * progress),
        news: Math.floor(targets.news * progress),
      })
      if (step >= steps) clearInterval(interval)
    }, duration / steps)

    return () => clearInterval(interval)
  }, [stats])

  const discoverRandomBand = () => {
    if (!featuredBands || !Array.isArray(featuredBands) || featuredBands.length === 0) {
      alert("No bands available for discovery!")
      return
    }

    try {
      const randomIndex = Math.floor(Math.random() * featuredBands.length)
      const selectedBand = featuredBands[randomIndex]

      if (!selectedBand) {
        alert("Error: Could not select a band!")
        return
      }

      const bandName = selectedBand.name || "Unknown Band"
      const country = selectedBand.country || "Unknown"
      const genre = selectedBand.genre || "Unknown"
      const listeners = selectedBand.listeners || 0

      setRandomBand(bandName)

      alert(
        `🔥 DISCOVERED: ${bandName} from ${country}\nGenre: ${genre}\nListeners: ${listeners}\n\n💰 Earned +5 reputation points!\n\nCheck them out in Legion Database!`
      )
    } catch (error) {
      console.error("Error in discoverRandomBand:", error)
      alert("Error occurred while discovering band!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter overflow-x-hidden">
      {/* HERO BANNER - AUTENTYCZNE RUNY NORDYCKIE */}
      <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center border-b-4 border-gray-600 overflow-hidden">
        {/* Banner image z error handlingiem */}
        {!imageError ? (
          <Image
            src={HERO_BANNER_URL}
            alt="Black Metal Hero Banner"
            fill
            className="object-cover object-center"
            style={{
              filter: "grayscale(1) contrast(1.25) brightness(0.9)",
              opacity: 0.95,
            }}
            priority
            onError={() => {
              console.error("Błąd ładowania obrazu baneru")
              setImageError(true)
            }}
          />
        ) : (
          /* Fallback gradient */
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-black opacity-80"></div>
        )}

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

        {/* AUTENTYCZNE RUNY NORDYCKIE - tylko Elder Futhark */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* ᚦ - Thurisaz (Thor, burza, chaos) */}
          <div 
            className="animate-pulse text-6xl text-red-300 absolute top-12 left-12 transform rotate-15"
            style={{ 
              textShadow: '0 0 12px rgba(252, 165, 165, 0.4)',
              animationDelay: '0s',
              animationDuration: '5s',
              fontFamily: 'serif'
            }}
          >
            ᚦ
          </div>
          
          {/* ᚱ - Raidho (podróż, ruch) */}
          <div
            className="animate-pulse text-5xl text-gray-300 absolute top-20 right-16 transform -rotate-12"
            style={{ 
              textShadow: '0 0 10px rgba(209, 213, 219, 0.3)',
              animationDelay: '2s',
              animationDuration: '6s',
              fontFamily: 'serif'
            }}
          >
            ᚱ
          </div>
          
          {/* ᚠ - Fehu (bogactwo, moc) */}
          <div
            className="animate-pulse text-5xl text-blue-200 absolute bottom-20 left-20 transform rotate-8"
            style={{ 
              textShadow: '0 0 8px rgba(191, 219, 254, 0.3)',
              animationDelay: '4s',
              animationDuration: '4.5s',
              fontFamily: 'serif'
            }}
          >
            ᚠ
          </div>
          
          {/* ᚹ - Wunjo (radość, chwała) */}
          <div
            className="animate-pulse text-4xl text-yellow-200 absolute bottom-16 right-20 transform -rotate-10"
            style={{ 
              textShadow: '0 0 6px rgba(254, 240, 138, 0.3)',
              animationDelay: '6s',
              animationDuration: '5.5s',
              fontFamily: 'serif'
            }}
          >
            ᚹ
          </div>

          {/* ᚨ - Ansuz (Odin, mądrość) */}
          <div 
            className="animate-pulse text-4xl text-purple-200 absolute top-1/3 left-1/4 transform rotate-30"
            style={{ 
              textShadow: '0 0 6px rgba(221, 214, 254, 0.2)',
              animationDelay: '8s',
              animationDuration: '6.5s',
              fontFamily: 'serif'
            }}
          >
            ᚨ
          </div>

          {/* ᛟ - Othala (dziedzictwo, ojczyzna) */}
          <div 
            className="animate-pulse text-3xl text-orange-200 absolute top-2/3 right-1/4 transform -rotate-20"
            style={{ 
              textShadow: '0 0 4px rgba(254, 215, 170, 0.2)',
              animationDelay: '10s',
              animationDuration: '4.8s',
              fontFamily: 'serif'
            }}
          >
            ᛟ
          </div>

          {/* ᛁ - Isa (lód, stagnacja) */}
          <div 
            className="animate-pulse text-3xl text-cyan-200 absolute top-1/2 right-12 transform rotate-5"
            style={{ 
              textShadow: '0 0 4px rgba(165, 243, 252, 0.2)',
              animationDelay: '12s',
              animationDuration: '5.2s',
              fontFamily: 'serif'
            }}
          >
            ᛁ
          </div>

          {/* ᚢ - Uruz (dzika siła, aurochs) */}
          <div 
            className="animate-pulse text-3xl text-green-200 absolute bottom-1/3 left-12 transform rotate-25"
            style={{ 
              textShadow: '0 0 4px rgba(187, 247, 208, 0.2)',
              animationDelay: '14s',
              animationDuration: '6.8s',
              fontFamily: 'serif'
            }}
          >
            ᚢ
          </div>
        </div>

        {/* Hero content - ZAKTUALIZOWANE */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-4"
          >
            <GiDragonHead className="text-6xl md:text-8xl text-red-600 drop-shadow-lg mb-2" />
          </motion.div>

          <motion.h1
            className={`text-4xl md:text-6xl font-black uppercase tracking-widest mb-2 ${glitchActive ? "animate-pulse" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            METAL FORGE
          </motion.h1>

          {/* ZAKTUALIZOWANY OPIS */}
          <motion.h2
            className="text-lg md:text-2xl font-inter uppercase tracking-widest text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Build Your Metal DNA • Earn Crypto Rewards
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto text-gray-300 text-base md:text-lg mb-6 font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            The first gamified metal platform on blockchain. Add bands to earn reputation, stream demos for micropayments, and compete with metalheads worldwide.{" "}
            <span className="hidden md:inline">Your underground knowledge becomes valuable.</span>
          </motion.p>

          {/* ZAKTUALIZOWANE BUTTONS */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <button
              onClick={discoverRandomBand}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 uppercase font-bold text-xs tracking-wide border-2 border-red-600 shadow-lg transition-all duration-300 hover:shadow-red-600/50"
            >
              <GiDragonHead className="inline mr-2 animate-bounce" /> DISCOVER & EARN
            </button>
            <Link
              href="/profile"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 uppercase font-bold tracking-widest border-2 border-green-600 shadow-lg transition inline-block hover:shadow-green-600/50"
            >
              <FaWallet className="inline mr-2" /> Connect Wallet
            </Link>
            <Link
              href="/bands"
              className="bg-transparent border-2 border-white text-white hover:bg-gray-800 hover:border-blue-400 px-6 py-3 uppercase font-bold tracking-widest transition inline-block"
            >
              <GiCrossedSwords className="inline mr-2" /> Explore Database
            </Link>
          </motion.div>
        </div>
      </section>

      {/* LIVE FEED TICKER */}
      <div className="bg-gray-800 border-b-2 border-gray-600 py-2 overflow-x-hidden">
        <div className="whitespace-nowrap animate-marquee text-xs text-gray-300 font-inter">
          {recentActivity.map((a, i) => (
            <span key={i} className="mx-8">
              <FaFire className="inline text-red-600 mr-1" />
              <b>{a.user}</b> {a.action} <span className="text-red-600">{a.target}</span>{" "}
              <span className="text-gray-500">{a.time}</span>
            </span>
          ))}
        </div>
      </div>

      {/* RANDOM QUOTE - ZAKTUALIZOWANE */}
      <div className="bg-gray-800 border-b-2 border-gray-600 py-4 text-center flex items-center justify-center gap-2">
        <FaQuoteLeft className="text-red-600 text-xl" />
        <span className="italic text-gray-300 font-inter text-lg">{randomQuotes[quoteIdx]}</span>
      </div>

      {/* HEADER Z ROZSZERZONĄ NAWIGACJĄ */}
      <header className="border-b-4 border-gray-600 bg-gray-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <nav className="border-t-2 border-b-2 border-gray-600 py-2">
            <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm uppercase tracking-widest flex-wrap">
              <Link href="/bands" className="hover:text-red-500 transition-colors border-r border-gray-600 pr-2 md:pr-4">
                LEGIONS
              </Link>
              <Link href="/player" className="hover:text-red-500 transition-colors border-r border-gray-600 pr-2 md:pr-4">
                DEMO VAULT
              </Link>
              <Link href="/news" className="hover:text-red-500 transition-colors border-r border-gray-600 pr-2 md:pr-4">
                NEWS
              </Link>
              <Link
                href="/community"
                className="hover:text-red-500 transition-colors border-r border-gray-600 pr-2 md:pr-4"
              >
                COMMUNITY
              </Link>
              <Link
                href="/marketplace"
                className="hover:text-red-500 transition-colors border-r border-gray-600 pr-2 md:pr-4"
              >
                MARKET
              </Link>
              <Link href="/nft" className="hover:text-red-500 transition-colors">
                NFT FORGE
              </Link>
            </div>
          </nav>

          <div className="mt-2 flex justify-center">
            <Link href="/profile">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs uppercase font-bold tracking-wide transition-colors">
                <FaWallet className="inline mr-2" /> CONNECT OPTIMISM WALLET
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* MANIFEST & STATS - ZAKTUALIZOWANE */}
      <section className="bg-gray-900 py-8 border-b-4 border-gray-600">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col justify-center">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <GiCrossedBones className="text-red-600" /> Web3 Underground Manifesto
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Metal Forge is the first decentralized platform built for the extreme metal underground. 
              Where every contribution earns crypto rewards, every stream pays artists instantly, 
              and your metal knowledge becomes valuable digital assets on the Optimism blockchain.
            </p>
            <ul className="list-disc list-inside text-gray-500 text-sm mb-3">
              <li>🏆 Earn reputation points and crypto rewards for adding bands</li>
              <li>💸 Stream demos with instant micropayments to artists</li>
              <li>🎭 Mint exclusive NFTs and build your digital metal legacy</li>
              <li>📊 Develop your Metal DNA profile based on discoveries</li>
              <li>🌐 Trade rare collectibles in our Web3 marketplace</li>
              <li>⚡ All transactions powered by Optimism for low fees</li>
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="bg-gray-800 border border-gray-600 p-4 text-center">
              <div className="text-red-600 font-bold text-2xl">{displayStats.bands}</div>
              <div className="text-xs uppercase text-gray-500">Bands in Registry</div>
            </div>
            <div className="bg-gray-800 border border-gray-600 p-4 text-center">
              <div className="text-blue-400 font-bold text-2xl">{displayStats.demos}</div>
              <div className="text-xs uppercase text-gray-500">Demos & Tracks</div>
            </div>
            <div className="bg-gray-800 border border-gray-600 p-4 text-center">
              <div className="text-green-400 font-bold text-2xl">{displayStats.users}</div>
              <div className="text-xs uppercase text-gray-500">Active Metalheads</div>
            </div>
            <div className="bg-gray-800 border border-gray-600 p-4 text-center">
              <div className="text-yellow-400 font-bold text-2xl">⚡ Optimism</div>
              <div className="text-xs uppercase text-gray-500">Blockchain Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reszta kodu pozostaje taka sama... */}
      {/* HALL OF FAME */}
      <section className="bg-gray-800 border-y-4 border-gray-600 py-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-6 text-white">Hall of Fame</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {hallOfFame.map((legend) => (
              <div
                key={legend.name}
                className="w-32 h-32 border-4 border-gray-600 bg-gray-900 overflow-hidden relative group"
              >
                <img
                  src={legend.img || "/placeholder.svg"}
                  alt={legend.name}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition"
                  style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs uppercase font-bold py-1">
                  {legend.name}
                </div>
                <div className="absolute top-2 right-2 transform rotate-12 opacity-30">
                  <div className="border-2 border-red-600 rounded-full px-2 py-1 text-xs font-bold text-red-600">
                    KVLT
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNDERGROUND MAP */}
      <section className="bg-gray-800 border-y-4 border-gray-600 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-6 text-white">
            <GiTreasureMap className="inline mr-2" /> Underground Map
          </h2>
          <div className="bg-gray-900 border-2 border-gray-600 p-6 relative">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-red-600 font-bold">🇳🇴 Norway</div>
                <div className="text-gray-500">847 bands</div>
                <div className="text-xs text-gray-500">Black Metal Capital</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold">🇺🇸 USA</div>
                <div className="text-gray-500">1,234 bands</div>
                <div className="text-xs text-gray-500">Death Metal Empire</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold">🇸🇪 Sweden</div>
                <div className="text-gray-500">623 bands</div>
                <div className="text-xs text-gray-500">Melodic Death</div>
              </div>
            </div>
            <Link
              href="/map"
              className="absolute bottom-2 right-2 text-xs text-red-600 hover:text-red-500 uppercase font-bold"
            >
              EXPLORE MAP →
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN FEATURES GRID - Również z Web3 focus */}
      <section className="py-8 md:py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Legion Database */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-gray-800 border-2 border-gray-600 hover:border-red-600 transition-colors"
            >
              <div className="bg-gray-800 border-b-2 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <GiCrossedSwords className="text-2xl text-red-600" />
                  <h3 className="text-lg font-black uppercase tracking-wide">LEGION DATABASE</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Add bands to our blockchain registry and earn reputation points. Get verified by the community for bonus rewards.
                </p>
                <div className="space-y-2 mb-4">
                  {featuredBands.map((band, i) => (
                    <div key={i} className="flex justify-between text-xs border-b border-gray-600 pb-1">
                      <span className="text-gray-300">{band.name}</span>
                      <span className="text-red-600">{band.listeners} pts</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/bands"
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    EXPLORE
                  </Link>
                  <Link
                    href="/profile"
                    className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700 px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    ADD BAND
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Demo Vault & Player */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-gray-800 border-2 border-gray-600 hover:border-blue-600 transition-colors"
            >
              <div className="bg-gray-800 border-b-2 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <FaMusic className="text-2xl text-blue-400" />
                  <h3 className="text-lg font-black uppercase tracking-wide">DEMO VAULT</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Stream underground demos with micropayments. Artists get paid instantly via Optimism smart contracts.
                </p>
                <div className="bg-gray-900 border border-gray-600 p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-blue-400 hover:text-blue-300">
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <span className="text-xs text-green-400">Mayhem - Freezing Moon (Demo 92)</span>
                  </div>
                  <div className="flex gap-1 h-6">
                    {[20, 40, 60, 30, 80, 50, 70, 90, 45, 65, 35, 75, 25, 85, 55].map((height, i) => (
                      <div
                        key={i}
                        className={`bg-blue-600 flex-1 transition-all ${isPlaying ? "animate-pulse" : ""}`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">0.001 ETH per play • Artist gets 80%</div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/player"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    PLAYER
                  </Link>
                  <Link
                    href="/profile"
                    className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700 px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    UPLOAD
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Community & Social */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-gray-800 border-2 border-gray-600 hover:border-purple-600 transition-colors"
            >
              <div className="bg-gray-800 border-b-2 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-2xl text-purple-400" />
                  <h3 className="text-lg font-black uppercase tracking-wide">COMMUNITY</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Build your Metal DNA profile, compete in rankings, and earn crypto rewards for community contributions.
                </p>
                <div className="bg-gray-900 border border-gray-600 p-3 mb-4">
                  <div className="text-center">
                    <FaTrophy className="text-yellow-400 text-xl mx-auto mb-2" />
                    <div className="text-xs text-gray-300">Your Metal Score</div>
                    <div className="text-lg font-bold text-yellow-400">666 ⚡</div>
                    <div className="text-xs text-gray-500">Top 13% Metalhead</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/community"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    JOIN
                  </Link>
                  <Link
                    href="/profile"
                    className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700 px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    PROFILE
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Marketplace */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-gray-800 border-2 border-gray-600 hover:border-orange-600 transition-colors"
            >
              <div className="bg-gray-800 border-b-2 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <FaStore className="text-2xl text-orange-400" />
                  <h3 className="text-lg font-black uppercase tracking-wide">MARKETPLACE</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Trade rare vinyl, CDs, and exclusive NFTs. All transactions secured on Optimism blockchain.
                </p>
                <div className="space-y-2 mb-4">
                  {marketplaceItems.slice(0, 2).map((item, i) => (
                    <div key={i} className="text-xs border-b border-gray-600 pb-2">
                      <div className="text-gray-300 truncate">{item.title}</div>
                      <div className="flex justify-between">
                        <span className="text-orange-400">{item.price}</span>
                        <span className="text-gray-500">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/marketplace"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    BROWSE
                  </Link>
                  <Link
                    href="/marketplace"
                    className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700 px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    SELL
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* News & Chronicles */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-gray-800 border-2 border-gray-600 hover:border-yellow-600 transition-colors"
            >
              <div className="bg-gray-800 border-b-2 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <FaNewspaper className="text-2xl text-yellow-400" />
                  <h3 className="text-lg font-black uppercase tracking-wide">WAR CHRONICLES</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Breaking news from the metal underground. Submit stories and earn reputation tokens for quality content.
                </p>
                <div className="space-y-2 mb-4 text-xs">
                  <div className="border-l-2 border-yellow-600 pl-2">
                    <p className="font-bold text-yellow-400">WEB3 UPDATE</p>
                    <p className="text-gray-500">NFT Forge launches on Optimism</p>
                  </div>
                  <div className="border-l-2 border-red-600 pl-2">
                    <p className="font-bold text-red-600">BAND NEWS</p>
                    <p className="text-gray-500">Darkthrone announces new album</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/news"
                    className="bg-yellow-600 hover:bg-yellow-700 text-black px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    READ
                  </Link>
                  <Link
                    href="/news"
                    className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700 px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    SUBMIT
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* NFT Forge */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-gray-800 border-2 border-gray-600 hover:border-green-600 transition-colors"
            >
              <div className="bg-gray-800 border-b-2 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <GiThorHammer className="text-2xl text-green-400" />
                  <h3 className="text-lg font-black uppercase tracking-wide">NFT FORGE</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Mint exclusive metal NFTs on Optimism. Band logos, rare artwork, and achievement badges for collectors.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-900 border border-gray-600 flex items-center justify-center hover:border-green-500 transition-colors"
                    >
                      <GiDeathSkull className="text-lg text-green-400" />
                    </div>
                  ))}
                </div>
                <div className="bg-gray-900 border border-gray-600 p-2 mb-4 text-center text-xs">
                  <div className="text-green-400 font-bold">Latest Mint</div>
                  <div className="text-gray-300">Bathory Logo #47</div>
                  <div className="text-gray-500">0.08 ETH on Optimism</div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/nft"
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    MINT
                  </Link>
                  <Link
                    href="/nft"
                    className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700 px-3 py-2 text-xs uppercase font-bold tracking-wide transition-colors flex-1 text-center"
                  >
                    GALLERY
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - ZAKTUALIZOWANE */}
      <section className="bg-gray-800 border-y-4 border-gray-600 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="mb-8">
            <GiWolfHead className="text-4xl md:text-6xl text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-4">FORGE YOUR WEB3 LEGACY</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Join the first decentralized metal community on blockchain. Earn crypto for your contributions, 
              build your digital Metal DNA, and be part of the underground revolution.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 border border-gray-600 p-3">
                <FaTrophy className="text-yellow-400 text-xl mx-auto mb-2" />
                <div className="text-xs text-gray-300">EARN CRYPTO</div>
              </div>
              <div className="bg-gray-900 border border-gray-600 p-3">
                <FaHeadphones className="text-blue-400 text-xl mx-auto mb-2" />
                <div className="text-xs text-gray-300">STREAM & PAY</div>
              </div>
              <div className="bg-gray-900 border border-gray-600 p-3">
                <FaStore className="text-orange-400 text-xl mx-auto mb-2" />
                <div className="text-xs text-gray-300">TRADE NFTS</div>
              </div>
              <div className="bg-gray-900 border border-gray-600 p-3">
                <GiThorHammer className="text-green-400 text-xl mx-auto mb-2" />
                <div className="text-xs text-gray-300">MINT & COLLECT</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/profile"
              className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 uppercase font-bold tracking-wide transition-colors inline-block"
            >
              <FaWallet className="inline mr-2" /> CONNECT & EARN
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-gray-500 text-gray-300 hover:bg-gray-700 px-6 md:px-8 py-3 md:py-4 uppercase font-bold tracking-wide transition-colors inline-block"
            >
              LEARN WEB3 METAL
            </Link>
          </div>
        </div>
      </section>

      {/* METAL DNA & BAND INCUBATOR */}
      <section className="py-8 md:py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetalDNA userId="current-user" />
            <BandIncubator />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t-4 border-gray-600 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-2 uppercase">Platform</h4>
              <div className="space-y-1 text-xs text-gray-500">
                <Link href="/bands" className="block hover:text-red-500">
                  Band Database
                </Link>
                <Link href="/player" className="block hover:text-red-500">
                  Demo Vault
                </Link>
                <Link href="/marketplace" className="block hover:text-red-500">
                  Marketplace
                </Link>
                <Link href="/nft" className="block hover:text-red-500">
                  NFT Forge
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-2 uppercase">Community</h4>
              <div className="space-y-1 text-xs text-gray-500">
                <Link href="/community" className="block hover:text-red-500">
                  Join Community
                </Link>
                <Link href="/profile" className="block hover:text-red-500">
                  Rewards Program
                </Link>
                <Link href="/leaderboard" className="block hover:text-red-500">
                  Leaderboard
                </Link>
                <Link href="/badges" className="block hover:text-red-500">
                  Badges & Achievements
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-2 uppercase">For Artists</h4>
              <div className="space-y-1 text-xs text-gray-500">
                <Link href="/profile" className="block hover:text-red-500">
                  Artist Signup
                </Link>
                <Link href="/profile" className="block hover:text-red-500">
                  Upload Demo
                </Link>
                <Link href="/analytics" className="block hover:text-red-500">
                  Analytics
                </Link>
                <Link href="/monetization" className="block hover:text-red-500">
                  Monetization
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-2 uppercase">Web3</h4>
              <div className="space-y-1 text-xs text-gray-500">
                <Link href="/help" className="block hover:text-red-500">
                  Help Center
                </Link>
                <Link href="/api" className="block hover:text-red-500">
                  API Docs
                </Link>
                <Link href="/contact" className="block hover:text-red-500">
                  Contact
                </Link>
                <Link href="/terms" className="block hover:text-red-500">
                  Terms & Privacy
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center border-t border-gray-600 pt-4">
            <div className="flex justify-center gap-6 mb-4">
              <GiDeathSkull className="text-xl text-gray-500" />
              <GiCrossedBones className="text-xl text-gray-500" />
              <GiCoffin className="text-xl text-gray-500" />
              <GiGhost className="text-xl text-gray-500" />
            </div>
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">
              © {new Date().getFullYear()} METAL FORGE • POWERED BY OPTIMISM BLOCKCHAIN
            </p>
            <p className="text-gray-500 text-xs">
              Decentralized • Underground • Web3 Native • For the metal community, by the metal community
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MetalForgeApp
