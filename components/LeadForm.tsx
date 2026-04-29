import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { saveLead } from '../services/leadsService';

const LeadForm: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    occupation: '',
    interest: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // Guardar en Supabase (sin redirección a WhatsApp)
    await saveLead({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      city: form.city,
      occupation: form.occupation,
      interest: form.interest,
    });

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">{t('lead_form.success_title')}</h3>
        <p className="text-gray-600 max-w-md mx-auto">{t('lead_form.success_text')}</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={t('lead_form.name')} className={inputClass} />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('lead_form.email')} className={inputClass} />
      <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder={t('lead_form.whatsapp')} className={inputClass} />
      <input type="text" name="city" value={form.city} onChange={handleChange} placeholder={t('lead_form.city')} className={inputClass} />
      <select name="occupation" value={form.occupation} onChange={handleChange} className={`${inputClass} text-gray-700`}>
        <option value="">{t('lead_form.occupation')}</option>
        <option value={t('lead_form.occupation_opt1')}>{t('lead_form.occupation_opt1')}</option>
        <option value={t('lead_form.occupation_opt2')}>{t('lead_form.occupation_opt2')}</option>
        <option value={t('lead_form.occupation_opt3')}>{t('lead_form.occupation_opt3')}</option>
        <option value={t('lead_form.occupation_opt4')}>{t('lead_form.occupation_opt4')}</option>
      </select>
      <select name="interest" value={form.interest} onChange={handleChange} className={`${inputClass} text-gray-700`}>
        <option value="">{t('lead_form.interest')}</option>
        <option value={t('lead_form.interest_opt1')}>{t('lead_form.interest_opt1')}</option>
        <option value={t('lead_form.interest_opt2')}>{t('lead_form.interest_opt2')}</option>
        <option value={t('lead_form.interest_opt3')}>{t('lead_form.interest_opt3')}</option>
        <option value={t('lead_form.interest_opt4')}>{t('lead_form.interest_opt4')}</option>
      </select>
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? '...' : t('lead_form.submit')}
      </button>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          {t('lead_form.privacy')}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
          {t('lead_form.contact_note')}
        </span>
      </div>
    </form>
  );
};

export default LeadForm;
