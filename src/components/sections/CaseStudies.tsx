import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CaseStudiesProps {
  onProjectClick: (project: any) => void;
}

const CaseStudies = ({ onProjectClick }: CaseStudiesProps) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 'tan-son-nhat-t3',
      title: t.caseStudies.tanSonNhatT3.title,
      subtitle: t.caseStudies.tanSonNhatT3.model,
      desc: t.caseStudies.tanSonNhatT3.desc,
      image: t.caseStudies.tanSonNhatT3.image
    },
    {
      id: 'sun-group',
      title: t.caseStudies.sunGroup.title,
      subtitle: t.caseStudies.sunGroup.model,
      desc: t.caseStudies.sunGroup.desc,
      image: t.caseStudies.sunGroup.image
    },
    {
      id: 'toco-toco',
      title: t.caseStudies.tocoToco.title,
      subtitle: t.caseStudies.tocoToco.model,
      desc: t.caseStudies.tocoToco.desc,
      image: t.caseStudies.tocoToco.image
    },
    {
      id: 'amway',
      title: t.caseStudies.amway.title,
      subtitle: t.caseStudies.amway.model,
      desc: t.caseStudies.amway.desc,
      image: t.caseStudies.amway.image
    },
    {
      id: 'hospital-304',
      title: t.caseStudies.hospital304.title,
      subtitle: t.caseStudies.hospital304.model,
      desc: t.caseStudies.hospital304.desc,
      image: t.caseStudies.hospital304.image
    }
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="case-studies" className="section-padding bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-950 mb-6 uppercase tracking-tight">
              {t.caseStudies.title}
            </h2>
            <p className="text-brand-700 text-lg font-medium leading-relaxed">
              {t.caseStudies.subtitle}
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full border-2 border-brand-100 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all group"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full border-2 border-brand-100 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all group"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative h-[600px] md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute inset-0 grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-[40px] shadow-2xl aspect-video lg:aspect-auto h-full" onClick={() => onProjectClick(projects[currentIndex])}>
                <img 
                  src={projects[currentIndex].image} 
                  alt={projects[currentIndex].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-accent-400 font-black text-sm uppercase tracking-widest mb-4">
                  {projects[currentIndex].subtitle}
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-brand-950 mb-6 leading-tight">
                  {projects[currentIndex].title}
                </h3>
                <p className="text-brand-700 text-lg mb-10 leading-relaxed font-medium">
                  {projects[currentIndex].desc}
                </p>
                
                <button 
                  onClick={() => onProjectClick(projects[currentIndex])}
                  className="inline-flex items-center gap-3 text-brand-600 font-black uppercase tracking-widest group"
                >
                  {t.caseStudies.viewAll} 
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === currentIndex ? "w-12 bg-brand-600" : "w-2 bg-brand-100 hover:bg-brand-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
