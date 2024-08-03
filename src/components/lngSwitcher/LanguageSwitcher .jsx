// src/components/LanguageSwitcher.js
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { LOCALES } from "../i18n/locales";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useIntl();

  const handleChange = (event) => {
    const newLocale = event.target.value;
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale); // Сохраняем выбранный язык в локальное хранилище
  };

  return (
    <div>
      <label>
        <FormattedMessage id="select_language" />:
        <select value={locale} onChange={handleChange}>
          <option value={LOCALES.ENGLISH}>English</option>
          <option value={LOCALES.RUSSIAN}>Русский</option>
          <option value={LOCALES.FRENCH}>Français</option>
          <option value={LOCALES.GERMAN}>Deutsch</option>
          <option value={LOCALES.JAPANESE}>日本語</option>
        </select>
      </label>
    </div>
  );
};

export default LanguageSwitcher;
