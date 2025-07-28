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
        className="bg-[#f5f5e8] border-4 border-black hover:border-red-800 transition-all duration-300 rounded-none p-6 shadow-metal zine-card"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(245, 245, 232, 0.9)"
        }}
      >
        <Link href={`/bands/${band.id}`} className="flex gap-6">
          <div className="relative">
            <img
              src={band.image}
              alt={band.name}
              className="w-24 h-24 object-cover filter grayscale contrast-200 border-2 border-black rounded-none transition-all duration-300 hover:contrast-150"
            />
            {band.verified && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-800 rounded-none border-2 border-black flex items-center justify-center">
                <FaCheck className="text-white text-xs" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wide text-black hover:text-red-800 transition-colors mb-1 font-zine-title">
                  {band.name}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 text-xs uppercase font-bold rounded-none border-2 font-zine-body ${
                    band.status === 'Active' ? 'bg-red-800 text-white border-black' : 'bg-black text-red-800 border-red-800'
                  }`}>
                    {band.status}
                  </span>
                  <span className="bg-black text-red-800 px-3 py-1 text-xs uppercase font-bold rounded-none border-2 border-red-800 font-zine-body">
                    {band.genre}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <GiSkullCrossedBones className="text-red-800" />
                  <span className="text-red-800 font-bold font-zine-title">{band.reputation}</span>
                </div>
                {band.reputation >= 900 && (
                  <div className="text-xs bg-black text-red-800 px-2 py-1 rounded-none font-bold border-2 border-red-800 font-zine-body">
                    LEGENDARY
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-black mb-3 font-zine-body">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-800" /> {band.country}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-red-800" /> {band.formedYear}
              </span>
              <span className="flex items-center gap-2">
                <FaCompactDisc className="text-red-800" /> {band.albums} albums
              </span>
              <span className="flex items-center gap-2">
                <FaHeart className="text-red-800" /> {band.followers.toLocaleString()}
              </span>
            </div>
            
            <p className="text-black mb-3 leading-relaxed font-zine-body">{band.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {band.tags.slice(0, 4).map(tag => (
                <span key={tag} className="bg-black text-red-800 px-3 py-1 text-xs uppercase rounded-none border border-red-800 font-zine-body">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="text-xs text-black flex items-center gap-1 font-zine-body">
              <FaBolt className="text-red-800" />
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
      className="bg-[#f5f5e8] border-4 border-black hover:border-red-800 transition-all duration-300 rounded-none overflow-hidden shadow-metal group zine-card"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.9)"
      }}
    >
      <Link href={`/bands/${band.id}`}>
        <div className="relative">
          <img
            src={band.image}
            alt={band.name}
            className="w-full h-56 object-cover filter grayscale contrast-200 group-hover:contrast-150 transition-all duration-500 border-b-2 border-black"
          />
          
          {/* Overlays and badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          
          <div className="absolute top-3 right-3 flex gap-2">
            {band.verified && (
              <div className="bg-red-800 text-white px-2 py-1 rounded-none text-xs font-bold flex items-center gap-1 border-2 border-black font-zine-body">
                <FaCheck /> VERIFIED
              </div>
            )}
            <span className={`px-2 py-1 text-xs uppercase font-bold rounded-none border-2 border-black font-zine-body ${
              band.status === 'Active' ? 'bg-red-800 text-white' : 'bg-black text-red-800'
            }`}>
              {band.status}
            </span>
          </div>
          
          <div className="absolute bottom-3 left-3 right-3">
            <span className="bg-black text-red-800 px-3 py-1 text-sm uppercase font-bold rounded-none backdrop-blur-sm border-2 border-red-800 font-zine-body">
              {band.genre}
            </span>
          </div>
          
          {band.reputation >= 900 && (
            <div className="absolute top-3 left-3">
              <div className="bg-black text-red-800 px-2 py-1 rounded-none text-xs font-bold flex items-center gap-1 backdrop-blur-sm border-2 border-red-800 font-zine-body">
                <GiSkullCrossedBones /> LEGENDARY
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold uppercase tracking-wide text-black group-hover:text-red-800 transition-colors font-zine-title">
              {band.name}
            </h3>
            <div className="flex items-center gap-1 text-red-800">
              <GiSkullCrossedBones className="text-sm" />
              <span className="font-bold font-zine-title">{band.reputation}</span>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-black mb-3 font-zine-body">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-red-800" /> {band.country}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-red-800" /> {band.formedYear}
            </span>
          </div>
          
          <p className="text-sm text-black mb-4 leading-relaxed line-clamp-2 font-zine-body">
            {band.description.length > 100 ? `${band.description.substring(0, 100)}...` : band.description}
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-xs text-black mb-4 font-zine-body">
            <span className="flex items-center gap-1">
              <FaCompactDisc className="text-red-800" /> {band.albums}
            </span>
            <span className="flex items-center gap-1">
              <FaUsers className="text-red-800" /> {band.members.length}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart className="text-red-800" /> {band.followers > 1000 ? `${Math.floor(band.followers/1000)}k` : band.followers}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {band.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-black text-red-800 px-2 py-1 text-xs uppercase rounded-none border border-red-800 font-zine-body">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="text-xs text-black flex items-center gap-1 font-zine-body">
            <FaBolt className="text-red-800" />
            {band.recentActivity}
          </div>
        </div>
      </Link>

      <style jsx global>{`
        .zine-card {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .shadow-metal {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(255, 0, 0, 0.2);
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

export default BandCard;
