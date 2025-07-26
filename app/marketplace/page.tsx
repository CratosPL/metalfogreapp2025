"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaStore, FaFilter, FaSort, FaHeart, FaEye, FaShoppingCart,
  FaPlus, FaSearch, FaMapMarkerAlt, FaClock, FaShieldAlt,
  FaExchangeAlt, FaCoins, FaStar, FaUser, FaCompactDisc,
  FaEthereum, FaBolt, FaTrophy, FaFire, FaTimes
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCoffin, GiGhost, GiTreasureMap, GiSwordman,
  GiCrossedSwords, GiThorHammer, GiSkullCrossedBones, GiVikingHelmet,
  GiGothicCross, GiBloodySword, GiBattleAxe, GiDragonHead,
  GiWolfHead, GiFlame, GiBlackFlag, GiCrown
} from 'react-icons/gi';
import Link from 'next/link';

// Enhanced mock marketplace data
const mockItems = [
  {
    id: "1",
    title: "Mayhem - De Mysteriis Dom Sathanas",
    type: "Physical",
    category: "Vinyl",
    price: "0.15 ETH",
    priceUSD: "$245",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    seller: "VINYL_COLLECTOR",
    sellerRating: 4.8,
    sellerReputation: 950,
    location: "Norway",
    condition: "Mint",
    description: "Original 1994 pressing on Deathlike Silence Productions. Gatefold sleeve in absolutely perfect condition. One of the most important and controversial black metal albums ever recorded. Comes with original inner sleeve and all inserts.",
    shipping: "Worldwide",
    escrow: true,
    featured: true,
    verified: true,
    likes: 47,
    views: 234,
    listedDate: "2025-07-20",
    rarity: "ULTRA RARE",
    tags: ["Black Metal", "Mayhem", "Vinyl", "Rare", "1994", "Legendary"]
  },
  {
    id: "2",
    title: "Darkthrone Logo NFT #23",
    type: "NFT",
    category: "Digital Art",
    price: "0.08 ETH",
    priceUSD: "$130",
    image: "https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=400&h=400&fit=crop",
    seller: "KVLT_TRADER",
    sellerRating: 4.9,
    sellerReputation: 875,
    location: "Digital",
    condition: "Mint",
    description: "Exclusive Darkthrone logo NFT from the legendary Norwegian black metal pioneers. Part of limited collection of 100 pieces. Hand-drawn by Fenriz himself and minted on Optimism blockchain.",
    shipping: "Instant",
    escrow: true,
    featured: false,
    verified: true,
    likes: 23,
    views: 156,
    listedDate: "2025-07-18",
    rarity: "LEGENDARY",
    edition: "23/100",
    tags: ["NFT", "Darkthrone", "Logo", "Limited", "Fenriz", "Hand-drawn"]
  },
  {
    id: "3",
    title: "Emperor - In The Nightside Eclipse",
    type: "Physical",
    category: "CD",
    price: "0.05 ETH",
    priceUSD: "$82",
    image: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=400&h=400&fit=crop",
    seller: "SYMPHONIC_LORD",
    sellerRating: 4.7,
    sellerReputation: 720,
    location: "Germany",
    condition: "Very Good",
    description: "Classic symphonic black metal masterpiece from 1994. Original Candlelight Records pressing with full booklet. Minor wear on jewel case but CD plays perfectly. Essential for any black metal collection.",
    shipping: "Europe only",
    escrow: true,
    featured: false,
    verified: true,
    likes: 31,
    views: 189,
    listedDate: "2025-07-15",
    rarity: "RARE",
    tags: ["CD", "Emperor", "Black Metal", "Symphonic", "1994", "Candlelight"]
  },
  {
    id: "4",
    title: "Bathory - Blood Fire Death Vintage Tee",
    type: "Physical",
    category: "Merchandise",
    price: "0.03 ETH",
    priceUSD: "$49",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    seller: "MERCH_HUNTER",
    sellerRating: 4.6,
    sellerReputation: 650,
    location: "Sweden",
    condition: "Good",
    description: "Authentic vintage Bathory t-shirt from the early 90s. Size Large. Shows proper wear and fading that proves its authenticity. No holes or major damage. True kvlt merchandise for collectors.",
    shipping: "Worldwide",
    escrow: true,
    featured: false,
    verified: false,
    likes: 18,
    views: 92,
    listedDate: "2025-07-10",
    rarity: "VINTAGE",
    tags: ["Merchandise", "Bathory", "T-Shirt", "Vintage", "90s", "Authentic"]
  },
  {
    id: "5",
    title: "Burzum - Filosofem Original Cassette",
    type: "Physical",
    category: "Cassette",
    price: "0.12 ETH",
    priceUSD: "$195",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    seller: "TAPE_KEEPER",
    sellerRating: 5.0,
    sellerReputation: 999,
    location: "Norway",
    condition: "Mint",
    description: "Original 1996 Misanthropy Records cassette tape. Factory sealed! Atmospheric black metal classic that defined a generation. Extremely rare to find sealed. Investment piece for serious collectors.",
    shipping: "Worldwide",
    escrow: true,
    featured: true,
    verified: true,
    likes: 67,
    views: 445,
    listedDate: "2025-07-05",
    rarity: "MUSEUM PIECE",
    tags: ["Cassette", "Burzum", "Sealed", "Rare", "1996", "Misanthropy", "Investment"]
  },
  {
    id: "6",
    title: "Morbid Angel - Altars of Madness LP",
    type: "Physical",
    category: "Vinyl",
    price: "0.09 ETH",
    priceUSD: "$147",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    seller: "DEATH_DEALER",
    sellerRating: 4.8,
    sellerReputation: 845,
    location: "USA",
    condition: "Near Mint",
    description: "Death metal masterpiece from 1989. Original Earache Records pressing. Slight ring wear on cover but vinyl is absolutely pristine. One of the most influential death metal albums ever created.",
    shipping: "North America",
    escrow: true,
    featured: false,
    verified: true,
    likes: 42,
    views: 278,
    listedDate: "2025-07-01",
    rarity: "CLASSIC",
    tags: ["Vinyl", "Morbid Angel", "Death Metal", "1989", "Earache", "Classic"]
  }
];

