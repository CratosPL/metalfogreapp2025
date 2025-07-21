// src/app/help/page.tsx - HELP CENTER
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaQuestionCircle, FaSearch, FaBook, FaWallet, FaMusic,
  FaStore, FaUsers, FaShieldAlt, FaEnvelope, FaDiscord,
  FaChevronDown, FaChevronRight, FaExternalLinkAlt
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCoffin, GiGhost, GiThorHammer, GiWolfHead,
  GiCrossedSwords, GiDragonHead
} from 'react-icons/gi';
import Link from 'next/link';

// FAQ Categories
const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: GiWolfHead,
    color: 'text-red-400',
    questions: [
      {
        q: "How do I join Metal Forge?",
        a: "Click 'Join the Horde' on the homepage, connect your Optimism wallet (MetaMask recommended), and complete your Metal DNA profile. No email required - we're fully decentralized."
      },
      {
        q: "What is Metal DNA?",
        a: "Metal DNA is your underground reputation system. Earn Kvlt Points by discovering bands, Battle Scars from concerts, and Scene Support by helping artists. Your score determines your rank in the Seven Circles of Metal."
      },
      {
        q: "Do I need crypto to use Metal Forge?",
        a: "Basic features are free, but you'll need ETH on Optimism for: streaming demos (micropayments), buying marketplace items, minting NFTs, and tipping community members."
      }
    ]
  },
  {
    id: 'wallet-crypto',
    title: 'Wallet & Crypto',
    icon: FaWallet,
    color: 'text-yellow-400',
    questions: [
      {
        q: "How do I connect my wallet?",
        a: "We support MetaMask, WalletConnect, and other Web3 wallets. Make sure you're on the Optimism network. Click 'Connect Optimism Wallet' and follow the prompts."
      },
      {
        q: "Why Optimism instead of Ethereum mainnet?",
        a: "Optimism offers faster transactions and lower fees - perfect for micropayments when streaming demos. A typical stream costs 0.001 ETH (~$2) instead of $50+ gas fees on mainnet."
      },
      {
        q: "How do crypto tips work?",
        a: "Send ETH directly to artists, community members, or content creators. 100% goes to the recipient - no platform fees on tips. Perfect for supporting underground bands."
      }
    ]
  },
  {
    id: 'music-streaming',
    title: 'Music & Streaming',
    icon: FaMusic,
    color: 'text-blue-400',
    questions: [
      {
        q: "How does pay-per-stream work?",
        a: "Artists set their price (typically 0.0005-0.002 ETH per play). 80% goes to the artist, 20% to platform. No subscriptions, no ads - direct support for underground music."
      },
      {
        q: "Can I upload my band's music?",
        a: "Yes! Go to Demo Vault → Upload. Supported formats: MP3, WAV, FLAC. Set your price, add metadata, and start earning from day one. Perfect for demos and underground releases."
      },
      {
        q: "What about copyright and licensing?",
        a: "You retain full rights to your music. Metal Forge is a distribution platform, not a label. We don't claim ownership - you're just using our infrastructure to reach metalheads."
      }
    ]
  },
  {
    id: 'marketplace-nft',
    title: 'Marketplace & NFTs',
    icon: FaStore,
    color: 'text-orange-400',
    questions: [
      {
        q: "What can I buy/sell in the marketplace?",
        a: "Physical items: vinyl, CDs, cassettes, merch, instruments. Digital: NFTs, exclusive demos, artwork. Both peer-to-peer trading and direct sales supported."
      },
      {
        q: "How does escrow protection work?",
        a: "For physical items, funds are held in smart contract until buyer confirms receipt. Digital items transfer instantly. Dispute resolution handled by community voting."
      },
      {
        q: "What makes Metal Forge NFTs special?",
        a: "Our NFTs aren't just JPEGs - they're functional. Band logos grant access to exclusive content, concert NFTs prove attendance, rare demos unlock special features."
      }
    ]
  },
  {
    id: 'community',
    title: 'Community & Social',
    icon: FaUsers,
    color: 'text-purple-400',
    questions: [
      {
        q: "How do I earn Metal DNA points?",
        a: "Discover underground bands (+50 Kvlt Points), attend concerts (+25 Battle Scars), support artists (+10-100 Scene Support), submit quality content, engage with community."
      },
      {
        q: "What are the Seven Circles of Metal?",
        a: "1. Poser (0 pts) → 2. Metalhead (100) → 3. Underground Explorer (300) → 4. Scene Warrior (600) → 5. Kvlt Master (1000) → 6. Metal Prophet (1500) → 7. True Kvlt (2500)"
      },
      {
        q: "Can I get banned for being a poser?",
        a: "We don't ban for music taste, but spam, scams, and non-metal content will get you exiled. This is a curated underground community - respect the kvlt."
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Issues',
    icon: FaShieldAlt,
    color: 'text-green-400',
    questions: [
      {
        q: "Audio won't play / payment failed",
        a: "Check your wallet connection and Optimism ETH balance. Clear browser cache, disable ad blockers. If using mobile, try desktop browser first."
      },
      {
        q: "Transaction stuck or failed",
        a: "Optimism transactions usually confirm in 1-2 minutes. If stuck, check Optimistic Etherscan. You can speed up with higher gas, but it's rarely needed."
      },
      {
        q: "My uploaded demo isn't showing",
        a: "Uploads are reviewed for quality and genre appropriateness (usually 24-48 hours). No mainstream metal, no AI-generated music, no copyright violations."
      }
    ]
  }
];

// Quick Links
const quickLinks = [
  { title: "Band Submission Guidelines", href: "/help/band-guidelines", icon: GiCrossedSwords },
  { title: "Optimism Network Setup", href: "/help/optimism-setup", icon: FaWallet },
  { title: "Audio Upload Tutorial", href: "/help/upload-guide", icon: FaMusic },
  { title: "NFT Minting Guide", href: "/help/nft-guide", icon: GiThorHammer },
  { title: "Community Rules", href: "/help/community-rules", icon: FaUsers },
  { title: "API Documentation", href: "/help/api-docs", icon: FaBook }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>('getting-started');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <FaQuestionCircle className="text-4xl text-green-400" />
            <div>
              <h1
                className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0]"
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  textShadow: '2px 2px 0 #333, 4px 4px 0 #666'
                }}
              >
                HELP CENTER
              </h1>
              <p className="text-[#999] text-sm md:text-base uppercase tracking-wide">
                Underground Support • FAQ • Guides • Contact
              </p>
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search help topics, guides, FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-green-600 focus:outline-none font-mono"
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR - QUICK LINKS */}
        <div className="lg:col-span-1">
          <div className="bg-[#111] border-2 border-[#333] p-4 mb-6">
            <h3 className="text-lg font-bold text-[#ccc] mb-4 uppercase flex items-center gap-2">
              <GiDragonHead className="text-green-400" /> Quick Links
            </h3>
            <div className="space-y-2">
              {quickLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-[#ccc] hover:text-green-400 transition-colors p-2 hover:bg-[#222] border border-transparent hover:border-[#333]"
                >
                  <link.icon className="text-green-400" />
                  {link.title}
                  <FaExternalLinkAlt className="text-xs ml-auto" />
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="bg-[#111] border-2 border-[#333] p-4">
            <h3 className="text-lg font-bold text-[#ccc] mb-4 uppercase flex items-center gap-2">
              <FaEnvelope className="text-blue-400" /> Contact Support
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[#999] mb-1">Email Support:</div>
                <a href="mailto:support@metalforge.underground" className="text-blue-400 hover:text-blue-300">
                  support@metalforge.underground
                </a>
              </div>
              <div>
                <div className="text-[#999] mb-1">Discord Community:</div>
                <a href="#" className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  <FaDiscord /> Join Server
                </a>
              </div>
              <div>
                <div className="text-[#999] mb-1">Response Time:</div>
                <div className="text-[#ccc]">24-48 hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - FAQ */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#ccc] mb-2 uppercase flex items-center gap-2">
              <FaBook className="text-yellow-400" /> Frequently Asked Questions
            </h2>
            <p className="text-[#999] text-sm">
              Find answers to common questions about Metal Forge. Can't find what you're looking for? Contact support.
            </p>
          </div>

          {/* FAQ CATEGORIES */}
          <div className="space-y-4">
            {(searchTerm ? filteredCategories : faqCategories).map(category => (
              <div key={category.id} className="bg-[#111] border-2 border-[#333]">
                
                {/* CATEGORY HEADER */}
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                  className="w-full p-4 flex items-center gap-3 hover:bg-[#1a1a1a] transition-colors"
                >
                  <category.icon className={`text-2xl ${category.color}`} />
                  <h3 className="text-lg font-bold text-[#e0e0e0] uppercase flex-1 text-left">
                    {category.title}
                  </h3>
                  <span className="text-[#666] text-sm">
                    {category.questions.length} questions
                  </span>
                  {expandedCategory === category.id ? 
                    <FaChevronDown className="text-[#666]" /> : 
                    <FaChevronRight className="text-[#666]" />
                  }
                </button>

                {/* QUESTIONS */}
                {expandedCategory === category.id && (
                  <div className="border-t border-[#333]">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-b border-[#222] last:border-b-0">
                        <button
                          onClick={() => setExpandedQuestion(
                            expandedQuestion === `${category.id}-${index}` ? null : `${category.id}-${index}`
                          )}
                          className="w-full p-4 text-left hover:bg-[#1a1a1a] transition-colors flex items-center gap-3"
                        >
                          <FaQuestionCircle className="text-green-400 flex-shrink-0" />
                          <span className="text-[#ccc] font-bold flex-1">{faq.q}</span>
                          {expandedQuestion === `${category.id}-${index}` ? 
                            <FaChevronDown className="text-[#666]" /> : 
                            <FaChevronRight className="text-[#666]" />
                          }
                        </button>
                        
                        {expandedQuestion === `${category.id}-${index}` && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="px-4 pb-4"
                          >
                            <div className="bg-[#0a0a0a] border border-[#333] p-4 ml-8">
                              <p className="text-[#ccc] leading-relaxed">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* NO RESULTS */}
          {searchTerm && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <GiDeathSkull className="text-6xl text-[#666] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#999] mb-2 uppercase">No Results Found</h3>
              <p className="text-[#666] mb-4">Try different keywords or browse categories above</p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 uppercase font-bold text-sm"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#111] border-t-4 border-[#333] p-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <GiDeathSkull className="text-xl text-[#666]" />
            <GiCoffin className="text-xl text-[#666]" />
            <GiGhost className="text-xl text-[#666]" />
          </div>
          <p className="text-[#666] text-sm uppercase tracking-widest">
            METAL FORGE HELP CENTER • UNDERGROUND SUPPORT
          </p>
          <p className="text-[#444] text-xs mt-2">
            Still need help? Contact support • Join Discord • Check API docs
          </p>
        </div>
      </footer>
    </div>
  );
}
