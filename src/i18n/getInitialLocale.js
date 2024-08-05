import { LOCALES } from "./locales";

export const getInitialLocale = () => {
  const savedLocale = localStorage.getItem("locale");
  return savedLocale || LOCALES.KAZAKH;
};
