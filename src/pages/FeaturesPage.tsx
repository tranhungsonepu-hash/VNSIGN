import React from 'react';
import { motion } from 'motion/react';
import Features from '../components/sections/Features';
import CTA from '../components/sections/CTA';

const FeaturesPage = () => {
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
            Tính năng nổi bật
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
            Khám phá sức mạnh của hệ thống quản lý màn hình chuyên nghiệp VNSIGN.
          </p>
        </div>
      </section>
      
      <Features />
      <CTA onNavigate={handleNavigate} />
    </div>
  );
};

export default FeaturesPage;
