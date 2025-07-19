// src/app/nft/page.tsx - NFT FORGE
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFire, FaGem, FaCrown, FaCoins, FaExchangeAlt, FaPlus,
  FaFilter, FaSort, FaHeart, FaEye, FaShare, FaDownload
} from 'react-icons/fa';
import { 
  GiThorHammer, GiDeathSkull, GiCrossedSwords, GiDragonHead,
  GiCoffin, GiGhost, GiWolfHead, GiVikingHelmet
} from 'react-icons/gi';
import Link from 'next/link';

// Mock NFT Data
const mockNFTs = [
  {
    id: "1",
    name: "Bathory Goat #001",
    collection: "Legendary Logos",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    price: "0.15 ETH",
    rarity: "Legendary",
    rarityColor: "text-yellow-400",
    owner: "METAL_COLLECTOR",
    minted: "2025-01-15",
    traits: [
      { trait: "Background", value: "Darkness", rarity: "15%" },
      { trait: "Symbol", value: "Goat Head", rarity: "5%" },
      { trait: "Effect", value: "Burning", rarity: "8%" }
    ],
    forSale: true,
    likes: 47,
    views: 234
  },
  {
    id: "2", 
    name: "Mayhem Corpse #013",
    collection: "Black Metal Icons",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    price: "0.08 ETH",
    rarity: "Rare",
    rarityColor: "text-blue-400",
    owner: "KVLT_TRADER",
    minted: "2025-01-10",
    traits: [
      { trait: "Background", value: "Forest", rarity: "25%" },
      { trait: "Corpse Paint", value: "Classic", rarity: "12%" },
      { trait: "Weapon", value: "Knife", rarity: "18%" }
    ],
    forSale: true,
    likes: 23,
    views: 156
  },
  {
    id: "3",
    name: "Emperor Crown #007",
    collection: "Symphonic Artifacts",
    image: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=400&h=400&fit=crop",
    price: "0.12 ETH",
    rarity: "Epic",
    rarityColor: "text-purple-400",
    owner: "SYMPHONIC_LORD",
    minted: "2025-01-08",
    traits: [
      { trait: "Crown Type", value: "Imperial", rarity: "7%" },
      { trait: "Gems", value: "Ruby", rarity: "10%" },
      { trait: "Aura", value: "Golden", rarity: "15%" }
    ],
    forSale: false,
    likes: 89,
    views: 445
  }
];

const collections = [
  { name: "Legendary Logos", items: 100, floor: "0.05 ETH", volume: "12.4 ETH" },
  { name: "Black Metal Icons", items: 250, floor: "0.03 ETH", volume: "8.7 ETH" },
  { name: "Symphonic Artifacts", items: 150, floor: "0.07 ETH", volume: "15.2 ETH" },
  { name: "Death Metal Relics", items: 200, floor: "0.04 ETH", volume: "6.9 ETH" }
];

const rarityLevels = [
  { name: "Common", color: "text-gray-400", percentage: "60%" },
  { name: "Uncommon", color: "text-green-400", percentage: "25%" },
  { name: "Rare", color: "text-blue-400", percentage: "10%" },
  { name: "Epic", color: "text-purple-400", percentage: "4%" },
  { name: "Legendary", color: "text-yellow-400", percentage: "1%" }
];

