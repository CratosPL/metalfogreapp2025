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
  FaBolt
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
      setTimeout(() => setGlitchActive(false), 300)
    }, 6000) // Zsynchronizowane z główną stroną
    return () => clearInterval(interval)
  }, [])

  // UPDATED NAVIGATION - więcej metalowych nazw
  const navigationItems = [
    { name: 'LEGION DATABASE', shortName: 'LEGIONS', icon: GiCrossedSwords, href: '/bands' },
    { name: 'DEMO VAULT', shortName: 'VAULT', icon: FaMusic, href: '/player' },
    { name: 'MARKETPLACE', shortName: 'MARKET', icon: FaStore, href: '/marketplace' },
    { name: 'NFT FORGE', shortName: 'FORGE', icon: GiThorHammer, href: '/nft' },
    { name: 'BROTHERHOOD', shortName: 'COMMUNITY', icon: FaUsers, href: '/community' },
    { name: 'MY FORGE', shortName: 'PROFILE', icon: FaUser, href: '/profile' },
  ]

  const subNavItems = [
    { name: 'War Chronicles', href: '/news' },
    { name: 'Metal Map', href: '/map' },
    { name: 'Hall of Fame', href: '/hall-of-fame' },
    { name: 'Underground Events', href: '/events' },
    { name: 'About Manifesto', href: '/about' },
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
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-2 lg:px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-300 border border-blue-500 shadow-lg hover:shadow-blue-500/50 hover:scale-105 whitespace-nowrap rounded-lg"
            >
              <FaUser className="inline mr-1" />
              <span className="hidden lg:inline">MY</span> FORGE
            </Link>
            
            <button 
              onClick={() => open({ view: 'Account' })}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-2 lg:px-3 py-2 text-xs font-bold text-white uppercase transition-all duration-300 border border-green-500 shadow-lg hover:shadow-green-500/50 hover:scale-105 rounded-lg"
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
        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 lg:px-6 py-2 text-xs lg:text-sm font-bold text-white uppercase transition-all duration-300 border border-red-500 shadow-lg hover:shadow-red-500/50 hover:scale-105 whitespace-nowrap rounded-lg"
      >
        <FaWallet className="inline mr-1 lg:mr-2" />
        <span className="hidden lg:inline">CONNECT </span>WALLET
      </button>
    )
  }

  return (
    <header className="bg-black border-b-4 border-red-600 sticky top-0 z-50 shadow-2xl">
      {/* Enhanced Top Info Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="hidden sm:flex text-gray-400 items-center gap-6">
  <span className="flex items-center gap-2">
    <GiFlame className="text-red-500 animate-pulse" />
    <span>Live: <span className="text-white font-bold">2,847</span> Bands</span>
  </span>
  <span className="hidden md:flex items-center gap-2">
    <FaMusic className="text-blue-400" />
    <span><span className="text-white font-bold">15,392</span> Demos</span>
  </span>
  <span className="hidden lg:flex items-center gap-2">
    <FaUsers className="text-green-400" />
    <span><span className="text-white font-bold">8,921</span> Users</span>
  </span>
  {isConnected && (
    <span className="text-green-400 flex items-center gap-2 bg-green-400/10 px-3 py-1 rounded-full">
      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
      <span>Connected to Optimism</span>
    </span>
  )}
</div>


            
            <div className="sm:hidden text-gray-400 flex items-center gap-2 text-xs">
              <GiFlame className="text-red-500" />
              <span><span className="text-white font-bold">2,847</span> Bands • <span className="text-white font-bold">15K</span> Demos</span>
              {isConnected && (
                <span className="text-green-400">• Online</span>
              )}
            </div>

            <div className="text-red-400 flex items-center gap-1 text-xs">
              <FaBolt className="text-yellow-400 animate-pulse" />
              <span className="hidden sm:inline">Powered by Optimism Blockchain</span>
              <span className="sm:hidden">Optimism Chain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4 relative overflow-hidden">
        {/* Enhanced Background Runes */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div 
            className="animate-pulse text-red-300 absolute top-4 right-4 text-xl"
            style={{
              textShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
              animationDuration: '4s'
            }}
          >ᚦ</div>
          <div 
            className="animate-pulse text-blue-300 absolute top-8 left-8 text-lg"
            style={{
              textShadow: '0 0 8px rgba(59, 130, 246, 0.4)',
              animationDuration: '5s',
              animationDelay: '1s'
            }}
          >ᚱ</div>
          <div 
            className="animate-pulse text-yellow-300 absolute bottom-4 right-1/3 text-base"
            style={{
              textShadow: '0 0 6px rgba(253, 224, 71, 0.4)',
              animationDuration: '6s',
              animationDelay: '2s'
            }}
          >ᚢ</div>
          {isConnected && (
            <div 
              className="animate-pulse text-green-300 absolute top-1/2 left-1/2 text-sm"
              style={{
                textShadow: '0 0 4px rgba(34, 197, 94, 0.4)',
                animationDuration: '4.5s',
                animationDelay: '3s'
              }}
            >ᚠ</div>
          )}
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            {/* Enhanced Logo Section */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
                <div className={`relative transition-all duration-300 ${
                  glitchActive ? 'filter brightness-125 saturate-150 drop-shadow-lg' : ''
                } group-hover:scale-105`}>
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 rounded-full overflow-hidden border-2 border-red-600 shadow-lg">
                    <Image
                      src="/logometalforge.jpg"
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
                  {glitchActive && (
                    <div className="absolute inset-0 w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 rounded-full border-2 border-red-400 animate-ping opacity-30"></div>
                  )}
                </div>

                <div className="border-l-2 border-red-600 pl-2 lg:pl-3">
                  <h1 className={`text-base lg:text-xl xl:text-2xl font-black tracking-wider text-white drop-shadow-lg leading-tight group-hover:text-red-100 transition-colors ${
                    glitchActive ? 'animate-pulse text-red-100' : ''
                  }`}>
                    METAL FORGE
                  </h1>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold leading-tight mt-1">
                    <span className="hidden lg:inline">Underground • Eternal • Web3</span>
                    <span className="lg:hidden">Underground</span>
                  </p>
                </div>
              </Link>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center max-w-3xl mx-8">
              <div className="flex items-center gap-3 xl:gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 transition-all duration-300 group hover:transform hover:scale-110 px-2 xl:px-3 py-2 rounded-lg border border-transparent hover:border-red-600/50 hover:bg-red-600/10 ${
                      isActiveLink(item.href) 
                        ? 'text-red-500 bg-red-600/20 border-red-600/50' 
                        : 'text-gray-300 hover:text-red-400'
                    } ${item.shortName === 'PROFILE' && isConnected ? 'text-green-400 bg-green-600/10 border-green-600/50' : ''}`}
                  >
                    <item.icon className={`text-base xl:text-lg group-hover:scale-110 transition-transform duration-300 ${
                      isActiveLink(item.href) ? 'text-red-500' : ''
                    } ${item.shortName === 'PROFILE' && isConnected ? 'text-green-400' : ''}`} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {item.shortName}
                    </span>
                    {isActiveLink(item.href) && (
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                    {item.shortName === 'PROFILE' && isConnected && !isActiveLink(item.href) && (
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
                className="lg:hidden p-2 text-gray-300 hover:text-red-500 transition-all duration-300 hover:scale-110 rounded-lg border border-transparent hover:border-red-600 hover:bg-red-600/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:block">
            <div className="flex items-center bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-600 px-4 py-3 hover:border-red-500 transition-all duration-300 shadow-lg hover:shadow-red-600/20">
              <FaSearch className="text-gray-400 text-lg mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search bands, genres, labels, demos in the underground..." 
                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm font-medium"
              />
              <div className="hidden lg:flex items-center gap-2 ml-4 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-700 rounded border border-gray-600">Ctrl</span>
                <span>+</span>
                <span className="px-2 py-1 bg-gray-700 rounded border border-gray-600">K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Sub Navigation */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-t border-gray-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="border-t-2 border-b-2 border-gray-600 py-2">
            <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm uppercase tracking-widest flex-wrap">
              {subNavItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <Link 
                    href={item.href} 
                    className={`transition-all duration-300 hover:scale-105 px-2 py-1 rounded ${
                      isActiveLink(item.href) 
                        ? 'text-red-500 font-bold bg-red-600/20' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
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

      {/* Enhanced Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-gray-900 to-black border-t border-gray-700 absolute w-full z-40 shadow-2xl backdrop-blur-md">
          <nav className="flex flex-col px-4 py-4">
            {/* Enhanced Mobile Search */}
            <div className="mb-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-600 shadow-inner">
              <div className="flex items-center">
                <FaSearch className="text-gray-400 text-lg mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search the underground..." 
                  className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm font-medium"
                />
              </div>
            </div>

            {isConnected && (
              <div className="flex items-center gap-3 py-3 mb-4 border-b border-gray-800 bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-lg px-3">
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
                className={`flex items-center gap-3 py-4 transition-all duration-300 font-bold uppercase tracking-wider border-b border-gray-800 last:border-b-0 rounded-lg px-3 hover:transform hover:translateX-2 hover:bg-gray-800/50 ${
                  isActiveLink(item.href)
                    ? 'text-red-500 bg-red-600/20 border-l-4 border-l-red-500'
                    : 'text-gray-300 hover:text-red-500'
                } ${item.shortName === 'PROFILE' && isConnected ? 'bg-green-600/20 border-l-4 border-l-green-500' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className={`text-xl flex-shrink-0 ${
                  item.shortName === 'PROFILE' && isConnected ? 'text-green-400' : ''
                }`} />
                <span>{item.name}</span>
                {isActiveLink(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
                {item.shortName === 'PROFILE' && isConnected && !isActiveLink(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2 font-bold flex items-center gap-1">
                <GiSkullCrossedBones className="text-red-600" />
                Underground Links
              </p>
              <div className="grid grid-cols-2 gap-2">
                {subNavItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className={`text-xs transition-all duration-300 py-3 px-3 rounded-lg border border-gray-700 hover:border-red-600 hover:transform hover:scale-105 text-center ${
                      isActiveLink(item.href)
                        ? 'text-red-500 bg-red-600/20 border-red-600 font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
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
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
                  >
                    <FaUser />
                    <span className="text-sm">My Forge</span>
                  </Link>
                  <button 
                    onClick={() => {
                      open({ view: 'Account' })
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
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
                  className="w-full flex items-center justify-center gap-2 py-4 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
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
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}

export default Header
