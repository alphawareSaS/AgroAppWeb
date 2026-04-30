
import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useTranslation } from 'react-i18next';
import demoVideo from '../Imagenes/Videos/GaniaV.mp4';

const DashboardPreview: React.FC = () => {
  const { t } = useTranslation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVideoOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const data = [
    { name: t('dashboard.months.jan'), ganado: 4000, cultivos: 2400 },
    { name: t('dashboard.months.feb'), ganado: 3000, cultivos: 1398 },
    { name: t('dashboard.months.mar'), ganado: 2000, cultivos: 9800 },
    { name: t('dashboard.months.apr'), ganado: 2780, cultivos: 3908 },
    { name: t('dashboard.months.may'), ganado: 1890, cultivos: 4800 },
    { name: t('dashboard.months.jun'), ganado: 2390, cultivos: 3800 },
  ];

  return (
    <section id="demo" className="py-16 sm:py-24 bg-emerald-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('dashboard.title')}</h2>
          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
            {t('dashboard.description')}
          </p>
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="inline-flex items-center gap-2 bg-lime-400 text-emerald-900 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-black hover:bg-white transition-all shadow-xl"
          >
            {t('dashboard.cta_demo')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-10 shadow-2xl text-gray-900">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-10">
            <div className="bg-emerald-50 p-5 sm:p-6 rounded-2xl border border-emerald-100">
              <div className="text-emerald-600 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">{t('dashboard.card1_title')}</div>
              <div className="text-2xl sm:text-3xl font-bold">1,240 L</div>
              <div className="text-xs sm:text-sm text-emerald-600 mt-2 font-medium">{t('dashboard.card1_trend')}</div>
            </div>
            <div className="bg-blue-50 p-5 sm:p-6 rounded-2xl border border-blue-100">
              <div className="text-blue-600 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">{t('dashboard.card2_title')}</div>
              <div className="text-2xl sm:text-3xl font-bold">0.82</div>
              <div className="text-xs sm:text-sm text-blue-600 mt-2 font-medium">{t('dashboard.card2_status')}</div>
            </div>
            <div className="bg-amber-50 p-5 sm:p-6 rounded-2xl border border-amber-100">
              <div className="text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">{t('dashboard.card3_title')}</div>
              <div className="text-2xl sm:text-3xl font-bold">4.2 Ton</div>
              <div className="text-xs sm:text-sm text-amber-600 mt-2 font-medium">{t('dashboard.card3_status')}</div>
            </div>
          </div>

          <div className="h-[260px] sm:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGanado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCultivos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="ganado" stroke="#059669" fillOpacity={1} fill="url(#colorGanado)" strokeWidth={3} />
                <Area type="monotone" dataKey="cultivos" stroke="#10b981" fillOpacity={1} fill="url(#colorCultivos)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
              <span className="text-sm font-medium text-gray-600">{t('dashboard.legend_cattle')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-sm font-medium text-gray-600">{t('dashboard.legend_crops')}</span>
            </div>
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close"
              className="absolute -top-12 right-0 text-white hover:text-lime-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video
              ref={videoRef}
              src={demoVideo}
              controls
              autoPlay
              playsInline
              className="w-full h-auto max-h-[80vh] rounded-2xl shadow-2xl bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardPreview;
