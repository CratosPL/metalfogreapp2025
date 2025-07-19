// src/app/marketplace/page.tsx - MARKETPLACE
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Poprawne importy:
import { 
  FaStore, FaFilter, FaSort, FaHeart, FaEye, FaShoppingCart,
  FaPlus, FaSearch, FaMapMarkerAlt, FaClock, FaShieldAlt,
  FaExchangeAlt, FaCoins, FaStar, FaUser, FaCompactDisc
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCoffin, GiGhost, GiTreasureMap, GiSwordman
} from 'react-icons/gi';

import Link from 'next/link';

// Mock Marketplace Data
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
    location: "Norway",
    condition: "Mint",
    description: "Original 1994 pressing. Gatefold sleeve in perfect condition. One of the most important black metal albums ever recorded.",
    shipping: "Worldwide",
    escrow: true,
    featured: true,
    likes: 47,
    views: 234,
    listedDate: "2025-07-01",
    tags: ["Black Metal", "Mayhem", "Vinyl", "Rare", "1994"]
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
    location: "Digital",
    condition: "Mint",
    description: "Exclusive Darkthrone logo NFT from the legendary Norwegian black metal pioneers. Part of limited collection.",
    shipping: "Instant",
    escrow: true,
    featured: false,
    likes: 23,
    views: 156,
    listedDate: "2025-06-28",
    tags: ["NFT", "Darkthrone", "Logo", "Limited"]
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
    location: "Germany",
    condition: "Very Good",
    description: "Classic symphonic black metal masterpiece. Original 1994 CD with booklet. Minor wear on case.",
    shipping: "Europe only",
    escrow: true,
    featured: false,
    likes: 31,
    views: 189,
    listedDate: "2025-06-25",
    tags: ["CD", "Emperor", "Black Metal", "Symphonic"]
  },
  {
    id: "4",
    title: "Bathory - Blood Fire Death T-Shirt",
    type: "Physical",
    category: "Merchandise",
    price: "0.03 ETH",
    priceUSD: "$49",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    seller: "MERCH_HUNTER",
    sellerRating: 4.6,
    location: "Sweden",
    condition: "Good",
    description: "Vintage Bathory t-shirt from the 90s. Size L. Some fading but no holes. True kvlt merchandise.",
    shipping: "Worldwide",
    escrow: true,
    featured: false,
    likes: 18,
    views: 92,
    listedDate: "2025-06-20",
    tags: ["Merchandise", "Bathory", "T-Shirt", "Vintage"]
  },
  {
    id: "5",
    title: "Burzum - Filosofem Cassette",
    type: "Physical",
    category: "Cassette",
    price: "0.12 ETH",
    priceUSD: "$195",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    seller: "TAPE_KEEPER",
    sellerRating: 5.0,
    location: "Norway",
    condition: "Mint",
    description: "Original 1996 cassette tape. Sealed. Atmospheric black metal classic. Extremely rare find.",
    shipping: "Worldwide",
    escrow: true,
    featured: true,
    likes: 67,
    views: 445,
    listedDate: "2025-06-15",
    tags: ["Cassette", "Burzum", "Sealed", "Rare", "1996"]
  },
  {
    id: "6",
    title: "Morbid Angel - Altars of Madness Vinyl",
    type: "Physical",
    category: "Vinyl",
    price: "0.09 ETH",
    priceUSD: "$147",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    seller: "DEATH_DEALER",
    sellerRating: 4.8,
    location: "USA",
    condition: "Near Mint",
    description: "Death metal masterpiece. 1989 original pressing. Slight ring wear on cover but vinyl is pristine.",
    shipping: "North America",
    escrow: true,
    featured: false,
    likes: 42,
    views: 278,
    listedDate: "2025-06-10",
    tags: ["Vinyl", "Morbid Angel", "Death Metal", "1989"]
  }
];

const categories = [
  { key: "all", label: "All Items", icon: FaStore, count: mockItems.length },
  { key: "vinyl", label: "Vinyl", icon: FaCompactDisc, count: mockItems.filter(i => i.category === "Vinyl").length },
  { key: "cd", label: "CDs", icon: FaCompactDisc, count: mockItems.filter(i => i.category === "CD").length },
  { key: "cassette", label: "Cassettes", icon: GiCoffin, count: mockItems.filter(i => i.category === "Cassette").length },
  { key: "merchandise", label: "Merch", icon: FaStore, count: mockItems.filter(i => i.category === "Merchandise").length }, // Używamy FaStore
  { key: "nft", label: "NFTs", icon: GiDeathSkull, count: mockItems.filter(i => i.type === "NFT").length }
];


