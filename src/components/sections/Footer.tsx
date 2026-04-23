import React from 'react';
import { Logo } from '../Logo';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-brand-600 pt-24 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-400/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <Logo 
              variant="image" 
              logoUrl="/assets/logos/vnsign-white.png" 
              className="mb-10 cursor-pointer" 
              onClick={() => onNavigate('home')}
            />
            <p className="text-white/60 max-w-sm leading-relaxed mb-10 text-sm font-medium">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              {['FB', 'LN', 'YT', 'TK'].map(social => (
                <div key={social} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-accent-400 hover:text-brand-600 hover:border-accent-400 transition-all cursor-pointer font-bold text-xs">
                  {social}
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-black text-white text-sm uppercase tracking-widest mb-8">{t.footer.company}</h4>
            <div className="space-y-4 text-sm text-white/50 font-medium">
              <div className="text-white font-bold">{t.footer.companyInfo.name}</div>
              <p className="leading-relaxed">{t.footer.companyInfo.address1}</p>
              <p className="leading-relaxed">{t.footer.companyInfo.address2}</p>
              <p className="leading-relaxed">{t.footer.companyInfo.address3}</p>
              <div className="pt-4 space-y-2">
                <a href="tel:0888998181" className="block text-accent-400 font-black text-lg">0888 998 181</a>
                <a href="mailto:congnt@vndc.vn" className="block hover:text-white transition-colors">congnt@vndc.vn</a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-black text-white text-sm uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60 font-medium">
              <li><a href="#features" onClick={(e) => { e.preventDefault(); onNavigate('features'); }} className="hover:text-accent-400 transition-colors">Tính năng</a></li>
              <li><a href="#screens" onClick={(e) => { e.preventDefault(); onNavigate('screens'); }} className="hover:text-accent-400 transition-colors">Giải pháp</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }} className="hover:text-accent-400 transition-colors">Bảng giá</a></li>
              <li><a href="#resources" onClick={(e) => { e.preventDefault(); onNavigate('resources'); }} className="hover:text-accent-400 transition-colors">Tài nguyên</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-black text-white text-sm uppercase tracking-widest mb-8">Support</h4>
            <ul className="space-y-4 text-sm text-white/60 font-medium">
              <li><a href="#" className="hover:text-accent-400 transition-colors">Hướng dẫn</a></li>
              <li><a href="#" className="hover:text-accent-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-accent-400 transition-colors">Chính sách</a></li>
              <li><a href="#" className="hover:text-accent-400 transition-colors">Bảo trì</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/30 text-xs font-bold uppercase tracking-widest">
            © 2024 VNSIGN. All rights reserved.
          </div>
          <div className="flex gap-8 text-[10px] font-black text-white/20 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
