"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSkullCrossbones } from 'react-icons/fa'

interface WorldMapProps {
  countries: any[]
  viewMode: string
  onCountrySelect: (country: any) => void
  selectedCountry: any
}

const WorldMap = ({ countries, viewMode, onCountrySelect, selectedCountry }: WorldMapProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  // Enhanced world map with clickable regions
  const countryPaths = {
    norway: "M520,120 L540,110 L550,130 L545,150 L525,145 Z",
    sweden: "M530,140 L550,135 L560,160 L540,165 Z",
    finland: "M560,130 L580,125 L585,155 L565,160 Z",
    usa: "M200,200 L350,180 L370,220 L340,250 L180,240 Z",
    germany: "M500,180 L520,175 L525,195 L505,200 Z",
    poland: "M530,175 L550,170 L555,190 L535,195 Z"
  }

  const getCountryIntensity = (country: any) => {
    if (viewMode === 'bands') return country.metalScene.totalBands / 1000
    if (viewMode === 'festivals') return country.festivals.length / 10
    if (viewMode === 'scenes') return country.metalScene.influence / 100
    return 0.5
  }

  const getCountryColor = (country: any) => {
    const intensity = getCountryIntensity(country)
    if (intensity > 0.8) return '#8b0000' // Dark red - wysoka intensywność
    if (intensity > 0.6) return '#a52a2a' // Brown-red - średnio-wysoka
    if (intensity > 0.4) return '#696969' // Dim gray - średnia
    if (intensity > 0.2) return '#2f2f2f' // Dark gray - niska
    return '#1a1a1a' // Bardzo ciemny - brak aktywności
  }

  return (
    <div 
      className="relative w-full h-full bg-[#f5f5e8] overflow-hidden border-4 border-black zine-card"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* World Map SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }}
      >
        {/* Background - paper texture */}
        <rect width="800" height="400" fill="#f5f5e8" />
        
        {/* Grid Lines - w stylu zine */}
        <defs>
          <pattern id="zineGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000000" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
          {/* Distressed texture pattern */}
          <pattern id="distressed" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="#f0f0e0" opacity="0.3"/>
            <circle cx="20" cy="30" r="1" fill="#000" opacity="0.1"/>
            <circle cx="60" cy="70" r="1.5" fill="#000" opacity="0.1"/>
            <circle cx="80" cy="20" r="0.8" fill="#000" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#zineGrid)" />
        <rect width="800" height="400" fill="url(#distressed)" />

        {/* Decorative skull corners */}
        <g className="skull-decorations">
          <text x="20" y="30" className="fill-red-800 text-xl font-bold" style={{fontFamily: 'serif'}}>☠</text>
          <text x="760" y="30" className="fill-red-800 text-xl font-bold" style={{fontFamily: 'serif'}}>☠</text>
          <text x="20" y="380" className="fill-red-800 text-xl font-bold" style={{fontFamily: 'serif'}}>☠</text>
          <text x="760" y="380" className="fill-red-800 text-xl font-bold" style={{fontFamily: 'serif'}}>☠</text>
        </g>

        {/* Country Regions */}
        {countries.map((country) => {
          const path = countryPaths[country.id as keyof typeof countryPaths]
          const isSelected = selectedCountry?.id === country.id
          const isHovered = hoveredCountry === country.id
          
          return path ? (
            <motion.path
              key={country.id}
              d={path}
              fill={getCountryColor(country)}
              stroke={isSelected ? '#8b0000' : isHovered ? '#a52a2a' : '#000000'}
              strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
              className="cursor-pointer transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7, 
                scale: isSelected ? 1.1 : isHovered ? 1.05 : 1,
                filter: isSelected 
                  ? 'brightness(1.2) contrast(1.3)' 
                  : isHovered 
                    ? 'brightness(1.1) contrast(1.2)' 
                    : 'brightness(1) contrast(1.1)'
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredCountry(country.id)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => onCountrySelect(country)}
            />
          ) : null
        })}

        {/* Country Labels */}
        {countries.map((country) => {
          const [x, y] = country.coordinates
          const mapX = (x + 180) * (800 / 360)
          const mapY = (90 - y) * (400 / 180)
          
          return (
            <g key={`label-${country.id}`}>
              <motion.circle
                cx={mapX}
                cy={mapY}
                r={viewMode === 'festivals' ? 8 : 6}
                fill={selectedCountry?.id === country.id ? '#8b0000' : '#a52a2a'}
                stroke="#000"
                strokeWidth="2"
                className="cursor-pointer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => onCountrySelect(country)}
              />
              <motion.text
                x={mapX}
                y={mapY - 15}
                textAnchor="middle"
                className="fill-black text-xs font-bold pointer-events-none select-none font-zine-body"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                style={{
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)',
                  filter: 'contrast(2)'
                }}
              >
                {country.flag}
              </motion.text>
            </g>
          )
        })}

        {/* Legend - w stylu Zine */}
        <g className="legend">
          <rect 
            x="20" 
            y="320" 
            width="200" 
            height="70" 
            fill="#f5f5e8" 
            stroke="#000000" 
            strokeWidth="2" 
            rx="0"
          />
          <rect 
            x="22" 
            y="322" 
            width="196" 
            height="66" 
            fill="url(#distressed)" 
          />
          
          <text x="30" y="340" className="fill-black text-sm font-bold font-zine-title uppercase tracking-wide">
            INTENSITY
          </text>
          
          {['Low', 'Medium', 'High', 'Extreme'].map((level, index) => (
            <g key={level}>
              <rect
                x={28 + index * 35} 
                y={348}
                width="12"
                height="12"
                fill={['#1a1a1a', '#2f2f2f', '#a52a2a', '#8b0000'][index]}
                stroke="#000"
                strokeWidth="1"
              />
              <text 
                x={34 + index * 35} 
                y={375} 
                className="fill-black text-xs font-zine-body uppercase tracking-wide" 
                textAnchor="middle"
              >
                {level}
              </text>
            </g>
          ))}
        </g>

        {/* Title Banner */}
        <g className="title-banner">
          <rect x="250" y="10" width="300" height="40" fill="#000000" stroke="#8b0000" strokeWidth="2"/>
          <text 
            x="400" 
            y="35" 
            textAnchor="middle" 
            className="fill-red-800 text-lg font-bold font-zine-title uppercase tracking-widest"
          >
            UNDERGROUND MAP
          </text>
        </g>
      </svg>

      {/* Hover Tooltip - w stylu Zine */}
      {hoveredCountry && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-[#f5f5e8] border-4 border-black rounded-none p-4 shadow-metal pointer-events-none zine-card"
          style={{
            backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(245, 245, 232, 0.95)"
          }}
        >
          {(() => {
            const country = countries.find(c => c.id === hoveredCountry)
            return country ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl filter grayscale contrast-200">{country.flag}</span>
                  <span className="font-bold text-black font-zine-title uppercase tracking-wide">{country.name}</span>
                </div>
                <div className="space-y-1 text-sm text-black font-zine-body">
                  <div><span className="font-bold">Bands:</span> {country.metalScene.totalBands}</div>
                  <div><span className="font-bold">Influence:</span> {country.metalScene.influence}/100</div>
                  <div><span className="font-bold">Festivals:</span> {country.festivals.length}</div>
                </div>
              </div>
            ) : null
          })()}
        </motion.div>
      )}

      {/* View Mode Indicator - w stylu Zine */}
      <div className="absolute bottom-4 left-4 bg-[#f5f5e8] border-4 border-black rounded-none p-3 zine-card">
        <div className="flex items-center gap-2 text-sm font-bold text-black mb-1 font-zine-title uppercase tracking-wide">
          <FaSkullCrossbones className="text-red-800" />
          VIEW: {viewMode.toUpperCase()}
        </div>
        <div className="text-xs text-black font-zine-body">
          {viewMode === 'bands' && 'Band concentration by region'}
          {viewMode === 'festivals' && 'Major festival locations'}
          {viewMode === 'scenes' && 'Scene influence and activity'}
          {viewMode === 'timeline' && 'Historical development'}
        </div>
      </div>

      <style jsx>{`
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

        .skull-decorations text {
          filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
        }
      `}</style>
    </div>
  )
}

export default WorldMap
