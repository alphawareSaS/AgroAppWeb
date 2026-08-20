import React from 'react';
import { useTranslation } from 'react-i18next';

interface PlanRow {
  key: string;
  animals: string;
  farms: string;
  users: string;
  monthly: string;
  annual: string;
  featured?: boolean;
}

const PLAN_ROWS: PlanRow[] = [
  { key: 'free', animals: '30', farms: '1', users: '1', monthly: '$0', annual: '—' },
  { key: 'basic', animals: '250', farms: '2', users: '3', monthly: '$19.900', annual: '$199.000' },
  { key: 'finca', animals: '1.000', farms: '5', users: '6', monthly: '$39.900', annual: '$399.000', featured: true },
  { key: 'pro', animals: '3.000', farms: '10', users: '10', monthly: '$69.900', annual: '$699.000' },
  { key: 'hacienda', animals: '8.000', farms: '20', users: '20', monthly: '$149.900', annual: '$1.499.000' },
  { key: 'corporate', animals: 'Ilimitado', farms: 'Ilimitado', users: 'Ilimitado', monthly: 'Cotización', annual: 'Cotización' },
];

const Plans: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="planes" className="py-16 sm:py-24 lg:py-32 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs mb-4">{t('plans.subtitle')}</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">{t('plans.title')}</h3>
          <p className="text-gray-600 font-medium max-w-2xl mx-auto">{t('plans.description')}</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="bg-emerald-950 text-white">
                <th className="py-4 px-4 sm:px-6 font-black text-sm">{t('plans.col_plan')}</th>
                <th className="py-4 px-4 sm:px-6 font-black text-sm">{t('plans.col_animals')}</th>
                <th className="py-4 px-4 sm:px-6 font-black text-sm">{t('plans.col_farms')}</th>
                <th className="py-4 px-4 sm:px-6 font-black text-sm">{t('plans.col_users')}</th>
                <th className="py-4 px-4 sm:px-6 font-black text-sm">{t('plans.col_monthly')}</th>
                <th className="py-4 px-4 sm:px-6 font-black text-sm">{t('plans.col_annual')}</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_ROWS.map((row, idx) => (
                <tr
                  key={row.key}
                  className={`border-t border-gray-100 ${row.featured ? 'bg-emerald-50' : idx % 2 === 1 ? 'bg-gray-50/60' : 'bg-white'}`}
                >
                  <td className="py-4 px-4 sm:px-6 font-bold text-gray-900">
                    {t(`plans.name_${row.key}`)}
                    {row.featured && (
                      <span className="ml-2 align-middle text-[10px] font-black uppercase tracking-widest bg-emerald-600 text-white px-2 py-1 rounded-full">
                        {t('plans.most_requested')}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-gray-700 font-medium">{row.animals}</td>
                  <td className="py-4 px-4 sm:px-6 text-gray-700 font-medium">{row.farms}</td>
                  <td className="py-4 px-4 sm:px-6 text-gray-700 font-medium">{row.users}</td>
                  <td className="py-4 px-4 sm:px-6 text-gray-700 font-medium">{row.monthly}</td>
                  <td className="py-4 px-4 sm:px-6 text-gray-900 font-bold">{row.annual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-600 font-medium max-w-3xl">
          <p className="font-bold text-emerald-700">{t('plans.note_annual')}</p>
          <p>{t('plans.note_hectares')}</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h4 className="font-black text-gray-900 mb-3">{t('plans.addons_title')}</h4>
            <ul className="space-y-1 text-gray-600 text-sm font-medium">
              <li>{t('plans.addon_users')}</li>
              <li>{t('plans.addon_farms')}</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h4 className="font-black text-gray-900 mb-3">{t('plans.optional_title')}</h4>
            <ul className="space-y-1 text-gray-600 text-sm font-medium">
              <li>{t('plans.optional_ai_upload')}</li>
              <li>{t('plans.optional_digitization')}</li>
              <li>{t('plans.optional_training')}</li>
              <li>{t('plans.optional_support')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://app.ganiapp.com/login" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-center hover:bg-emerald-700 transition-all shadow-md">
            {t('plans.cta_start')}
          </a>
          <a
            href="https://wa.me/573005487221?text=Hola,%20quiero%20cotizar%20el%20plan%20Corporativo%20de%20GanIA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-emerald-700 border-2 border-emerald-600 px-8 py-4 rounded-2xl font-black text-center hover:bg-emerald-50 transition-all"
          >
            {t('plans.cta_quote')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Plans;
