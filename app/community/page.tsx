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

const badgeIcons: Record<string, { icon: JSX.Element; color: string; title: string }> = {
  founder: { icon: <GiCrown />, color: "text-yellow-400", title: "Platform Founder" },
  kvlt: { icon: <GiDeathSkull />, color: "text-red-400", title: "KVLT Member" },
  newsmaniac: { icon: <FaFire />, color: "text-orange-400", title: "News Maniac" },
  hunter: { icon: <GiCrossedSwords />, color: "text-green-400", title: "Band Hunter" },
  reviewer: { icon: <FaStar />, color: "text-blue-400", title: "Master Reviewer" },
  top10: { icon: <FaTrophy />, color: "text-yellow-400", title: "Top 10 Contributor" },
  legendary: { icon: <GiDragonHead />, color: "text-purple-400", title: "Legendary Status" },
  veteran: { icon: <GiVikingHelmet />, color: "text-cyan-400", title: "Veteran Member" },
  chronicler: { icon: <FaPen />, color: "text-indigo-400", title: "Underground Chronicler" },
  nordic: { icon: <GiWolfHead />, color: "text-gray-300", title: "Nordic Metal Expert" }
};

const postTypeIcons: Record<string, { icon: JSX.Element; color: string; bgColor: string }> = {
  announcement: { icon: <FaBullhorn />, color: "text-orange-400", bgColor: "from-orange-600/20 to-orange-800/20" },
  event: { icon: <FaCalendarAlt />, color: "text-blue-400", bgColor: "from-blue-600/20 to-blue-800/20" },
  trade: { icon: <GiCrossedSwords />, color: "text-green-400", bgColor: "from-green-600/20 to-green-800/20" },
  discussion: { icon: <FaComment />, color: "text-purple-400", bgColor: "from-purple-600/20 to-purple-800/20" }
};

