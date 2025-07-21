'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { 
  GiDragonHead, 
  GiCrossedSwords, 
  GiThorHammer,
  GiDeathSkull,
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
  FaStore,
  FaCog,
  FaUser
} from 'react-icons/fa'

const Header = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  
  // Reown AppKit hooks
  const { open } = useAppKit()
  const { isConnected, address } = useAppKitAccount()

  // Efekt glitch co 5 sekund
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Zsynchronizowane ścieżki z główną aplikacją + Profile
  const navigationItems = [
    { name: 'LEGIONS', icon: FaUsers, href: '/bands' },
    { name: 'DEMO VAULT', icon: FaMusic, href: '/player' },
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

  // Enhanced Wallet/Login Button Component
  const WalletButton = () => {
    if (isConnected) {
      return (
        <div className="flex items-center gap-2">
          {/* Connection Status Indicator */}
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 uppercase tracking-wider font-bold">Online</span>
            </div>
            <span className="text-xs text-white font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
          
          {/* Profile/Account Button */}
          <div className="flex gap-2">
            <Link 
              href="/profile"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-3 py-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 border border-blue-500 shadow-lg hover:shadow-blue-500/50 whitespace-nowrap"
            >
              <FaUser className="inline mr-1" />
              <span className="hidden sm:inline">MY</span> FORGE
            </Link>
            
            <button 
              onClick={() => open({ view: 'Account' })}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-3 py-2 text-xs font-bold text-white uppercase tracking-wider transition-all duration-200 border border-green-500 shadow-lg hover:shadow-green-500/50"
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
        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-3 sm:px-6 py-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 border border-red-500 shadow-lg hover:shadow-red-500/50 whitespace-nowrap"
      >
        <FaWallet className="inline mr-1 sm:mr-2" />
        <span className="hidden sm:inline">CONNECT </span>WALLET
      </button>
    )
  }

  return (
    <header className="bg-black border-b-4 border-red-600 sticky top-0 z-50 shadow-2xl">
      {/* Top Info Bar */}
      <div className="bg-gray-900 border-b border-gray-700 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            {/* Left Stats */}
            <div className="hidden sm:flex text-gray-400 items-center gap-4">
              <span className="flex items-center gap-1">
                <GiFlame className="text-red-500" />
                Live: 2,847 Bands
              </span>
              <span className="hidden md:inline">15,392 Demos</span>
              <span className="hidden lg:inline">8,921 Users</span>
              {isConnected && (
                <span className="text-green-400 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Connected to Optimism
                </span>
              )}
            </div>
            
            {/* Mobile Stats */}
            <div className="sm:hidden text-gray-400 flex items-center gap-2 text-xs">
              <GiFlame className="text-red-500" />
              <span>2,847 Bands • 15K Demos</span>
              {isConnected && (
                <span className="text-green-400">• Online</span>
              )}
            </div>

            {/* Right Info */}
            <div className="text-red-400 flex items-center gap-1 text-xs">
              <span>⚡</span>
              <span className="hidden sm:inline">Powered by Optimism Blockchain</span>
              <span className="sm:hidden">Optimism Chain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 relative overflow-hidden">
        {/* Animated Background Runes */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="animate-pulse text-red-300 absolute top-4 right-4 text-2xl">ᚦ</div>
          <div className="animate-pulse text-blue-300 absolute top-8 left-8 text-xl animation-delay-2000">ᚱ</div>
          <div className="animate-pulse text-yellow-300 absolute bottom-4 right-1/3 text-lg animation-delay-4000">ᚢ</div>
          {isConnected && (
            <div className="animate-pulse text-green-300 absolute top-1/2 left-1/2 text-sm animation-delay-1000">ᚠ</div>
          )}
        </div>

        {/* Main Header Content */}
        <div className="flex items-center justify-between relative z-10">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 flex-shrink-0 group">
            <div className={`relative transition-all duration-200 ${glitchActive ? 'glitch filter brightness-125' : ''} group-hover:scale-105`}>
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-red-600 shadow-lg">
                <Image
                  src="/logometalforge.jpeg"
                  alt="Metal Forge Logo"
                  fill
                  sizes="(max-width: 640px) 48px, 64px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-1 -right-1 text-xs text-yellow-400">⚡</div>
              <div className="absolute -bottom-1 -left-1 text-xs text-blue-400">
                <GiDeathSkull />
              </div>
              {isConnected && (
                <div className="absolute -top-2 -left-2 text-xs text-green-400">🔥</div>
              )}
            </div>

            {/* Brand text */}
            <div className="border-l-2 border-red-600 pl-3 sm:pl-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider text-white drop-shadow-lg leading-tight group-hover:text-red-100 transition-colors">
                METAL FORGE
              </h1>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold leading-tight mt-1">
                <span className="hidden sm:inline">Underground • Uncompromising • Eternal</span>
                <span className="sm:hidden">Underground Metal</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-colors duration-200 group ${
                  isActiveLink(item.href) 
                    ? 'text-red-500' 
                    : 'text-gray-300 hover:text-red-500'
                } ${item.name === 'PROFILE' && isConnected ? 'animate-pulse' : ''}`}
              >
                <item.icon className={`text-xl group-hover:scale-110 transition-transform duration-200 ${
                  isActiveLink(item.href) ? 'text-red-500' : ''
                } ${item.name === 'PROFILE' && isConnected ? 'text-green-400' : ''}`} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {item.name}
                </span>
                {item.name === 'PROFILE' && isConnected && (
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Search Button */}
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 hidden sm:block">
              <FaSearch className="text-lg sm:text-xl" />
            </button>
            
            {/* Wallet Button Component */}
            <WalletButton />

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-300 hover:text-red-500 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
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
                    className={`transition-colors ${
                      isActiveLink(item.href) 
                        ? 'text-red-500' 
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
        <div className="lg:hidden bg-gray-900 border-t border-gray-700 absolute w-full z-40 shadow-2xl">
          <nav className="flex flex-col px-4 py-4">
            {/* Mobile Connection Status */}
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
            
            {/* Main Navigation */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 py-4 transition-all duration-200 font-bold uppercase tracking-wider border-b border-gray-800 last:border-b-0 rounded px-2 ${
                  isActiveLink(item.href)
                    ? 'text-red-500 bg-gray-800/50'
                    : 'text-gray-300 hover:text-red-500 hover:bg-gray-800/50'
                } ${item.name === 'PROFILE' && isConnected ? 'bg-green-600/10' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className={`text-xl flex-shrink-0 ${
                  item.name === 'PROFILE' && isConnected ? 'text-green-400' : ''
                }`} />
                <span>{item.name}</span>
                {item.name === 'PROFILE' && isConnected && (
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}

            {/* Sub Navigation for Mobile */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                {subNavItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className={`text-xs transition-colors py-2 px-2 ${
                      isActiveLink(item.href)
                        ? 'text-red-500'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Wallet Action */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              {isConnected ? (
                <div className="flex gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded font-bold uppercase tracking-wider"
                  >
                    <FaUser />
                    <span className="text-sm">My Forge</span>
                  </Link>
                  <button 
                    onClick={() => {
                      open({ view: 'Account' })
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white bg-green-600 hover:bg-green-700 rounded"
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
                  className="w-full flex items-center justify-center gap-2 py-3 text-white hover:text-red-500 transition-colors bg-red-600 hover:bg-red-700 rounded font-bold uppercase tracking-wider"
                >
                  <FaWallet />
                  <span className="text-sm">Connect Wallet</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
