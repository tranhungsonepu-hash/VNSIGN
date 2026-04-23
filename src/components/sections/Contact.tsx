import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Phone, Mail, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', product: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const products = [
    { id: 'lcd', label: 'Màn hình LCD Signage' },
    { id: 'led', label: 'Màn hình LED Wall' },
    { id: 'kiosk', label: 'Kiosk Tương tác' },
    { id: 'standee', label: 'Standee Chân đứng' },
    { id: 'software', label: 'Phần mềm VNSIGN' },
    { id: 'other', label: 'Giải pháp khác' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '', product: '' });
  };

  return (
    <section id="contact" className="section-padding bg-brand-950 relative overflow-hidden text-white pb-32 md:pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-400/10 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <div className="inline-block px-4 py-1 bg-accent-400/10 border border-accent-400/20 rounded-full text-accent-400 text-xs font-black uppercase tracking-widest mb-6">
              {t.contact.title}
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              {t.contact.vividJourney}
            </h2>
            <p className="text-brand-300 text-xl font-medium mb-12 max-w-lg leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="space-y-8">
              {[
                { icon: MapPin, text: t.footer.companyInfo.address1 },
                { icon: Phone, text: t.footer.companyInfo.phone, highlight: true },
                { icon: Mail, text: t.footer.companyInfo.email }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-accent-400 group-hover:text-brand-600 transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "text-lg font-medium leading-relaxed group-hover:text-white transition-colors",
                    item.highlight ? "text-accent-400 font-black text-2xl" : "text-brand-200"
                  )}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-400 to-brand-400 rounded-[40px] blur opacity-20" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-accent-400/40">
                    <CheckCircle2 className="w-12 h-12 text-brand-600" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">{t.contact.successTitle}</h3>
                  <p className="text-brand-300 mb-10 font-medium">{t.contact.successDesc}</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-accent-400 font-black uppercase tracking-widest text-sm hover:underline"
                  >
                    {t.contact.resubmit}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-4">{t.contact.form.name}</label>
                      <input 
                        type="text" 
                        required
                        placeholder={t.contact.form.namePlaceholder}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-400 focus:bg-white/10 transition-all font-medium text-white"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-4">{t.contact.form.phone}</label>
                      <input 
                        type="tel" 
                        required
                        placeholder={t.contact.form.phonePlaceholder}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-400 focus:bg-white/10 transition-all font-medium text-white"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-4">{t.contact.form.email}</label>
                    <input 
                      type="email" 
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-400 focus:bg-white/10 transition-all font-medium text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-4">{t.contact.interest}</label>
                    <div 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 cursor-pointer flex justify-between items-center hover:bg-white/10 transition-all"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className={formData.product ? "text-white font-bold" : "text-brand-500 font-medium"}>
                        {formData.product ? products.find(p => p.id === formData.product)?.label : t.contact.selectProduct}
                      </span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform", isDropdownOpen ? "rotate-180" : "")} />
                    </div>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute z-50 bottom-full left-0 right-0 mb-2 bg-brand-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                          {products.map((p) => (
                            <div 
                              key={p.id}
                              className="px-6 py-4 hover:bg-accent-400 hover:text-brand-950 transition-colors cursor-pointer font-bold text-sm"
                              onClick={() => {
                                setFormData({ ...formData, product: p.id });
                                setIsDropdownOpen(false);
                              }}
                            >
                              {p.label}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-400 ml-4">{t.contact.form.message}</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-400 focus:bg-white/10 transition-all font-medium text-white resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent-400 text-brand-600 py-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-accent-400/20 flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting ? t.contact.form.submitting : (
                      <>
                        {t.contact.form.submit}
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