export default function CommunityPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'board' | 'ranking' | 'create'>('board');
  const [selectedPostType, setSelectedPostType] = useState('announcement');
  const [showTipModal, setShowTipModal] = useState<string | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);

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
    <div className="min-h-screen bg-gray-900 text-white font-inter overflow-x-hidden">
      
      {/* Enhanced Background Runes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="animate-pulse text-6xl text-red-300 absolute top-20 left-20 transform rotate-15" style={{ animationDuration: '8s' }}>ᚦ</div>
        <div className="animate-pulse text-5xl text-blue-300 absolute top-40 right-40 transform -rotate-12" style={{ animationDuration: '10s', animationDelay: '2s' }}>ᚱ</div>
        <div className="animate-pulse text-4xl text-yellow-300 absolute bottom-40 left-1/3 transform rotate-10" style={{ animationDuration: '7s', animationDelay: '4s' }}>ᚠ</div>
        <div className="animate-pulse text-5xl text-purple-300 absolute bottom-20 right-20 transform -rotate-8" style={{ animationDuration: '9s', animationDelay: '6s' }}>ᚹ</div>
      </div>

      {/* ENHANCED HEADER */}
      <header className="bg-gradient-to-b from-gray-800 to-gray-900 border-b-4 border-red-600 p-8 relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className={`relative transition-all duration-300 ${glitchActive ? 'filter brightness-125 saturate-150' : ''}`}>
                <GiWolfHead className="text-6xl md:text-7xl text-red-500 drop-shadow-2xl" />
                {glitchActive && (
                  <GiWolfHead className="absolute top-0 left-0 text-6xl md:text-7xl text-red-400 animate-ping opacity-30" />
                )}
              </div>
              <div>
                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest text-white mb-2 ${glitchActive ? 'animate-pulse text-red-100' : ''}`}
                  style={{
                    textShadow: glitchActive 
                      ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.5)' 
                      : '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  METAL BROTHERHOOD
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-gray-400 text-xl uppercase tracking-wide flex items-center gap-2">
                    <GiSkullCrossedBones className="text-red-500" />
                    Underground Dispatch • Rankings • Crypto Tips
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-600/50">
                      {mockUsers.length} Active Metalheads
                    </span>
                    <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-600/50 flex items-center gap-1">
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
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 border-2 border-red-600 transition-all duration-300 hover:scale-105 uppercase font-bold text-sm tracking-wide rounded-lg shadow-lg hover:shadow-red-600/50 flex items-center gap-2"
              >
                <FaUserFriends /> JOIN BROTHERHOOD
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ENHANCED TABS */}
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-600 p-6 relative z-10">
        <div className="max-w-7xl mx-auto flex gap-4 flex-wrap">
          {[
            { key: 'board', label: 'UNDERGROUND DISPATCH', icon: FaBullhorn, color: 'orange' },
            { key: 'ranking', label: 'METALHEADS LEADERBOARD', icon: FaTrophy, color: 'yellow' },
            { key: 'create', label: 'SHOUT TO THE HORDES', icon: FaPlus, color: 'green' }
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

      {/* UNDERGROUND DISPATCH TAB */}
      {activeTab === 'board' && (
        <section className="max-w-7xl mx-auto p-6 relative z-10">
          {/* Enhanced Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8"
          >
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search the underground dispatch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-red-500 focus:border-red-500 text-white rounded-lg outline-none font-medium text-lg transition-all duration-300 shadow-lg"
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
                className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-red-600 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl ${post.pinned ? 'border-yellow-600 shadow-yellow-600/20' : ''}`}
              >
                {/* Post Header */}
                <div className={`bg-gradient-to-r ${postTypeIcons[post.type].bgColor} border-b-2 border-gray-600 p-6`}>
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={post.avatar}
                        alt={post.user}
                        className="w-16 h-16 rounded-full border-2 border-gray-600 shadow-lg"
                        style={{ filter: "grayscale(0.7) contrast(1.1) brightness(0.9)" }}
                      />
                      {post.reputation >= 900 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                          <GiCrown className="text-black text-xs" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`${postTypeIcons[post.type].color} text-2xl`}>
                          {postTypeIcons[post.type].icon}
                        </span>
                        {post.pinned && (
                          <div className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold border border-yellow-600/50">
                            📌 PINNED
                          </div>
                        )}
                      </div>
                      <h3 className="font-black text-white text-xl md:text-2xl mb-3 leading-tight">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-400">{post.user}</span>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <FaTrophy className="text-xs" />
                            <span>{post.reputation}</span>
                          </div>
                        </div>
                        <span>{post.timestamp}</span>
                        {post.location && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-blue-400" /> {post.location}
                          </span>
                        )}
                        {post.date && (
                          <span className="flex items-center gap-1 bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                            <FaCalendarAlt /> {post.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">{post.content}</p>
                  
                  {post.contact && (
                    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <FaPen className="text-green-400" />
                        <span className="text-sm text-gray-400 uppercase font-bold">Contact Info:</span>
                      </div>
                      <span className="text-green-400 font-mono text-lg">{post.contact}</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="bg-gray-700/50 text-gray-300 px-3 py-1 text-sm uppercase rounded-full border border-gray-600 hover:border-red-600 transition-colors duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors duration-300">
                        <FaThumbsUp className="text-lg" /> 
                        <span className="font-bold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300">
                        <FaComment className="text-lg" /> 
                        <span className="font-bold">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300">
                        <FaShare className="text-lg" /> Share
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {post.tips > 0 && (
                        <div className="flex items-center gap-2 bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-600/50">
                          <FaCoins />
                          <span className="font-bold">{post.tips} ETH</span>
                        </div>
                      )}
                      <button
                        onClick={() => setShowTipModal(post.id)}
                        className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black px-4 py-2 text-sm uppercase font-bold rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
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
              <FaTrophy className="text-yellow-400 text-4xl" />
              <h2 className="text-3xl font-black uppercase tracking-widest text-white">METALHEADS LEADERBOARD</h2>
            </div>
            
            {/* Search for users */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search metalheads by name, country, or metal DNA..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/80 border-2 border-gray-600 hover:border-yellow-500 focus:border-yellow-500 text-white rounded-lg outline-none transition-all duration-300"
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
                className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${
                  idx === 0 ? "border-yellow-600 shadow-yellow-600/20" : 
                  idx === 1 ? "border-gray-400 shadow-gray-400/20" : 
                  idx === 2 ? "border-orange-600 shadow-orange-600/20" : 
                  "border-gray-600 hover:border-red-600"
                } transition-all duration-300 rounded-xl p-6 shadow-2xl relative overflow-hidden`}
              >
                {/* Rank badge */}
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                  idx === 0 ? 'bg-yellow-500 text-black' :
                  idx === 1 ? 'bg-gray-400 text-black' :
                  idx === 2 ? 'bg-orange-500 text-black' :
                  'bg-gray-700 text-white'
                }`}>
                  #{user.rank}
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-20 h-20 rounded-full border-4 border-gray-600 shadow-lg"
                      style={{ filter: "grayscale(0.7) contrast(1.1) brightness(0.9)" }}
                    />
                    {user.rank === 1 && (
                      <GiCrown className="absolute -top-3 -right-2 text-yellow-400 text-3xl animate-bounce" />
                    )}
                    {user.reputation >= 900 && (
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                        <GiDragonHead className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                        {user.name}
                      </h3>
                      <span className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full font-bold border border-gray-600">
                        {user.country}
                      </span>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                      <div className="text-center">
                        <FaTrophy className="inline text-yellow-400 mb-1" />
                        <div className="font-bold text-white">{user.score.toLocaleString()}</div>
                        <div className="text-gray-500 text-xs">Score</div>
                      </div>
                      <div className="text-center">
                        <FaPlus className="inline text-green-400 mb-1" />
                        <div className="font-bold text-white">{user.bandsAdded}</div>
                        <div className="text-gray-500 text-xs">Bands</div>
                      </div>
                      <div className="text-center">
                        <FaFire className="inline text-orange-400 mb-1" />
                        <div className="font-bold text-white">{user.news}</div>
                        <div className="text-gray-500 text-xs">News</div>
                      </div>
                      <div className="text-center">
                        <FaComment className="inline text-blue-400 mb-1" />
                        <div className="font-bold text-white">{user.comments}</div>
                        <div className="text-gray-500 text-xs">Comments</div>
                      </div>
                    </div>

                    {/* Metal DNA */}
                    {user.metalDNA && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 uppercase font-bold mb-2">Metal DNA:</div>
                        <div className="flex flex-wrap gap-1">
                          {user.metalDNA.map((genre, i) => (
                            <span key={i} className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded border border-red-600/50">
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
                            className={`inline-flex items-center gap-1 bg-gray-800/50 px-2 py-1 text-xs font-bold uppercase border border-gray-600 rounded ${badgeInfo.color}`}
                            title={badgeInfo.title}
                          >
                            {badgeInfo.icon} {badge}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Joined {user.joined}
                      </div>
                      <Link
                        href={`/community/profile/${user.id}`}
                        className="text-sm uppercase font-bold text-red-400 hover:text-red-300 transition-colors duration-300"
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
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <GiThorHammer className="text-4xl text-red-400" />
              <h2 className="text-3xl font-black uppercase tracking-wide text-white">SHOUT TO THE HORDES</h2>
            </div>

            <div className="space-y-8">
              {/* Post Type Selection */}
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-4 uppercase">Post Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(postTypeIcons).map(([type, { icon, color, bgColor }]) => (
                    <button
                      key={type}
                      onClick={() => setNewPost(prev => ({ ...prev, type }))}
                      className={`p-4 border-2 transition-all duration-300 hover:scale-105 rounded-lg flex flex-col items-center gap-2 text-sm uppercase font-bold ${
                        newPost.type === type
                          ? `bg-gradient-to-br ${bgColor} border-red-600 text-white shadow-lg`
                          : 'bg-transparent border-gray-600 text-gray-300 hover:border-red-600'
                      }`}
                    >
                      <span className={color}>{icon}</span>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-red-500 focus:border-red-500 text-white rounded-lg outline-none transition-all duration-300"
                  placeholder="🔥 Your epic underground announcement..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={8}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-red-500 focus:border-red-500 text-white rounded-lg outline-none resize-none transition-all duration-300"
                  placeholder="Share your metallic wisdom with the brotherhood..."
                />
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Location</label>
                  <input
                    type="text"
                    value={newPost.location}
                    onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none transition-all duration-300"
                    placeholder="Oslo, Norway"
                  />
                </div>
                
                {newPost.type === 'event' && (
                  <div>
                    <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Event Date</label>
                    <input
                      type="date"
                      value={newPost.date}
                      onChange={(e) => setNewPost(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-blue-500 focus:border-blue-500 text-white rounded-lg outline-none transition-all duration-300"
                    />
                  </div>
                )}
                
                {(newPost.type === 'announcement' || newPost.type === 'event') && (
                  <div>
                    <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Contact</label>
                    <input
                      type="text"
                      value={newPost.contact}
                      onChange={(e) => setNewPost(prev => ({ ...prev, contact: e.target.value }))}
                      className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white rounded-lg outline-none transition-all duration-300"
                      placeholder="underground@protonmail.com"
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Tags</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-purple-500 focus:border-purple-500 text-white rounded-lg outline-none transition-all duration-300"
                  placeholder="black metal, underground, brutal, kvlt (separated by commas)"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-6 pt-4">
                <button
                  onClick={() => setActiveTab('board')}
                  className="flex-1 bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 py-4 text-lg font-bold uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 text-lg font-bold uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-600/50"
                >
                  UNLEASH TO THE BROTHERHOOD
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ENHANCED TIP MODAL */}
      {showTipModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-600 max-w-md w-full p-8 rounded-xl shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <FaCoins className="text-4xl text-yellow-400" />
              <h3 className="text-2xl font-bold text-white uppercase">Send Crypto Tip</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Support this underground warrior with a crypto tip. All tips go directly to the poster via smart contract.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[0.001, 0.005, 0.01, 0.02, 0.05, 0.1].map(amount => (
                <button
                  key={amount}
                  onClick={() => handleTip(showTipModal, amount)}
                  className="bg-gray-900 border-2 border-gray-700 hover:border-yellow-600 hover:bg-yellow-600/10 p-4 text-center transition-all duration-300 hover:scale-105 rounded-lg"
                >
                  <div className="text-yellow-400 font-bold text-lg">{amount} ETH</div>
                  <div className="text-xs text-gray-500">${(amount * 2400).toFixed(0)}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowTipModal(null)}
                className="flex-1 bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-700 py-3 uppercase font-bold text-sm rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowTipModal(null)}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black py-3 uppercase font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105"
              >
                Custom Amount
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ENHANCED FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-red-600 p-8 mt-16 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            {[GiDeathSkull, GiCrossedSwords, GiCoffin, GiGhost, GiSkullCrossedBones].map((Icon, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.2, rotate: 15 }} 
                className="cursor-pointer"
              >
                <Icon className="text-4xl text-gray-600 hover:text-red-500 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
          <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
            METAL BROTHERHOOD
          </h3>
          <p className="text-gray-400 uppercase tracking-wider mb-4">
            Underground Dispatch • Web3 Tips • Metal Network
          </p>
          <p className="text-gray-600">
            Connect • Support • Trade • No posers allowed in the brotherhood
          </p>
          <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-500">
            <FaEthereum className="text-blue-400" />
            <span>Powered by Optimism Blockchain</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
