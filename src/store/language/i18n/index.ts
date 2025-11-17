// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from '../locales/en/common.json';
import enSidebar from '../locales/en/sidebar.json';
import viCommon from '../locales/vi/common.json';
import viSidebar from '../locales/vi/sidebar.json';

const resources = {
  en: {
    common: enCommon,
    sidebar: enSidebar,
  },
  vi: {
    common: viCommon,
    sidebar: viSidebar,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n;