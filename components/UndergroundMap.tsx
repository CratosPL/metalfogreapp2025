"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GiTreasureMap } from "react-icons/gi"
import { undergroundMap } from "./data/mockData"

const UndergroundMap = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 border-y-4 border-red-600 py-12 relative">
      <div className="absolute inset-0 opacity-5">
        <GiTreasureMap className="text-9xl text-red-600 absolute top-10 left-1/2 transform -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-white flex items-center justify-center gap-3">
            <GiTreasureMap className="text-red-600 text-5xl" /> 
            UNDERGROUND MAP
          </h2>
          <p className="text-xl text-gray-400">
            Explore the global metal strongholds and their legendary scenes
          </p>
        </motion.div>

        <div className="bg-gray-800/50 border-2 border-gray-600 rounded-xl p-8 backdrop-blur-sm shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {undergroundMap.map((region, i) => (
              <motion.div
                key={region.country}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gray-900/80 border-2 border-gray-600 hover:border-red-600 rounded-lg p-6 text-center transition-all duration-300 cursor-pointer group`}
              >
                <div className={`text-2xl font-black mb-2 ${region.color}`}>
                  {region.country}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {region.bands.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  {region.genre}
                </div>
                <div className={`text-xs font-bold px-3 py-1 rounded-full border ${region.color.replace('text', 'border')} ${region.color.replace('text', 'bg')}/20`}>
                  {region.influence}
                </div>
                
                {/* Hover effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-xs text-gray-500">Click to explore scene</div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/map"
            className="inline-block mt-8 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg shadow-lg"
          >
            <GiTreasureMap className="inline mr-2" />
            EXPLORE FULL MAP
          </Link>
        </div>
      </div>
    </section>
  )
}

export default UndergroundMap
