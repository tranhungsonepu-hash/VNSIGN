import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const LCDScreens = () => {
  const { t } = useLanguage();
  return (
    <section id="lcd-screens" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-950 mb-4">
            {t.lcd.title}
          </h2>
          <p className="text-brand-500 max-w-2xl mx-auto text-lg">
            {t.lcd.subtitle}
          </p>
        </div>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl group aspect-[4/5]">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
              >
                <source src="/assets/case-studies/AEON-BETA/VIDEO/7517328916682.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-600/40 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-xs uppercase tracking-widest">Digital Signage</span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl group aspect-[4/5]">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
                >
                  <source src="/assets/case-studies/AEON-BETA/VIDEO/7517328935568.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="bg-brand-600 p-6 rounded-[32px] text-white shadow-xl">
                <div className="text-3xl font-black mb-1">4K</div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Resolution</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-3xl font-black text-brand-950 mb-6 uppercase tracking-tight">{t.lcd.featuresTitle}</h3>
              <p className="text-brand-500 mb-8 leading-relaxed">
                Hệ thống màn hình LCD của VNSIGN được tối ưu cho việc hiển thị nội dung quảng cáo sắc nét, 
                hoạt động bền bỉ trong môi trường trung tâm thương mại và cửa hàng bán lẻ.
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              {t.lcd.features.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600" />
                  <span className="text-brand-700">{item}</span>
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

export default LCDScreens;
