"use client"

import { motion } from "framer-motion"
import { GiGothicCross, GiSkullCrossedBones, GiVikingHelmet } from "react-icons/gi"
import MetalDNA from "./MetalDNA"
import BandIncubator from "./BandIncubator"

const MetalSystems = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-9xl text-red-600">
          <GiSkullCrossedBones />
        </div>
        <div className="absolute bottom-20 right-20 text-8xl text-blue-600">
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
          <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-white">
            <GiGothicCross className="inline mr-3 text-red-600" />
            ADVANCED METAL SYSTEMS
            <GiGothicCross className="inline ml-3 text-red-600" />
          </h2>
          <p className="text-xl text-gray-400">
            Deep dive into your metal genetics and discover new underground talent
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 border-2 border-gray-600 rounded-xl p-2 backdrop-blur-sm"
          >
            <MetalDNA userId="current-user" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 border-2 border-gray-600 rounded-xl p-2 backdrop-blur-sm"
          >
            <BandIncubator />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MetalSystems
