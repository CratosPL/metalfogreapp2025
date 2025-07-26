"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  GiWolfHead, 
  GiDragonHead, 
  GiFlame, 
  GiBloodySword 
} from "react-icons/gi"
import { 
  FaTrophy, 
  FaHeadphones, 
  FaStore, 
  FaWallet, 
  FaBolt, 
  FaEthereum 
} from "react-icons/fa"

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-gray-800 via-red-900/20 to-gray-800 border-y-4 border-red-600 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20"></div>
      <div className="absolute top-10 left-10 text-8xl text-red-600/10">
        <GiWolfHead />
      </div>
      <div className="absolute bottom-10 right-10 text-8xl text-red-600/10">
        <GiDragonHead />
      </div>

      <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GiWolfHead className="text-7xl md:text-8xl text-red-600 mx-auto mb-6 filter drop-shadow-2xl" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest mb-6 text-white">
            FORGE YOUR WEB3 LEGACY
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
            Join the first <span className="text-red-400 font-bold">decentralized metal community</span> on blockchain. 
            Earn crypto for your contributions, build your <span className="text-yellow-400 font-bold">digital Metal DNA</span>, 
            and be part of the underground revolution.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900/80 border-2 border-gray-600 hover:border-yellow-600 rounded-lg p-6 backdrop-blur-sm"
            >
              <FaTrophy className="text-yellow-400 text-4xl mx-auto mb-3" />
              <div className="text-sm font-bold text-white uppercase tracking-wide">EARN CRYPTO</div>
              <div className="text-xs text-gray-400 mt-1">For every contribution</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900/80 border-2 border-gray-600 hover:border-blue-600 rounded-lg p-6 backdrop-blur-sm"
            >
              <FaHeadphones className="text-blue-400 text-4xl mx-auto mb-3" />
              <div className="text-sm font-bold text-white uppercase tracking-wide">STREAM & PAY</div>
              <div className="text-xs text-gray-400 mt-1">Instant micropayments</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900/80 border-2 border-gray-600 hover:border-orange-600 rounded-lg p-6 backdrop-blur-sm"
            >
              <FaStore className="text-orange-400 text-4xl mx-auto mb-3" />
              <div className="text-sm font-bold text-white uppercase tracking-wide">TRADE NFTS</div>
              <div className="text-xs text-gray-400 mt-1">Rare collectibles</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900/80 border-2 border-gray-600 hover:border-green-600 rounded-lg p-6 backdrop-blur-sm"
            >
              <GiFlame className="text-green-400 text-4xl mx-auto mb-3" />
              <div className="text-sm font-bold text-white uppercase tracking-wide">MINT & COLLECT</div>
              <div className="text-xs text-gray-400 mt-1">Create immortal art</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            href="/profile"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-5 text-xl font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-red-600/50 rounded-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              <FaWallet className="text-2xl" /> 
              CONNECT & EARN
              <FaBolt className="text-yellow-400 animate-pulse" />
            </span>
          </Link>
          
          <Link
            href="/about"
            className="bg-transparent border-2 border-gray-400 text-gray-300 hover:bg-gray-700 hover:border-white hover:text-white px-12 py-5 text-xl font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <GiBloodySword className="text-2xl" />
              LEARN MANIFESTO
            </span>
          </Link>
        </motion.div>

        <div className="mt-8 text-gray-500 text-lg">
          <p className="flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <GiFlame className="text-red-500" />
              No fees to start
            </span>
            <span className="flex items-center gap-1">
              <FaBolt className="text-yellow-500" />
              Optimism powered
            </span>
            <span className="flex items-center gap-1">
              <FaEthereum className="text-blue-500" />
              Instant payouts
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
