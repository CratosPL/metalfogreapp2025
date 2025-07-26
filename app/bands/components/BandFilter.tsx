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
      className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-b-2 border-gray-600 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <GiSkullCrossedBones className="text-6xl text-red-600 absolute top-4 right-10 transform rotate-12" />
        <GiCrossedSwords className="text-5xl text-blue-600 absolute bottom-4 left-10 transform -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black uppercase tracking-wide text-white flex items-center gap-3"
          >
            <FaFilter className="text-red-500" /> 
            FILTER LEGIONS
            {hasActiveFilters && (
              <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                ACTIVE
              </span>
            )}
          </motion.h3>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={clearAllFilters}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 shadow-lg"
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
            <label className="block text-lg font-bold text-gray-300 uppercase tracking-wide flex items-center gap-2">
              <GiCrossedSwords className="text-red-500" />
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-red-500 focus:border-red-500 text-white rounded-lg outline-none font-medium transition-all duration-300 shadow-lg"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="bg-gray-800">
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
            {selectedGenre !== 'all' && (
              <div className="text-sm text-green-400 flex items-center gap-1">
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
            <label className="block text-lg font-bold text-gray-300 uppercase tracking-wide flex items-center gap-2">
              <GiSkullCrossedBones className="text-blue-500" />
              Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none font-medium transition-all duration-300 shadow-lg"
            >
              {countries.map(country => (
                <option key={country} value={country} className="bg-gray-800">
                  {country === 'all' ? 'All Countries' : country}
                </option>
              ))}
            </select>
            {selectedCountry !== 'all' && (
              <div className="text-sm text-green-400 flex items-center gap-1">
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
            <label className="block text-lg font-bold text-gray-300 uppercase tracking-wide flex items-center gap-2">
              <FaFilter className="text-yellow-500" />
              Era Formed
            </label>
            <select
              value={selectedDecade}
              onChange={(e) => onDecadeChange(e.target.value)}
              className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-yellow-500 focus:border-yellow-500 text-white rounded-lg outline-none font-medium transition-all duration-300 shadow-lg"
            >
              {decades.map(decade => (
                <option key={decade} value={decade} className="bg-gray-800">
                  {decade === 'all' ? 'All Decades' : decade}
                </option>
              ))}
            </select>
            {selectedDecade !== 'all' && (
              <div className="text-sm text-green-400 flex items-center gap-1">
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
            className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600"
          >
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <FaBolt className="text-yellow-400" />
              Active Filters:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedGenre !== 'all' && (
                <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-600/50">
                  Genre: {selectedGenre}
                </span>
              )}
              {selectedCountry !== 'all' && (
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold border border-blue-600/50">
                  Country: {selectedCountry}
                </span>
              )}
              {selectedDecade !== 'all' && (
                <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold border border-yellow-600/50">
                  Era: {selectedDecade}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BandFilter;
