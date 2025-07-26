"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute,
  FaHeart, FaShare, FaCoins, FaDownload, FaEthereum, FaBolt,
  FaTrophy, FaFire, FaEye, FaCrown
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiSkullCrossedBones, GiFlame, GiVikingHelmet,
  GiThorHammer, GiBloodySword, GiGothicCross
} from 'react-icons/gi';
import PaymentModal from './PaymentModal';

interface AudioPlayerProps {
  track: any;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function AudioPlayer({ 
  track, 
  isPlaying, 
  onPlay, 
  onPause, 
  onNext, 
  onPrevious 
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [visualizer, setVisualizer] = useState<number[]>([]);

  // Enhanced visualizer effect
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const newBars = Array.from({ length: 20 }, () => Math.random() * 100);
        setVisualizer(newBars);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setVisualizer(Array(20).fill(20));
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onNext);
    };
  }, [track, onNext]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (!hasPlayedOnce && track?.pricePerPlay > 0) {
        setShowPaymentModal(true);
        return;
      }
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, track, hasPlayedOnce]);

  const handlePaymentSuccess = () => {
    setHasPlayedOnce(true);
    setShowPaymentModal(false);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!track) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-8 text-center shadow-2xl"
      >
        <GiDeathSkull className="text-6xl text-gray-600 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-gray-400 uppercase tracking-wide mb-2">
          No Track Selected
        </h3>
        <p className="text-gray-500">Choose a track from the vault to begin your journey</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm"
      >
        {/* Enhanced Track Info */}
        <div className="relative">
          <img
            src={track.coverUrl}
            alt={track.album}
            className="w-full aspect-square object-cover"
            style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
          />
          
          {/* Overlay with track info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
          
          {/* Track badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {track.isDemo && (
              <span className="bg-blue-600/90 text-white px-3 py-1 text-xs font-bold uppercase rounded-full backdrop-blur-sm">
                DEMO
              </span>
            )}
            {track.verified && (
              <span className="bg-green-600/90 text-white px-3 py-1 text-xs font-bold uppercase rounded-full backdrop-blur-sm flex items-center gap-1">
                <FaBolt className="text-xs" /> VERIFIED
              </span>
            )}
          </div>

          {/* Track quality/rarity */}
          {track.quality && (
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full backdrop-blur-sm ${
                track.quality === 'HD' ? 'bg-purple-600/90 text-white' :
                track.quality === 'Demo' ? 'bg-orange-600/90 text-white' :
                'bg-gray-600/90 text-white'
              }`}>
                {track.quality}
              </span>
            </div>
          )}

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-black text-white mb-1 drop-shadow-lg">{track.title}</h3>
            <p className="text-gray-300 text-lg font-bold mb-1 drop-shadow-lg">{track.artist}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{track.album}</span>
              <span>•</span>
              <span>{track.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaEye className="text-xs" />
                {track.totalPlays?.toLocaleString() || '0'} plays
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={track.audioUrl}
            volume={volume}
            muted={isMuted}
          />

          {/* Enhanced Visualizer */}
          <div className="mb-6">
            <div className="flex items-end justify-center gap-1 h-16 bg-gray-900/50 rounded-lg p-2 border border-gray-700">
              {visualizer.map((height, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"
                  style={{ 
                    width: '4px',
                    height: `${Math.max(height, 10)}%`,
                  }}
                  animate={{ 
                    height: isPlaying ? `${Math.max(height, 10)}%` : '10%',
                    opacity: isPlaying ? [0.7, 1, 0.7] : 0.3
                  }}
                  transition={{ 
                    duration: 0.1,
                    opacity: { duration: 0.5, repeat: Infinity }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer hover:bg-gray-600 transition-colors duration-300"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${duration ? (currentTime / duration) * 100 : 0}%, #374151 ${duration ? (currentTime / duration) * 100 : 0}%, #374151 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span className="font-mono">{formatTime(currentTime)}</span>
              <span className="font-mono">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Enhanced Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrevious}
              className="text-gray-400 hover:text-blue-400 text-2xl transition-colors duration-300"
            >
              <FaBackward />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isPlaying ? onPause : onPlay}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-blue-600/50 transition-all duration-300"
            >
              {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="text-gray-400 hover:text-blue-400 text-2xl transition-colors duration-300"
            >
              <FaForward />
            </motion.button>
          </div>

          {/* Enhanced Volume Control */}
          <div className="flex items-center gap-3 mb-6 bg-gray-900/50 border border-gray-700 rounded-lg p-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            </motion.button>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${isMuted ? 0 : volume * 100}%, #374151 ${isMuted ? 0 : volume * 100}%, #374151 100%)`
                }}
              />
            </div>
            <span className="text-xs text-gray-500 font-mono w-8">
              {Math.round(isMuted ? 0 : volume * 100)}
            </span>
          </div>

          {/* Enhanced Payment Info */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-2 border-yellow-600/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FaCoins className="text-yellow-400 text-lg" />
              <span className="text-lg font-bold text-white uppercase tracking-wide">Payment Info</span>
              <FaEthereum className="text-blue-400" />
            </div>
            
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-gray-900/50 rounded">
                <span className="text-gray-300 flex items-center gap-1">
                  <FaBolt className="text-yellow-400 text-xs" />
                  Price per play:
                </span>
                <span className="text-yellow-400 font-bold">{track.pricePerPlay} ETH</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-gray-900/50 rounded">
                <span className="text-gray-300 flex items-center gap-1">
                  <GiThorHammer className="text-green-400 text-xs" />
                  Artist gets (80%):
                </span>
                <span className="text-green-400 font-bold">{(track.pricePerPlay * 0.8).toFixed(4)} ETH</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-gray-900/50 rounded">
                <span className="text-gray-300 flex items-center gap-1">
                  <FaFire className="text-orange-400 text-xs" />
                  Total plays:
                </span>
                <span className="text-blue-400 font-bold">{track.totalPlays?.toLocaleString() || '0'}</span>
              </div>

              {track.earnings && (
                <div className="flex justify-between items-center p-2 bg-green-600/20 rounded border border-green-600/50">
                  <span className="text-gray-300 flex items-center gap-1">
                    <FaTrophy className="text-green-400 text-xs" />
                    Artist earned:
                  </span>
                  <span className="text-green-400 font-bold">{track.earnings.toFixed(3)} ETH</span>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Actions */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`py-3 text-sm font-bold uppercase tracking-wide rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isLiked 
                  ? 'bg-red-600 hover:bg-red-700 text-white border-2 border-red-600' 
                  : 'bg-transparent border-2 border-gray-500 text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white'
              }`}
            >
              <FaHeart className={isLiked ? 'animate-pulse' : ''} /> 
              {isLiked ? 'LIKED' : 'LIKE'}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border-2 border-gray-500 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white py-3 text-sm font-bold uppercase tracking-wide rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaShare /> SHARE
            </motion.button>
          </div>

          {/* Additional track info */}
          {track.description && (
            <div className="mt-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase flex items-center gap-1">
                <GiGothicCross className="text-purple-400" />
                Track Description
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">{track.description}</p>
            </div>
          )}

          {/* Tags */}
          {track.tags && track.tags.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {track.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="bg-gray-700/50 text-gray-300 px-2 py-1 text-xs uppercase rounded border border-gray-600 hover:border-blue-600 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Enhanced Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          track={track}
          onSuccess={handlePaymentSuccess}
          onClose={() => {
            setShowPaymentModal(false);
            onPause();
          }}
        />
      )}
    </>
  );
}
