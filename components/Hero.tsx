
import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePWA } from '../hooks/usePWA';
import PWAInstructions from './PWAInstructions';
import LeadForm from './LeadForm';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { isInstalled, install, showInstructions, setShowInstructions, isIOS } = usePWA();

  return (
    <section id="inicio" className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', size: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex items-center gap-16">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest border border-emerald-100 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t('hero.tag')}
            </div>

            <h1 className="text-5xl lg:text-8xl font-black text-gray-900 leading-tight">
              {t('hero.title_start')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">{t('hero.title_tech')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
              {t('hero.description')}
            </p>

            {/* Bullets */}
            <ul className="space-y-3 max-w-xl mx-auto lg:mx-0">
              {[t('hero.bullet1'), t('hero.bullet2'), t('hero.bullet3')].map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-7 h-7 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://wa.me/573005487221?text=Hola,%20quiero%20mas%20informacion%20sobre%20GanIA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-10 py-5 rounded-2xl text-lg font-extrabold hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
                {t('hero.cta_whatsapp')}
              </a>

              {!isInstalled && (
                <button
                  onClick={install}
                  className="flex items-center gap-3 bg-white text-emerald-900 border-2 border-emerald-100 px-8 py-5 rounded-2xl text-lg font-extrabold hover:border-emerald-600 hover:text-emerald-600 transition-all shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Instalar App
                </button>
              )}

              <PWAInstructions
                isOpen={showInstructions}
                onClose={() => setShowInstructions(false)}
                isIOS={isIOS}
              />
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-10 pt-4 opacity-70">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-emerald-900">100%</span>
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">{t('hero.stat_offline')}</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-emerald-900">+30</span>
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">{t('hero.stat_producers')}</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
            <div className="relative z-10 bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-2xl border border-emerald-50">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 leading-tight">{t('lead_form.page_title')}</h2>
                  <p className="text-sm text-gray-500 mt-1">{t('lead_form.page_subtitle')}</p>
                </div>
              </div>
              <LeadForm />
            </div>

            {/* Animated Circles */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-lime-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-full -z-10 opacity-30 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
