import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  INTEREST_CODES,
  OCCUPATION_CODES,
  InterestCode,
  OccupationCode,
  isValidEmail,
  isValidName,
  normalizePhone,
  saveLead,
} from '../services/leadsService';
import TurnstileWidget, { TURNSTILE_SITE_KEY } from './TurnstileWidget';

const DIAL_CODES: { country: string; code: string }[] = [
  { country: 'CO', code: '+57' },
  { country: 'EC', code: '+593' },
  { country: 'PE', code: '+51' },
  { country: 'VE', code: '+58' },
  { country: 'PA', code: '+507' },
  { country: 'MX', code: '+52' },
  { country: 'CR', code: '+506' },
  { country: 'GT', code: '+502' },
  { country: 'HN', code: '+504' },
  { country: 'NI', code: '+505' },
  { country: 'SV', code: '+503' },
  { country: 'BO', code: '+591' },
  { country: 'PY', code: '+595' },
  { country: 'AR', code: '+54' },
  { country: 'CL', code: '+56' },
  { country: 'UY', code: '+598' },
  { country: 'BR', code: '+55' },
  { country: 'US', code: '+1' },
  { country: 'ES', code: '+34' },
];

// Un humano tarda más que esto en llenar el formulario; un bot no.
const MIN_FILL_MS = 2500;

type FieldErrors = Partial<Record<'name' | 'whatsapp' | 'email' | 'city' | 'consent', string>>;

const LeadForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef(Date.now());
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    dialCode: '+57',
    whatsapp: '',
    city: '',
    occupation: '' as OccupationCode | '',
    interest: '' as InterestCode | '',
    consent: false,
    website: '', // honeypot: invisible para personas, los bots lo llenan
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const next = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : value;
    setForm({ ...form, [name]: next });
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors({ ...fieldErrors, [name]: undefined });
    }
  };

  const validate = (): { errors: FieldErrors; phone: string | null } => {
    const errors: FieldErrors = {};
    const phone = normalizePhone(form.whatsapp, form.dialCode);
    if (!isValidName(form.name)) errors.name = t('lead_form.errors.name');
    if (!phone) errors.whatsapp = t('lead_form.errors.whatsapp');
    if (form.email.trim() && !isValidEmail(form.email)) errors.email = t('lead_form.errors.email');
    const city = form.city.trim();
    if (city.length < 2 || city.length > 120) errors.city = t('lead_form.errors.city');
    if (!form.consent) errors.consent = t('lead_form.errors.consent');
    return { errors, phone };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg(null);

    // Bots: honeypot lleno o envío instantáneo. Se simula éxito para no darles pistas.
    if (form.website || Date.now() - startedAt.current < MIN_FILL_MS) {
      setSubmitted(true);
      return;
    }

    const { errors, phone } = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0 || !phone) return;

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setErrorMsg(t('lead_form.errors.captcha'));
      return;
    }

    setSubmitting(true);
    const result = await saveLead({
      name: form.name,
      email: form.email,
      whatsapp: phone,
      city: form.city,
      occupation: form.occupation,
      interest: form.interest,
      privacyConsent: form.consent,
      lang: i18n.language,
      turnstileToken: captchaToken ?? undefined,
    });

    if (result.ok) {
      setSubmitted(true);
    } else {
      const key =
        result.errorCode === 'invalid' ? 'invalid' : result.errorCode === 'captcha' ? 'captcha' : 'network';
      setErrorMsg(t(`lead_form.errors.${key}`));
      // Los tokens de Turnstile son de un solo uso: pedir uno nuevo para reintentar.
      if (TURNSTILE_SITE_KEY) setCaptchaResetKey((k) => k + 1);
    }
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
  const errorClass = 'border-red-400 bg-red-50';
  const renderError = (field: keyof FieldErrors) =>
    fieldErrors[field] ? (
      <p id={`lead-${field}-error`} className="text-xs text-red-600 mt-1 px-1">{fieldErrors[field]}</p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={t('lead_form.name')} autoComplete="name" maxLength={120} required aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'lead-name-error' : undefined} className={`${inputClass} ${fieldErrors.name ? errorClass : ''}`} />
        {renderError('name')}
      </div>
      <div>
        <div className="flex gap-2">
          <select name="dialCode" value={form.dialCode} onChange={handleChange} aria-label={t('lead_form.dial_code')} className={`${inputClass} w-28 flex-shrink-0 text-gray-700`}>
            {DIAL_CODES.map((d) => (
              <option key={d.country} value={d.code}>{`${d.country} ${d.code}`}</option>
            ))}
          </select>
          <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder={t('lead_form.whatsapp')} autoComplete="tel-national" inputMode="tel" maxLength={20} required aria-invalid={!!fieldErrors.whatsapp} aria-describedby={fieldErrors.whatsapp ? 'lead-whatsapp-error' : undefined} className={`${inputClass} ${fieldErrors.whatsapp ? errorClass : ''}`} />
        </div>
        {renderError('whatsapp')}
      </div>
      <div>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('lead_form.email')} autoComplete="email" maxLength={254} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'lead-email-error' : undefined} className={`${inputClass} ${fieldErrors.email ? errorClass : ''}`} />
        {renderError('email')}
      </div>
      <div>
        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder={t('lead_form.city')} autoComplete="address-level2" maxLength={120} required aria-invalid={!!fieldErrors.city} aria-describedby={fieldErrors.city ? 'lead-city-error' : undefined} className={`${inputClass} ${fieldErrors.city ? errorClass : ''}`} />
        {renderError('city')}
      </div>
      <select name="occupation" value={form.occupation} onChange={handleChange} className={`${inputClass} text-gray-700`}>
        <option value="">{t('lead_form.occupation')}</option>
        {OCCUPATION_CODES.map((code) => (
          <option key={code} value={code}>{t(`lead_form.occupation_${code}`)}</option>
        ))}
      </select>
      <select name="interest" value={form.interest} onChange={handleChange} className={`${inputClass} text-gray-700`}>
        <option value="">{t('lead_form.interest')}</option>
        {INTEREST_CODES.map((code) => (
          <option key={code} value={code}>{t(`lead_form.interest_${code}`)}</option>
        ))}
      </select>
      {/* Honeypot anti-bots: fuera de pantalla y fuera del orden de tabulación */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed px-1 pt-1 cursor-pointer">
          <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required aria-invalid={!!fieldErrors.consent} aria-describedby={fieldErrors.consent ? 'lead-consent-error' : undefined} className="mt-0.5 h-4 w-4 flex-shrink-0 accent-emerald-600" />
          <span>
            {t('lead_form.consent_text')}{' '}
            <a href="/aviso-de-privacidad.html" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline">
              {t('lead_form.consent_link')}
            </a>
            .
          </span>
        </label>
        {renderError('consent')}
      </div>
      {TURNSTILE_SITE_KEY && <TurnstileWidget onToken={setCaptchaToken} resetKey={captchaResetKey} />}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? '...' : t('lead_form.submit')}
      </button>
      {errorMsg && (
        <div
          role="alert"
          className="mt-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2"
        >
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}
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
