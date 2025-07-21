// src/app/monetization/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaCoins, FaCrown, FaDollarSign, FaWallet, FaMoneyBillWave,
  FaShieldAlt, FaPlus, FaChartLine, FaPercentage, FaHandHoldingUsd
} from 'react-icons/fa';
import { 
  GiThorHammer, GiDeathSkull, GiCrossedSwords, GiDragonHead,
  GiCoffin, GiGhost
} from "react-icons/gi";

const revenueSplits = [
  { 
    stream: "Demo Vault Streaming", 
    split: "80% to Artist", 
    icon: FaMoneyBillWave,
    description: "Artists earn crypto for every stream"
  },
  { 
    stream: "NFT Forge Minting", 
    split: "85% to Artist", 
    icon: GiThorHammer,
    description: "Create and sell unique metal collectibles"
  },
  { 
    stream: "Marketplace Sales", 
    split: "90% to Seller", 
    icon: FaCoins,
    description: "Trade vinyl, CDs, and rare items"
  },
  { 
    stream: "Community Tips", 
    split: "100% to Recipient", 
    icon: FaCrown,
    description: "Direct support from fans"
  }
];

const earningsExamples = [
  { scenario: "Underground Demo", plays: "1,000", earning: "0.8 ETH", usd: "~$2,000" },
  { scenario: "Popular Track", plays: "10,000", earning: "8.0 ETH", usd: "~$20,000" },
  { scenario: "Viral Hit", plays: "100,000", earning: "80.0 ETH", usd: "~$200,000" }
];

