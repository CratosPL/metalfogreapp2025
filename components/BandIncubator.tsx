// src/components/BandIncubator.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, FaCoins, FaMicrophone, FaUsers, FaCalendarAlt,
  FaChartLine, FaHeart, FaShare, FaPlay, FaPlus
} from 'react-icons/fa';
import { 
  GiThorHammer, GiDeathSkull, GiCrossedSwords, GiDragonHead
} from 'react-icons/gi';

interface BandProject {
  id: string;
  bandName: string;
  projectTitle: string;
  description: string;
  goal: number;
  raised: number;
  backers: number;
  daysLeft: number;
  genre: string;
  country: string;
  image: string;
  demoUrl?: string;
  rewards: ProjectReward[];
  updates: ProjectUpdate[];
}

interface ProjectReward {
  id: string;
  title: string;
  description: string;
  amount: number;
  backers: number;
  estimated: string;
}

interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
}

const mockProjects: BandProject[] = [
  {
    id: "1",
    bandName: "FROSTY TORMENT",
    projectTitle: "Debut Album Recording",
    description: "Polish black metal band seeking funding for professional studio recording of their first full-length album. Raw, atmospheric black metal in the vein of early Darkthrone and Burzum.",
    goal: 2.5,
    raised: 1.8,
    backers: 47,
    daysLeft: 23,
    genre: "Black Metal",
    country: "Poland",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    demoUrl: "/demo/frosty-torment-winter-winds.mp3",
    rewards: [
      {
        id: "r1",
        title: "Digital Album",
        description: "High-quality digital download + exclusive demo tracks",
        amount: 0.01,
        backers: 23,
        estimated: "March 2025"
      },
      {
        id: "r2", 
        title: "Physical CD",
        description: "Limited edition CD with handwritten lyrics booklet",
        amount: 0.03,
        backers: 15,
        estimated: "April 2025"
      },
      {
        id: "r3",
        title: "Vinyl + Merch",
        description: "Limited vinyl pressing + band t-shirt + patch",
        amount: 0.08,
        backers: 9,
        estimated: "May 2025"
      }
    ],
    updates: [
      {
        id: "u1",
        title: "Studio Booked!",
        content: "We've secured studio time for February. Recording will begin soon!",
        date: "2025-01-15"
      }
    ]
  },
  {
    id: "2",
    bandName: "SOLAR WISDOM",
    projectTitle: "European Tour Support",
    description: "Help us bring Polish atmospheric black metal across Europe. Funding will cover travel, equipment, and venue costs for 15-date tour.",
    goal: 4.0,
    raised: 2.1,
    backers: 62,
    daysLeft: 18,
    genre: "Atmospheric Black Metal", 
    country: "Poland",
    image: "https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=400&h=300&fit=crop",
    rewards: [
      {
        id: "r4",
        title: "Tour Poster",
        description: "Signed tour poster + digital live recordings",
        amount: 0.02,
        backers: 28,
        estimated: "June 2025"
      },
      {
        id: "r5",
        title: "VIP Concert Experience",
        description: "Meet & greet + exclusive acoustic set + merch package",
        amount: 0.15,
        backers: 8,
        estimated: "Tour dates"
      }
    ],
    updates: [
      {
        id: "u2",
        title: "First Venues Confirmed",
        content: "Berlin, Prague, and Vienna dates are now official!",
        date: "2025-01-10"
      }
    ]
  }
];

