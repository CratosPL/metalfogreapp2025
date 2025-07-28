"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { 
  GiCrossedBones, 
  GiCrossedSwords, 
  GiSkullCrossedBones, 
  GiVikingHelmet, 
  GiGothicCross 
} from "react-icons/gi"
import { 
  FaTrophy, 
  FaVolumeUp, 
  FaChartLine, 
  FaStore, 
  FaBolt, 
  FaMusic, 
  FaUsers, 
  FaEthereum, 
  FaArrowUp, 
  FaPlay,
  FaSkullCrossbones
} from "react-icons/fa"
import { stats } from "./data/mockData"

interface ManifestoStatsProps {
  displayStats: {
    bands: number
    demos: number
    users: number
    earnings: number
  }
  setDisplayStats: (stats: any) => void
}

const ManifestoStats = ({ displayStats, setDisplayStats }: ManifestoStatsProps) => {
  useEffect(() => {
    const targets = { 
      bands: stats.bands, 
      demos: stats.demos, 
      users: stats.users, 
      earnings: stats.earnings 
    }
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
        earnings: Math.floor(targets.earnings * progress * 10) / 10,
      })
      if (step >= steps) clearInterval(interval)
    }, duration / steps)

    return () => clearInterval(interval)
  }, [setDisplayStats])

  return (
    <section 
      className="bg-[#f5f5e8] py-12 border-b-4 border-black relative zine-section"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* Decorative skulls w stylu Zine */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-red-800">
          <FaSkullCrossbones />
        </div>
        <div className="absolute top-20 right-20 text-5xl text-black">
          <GiVikingHelmet />
        </div>
        <div className="absolute bottom-20 left-20 text-4xl text-red-800">
          <GiGothicCross />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#f5f5e8] border-4 border-black rounded-none p-8 shadow-metal backdrop-blur-sm zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3 font-zine-title text-black">
              <FaSkullCrossbones className="text-red-800 text-4xl skull-icon" /> 
              Web3 Underground Manifesto
            </h2>
            
            <p className="text-black text-lg leading-relaxed mb-6 font-zine-body">
              Metal Forge is the first <span className="text-red-800 font-bold">decentralized platform</span> built 
              for the extreme metal underground. Where every contribution earns <span className="text-red-800 font-bold">crypto rewards</span>, 
              every stream pays artists <span className="text-red-800 font-bold">instantly</span>, and your metal knowledge 
              becomes <span className="text-red-800 font-bold">valuable digital assets</span> on the Optimism blockchain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-red-800">
                  <FaTrophy className="text-xl flex-shrink-0" />
                  <span className="text-sm font-zine-body text-black">Earn crypto rewards for adding bands</span>
                </div>
                <div className="flex items-center gap-3 text-red-800">
                  <FaVolumeUp className="text-xl flex-shrink-0" />
                  <span className="text-sm font-zine-body text-black">Stream demos with instant micropayments</span>
                </div>
                <div className="flex items-center gap-3 text-red-800">
                  <GiCrossedSwords className="text-xl flex-shrink-0" />
                  <span className="text-sm font-zine-body text-black">Mint exclusive NFTs and build legacy</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-red-800">
                  <FaChartLine className="text-xl flex-shrink-0" />
                  <span className="text-sm font-zine-body text-black">Develop Metal DNA profile</span>
                </div>
                <div className="flex items-center gap-3 text-red-800">
                  <FaStore className="text-xl flex-shrink-0" />
                  <span className="text-sm font-zine-body text-black">Trade rare collectibles marketplace</span>
                </div>
                <div className="flex items-center gap-3 text-red-800">
                  <FaBolt className="text-xl flex-shrink-0" />
                  <span className="text-sm font-zine-body text-black">Optimism blockchain - low fees</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards w stylu Zine */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#f5f5e8] border-4 border-black rounded-none p-6 text-center shadow-metal backdrop-blur-sm zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <GiCrossedSwords className="text-4xl text-red-800 mx-auto mb-3 skull-icon" />
            <div className="text-3xl font-bold text-black mb-2 font-zine-title">{displayStats.bands.toLocaleString()}</div>
            <div className="text-sm uppercase text-black font-bold tracking-wide font-zine-body">Metal Legions</div>
            <div className="text-xs text-red-800 mt-2 flex items-center justify-center gap-1 font-zine-body">
              <FaArrowUp /> +47 today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#f5f5e8] border-4 border-black rounded-none p-6 text-center shadow-metal backdrop-blur-sm zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <FaMusic className="text-4xl text-red-800 mx-auto mb-3 skull-icon" />
            <div className="text-3xl font-bold text-black mb-2 font-zine-title">{displayStats.demos.toLocaleString()}</div>
            <div className="text-sm uppercase text-black font-bold tracking-wide font-zine-body">Underground Demos</div>
            <div className="text-xs text-red-800 mt-2 flex items-center justify-center gap-1 font-zine-body">
              <FaPlay /> 234 played today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#f5f5e8] border-4 border-black rounded-none p-6 text-center shadow-metal backdrop-blur-sm zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <FaUsers className="text-4xl text-red-800 mx-auto mb-3 skull-icon" />
            <div className="text-3xl font-bold text-black mb-2 font-zine-title">{displayStats.users.toLocaleString()}</div>
            <div className="text-sm uppercase text-black font-bold tracking-wide font-zine-body">Active Metalheads</div>
            <div className="text-xs text-red-800 mt-2 flex items-center justify-center gap-1 font-zine-body">
              <FaUsers /> +89 joined today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#f5f5e8] border-4 border-black rounded-none p-6 text-center shadow-metal backdrop-blur-sm zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <FaEthereum className="text-4xl text-red-800 mx-auto mb-3 skull-icon" />
            <div className="text-3xl font-bold text-black mb-2 font-zine-title">{displayStats.earnings}</div>
            <div className="text-sm uppercase text-black font-bold tracking-wide font-zine-body">ETH Distributed</div>
            <div className="text-xs text-red-800 mt-2 font-zine-body">
              ≈ ${(displayStats.earnings * 2400).toLocaleString()} USD
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

export default ManifestoStats
