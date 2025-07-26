"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCoins, FaWallet, FaCheckCircle, FaSpinner, FaEthereum, 
  FaBolt, FaShieldAlt, FaTimes, FaFire, FaMusic
} from 'react-icons/fa';
import { 
  GiThorHammer, GiSkullCrossedBones, GiFlame, GiDragonHead,
  GiVikingHelmet, GiGothicCross
} from 'react-icons/gi';

interface PaymentModalProps {
  track: any;
  onSuccess: () => void;
  onClose: () => void;
}

export default function PaymentModal({ track, onSuccess, onClose }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Enhanced payment simulation with steps
    const steps = [
      'Connecting to Optimism network...',
      'Validating smart contract...',
      'Processing micropayment...',
      'Distributing to artist...',
      'Confirming transaction...'
    ];
    
    for (let i = 1; i <= steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    setIsProcessing(false);
    setPaymentComplete(true);
    
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const usdPrice = (track.pricePerPlay * 2400).toFixed(2); // ETH to USD conversion
  const artistShare = track.pricePerPlay * 0.8;
  const platformFee = track.pricePerPlay * 0.2;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-600 max-w-lg w-full rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm"
      >
        {paymentComplete ? (
          // Success State
          <div className="text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="relative mb-6"
            >
              <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-600">
                <FaCheckCircle className="text-4xl text-green-400" />
              </div>
              <div className="absolute inset-0 bg-green-600/20 rounded-full animate-ping opacity-30"></div>
            </motion.div>

            <h3 className="text-2xl font-black text-green-400 mb-3 uppercase tracking-wide">
              Payment Complete!
            </h3>
            <p className="text-gray-300 mb-4 text-lg">
              🎵 Enjoy the underground sounds and support the artist! 🤘
            </p>
            
            <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4 mb-6">
              <div className="text-sm text-green-300">
                <div className="flex justify-between mb-2">
                  <span>Artist received:</span>
                  <span className="font-bold">{artistShare.toFixed(4)} ETH</span>
                </div>
                <div className="text-xs text-gray-400">
                  Transaction confirmed on Optimism network
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Stream will begin automatically...
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-b-2 border-yellow-600/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <GiThorHammer className="text-3xl text-yellow-400" />
                    <div className="absolute inset-0 text-3xl text-yellow-300 animate-pulse opacity-30">
                      <GiThorHammer />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-wide">
                      STREAM PAYMENT
                    </h3>
                    <p className="text-xs text-yellow-400 font-bold">SUPPORT THE UNDERGROUND</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Enhanced Track Info */}
              <div className="bg-gray-900/50 border-2 border-gray-700 rounded-lg p-4 mb-6">
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={track.coverUrl}
                      alt={track.album}
                      className="w-16 h-16 object-cover rounded border-2 border-gray-600"
                      style={{ filter: "grayscale(0.8) contrast(1.1) brightness(0.9)" }}
                    />
                    {track.isDemo && (
                      <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1 py-0.5 rounded font-bold">
                        DEMO
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-white text-lg">{track.title}</h4>
                    <p className="text-gray-400 font-bold">{track.artist}</p>
                    <p className="text-gray-500 text-sm">{track.album} • {track.year}</p>
                    {track.genre && (
                      <p className="text-xs text-blue-400 mt-1">{track.genre}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Payment Breakdown */}
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-2 border-yellow-600/50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-black text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                  <FaCoins className="text-yellow-400" />
                  Payment Breakdown
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                    <span className="text-gray-300 flex items-center gap-2">
                      <FaMusic className="text-blue-400" />
                      Stream Price:
                    </span>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">{track.pricePerPlay} ETH</div>
                      <div className="text-xs text-gray-500">${usdPrice} USD</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-600/10 border border-green-600/30 rounded">
                    <span className="text-gray-300 flex items-center gap-2">
                      <GiVikingHelmet className="text-green-400" />
                      Artist Gets (80%):
                    </span>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{artistShare.toFixed(4)} ETH</div>
                      <div className="text-xs text-gray-500">${(artistShare * 2400).toFixed(2)} USD</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                    <span className="text-gray-300 flex items-center gap-2">
                      <GiFlame className="text-orange-400" />
                      Platform Fee (20%):
                    </span>
                    <div className="text-right">
                      <div className="text-gray-500 font-bold">{platformFee.toFixed(4)} ETH</div>
                      <div className="text-xs text-gray-600">${(platformFee * 2400).toFixed(2)} USD</div>
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-yellow-600/50 pt-3 flex justify-between items-center">
                    <span className="text-white font-bold text-lg flex items-center gap-2">
                      <FaEthereum className="text-blue-400" />
                      Total Payment:
                    </span>
                    <div className="text-right">
                      <div className="text-yellow-400 font-black text-xl">{track.pricePerPlay} ETH</div>
                      <div className="text-sm text-gray-400">${usdPrice} USD</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Processing State */}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FaSpinner className="text-blue-400 animate-spin text-xl" />
                    <span className="text-blue-300 font-bold">Processing Payment...</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">
                      Step {currentStep}/5: {
                        [
                          'Connecting to Optimism network...',
                          'Validating smart contract...',
                          'Processing micropayment...',
                          'Distributing to artist...',
                          'Confirming transaction...'
                        ][currentStep - 1]
                      }
                    </div>
                    
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div 
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(currentStep / 5) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Info */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <FaShieldAlt className="text-green-400" />
                  <span className="text-green-400 font-bold text-sm">SECURE PAYMENT</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <FaEthereum className="text-blue-400" />
                    <span className="text-gray-400">Optimism Network</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBolt className="text-yellow-400" />
                    <span className="text-gray-400">Instant Transfer</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GiSkullCrossedBones className="text-red-400" />
                    <span className="text-gray-400">Smart Contract</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GiGothicCross className="text-purple-400" />
                    <span className="text-gray-400">Underground Secured</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="flex-1 bg-transparent border-2 border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 hover:text-white py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 disabled:from-gray-600 disabled:to-gray-700 text-black py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 rounded-lg shadow-lg hover:shadow-yellow-600/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <FaWallet />
                      PAY & UNLEASH
                      <GiDragonHead className="text-lg" />
                    </>
                  )}
                </button>
              </div>

              {/* Network Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                  <FaEthereum className="text-blue-400" />
                  Secured by Optimism Network • Ultra-low fees
                  <FaBolt className="text-yellow-400" />
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
