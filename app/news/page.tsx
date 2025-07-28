"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlus, FaFilter, FaRegCommentDots, FaRegClock, FaRegBookmark,
  FaFire, FaTags, FaEthereum, FaBolt, FaEye, FaUser, FaNewspaper,
  FaSearch, FaTrophy, FaCalendarAlt, FaArrowUp, FaSkullCrossbones
} from "react-icons/fa";
import { 
  GiDeathSkull, GiCoffin, GiGhost, GiNewShoot, GiSkullCrossedBones,
  GiVikingHelmet, GiGothicCross, GiBloodySword, GiBattleAxe,
  GiFlame, GiWolfHead, GiThorHammer, GiCrossedSwords, GiBlackFlag
} from "react-icons/gi";
import Link from "next/link";
import Footer from "../../components/Footer";

// Enhanced categories w stylu Zine
const categories = [
  { key: "all", label: "All Chronicles", icon: FaNewspaper, color: "text-red-800" },
  { key: "scene", label: "Underground Scene", icon: GiCrossedSwords, color: "text-red-800" },
  { key: "releases", label: "New Releases", icon: GiThorHammer, color: "text-red-800" },
  { key: "festivals", label: "War Gatherings", icon: GiBattleAxe, color: "text-red-800" },
  { key: "interviews", label: "Legion Interviews", icon: FaUser, color: "text-red-800" },
  { key: "history", label: "Metal Archives", icon: GiVikingHelmet, color: "text-red-800" },
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
  const [displayStats] = useState({ bands: 2847, demos: 15392, users: 8921, earnings: 127.5 });

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
        <div className="animate-pulse text-6xl text-red-800 absolute top-20 left-20 transform rotate-15">☠</div>
        <div className="animate-pulse text-5xl text-black absolute top-40 right-40 transform -rotate-12">☠</div>
        <div className="animate-pulse text-4xl text-red-800 absolute bottom-40 left-1/3 transform rotate-10">☠</div>
        <div className="animate-pulse text-5xl text-black absolute bottom-20 right-20 transform -rotate-8">☠</div>
      </div>

      {/* ENHANCED HEADER w stylu Zine */}
      <header 
        className="bg-[#f5f5e8] border-b-4 border-black p-8 pt-32 relative z-10 zine-header"
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
                <FaSkullCrossbones className="text-6xl md:text-7xl text-red-800 drop-shadow-2xl filter grayscale contrast-200" />
                {glitchActive && (
                  <FaSkullCrossbones className="absolute top-0 left-0 text-6xl md:text-7xl text-red-600 animate-ping opacity-30" />
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
                  WAR CHRONICLES
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-black text-xl uppercase tracking-wide flex items-center gap-2 font-zine-body">
                    <GiSkullCrossedBones className="text-red-800" />
                    Underground Journalism • Metal Newsroom
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="bg-red-800 text-white px-3 py-1 rounded-none text-sm font-bold border-2 border-black font-zine-body">
                      {mockNews.length} Active Stories
                    </span>
                    <span className="bg-black text-red-800 px-3 py-1 rounded-none text-sm font-bold border-2 border-red-800 flex items-center gap-1 font-zine-body">
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
                className="skull-button text-[#d0d0d0] px-6 py-3 border-2 border-red-800 transition-all duration-300 hover:scale-105 uppercase font-bold text-sm tracking-wide rounded-none shadow-metal flex items-center gap-2 font-zine-body"
              >
                <FaPlus /> SUBMIT STORY
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ENHANCED CATEGORY FILTERS w stylu Zine */}
      <nav 
        className="bg-[#e0e0d8] border-b-4 border-black p-6 relative z-10 zine-section"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(224, 224, 216, 0.95)"
        }}
      >
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
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 transition-all duration-300 hover:scale-105 rounded-none flex items-center gap-2 font-zine-body ${
                  activeCategory === cat.key
                    ? "bg-red-800 border-red-800 text-white shadow-metal"
                    : "bg-[#f5f5e8] border-black text-black hover:border-red-800 hover:text-red-800"
                }`}
              >
                <cat.icon className={activeCategory === cat.key ? "text-white" : "text-red-800"} />
                {cat.label}
                <span className="bg-black text-white px-2 py-1 rounded-none text-xs border border-red-800 font-zine-body">
                  {cat.key === 'all' ? mockNews.length : mockNews.filter(n => n.category === cat.key).length}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* ENHANCED SEARCH BAR w stylu Zine */}
      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-lg" />
          <input
            type="text"
            placeholder="Search war chronicles, tags, bands, authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-[#e0e0d8] backdrop-blur-sm border-2 border-black hover:border-red-800 focus:border-red-800 text-black rounded-none outline-none font-medium text-lg transition-all duration-300 shadow-metal zine-card font-zine-body"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-black hidden lg:flex items-center gap-2 font-zine-body">
            <span className="px-2 py-1 bg-black text-white rounded-none border border-black">Ctrl</span>
            <span>+</span>
            <span className="px-2 py-1 bg-black text-white rounded-none border border-black">K</span>
          </div>
        </motion.div>
        
        {/* Results count */}
        <div className="mt-4 text-sm text-black flex items-center gap-2 font-zine-body">
          <GiFlame className="text-red-800" />
          <span className="font-bold text-black font-zine-title">{sortedNews.length}</span> war chronicles found
          {search && (
            <span className="text-black">for "<span className="text-red-800 font-bold">{search}</span>"</span>
          )}
        </div>
      </div>

      {/* ENHANCED NEWS LIST w stylu Zine */}
      <main className="max-w-7xl mx-auto p-6 relative z-10">
        {sortedNews.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-[#f5f5e8] border-4 border-black zine-card"
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <GiWolfHead className="text-8xl text-black mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-black mb-4 uppercase tracking-wide font-zine-title">No Chronicles Found</h3>
            <p className="text-black mb-8 text-lg font-zine-body">The underground archives are empty for this search</p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="skull-button text-[#d0d0d0] px-8 py-3 rounded-none font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 font-zine-body"
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
                className={`bg-[#f5f5e8] border-4 border-black hover:border-red-800 transition-all duration-300 rounded-none overflow-hidden shadow-metal group zine-card ${
                  news.featured ? 'featured-article' : ''
                }`}
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.9)"
                }}
              >
                <Link href={`/news/${news.id}`}>
                  <div className="relative">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-56 object-cover filter grayscale contrast-200 border-b-2 border-black transition-all duration-500"
                    />
                    
                    {/* Enhanced Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-800 text-white px-3 py-1 text-xs font-bold uppercase rounded-none backdrop-blur-sm font-zine-body">
                        {categories.find((c) => c.key === news.category)?.label || news.category}
                      </span>
                    </div>
                    
                    {/* Featured Badge */}
                    {news.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-black text-red-800 px-3 py-1 text-xs font-bold uppercase rounded-none backdrop-blur-sm flex items-center gap-1 font-zine-body border-2 border-red-800">
                          <FaTrophy /> FEATURED
                        </span>
                      </div>
                    )}
                    
                    {/* Verified Badge */}
                    {news.verified && (
                      <div className="absolute bottom-3 right-3">
                        <div className="bg-red-800 text-white p-2 rounded-none backdrop-blur-sm border-2 border-black" title="Verified Story">
                          <FaBolt className="text-sm" />
                        </div>
                      </div>
                    )}
                    
                    {/* Stats Overlay */}
                    <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
                      <span className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-none backdrop-blur-sm font-zine-body">
                        <FaEye className="text-red-800" /> {news.views}
                      </span>
                      <span className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-none backdrop-blur-sm font-zine-body">
                        <FaRegCommentDots className="text-red-800" /> {news.comments}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black group-hover:text-red-800 transition-colors duration-300 mb-3 line-clamp-2 leading-tight font-zine-title uppercase">
                      {news.title}
                    </h3>
                    
                    <p className="text-black mb-4 leading-relaxed text-sm line-clamp-3 font-zine-body">
                      {news.excerpt}
                    </p>
                    
                    {/* Enhanced Author Info */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-800 border-2 border-black rounded-none flex items-center justify-center">
                          <FaUser className="text-white text-xs" />
                        </div>
                        <div>
                          <span className="text-red-800 font-bold font-zine-body">{news.author}</span>
                          <div className="text-xs text-black font-zine-body">Rep: {news.authorReputation}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-black text-xs font-zine-body">{news.readTime} read</div>
                        <div className="flex items-center gap-1 text-red-800 text-xs font-zine-body">
                          <FaTrophy /> {news.likes}
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {news.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-black text-red-800 px-2 py-1 text-xs uppercase rounded-none border border-red-800 hover:bg-red-800 hover:text-white transition-colors duration-300 font-zine-body"
                        >
                          #{tag}
                        </span>
                      ))}
                      {news.tags.length > 3 && (
                        <span className="text-black text-xs font-zine-body">+{news.tags.length - 3} more</span>
                      )}
                    </div>
                    
                    {/* Enhanced Footer */}
                    <div className="flex justify-between items-center text-xs text-black pt-4 border-t-2 border-black font-zine-body">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-red-800" /> {news.date}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FaEye className="text-red-800" /> {news.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegCommentDots className="text-red-800" /> {news.comments}
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
        
        .featured-article {
          border-color: #dc2626 !important;
          border-width: 4px !important;
          box-shadow: 
            0 0 20px rgba(220, 38, 38, 0.5),
            inset 0 0 10px rgba(220, 38, 38, 0.1) !important;
          transform: scale(1.02);
        }

        .featured-article:hover {
          transform: scale(1.05) !important;
          box-shadow: 
            0 0 30px rgba(220, 38, 38, 0.7),
            inset 0 0 15px rgba(220, 38, 38, 0.15) !important;
        }
        
        .font-zine-title {
          font-family: "Blackletter", serif;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .font-zine-body {
          font-family: "Special Elite", monospace;
        }
        
        @media (max-width: 640px) {
          h1 {
            font-size: 2.5rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
