
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import logo from '../Imagenes/Logo/logo.png';

const FlagES: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#AA151B" />
    <rect y="10" width="60" height="20" fill="#F1BF00" />
  </svg>
);

const FlagUS: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#B22234" />
    {[1, 3, 5, 7, 9].map(i => (
      <rect key={i} y={i * (40 / 13)} width="60" height={40 / 13} fill="#fff" />
    ))}
    <rect width="26" height={40 * 7 / 13} fill="#3C3B6E" />
  </svg>
);

const FlagBR: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="40" fill="#009C3B" />
    <polygon points="30,5 55,20 30,35 5,20" fill="#FFDF00" />
    <circle cx="30" cy="20" r="7" fill="#002776" />
  </svg>
);

const LANGUAGES = [
  { code: 'es', label: 'Español', Flag: FlagES },
  { code: 'en', label: 'English', Flag: FlagUS },
  { code: 'pt', label: 'Português', Flag: FlagBR },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    setLangOpen(false);
  };

  const currentLang = i18n.language?.split('-')[0] || 'es';
  const currentLangData = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <img src={logo} width={4001} height={2250} alt="GanIA Logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-extrabold text-emerald-900 tracking-tight">GanIA</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#inicio" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('navbar.home')}</a>
            <a href="#modulos" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('navbar.modules')}</a>
            <a href="#beneficios" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('navbar.services')}</a>
            <a href="/Brochoure GanIA.pdf" download="Brochoure GanIA.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">{t('navbar.demo')}</a>

            <div className="relative border-l border-gray-200 pl-6" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-all"
                aria-label="Seleccionar idioma"
              >
                <currentLangData.Flag className="w-6 h-4 rounded-sm shadow-sm" />
                <span className="text-xs font-bold text-gray-700 uppercase">{currentLangData.code}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-all ${currentLang === lang.code ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <lang.Flag className="w-6 h-4 rounded-sm shadow-sm flex-shrink-0" />
                      <span>{lang.label}</span>
                      {currentLang === lang.code && (
                        <svg className="w-4 h-4 ml-auto text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="https://app.ganiapp.com/login" className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-md ml-4">
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
          <a href="#beneficios" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">{t('navbar.services')}</a>
          <a href="/Brochoure GanIA.pdf" download="Brochoure GanIA.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">{t('navbar.demo')}</a>

          <div className="flex gap-2 justify-center py-2 border-t border-gray-100">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all ${currentLang === lang.code ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <lang.Flag className="w-5 h-3.5 rounded-sm shadow-sm" />
                <span className="uppercase">{lang.code}</span>
              </button>
            ))}
          </div>

          <a href="https://app.ganiapp.com/login" onClick={() => setIsOpen(false)} className="block w-full text-center bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md">
            {t('navbar.start_now')}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

