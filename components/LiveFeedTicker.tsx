"use client"

import { GiSkullCrossedBones, GiThorHammer, GiVikingHelmet } from "react-icons/gi"
import { FaMusic, FaCrown, FaFire } from "react-icons/fa"
import { recentActivity } from "./data/mockData"

const LiveFeedTicker = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-red-900/20 to-gray-800 border-b-2 border-red-600 py-3 overflow-x-hidden shadow-lg">
      <div className="whitespace-nowrap animate-marquee text-sm text-gray-200 font-medium">
        {recentActivity.map((a, i) => {
          const IconComponent = i === 0 ? GiSkullCrossedBones : 
                              i === 1 ? GiThorHammer :
                              i === 2 ? FaMusic :
                              i === 3 ? FaCrown : GiVikingHelmet
          
          return (
            <span key={i} className="mx-8 flex items-center gap-2">
              <IconComponent className={`inline ${a.color} text-lg`} />
              <b className="text-white font-bold">{a.user}</b> 
              <span className="text-gray-300">{a.action}</span>
              <span className={`font-bold ${a.color}`}>{a.target}</span>
              <span className="text-gray-500 text-xs bg-gray-800/50 px-2 py-1 rounded">{a.detail}</span>
              <span className="text-gray-600 text-xs">{a.time}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default LiveFeedTicker