const categories = [
  { key: "all", label: "All Treasures", icon: FaStore, count: mockItems.length, color: "text-orange-400" },
  { key: "vinyl", label: "Vinyl Records", icon: FaCompactDisc, count: mockItems.filter(i => i.category === "Vinyl").length, color: "text-red-400" },
  { key: "cd", label: "Compact Discs", icon: FaCompactDisc, count: mockItems.filter(i => i.category === "CD").length, color: "text-blue-400" },
  { key: "cassette", label: "Cassette Tapes", icon: GiCoffin, count: mockItems.filter(i => i.category === "Cassette").length, color: "text-purple-400" },
  { key: "merchandise", label: "Metal Merch", icon: GiThorHammer, count: mockItems.filter(i => i.category === "Merchandise").length, color: "text-green-400" },
  { key: "nft", label: "Digital NFTs", icon: GiDeathSkull, count: mockItems.filter(i => i.type === "NFT").length, color: "text-yellow-400" }
];

const conditions = ["All", "Mint", "Near Mint", "Very Good", "Good", "Fair"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "rarity", label: "Rarity" }
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced filter items
  const filteredItems = mockItems.filter(item => {
    const categoryMatch = selectedCategory === "all" || 
                         item.category.toLowerCase() === selectedCategory ||
                         (selectedCategory === "nft" && item.type === "NFT");
    const conditionMatch = selectedCondition === "All" || item.condition === selectedCondition;
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                       item.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && conditionMatch && searchMatch;
  });

  // Enhanced sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price.replace(" ETH", "")) - parseFloat(b.price.replace(" ETH", ""));
      case "price-high":
        return parseFloat(b.price.replace(" ETH", "")) - parseFloat(a.price.replace(" ETH", ""));
      case "popular":
        return b.views - a.views;
      case "rarity":
        const rarityOrder = { "MUSEUM PIECE": 0, "ULTRA RARE": 1, "LEGENDARY": 2, "RARE": 3, "CLASSIC": 4, "VINTAGE": 5 };
        return (rarityOrder[a.rarity as keyof typeof rarityOrder] ?? 10) - (rarityOrder[b.rarity as keyof typeof rarityOrder] ?? 10);
      case "oldest":
        return new Date(a.listedDate).getTime() - new Date(b.listedDate).getTime();
      default: // newest
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
    }
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
                <GiTreasureMap className="text-6xl md:text-7xl text-orange-500 drop-shadow-2xl" />
                {glitchActive && (
                  <GiTreasureMap className="absolute top-0 left-0 text-6xl md:text-7xl text-orange-400 animate-ping opacity-30" />
                )}
              </div>
              <div>
                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest text-white mb-2 ${glitchActive ? 'animate-pulse text-orange-100' : ''}`}
                  style={{
                    textShadow: glitchActive 
                      ? '0 0 20px rgba(251, 146, 60, 0.8), 0 0 40px rgba(251, 146, 60, 0.5)' 
                      : '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(251, 146, 60, 0.3)'
                  }}
                >
                  UNDERGROUND BAZAAR
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-gray-400 text-xl uppercase tracking-wide flex items-center gap-2">
                    <GiSkullCrossedBones className="text-orange-500" />
                    Rare Vinyl • NFTs • Metal Collectibles
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-sm font-bold border border-orange-600/50">
                      {mockItems.length} Treasures Available
                    </span>
                    <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-600/50 flex items-center gap-1">
                      <FaShieldAlt className="text-xs" />
                      Escrow Protected
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/marketplace/sell"
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 border-2 border-orange-600 transition-all duration-300 hover:scale-105 uppercase font-bold text-sm tracking-wide rounded-lg shadow-lg hover:shadow-orange-600/50 flex items-center gap-2"
              >
                <FaPlus /> SELL TREASURE
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ENHANCED SEARCH & FILTERS */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-600 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-6"
          >
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search underground treasures, bands, sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600 hover:border-orange-500 focus:border-orange-500 text-white rounded-lg outline-none font-medium text-lg transition-all duration-300 shadow-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hidden lg:flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-700 rounded border">Ctrl</span>
              <span>+</span>
              <span className="px-2 py-1 bg-gray-700 rounded border">K</span>
            </div>
          </motion.div>

          {/* Enhanced Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-6"
          >
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 transition-all duration-300 hover:scale-105 rounded-lg flex items-center gap-2 ${
                  selectedCategory === category.key
                    ? 'bg-orange-600 border-orange-600 text-white shadow-lg'
                    : 'bg-transparent border-gray-600 text-gray-300 hover:border-orange-600 hover:text-orange-400'
                }`}
              >
                <category.icon className={category.color} /> 
                {category.label} 
                <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Enhanced Filters & Sort */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          >
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-4 py-3 bg-gray-800 border-2 border-gray-600 hover:border-orange-500 focus:border-orange-500 text-white text-sm uppercase font-medium rounded-lg outline-none transition-all duration-300"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>Condition: {condition}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-800 border-2 border-gray-600 hover:border-orange-500 focus:border-orange-500 text-white text-sm uppercase font-medium rounded-lg outline-none transition-all duration-300"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <GiDeathSkull className="text-red-500" />
                <span className="font-bold text-white">{sortedItems.length}</span> treasures found
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED ITEMS GRID */}
      <main className="max-w-7xl mx-auto p-6 relative z-10">
        {sortedItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <GiCoffin className="text-8xl text-gray-600 mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl font-black text-gray-400 mb-4 uppercase tracking-wide">No Treasures Found</h3>
            <p className="text-gray-500 mb-8 text-lg">The underground vaults are empty for this search</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedCondition('All');
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-orange-600 transition-all duration-300 cursor-pointer rounded-xl overflow-hidden shadow-2xl group"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
                  />
                  
                  {/* Enhanced Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  
                  {/* Enhanced Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.featured && (
                      <span className="bg-yellow-500/90 text-black px-3 py-1 text-xs font-black uppercase rounded-full backdrop-blur-sm">
                        ⭐ FEATURED
                      </span>
                    )}
                    <span className={`px-3 py-1 text-xs font-black uppercase rounded-full backdrop-blur-sm ${
                      item.type === 'NFT' ? 'bg-purple-600/90 text-white' : 'bg-blue-600/90 text-white'
                    }`}>
                      {item.type}
                    </span>
                    {item.verified && (
                      <span className="bg-green-500/90 text-white px-3 py-1 text-xs font-black uppercase rounded-full backdrop-blur-sm flex items-center gap-1">
                        <FaShieldAlt className="text-xs" /> VERIFIED
                      </span>
                    )}
                  </div>

                  {/* Rarity Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-xs font-black uppercase rounded-full backdrop-blur-sm ${
                      item.rarity === 'MUSEUM PIECE' ? 'bg-red-600/90 text-white' :
                      item.rarity === 'ULTRA RARE' ? 'bg-purple-600/90 text-white' :
                      item.rarity === 'LEGENDARY' ? 'bg-yellow-600/90 text-black' :
                      'bg-gray-600/90 text-white'
                    }`}>
                      {item.rarity}
                    </span>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
                    <span className="flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      <FaHeart className="text-red-400" /> {item.likes}
                    </span>
                    <span className="flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      <FaEye className="text-blue-400" /> {item.views}
                    </span>
                  </div>

                  {/* Escrow Protection */}
                  {item.escrow && (
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-green-500/90 text-white p-2 rounded-full backdrop-blur-sm" title="Escrow Protected">
                        <FaShieldAlt className="text-sm" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-black text-white mb-2 text-lg group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                    <GiSkullCrossedBones className="text-orange-500" />
                    {item.category}
                    {item.edition && (
                      <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">
                        {item.edition}
                      </span>
                    )}
                  </p>
                  
                  {/* Enhanced Seller Info */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-600" />
                      <span className="text-gray-300 font-bold">{item.seller}</span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-gray-400">{item.sellerRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <FaTrophy className="text-yellow-400" />
                      <span className="text-yellow-400 font-bold">{item.sellerReputation}</span>
                    </div>
                  </div>

                  {/* Location & Shipping */}
                  <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-400" /> {item.location}
                    </span>
                    <span className="bg-gray-700/50 px-2 py-1 rounded">{item.shipping}</span>
                  </div>
                  
                  {/* Enhanced Price */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Current Price</div>
                      <div className="font-black text-orange-400 text-xl">{item.price}</div>
                      <div className="text-xs text-gray-500">{item.priceUSD}</div>
                    </div>
                    <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-3 text-sm font-black uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
                      <FaShoppingCart /> BUY
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ENHANCED ITEM DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-orange-600 max-w-6xl w-full max-h-[95vh] overflow-y-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Enhanced Image */}
              <div className="relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-96 lg:h-full object-cover"
                  style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-white bg-black/80 w-10 h-10 flex items-center justify-center hover:bg-black rounded-full transition-all duration-300 hover:scale-110"
                >
                  <FaTimes />
                </button>
                
                {/* Enhanced Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {selectedItem.featured && (
                    <span className="bg-yellow-500/90 text-black px-3 py-1 text-sm font-black uppercase rounded-full">
                      ⭐ FEATURED
                    </span>
                  )}
                  <span className={`px-3 py-1 text-sm font-black uppercase rounded-full ${
                    selectedItem.type === 'NFT' ? 'bg-purple-600/90 text-white' : 'bg-blue-600/90 text-white'
                  }`}>
                    {selectedItem.type}
                  </span>
                </div>
              </div>
              
              {/* Enhanced Details */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">{selectedItem.title}</h2>
                    <div className="flex items-center gap-3 text-lg">
                      <span className="text-gray-400">{selectedItem.category}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400">{selectedItem.type}</span>
                      {selectedItem.edition && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="text-yellow-400 font-bold">{selectedItem.edition}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className={`px-4 py-2 text-lg font-black uppercase rounded-lg ${
                    selectedItem.rarity === 'MUSEUM PIECE' ? 'bg-red-600 text-white' :
                    selectedItem.rarity === 'ULTRA RARE' ? 'bg-purple-600 text-white' :
                    selectedItem.rarity === 'LEGENDARY' ? 'bg-yellow-600 text-black' :
                    'bg-gray-600 text-white'
                  }`}>
                    {selectedItem.condition}
                  </span>
                </div>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Enhanced Seller Info */}
                <div className="bg-gray-900/50 border-2 border-gray-700 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-black text-white mb-4 uppercase flex items-center gap-2">
                    <FaUser className="text-orange-400" />
                    Seller Information
                  </h3>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Seller</div>
                      <div className="text-white font-bold text-lg">{selectedItem.seller}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Rating</div>
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span className="text-white font-bold">{selectedItem.sellerRating}</span>
                        <span className="text-gray-500">({selectedItem.sellerReputation} rep)</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Location</div>
                      <div className="text-white flex items-center gap-1">
                        <FaMapMarkerAlt className="text-blue-400" />
                        {selectedItem.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Shipping</div>
                      <div className="text-white">{selectedItem.shipping}</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Price & Purchase */}
                <div className="bg-gradient-to-r from-orange-600/20 to-orange-800/20 border-2 border-orange-600/50 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Current Price</div>
                      <div className="text-4xl font-black text-orange-400 mb-1">{selectedItem.price}</div>
                      <div className="text-lg text-gray-400">{selectedItem.priceUSD}</div>
                    </div>
                    {selectedItem.escrow && (
                      <div className="text-center bg-green-600/20 border border-green-600/50 rounded-lg p-4">
                        <FaShieldAlt className="text-green-400 text-3xl mx-auto mb-2" />
                        <div className="text-sm font-bold text-green-400">ESCROW</div>
                        <div className="text-xs text-gray-400">Protected Trade</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 text-lg font-black uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                      <FaShoppingCart /> BUY NOW
                    </button>
                    <button className="px-6 bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 py-4 text-lg font-black uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105">
                      <FaHeart />
                    </button>
                  </div>
                </div>

                {/* Enhanced Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-black text-white mb-3 uppercase flex items-center gap-2">
                    <GiBlackFlag className="text-red-500" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag: string) => (
                      <span key={tag} className="bg-gray-700/50 text-gray-300 px-3 py-1 text-sm uppercase rounded-full border border-gray-600 hover:border-orange-600 transition-colors duration-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-700 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaEye className="text-blue-400" /> {selectedItem.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-red-400" /> {selectedItem.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-yellow-400" /> Listed {selectedItem.listedDate}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ENHANCED FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t-4 border-red-600 p-8 mt-16 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6">
            {[FaCompactDisc, GiDeathSkull, GiCoffin, GiGhost, GiTreasureMap].map((Icon, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.2, rotate: 15 }} 
                className="cursor-pointer"
              >
                <Icon className="text-4xl text-gray-600 hover:text-orange-500 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
          <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
            UNDERGROUND BAZAAR
          </h3>
          <p className="text-gray-400 uppercase tracking-wider mb-4">
            Trade Metal Collectibles • Escrow Protection • Web3 Secured
          </p>
          <p className="text-gray-600">
            Secure Trading • Instant Transfers • Underground Community
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
