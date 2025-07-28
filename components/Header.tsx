'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { 
  GiCrossedSwords, 
  GiThorHammer,
  GiFlame,
  GiDragonHead,
  GiSkullCrossedBones,
  GiVikingHelmet
} from 'react-icons/gi'
import { 
  FaSearch,
  FaWallet,
  FaBars,
  FaTimes,
  FaUsers,
  FaMusic,
  FaNewspaper,
  FaUser,
  FaStore,
  FaTrophy,
  FaEthereum,
  FaBolt,
  FaSkullCrossbones
} from 'react-icons/fa'

interface HeaderProps {
  activeLink?: string;
  language?: "en" | "pl";
  setLanguage?: (lang: "en" | "pl") => void;
  openManifestModal?: () => void;
  zineMode?: boolean; // Nowy parametr dla trybu Zine
}

const Header = ({ 
  activeLink, 
  language = "en", 
  setLanguage, 
  openManifestModal,
  zineMode = false 
}: HeaderProps) => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  
  const { open } = useAppKit()
  const { isConnected, address } = useAppKitAccount()

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Navigation items
  const navigationItems = zineMode ? [
    { name: 'STRONGHOLD ZINE', shortName: 'ZINE', icon: FaNewspaper, href: '/zine' },
    { name: 'METAL FORGE', shortName: 'FORGE', icon: GiThorHammer, href: '/' },
    { name: 'DEMO VAULT', shortName: 'VAULT', icon: FaMusic, href: '/player' },
    { name: 'MARKETPLACE', shortName: 'MARKET', icon: FaStore, href: '/marketplace' },
    { name: 'BROTHERHOOD', shortName: 'COMMUNITY', icon: FaUsers, href: '/community' },
    { name: 'MY PROFILE', shortName: 'PROFILE', icon: FaUser, href: '/profile' },
  ] : [
    { name: 'LEGION DATABASE', shortName: 'LEGIONS', icon: GiCrossedSwords, href: '/bands' },
    { name: 'DEMO VAULT', shortName: 'VAULT', icon: FaMusic, href: '/player' },
    { name: 'MARKETPLACE', shortName: 'MARKET', icon: FaStore, href: '/marketplace' },
    { name: 'NFT FORGE', shortName: 'FORGE', icon: GiThorHammer, href: '/nft' },
    { name: 'BROTHERHOOD', shortName: 'COMMUNITY', icon: FaUsers, href: '/community' },
    { name: 'MY FORGE', shortName: 'PROFILE', icon: FaUser, href: '/profile' },
  ]

  const subNavItems = zineMode ? [
    { name: 'Latest Articles', href: '/zine' },
    { name: 'Interviews', href: '/zine?filter=interview' },
    { name: 'Reviews', href: '/zine?filter=review' },
    { name: 'History', href: '/zine?filter=history' },
    { name: 'User Contributions', href: '/zine?filter=user' },
  ] : [
    { name: 'War Chronicles', href: '/news' },
    { name: 'Metal Map', href: '/map' },
    { name: 'Hall of Fame', href: '/hall-of-fame' },
    { name: 'Underground Events', href: '/events' },
    { name: 'About Manifesto', href: '/about' },
  ]

  const isActiveLink = (href: string) => {
    if (activeLink) {
      return activeLink === href.replace('/', '')
    }
    return pathname === href
  }

  const WalletButton = () => {
    if (isConnected) {
      return (
        <div className="flex items-center gap-2">
          <div className="hidden xl:flex flex-col items-end">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-800 rounded-none animate-pulse"></div>
              <span className="text-xs text-red-800 uppercase font-bold font-zine-body">Connected</span>
            </div>
            <span className="text-xs text-black font-zine-body">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href="/profile"
              className="skull-button text-[#d0d0d0] px-2 lg:px-4 py-2 text-xs font-bold uppercase transition-all duration-300 shadow-metal hover:scale-105 whitespace-nowrap rounded-none font-zine-body"
            >
              <FaUser className="inline mr-1" />
              <span className="hidden lg:inline">MY</span> {zineMode ? 'PROFILE' : 'FORGE'}
            </Link>
            
            <button 
              onClick={() => open({ view: 'Account' })}
              className="bg-black border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-2 lg:px-3 py-2 text-xs font-bold uppercase transition-all duration-300 hover:scale-105 rounded-none font-zine-body"
              title="Wallet Settings"
            >
              <FaWallet />
            </button>
          </div>
        </div>
      )
    }

    return (
      <button 
        onClick={() => open()}
        className="skull-button text-[#d0d0d0] px-4 lg:px-6 py-2 text-xs lg:text-sm font-bold uppercase transition-all duration-300 shadow-metal hover:scale-105 whitespace-nowrap rounded-none font-zine-body"
      >
        <FaWallet className="inline mr-1 lg:mr-2" />
        <span className="hidden lg:inline">CONNECT </span>WALLET
      </button>
    )
  }

  return (
    <header 
      className="bg-[#f5f5e8] border-b-4 border-black sticky top-0 z-50 shadow-metal zine-header"
      style={{
        backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(245, 245, 232, 0.95)"
      }}
    >
      {/* Top Info Bar w stylu Zine */}
      <div className="bg-black border-b-2 border-red-800 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="hidden sm:flex text-red-800 items-center gap-6 font-zine-body">
              <span className="flex items-center gap-2">
                <FaSkullCrossbones className="text-red-800 animate-pulse" />
                <span>{zineMode ? 'Zine:' : 'Live:'} <span className="text-white font-bold">{zineMode ? '47' : '2,847'}</span> {zineMode ? 'Articles' : 'Bands'}</span>
              </span>
              <span className="hidden md:flex items-center gap-2">
                <FaMusic className="text-red-800" />
                <span><span className="text-white font-bold">{zineMode ? '23' : '15,392'}</span> {zineMode ? 'Contributors' : 'Demos'}</span>
              </span>
              <span className="hidden lg:flex items-center gap-2">
                <FaUsers className="text-red-800" />
                <span><span className="text-white font-bold">{zineMode ? '156' : '8,921'}</span> {zineMode ? 'Readers' : 'Users'}</span>
              </span>
              {isConnected && (
                <span className="text-red-800 flex items-center gap-2 bg-red-800/20 px-3 py-1 rounded-none">
                  <div className="w-1.5 h-1.5 bg-red-800 rounded-none animate-pulse"></div>
                  <span>Connected to {zineMode ? 'Underground' : 'Optimism'}</span>
                </span>
              )}
            </div>
            
            <div className="sm:hidden text-red-800 flex items-center gap-2 text-xs font-zine-body">
              <FaSkullCrossbones className="text-red-800" />
              <span><span className="text-white font-bold">{zineMode ? '47' : '2,847'}</span> {zineMode ? 'Articles' : 'Bands'} • <span className="text-white font-bold">{zineMode ? '156' : '15K'}</span> {zineMode ? 'Readers' : 'Demos'}</span>
              {isConnected && (
                <span className="text-red-800">• Online</span>
              )}
            </div>

            <div className="text-red-800 flex items-center gap-1 text-xs font-zine-body">
              <FaBolt className="text-red-800 animate-pulse" />
              <span className="hidden sm:inline">{zineMode ? 'Underground Spirit' : 'Powered by Optimism Blockchain'}</span>
              <span className="sm:hidden">{zineMode ? 'Underground' : 'Optimism Chain'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header w stylu Zine */}
      <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4 relative overflow-hidden">
        {/* Decorative skulls w tle */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="animate-pulse text-red-800 absolute top-4 right-4 text-xl">☠</div>
          <div className="animate-pulse text-black absolute top-8 left-8 text-lg">☠</div>
          <div className="animate-pulse text-red-800 absolute bottom-4 right-1/3 text-base">☠</div>
          {isConnected && (
            <div className="animate-pulse text-black absolute top-1/2 left-1/2 text-sm">☠</div>
          )}
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            {/* Logo Section w stylu Zine */}
            <div className="flex-shrink-0">
              <Link href={zineMode ? "/zine" : "/"} className="flex items-center gap-2 lg:gap-3 group">
                <div className={`relative transition-all duration-300 ${
                  glitchActive ? 'filter brightness-125 saturate-150' : ''
                } group-hover:scale-105`}>
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 rounded-none overflow-hidden border-2 border-black shadow-metal">
                    <Image
                      src={zineMode ? "/images/stronghold_logo.jpg" : "/logometalforge.jpg"}
                      alt={zineMode ? "Stronghold Zine Logo" : "Metal Forge Logo"}
                      fill
                      sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 64px"
                      className="object-cover filter grayscale contrast-200"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-800/20 to-transparent"></div>
                  </div>
                  {isConnected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-red-800 rounded-none border-2 border-black flex items-center justify-center">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-600 rounded-none animate-pulse"></div>
                    </div>
                  )}
                  {glitchActive && (
                    <div className="absolute inset-0 w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 rounded-none border-2 border-red-800 animate-ping opacity-30"></div>
                  )}
                </div>

                <div className="border-l-2 border-black pl-2 lg:pl-3">
                  <h1 className={`text-base lg:text-xl xl:text-2xl font-bold tracking-wider text-black drop-shadow-lg leading-tight group-hover:text-red-800 transition-colors font-zine-title ${
                    glitchActive ? 'animate-pulse text-red-800' : ''
                  }`}>
                    {zineMode ? 'STRONGHOLD ZINE' : 'METAL FORGE'}
                  </h1>
                  <p className="text-xs text-black uppercase tracking-widest font-bold leading-tight mt-1 font-zine-body">
                    <span className="hidden lg:inline">{zineMode ? 'Voice of the Underground' : 'Underground • Eternal • Web3'}</span>
                    <span className="lg:hidden">{zineMode ? 'Underground Voice' : 'Underground'}</span>
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation w stylu Zine */}
            <nav className="hidden lg:flex flex-1 justify-center max-w-3xl mx-8">
              <div className="flex items-center gap-3 xl:gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 transition-all duration-300 group hover:transform hover:scale-110 px-2 xl:px-3 py-2 rounded-none border-2 border-transparent hover:border-red-800 hover:bg-red-800/10 ${
                      isActiveLink(item.href) 
                        ? 'text-red-800 bg-red-800/20 border-red-800' 
                        : 'text-black hover:text-red-800'
                    } ${item.shortName === 'PROFILE' && isConnected ? 'text-red-800 bg-red-800/10 border-red-800' : ''}`}
                  >
                    <item.icon className={`text-base xl:text-lg group-hover:scale-110 transition-transform duration-300 ${
                      isActiveLink(item.href) ? 'text-red-800' : ''
                    } ${item.shortName === 'PROFILE' && isConnected ? 'text-red-800' : ''}`} />
                    <span className="text-xs font-bold uppercase tracking-wider font-zine-body">
                      {item.shortName}
                    </span>
                    {isActiveLink(item.href) && (
                      <div className="w-1 h-1 bg-red-800 rounded-none animate-pulse"></div>
                    )}
                    {item.shortName === 'PROFILE' && isConnected && !isActiveLink(item.href) && (
                      <div className="w-1 h-1 bg-red-800 rounded-none animate-pulse"></div>
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 lg:gap-3 flex-shrink-0">
              {/* Language Toggle dla Zine */}
              {zineMode && setLanguage && (
                <div className="hidden lg:flex gap-1 mr-2">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-2 py-1 text-xs font-bold uppercase transition-all duration-300 ${
                      language === "en" 
                        ? 'bg-red-800 text-white' 
                        : 'text-black hover:text-red-800'
                    }`}
                  >
                    EN
                  </button>
                  <span className="text-black">|</span>
                  <button
                    onClick={() => setLanguage("pl")}
                    className={`px-2 py-1 text-xs font-bold uppercase transition-all duration-300 ${
                      language === "pl" 
                        ? 'bg-red-800 text-white' 
                        : 'text-black hover:text-red-800'
                    }`}
                  >
                    PL
                  </button>
                </div>
              )}
              
              <WalletButton />

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-black hover:text-red-800 transition-all duration-300 hover:scale-110 rounded-none border-2 border-transparent hover:border-red-800 hover:bg-red-800/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Search Bar w stylu Zine */}
          <div className="hidden md:block">
            <div className="flex items-center bg-[#e0e0d8] backdrop-blur-sm rounded-none border-2 border-black px-4 py-3 hover:border-red-800 transition-all duration-300 shadow-metal zine-card">
              <FaSearch className="text-black text-lg mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder={zineMode 
                  ? "Search articles, authors, topics in the zine..." 
                  : "Search bands, genres, labels, demos in the underground..."
                } 
                className="bg-transparent text-black placeholder-black outline-none flex-1 text-sm font-medium font-zine-body"
              />
              <div className="hidden lg:flex items-center gap-2 ml-4 text-xs text-black font-zine-body">
                <span className="px-2 py-1 bg-black text-white rounded-none border border-black">Ctrl</span>
                <span>+</span>
                <span className="px-2 py-1 bg-black text-white rounded-none border border-black">K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation w stylu Zine */}
      <div className="bg-black border-t-2 border-red-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="border-t-2 border-b-2 border-red-800 py-2">
            <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm uppercase tracking-widest flex-wrap font-zine-body">
              {subNavItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <Link 
                    href={item.href} 
                    className={`transition-all duration-300 hover:scale-105 px-2 py-1 rounded-none ${
                      isActiveLink(item.href) 
                        ? 'text-red-800 font-bold bg-red-800/20' 
                        : 'text-red-800 hover:text-white hover:bg-red-800/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {index < subNavItems.length - 1 && (
                    <span className="text-red-800">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu w stylu Zine */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden bg-[#f5f5e8] border-t-2 border-black absolute w-full z-40 shadow-metal backdrop-blur-md zine-card"
          style={{
            backgroundImage: "url('/images/zine/paper_texture_distressed.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(245, 245, 232, 0.98)"
          }}
        >
          <nav className="flex flex-col px-4 py-4">
            {/* Mobile Search w stylu Zine */}
            <div className="mb-4 p-4 bg-[#e0e0d8] rounded-none border-2 border-black shadow-metal zine-card">
              <div className="flex items-center">
                <FaSearch className="text-black text-lg mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder={zineMode ? "Search the zine..." : "Search the underground..."} 
                  className="bg-transparent text-black placeholder-black outline-none flex-1 text-sm font-medium font-zine-body"
                />
              </div>
            </div>

            {/* Language Toggle Mobile dla Zine */}
            {zineMode && setLanguage && (
              <div className="mb-4 flex justify-center gap-4">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-2 text-sm font-bold uppercase transition-all duration-300 border-2 ${
                    language === "en" 
                      ? 'bg-red-800 text-white border-red-800' 
                      : 'text-black border-black hover:text-red-800 hover:border-red-800'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("pl")}
                  className={`px-4 py-2 text-sm font-bold uppercase transition-all duration-300 border-2 ${
                    language === "pl" 
                      ? 'bg-red-800 text-white border-red-800' 
                      : 'text-black border-black hover:text-red-800 hover:border-red-800'
                  }`}
                >
                  Polski
                </button>
              </div>
            )}

            {isConnected && (
              <div className="flex items-center gap-3 py-3 mb-4 border-b-2 border-black bg-red-800/20 rounded-none px-3 zine-card">
                <div className="w-8 h-8 rounded-none bg-red-800 flex items-center justify-center">
                  <FaWallet className="text-white text-xs" />
                </div>
                <div>
                  <span className="text-red-800 font-bold text-sm font-zine-body">Connected to {zineMode ? 'Underground' : 'Optimism'}</span>
                  <p className="text-xs text-black font-zine-body">
                    {address?.slice(0, 10)}...{address?.slice(-6)}
                  </p>
                </div>
              </div>
            )}
            
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 py-4 transition-all duration-300 font-bold uppercase tracking-wider border-b-2 border-black last:border-b-0 rounded-none px-3 hover:transform hover:translateX-2 hover:bg-red-800/20 font-zine-body ${
                  isActiveLink(item.href)
                    ? 'text-red-800 bg-red-800/20 border-l-4 border-l-red-800'
                    : 'text-black hover:text-red-800'
                } ${item.shortName === 'PROFILE' && isConnected ? 'bg-red-800/20 border-l-4 border-l-red-800' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className={`text-xl flex-shrink-0 ${
                  item.shortName === 'PROFILE' && isConnected ? 'text-red-800' : ''
                }`} />
                <span>{item.name}</span>
                {isActiveLink(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-red-800 rounded-none animate-pulse"></div>
                )}
                {item.shortName === 'PROFILE' && isConnected && !isActiveLink(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-red-800 rounded-none animate-pulse"></div>
                )}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t-2 border-black">
              <p className="text-xs text-black uppercase tracking-wider mb-3 px-2 font-bold flex items-center gap-1 font-zine-body">
                <FaSkullCrossbones className="text-red-800" />
                {zineMode ? 'Zine Sections' : 'Underground Links'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {subNavItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className={`text-xs transition-all duration-300 py-3 px-3 rounded-none border-2 border-black hover:border-red-800 hover:transform hover:scale-105 text-center font-zine-body ${
                      isActiveLink(item.href)
                        ? 'text-red-800 bg-red-800/20 border-red-800 font-bold'
                        : 'text-black hover:text-red-800 hover:bg-red-800/20'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t-2 border-black">
              {isConnected ? (
                <div className="flex gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-[#d0d0d0] skull-button rounded-none font-bold uppercase tracking-wider transition-all duration-300 hover:transform hover:scale-105 shadow-metal font-zine-body"
                  >
                    <FaUser />
                    <span className="text-sm">My {zineMode ? 'Profile' : 'Forge'}</span>
                  </Link>
                  <button 
                    onClick={() => {
                      open({ view: 'Account' })
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-red-800 bg-black border-2 border-red-800 hover:bg-red-800 hover:text-white rounded-none transition-all duration-300 hover:transform hover:scale-105 shadow-metal font-zine-body"
                  >
                    <FaWallet />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    open()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 text-[#d0d0d0] skull-button rounded-none font-bold uppercase tracking-wider transition-all duration-300 hover:transform hover:scale-105 shadow-metal font-zine-body"
                >
                  <FaWallet />
                  <span className="text-sm">Connect Wallet</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}

      <style jsx>{`
        .zine-header {
          border-image: url("/images/zine/jagged_border.png") 30 round;
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
    </header>
  )
}

export default Header
