
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import logo from '../Imagenes/Logo/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLang = i18n.language?.split('-')[0] || 'es';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <img src={logo} width={4001} height={2250} alt="ganIA Logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-extrabold text-emerald-900 tracking-tight">ganIA</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#inicio" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('navbar.home')}</a>
            <a href="#modulos" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('navbar.modules')}</a>
            <a href="#servicios" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('navbar.services')}</a>
            <a href="#demo" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('navbar.demo')}</a>

            <div className="flex items-center gap-1 border-l border-gray-200 pl-6">
              <button
                onClick={() => changeLanguage('es')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${currentLang === 'es' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:text-emerald-600'}`}
              >
                ES
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${currentLang === 'en' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:text-emerald-600'}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('pt')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${currentLang === 'pt' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:text-emerald-600'}`}
              >
                PT
              </button>
            </div>

            <a href="https://gania-app.vercel.app/login" className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-md ml-4">
              {t('navbar.start_now')}
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-4">
          <a href="#inicio" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">{t('navbar.home')}</a>
          <a href="#modulos" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">{t('navbar.modules')}</a>
          <a href="#servicios" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">{t('navbar.services')}</a>
          <a href="#demo" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">{t('navbar.demo')}</a>

          <div className="flex gap-4 justify-center py-2 border-t border-gray-100">
            <button onClick={() => changeLanguage('es')} className={`font-bold ${currentLang === 'es' ? 'text-emerald-600' : 'text-gray-500'}`}>ES</button>
            <button onClick={() => changeLanguage('en')} className={`font-bold ${currentLang === 'en' ? 'text-emerald-600' : 'text-gray-500'}`}>EN</button>
            <button onClick={() => changeLanguage('pt')} className={`font-bold ${currentLang === 'pt' ? 'text-emerald-600' : 'text-gray-500'}`}>PT</button>
          </div>

          <a href="https://gania-app.vercel.app/login" className="block w-full text-center bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md">
            {t('navbar.start_now')}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
