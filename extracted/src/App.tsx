/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Layout, 
  Clock, 
  Cloud, 
  Shield, 
  Zap, 
  ChevronRight, 
  Menu, 
  X, 
  Play, 
  CheckCircle2, 
  ArrowLeft,
  AlertCircle,
  Tv, 
  Smartphone, 
  Globe,
  Settings,
  BarChart3,
  ChevronDown,
  FileText,
  Youtube,
  Award,
  Users,
  Rocket,
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Chatbot } from './components/Chatbot';
import { LazySection } from './components/LazySection';
import { Logo } from './components/Logo';
import { translations, Language } from './translations';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
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
    { name: t.nav.features, href: '#features' },
    { name: t.nav.solutions, href: '#solutions', dropdown: true },
    { name: t.nav.projects, href: '#case-studies' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: t.nav.resources, href: '#resources' },
    { name: t.nav.process, href: '#how-it-works' },
    { name: t.nav.contact, href: '#contact' },
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
      isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent"
    )}>
      {/* Global Scroll Progress */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100/50">
        <motion.div 
          className="h-full bg-brand-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative"
              onMouseEnter={link.dropdown ? handleSolutionsEnter : undefined}
              onMouseLeave={link.dropdown ? handleSolutionsLeave : undefined}
            >
              <a 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors flex items-center gap-1 py-2",
                  isSolutionsOpen && link.dropdown ? "text-brand-600" : "text-slate-600 hover:text-brand-600"
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
                      className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 mt-2"
                    >
                      <div className="grid gap-2">
                        {solutionItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                            onClick={() => setIsSolutionsOpen(false)}
                          >
                            <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-600 transition-colors">
                              <item.icon className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900 mb-1">{item.name}</div>
                              <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
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
          <button className="bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 active:scale-95">
            {t.nav.tryNow}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900 relative w-10 h-10 flex items-center justify-center"
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
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl md:hidden overflow-hidden"
          >
            <motion.div 
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="p-6 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <React.Fragment key={link.name}>
                  <motion.a 
                    href={link.href}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -10 }
                    }}
                    className="text-lg font-medium text-slate-600 hover:text-brand-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                  {link.dropdown && (
                    <div className="pl-4 flex flex-col gap-3 border-l border-slate-100 ml-1">
                      {solutionItems.map((item) => (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          variants={{
                            open: { opacity: 1, x: 0 },
                            closed: { opacity: 0, x: -10 }
                          }}
                          className="text-sm font-medium text-slate-400 hover:text-brand-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
              <motion.button 
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 10 }
                }}
                className="bg-brand-600 text-white px-6 py-3 rounded-xl text-center font-semibold shadow-lg shadow-brand-100"
              >
                {t.nav.tryNow}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
              onClick={() => setIsVideoOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Vnsign Product Demo"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-brand-50/50 rounded-bl-[100px]" />
      <div className="absolute top-1/4 left-0 -z-10 w-64 h-64 bg-brand-100/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-3 h-3" /> {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 mb-6">
            {t.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
              {t.hero.titleHighlight}
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact"
              className="bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-200 flex items-center justify-center gap-2 group"
            >
              {t.hero.ctaStart} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group"
            >
              <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              {t.hero.ctaVideo}
            </button>
          </div>
          
          <div className="mt-8">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 text-slate-600 font-bold hover:text-brand-700 transition-all group"
            >
              {t.hero.customSolution} <span className="underline decoration-brand-200 decoration-2 underline-offset-4 group-hover:decoration-brand-700 transition-all">{t.hero.requestConsult}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="mt-10 flex items-center gap-6 grayscale opacity-60">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.hero.trustedBy}</span>
            <div className="flex gap-8 items-center">
              <div className="font-bold text-xl text-slate-400">SAMSUNG</div>
              <div className="font-bold text-xl text-slate-400">LG</div>
              <div className="font-bold text-xl text-slate-400">SONY</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-900/5 aspect-video bg-slate-800">
            <img 
              src="https://picsum.photos/seed/dashboard/1200/800" 
              alt="Vnsign Dashboard" 
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            
            {/* Floating UI elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-6 glass-panel p-4 rounded-2xl w-48 hidden md:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">{t.hero.status}</span>
              </div>
              <div className="text-sm font-bold text-slate-900">{t.hero.onlineCount}</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-6 glass-panel p-4 rounded-2xl w-56 hidden md:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-brand-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">{t.hero.schedule}</span>
              </div>
              <div className="text-sm font-bold text-slate-900">{t.hero.campaign}</div>
              <div className="text-[10px] text-slate-400 mt-1">{t.hero.startTime}</div>
            </motion.div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-600/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  key?: any;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.03 }}
    className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-brand-500 hover:shadow-2xl hover:shadow-brand-100 transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
      <Icon className="w-7 h-7 text-brand-600 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const Features = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: Cloud,
      title: t.features.cloud.title,
      description: t.features.cloud.desc
    },
    {
      icon: Layout,
      title: t.features.dragDrop.title,
      description: t.features.dragDrop.desc
    },
    {
      icon: Clock,
      title: t.features.schedule.title,
      description: t.features.schedule.desc
    },
    {
      icon: Shield,
      title: t.features.security.title,
      description: t.features.security.desc
    },
    {
      icon: BarChart3,
      title: t.features.report.title,
      description: t.features.report.desc
    },
    {
      icon: Settings,
      title: t.features.compat.title,
      description: t.features.compat.desc
    }
  ];

  return (
    <section id="features" className="section-padding bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            {t.features.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            {t.features.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard 
              key={i} 
              icon={f.icon} 
              title={f.title} 
              description={f.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const { t } = useLanguage();
  return (
    <section id="solutions" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://picsum.photos/seed/lcd/400/600" 
                  alt="LCD Display" 
                  className="rounded-3xl shadow-lg w-full aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-brand-600 p-6 rounded-3xl text-white">
                  <Tv className="w-8 h-8 mb-4" />
                  <div className="text-2xl font-bold">LCD</div>
                  <div className="text-sm opacity-80">{t.solutions.lcdSub}</div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-slate-900 p-6 rounded-3xl text-white">
                  <Smartphone className="w-8 h-8 mb-4" />
                  <div className="text-2xl font-bold">Kiosk</div>
                  <div className="text-sm opacity-80">{t.solutions.kioskSub}</div>
                </div>
                <img 
                  src="https://picsum.photos/seed/led/400/600" 
                  alt="LED Wall" 
                  className="rounded-3xl shadow-lg w-full aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              {t.solutions.title}
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {t.solutions.desc}
            </p>
            
            <div className="space-y-6 mb-10">
              {[
                { title: t.solutions.lcd, desc: t.solutions.lcdSub },
                { title: t.solutions.led, desc: t.solutions.ledSub },
                { title: t.solutions.menu, desc: t.solutions.menuSub },
                { title: t.solutions.kiosk, desc: t.solutions.kioskSub }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 group"
            >
              {t.hero.ctaStart} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const LCDScreens = () => {
  const { t } = useLanguage();
  return (
    <section id="lcd-screens" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            {t.lcd.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            {t.lcd.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img 
            src="https://picsum.photos/seed/lcd-detail/800/600" 
            alt="LCD Display Detail" 
            className="rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900">{t.lcd.featuresTitle}</h3>
            <ul className="space-y-4 mb-8">
              {t.lcd.features.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600" />
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 group"
            >
              {t.hero.requestConsult} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const LEDScreens = () => {
  const { t } = useLanguage();
  return (
    <section id="led-screens" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            {t.led.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            {t.led.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h3 className="text-3xl font-bold text-slate-900">{t.led.advantagesTitle}</h3>
            <ul className="space-y-4 mb-8">
              {t.led.advantages.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600" />
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 group"
            >
              {t.hero.requestConsult} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <img 
            src="https://picsum.photos/seed/led-detail/800/600" 
            alt="LED Wall Detail" 
            className="rounded-3xl shadow-2xl order-1 md:order-2"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};

const USP = () => {
  const { t } = useLanguage();
  const advantages = [
    {
      icon: Rocket,
      title: t.usp.tech.title,
      desc: t.usp.tech.desc
    },
    {
      icon: HeartHandshake,
      title: t.usp.support.title,
      desc: t.usp.support.desc
    },
    {
      icon: Award,
      title: t.usp.quality.title,
      desc: t.usp.quality.desc
    },
    {
      icon: Users,
      title: t.usp.local.title,
      desc: t.usp.local.desc
    }
  ];

  return (
    <section className="section-padding bg-brand-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-400 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {t.usp.title} <br />
              <span className="text-brand-400 text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">
                {t.usp.titleHighlight}
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              {t.usp.desc}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {advantages.map((item, i) => (
                <div key={i} className="group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors">
                    <item.icon className="w-6 h-6 text-brand-400 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/advantage/1000/1200" 
                alt="Competitive Advantage" 
                className="w-full h-full object-cover aspect-[4/5] opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10 p-8 glass-panel rounded-3xl border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-bold text-slate-900">{t.usp.enterpriseCount}</div>
                </div>
                <div className="text-slate-600 text-sm italic">
                  {t.usp.testimonial}
                </div>
                <div className="mt-4 font-bold text-brand-600 text-xs uppercase tracking-widest">— {t.usp.author}</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const { t } = useLanguage();
  const plans = [
    {
      name: t.pricing.plans.basic.name,
      price: t.pricing.contact,
      description: t.pricing.plans.basic.desc,
      features: t.pricing.plans.basic.features,
      cta: t.pricing.ctaStart,
      popular: false
    },
    {
      name: t.pricing.plans.pro.name,
      price: t.pricing.contact,
      description: t.pricing.plans.pro.desc,
      features: t.pricing.plans.pro.features,
      cta: t.pricing.ctaTrial,
      popular: true
    },
    {
      name: t.pricing.plans.enterprise.name,
      price: t.pricing.custom,
      description: t.pricing.plans.enterprise.desc,
      features: t.pricing.plans.enterprise.features,
      cta: t.pricing.ctaConsult,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={cn(
                "relative p-8 rounded-[40px] bg-white border transition-all duration-300",
                plan.popular ? "border-brand-500 shadow-2xl shadow-brand-100 scale-105 z-10" : "border-slate-100 shadow-xl shadow-slate-200/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {t.pricing.popular}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
              </div>
              <div className="mb-8">
                <div className="text-4xl font-black text-brand-600 mb-1">{plan.price}</div>
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider">{t.pricing.yearly}</div>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={cn(
                "w-full py-4 rounded-2xl font-bold transition-all active:scale-95",
                plan.popular 
                  ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-200" 
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 p-8 rounded-3xl bg-brand-50 border border-brand-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Zap className="text-brand-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{t.pricing.customSolutionTitle}</h4>
              <p className="text-slate-500 text-sm">{t.pricing.customSolutionDesc}</p>
            </div>
          </div>
          <button className="bg-white text-brand-600 border border-brand-200 px-8 py-3 rounded-xl font-bold hover:bg-brand-600 hover:text-white transition-all">
            {t.pricing.requestQuote}
          </button>
        </div>
      </div>
    </section>
  );
};

const CaseStudies = ({ onProjectClick }: { onProjectClick: (project: any) => void }) => {
  const { t } = useLanguage();
  const projects = [
    {
      id: 'tan-son-nhat-t3',
      title: t.caseStudies.tanSonNhatT3.title,
      subtitle: t.caseStudies.tanSonNhatT3.model,
      desc: t.caseStudies.tanSonNhatT3.desc,
      challenges: t.caseStudies.tanSonNhatT3.challenges,
      solutions: t.caseStudies.tanSonNhatT3.solutions,
      details: t.caseStudies.tanSonNhatT3.details,
      image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      id: 'sun-group',
      title: t.caseStudies.sunGroup.title,
      subtitle: t.caseStudies.sunGroup.model,
      desc: t.caseStudies.sunGroup.desc,
      challenges: t.caseStudies.sunGroup.challenges,
      solutions: t.caseStudies.sunGroup.solutions,
      details: t.caseStudies.sunGroup.details,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      id: 'toco-toco',
      title: t.caseStudies.tocoToco.title,
      subtitle: t.caseStudies.tocoToco.model,
      desc: t.caseStudies.tocoToco.desc,
      challenges: t.caseStudies.tocoToco.challenges,
      solutions: t.caseStudies.tocoToco.solutions,
      details: t.caseStudies.tocoToco.details,
      image: "https://picsum.photos/seed/tocotoco-tea/800/600"
    },
    {
      id: 'amway',
      title: t.caseStudies.amway.title,
      subtitle: t.caseStudies.amway.model,
      desc: t.caseStudies.amway.desc,
      challenges: t.caseStudies.amway.challenges,
      solutions: t.caseStudies.amway.solutions,
      details: t.caseStudies.amway.details,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      id: 'hospital-304',
      title: t.caseStudies.hospital304.title,
      subtitle: t.caseStudies.hospital304.model,
      desc: t.caseStudies.hospital304.desc,
      challenges: t.caseStudies.hospital304.challenges,
      solutions: t.caseStudies.hospital304.solutions,
      details: t.caseStudies.hospital304.details,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=600"
    }
  ];

  return (
    <section id="case-studies" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            {t.caseStudies.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            {t.caseStudies.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div 
              key={i} 
              onClick={() => onProjectClick(project)}
              className="group cursor-pointer bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="text-white font-bold text-xl mb-1">{project.title}</div>
                  <div className="text-brand-300 text-sm font-medium">{project.subtitle}</div>
                </div>
              </div>
              {project.desc && (
                <div className="p-6 space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{project.desc}</p>
                  <div className="flex items-center text-brand-600 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                    Xem chi tiết dự án <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="text-brand-600 font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
            {t.caseStudies.viewAll} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ProjectDetail = ({ project, onBack }: { project: any, onBack: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900" />
        
        <div className="absolute top-8 left-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Quay lại
          </button>
        </div>

        <div className="absolute bottom-12 left-8 right-8 max-w-7xl mx-auto">
          <div className="inline-block px-4 py-1 bg-brand-600 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
            {project.subtitle}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Tổng quan dự án</h2>
              <p className="text-slate-600 text-xl leading-relaxed">
                {project.details.overview}
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Thử thách</h3>
                <p className="text-slate-600 leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Giải pháp</h3>
                <p className="text-slate-600 leading-relaxed">
                  {project.solutions}
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Thông số kỹ thuật & Triển khai</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.details.techSpecs.map((spec: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-brand-600 rounded-full" />
                    </div>
                    <span className="text-slate-700 font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-10 bg-brand-900 rounded-[3rem] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Kết quả đạt được</h2>
                <p className="text-brand-100 text-xl leading-relaxed italic">
                  "{project.details.results}"
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 blur-[100px] rounded-full -mr-32 -mt-32" />
            </section>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Thông tin chi tiết</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Khách hàng</div>
                  <div className="text-slate-900 font-bold">
                    {project.id === 'sun-group' ? 'Sun Group' : 
                     project.id === 'toco-toco' ? 'TocoToco' : 
                     project.id === 'amway' ? 'Amway Việt Nam' : 
                     project.id === 'hospital-304' ? 'Bệnh viện 30/4' : 'Cảng hàng không Tân Sơn Nhất'}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Địa điểm</div>
                  <div className="text-slate-900 font-bold">
                    {project.id === 'sun-group' ? 'Phú Quốc, Việt Nam' : 
                     project.id === 'hospital-304' || project.id === 'tan-son-nhat-t3' ? 'TP. Hồ Chí Minh, Việt Nam' : 'Toàn quốc, Việt Nam'}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Lĩnh vực</div>
                  <div className="text-slate-900 font-bold">
                    {project.id === 'sun-group' ? 'Giải trí & Du lịch' : 
                     project.id === 'toco-toco' ? 'F&B (Thực phẩm & Đồ uống)' : 
                     project.id === 'hospital-304' ? 'Y tế & Bệnh viện' : 
                     project.id === 'tan-son-nhat-t3' ? 'Giao thông & Hạ tầng' : 'Corporate & Retail'}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Năm thực hiện</div>
                  <div className="text-slate-900 font-bold">2023 - 2024</div>
                </div>
              </div>
              <button className="w-full mt-10 bg-brand-600 text-white py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20">
                Liên hệ tư vấn dự án tương tự
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Resources = () => {
  const { t } = useLanguage();
  const resources = [
    { title: t.resources.install, type: "PDF", icon: FileText },
    { title: t.resources.api, type: "Web", icon: Globe },
    { title: t.resources.video, type: "Video", icon: Play },
    { title: t.resources.tutorials, type: "Tutorial", icon: Youtube },
    { title: t.resources.assets, type: "Asset", icon: Layout }
  ];

  return (
    <section id="resources" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            {t.resources.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            {t.resources.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {resources.map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-600 transition-colors">
                <item.icon className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">{item.type}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const { t } = useLanguage();
  const steps = [
    {
      number: "01",
      title: t.howItWorks.steps[0].title,
      desc: t.howItWorks.steps[0].desc
    },
    {
      number: "02",
      title: t.howItWorks.steps[1].title,
      desc: t.howItWorks.steps[1].desc
    },
    {
      number: "03",
      title: t.howItWorks.steps[2].title,
      desc: t.howItWorks.steps[2].desc
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{t.howItWorks.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{t.howItWorks.subtitle}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative group"
            >
              <div className="text-8xl font-black text-white/5 absolute -top-12 -left-4 group-hover:text-brand-600/20 transition-colors">
                {step.number}
              </div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-gradient-to-r from-brand-600 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding bg-brand-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/30 blur-[100px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-700/30 blur-[100px] rounded-full -ml-48 -mb-48" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-brand-100 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="#contact"
              className="bg-white text-brand-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-brand-50 transition-all shadow-2xl shadow-brand-900/20 flex items-center justify-center gap-2 group"
            >
              {t.cta.primary} <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact"
              className="bg-brand-700/50 backdrop-blur-md text-white border border-brand-500/30 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-brand-700/70 transition-all flex items-center justify-center gap-2"
            >
              {t.cta.secondary}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-save feature
  useEffect(() => {
    const savedData = localStorage.getItem('vnsign_contact_form_data');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved contact form data', e);
      }
    }
  }, []);

  useEffect(() => {
    // Only save if there's actual data to save to avoid overwriting with empty on initial load
    const hasData = Object.values(formData).some(val => val !== '');
    if (hasData) {
      localStorage.setItem('vnsign_contact_form_data', JSON.stringify(formData));
    }
  }, [formData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t.contact.form.errors.name;
    
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!formData.phone) {
      newErrors.phone = t.contact.form.errors.phone;
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t.contact.form.errors.phoneInvalid;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = t.contact.form.errors.email;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.contact.form.errors.emailInvalid;
    }

    if (!formData.message.trim()) newErrors.message = t.contact.form.errors.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    localStorage.removeItem('vnsign_contact_form_data');
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="section-padding bg-brand-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden relative z-10 grid md:grid-cols-2">
        <div className="p-12 bg-slate-50">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{t.contact.title}</h2>
          <p className="text-slate-600 mb-10">{t.contact.subtitle}</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Smartphone className="text-brand-600 w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">{t.contact.hotline}</div>
                <div className="font-bold text-slate-900">0888 998 181</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Globe className="text-brand-600 w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">{t.contact.zalo}</div>
                <div className="font-bold text-slate-900">0906 671 575</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <CheckCircle2 className="text-brand-600 w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">{t.contact.email}</div>
                <div className="font-bold text-slate-900">congnt@vndc.vn</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-12">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-6"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.contact.successTitle}</h3>
              <p className="text-slate-500">{t.contact.successDesc}</p>
            </motion.div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.form.name}</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                    errors.name ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-brand-600 focus:ring-brand-100"
                  )} 
                  placeholder={t.contact.form.namePlaceholder} 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.form.phone}</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                    errors.phone ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-brand-600 focus:ring-brand-100"
                  )} 
                  placeholder={t.contact.form.phonePlaceholder} 
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.form.email}</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                    errors.email ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-brand-600 focus:ring-brand-100"
                  )} 
                  placeholder={t.contact.form.emailPlaceholder} 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.form.message}</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border outline-none transition-all h-24",
                    errors.message ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-brand-600 focus:ring-brand-100"
                  )} 
                  placeholder={t.contact.form.messagePlaceholder}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.contact.form.submitting}
                  </>
                ) : t.contact.form.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, lang, setLang } = useLanguage();
  return (
    <footer className="bg-slate-50 pt-20 pb-10 px-6 md:px-12 lg:px-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Logo className="mb-6" textClassName="text-xl" iconClassName="w-8 h-8" />
            <p className="text-slate-500 max-w-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="font-bold text-slate-900">{t.footer.companyInfo.name}</div>
              <p>{t.footer.companyInfo.address}</p>
              <p>{t.footer.companyInfo.phone}</p>
              <p>{t.footer.companyInfo.email}</p>
              <p>{t.footer.companyInfo.taxCode}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#features" className="hover:text-brand-600 transition-colors">{t.nav.features}</a></li>
              <li><a href="#pricing" className="hover:text-brand-600 transition-colors">{t.nav.pricing}</a></li>
              <li><a href="#resources" className="hover:text-brand-600 transition-colors">{t.nav.resources}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{t.footer.api}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t.footer.language}</h4>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setLang('vi')}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-medium",
                  lang === 'vi' ? "bg-brand-600 border-brand-500 text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                )}
              >
                <span>🇻🇳</span> VI
              </button>
              <button 
                onClick={() => setLang('en')}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-medium",
                  lang === 'en' ? "bg-brand-600 border-brand-500 text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                )}
              >
                <span>🇺🇸</span> EN
              </button>
              <button 
                onClick={() => setLang('ja')}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-medium",
                  lang === 'ja' ? "bg-brand-600 border-brand-500 text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                )}
              >
                <span>🇯🇵</span> JA
              </button>
              <button 
                onClick={() => setLang('zh')}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-medium",
                  lang === 'zh' ? "bg-brand-600 border-brand-500 text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                )}
              >
                <span>🇨🇳</span> ZH
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-xs">
            © 2024 Vnsign. {t.footer.rights}
          </div>
          <div className="flex gap-6">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all cursor-pointer">
              <span className="font-bold text-xs">FB</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all cursor-pointer">
              <span className="font-bold text-xs">LN</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all cursor-pointer">
              <span className="font-bold text-xs">YT</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const MainContent = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (selectedProject) {
      window.scrollTo(0, 0);
    }
  }, [selectedProject]);

  if (selectedProject) {
    return (
      <div className="min-h-screen selection:bg-brand-100 selection:text-brand-700">
        <Navbar />
        <ProjectDetail 
          project={selectedProject} 
          onBack={() => setSelectedProject(null)} 
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-brand-100 selection:text-brand-700">
      <Navbar />
      <main>
        <Hero />
        <LazySection showProgress={true} progressLabel={t.loading.features}>
          <Features />
        </LazySection>
        <LazySection showProgress={true} progressLabel={t.solutions.title}>
          <Solutions />
        </LazySection>
        <LazySection>
          <LCDScreens />
        </LazySection>
        <LazySection>
          <LEDScreens />
        </LazySection>
        <LazySection>
          <USP />
        </LazySection>
        <LazySection showProgress={true} progressLabel={t.caseStudies.title}>
          <CaseStudies onProjectClick={(p) => setSelectedProject(p)} />
        </LazySection>
        <LazySection showProgress={true} progressLabel={t.loading.pricing}>
          <Pricing />
        </LazySection>
        <LazySection>
          <Resources />
        </LazySection>
        <LazySection showProgress={true} progressLabel={t.loading.howItWorks}>
          <HowItWorks />
        </LazySection>
        <CTA />
        <LazySection>
          <Contact />
        </LazySection>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

