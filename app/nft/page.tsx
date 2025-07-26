"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFire, FaGem, FaCrown, FaCoins, FaExchangeAlt, FaPlus,
  FaFilter, FaSort, FaHeart, FaEye, FaShare, FaDownload,
  FaEthereum, FaBolt, FaTrophy, FaUser, FaTimes, FaUpload
} from 'react-icons/fa';
import {
  GiThorHammer, GiDeathSkull, GiCrossedSwords, GiDragonHead,
  GiCoffin, GiGhost, GiWolfHead, GiVikingHelmet, GiSkullCrossedBones,
  GiGothicCross, GiBloodySword, GiBattleAxe, GiFlame,
  GiBlackFlag, GiCrown,           // ← GiGem usunięte
} from 'react-icons/gi';


import Link from 'next/link';

// Enhanced mock NFT data
const mockNFTs = [
  {
    id: "1",
    name: "Bathory Goat #001",
    collection: "Legendary Logos",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    price: "0.15 ETH",
    priceUSD: "$315",
    rarity: "Legendary",
    rarityColor: "text-yellow-400",
    rarityBg: "from-yellow-600/20 to-yellow-800/20",
    owner: "METAL_COLLECTOR",
    ownerReputation: 950,
    minted: "2025-01-15",
    creator: "QUORTHON_ARTS",
    royalty: "5%",
    traits: [
      { trait: "Background", value: "Darkness", rarity: "15%" },
      { trait: "Symbol", value: "Goat Head", rarity: "5%" },
      { trait: "Effect", value: "Burning", rarity: "8%" },
      { trait: "Era", value: "80s Classic", rarity: "12%" }
    ],
    forSale: true,
    likes: 47,
    views: 234,
    verified: true,
    edition: "1/1",
    chainId: 10
  },
  {
    id: "2", 
    name: "Mayhem Corpse #013",
    collection: "Black Metal Icons",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    price: "0.08 ETH",
    priceUSD: "$168",
    rarity: "Rare",
    rarityColor: "text-blue-400",
    rarityBg: "from-blue-600/20 to-blue-800/20",
    owner: "KVLT_TRADER",
    ownerReputation: 875,
    minted: "2025-01-10",
    creator: "NORWEGIAN_ARTIST",
    royalty: "7.5%",
    traits: [
      { trait: "Background", value: "Forest", rarity: "25%" },
      { trait: "Corpse Paint", value: "Classic", rarity: "12%" },
      { trait: "Weapon", value: "Knife", rarity: "18%" },
      { trait: "Atmosphere", value: "Grim", rarity: "30%" }
    ],
    forSale: true,
    likes: 23,
    views: 156,
    verified: true,
    edition: "13/100",
    chainId: 10
  },
  {
    id: "3",
    name: "Emperor Crown #007",
    collection: "Symphonic Artifacts",
    image: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=400&h=400&fit=crop",
    price: "0.12 ETH",
    priceUSD: "$252",
    rarity: "Epic",
    rarityColor: "text-purple-400",
    rarityBg: "from-purple-600/20 to-purple-800/20",
    owner: "SYMPHONIC_LORD",
    ownerReputation: 720,
    minted: "2025-01-08",
    creator: "IHSAHN_OFFICIAL",
    royalty: "10%",
    traits: [
      { trait: "Crown Type", value: "Imperial", rarity: "7%" },
      { trait: "Gems", value: "Ruby", rarity: "10%" },
      { trait: "Aura", value: "Golden", rarity: "15%" },
      { trait: "Power Level", value: "Legendary", rarity: "3%" }
    ],
    forSale: false,
    likes: 89,
    views: 445,
    verified: true,
    edition: "7/50",
    chainId: 10
  },
  {
    id: "4",
    name: "Darkthrone Frost #666",
    collection: "Black Metal Icons",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    price: "0.25 ETH",
    priceUSD: "$525",
    rarity: "Mythic",
    rarityColor: "text-red-400",
    rarityBg: "from-red-600/20 to-red-800/20",
    owner: "FENRIZ_COLLECTOR",
    ownerReputation: 999,
    minted: "2025-01-20",
    creator: "FENRIZ_HIMSELF",
    royalty: "15%",
    traits: [
      { trait: "Frost Level", value: "Eternal", rarity: "1%" },
      { trait: "Kvltness", value: "Maximum", rarity: "2%" },
      { trait: "Raw Production", value: "True", rarity: "5%" },
      { trait: "Underground Status", value: "Pure", rarity: "3%" }
    ],
    forSale: true,
    likes: 156,
    views: 1337,
    verified: true,
    edition: "666/666",
    chainId: 10,
    featured: true
  }
];

