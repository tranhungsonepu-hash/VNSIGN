import React from 'react';
import { motion } from 'motion/react';
import { Cloud, Layout, Clock, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const FeatureCard = ({ icon: Icon, title, description, index, video }: { icon: any, title: string, description: string, index: number, video?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="relative p-8 rounded-[40px] border border-white/20 overflow-hidden transition-all duration-500 group min-h-[220px] flex gap-6 shadow-2xl shadow-black/20"
  >
    {/* Video Background */}
    {video && (
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/60 via-brand-600/30 to-black/40 group-hover:from-brand-600/20 transition-all duration-500" />
      </div>
    )}

    <div className="relative z-10 flex flex-col items-center">
      <div className="text-4xl font-black text-accent-400 opacity-40 group-hover:opacity-100 transition-opacity">
        {String(index).padStart(2, '0')}
      </div>
      <div className="w-px h-full bg-white/20 my-4" />
    </div>
    
    <div className="relative z-10">
      <div className="w-12 h-12 bg-accent-400 rounded-2xl flex items-center justify-center mb-6 text-brand-600 shadow-lg shadow-accent-400/30 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-black text-white mb-4 group-hover:text-accent-400 transition-colors uppercase tracking-tight leading-tight drop-shadow-lg">
        {title}
      </h3>
      <p className="text-white leading-relaxed text-sm font-bold pr-4 drop-shadow-md">{description}</p>
    </div>
  </motion.div>
);

export const Features = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: Cloud,
      title: t.features.cloud.title,
      description: t.features.cloud.desc,
      video: t.features.cloud.video
    },
    {
      icon: Layout,
      title: t.features.dragDrop.title,
      description: t.features.dragDrop.desc,
      video: t.features.dragDrop.video
    },
    {
      icon: Clock,
      title: t.features.schedule.title,
      description: t.features.schedule.desc,
      video: t.features.schedule.video
    },
    {
      icon: BarChart3,
      title: t.features.realtime.title,
      description: t.features.realtime.desc,
      video: t.features.realtime.video
    }
  ];

  return (
    <section id="features" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-400/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="sticky top-32">
              <div className="relative rounded-[40px] overflow-hidden border border-white/20 shadow-2xl aspect-[4/5] bg-brand-950 group">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[5s]"
                >
                  <source src="/assets/case-studies/AEON-BETA/VIDEO/7517333053904.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-600 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h4 className="text-white text-3xl font-black mb-4 leading-tight">
                    {t.features.title}
                  </h4>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    {t.features.subtitle}
                  </p>
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-accent-400 p-6 rounded-3xl shadow-2xl z-20"
              >
                <div className="text-3xl font-black text-brand-600">99.9%</div>
                <div className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">Uptime Cloud</div>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
                index={index + 1} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
