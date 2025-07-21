// src/app/player/components/TrackCard.tsx
"use client";

import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaCoins, FaEye, FaHeart } from 'react-icons/fa';
import { GiDeathSkull } from 'react-icons/gi';

interface TrackCardProps {
  track: any;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export default function TrackCard({ 
  track, 
  isCurrentTrack, 
  isPlaying, 
  onPlay, 
  onPause 
}: TrackCardProps) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={`bg-[#111] border-2 transition-colors p-4 flex gap-4 ${
        isCurrentTrack ? 'border-blue-600' : 'border-[#333] hover:border-blue-600'
      }`}
    >
      {/* COVER */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <img
          src={track.coverUrl}
          alt={track.album}
          className="w-full h-full object-cover grayscale contrast-125 brightness-90"
          style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
        />
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* INFO */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-[#e0e0e0] truncate">{track.title}</h4>
            <p className="text-[#999] text-sm truncate">{track.artist}</p>
            <p className="text-[#666] text-xs">{track.album} • {track.year}</p>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            {track.isDemo && (
              <span className="bg-blue-600 text-white px-2 py-1 text-xs uppercase font-bold">
                DEMO
              </span>
            )}
            <span className="text-[#666] text-xs">{track.duration}</span>
          </div>
        </div>

        {/* STATS */}
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-yellow-400">
            <FaCoins /> {track.pricePerPlay} ETH
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <FaEye /> {track.totalPlays.toLocaleString()}
          </span>
          <span className="text-[#666]">{track.country}</span>
          <span className="text-[#666]">{track.genre}</span>
        </div>

        {/* TAGS */}
        <div className="flex gap-1 mt-2">
          {track.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="bg-[#333] text-[#ccc] px-2 py-1 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* PLAY BUTTON */}
      <div className="flex items-center">
        <button
          onClick={isPlaying ? onPause : onPlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isCurrentTrack && isPlaying
              ? 'bg-blue-600 text-white'
              : 'bg-transparent border-2 border-[#666] text-[#ccc] hover:border-blue-600'
          }`}
        >
          {isPlaying && isCurrentTrack ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </motion.div>
  );
}
