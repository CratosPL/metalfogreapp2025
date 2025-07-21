'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { 
  GiCrossedSwords, 
  GiThorHammer,
  GiFlame
} from 'react-icons/gi'
import { 
  FaSearch,
  FaWallet,
  FaBars,
  FaTimes,
  FaUsers,
  FaMusic,
  FaNewspaper,
  FaUser
} from 'react-icons/fa'

const Header = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  
  const { open } = useAppKit()
  const { isConnected, address } = useAppKitAccount()

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const navigationItems = [
    { name: 'LEGIONS', icon: FaUsers, href: '/bands' },
    { name: 'VAULT', icon: FaMusic, href: '/player' },
    { name: 'PROFILE', icon: FaUser, href: '/profile' },
    { name: 'NEWS', icon: FaNewspaper, href: '/news' },
    { name: 'COMMUNITY', icon: GiCrossedSwords, href: '/community' },
    { name: 'NFT FORGE', icon: GiThorHammer, href: '/nft' },
  ]

  const subNavItems = [
    { name: 'Genres', href: '/genres' },
    { name: 'Labels', href: '/labels' },
    { name: 'Events', href: '/events' },
    { name: 'Merch', href: '/merch' },
    { name: 'About', href: '/about' },
  ]

  const isActiveLink = (href: string) => pathname === href

  const WalletButton = () => {
    if (isConnected) {
      return (
        <div className="flex items-center gap-2">
          <div className="hidden xl:flex flex-col items-end">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 uppercase font-bold">Connected</span>
            </div>
            <span className="text-xs text-white font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href="/profile"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-2 lg:px-3 py-2 text-xs font-bold text-white uppercase transition-all duration-200 border border-blue-500 shadow-lg hover:shadow-blue-500/50 whitespace-nowrap rounded"
            >
              <FaUser className="inline mr-1" />
              <span className="hidden lg:inline">MY</span> FORGE
            </Link>
            
            <button 
              onClick={() => open({ view: 'Account' })}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-2 lg:px-3 py-2 text-xs font-bold text-white uppercase transition-all duration-200 border border-green-500 shadow-lg hover:shadow-green-500/50 rounded"
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
        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-3 lg:px-6 py-2 text-xs lg:text-sm font-bold text-white uppercase transition-all duration-200 border border-red-500 shadow-lg hover:shadow-red-500/50 whitespace-nowrap rounded"
      >
        <FaWallet className="inline mr-1 lg:mr-2" />
        <span className="hidden lg:inline">CONNECT </span>WALLET
      </button>
    )
  }

  return (
    <header className="bg-black border-b-4 border-red-600 sticky top-0 z-50 shadow-2xl">
      {/* Top Info Bar */}
      <div className="bg-gray-900 border-b border-gray-700 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="hidden sm:flex text-gray-400 items-center gap-4">
              <span className="flex items-center gap-1">
                <GiFlame className="text-red-500" />
                Live: 2,847 Bands
              </span>
              <span className="hidden md:inline">15,392 Demos</span>
              <span className="hidden lg:inline">8,921 Users</span>
              {isConnected && (
                <span className="text-green-400 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  Connected to Optimism
                </span>
              )}
            </div>
            
            <div className="sm:hidden text-gray-400 flex items-center gap-2 text-xs">
              <GiFlame className="text-red-500" />
              <span>2,847 Bands • 15K Demos</span>
              {isConnected && (
                <span className="text-green-400">• Online</span>
              )}
            </div>

            <div className="text-red-400 flex items-center gap-1 text-xs">
              <span className="text-yellow-400">⚡</span>
              <span className="hidden sm:inline">Powered by Optimism Blockchain</span>
              <span className="sm:hidden">Optimism Chain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4 relative overflow-hidden">
        {/* Background Runes */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="animate-pulse text-red-300 absolute top-4 right-4 text-xl">ᚦ</div>
          <div className="animate-pulse text-blue-300 absolute top-8 left-8 text-lg animation-delay-2000">ᚱ</div>
          <div className="animate-pulse text-yellow-300 absolute bottom-4 right-1/3 text-base animation-delay-4000">ᚢ</div>
          {isConnected && (
            <div className="animate-pulse text-green-300 absolute top-1/2 left-1/2 text-sm animation-delay-1000">ᚠ</div>
          )}
        </div>

        {/* Header Container - Simplified Layout */}
        <div className="relative z-10">
          {/* Top Row: Logo + Desktop Nav + Actions */}
          <div className="flex items-center justify-between mb-3">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
                <div className={`relative transition-all duration-200 ${glitchActive ? 'filter brightness-125 saturate-150' : ''} group-hover:scale-105`}>
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 rounded-full overflow-hidden border-2 border-red-600 shadow-lg">
                    <Image
                      src="/logometalforge.jpeg"
                      alt="Metal Forge Logo"
                      fill
                      sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 64px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
                  </div>
                  {isConnected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-300 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                <div className="border-l-2 border-red-600 pl-2 lg:pl-3">
                  <h1 className="text-base lg:text-xl xl:text-2xl font-black tracking-wider text-white drop-shadow-lg leading-tight group-hover:text-red-100 transition-colors">
                    METAL FORGE
                  </h1>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold leading-tight mt-1">
                    <span className="hidden lg:inline">Underground • Eternal</span>
                    <span className="lg:hidden">Underground</span>
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex flex-1 justify-center max-w-2xl mx-8">
              <div className="flex items-center gap-4 xl:gap-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 transition-all duration-200 group hover:transform hover:scale-105 px-3 py-2 rounded ${
                      isActiveLink(item.href) 
                        ? 'text-red-500' 
                        : 'text-gray-300 hover:text-red-400'
                    } ${item.name === 'PROFILE' && isConnected ? 'text-green-400' : ''}`}
                  >
                    <item.icon className={`text-lg xl:text-xl group-hover:scale-110 transition-transform duration-200 ${
                      isActiveLink(item.href) ? 'text-red-500' : ''
                    } ${item.name === 'PROFILE' && isConnected ? 'text-green-400' : ''}`} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {item.name}
                    </span>
                    {isActiveLink(item.href) && (
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    )}
                    {item.name === 'PROFILE' && isConnected && !isActiveLink(item.href) && (
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 lg:gap-3 flex-shrink-0">
              <WalletButton />

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-gray-300 hover:text-red-500 transition-all duration-200 hover:scale-110 rounded"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Search Bar - Full Width */}
          <div className="hidden md:block">
            <div className="flex items-center bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-600 px-4 py-3 hover:border-red-500 transition-colors shadow-lg">
              <FaSearch className="text-gray-400 text-lg mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search bands, genres, labels, demos..." 
                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm font-medium"
              />
              <div className="hidden lg:flex items-center gap-2 ml-4 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-700 rounded border">Ctrl</span>
                <span>+</span>
                <span className="px-2 py-1 bg-gray-700 rounded border">K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-gray-800 border-t border-gray-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="border-t-2 border-b-2 border-gray-600 py-2">
            <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm uppercase tracking-widest flex-wrap">
              {subNavItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <Link 
                    href={item.href} 
                    className={`transition-all duration-200 hover:scale-105 ${
                      isActiveLink(item.href) 
                        ? 'text-red-500 font-bold' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {index < subNavItems.length - 1 && (
                    <span className="text-gray-600">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-700 absolute w-full z-40 shadow-2xl backdrop-blur-sm">
          <nav className="flex flex-col px-4 py-4">
            {/* Mobile Search - Enhanced */}
            <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-600 shadow-inner">
              <div className="flex items-center">
                <FaSearch className="text-gray-400 text-lg mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search bands, genres, labels, demos..." 
                  className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm font-medium"
                />
              </div>
            </div>

            {isConnected && (
              <div className="flex items-center gap-3 py-3 mb-4 border-b border-gray-800 bg-green-600/10 rounded px-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <FaWallet className="text-white text-xs" />
                </div>
                <div>
                  <span className="text-green-400 font-bold text-sm">Connected to Optimism</span>
                  <p className="text-xs text-gray-400 font-mono">
                    {address?.slice(0, 10)}...{address?.slice(-6)}
                  </p>
                </div>
              </div>
            )}
            
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 py-4 transition-all duration-200 font-bold uppercase tracking-wider border-b border-gray-800 last:border-b-0 rounded px-2 hover:transform hover:translateX-2 ${
                  isActiveLink(item.href)
                    ? 'text-red-500 bg-gray-800/50 border-l-4 border-l-red-500'
                    : 'text-gray-300 hover:text-red-500 hover:bg-gray-800/50'
                } ${item.name === 'PROFILE' && isConnected ? 'bg-green-600/10' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className={`text-xl flex-shrink-0 ${
                  item.name === 'PROFILE' && isConnected ? 'text-green-400' : ''
                }`} />
                <span>{item.name === 'VAULT' ? 'DEMO VAULT' : item.name}</span>
                {isActiveLink(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-red-500 rounded-full"></div>
                )}
                {item.name === 'PROFILE' && isConnected && !isActiveLink(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2 font-bold">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                {subNavItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className={`text-xs transition-all duration-200 py-2 px-2 rounded hover:transform hover:scale-105 ${
                      isActiveLink(item.href)
                        ? 'text-red-500 bg-gray-800/50 font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              {isConnected ? (
                <div className="flex gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded font-bold uppercase tracking-wider transition-all duration-200 hover:transform hover:scale-105"
                  >
                    <FaUser />
                    <span className="text-sm">My Forge</span>
                  </Link>
                  <button 
                    onClick={() => {
                      open({ view: 'Account' })
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded transition-all duration-200 hover:transform hover:scale-105"
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
                  className="w-full flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded font-bold uppercase tracking-wider transition-all duration-200 hover:transform hover:scale-105"
                >
                  <FaWallet />
                  <span className="text-sm">Connect Wallet</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}

export default Header
