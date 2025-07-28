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
  FaBolt,
  FaSkullCrossbones
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
    <footer 
      className="bg-black border-t-4 border-red-800 py-12 relative zine-footer"
      style={{
        backgroundImage: "url('/images/zine/black_paper_texture.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.98)"
      }}
    >
      {/* Black paper texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Section - czarno-czerwona */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-none border-2 border-red-800 bg-red-800 flex items-center justify-center">
                <FaSkullCrossbones className="text-2xl text-black" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white uppercase font-zine-title">METAL FORGE</h4>
                <p className="text-xs text-red-800 font-zine-body">Underground • Eternal</p>
              </div>
            </div>
            <p className="text-[#e0e0e0] text-sm mb-4 font-zine-body">
              The first Web3 platform built by metalheads, for metalheads. 
              Where underground knowledge becomes valuable.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-red-800 font-bold font-zine-title">{displayStats.bands}</div>
                <div className="text-xs text-[#b0b0b0] font-zine-body">Bands</div>
              </div>
              <div className="text-center">
                <div className="text-red-800 font-bold font-zine-title">{displayStats.users}</div>
                <div className="text-xs text-[#b0b0b0] font-zine-body">Users</div>
              </div>
              <div className="text-center">
                <div className="text-red-800 font-bold font-zine-title">{displayStats.earnings}</div>
                <div className="text-xs text-[#b0b0b0] font-zine-body">ETH</div>
              </div>
            </div>
          </div>

          {/* Platform Section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2 font-zine-title">
              <GiCrossedSwords className="text-red-800" />
              Platform
            </h4>
            <div className="space-y-3">
              <Link href="/bands" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <GiBlackFlag className="text-sm group-hover:text-red-800" />
                Legion Database
              </Link>
              <Link href="/player" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <FaMusic className="text-sm group-hover:text-red-800" />
                Demo Vault
              </Link>
              <Link href="/marketplace" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <FaStore className="text-sm group-hover:text-red-800" />
                Marketplace
              </Link>
              <Link href="/nft" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <GiThorHammer className="text-sm group-hover:text-red-800" />
                NFT Forge
              </Link>
            </div>
          </div>

          {/* Community Section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2 font-zine-title">
              <FaUsers className="text-red-800" />
              Community
            </h4>
            <div className="space-y-3">
              <Link href="/community" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <GiGothicCross className="text-sm group-hover:text-red-800" />
                Join Brotherhood
              </Link>
              <Link href="/profile" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <FaTrophy className="text-sm group-hover:text-red-800" />
                Rewards Program
              </Link>
              <Link href="/leaderboard" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <FaCrown className="text-sm group-hover:text-red-800" />
                Leaderboard
              </Link>
              <Link href="/badges" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <FaSkullCrossbones className="text-sm group-hover:text-red-800" />
                Achievements
              </Link>
            </div>
          </div>

          {/* Artists Section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2 font-zine-title">
              <GiVikingHelmet className="text-red-800" />
              For Artists
            </h4>
            <div className="space-y-3">
              <Link href="/artist-signup" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <GiBattleAxe className="text-sm group-hover:text-red-800" />
                Artist Signup
              </Link>
              <Link href="/profile" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <FaVolumeUp className="text-sm group-hover:text-red-800" />
                Upload Demo
              </Link>
              <Link href="/analytics" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <FaChartLine className="text-sm group-hover:text-red-800" />
                Analytics
              </Link>
              <Link href="/monetization" className="block text-[#e0e0e0] hover:text-red-800 transition-colors duration-300 flex items-center gap-2 group font-zine-body">
                <FaEthereum className="text-sm group-hover:text-red-800" />
                Monetization
              </Link>
            </div>
          </div>
        </div>

        {/* Social Links & Web3 Info - czarno-czerwone */}
        <div className="border-t-2 border-red-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wide flex items-center gap-2 font-zine-title">
                <FaBolt className="text-red-800" />
                Web3 Infrastructure
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#e0e0e0] font-zine-body">
                  <FaEthereum className="text-red-800" />
                  Built on Optimism Network
                </div>
                <div className="flex items-center gap-2 text-[#e0e0e0] font-zine-body">
                  <FaBolt className="text-red-800" />
                  90% Lower Gas Fees
                </div>
                <div className="flex items-center gap-2 text-[#e0e0e0] font-zine-body">
                  <GiFlame className="text-red-800" />
                  Instant Payouts
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wide flex items-center gap-2 font-zine-title">
                <GiFlame className="text-red-800" />
                Connect With Us
              </h5>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-[#e0e0e0] hover:text-red-800 transition-colors font-zine-body">
                  Discord Community
                </Link>
                <Link href="#" className="block text-[#e0e0e0] hover:text-red-800 transition-colors font-zine-body">
                  Twitter/X Updates
                </Link>
                <Link href="#" className="block text-[#e0e0e0] hover:text-red-800 transition-colors font-zine-body">
                  Telegram News
                </Link>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wide flex items-center gap-2 font-zine-title">
                <GiGothicCross className="text-red-800" />
                Resources
              </h5>
              <div className="space-y-2 text-sm">
                <Link href="/whitepaper" className="block text-[#e0e0e0] hover:text-red-800 transition-colors font-zine-body">
                  Whitepaper
                </Link>
                <Link href="/help" className="block text-[#e0e0e0] hover:text-red-800 transition-colors font-zine-body">
                  Help Center
                </Link>
                <Link href="/api" className="block text-[#e0e0e0] hover:text-red-800 transition-colors font-zine-body">
                  API Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - czarno-czerwony */}
        <div className="text-center border-t-2 border-red-800 pt-8">
          <div className="flex justify-center gap-8 mb-6">
            <motion.div whileHover={{ scale: 1.2, rotate: 15 }} className="cursor-pointer">
              <GiDeathSkull className="text-3xl text-[#b0b0b0] hover:text-red-800 transition-colors duration-300" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: -15 }} className="cursor-pointer">
              <GiCrossedBones className="text-3xl text-[#b0b0b0] hover:text-red-800 transition-colors duration-300" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="cursor-pointer">
              <GiCoffin className="text-3xl text-[#b0b0b0] hover:text-red-800 transition-colors duration-300" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: -10 }} className="cursor-pointer">
              <GiGhost className="text-3xl text-[#b0b0b0] hover:text-red-800 transition-colors duration-300" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 20 }} className="cursor-pointer">
              <FaSkullCrossbones className="text-3xl text-[#b0b0b0] hover:text-red-800 transition-colors duration-300" />
            </motion.div>
          </div>

          <div className="mb-4">
            <p className="text-white uppercase tracking-wider font-bold text-lg mb-2 font-zine-title">
              © {new Date().getFullYear()} METAL FORGE
            </p>
            <p className="text-[#e0e0e0] text-sm mb-2 font-zine-body">
              <span className="text-red-800">⚡</span> POWERED BY OPTIMISM BLOCKCHAIN <span className="text-red-800">⚡</span>
            </p>
            <p className="text-[#e0e0e0] text-lg font-bold tracking-widest font-zine-body">
              🔥 THE UNDERGROUND NEVER DIES • WEB3 METAL REVOLUTION 🔥
            </p>
          </div>

          <div className="flex justify-center gap-6 text-xs text-[#b0b0b0] font-zine-body">
            <Link href="/terms" className="hover:text-red-800 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-red-800 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-red-800 transition-colors">
              Contact
            </Link>
          </div>

          {/* Final Metal Quote - czarny box z czerwonymi akcentami */}
          <div className="mt-8 p-4 bg-[#0a0a0a] border-2 border-red-800 rounded-none backdrop-blur-sm zine-card">
            <p className="text-red-800 font-bold italic text-sm font-zine-body">
              "In the darkness of the underground, we forge the future of metal on blockchain"
            </p>
            <p className="text-[#b0b0b0] text-xs mt-1 font-zine-body">- Metal Forge Manifesto</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .zine-footer {
          border-image: url("/images/zine/jagged_border.png") 30 round;
        }
        
        .zine-card {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
    </footer>
  )
}

export default Footer
