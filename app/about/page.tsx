"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaUsers, FaCoins, FaMusic, FaShieldAlt, FaRocket, FaHeart,
  FaGithub, FaTwitter, FaDiscord, FaEnvelope, FaCode, FaDatabase,
  FaSkullCrossbones, FaBook, FaGlobe, FaHandshake
} from "react-icons/fa"
import {
  GiDragonHead, GiBloodySword, GiTreasureMap, GiSkullCrossedBones,
  GiThorHammer, GiCrossedSwords, GiDeathSkull, GiVikingHelmet,
  GiScrollQuill, GiBookshelf, GiBattleGear
} from "react-icons/gi"

/* --- METAL FORGE DATA ---------------------------------------------------- */
const stats = [
  { label: "Underground Bands", value: 666,   icon: GiCrossedSwords,  color: "text-red-800" },
  { label: "Demo Tracks",       value: 1984,  icon: FaMusic,          color: "text-red-800" },
  { label: "Metal Warriors",    value: 777,   icon: FaUsers,          color: "text-red-800" },
  { label: "ETH Forged",        value: 13.37, icon: FaCoins,          color: "text-red-800" },
  { label: "Countries",         value: 33,    icon: GiVikingHelmet,   color: "text-red-800" },
  { label: "War Chronicles",    value: 108,   icon: GiScrollQuill,    color: "text-red-800" }
]

const team = [
  {
    name: "Varg the Architect",
    role: "Founder • Blockchain Sorcerer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    stack: ["Solidity", "Optimism", "Web3", "Smart Contracts"],
    quote: "Building the ultimate metal encyclopedia on blockchain."
  },
  {
    name: "Necro the Engineer",
    role: "Lead Developer • Code Shaman",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    quote: "Coding the future of decentralized metal knowledge."
  },
  {
    name: "Fenriz the Designer",
    role: "UI/UX Warlock • Visual Alchemist",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    stack: ["React", "Tailwind", "Framer Motion", "Web3 UX"],
    quote: "Designing interfaces that connect metalheads worldwide."
  }
]

const roadmap = [
  { q: "2024 Q3", title: "Alpha Encyclopedia Launch",     done: true  },
  { q: "2024 Q4", title: "Community Beta Testing",       done: true  },
  { q: "2025 Q1", title: "Mainnet Encyclopedia",         done: false },
  { q: "2025 Q2", title: "NFT Marketplace & Trading",    done: false },
  { q: "2025 Q3", title: "Global Metal Network",         done: false },
  { q: "2025 Q4", title: "Mobile App & AR Features",     done: false }
]

const techStack = [
  {
    icon: FaCode, 
    title: "Frontend Forge", 
    items: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Web3 Components"]
  },
  {
    icon: FaDatabase, 
    title: "Backend Sanctum", 
    items: ["Supabase", "PostgreSQL", "IPFS Storage", "RESTful APIs", "Real-time Sync"]
  },
  {
    icon: FaCoins, 
    title: "Web3 Arsenal", 
    items: ["Optimism L2", "Smart Contracts", "NFT Standards", "MetaMask", "Wallet Connect"]
  },
  {
    icon: FaShieldAlt, 
    title: "Infrastructure", 
    items: ["Vercel", "Cloudflare CDN", "GitHub Actions", "Docker", "Security Protocols"]
  }
]

const features = [
  {
    icon: GiBookshelf,
    title: "Metal Encyclopedia",
    desc: "Comprehensive database of every metal band, album, and member - from legendary pioneers to underground newcomers."
  },
  {
    icon: FaUsers,
    title: "Community-Driven",
    desc: "Users add bands, albums, reviews and earn crypto rewards. Quality content verified by the community."
  },
  {
    icon: FaCoins,
    title: "Earn While Contributing",
    desc: "Get rewarded in cryptocurrency for adding accurate band info, uploading rare demos, writing reviews."
  },
  {
    icon: GiBattleGear,
    title: "NFT Collectibles",
    desc: "Trade rare album covers, concert photos, band memorabilia as verified NFTs on the blockchain."
  },
  {
    icon: FaGlobe,
    title: "Global Underground",
    desc: "Connect with metalheads worldwide, discover local scenes, share knowledge across all continents."
  },
  {
    icon: FaHandshake,
    title: "Band-Fan Direct",
    desc: "Bands upload their own materials, connect directly with fans, sell exclusive content without middlemen."
  }
]