const collections = [
  { 
    name: "Legendary Logos", 
    items: 100, 
    floor: "0.05 ETH", 
    volume: "12.4 ETH",
    owners: 67,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
    verified: true
  },
  { 
    name: "Black Metal Icons", 
    items: 250, 
    floor: "0.03 ETH", 
    volume: "8.7 ETH",
    owners: 142,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    verified: true
  },
  { 
    name: "Symphonic Artifacts", 
    items: 150, 
    floor: "0.07 ETH", 
    volume: "15.2 ETH",
    owners: 89,
    image: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=200&h=200&fit=crop",
    verified: true
  },
  { 
    name: "Death Metal Relics", 
    items: 200, 
    floor: "0.04 ETH", 
    volume: "6.9 ETH",
    owners: 123,
    image: "https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=200&h=200&fit=crop",
    verified: false
  }
];

const rarityLevels = [
  { name: "Common", color: "text-gray-400", percentage: "60%", bgColor: "from-gray-600/20 to-gray-800/20" },
  { name: "Uncommon", color: "text-green-400", percentage: "25%", bgColor: "from-green-600/20 to-green-800/20" },
  { name: "Rare", color: "text-blue-400", percentage: "10%", bgColor: "from-blue-600/20 to-blue-800/20" },
  { name: "Epic", color: "text-purple-400", percentage: "4%", bgColor: "from-purple-600/20 to-purple-800/20" },
  { name: "Legendary", color: "text-yellow-400", percentage: "1%", bgColor: "from-yellow-600/20 to-yellow-800/20" },
  { name: "Mythic", color: "text-red-400", percentage: "0.1%", bgColor: "from-red-600/20 to-red-800/20" }
];

