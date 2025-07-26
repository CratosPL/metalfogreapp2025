// src/app/about/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaUsers, FaCoins, FaMusic, FaShieldAlt, FaRocket, FaHeart,
  FaGithub, FaTwitter, FaDiscord, FaEnvelope, FaCode, FaDatabase
} from "react-icons/fa"
import {
  GiDragonHead, GiBloodySword, GiTreasureMap, GiSkullCrossedBones,
  GiThorHammer, GiCrossedSwords, GiDeathSkull, GiVikingHelmet,
  GiScrollQuill
} from "react-icons/gi"

/* --- MOCKS ---------------------------------------------------- */
const stats = [
  { label: "Bands",         value: 2847,  icon: GiCrossedSwords,  color: "text-red-400" },
  { label: "Demos",         value: 15392, icon: FaMusic,          color: "text-blue-400" },
  { label: "Metalheads",    value: 8921,  icon: FaUsers,          color: "text-green-400" },
  { label: "ETH to Artists",value: 127.5, icon: FaCoins,          color: "text-yellow-400" },
  { label: "Countries",     value: 67,    icon: GiVikingHelmet,   color: "text-purple-400" },
  { label: "News Posts",    value: 420,   icon: GiScrollQuill,    color: "text-orange-400" }
]

const team = [
  {
    name: "Fenriz the Coder",
    role: "Founder • Lead Dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    stack: ["Solidity", "Next.js", "Tailwind", "IPFS"],
    quote: "Ex-drummer; now forging code in the abyss."
  },
  {
    name: "Varg the Architect",
    role: "Blockchain Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    stack: ["Optimism", "DeFi", "Hardhat", "Wagmi"],
    quote: "Designs tokenomics darker than the void."
  },
  {
    name: "Euronymous UI",
    role: "Design Lead",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    stack: ["React", "Framer-Motion", "Figma"],
    quote: "Makes pixels bleed⁠—in 60 fps."
  }
]

const roadmap = [
  { q: "2024 Q2", title: "MVP online",        done: true  },
  { q: "2024 Q3", title: "Alpha (100 users)", done: true  },
  { q: "2024 Q4", title: "Public Beta",       done: false },
  { q: "2025 Q1", title: "Mainnet launch",    done: false },
  { q: "2025 Q2", title: "Mobile apps",       done: false }
]
/* -------------------------------------------------------------- */

