import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Monitor, Layout, Tv, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.features, href: '#features' },
    { name: t.nav.solutions, href: '#screens', dropdown: true },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: t.nav.resources, href: '#resources' },
  ];

  const solutionItems = [
    { icon: Tv, name: t.solutions.lcd, desc: t.solutions.lcdSub, href: '#screens' },
    { icon: Layout, name: t.solutions.led, desc: t.solutions.ledSub, href: '#screens' },
    { icon: Monitor, name: t.solutions.kiosk, desc: t.solutions.kioskSub, href: '#contact' },
    { icon: MessageSquare, name: t.solutions.menu, desc: t.solutions.menuSub, href: '#contact' },
  ];

  const handleSolutionsEnter = () => {
    if (window.innerWidth >= 1024) setIsSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    if (window.innerWidth >= 1024) setIsSolutionsOpen(false);
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4",
        isScrolled || currentPage !== 'home'
          ? "bg-brand-600/90 backdrop-blur-md shadow-2xl py-3 border-b border-white/10" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <Logo 
          variant="image" 
          logoUrl="/assets/logos/vnsign-white.png" 
          className="cursor-pointer"
          onClick={() => onNavigate('home')}
        />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
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
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    onNavigate(link.href.replace('#', ''));
                  }
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
                            onClick={() => {
                              setIsSolutionsOpen(false);
                              onNavigate(item.href.replace('#', ''));
                            }}
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
          
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-accent-400 text-brand-600 px-8 py-3 rounded-full text-sm font-black hover:bg-white hover:scale-105 transition-all shadow-xl shadow-accent-400/20 uppercase tracking-widest"
          >
            {t.nav.tryNow}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-brand-600 p-8 flex flex-col lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <Logo variant="image" logoUrl="/assets/logos/vnsign-white.png" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X className="w-10 h-10" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      onNavigate(link.href.replace('#', ''));
                    }}
                    className="text-3xl font-black text-white hover:text-accent-400 transition-colors uppercase"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className="bg-accent-400 text-brand-600 w-full py-6 rounded-3xl text-xl font-black shadow-2xl uppercase tracking-widest mt-8"
              >
                {t.nav.tryNow}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
