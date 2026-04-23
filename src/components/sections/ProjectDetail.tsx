import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectDetailProps {
  project: any;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  const { t } = useLanguage();
  const detail = t.caseStudies[project.id.replace(/-([a-z0-t])/g, (g: string) => g[1].toUpperCase())];

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-600 font-bold mb-12 hover:gap-4 transition-all group"
        >
          <ArrowLeft className="w-5 h-5" /> {t.nav.back}
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-block px-4 py-1 bg-accent-400/10 border border-accent-400/20 rounded-full text-accent-400 text-xs font-black uppercase tracking-widest mb-6">
              {project.subtitle}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-brand-950 mb-8 leading-tight">
              {project.title}
            </h1>
            <p className="text-brand-700 text-xl font-medium leading-relaxed mb-12">
              {detail?.overview || project.desc}
            </p>

            <div className="space-y-8">
              <div className="p-8 rounded-[32px] bg-brand-50 border border-brand-100">
                <h3 className="text-xl font-black text-brand-600 mb-6 uppercase tracking-tight flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent-400" /> Đặc điểm kỹ thuật
                </h3>
                <ul className="grid gap-4">
                  {(detail?.techSpecs || []).map((spec: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-brand-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-[32px] bg-brand-950 text-white shadow-2xl">
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Kết quả đạt được</h3>
                <p className="text-brand-300 leading-relaxed font-medium italic">
                  "{detail?.results || 'Hệ thống vận hành ổn định, mang lại giá trị truyền thông vượt mong đợi cho khách hàng.'}"
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-brand-100">
              <img src={project.image} alt={project.title} className="w-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {(detail?.gallery || []).slice(0, 4).map((img: string, i: number) => (
                <div key={i} className="rounded-3xl overflow-hidden shadow-xl border border-brand-50 aspect-video">
                  <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
