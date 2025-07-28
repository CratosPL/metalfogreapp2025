"use client"

import { useState } from "react"
import HeroSection from "../components/HeroSection"
import MetalHeroBanner from "../components/MetalHeroBanner"
import LiveFeedTicker from "../components/LiveFeedTicker"
import QuoteSection from "../components/QuoteSection"
import ManifestoStats from "../components/ManifestoStats"
import HallOfFame from "../components/HallOfFame"
import UndergroundMap from "../components/UndergroundMap"
import FeaturesGrid from "../components/FeaturesGrid"
import CallToAction from "../components/CallToAction"
import MetalSystems from "../components/MetalSystems"
import Footer from "../components/Footer"
import LoadingScreen from "../components/LoadingScreen"
import ScrollToTop from "../components/ScrollToTop"

const MetalForgeApp = () => {
  const [glitchActive, setGlitchActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [randomBand, setRandomBand] = useState<string | null>(null)
  const [displayStats, setDisplayStats] = useState({ bands: 0, demos: 0, users: 0, earnings: 0 })
  const [currentTrack, setCurrentTrack] = useState(0)
  const [metalScore, setMetalScore] = useState(666)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize app
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  })

  const sharedProps = {
    glitchActive,
    setGlitchActive,
    isPlaying,
    setIsPlaying,
    quoteIdx,
    setQuoteIdx,
    randomBand,
    setRandomBand,
    displayStats,
    setDisplayStats,
    currentTrack,
    setCurrentTrack,
    metalScore,
    setMetalScore
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main 
      className="min-h-screen font-zine-body bg-[#f5f5e8] text-[#1a1a1a] overflow-x-hidden zine-layout"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <HeroSection {...sharedProps} />
      <MetalHeroBanner glitchActive={glitchActive} />
      <LiveFeedTicker />
      <QuoteSection quoteIdx={quoteIdx} />
      <ManifestoStats displayStats={displayStats} setDisplayStats={setDisplayStats} />
      <HallOfFame />
      <UndergroundMap />
      <FeaturesGrid {...sharedProps} />
      <CallToAction />
      <MetalSystems />
      <Footer displayStats={displayStats} />
      <ScrollToTop />

      {/* Style CSS w stylu Zine */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Special+Elite&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Blackletter&display=swap");
        @import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Unbounded:wght@200;400;500&display=swap');

        .font-zine-title {
          font-family: "Blackletter", serif;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .font-zine-body {
          font-family: "Special Elite", monospace;
        }

        .font-unbounded {
          font-family: 'Unbounded', sans-serif;
        }

        .zine-layout {
          background-color: #f5f5e8;
          background-image: url("/images/zine/paper_texture_distressed.jpg");
          background-size: cover;
          background-position: center;
          position: relative;
          overflow-x: hidden;
        }

        .skull-text {
          text-shadow: 0 0 15px rgba(139, 69, 19, 0.8), 0 0 25px rgba(101, 67, 33, 0.6);
        }

        .skull-button {
          background: linear-gradient(to right, #b71c1c, #000000);
          border: 2px solid #ff0000;
          box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
        }

        .skull-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 0, 0, 0.5);
          filter: brightness(1.2);
        }

        .shadow-metal {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(255, 0, 0, 0.2);
        }

        .zine-border {
          border-image: url("/images/zine/jagged_border.png") 30 round;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 20px rgba(138, 74, 74, 0.5);
          }
          to {
            box-shadow: 0 0 30px rgba(138, 74, 74, 0.8);
          }
        }

        /* Dodatkowe style dla MetalHeroBanner */
        .zine-banner {
          border-image: url("/images/zine/jagged_border.png") 30 round;
        }
        
        .zine-card-dark {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.2);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .zine-layout {
            background-attachment: scroll;
          }
        }

        /* Paper texture animation */
        @keyframes paperFlicker {
          0%, 100% { 
            filter: brightness(1) contrast(1); 
          }
          50% { 
            filter: brightness(1.02) contrast(1.05); 
          }
        }

        .zine-layout {
          animation: paperFlicker 8s ease-in-out infinite;
        }

        /* Scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Loading states */
        .loading-blur {
          filter: blur(2px);
          transition: filter 0.3s ease;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .zine-layout {
            background-image: none;
            background-color: #ffffff;
          }
          
          .font-zine-body, .font-zine-title {
            color: #000000 !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-glow,
          .zine-layout {
            animation: none;
          }
          
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        /* Print styles */
        @media print {
          .zine-layout {
            background-image: none;
            background-color: white;
            color: black;
          }
          
          .skull-button,
          .shadow-metal {
            box-shadow: none;
            background: white;
            border: 2px solid black;
            color: black;
          }
        }
      `}</style>
    </main>
  )
}

export default MetalForgeApp
