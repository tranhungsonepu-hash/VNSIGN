import React from 'react';
import { FileText, Globe, Play, Youtube, Layout } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Resources = () => {
  const { t } = useLanguage();
  const resources = [
    { title: t.resources.install, type: "PDF", icon: FileText },
    { title: t.resources.api, type: "Web", icon: Globe },
    { title: t.resources.video, type: "Video", icon: Play },
    { title: t.resources.tutorials, type: "Tutorial", icon: Youtube },
    { title: t.resources.assets, type: "Asset", icon: Layout }
  ];

  return (
    <section id="resources" className="section-padding bg-brand-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-950 mb-4">
            {t.resources.title}
          </h2>
          <p className="text-brand-500 max-w-2xl mx-auto text-lg">
            {t.resources.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {resources.map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-brand-100 hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-600 transition-colors">
                <item.icon className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-bold text-brand-950 mb-2">{item.title}</h4>
              <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">{item.type}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
