
import React from 'react';
import { useTranslation } from 'react-i18next';

const Modules: React.FC = () => {
  const { t } = useTranslation();

  const modules = [
    {
      title: t('modules.m1_title'),
      desc: t('modules.m1_desc'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      tags: [t('modules.m1_tag1'), t('modules.m1_tag2')]
    },
    {
      title: t('modules.m2_title'),
      desc: t('modules.m2_desc'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      tags: [t('modules.m2_tag1'), t('modules.m2_tag2')]
    },
    {
      title: t('modules.m3_title'),
      desc: t('modules.m3_desc'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tags: [t('modules.m3_tag1'), t('modules.m3_tag2')]
    },
    {
      title: t('modules.m4_title'),
      desc: t('modules.m4_desc'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      tags: [t('modules.m4_tag1'), t('modules.m4_tag2')]
    }
  ];

  return (
    <section id="modulos" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs mb-4">{t('modules.subtitle')}</h2>
          <h3 className="text-5xl font-black text-gray-900">{t('modules.title_start')} <span className="text-emerald-600">{t('modules.title_highlight')}</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((m, idx) => (
            <div key={idx} className="group bg-gray-50 p-8 rounded-[2.5rem] hover:bg-emerald-600 hover:text-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-8 shadow-sm group-hover:scale-110 transition-transform">
                {m.icon}
              </div>
              <div className="flex gap-2 mb-4">
                {m.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg group-hover:bg-emerald-500 group-hover:text-white">
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="text-2xl font-bold mb-4">{m.title}</h4>
              <p className="text-gray-500 group-hover:text-emerald-50 leading-relaxed font-medium">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
