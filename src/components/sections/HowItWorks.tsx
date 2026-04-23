import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

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
    <section id="how-it-works" className="section-padding bg-brand-950 text-white overflow-hidden relative">
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
          <p className="text-brand-400 max-w-xl mx-auto">{t.howItWorks.subtitle}</p>
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
                <p className="text-brand-400 leading-relaxed">{step.desc}</p>
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

export default HowItWorks;
