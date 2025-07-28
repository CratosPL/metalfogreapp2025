import Image from "next/image"
import { motion } from "framer-motion"
import { FaSkullCrossbones } from "react-icons/fa"

export default function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 bg-[#f5f5e8] flex items-center justify-center z-50 zine-loading"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.98)"
      }}
    >
      {/* Decorative skulls w tle */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-800 absolute top-20 left-20 transform rotate-15">☠</div>
        <div className="animate-pulse text-5xl text-black absolute top-40 right-40 transform -rotate-12">☠</div>
        <div className="animate-pulse text-4xl text-red-800 absolute bottom-40 left-1/3 transform rotate-10">☠</div>
        <div className="animate-pulse text-5xl text-black absolute bottom-20 right-20 transform -rotate-8">☠</div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo w stylu Zine */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-8 relative"
        >
          <div className="w-32 h-32 border-4 border-black rounded-none shadow-metal mx-auto relative overflow-hidden zine-card">
            <Image
              src="/logometalforge.jpg"
              alt="Metal Forge Logo"
              width={120}
              height={120}
              className="w-full h-full object-cover filter grayscale contrast-200"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-800/20 to-transparent"></div>
          </div>
          
          {/* Animated border */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-32 h-32 border-2 border-red-800 rounded-none mx-auto"
          />
        </motion.div>
        
        {/* Tytuł w stylu Zine */}
        <motion.h2
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl font-bold uppercase tracking-widest text-black mb-2 font-zine-title"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
        >
          FORGING THE UNDERGROUND
        </motion.h2>

        {/* Podtytuł */}
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-8 font-zine-body text-black"
        >
          <FaSkullCrossbones className="text-red-800" />
          <span className="uppercase tracking-wide text-sm">Loading page...</span>
          <FaSkullCrossbones className="text-red-800" />
        </motion.div>
        
        {/* Progress bar w stylu Zine */}
        <div className="w-80 max-w-full mx-auto">
          <div className="h-4 bg-[#e0e0d8] border-2 border-black rounded-none overflow-hidden shadow-metal zine-card">
            <motion.div
              className="h-full bg-gradient-to-r from-red-800 to-black relative"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            >
              {/* Animated texture na progress barze */}
              <motion.div
                animate={{ x: [-100, 300] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-20"
              />
            </motion.div>
          </div>
          
          {/* Loading tekst pod progress barem */}
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="mt-3 text-xs uppercase tracking-widest text-black font-zine-body"
          >
            Preparing the underground experience...
          </motion.div>
        </div>

        {/* Dodatkowe elementy atmosfery */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -top-10 -left-10 text-4xl text-red-800 pointer-events-none"
        >
          ☠
        </motion.div>
        
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-10 -right-10 text-4xl text-black pointer-events-none"
        >
          ☠
        </motion.div>
      </div>

      <style jsx>{`
        .zine-loading {
          background-color: #f5f5e8;
          background-image: url("/images/zine/paper_texture_distressed.jpg");
          background-size: cover;
          background-position: center;
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

        /* Dodatkowe animacje dla atmosfery */
        @keyframes paperFlicker {
          0%, 100% { filter: brightness(1) contrast(1); }
          50% { filter: brightness(1.05) contrast(1.1); }
        }

        .zine-loading {
          animation: paperFlicker 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

