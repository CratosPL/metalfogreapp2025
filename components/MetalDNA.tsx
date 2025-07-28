"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, FaFire, FaCompactDisc, FaSearch, FaHandsHelping,
  FaCrown, FaStar, FaShieldAlt, FaSkullCrossbones
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCrossedSwords, GiThorHammer, GiWolfHead,
  GiDragonHead, GiCoffin, GiGhost, GiSwordman
} from 'react-icons/gi';

interface MetalDNAProps {
  userId: string;
}

interface UserMetalDNA {
  kvltPoints: number;
  battleScars: number;
  vinylVault: number;
  demoDigger: number;
  sceneSupporter: number;
  totalScore: number;
  currentLevel: number;
  nextLevelProgress: number;
}

const metalCircles = [
  { 
    level: 1, 
    name: "Poser", 
    requirement: "Join platform",
    minScore: 0,
    icon: FaSkullCrossbones,
    color: "text-black",
    bgColor: "bg-[#e0e0d8]"
  },
  { 
    level: 2, 
    name: "Metalhead", 
    requirement: "Add 5 bands to collection",
    minScore: 100,
    icon: GiDeathSkull,
    color: "text-red-800",
    bgColor: "bg-red-800"
  },
  { 
    level: 3, 
    name: "Underground Explorer", 
    requirement: "Discover 10 unknown bands",
    minScore: 300,
    icon: FaSearch,
    color: "text-red-800",
    bgColor: "bg-black"
  },
  { 
    level: 4, 
    name: "Scene Warrior", 
    requirement: "Attend 5 concerts",
    minScore: 600,
    icon: GiCrossedSwords,
    color: "text-red-800",
    bgColor: "bg-red-800"
  },
  { 
    level: 5, 
    name: "Kvlt Master", 
    requirement: "Own rare vinyl/demos",
    minScore: 1000,
    icon: GiThorHammer,
    color: "text-black",
    bgColor: "bg-black"
  },
  { 
    level: 6, 
    name: "Metal Prophet", 
    requirement: "Predict next big band",
    minScore: 1500,
    icon: GiWolfHead,
    color: "text-red-800",
    bgColor: "bg-red-800"
  },
  { 
    level: 7, 
    name: "True Kvlt", 
    requirement: "Ultimate metal dedication",
    minScore: 2500,
    icon: GiDragonHead,
    color: "text-black",
    bgColor: "bg-black"
  }
];

const dailyChallenges = [
  {
    day: "Monday",
    name: "Demo Monday",
    description: "Discover a new underground band",
    reward: 50,
    icon: FaSearch,
    type: "discovery"
  },
  {
    day: "Tuesday", 
    name: "Tape Tuesday",
    description: "Add a cassette to your collection",
    reward: 30,
    icon: GiCoffin,
    type: "collection"
  },
  {
    day: "Wednesday",
    name: "Vinyl Wednesday", 
    description: "Show your vinyl collection",
    reward: 40,
    icon: FaCompactDisc,
    type: "collection"
  },
  {
    day: "Thursday",
    name: "Throwback Thursday",
    description: "Share a classic metal memory",
    reward: 35,
    icon: GiGhost,
    type: "social"
  },
  {
    day: "Friday",
    name: "Pit Friday",
    description: "Document a concert experience", 
    reward: 60,
    icon: FaFire,
    type: "live"
  },
  {
    day: "Saturday",
    name: "Support Saturday",
    description: "Buy from a band or support scene",
    reward: 45,
    icon: FaHandsHelping,
    type: "support"
  },
  {
    day: "Sunday",
    name: "Underground Sunday",
    description: "Help promote a small band",
    reward: 55,
    icon: GiSwordman,
    type: "support"
  }
];

