"use client"

import { FaSkullCrossbones } from "react-icons/fa"
import { GiFlame } from "react-icons/gi"
import { randomQuotes } from "./data/mockData"

interface QuoteSectionProps {
  quoteIdx: number
}

const QuoteSection = ({ quoteIdx }: QuoteSectionProps) => {
  return (
    <div 
      className="bg-[#f5f5e8] border-b-4 border-black py-6 text-center relative overflow-hidden zine-quote-section"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* Distressed paper overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f0f0e0] via-transparent to-[#f0f0e0] opacity-30"></div>
      
      <div className="relative z-10 flex items-center justify-center gap-4 max-w-4xl mx-auto px-4">
        <FaSkullCrossbones className="text-red-800 text-3xl flex-shrink-0 skull-icon animate-pulse" />
        <blockquote className="italic text-black font-zine-body text-xl md:text-2xl font-bold leading-tight quote-text">
          "{randomQuotes[quoteIdx]}"
        </blockquote>
        <FaSkullCrossbones className="text-red-800 text-3xl flex-shrink-0 skull-icon animate-pulse" />
      </div>
      
      <div className="absolute bottom-2 right-4 text-xs text-black font-bold font-zine-body uppercase tracking-widest opacity-70">
        UNDERGROUND WISDOM #{quoteIdx + 1}
      </div>

      <style jsx>{`
        .zine-quote-section {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .skull-icon {
          text-shadow: 0 0 10px rgba(139, 0, 0, 0.6);
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
        }
        
        .quote-text {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.5px;
          position: relative;
        }
        
        .quote-text::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -20px;
          width: 20px;
          height: 20px;
          background: url("/images/zine/quote_mark.png") no-repeat center;
          background-size: contain;
          opacity: 0.3;
        }
        
        .quote-text::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: -20px;
          width: 20px;
          height: 20px;
          background: url("/images/zine/quote_mark.png") no-repeat center;
          background-size: contain;
          opacity: 0.3;
          transform: rotate(180deg);
        }
        
        .font-zine-body {
          font-family: "Special Elite", monospace;
        }
        
        @media (max-width: 768px) {
          .quote-text {
            font-size: 1.25rem !important;
          }
          
          .quote-text::before,
          .quote-text::after {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default QuoteSection
