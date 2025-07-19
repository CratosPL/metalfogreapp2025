// src/app/player/upload/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUpload, FaMusic, FaImage, FaCoins, FaInfo, FaTags
} from 'react-icons/fa';
import { GiThorHammer, GiDeathSkull } from 'react-icons/gi';

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
    audioFile: null as File | null,
    coverFile: null as File | null
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const genres = [
    'Black Metal', 'Death Metal', 'Doom Metal', 'Thrash Metal',
    'Atmospheric Black Metal', 'Progressive Metal', 'Grindcore'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsUploading(false);
    alert('Track uploaded successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <GiThorHammer className="text-4xl text-blue-400" />
            <div>
              <h1
                className="text-3xl md:text-4xl font-black uppercase tracking-widest text-[#e0e0e0]"
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  textShadow: '2px 2px 0 #333, 4px 4px 0 #666'
                }}
              >
                UPLOAD DEMO
              </h1>
              <p className="text-[#999] text-sm uppercase tracking-wide">
                Share Your Underground Music • Earn Crypto
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* UPLOAD FORM */}
      <main className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* BASIC INFO */}
          <div className="bg-[#111] border-2 border-[#333] p-6">
            <h2 className="text-xl font-bold text-[#ccc] mb-4 uppercase flex items-center gap-2">
              <FaMusic /> Track Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Track Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                  placeholder="e.g., Freezing Moon"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Artist/Band</label>
                <input
                  type="text"
                  value={uploadForm.artist}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, artist: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                  placeholder="e.g., MAYHEM"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Album/EP</label>
                <input
                  type="text"
                  value={uploadForm.album}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, album: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                  placeholder="e.g., Demo 2025"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Genre</label>
                <select
                  value={uploadForm.genre}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Year</label>
                <input
                  type="number"
                  value={uploadForm.year}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                  min="1980"
                  max={new Date().getFullYear()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Country</label>
                <input
                  type="text"
                  value={uploadForm.country}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                  placeholder="e.g., Norway"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={uploadForm.isDemo}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, isDemo: e.target.checked }))}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#ccc]">This is a demo recording</span>
              </label>
            </div>
          </div>

          {/* FILES */}
          <div className="bg-[#111] border-2 border-[#333] p-6">
            <h2 className="text-xl font-bold text-[#ccc] mb-4 uppercase flex items-center gap-2">
              <FaUpload /> Files
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Audio File</label>
                <input
                  type="file"
                  accept=".mp3,.wav,.flac"
                  onChange={(e) => setUploadForm(prev => ({ ...prev, audioFile: e.target.files?.[0] || null }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                  required
                />
                <p className="text-xs text-[#666] mt-1">Supported: MP3, WAV, FLAC (max 50MB)</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Cover Art</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setUploadForm(prev => ({ ...prev, coverFile: e.target.files?.[0] || null }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                />
                <p className="text-xs text-[#666] mt-1">Recommended: 1000x1000px, JPG/PNG</p>
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div className="bg-[#111] border-2 border-[#333] p-6">
            <h2 className="text-xl font-bold text-[#ccc] mb-4 uppercase flex items-center gap-2">
              <FaCoins /> Pricing & Monetization
            </h2>
            
            <div>
              <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Price per Play (ETH)</label>
              <input
                type="number"
                step="0.0001"
                value={uploadForm.pricePerPlay}
                onChange={(e) => setUploadForm(prev => ({ ...prev, pricePerPlay: parseFloat(e.target.value) }))}
                className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                min="0"
              />
              <div className="bg-[#0a0a0a] border border-[#333] p-3 mt-2">
                <p className="text-xs text-[#ccc] mb-1">Revenue Split:</p>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#999]">You receive (80%):</span>
                    <span className="text-green-400">{(uploadForm.pricePerPlay * 0.8).toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#999]">Platform fee (20%):</span>
                    <span className="text-[#666]">{(uploadForm.pricePerPlay * 0.2).toFixed(4)} ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION & TAGS */}
          <div className="bg-[#111] border-2 border-[#333] p-6">
            <h2 className="text-xl font-bold text-[#ccc] mb-4 uppercase flex items-center gap-2">
              <FaInfo /> Description & Tags
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none resize-none"
                  placeholder="Describe your track, recording process, inspiration..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Tags</label>
                <input
                  type="text"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-blue-600 focus:outline-none"
                  placeholder="atmospheric, raw, underground, demo (separated by commas)"
                />
              </div>
            </div>
          </div>

          {/* UPLOAD PROGRESS */}
          {isUploading && (
            <div className="bg-[#111] border-2 border-[#333] p-6">
              <h3 className="text-lg font-bold text-[#ccc] mb-4 uppercase">Uploading...</h3>
              <div className="w-full bg-[#333] h-4 mb-2">
                <div 
                  className="bg-blue-600 h-4 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-[#999]">{uploadProgress}% complete</p>
            </div>
          )}

          {/* SUBMIT */}
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 bg-transparent border-2 border-[#666] text-[#ccc] hover:bg-[#222] py-3 uppercase font-bold tracking-wide"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 uppercase font-bold tracking-wide disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Track'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
