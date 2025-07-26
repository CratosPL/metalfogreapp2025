"use client";

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaHeart, FaEye, FaCompactDisc, FaCheck, FaBolt, FaCrown, FaFire } from 'react-icons/fa';
import { GiDeathSkull, GiSkullCrossedBones, GiThorHammer } from 'react-icons/gi';
import Link from 'next/link';

interface Band {
  id: string;
  name: string;
  country: string;
  genre: string;
  formedYear: number;
  status: string;
  image: string;
  members: string[];
  albums: number;
  followers: number;
  reputation: number;
  verified: boolean;
  description: string;
  tags: string[];
  recentActivity: string;
}

interface BandCardProps {
  band: Band;
  viewMode: 'grid' | 'list';
}

const BandCard = ({ band, viewMode }: BandCardProps) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-red-600 transition-all duration-300 rounded-xl p-6 shadow-lg backdrop-blur-sm"
      >
        <Link href={`/bands/${band.id}`} className="flex gap-6">
          <div className="relative">
            <img
              src={band.image}
              alt={band.name}
              className="w-24 h-24 object-cover grayscale contrast-125 brightness-90 border-2 border-gray-600 rounded-lg transition-all duration-300 hover:grayscale-0"
              style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
            />
            {band.verified && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <FaCheck className="text-white text-xs" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-wide text-white hover:text-red-400 transition-colors mb-1">
                  {band.name}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 text-xs uppercase font-bold rounded-full ${
                    band.status === 'Active' ? 'bg-green-600/20 text-green-400 border border-green-600/50' : 'bg-red-600/20 text-red-400 border border-red-600/50'
                  }`}>
                    {band.status}
                  </span>
                  <span className="bg-red-600/20 text-red-400 px-3 py-1 text-xs uppercase font-bold rounded-full border border-red-600/50">
                    {band.genre}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <FaCrown className="text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{band.reputation}</span>
                </div>
                {band.reputation >= 900 && (
                  <div className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded font-bold">
                    LEGENDARY
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-3">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-400" /> {band.country}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-purple-400" /> {band.formedYear}
              </span>
              <span className="flex items-center gap-2">
                <FaCompactDisc className="text-green-400" /> {band.albums} albums
              </span>
              <span className="flex items-center gap-2">
                <FaHeart className="text-red-400" /> {band.followers.toLocaleString()}
              </span>
            </div>
            
            <p className="text-gray-300 mb-3 leading-relaxed">{band.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {band.tags.slice(0, 4).map(tag => (
                <span key={tag} className="bg-gray-700/50 text-gray-300 px-3 py-1 text-xs uppercase rounded-full border border-gray-600">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <FaBolt className="text-yellow-400" />
              {band.recentActivity}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-red-600 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm group"
    >
      <Link href={`/bands/${band.id}`}>
        <div className="relative">
          <img
            src={band.image}
            alt={band.name}
            className="w-full h-56 object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
            style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
          />
          
          {/* Overlays and badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          
          <div className="absolute top-3 right-3 flex gap-2">
            {band.verified && (
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <FaCheck /> VERIFIED
              </div>
            )}
            <span className={`px-2 py-1 text-xs uppercase font-bold rounded-full ${
              band.status === 'Active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {band.status}
            </span>
          </div>
          
          <div className="absolute bottom-3 left-3 right-3">
            <span className="bg-red-600/90 text-white px-3 py-1 text-sm uppercase font-bold rounded-full backdrop-blur-sm">
              {band.genre}
            </span>
          </div>
          
          {band.reputation >= 900 && (
            <div className="absolute top-3 left-3">
              <div className="bg-yellow-500/90 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                <FaCrown /> LEGENDARY
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-black uppercase tracking-wide text-white group-hover:text-red-400 transition-colors">
              {band.name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-400">
              <FaCrown className="text-sm" />
              <span className="font-bold">{band.reputation}</span>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-blue-400" /> {band.country}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-purple-400" /> {band.formedYear}
            </span>
          </div>
          
          <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2">
            {band.description.length > 100 ? `${band.description.substring(0, 100)}...` : band.description}
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <FaCompactDisc className="text-green-400" /> {band.albums}
            </span>
            <span className="flex items-center gap-1">
              <FaUsers className="text-blue-400" /> {band.members.length}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart className="text-red-400" /> {band.followers > 1000 ? `${Math.floor(band.followers/1000)}k` : band.followers}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {band.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-gray-700/50 text-gray-300 px-2 py-1 text-xs uppercase rounded border border-gray-600">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <FaBolt className="text-yellow-400" />
            {band.recentActivity}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BandCard;
