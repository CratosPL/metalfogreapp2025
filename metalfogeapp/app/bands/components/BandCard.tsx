// src/app/bands/components/BandCard.tsx
"use client";

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaHeart, FaEye, FaCompactDisc } from 'react-icons/fa';
import { GiDeathSkull } from 'react-icons/gi';
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
  description: string;
  tags: string[];
}

interface BandCardProps {
  band: Band;
  viewMode: 'grid' | 'list';
}

const BandCard = ({ band, viewMode }: BandCardProps) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-[#111] border-2 border-[#333] hover:border-red-600 transition-colors p-4"
      >
        <Link href={`/bands/${band.id}`} className="flex gap-4">
          <img
            src={band.image}
            alt={band.name}
            className="w-20 h-20 object-cover grayscale contrast-125 brightness-90 border-2 border-[#333]"
            style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-black uppercase tracking-wide text-[#e0e0e0] hover:text-red-400 transition-colors">
                {band.name}
              </h3>
              <span className={`px-2 py-1 text-xs uppercase font-bold ${
                band.status === 'Active' ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'
              }`}>
                {band.status}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-[#999] mb-2">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt /> {band.country}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {band.formedYear}
              </span>
              <span className="flex items-center gap-1">
                <FaCompactDisc /> {band.albums} albums
              </span>
              <span className="flex items-center gap-1">
                <FaHeart /> {band.followers}
              </span>
            </div>
            <p className="text-sm text-[#ccc] mb-2">{band.description}</p>
            <div className="flex gap-2">
              <span className="bg-red-800 text-red-200 px-2 py-1 text-xs uppercase font-bold">
                {band.genre}
              </span>
              {band.tags.slice(0, 2).map(tag => (
                <span key={tag} className="bg-[#333] text-[#ccc] px-2 py-1 text-xs uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#111] border-2 border-[#333] hover:border-red-600 transition-colors"
    >
      <Link href={`/bands/${band.id}`}>
        <div className="relative">
          <img
            src={band.image}
            alt={band.name}
            className="w-full h-48 object-cover grayscale contrast-125 brightness-90"
            style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs uppercase font-bold ${
              band.status === 'Active' ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'
            }`}>
              {band.status}
            </span>
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="bg-red-800 text-red-200 px-2 py-1 text-xs uppercase font-bold">
              {band.genre}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-black uppercase tracking-wide text-[#e0e0e0] hover:text-red-400 transition-colors mb-2">
            {band.name}
          </h3>
          
          <div className="flex justify-between text-xs text-[#999] mb-3">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt /> {band.country}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> {band.formedYear}
            </span>
          </div>
          
          <p className="text-sm text-[#ccc] mb-3 leading-tight">
            {band.description.length > 80 ? `${band.description.substring(0, 80)}...` : band.description}
          </p>
          
          <div className="flex justify-between items-center text-xs">
            <div className="flex gap-3">
              <span className="flex items-center gap-1 text-[#999]">
                <FaCompactDisc /> {band.albums}
              </span>
              <span className="flex items-center gap-1 text-[#999]">
                <FaUsers /> {band.members.length}
              </span>
              <span className="flex items-center gap-1 text-[#999]">
                <FaHeart /> {band.followers}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {band.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-[#333] text-[#ccc] px-2 py-1 text-xs uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BandCard;
