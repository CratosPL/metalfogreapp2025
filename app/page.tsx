"use client"

import { useState } from "react"
import HeroSection from "../components/HeroSection"
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
    <div className="min-h-screen bg-gray-900 text-white font-inter overflow-x-hidden">
      <HeroSection {...sharedProps} />
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
    </div>
  )
}

export default MetalForgeApp
