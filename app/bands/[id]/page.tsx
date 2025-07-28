"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaCompactDisc, FaMusic, FaStar, FaPen, FaHeart, FaShare,
  FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaCommentDots,
  FaEthereum, FaBolt, FaFire, FaCrown, FaTrophy, FaEye, FaSkullCrossbones
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCrossedSwords, GiDragonHead, GiWolfHead,
  GiThorHammer, GiCoffin, GiGhost, GiScrollQuill, GiSkullCrossedBones,
  GiVikingHelmet, GiGothicCross, GiBloodySword, GiBattleAxe,
  GiFlame, GiBlackFlag, GiCrown
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
  const [displayStats] = useState({ bands: 2847, demos: 15392, users: 8921, earnings: 127.5 });

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
    <div 
      className="min-h-screen bg-[#f5f5e8] text-black font-zine-body overflow-x-hidden zine-layout"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >


      {/* Decorative skulls w tle */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-800 absolute top-32 left-20 transform rotate-15">☠</div>
        <div className="animate-pulse text-5xl text-black absolute top-60 right-40 transform -rotate-12">☠</div>
        <div className="animate-pulse text-4xl text-red-800 absolute bottom-40 left-1/3 transform rotate-10">☠</div>
        <div className="animate-pulse text-5xl text-black absolute bottom-20 right-20 transform -rotate-8">☠</div>
      </div>

      {/* ENHANCED BAND HEADER w stylu Zine */}
      <header 
        className="relative border-b-4 border-black overflow-hidden shadow-metal mt-32"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(245, 245, 232, 0.95)"
        }}
      >
        <img
          src={bandDetails.image}
          alt={bandDetails.name}
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-200 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5e8] via-[#f5f5e8]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-800/10 via-transparent to-red-800/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-end">
            {/* Enhanced Logo/Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-64 h-64 bg-[#e0e0d8] border-4 border-black rounded-none overflow-hidden shadow-metal backdrop-blur-sm zine-card">
                <img
                  src={bandDetails.logo || bandDetails.image}
                  alt={`${bandDetails.name} logo`}
                  className="w-full h-full object-cover filter grayscale contrast-200"
                />
              </div>
              {bandDetails.verified && (
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-800 rounded-none border-4 border-black flex items-center justify-center">
                  <GiCrown className="text-white text-lg" />
                </div>
              )}
              {bandDetails.reputation >= 900 && (
                <div className="absolute -bottom-2 -right-2 bg-black text-red-800 px-3 py-1 rounded-none text-sm font-bold flex items-center gap-1 border-2 border-red-800 font-zine-body">
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
              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest text-black mb-4 font-zine-title ${glitchActive ? 'animate-pulse text-red-800' : ''}`} 
                  style={{
                    textShadow: glitchActive 
                      ? '0 0 20px rgba(139, 0, 0, 0.8), 0 0 40px rgba(139, 0, 0, 0.5)' 
                      : '3px 3px 6px rgba(0,0,0,0.3)'
                  }}>
                {bandDetails.name}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-xl text-black mb-6 font-zine-body">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-800" /> {bandDetails.country}
                </span>
                <span className="flex items-center gap-2">
                  <GiCrossedSwords className="text-red-800" /> {bandDetails.genre}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-red-800" /> Formed {bandDetails.formedYear}
                </span>
                <span className={`flex items-center gap-2 px-3 py-1 rounded-none font-bold border-2 ${
                  bandDetails.status === 'Active' ? 'bg-red-800 text-white border-black' : 'bg-black text-red-800 border-red-800'
                } font-zine-body`}>
                  <FaBolt /> {bandDetails.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {bandDetails.tags.map(tag => (
                  <span key={tag} className="bg-black text-red-800 px-3 py-1 text-sm uppercase rounded-none border border-red-800 hover:bg-red-800 hover:text-white transition-colors font-zine-body">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Enhanced stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#e0e0d8] border-2 border-black rounded-none p-3 text-center zine-card">
                  <div className="text-2xl font-bold text-red-800 font-zine-title">{bandDetails.reputation}</div>
                  <div className="text-xs text-black uppercase font-zine-body">Reputation</div>
                </div>
                <div className="bg-[#e0e0d8] border-2 border-black rounded-none p-3 text-center zine-card">
                  <div className="text-2xl font-bold text-red-800 font-zine-title">{bandDetails.followers.toLocaleString()}</div>
                  <div className="text-xs text-black uppercase font-zine-body">Followers</div>
                </div>
                <div className="bg-[#e0e0d8] border-2 border-black rounded-none p-3 text-center zine-card">
                  <div className="text-2xl font-bold text-red-800 font-zine-title">{bandDetails.discography.length}</div>
                  <div className="text-xs text-black uppercase font-zine-body">Albums</div>
                </div>
                <div className="bg-[#e0e0d8] border-2 border-black rounded-none p-3 text-center zine-card">
                  <div className="text-2xl font-bold text-red-800 font-zine-title">{(bandDetails.discography.reduce((acc, album) => acc + album.rating, 0) / bandDetails.discography.length).toFixed(1)}</div>
                  <div className="text-xs text-black uppercase font-zine-body">Avg Rating</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={toggleFollow}
                  className={`px-6 py-3 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-none shadow-metal font-zine-body ${
                    isFollowing 
                      ? 'bg-red-800 hover:bg-red-700 text-white border-2 border-black' 
                      : 'skull-button text-[#d0d0d0] border-2 border-red-800'
                  }`}
                >
                  <FaHeart /> {isFollowing ? 'Following' : 'Follow'} ({bandDetails.followers.toLocaleString()})
                </button>
                <button className="bg-black border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-6 py-3 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-2 rounded-none font-zine-body">
                  <FaShare /> Share
                </button>
              </div>

              {/* Added by info */}
              <div className="mt-4 text-sm text-black flex items-center gap-2 font-zine-body">
                <GiSkullCrossedBones className="text-red-800" />
                Added to database by <span className="text-red-800 font-bold">{bandDetails.addedBy}</span> on {bandDetails.addedDate}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ENHANCED TABS w stylu Zine */}
      <nav 
        className="bg-[#e0e0d8] border-b-4 border-black p-4 sticky top-32 z-40 shadow-metal zine-section"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(224, 224, 216, 0.95)"
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {[
            { key: 'biography', label: 'Biography', icon: GiScrollQuill },
            { key: 'discography', label: 'Discography', icon: FaCompactDisc },
            { key: 'lineup', label: 'Lineup', icon: FaUsers },
            { key: 'gallery', label: 'Gallery', icon: GiGhost },
            { key: 'reviews', label: 'Reviews', icon: FaCommentDots }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 transition-all duration-300 hover:scale-105 rounded-none flex items-center gap-2 font-zine-body ${
                activeTab === tab.key
                  ? 'bg-red-800 border-red-800 text-white shadow-metal'
                  : 'bg-[#f5f5e8] border-black text-black hover:border-red-800 hover:text-red-800'
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ENHANCED CONTENT w stylu Zine */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        <div className="lg:col-span-3">
          {activeTab === 'biography' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold uppercase tracking-wide mb-6 text-black flex items-center gap-3 font-zine-title">
                <GiScrollQuill className="text-red-800" />
                Band History & Legacy
              </h2>
              <div 
                className="bg-[#f5f5e8] border-4 border-black rounded-none p-8 shadow-metal space-y-6 text-black leading-relaxed zine-card"
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.9)"
                }}
              >
                <div className="text-lg whitespace-pre-line font-zine-body">
                  {bandDetails.biography}
                </div>
                
                {/* Additional info boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-[#e0e0d8] border-2 border-black rounded-none p-4 zine-card">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2 font-zine-title uppercase">
                      <GiFlame /> Underground Status
                    </h4>
                    <p className="text-sm font-zine-body">Known for maintaining their underground ethos and refusing mainstream commercialization. True KVLT legends.</p>
                  </div>
                  <div className="bg-[#e0e0d8] border-2 border-black rounded-none p-4 zine-card">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2 font-zine-title uppercase">
                      <FaFire /> Influence
                    </h4>
                    <p className="text-sm font-zine-body">Pioneered the lo-fi black metal sound that influenced thousands of bands worldwide. Part of the Norwegian Black Metal Inner Circle.</p>
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
              <h2 className="text-3xl font-bold uppercase tracking-wide mb-6 text-black flex items-center gap-3 font-zine-title">
                <FaCompactDisc className="text-red-800" />
                Complete Discography
              </h2>
              <div className="space-y-6">
                {bandDetails.discography.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-[#f5f5e8] border-4 border-black hover:border-red-800 rounded-none p-6 transition-all duration-300 hover:scale-[1.02] shadow-metal zine-card"
                    style={{
                      backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: "rgba(245, 245, 232, 0.9)"
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-32 h-32 object-cover rounded-none border-2 border-black filter grayscale contrast-200"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-black mb-1 font-zine-title uppercase">{item.title}</h3>
                            <p className="text-black font-zine-body">{item.year} • {item.type}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-red-800 mb-1">
                              <FaStar />
                              <span className="font-bold font-zine-title">{item.rating}/10</span>
                            </div>
                            <div className="text-xs text-black font-zine-body">Community Rating</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-black mb-2 uppercase font-zine-title">Track Listing:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-black font-zine-body">
                            {item.tracks.map((track, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-red-800">{i + 1}.</span>
                                <span>{track}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <button className="skull-button text-[#d0d0d0] px-4 py-2 text-sm uppercase font-bold rounded-none transition-colors duration-300 flex items-center gap-2 font-zine-body">
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
              <h2 className="text-3xl font-bold uppercase tracking-wide mb-6 text-black flex items-center gap-3 font-zine-title">
                <FaUsers className="text-red-800" />
                Band Members & Lineup History
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-4 text-red-800 flex items-center gap-2 font-zine-title">
                    <GiVikingHelmet /> Current Members
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bandDetails.lineup.current.map((member, index) => (
                      <motion.div 
                        key={member.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-[#f5f5e8] border-4 border-red-800 rounded-none p-6 hover:border-black transition-all duration-300 zine-card"
                        style={{
                          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundColor: "rgba(245, 245, 232, 0.9)"
                        }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-16 h-16 rounded-none object-cover border-2 border-black filter grayscale contrast-200"
                          />
                          <div>
                            <h4 className="text-xl font-bold text-black font-zine-title uppercase">{member.name}</h4>
                            <p className="text-sm text-red-800 font-zine-body">{member.realName}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm font-zine-body">
                          <p className="text-black">
                            <span className="font-bold">Instruments:</span> {member.instrument}
                          </p>
                          <p className="text-black">
                            <span className="font-bold">Years:</span> {member.years}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-4 text-red-800 flex items-center gap-2 font-zine-title">
                    <GiGhost /> Past Members
                  </h3>
                  <div className="space-y-3">
                    {bandDetails.lineup.past.map((member, index) => (
                      <motion.div 
                        key={member.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-[#e0e0d8] border-2 border-black rounded-none p-4 hover:border-red-800 transition-all duration-300 zine-card"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold text-black text-lg font-zine-title uppercase">{member.name}</span>
                            <p className="text-sm text-black font-zine-body">{member.instrument}</p>
                          </div>
                          <span className="text-red-800 text-sm font-zine-body">{member.years}</span>
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
              <h2 className="text-3xl font-bold uppercase tracking-wide mb-6 text-black flex items-center gap-3 font-zine-title">
                <GiGhost className="text-red-800" />
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
                      className="w-full h-64 object-cover rounded-none border-4 border-black group-hover:border-red-800 transition-all duration-300 shadow-metal filter grayscale contrast-200 zine-card"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-zine-body">
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
              <h2 className="text-3xl font-bold uppercase tracking-wide mb-6 text-black flex items-center gap-3 font-zine-title">
                <FaCommentDots className="text-red-800" />
                Community Reviews
              </h2>
              
              <div className="space-y-6 mb-8">
                {bandDetails.reviews.map((review, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-[#f5f5e8] border-4 border-black rounded-none p-6 shadow-metal zine-card"
                    style={{
                      backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: "rgba(245, 245, 232, 0.9)"
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-800 rounded-none flex items-center justify-center border-2 border-black">
                          <GiDeathSkull className="text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-red-800 font-zine-body uppercase">{review.user}</span>
                          <div className="text-xs text-black font-zine-body">Reputation: {review.reputation}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-red-800">
                        {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                        {[...Array(5 - review.rating)].map((_, i) => <FaStar key={i} className="text-black opacity-30" />)}
                      </div>
                    </div>
                    <p className="text-black mb-3 leading-relaxed font-zine-body">{review.comment}</p>
                    <p className="text-xs text-black text-right font-zine-body">{review.date}</p>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Write Review Form */}
              <motion.form 
                onSubmit={handleReviewSubmit} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#f5f5e8] border-4 border-red-800 rounded-none p-8 shadow-metal zine-card"
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.9)"
                }}
              >
                <h3 className="text-2xl font-bold uppercase mb-6 text-black flex items-center gap-2 font-zine-title">
                  <FaPen className="text-red-800" />
                  Write Your Review
                </h3>
                
                <div className="mb-6">
                  <label className="block text-lg font-bold text-black mb-3 uppercase font-zine-title">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <FaStar
                        key={rating}
                        className={`cursor-pointer text-3xl transition-colors duration-300 ${
                          newReview.rating >= rating ? 'text-red-800 hover:text-red-600' : 'text-black opacity-30 hover:text-black opacity-50'
                        }`}
                        onClick={() => setNewReview({ ...newReview, rating })}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-bold text-black mb-3 uppercase font-zine-title">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={6}
                    className="w-full p-4 bg-[#e0e0d8] border-2 border-black focus:border-red-800 text-black rounded-none outline-none resize-none transition-colors duration-300 font-zine-body"
                    placeholder="Share your thoughts on this legendary band... What makes them special in the underground scene?"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full skull-button text-[#d0d0d0] py-4 text-lg font-bold uppercase tracking-wide rounded-none transition-all duration-300 hover:scale-105 shadow-metal font-zine-body"
                >
                  Submit Review
                </button>
              </motion.form>
            </motion.div>
          )}
        </div>

        {/* ENHANCED SIDEBAR w stylu Zine */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Latest Release */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold uppercase mb-4 text-black flex items-center gap-2 font-zine-title">
              <FaFire className="text-red-800" />
              Latest Release
            </h3>
            <div 
              className="bg-[#f5f5e8] border-4 border-black rounded-none p-6 shadow-metal zine-card"
              style={{
                backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(245, 245, 232, 0.9)"
              }}
            >
              <img
                src={bandDetails.discography[bandDetails.discography.length - 1].image}
                alt={bandDetails.discography[bandDetails.discography.length - 1].title}
                className="w-full h-auto object-cover rounded-none mb-4 border-2 border-black filter grayscale contrast-200"
              />
              <h4 className="font-bold text-black text-lg mb-2 font-zine-title uppercase">{bandDetails.discography[bandDetails.discography.length - 1].title}</h4>
              <p className="text-black mb-3 font-zine-body">{bandDetails.discography[bandDetails.discography.length - 1].year}</p>
              <div className="flex items-center gap-1 text-red-800 mb-3">
                <FaStar />
                <span className="font-bold font-zine-title">{bandDetails.discography[bandDetails.discography.length - 1].rating}/10</span>
              </div>
              <button className="w-full skull-button text-[#d0d0d0] py-2 rounded-none font-bold uppercase transition-colors duration-300 font-zine-body">
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
            <h3 className="text-xl font-bold uppercase mb-4 text-black flex items-center gap-2 font-zine-title">
              <GiBloodySword className="text-red-800" />
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
                    className="bg-[#e0e0d8] border-2 border-black hover:border-red-800 rounded-none p-4 flex items-center gap-4 transition-all duration-300 hover:scale-105 shadow-metal group zine-card"
                  >
                    <img 
                      src={band.image} 
                      alt={band.name} 
                      className="w-12 h-12 object-cover rounded-none border-2 border-black group-hover:border-red-800 transition-colors filter grayscale contrast-200"
                    />
                    <div>
                      <span className="font-bold text-black text-sm group-hover:text-red-800 transition-colors font-zine-title uppercase">{band.name}</span>
                      <p className="text-xs text-black font-zine-body">{band.genre}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Back to Database */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              href="/bands" 
              className="block bg-black border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white p-4 rounded-none font-bold uppercase transition-all duration-300 text-center font-zine-body flex items-center justify-center gap-2"
            >
              <GiBlackFlag />
              ← Back to Legion Database
            </Link>
          </motion.div>
        </aside>
      </main>



      <style jsx global>{`
        .zine-layout {
          background-color: #f5f5e8;
          background-image: url("/images/zine/paper_texture_distressed.jpg");
          background-size: cover;
          background-position: center;
          position: relative;
          overflow-x: hidden;
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
    </div>
  );
}