export default function MonetizationPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <FaDollarSign className="text-4xl text-yellow-400" />
            <div>
              <h1
                className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0]"
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  textShadow: '2px 2px 0 #333, 4px 4px 0 #666'
                }}
              >
                MONETIZATION
              </h1>
              <p className="text-[#999] text-sm md:text-base uppercase tracking-wide">
                Artist-First Economics • Fair Revenue Splits • Crypto Payments
              </p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-[#333] p-4">
            <p className="text-[#ccc] leading-relaxed">
              Metal Forge is built on <strong className="text-yellow-400">artist-first economics</strong>. 
              80-90% of revenue goes directly to creators and sellers. All financial logic runs on 
              <strong className="text-blue-400"> Optimism network</strong> – fast, cheap, transparent.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        
        {/* REVENUE SPLITS */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FaPercentage className="text-2xl text-green-400" />
            <h2 className="text-2xl font-black uppercase tracking-wide">Revenue Distribution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {revenueSplits.map(({ stream, split, icon: Icon, description }) => (
              <motion.div
                key={stream}
                whileHover={{ y: -2 }}
                className="bg-[#111] border-2 border-[#333] hover:border-yellow-600 transition-colors p-6"
              >
                <div className="flex items-center gap-4 mb-3">
                  <Icon className="text-3xl text-orange-400" />
                  <div>
                    <h3 className="font-bold text-[#e0e0e0] uppercase">{stream}</h3>
                    <p className="text-lg font-bold text-green-400">{split}</p>
                  </div>
                </div>
                <p className="text-sm text-[#999]">{description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EARNINGS CALCULATOR */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FaChartLine className="text-2xl text-blue-400" />
            <h2 className="text-2xl font-black uppercase tracking-wide">Earnings Examples</h2>
          </div>

          <div className="bg-[#111] border-2 border-[#333] p-6">
            <p className="text-[#ccc] mb-4">
              Based on 0.001 ETH per stream (artist receives 80%):
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#333]">
                    <th className="text-left py-2 text-[#999] uppercase">Scenario</th>
                    <th className="text-left py-2 text-[#999] uppercase">Total Plays</th>
                    <th className="text-left py-2 text-[#999] uppercase">Artist Earnings</th>
                    <th className="text-left py-2 text-[#999] uppercase">USD Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  {earningsExamples.map(({ scenario, plays, earning, usd }) => (
                    <tr key={scenario} className="border-b border-[#222]">
                      <td className="py-3 text-[#ccc] font-bold">{scenario}</td>
                      <td className="py-3 text-blue-400">{plays}</td>
                      <td className="py-3 text-green-400 font-bold">{earning}</td>
                      <td className="py-3 text-yellow-400">{usd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GiCrossedSwords className="text-2xl text-red-400" />
            <h2 className="text-2xl font-black uppercase tracking-wide">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111] border-2 border-[#333] p-6">
              <h3 className="text-lg font-bold text-[#e0e0e0] mb-4 uppercase flex items-center gap-2">
                <FaShieldAlt className="text-green-400" /> Smart Contract Security
              </h3>
              <ul className="space-y-2 text-[#ccc] text-sm">
                <li>• Escrow protection for marketplace transactions</li>
                <li>• Automatic revenue splits via smart contracts</li>
                <li>• Transparent, immutable payment records</li>
                <li>• No chargebacks or payment disputes</li>
              </ul>
            </div>

            <div className="bg-[#111] border-2 border-[#333] p-6">
              <h3 className="text-lg font-bold text-[#e0e0e0] mb-4 uppercase flex items-center gap-2">
                <FaCoins className="text-yellow-400" /> Micropayments
              </h3>
              <ul className="space-y-2 text-[#ccc] text-sm">
                <li>• Stream-to-Earn powered by Optimism</li>
                <li>• Instant payments to artist wallets</li>
                <li>• Low gas fees (typically $0.01-0.05)</li>
                <li>• Support artists with one-click tips</li>
              </ul>
            </div>

            <div className="bg-[#111] border-2 border-[#333] p-6">
              <h3 className="text-lg font-bold text-[#e0e0e0] mb-4 uppercase flex items-center gap-2">
                <GiThorHammer className="text-purple-400" /> NFT Monetization
              </h3>
              <ul className="space-y-2 text-[#ccc] text-sm">
                <li>• Mint exclusive band merchandise as NFTs</li>
                <li>• Concert tickets, album art, rare demos</li>
                <li>• Royalties on secondary sales</li>
                <li>• Utility-based NFTs with real benefits</li>
              </ul>
            </div>

            <div className="bg-[#111] border-2 border-[#333] p-6">
              <h3 className="text-lg font-bold text-[#e0e0e0] mb-4 uppercase flex items-center gap-2">
                <FaCrown className="text-orange-400" /> Community Support
              </h3>
              <ul className="space-y-2 text-[#ccc] text-sm">
                <li>• 100% of tips go to recipients</li>
                <li>• Fan funding for new releases</li>
                <li>• Community-driven band incubator</li>
                <li>• Governance tokens for active supporters</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PLATFORM FEES */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FaWallet className="text-2xl text-purple-400" />
            <h2 className="text-2xl font-black uppercase tracking-wide">Platform Economics</h2>
          </div>

          <div className="bg-[#111] border-2 border-[#333] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-green-400 mb-3 uppercase">Revenue Sources</h3>
                <ul className="space-y-2 text-[#ccc] text-sm">
                  <li>• 20% from streaming micropayments</li>
                  <li>• 15% from NFT minting fees</li>
                  <li>• 10% from marketplace transactions</li>
                  <li>• 0% from community tips</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-400 mb-3 uppercase">Fund Allocation</h3>
                <ul className="space-y-2 text-[#ccc] text-sm">
                  <li>• 40% Platform development</li>
                  <li>• 30% Community rewards</li>
                  <li>• 20% Infrastructure costs</li>
                  <li>• 10% Team compensation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="text-center">
          <div className="bg-[#111] border-2 border-[#333] p-8">
            <GiDragonHead className="text-6xl text-red-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-[#ccc] mb-8 max-w-2xl mx-auto">
              Join thousands of underground artists already earning crypto on Metal Forge. 
              Upload your first demo and start getting paid for every stream.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/player/upload"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 uppercase font-bold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus /> Upload Demo
              </Link>
              <Link
                href="/artists/signup"
                className="bg-transparent border-2 border-[#666] text-[#ccc] hover:bg-[#222] px-8 py-4 uppercase font-bold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <GiDeathSkull /> Artist Account
              </Link>
              <Link
                href="/help"
                className="bg-transparent border-2 border-[#666] text-[#ccc] hover:bg-[#222] px-8 py-4 uppercase font-bold tracking-wide transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
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
            METAL FORGE MONETIZATION • ARTIST-FIRST ECONOMICS
          </p>
          <p className="text-[#444] text-xs mt-2">
            Fair revenue splits • Crypto payments • Underground support
          </p>
        </div>
      </footer>
    </div>
  );
}
