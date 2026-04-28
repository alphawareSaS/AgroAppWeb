import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Modules from './components/Modules';
import VisionFeature from './components/VisionFeature';
import DashboardPreview from './components/DashboardPreview';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import LeadFormPage from './components/LeadFormPage';
import { Analytics } from "@vercel/analytics/react"

import logo from './Imagenes/Logo/logo.png';

function App() {
  const { t } = useTranslation();
  const [hash, setHash] = useState<string>(typeof window !== 'undefined' ? window.location.hash : '');

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (hash === '#registro') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [hash]);

  if (hash === '#registro') {
    return (
      <>
        <LeadFormPage />
        <Analytics />
      </>
    );
  }

  const benefits = [
    {
      title: t('benefits.b1_title'),
      desc: t('benefits.b1_desc'),
      icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
    },
    {
      title: t('benefits.b2_title'),
      desc: t('benefits.b2_desc'),
      icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>),
    },
    {
      title: t('benefits.b3_title'),
      desc: t('benefits.b3_desc'),
      icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    },
    {
      title: t('benefits.b4_title'),
      desc: t('benefits.b4_desc'),
      icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />

        {/* Offline First Banner */}
        <div className="bg-emerald-900 py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <span className="bg-lime-400 text-emerald-950 text-[10px] font-black uppercase px-2 py-1 rounded-md">{t('banner.exclusive')}</span>
            <p className="text-emerald-50 font-bold">{t('banner.text')}</p>
            <a href="#" className="text-lime-400 font-black border-b border-lime-400 hover:text-white hover:border-white transition-all text-sm">{t('banner.link')}</a>
          </div>
        </div>

        {/* Beneficios para tu finca */}
        <section id="beneficios" className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900">{t('benefits.title')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                  <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6">
                    {b.icon}
                  </div>
                  <h4 className="text-xl font-black text-gray-900 mb-3">{b.title}</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Modules />
        <VisionFeature />
        <DashboardPreview />

        {/* Diseñada para el productor de hoy */}
        <section className="py-32 bg-emerald-950 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 24 24" fill="white"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">{t('caribe.title_start')} <br /><span className="text-lime-400">{t('caribe.title_highlight')}</span></h3>
            <p className="text-emerald-100 text-xl max-w-2xl mx-auto mb-12">{t('caribe.description')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/573005487221?text=Hola,%20necesito%20mas%20informacion%20sobre%20GanIA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-lime-400 text-emerald-900 px-10 py-5 rounded-2xl font-black hover:bg-white transition-all w-full sm:w-auto">{t('caribe.cta')}</button>
              </a>
              <a href="#inicio">
                <button className="bg-transparent text-white border-2 border-white/40 px-10 py-5 rounded-2xl font-black hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto">{t('caribe.cta_secondary')}</button>
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
            <img src={logo} width={4001} height={2250} alt="GanIA Logo" className="h-32 w-auto object-contain mx-auto shadow-xl shadow-emerald-100/50 rounded-2xl" />
            <h2 className="text-5xl font-black text-gray-900">{t('cta_final.title')}</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="#inicio" className="bg-emerald-600 text-white px-12 py-6 rounded-[2rem] text-xl font-black hover:bg-emerald-700 transition-all shadow-3xl shadow-emerald-200">
                {t('cta_final.button')}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant />
      <InstallPWA />
      <Analytics />
    </div>
  );
}

export default App;
