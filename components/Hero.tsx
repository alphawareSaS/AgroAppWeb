
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import imagenHome from '../Imagenes/ImagenPages/ImagenHome.jpg';

const Hero: React.FC = () => {
  const { t } = useTranslation();

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
              <Trans i18nKey="hero.description">
                ganIA: El primer <span className="text-emerald-700 font-bold">Mayordomo Digital</span> que transforma datos en rentabilidad. Diseñada para funcionar sin internet en el campo profundo.
              </Trans>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="https://gania-app.vercel.app/login" className="bg-emerald-600 text-white px-10 py-5 rounded-2xl text-lg font-extrabold hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 transform hover:scale-105">
                {t('hero.cta_start')}
              </a>
              <button className="bg-white text-emerald-900 border-2 border-emerald-100 px-10 py-5 rounded-2xl text-lg font-extrabold hover:border-emerald-600 hover:text-emerald-600 transition-all">
                {t('hero.cta_modules')}
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-10 pt-4 opacity-70">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-emerald-900">100%</span>
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">{t('hero.stat_offline')}</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-emerald-900">+5</span>
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">{t('hero.stat_producers')}</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 mt-16 lg:mt-0 relative group">
            <div className="relative z-10 p-2 bg-gradient-to-tr from-emerald-200 to-lime-100 rounded-[2.5rem] shadow-3xl">
              <img
                src={imagenHome}
                alt="Granjas moderna"
                className="rounded-[2.2rem] w-full h-[500px] object-cover shadow-inner"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-emerald-50 hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">98%</div>
                  <div>
                    <div className="text-sm font-black text-gray-900">{t('hero.stat_roi')}</div>
                    <div className="text-xs text-emerald-600 font-bold">{t('hero.stat_category')}</div>
                  </div>
                </div>
              </div>
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
