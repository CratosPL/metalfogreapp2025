"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaFilter,
  FaRegCommentDots,
  FaRegClock,
  FaRegBookmark,
  FaFire,
  FaTags,
} from "react-icons/fa";
import { GiDeathSkull, GiCoffin, GiGhost, GiNewShoot } from "react-icons/gi";
import Link from "next/link";

// Mock data
const categories = [
  { key: "all", label: "All" },
  { key: "scene", label: "Scene" },
  { key: "releases", label: "Releases" },
  { key: "festivals", label: "Festivals" },
  { key: "interviews", label: "Interviews" },
  { key: "history", label: "History" },
];

const mockNews = [
  {
    id: "1",
    title: "Mayhem Announce New Album for 2025",
    excerpt:
      "Norwegian black metal legends Mayhem are set to release their new album next spring. Expect raw chaos and true Norwegian darkness.",
    category: "releases",
    date: "2025-07-01",
    author: "METAL_SCRIBE",
    comments: 12,
    tags: ["mayhem", "black metal", "releases"],
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Brutal Assault 2025 – First Bands Announced",
    excerpt:
      "The legendary Czech festival returns with a killer lineup: Emperor, Morbid Angel, Mgła, and more. Tickets on sale now!",
    category: "festivals",
    date: "2025-06-25",
    author: "FEST_REPORTER",
    comments: 7,
    tags: ["festival", "brutal assault", "live"],
    image:
      "https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Interview: Fenriz (Darkthrone) on Modern Black Metal",
    excerpt:
      "We talk to Fenriz about the state of the underground, vinyl, and why the best music is still made in basements.",
    category: "interviews",
    date: "2025-06-20",
    author: "UNDERGROUND_HERALD",
    comments: 4,
    tags: ["darkthrone", "interview", "underground"],
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "30 Years of Bathory’s 'Hammerheart'",
    excerpt:
      "A look back at the album that defined Viking metal and changed the course of extreme music forever.",
    category: "history",
    date: "2025-06-10",
    author: "ARCHIVE_KEEPER",
    comments: 9,
    tags: ["bathory", "history", "viking metal"],
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
  },
];

export default function NewsroomPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  // Filtrowanie
  const filteredNews = mockNews.filter((news) => {
    const categoryMatch =
      activeCategory === "all" || news.category === activeCategory;
    const searchMatch =
      news.title.toLowerCase().includes(search.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      news.tags.some((tag) => tag.includes(search.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#333] p-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <FaFire className="text-4xl text-red-400" />
            <div>
              <h1
                className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0]"
                style={{
                  fontFamily: "Impact, Arial Black, sans-serif",
                  textShadow: "2px 2px 0 #333, 4px 4px 0 #666",
                }}
              >
                WAR CHRONICLES
              </h1>
              <p className="text-[#999] text-sm md:text-base uppercase tracking-wide">
                Metal Newsroom • Underground Scene Reports
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/news/submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 border-2 border-red-600 transition-colors uppercase font-bold text-xs tracking-wide flex items-center gap-2"
            >
              <FaPlus /> Submit News
            </Link>
          </div>
        </div>
      </header>

      {/* CATEGORY FILTERS */}
      <nav className="bg-[#111] border-b-2 border-[#333] py-2">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-xs uppercase font-bold tracking-wide border-2 transition-colors ${
                activeCategory === cat.key
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-transparent border-[#333] text-[#ccc] hover:border-red-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* SEARCH BAR */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="relative mb-2">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search news, tags, bands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* NEWS LIST */}
      <main className="max-w-5xl mx-auto p-4">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <GiDeathSkull className="text-6xl text-[#666] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#999] mb-2 uppercase">
              No News Found
            </h3>
            <p className="text-[#666]">Try a different category or search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map((news) => (
              <motion.div
                key={news.id}
                whileHover={{ y: -5 }}
                className="bg-[#111] border-2 border-[#333] hover:border-red-600 transition-colors flex flex-col"
              >
                <Link href={`/news/${news.id}`}>
                  <div className="relative">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-48 object-cover grayscale contrast-125 brightness-90"
                      style={{
                        filter: "grayscale(1) contrast(1.25) brightness(0.9)",
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-red-800 text-red-200 px-2 py-1 text-xs uppercase font-bold">
                      {categories.find((c) => c.key === news.category)?.label ||
                        news.category}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-black uppercase tracking-wide text-[#e0e0e0] hover:text-red-400 transition-colors mb-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-[#ccc] mb-3 leading-tight">
                      {news.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {news.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#333] text-[#ccc] px-2 py-1 text-xs uppercase"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#999] mt-auto">
                      <span className="flex items-center gap-1">
                        <FaRegClock /> {news.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaRegCommentDots /> {news.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaRegBookmark /> {news.author}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#111] border-t-4 border-[#333] p-6 mt-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <GiDeathSkull className="text-xl text-[#666]" />
            <GiCoffin className="text-xl text-[#666]" />
            <GiGhost className="text-xl text-[#666]" />
          </div>
          <p className="text-[#666] text-sm uppercase tracking-widest">
            WAR CHRONICLES • METAL FORGE NEWSROOM
          </p>
          <p className="text-[#444] text-xs mt-2">
            Submit your news • Underground only • No posers allowed
          </p>
        </div>
      </footer>
    </div>
  );
}
