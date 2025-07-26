"use client";

import { motion } from 'framer-motion';
import { 
  FaPlay, FaPause, FaCoins, FaEye, FaHeart, FaShare,
  FaEthereum, FaBolt, FaTrophy, FaCrown, FaFire
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiSkullCrossedBones, GiFlame, GiVikingHelmet,
  GiThorHammer, GiBloodySword, GiGothicCross
} from 'react-icons/gi';

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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 10, scale: 1.02 }}
      className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 transition-all duration-300 p-6 flex gap-6 rounded-xl shadow-2xl overflow-hidden relative group ${
        isCurrentTrack ? 'border-blue-600 shadow-blue-600/20 bg-blue-600/5' : 'border-gray-600 hover:border-blue-600 hover:shadow-lg'
      }`}
    >
      {/* Animated background on current track */}
      {isCurrentTrack && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 animate-pulse"></div>
      )}

      {/* Enhanced Cover */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 group/cover">
        <img
          src={track.coverUrl}
          alt={track.album}
          className="w-full h-full object-cover rounded-lg border-2 border-gray-600 group-hover/cover:border-blue-500 transition-all duration-300"
          style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
        />
        
        {/* Enhanced play overlay */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center text-white rounded-lg opacity-0 group-hover/cover:opacity-100 transition-all duration-300 hover:bg-black/80"
        >
          <div className="bg-blue-600 hover:bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
            {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg ml-1" />}
          </div>
        </button>

        {/* Current track indicator */}
        {isCurrentTrack && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full border-2 border-gray-900 flex items-center justify-center">
            <FaBolt className="text-white text-xs animate-pulse" />
          </div>
        )}

        {/* Visual equalizer for playing track */}
        {isCurrentTrack && isPlaying && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1 bg-blue-400 rounded-full animate-bounce"
                style={{ 
                  height: '12px',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Info Section */}
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <h4 className={`font-black text-lg md:text-xl truncate transition-colors duration-300 ${
              isCurrentTrack ? 'text-blue-400' : 'text-white group-hover:text-blue-300'
            }`}>
              {track.title}
            </h4>
            <p className="text-gray-400 text-base font-bold truncate group-hover:text-gray-300 transition-colors duration-300">
              {track.artist}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
              <span>{track.album}</span>
              <span>•</span>
              <span>{track.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GiVikingHelmet className="text-xs" />
                {track.country}
              </span>
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2 ml-4">
            {/* Track badges */}
            <div className="flex items-center gap-2">
              {track.isDemo && (
                <span className="bg-blue-600/90 text-white px-3 py-1 text-xs font-black uppercase rounded-full">
                  DEMO
                </span>
              )}
              {track.verified && (
                <span className="bg-green-600/90 text-white px-3 py-1 text-xs font-black uppercase rounded-full flex items-center gap-1">
                  <FaBolt className="text-xs" /> VERIFIED
                </span>
              )}
              {track.quality && (
                <span className={`px-3 py-1 text-xs font-black uppercase rounded-full ${
                  track.quality === 'HD' ? 'bg-purple-600/90 text-white' :
                  track.quality === 'Demo' ? 'bg-orange-600/90 text-white' :
                  'bg-gray-600/90 text-white'
                }`}>
                  {track.quality}
                </span>
              )}
            </div>
            <span className="text-gray-500 text-sm font-mono">{track.duration}</span>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="flex items-center gap-6 text-sm mb-4">
          <span className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
            <FaCoins className="animate-pulse" /> 
            <span className="font-bold">{track.pricePerPlay} ETH</span>
          </span>
          <span className="flex items-center gap-2 text-blue-400">
            <FaEye /> 
            <span className="font-bold">{track.totalPlays?.toLocaleString() || '0'}</span>
          </span>
          {track.likes && (
            <span className="flex items-center gap-2 text-red-400">
              <FaHeart /> 
              <span className="font-bold">{track.likes}</span>
            </span>
          )}
          <span className="flex items-center gap-2 text-purple-400">
            <GiFlame />
            <span className="text-sm">{track.genre}</span>
          </span>
        </div>

        {/* Enhanced Tags */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {track.tags?.slice(0, 4).map((tag: string, index: number) => (
            <span 
              key={tag} 
              className="bg-gray-700/50 text-gray-300 px-3 py-1 text-xs uppercase rounded-full border border-gray-600 hover:border-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {track.tags?.length > 4 && (
            <span className="text-gray-500 text-xs flex items-center">
              +{track.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Recent activity indicator */}
        {track.recentActivity && (
          <div className="flex items-center gap-2 text-xs text-green-400">
            <FaBolt className="animate-pulse" />
            <span>{track.recentActivity}</span>
          </div>
        )}
      </div>

      {/* Enhanced Action Section */}
      <div className="flex flex-col items-center gap-3 relative z-10">
        {/* Main play button */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 group/play ${
            isCurrentTrack && isPlaying
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-600/50'
              : 'bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-gray-600 text-gray-300 hover:border-blue-600 hover:text-white hover:shadow-blue-600/30'
          }`}
        >
          <div className="relative">
            {isPlaying && isCurrentTrack ? (
              <FaPause className="text-xl" />
            ) : (
              <FaPlay className="text-xl ml-1" />
            )}
            
            {/* Play button glow effect */}
            {isCurrentTrack && isPlaying && (
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
            )}
          </div>
        </button>

        {/* Secondary actions */}
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-gray-700/50 hover:bg-red-600 border border-gray-600 hover:border-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group/heart">
            <FaHeart className="text-xs group-hover/heart:animate-pulse" />
          </button>
          <button className="w-8 h-8 bg-gray-700/50 hover:bg-green-600 border border-gray-600 hover:border-green-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
            <FaShare className="text-xs" />
          </button>
        </div>

        {/* Earnings indicator */}
        {track.earnings && (
          <div className="text-center">
            <div className="text-green-400 font-bold text-xs flex items-center gap-1">
              <FaTrophy className="text-yellow-400" />
              {track.earnings} ETH
            </div>
            <div className="text-gray-500 text-xs">earned</div>
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
    </motion.div>
  );
}
