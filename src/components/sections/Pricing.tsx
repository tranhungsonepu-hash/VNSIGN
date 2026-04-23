import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Tv, Layout, Smartphone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

interface PricingProps {
  onNavigate: (page: string) => void;
}

const Pricing = ({ onNavigate }: PricingProps) => {
  const { t } = useLanguage();
  const plans = [
    {
      name: t.pricing.plans.basic.name,
      price: t.pricing.plans.basic.price,
      features: t.pricing.plans.basic.features,
      popular: false
    },
    {
      name: t.pricing.plans.enterprise.name,
      price: t.pricing.plans.enterprise.price,
      features: t.pricing.plans.enterprise.features,
      popular: true
    }
  ];

  const hardware = [
    { icon: Tv, ...t.pricing.hardware.lcd },
    { icon: Layout, ...t.pricing.hardware.led },
    { icon: Smartphone, ...t.pricing.hardware.kiosk },
  ];

  return (
    <div className="bg-white">
      {/* Software Plans */}
      <section className="section-padding bg-brand-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-brand-600 mb-6 uppercase tracking-tight">
              {t.pricing.title}
            </h2>
            <p className="text-brand-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              {t.pricing.subtitle}
            </p>
            <div className="w-24 h-1.5 bg-accent-400 mx-auto mt-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={cn(
                  "relative p-10 rounded-[40px] bg-white transition-all duration-500 overflow-hidden group shadow-xl hover:shadow-2xl border border-brand-100",
                  plan.popular ? "ring-4 ring-accent-400" : ""
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-accent-400 text-brand-600 px-6 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
                    Phổ biến nhất
                  </div>
                )}
                <div className="mb-10">
                  <div className="text-brand-600/40 text-xs font-black uppercase tracking-widest mb-4">
                    {plan.name}
                  </div>
                  <div className="text-brand-600 text-4xl font-black mb-2">
                    {plan.price}
                  </div>
                  {plan.price !== 'Liên hệ báo giá' && (
                    <div className="text-brand-600/40 text-[10px] font-bold uppercase tracking-tighter">Giá thuê theo năm / màn hình</div>
                  )}
                </div>

                <div className="w-full h-px bg-brand-600/5 mb-10" />

                <ul className="space-y-4 mb-12">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-brand-600/70 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-accent-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => onNavigate('contact')}
                  className={cn(
                    "w-full py-5 rounded-2xl font-black transition-all active:scale-95 text-lg uppercase tracking-tight shadow-lg",
                    plan.popular 
                      ? "bg-brand-600 text-white hover:bg-black" 
                      : "bg-brand-600/5 text-brand-600 hover:bg-brand-600 hover:text-white"
                  )}
                >
                  {t.pricing.contact}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Solutions */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-600 mb-6 uppercase tracking-tight">
              {t.pricing.hardware.title}
            </h2>
            <p className="text-brand-500 max-w-2xl mx-auto text-lg font-medium">
              {t.pricing.hardware.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {hardware.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[40px] bg-brand-50/50 border border-brand-100 group transition-all"
              >
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:bg-brand-600 group-hover:text-white transition-all">
                  <item.icon className="w-8 h-8 text-brand-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-black text-brand-600 mb-4 uppercase tracking-tight">{item.name}</h3>
                <p className="text-brand-500 text-sm leading-relaxed font-medium mb-8">
                  {item.desc}
                </p>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-brand-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all group-hover:text-accent-400"
                >
                  Nhận bảng giá <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              {t.pricing.faqs.title}
            </h2>
            <div className="w-20 h-1.5 bg-accent-400 mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {t.pricing.faqs.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h4 className="text-lg font-black text-accent-400 mb-4">{item.q}</h4>
                <p className="text-white/60 font-medium leading-relaxed text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
