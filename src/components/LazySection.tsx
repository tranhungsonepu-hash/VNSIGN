import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ProgressBar } from './ProgressBar';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  showProgress?: boolean;
  progressLabel?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  className = "", 
  threshold = 0.1,
  rootMargin = "100px",
  once = true,
  showProgress = false,
  progressLabel = "Loading Section"
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin: rootMargin as any 
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isInView && showProgress) {
      const timer = setTimeout(() => setProgress(100), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, showProgress]);

  return (
    <div ref={ref} className={className}>
      {showProgress && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-4">
          <ProgressBar progress={progress} label={progressLabel} />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {isInView ? children : <div className="h-20" />}
      </motion.div>
    </div>
  );
};
