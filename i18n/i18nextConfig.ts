
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./json/en.json";
import tr from "./json/tr.json";
import { LangCode } from "./LanguageUtils";
import * as Localization from "expo-localization";

const resources = {
  tr: {
    translation: tr,
  },
  en: {
    translation: en,
  },
};

const localization = Localization.locale.split("-")[0] as LangCode ? Localization.locale.split("-")[0] : LangCode.tr;

i18n.use(initReactI18next).init({
  resources,
  lng: localization,
  fallbackLng: LangCode.tr,
  compatibilityJSON: "v4",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
