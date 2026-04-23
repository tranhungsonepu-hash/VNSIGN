import React from 'react';
import { motion } from 'motion/react';
import CaseStudies from '../components/sections/CaseStudies';
import CTA from '../components/sections/CTA';

const ProjectsPage = () => {
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
            Dự án tiêu biểu
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
            Hàng ngàn màn hình đã được triển khai trên toàn quốc.
          </p>
        </div>
      </section>
      
      <CaseStudies onProjectClick={() => {}} />
      <CTA onNavigate={handleNavigate} />
    </div>
  );
};

export default ProjectsPage;
