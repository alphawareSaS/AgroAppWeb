import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import LeadForm from './LeadForm';
import logo from '../Imagenes/Logo/logo.png';

const LeadFormPage: React.FC = () => {
  const { t } = useTranslation();

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <a href="#" onClick={goHome} className="inline-flex items-center gap-2 text-emerald-700 font-bold mb-8 hover:text-emerald-900 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('lead_form.back')}
          </a>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: branding/info */}
            <div className="space-y-8">
              <img src={logo} alt="GANIA" className="h-20 w-auto object-contain" />

              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                {t('lead_form.page_title')}
              </h1>

              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                {t('lead_form.page_subtitle')}
              </p>

              <ul className="space-y-4 pt-4">
                {[t('hero.bullet1'), t('hero.bullet2'), t('hero.bullet3')].map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-7 h-7 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form card */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl border border-emerald-50">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeadFormPage;
