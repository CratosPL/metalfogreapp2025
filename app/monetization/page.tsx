"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaCoins, FaCrown, FaDollarSign, FaWallet, FaMoneyBillWave,
  FaShieldAlt, FaPlus, FaChartLine, FaPercentage, FaHandHoldingUsd,
  FaEthereum, FaBolt, FaTrophy, FaFire, FaCalculator, FaArrowUp
} from 'react-icons/fa';
import { 
  GiThorHammer, GiDeathSkull, GiCrossedSwords, GiDragonHead,
  GiCoffin, GiGhost, GiSkullCrossedBones, GiVikingHelmet,
  GiGothicCross, GiBloodySword, GiBattleAxe, GiFlame,
  GiTreasureMap, GiWolfHead, GiBlackFlag, GiCrown
} from "react-icons/gi";

const revenueSplits = [
  { 
    stream: "Demo Vault Streaming", 
    split: "80% to Artist", 
    icon: FaMoneyBillWave,
    color: "from-blue-600/20 to-blue-800/20",
    borderColor: "border-blue-600",
    description: "Artists earn crypto for every stream instantly via Optimism blockchain"
  },
  { 
    stream: "NFT Forge Minting", 
    split: "85% to Artist", 
    icon: GiThorHammer,
    color: "from-purple-600/20 to-purple-800/20",
    borderColor: "border-purple-600",
    description: "Create and sell unique metal collectibles with automatic royalties"
  },
  { 
    stream: "Marketplace Sales", 
    split: "90% to Seller", 
    icon: FaCoins,
    color: "from-orange-600/20 to-orange-800/20",
    borderColor: "border-orange-600",
    description: "Trade vinyl, CDs, and rare items with escrow protection"
  },
  { 
    stream: "Community Tips", 
    split: "100% to Recipient", 
    icon: FaCrown,
    color: "from-yellow-600/20 to-yellow-800/20",
    borderColor: "border-yellow-600",
    description: "Direct support from fans with zero platform fees"
  }
];

const earningsExamples = [
  { scenario: "Underground Demo", plays: "1,000", earning: "0.8 ETH", usd: "~$2,000", difficulty: "ACHIEVABLE" },
  { scenario: "Popular Track", plays: "10,000", earning: "8.0 ETH", usd: "~$20,000", difficulty: "REALISTIC" },
  { scenario: "Viral Hit", plays: "100,000", earning: "80.0 ETH", usd: "~$200,000", difficulty: "LEGENDARY" }
];

const platformBenefits = [
  {
    title: "Smart Contract Security",
    icon: FaShieldAlt,
    color: "text-green-400",
    features: [
      "Escrow protection for marketplace transactions",
      "Automatic revenue splits via smart contracts", 
      "Transparent, immutable payment records",
      "No chargebacks or payment disputes"
    ]
  },
  {
    title: "Micropayments Revolution",
    icon: FaBolt,
    color: "text-yellow-400",
    features: [
      "Stream-to-Earn powered by Optimism",
      "Instant payments to artist wallets",
      "Ultra-low gas fees (typically $0.01-0.05)",
      "Support artists with one-click tips"
    ]
  },
  {
    title: "NFT Monetization",
    icon: GiThorHammer,
    color: "text-purple-400", 
    features: [
      "Mint exclusive band merchandise as NFTs",
      "Concert tickets, album art, rare demos",
      "Perpetual royalties on secondary sales",
      "Utility-based NFTs with real benefits"
    ]
  },
  {
    title: "Community Support",
    icon: GiCrown,
    color: "text-orange-400",
    features: [
      "100% of tips go directly to recipients",
      "Fan funding for new releases",
      "Community-driven band incubator",
      "Governance tokens for active supporters"
    ]
  }
];

