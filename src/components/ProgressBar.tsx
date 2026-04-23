import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: string;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  className = "", 
  color = "bg-brand-600",
  label
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest leading-none">{label}</span>
          <span className="text-xs font-bold text-brand-600">{progress}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-brand-100/50 rounded-full overflow-hidden relative shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className={`h-full ${color} relative shadow-[0_0_10px_rgba(var(--brand-600-rgb),0.5)]`}
        >
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
          />
        </motion.div>
      </div>
    </div>
  );
};
