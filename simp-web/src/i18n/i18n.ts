/* eslint-disable prettier/prettier */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import fr from './translations/fr.json';
import es from './translations/es.json';
import hi from './translations/hi.json';

console.log('i18 initialized');

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    fr: fr,
    es: es,
    hi: hi,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
