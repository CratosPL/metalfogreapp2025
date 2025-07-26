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
  FaPlay 
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
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-12 border-b-4 border-red-600 relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl text-red-600">
          <GiSkullCrossedBones />
        </div>
        <div className="absolute top-20 right-20 text-5xl text-blue-600">
          <GiVikingHelmet />
        </div>
        <div className="absolute bottom-20 left-20 text-4xl text-purple-600">
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
            className="bg-gray-800/80 border-2 border-red-600/50 rounded-lg p-8 shadow-2xl backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
              <GiCrossedBones className="text-red-600 text-4xl" /> 
              Web3 Underground Manifesto
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Metal Forge is the first <span className="text-red-400 font-bold">decentralized platform</span> built 
              for the extreme metal underground. Where every contribution earns <span className="text-green-400 font-bold">crypto rewards</span>, 
              every stream pays artists <span className="text-blue-400 font-bold">instantly</span>, and your metal knowledge 
              becomes <span className="text-yellow-400 font-bold">valuable digital assets</span> on the Optimism blockchain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-green-400">
                  <FaTrophy className="text-xl flex-shrink-0" />
                  <span className="text-sm">Earn crypto rewards for adding bands</span>
                </div>
                <div className="flex items-center gap-3 text-blue-400">
                  <FaVolumeUp className="text-xl flex-shrink-0" />
                  <span className="text-sm">Stream demos with instant micropayments</span>
                </div>
                <div className="flex items-center gap-3 text-purple-400">
                  <GiCrossedSwords className="text-xl flex-shrink-0" />
                  <span className="text-sm">Mint exclusive NFTs and build legacy</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-yellow-400">
                  <FaChartLine className="text-xl flex-shrink-0" />
                  <span className="text-sm">Develop Metal DNA profile</span>
                </div>
                <div className="flex items-center gap-3 text-orange-400">
                  <FaStore className="text-xl flex-shrink-0" />
                  <span className="text-sm">Trade rare collectibles marketplace</span>
                </div>
                <div className="flex items-center gap-3 text-cyan-400">
                  <FaBolt className="text-xl flex-shrink-0" />
                  <span className="text-sm">Optimism blockchain - low fees</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-600/20 to-red-800/20 border-2 border-red-600 rounded-lg p-6 text-center shadow-lg backdrop-blur-sm"
          >
            <GiCrossedSwords className="text-4xl text-red-600 mx-auto mb-3" />
            <div className="text-3xl font-black text-white mb-2">{displayStats.bands.toLocaleString()}</div>
            <div className="text-sm uppercase text-gray-400 font-bold tracking-wide">Metal Legions</div>
            <div className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
              <FaArrowUp /> +47 today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-2 border-blue-600 rounded-lg p-6 text-center shadow-lg backdrop-blur-sm"
          >
            <FaMusic className="text-4xl text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white mb-2">{displayStats.demos.toLocaleString()}</div>
            <div className="text-sm uppercase text-gray-400 font-bold tracking-wide">Underground Demos</div>
            <div className="text-xs text-blue-400 mt-2 flex items-center justify-center gap-1">
              <FaPlay /> 234 played today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-2 border-green-600 rounded-lg p-6 text-center shadow-lg backdrop-blur-sm"
          >
            <FaUsers className="text-4xl text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white mb-2">{displayStats.users.toLocaleString()}</div>
            <div className="text-sm uppercase text-gray-400 font-bold tracking-wide">Active Metalheads</div>
            <div className="text-xs text-green-400 mt-2 flex items-center justify-center gap-1">
              <FaUsers /> +89 joined today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-2 border-yellow-600 rounded-lg p-6 text-center shadow-lg backdrop-blur-sm"
          >
            <FaEthereum className="text-4xl text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white mb-2">{displayStats.earnings}</div>
            <div className="text-sm uppercase text-gray-400 font-bold tracking-wide">ETH Distributed</div>
            <div className="text-xs text-yellow-400 mt-2">
              ≈ ${(displayStats.earnings * 2400).toLocaleString()} USD
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ManifestoStats
