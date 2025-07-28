"use client"

import { motion } from "framer-motion"
import { FaSkullCrossbones } from "react-icons/fa"
import { GiCrown } from "react-icons/gi"
import { hallOfFame } from "./data/mockData"

const HallOfFame = () => {
  return (
    <section 
      className="bg-[#f5f5e8] border-y-4 border-black py-12 relative overflow-hidden zine-section"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f0f0e0] via-transparent to-[#f0f0e0] opacity-30"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-4 text-black flex items-center justify-center gap-4 font-zine-title">
            <FaSkullCrossbones className="text-red-800 skull-icon" />
            HALL OF FAME
            <FaSkullCrossbones className="text-red-800 skull-icon" />
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto font-zine-body">
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
              <div className="relative w-full aspect-square border-4 border-black bg-[#f5f5e8] overflow-hidden rounded-none shadow-metal group-hover:border-red-800 transition-all duration-300 zine-card">
                <img
                  src={legend.img}
                  alt={legend.name}
                  className="w-full h-full object-cover grayscale contrast-200 brightness-75 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-110 transition-all duration-500"
                />
                
                {/* Overlay w stylu Zine */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <div className="text-white font-bold text-sm md:text-base uppercase tracking-wide mb-1 font-zine-title">
                    {legend.name}
                  </div>
                  <div className="text-xs text-gray-300 mb-2 font-zine-body">
                    {legend.status} • {legend.country}
                  </div>
                  <div className="text-xs text-red-400 font-bold font-zine-body">
                    {legend.influence} INFLUENCE
                  </div>
                </div>
                
                {/* KVLT Badge w stylu Zine */}
                <div className="absolute top-2 right-2 transform rotate-12 opacity-80 group-hover:opacity-100 group-hover:rotate-6 transition-all duration-300">
                  <div className="border-2 border-red-800 bg-[#f5f5e8] rounded-none px-2 py-1 text-xs font-bold text-red-800 font-zine-body uppercase tracking-wide">
                    KVLT
                  </div>
                </div>
                
                {/* Glow effect on hover - w stylu Zine */}
                <div className="absolute inset-0 bg-red-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none"></div>
              </div>
            </motion.div>
          ))}
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

export default HallOfFame
