"use client"

import { motion } from "framer-motion"
import { FaSkullCrossbones } from "react-icons/fa"
import { GiGothicCross, GiSkullCrossedBones, GiVikingHelmet } from "react-icons/gi"
import MetalDNA from "./MetalDNA"
import BandIncubator from "./BandIncubator"

const MetalSystems = () => {
  return (
    <section 
      className="py-16 bg-[#f5f5e8] relative zine-section"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* Decorative elements w stylu Zine */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-9xl text-red-800">
          <FaSkullCrossbones />
        </div>
        <div className="absolute bottom-20 right-20 text-8xl text-black">
          <GiVikingHelmet />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold uppercase tracking-widest mb-4 text-black font-zine-title">
            <FaSkullCrossbones className="inline mr-3 text-red-800 skull-icon" />
            ADVANCED METAL SYSTEMS
            <FaSkullCrossbones className="inline ml-3 text-red-800 skull-icon" />
          </h2>
          <p className="text-xl text-black font-zine-body">
            Deep dive into your metal genetics and discover new underground talent
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#f5f5e8] border-4 border-black rounded-none p-2 backdrop-blur-sm zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <MetalDNA userId="current-user" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#f5f5e8] border-4 border-black rounded-none p-2 backdrop-blur-sm zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <BandIncubator />
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

export default MetalSystems