/* -------------------------------------------------------------- */

export default function AboutPage() {
  const [tab, setTab] = useState<"mission"|"features"|"team"|"roadmap"|"stack">("mission")
  const [counter, setCounter] = useState({ bands:0, demos:0, users:0, eth:0 })

  /* number-up animation */
  useEffect(() => {
    const dur = 1500, fps = 60
    let i = 0
    const int = setInterval(() => {
      i++
      const p = i/fps
      setCounter({
        bands : Math.floor(stats[0].value * p),
        demos : Math.floor(stats[1].value * p),
        users : Math.floor(stats[2].value * p),
        eth   : Math.floor(stats[3].value * p*10)/10
      })
      if (i>=fps) clearInterval(int)
    }, dur/fps)
    return () => clearInterval(int)
  },[])

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

      {/* HERO w stylu Zine */}
      <section 
        className="relative flex flex-col items-center justify-center py-20 border-b-4 border-black text-center zine-section"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(245, 245, 232, 0.95)"
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#f5f5e8] border-4 border-black p-8 zine-card relative">
            <GiBookshelf className="text-8xl md:text-9xl text-red-800 drop-shadow-2xl mb-6 mx-auto filter grayscale contrast-200" />
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest mb-4 text-black font-zine-title">
              About Metal Forge
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-2xl text-black font-zine-body">
              The world's first decentralized metal encyclopedia on blockchain.
            </p>
            <GiBloodySword className="text-red-800 text-4xl mt-6 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* LIVE STATS w stylu Zine */}
      <section 
        className="bg-[#e0e0d8] border-b-4 border-black py-10 zine-section"
        style={{
          backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(224, 224, 216, 0.95)"
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {v:counter.bands,l:"Bands"},
              {v:counter.demos,l:"Demos"},
              {v:counter.users,l:"Warriors"},
              {v:counter.eth,l:"ETH"}
            ].map((s,i)=>(
              <div key={i} className="text-center bg-[#f5f5e8] border-2 border-black p-4 zine-card">
                <div className="text-3xl font-bold text-red-800 font-zine-title">{s.v.toLocaleString()}</div>
                <div className="text-xs uppercase text-black font-zine-body tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS w stylu Zine */}
      <nav className="sticky top-0 z-40 bg-[#f5f5e8] border-b-4 border-black flex justify-center gap-2 py-4 px-4">
        {[
          {k:"mission",t:"Mission", i:GiScrollQuill},
          {k:"features",t:"Features", i:GiBattleGear},
          {k:"team",   t:"Forge Crew", i:GiSkullCrossedBones},
          {k:"roadmap",t:"War Path", i:FaRocket},
          {k:"stack",  t:"Arsenal", i:FaCode}
        ].map(btn=>(
          <button key={btn.k}
            onClick={()=>setTab(btn.k as any)}
            className={`px-4 py-2 text-xs md:text-sm font-bold uppercase flex items-center gap-2 border-2 transition-all duration-300 rounded-none font-zine-body
              ${tab===btn.k
                ?"bg-red-800 border-red-800 text-white shadow-metal"
                :"bg-[#f5f5e8] border-black text-black hover:border-red-800 hover:text-red-800"}`}>
            <btn.i/> {btn.t}
          </button>
        ))}
      </nav>

      {/* ---------------- CONTENT w stylu Zine ---------------- */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12 relative z-10">
        {tab==="mission" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-10">
            <div className="bg-[#f5f5e8] border-4 border-black p-8 text-center zine-card">
              <h2 className="text-3xl font-bold uppercase tracking-widest text-black font-zine-title mb-4">
                Building the Ultimate Metal Encyclopedia
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <article 
                className="bg-[#f5f5e8] border-4 border-black p-6 zine-card"
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.9)"
                }}
              >
                <h3 className="flex items-center gap-2 font-bold text-xl mb-4 font-zine-title text-black">
                  <GiDeathSkull className="text-red-800"/> The Problem
                </h3>
                <p className="leading-relaxed text-black font-zine-body">
                  Metal knowledge is scattered across <span className="text-red-800 font-bold">dying websites</span> and <span className="text-red-800 font-bold">closed databases</span>. 
                  Rare band info gets lost forever. Fans can't be rewarded for their expertise. 
                  The underground deserves a permanent, community-owned archive that will never disappear.
                </p>
              </article>

              <article 
                className="bg-[#f5f5e8] border-4 border-black p-6 zine-card"
                style={{
                  backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(245, 245, 232, 0.9)"
                }}
              >
                <h3 className="flex items-center gap-2 font-bold text-xl mb-4 font-zine-title text-black">
                  <GiThorHammer className="text-red-800"/> Our Solution
                </h3>
                <ul className="list-disc list-inside space-y-2 text-black font-zine-body">
                  <li><span className="text-red-800 font-bold">Blockchain-powered</span> permanent storage on Optimism L2</li>
                  <li><span className="text-red-800 font-bold">Community rewards</span> for contributing accurate band data</li>
                  <li><span className="text-red-800 font-bold">NFT marketplace</span> for rare metal collectibles</li>
                  <li><span className="text-red-800 font-bold">Direct band-fan</span> connection without middlemen</li>
                  <li><span className="text-red-800 font-bold">Global network</span> of metalheads sharing knowledge</li>
                </ul>
              </article>
            </div>

            <section 
              className="bg-[#f5f5e8] border-4 border-black p-6 zine-card"
              style={{
                backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(245, 245, 232, 0.9)"
              }}
            >
              <h3 className="flex items-center gap-2 font-bold text-xl mb-6 font-zine-title text-black">
                <FaBook className="text-red-800"/> What We're Building
              </h3>
              <div className="space-y-4 text-black font-zine-body">
                <p className="leading-relaxed">
                  <span className="text-red-800 font-bold">Metal Forge</span> is the world's first decentralized metal encyclopedia. 
                  Imagine Wikipedia meets Metal Archives meets Web3 rewards - but owned by the community, not corporations.
                </p>
                <p className="leading-relaxed">
                  Every metal band that ever existed, from <span className="text-red-800 font-bold">Black Sabbath to the most obscure demo bands</span>, 
                  will have a permanent home here. Users contribute knowledge and earn cryptocurrency. 
                  Bands upload their own materials directly to fans.
                </p>
                <p className="leading-relaxed">
                  This isn't just a database - it's a <span className="text-red-800 font-bold">living monument to metal history</span> 
                  that will preserve our culture for future generations.
                </p>
              </div>
            </section>
          </motion.div>
        )}

        {tab==="features" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-10">
            <div className="bg-[#f5f5e8] border-4 border-black p-8 text-center zine-card">
              <h2 className="text-3xl font-bold uppercase tracking-widest text-black font-zine-title">Platform Features</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div 
                  key={feature.title}
                  initial={{opacity:0,scale:0.8}} 
                  animate={{opacity:1,scale:1}} 
                  transition={{delay:i*0.1}}
                  className="bg-[#f5f5e8] border-4 border-black p-6 text-center hover:border-red-800 transition-all duration-300 zine-card"
                  style={{
                    backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "rgba(245, 245, 232, 0.9)"
                  }}
                >
                  <feature.icon className="text-5xl mx-auto mb-4 text-red-800"/>
                  <h4 className="font-bold uppercase mb-3 font-zine-title text-black">{feature.title}</h4>
                  <p className="text-black text-sm font-zine-body leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {tab==="team" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-12">
            <div className="bg-[#f5f5e8] border-4 border-black p-8 text-center zine-card">
              <h2 className="text-3xl font-bold uppercase tracking-widest text-black font-zine-title">Meet the Forge Crew</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((m,i)=>(
                <motion.div key={m.name}
                  initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:i*0.1}}
                  className="bg-[#f5f5e8] border-4 border-black p-6 text-center hover:border-red-800 transition-all duration-300 zine-card"
                  style={{
                    backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "rgba(245, 245, 232, 0.9)"
                  }}
                >
                  <img src={m.avatar} alt={m.name}
                       className="w-24 h-24 rounded-none mx-auto mb-4 border-2 border-black filter grayscale contrast-200"/>
                  <h3 className="font-bold text-lg uppercase font-zine-title text-black">{m.name}</h3>
                  <p className="text-red-800 text-xs font-bold mb-4 font-zine-body">{m.role}</p>
                  <p className="text-black text-sm mb-4 font-zine-body italic">"{m.quote}"</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {m.stack.map(s=>(
                      <span key={s} className="bg-red-800 text-white text-xs px-2 py-1 rounded-none font-zine-body">#{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {tab==="roadmap" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-12">
            <div className="bg-[#f5f5e8] border-4 border-black p-8 text-center zine-card">
              <h2 className="text-3xl font-bold uppercase tracking-widest text-black font-zine-title">Path to Metal Domination</h2>
            </div>
            <div 
              className="bg-[#f5f5e8] border-4 border-black p-8 zine-card"
              style={{
                backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(245, 245, 232, 0.9)"
              }}
            >
              <ul className="space-y-6">
                {roadmap.map((r,i)=>(
                  <li key={r.q} className="flex items-start gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center font-bold rounded-none border-2 font-zine-body
                                    ${r.done?"bg-red-800 text-white border-red-800":"bg-[#e0e0d8] text-black border-black"}`}>
                      {r.done?"⚔":"☠"}
                    </div>
                    <div>
                      <h4 className="font-bold font-zine-title text-black">{r.title}</h4>
                      <span className="text-red-800 text-xs font-zine-body">{r.q}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {tab==="stack" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-12">
            <div className="bg-[#f5f5e8] border-4 border-black p-8 text-center zine-card">
              <h2 className="text-3xl font-bold uppercase tracking-widest text-black font-zine-title">Tech Arsenal</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {techStack.map((c,idx)=>(
                <section key={idx} 
                  className="bg-[#f5f5e8] border-4 border-black p-6 zine-card"
                  style={{
                    backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "rgba(245, 245, 232, 0.9)"
                  }}
                >
                  <h3 className="flex items-center gap-2 font-bold text-xl mb-4 font-zine-title text-black">
                    <c.icon className="text-red-800"/> {c.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-black font-zine-body">
                    {c.items.map(it=><li key={it}>{it}</li>)}
                  </ul>
                </section>
              ))}
            </div>

            <div className="text-center">
              <Link href="https://github.com/metalforge"
                className="inline-flex items-center gap-2 skull-button text-[#d0d0d0] px-6 py-3 uppercase font-bold shadow-metal hover:scale-105 transition-all duration-300 rounded-none font-zine-body">
                <FaGithub/> View Source Code
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      {/* CONTACT w stylu Zine */}
      <section 
        className="bg-[#2a2a1a] border-t-4 border-red-800 py-12"
        style={{
          backgroundImage: "url('/images/zine/dark_paper_texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(42, 42, 26, 0.95)"
        }}
      >
        <h2 className="text-2xl font-bold uppercase text-center mb-8 text-[#d0d0c0] font-zine-title">Join the Metal Encyclopedia Revolution</h2>
        <div className="flex justify-center gap-4 flex-wrap max-w-md mx-auto">
          {[
            {href:"https://discord.gg/metalforge", icon:FaDiscord, col:"bg-red-800", label:"Discord"},
            {href:"https://twitter.com/metalforge", icon:FaTwitter, col:"bg-black", label:"Twitter"},
            {href:"https://github.com/metalforge", icon:FaGithub, col:"bg-red-800", label:"GitHub"},
            {href:"mailto:forge@metalforge.io", icon:FaEnvelope, col:"bg-black", label:"Email"}
          ].map(s=>(
            <Link key={s.href} href={s.href}
              className={`${s.col} p-4 text-white hover:scale-105 transition-all duration-300 border-2 border-red-800 rounded-none shadow-metal`}
              title={s.label}>
              <s.icon className="text-2xl"/>
            </Link>
          ))}
        </div>
      </section>

      <style jsx global>{`
        .zine-layout {
          background-color: #f5f5e8;
          background-image: url("/images/zine/paper_texture_distressed.jpg");
          background-size: cover;
          background-position: center;
          position: relative;
          overflow-x: hidden;
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
        
        .font-zine-title {
          font-family: "Blackletter", serif;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .font-zine-body {
          font-family: "Special Elite", monospace;
        }
      `}</style>
    </div>
  )
}
