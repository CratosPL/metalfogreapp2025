"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy, FaMedal, FaUserCircle, FaCrown, FaStar, FaFire,
  FaHeart, FaComment, FaPlus, FaSearch, FaAward, FaUserFriends,
  FaCoins, FaShare, FaFlag, FaThumbsUp, FaThumbsDown, FaReply,
  FaBullhorn, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt,
  FaEthereum, FaBolt, FaUsers, FaEye, FaPen, FaTimes
} from "react-icons/fa";
import { 
  GiWolfHead, GiDeathSkull, GiCoffin, GiGhost, GiThorHammer,
  GiCrossedSwords, GiDragonHead, GiSwordman, GiSkullCrossedBones,
  GiVikingHelmet, GiGothicCross, GiBloodySword, GiBattleAxe,
  GiFlame, GiBlackFlag, GiCrown
} from "react-icons/gi";
import Link from "next/link";
import Footer from "../../components/Footer";

// Enhanced mock users
const mockUsers = [
  {
    id: "1", 
    name: "METAL_SCRIBE", 
    avatar: "https://i.pravatar.cc/100?img=11",
    score: 6666, 
    rank: 1, 
    country: "Norway", 
    bandsAdded: 47, 
    news: 23, 
    comments: 156,
    reputation: 950,
    badges: ["founder", "kvlt", "newsmaniac", "top10", "legendary"], 
    joined: "2024-02-01",
    metalDNA: ["Black Metal", "Death Metal", "Doom"]
  },
  {
    id: "2", 
    name: "DEATH_COLLECTOR", 
    avatar: "https://i.pravatar.cc/100?img=12",
    score: 5444, 
    rank: 2, 
    country: "USA", 
    bandsAdded: 34, 
    news: 18, 
    comments: 89,
    reputation: 875,
    badges: ["top10", "hunter", "reviewer", "veteran"], 
    joined: "2024-03-15",
    metalDNA: ["Death Metal", "Thrash Metal", "Grindcore"]
  },
  {
    id: "3", 
    name: "UNDERGROUND_HERALD", 
    avatar: "https://i.pravatar.cc/100?img=13",
    score: 5020, 
    rank: 3, 
    country: "Poland", 
    bandsAdded: 28, 
    news: 31, 
    comments: 67,
    reputation: 720,
    badges: ["top10", "newsmaniac", "chronicler"], 
    joined: "2024-04-10",
    metalDNA: ["Black Metal", "Symphonic Metal", "Folk Metal"]
  },
  {
    id: "4", 
    name: "KVLT_WARRIOR", 
    avatar: "https://i.pravatar.cc/100?img=14",
    score: 4256, 
    rank: 4, 
    country: "Sweden", 
    bandsAdded: 19, 
    news: 12, 
    comments: 94,
    reputation: 650,
    badges: ["hunter", "reviewer", "nordic"], 
    joined: "2024-05-22",
    metalDNA: ["Black Metal", "Viking Metal", "Doom Metal"]
  }
];

