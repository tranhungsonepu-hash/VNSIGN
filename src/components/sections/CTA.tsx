import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CTAProps {
  onNavigate: (page: string) => void;
}

const CTA = ({ onNavigate }: CTAProps) => {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding bg-brand-700 relative overflow-hidden text-white">
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
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white text-brand-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-brand-50 transition-all shadow-2xl shadow-brand-900/20 flex items-center justify-center gap-2 group"
            >
              {t.cta.primary} <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-brand-700/50 backdrop-blur-md text-white border border-brand-500/30 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-brand-700/70 transition-all flex items-center justify-center gap-2"
            >
              {t.cta.secondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
