import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoadingBarProps {
  isLoading: boolean;
}

const PageLoadingBar = ({ isLoading }: PageLoadingBarProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ width: 0, opacity: 1 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed top-0 left-0 h-1 bg-accent-400 z-[9999] shadow-[0_0_10px_#f9d423]"
        />
      )}
    </AnimatePresence>
  );
};

export default PageLoadingBar;
