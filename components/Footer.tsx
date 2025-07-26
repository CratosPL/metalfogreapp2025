"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  GiDragonHead, 
  GiCrossedSwords, 
  GiBlackFlag, 
  GiThorHammer, 
  GiGothicCross, 
  GiSkullCrossedBones, 
  GiBattleAxe, 
  GiVikingHelmet, 
  GiDeathSkull, 
  GiCrossedBones, 
  GiCoffin, 
  GiGhost, 
  GiFlame 
} from "react-icons/gi"
import { 
  FaMusic, 
  FaStore, 
  FaUsers, 
  FaTrophy, 
  FaCrown, 
  FaVolumeUp, 
  FaChartLine, 
  FaEthereum, 
  FaBolt 
} from "react-icons/fa"

interface FooterProps {
  displayStats: {
    bands: number
    demos: number
    users: number
    earnings: number
  }
}

const Footer = ({ displayStats }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-red-600 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-red-600 bg-red-600/20 flex items-center justify-center">
                <GiDragonHead className="text-2xl text-red-500" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase">METAL FORGE</h4>
                <p className="text-xs text-gray-500">Underground • Eternal</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The first Web3 platform built by metalheads, for metalheads. 
              Where underground knowledge becomes valuable.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-red-600 font-bold">{displayStats.bands}</div>
                <div className="text-xs text-gray-500">Bands</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold">{displayStats.users}</div>
                <div className="text-xs text-gray-500">Users</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-bold">{displayStats.earnings}</div>
                <div className="text-xs text-gray-500">ETH</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
              <GiCrossedSwords className="text-red-600" />
              Platform
            </h4>
            <div className="space-y-3">
              <Link href="/bands" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <GiBlackFlag className="text-sm group-hover:text-red-500" />
                Legion Database
              </Link>
              <Link href="/player" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <FaMusic className="text-sm group-hover:text-red-500" />
                Demo Vault
              </Link>
              <Link href="/marketplace" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <FaStore className="text-sm group-hover:text-red-500" />
                Marketplace
              </Link>
              <Link href="/nft" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <GiThorHammer className="text-sm group-hover:text-red-500" />
                NFT Forge
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
              <FaUsers className="text-purple-600" />
              Community
            </h4>
            <div className="space-y-3">
              <Link href="/community" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <GiGothicCross className="text-sm group-hover:text-red-500" />
                Join Brotherhood
              </Link>
              <Link href="/profile" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <FaTrophy className="text-sm group-hover:text-red-500" />
                Rewards Program
              </Link>
              <Link href="/leaderboard" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <FaCrown className="text-sm group-hover:text-red-500" />
                Leaderboard
              </Link>
              <Link href="/badges" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <GiSkullCrossedBones className="text-sm group-hover:text-red-500" />
                Achievements
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
              <GiVikingHelmet className="text-blue-600" />
              For Artists
            </h4>
            <div className="space-y-3">
              <Link href="/artist-signup" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <GiBattleAxe className="text-sm group-hover:text-red-500" />
                Artist Signup
              </Link>
              <Link href="/profile" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <FaVolumeUp className="text-sm group-hover:text-red-500" />
                Upload Demo
              </Link>
              <Link href="/analytics" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <FaChartLine className="text-sm group-hover:text-red-500" />
                Analytics
              </Link>
              <Link href="/monetization" className="block text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group">
                <FaEthereum className="text-sm group-hover:text-red-500" />
                Monetization
              </Link>
            </div>
          </div>
        </div>

        {/* Social Links & Web3 Info */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wide flex items-center gap-2">
                <FaBolt className="text-yellow-400" />
                Web3 Infrastructure
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaEthereum className="text-blue-400" />
                  Built on Optimism Network
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaBolt className="text-yellow-400" />
                  90% Lower Gas Fees
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <GiFlame className="text-red-500" />
                  Instant Payouts
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wide flex items-center gap-2">
                <GiFlame className="text-orange-400" />
                Connect With Us
              </h5>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-gray-400 hover:text-red-500 transition-colors">
                  Discord Community
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-red-500 transition-colors">
                  Twitter/X Updates
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-red-500 transition-colors">
                  Telegram News
                </Link>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wide flex items-center gap-2">
                <GiGothicCross className="text-purple-400" />
                Resources
              </h5>
              <div className="space-y-2 text-sm">
                <Link href="/whitepaper" className="block text-gray-400 hover:text-red-500 transition-colors">
                  Whitepaper
                </Link>
                <Link href="/help" className="block text-gray-400 hover:text-red-500 transition-colors">
                  Help Center
                </Link>
                <Link href="/api" className="block text-gray-400 hover:text-red-500 transition-colors">
                  API Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center border-t border-gray-700 pt-8">
          <div className="flex justify-center gap-8 mb-6">
            <motion.div whileHover={{ scale: 1.2, rotate: 15 }} className="cursor-pointer">
              <GiDeathSkull className="text-3xl text-gray-600 hover:text-red-500 transition-colors duration-300" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: -15 }} className="cursor-pointer">
              <GiCrossedBones className="text-3xl text-gray-600 hover:text-red-500 transition-colors duration-300" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="cursor-pointer">
              <GiCoffin className="text-3xl text-gray-600 hover:text-red-500 transition-colors duration-300" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: -10 }} className="cursor-pointer">
              <GiGhost className="text-3xl text-gray-600 hover:text-red-500 transition-colors duration-300" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 20 }} className="cursor-pointer">
              <GiSkullCrossedBones className="text-3xl text-gray-600 hover:text-red-500 transition-colors duration-300" />
            </motion.div>
          </div>

          <div className="mb-4">
            <p className="text-gray-500 uppercase tracking-wider font-bold text-lg mb-2">
              © {new Date().getFullYear()} METAL FORGE
            </p>
            <p className="text-gray-600 text-sm mb-2">
              <span className="text-red-500">⚡</span> POWERED BY OPTIMISM BLOCKCHAIN <span className="text-red-500">⚡</span>
            </p>
            <p className="text-gray-600 text-lg font-bold tracking-widest">
              🔥 THE UNDERGROUND NEVER DIES • WEB3 METAL REVOLUTION 🔥
            </p>
          </div>

          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-red-500 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-red-500 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-red-500 transition-colors">
              Contact
            </Link>
          </div>

          {/* Final Metal Quote */}
          <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur-sm">
            <p className="text-red-400 font-bold italic text-sm">
              "In the darkness of the underground, we forge the future of metal on blockchain"
            </p>
            <p className="text-gray-500 text-xs mt-1">- Metal Forge Manifesto</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
