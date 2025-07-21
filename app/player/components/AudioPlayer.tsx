// src/app/player/components/AudioPlayer.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute,
  FaHeart, FaShare, FaCoins, FaDownload
} from 'react-icons/fa';
import { GiDeathSkull } from 'react-icons/gi';
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
      // Check if payment is required
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
      <div className="bg-[#111] border-2 border-[#333] p-6 text-center">
        <GiDeathSkull className="text-4xl text-[#666] mx-auto mb-4" />
        <p className="text-[#999] uppercase">Select a track to play</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#111] border-2 border-[#333] p-6">
        {/* TRACK INFO */}
        <div className="mb-6">
          <img
            src={track.coverUrl}
            alt={track.album}
            className="w-full aspect-square object-cover grayscale contrast-125 brightness-90 mb-4"
            style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
          />
          
          <h3 className="text-lg font-bold text-[#e0e0e0] mb-1">{track.title}</h3>
          <p className="text-[#999] text-sm mb-1">{track.artist}</p>
          <p className="text-[#666] text-xs mb-2">{track.album} • {track.year}</p>
          
          {track.isDemo && (
            <span className="bg-blue-600 text-white px-2 py-1 text-xs uppercase font-bold">
              DEMO
            </span>
          )}
        </div>

        {/* AUDIO ELEMENT */}
        <audio
          ref={audioRef}
          src={track.audioUrl}
          volume={volume}
          muted={isMuted}
        />

        {/* PROGRESS BAR */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="w-full h-2 bg-[#333] appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${duration ? (currentTime / duration) * 100 : 0}%, #333 ${duration ? (currentTime / duration) * 100 : 0}%, #333 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-[#666] mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={onPrevious}
            className="text-[#ccc] hover:text-blue-400 text-xl"
          >
            <FaBackward />
          </button>
          
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          
          <button
            onClick={onNext}
            className="text-[#ccc] hover:text-blue-400 text-xl"
          >
            <FaForward />
          </button>
        </div>

        {/* VOLUME */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#ccc] hover:text-blue-400"
          >
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume * 100}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-[#333] appearance-none cursor-pointer"
          />
        </div>

        {/* PAYMENT INFO */}
        <div className="bg-[#0a0a0a] border border-[#333] p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCoins className="text-yellow-400" />
            <span className="text-sm font-bold text-[#ccc] uppercase">Payment Info</span>
          </div>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[#999]">Price per play:</span>
              <span className="text-yellow-400">{track.pricePerPlay} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999]">Artist gets:</span>
              <span className="text-green-400">{(track.pricePerPlay * 0.8).toFixed(4)} ETH (80%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999]">Total plays:</span>
              <span className="text-blue-400">{track.totalPlays.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <button className="flex-1 bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] py-2 text-xs uppercase font-bold flex items-center justify-center gap-1">
            <FaHeart /> LIKE
          </button>
          <button className="flex-1 bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] py-2 text-xs uppercase font-bold flex items-center justify-center gap-1">
            <FaShare /> SHARE
          </button>
        </div>
      </div>

      {/* PAYMENT MODAL */}
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
