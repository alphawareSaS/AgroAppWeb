
import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from '../Imagenes/Logo/logo.png';
import avisoPrivacidad from '../Doc/AVISO DE PRIVACIDAD GANIA.pdf';
import terminosCondiciones from '../Doc/TERMINOS Y CONDICIONES GANIA.pdf';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src={logo} width={4001} height={2250} alt="GanIA Logo" className="h-12 w-auto object-contain" />
              <span className="text-2xl font-extrabold text-emerald-900 tracking-tight">GanIA</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              {t('footer.slogan')}
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-50"></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-6">{t('footer.product_title')}</h5>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#inicio" className="hover:text-emerald-600 transition-colors">{t('footer.prod_features')}</a></li>
              <li><a href="#modulos" className="hover:text-emerald-600 transition-colors">{t('footer.prod_modules')}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t('footer.prod_pricing')}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t('footer.prod_updates')}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-6">{t('footer.company_title')}</h5>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t('footer.comp_about')}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t('footer.comp_blog')}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t('footer.comp_careers')}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t('footer.comp_contact')}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-6">{t('footer.newsletter_title')}</h5>
            <p className="text-gray-500 mb-6">{t('footer.newsletter_desc')}</p>
            <div className="flex gap-2">
              <input type="email" placeholder={t('footer.newsletter_placeholder')} className="bg-gray-100 border-none rounded-lg px-4 py-2 flex-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-md">OK</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-8">
            <a href={avisoPrivacidad} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600">{t('footer.privacy')}</a>
            <a href={terminosCondiciones} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600">{t('footer.terms')}</a>
            <a href="#" className="hover:text-emerald-600">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
