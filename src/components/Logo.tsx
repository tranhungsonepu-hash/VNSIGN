import React from 'react';
import { Monitor } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  variant?: 'default' | 'image';
  logoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  iconClassName, 
  textClassName,
  showText = true,
  variant = 'image',
  logoUrl = "/assets/logos/logo-vnsign-ngang.png"
}) => {
  const finalLogoUrl = logoUrl === "/assets/logos/vnsign trắng.png" ? "/assets/logos/vnsign-white.png" : logoUrl;
  return (
    <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
      {variant === 'image' ? (
        <img 
          src={finalLogoUrl} 
          alt="Vnsign Logo" 
          className={cn("h-10 w-auto object-contain", iconClassName)}
        />
      ) : (
        <div className={cn(
          "w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200 group-hover:scale-110 transition-transform duration-300",
          iconClassName
        )}>
          <Monitor className="text-white w-6 h-6" />
        </div>
      )}
      {showText && variant !== 'image' && (
        <span className={cn(
          "text-2xl font-extrabold tracking-tighter text-brand-950 font-display",
          textClassName
        )}>
          Vn<span className="text-brand-600">sign</span>
        </span>
      )}
    </div>
  );
};
