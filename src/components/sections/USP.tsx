import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Globe, Headset, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const USP = () => {
  const { t } = useLanguage();
  const usps = [
    { icon: Shield, title: t.usp.tech.title, desc: t.usp.tech.desc },
    { icon: Zap, title: t.usp.cost.title, desc: t.usp.cost.desc },
    { icon: Globe, title: t.usp.channel.title, desc: t.usp.channel.desc },
    { icon: Headset, title: t.usp.support247.title, desc: t.usp.support247.desc }
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-brand-950 mb-6 uppercase tracking-tight">
            {t.usp.title}
          </h2>
          <div className="w-24 h-1.5 bg-accent-400 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[40px] bg-brand-50 border border-brand-100 group transition-all"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:bg-brand-600 transition-all">
                <usp.icon className="w-8 h-8 text-brand-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-black text-brand-600 mb-4 uppercase tracking-tight">{usp.title}</h3>
              <p className="text-brand-500 font-medium leading-relaxed text-sm">
                {usp.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Expert section */}
        <div className="mt-20 p-10 md:p-16 rounded-[60px] bg-brand-950 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 bg-accent-400 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl shadow-accent-400/20">
              <CheckCircle2 className="w-12 h-12 text-brand-600" />
            </div>
            <div>
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">{t.usp.expert.title}</h3>
              <p className="text-brand-300 text-lg font-medium leading-relaxed max-w-2xl">
                {t.usp.expert.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USP;
