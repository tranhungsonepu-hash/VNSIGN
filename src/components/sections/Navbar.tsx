import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Menu, 
  X, 
  Tv, 
  Globe,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { Logo } from '../Logo';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSolutionsEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setIsSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 150);
  };

  const navLinks = [
    { name: t.nav.features, href: '/features' },
    { name: t.nav.solutions, href: '#screens', dropdown: true },
    { name: t.nav.projects, href: '/projects' },
    { name: t.nav.pricing, href: '/pricing' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const solutionItems = [
    { 
      name: t.nav.lcd, 
      href: '#lcd-screens', 
      desc: t.nav.lcdDesc,
      icon: Monitor
    },
    { 
      name: t.nav.led, 
      href: '#led-screens', 
      desc: t.nav.ledDesc,
      icon: Tv
    },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 lg:px-24 py-4",
      (isScrolled || currentPage !== 'home') ? "bg-brand-600/95 backdrop-blur-lg shadow-lg py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex-shrink-0" onClick={(e) => { e.preventDefault(); onNavigate('/'); }}>
          <Logo variant="image" logoUrl={isScrolled || currentPage !== 'home' ? "/assets/logos/vnsign-white.png" : "/assets/logos/logo-vnsign-ngang.png"} />
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative"
              onMouseEnter={link.dropdown ? handleSolutionsEnter : undefined}
              onMouseLeave={link.dropdown ? handleSolutionsLeave : undefined}
            >
              <a 
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.href);
                }}
                className={cn(
                  "text-[16px] font-extrabold transition-all flex items-center gap-1 py-2 tracking-tight",
                  isScrolled || currentPage !== 'home' ? "text-white hover:text-accent-400" : "text-white hover:text-accent-400 drop-shadow-md"
                )}
              >
                {link.name}
                {link.dropdown && <ChevronDown className={cn("w-4 h-4 transition-transform", isSolutionsOpen ? "rotate-180" : "")} />}
              </a>

              {link.dropdown && (
                <AnimatePresence>
                  {isSolutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl border border-brand-100 p-4 mt-2"
                    >
                      <div className="grid gap-2">
                        {solutionItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-brand-50/50 transition-colors group"
                            onClick={(e) => { e.preventDefault(); onNavigate(item.href); setIsSolutionsOpen(false); }}
                          >
                            <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-600 transition-colors">
                              <item.icon className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-brand-950 mb-1">{item.name}</div>
                              <div className="text-xs text-brand-500 leading-relaxed">{item.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <div className="flex items-center gap-3">
            <button className="text-white hover:text-accent-400 transition-colors p-2">
              <Globe className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('/pricing')}
              className="bg-accent-400 text-brand-950 px-7 py-2.5 rounded-full text-[15px] font-black hover:bg-white transition-all shadow-xl shadow-accent-400/20 active:scale-95 whitespace-nowrap"
            >
              Nhận bảng giá
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white relative w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={isMobileMenuOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: isMobileMenuOpen ? -90 : 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isMobileMenuOpen ? 90 : -90 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-brand-600 border-t border-white/10 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => { onNavigate('/pricing'); setIsMobileMenuOpen(false); }}
                className="bg-accent-400 text-brand-600 px-6 py-3 rounded-xl text-center font-bold shadow-lg shadow-accent-400/20"
              >
                Nhận bảng giá
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
