"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTwitter, FaDiscord } from "react-icons/fa";
import { FiFlag } from "react-icons/fi"; // Ikony flag z react-icons

export default function ComingSoon(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "pl">("en"); // Domyślnie angielski

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Tłumaczenia
  const translations = {
    en: {
      title: "Stronghold",
      subtitle: "The bastion of underground metal is forging its new era. Prepare for the rebellion.",
      readMore: "Read More",
      aboutTitle: "About Stronghold",
      aboutText: (
        <>
          <p className="text-lg mb-8 text-[#b0b0b0]">
            Stronghold, the unholy bastion of Polish underground metal, rises from the ashes of its former incarnation. Once a
            mere mortal shop peddling the black arts, it now returns as a rekindled inferno, forged anew for the true horde. From
            the shadowed crypts of Poland, we unleash exclusive CDs, vinyls, cassettes, and merch, unbound by the chains of
            corporate overlords, serving the flames of black metal and identity-driven rebellion.
          </p>
          <p className="text-lg mb-8 text-[#b0b0b0]">
            This is no mere revival—it’s a rebirth in blood and fire. Stronghold Reborn launches at the turn of May and June 2025,
            wielding the power of Web3 to defy censorship, surveillance, and control. Our decentralized platform grants anonymity
            to our warriors, direct support to unrelenting bands, and a sanctuary where the underground reigns supreme, free from
            the grasp of the profane.
          </p>
          <p className="text-lg mb-8 text-[#b0b0b0]">
            Join the rebellion against conformity. With limited editions, blockchain-forged exclusivity, and the freedom of the
            abyss, Stronghold is more than a platform—it’s a movement. The gates of the underworld open soon. Will you heed the
            call of the reborn horde?
          </p>
        </>
      ),
      close: "Close",
    },
    pl: {
      title: "Twierdza",
      subtitle: "Bastion podziemnego metalu wykuwa nową erę. Przygotuj się na rebelię.",
      readMore: "Dowiedz się więcej",
      aboutTitle: "O Twierdzy",
      aboutText: (
        <>
          <p className="text-lg mb-8 text-[#b0b0b0]">
            Stronghold, nieświęty bastion polskiego podziemnego metalu, powstaje z popiołów swej dawnej postaci. Niegdyś zwykły
            sklep handlujący czarnymi sztukami, dziś powraca jako rozpalony na nowo piekielny ogień, wykuty dla prawdziwej hordy.
            Z mrocznych krypt Polski wyzwalamy ekskluzywne płyty CD, winyle, kasety i merch, wolne od kajdan korporacyjnych
            władców, służąc płomieniom black metalu i tożsamościowej rebelii.
          </p>
          <p className="text-lg mb-8 text-[#b0b0b0]">
            To nie tylko odrodzenie — to narodziny w krwi i ogniu. Twierdza Odrodzona startuje na przełomie maja i czerwca 2025,
            dzierżąc moc Web3, by przeciwstawić się cenzurze, inwigilacji i kontroli. Nasza zdecentralizowana platforma zapewnia
            anonimowość naszym wojownikom, bezpośrednie wsparcie dla nieugiętych zespołów i sanktuarium, gdzie podziemie rządzi
            niepodzielnie, wolne od uścisku profanów.
          </p>
          <p className="text-lg mb-8 text-[#b0b0b0]">
            Dołącz do rebelii przeciwko konformizmowi. Z limitowanymi edycjami, ekskluzywnością wykutą w blockchainie i wolnością
            otchłani, Twierdza to więcej niż platforma — to ruch. Bramy podziemia otwierają się wkrótce. Czy usłyszysz zew
            odrodzonej hordy?
          </p>
        </>
      ),
      close: "Zamknij",
    },
  };

  return (
    <main className="flex flex-col min-h-screen text-[#b0b0b0] font-russo bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
      <header className="fixed top-0 left-0 right-0 z-20 flex justify-end p-4 bg-[#1a1a1a] border-b border-[#3a1c1c]">
        <div className="flex space-x-4">
          <button
            onClick={() => setLanguage("en")}
            className={`p-2 rounded-full flex items-center space-x-1 ${
              language === "en" ? "bg-[#3a1c1c]" : "bg-[#2a2a2a]"
            } hover:bg-[#5a2e2e] transition duration-300 skull-text`}
            aria-label="Switch to English"
          >
            <FiFlag size={20} className="text-[#d0d0d0]" />
            <span className="text-sm text-[#d0d0d0] font-unbounded">EN</span>
          </button>
          <button
            onClick={() => setLanguage("pl")}
            className={`p-2 rounded-full flex items-center space-x-1 ${
              language === "pl" ? "bg-[#3a1c1c]" : "bg-[#2a2a2a]"
            } hover:bg-[#5a2e2e] transition duration-300 skull-text`}
            aria-label="Przełącz na polski"
          >
            <FiFlag size={20} className="text-[#d0d0d0]" />
            <span className="text-sm text-[#d0d0d0] font-unbounded">PL</span>
          </button>
        </div>
      </header>
      <section
        className="h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/stronghold_hero.jpg')" }}
      >
        <div className="text-center max-w-4xl px-4 z-10">
          <motion.img
            src="/images/logo.png"
            alt="Stronghold Logo"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto mb-6 max-w-[200px] md:max-w-[300px]"
          />
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-bold mb-6 text-[#d0d0d0] skull-text font-unbounded uppercase tracking-widest"
            style={{ textShadow: "0 0 5px rgba(138, 74, 74, 0.3)" }}
          >
            {translations[language].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl mb-8 text-[#b0b0b0]"
          >
            {translations[language].subtitle}
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            onClick={handleModalOpen}
            className="mt-8 bg-gradient-to-r from-[#3a1c1c] to-[#1a1a1a] hover:from-[#5a2e2e] hover:to-[#2a2a2a] text-[#d0d0d0] px-8 py-4 rounded-lg shadow-metal transition duration-300 font-unbounded uppercase tracking-widest"
          >
            {translations[language].readMore}
          </motion.button>
        </div>
        <div className="section-overlay absolute inset-0 bg-black bg-opacity-60"></div>
      </section>

      <footer className="py-8 flex justify-center space-x-8">
        <a
          href="https://x.com/Stronghold_pl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8a4a4a] hover:text-[#d0d0d0] transition duration-300"
          aria-label={language === "en" ? "Follow Stronghold on X" : "Śledź Twierdzę na X"}
        >
          <FaTwitter size={32} />
        </a>
        <a
          href="https://discord.gg/fPvCfNUy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8a4a4a] hover:text-[#d0d0d0] transition duration-300"
          aria-label={language === "en" ? "Join Stronghold on Discord" : "Dołącz do Twierdzy na Discordzie"}
        >
          <FaDiscord size={32} />
        </a>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={handleModalClose}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] p-6 sm:p-8 rounded-lg shadow-metal max-w-3xl w-full max-h-[80vh] overflow-y-auto border border-[#3a1c1c] relative scrollbar-thin scrollbar-thumb-[#8a4a4a] scrollbar-track-[#1a1a1a] animate-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 text-[#d0d0d0] hover:text-[#8a4a4a] transition duration-300"
                aria-label={language === "en" ? "Close modal" : "Zamknij okno"}
              >
                <FaTimes size={24} />
              </button>
              <h2
                id="modal-title"
                className="text-3xl font-bold mb-6 text-[#d0d0d0] skull-text font-unbounded uppercase tracking-wide"
                style={{ textShadow: "0 0 5px rgba(138, 74, 74, 0.3)" }}
              >
                {translations[language].aboutTitle}
              </h2>
              {translations[language].aboutText}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleModalClose}
                  className="bg-gradient-to-r from-[#3a1c1c] to-[#1a1a1a] hover:from-[#5a2e2e] hover:to-[#2a2a2a] text-[#d0d0d0] px-6 py-3 rounded-lg shadow-metal transition duration-300 font-unbounded uppercase tracking-widest"
                >
                  {translations[language].close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(138, 74, 74, 0.3);
            text-shadow: 0 0 10px rgba(138, 74, 74, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(138, 74, 74, 0.5);
            text-shadow: 0 0 20px rgba(138, 74, 74, 0.5);
          }
        }
        .section-overlay {
          pointer-events: none;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-[#8a4a4a] {
          scrollbar-color: #8a4a4a #1a1a1a;
        }
        .skull-text:hover {
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
        }
      `}</style>
    </main>
  );
}