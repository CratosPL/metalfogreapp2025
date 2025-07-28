"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, FaCoins, FaMicrophone, FaUsers, FaCalendarAlt,
  FaChartLine, FaHeart, FaShare, FaPlay, FaPlus, FaSkullCrossbones
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
    bandName: "VOID ETERNAL",
    projectTitle: "Debut Album Recording",
    description: "Norwegian atmospheric black metal band seeking funding for professional studio recording of their first full-length album. Raw, hypnotic soundscapes inspired by northern wilderness and ancient traditions.",
    goal: 2.5,
    raised: 1.8,
    backers: 47,
    daysLeft: 23,
    genre: "Atmospheric Black Metal",
    country: "Norway",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    demoUrl: "/demo/void-eternal-northern-winds.mp3",
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
    bandName: "IRON COVENANT",
    projectTitle: "European Tour Support",
    description: "Help us bring Swedish death metal across Europe. Funding will cover travel, equipment, and venue costs for 15-date underground tour supporting local scenes.",
    goal: 4.0,
    raised: 2.1,
    backers: 62,
    daysLeft: 18,
    genre: "Death Metal", 
    country: "Sweden",
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
  },
  {
    id: "3",
    bandName: "MORBID SANCTUM",
    projectTitle: "Music Video Production",
    description: "Finnish doom metal band creating an atmospheric music video for our latest single. Professional cinematography capturing the essence of northern darkness and melancholy.",
    goal: 1.2,
    raised: 0.7,
    backers: 31,
    daysLeft: 12,
    genre: "Doom Metal",
    country: "Finland",
    image: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=400&h=300&fit=crop",
    rewards: [
      {
        id: "r6",
        title: "Digital Single",
        description: "High-quality download + behind-the-scenes footage",
        amount: 0.005,
        backers: 18,
        estimated: "February 2025"
      },
      {
        id: "r7",
        title: "Exclusive Merch",
        description: "Limited t-shirt design + signed poster",
        amount: 0.025,
        backers: 10,
        estimated: "March 2025"
      }
    ],
    updates: [
      {
        id: "u3",
        title: "Location Scouting Complete",
        content: "Found the perfect abandoned church for filming!",
        date: "2025-01-12"
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
        <GiThorHammer className="text-3xl text-red-800 skull-icon" />
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-black font-zine-title">
            BAND INCUBATOR
          </h2>
          <p className="text-black text-sm font-zine-body">Support Underground Projects</p>
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
            className={`px-4 py-2 text-xs uppercase font-bold tracking-wide border-2 transition-colors flex items-center gap-2 font-zine-body ${
              activeTab === tab.key
                ? 'bg-red-800 border-red-800 text-white'
                : 'bg-[#f5f5e8] border-black text-black hover:border-red-800'
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
              className="bg-[#e0e0d8] border-2 border-black hover:border-red-800 transition-colors cursor-pointer zine-card"
              onClick={() => setSelectedProject(project)}
              style={{
                backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(224, 224, 216, 0.9)"
              }}
            >
              <img
                src={project.image}
                alt={project.bandName}
                className="w-full h-32 object-cover grayscale contrast-200 border-b-2 border-black"
              />
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-black text-sm uppercase font-zine-title">
                      {project.bandName}
                    </h3>
                    <p className="text-xs text-black font-zine-body">{project.genre} • {project.country}</p>
                  </div>
                  <span className="text-xs bg-red-800 text-white px-2 py-1 uppercase font-bold font-zine-body">
                    {project.daysLeft}d LEFT
                  </span>
                </div>

                <h4 className="text-black font-bold mb-2 font-zine-body">{project.projectTitle}</h4>
                <p className="text-xs text-black mb-3 leading-tight font-zine-body">
                  {project.description.substring(0, 120)}...
                </p>

                {/* PROGRESS */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-black font-zine-body">{project.raised} ETH raised</span>
                    <span className="text-black font-zine-body">{getProgressPercentage(project.raised, project.goal).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-black h-3 border border-black">
                    <div 
                      className="bg-red-800 h-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(project.raised, project.goal)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-black font-zine-body">
                    <span>Goal: {project.goal} ETH</span>
                    <span>{project.backers} backers</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 skull-button text-[#d0d0d0] py-2 text-xs uppercase font-bold font-zine-body">
                    BACK PROJECT
                  </button>
                  {project.demoUrl && (
                    <button className="px-3 bg-[#f5f5e8] border-2 border-black text-black hover:bg-[#e0e0d8] py-2 text-xs">
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
          <FaSkullCrossbones className="text-6xl text-black mx-auto mb-4" />
          <h3 className="text-xl font-bold text-black mb-2 uppercase font-zine-title">No Projects Backed Yet</h3>
          <p className="text-black mb-4 font-zine-body">Start supporting underground bands to see your backing history</p>
          <button 
            onClick={() => setActiveTab('projects')}
            className="skull-button text-[#d0d0d0] px-6 py-3 uppercase font-bold tracking-wide font-zine-body"
          >
            EXPLORE PROJECTS
          </button>
        </div>
      )}

      {/* CREATE PROJECT TAB */}
      {activeTab === 'create' && (
        <div className="bg-[#e0e0d8] border-2 border-black p-6 zine-card">
          <h3 className="text-lg font-bold text-black mb-4 uppercase font-zine-title">Launch Your Project</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase font-zine-body">Band Name</label>
              <input
                type="text"
                className="w-full p-3 bg-[#f5f5e8] border-2 border-black text-black focus:border-red-800 focus:outline-none font-zine-body"
                placeholder="Your band name..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase font-zine-body">Project Title</label>
              <input
                type="text"
                className="w-full p-3 bg-[#f5f5e8] border-2 border-black text-black focus:border-red-800 focus:outline-none font-zine-body"
                placeholder="What are you funding?"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase font-zine-body">Funding Goal (ETH)</label>
              <input
                type="number"
                step="0.1"
                className="w-full p-3 bg-[#f5f5e8] border-2 border-black text-black focus:border-red-800 focus:outline-none font-zine-body"
                placeholder="0.0"
              />
            </div>
            <button className="w-full skull-button text-[#d0d0d0] py-3 uppercase font-bold tracking-wide font-zine-body">
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
            className="bg-[#f5f5e8] border-4 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto zine-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(245, 245, 232, 0.95)"
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-black uppercase font-zine-title">{selectedProject.bandName}</h2>
                  <p className="text-black font-zine-body">{selectedProject.projectTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white bg-black w-8 h-8 flex items-center justify-center hover:bg-red-800"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedProject.image}
                alt={selectedProject.bandName}
                className="w-full h-48 object-cover grayscale contrast-200 mb-4 border-2 border-black"
              />

              <p className="text-black mb-6 font-zine-body">{selectedProject.description}</p>

              {/* REWARDS */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-4 uppercase font-zine-title">Rewards</h3>
                <div className="space-y-3">
                  {selectedProject.rewards.map(reward => (
                    <div key={reward.id} className="bg-[#e0e0d8] border-2 border-black p-4 zine-card">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-black font-zine-body">{reward.title}</h4>
                        <span className="text-red-800 font-bold font-zine-body">{reward.amount} ETH</span>
                      </div>
                      <p className="text-sm text-black mb-2 font-zine-body">{reward.description}</p>
                      <div className="flex justify-between text-xs text-black font-zine-body">
                        <span>{reward.backers} backers</span>
                        <span>Est. {reward.estimated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full skull-button text-[#d0d0d0] py-3 uppercase font-bold tracking-wide font-zine-body">
                BACK THIS PROJECT
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
