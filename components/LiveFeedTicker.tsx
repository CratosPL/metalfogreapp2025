"use client"

import { useEffect, useRef, useState } from "react"
import { GiSkullCrossedBones, GiThorHammer, GiVikingHelmet } from "react-icons/gi"
import { FaMusic, FaCrown, FaSkullCrossbones } from "react-icons/fa"
import { recentActivity } from "./data/mockData"

const icons = [
  FaSkullCrossbones,
  GiThorHammer,
  FaMusic,
  FaCrown,
  GiVikingHelmet
]

const LiveFeedTicker = () => {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIdx(i => (i + 1) % recentActivity.length)
    }, 3200)
    return () => clearTimeout(timerRef.current!)
  }, [idx])

  const a = recentActivity[idx]
  const IconComponent = icons[idx % icons.length]

  return (
    <div 
      className="bg-[#f5f5e8] border-b-4 border-black py-3 overflow-x-hidden shadow-metal relative zine-ticker"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      <div className="flex justify-center items-center h-7 relative">
        <div
          key={idx}
          className={`
            flex items-center gap-2 px-8 
            absolute left-1/2 top-0 transform -translate-x-1/2
            animate-tickerin
            transition-all
            font-zine-body
          `}
          style={{ minWidth: "max-content" }}
        >
          <IconComponent className={`inline text-red-800 text-lg skull-icon`} />
          <b className="text-black font-bold uppercase tracking-wide">{a.user}</b>
          <span className="text-black">{a.action}</span>
          <span className={`font-bold text-red-800`}>{a.target}</span>
          <span className="text-black text-xs bg-[#e0e0d8] border border-black px-2 py-1 rounded-none font-bold uppercase tracking-widest">
            {a.detail}
          </span>
          <span className="text-black text-xs opacity-70">{a.time}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes tickerin {
          from { 
            opacity: 0; 
            transform: translate(-50%, 0) translateX(40px) scale(0.92);
          }
          30% { 
            opacity: 1; 
            transform: translate(-50%, 0) translateX(0) scale(1.03);
          }
          85% { 
            opacity: 1; 
            transform: translate(-50%, 0) translateX(0) scale(1);
          }
          to { 
            opacity: 0; 
            transform: translate(-50%, 0) translateX(-40px) scale(0.9);
          }
        }
        .animate-tickerin {
          animation: tickerin 3.2s linear;
        }
        
        .zine-ticker {
          border-image: url("/images/zine/jagged_border.png") 30 round;
        }
        
        .skull-icon {
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.6);
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
        }
        
        .font-zine-body {
          font-family: "Special Elite", monospace;
        }
      `}</style>
    </div>
  )
}

export default LiveFeedTicker