export default function BandIncubator() {
  const [selectedProject, setSelectedProject] = useState<BandProject | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'backed' | 'create'>('projects');

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="bg-[#111] border-2 border-[#333] p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6 border-b border-[#333] pb-4">
        <GiThorHammer className="text-3xl text-orange-400" />
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wide text-[#e0e0e0]">
            BAND INCUBATOR
          </h2>
          <p className="text-[#999] text-sm">Support Underground Projects</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'projects', label: 'ACTIVE PROJECTS', icon: FaRocket },
          { key: 'backed', label: 'MY BACKING', icon: FaHeart },
          { key: 'create', label: 'CREATE PROJECT', icon: FaPlus }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 text-xs uppercase font-bold tracking-wide border-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-orange-600 border-orange-600 text-white'
                : 'bg-transparent border-[#333] text-[#ccc] hover:border-orange-600'
            }`}
          >
            <tab.icon /> {tab.label}
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockProjects.map(project => (
            <motion.div
              key={project.id}
              whileHover={{ y: -2 }}
              className="bg-[#0a0a0a] border border-[#333] hover:border-orange-600 transition-colors cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.image}
                alt={project.bandName}
                className="w-full h-32 object-cover grayscale contrast-125 brightness-90"
                style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
              />
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-[#e0e0e0] text-sm uppercase">
                      {project.bandName}
                    </h3>
                    <p className="text-xs text-[#999]">{project.genre} • {project.country}</p>
                  </div>
                  <span className="text-xs bg-orange-600 text-white px-2 py-1 uppercase font-bold">
                    {project.daysLeft}d LEFT
                  </span>
                </div>

                <h4 className="text-[#ccc] font-bold mb-2">{project.projectTitle}</h4>
                <p className="text-xs text-[#999] mb-3 leading-tight">
                  {project.description.substring(0, 120)}...
                </p>

                {/* PROGRESS */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#ccc]">{project.raised} ETH raised</span>
                    <span className="text-[#999]">{getProgressPercentage(project.raised, project.goal).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-[#333] h-2">
                    <div 
                      className="bg-orange-600 h-2 transition-all duration-500"
                      style={{ width: `${getProgressPercentage(project.raised, project.goal)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-[#666]">
                    <span>Goal: {project.goal} ETH</span>
                    <span>{project.backers} backers</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 text-xs uppercase font-bold">
                    BACK PROJECT
                  </button>
                  {project.demoUrl && (
                    <button className="px-3 bg-transparent border border-[#666] text-[#ccc] hover:bg-[#222] py-2 text-xs">
                      <FaPlay />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MY BACKING TAB */}
      {activeTab === 'backed' && (
        <div className="text-center py-12">
          <GiDeathSkull className="text-6xl text-[#666] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#999] mb-2 uppercase">No Projects Backed Yet</h3>
          <p className="text-[#666] mb-4">Start supporting underground bands to see your backing history</p>
          <button 
            onClick={() => setActiveTab('projects')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 uppercase font-bold tracking-wide"
          >
            EXPLORE PROJECTS
          </button>
        </div>
      )}

      {/* CREATE PROJECT TAB */}
      {activeTab === 'create' && (
        <div className="bg-[#0a0a0a] border border-[#333] p-6">
          <h3 className="text-lg font-bold text-[#ccc] mb-4 uppercase">Launch Your Project</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Band Name</label>
              <input
                type="text"
                className="w-full p-3 bg-[#111] border-2 border-[#333] text-[#e0e0e0] focus:border-orange-600 focus:outline-none"
                placeholder="Your band name..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Project Title</label>
              <input
                type="text"
                className="w-full p-3 bg-[#111] border-2 border-[#333] text-[#e0e0e0] focus:border-orange-600 focus:outline-none"
                placeholder="What are you funding?"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Funding Goal (ETH)</label>
              <input
                type="number"
                step="0.1"
                className="w-full p-3 bg-[#111] border-2 border-[#333] text-[#e0e0e0] focus:border-orange-600 focus:outline-none"
                placeholder="0.0"
              />
            </div>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 uppercase font-bold tracking-wide">
              CREATE PROJECT
            </button>
          </div>
        </div>
      )}

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProject(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] border-2 border-[#333] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#e0e0e0] uppercase">{selectedProject.bandName}</h2>
                  <p className="text-[#999]">{selectedProject.projectTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white bg-black/50 w-8 h-8 flex items-center justify-center hover:bg-black/70"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedProject.image}
                alt={selectedProject.bandName}
                className="w-full h-48 object-cover grayscale contrast-125 brightness-90 mb-4"
                style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
              />

              <p className="text-[#ccc] mb-6">{selectedProject.description}</p>

              {/* REWARDS */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#ccc] mb-4 uppercase">Rewards</h3>
                <div className="space-y-3">
                  {selectedProject.rewards.map(reward => (
                    <div key={reward.id} className="bg-[#0a0a0a] border border-[#333] p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-[#e0e0e0]">{reward.title}</h4>
                        <span className="text-orange-400 font-bold">{reward.amount} ETH</span>
                      </div>
                      <p className="text-sm text-[#999] mb-2">{reward.description}</p>
                      <div className="flex justify-between text-xs text-[#666]">
                        <span>{reward.backers} backers</span>
                        <span>Est. {reward.estimated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 uppercase font-bold tracking-wide">
                BACK THIS PROJECT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