// Enhanced mock posts
const mockPosts = [
  {
    id: "p1",
    type: "announcement",
    user: "METAL_SCRIBE",
    avatar: "https://i.pravatar.cc/100?img=11",
    reputation: 950,
    title: "🔥 WEB3 METAL REVOLUTION: NFT Forge Goes Live!",
    content: "Brothers and sisters of the underground! After months of development, our NFT Forge is now live on Optimism network. Mint your first metal collectible with 90% lower gas fees. The first 100 mints get exclusive 'Pioneer' badges. No posers, only true metal art!",
    timestamp: "2 hours ago",
    likes: 47,
    comments: 23,
    tips: 0.15,
    tags: ["web3", "nft", "optimism", "launch", "exclusive"],
    location: "Oslo, Norway",
    pinned: true
  },
  {
    id: "p2",
    type: "event",
    user: "DEATH_COLLECTOR",
    avatar: "https://i.pravatar.cc/100?img=12",
    reputation: 875,
    title: "⚔️ UNDERGROUND GATHERING: Chicago Metal Vault 2025",
    content: "Organizing the most brutal underground festival in Chicago! Seeking 8 bands: Black/Death/Doom only. DIY ethos, no mainstream bullshit. Venue: Abandoned warehouse district. Split door 60/40 after expenses. Bring your own amps, we provide PA and stage. True underground experience!",
    timestamp: "5 hours ago",
    likes: 89,
    comments: 34,
    tips: 0.08,
    tags: ["festival", "chicago", "underground", "diy", "brutal"],
    location: "Chicago, USA",
    date: "2025-09-15",
    contact: "undergroundchi@protonmail.com"
  },
  {
    id: "p3",
    type: "trade",
    user: "UNDERGROUND_HERALD",
    avatar: "https://i.pravatar.cc/100?img=13",
    reputation: 720,
    title: "🗡️ LEGENDARY TRADE: Bathory Blood Fire Death Original + ETH",
    content: "HAVE: Bathory - Blood Fire Death (original 1988 Under One Flag pressing, VG+ condition, all inserts). WANT: Early Mayhem demos (1987-1990) + 0.02 ETH for condition difference. Also interested in Thorns demos or early Emperor. Serious collectors only - no lowballers!",
    timestamp: "1 day ago",
    likes: 156,
    comments: 67,
    tips: 0.12,
    tags: ["trade", "vinyl", "bathory", "mayhem", "rare"],
    location: "Warsaw, Poland"
  },
  {
    id: "p4",
    type: "discussion",
    user: "KVLT_WARRIOR",
    avatar: "https://i.pravatar.cc/100?img=14",
    reputation: 650,
    title: "🏴 DEBATE: Best Black Metal Albums of 2024 - Underground Only!",
    content: "What are your top 5 black metal releases this year? Looking for truly underground stuff - no Spotify algorithmic recommendations, no major label releases. Raw production preferred. I'll start: 1. Spectral Lore - Gnosis, 2. Paysage d'Hiver - Geister, 3. ...",
    timestamp: "2 days ago",
    likes: 234,
    comments: 89,
    tips: 0.25,
    tags: ["discussion", "black metal", "2024", "recommendations", "underground"]
  }
];

import React from 'react';

const badgeIcons: Record<string, { icon: React.ReactElement; color: string; title: string }> = {
  founder: { icon: <GiCrown />, color: "text-red-800", title: "Platform Founder" },
  kvlt: { icon: <GiDeathSkull />, color: "text-red-800", title: "KVLT Member" },
  newsmaniac: { icon: <FaFire />, color: "text-red-800", title: "News Maniac" },
  hunter: { icon: <GiCrossedSwords />, color: "text-red-800", title: "Band Hunter" },
  reviewer: { icon: <FaStar />, color: "text-red-800", title: "Master Reviewer" },
  top10: { icon: <FaTrophy />, color: "text-red-800", title: "Top 10 Contributor" },
  legendary: { icon: <GiDragonHead />, color: "text-red-800", title: "Legendary Status" },
  veteran: { icon: <GiVikingHelmet />, color: "text-red-800", title: "Veteran Member" },
  chronicler: { icon: <FaPen />, color: "text-red-800", title: "Underground Chronicler" },
  nordic: { icon: <GiWolfHead />, color: "text-red-800", title: "Nordic Metal Expert" }
};

const postTypeIcons: Record<string, { icon: React.ReactElement; color: string; bgColor: string }> = {
  announcement: { icon: <FaBullhorn />, color: "text-red-800", bgColor: "bg-red-800" },
  event: { icon: <FaCalendarAlt />, color: "text-red-800", bgColor: "bg-red-800" },
  trade: { icon: <GiCrossedSwords />, color: "text-red-800", bgColor: "bg-red-800" },
  discussion: { icon: <FaComment />, color: "text-red-800", bgColor: "bg-red-800" }
};


