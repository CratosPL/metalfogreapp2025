// src/app/bands/[id]/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaCompactDisc, FaMusic, FaStar, FaPen, FaHeart, FaShare,
  FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaCommentDots
} from 'react-icons/fa';
import { 
  GiDeathSkull, GiCrossedSwords, GiDragonHead, GiWolfHead,
  GiThorHammer, GiCoffin, GiGhost, GiScrollQuill
} from 'react-icons/gi';
import Link from 'next/link';

// Mock data for a single band - in a real app, this would be fetched based on the [id] param
const bandDetails = {
  id: '1',
  name: 'DARKTHRONE',
  country: 'Norway',
  genre: 'Black Metal',
  formedYear: 1986,
  status: 'Active',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
  logo: '/images/darkthrone-logo.png', // Przykładowa ścieżka do logo
  followers: 15420,
  description: 'Norwegian black metal pioneers who helped define the genre in the early 90s. Known for their raw, unpolished sound and uncompromising underground ethos.',
  tags: ['Black Metal', 'Norwegian', 'Underground', 'Cult', 'Raw'],
  biography: `Darkthrone was formed in late 1986 in Kolbotn, a small town south of Oslo, Norway. They were originally a death metal band named Black Death, but after Fenriz got more involved with the black metal scene, the band changed their style and name.
  
  Their first three black metal albums, "A Blaze in the Northern Sky" (1992), "Under a Funeral Moon" (1993), and "Transilvanian Hunger" (1994), are often referred to as the "unholy trinity" and are considered classics of the genre. These albums were characterized by their raw, lo-fi production and grim, cold atmosphere.
  
  Over the years, Darkthrone's style has evolved, incorporating elements of punk rock, traditional heavy metal, and speed metal, while always maintaining their underground spirit. They have remained a two-piece band since 1993, consisting of Nocturno Culto and Fenriz.`,
  discography: [
    { id: 'd1', year: 1992, title: "A Blaze in the Northern Sky", type: 'Album', tracks: ["Kathaarian Life Code", "In the Shadow of the Horns", "Paragon Belial", "..."] },
    { id: 'd2', year: 1993, title: "Under a Funeral Moon", type: 'Album', tracks: ["Natassja in Eternal Sleep", "Summer of the Diabolical Holocaust", "The Dance of Eternal Shadows", "..."] },
    { id: 'd3', year: 1994, title: "Transilvanian Hunger", type: 'Album', tracks: ["Transilvanian Hunger", "Over fjell og gjennom torner", "Skald av Satans sol", "..."] },
    { id: 'd4', year: 2006, title: "The Cult Is Alive", type: 'Album', tracks: ["The Cult of Goliath", "Too Old, Too Cold", "Atomic Coming", "..."] }
  ],
  lineup: {
    current: [
      { name: "Fenriz", instrument: "Drums, Vocals, Guitars, Bass", years: "1986-present" },
      { name: "Nocturno Culto", instrument: "Vocals, Guitars, Bass", years: "1988-present" }
    ],
    past: [
      { name: "Dag Nilsen", instrument: "Bass", years: "1988-1991" },
      { name: "Ivar Enger (Zephyrous)", instrument: "Guitars", years: "1987-1993" }
    ]
  },
  gallery: [
    'https://images.unsplash.com/photo-1574406939292-0ed7b26b93c0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571974599782-87624638275b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop'
  ],
  relatedBands: [
    { id: '4', name: 'Bathory', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop' },
    { id: '5', name: 'Mayhem', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop' },
    { id: '3', name: 'Emperor', image: 'https://images.unsplash.com/photo-1571974599782-87624638275b?w=100&h=100&fit=crop' }
  ],
  reviews: [
    { user: 'METAL_SCRIBE', rating: 5, comment: 'Pioneers of the second wave. Their influence is undeniable.', date: '2025-06-20' },
    { user: 'KVLT_WARRIOR', rating: 4, comment: 'Later albums are more punk, but the unholy trinity is pure black metal perfection.', date: '2025-06-18' }
  ]
};

export default function BandDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'biography' | 'discography' | 'lineup' | 'gallery' | 'reviews'>('biography');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting review:', newReview);
    // Add logic to submit the review
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono">
      {/* BAND HEADER */}
      <header className="relative border-b-4 border-[#333] overflow-hidden">
        <img
          src={bandDetails.image}
          alt={bandDetails.name}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-150 brightness-75"
          style={{ filter: "grayscale(1) contrast(1.5) brightness(0.75)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6 items-end">
          {/* LOGO/IMAGE */}
          <div className="w-48 h-48 bg-[#111] border-4 border-[#333] flex-shrink-0">
            <img
              src={bandDetails.logo || bandDetails.image}
              alt={`${bandDetails.name} logo`}
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-white" style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              textShadow: '3px 3px 0 #000'
            }}>
              {bandDetails.name}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-lg text-[#ccc] mb-4">
              <span className="flex items-center gap-2"><FaMapMarkerAlt /> {bandDetails.country}</span>
              <span className="flex items-center gap-2"><GiCrossedSwords /> {bandDetails.genre}</span>
              <span className="flex items-center gap-2"><FaCalendarAlt /> Formed {bandDetails.formedYear}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {bandDetails.tags.map(tag => (
                <span key={tag} className="bg-black/80 border border-[#333] text-[#ccc] px-2 py-1 text-xs uppercase">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm uppercase font-bold flex items-center gap-2">
                <FaHeart /> Follow ({bandDetails.followers.toLocaleString()})
              </button>
              <button className="bg-transparent border-2 border-[#666] text-[#ccc] hover:bg-[#222] px-4 py-2 text-sm uppercase font-bold flex items-center gap-2">
                <FaShare /> Share
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <nav className="bg-[#111] border-b-2 border-[#333] p-2 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {[
            { key: 'biography', label: 'Biography', icon: GiScrollQuill },
            { key: 'discography', label: 'Discography', icon: FaCompactDisc },
            { key: 'lineup', label: 'Lineup', icon: FaUsers },
            { key: 'gallery', label: 'Gallery', icon: GiGhost },
            { key: 'reviews', label: 'Reviews', icon: FaCommentDots }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 text-xs uppercase font-bold tracking-wide border-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-transparent border-[#333] text-[#ccc] hover:border-red-600'
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {activeTab === 'biography' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black uppercase tracking-wide mb-4 text-[#ccc]">Band History</h2>
              <div className="bg-[#111] border-2 border-[#333] p-6 space-y-4 text-[#ccc] leading-relaxed whitespace-pre-line">
                {bandDetails.biography}
              </div>
            </motion.div>
          )}

          {activeTab === 'discography' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black uppercase tracking-wide mb-4 text-[#ccc]">Discography</h2>
              <div className="space-y-4">
                {bandDetails.discography.map(item => (
                  <div key={item.id} className="bg-[#111] border-2 border-[#333] p-4">
                    <div className="flex items-center gap-4">
                      <FaCompactDisc className="text-4xl text-blue-400 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold text-[#e0e0e0]">{item.title}</h3>
                        <p className="text-sm text-[#999]">{item.year} • {item.type}</p>
                      </div>
                      <button className="text-xs text-blue-400 hover:text-blue-300 uppercase font-bold">
                        VIEW TRACKS
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'lineup' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black uppercase tracking-wide mb-4 text-[#ccc]">Lineup History</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-green-400">Current Members</h3>
                  <div className="space-y-2">
                    {bandDetails.lineup.current.map(member => (
                      <div key={member.name} className="bg-[#111] border-2 border-[#333] p-3 text-sm flex justify-between">
                        <span className="font-bold text-[#e0e0e0]">{member.name}</span>
                        <span className="text-[#999]">{member.instrument} ({member.years})</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-red-400">Past Members</h3>
                  <div className="space-y-2">
                    {bandDetails.lineup.past.map(member => (
                      <div key={member.name} className="bg-[#111] border-2 border-[#333] p-3 text-sm flex justify-between">
                        <span className="font-bold text-[#e0e0e0]">{member.name}</span>
                        <span className="text-[#999]">{member.instrument} ({member.years})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black uppercase tracking-wide mb-4 text-[#ccc]">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bandDetails.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-48 object-cover grayscale contrast-125 brightness-90 border-2 border-[#333]"
                    style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black uppercase tracking-wide mb-4 text-[#ccc]">Community Reviews</h2>
              <div className="space-y-4 mb-6">
                {bandDetails.reviews.map((review, index) => (
                  <div key={index} className="bg-[#111] border-2 border-[#333] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-red-400">{review.user}</span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                        {[...Array(5 - review.rating)].map((_, i) => <FaStar key={i} className="text-[#333]" />)}
                      </div>
                    </div>
                    <p className="text-sm text-[#ccc] mb-2">{review.comment}</p>
                    <p className="text-xs text-[#666] text-right">{review.date}</p>
                  </div>
                ))}
              </div>

              {/* WRITE A REVIEW */}
              <form onSubmit={handleReviewSubmit} className="bg-[#111] border-2 border-[#333] p-6">
                <h3 className="text-lg font-bold uppercase mb-4 text-[#ccc]">Write a Review</h3>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <FaStar
                        key={rating}
                        className={`cursor-pointer ${
                          newReview.rating >= rating ? 'text-yellow-400' : 'text-[#333]'
                        }`}
                        onClick={() => setNewReview({ ...newReview, rating })}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-[#ccc] mb-2 uppercase">Comment</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className="w-full p-3 bg-[#0a0a0a] border-2 border-[#333] text-[#e0e0e0] focus:border-red-600 focus:outline-none resize-none"
                    placeholder="Share your thoughts on this band..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 uppercase font-bold tracking-wide"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-6">
          {/* LATEST RELEASE */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-2 text-[#ccc]">Latest Release</h3>
            <div className="bg-[#111] border-2 border-[#333] p-4">
              <img
                src={bandDetails.discography[3].image || bandDetails.image}
                alt={bandDetails.discography[3].title}
                className="w-full h-auto object-cover grayscale contrast-125 brightness-90 mb-3"
              />
              <h4 className="font-bold text-[#e0e0e0]">{bandDetails.discography[3].title}</h4>
              <p className="text-sm text-[#999]">{bandDetails.discography[3].year}</p>
            </div>
          </div>

          {/* RELATED BANDS */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-2 text-[#ccc]">Related Legions</h3>
            <div className="space-y-2">
              {bandDetails.relatedBands.map(band => (
                <Link key={band.id} href={`/bands/${band.id}`} className="bg-[#111] border-2 border-[#333] p-3 flex items-center gap-3 hover:border-red-600">
                  <img src={band.image} alt={band.name} className="w-10 h-10 object-cover grayscale" />
                  <span className="font-bold text-[#e0e0e0] text-sm">{band.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#111] border-t-4 border-[#333] p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/bands" className="text-sm text-red-400 hover:text-red-300 uppercase font-bold">
            ← Back to Legion Database
          </Link>
        </div>
      </footer>
    </div>
  );
}
