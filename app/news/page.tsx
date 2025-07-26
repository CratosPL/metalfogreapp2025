"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlus, FaFilter, FaRegCommentDots, FaRegClock, FaRegBookmark,
  FaFire, FaTags, FaEthereum, FaBolt, FaEye, FaUser, FaNewspaper,
  FaSearch, FaTrophy, FaCalendarAlt, FaArrowUp
} from "react-icons/fa";
import { 
  GiDeathSkull, GiCoffin, GiGhost, GiNewShoot, GiSkullCrossedBones,
  GiVikingHelmet, GiGothicCross, GiBloodySword, GiBattleAxe,
  GiFlame, GiWolfHead, GiThorHammer, GiCrossedSwords, GiBlackFlag
} from "react-icons/gi";
import Link from "next/link";

// Enhanced categories
const categories = [
  { key: "all", label: "All Chronicles", icon: FaNewspaper, color: "text-gray-400" },
  { key: "scene", label: "Underground Scene", icon: GiCrossedSwords, color: "text-red-400" },
  { key: "releases", label: "New Releases", icon: GiThorHammer, color: "text-blue-400" },
  { key: "festivals", label: "War Gatherings", icon: GiBattleAxe, color: "text-green-400" },
  { key: "interviews", label: "Legion Interviews", icon: FaUser, color: "text-purple-400" },
  { key: "history", label: "Metal Archives", icon: GiVikingHelmet, color: "text-yellow-400" },
];

