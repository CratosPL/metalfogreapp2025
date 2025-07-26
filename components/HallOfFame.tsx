"use client"

import { motion } from "framer-motion"
import { GiCrown } from "react-icons/gi"
import { hallOfFame } from "./data/mockData"

const HallOfFame = () => {
  return (
    <section className="bg-gradient-to-b from-gray-800 to-gray-900 border-y-4 border-red-600 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4 text-white flex items-center justify-center gap-4">
            <GiCrown className="text-yellow-400" />
            HALL OF FAME
            <GiCrown className="text-yellow-400" />
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The immortal legends who shaped the underground forever
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {hallOfFame.map((legend, i) => (
            <motion.div
              key={legend.name}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group cursor-pointer"
            >
              <div className="relative w-full aspect-square border-4 border-gray-600 bg-gray-900 overflow-hidden rounded-lg shadow-2xl group-hover:border-red-600 transition-all duration-300">
                <img
                  src={legend.img}
                  alt={legend.name}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-110 transition-all duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <div className="text-white font-black text-sm md:text-base uppercase tracking-wide mb-1">
                    {legend.name}
                  </div>
                  <div className="text-xs text-gray-300 mb-2">
                    {legend.status} • {legend.country}
                  </div>
                  <div className="text-xs text-yellow-400 font-bold">
                    {legend.influence} INFLUENCE
                  </div>
                </div>
                
                {/* KVLT Badge */}
                <div className="absolute top-2 right-2 transform rotate-12 opacity-80 group-hover:opacity-100 group-hover:rotate-6 transition-all duration-300">
                  <div className="border-2 border-red-600 bg-black/80 rounded-full px-2 py-1 text-xs font-black text-red-600">
                    KVLT
                  </div>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HallOfFame
