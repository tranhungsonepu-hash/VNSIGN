import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'motion/react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fallbackImage?: string;
  className?: string;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({ 
  src, 
  fallbackImage, 
  className,
  ...props 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.load();
    }
  }, [isInView]);

  return (
    <div ref={ref} className={className}>
      {!isLoaded && fallbackImage && (
        <img 
          src={fallbackImage} 
          alt="Loading..." 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
      )}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoadedData={() => setIsLoaded(true)}
        preload="none"
        {...props}
      >
        {isInView && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
};
