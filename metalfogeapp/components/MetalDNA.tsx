// src/components/MetalDNA.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, FaFire, FaCompactDisc, FaSearch, FaHandsHelping,
  FaCrown, FaStar, FaShieldAlt, FaSkull
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
    icon: FaSkull,
    color: "text-gray-400",
    bgColor: "bg-gray-800"
  },
  { 
    level: 2, 
    name: "Metalhead", 
    requirement: "Add 5 bands to collection",
    minScore: 100,
    icon: GiDeathSkull,
    color: "text-red-400",
    bgColor: "bg-red-900"
  },
  { 
    level: 3, 
    name: "Underground Explorer", 
    requirement: "Discover 10 unknown bands",
    minScore: 300,
    icon: FaSearch,
    color: "text-blue-400",
    bgColor: "bg-blue-900"
  },
  { 
    level: 4, 
    name: "Scene Warrior", 
    requirement: "Attend 5 concerts",
    minScore: 600,
    icon: GiCrossedSwords,
    color: "text-purple-400",
    bgColor: "bg-purple-900"
  },
  { 
    level: 5, 
    name: "Kvlt Master", 
    requirement: "Own rare vinyl/demos",
    minScore: 1000,
    icon: GiThorHammer,
    color: "text-orange-400",
    bgColor: "bg-orange-900"
  },
  { 
    level: 6, 
    name: "Metal Prophet", 
    requirement: "Predict next big band",
    minScore: 1500,
    icon: GiWolfHead,
    color: "text-yellow-400",
    bgColor: "bg-yellow-900"
  },
  { 
    level: 7, 
    name: "True Kvlt", 
    requirement: "Ultimate metal dedication",
    minScore: 2500,
    icon: GiDragonHead,
    color: "text-green-400",
    bgColor: "bg-green-900"
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
    <div className="bg-[#111] border-2 border-[#333] p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-4">
        <GiDeathSkull className="text-3xl text-red-400" />
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wide text-[#e0e0e0]">
            METAL DNA
          </h2>
          <p className="text-[#999] text-sm">Your Underground Reputation</p>
        </div>
      </div>

      {/* CURRENT LEVEL */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {currentCircle && (
            <>
              <div className={`w-16 h-16 ${currentCircle.bgColor} border-2 border-[#333] flex items-center justify-center`}>
                <currentCircle.icon className={`text-2xl ${currentCircle.color}`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${currentCircle.color} uppercase`}>
                  {currentCircle.name}
                </h3>
                <p className="text-[#999] text-sm">{currentCircle.requirement}</p>
                <p className="text-[#ccc] text-sm">Score: {userDNA.totalScore}</p>
              </div>
            </>
          )}
        </div>

        {/* PROGRESS TO NEXT LEVEL */}
        {nextCircle && (
          <div className="bg-[#0a0a0a] border border-[#333] p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#ccc]">Progress to {nextCircle.name}</span>
              <span className="text-sm text-[#999]">
                {userDNA.totalScore}/{nextCircle.minScore}
              </span>
            </div>
            <div className="w-full bg-[#333] h-2">
              <div 
                className="bg-red-600 h-2 transition-all duration-500"
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
        <div className="bg-[#0a0a0a] border border-[#333] p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaSearch className="text-blue-400" />
            <span className="text-sm font-bold text-[#ccc] uppercase">Kvlt Points</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{userDNA.kvltPoints}</div>
          <div className="text-xs text-[#666]">Underground discoveries</div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#333] p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaFire className="text-red-400" />
            <span className="text-sm font-bold text-[#ccc] uppercase">Battle Scars</span>
          </div>
          <div className="text-2xl font-bold text-red-400">{userDNA.battleScars}</div>
          <div className="text-xs text-[#666]">Concerts attended</div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#333] p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCompactDisc className="text-purple-400" />
            <span className="text-sm font-bold text-[#ccc] uppercase">Vinyl Vault</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">{userDNA.vinylVault}</div>
          <div className="text-xs text-[#666]">Physical collection</div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#333] p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaHandsHelping className="text-green-400" />
            <span className="text-sm font-bold text-[#ccc] uppercase">Scene Support</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{userDNA.sceneSupporter}</div>
          <div className="text-xs text-[#666]">Bands supported</div>
        </div>
      </div>

      {/* TODAY'S CHALLENGE */}
      <div className="bg-[#0a0a0a] border border-[#333] p-4">
        <div className="flex items-center gap-2 mb-3">
          <todayChallenge.icon className="text-yellow-400" />
          <h3 className="font-bold text-[#ccc] uppercase">{todayChallenge.name}</h3>
        </div>
        <p className="text-[#999] text-sm mb-3">{todayChallenge.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#666]">Reward: +{todayChallenge.reward} points</span>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-black px-3 py-1 text-xs uppercase font-bold">
            COMPLETE
          </button>
        </div>
      </div>
    </div>
  );
}
