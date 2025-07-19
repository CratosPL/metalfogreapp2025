// src/app/community/page.tsx - ROZBUDOWANA COMMUNITY
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy, FaMedal, FaUserCircle, FaCrown, FaStar, FaFire,
  FaHeart, FaComment, FaPlus, FaSearch, FaAward, FaUserFriends,
  FaCoins, FaShare, FaFlag, FaThumbsUp, FaThumbsDown, FaReply,
  FaBullhorn, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt
} from "react-icons/fa";
import { 
  GiWolfHead, GiDeathSkull, GiCoffin, GiGhost, GiThorHammer,
  GiCrossedSwords, GiDragonHead, GiSwordman
} from "react-icons/gi";
import Link from "next/link";

// Mock users (existing)
const mockUsers = [
  {
    id: "1", name: "METAL_SCRIBE", avatar: "https://i.pravatar.cc/100?img=11",
    score: 6666, rank: 1, country: "Norway", bandsAdded: 12, news: 9, comments: 48,
    badges: ["founder", "kvlt", "newsmaniac", "top10"], joined: "2024-02-01",
  },
  {
    id: "2", name: "DEATH_COLLECTOR", avatar: "https://i.pravatar.cc/100?img=12",
    score: 5444, rank: 2, country: "USA", bandsAdded: 8, news: 7, comments: 32,
    badges: ["top10", "hunter", "reviewer"], joined: "2024-03-15",
  },
  {
    id: "3", name: "UNDERGROUND_HERALD", avatar: "https://i.pravatar.cc/100?img=13",
    score: 5020, rank: 3, country: "Poland", bandsAdded: 6, news: 11, comments: 21,
    badges: ["top10", "newsmaniac"], joined: "2024-04-10",
  }
];

// Mock posts dla tablicy
const mockPosts = [
  {
    id: "p1",
    type: "announcement",
    user: "METAL_SCRIBE",
    avatar: "https://i.pravatar.cc/100?img=11",
    title: "Looking for Black Metal Drummer - Oslo",
    content: "Our band FROSTY TORMENT is looking for a session drummer for upcoming recording. Must have own kit and transport. Influences: Darkthrone, Burzum, early Emperor. Serious inquiries only.",
    timestamp: "2 hours ago",
    likes: 12,
    comments: 5,
    tips: 0.05, // ETH received in tips
    tags: ["drummer", "oslo", "black metal", "session"],
    location: "Oslo, Norway",
    contact: "frostytorment@protonmail.com"
  },
  {
    id: "p2",
    type: "event",
    user: "DEATH_COLLECTOR",
    avatar: "https://i.pravatar.cc/100?img=12",
    title: "Underground Metal Festival - Chicago 2025",
    content: "Organizing small underground fest in Chicago warehouse. Looking for 5-6 bands (death/black/doom only). No core, no mainstream. DIY spirit. Split door 50/50.",
    timestamp: "5 hours ago",
    likes: 23,
    comments: 8,
    tips: 0.12,
    tags: ["festival", "chicago", "underground", "diy"],
    location: "Chicago, USA",
    date: "2025-09-15",
    contact: "undergroundchi@tutanota.com"
  },
  {
    id: "p3",
    type: "trade",
    user: "UNDERGROUND_HERALD",
    avatar: "https://i.pravatar.cc/100?img=13",
    title: "TRADE: Bathory vinyl for Mayhem demos",
    content: "Have: Bathory - Blood Fire Death (original 1988 pressing, VG+). Want: Mayhem demos from 1987-1990, any condition. Can add cash if needed. Serious collectors only.",
    timestamp: "1 day ago",
    likes: 18,
    comments: 12,
    tips: 0.08,
    tags: ["trade", "vinyl", "bathory", "mayhem"],
    location: "Warsaw, Poland"
  },
  {
    id: "p4",
    type: "discussion",
    user: "KVLT_WARRIOR",
    avatar: "https://i.pravatar.cc/100?img=14",
    title: "Best Black Metal Albums of 2024?",
    content: "What are your top 5 black metal releases this year? I'm looking for truly underground stuff, no Spotify algorithmic bullshit. Raw production preferred.",
    timestamp: "2 days ago",
    likes: 31,
    comments: 24,
    tips: 0.15,
    tags: ["discussion", "black metal", "2024", "recommendations"]
  }
];

const badgeIcons: Record<string, JSX.Element> = {
  founder: <FaCrown className="text-yellow-400" title="Founder" />,
  kvlt: <GiDeathSkull className="text-red-400" title="Kvlt" />,
  newsmaniac: <FaFire className="text-orange-400" title="News Maniac" />,
  hunter: <FaAward className="text-green-400" title="Hunter" />,
  reviewer: <FaStar className="text-blue-400" title="Reviewer" />,
  top10: <FaTrophy className="text-yellow-400" title="Top 10" />,
};

