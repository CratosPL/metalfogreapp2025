"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUpload, FaMusic, FaImage, FaCoins, FaInfo, FaTags,
  FaEthereum, FaBolt, FaTrophy, FaShieldAlt, FaCheckCircle,
  FaCrown, FaFileAudio, FaCalculator, FaRocket
} from 'react-icons/fa';
import { 
  GiThorHammer, GiDeathSkull, GiSkullCrossedBones, GiFlame,
  GiWolfHead, GiVikingHelmet, GiBattleAxe, GiGothicCross,
  GiBloodySword, GiDragonHead
} from 'react-icons/gi';
import Link from 'next/link';

export default function UploadPage() {
  const [uploadForm, setUploadForm] = useState({
    title: '',
    artist: '',
    album: '',
    genre: 'Black Metal',
    year: new Date().getFullYear(),
    country: '',
    duration: '',
    pricePerPlay: 0.001,
    description: '',
    tags: '',
    isDemo: false,
    isExclusive: false,
    audioFile: null as File | null,
    coverFile: null as File | null
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const genres = [
    'Black Metal', 'Death Metal', 'Doom Metal', 'Thrash Metal',
    'Atmospheric Black Metal', 'Progressive Metal', 'Grindcore',
    'Symphonic Black Metal', 'Viking Metal', 'Folk Metal',
    'Technical Death Metal', 'Post-Black Metal'
  ];

  const countries = [
    'Norway', 'Sweden', 'Finland', 'Poland', 'Germany', 'USA',
    'United Kingdom', 'France', 'Netherlands', 'Denmark', 'Iceland',
    'Canada', 'Australia', 'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setCurrentStep(1);
    
    // Enhanced upload simulation with steps
    const steps = [
      'Processing audio file...',
      'Generating waveform...',
      'Uploading to IPFS...',
      'Creating blockchain metadata...',
      'Deploying smart contract...',
      'Finalizing on Optimism...'
    ];
    
    for (let i = 0; i <= 100; i += 16.67) {
      setUploadProgress(i);
      setCurrentStep(Math.floor(i / 16.67) + 1);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsUploading(false);
    alert('🎵 Track uploaded successfully to the Demo Vault!\n\n' +
          `✅ Smart contract deployed on Optimism\n` +
          `🔥 Earning potential: ${(uploadForm.pricePerPlay * 1000).toFixed(3)} ETH per 1K streams\n` +
          `⚡ Now live in the underground!`);
  };

  const calculateEarnings = (streams: number) => {
    const total = streams * uploadForm.pricePerPlay;
    const artistShare = total * 0.8;
    return {
      total: total.toFixed(4),
      artist: artistShare.toFixed(4),
      usd: (artistShare * 2400).toFixed(0)
    };
  };

  const steps = [
    { step: 1, title: 'Track Info', icon: FaMusic, active: true },
    { step: 2, title: 'Files & Media', icon: FaUpload, active: false },
    { step: 3, title: 'Monetization', icon: FaCoins, active: false },
    { step: 4, title: 'Publish', icon: FaRocket, active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter overflow-x-hidden">
      
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="animate-pulse text-6xl text-blue-300 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>ᚦ</div>
        <div className="animate-pulse text-5xl text-red-300 absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>ᚱ</div>
        <div className="animate-pulse text-4xl text-yellow-300 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>ᚠ</div>
        <div className="animate-pulse text-5xl text-purple-300 absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '9s', animationDelay: '6s' }}>ᚹ</div>
      </div>

      {/* ENHANCED HEADER */}
      <header className="bg-gradient-to-b from-gray-800 to-gray-900 border-b-4 border-blue-600 p-8 relative z-10 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className={`relative transition-all duration-300 ${glitchActive ? 'filter brightness-125 saturate-150' : ''}`}>
              <GiThorHammer className="text-6xl md:text-7xl text-blue-500 drop-shadow-2xl" />
              {glitchActive && (
                <GiThorHammer className="absolute top-0 left-0 text-6xl md:text-7xl text-blue-400 animate-ping opacity-30" />
              )}
            </div>
            <div>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest text-white mb-2 ${glitchActive ? 'animate-pulse text-blue-100' : ''}`}
                  style={{
                    textShadow: glitchActive 
                      ? '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.5)' 
                      : '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(59, 130, 246, 0.3)'
                  }}>
                UPLOAD TO VAULT
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-gray-400 text-xl uppercase tracking-wide flex items-center gap-2">
                  <GiSkullCrossedBones className="text-blue-500" />
                  Share Underground Music • Earn Crypto Instantly
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold border border-blue-600/50">
                    80% Artist Revenue
                  </span>
                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-600/50 flex items-center gap-1">
                    <FaEthereum className="text-xs" />
                    Optimism Network
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
              {steps.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    step.active ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    <step.icon className="text-lg" />
                    <span className="font-bold text-sm">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-600 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ENHANCED UPLOAD FORM */}
      <main className="max-w-6xl mx-auto p-6 relative z-10">
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          
          {/* ENHANCED BASIC INFO */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-8 shadow-2xl backdrop-blur-sm"
          >
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wide flex items-center gap-3">
              <FaMusic className="text-blue-400" />
              TRACK INFORMATION
              <GiFlame className="text-red-500" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Track Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium transition-all duration-300"
                  placeholder="e.g., Freezing Moon of Eternal Darkness"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Artist/Band</label>
                <input
                  type="text"
                  value={uploadForm.artist}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, artist: e.target.value }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium transition-all duration-300"
                  placeholder="e.g., SHADOW WOLF"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Album/EP</label>
                <input
                  type="text"
                  value={uploadForm.album}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, album: e.target.value }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium transition-all duration-300"
                  placeholder="e.g., Underground Demos 2025"
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Genre</label>
                <select
                  value={uploadForm.genre}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium transition-all duration-300"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre} className="bg-gray-900">{genre}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Year</label>
                <input
                  type="number"
                  value={uploadForm.year}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium transition-all duration-300"
                  min="1980"
                  max={new Date().getFullYear()}
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Country</label>
                <select
                  value={uploadForm.country}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium transition-all duration-300"
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country} className="bg-gray-900">{country}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 bg-gray-900/50 border-2 border-gray-700 rounded-lg hover:border-blue-600 transition-colors duration-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uploadForm.isDemo}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, isDemo: e.target.checked }))}
                  className="w-5 h-5 text-blue-600"
                />
                <GiVikingHelmet className="text-yellow-400 text-xl" />
                <span className="text-white font-bold">This is a demo recording</span>
              </label>
              
              <label className="flex items-center gap-3 p-4 bg-gray-900/50 border-2 border-gray-700 rounded-lg hover:border-purple-600 transition-colors duration-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uploadForm.isExclusive}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, isExclusive: e.target.checked }))}
                  className="w-5 h-5 text-purple-600"
                />
                <FaCrown className="text-purple-400 text-xl" />
                <span className="text-white font-bold">Exclusive release</span>
              </label>
            </div>
          </motion.div>

          {/* ENHANCED FILES SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-8 shadow-2xl backdrop-blur-sm"
          >
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wide flex items-center gap-3">
              <FaUpload className="text-green-400" />
              FILES & MEDIA
              <GiBattleAxe className="text-red-500" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-4 uppercase flex items-center gap-2">
                  <FaFileAudio className="text-blue-400" />
                  Audio File
                </label>
                <div className="border-2 border-dashed border-gray-600 hover:border-blue-500 rounded-xl p-8 text-center transition-all duration-300 bg-gray-900/50">
                  <FaMusic className="text-6xl text-blue-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-300 mb-4 text-lg">Drop your audio file here or click to browse</p>
                  <input
                    type="file"
                    accept=".mp3,.wav,.flac"
                    onChange={(e) => setUploadForm(prev => ({ ...prev, audioFile: e.target.files?.[0] || null }))}
                    className="hidden"
                    id="audio-file"
                    required
                  />
                  <label
                    htmlFor="audio-file"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer inline-block font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
                  >
                    Choose Audio File
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Supported: MP3, WAV, FLAC • Max size: 50MB
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-4 uppercase flex items-center gap-2">
                  <FaImage className="text-purple-400" />
                  Cover Art
                </label>
                <div className="border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-xl p-8 text-center transition-all duration-300 bg-gray-900/50">
                  <FaImage className="text-6xl text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-4 text-lg">Upload your album artwork</p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => setUploadForm(prev => ({ ...prev, coverFile: e.target.files?.[0] || null }))}
                    className="hidden"
                    id="cover-file"
                  />
                  <label
                    htmlFor="cover-file"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg cursor-pointer inline-block font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
                  >
                    Choose Artwork
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Recommended: 1000x1000px • JPG, PNG
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ENHANCED PRICING SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-xl p-8 shadow-2xl backdrop-blur-sm"
          >
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wide flex items-center gap-3">
              <FaCoins className="text-yellow-400" />
              MONETIZATION & EARNINGS
              <GiDragonHead className="text-red-500" />
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-4 uppercase flex items-center gap-2">
                  <FaCalculator className="text-green-400" />
                  Price per Play (ETH)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={uploadForm.pricePerPlay}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, pricePerPlay: parseFloat(e.target.value) }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-yellow-500 focus:border-yellow-500 text-white rounded-lg outline-none font-medium text-lg transition-all duration-300"
                  min="0.0001"
                />
                
                <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-2 border-yellow-600/50 rounded-lg p-6 mt-6">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <FaBolt className="text-yellow-400" />
                    Revenue Split Breakdown
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                      <span className="text-gray-300">You receive (80%):</span>
                      <span className="text-green-400 font-bold text-lg">{(uploadForm.pricePerPlay * 0.8).toFixed(4)} ETH</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                      <span className="text-gray-300">Platform fee (20%):</span>
                      <span className="text-gray-500 font-bold">{(uploadForm.pricePerPlay * 0.2).toFixed(4)} ETH</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-600/20 rounded border border-blue-600/50">
                      <span className="text-blue-300">Paid instantly via smart contract</span>
                      <FaShieldAlt className="text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-4 uppercase flex items-center gap-2">
                  <FaTrophy className="text-yellow-400" />
                  Earnings Calculator
                </h4>
                
                <div className="space-y-4">
                  {[
                    { streams: 100, label: 'First 100 streams' },
                    { streams: 1000, label: '1K streams milestone' },
                    { streams: 10000, label: '10K streams goal' }
                  ].map(scenario => {
                    const earnings = calculateEarnings(scenario.streams);
                    return (
                      <div key={scenario.streams} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-yellow-600/50 transition-colors duration-300">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-bold">{scenario.label}</span>
                          <div className="text-right">
                            <div className="text-green-400 font-bold">{earnings.artist} ETH</div>
                            <div className="text-gray-500 text-sm">${earnings.usd} USD</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min((scenario.streams / 10000) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-green-600/20 border border-green-600/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaBolt className="text-green-400" />
                    <span className="text-green-400 font-bold">Instant Payouts</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Earnings are automatically distributed to your wallet after each stream via Optimism smart contracts.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ENHANCED DESCRIPTION & TAGS */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-8 shadow-2xl backdrop-blur-sm"
          >
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wide flex items-center gap-3">
              <FaInfo className="text-purple-400" />
              DESCRIPTION & METADATA
              <GiGothicCross className="text-red-500" />
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Track Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-purple-500 focus:border-purple-500 text-white rounded-lg outline-none resize-none font-medium transition-all duration-300"
                  placeholder="Tell the story behind your track... Recording process, inspiration, underground origins, or anything that makes it special to the metal community."
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase flex items-center gap-2">
                  <FaTags className="text-orange-400" />
                  Tags & Keywords
                </label>
                <input
                  type="text"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-orange-500 focus:border-orange-500 text-white rounded-lg outline-none font-medium transition-all duration-300"
                  placeholder="atmospheric, raw, underground, demo, kvlt, brutal, melodic (separated by commas)"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Good tags help metalheads discover your music. Use genre-specific terms that describe the mood and style.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ENHANCED UPLOAD PROGRESS */}
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-blue-800 to-blue-900 border-2 border-blue-600 rounded-xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                <FaRocket className="text-blue-400 animate-bounce" />
                FORGING YOUR TRACK...
                <GiFlame className="text-orange-400 animate-pulse" />
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-300 font-bold">
                    Step {currentStep}/6: {['Processing audio', 'Generating waveform', 'Uploading to IPFS', 'Creating metadata', 'Deploying contract', 'Finalizing'][currentStep - 1]}
                  </span>
                  <span className="text-white font-bold">{uploadProgress.toFixed(0)}%</span>
                </div>
                
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-green-400" />
                    <span className="text-gray-300">Smart contract deployment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEthereum className="text-blue-400" />
                    <span className="text-gray-300">Optimism network</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ENHANCED SUBMIT BUTTONS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button
              type="button"
              className="flex-1 bg-transparent border-2 border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 hover:text-white py-4 text-lg font-bold uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105"
            >
              Save as Draft
            </button>
            
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 text-lg font-bold uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed shadow-2xl hover:shadow-blue-600/50 flex items-center justify-center gap-3"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  UPLOADING TO VAULT...
                </>
              ) : (
                <>
                  <GiThorHammer className="text-2xl" />
                  FORGE & UPLOAD
                  <FaBolt className="text-yellow-400" />
                </>
              )}
            </button>
            
            <Link
              href="/player"
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-bold uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-center flex items-center justify-center gap-3"
            >
              <FaMusic />
              BACK TO VAULT
            </Link>
          </motion.div>
        </motion.form>
      </main>

      {/* ENHANCED FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-blue-600 p-8 mt-16 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            {[GiDeathSkull, GiThorHammer, GiVikingHelmet, GiGothicCross, GiSkullCrossedBones].map((Icon, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.2, rotate: 15 }} 
                className="cursor-pointer"
              >
                <Icon className="text-3xl text-gray-600 hover:text-blue-500 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">
            UPLOAD TO DEMO VAULT
          </h3>
          <p className="text-gray-400 uppercase tracking-wider mb-4">
            Share Underground Music • Earn Crypto • Build Legacy
          </p>
          <p className="text-gray-600 text-sm">
            Instant payouts • 80% artist revenue • Powered by Optimism blockchain
          </p>
        </div>
      </footer>
    </div>
  );
}
