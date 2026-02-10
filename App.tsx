
import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Modules from './components/Modules';
import VisionFeature from './components/VisionFeature';
import DashboardPreview from './components/DashboardPreview';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';

import logo from './Imagenes/Logo/logo.png';

function App() {
  const { t } = useTranslation();

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

        <section id="servicios" className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h4 className="text-2xl font-black text-gray-900 italic">{t('services.s1_title')}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{t('services.s1_desc')}</p>
              </div>

              <div className="space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h4 className="text-2xl font-black text-gray-900 italic">{t('services.s2_title')}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{t('services.s2_desc')}</p>
              </div>

              <div className="space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h4 className="text-2xl font-black text-gray-900 italic">{t('services.s3_title')}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{t('services.s3_desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <Modules />
        <VisionFeature />
        <DashboardPreview />

        {/* Caribe Region Callout */}
        <section className="py-32 bg-emerald-950 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 24 24" fill="white"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" /></svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">{t('caribe.title_start')} <br /><span className="text-lime-400">{t('caribe.title_highlight')}</span></h3>
            <p className="text-emerald-100 text-xl max-w-2xl mx-auto mb-12">{t('caribe.description')}</p>
            <div className="inline-flex p-1 bg-white/10 backdrop-blur-md rounded-2xl">
              <a href="tel:+573005487221"><button className="bg-lime-400 text-emerald-900 px-8 py-4 rounded-xl font-black hover:bg-white transition-all">{t('caribe.cta')}</button></a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
            <img src={logo} width={4001} height={2250} alt="GanIA Logo" className="h-32 w-auto object-contain mx-auto shadow-xl shadow-emerald-100/50 rounded-2xl" />
            <h2 className="text-5xl font-black text-gray-900">{t('cta_final.title')}</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="https://app.ganiapp.com/login" className="bg-emerald-600 text-white px-12 py-6 rounded-[2rem] text-xl font-black hover:bg-emerald-700 transition-all shadow-3xl shadow-emerald-200">
                {t('cta_final.button')}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

export default App;