export default function CommunityPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'board' | 'ranking' | 'create'>('board');
  const [selectedPostType, setSelectedPostType] = useState('announcement');
  const [showTipModal, setShowTipModal] = useState<string | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [displayStats] = useState({ bands: 2847, demos: 15392, users: 8921, earnings: 127.5 });

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // New post form
  const [newPost, setNewPost] = useState({
    type: 'announcement',
    title: '',
    content: '',
    tags: '',
    location: '',
    contact: '',
    date: ''
  });

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.country.toLowerCase().includes(search.toLowerCase()) ||
      u.metalDNA?.some(genre => genre.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreatePost = () => {
    console.log('Creating post:', newPost);
    setNewPost({
      type: 'announcement', title: '', content: '', tags: '', location: '', contact: '', date: ''
    });
    setActiveTab('board');
  };

  const handleTip = (postId: string, amount: number) => {
    console.log(`Tipping ${amount} ETH to post ${postId}`);
    setShowTipModal(null);
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
        <div className="animate-pulse text-6xl text-red-800 absolute top-32 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>☠</div>
        <div className="animate-pulse text-5xl text-black absolute top-60 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>☠</div>
        <div className="animate-pulse text-4xl text-red-800 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>☠</div>
        <div className="animate-pulse text-5xl text-black absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '9s', animationDelay: '6s' }}>☠</div>
      </div>

      {/* ENHANCED HEADER w stylu Zine */}
      <header 
        className="bg-[#f5f5e8] border-b-4 border-black p-8 mt-32 relative z-10 zine-header"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(245, 245, 232, 0.95)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className={`relative transition-all duration-300 ${glitchActive ? 'filter brightness-125 saturate-150' : ''}`}>
                <GiWolfHead className="text-6xl md:text-7xl text-red-800 drop-shadow-2xl filter grayscale contrast-200" />
                {glitchActive && (
                  <GiWolfHead className="absolute top-0 left-0 text-6xl md:text-7xl text-red-600 animate-ping opacity-30" />
                )}
              </div>
              <div>
                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest text-black mb-2 font-zine-title ${glitchActive ? 'animate-pulse text-red-800' : ''}`}
                  style={{
                    textShadow: glitchActive 
                      ? '0 0 20px rgba(139, 0, 0, 0.8), 0 0 40px rgba(139, 0, 0, 0.5)' 
                      : '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  METAL BROTHERHOOD
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-black text-xl uppercase tracking-wide flex items-center gap-2 font-zine-body">
                    <GiSkullCrossedBones className="text-red-800" />
                    Underground Dispatch • Rankings • Crypto Tips
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="bg-red-800 text-white px-3 py-1 rounded-none text-sm font-bold border-2 border-black font-zine-body">
                      {mockUsers.length} Active Metalheads
                    </span>
                    <span className="bg-black text-red-800 px-3 py-1 rounded-none text-sm font-bold border-2 border-red-800 flex items-center gap-1 font-zine-body">
                      <FaEthereum className="text-xs" />
                      Web3 Powered
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/register"
                className="skull-button text-[#d0d0d0] px-6 py-3 border-2 border-red-800 transition-all duration-300 hover:scale-105 uppercase font-bold text-sm tracking-wide rounded-none shadow-metal flex items-center gap-2 font-zine-body"
              >
                <FaUserFriends /> JOIN BROTHERHOOD
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ENHANCED TABS w stylu Zine */}
      <nav 
        className="bg-[#e0e0d8] border-b-4 border-black p-6 relative z-10 zine-section"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(224, 224, 216, 0.95)"
        }}
      >
        <div className="max-w-7xl mx-auto flex gap-4 flex-wrap">
          {[
            { key: 'board', label: 'UNDERGROUND DISPATCH', icon: FaBullhorn },
            { key: 'ranking', label: 'METALHEADS LEADERBOARD', icon: FaTrophy },
            { key: 'create', label: 'SHOUT TO THE HORDES', icon: FaPlus }
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

      {/* UNDERGROUND DISPATCH TAB */}
      {activeTab === 'board' && (
        <section className="max-w-7xl mx-auto p-6 relative z-10">
          {/* Enhanced Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8"
          >
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-lg" />
            <input
              type="text"
              placeholder="Search the underground dispatch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-[#e0e0d8] border-2 border-black hover:border-red-800 focus:border-red-800 text-black rounded-none outline-none font-medium text-lg transition-all duration-300 shadow-metal zine-card font-zine-body"
            />
          </motion.div>

          {/* Enhanced Posts */}
          <div className="space-y-8">
            {mockPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className={`bg-[#f5f5e8] border-4 border-black hover:border-red-800 transition-all duration-300 rounded-none overflow-hidden shadow-metal zine-card ${post.pinned ? 'border-red-800' : ''}`}
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.9)"
                }}
              >
                {/* Post Header */}
                <div className={`bg-[#e0e0d8] border-b-2 border-black p-6`}>
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={post.avatar}
                        alt={post.user}
                        className="w-16 h-16 rounded-none border-2 border-black shadow-metal filter grayscale contrast-200"
                      />
                      {post.reputation >= 900 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-800 rounded-none border-2 border-black flex items-center justify-center">
                          <GiCrown className="text-white text-xs" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`${postTypeIcons[post.type].color} text-2xl`}>
                          {postTypeIcons[post.type].icon}
                        </span>
                        {post.pinned && (
                          <div className="bg-red-800 text-white px-2 py-1 rounded-none text-xs font-bold border-2 border-black font-zine-body">
                            📌 PINNED
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-black text-xl md:text-2xl mb-3 leading-tight font-zine-title uppercase">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-black flex-wrap font-zine-body">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-800">{post.user}</span>
                          <div className="flex items-center gap-1 text-red-800">
                            <FaTrophy className="text-xs" />
                            <span>{post.reputation}</span>
                          </div>
                        </div>
                        <span>{post.timestamp}</span>
                        {post.location && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-red-800" /> {post.location}
                          </span>
                        )}
                        {post.date && (
                          <span className="flex items-center gap-1 bg-red-800 text-white px-2 py-1 rounded-none">
                            <FaCalendarAlt /> {post.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <p className="text-black mb-6 leading-relaxed text-lg font-zine-body">{post.content}</p>
                  
                  {post.contact && (
                    <div className="bg-[#e0e0d8] border-2 border-black rounded-none p-4 mb-6 zine-card">
                      <div className="flex items-center gap-2 mb-2">
                        <FaPen className="text-red-800" />
                        <span className="text-sm text-black uppercase font-bold font-zine-title">Contact Info:</span>
                      </div>
                      <span className="text-red-800 font-mono text-lg">{post.contact}</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="bg-black text-red-800 px-3 py-1 text-sm uppercase rounded-none border border-red-800 hover:bg-red-800 hover:text-white transition-colors duration-300 font-zine-body"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-black hover:text-red-800 transition-colors duration-300 font-zine-body">
                        <FaThumbsUp className="text-lg" /> 
                        <span className="font-bold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-black hover:text-red-800 transition-colors duration-300 font-zine-body">
                        <FaComment className="text-lg" /> 
                        <span className="font-bold">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-black hover:text-red-800 transition-colors duration-300 font-zine-body">
                        <FaShare className="text-lg" /> Share
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {post.tips > 0 && (
                        <div className="flex items-center gap-2 bg-red-800 text-white px-3 py-1 rounded-none border-2 border-black font-zine-body">
                          <FaCoins />
                          <span className="font-bold">{post.tips} ETH</span>
                        </div>
                      )}
                      <button
                        onClick={() => setShowTipModal(post.id)}
                        className="skull-button text-[#d0d0d0] px-4 py-2 text-sm uppercase font-bold rounded-none transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-metal font-zine-body"
                      >
                        <FaCoins /> TIP
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ENHANCED RANKING TAB */}
      {activeTab === 'ranking' && (
        <section className="max-w-7xl mx-auto p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <FaTrophy className="text-red-800 text-4xl" />
              <h2 className="text-3xl font-bold uppercase tracking-widest text-black font-zine-title">METALHEADS LEADERBOARD</h2>
            </div>
            
            {/* Search for users */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="Search metalheads by name, country, or metal DNA..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#e0e0d8] border-2 border-black hover:border-red-800 focus:border-red-800 text-black rounded-none outline-none transition-all duration-300 zine-card font-zine-body"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredUsers.map((user, idx) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-[#f5f5e8] border-4 ${
                  idx === 0 ? "border-red-800" : 
                  "border-black hover:border-red-800"
                } transition-all duration-300 rounded-none p-6 shadow-metal relative overflow-hidden zine-card`}
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.9)"
                }}
              >
                {/* Rank badge */}
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-none flex items-center justify-center font-bold text-sm border-2 ${
                  idx === 0 ? 'bg-red-800 text-white border-black' :
                  'bg-black text-red-800 border-red-800'
                } font-zine-title`}>
                  #{user.rank}
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-20 h-20 rounded-none border-4 border-black shadow-metal filter grayscale contrast-200"
                    />
                    {user.rank === 1 && (
                      <GiCrown className="absolute -top-3 -right-2 text-red-800 text-3xl animate-bounce" />
                    )}
                    {user.reputation >= 900 && (
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-800 rounded-none border-2 border-black flex items-center justify-center">
                        <GiDragonHead className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold uppercase tracking-wide text-black font-zine-title">
                        {user.name}
                      </h3>
                      <span className="text-sm bg-black text-red-800 px-3 py-1 rounded-none font-bold border border-red-800 font-zine-body">
                        {user.country}
                      </span>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                      <div className="text-center">
                        <FaTrophy className="inline text-red-800 mb-1" />
                        <div className="font-bold text-black font-zine-title">{user.score.toLocaleString()}</div>
                        <div className="text-black text-xs font-zine-body">Score</div>
                      </div>
                      <div className="text-center">
                        <FaPlus className="inline text-red-800 mb-1" />
                        <div className="font-bold text-black font-zine-title">{user.bandsAdded}</div>
                        <div className="text-black text-xs font-zine-body">Bands</div>
                      </div>
                      <div className="text-center">
                        <FaFire className="inline text-red-800 mb-1" />
                        <div className="font-bold text-black font-zine-title">{user.news}</div>
                        <div className="text-black text-xs font-zine-body">News</div>
                      </div>
                      <div className="text-center">
                        <FaComment className="inline text-red-800 mb-1" />
                        <div className="font-bold text-black font-zine-title">{user.comments}</div>
                        <div className="text-black text-xs font-zine-body">Comments</div>
                      </div>
                    </div>

                    {/* Metal DNA */}
                    {user.metalDNA && (
                      <div className="mb-4">
                        <div className="text-xs text-black uppercase font-bold mb-2 font-zine-title">Metal DNA:</div>
                        <div className="flex flex-wrap gap-1">
                          {user.metalDNA.map((genre, i) => (
                            <span key={i} className="text-xs bg-red-800 text-white px-2 py-1 rounded-none border border-black font-zine-body">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {user.badges.map((badge) => {
                        const badgeInfo = badgeIcons[badge];
                        return (
                          <span
                            key={badge}
                            className={`inline-flex items-center gap-1 bg-black px-2 py-1 text-xs font-bold uppercase border border-red-800 rounded-none ${badgeInfo.color} font-zine-body`}
                            title={badgeInfo.title}
                          >
                            {badgeInfo.icon} {badge}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-black font-zine-body">
                        Joined {user.joined}
                      </div>
                      <Link
                        href={`/community/profile/${user.id}`}
                        className="text-sm uppercase font-bold text-red-800 hover:text-red-600 transition-colors duration-300 font-zine-body"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ENHANCED CREATE POST TAB */}
      {activeTab === 'create' && (
        <section className="max-w-4xl mx-auto p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#f5f5e8] border-4 border-black rounded-none p-8 shadow-metal zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.9)"
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <GiThorHammer className="text-4xl text-red-800" />
              <h2 className="text-3xl font-bold uppercase tracking-wide text-black font-zine-title">SHOUT TO THE HORDES</h2>
            </div>

            <div className="space-y-8">
              {/* Post Type Selection */}
              <div>
                <label className="block text-lg font-bold text-black mb-4 uppercase font-zine-title">Post Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(postTypeIcons).map(([type, { icon, color, bgColor }]) => (
                    <button
                      key={type}
                      onClick={() => setNewPost(prev => ({ ...prev, type }))}
                      className={`p-4 border-2 transition-all duration-300 hover:scale-105 rounded-none flex flex-col items-center gap-2 text-sm uppercase font-bold font-zine-body ${
                        newPost.type === type
                          ? `bg-red-800 border-black text-white shadow-metal`
                          : 'bg-[#e0e0d8] border-black text-black hover:border-red-800'
                      }`}
                    >
                      <span className={newPost.type === type ? 'text-white' : 'text-red-800'}>{icon}</span>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-lg font-bold text-black mb-2 uppercase font-zine-title">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Your epic announcement title..."
                  className="w-full p-4 bg-[#e0e0d8] border-2 border-black focus:border-red-800 text-black rounded-none outline-none font-medium transition-all duration-300 font-zine-body"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-lg font-bold text-black mb-2 uppercase font-zine-title">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  placeholder="Share your message with the underground brotherhood..."
                  className="w-full p-4 bg-[#e0e0d8] border-2 border-black focus:border-red-800 text-black rounded-none outline-none resize-none transition-all duration-300 font-zine-body"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-lg font-bold text-black mb-2 uppercase font-zine-title">Tags</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="underground, metal, web3..."
                  className="w-full p-4 bg-[#e0e0d8] border-2 border-black focus:border-red-800 text-black rounded-none outline-none font-medium transition-all duration-300 font-zine-body"
                />
              </div>

              {/* Location (optional) */}
              <div>
                <label className="block text-lg font-bold text-black mb-2 uppercase font-zine-title">Location (Optional)</label>
                <input
                  type="text"
                  value={newPost.location}
                  onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                  className="w-full p-4 bg-[#e0e0d8] border-2 border-black focus:border-red-800 text-black rounded-none outline-none font-medium transition-all duration-300 font-zine-body"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  onClick={handleCreatePost}
                  className="skull-button text-[#d0d0d0] px-8 py-4 rounded-none font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-metal font-zine-body"
                >
                  <FaPlus className="inline mr-2" /> SHOUT TO THE HORDES
                </button>
                <button
                  onClick={() => setActiveTab('board')}
                  className="bg-black border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-8 py-4 rounded-none font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 font-zine-body"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* TIP MODAL */}
      {showTipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#f5f5e8] border-4 border-black max-w-md w-full p-8 rounded-none shadow-metal zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.95)"
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <FaCoins className="text-4xl text-red-800" />
              <h3 className="text-2xl font-bold text-black uppercase font-zine-title">Send Crypto Tip</h3>
            </div>

            <p className="text-black mb-6 leading-relaxed font-zine-body">
              Support this underground warrior with a crypto tip. All tips go directly to the poster via smart contract.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[0.001, 0.005, 0.01, 0.02, 0.05, 0.1].map(amount => (
                <button
                  key={amount}
                  onClick={() => handleTip(showTipModal, amount)}
                  className="bg-[#e0e0d8] border-2 border-black hover:border-red-800 hover:bg-red-800 hover:text-white p-4 text-center transition-all duration-300 hover:scale-105 rounded-none font-zine-body"
                >
                  <div className="text-red-800 font-bold text-lg">{amount} ETH</div>
                  <div className="text-xs text-black">${(amount * 2400).toFixed(0)}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowTipModal(null)}
                className="flex-1 bg-black text-red-800 border-2 border-red-800 hover:bg-red-800 hover:text-white py-3 uppercase font-bold text-sm rounded-none transition-all duration-300 font-zine-body"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowTipModal(null)}
                className="flex-1 skull-button text-[#d0d0d0] py-3 uppercase font-bold text-sm rounded-none transition-all duration-300 hover:scale-105 font-zine-body"
              >
                Custom Amount
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer displayStats={displayStats} />

      <style jsx global>{`
        .zine-layout {
          background-color: #f5f5e8;
          background-image: url("/images/zine/paper_texture_distressed.jpg");
          background-size: cover;
          background-position: center;
          position: relative;
          overflow-x: hidden;
        }
        
        .zine-header {
          border-image: url("/images/zine/jagged_border.png") 30 round;
        }
        
        .zine-card {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .zine-section {
          border-image: url("/images/zine/jagged_border.png") 30 round;
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