export default function NFTForgePage() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'mint' | 'collections' | 'my-nfts'>('marketplace');
  const [filterRarity, setFilterRarity] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  // Enhanced glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced mint form state
  const [mintForm, setMintForm] = useState({
    name: '',
    description: '',
    image: '',
    collection: 'Legendary Logos',
    royalty: 5,
    traits: [{ trait: '', value: '' }]
  });

  const addTrait = () => {
    setMintForm(prev => ({
      ...prev,
      traits: [...prev.traits, { trait: '', value: '' }]
    }));
  };

  const removeTrait = (index: number) => {
    setMintForm(prev => ({
      ...prev,
      traits: prev.traits.filter((_, i) => i !== index)
    }));
  };

  const updateTrait = (index: number, field: 'trait' | 'value', value: string) => {
    setMintForm(prev => ({
      ...prev,
      traits: prev.traits.map((trait, i) => 
        i === index ? { ...trait, [field]: value } : trait
      )
    }));
  };

  const handleMint = () => {
    alert('🔥 Minting NFT on Optimism blockchain... \n\n' +
          `Name: ${mintForm.name}\n` +
          `Collection: ${mintForm.collection}\n` +
          `Royalty: ${mintForm.royalty}%\n` +
          `Estimated Gas: ~$0.02\n\n` +
          '⚡ Your NFT will be available shortly!');
    console.log('Minting:', mintForm);
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
            className="flex items-center gap-6 mb-8"
          >
            <div className={`relative transition-all duration-300 ${glitchActive ? 'filter brightness-125 saturate-150' : ''}`}>
              <GiThorHammer className="text-6xl md:text-7xl text-green-500 drop-shadow-2xl" />
              {glitchActive && (
                <GiThorHammer className="absolute top-0 left-0 text-6xl md:text-7xl text-green-400 animate-ping opacity-30" />
              )}
            </div>
            <div>
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest text-white mb-2 ${glitchActive ? 'animate-pulse text-green-100' : ''}`}
                style={{
                  textShadow: glitchActive 
                    ? '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.5)' 
                    : '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(34, 197, 94, 0.3)'
                }}
              >
                NFT FORGE
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-gray-400 text-xl uppercase tracking-wide flex items-center gap-2">
                  <GiSkullCrossedBones className="text-green-500" />
                  Mint • Collect • Trade Metal Artifacts
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-600/50">
                    {mockNFTs.length} NFTs Minted
                  </span>
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold border border-blue-600/50 flex items-center gap-1">
                    <FaEthereum className="text-xs" />
                    Optimism Network
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Tabs */}
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-4 flex-wrap"
          >
            {[
              { key: 'marketplace', label: 'MARKETPLACE', icon: FaExchangeAlt, color: 'orange' },
              { key: 'mint', label: 'MINT NFT', icon: GiThorHammer, color: 'green' },
              { key: 'collections', label: 'COLLECTIONS', icon: FaGem, color: 'purple' },
              { key: 'my-nfts', label: 'MY NFTS', icon: FaCrown, color: 'yellow' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 transition-all duration-300 hover:scale-105 rounded-lg flex items-center gap-2 ${
                  activeTab === tab.key
                    ? `bg-${tab.color}-600 border-${tab.color}-600 text-white shadow-lg`
                    : 'bg-transparent border-gray-600 text-gray-300 hover:border-green-600 hover:text-green-400'
                }`}
              >
                <tab.icon /> {tab.label}
              </button>
            ))}
          </motion.nav>
        </div>
      </header>

      {/* ENHANCED MARKETPLACE TAB */}
      {activeTab === 'marketplace' && (
        <section className="max-w-7xl mx-auto p-6 relative z-10">
          {/* Enhanced Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-4 mb-8 items-start lg:items-center justify-between"
          >
            <div className="flex flex-wrap gap-4">
              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value)}
                className="px-4 py-3 bg-gray-800 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white text-sm uppercase font-medium rounded-lg outline-none transition-all duration-300"
              >
                <option value="all">All Rarities</option>
                {rarityLevels.map(level => (
                  <option key={level.name} value={level.name.toLowerCase()}>{level.name}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-800 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white text-sm uppercase font-medium rounded-lg outline-none transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rarity">Rarity</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <GiFlame className="text-green-500" />
                <span className="font-bold text-white">{mockNFTs.length}</span> NFTs • Floor: 0.03 ETH
              </div>
            </div>
          </motion.div>

          {/* Enhanced NFT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mockNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-green-600 transition-all duration-300 cursor-pointer rounded-xl overflow-hidden shadow-2xl group ${
                  nft.featured ? 'border-yellow-600 shadow-yellow-600/20' : ''
                }`}
                onClick={() => setSelectedNFT(nft)}
              >
                <div className="relative">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
                  />
                  
                  {/* Enhanced Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  
                  {/* Featured Badge */}
                  {nft.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500/90 text-black px-3 py-1 text-xs font-black uppercase rounded-full backdrop-blur-sm flex items-center gap-1">
                        <FaTrophy /> FEATURED
                      </span>
                    </div>
                  )}
                  
                  {/* Rarity Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-xs font-black uppercase ${nft.rarityColor} bg-black/80 backdrop-blur-sm rounded-full border border-current`}>
                      {nft.rarity}
                    </span>
                  </div>
                  
                  {/* Verified Badge */}
                  {nft.verified && (
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-green-500/90 text-white p-2 rounded-full backdrop-blur-sm" title="Verified NFT">
                        <FaBolt className="text-sm" />
                      </div>
                    </div>
                  )}
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
                    <span className="flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      <FaHeart className="text-red-400" /> {nft.likes}
                    </span>
                    <span className="flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      <FaEye className="text-blue-400" /> {nft.views}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-black text-white mb-2 text-lg group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
                    {nft.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                    <FaGem className="text-green-500" />
                    {nft.collection}
                    <span className="text-xs bg-gray-700/50 px-2 py-1 rounded">
                      {nft.edition}
                    </span>
                  </p>
                  
                  {/* Owner Info */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-600" />
                      <span className="text-gray-300 font-bold">{nft.owner}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <FaTrophy className="text-yellow-400" />
                        <span className="text-yellow-400">{nft.ownerReputation}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Section */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Current Price</div>
                      <div className="font-black text-green-400 text-xl">{nft.price}</div>
                      <div className="text-xs text-gray-500">{nft.priceUSD}</div>
                    </div>
                    {nft.forSale ? (
                      <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 text-sm font-black uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                        BUY NOW
                      </button>
                    ) : (
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Not for sale</div>
                        <div className="text-sm text-red-400 font-bold">HODL</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ENHANCED MINT TAB */}
      {activeTab === 'mint' && (
        <section className="max-w-6xl mx-auto p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-600 rounded-xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <GiThorHammer className="text-4xl text-green-500" />
              <div>
                <h2 className="text-3xl font-black uppercase tracking-wide text-white">FORGE NEW NFT</h2>
                <p className="text-gray-400">Create immortal metal artifacts on Optimism blockchain</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">NFT Name</label>
                  <input
                    type="text"
                    value={mintForm.name}
                    onChange={(e) => setMintForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white rounded-lg outline-none transition-all duration-300"
                    placeholder="e.g., Bathory Goat #001"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Description</label>
                  <textarea
                    value={mintForm.description}
                    onChange={(e) => setMintForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white rounded-lg outline-none resize-none transition-all duration-300"
                    placeholder="Describe your metal artifact... What makes it special?"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Image Upload</label>
                  <div className="border-2 border-dashed border-gray-600 hover:border-green-500 rounded-lg p-6 text-center transition-colors duration-300">
                    <FaUpload className="text-4xl text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 mb-2">Drag & drop your image or click to browse</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors duration-300"
                    >
                      Choose File
                    </label>
                  </div>
                  <input
                    type="url"
                    value={mintForm.image}
                    onChange={(e) => setMintForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white rounded-lg outline-none mt-3 transition-all duration-300"
                    placeholder="Or paste image URL..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Collection</label>
                    <select
                      value={mintForm.collection}
                      onChange={(e) => setMintForm(prev => ({ ...prev, collection: e.target.value }))}
                      className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white rounded-lg outline-none transition-all duration-300"
                    >
                      {collections.map(collection => (
                        <option key={collection.name} value={collection.name}>{collection.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-bold text-gray-300 mb-3 uppercase">Royalty %</label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={mintForm.royalty}
                      onChange={(e) => setMintForm(prev => ({ ...prev, royalty: parseInt(e.target.value) || 0 }))}
                      className="w-full p-4 bg-gray-900 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white rounded-lg outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Enhanced Traits */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-lg font-bold text-gray-300 uppercase">Traits & Properties</label>
                    <button
                      onClick={addTrait}
                      className="text-green-400 hover:text-green-300 flex items-center gap-2 font-bold transition-colors duration-300"
                    >
                      <FaPlus /> Add Trait
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {mintForm.traits.map((trait, index) => (
                      <div key={index} className="grid grid-cols-5 gap-3 items-center">
                        <input
                          type="text"
                          value={trait.trait}
                          onChange={(e) => updateTrait(index, 'trait', e.target.value)}
                          placeholder="Trait name"
                          className="col-span-2 p-3 bg-gray-900 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white rounded-lg outline-none transition-all duration-300"
                        />
                        <input
                          type="text"
                          value={trait.value}
                          onChange={(e) => updateTrait(index, 'value', e.target.value)}
                          placeholder="Trait value"
                          className="col-span-2 p-3 bg-gray-900 border-2 border-gray-600 hover:border-green-500 focus:border-green-500 text-white rounded-lg outline-none transition-all duration-300"
                        />
                        {mintForm.traits.length > 1 && (
                          <button
                            onClick={() => removeTrait(index)}
                            className="text-red-400 hover:text-red-300 p-2 transition-colors duration-300"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Preview */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-300 mb-6 uppercase flex items-center gap-2">
                  <FaEye className="text-blue-400" />
                  Live Preview
                </h3>
                
                <div className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-xl">
                  {mintForm.image && (
                    <img
                      src={mintForm.image}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                      style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
                    />
                  )}
                  
                  <div className="p-6">
                    <h4 className="font-black text-white text-xl mb-2">{mintForm.name || 'Untitled NFT'}</h4>
                    <p className="text-gray-400 mb-3 flex items-center gap-2">
                      <FaGem className="text-green-500" />
                      {mintForm.collection}
                    </p>
                    
                    {mintForm.description && (
                      <p className="text-gray-300 mb-4 leading-relaxed">{mintForm.description}</p>
                    )}

                    {mintForm.traits.some(t => t.trait && t.value) && (
                      <div>
                        <h5 className="text-sm font-bold text-gray-400 mb-3 uppercase">Traits</h5>
                        <div className="grid grid-cols-1 gap-2">
                          {mintForm.traits.filter(t => t.trait && t.value).map((trait, i) => (
                            <div key={i} className="bg-gray-900 border border-gray-700 rounded p-3">
                              <div className="flex justify-between">
                                <span className="text-gray-500 text-xs uppercase">{trait.trait}</span>
                                <span className="text-white font-bold">{trait.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-sm">
                      <span className="text-gray-500">Creator Royalty:</span>
                      <span className="text-green-400 font-bold">{mintForm.royalty}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Mint Button */}
            <div className="mt-8 text-center">
              <div className="bg-gray-800/50 border-2 border-green-600/50 rounded-lg p-6 mb-6">
                <h4 className="text-white font-bold mb-4 flex items-center justify-center gap-2">
                  <FaEthereum className="text-blue-400" />
                  Minting Cost Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-green-400 font-bold">0.01 ETH</div>
                    <div className="text-gray-500">Platform Fee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-bold">~$0.02</div>
                    <div className="text-gray-500">Gas Fee (Optimism)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">0.01 ETH</div>
                    <div className="text-gray-500">Total Cost</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleMint}
                disabled={!mintForm.name || !mintForm.image}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-12 py-4 text-xl font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg shadow-2xl disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              >
                <GiThorHammer className="text-2xl" /> 
                FORGE NFT ON OPTIMISM
                <FaBolt className="text-yellow-400" />
              </button>
            </div>
          </motion.div>
        </section>
      )}

      {/* ENHANCED COLLECTIONS TAB */}
      {activeTab === 'collections' && (
        <section className="max-w-7xl mx-auto p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-white flex items-center justify-center gap-3">
              <FaGem className="text-purple-500" />
              METAL COLLECTIONS
              <GiGothicCross className="text-purple-500" />
            </h2>
            <p className="text-xl text-gray-400">
              Explore curated collections of underground metal artifacts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 hover:border-purple-600 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl"
              >
                <div className="relative">
                  <img 
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-48 object-cover"
                    style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  
                  {collection.verified && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500/90 text-white p-2 rounded-full backdrop-blur-sm" title="Verified Collection">
                        <FaBolt className="text-sm" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-black text-white text-xl mb-4">{collection.name}</h3>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Items:</span>
                      <span className="text-white font-bold">{collection.items}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Owners:</span>
                      <span className="text-blue-400 font-bold">{collection.owners}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Floor Price:</span>
                      <span className="text-green-400 font-bold">{collection.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Volume:</span>
                      <span className="text-purple-400 font-bold">{collection.volume}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 text-sm font-black uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                    EXPLORE COLLECTION
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ENHANCED MY NFTS TAB */}
      {activeTab === 'my-nfts' && (
        <section className="max-w-7xl mx-auto p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <GiWolfHead className="text-8xl text-gray-600 mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl font-black text-gray-400 mb-4 uppercase tracking-wide">Connect Your Wallet</h3>
            <p className="text-gray-500 mb-8 text-lg max-w-2xl mx-auto">
              Connect your wallet to view your NFT collection, manage listings, and track your metal artifacts portfolio.
            </p>
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-black uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto">
              <FaEthereum className="text-2xl" />
              CONNECT WALLET
              <FaBolt className="text-yellow-400" />
            </button>
          </motion.div>
        </section>
      )}

      {/* ENHANCED NFT DETAIL MODAL */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setSelectedNFT(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-600 max-w-6xl w-full max-h-[95vh] overflow-y-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Enhanced Image */}
              <div className="relative">
                <img
                  src={selectedNFT.image}
                  alt={selectedNFT.name}
                  className="w-full h-96 lg:h-full object-cover"
                  style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
                />
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="absolute top-4 right-4 text-white bg-black/80 w-10 h-10 flex items-center justify-center hover:bg-black rounded-full transition-all duration-300 hover:scale-110"
                >
                  <FaTimes />
                </button>
                
                {/* Enhanced Overlay Info */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {selectedNFT.featured && (
                    <span className="bg-yellow-500/90 text-black px-3 py-1 text-sm font-black uppercase rounded-full">
                      ⭐ FEATURED
                    </span>
                  )}
                  {selectedNFT.verified && (
                    <span className="bg-green-500/90 text-white px-3 py-1 text-sm font-black uppercase rounded-full">
                      ✓ VERIFIED
                    </span>
                  )}
                </div>
              </div>
              
              {/* Enhanced Details */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">{selectedNFT.name}</h2>
                    <p className="text-gray-400 text-lg flex items-center gap-2">
                      <FaGem className="text-green-500" />
                      {selectedNFT.collection}
                      <span className="text-sm bg-gray-700/50 px-2 py-1 rounded">
                        {selectedNFT.edition}
                      </span>
                    </p>
                  </div>
                  <span className={`px-4 py-2 text-lg font-black uppercase ${selectedNFT.rarityColor} border-2 border-current rounded-lg`}>
                    {selectedNFT.rarity}
                  </span>
                </div>

                {/* Enhanced Owner & Creator Info */}
                <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="text-gray-500 mb-2">Current Owner</div>
                    <div className="text-white font-bold text-lg">{selectedNFT.owner}</div>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      <FaTrophy />
                      {selectedNFT.ownerReputation} reputation
                    </div>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="text-gray-500 mb-2">Creator</div>
                    <div className="text-white font-bold text-lg">{selectedNFT.creator}</div>
                    <div className="text-green-400 text-sm">{selectedNFT.royalty}% royalty</div>
                  </div>
                </div>

                {/* Enhanced Price Section */}
                {selectedNFT.forSale && (
                  <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 border-2 border-green-600/50 rounded-xl p-6 mb-8">
                    <div className="text-gray-400 text-sm mb-2">Current Price</div>
                    <div className="text-4xl font-black text-green-400 mb-2">{selectedNFT.price}</div>
                    <div className="text-lg text-gray-400 mb-6">{selectedNFT.priceUSD}</div>
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-black uppercase tracking-wide rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                      BUY NOW ON OPTIMISM
                    </button>
                  </div>
                )}

                {/* Enhanced Traits */}
                <div className="mb-8">
                  <h3 className="text-xl font-black text-white mb-4 uppercase flex items-center gap-2">
                    <GiSkullCrossedBones className="text-red-500" />
                    Traits & Properties
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedNFT.traits.map((trait: any, i: number) => (
                      <div key={i} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-green-600/50 transition-colors duration-300">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">{trait.trait}</div>
                            <div className="text-white font-bold text-lg">{trait.value}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-blue-400 font-bold">{trait.rarity}</div>
                            <div className="text-xs text-gray-500">rarity</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white py-3 text-sm font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg flex items-center justify-center gap-2">
                    <FaHeart /> LIKE
                  </button>
                  <button className="bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white py-3 text-sm font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg flex items-center justify-center gap-2">
                    <FaShare /> SHARE
                  </button>
                  <button className="bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-purple-600 hover:border-purple-600 hover:text-white py-3 text-sm font-black uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg flex items-center justify-center gap-2">
                    <FaDownload /> SAVE
                  </button>
                </div>

                {/* Blockchain Info */}
                <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-500">
                  <div className="flex justify-between items-center">
                    <span>Minted on:</span>
                    <span className="text-blue-400 font-bold">Optimism Network</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Token Standard:</span>
                    <span className="text-green-400 font-bold">ERC-721</span>
                  </div>
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
            {[GiThorHammer, GiDeathSkull, GiCoffin, GiGhost, GiSkullCrossedBones].map((Icon, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.2, rotate: 15 }} 
                className="cursor-pointer"
              >
                <Icon className="text-4xl text-gray-600 hover:text-green-500 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
          <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
            NFT FORGE
          </h3>
          <p className="text-gray-400 uppercase tracking-wider mb-4">
            Metal Artifacts on Optimism • Mint • Collect • Trade • Underground Only
          </p>
          <p className="text-gray-600">
            Create immortal metal art • Ultra-low gas fees • Instant transactions
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
