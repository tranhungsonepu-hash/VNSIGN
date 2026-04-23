import React from 'react';
import { motion } from 'motion/react';
import Pricing from '../components/sections/Pricing';
import CTA from '../components/sections/CTA';

const PricingPage = () => {
  const handleNavigate = (id: string) => {
    // Navigation logic if needed
  };

  return (
    <div className="pt-20">
      <section className="bg-brand-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight"
          >
            Bảng giá dịch vụ
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
            Lựa chọn gói giải pháp phù hợp nhất với nhu cầu kinh doanh của bạn.
          </p>
        </div>
      </section>
      
      <Pricing onNavigate={handleNavigate} />
      <CTA onNavigate={handleNavigate} />
    </div>
  );
};

export default PricingPage;