export default function MonetizationPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({
    streams: 1000,
    pricePerStream: 0.001
  });

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const calculateEarnings = () => {
    const totalEarnings = calculatorValues.streams * calculatorValues.pricePerStream;
    const artistShare = totalEarnings * 0.8;
    const usdValue = artistShare * 2400; // ETH price assumption
    
    return {
      total: totalEarnings.toFixed(3),
      artist: artistShare.toFixed(3),
      usd: usdValue.toLocaleString()
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter overflow-x-hidden">
      
      {/* Enhanced Background Runes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-300 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>ᚦ</div>
        <div className="animate-pulse text-5xl text-blue-300 absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>ᚱ</div>
        <div className="animate-pulse text-4xl text-yellow-300 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>ᚠ</div>
        <div className="animate-pulse text-5xl text-purple-300 absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '9s', animationDelay: '6s' }}>ᚹ</div>
      </div>

      {/* ENHANCED HEADER */}
      <header className="bg-gradient-to-b from-gray-800 to-gray-900 border-b-4 border-red-600 p-8 relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className={`relative transition-all duration-300 ${glitchActive ? 'filter brightness-125 saturate-150' : ''}`}>
              <FaDollarSign className="text-6xl md:text-7xl text-yellow-500 drop-shadow-2xl" />
              {glitchActive && (
                <FaDollarSign className="absolute top-0 left-0 text-6xl md:text-7xl text-yellow-400 animate-ping opacity-30" />
              )}
            </div>
            <div>
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest text-white mb-2 ${glitchActive ? 'animate-pulse text-yellow-100' : ''}`}
                style={{
                  textShadow: glitchActive 
                    ? '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.5)' 
                    : '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(251, 191, 36, 0.3)'
                }}
              >
                MONETIZATION
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-gray-400 text-xl uppercase tracking-wide flex items-center gap-2">
                  <GiSkullCrossedBones className="text-yellow-500" />
                  Artist-First Economics • Fair Revenue Splits
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold border border-yellow-600/50">
                    80-90% Artist Share
                  </span>
                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-600/50 flex items-center gap-1">
                    <FaEthereum className="text-xs" />
                    Crypto Payments
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-2 border-yellow-600/50 rounded-xl p-6 backdrop-blur-sm shadow-lg"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              Metal Forge is built on <span className="text-yellow-400 font-bold">artist-first economics</span>. 
              80-90% of revenue goes directly to creators and sellers. All financial logic runs on 
              <span className="text-blue-400 font-bold"> Optimism blockchain</span> – fast, cheap, transparent.
              No middlemen, no delays, just pure underground support.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        
        {/* ENHANCED REVENUE SPLITS */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-white flex items-center justify-center gap-3">
              <FaPercentage className="text-green-500" />
              REVENUE DISTRIBUTION
              <GiTreasureMap className="text-green-500" />
            </h2>
            <p className="text-xl text-gray-400">
              Transparent, fair splits that put artists first
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {revenueSplits.map((item, index) => (
              <motion.div
                key={item.stream}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${item.borderColor} hover:border-opacity-100 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl group`}
              >
                <div className={`bg-gradient-to-r ${item.color} border-b-2 ${item.borderColor} p-6`}>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <item.icon className="text-4xl text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-wide text-white">{item.stream}</h3>
                      <p className="text-2xl font-black text-green-400">{item.split}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <FaShieldAlt className="text-green-400" />
                    <span className="text-sm text-green-400 font-bold">Blockchain Secured</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ENHANCED EARNINGS CALCULATOR */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-white flex items-center justify-center gap-3">
              <FaCalculator className="text-blue-500" />
              EARNINGS CALCULATOR
              <FaChartLine className="text-blue-500" />
            </h2>
            <p className="text-xl text-gray-400">
              See your potential earnings in the underground economy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Interactive Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-600 rounded-xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <FaCalculator className="text-blue-400" />
                INTERACTIVE CALCULATOR
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">Number of Streams</label>
                  <input
                    type="number"
                    value={calculatorValues.streams}
                    onChange={(e) => setCalculatorValues({...calculatorValues, streams: parseInt(e.target.value) || 0})}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none transition-all duration-300"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">Price per Stream (ETH)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={calculatorValues.pricePerStream}
                    onChange={(e) => setCalculatorValues({...calculatorValues, pricePerStream: parseFloat(e.target.value) || 0})}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none transition-all duration-300"
                  />
                </div>

                <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 border-2 border-green-600/50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-green-400 mb-4">YOUR EARNINGS</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Revenue:</span>
                      <span className="text-white font-bold">{calculateEarnings().total} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Artist Share (80%):</span>
                      <span className="text-green-400 font-bold text-xl">{calculateEarnings().artist} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">USD Value:</span>
                      <span className="text-yellow-400 font-bold">${calculateEarnings().usd}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Earnings Examples */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-600 rounded-xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <FaTrophy className="text-green-400" />
                SUCCESS EXAMPLES
              </h3>
              
              <p className="text-gray-400 mb-6">
                Based on 0.001 ETH per stream (artist receives 80%):
              </p>
              
              <div className="space-y-4">
                {earningsExamples.map((example, index) => (
                  <motion.div
                    key={example.scenario}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-gray-900/50 border-2 border-gray-700 hover:border-green-600 rounded-lg p-4 transition-all duration-300 ${
                      example.difficulty === 'LEGENDARY' ? 'hover:border-yellow-600' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-white">{example.scenario}</h4>
                        <p className="text-sm text-gray-400">{example.plays} streams</p>
                      </div>
                      <div className={`text-xs font-bold px-2 py-1 rounded ${
                        example.difficulty === 'ACHIEVABLE' ? 'bg-green-600/20 text-green-400' :
                        example.difficulty === 'REALISTIC' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {example.difficulty}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-bold text-lg">{example.earning}</span>
                      <span className="text-yellow-400">{example.usd}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ENHANCED HOW IT WORKS */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-white flex items-center justify-center gap-3">
              <GiCrossedSwords className="text-red-500" />
              HOW IT WORKS
              <GiBattleAxe className="text-red-500" />
            </h2>
            <p className="text-xl text-gray-400">
              Built on blockchain technology for transparency and fairness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platformBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-red-600 transition-all duration-300 rounded-xl p-8 shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <benefit.icon className={`text-4xl ${benefit.color}`} />
                  <h3 className="text-xl font-black text-white uppercase tracking-wide">
                    {benefit.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {benefit.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <GiFlame className="text-red-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ENHANCED PLATFORM ECONOMICS */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-white flex items-center justify-center gap-3">
              <FaWallet className="text-purple-500" />
              PLATFORM ECONOMICS
              <GiGothicCross className="text-purple-500" />
            </h2>
            <p className="text-xl text-gray-400">
              Complete transparency in how we operate and distribute funds
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-600 rounded-xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-green-400 mb-6 uppercase flex items-center gap-2">
                <FaArrowUp />
                REVENUE SOURCES
              </h3>
              <div className="space-y-4">
                {[
                  { source: "20% from streaming micropayments", percent: 20 },
                  { source: "15% from NFT minting fees", percent: 15 },
                  { source: "10% from marketplace transactions", percent: 10 },
                  { source: "0% from community tips", percent: 0 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${item.percent * 4}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-300 text-sm whitespace-nowrap">{item.source}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-600 rounded-xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-blue-400 mb-6 uppercase flex items-center gap-2">
                <FaHandHoldingUsd />
                FUND ALLOCATION
              </h3>
              <div className="space-y-4">
                {[
                  { allocation: "40% Platform development", percent: 40, color: "from-blue-500 to-blue-600" },
                  { allocation: "30% Community rewards", percent: 30, color: "from-purple-500 to-purple-600" },
                  { allocation: "20% Infrastructure costs", percent: 20, color: "from-orange-500 to-orange-600" },
                  { allocation: "10% Team compensation", percent: 10, color: "from-green-500 to-green-600" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000`}
                        style={{ width: `${item.percent * 2.5}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-300 text-sm whitespace-nowrap">{item.allocation}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ENHANCED CALL TO ACTION */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-red-600 rounded-xl p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20"></div>
            
            <div className="relative z-10">
              <GiDragonHead className="text-8xl text-red-500 mx-auto mb-8 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-6 text-white">
                Ready to Start Earning?
              </h2>
              <p className="text-gray-300 mb-12 max-w-3xl mx-auto text-xl leading-relaxed">
                Join thousands of underground artists already earning crypto on Metal Forge. 
                Upload your first demo and start getting paid for every stream instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/player/upload"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 text-lg font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-red-600/50 rounded-lg relative overflow-hidden group flex items-center justify-center gap-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    <FaPlus /> UPLOAD DEMO
                  </span>
                </Link>
                
                <Link
                  href="/artists/signup"
                  className="bg-transparent border-2 border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-white hover:text-white px-10 py-5 text-lg font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg flex items-center justify-center gap-3"
                >
                  <GiDeathSkull /> ARTIST ACCOUNT
                </Link>
                
                <Link
                  href="/help"
                  className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black px-10 py-5 text-lg font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg shadow-lg"
                >
                  LEARN MORE
                </Link>
              </div>

              <div className="mt-8 text-gray-500 text-lg">
                <p className="flex items-center justify-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <GiFlame className="text-red-500" />
                    No upfront costs
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBolt className="text-yellow-500" />
                    Instant payouts
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEthereum className="text-blue-500" />
                    Optimism blockchain
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* ENHANCED FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-red-600 p-8 mt-16 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            {[GiDeathSkull, GiCoffin, GiGhost, GiSkullCrossedBones, GiTreasureMap].map((Icon, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.2, rotate: 15 }} 
                className="cursor-pointer"
              >
                <Icon className="text-4xl text-gray-600 hover:text-yellow-500 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
          <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
            METAL FORGE MONETIZATION
          </h3>
          <p className="text-gray-400 uppercase tracking-wider mb-4">
            Artist-First Economics • Fair Revenue Splits • Crypto Payments
          </p>
          <p className="text-gray-600">
            Fair revenue splits • Instant crypto payments • Underground support
          </p>
          <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-500">
            <FaEthereum className="text-blue-400" />
            <span>Powered by Optimism Blockchain</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
