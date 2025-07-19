// src/app/about/page.tsx - ABOUT METAL FORGE
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaCoins, FaMusic, FaShieldAlt, FaRocket, FaHeart,
  FaGithub, FaTwitter, FaDiscord, FaEnvelope, FaCode, FaDatabase
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCrossedSwords, GiDragonHead, GiWolfHead,
  GiThorHammer, GiCoffin, GiGhost, GiScrollQuill, GiVikingHelmet
} from 'react-icons/gi';
import Link from 'next/link';

const teamMembers = [
  {
    name: "FENRIZ THE CODER",
    role: "Lead Developer & Founder",
    bio: "Former black metal drummer turned blockchain developer. Built Metal Forge to support the underground scene.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skills: ["Solidity", "React", "Node.js", "IPFS"],
    metalCredits: "Ex-drummer for Norwegian black metal band"
  },
  {
    name: "VARG THE ARCHITECT", 
    role: "Blockchain Engineer",
    bio: "Atmospheric black metal producer and smart contract specialist. Designs the crypto economics of the platform.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skills: ["Optimism", "Web3", "DeFi", "Smart Contracts"],
    metalCredits: "Producer for 15+ underground albums"
  },
  {
    name: "EURONYMOUS UI",
    role: "Frontend Wizard",
    bio: "Death metal guitarist and UI/UX designer. Creates the dark, brutal interfaces that metalheads deserve.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face", 
    skills: ["React", "TypeScript", "Design", "Animation"],
    metalCredits: "Guitarist in 3 death metal bands"
  }
];

const milestones = [
  { year: "2024 Q1", event: "Concept & Team Formation", description: "Underground metal scene veterans unite to build the platform" },
  { year: "2024 Q2", event: "MVP Development", description: "Core features: Legion Database, Demo Vault, Community" },
  { year: "2024 Q3", event: "Alpha Launch", description: "Closed beta with 100 selected metalheads and 10 bands" },
  { year: "2024 Q4", event: "Public Beta", description: "Open to all metal communities worldwide" },
  { year: "2025 Q1", event: "Mainnet Launch", description: "Full crypto integration on Optimism network" },
  { year: "2025 Q2", event: "Mobile App", description: "Native iOS/Android apps for underground streaming" }
];

