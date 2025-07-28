"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { FaGuitar } from "react-icons/fa"
import { motion } from "framer-motion"

// PRZYKŁADOWE, MINIMALNE DANE
const demoCountries = [
  {
    id: "norway",
    name: "Norway",
    flag: "🇳🇴",
    coordinates: [10.75, 59.91],
    metalScene: {
      totalBands: 847, influence: 97, dominantGenres: ["Black Metal", "Viking Metal"]
    },
    festivals: [],
  },
  {
    id: "sweden",
    name: "Sweden",
    flag: "🇸🇪",
    coordinates: [18.07, 59.33],
    metalScene: {
      totalBands: 623, influence: 94, dominantGenres: ["Melodic Death Metal", "Black Metal"]
    },
    festivals: [],
  },
  {
    id: "finland",
    name: "Finland",
    flag: "🇫🇮",
    coordinates: [24.94, 60.17],
    metalScene: {
      totalBands: 445, influence: 89, dominantGenres: ["Folk Metal", "Symphonic Metal"]
    },
    festivals: [],
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    coordinates: [13.41, 52.52],
    metalScene: {
      totalBands: 567, influence: 91, dominantGenres: ["Thrash Metal", "Power Metal"]
    },
    festivals: [],
  },
  {
    id: "poland",
    name: "Poland",
    flag: "🇵🇱",
    coordinates: [21.01, 52.23],
    metalScene: {
      totalBands: 389, influence: 85, dominantGenres: ["Death Metal", "Black Metal"]
    },
    festivals: [],
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    coordinates: [-73.93, 40.73],
    metalScene: {
      totalBands: 1234, influence: 96, dominantGenres: ["Death Metal", "Thrash Metal"]
    },
    festivals: [],
  }
]

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Działa nawet bez podanych props!
const WorldMap = ({
  countries = demoCountries,
  viewMode = "bands",
  onCountrySelect = () => {},
  selectedCountry = null
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const colorForInfluence = (influence: number) => {
    if (influence >= 95) return "#a00"
    if (influence >= 91) return "#d30"
    if (influence >= 86) return "#f50"
    return "#555"
  }

  return (
    <div className="w-full h-full bg-black relative">
      <ComposableMap
        projection="geoMercator"
        style={{ width: "100%", height: "520px" }}
        projectionConfig={{
          scale: 120,
          center: [13, 45]
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#3a3a3a"
                  stroke="#222"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#444" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {countries.map((c) => (
            <Marker 
              key={c.id}
              coordinates={c.coordinates}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onCountrySelect(c)}
              className="cursor-pointer"
            >
              <motion.circle
                r={hoveredId === c.id ? 18 : 12}
                fill={colorForInfluence(c.metalScene.influence)}
                stroke="#fff"
                strokeWidth={hoveredId === c.id ? 3 : 2}
                animate={{ scale: hoveredId === c.id ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 160 }}
              />
              <text 
                textAnchor="middle"
                y="5"
                fontSize="20"
                pointerEvents="none"
              >
                {c.flag}
              </text>
              {/* Metal count on hover */}
              {hoveredId === c.id && (
              <text textAnchor="middle" y="-26" fontSize="15" fill="#fff" fontWeight="bold">
                🤘 {c.metalScene.totalBands} bands
              </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      {/* Tooltip */}
      {hoveredId && (() => {
        const c = countries.find(cc => cc.id === hoveredId)
        return !!c && (
          <div className="absolute left-8 top-8 bg-gray-900 border border-red-600 rounded-lg px-4 py-2 z-10 text-sm text-white shadow-xl">
            <div className="font-black">{c.flag} {c.name}</div>
            <div>{c.metalScene.dominantGenres.join(", ")}</div>
            <div>Bands: {c.metalScene.totalBands}, Influence: {c.metalScene.influence}</div>
          </div>
        )
      })()}
    </div>
  )
}
export default WorldMap