// Enhanced mock news data
const mockNews = [
  {
    id: "1",
    title: "🔥 Mayhem Announce New Album for 2025 - Return to Pure Darkness",
    excerpt: "Norwegian black metal legends Mayhem are set to release their new album 'Daemon Eternal' next spring. Expect raw chaos, true Norwegian darkness, and zero compromise to modern trends. The underground awaits.",
    category: "releases",
    date: "2025-07-20",
    author: "METAL_SCRIBE",
    authorReputation: 950,
    comments: 47,
    views: 1234,
    likes: 89,
    featured: true,
    tags: ["mayhem", "black metal", "releases", "norway", "daemon"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    readTime: "5 min",
    verified: true
  },
  {
    id: "2", 
    title: "⚔️ Brutal Assault 2025 – Underground Kings Return to the Battlefield",
    excerpt: "The legendary Czech festival returns with the most brutal lineup ever assembled: Emperor, Morbid Angel, Mgła, Ulcerate, and 50+ underground legends. The war begins August 2025!",
    category: "festivals",
    date: "2025-07-18",
    author: "FEST_REPORTER", 
    authorReputation: 875,
    comments: 23,
    views: 892,
    likes: 67,
    featured: true,
    tags: ["festival", "brutal assault", "live", "czech", "lineup"],
    image: "https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=600&h=400&fit=crop",
    readTime: "8 min",
    verified: true
  },
  {
    id: "3",
    title: "🎙️ EXCLUSIVE: Fenriz (Darkthrone) on Modern Black Metal & Web3",
    excerpt: "In a rare interview, Fenriz discusses the state of the underground, the importance of physical media, why the best music is still made in basements, and his thoughts on blockchain in metal.",
    category: "interviews", 
    date: "2025-07-15",
    author: "UNDERGROUND_HERALD",
    authorReputation: 720,
    comments: 156,
    views: 2456,
    likes: 234,
    featured: true,
    tags: ["darkthrone", "interview", "underground", "fenriz", "web3"],
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    readTime: "12 min",
    verified: true
  },
  {
    id: "4",
    title: "🏆 35 Years of Bathory's 'Hammerheart' - Viking Metal Genesis",
    excerpt: "A deep dive into the album that birthed Viking metal and changed extreme music forever. How Quorthon's vision shaped an entire genre and influenced thousands of bands worldwide.",
    category: "history",
    date: "2025-07-10",
    author: "ARCHIVE_KEEPER",
    authorReputation: 650,
    comments: 89,
    views: 1567,
    likes: 123,
    featured: false,
    tags: ["bathory", "history", "viking metal", "quorthon", "legacy"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    readTime: "15 min",
    verified: true
  },
  {
    id: "5",
    title: "🌍 Underground Scene Report: Polish Black Metal Renaissance 2025",
    excerpt: "Poland's black metal scene is experiencing a massive revival. From Mgła's international success to new underground bands pushing boundaries, we explore the current Polish black metal landscape.",
    category: "scene",
    date: "2025-07-05",
    author: "EASTERN_HERALD",
    authorReputation: 580,
    comments: 34,
    views: 756,
    likes: 56,
    featured: false,
    tags: ["poland", "black metal", "scene", "underground", "mgła"],
    image: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=600&h=400&fit=crop",
    readTime: "10 min",
    verified: false
  },
  {
    id: "6",
    title: "💀 BREAKING: New Supergroup Features Members of Emperor, Mayhem & Burzum",
    excerpt: "In shocking news, former members of the Norwegian black metal elite have formed a new project called 'Nordland'. First album 'Eternal Winter' drops December 2025.",
    category: "scene",
    date: "2025-07-01",
    author: "BREAKING_NEWS",
    authorReputation: 720,
    comments: 267,
    views: 5678,
    likes: 445,
    featured: true,
    tags: ["supergroup", "emperor", "mayhem", "norway", "breaking"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    readTime: "7 min",
    verified: true
  }
];

export default function NewsroomPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [glitchActive, setGlitchActive] = useState(false);

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced filtering
  const filteredNews = mockNews.filter((news) => {
    const categoryMatch = activeCategory === "all" || news.category === activeCategory;
    const searchMatch = 
      news.title.toLowerCase().includes(search.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      news.author.toLowerCase().includes(search.toLowerCase()) ||
      news.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  // Sort by featured first, then by date
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
                <FaFire className="text-6xl md:text-7xl text-red-500 drop-shadow-2xl" />
                {glitchActive && (
                  <FaFire className="absolute top-0 left-0 text-6xl md:text-7xl text-red-400 animate-ping opacity-30" />
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
                  WAR CHRONICLES
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-gray-400 text-xl uppercase tracking-wide flex items-center gap-2">
                    <GiSkullCrossedBones className="text-red-500" />
                    Underground Journalism • Metal Newsroom
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-600/50">
                      {mockNews.length} Active Stories
                    </span>
                    <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-600/50 flex items-center gap-1">
                      <FaBolt className="text-xs" />
                      Breaking News
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/news/submit"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 border-2 border-red-600 transition-all duration-300 hover:scale-105 uppercase font-bold text-sm tracking-wide rounded-lg shadow-lg hover:shadow-red-600/50 flex items-center gap-2"
              >
                <FaPlus /> SUBMIT STORY
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ENHANCED CATEGORY FILTERS */}
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-600 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 transition-all duration-300 hover:scale-105 rounded-lg flex items-center gap-2 ${
                  activeCategory === cat.key
                    ? "bg-red-600 border-red-600 text-white shadow-lg"
                    : "bg-transparent border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-400"
                }`}
              >
                <cat.icon className={cat.color} />
                {cat.label}
                <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs">
                  {cat.key === 'all' ? mockNews.length : mockNews.filter(n => n.category === cat.key).length}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* ENHANCED SEARCH BAR */}
      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search war chronicles, tags, bands, authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-red-500 focus:border-red-500 text-white rounded-lg outline-none font-medium text-lg transition-all duration-300 shadow-lg"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hidden lg:flex items-center gap-2">
            <span className="px-2 py-1 bg-gray-700 rounded border">Ctrl</span>
            <span>+</span>
            <span className="px-2 py-1 bg-gray-700 rounded border">K</span>
          </div>
        </motion.div>
        
        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
          <GiFlame className="text-red-500" />
          <span className="font-bold text-white">{sortedNews.length}</span> war chronicles found
          {search && (
            <span className="text-gray-500">for "<span className="text-red-400">{search}</span>"</span>
          )}
        </div>
      </div>

      {/* ENHANCED NEWS LIST */}
      <main className="max-w-7xl mx-auto p-6 relative z-10">
        {sortedNews.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <GiCoffin className="text-8xl text-gray-600 mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl font-black text-gray-400 mb-4 uppercase tracking-wide">No Chronicles Found</h3>
            <p className="text-gray-500 mb-8 text-lg">The underground archives are empty for this search</p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-red-600 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl group ${
                  news.featured ? 'border-yellow-600 shadow-yellow-600/20' : ''
                }`}
              >
                <Link href={`/news/${news.id}`}>
                  <div className="relative">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
                    />
                    
                    {/* Enhanced Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 text-xs font-black uppercase rounded-full backdrop-blur-sm ${
                        news.category === 'releases' ? 'bg-blue-600/90 text-white' :
                        news.category === 'festivals' ? 'bg-green-600/90 text-white' :
                        news.category === 'interviews' ? 'bg-purple-600/90 text-white' :
                        news.category === 'history' ? 'bg-yellow-600/90 text-black' :
                        news.category === 'scene' ? 'bg-red-600/90 text-white' :
                        'bg-gray-600/90 text-white'
                      }`}>
                        {categories.find((c) => c.key === news.category)?.label || news.category}
                      </span>
                    </div>
                    
                    {/* Featured Badge */}
                    {news.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-yellow-500/90 text-black px-3 py-1 text-xs font-black uppercase rounded-full backdrop-blur-sm flex items-center gap-1">
                          <FaTrophy /> FEATURED
                        </span>
                      </div>
                    )}
                    
                    {/* Verified Badge */}
                    {news.verified && (
                      <div className="absolute bottom-3 right-3">
                        <div className="bg-green-500/90 text-white p-2 rounded-full backdrop-blur-sm" title="Verified Story">
                          <FaBolt className="text-sm" />
                        </div>
                      </div>
                    )}
                    
                    {/* Stats Overlay */}
                    <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
                      <span className="flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full backdrop-blur-sm">
                        <FaEye className="text-blue-400" /> {news.views}
                      </span>
                      <span className="flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full backdrop-blur-sm">
                        <FaRegCommentDots className="text-green-400" /> {news.comments}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors duration-300 mb-3 line-clamp-2 leading-tight">
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">
                      {news.excerpt}
                    </p>
                    
                    {/* Enhanced Author Info */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-600/20 border border-red-600/50 rounded-full flex items-center justify-center">
                          <FaUser className="text-red-400 text-xs" />
                        </div>
                        <div>
                          <span className="text-red-400 font-bold">{news.author}</span>
                          <div className="text-xs text-gray-500">Rep: {news.authorReputation}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-xs">{news.readTime} read</div>
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          <FaTrophy /> {news.likes}
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {news.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-700/50 text-gray-300 px-2 py-1 text-xs uppercase rounded border border-gray-600 hover:border-red-600 transition-colors duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                      {news.tags.length > 3 && (
                        <span className="text-gray-500 text-xs">+{news.tags.length - 3} more</span>
                      )}
                    </div>
                    
                    {/* Enhanced Footer */}
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-700">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-blue-400" /> {news.date}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FaEye /> {news.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegCommentDots /> {news.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ENHANCED FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-red-600 p-8 mt-16 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            {[GiDeathSkull, GiCoffin, GiGhost, GiSkullCrossedBones, GiBlackFlag].map((Icon, index) => (
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
            WAR CHRONICLES
          </h3>
          <p className="text-gray-400 uppercase tracking-wider mb-4">
            Metal Forge Newsroom • Underground Journalism • Breaking News
          </p>
          <p className="text-gray-600">
            Submit your stories • Underground only • No posers allowed
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
