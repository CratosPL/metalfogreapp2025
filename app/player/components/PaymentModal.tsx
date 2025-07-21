// src/app/player/components/PaymentModal.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCoins, FaWallet, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { GiThorHammer } from 'react-icons/gi';

interface PaymentModalProps {
  track: any;
  onSuccess: () => void;
  onClose: () => void;
}

export default function PaymentModal({ track, onSuccess, onClose }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111] border-2 border-[#333] max-w-md w-full p-6"
      >
        {paymentComplete ? (
          <div className="text-center">
            <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-400 mb-2 uppercase">Payment Complete!</h3>
            <p className="text-[#ccc] mb-4">Enjoy the music and support the artist!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <GiThorHammer className="text-3xl text-yellow-400" />
              <h3 className="text-xl font-bold text-[#e0e0e0] uppercase">Stream Payment</h3>
            </div>

            {/* TRACK INFO */}
            <div className="bg-[#0a0a0a] border border-[#333] p-4 mb-6">
              <div className="flex gap-3">
                <img
                  src={track.coverUrl}
                  alt={track.album}
                  className="w-16 h-16 object-cover grayscale contrast-125 brightness-90"
                  style={{ filter: "grayscale(1) contrast(1.25) brightness(0.9)" }}
                />
                <div>
                  <h4 className="font-bold text-[#e0e0e0]">{track.title}</h4>
                  <p className="text-[#999] text-sm">{track.artist}</p>
                  <p className="text-[#666] text-xs">{track.album}</p>
                </div>
              </div>
            </div>

            {/* PAYMENT BREAKDOWN */}
            <div className="bg-[#0a0a0a] border border-[#333] p-4 mb-6">
              <h4 className="text-sm font-bold text-[#ccc] mb-3 uppercase">Payment Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#999]">Stream Price:</span>
                  <span className="text-yellow-400">{track.pricePerPlay} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#999]">Artist Receives (80%):</span>
                  <span className="text-green-400">{(track.pricePerPlay * 0.8).toFixed(4)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#999]">Platform Fee (20%):</span>
                  <span className="text-[#666]">{(track.pricePerPlay * 0.2).toFixed(4)} ETH</span>
                </div>
                <div className="border-t border-[#333] pt-2 flex justify-between font-bold">
                  <span className="text-[#ccc]">Total:</span>
                  <span className="text-yellow-400">{track.pricePerPlay} ETH</span>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-transparent border-2 border-[#666] text-[#ccc] hover:bg-[#222] py-3 uppercase font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black py-3 uppercase font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <FaWallet /> Pay & Play
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-[#666] text-center mt-4">
              Secure payment via Optimism Network
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
