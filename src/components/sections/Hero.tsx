import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '../Logo';
import { useLanguage } from '../../contexts/LanguageContext';

export const Hero = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-40 pb-32 overflow-hidden bg-brand-600">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-400 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-8">
              <Logo showText={false} logoUrl="/assets/logos/vnsign-white.png" iconClassName="h-6" />
              <div className="h-6 w-px bg-white/20" />
              <span className="text-white/60 text-xs font-medium tracking-widest uppercase">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white mb-8">
              {t.hero.title} <br />
              <span className="text-accent-400">
                {t.hero.titleHighlight}
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-10 max-w-lg leading-relaxed font-medium">
              {t.hero.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-accent-400 text-brand-600 px-10 py-4 rounded-full text-lg font-black hover:bg-white hover:scale-105 transition-all shadow-xl shadow-accent-400/20 text-center"
              >
                {t.hero.ctaStart}
              </button>
            </div>

            {/* Tagline Pills */}
            <div className="flex flex-wrap gap-4 opacity-70">
              {[t.hero.tagline1, t.hero.tagline2, t.hero.tagline3, t.hero.tagline4].map((tag, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90 text-sm font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 aspect-square max-w-[500px] mx-auto group">
              {/* Glass frame */}
              <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-[40px] border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" />
              
              {/* Video container */}
              <div className="relative h-full w-full rounded-[32px] overflow-hidden shadow-2xl">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/assets/videos/vnsign-preview.mp4" type="video/mp4" />
                </video>
                
                {/* Overlay branding */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <Logo showText={false} logoUrl="/assets/logos/vnsign-white.png" iconClassName="h-8" />
                  <div className="bg-accent-400/90 backdrop-blur-md px-4 py-2 rounded-xl">
                    <div className="text-[10px] font-black text-brand-600 uppercase tracking-tighter">Live Preview</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-400/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
