import React from "react";
import { LOCALES } from "../../i18n/locales";
import classNames from "classnames";

const LanguageSwitcher = ({ setLocale }) => {
  const handleLanguageChange = (event) => {
    setLocale(event.target.value);
  };

  return (
    <select
      className={classNames("option", "option--transparent")}
      onChange={handleLanguageChange}
      defaultValue={localStorage.getItem("locale") || LOCALES.KAZAKH}
    >
      {/* <option value={LOCALES.ENGLISH}>EN</option> */}
      <option value={LOCALES.RUSSIAN}>RU</option>
      <option value={LOCALES.KAZAKH}>KZ</option>
    </select>
  );
};

export default LanguageSwitcher;
