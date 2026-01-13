import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locales/es.json';
import en from './locales/en.json';
import pt from './locales/pt.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en },
            pt: { translation: pt }
        },
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lang',
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage']
        }
    });

export default i18n;