export default function AboutPage() {
  const [tab, setTab] = useState<"mission"|"team"|"roadmap"|"stack">("mission")
  const [counter, setCounter] = useState({ bands:0, demos:0, users:0, eth:0 })

  /* simple number-up animation */
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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-inter overflow-x-hidden">
      {/* RUNE BACKGROUND */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {["ᚦ","ᚱ","ᚠ","ᚹ","ᚨ"].map((r,idx)=>(
          <div key={idx}
            className="absolute text-red-600 animate-pulse select-none"
            style={{
              fontSize:`${4+idx}rem`,
              top:["15%","25%","65%","75%","40%"][idx],
              left:[ "10%","80%","20%","70%","45%"][idx],
              transform:`rotate(${idx*12}deg)`,
              animationDelay:`${idx}s`,
              fontFamily:"serif"
            }}>{r}</div>
        ))}
      </div>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center h-[60vh] border-b-4 border-red-600 text-center">
        <GiDragonHead className="text-8xl md:text-9xl text-red-600 drop-shadow-2xl mb-6" />
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest mb-4">
          About Metal Forge
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-300 italic">
          Web3 platform where underground metal meets unstoppable code.
        </p>
        <GiBloodySword className="text-red-700 text-4xl mt-6 animate-bounce" />
      </section>

      {/* LIVE STATS */}
      <section className="bg-[#111] border-b-4 border-red-600 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
          {[
            {v:counter.bands,l:"Bands"},
            {v:counter.demos,l:"Demos"},
            {v:counter.users,l:"Metalheads"},
            {v:counter.eth,l:"ETH"}
          ].map((s,i)=>(
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-red-400">{s.v.toLocaleString()}</div>
              <div className="text-xs uppercase text-gray-400">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TABS */}
      <nav className="sticky top-0 z-40 bg-[#0d0d0d] border-b-2 border-red-600 flex justify-center gap-2 py-3">
        {[
          {k:"mission",t:"Mission", i:GiScrollQuill},
          {k:"team",   t:"Team",    i:GiSkullCrossedBones},
          {k:"roadmap",t:"Roadmap", i:FaRocket},
          {k:"stack",  t:"Stack",   i:FaCode}
        ].map(btn=>(
          <button key={btn.k}
            onClick={()=>setTab(btn.k as any)}
            className={`px-4 py-2 text-xs md:text-sm font-bold uppercase flex items-center gap-1
              border-2 transition-colors
              ${tab===btn.k
                ?"bg-red-600 border-red-600 text-white"
                :"border-gray-600 text-gray-300 hover:border-red-500"}`}>
            <btn.i/> {btn.t}
          </button>
        ))}
      </nav>

      {/* ---------------- CONTENT ---------------- */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {tab==="mission" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-10">
            <h2 className="text-3xl font-black uppercase tracking-widest text-center">
              No posers • No middlemen • Only True Underground
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-[#111] border border-gray-700 p-6">
                <h3 className="flex items-center gap-2 font-bold text-xl mb-4">
                  <GiDeathSkull className="text-red-500"/> The Problem
                </h3>
                <p className="leading-relaxed text-gray-300">
                  Streaming giants pay <span className="text-red-400 font-bold">fractions of cents</span>.  
                  Underground bands drown in algorithms.  
                  Fans have no real ownership in the scene they fuel.
                </p>
              </article>

              <article className="bg-[#111] border border-gray-700 p-6">
                <h3 className="flex items-center gap-2 font-bold text-xl mb-4">
                  <GiThorHammer className="text-blue-400"/> Our Forge
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>80 % of stream income ➜ artist wallet (Optimism L2).</li>
                  <li>Add a band 👉 earn reputation + crypto micro-bounty.</li>
                  <li>Trade vinyl & NFTs with on-chain escrow—no scams.</li>
                  <li>Community governance: one riff, one vote.</li>
                </ul>
              </article>
            </div>

            <section className="bg-[#111] border border-gray-700 p-6">
              <h3 className="flex items-center gap-2 font-bold text-xl mb-6">
                <FaShieldAlt className="text-green-400"/> Core Values
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  {icon:FaHeart, col:"text-purple-400",   title:"Community-Driven"},
                  {icon:FaCoins, col:"text-yellow-400",  title:"Fair Economics"},
                  {icon:GiTreasureMap,col:"text-red-400", title:"Underground First"}
                ].map(v=>(
                  <div key={v.title}>
                    <v.icon className={`text-4xl mx-auto mb-2 ${v.col}`}/>
                    <h4 className="font-bold uppercase mb-2">{v.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {v.title==="Community-Driven" && "Every contribution is rewarded; decisions are on-chain."}
                      {v.title==="Fair Economics"     && "Artists & collectors keep the lion’s share— instantly."}
                      {v.title==="Underground First" && "No mainstream dilution. Cult status is a feature."}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {tab==="team" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-12">
            <h2 className="text-3xl font-black uppercase tracking-widest text-center">Meet the Forge Crew</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((m,i)=>(
                <motion.div key={m.name}
                  initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:i*0.1}}
                  className="bg-[#111] border border-gray-700 p-6 text-center hover:border-red-500 transition-colors">
                  <img src={m.avatar} alt={m.name}
                       className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-700"/>
                  <h3 className="font-bold text-lg uppercase">{m.name}</h3>
                  <p className="text-red-400 text-xs font-bold mb-4">{m.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{m.quote}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {m.stack.map(s=>(
                      <span key={s} className="bg-gray-800 text-gray-300 text-xs px-2 py-1">{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {tab==="roadmap" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-12">
            <h2 className="text-3xl font-black uppercase tracking-widest text-center">Road to Total Domination</h2>
            <ul className="space-y-6">
              {roadmap.map((r,i)=>(
                <li key={r.q} className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center font-bold
                                  ${r.done?"bg-green-600":"bg-gray-800"} border-2 border-gray-700`}>
                    {r.done?"✓":i+1}
                  </div>
                  <div>
                    <h4 className="font-bold">{r.title}</h4>
                    <span className="text-red-400 text-xs">{r.q}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {tab==="stack" && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-12">
            <h2 className="text-3xl font-black uppercase tracking-widest text-center">Tech Stack</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {icon:FaCode, title:"Frontend / UI", items:["Next.js 14","TypeScript","Tailwind","Framer-Motion"]},
                {icon:FaDatabase, title:"Backend", items:["Supabase","PostgreSQL","Node.js","IPFS/Pinata"]},
                {icon:FaCoins, title:"Web3", items:["Optimism","Wagmi + Viem","Solidity","OpenZeppelin"]},
                {icon:FaShieldAlt, title:"Infra", items:["Vercel","Cloudflare","GitHub Actions","Docker"]}
              ].map((c,idx)=>(
                <section key={idx} className="bg-[#111] border border-gray-700 p-6">
                  <h3 className="flex items-center gap-2 font-bold text-xl mb-4">
                    <c.icon className="text-blue-400"/> {c.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {c.items.map(it=><li key={it}>{it}</li>)}
                  </ul>
                </section>
              ))}
            </div>

            <div className="text-center">
              <Link href="https://github.com/metalforge"
                className="inline-flex items-center gap-2 bg-gray-800 border border-gray-600 px-6 py-3 uppercase font-bold hover:border-red-500">
                <FaGithub/> View Source
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      {/* CONTACT */}
      <section className="bg-[#111] border-t-4 border-red-600 py-12">
        <h2 className="text-2xl font-black uppercase text-center mb-8">Join the Rebellion</h2>
        <div className="flex justify-center gap-4 flex-wrap max-w-md mx-auto">
          {[
            {href:"https://discord.gg/metalforge", icon:FaDiscord, col:"bg-[#5865F2]"},
            {href:"https://twitter.com/metalforge", icon:FaTwitter, col:"bg-[#1DA1F2]"},
            {href:"https://github.com/metalforge",   icon:FaGithub,  col:"bg-gray-700"},
            {href:"mailto:hello@metalforge.io",      icon:FaEnvelope,col:"bg-red-600"}
          ].map(s=>(
            <Link key={s.href} href={s.href}
              className={`${s.col} p-4 text-white hover:opacity-80 transition-opacity`}>
              <s.icon className="text-2xl"/>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t-4 border-red-600 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Metal Forge • Forged in the Underground
      </footer>
    </div>
  )
}