const stats = [
  { label: "Bands Supported", value: "2,847", icon: GiCrossedSwords },
  { label: "Demos Uploaded", value: "15,392", icon: FaMusic },
  { label: "Community Members", value: "8,921", icon: FaUsers },
  { label: "ETH Earned by Artists", value: "127.5", icon: FaCoins },
  { label: "Countries Represented", value: "67", icon: GiVikingHelmet },
  { label: "Underground News", value: "420", icon: GiScrollQuill }
];

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<'mission' | 'team' | 'roadmap' | 'tech'>('mission');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      
      {/* HERO SECTION */}
      <section className="relative border-b-4 border-[#333] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <GiDragonHead className="text-8xl text-red-700 mx-auto mb-6" />
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl font-black uppercase tracking-widest mb-4"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              textShadow: '3px 3px 0 #111, 6px 6px 0 #333'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            ABOUT METAL FORGE
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-[#ccc] mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            The first decentralized platform built by metalheads, for metalheads. 
            Where underground music meets cutting-edge blockchain technology.
          </motion.p>

          <motion.div
            className="text-lg text-[#999] italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            "No posers. No compromise. Only true underground."
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-[#111] border-b-4 border-[#333] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black uppercase tracking-widest text-center mb-8 text-[#e0e0e0]">
            Platform Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-[#0a0a0a] border border-[#333] p-4 text-center"
              >
                <stat.icon className="text-3xl text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#e0e0e0] mb-1">{stat.value}</div>
                <div className="text-xs uppercase text-[#999]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS */}
      <nav className="bg-[#111] border-b-2 border-[#333] p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {[
            { key: 'mission', label: 'MISSION', icon: GiScrollQuill },
            { key: 'team', label: 'TEAM', icon: GiWolfHead },
            { key: 'roadmap', label: 'ROADMAP', icon: FaRocket },
            { key: 'tech', label: 'TECHNOLOGY', icon: FaCode }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as any)}
              className={`px-4 py-2 text-xs uppercase font-bold tracking-wide border-2 transition-colors flex items-center gap-2 ${
                activeSection === tab.key
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-transparent border-[#333] text-[#ccc] hover:border-red-600'
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        
        {/* MISSION SECTION */}
        {activeSection === 'mission' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#111] border-2 border-[#333] p-6">
                <h3 className="text-xl font-black uppercase tracking-wide mb-4 flex items-center gap-2">
                  <GiDeathSkull className="text-red-400" /> The Problem
                </h3>
                <div className="space-y-4 text-[#ccc]">
                  <p>
                    The mainstream music industry has abandoned extreme metal. Streaming platforms pay artists pennies, 
                    algorithmic playlists favor commercial music, and underground bands struggle to reach their audience.
                  </p>
                  <p>
                    Traditional platforms don't understand the metal community. They lack the features metalheads need: 
                    comprehensive band databases, demo sharing, vinyl trading, and direct artist support.
                  </p>
                  <p>
                    Meanwhile, Web3 technology promises to revolutionize creator economics, but most crypto platforms 
                    are built by tech bros who've never been to a black metal show.
                  </p>
                </div>
              </div>

              <div className="bg-[#111] border-2 border-[#333] p-6">
                <h3 className="text-xl font-black uppercase tracking-wide mb-4 flex items-center gap-2">
                  <GiThorHammer className="text-blue-400" /> Our Solution
                </h3>
                <div className="space-y-4 text-[#ccc]">
                  <p>
                    Metal Forge is built by metalheads who understand the scene. We combine the raw spirit of 
                    underground zines with cutting-edge blockchain technology.
                  </p>
                  <p>
                    Artists earn crypto directly from fans through micropayments. No record labels, no middlemen. 
                    80% of streaming revenue goes straight to the artist's wallet.
                  </p>
                  <p>
                    Our platform includes everything the metal community needs: band archives, demo streaming, 
                    news, community features, NFT collectibles, and a marketplace for physical releases.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border-2 border-[#333] p-6">
              <h3 className="text-xl font-black uppercase tracking-wide mb-4 flex items-center gap-2">
                <GiCrossedSwords className="text-green-400" /> Core Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <FaShieldAlt className="text-3xl text-red-400 mx-auto mb-3" />
                  <h4 className="font-bold text-[#e0e0e0] mb-2 uppercase">Underground First</h4>
                  <p className="text-sm text-[#999]">
                    We prioritize underground and emerging artists over mainstream acts. 
                    The platform is designed to help unknown bands get discovered.
                  </p>
                </div>
                <div className="text-center">
                  <FaCoins className="text-3xl text-yellow-400 mx-auto mb-3" />
                  <h4 className="font-bold text-[#e0e0e0] mb-2 uppercase">Fair Economics</h4>
                  <p className="text-sm text-[#999]">
                    Artists deserve fair compensation. Our crypto micropayments ensure 
                    creators get paid instantly for every stream.
                  </p>
                </div>
                <div className="text-center">
                  <FaHeart className="text-3xl text-purple-400 mx-auto mb-3" />
                  <h4 className="font-bold text-[#e0e0e0] mb-2 uppercase">Community Driven</h4>
                  <p className="text-sm text-[#999]">
                    The metal community builds this platform together. User contributions 
                    are rewarded with tokens and governance rights.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TEAM SECTION */}
        {activeSection === 'team' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Meet the Horde</h2>
              <p className="text-[#ccc] max-w-2xl mx-auto">
                Metal Forge is built by a team of metalheads who've been part of the underground scene for decades. 
                We're musicians, producers, and developers who understand what the community needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-[#111] border-2 border-[#333] p-6 text-center"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 grayscale contrast-125 brightness-90 border-2 border-[#333]"
                    style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                  />
                  <h3 className="text-lg font-bold text-[#e0e0e0] mb-1 uppercase">{member.name}</h3>
                  <p className="text-red-400 text-sm mb-3 uppercase font-bold">{member.role}</p>
                  <p className="text-[#ccc] text-sm mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#999] mb-2 uppercase">Skills</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.skills.map(skill => (
                        <span key={skill} className="bg-[#333] text-[#ccc] px-2 py-1 text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] border border-[#333] p-3">
                    <h4 className="text-xs font-bold text-[#666] mb-1 uppercase">Metal Credits</h4>
                    <p className="text-xs text-[#999]">{member.metalCredits}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-[#111] border-2 border-[#333] p-6 text-center">
              <h3 className="text-xl font-black uppercase tracking-wide mb-4">Join Our Team</h3>
              <p className="text-[#ccc] mb-6">
                We're always looking for talented metalheads to join our mission. 
                Whether you're a developer, designer, or community manager, we want to hear from you.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="mailto:jobs@metalforge.io"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 uppercase font-bold tracking-wide transition-colors flex items-center gap-2"
                >
                  <FaEnvelope /> CAREERS
                </Link>
                <Link
                  href="/community"
                  className="bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] px-6 py-3 uppercase font-bold tracking-wide transition-colors"
                >
                  COMMUNITY
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* ROADMAP SECTION */}
        {activeSection === 'roadmap' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Roadmap to Metal Domination</h2>
              <p className="text-[#ccc] max-w-2xl mx-auto">
                Our journey from underground project to the definitive platform for extreme metal. 
                Each milestone brings us closer to revolutionizing how metalheads discover and support music.
              </p>
            </div>

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-6 ${index < 4 ? 'opacity-100' : 'opacity-60'}`}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                      index < 4 
                        ? 'bg-red-600 border-red-600 text-white' 
                        : 'border-[#333] text-[#666]'
                    }`}>
                      {index < 4 ? '✓' : index + 1}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className={`w-0.5 h-16 mx-auto mt-2 ${
                        index < 3 ? 'bg-red-600' : 'bg-[#333]'
                      }`} />
                    )}
                  </div>
                  
                  <div className="bg-[#111] border-2 border-[#333] p-6 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-[#e0e0e0] uppercase">{milestone.event}</h3>
                      <span className="text-sm text-red-400 font-bold">{milestone.year}</span>
                    </div>
                    <p className="text-[#ccc] text-sm">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-[#111] border-2 border-[#333] p-6 text-center">
              <h3 className="text-xl font-black uppercase tracking-wide mb-4">What's Next?</h3>
              <p className="text-[#ccc] mb-6">
                Beyond 2025, we're planning international expansion, festival partnerships, 
                and advanced AI features for music discovery. The underground revolution is just beginning.
              </p>
              <Link
                href="/community"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 uppercase font-bold tracking-wide transition-colors"
              >
                JOIN THE REVOLUTION
              </Link>
            </div>
          </motion.div>
        )}

        {/* TECHNOLOGY SECTION */}
        {activeSection === 'tech' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Technology Stack</h2>
              <p className="text-[#ccc] max-w-2xl mx-auto">
                Metal Forge combines cutting-edge Web3 technology with battle-tested frameworks 
                to create a platform that's both powerful and reliable.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#111] border-2 border-[#333] p-6">
                <h3 className="text-xl font-black uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FaCode className="text-blue-400" /> Frontend & UI
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Next.js 15</span>
                    <span className="text-blue-400 text-sm">React Framework</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">TypeScript</span>
                    <span className="text-blue-400 text-sm">Type Safety</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Tailwind CSS</span>
                    <span className="text-blue-400 text-sm">Styling</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Framer Motion</span>
                    <span className="text-blue-400 text-sm">Animations</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#ccc]">React Icons</span>
                    <span className="text-blue-400 text-sm">UI Icons</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border-2 border-[#333] p-6">
                <h3 className="text-xl font-black uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FaDatabase className="text-green-400" /> Backend & Data
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Supabase</span>
                    <span className="text-green-400 text-sm">Database & Auth</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">IPFS</span>
                    <span className="text-green-400 text-sm">File Storage</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Pinata</span>
                    <span className="text-green-400 text-sm">IPFS Gateway</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Node.js</span>
                    <span className="text-green-400 text-sm">API Server</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#ccc]">PostgreSQL</span>
                    <span className="text-green-400 text-sm">Relational DB</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border-2 border-[#333] p-6">
                <h3 className="text-xl font-black uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FaCoins className="text-yellow-400" /> Blockchain & Web3
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Optimism</span>
                    <span className="text-yellow-400 text-sm">L2 Network</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Wagmi</span>
                    <span className="text-yellow-400 text-sm">React Hooks</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Viem</span>
                    <span className="text-yellow-400 text-sm">Ethereum Client</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Solidity</span>
                    <span className="text-yellow-400 text-sm">Smart Contracts</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#ccc]">OpenZeppelin</span>
                    <span className="text-yellow-400 text-sm">Security</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border-2 border-[#333] p-6">
                <h3 className="text-xl font-black uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FaShieldAlt className="text-purple-400" /> Infrastructure
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Vercel</span>
                    <span className="text-purple-400 text-sm">Hosting</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Cloudflare</span>
                    <span className="text-purple-400 text-sm">CDN & Security</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">GitHub Actions</span>
                    <span className="text-purple-400 text-sm">CI/CD</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#333]">
                    <span className="text-[#ccc]">Docker</span>
                    <span className="text-purple-400 text-sm">Containerization</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#ccc]">Monitoring</span>
                    <span className="text-purple-400 text-sm">Sentry & Analytics</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border-2 border-[#333] p-6">
              <h3 className="text-xl font-black uppercase tracking-wide mb-4 text-center">Open Source</h3>
              <p className="text-[#ccc] text-center mb-6">
                Metal Forge believes in transparency and community contribution. 
                Our core platform is open source and available on GitHub.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="https://github.com/metalforge"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 uppercase font-bold tracking-wide transition-colors flex items-center gap-2"
                >
                  <FaGithub /> VIEW SOURCE
                </Link>
                <Link
                  href="/docs"
                  className="bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] px-6 py-3 uppercase font-bold tracking-wide transition-colors"
                >
                  API DOCS
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* CONTACT SECTION */}
      <section className="bg-[#111] border-t-4 border-[#333] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-6">Get In Touch</h2>
          <p className="text-[#ccc] mb-8 max-w-2xl mx-auto">
            Have questions? Want to partner with us? Join our community or reach out directly.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link
              href="https://discord.gg/metalforge"
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white p-4 transition-colors flex flex-col items-center gap-2"
            >
              <FaDiscord className="text-2xl" />
              <span className="text-xs uppercase font-bold">Discord</span>
            </Link>
            <Link
              href="https://twitter.com/metalforge"
              className="bg-[#1DA1F2] hover:bg-[#0d8bd9] text-white p-4 transition-colors flex flex-col items-center gap-2"
            >
              <FaTwitter className="text-2xl" />
              <span className="text-xs uppercase font-bold">Twitter</span>
            </Link>
            <Link
              href="https://github.com/metalforge"
              className="bg-[#333] hover:bg-[#24292e] text-white p-4 transition-colors flex flex-col items-center gap-2"
            >
              <FaGithub className="text-2xl" />
              <span className="text-xs uppercase font-bold">GitHub</span>
            </Link>
            <Link
              href="mailto:hello@metalforge.io"
              className="bg-red-600 hover:bg-red-700 text-white p-4 transition-colors flex flex-col items-center gap-2"
            >
              <FaEnvelope className="text-2xl" />
              <span className="text-xs uppercase font-bold">Email</span>
            </Link>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href="/community"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 uppercase font-bold tracking-wide transition-colors"
            >
              JOIN COMMUNITY
            </Link>
            <Link
              href="/register"
              className="bg-transparent border-2 border-[#666] text-[#ccc] hover:bg-[#222] px-8 py-4 uppercase font-bold tracking-wide transition-colors"
            >
              START FORGING
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t-4 border-[#333] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <GiDeathSkull className="text-xl text-[#666]" />
            <GiCrossedSwords className="text-xl text-[#666]" />
            <GiCoffin className="text-xl text-[#666]" />
            <GiGhost className="text-xl text-[#666]" />
          </div>
          <p className="text-[#666] text-sm uppercase tracking-widest mb-2">
            © {new Date().getFullYear()} METAL FORGE • FORGED IN THE UNDERGROUND
          </p>
          <p className="text-[#444] text-xs">
            Built by metalheads, for metalheads • No posers allowed
          </p>
        </div>
      </footer>
    </div>
  );
}
