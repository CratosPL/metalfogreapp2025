// src/app/player/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaHeart,
  FaShare, FaDownload, FaCoins, FaUpload, FaFilter, FaSearch
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCoffin, GiGhost, GiDragonHead, GiThorHammer
} from 'react-icons/gi';
import Link from 'next/link';
import AudioPlayer from './components/AudioPlayer';
import TrackCard from './components/TrackCard';

// Mock data - w przyszłości z Supabase
const mockTracks = [
  {
    id: "1",
    title: "Freezing Moon",
    artist: "MAYHEM",
    album: "De Mysteriis Dom Sathanas",
    duration: "6:23",
    genre: "Black Metal",
    year: 1994,
    country: "Norway",
    audioUrl: "/audio/mayhem-freezing-moon.mp3",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    pricePerPlay: 0.001, // ETH
    totalPlays: 15420,
    earnings: 15.42, // ETH
    uploadedBy: "MAYHEM_OFFICIAL",
    uploadDate: "2024-12-01",
    isDemo: false,
    tags: ["black metal", "norwegian", "classic", "atmospheric"],
    description: "Classic black metal masterpiece from the legendary Norwegian band."
  },
  {
    id: "2", 
    title: "Winter Winds",
    artist: "FROSTY TORMENT",
    album: "Demo 2025",
    duration: "4:47",
    genre: "Black Metal",
    year: 2025,
    country: "Poland",
    audioUrl: "/audio/frosty-torment-winter-winds.mp3",
    coverUrl: "https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=300&h=300&fit=crop",
    pricePerPlay: 0.0005,
    totalPlays: 892,
    earnings: 0.446,
    uploadedBy: "FROSTY_TORMENT",
    uploadDate: "2025-01-15",
    isDemo: true,
    tags: ["black metal", "polish", "atmospheric", "demo"],
    description: "Raw atmospheric black metal demo from emerging Polish band."
  },
  {
    id: "3",
    title: "Cosmic Wisdom",
    artist: "SOLAR WISDOM", 
    album: "Astral Paths",
    duration: "8:12",
    genre: "Atmospheric Black Metal",
    year: 2024,
    country: "Poland",
    audioUrl: "/audio/solar-wisdom-cosmic.mp3",
    coverUrl: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=300&fit=crop",
    pricePerPlay: 0.0008,
    totalPlays: 3421,
    earnings: 2.737,
    uploadedBy: "SOLAR_WISDOM",
    uploadDate: "2024-11-20",
    isDemo: false,
    tags: ["atmospheric", "black metal", "polish", "cosmic"],
    description: "Epic atmospheric journey through cosmic black metal landscapes."
  }
];

const genres = ["All", "Black Metal", "Death Metal", "Doom Metal", "Atmospheric Black Metal"];
const countries = ["All", "Norway", "Poland", "Sweden", "Finland", "USA"];

export default function PlayerPage() {
  const [currentTrack, setCurrentTrack] = useState<any>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Filter tracks
  const filteredTracks = mockTracks.filter(track => {
    const searchMatch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       track.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const genreMatch = selectedGenre === "All" || track.genre === selectedGenre;
    const countryMatch = selectedCountry === "All" || track.country === selectedCountry;
    
    return searchMatch && genreMatch && countryMatch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <GiDragonHead className="text-4xl text-blue-400" />
              <div>
                <h1
                  className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0]"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    textShadow: '2px 2px 0 #333, 4px 4px 0 #666'
                  }}
                >
                  DEMO VAULT
                </h1>
                <p className="text-[#999] text-sm md:text-base uppercase tracking-wide">
                  Stream • Earn • Support Underground Music
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/player/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 border-2 border-blue-600 transition-colors uppercase font-bold text-xs tracking-wide flex items-center gap-2"
              >
                <FaUpload /> UPLOAD DEMO
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH & FILTERS */}
      <section className="bg-[#111] border-b-2 border-[#333] p-4">
        <div className="max-w-7xl mx-auto">
          {/* SEARCH BAR */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search tracks, artists, albums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none font-mono"
            />
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] text-xs uppercase focus:border-blue-600 focus:outline-none"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>Genre: {genre}</option>
              ))}
            </select>
            
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] text-xs uppercase focus:border-blue-600 focus:outline-none"
            >
              {countries.map(country => (
                <option key={country} value={country}>Country: {country}</option>
              ))}
            </select>

            <div className="ml-auto text-xs text-[#666]">
              {filteredTracks.length} tracks • Total earnings: {mockTracks.reduce((sum, t) => sum + t.earnings, 0).toFixed(3)} ETH
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TRACK LIST */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <GiCoffin className="text-2xl text-blue-400" />
            <h2 className="text-xl font-black uppercase tracking-wide">Underground Tracks</h2>
          </div>
          
          <div className="space-y-4">
            {filteredTracks.map((track, index) => (
              <TrackCard
                key={track.id}
                track={track}
                isCurrentTrack={currentTrack?.id === track.id}
                isPlaying={isPlaying && currentTrack?.id === track.id}
                onPlay={() => {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                }}
                onPause={() => setIsPlaying(false)}
              />
            ))}
          </div>
        </div>

        {/* PLAYER SIDEBAR */}
        <div className="lg:col-span-1">
          <AudioPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onNext={() => {
              const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack?.id);
              const nextTrack = filteredTracks[currentIndex + 1] || filteredTracks[0];
              setCurrentTrack(nextTrack);
            }}
            onPrevious={() => {
              const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack?.id);
              const prevTrack = filteredTracks[currentIndex - 1] || filteredTracks[filteredTracks.length - 1];
              setCurrentTrack(prevTrack);
            }}
          />

          {/* STATS */}
          <div className="bg-[#111] border-2 border-[#333] p-4 mt-6">
            <h3 className="text-sm font-bold text-[#ccc] mb-4 uppercase">Platform Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#999]">Total Tracks:</span>
                <span className="text-blue-400">{mockTracks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#999]">Total Plays:</span>
                <span className="text-green-400">{mockTracks.reduce((sum, t) => sum + t.totalPlays, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#999]">Artist Earnings:</span>
                <span className="text-yellow-400">{mockTracks.reduce((sum, t) => sum + t.earnings, 0).toFixed(3)} ETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#111] border-t-4 border-[#333] p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <GiDeathSkull className="text-xl text-[#666]" />
            <GiCoffin className="text-xl text-[#666]" />
            <GiGhost className="text-xl text-[#666]" />
          </div>
          <p className="text-[#666] text-sm uppercase tracking-widest">
            DEMO VAULT • STREAM TO EARN • SUPPORT UNDERGROUND
          </p>
          <p className="text-[#444] text-xs mt-2">
            Artists get 80% • Listeners earn rewards • Powered by Optimism
          </p>
        </div>
      </footer>
    </div>
  );
}
