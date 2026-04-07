// This code initializes i18next.

import i18n from "i18next"
import languageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

// Translation files
import en from "@/translate/en.json"
import ja from "@/translate/ja.json"

// Extend the type definitions of i18next with translation files.
declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en
    }
  }
}

i18n.use(languageDetector).use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ja: { translation: ja }
  },

  supportedLngs: ["en", "ja"],
  fallbackLng: "en",
  returnEmptyString: false,

  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"]
  },

  interpolation: {
    escapeValue: false
  }
})
