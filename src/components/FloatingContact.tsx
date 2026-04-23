import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare } from 'lucide-react';

const FloatingContact = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* Zalo Button */}
      <motion.a
        href="https://zalo.me/0888998181"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-[#0068ff] rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 group relative"
      >
        <img 
          src="/assets/icons/zalo-white.png" 
          alt="Zalo" 
          className="w-8 h-8" 
          onError={(e) => { e.currentTarget.style.display = 'none'; }} 
        />
        <span className="text-white font-bold group-hover:block hidden absolute right-full mr-4 bg-black/80 px-4 py-2 rounded-xl text-xs whitespace-nowrap">
          Chat Zalo
        </span>
        <MessageSquare className="text-white w-6 h-6 absolute pointer-events-none opacity-0 group-hover:opacity-0" id="zalo-fallback-icon" />
      </motion.a>

      {/* Hotline Button */}
      <motion.a
        href="tel:0888998181"
        initial={{ opacity: 0, scale: 0.5, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-accent-400 rounded-full flex items-center justify-center shadow-2xl shadow-accent-400/40 group relative overflow-hidden"
      >
        <Phone className="text-brand-600 w-6 h-6 animate-pulse" />
        <span className="text-brand-600 font-bold group-hover:block hidden absolute right-full mr-4 bg-accent-400 px-4 py-2 rounded-xl text-xs whitespace-nowrap">
          0888 998 181
        </span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
      </motion.a>
    </div>
  );
};

export default FloatingContact;
