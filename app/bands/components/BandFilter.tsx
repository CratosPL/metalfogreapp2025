"use client";

import { motion } from 'framer-motion';
import { FaFilter, FaTimes, FaBolt } from 'react-icons/fa';
import { GiCrossedSwords, GiSkullCrossedBones } from 'react-icons/gi';

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

  const hasActiveFilters = selectedGenre !== 'all' || selectedCountry !== 'all' || selectedDecade !== 'all';

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#e0e0d8] border-b-4 border-black relative overflow-hidden zine-section"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(224, 224, 216, 0.95)"
      }}
    >
      {/* Background Effects - Decorative skulls */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-800 absolute top-4 right-10 transform rotate-12">☠</div>
        <div className="animate-pulse text-5xl text-black absolute bottom-4 left-10 transform -rotate-12">☠</div>
      </div>

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold uppercase tracking-wide text-black flex items-center gap-3 font-zine-title"
          >
            <FaFilter className="text-red-800" /> 
            FILTER LEGIONS
            {hasActiveFilters && (
              <span className="bg-red-800 text-white px-3 py-1 rounded-none text-sm font-bold border-2 border-black font-zine-body">
                ACTIVE
              </span>
            )}
          </motion.h3>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={clearAllFilters}
            className="skull-button text-[#d0d0d0] px-6 py-2 rounded-none font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 shadow-metal font-zine-body"
          >
            <FaTimes /> CLEAR ALL
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Genre Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <label className="block text-lg font-bold text-black uppercase tracking-wide flex items-center gap-2 font-zine-title">
              <GiCrossedSwords className="text-red-800" />
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="w-full p-4 bg-[#f5f5e8] border-2 border-black hover:border-red-800 focus:border-red-800 text-black rounded-none outline-none font-medium transition-all duration-300 shadow-metal zine-card font-zine-body"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="bg-[#f5f5e8] text-black">
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
            {selectedGenre !== 'all' && (
              <div className="text-sm text-red-800 flex items-center gap-1 font-zine-body">
                <FaBolt /> Active filter: {selectedGenre}
              </div>
            )}
          </motion.div>

          {/* Country Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <label className="block text-lg font-bold text-black uppercase tracking-wide flex items-center gap-2 font-zine-title">
              <GiSkullCrossedBones className="text-red-800" />
              Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full p-4 bg-[#f5f5e8] border-2 border-black hover:border-red-800 focus:border-red-800 text-black rounded-none outline-none font-medium transition-all duration-300 shadow-metal zine-card font-zine-body"
            >
              {countries.map(country => (
                <option key={country} value={country} className="bg-[#f5f5e8] text-black">
                  {country === 'all' ? 'All Countries' : country}
                </option>
              ))}
            </select>
            {selectedCountry !== 'all' && (
              <div className="text-sm text-red-800 flex items-center gap-1 font-zine-body">
                <FaBolt /> Active filter: {selectedCountry}
              </div>
            )}
          </motion.div>

          {/* Decade Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <label className="block text-lg font-bold text-black uppercase tracking-wide flex items-center gap-2 font-zine-title">
              <FaFilter className="text-red-800" />
              Era Formed
            </label>
            <select
              value={selectedDecade}
              onChange={(e) => onDecadeChange(e.target.value)}
              className="w-full p-4 bg-[#f5f5e8] border-2 border-black hover:border-red-800 focus:border-red-800 text-black rounded-none outline-none font-medium transition-all duration-300 shadow-metal zine-card font-zine-body"
            >
              {decades.map(decade => (
                <option key={decade} value={decade} className="bg-[#f5f5e8] text-black">
                  {decade === 'all' ? 'All Decades' : decade}
                </option>
              ))}
            </select>
            {selectedDecade !== 'all' && (
              <div className="text-sm text-red-800 flex items-center gap-1 font-zine-body">
                <FaBolt /> Active filter: {selectedDecade}
              </div>
            )}
          </motion.div>
        </div>

        {/* Filter Summary */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 bg-[#f5f5e8] rounded-none border-2 border-black zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <h4 className="text-black font-bold mb-2 flex items-center gap-2 font-zine-title uppercase">
              <FaBolt className="text-red-800" />
              Active Filters:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedGenre !== 'all' && (
                <span className="bg-red-800 text-white px-3 py-1 rounded-none text-sm font-bold border-2 border-black font-zine-body">
                  Genre: {selectedGenre}
                </span>
              )}
              {selectedCountry !== 'all' && (
                <span className="bg-black text-red-800 px-3 py-1 rounded-none text-sm font-bold border-2 border-red-800 font-zine-body">
                  Country: {selectedCountry}
                </span>
              )}
              {selectedDecade !== 'all' && (
                <span className="bg-red-800 text-white px-3 py-1 rounded-none text-sm font-bold border-2 border-black font-zine-body">
                  Era: {selectedDecade}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .zine-section {
          border-image: url("/images/zine/jagged_border.png") 30 round;
        }
        
        .zine-card {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .shadow-metal {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(255, 0, 0, 0.2);
        }
        
        .skull-button {
          background: linear-gradient(to right, #b71c1c, #000000);
          border: 2px solid #ff0000;
          box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
        }

        .skull-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 0, 0, 0.5);
          filter: brightness(1.2);
        }
        
        .font-zine-title {
          font-family: "Blackletter", serif;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .font-zine-body {
          font-family: "Special Elite", monospace;
        }
      `}</style>
    </motion.div>
  );
};

export default BandFilter;