export default function MetalDNA({ userId }: MetalDNAProps) {
  // Mock user data - w przyszłości z Supabase
  const [userDNA, setUserDNA] = useState<UserMetalDNA>({
    kvltPoints: 666,
    battleScars: 13,
    vinylVault: 47,
    demoDigger: 89,
    sceneSupporter: 156,
    totalScore: 971,
    currentLevel: 4,
    nextLevelProgress: 62
  });

  const [todayChallenge, setTodayChallenge] = useState(
    dailyChallenges[new Date().getDay()]
  );

  const currentCircle = metalCircles.find(c => c.level === userDNA.currentLevel);
  const nextCircle = metalCircles.find(c => c.level === userDNA.currentLevel + 1);

  const calculateLevel = (score: number) => {
    for (let i = metalCircles.length - 1; i >= 0; i--) {
      if (score >= metalCircles[i].minScore) {
        return metalCircles[i];
      }
    }
    return metalCircles[0];
  };

  return (
    <div 
      className="bg-[#f5f5e8] border-4 border-black p-6 zine-card"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.9)"
      }}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-4">
        <FaSkullCrossbones className="text-3xl text-red-800 skull-icon" />
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-black font-zine-title">
            METAL DNA
          </h2>
          <p className="text-black text-sm font-zine-body">Your Underground Reputation</p>
        </div>
      </div>

      {/* CURRENT LEVEL */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {currentCircle && (
            <>
              <div className={`w-16 h-16 ${currentCircle.bgColor} border-2 border-black flex items-center justify-center zine-card`}>
                <currentCircle.icon className={`text-2xl ${currentCircle.color}`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${currentCircle.color} uppercase font-zine-title`}>
                  {currentCircle.name}
                </h3>
                <p className="text-black text-sm font-zine-body">{currentCircle.requirement}</p>
                <p className="text-black text-sm font-zine-body">Score: {userDNA.totalScore}</p>
              </div>
            </>
          )}
        </div>

        {/* PROGRESS TO NEXT LEVEL */}
        {nextCircle && (
          <div className="bg-[#e0e0d8] border-2 border-black p-4 zine-card">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-black font-zine-body">Progress to {nextCircle.name}</span>
              <span className="text-sm text-black font-zine-body">
                {userDNA.totalScore}/{nextCircle.minScore}
              </span>
            </div>
            <div className="w-full bg-black h-3 border border-black">
              <div 
                className="bg-red-800 h-full transition-all duration-500"
                style={{ 
                  width: `${((userDNA.totalScore - (currentCircle?.minScore || 0)) / 
                    ((nextCircle.minScore - (currentCircle?.minScore || 0)))) * 100}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* DNA BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#e0e0d8] border-2 border-black p-4 zine-card">
          <div className="flex items-center gap-2 mb-2">
            <FaSearch className="text-red-800" />
            <span className="text-sm font-bold text-black uppercase font-zine-body">Kvlt Points</span>
          </div>
          <div className="text-2xl font-bold text-red-800 font-zine-title">{userDNA.kvltPoints}</div>
          <div className="text-xs text-black font-zine-body">Underground discoveries</div>
        </div>

        <div className="bg-[#e0e0d8] border-2 border-black p-4 zine-card">
          <div className="flex items-center gap-2 mb-2">
            <FaFire className="text-red-800" />
            <span className="text-sm font-bold text-black uppercase font-zine-body">Battle Scars</span>
          </div>
          <div className="text-2xl font-bold text-red-800 font-zine-title">{userDNA.battleScars}</div>
          <div className="text-xs text-black font-zine-body">Concerts attended</div>
        </div>

        <div className="bg-[#e0e0d8] border-2 border-black p-4 zine-card">
          <div className="flex items-center gap-2 mb-2">
            <FaCompactDisc className="text-red-800" />
            <span className="text-sm font-bold text-black uppercase font-zine-body">Vinyl Vault</span>
          </div>
          <div className="text-2xl font-bold text-red-800 font-zine-title">{userDNA.vinylVault}</div>
          <div className="text-xs text-black font-zine-body">Physical collection</div>
        </div>

        <div className="bg-[#e0e0d8] border-2 border-black p-4 zine-card">
          <div className="flex items-center gap-2 mb-2">
            <FaHandsHelping className="text-red-800" />
            <span className="text-sm font-bold text-black uppercase font-zine-body">Scene Support</span>
          </div>
          <div className="text-2xl font-bold text-red-800 font-zine-title">{userDNA.sceneSupporter}</div>
          <div className="text-xs text-black font-zine-body">Bands supported</div>
        </div>
      </div>

      {/* TODAY'S CHALLENGE */}
      <div className="bg-[#e0e0d8] border-2 border-black p-4 zine-card">
        <div className="flex items-center gap-2 mb-3">
          <todayChallenge.icon className="text-red-800" />
          <h3 className="font-bold text-black uppercase font-zine-body">{todayChallenge.name}</h3>
        </div>
        <p className="text-black text-sm mb-3 font-zine-body">{todayChallenge.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-black font-zine-body">Reward: +{todayChallenge.reward} points</span>
          <button className="skull-button text-[#d0d0d0] px-3 py-1 text-xs uppercase font-bold font-zine-body">
            COMPLETE
          </button>
        </div>
      </div>

      <style jsx>{`
        .skull-icon {
          text-shadow: 0 0 10px rgba(139, 0, 0, 0.6);
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
        }
        
        .zine-card {
          border-image: url("/images/zine/jagged_border.png") 30 round;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
  );
}
