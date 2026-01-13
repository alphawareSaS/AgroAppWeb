
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cultivoImg from '../Imagenes/ImagenPages/Cultivo.jpg';
import cultivoTrataImg from '../Imagenes/ImagenPages/CultivoTrata.jpg';

const VisionFeature: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  const steps = [
    {
      title: t('vision.step1_title'),
      desc: t('vision.step1_desc'),
      img: cultivoImg
    },
    {
      title: t('vision.step2_title'),
      desc: t('vision.step2_desc'),
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: t('vision.step3_title'),
      desc: t('vision.step3_desc'),
      img: cultivoTrataImg
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center gap-20">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm mb-4">{t('vision.subtitle')}</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
              {t('vision.title_start')} <br /><span className="text-emerald-600">{t('vision.title_highlight')}</span>
            </h3>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl transition-all cursor-pointer border-2 ${activeStep === idx ? 'bg-white border-emerald-500 shadow-xl translate-x-4' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <div className="flex gap-6 items-start">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${activeStep === idx ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="bg-emerald-900 aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl">
              <img
                src={steps[activeStep].img}
                alt="Preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 border-[16px] border-white/10 pointer-events-none"></div>
              {/* Scanline Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.8)] animate-scan"></div>

              <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase mb-1">{t('vision.ui_status_title')}</div>
                    <div className="text-lg font-bold text-gray-900">{t('vision.ui_status_text')}</div>
                  </div>
                  <div className="animate-spin h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default VisionFeature;
