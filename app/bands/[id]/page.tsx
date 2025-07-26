"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaCompactDisc, FaMusic, FaStar, FaPen, FaHeart, FaShare,
  FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaCommentDots,
  FaEthereum, FaBolt, FaFire, FaCrown, FaTrophy, FaEye
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCrossedSwords, GiDragonHead, GiWolfHead,
  GiThorHammer, GiCoffin, GiGhost, GiScrollQuill, GiSkullCrossedBones,
  GiVikingHelmet, GiGothicCross, GiBloodySword, GiBattleAxe,
  GiFlame, GiBlackFlag, GiCrown  // <-- Dodaj tę ikonę
} from 'react-icons/gi';

import Link from 'next/link';

// Enhanced mock data
const bandDetails = {
  id: '1',
  name: 'DARKTHRONE',
  country: 'Norway',
  genre: 'Black Metal',
  formedYear: 1986,
  status: 'Active',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
  logo: '/images/darkthrone-logo.png',
  followers: 15420,
  reputation: 950,
  verified: true,
  addedBy: 'DEATH_SCRIBE',
  addedDate: '2023-03-15',
  description: 'Norwegian black metal pioneers who helped define the genre in the early 90s. Known for their raw, unpolished sound and uncompromising underground ethos.',
  tags: ['Black Metal', 'Norwegian', 'Underground', 'Cult', 'Raw', 'KVLT'],
  biography: `Darkthrone was formed in late 1986 in Kolbotn, a small town south of Oslo, Norway. They were originally a death metal band named Black Death, but after Fenriz got more involved with the black metal scene, the band changed their style and name.
  
Their first three black metal albums, "A Blaze in the Northern Sky" (1992), "Under a Funeral Moon" (1993), and "Transilvanian Hunger" (1994), are often referred to as the "unholy trinity" and are considered classics of the genre. These albums were characterized by their raw, lo-fi production and grim, cold atmosphere.

Over the years, Darkthrone's style has evolved, incorporating elements of punk rock, traditional heavy metal, and speed metal, while always maintaining their underground spirit. They have remained a two-piece band since 1993, consisting of Nocturno Culto and Fenriz.`,
  discography: [
    { 
      id: 'd1', 
      year: 1992, 
      title: "A Blaze in the Northern Sky", 
      type: 'Album', 
      rating: 9.8,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      tracks: ["Kathaarian Life Code", "In the Shadow of the Horns", "Paragon Belial", "Where Cold Winds Blow"] 
    },
    { 
      id: 'd2', 
      year: 1993, 
      title: "Under a Funeral Moon", 
      type: 'Album', 
      rating: 9.5,
      image: 'https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=300&h=300&fit=crop',
      tracks: ["Natassja in Eternal Sleep", "Summer of the Diabolical Holocaust", "The Dance of Eternal Shadows", "Unholy Black Metal"] 
    },
    { 
      id: 'd3', 
      year: 1994, 
      title: "Transilvanian Hunger", 
      type: 'Album', 
      rating: 9.9,
      image: 'https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=300&fit=crop',
      tracks: ["Transilvanian Hunger", "Over fjell og gjennom torner", "Skald av Satans sol", "Æra og Dømmedag"] 
    },
    { 
      id: 'd4', 
      year: 2006, 
      title: "The Cult Is Alive", 
      type: 'Album', 
      rating: 8.2,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      tracks: ["The Cult of Goliath", "Too Old, Too Cold", "Atomic Coming", "Graveyard Slut"] 
    }
  ],
  lineup: {
    current: [
      { name: "Fenriz", realName: "Gylve Fenris Nagell", instrument: "Drums, Vocals, Guitars, Bass", years: "1986-present", image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { name: "Nocturno Culto", realName: "Ted Skjellum", instrument: "Vocals, Guitars, Bass", years: "1988-present", image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' }
    ],
    past: [
      { name: "Dag Nilsen", instrument: "Bass", years: "1988-1991" },
      { name: "Ivar Enger (Zephyrous)", instrument: "Guitars", years: "1987-1993" }
    ]
  },
  gallery: [
    'https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571974599782-87624638275b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop'
  ],
  relatedBands: [
    { id: '4', name: 'Bathory', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop', genre: 'Black/Viking Metal' },
    { id: '5', name: 'Mayhem', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop', genre: 'Black Metal' },
    { id: '3', name: 'Emperor', image: 'https://images.unsplash.com/photo-1571974599782-87624638275b?w=100&h=100&fit=crop', genre: 'Symphonic Black' }
  ],
  reviews: [
    { user: 'METAL_SCRIBE', rating: 5, comment: 'Pioneers of the second wave. Their influence on the entire black metal scene is undeniable. The unholy trinity remains unmatched.', date: '2025-06-20', reputation: 890 },
    { user: 'KVLT_WARRIOR', rating: 4, comment: 'Later albums are more punk influenced, but the unholy trinity is pure black metal perfection. Fenriz is a genius.', date: '2025-06-18', reputation: 650 },
    { user: 'NORWEGIAN_FROST', rating: 5, comment: 'True Norwegian black metal legends. Their raw production style became the template for countless bands.', date: '2025-06-15', reputation: 720 }
  ],
  stats: {
    totalPlays: 47892,
    monthlyListeners: 15420,
    metalDNAMatches: 23456,
    addedToCollections: 8934
  }
};

export default function BandDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'biography' | 'discography' | 'lineup' | 'gallery' | 'reviews'>('biography');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isFollowing, setIsFollowing] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Enhanced glitch effect
  useState(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 8000)
    return () => clearInterval(interval)
  })

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting review:', newReview);
    setNewReview({ rating: 5, comment: '' });
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter overflow-x-hidden">
      {/* Enhanced Background Runes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-300 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>ᚦ</div>
        <div className="animate-pulse text-5xl text-blue-300 absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>ᚱ</div>
        <div className="animate-pulse text-4xl text-yellow-300 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>ᚠ</div>
      </div>

      {/* ENHANCED BAND HEADER */}
      <header className="relative border-b-4 border-red-600 overflow-hidden shadow-2xl">
        <img
          src={bandDetails.image}
          alt={bandDetails.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(0.8) contrast(1.3) brightness(0.4) saturate(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-red-900/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-end">
            {/* Enhanced Logo/Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-64 h-64 bg-gray-800/80 border-4 border-gray-600 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm">
                <img
                  src={bandDetails.logo || bandDetails.image}
                  alt={`${bandDetails.name} logo`}
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(0.9) contrast(1.2) brightness(0.9)" }}
                />
              </div>
              {bandDetails.verified && (
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                  <GiCrown className="text-white text-lg" />
                </div>
              )}
              {bandDetails.reputation >= 900 && (
                <div className="absolute -bottom-2 -right-2 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <FaTrophy /> LEGENDARY
                </div>
              )}
            </motion.div>

            {/* Enhanced Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1"
            >
              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-white mb-4 ${glitchActive ? 'animate-pulse text-red-100' : ''}`} 
                  style={{
                    textShadow: glitchActive 
                      ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.5)' 
                      : '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(239, 68, 68, 0.3)'
                  }}>
                {bandDetails.name}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-xl text-gray-300 mb-6">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-400" /> {bandDetails.country}
                </span>
                <span className="flex items-center gap-2">
                  <GiCrossedSwords className="text-red-500" /> {bandDetails.genre}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-400" /> Formed {bandDetails.formedYear}
                </span>
                <span className={`flex items-center gap-2 px-3 py-1 rounded-full font-bold ${
                  bandDetails.status === 'Active' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                }`}>
                  <FaBolt /> {bandDetails.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {bandDetails.tags.map(tag => (
                  <span key={tag} className="bg-gray-800/80 border border-gray-600 text-gray-300 px-3 py-1 text-sm uppercase rounded-full backdrop-blur-sm hover:border-red-600 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Enhanced stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800/80 border border-gray-600 rounded-lg p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-red-400">{bandDetails.reputation}</div>
                  <div className="text-xs text-gray-400 uppercase">Reputation</div>
                </div>
                <div className="bg-gray-800/80 border border-gray-600 rounded-lg p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-green-400">{bandDetails.followers.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 uppercase">Followers</div>
                </div>
                <div className="bg-gray-800/80 border border-gray-600 rounded-lg p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-blue-400">{bandDetails.discography.length}</div>
                  <div className="text-xs text-gray-400 uppercase">Albums</div>
                </div>
                <div className="bg-gray-800/80 border border-gray-600 rounded-lg p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-yellow-400">{(bandDetails.discography.reduce((acc, album) => acc + album.rating, 0) / bandDetails.discography.length).toFixed(1)}</div>
                  <div className="text-xs text-gray-400 uppercase">Avg Rating</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={toggleFollow}
                  className={`px-6 py-3 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-lg shadow-lg ${
                    isFollowing 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <FaHeart /> {isFollowing ? 'Following' : 'Follow'} ({bandDetails.followers.toLocaleString()})
                </button>
                <button className="bg-transparent border-2 border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-white px-6 py-3 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-lg">
                  <FaShare /> Share
                </button>
              </div>

              {/* Added by info */}
              <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                <GiSkullCrossedBones className="text-red-600" />
                Added to database by <span className="text-red-400 font-bold">{bandDetails.addedBy}</span> on {bandDetails.addedDate}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ENHANCED TABS */}
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-600 p-4 sticky top-0 z-40 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {[
            { key: 'biography', label: 'Biography', icon: GiScrollQuill, color: 'red' },
            { key: 'discography', label: 'Discography', icon: FaCompactDisc, color: 'blue' },
            { key: 'lineup', label: 'Lineup', icon: FaUsers, color: 'green' },
            { key: 'gallery', label: 'Gallery', icon: GiGhost, color: 'purple' },
            { key: 'reviews', label: 'Reviews', icon: FaCommentDots, color: 'yellow' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 transition-all duration-300 hover:scale-105 rounded-lg flex items-center gap-2 ${
                activeTab === tab.key
                  ? `bg-${tab.color}-600 border-${tab.color}-600 text-white shadow-lg`
                  : 'bg-transparent border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-400'
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ENHANCED CONTENT */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        <div className="lg:col-span-3">
          {activeTab === 'biography' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase tracking-wide mb-6 text-white flex items-center gap-3">
                <GiScrollQuill className="text-red-500" />
                Band History & Legacy
              </h2>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-8 shadow-2xl space-y-6 text-gray-300 leading-relaxed">
                <div className="text-lg whitespace-pre-line">
                  {bandDetails.biography}
                </div>
                
                {/* Additional info boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                      <GiFlame /> Underground Status
                    </h4>
                    <p className="text-sm">Known for maintaining their underground ethos and refusing mainstream commercialization. True KVLT legends.</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                      <FaFire /> Influence
                    </h4>
                    <p className="text-sm">Pioneered the lo-fi black metal sound that influenced thousands of bands worldwide. Part of the Norwegian Black Metal Inner Circle.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'discography' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase tracking-wide mb-6 text-white flex items-center gap-3">
                <FaCompactDisc className="text-blue-500" />
                Complete Discography
              </h2>
              <div className="space-y-6">
                {bandDetails.discography.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-blue-600 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-600"
                        style={{ filter: "grayscale(0.8) contrast(1.1)" }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-gray-400">{item.year} • {item.type}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-yellow-400 mb-1">
                              <FaStar />
                              <span className="font-bold">{item.rating}/10</span>
                            </div>
                            <div className="text-xs text-gray-500">Community Rating</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase">Track Listing:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-gray-300">
                            {item.tracks.map((track, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-gray-600">{i + 1}.</span>
                                <span>{track}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm uppercase font-bold rounded-lg transition-colors duration-300 flex items-center gap-2">
                          <FaMusic /> Listen Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'lineup' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase tracking-wide mb-6 text-white flex items-center gap-3">
                <FaUsers className="text-green-500" />
                Band Members & Lineup History
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-4 text-green-400 flex items-center gap-2">
                    <GiVikingHelmet /> Current Members
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bandDetails.lineup.current.map((member, index) => (
                      <motion.div 
                        key={member.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-600/50 rounded-xl p-6 hover:border-green-600 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                          />
                          <div>
                            <h4 className="text-xl font-bold text-white">{member.name}</h4>
                            <p className="text-sm text-green-400">{member.realName}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-300">
                            <span className="font-bold">Instruments:</span> {member.instrument}
                          </p>
                          <p className="text-gray-400">
                            <span className="font-bold">Years:</span> {member.years}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-4 text-red-400 flex items-center gap-2">
                    <GiGhost /> Past Members
                  </h3>
                  <div className="space-y-3">
                    {bandDetails.lineup.past.map((member, index) => (
                      <motion.div 
                        key={member.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-red-600/50 transition-all duration-300"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold text-white text-lg">{member.name}</span>
                            <p className="text-sm text-gray-400">{member.instrument}</p>
                          </div>
                          <span className="text-gray-500 text-sm">{member.years}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase tracking-wide mb-6 text-white flex items-center gap-3">
                <GiGhost className="text-purple-500" />
                Photo Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bandDetails.gallery.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-xl border-2 border-gray-600 group-hover:border-purple-600 transition-all duration-300 shadow-lg"
                      style={{ filter: "grayscale(0.7) contrast(1.1) brightness(0.9)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Image {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase tracking-wide mb-6 text-white flex items-center gap-3">
                <FaCommentDots className="text-yellow-500" />
                Community Reviews
              </h2>
              
              <div className="space-y-6 mb-8">
                {bandDetails.reviews.map((review, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                          <GiDeathSkull className="text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-red-400">{review.user}</span>
                          <div className="text-xs text-gray-500">Reputation: {review.reputation}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                        {[...Array(5 - review.rating)].map((_, i) => <FaStar key={i} className="text-gray-600" />)}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3 leading-relaxed">{review.comment}</p>
                    <p className="text-xs text-gray-500 text-right">{review.date}</p>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Write Review Form */}
              <motion.form 
                onSubmit={handleReviewSubmit} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-600/50 rounded-xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold uppercase mb-6 text-white flex items-center gap-2">
                  <FaPen className="text-yellow-400" />
                  Write Your Review
                </h3>
                
                <div className="mb-6">
                  <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <FaStar
                        key={rating}
                        className={`cursor-pointer text-3xl transition-colors duration-300 ${
                          newReview.rating >= rating ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-gray-500'
                        }`}
                        onClick={() => setNewReview({ ...newReview, rating })}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={6}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-600 focus:border-yellow-500 text-white rounded-lg outline-none resize-none transition-colors duration-300"
                    placeholder="Share your thoughts on this legendary band... What makes them special in the underground scene?"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black py-4 text-lg font-bold uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Submit Review
                </button>
              </motion.form>
            </motion.div>
          )}
        </div>

        {/* ENHANCED SIDEBAR */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Latest Release */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold uppercase mb-4 text-gray-300 flex items-center gap-2">
              <FaFire className="text-red-500" />
              Latest Release
            </h3>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 shadow-lg">
              <img
                src={bandDetails.discography[bandDetails.discography.length - 1].image}
                alt={bandDetails.discography[bandDetails.discography.length - 1].title}
                className="w-full h-auto object-cover rounded-lg mb-4 border border-gray-600"
                style={{ filter: "grayscale(0.8) contrast(1.1)" }}
              />
              <h4 className="font-bold text-white text-lg mb-2">{bandDetails.discography[bandDetails.discography.length - 1].title}</h4>
              <p className="text-gray-400 mb-3">{bandDetails.discography[bandDetails.discography.length - 1].year}</p>
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                <FaStar />
                <span className="font-bold">{bandDetails.discography[bandDetails.discography.length - 1].rating}/10</span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold uppercase transition-colors duration-300">
                Listen Now
              </button>
            </div>
          </motion.div>

          {/* Related Bands */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold uppercase mb-4 text-gray-300 flex items-center gap-2">
              <GiBloodySword className="text-purple-500" />
              Related Legions
            </h3>
            <div className="space-y-3">
              {bandDetails.relatedBands.map((band, index) => (
                <motion.div
                  key={band.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    href={`/bands/${band.id}`} 
                    className="bg-gray-800 border-2 border-gray-600 hover:border-purple-600 rounded-lg p-4 flex items-center gap-4 transition-all duration-300 hover:scale-105 shadow-lg group"
                  >
                    <img 
                      src={band.image} 
                      alt={band.name} 
                      className="w-12 h-12 object-cover rounded-lg border border-gray-600 group-hover:border-purple-600 transition-colors"
                      style={{ filter: "grayscale(0.9)" }}
                    />
                    <div>
                      <span className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">{band.name}</span>
                      <p className="text-xs text-gray-500">{band.genre}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Band Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold uppercase mb-4 text-gray-300 flex items-center gap-2">
              <FaTrophy className="text-yellow-500" />
              Statistics
            </h3>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-6 space-y-4 shadow-lg">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Plays:</span>
                <span className="text-white font-bold">{bandDetails.stats.totalPlays.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Listeners:</span>
                <span className="text-green-400 font-bold">{bandDetails.stats.monthlyListeners.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DNA Matches:</span>
                <span className="text-blue-400 font-bold">{bandDetails.stats.metalDNAMatches.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">In Collections:</span>
                <span className="text-purple-400 font-bold">{bandDetails.stats.addedToCollections.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </aside>
      </main>

      {/* ENHANCED FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-red-600 p-8 mt-16 relative">
        <div className="max-w-7xl mx-auto text-center">
          <Link 
            href="/bands" 
            className="text-lg text-red-400 hover:text-red-300 uppercase font-bold tracking-wide transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <GiBlackFlag />
            ← Back to Legion Database
          </Link>
          <div className="mt-4 text-gray-600 text-sm">
            <p>© 2025 Metal Forge • Underground Database • Web3 Powered</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
