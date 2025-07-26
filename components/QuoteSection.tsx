"use client"

import { GiFlame } from "react-icons/gi"
import { randomQuotes } from "./data/mockData"

interface QuoteSectionProps {
  quoteIdx: number
}

const QuoteSection = ({ quoteIdx }: QuoteSectionProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-b-2 border-gray-600 py-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10"></div>
      <div className="relative z-10 flex items-center justify-center gap-4 max-w-4xl mx-auto px-4">
        <GiFlame className="text-red-600 text-3xl flex-shrink-0 animate-pulse" />
        <span className="italic text-gray-200 font-inter text-xl md:text-2xl font-medium">
          {randomQuotes[quoteIdx]}
        </span>
        <GiFlame className="text-red-600 text-3xl flex-shrink-0 animate-pulse" />
      </div>
      <div className="absolute bottom-2 right-4 text-xs text-gray-500 font-bold">
        UNDERGROUND WISDOM #{quoteIdx + 1}
      </div>
    </div>
  )
}

export default QuoteSection
