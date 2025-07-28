"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  GiWolfHead, 
  GiDragonHead, 
  GiFlame, 
  GiBloodySword 
} from "react-icons/gi"
import { 
  FaTrophy, 
  FaHeadphones, 
  FaStore, 
  FaWallet, 
  FaBolt, 
  FaEthereum,
  FaSkullCrossbones
} from "react-icons/fa"

const CallToAction = () => {
  return (
    <section 
      className="bg-[#f5f5e8] border-y-4 border-black py-16 relative overflow-hidden zine-section"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f0f0e0] via-transparent to-[#f0f0e0] opacity-30"></div>
      
      {/* Decorative elements w stylu Zine */}
      <div className="absolute top-10 left-10 text-8xl text-red-800 opacity-20">
        <FaSkullCrossbones />
      </div>
      <div className="absolute bottom-10 right-10 text-8xl text-red-800 opacity-20">
        <GiDragonHead />
      </div>

      <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <FaSkullCrossbones className="text-7xl md:text-8xl text-red-800 mx-auto mb-6 filter drop-shadow-2xl skull-icon" />
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6 text-black font-zine-title">
            FORGE YOUR WEB3 LEGACY
          </h2>
          <p className="text-xl md:text-2xl text-black leading-relaxed mb-8 max-w-4xl mx-auto font-zine-body">
            Join the first <span className="text-red-800 font-bold">decentralized metal community</span> on blockchain. 
            Earn crypto for your contributions, build your <span className="text-red-800 font-bold">digital Metal DNA</span>, 
            and be part of the underground revolution.
          </p>

          {/* Feature Grid w stylu Zine */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#f5f5e8] border-2 border-black hover:border-red-800 rounded-none p-6 backdrop-blur-sm zine-card"
              style={{
                backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(245, 245, 232, 0.9)"
              }}
            >
              <FaTrophy className="text-red-800 text-4xl mx-auto mb-3 skull-icon" />
              <div className="text-sm font-bold text-black uppercase tracking-wide font-zine-body">EARN CRYPTO</div>
              <div className="text-xs text-black mt-1 font-zine-body">For every contribution</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#f5f5e8] border-2 border-black hover:border-red-800 rounded-none p-6 backdrop-blur-sm zine-card"
              style={{
                backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(245, 245, 232, 0.9)"
              }}
            >
              <FaHeadphones className="text-red-800 text-4xl mx-auto mb-3 skull-icon" />
              <div className="text-sm font-bold text-black uppercase tracking-wide font-zine-body">STREAM & PAY</div>
              <div className="text-xs text-black mt-1 font-zine-body">Instant micropayments</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#f5f5e8] border-2 border-black hover:border-red-800 rounded-none p-6 backdrop-blur-sm zine-card"
              style={{
                backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(245, 245, 232, 0.9)"
              }}
            >
              <FaStore className="text-red-800 text-4xl mx-auto mb-3 skull-icon" />
              <div className="text-sm font-bold text-black uppercase tracking-wide font-zine-body">TRADE NFTS</div>
              <div className="text-xs text-black mt-1 font-zine-body">Rare collectibles</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#f5f5e8] border-2 border-black hover:border-red-800 rounded-none p-6 backdrop-blur-sm zine-card"
              style={{
                backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(245, 245, 232, 0.9)"
              }}
            >
              <GiFlame className="text-red-800 text-4xl mx-auto mb-3 skull-icon" />
              <div className="text-sm font-bold text-black uppercase tracking-wide font-zine-body">MINT & COLLECT</div>
              <div className="text-xs text-black mt-1 font-zine-body">Create immortal art</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main CTA Buttons w stylu Zine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            href="/profile"
            className="skull-button text-[#d0d0d0] px-12 py-5 text-xl font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-metal rounded-none relative overflow-hidden group font-zine-body"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d71c1c] to-[#000000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-3">
              <FaWallet className="text-2xl" /> 
              CONNECT & EARN
              <FaBolt className="text-yellow-400 animate-pulse" />
            </span>
          </Link>
          
          <Link
            href="/about"
            className="bg-[#f5f5e8] border-4 border-black text-black hover:bg-red-800 hover:border-red-800 hover:text-white px-12 py-5 text-xl font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-none relative overflow-hidden group font-zine-body zine-card"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <GiBloodySword className="text-2xl" />
              LEARN MANIFESTO
            </span>
          </Link>
        </motion.div>

        {/* Bottom Info w stylu Zine */}
        <div className="mt-8 text-black text-lg">
          <p className="flex items-center justify-center gap-4 flex-wrap font-zine-body">
            <span className="flex items-center gap-1">
              <GiFlame className="text-red-800" />
              No fees to start
            </span>
            <span className="flex items-center gap-1">
              <FaBolt className="text-red-800" />
              Optimism powered
            </span>
            <span className="flex items-center gap-1">
              <FaEthereum className="text-red-800" />
              Instant payouts
            </span>
          </p>
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

export default CallToAction
