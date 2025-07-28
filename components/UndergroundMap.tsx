"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaSkullCrossbones } from "react-icons/fa"
import { GiTreasureMap } from "react-icons/gi"
import { undergroundMap } from "./data/mockData"

const UndergroundMap = () => {
  return (
    <section 
      className="bg-[#f5f5e8] border-y-4 border-black py-12 relative zine-section"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* Decorative map background */}
      <div className="absolute inset-0 opacity-10">
        <FaSkullCrossbones className="text-9xl text-red-800 absolute top-10 left-1/2 transform -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-4xl font-bold uppercase tracking-widest mb-4 text-black flex items-center justify-center gap-3 font-zine-title">
            <FaSkullCrossbones className="text-red-800 text-5xl skull-icon" /> 
            UNDERGROUND MAP
          </h2>
          <p className="text-xl text-black font-zine-body">
            Explore the global metal strongholds and their legendary scenes
          </p>
        </motion.div>

        <div 
          className="bg-[#f5f5e8] border-4 border-black rounded-none p-8 backdrop-blur-sm shadow-metal zine-card"
          style={{
            backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(245, 245, 232, 0.9)"
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {undergroundMap.map((region, i) => (
              <motion.div
                key={region.country}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#f5f5e8] border-2 border-black hover:border-red-800 rounded-none p-6 text-center transition-all duration-300 cursor-pointer group zine-card"
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.95)"
                }}
              >
                <div className="text-2xl font-bold mb-2 text-red-800 font-zine-title">
                  {region.country}
                </div>
                <div className="text-3xl font-bold text-black mb-2 font-zine-title">
                  {region.bands.toLocaleString()}
                </div>
                <div className="text-sm text-black mb-2 font-zine-body uppercase tracking-wide">
                  {region.genre}
                </div>
                <div className="text-xs font-bold px-3 py-1 rounded-none border-2 border-red-800 bg-red-800 text-white font-zine-body uppercase tracking-widest">
                  {region.influence}
                </div>
                
                {/* Hover effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-xs text-black font-zine-body">Click to explore scene</div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/map"
            className="inline-block mt-8 skull-button text-[#d0d0d0] px-8 py-3 font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-none shadow-metal font-zine-body"
          >
            <GiTreasureMap className="inline mr-2" />
            EXPLORE FULL MAP
          </Link>
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
        
        .skull-button {
          background: linear-gradient(to right, #b71c1c, #000000);
          border: 2px solid #ff0000;
          box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
        }

        .skull-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 0, 0, 0.5);
          filter: brightness(1.2);
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

export default UndergroundMap
