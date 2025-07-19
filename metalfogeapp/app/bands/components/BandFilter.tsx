// src/app/bands/components/BandFilter.tsx
"use client";

import { motion } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface BandFilterProps {
  genres: string[];
  countries: string[];
  decades: string[];
  selectedGenre: string;
  selectedCountry: string;
  selectedDecade: string;
  onGenreChange: (genre: string) => void;
  onCountryChange: (country: string) => void;
  onDecadeChange: (decade: string) => void;
}

const BandFilter = ({
  genres,
  countries,
  decades,
  selectedGenre,
  selectedCountry,
  selectedDecade,
  onGenreChange,
  onCountryChange,
  onDecadeChange
}: BandFilterProps) => {
  const clearAllFilters = () => {
    onGenreChange('all');
    onCountryChange('all');
    onDecadeChange('all');
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-[#111] border-b-2 border-[#333] p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold uppercase tracking-wide text-[#e0e0e0] flex items-center gap-2">
            <FaFilter /> FILTER LEGIONS
          </h3>
          <button
            onClick={clearAllFilters}
            className="text-xs text-red-400 hover:text-red-300 uppercase font-bold tracking-wide"
          >
            <FaTimes className="inline mr-1" /> CLEAR ALL
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GENRE FILTER */}
          <div>
            <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase tracking-wide">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none font-mono text-sm"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          {/* COUNTRY FILTER */}
          <div>
            <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase tracking-wide">
              Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none font-mono text-sm"
            >
              {countries.map(country => (
                <option key={country} value={country}>
                  {country === 'all' ? 'All Countries' : country}
                </option>
              ))}
            </select>
          </div>

          {/* DECADE FILTER */}
          <div>
            <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase tracking-wide">
              Formed
            </label>
            <select
              value={selectedDecade}
              onChange={(e) => onDecadeChange(e.target.value)}
              className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none font-mono text-sm"
            >
              {decades.map(decade => (
                <option key={decade} value={decade}>
                  {decade === 'all' ? 'All Decades' : decade}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BandFilter;
