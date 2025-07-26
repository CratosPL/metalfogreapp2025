"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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
    if (intensity > 0.8) return '#dc2626' // red-600
    if (intensity > 0.6) return '#ea580c' // orange-600
    if (intensity > 0.4) return '#ca8a04' // yellow-600
    if (intensity > 0.2) return '#65a30d' // lime-600
    return '#6b7280' // gray-500
  }

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      {/* World Map SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.3))' }}
      >
        {/* Background */}
        <rect width="800" height="400" fill="#111827" />
        
        {/* Grid Lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#grid)" />

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
              stroke={isSelected ? '#fbbf24' : isHovered ? '#f59e0b' : '#4b5563'}
              strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
              className="cursor-pointer transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: isSelected ? 1.1 : isHovered ? 1.05 : 1,
                filter: isSelected ? 'brightness(1.2)' : isHovered ? 'brightness(1.1)' : 'brightness(1)'
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
                fill={selectedCountry?.id === country.id ? '#fbbf24' : '#dc2626'}
                stroke="#fff"
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
                className="fill-white text-xs font-bold pointer-events-none select-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                {country.flag}
              </motion.text>
            </g>
          )
        })}

        {/* Legend */}
        <g className="legend">
          <rect x="20" y="320" width="200" height="70" fill="#1f2937" stroke="#4b5563" strokeWidth="1" rx="5" />
          <text x="30" y="340" className="fill-white text-sm font-bold">INTENSITY</text>
          
          {['Low', 'Medium', 'High', 'Extreme'].map((level, index) => (
            <g key={level}>
              <circle 
                cx={35 + index * 35} 
                cy={355} 
                r="6" 
                fill={['#6b7280', '#ca8a04', '#ea580c', '#dc2626'][index]} 
              />
              <text 
                x={35 + index * 35} 
                y={375} 
                className="fill-gray-400 text-xs" 
                textAnchor="middle"
              >
                {level}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Hover Tooltip */}
      {hoveredCountry && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-xl pointer-events-none"
        >
          {(() => {
            const country = countries.find(c => c.id === hoveredCountry)
            return country ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-bold text-white">{country.name}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>Bands: {country.metalScene.totalBands}</div>
                  <div>Influence: {country.metalScene.influence}/100</div>
                  <div>Festivals: {country.festivals.length}</div>
                </div>
              </div>
            ) : null
          })()}
        </motion.div>
      )}

      {/* View Mode Indicator */}
      <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm border border-gray-600 rounded-lg p-3">
        <div className="text-sm font-bold text-white mb-1">VIEW: {viewMode.toUpperCase()}</div>
        <div className="text-xs text-gray-400">
          {viewMode === 'bands' && 'Band concentration by region'}
          {viewMode === 'festivals' && 'Major festival locations'}
          {viewMode === 'scenes' && 'Scene influence and activity'}
          {viewMode === 'timeline' && 'Historical development'}
        </div>
      </div>
    </div>
  )
}

export default WorldMap