const postTypeIcons: Record<string, { icon: JSX.Element; color: string }> = {
  announcement: { icon: <FaBullhorn />, color: "text-orange-400" },
  event: { icon: <FaCalendarAlt />, color: "text-blue-400" },
  trade: { icon: <GiCrossedSwords />, color: "text-green-400" },
  discussion: { icon: <FaComment />, color: "text-purple-400" }
};

export default function CommunityPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'ranking' | 'board' | 'create'>('board');
  const [selectedPostType, setSelectedPostType] = useState('announcement');
  const [showTipModal, setShowTipModal] = useState<string | null>(null);

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
      u.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreatePost = () => {
    console.log('Creating post:', newPost);
    // Reset form
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
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <GiWolfHead className="text-4xl text-red-400" />
            <div>
              <h1
                className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0]"
                style={{
                  fontFamily: "Impact, Arial Black, sans-serif",
                  textShadow: "2px 2px 0 #333, 4px 4px 0 #666",
                }}
              >
                COMMUNITY
              </h1>
              <p className="text-[#999] text-sm md:text-base uppercase tracking-wide">
                Underground Board • Rankings • Crypto Tips • Metal Network
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 border-2 border-red-600 transition-colors uppercase font-bold text-xs tracking-wide flex items-center gap-2"
            >
              <FaUserFriends /> Join Horde
            </Link>
          </div>
        </div>
      </header>

      {/* TABS */}
      <nav className="bg-[#111] border-b-2 border-[#333] p-4">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {[
            { key: 'board', label: 'UNDERGROUND BOARD', icon: FaBullhorn },
            { key: 'ranking', label: 'RANKINGS', icon: FaTrophy },
            { key: 'create', label: 'CREATE POST', icon: FaPlus }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 text-xs uppercase font-bold tracking-wide border-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-transparent border-[#333] text-[#ccc] hover:border-red-600'
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* UNDERGROUND BOARD TAB */}
      {activeTab === 'board' && (
        <section className="max-w-7xl mx-auto p-6">
          {/* SEARCH */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search posts, tags, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#111] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none font-mono"
            />
          </div>

          {/* POSTS */}
          <div className="space-y-6">
            {mockPosts.map(post => (
              <motion.div
                key={post.id}
                whileHover={{ x: 5 }}
                className="bg-[#111] border-2 border-[#333] hover:border-red-600 transition-colors"
              >
                {/* POST HEADER */}
                <div className="border-b border-[#333] p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-12 h-12 rounded-full grayscale contrast-125 brightness-90"
                      style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`${postTypeIcons[post.type].color}`}>
                          {postTypeIcons[post.type].icon}
                        </span>
                        <h3 className="font-bold text-[#e0e0e0] text-lg">{post.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#999]">
                        <span className="font-bold text-red-400">{post.user}</span>
                        <span>{post.timestamp}</span>
                        {post.location && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt /> {post.location}
                          </span>
                        )}
                        {post.date && (
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt /> {post.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* POST CONTENT */}
                <div className="p-4">
                  <p className="text-[#ccc] mb-4 leading-relaxed">{post.content}</p>
                  
                  {post.contact && (
                    <div className="bg-[#0a0a0a] border border-[#333] p-3 mb-4">
                      <span className="text-xs text-[#666] uppercase">Contact:</span>
                      <span className="text-green-400 ml-2 font-mono">{post.contact}</span>
                    </div>
                  )}

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-[#333] text-[#ccc] px-2 py-1 text-xs uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* POST ACTIONS */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-[#999] hover:text-red-400">
                        <FaThumbsUp /> {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-[#999] hover:text-blue-400">
                        <FaComment /> {post.comments}
                      </button>
                      <button className="flex items-center gap-1 text-[#999] hover:text-green-400">
                        <FaShare /> Share
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {post.tips > 0 && (
                        <span className="flex items-center gap-1 text-yellow-400 text-sm">
                          <FaCoins /> {post.tips} ETH
                        </span>
                      )}
                      <button
                        onClick={() => setShowTipModal(post.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-black px-3 py-1 text-xs uppercase font-bold flex items-center gap-1"
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

      {/* RANKING TAB (existing content) */}
      {activeTab === 'ranking' && (
        <section className="max-w-7xl mx-auto p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaTrophy className="text-yellow-400 text-2xl" />
            <h2 className="text-xl font-black uppercase tracking-widest">Top Metalheads</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredUsers.map((user, idx) => (
              <motion.div
                key={user.id}
                whileHover={{ y: -2 }}
                className={`bg-[#111] border-2 border-[#333] ${
                  idx === 0 ? "border-yellow-600" : "hover:border-red-600"
                } transition-colors flex gap-4 items-center p-4`}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full grayscale contrast-125 brightness-90 border-2 border-[#333]"
                    style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                  />
                  {user.rank === 1 && (
                    <FaCrown className="absolute -top-2 -right-2 text-yellow-400 text-2xl" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black uppercase tracking-wide text-[#e0e0e0]">
                      {user.name}
                    </h3>
                    <span className="text-xs bg-[#333] text-[#ccc] px-2 py-1 uppercase font-bold ml-2">
                      {user.country}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-1 text-xs text-[#999]">
                    <span>
                      <FaTrophy className="inline mr-1 text-yellow-400" />
                      {user.score} pts
                    </span>
                    <span>
                      <FaPlus className="inline mr-1" />
                      {user.bandsAdded} bands
                    </span>
                    <span>
                      <FaFire className="inline mr-1 text-orange-400" />
                      {user.news} news
                    </span>
                    <span>
                      <FaComment className="inline mr-1 text-blue-400" />
                      {user.comments} comments
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {user.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 bg-[#222] px-2 py-1 text-xs font-bold uppercase text-[#ccc] border border-[#333]"
                      >
                        {badgeIcons[badge]} {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/community/profile/${user.id}`}
                  className="ml-2 text-xs uppercase font-bold text-red-400 hover:text-red-300"
                >
                  View
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CREATE POST TAB */}
      {activeTab === 'create' && (
        <section className="max-w-4xl mx-auto p-6">
          <div className="bg-[#111] border-2 border-[#333] p-6">
            <div className="flex items-center gap-3 mb-6">
              <GiThorHammer className="text-3xl text-red-400" />
              <h2 className="text-2xl font-black uppercase tracking-wide">Create Underground Post</h2>
            </div>

            <div className="space-y-6">
              {/* POST TYPE */}
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-3 uppercase">Post Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(postTypeIcons).map(([type, { icon, color }]) => (
                    <button
                      key={type}
                      onClick={() => setNewPost(prev => ({ ...prev, type }))}
                      className={`p-3 border-2 transition-colors flex items-center gap-2 text-sm uppercase font-bold ${
                        newPost.type === type
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'bg-transparent border-[#333] text-[#ccc] hover:border-red-600'
                      }`}
                    >
                      <span className={color}>{icon}</span>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none"
                  placeholder="e.g., Looking for Black Metal Drummer - Oslo"
                />
              </div>

              {/* CONTENT */}
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none resize-none"
                  placeholder="Describe your announcement, event, trade offer, or discussion topic..."
                />
              </div>

              {/* ADDITIONAL FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Location</label>
                  <input
                    type="text"
                    value={newPost.location}
                    onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none"
                    placeholder="e.g., Oslo, Norway"
                  />
                </div>
                
                {newPost.type === 'event' && (
                  <div>
                    <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Date</label>
                    <input
                      type="date"
                      value={newPost.date}
                      onChange={(e) => setNewPost(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none"
                    />
                  </div>
                )}
                
                {(newPost.type === 'announcement' || newPost.type === 'event') && (
                  <div>
                    <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Contact</label>
                    <input
                      type="text"
                      value={newPost.contact}
                      onChange={(e) => setNewPost(prev => ({ ...prev, contact: e.target.value }))}
                      className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none"
                      placeholder="email@protonmail.com"
                    />
                  </div>
                )}
              </div>

              {/* TAGS */}
              <div>
                <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Tags</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none"
                  placeholder="drummer, oslo, black metal, session (separated by commas)"
                />
              </div>

              {/* SUBMIT */}
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('board')}
                  className="flex-1 bg-transparent border-2 border-[#666] text-[#ccc] hover:bg-[#222] py-3 uppercase font-bold tracking-wide"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 uppercase font-bold tracking-wide"
                >
                  Post to Underground Board
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TIP MODAL */}
      {showTipModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] border-2 border-[#333] max-w-md w-full p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaCoins className="text-3xl text-yellow-400" />
              <h3 className="text-xl font-bold text-[#e0e0e0] uppercase">Send Crypto Tip</h3>
            </div>

            <p className="text-[#ccc] mb-4">
              Support this underground post with a crypto tip. All tips go directly to the poster.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {[0.001, 0.005, 0.01, 0.02, 0.05, 0.1].map(amount => (
                <button
                  key={amount}
                  onClick={() => handleTip(showTipModal, amount)}
                  className="bg-[#0a0a0a] border border-[#333] hover:border-yellow-600 p-3 text-center transition-colors"
                >
                  <div className="text-yellow-400 font-bold">{amount} ETH</div>
                  <div className="text-xs text-[#666]">${(amount * 2000).toFixed(0)}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowTipModal(null)}
                className="flex-1 bg-transparent border-2 border-[#666] text-[#ccc] hover:bg-[#222] py-3 uppercase font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowTipModal(null)}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black py-3 uppercase font-bold text-sm"
              >
                Custom Amount
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#111] border-t-4 border-[#333] p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <GiDeathSkull className="text-xl text-[#666]" />
            <GiCoffin className="text-xl text-[#666]" />
            <GiGhost className="text-xl text-[#666]" />
          </div>
          <p className="text-[#666] text-sm uppercase tracking-widest">
            UNDERGROUND COMMUNITY • CRYPTO TIPS • METAL NETWORK
          </p>
          <p className="text-[#444] text-xs mt-2">
            Connect • Support • Trade • No posers allowed
          </p>
        </div>
      </footer>
    </div>
  );
}
