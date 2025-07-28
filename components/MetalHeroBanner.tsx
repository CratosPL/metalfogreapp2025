"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { 
  GiDeathSkull, 
  GiCrossedSwords, 
  GiThorHammer,
  GiBloodySword,
  GiSkullCrossedBones,
  GiBlackFlag
} from "react-icons/gi"
import { FaSkullCrossbones, FaBolt } from "react-icons/fa"

interface MetalHeroBannerProps {
  glitchActive?: boolean;
}

const MetalHeroBanner = ({ glitchActive = false }: MetalHeroBannerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)

  const metalQuotes = [
    "IN DARKNESS WE FORGE",
    "UNDERGROUND NEVER DIES", 
    "KVLT IS ETERNAL",
    "BROTHERHOOD OF STEEL",
    "FROM ASHES TO METAL"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % metalQuotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      className="relative w-full h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden border-b-4 border-black zine-banner"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Metal Image */}
      <div className="absolute inset-0">
        <Image
          src="/tlobannmetall1.png"
          alt="Metal Underground Banner"
          fill
          className={`object-cover object-center filter grayscale contrast-150 brightness-75 transition-all duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${glitchActive ? 'animate-pulse filter brightness-110 contrast-200' : ''}`}
          onLoad={() => setImageLoaded(true)}
          priority
          sizes="100vw"
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply"
          }}
        />
      </div>

      {/* Decorative skulls floating - więcej i większe */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            rotate: [0, 8, 0, -8, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-12 left-12 text-white/20"
        >
          <GiDeathSkull className="text-5xl md:text-7xl lg:text-8xl" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [15, -15, 15],
            rotate: [0, -8, 0, 8, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-16 right-16 text-white/20"
        >
          <GiCrossedSwords className="text-4xl md:text-6xl lg:text-7xl" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [-8, 20, -8],
            rotate: [0, 12, 0, -12, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-12 left-1/4 text-white/20"
        >
          <GiThorHammer className="text-4xl md:text-5xl lg:text-6xl" />
        </motion.div>

        {/* Dodatkowe elementy dla wyższego bannera */}
        <motion.div
          animate={{ 
            y: [10, -10, 10],
            rotate: [0, -6, 0, 6, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 6
          }}
          className="absolute bottom-16 right-1/3 text-white/15"
        >
          <GiBloodySword className="text-3xl md:text-4xl lg:text-5xl" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [-12, 12, -12],
            rotate: [0, 10, 0, -10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/2 left-1/6 text-white/15"
        >
          <GiSkullCrossedBones className="text-2xl md:text-3xl lg:text-4xl" />
        </motion.div>
      </div>

      {/* Main Content - lepiej wycentrowany dla wyższego bannera */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-5xl mx-auto">
          
          {/* Animated Quote - większy dla wyższego bannera */}
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 lg:mb-12"
          >
            <div className="bg-black/70 backdrop-blur-sm border-2 border-white/30 p-6 md:p-8 lg:p-10 rounded-none inline-block zine-card-dark">
              <h1 className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-widest text-white font-zine-title ${
                glitchActive ? 'animate-pulse text-red-400' : ''
              }`}
              style={{
                textShadow: glitchActive 
                  ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.5)' 
                  : '2px 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(255,255,255,0.1)'
              }}>
                {metalQuotes[currentQuote]}
              </h1>
            </div>
          </motion.div>

          {/* Subtitle with icons - większy spacing */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center justify-center gap-4 md:gap-8 flex-wrap"
          >
            <div className="flex items-center gap-3 text-white/90">
              <FaSkullCrossbones className="text-xl md:text-2xl lg:text-3xl text-red-400 animate-pulse" />
              <span className="text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wide font-zine-body">
                Web3 Metal Platform
              </span>
            </div>
            
            <div className="hidden md:block w-1 h-8 lg:h-10 bg-white/50"></div>
            
            <div className="flex items-center gap-3 text-white/90">
              <GiBloodySword className="text-xl md:text-2xl lg:text-3xl text-red-400" />
              <span className="text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wide font-zine-body">
                Underground Community
              </span>
            </div>
            
            <div className="hidden md:block w-1 h-8 lg:h-10 bg-white/50"></div>
            
            <div className="flex items-center gap-3 text-white/90">
              <FaBolt className="text-xl md:text-2xl lg:text-3xl text-yellow-400 animate-pulse" />
              <span className="text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wide font-zine-body">
                Earn & Forge
              </span>
            </div>
          </motion.div>

          {/* Bottom accent line - większy dla wyższego bannera */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-1.5 lg:h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent mt-8 lg:mt-12 max-w-lg lg:max-w-xl mx-auto"
          />
        </div>
      </div>

      {/* Corner decorations - większe dla wyższego bannera */}
      <div className="absolute top-0 left-0 w-20 lg:w-24 h-20 lg:h-24 border-l-4 border-t-4 border-white/30"></div>
      <div className="absolute top-0 right-0 w-20 lg:w-24 h-20 lg:h-24 border-r-4 border-t-4 border-white/30"></div>
      <div className="absolute bottom-0 left-0 w-20 lg:w-24 h-20 lg:h-24 border-l-4 border-b-4 border-white/30"></div>
      <div className="absolute bottom-0 right-0 w-20 lg:w-24 h-20 lg:h-24 border-r-4 border-b-4 border-white/30"></div>

      <style jsx>{`
        .zine-banner {
          border-image: url("/images/zine/jagged_border.png") 30 round;
        }
        
        .zine-card-dark {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.2);
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

export default MetalHeroBanner