export default function NFTForgePage() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'mint' | 'collections' | 'my-nfts'>('marketplace');
  const [filterRarity, setFilterRarity] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  // Mint Form State
  const [mintForm, setMintForm] = useState({
    name: '',
    description: '',
    image: '',
    collection: 'Legendary Logos',
    traits: [{ trait: '', value: '' }]
  });

  const addTrait = () => {
    setMintForm(prev => ({
      ...prev,
      traits: [...prev.traits, { trait: '', value: '' }]
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
    alert('Minting NFT... (Demo mode)');
    console.log('Minting:', mintForm);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <GiThorHammer className="text-4xl text-green-400" />
            <div>
              <h1
                className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0]"
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  textShadow: '2px 2px 0 #333, 4px 4px 0 #666'
                }}
              >
                NFT FORGE
              </h1>
              <p className="text-[#999] text-sm md:text-base uppercase tracking-wide">
                Mint • Collect • Trade Metal Artifacts on Optimism
              </p>
            </div>
          </div>

          {/* TABS */}
          <nav className="flex gap-2 flex-wrap">
            {[
              { key: 'marketplace', label: 'MARKETPLACE', icon: FaExchangeAlt },
              { key: 'mint', label: 'MINT NFT', icon: GiThorHammer },
              { key: 'collections', label: 'COLLECTIONS', icon: FaGem },
              { key: 'my-nfts', label: 'MY NFTS', icon: FaCrown }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 text-xs uppercase font-bold tracking-wide border-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'bg-transparent border-[#333] text-[#ccc] hover:border-green-600'
                }`}
              >
                <tab.icon /> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MARKETPLACE TAB */}
      {activeTab === 'marketplace' && (
        <section className="max-w-7xl mx-auto p-6">
          {/* FILTERS */}
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value)}
              className="px-4 py-2 bg-[#111] border-2 border-[#333] text-[#e0e0e0] text-xs uppercase"
            >
              <option value="all">All Rarities</option>
              {rarityLevels.map(level => (
                <option key={level.name} value={level.name.toLowerCase()}>{level.name}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#111] border-2 border-[#333] text-[#e0e0e0] text-xs uppercase"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rarity">Rarity</option>
            </select>

            <div className="ml-auto text-xs text-[#666]">
              {mockNFTs.length} NFTs • Floor: 0.03 ETH
            </div>
          </div>

          {/* NFT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockNFTs.map(nft => (
              <motion.div
                key={nft.id}
                whileHover={{ y: -5 }}
                className="bg-[#111] border-2 border-[#333] hover:border-green-600 transition-colors cursor-pointer"
                onClick={() => setSelectedNFT(nft)}
              >
                <div className="relative">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-48 object-cover grayscale contrast-125 brightness-90"
                    style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase ${nft.rarityColor} bg-black/80`}>
                    {nft.rarity}
                  </div>
                  <div className="absolute bottom-2 left-2 flex gap-2 text-xs">
                    <span className="flex items-center gap-1 bg-black/80 px-2 py-1">
                      <FaHeart className="text-red-400" /> {nft.likes}
                    </span>
                    <span className="flex items-center gap-1 bg-black/80 px-2 py-1">
                      <FaEye className="text-blue-400" /> {nft.views}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-[#e0e0e0] mb-1">{nft.name}</h3>
                  <p className="text-xs text-[#999] mb-2">{nft.collection}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-[#666]">Price</div>
                      <div className="font-bold text-green-400">{nft.price}</div>
                    </div>
                    {nft.forSale && (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs uppercase font-bold">
                        BUY NOW
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* MINT TAB */}
      {activeTab === 'mint' && (
        <section className="max-w-4xl mx-auto p-6">
          <div className="bg-[#111] border-2 border-[#333] p-6">
            <div className="flex items-center gap-3 mb-6">
              <GiThorHammer className="text-3xl text-green-400" />
              <h2 className="text-2xl font-black uppercase tracking-wide">FORGE NEW NFT</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FORM */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">NFT Name</label>
                  <input
                    type="text"
                    value={mintForm.name}
                    onChange={(e) => setMintForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-green-600 focus:outline-none"
                    placeholder="e.g., Bathory Goat #001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Description</label>
                  <textarea
                    value={mintForm.description}
                    onChange={(e) => setMintForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-green-600 focus:outline-none resize-none"
                    placeholder="Describe your metal artifact..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Image URL</label>
                  <input
                    type="url"
                    value={mintForm.image}
                    onChange={(e) => setMintForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-green-600 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Collection</label>
                  <select
                    value={mintForm.collection}
                    onChange={(e) => setMintForm(prev => ({ ...prev, collection: e.target.value }))}
                    className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-green-600 focus:outline-none"
                  >
                    {collections.map(collection => (
                      <option key={collection.name} value={collection.name}>{collection.name}</option>
                    ))}
                  </select>
                </div>

                {/* TRAITS */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-[#ccc] uppercase">Traits</label>
                    <button
                      onClick={addTrait}
                      className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1"
                    >
                      <FaPlus /> Add Trait
                    </button>
                  </div>
                  
                  {mintForm.traits.map((trait, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={trait.trait}
                        onChange={(e) => updateTrait(index, 'trait', e.target.value)}
                        placeholder="Trait name"
                        className="p-2 bg-[#0a0a0a] border border-[#333] text-[#e0e0e0] text-sm"
                      />
                      <input
                        type="text"
                        value={trait.value}
                        onChange={(e) => updateTrait(index, 'value', e.target.value)}
                        placeholder="Trait value"
                        className="p-2 bg-[#0a0a0a] border border-[#333] text-[#e0e0e0] text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* PREVIEW */}
              <div className="bg-[#0a0a0a] border border-[#333] p-4">
                <h3 className="text-sm font-bold text-[#ccc] mb-4 uppercase">Preview</h3>
                
                {mintForm.image && (
                  <img
                    src={mintForm.image}
                    alt="Preview"
                    className="w-full h-48 object-cover grayscale contrast-125 brightness-90 mb-4"
                    style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                  />
                )}
                
                <h4 className="font-bold text-[#e0e0e0] mb-1">{mintForm.name || 'Untitled NFT'}</h4>
                <p className="text-xs text-[#999] mb-3">{mintForm.collection}</p>
                
                {mintForm.description && (
                  <p className="text-sm text-[#ccc] mb-3">{mintForm.description}</p>
                )}

                {mintForm.traits.some(t => t.trait && t.value) && (
                  <div>
                    <h5 className="text-xs font-bold text-[#ccc] mb-2 uppercase">Traits</h5>
                    <div className="space-y-1">
                      {mintForm.traits.filter(t => t.trait && t.value).map((trait, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-[#999]">{trait.trait}</span>
                          <span className="text-[#ccc]">{trait.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* MINT BUTTON */}
            <div className="mt-6 text-center">
              <button
                onClick={handleMint}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 uppercase font-bold tracking-wide transition-colors"
              >
                <GiThorHammer className="inline mr-2" /> FORGE NFT (0.01 ETH)
              </button>
            </div>
          </div>
        </section>
      )}

      {/* COLLECTIONS TAB */}
      {activeTab === 'collections' && (
        <section className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map(collection => (
              <motion.div
                key={collection.name}
                whileHover={{ y: -2 }}
                className="bg-[#111] border-2 border-[#333] hover:border-green-600 transition-colors p-4"
              >
                <h3 className="font-bold text-[#e0e0e0] mb-3">{collection.name}</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#999]">Items:</span>
                    <span className="text-[#ccc]">{collection.items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#999]">Floor:</span>
                    <span className="text-green-400">{collection.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#999]">Volume:</span>
                    <span className="text-blue-400">{collection.volume}</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] py-2 text-xs uppercase font-bold">
                  VIEW COLLECTION
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* MY NFTS TAB */}
      {activeTab === 'my-nfts' && (
        <section className="max-w-7xl mx-auto p-6">
          <div className="text-center py-12">
            <GiDeathSkull className="text-6xl text-[#666] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#999] mb-2 uppercase">Connect Wallet</h3>
            <p className="text-[#666] mb-4">Connect your wallet to view your NFT collection</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 uppercase font-bold tracking-wide">
              CONNECT WALLET
            </button>
          </div>
        </section>
      )}

      {/* NFT DETAIL MODAL */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedNFT(null)}>
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
                  src={selectedNFT.image}
                  alt={selectedNFT.name}
                  className="w-full h-96 md:h-full object-cover grayscale contrast-125 brightness-90"
                  style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                />
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              
              {/* DETAILS */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#e0e0e0] mb-1">{selectedNFT.name}</h2>
                    <p className="text-[#999]">{selectedNFT.collection}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-bold uppercase ${selectedNFT.rarityColor} border border-current`}>
                    {selectedNFT.rarity}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <div className="text-[#666]">Owner</div>
                    <div className="text-[#ccc] font-bold">{selectedNFT.owner}</div>
                  </div>
                  <div>
                    <div className="text-[#666]">Minted</div>
                    <div className="text-[#ccc]">{selectedNFT.minted}</div>
                  </div>
                </div>

                {selectedNFT.forSale && (
                  <div className="bg-[#0a0a0a] border border-[#333] p-4 mb-6">
                    <div className="text-[#666] text-sm mb-1">Current Price</div>
                    <div className="text-2xl font-bold text-green-400 mb-3">{selectedNFT.price}</div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 uppercase font-bold">
                      BUY NOW
                    </button>
                  </div>
                )}

                {/* TRAITS */}
                <div>
                  <h3 className="text-sm font-bold text-[#ccc] mb-3 uppercase">Traits</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedNFT.traits.map((trait: any, i: number) => (
                      <div key={i} className="bg-[#0a0a0a] border border-[#333] p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-[#666] uppercase">{trait.trait}</div>
                            <div className="text-[#ccc] font-bold">{trait.value}</div>
                          </div>
                          <div className="text-xs text-blue-400">{trait.rarity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-6">
                  <button className="flex-1 bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] py-2 text-xs uppercase font-bold flex items-center justify-center gap-2">
                    <FaHeart /> LIKE
                  </button>
                  <button className="flex-1 bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] py-2 text-xs uppercase font-bold flex items-center justify-center gap-2">
                    <FaShare /> SHARE
                  </button>
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
            <GiDeathSkull className="text-xl text-[#666]" />
            <GiThorHammer className="text-xl text-[#666]" />
            <GiCoffin className="text-xl text-[#666]" />
            <GiGhost className="text-xl text-[#666]" />
          </div>
          <p className="text-[#666] text-sm uppercase tracking-widest">
            NFT FORGE • METAL ARTIFACTS ON OPTIMISM
          </p>
          <p className="text-[#444] text-xs mt-2">
            Mint • Collect • Trade • Underground Only
          </p>
        </div>
      </footer>
    </div>
  );
}
