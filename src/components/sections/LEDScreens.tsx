import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const LEDScreens = () => {
  const { t } = useLanguage();
  return (
    <section id="led-screens" className="section-padding bg-brand-50/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-950 mb-4">
            {t.led.title}
          </h2>
          <p className="text-brand-500 max-w-2xl mx-auto text-lg">
            {t.led.subtitle}
          </p>
        </div>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div>
              <h3 className="text-3xl font-black text-brand-950 mb-6 uppercase tracking-tight">{t.led.advantagesTitle}</h3>
              <p className="text-brand-500 mb-8 leading-relaxed">
                Giải pháp màn hình LED khổ lớn của VNSIGN mang đến khả năng hiển thị ấn tượng với độ sáng cực cao, 
                phù hợp cho cả không gian trong nhà và ngoài trời với kích thước không giới hạn.
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              {t.led.advantages.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600" />
                  <span className="text-brand-700 font-medium">{item}</span>
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
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 order-1 lg:order-2">
            <div className="space-y-4 pb-8">
              <div className="bg-accent-400 p-6 rounded-[32px] text-brand-600 shadow-xl">
                <div className="text-3xl font-black mb-1">IP65</div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Waterproof</div>
              </div>
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl group aspect-[4/5]">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
                >
                  <source src="/assets/case-studies/AEON-BETA/VIDEO/7517328953625.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl group aspect-[4/5]">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
              >
                <source src="/assets/case-studies/AEON-BETA/VIDEO/7517328820085.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-xs uppercase tracking-widest">Outdoor LED Wall</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LEDScreens;