const conditions = ["All", "Mint", "Near Mint", "Very Good", "Good", "Fair"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" }
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter items
  const filteredItems = mockItems.filter(item => {
    const categoryMatch = selectedCategory === "all" || 
                         item.category.toLowerCase() === selectedCategory ||
                         (selectedCategory === "nft" && item.type === "NFT");
    const conditionMatch = selectedCondition === "All" || item.condition === selectedCondition;
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return categoryMatch && conditionMatch && searchMatch;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price.replace(" ETH", "")) - parseFloat(b.price.replace(" ETH", ""));
      case "price-high":
        return parseFloat(b.price.replace(" ETH", "")) - parseFloat(a.price.replace(" ETH", ""));
      case "popular":
        return b.views - a.views;
      case "oldest":
        return new Date(a.listedDate).getTime() - new Date(b.listedDate).getTime();
      default: // newest
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <FaStore className="text-4xl text-orange-400" />
              <div>
                <h1
                  className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0]"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    textShadow: '2px 2px 0 #333, 4px 4px 0 #666'
                  }}
                >
                  MARKETPLACE
                </h1>
                <p className="text-[#999] text-sm md:text-base uppercase tracking-wide">
                  Trade Vinyl • CDs • NFTs • Metal Collectibles
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/marketplace/sell"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 border-2 border-orange-600 transition-colors uppercase font-bold text-xs tracking-wide flex items-center gap-2"
              >
                <FaPlus /> SELL ITEM
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH & FILTERS */}
      <section className="bg-[#111] border-b-2 border-[#333] p-4">
        <div className="max-w-7xl mx-auto">
          {/* SEARCH BAR */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search items, bands, sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-orange-600 focus:outline-none font-mono"
            />
          </div>

          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 text-xs uppercase font-bold tracking-wide border-2 transition-colors flex items-center gap-2 ${
                  selectedCategory === category.key
                    ? 'bg-orange-600 border-orange-600 text-white'
                    : 'bg-transparent border-[#333] text-[#ccc] hover:border-orange-600'
                }`}
              >
                <category.icon /> {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* FILTERS & SORT */}
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="px-4 py-2 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] text-xs uppercase focus:border-orange-600 focus:outline-none"
            >
              {conditions.map(condition => (
                <option key={condition} value={condition}>Condition: {condition}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] text-xs uppercase focus:border-orange-600 focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <div className="ml-auto text-xs text-[#666]">
              {sortedItems.length} items found
            </div>
          </div>
        </div>
      </section>

      {/* ITEMS GRID */}
      <main className="max-w-7xl mx-auto p-6">
        {sortedItems.length === 0 ? (
          <div className="text-center py-12">
            <GiDeathSkull className="text-6xl text-[#666] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#999] mb-2 uppercase">No Items Found</h3>
            <p className="text-[#666]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#111] border-2 border-[#333] hover:border-orange-600 transition-colors cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover grayscale contrast-125 brightness-90"
                    style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                  />
                  
                  {/* BADGES */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {item.featured && (
                      <span className="bg-yellow-600 text-black px-2 py-1 text-xs font-bold uppercase">
                        FEATURED
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-bold uppercase ${
                      item.type === 'NFT' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {item.type}
                    </span>
                  </div>

                  {/* CONDITION */}
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/80 text-white px-2 py-1 text-xs font-bold">
                      {item.condition}
                    </span>
                  </div>

                  {/* STATS */}
                  <div className="absolute bottom-2 left-2 flex gap-2 text-xs">
                    <span className="flex items-center gap-1 bg-black/80 px-2 py-1">
                      <FaHeart className="text-red-400" /> {item.likes}
                    </span>
                    <span className="flex items-center gap-1 bg-black/80 px-2 py-1">
                      <FaEye className="text-blue-400" /> {item.views}
                    </span>
                  </div>

                  {/* ESCROW */}
                  {item.escrow && (
                    <div className="absolute bottom-2 right-2">
                      <FaShieldAlt className="text-green-400 text-sm" title="Escrow Protected" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-[#e0e0e0] mb-1 truncate">{item.title}</h3>
                  <p className="text-xs text-[#999] mb-2">{item.category}</p>
                  
                  {/* SELLER INFO */}
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <FaUser className="text-[#666]" />
                    <span className="text-[#ccc]">{item.seller}</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-[#999]">{item.sellerRating}</span>
                    </div>
                  </div>

                  {/* LOCATION & SHIPPING */}
                  <div className="flex justify-between items-center mb-3 text-xs text-[#666]">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt /> {item.location}
                    </span>
                    <span>{item.shipping}</span>
                  </div>
                  
                  {/* PRICE */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-[#666]">Price</div>
                      <div className="font-bold text-orange-400">{item.price}</div>
                      <div className="text-xs text-[#999]">{item.priceUSD}</div>
                    </div>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 text-xs uppercase font-bold flex items-center gap-1">
                      <FaShoppingCart /> BUY
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ITEM DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] border-2 border-[#333] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-96 md:h-full object-cover grayscale contrast-125 brightness-90"
                  style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 w-8 h-8 flex items-center justify-center hover:bg-black/70"
                >
                  ✕
                </button>
              </div>
              
              {/* DETAILS */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#e0e0e0] mb-1">{selectedItem.title}</h2>
                    <p className="text-[#999]">{selectedItem.category} • {selectedItem.type}</p>
                  </div>
                  <span className="px-3 py-1 text-sm font-bold uppercase bg-orange-600 text-white">
                    {selectedItem.condition}
                  </span>
                </div>

                <p className="text-[#ccc] text-sm mb-4 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* SELLER INFO */}
                <div className="bg-[#0a0a0a] border border-[#333] p-4 mb-4">
                  <h3 className="text-sm font-bold text-[#ccc] mb-2 uppercase">Seller Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[#666]">Seller</div>
                      <div className="text-[#ccc] font-bold">{selectedItem.seller}</div>
                    </div>
                    <div>
                      <div className="text-[#666]">Rating</div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-[#ccc]">{selectedItem.sellerRating}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#666]">Location</div>
                      <div className="text-[#ccc]">{selectedItem.location}</div>
                    </div>
                    <div>
                      <div className="text-[#666]">Shipping</div>
                      <div className="text-[#ccc]">{selectedItem.shipping}</div>
                    </div>
                  </div>
                </div>

                {/* PRICE & PURCHASE */}
                <div className="bg-[#0a0a0a] border border-[#333] p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-[#666] text-sm mb-1">Current Price</div>
                      <div className="text-2xl font-bold text-orange-400">{selectedItem.price}</div>
                      <div className="text-sm text-[#999]">{selectedItem.priceUSD}</div>
                    </div>
                    {selectedItem.escrow && (
                      <div className="text-right">
                        <FaShieldAlt className="text-green-400 text-xl mx-auto mb-1" />
                        <div className="text-xs text-green-400 font-bold">ESCROW</div>
                        <div className="text-xs text-[#666]">Protected</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 uppercase font-bold flex items-center justify-center gap-2">
                      <FaShoppingCart /> BUY NOW
                    </button>
                    <button className="px-4 bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] py-3 uppercase font-bold">
                      <FaHeart />
                    </button>
                  </div>
                </div>

                {/* TAGS */}
                <div>
                  <h3 className="text-sm font-bold text-[#ccc] mb-2 uppercase">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag: string) => (
                      <span key={tag} className="bg-[#333] text-[#ccc] px-2 py-1 text-xs uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* STATS */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#333] text-sm text-[#666]">
                  <span className="flex items-center gap-1">
                    <FaEye /> {selectedItem.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart /> {selectedItem.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> Listed {selectedItem.listedDate}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* FOOTER */}
<footer className="bg-[#111] border-t-4 border-[#333] p-6 mt-12">
  <div className="max-w-7xl mx-auto text-center">
    <div className="flex justify-center gap-6 mb-4">
      <FaCompactDisc className="text-xl text-[#666]" /> {/* ✅ Używamy FaCompactDisc */}
      <GiDeathSkull className="text-xl text-[#666]" />
      <GiCoffin className="text-xl text-[#666]" />
      <GiGhost className="text-xl text-[#666]" />
    </div>

          <p className="text-[#666] text-sm uppercase tracking-widest">
            MARKETPLACE • TRADE METAL COLLECTIBLES
          </p>
          <p className="text-[#444] text-xs mt-2">
            Secure Trading • Escrow Protection • Underground Community
          </p>
        </div>
      </footer>
    </div>
  );
}
